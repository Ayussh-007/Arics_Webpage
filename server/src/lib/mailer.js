import nodemailer from 'nodemailer'

const boolFromEnv = (value) => {
  if (value == null) return undefined
  const v = String(value).toLowerCase().trim()
  if (v === 'true' || v === '1' || v === 'yes') return true
  if (v === 'false' || v === '0' || v === 'no') return false
  return undefined
}

export const createTransporter = () => {
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || 587)
  const secure = boolFromEnv(process.env.SMTP_SECURE) ?? port === 465

  if (!host) throw new Error('SMTP_HOST is not set')

  const authUser = process.env.SMTP_USER
  const authPass = process.env.SMTP_PASS

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: authUser ? { user: authUser, pass: authPass } : undefined,
  })
}

export const sendMail = async (message) => {
  const transporter = createTransporter()
  return transporter.sendMail(message)
}
