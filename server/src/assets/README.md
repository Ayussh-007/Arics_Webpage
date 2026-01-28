# Assets Folder

This folder contains static assets used by the server.

## Payment QR Code

Place your payment QR code image here as `qr.png`. This QR code will be attached to order confirmation emails.

### File Requirements:
- **Filename:** `qr.png`
- **Format:** PNG
- **Recommended Size:** 500x500 pixels or larger
- **Content:** UPI payment QR code or bank details QR code

### How it's used:
- Attached to order confirmation emails
- Sent when order status is "confirmed"
- Helps customers complete payment easily

If no `qr.png` file is found, the system will fall back to generating a QR code from the `PAYMENT_QR_PAYLOAD` environment variable.
