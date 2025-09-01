import nodemailer from "nodemailer"

const GMAIL_USER = process.env.GMAIL_USER
const GMAIL_PASS = process.env.GMAIL_APP_PASSWORD // Use Gmail App Password
const ADMIN_EMAIL = process.env.ADMIN_EMAIL
const APP_NAME =  "SME Chamber of India"
const FROM_EMAIL = process.env.ADMIN_EMAIL

if (!GMAIL_USER || !GMAIL_PASS) {
  console.warn("[mailer] GMAIL_USER or GMAIL_PASS not set. Emails will fail.")
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS,
  },
})

export async function sendOtpEmail(to, otp) {
  const mail = {
    from: `${APP_NAME} <${FROM_EMAIL}>`,
    to,
    subject: `${APP_NAME} - Your OTP Code for Council Membership Application`,
    text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
    html: `
      <div style="font-family:Arial,sans-serif;font-size:14px;color:#111">
        <p>Your OTP code is:</p>
        <p style="font-size:24px;font-weight:700;letter-spacing:2px">${otp}</p>
        <p>This code expires in 10 minutes. If you did not request this, please ignore this email.</p>
      </div>
    `,
  }
  return transporter.sendMail(mail)
}

export async function sendFormEmails({ form, userEmail }) {
  if (!ADMIN_EMAIL) {
    throw new Error("ADMIN_EMAIL is not configured")
  }
  const subject = `${APP_NAME} - New Membership Application from ${form.firstName || ""} ${form.lastName || ""}`.trim()

  const lines = Object.entries(form)
    .map(([k, v]) => `${k}: ${String(v ?? "").trim()}`)
    .join("\n")

  // Admin email (full details)
  await transporter.sendMail({
    from: `${APP_NAME} <${FROM_EMAIL}>`,
    to: ADMIN_EMAIL,
    subject,
    text: `New application received:\n\n${lines}`,
    html: `<div style="font-family:Arial,sans-serif;white-space:pre-wrap"><h3>New application received</h3><pre>${lines}</pre></div>`,
  })

  // User confirmation email (summary)
  if (userEmail) {
    await transporter.sendMail({
      from: `${APP_NAME} <${FROM_EMAIL}>`,
      to: userEmail,
      subject: `${APP_NAME} - Application Received`,
      text:
        `Dear ${form.firstName || "Applicant"},\n\n` +
        `Thank you for applying to the ${APP_NAME}. We have received your submission.\n` +
        `Our team will review and get back to you shortly.\n\n` +
        `Regards,\n${APP_NAME}`,
      html: `
        <div style="font-family:Arial,sans-serif">
          <p>Dear ${form.firstName || "Applicant"},</p>
          <p>Thank you for applying to the <strong>${APP_NAME}</strong>. We have received your submission.</p>
          <p>Our team will review and get back to you shortly.</p>
          <p>Regards,<br/>${APP_NAME}</p>
        </div>
      `,
    })
  }
}
