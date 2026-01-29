# Email QR Code Attachment Fix

## Summary
Fixed the issue where QR codes were embedded in email messages (causing them to not be visible) by sending them as separate attachments instead. Also added support for admin to set delivery dates when updating order status.

## Changes Made

### 1. Server Routes (`server/src/routes/orders.js`)
**Updated the PATCH /:id endpoint to accept delivery date updates:**
- Now accepts `deliveryEstimate` in the request body along with `status`
- Admin can update delivery date when changing order status
- Delivery date will be saved to the order and used in emails

```javascript
// Example request body:
{
  "status": "confirmed",
  "deliveryEstimate": {
    "startDate": "2026-02-14",
    "endDate": "2026-02-15",
    "days": 2
  }
}
```

### 2. Email System (`server/src/utils/orderEmail.js`)

#### A. Delivery Date Formatting
- Added logic to format delivery dates for display in emails
- Handles multiple formats:
  - Date range: "2026-02-14 - 2026-02-15"
  - Single date: "2026-02-14"
  - Days only: "2 days"
  - Fallback: "To be confirmed"

#### B. QR Code Attachment (Key Fix)
**Changed the "confirmed" status email template:**
- Set `includeQr: true` to enable QR code attachment
- Removed embedded QR image from HTML (`<img src="...">`)
- Updated email text to inform customer QR is attached separately

**Improved attachment handling:**
- QR code is generated dynamically for each order using `generatePaymentQrPng(order)`
- QR contains order-specific payment information (UPI with correct amount)
- Attached as `payment-qr-{ORDER_ID}.png`
- Added error handling with try-catch
- Added console logging for debugging:
  - Success: `✓ QR code attachment generated for order ABC123 (12345 bytes)`
  - Failure: `✗ Failed to generate QR code for order ABC123: error message`
  - Sending: `✓ Sending email with 1 attachment(s) to customer@email.com`

#### C. All Status Emails Updated
- Updated delivery date display in all email templates:
  - `confirmed` - shows delivery date with QR attachment
  - `payment_received` - shows expected delivery
  - `out_for_delivery` - shows delivery address

## How It Works Now

### Admin Workflow:
1. Admin views order in dashboard
2. Admin sets delivery date (if not already set)
3. Admin changes status to "confirmed"
4. System sends email with:
   - Order confirmation details
   - Delivery date (as set by admin)
   - QR code as **separate attachment** (not embedded)

### Customer Experience:
1. Receives email with order confirmation
2. Sees delivery date clearly in email body
3. Finds QR code as a downloadable attachment
4. Can easily scan QR code from their device or save it

## Technical Details

### QR Code Generation
- Uses `qrcode` library to generate PNG buffer
- Includes UPI payment string with:
  - Payment amount (₹{total})
  - Order ID reference
  - Merchant UPI ID (from env: PAYMENT_UPI_ID)
  - Merchant name (from env: PAYMENT_UPI_NAME)
- Image format: PNG, 340x340px
- Colors: Rose-700 (#be185d) on white background

### Email Attachment Format
```javascript
{
  filename: 'payment-qr-ABC123.png',
  content: Buffer, // PNG image data
  contentType: 'image/png'
}
```

## Environment Variables Required

Make sure these are set in your `.env`:
```
PAYMENT_QR_MODE=upi
PAYMENT_UPI_ID=yourupi@bankname
PAYMENT_UPI_NAME=Arics
MAIL_FROM=Arics <no-reply@arics.com>
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password
```

## Testing

### To Test QR Attachment:
1. Restart your server: `npm run dev:all`
2. Go to Admin Dashboard
3. View an order
4. Set delivery date if needed
5. Change status to "confirmed"
6. Check customer email:
   - Should have attachment named `payment-qr-{ORDER_ID}.png`
   - Should NOT have QR embedded in email body
   - Should show correct delivery date

### Server Logs to Check:
```
✓ QR code attachment generated for order ABC123 (12543 bytes)
✓ Sending email with 1 attachment(s) to customer@email.com
```

## Benefits

1. **Better Email Compatibility**: Attachments work across all email clients better than embedded images
2. **Easy to Scan**: Customer can download and display QR on full screen
3. **Dynamic QR Codes**: Each order gets a unique QR with correct payment amount
4. **Admin Control**: Admin can set delivery dates which appear in emails
5. **Better UX**: Clear messaging that QR is attached, not missing

## Files Modified

1. `server/src/routes/orders.js` - Added delivery date update support
2. `server/src/utils/orderEmail.js` - Fixed QR attachment and delivery date formatting
