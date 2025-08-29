import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

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
  } catch (error) {
    console.error("[enquiry] reCAPTCHA error:", error)
    return false
  }
}

export async function POST(request) {
  try {
    const formData = await request.json()

    if (formData?.recaptchaToken) {
      const ok = await verifyRecaptcha(formData.recaptchaToken)
      if (!ok) return NextResponse.json({ error: "Invalid reCAPTCHA verification" }, { status: 400 })
    }

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
            <tr><td style="padding:8px; font-weight:bold;">Name:</td><td style="padding:8px;">${formData.name || ""}</td></tr>
            <tr><td style="padding:8px; font-weight:bold;">Email:</td><td style="padding:8px;">${formData.email || ""}</td></tr>
            <tr><td style="padding:8px; font-weight:bold;">Phone:</td><td style="padding:8px;">${formData.phone || ""}</td></tr>
            <tr><td style="padding:8px; font-weight:bold;">Company:</td><td style="padding:8px;">${formData.company || ""}</td></tr>
            <tr><td style="padding:8px; font-weight:bold;">Preferred Stall Size:</td><td style="padding:8px;">${formData.stallSize || ""}</td></tr>
            <tr><td style="padding:8px; font-weight:bold;">Exhibition Interest:</td><td style="padding:8px;">${formData.exhibition || ""}</td></tr>
            <tr><td style="padding:8px; font-weight:bold;">Message:</td><td style="padding:8px; white-space:pre-wrap;">${formData.message || ""}</td></tr>
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
          <p>Dear ${formData.name || "Applicant"},</p>
          <p>Thank you for contacting us. We've received your enquiry with the details below:</p>
          <div style="background-color: #f9f9f9; padding: 15px; margin: 20px 0; border-left: 4px solid #29688A;">
            <p><strong>Stall Size:</strong> ${formData.stallSize || "-"}</p>
            <p><strong>Exhibition:</strong> ${formData.exhibition || "-"}</p>
            <p><strong>Company:</strong> ${formData.company || "-"}</p>
          </div>
          <p>Our team will get back to you within 2-3 business days.</p>
          <p>Best regards,<br/>Team</p>
        </div>
        <div style="background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #666;">
          <p>This is an automated email. Please do not reply to this message.</p>
        </div>
      </div>
    `

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Stall Booking Enquiry - ${formData.name || formData.email || ""}`,
      html: adminEmailHtml,
    })

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: formData.email,
      subject: "Stall Booking Enquiry Confirmation",
      html: userEmailHtml,
    })

    return NextResponse.json({ message: "Enquiry submitted successfully" })
  } catch (error) {
    console.error("[enquiry] Error processing enquiry:", error)
    return NextResponse.json({ error: "Failed to process enquiry" }, { status: 500 })
  }
}
