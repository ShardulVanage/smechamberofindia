import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

const g = globalThis
if (!g.otpStorage) g.otpStorage = new Map()
const otpStorage = g.otpStorage

function normalizeEmail(email) {
  return String(email || "")
    .toLowerCase()
    .trim()
}

function getClientIP(request) {
  const forwarded = request.headers.get("x-forwarded-for")
  const realIP = request.headers.get("x-real-ip")
  const cfConnectingIP = request.headers.get("cf-connecting-ip")
  return cfConnectingIP || realIP || (forwarded?.split(",")[0] || "").trim() || "unknown"
}

export async function POST(request) {
  try {
    const { email, otp, formData } = await request.json()

    const normalizedEmail = normalizeEmail(email)
    const normalizedFormEmail = normalizeEmail(formData?.email)
    const clientIP = getClientIP(request)

    if (normalizedEmail !== normalizedFormEmail) {
      return NextResponse.json({ error: "Email validation failed" }, { status: 400 })
    }

    const storedOtpData = otpStorage.get(normalizedEmail)
    if (!storedOtpData) {
      return NextResponse.json({ error: "OTP not found or expired" }, { status: 400 })
    }

    const { otp: storedOtp, expiresAt, clientIP: storedIP } = storedOtpData
    const now = Date.now()

    if (storedIP !== clientIP) {
      // Do not block; IP can change legitimately
      console.log("[enquiry/verify-otp] IP mismatch (continuing)")
    }

    if (now > expiresAt) {
      otpStorage.delete(normalizedEmail)
      return NextResponse.json({ error: "OTP has expired" }, { status: 400 })
    }

    if (otp !== storedOtp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 })
    }

    // OTP verified
    otpStorage.delete(normalizedEmail)
    const data = { ...(formData || {}), email: normalizedEmail }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
    })

    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
        <div style="background-color: #29688A; color: white; padding: 20px; text-align: center;">
          <h1>New Stall Booking Enquiry</h1>
        </div>
        <div style="padding: 20px; background-color: #f9f9f9;">
          <h2 style="color: #29688A;">Enquiry Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding:8px; font-weight:bold;">Name:</td><td style="padding:8px;">${data.name || ""}</td></tr>
            <tr><td style="padding:8px; font-weight:bold;">Email:</td><td style="padding:8px;">${data.email || ""}</td></tr>
            <tr><td style="padding:8px; font-weight:bold;">Phone:</td><td style="padding:8px;">${data.phone || ""}</td></tr>
            <tr><td style="padding:8px; font-weight:bold;">Company:</td><td style="padding:8px;">${data.company || ""}</td></tr>
            <tr><td style="padding:8px; font-weight:bold;">Preferred Stall Size:</td><td style="padding:8px;">${data.stallSize || ""}</td></tr>
            <tr><td style="padding:8px; font-weight:bold;">Exhibition Interest:</td><td style="padding:8px;">${data.exhibition || ""}</td></tr>
            <tr><td style="padding:8px; font-weight:bold;">Message:</td><td style="padding:8px; white-space:pre-wrap;">${data.message || ""}</td></tr>
          </table>
        </div>
        <div style="background-color: #29688A; color: white; padding: 10px; text-align: center;">
          <p>Please follow up with the enquirer.</p>
        </div>
      </div>
    `

    const userEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
        <div style="background-color: #29688A; color: white; padding: 20px; text-align: center;">
          <h1>We Received Your Stall Booking Enquiry</h1>
        </div>
        <div style="padding: 20px;">
          <p>Dear ${data.name || "Applicant"},</p>
          <p>Thank you for contacting us. We've received your enquiry with the details below:</p>
          <div style="background-color: #f9f9f9; padding: 15px; margin: 20px 0; border-left: 4px solid #29688A;">
            <p><strong>Stall Size:</strong> ${data.stallSize || "-"}</p>
            <p><strong>Exhibition:</strong> ${data.exhibition || "-"}</p>
            <p><strong>Company:</strong> ${data.company || "-"}</p>
          </div>
          <p>Our team will get back to you within 2-3 business days.</p>
          <p>Best regards,<br/>Team</p>
        </div>
        <div style="background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #666;">
          <p>This is an automated email. Please do not reply to this message.</p>
        </div>
      </div>
    `

    const adminEmailPromise = transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Stall Booking Enquiry - ${data.name || data.email || ""}`,
      html: adminEmailHtml,
    })

    const userEmailPromise = transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: normalizedEmail,
      subject: "Stall Booking Enquiry Confirmation",
      html: userEmailHtml,
    })

    await Promise.all([adminEmailPromise, userEmailPromise])
    return NextResponse.json({ message: "Enquiry submitted successfully" })
  } catch (error) {
    console.error("[enquiry/verify-otp] Error:", error)
    return NextResponse.json({ error: "Failed to verify OTP" }, { status: 500 })
  }
}
