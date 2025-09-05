import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

if (!global.verificationTokens) global.verificationTokens = new Map()
const verificationTokens = global.verificationTokens

function getClientIP(request) {
  const forwarded = request.headers.get("x-forwarded-for")
  const realIP = request.headers.get("x-real-ip")
  const cfConnectingIP = request.headers.get("cf-connecting-ip")
  return cfConnectingIP || realIP || (forwarded && forwarded.split(",")[0]) || "unknown"
}

async function verifyRecaptcha(token) {
  if (!token) return false
  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    })
    const data = await response.json()
    return !!data.success
  } catch (e) {
    console.error("reCAPTCHA verification error:", e)
    return false
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { verificationToken, recaptchaToken, formData } = body || {}

    if (!verificationToken) {
      return NextResponse.json({ error: "Verification token is required" }, { status: 400 })
    }

    if (!formData) {
      return NextResponse.json({ error: "Form data is required" }, { status: 400 })
    }

    // Verify reCAPTCHA
    if (recaptchaToken) {
      const recaptchaValid = await verifyRecaptcha(recaptchaToken)
      if (!recaptchaValid) {
        return NextResponse.json({ error: "Invalid reCAPTCHA verification" }, { status: 400 })
      }
    }

    // Verify token
    const tokenData = verificationTokens.get(verificationToken)
    if (!tokenData) {
      return NextResponse.json({ error: "Invalid or expired verification token" }, { status: 400 })
    }

    const now = Date.now()
    if (now > tokenData.expiresAt) {
      verificationTokens.delete(verificationToken)
      return NextResponse.json({ error: "Verification token has expired. Please start over." }, { status: 400 })
    }

    // Optional: IP check
    const clientIP = getClientIP(request)
    if (tokenData.clientIP && clientIP && tokenData.clientIP !== clientIP) {
      console.log("Warning: Token created from IP", tokenData.clientIP, "but used from", clientIP)
    }

    // Send emails
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
    })

    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #29688A; color: white; padding: 20px; text-align: center;">
          <h1>New SME Consultant Application</h1>
        </div>
        <div style="padding: 20px; background-color: #f9f9f9;">
          <h2 style="color: #29688A;">Application Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 8px; font-weight: bold;">Consultant Name:</td>
              <td style="padding: 8px;">${formData?.consultantName || ""}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 8px; font-weight: bold;">Company Name:</td>
              <td style="padding: 8px;">${formData?.companyName || ""}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 8px; font-weight: bold;">Email:</td>
              <td style="padding: 8px;">${tokenData.email}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 8px; font-weight: bold;">Phone:</td>
              <td style="padding: 8px;">${formData?.phone || ""}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 8px; font-weight: bold;">Website:</td>
              <td style="padding: 8px;">${formData?.website || ""}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 8px; font-weight: bold;">Experience:</td>
              <td style="padding: 8px;">${formData?.experience || ""}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 8px; font-weight: bold;">Specialization:</td>
              <td style="padding: 8px;">${formData?.specialization?.join(", ") || ""}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 8px; font-weight: bold;">Qualifications:</td>
              <td style="padding: 8px;">${formData?.qualifications || ""}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 8px; font-weight: bold;">Services:</td>
              <td style="padding: 8px;">${formData?.services || ""}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 8px; font-weight: bold;">Message:</td>
              <td style="padding: 8px;">${formData?.message || ""}</td>
            </tr>
          </table>
        </div>
        <div style="background-color: #29688A; color: white; padding: 10px; text-align: center;">
          <p>Please review and process this SME Consultant application.</p>
        </div>
      </div>
    `

    const userEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #29688A; color: white; padding: 20px; text-align: center;">
          <h1>SME Consultant Application Received</h1>
        </div>
        <div style="padding: 20px;">
          <p>Dear ${formData?.consultantName || ""},</p>
          <p>Thank you for your interest in joining our SME Consultant Consortium. We have successfully received your application with the following details:</p>
          
          <div style="background-color: #f9f9f9; padding: 15px; margin: 20px 0; border-left: 4px solid #29688A;">
            <h3 style="color: #29688A; margin-top: 0;">Application Summary</h3>
            <p><strong>Company:</strong> ${formData?.companyName || "N/A"}</p>
            <p><strong>Experience:</strong> ${formData?.experience || ""}</p>
            <p><strong>Specialization:</strong> ${formData?.specialization?.slice(0, 3).join(", ") || ""}${formData?.specialization?.length > 3 ? "..." : ""}</p>
          </div>

          <p>Our team will review your SME Consultant application and get back to you within 2-3 business days. If you have any questions in the meantime, please don't hesitate to contact us at director@smechamber.com.</p>
          
          <p>Best regards,<br>The SME Chamber of India Team</p>
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
      subject: `New SME Consultant Application - ${formData?.consultantName || ""}`,
      html: adminEmailHtml,
    })

    // Send confirmation email to user
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: tokenData.email,
      subject: "SME Consultant Application Confirmation",
      html: userEmailHtml,
    })

    // Clear used verification token
    verificationTokens.delete(verificationToken)

    return NextResponse.json({ message: "Application submitted successfully" })
  } catch (error) {
    console.error("Error processing SME Consultant application:", error)
    return NextResponse.json({ error: "Failed to process application" }, { status: 500 })
  }
}
