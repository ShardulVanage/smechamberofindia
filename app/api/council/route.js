import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

function normalizeEmail(email) {
  return String(email || "")
    .toLowerCase()
    .trim()
}

export async function POST(request) {
  try {
    const formData = await request.json()

    // Validate required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "designation",
      "company",
      "businessActivity",
      "businessSector",
      "businessInterest",
      "products",
      "mobile",
      "email",
      "address",
    ]

    for (const field of requiredFields) {
      if (!formData[field] || !String(formData[field]).trim()) {
        return NextResponse.json(
          {
            error: `Missing required field: ${field}`,
          },
          { status: 400 },
        )
      }
    }

    // Validate email format
    const normalizedEmail = normalizeEmail(formData.email)
    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      return NextResponse.json(
        {
          error: "Invalid email format",
        },
        { status: 400 },
      )
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    const data = { ...formData, email: normalizedEmail }

    // Admin notification email
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
        <div style="background-color: #29688A; color: white; padding: 20px; text-align: center;">
          <h1>New Council Application (Direct Submission)</h1>
        </div>
        <div style="padding: 20px; background-color: #f9f9f9;">
          <h2 style="color: #29688A;">Application Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding:8px; font-weight:bold;">Name:</td><td style="padding:8px;">${data.firstName} ${data.lastName}</td></tr>
            <tr><td style="padding:8px; font-weight:bold;">Email:</td><td style="padding:8px;">${data.email}</td></tr>
            <tr><td style="padding:8px; font-weight:bold;">Mobile:</td><td style="padding:8px;">${data.mobile}</td></tr>
           
            <tr><td style="padding:8px; font-weight:bold;">Designation:</td><td style="padding:8px;">${data.designation}</td></tr>
            <tr><td style="padding:8px; font-weight:bold;">Company:</td><td style="padding:8px;">${data.company}</td></tr>
            <tr><td style="padding:8px; font-weight:bold;">Business Activity:</td><td style="padding:8px;">${data.businessActivity}</td></tr>
            <tr><td style="padding:8px; font-weight:bold;">Business Sector:</td><td style="padding:8px;">${data.businessSector}</td></tr>
            <tr><td style="padding:8px; font-weight:bold;">Business Interest:</td><td style="padding:8px; white-space:pre-wrap;">${data.businessInterest}</td></tr>
            <tr><td style="padding:8px; font-weight:bold;">Products & Services:</td><td style="padding:8px; white-space:pre-wrap;">${data.products}</td></tr>
            <tr><td style="padding:8px; font-weight:bold;">Address:</td><td style="padding:8px; white-space:pre-wrap;">${data.address}</td></tr>
          </table>
          <div style="margin-top: 15px; padding: 10px; background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 4px;">
            <p style="margin: 0; color: #856404;"><strong>Note:</strong> This application was submitted without OTP verification.</p>
          </div>
        </div>
        <div style="background-color: #29688A; color: white; padding: 10px; text-align: center;">
          <p>Please review and follow up with the applicant.</p>
        </div>
      </div>
    `

    // User confirmation email
    const userEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
        <div style="background-color: #29688A; color: white; padding: 20px; text-align: center;">
          <h1>Council Application Submitted</h1>
        </div>
        <div style="padding: 20px;">
          <p>Dear ${data.firstName} ${data.lastName},</p>
          <p>Thank you for submitting your council application. We've received your application with the following details:</p>
          <div style="background-color: #f9f9f9; padding: 15px; margin: 20px 0; border-left: 4px solid #29688A;">
            <p><strong>Company:</strong> ${data.company}</p>
            <p><strong>Designation:</strong> ${data.designation}</p>
            <p><strong>Business Sector:</strong> ${data.businessSector}</p>
            <p><strong>Business Activity:</strong> ${data.businessActivity}</p>
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

    // Send emails
    const adminEmailPromise = transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `Council Application - ${data.firstName} ${data.lastName} (${data.company})`,
      html: adminEmailHtml,
    })

    const userEmailPromise = transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: normalizedEmail,
      subject: "Council Application Received",
      html: userEmailHtml,
    })

    await Promise.all([adminEmailPromise, userEmailPromise])

    return NextResponse.json({
      success: true,
      message: "Council application submitted successfully",
    })
  } catch (error) {
    console.error("[council] Error:", error)
    return NextResponse.json(
      {
        error: "Failed to submit council application",
      },
      { status: 500 },
    )
  }
}
