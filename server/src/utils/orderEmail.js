import QRCode from 'qrcode'
import { sendMail } from '../lib/mailer.js'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const money = (v) => Number(v || 0).toFixed(2)

const buildUpiPayload = ({ upiId, payeeName, amount, note }) => {
  const params = new URLSearchParams({
    pa: upiId,
    pn: payeeName || 'Arics',
    am: String(Number(amount || 0).toFixed(2)),
    cu: 'INR',
    tn: note || 'Arics Order Payment',
  })
  return `upi://pay?${params.toString()}`
}

export const buildPaymentQrPayload = (order) => {
  const mode = (process.env.PAYMENT_QR_MODE || 'upi').toLowerCase()

  if (mode === 'upi') {
    const upiId = process.env.PAYMENT_UPI_ID
    if (!upiId) throw new Error('PAYMENT_UPI_ID is not set (required for PAYMENT_QR_MODE=upi)')

    const note = `Order ${String(order._id).slice(-6).toUpperCase()}`
    return buildUpiPayload({
      upiId,
      payeeName: process.env.PAYMENT_UPI_NAME || 'Arics',
      amount: order.pricing?.total ?? 0,
      note,
    })
  }

  const payload = process.env.PAYMENT_QR_PAYLOAD
  if (!payload) throw new Error('PAYMENT_QR_PAYLOAD is not set (required for PAYMENT_QR_MODE=payload)')
  return payload
}

export const generatePaymentQrPng = async (order) => {
  const payload = buildPaymentQrPayload(order)
  return QRCode.toBuffer(payload, {
    type: 'png',
    width: 340,
    margin: 1,
    color: {
      dark: '#be185d', // rose-700
      light: '#ffffff',
    },
  })
}

const getQrFromAssets = async () => {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  // Look for qr.png in server/src/assets folder
  const qrPath = path.join(__dirname, '../assets/qr.png')
  if (fs.existsSync(qrPath)) {
    return fs.readFileSync(qrPath)
  }
  // If no asset file exists, generate a default QR
  return QRCode.toBuffer(process.env.PAYMENT_QR_PAYLOAD || 'upi://pay?pa=arics@upi&pn=Arics', {
    type: 'png',
    width: 340,
    margin: 1,
    color: { dark: '#be185d', light: '#ffffff' },
  })
}

export const sendOrderConfirmedEmail = async (order) => {
  // Just call sendStatusEmail with 'confirmed' status to ensure consistency
  return sendStatusEmail(order, 'confirmed')
}

export const sendStatusEmail = async (order, status) => {
  const to = order.customer?.email
  if (!to) return
  const from = process.env.MAIL_FROM || 'Arics <no-reply@arics.com>'
  const shortId = String(order._id).slice(-6).toUpperCase()
  const total = (order.pricing?.total || 0).toFixed(2)
  
  // Format delivery date for display
  let deliveryDateText = 'To be confirmed'
  if (order.deliveryEstimate) {
    if (order.deliveryEstimate.startDate && order.deliveryEstimate.endDate) {
      deliveryDateText = `${order.deliveryEstimate.startDate} - ${order.deliveryEstimate.endDate}`
    } else if (order.deliveryEstimate.startDate) {
      deliveryDateText = order.deliveryEstimate.startDate
    } else if (order.deliveryEstimate.days) {
      deliveryDateText = `${order.deliveryEstimate.days} days`
    }
  }

  // Email templates for each status
  const emailTemplates = {
    pending: {
      title: 'Order Received',
      subject: `Order Received (#${shortId})`,
      content: `
        <div style="padding:16px; border:1px solid rgba(236,72,153,0.2); border-radius:14px; background:linear-gradient(135deg,#fff1f2,#fdf2f8,#f5f3ff)">
          <div style="font-size:12px; letter-spacing:0.25em; text-transform:uppercase; color:#be185d; font-weight:700;">Arics</div>
          <div style="font-size:24px; font-weight:800; margin-top:6px;">Order Received! 🌸</div>
          <p style="margin:8px 0 0; color:#374151;">Order <strong>#${shortId}</strong></p>
          <p style="margin:6px 0 0; color:#374151;">Thank you for choosing Arics! We've received your order and will review it shortly.</p>
        </div>
        <div style="margin-top:16px; padding:16px; border:1px solid rgba(236,72,153,0.18); border-radius:14px; background:#fff;">
          <div style="font-size:14px; font-weight:800;">Order Summary</div>
          <p style="margin:6px 0 0; color:#374151;"><strong>Total:</strong> ₹${total}</p>
          <p style="margin:6px 0 0; color:#374151;"><strong>Status:</strong> Pending Review</p>
          <p style="margin:10px 0 0; color:#6b7280; font-size:13px;">We'll send you a confirmation email once your order is confirmed.</p>
        </div>
      `,
      includeQr: false
    },
    confirmed: {
      title: 'Order Confirmed',
      subject: `Order Confirmed (#${shortId})`,
      content: `
        <div style="padding:16px; border:1px solid rgba(236,72,153,0.2); border-radius:14px; background:linear-gradient(135deg,#fff1f2,#fdf2f8,#f5f3ff)">
          <div style="font-size:12px; letter-spacing:0.25em; text-transform:uppercase; color:#be185d; font-weight:700;">Arics</div>
          <div style="font-size:24px; font-weight:800; margin-top:6px;">Order Confirmed! ✨</div>
          <p style="margin:8px 0 0; color:#374151;">Order <strong>#${shortId}</strong></p>
          <p style="margin:6px 0 0; color:#374151;">Your order is confirmed and scheduled for preparation!</p>
        </div>
        <div style="margin-top:16px; padding:16px; border:1px solid rgba(236,72,153,0.18); border-radius:14px; background:#fff;">
          <div style="font-size:14px; font-weight:800;">Order Details</div>
          <p style="margin:6px 0 0; color:#374151;"><strong>Total:</strong> ₹${total}</p>
          <p style="margin:6px 0 0; color:#374151;"><strong>Delivery:</strong> ${deliveryDateText}</p>
        </div>
        <div style="margin-top:16px; padding:16px; border:1px solid rgba(236,72,153,0.18); border-radius:14px; background:#fff;">
          <div style="font-size:14px; font-weight:800;">💳 Payment Required</div>
          <p style="margin:6px 0 0; color:#374151;">To complete your payment of <strong>₹${total}</strong>, please open the QR code using the link below:</p>
          <div style="margin:16px 0; padding:12px; background:#f9fafb; border-radius:8px; text-align:center;">
            <a href="https://timely-bubblegum-4da5f4.netlify.app/qrcode.png" 
               style="color:#be185d; font-weight:600; text-decoration:none; word-break:break-all;">
              https://timely-bubblegum-4da5f4.netlify.app/qrcode.png
            </a>
          </div>
          <p style="margin:6px 0 0; color:#6b7280; font-size:13px;">Click the link to open the QR code, then scan it with any UPI app to pay ₹${total}</p>
        </div>
      `,
      includeQr: false
    },
    payment_received: {
      title: 'Payment Received',
      subject: `Payment Received - Thank You! (#${shortId})`,
      content: `
        <div style="padding:16px; border:1px solid rgba(236,72,153,0.2); border-radius:14px; background:linear-gradient(135deg,#fff1f2,#fdf2f8,#f5f3ff)">
          <div style="font-size:12px; letter-spacing:0.25em; text-transform:uppercase; color:#be185d; font-weight:700;">Arics</div>
          <div style="font-size:24px; font-weight:800; margin-top:6px;">Payment Received! 💝</div>
          <p style="margin:8px 0 0; color:#374151;">Order <strong>#${shortId}</strong></p>
          <p style="margin:6px 0 0; color:#374151;">We've received your payment of <strong>₹${total}</strong>. Thank you!</p>
        </div>
        <div style="margin-top:16px; padding:16px; border:1px solid rgba(236,72,153,0.18); border-radius:14px; background:#fff;">
          <div style="font-size:14px; font-weight:800;">What's Next?</div>
          <p style="margin:6px 0 0; color:#374151;">Our expert florists will now begin preparing your beautiful bouquet with the utmost care.</p>
          <p style="margin:6px 0 0; color:#374151;">Expected delivery: <strong>${deliveryDateText}</strong></p>
        </div>
      `,
      includeQr: false
    },
    preparing: {
      title: 'Preparing Your Order',
      subject: `Your Bouquet is Being Prepared (#${shortId})`,
      content: `
        <div style="padding:16px; border:1px solid rgba(236,72,153,0.2); border-radius:14px; background:linear-gradient(135deg,#fff1f2,#fdf2f8,#f5f3ff)">
          <div style="font-size:12px; letter-spacing:0.25em; text-transform:uppercase; color:#be185d; font-weight:700;">Arics</div>
          <div style="font-size:24px; font-weight:800; margin-top:6px;">Crafting Your Bouquet 🌹</div>
          <p style="margin:8px 0 0; color:#374151;">Order <strong>#${shortId}</strong></p>
          <p style="margin:6px 0 0; color:#374151;">Our talented florists are carefully arranging your flowers!</p>
        </div>
        <div style="margin-top:16px; padding:16px; border:1px solid rgba(236,72,153,0.18); border-radius:14px; background:#fff;">
          <div style="font-size:14px; font-weight:800;">🎨 In Progress</div>
          <p style="margin:6px 0 0; color:#374151;">Each stem is being selected and arranged with love and expertise.</p>
          <p style="margin:6px 0 0; color:#374151;">Your bouquet will be ready for delivery soon!</p>
        </div>
      `,
      includeQr: false
    },
    out_for_delivery: {
      title: 'Out for Delivery',
      subject: `Your Flowers Are On The Way! (#${shortId})`,
      content: `
        <div style="padding:16px; border:1px solid rgba(236,72,153,0.2); border-radius:14px; background:linear-gradient(135deg,#fff1f2,#fdf2f8,#f5f3ff)">
          <div style="font-size:12px; letter-spacing:0.25em; text-transform:uppercase; color:#be185d; font-weight:700;">Arics</div>
          <div style="font-size:24px; font-weight:800; margin-top:6px;">Out for Delivery! 🚚</div>
          <p style="margin:8px 0 0; color:#374151;">Order <strong>#${shortId}</strong></p>
          <p style="margin:6px 0 0; color:#374151;">Your beautiful bouquet is on its way to you!</p>
        </div>
        <div style="margin-top:16px; padding:16px; border:1px solid rgba(236,72,153,0.18); border-radius:14px; background:#fff;">
          <div style="font-size:14px; font-weight:800;">📦 Delivery in Progress</div>
          <p style="margin:6px 0 0; color:#374151;">Your flowers are being carefully transported to ensure they arrive fresh and beautiful.</p>
          <p style="margin:6px 0 0; color:#374151;"><strong>Delivery to:</strong> ${order.customer?.name || 'You'}</p>
          <p style="margin:6px 0 0; color:#374151;"><strong>Address:</strong> ${order.customer?.address || 'Your address'}</p>
        </div>
      `,
      includeQr: false
    },
    delivered: {
      title: 'Delivered',
      subject: `Your Order Has Been Delivered! (#${shortId})`,
      content: `
        <div style="padding:16px; border:1px solid rgba(236,72,153,0.2); border-radius:14px; background:linear-gradient(135deg,#fff1f2,#fdf2f8,#f5f3ff)">
          <div style="font-size:12px; letter-spacing:0.25em; text-transform:uppercase; color:#be185d; font-weight:700;">Arics</div>
          <div style="font-size:24px; font-weight:800; margin-top:6px;">Delivered Successfully! 🎉</div>
          <p style="margin:8px 0 0; color:#374151;">Order <strong>#${shortId}</strong></p>
          <p style="margin:6px 0 0; color:#374151;">Your bouquet has been delivered. We hope you love it!</p>
        </div>
        <div style="margin-top:16px; padding:16px; border:1px solid rgba(236,72,153,0.18); border-radius:14px; background:#fff;">
          <div style="font-size:14px; font-weight:800;">💐 Enjoy Your Flowers!</div>
          <p style="margin:6px 0 0; color:#374151;">We hope your flowers bring joy and beauty to your space.</p>
          <p style="margin:10px 0 0; color:#374151;"><strong>Care Tips:</strong></p>
          <ul style="margin:6px 0 0 20px; color:#374151;">
            <li>Change water every 2-3 days</li>
            <li>Trim stems at an angle</li>
            <li>Keep away from direct sunlight</li>
            <li>Remove wilted flowers promptly</li>
          </ul>
          <p style="margin:10px 0 0; color:#6b7280; font-size:13px;">Thank you for choosing Arics! We'd love to hear your feedback.</p>
        </div>
      `,
      includeQr: false
    },
    cancelled: {
      title: 'Order Cancelled',
      subject: `Order Cancelled (#${shortId})`,
      content: `
        <div style="padding:16px; border:1px solid rgba(236,72,153,0.2); border-radius:14px; background:linear-gradient(135deg,#fff1f2,#fdf2f8,#f5f3ff)">
          <div style="font-size:12px; letter-spacing:0.25em; text-transform:uppercase; color:#be185d; font-weight:700;">Arics</div>
          <div style="font-size:24px; font-weight:800; margin-top:6px;">Order Cancelled</div>
          <p style="margin:8px 0 0; color:#374151;">Order <strong>#${shortId}</strong></p>
          <p style="margin:6px 0 0; color:#374151;">Your order has been cancelled.</p>
        </div>
        <div style="margin-top:16px; padding:16px; border:1px solid rgba(236,72,153,0.18); border-radius:14px; background:#fff;">
          <div style="font-size:14px; font-weight:800;">What Happened?</div>
          <p style="margin:6px 0 0; color:#374151;">This order has been cancelled as requested.</p>
          <p style="margin:6px 0 0; color:#374151;">If you have any questions or if this was unexpected, please reply to this email or contact our support team.</p>
          <p style="margin:10px 0 0; color:#374151;"><strong>Order Total:</strong> ₹${total}</p>
          <p style="margin:6px 0 0; color:#6b7280; font-size:13px;">If payment was made, it will be refunded within 5-7 business days.</p>
        </div>
      `,
      includeQr: false
    }
  }

  const template = emailTemplates[status] || {
    title: 'Order Update',
    subject: `Order Update (#${shortId})`,
    content: `
      <div style="padding:16px; border:1px solid rgba(236,72,153,0.2); border-radius:14px; background:linear-gradient(135deg,#fff1f2,#fdf2f8,#f5f3ff)">
        <div style="font-size:12px; letter-spacing:0.25em; text-transform:uppercase; color:#be185d; font-weight:700;">Arics</div>
        <div style="font-size:24px; font-weight:800; margin-top:6px;">Order Update</div>
        <p style="margin:8px 0 0; color:#374151;">Order <strong>#${shortId}</strong></p>
        <p style="margin:6px 0 0; color:#374151;">Your order status has been updated to: <strong>${status}</strong></p>
      </div>
    `,
    includeQr: false
  }

  const html = `
  <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; line-height: 1.5; color: #111827; max-width:640px; margin:0 auto; padding:18px;">
    ${template.content}
  </div>`

  const mailOptions = { from, to, subject: `Arics • ${template.subject}`, html }
  
  await sendMail(mailOptions)
}
