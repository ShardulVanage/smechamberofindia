import {  NextResponse } from "next/server"
import nodemailer from "nodemailer"

if (!(global).otpStorage) {
  ;(global).otpStorage = new Map()
}
if (!(global).rateLimitStorage) {
  ;(global).rateLimitStorage = new Map()
}

const otpStorage = (global ).otpStorage
const rateLimitStorage = (global ).rateLimitStorage

const RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 minutes
const MAX_ATTEMPTS = 3

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

async function verifyRecaptcha(token){
  if (!token) return false

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    })

    const data = await response.json()
    return data.success
  } catch (error) {
    console.error("reCAPTCHA verification error:", error)
    return false
  }
}

export async function POST(request) {
  try {
    console.log(" Send OTP request received")
    const { email, mobile, recaptchaToken, isResend } = await request.json()
    console.log(" Email:", email, "IsResend:", isResend)

    const clientIP = request.ip || request.headers.get("x-forwarded-for") || "unknown"
    const rateLimitKey = `${clientIP}-${email}`
    const now = Date.now()

    const rateLimitData = rateLimitStorage.get(rateLimitKey)
    if (rateLimitData) {
      const { attempts, firstAttempt } = rateLimitData

      if (now - firstAttempt < RATE_LIMIT_WINDOW) {
        if (attempts >= MAX_ATTEMPTS) {
          return NextResponse.json(
            { error: "Too many OTP requests. Please try again after 15 minutes." },
            { status: 429 },
          )
        }
        rateLimitStorage.set(rateLimitKey, { attempts: attempts + 1, firstAttempt })
      } else {
        rateLimitStorage.set(rateLimitKey, { attempts: 1, firstAttempt: now })
      }
    } else {
      rateLimitStorage.set(rateLimitKey, { attempts: 1, firstAttempt: now })
    }

    if (!isResend && recaptchaToken) {
      const isValidRecaptcha = await verifyRecaptcha(recaptchaToken)
      if (!isValidRecaptcha) {
        return NextResponse.json({ error: "Invalid reCAPTCHA verification" }, { status: 400 })
      }
    }

    const otp = generateOTP()
    const otpData = {
      otp,
      email,
      mobile,
      createdAt: now,
      expiresAt: now + 3 * 60 * 1000, // 3 minutes
    }

    // Store OTP (this invalidates any previous OTP for this email)
    otpStorage.set(email, otpData)
    console.log(" OTP stored for email:", email, "OTP:", otp, "Expires at:", new Date(otpData.expiresAt))

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    const otpEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #29688A; color: white; padding: 20px; text-align: center;">
          <h1>Membership Application OTP</h1>
        </div>
        <div style="padding: 30px; text-align: center;">
          <h2 style="color: #29688A; margin-bottom: 20px;">Your Verification Code</h2>
          <div style="background-color: #f8f9fa; border: 2px dashed #29688A; padding: 20px; margin: 20px 0; border-radius: 8px;">
            <h1 style="color: #29688A; font-size: 36px; margin: 0; letter-spacing: 8px;">${otp}</h1>
          </div>
          <p style="color: #666; margin: 20px 0;">This OTP is valid for <strong>3 minutes</strong> only.</p>
          <p style="color: #666; font-size: 14px;">If you didn't request this OTP, please ignore this email.</p>
        </div>
        <div style="background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #666;">
          <p>This is an automated email. Please do not reply to this message.</p>
        </div>
      </div>
    `

    const emailPromise = transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Membership Application - OTP Verification",
      html: otpEmailHtml,
    })

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Email sending timeout")), 10000) // 10 second timeout
    })

    await Promise.race([emailPromise, timeoutPromise])
    console.log(" OTP email sent successfully to:", email)

    return NextResponse.json({
      message: "OTP sent successfully",
      expiresIn: 180, // 3 minutes in seconds
    })
  } catch (error) {
    console.error(" Error sending OTP:", error)
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 })
  }
}
