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
    const { email, phone, emailOtp, phoneOtp, formData } = await request.json()

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

    const {
      emailOtp: storedEmailOtp,
      smsOtp: storedSmsOtp,
      expiresAt,
      clientIP: storedIP,
      phone: storedPhone,
    } = storedOtpData

    const now = Date.now()

    if (storedIP !== clientIP) {
      // Do not block; IP can change legitimately
      console.log("[council/verify-otp] IP mismatch (continuing)")
    }

    if (now > expiresAt) {
      otpStorage.delete(normalizedEmail)
      return NextResponse.json({ error: "OTP has expired" }, { status: 400 })
    }

    if (phone !== storedPhone) {
      return NextResponse.json({ error: "Phone number validation failed" }, { status: 400 })
    }

    if (emailOtp !== storedEmailOtp) {
      return NextResponse.json({ error: "Invalid email OTP" }, { status: 400 })
    }

    if (phoneOtp !== storedSmsOtp) {
      return NextResponse.json({ error: "Invalid SMS OTP" }, { status: 400 })
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
          <h1>New Council Application Received</h1>
        </div>
        <div style="padding: 20px; background-color: #f9f9f9;">
          <h2 style="color: #29688A;">Application Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding:8px; font-weight:bold;">Name:</td><td style="padding:8px;">${data.firstName || ""} ${data.lastName || ""}</td></tr>
            <tr><td style="padding:8px; font-weight:bold;">Email:</td><td style="padding:8px;">${data.email || ""}</td></tr>
            <tr><td style="padding:8px; font-weight:bold;">Mobile:</td><td style="padding:8px;">${data.mobile || ""}</td></tr>
     
            <tr><td style="padding:8px; font-weight:bold;">Designation:</td><td style="padding:8px;">${data.designation || ""}</td></tr>
            <tr><td style="padding:8px; font-weight:bold;">Company:</td><td style="padding:8px;">${data.company || ""}</td></tr>
            <tr><td style="padding:8px; font-weight:bold;">Business Activity:</td><td style="padding:8px;">${data.businessActivity || ""}</td></tr>
            <tr><td style="padding:8px; font-weight:bold;">Business Sector:</td><td style="padding:8px;">${data.businessSector || ""}</td></tr>
            <tr><td style="padding:8px; font-weight:bold;">Business Interest:</td><td style="padding:8px; white-space:pre-wrap;">${data.businessInterest || ""}</td></tr>
            <tr><td style="padding:8px; font-weight:bold;">Products & Services:</td><td style="padding:8px; white-space:pre-wrap;">${data.products || ""}</td></tr>
            <tr><td style="padding:8px; font-weight:bold;">Address:</td><td style="padding:8px; white-space:pre-wrap;">${data.address || ""}</td></tr>
          </table>
        </div>
        <div style="background-color: #29688A; color: white; padding: 10px; text-align: center;">
          <p>Please review and follow up with the applicant.</p>
        </div>
      </div>
    `

    const userEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
        <div style="background-color: #29688A; color: white; padding: 20px; text-align: center;">
          <h1>Council Application Received Successfully</h1>
        </div>
        <div style="padding: 20px;">
          <p>Dear ${data.firstName || "Applicant"} ${data.lastName || ""},</p>
          <p>Thank you for submitting your council application. We've received your application with the following details:</p>
          <div style="background-color: #f9f9f9; padding: 15px; margin: 20px 0; border-left: 4px solid #29688A;">
            <p><strong>Company:</strong> ${data.company || "-"}</p>
            <p><strong>Designation:</strong> ${data.designation || "-"}</p>
            <p><strong>Business Sector:</strong> ${data.businessSector || "-"}</p>
            <p><strong>Business Activity:</strong> ${data.businessActivity || "-"}</p>
          </div>
          <p>Our council review team will evaluate your application and get back to you within 5-7 business days.</p>
          <p>If you have any questions, please don't hesitate to contact us.</p>
          <p>Best regards,<br/>Council Review Team</p>
        </div>
        <div style="background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #666;">
          <p>This is an automated email. Please do not reply to this message.</p>
        </div>
      </div>
    `

    const adminEmailPromise = transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Council Application - ${data.firstName || ""} ${data.lastName || ""} (${data.company || ""})`,
      html: adminEmailHtml,
    })

    const userEmailPromise = transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: normalizedEmail,
      subject: "Council Application Confirmation",
      html: userEmailHtml,
    })

    await Promise.all([adminEmailPromise, userEmailPromise])
    return NextResponse.json({
      success: true,
      message: "Council application submitted successfully",
    })
  } catch (error) {
    console.error("[council/verify-otp] Error:", error)
    return NextResponse.json({ error: "Failed to verify OTP and submit application" }, { status: 500 })
  }
}
