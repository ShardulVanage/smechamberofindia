import {NextResponse } from "next/server"
import nodemailer from "nodemailer"

const globalObj = global 
if (!globalObj.otpStorage) {
  globalObj.otpStorage = new Map()
}

const otpStorage = globalObj.otpStorage

export async function POST(request) {
  try {
    console.log(" Verify OTP request received")
    const { email, otp, formData } = await request.json()
    console.log(" Verifying OTP for email:", email, "Provided OTP:", otp)

    const storedOtpData = otpStorage.get(email)
    console.log(" Stored OTP data:", storedOtpData)

    if (!storedOtpData) {
      console.log(" No OTP found for email:", email)
      return NextResponse.json({ error: "OTP not found or expired" }, { status: 400 })
    }

    const { otp: storedOtp, expiresAt } = storedOtpData
    const now = Date.now()

    console.log(" Stored OTP:", storedOtp, "Current time:", now, "Expires at:", expiresAt)

    if (now > expiresAt) {
      console.log(" OTP expired for email:", email)
      otpStorage.delete(email)
      return NextResponse.json({ error: "OTP has expired" }, { status: 400 })
    }

    if (otp !== storedOtp) {
      console.log(" Invalid OTP provided. Expected:", storedOtp, "Got:", otp)
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 })
    }

    console.log(" OTP verified successfully, deleting from storage")
    otpStorage.delete(email)

    // Create transporter for sending emails
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #29688A; color: white; padding: 20px; text-align: center;">
          <h1>New ${formData.membershipType === "indian" ? "Indian Company" : "Overseas Company"} Membership Application</h1>
        </div>
        <div style="padding: 20px; background-color: #f9f9f9;">
          <h2 style="color: #29688A;">Application Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 8px; font-weight: bold;">Membership Type:</td>
              <td style="padding: 8px;">${formData.membershipType === "indian" ? "Indian Company" : "Overseas Company"}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 8px; font-weight: bold;">Company Name:</td>
              <td style="padding: 8px;">${formData.companyName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 8px; font-weight: bold;">Name:</td>
              <td style="padding: 8px;">${formData.firstName} ${formData.lastName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 8px; font-weight: bold;">Designation:</td>
              <td style="padding: 8px;">${formData.designation}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 8px; font-weight: bold;">Business Activity:</td>
              <td style="padding: 8px;">${formData.businessActivity}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 8px; font-weight: bold;">Email:</td>
              <td style="padding: 8px;">${formData.email}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 8px; font-weight: bold;">Mobile:</td>
              <td style="padding: 8px;">${formData.mobile}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 8px; font-weight: bold;">Turnover:</td>
              <td style="padding: 8px;">${formData.turnover} Crore</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 8px; font-weight: bold;">Interested Category:</td>
              <td style="padding: 8px;">${formData.interestedFor}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 8px; font-weight: bold;">Location:</td>
              <td style="padding: 8px;">${formData.city}, ${formData.state}, ${formData.country}</td>
            </tr>
          </table>
        </div>
        <div style="background-color: #29688A; color: white; padding: 10px; text-align: center;">
          <p>Please review and process this ${formData.membershipType === "indian" ? "Indian Company" : "Overseas Company"} membership application.</p>
        </div>
      </div>
    `

    const userEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #29688A; color: white; padding: 20px; text-align: center;">
          <h1>${formData.membershipType === "indian" ? "Indian Company" : "Overseas Company"} Membership Application Received</h1>
        </div>
        <div style="padding: 20px;">
          <p>Dear ${formData.firstName} ${formData.lastName},</p>
          <p>Thank you for your interest in joining our ${formData.membershipType === "indian" ? "Indian Company" : "Overseas Company"} membership program. We have successfully received your application with the following details:</p>
          
          <div style="background-color: #f9f9f9; padding: 15px; margin: 20px 0; border-left: 4px solid #29688A;">
            <h3 style="color: #29688A; margin-top: 0;">Application Summary</h3>
            <p><strong>Membership Type:</strong> ${formData.membershipType === "indian" ? "Indian Company" : "Overseas Company"}</p>
            <p><strong>Company:</strong> ${formData.companyName}</p>
            <p><strong>Category:</strong> ${formData.interestedFor}</p>
            <p><strong>Business Activity:</strong> ${formData.businessActivity}</p>
            <p><strong>Location:</strong> ${formData.city}, ${formData.state}, ${formData.country}</p>
          </div>

          <p>Our team will review your ${formData.membershipType === "indian" ? "Indian Company" : "Overseas Company"} membership application and get back to you within 2-3 business days. If you have any questions in the meantime, please don't hesitate to contact us.</p>
          
          <p>Best regards,<br>The Membership Team</p>
        </div>
        <div style="background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #666;">
          <p>This is an automated email. Please do not reply to this message.</p>
        </div>
      </div>
    `

    // Send email to admin
    const adminEmailPromise = transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New ${formData.membershipType === "indian" ? "Indian Company" : "Overseas Company"} Membership Application - ${formData.companyName}`,
      html: adminEmailHtml,
    })

    // Send confirmation email to user
    const userEmailPromise = transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: formData.email,
      subject: `${formData.membershipType === "indian" ? "Indian Company" : "Overseas Company"} Membership Application Confirmation`,
      html: userEmailHtml,
    })

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Email sending timeout")), 15000) // 15 second timeout
    })

    await Promise.race([Promise.all([adminEmailPromise, userEmailPromise]), timeoutPromise])

    console.log(" Application emails sent successfully")
    return NextResponse.json({ message: "Application submitted successfully" })
  } catch (error) {
    console.error(" Error verifying OTP:", error)
    return NextResponse.json({ error: "Failed to verify OTP" }, { status: 500 })
  }
}
