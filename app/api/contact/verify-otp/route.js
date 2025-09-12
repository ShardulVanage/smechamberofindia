import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

if (!global.otpStorage) global.otpStorage = new Map()
const otpStorage = global.otpStorage

function normalizeEmail(email) {
  return String(email || "")
    .toLowerCase()
    .trim()
}

function getClientIP(request) {
  const forwarded = request.headers.get("x-forwarded-for")
  const realIP = request.headers.get("x-real-ip")
  const cfConnectingIP = request.headers.get("cf-connecting-ip")
  return cfConnectingIP || realIP || (forwarded && forwarded.split(",")[0]) || "unknown"
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { email, mobile, emailOtp, smsOtp, formData } = body || {}

    const normalizedEmail = normalizeEmail(email)
    if (!normalizedEmail || !emailOtp || !smsOtp) {
      return NextResponse.json({ error: "Email, Email OTP and SMS OTP are required" }, { status: 400 })
    }

    const record = otpStorage.get(normalizedEmail)
    if (!record) {
      return NextResponse.json({ error: "No OTP request found or it has expired" }, { status: 400 })
    }

    const now = Date.now()
    if (now > record.expiresAt) {
      otpStorage.delete(normalizedEmail)
      return NextResponse.json({ error: "OTP has expired. Please request a new one." }, { status: 400 })
    }

    // Optional: ensure same IP (soft check)
    const clientIP = getClientIP(request)
    if (record.clientIP && clientIP && record.clientIP !== clientIP) {
      console.log("Warning: OTP requested from IP", record.clientIP, "but verified from", clientIP)
    }

    if (String(emailOtp) !== String(record.emailOtp) || String(smsOtp) !== String(record.smsOtp)) {
      return NextResponse.json({ error: "Invalid OTP(s). Please check and try again." }, { status: 400 })
    }

    // Passed both verifications — proceed with final emails
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
    })

    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #29688A; color: white; padding: 20px; text-align: center;">
          <h1>New Contact Form Submission</h1>
        </div>
        <div style="padding: 20px; background-color: #f9f9f9;">
          <h2 style="color: #29688A;">Contact Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 8px; font-weight: bold;">Name:</td>
              <td style="padding: 8px;">${formData?.name || ""}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 8px; font-weight: bold;">Title:</td>
              <td style="padding: 8px;">${formData?.title || ""}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 8px; font-weight: bold;">Designation:</td>
              <td style="padding: 8px;">${formData?.designation || ""}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 8px; font-weight: bold;">Company Name:</td>
              <td style="padding: 8px;">${formData?.companyName || ""}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 8px; font-weight: bold;">Business Interest:</td>
              <td style="padding: 8px;">${formData?.businessInterest || ""}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 8px; font-weight: bold;">Email:</td>
              <td style="padding: 8px;">${normalizedEmail}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 8px; font-weight: bold;">Mobile:</td>
              <td style="padding: 8px;">${mobile || ""}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 8px; font-weight: bold;">Address:</td>
              <td style="padding: 8px;">${formData?.address || ""}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 8px; font-weight: bold;">Message:</td>
              <td style="padding: 8px;">${formData?.message || ""}</td>
            </tr>
          </table>
        </div>
        <div style="background-color: #29688A; color: white; padding: 10px; text-align: center;">
          <p>Please review and respond to this contact form submission.</p>
        </div>
      </div>
    `

    const userEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #29688A; color: white; padding: 20px; text-align: center;">
          <h1>Contact Form Submission Received</h1>
        </div>
        <div style="padding: 20px;">
          <p>Dear ${formData?.name || ""},</p>
          <p>Thank you for contacting us. We have successfully received your message and will get back to you within 24-48 hours.</p>
          
          <div style="background-color: #f9f9f9; padding: 15px; margin: 20px 0; border-left: 4px solid #29688A;">
            <h3 style="color: #29688A; margin-top: 0;">Your Submission Summary</h3>
            <p><strong>Company:</strong> ${formData?.companyName || ""}</p>
            <p><strong>Business Interest:</strong> ${formData?.businessInterest || ""}</p>
            <p><strong>Message:</strong> ${formData?.message || ""}</p>
          </div>

          <p>If you have any urgent questions, please don't hesitate to contact us directly.</p>
          
          <p>Best regards,<br>The Support Team</p>
        </div>
        <div style="background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #666;">
          <p>This is an automated email. Please do not reply to this message.</p>
        </div>
      </div>
    `

    // Send email to admin
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Form Submission - ${formData?.companyName || formData?.name || ""}`,
      html: adminEmailHtml,
    })

    // Send confirmation email to user
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: normalizedEmail,
      subject: "Contact Form Submission Confirmation",
      html: userEmailHtml,
    })

    // Clear used OTPs
    otpStorage.delete(normalizedEmail)

    return NextResponse.json({ message: "Contact form submitted successfully" })
  } catch (error) {
    console.error("Error verifying OTPs / processing contact form:", error)
    return NextResponse.json({ error: "Failed to verify OTPs" }, { status: 500 })
  }
}
