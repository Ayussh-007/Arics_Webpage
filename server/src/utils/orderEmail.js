import QRCode from 'qrcode'
import { sendMail } from '../lib/mailer.js'

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

export const sendOrderConfirmedEmail = async (order) => {
  const to = order.customer?.email
  if (!to) throw new Error('Order has no customer email')

  const from = process.env.MAIL_FROM || 'Arics <no-reply@arics.com>'
  const shortId = String(order._id).slice(-6).toUpperCase()

  const subject = `Your Arics order is confirmed (#${shortId})`
  const customerName = order.customer?.name || 'there'

  const flowersHtml = (order.selection?.flowers || [])
    .map((f) => `<li>${f.name || 'Flower'} × ${Number(f.stems || 0)} <span style="color:#6b7280">(₹${money(Number(f.stems || 0) * Number(f.pricePerStem || 0))})</span></li>`)
    .join('')

  const customHtml = (order.selection?.customizations || [])
    .map((c) => `<li>${c.option || c.category || 'Customization'}${c.quantity ? ` × ${c.quantity}` : ''} <span style="color:#6b7280">(₹${money(Number(c.price || 0) * Number(c.quantity || 1))})</span></li>`)
    .join('')

  const html = `
  <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; line-height: 1.5; color: #111827;">
    <div style="max-width: 640px; margin: 0 auto; padding: 24px;">
      <div style="padding: 18px 20px; border-radius: 18px; background: linear-gradient(135deg, #fff1f2, #fdf2f8, #f5f3ff); border: 1px solid rgba(236, 72, 153, 0.20);">
        <div style="font-size: 12px; letter-spacing: 0.25em; text-transform: uppercase; color: #be185d; font-weight: 700;">Arics</div>
        <div style="font-size: 28px; font-weight: 800; margin-top: 6px;">Order Confirmed</div>
        <p style="margin: 10px 0 0; color: #374151;">Hi ${customerName}, your bouquet is being prepared. Below are your order details.</p>
      </div>

      <div style="margin-top: 18px; padding: 18px 20px; border-radius: 18px; background: rgba(255,255,255,0.9); border: 1px solid rgba(236, 72, 153, 0.18);">
        <div style="display:flex; justify-content: space-between; gap: 12px; flex-wrap: wrap;">
          <div>
            <div style="font-size: 12px; color: #9ca3af;">Order ID</div>
            <div style="font-weight: 800; color: #111827;">#${shortId}</div>
          </div>
          <div>
            <div style="font-size: 12px; color: #9ca3af;">Estimated delivery</div>
            <div style="font-weight: 700; color: #111827;">${order.deliveryEstimate?.startDate || ''} ${order.deliveryEstimate?.endDate ? `→ ${order.deliveryEstimate.endDate}` : ''}</div>
          </div>
          <div>
            <div style="font-size: 12px; color: #9ca3af;">Total</div>
            <div style="font-weight: 800; color: #111827;">₹${money(order.pricing?.total)}</div>
          </div>
        </div>

        <hr style="border:0; border-top:1px solid rgba(236, 72, 153, 0.16); margin: 16px 0;" />

        <div style="display:grid; grid-template-columns: 1fr; gap: 14px;">
          <div>
            <div style="font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase; color:#be185d; font-weight:700;">Flowers</div>
            <ul style="margin: 8px 0 0; padding-left: 18px; color:#111827;">
              ${flowersHtml || '<li>—</li>'}
            </ul>
          </div>
          <div>
            <div style="font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase; color:#be185d; font-weight:700;">Customizations</div>
            <ul style="margin: 8px 0 0; padding-left: 18px; color:#111827;">
              ${customHtml || '<li>—</li>'}
            </ul>
          </div>
        </div>
      </div>

      <div style="margin-top: 18px; padding: 18px 20px; border-radius: 18px; background: rgba(255,255,255,0.9); border: 1px solid rgba(236, 72, 153, 0.18);">
        <div style="font-size: 14px; font-weight: 800;">Payment</div>
        <p style="margin: 6px 0 0; color:#374151;">Scan the QR code below to complete payment.</p>
        <div style="margin-top: 12px; text-align:center;">
          <img src="cid:paymentqr" width="260" height="260" alt="Payment QR Code" style="border-radius: 14px; border: 1px solid rgba(236, 72, 153, 0.20);" />
        </div>
        <p style="margin: 12px 0 0; color:#6b7280; font-size: 12px;">If you have questions, reply to this email.</p>
      </div>

      <p style="margin-top: 18px; color:#6b7280; font-size: 12px; text-align:center;">Thank you for choosing Arics.</p>
    </div>
  </div>
  `

  const qrPng = await generatePaymentQrPng(order)

  await sendMail({
    from,
    to,
    subject,
    html,
    attachments: [
      {
        filename: `arics-payment-qr-${shortId}.png`,
        content: qrPng,
        cid: 'paymentqr',
        contentType: 'image/png',
      },
    ],
  })
}
