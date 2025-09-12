"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Mail, Phone, Shield, CheckCircle } from "lucide-react"
import PhoneInput from "react-phone-number-input"
import "react-phone-number-input/style.css"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

function ContactFormWithOTP() {
  const [step, setStep] = useState(1) // 1: Form, 2: OTP Verification, 3: Success
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [countdown, setCountdown] = useState(0)
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false)
  const [recaptchaToken, setRecaptchaToken] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    designation: "",
    companyName: "",
    businessInterest: "",
    email: "",
    contactDetail: "",
    address: "",
    message: "",
  })

  const [otpData, setOtpData] = useState({
    emailOtp: "",
    smsOtp: "",
  })

  useEffect(() => {
    // Add reCAPTCHA callback to window
    window.onRecaptchaLoad = () => {
      console.log("[v0] reCAPTCHA loaded successfully")
      setRecaptchaLoaded(true)
    }

    const script = document.createElement("script")
    script.src = "https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit"
    script.async = true
    script.defer = true
    document.head.appendChild(script)

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
      delete window.onRecaptchaLoad
    }
  }, [])

  useEffect(() => {
    if (recaptchaLoaded && window.grecaptcha && step === 1) {
      try {
        // Clear any existing reCAPTCHA
        const recaptchaContainer = document.getElementById("recaptcha-container")
        if (recaptchaContainer) {
          recaptchaContainer.innerHTML = ""

          window.grecaptcha.render("recaptcha-container", {
            sitekey: "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI",
            callback: (token) => {
              console.log("[v0] reCAPTCHA token received:", token.substring(0, 20) + "...")
              setRecaptchaToken(token)
            },
            "expired-callback": () => {
              console.log("[v0] reCAPTCHA expired")
              setRecaptchaToken("")
            },
          })
        }
      } catch (error) {
        console.error("[v0] reCAPTCHA render error:", error)
      }
    }
  }, [recaptchaLoaded, step])

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError("")
  }

  const handleOtpChange = (field, value) => {
    setOtpData((prev) => ({ ...prev, [field]: value }))
    setError("")
  }

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.designation ||
      !formData.companyName ||
      !formData.businessInterest ||
      !formData.email ||
      !formData.contactDetail ||
      !formData.address ||
      !formData.message
    ) {
      setError("Please fill in all required fields")
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address")
      return false
    }

    if (!formData.contactDetail || formData.contactDetail.length < 10) {
      setError("Please enter a valid phone number")
      return false
    }

    return true
  }

  const handleSendOTP = async (isResend = false) => {
    if (!isResend && !validateForm()) return

    if (!isResend && !recaptchaToken) {
      setError("Please complete the reCAPTCHA verification")
      return
    }

    setLoading(true)
    setError("")

    try {
      console.log("[v0] Sending OTP request:", {
        email: formData.email,
        mobile: formData.contactDetail,
        isResend,
        hasRecaptcha: !!recaptchaToken,
      })

      const response = await fetch("/api/contact/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          mobile: formData.contactDetail,
          recaptchaToken: isResend ? null : recaptchaToken,
          isResend,
        }),
      })

      const data = await response.json()
      console.log("[v0] OTP response:", { status: response.status, data })

      if (!response.ok) {
        throw new Error(data.error || "Failed to send OTP")
      }

      setStep(2)
      setCountdown(180) // 3 minutes
      setSuccess("OTPs sent successfully to your email and phone!")

      // Reset reCAPTCHA for next use
      if (window.grecaptcha) {
        window.grecaptcha.reset()
        setRecaptchaToken("")
      }
    } catch (err) {
      console.error("[v0] OTP send error:", err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = async () => {
    if (!otpData.emailOtp || !otpData.smsOtp) {
      setError("Please enter both email and SMS OTPs")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/contact/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          mobile: formData.contactDetail,
          emailOtp: otpData.emailOtp,
          smsOtp: otpData.smsOtp,
          formData,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to verify OTP")
      }

      setStep(3)
      setSuccess("Contact form submitted successfully! We'll get back to you soon.")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const renderStep1 = () => (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleSendOTP()
      }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            required
            className="focus:ring-2 focus:ring-[#29688A] focus:border-[#29688A]"
          />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Select onValueChange={(value) => handleInputChange("title", value)}>
            <SelectTrigger className="focus:ring-2 focus:ring-[#29688A] focus:border-[#29688A] w-full">
              <SelectValue placeholder="Select title" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mr">Mr</SelectItem>
              <SelectItem value="mrs">Mrs</SelectItem>
              <SelectItem value="miss">Miss</SelectItem>
              <SelectItem value="ms">Ms</SelectItem>
              <SelectItem value="dr">Dr</SelectItem>
              <SelectItem value="prof">Prof</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Designation */}
        <div className="space-y-2">
          <Label htmlFor="designation">Designation *</Label>
          <Input
            id="designation"
            value={formData.designation}
            onChange={(e) => handleInputChange("designation", e.target.value)}
            required
            className="focus:ring-2 focus:ring-[#29688A] focus:border-[#29688A]"
          />
        </div>

        {/* Company Name */}
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name *</Label>
          <Input
            id="companyName"
            value={formData.companyName}
            onChange={(e) => handleInputChange("companyName", e.target.value)}
            required
            className="focus:ring-2 focus:ring-[#29688A] focus:border-[#29688A]"
          />
        </div>

        {/* Business Interest */}
        <div className="space-y-2">
          <Label htmlFor="businessInterest">Business Interest *</Label>
          <Select onValueChange={(value) => handleInputChange("businessInterest", value)}>
            <SelectTrigger className="focus:ring-2 focus:ring-[#29688A] focus:border-[#29688A] w-full">
              <SelectValue placeholder="Select business interest" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="event-alert">Event Alert</SelectItem>
              <SelectItem value="membership">Membership</SelectItem>
              <SelectItem value="sme-consultant">SME Consultant</SelectItem>
              <SelectItem value="channel-partner">Channel Partner</SelectItem>
              <SelectItem value="speaking-opportunity">Speaking Opportunity</SelectItem>
              <SelectItem value="sponsorship">Sponsorship</SelectItem>
              <SelectItem value="partnership">Partnership</SelectItem>
              <SelectItem value="others">Others</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            required
            className="focus:ring-2 focus:ring-[#29688A] focus:border-[#29688A]"
          />
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <Label htmlFor="contactDetail">Phone Number *</Label>
          <PhoneInput
            international
            countryCallingCodeEditable={false}
            defaultCountry="IN"
            value={formData.contactDetail}
            onChange={(value) => handleInputChange("contactDetail", value || "")}
            className="phone-input-custom"
            style={{
              "--PhoneInputCountryFlag-height": "1em",
              "--PhoneInputCountrySelectArrow-color": "#6b7280",
              "--PhoneInput-color--focus": "#29688A",
            }}
          />
        </div>

        {/* Address */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address">Address *</Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            required
            className="focus:ring-2 focus:ring-[#29688A] focus:border-[#29688A]"
          />
        </div>

        {/* Message */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="message">Message *</Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) => handleInputChange("message", e.target.value)}
            required
            rows={4}
            className="focus:ring-2 focus:ring-[#29688A] focus:border-[#29688A]"
          />
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div id="recaptcha-container" />
      </div>

      <motion.div className="text-center" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          type="submit"
          size="lg"
          disabled={loading}
          className="px-8 py-3 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          style={{ backgroundColor: "#29688A" }}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending OTP...
            </>
          ) : (
            <>
              <Shield className="mr-2 h-4 w-4" />
              Send Verification Code
            </>
          )}
        </Button>
      </motion.div>
    </form>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-[#29688A] mb-2">Verify Your Identity</h3>
        <p className="text-gray-600 mb-4">
          We've sent verification codes to your email and phone number. Please enter them below.
        </p>
        {countdown > 0 && (
          <p className="text-sm text-gray-500">
            Codes expire in {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, "0")}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="emailOtp" className="flex items-center">
            <Mail className="mr-2 h-4 w-4" />
            Email OTP *
          </Label>
          <Input
            id="emailOtp"
            placeholder="Enter 6-digit code"
            value={otpData.emailOtp}
            onChange={(e) => handleOtpChange("emailOtp", e.target.value)}
            maxLength={6}
            className="focus:ring-2 focus:ring-[#29688A] focus:border-[#29688A] text-center text-lg tracking-widest"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="smsOtp" className="flex items-center">
            <Phone className="mr-2 h-4 w-4" />
            SMS OTP *
          </Label>
          <Input
            id="smsOtp"
            placeholder="Enter 6-digit code"
            value={otpData.smsOtp}
            onChange={(e) => handleOtpChange("smsOtp", e.target.value)}
            maxLength={6}
            className="focus:ring-2 focus:ring-[#29688A] focus:border-[#29688A] text-center text-lg tracking-widest"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          variant="outline"
          onClick={() => handleSendOTP(true)}
          disabled={loading || countdown > 120}
          className="border-[#29688A] text-[#29688A] hover:bg-[#29688A] hover:text-white"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Resending...
            </>
          ) : (
            "Resend OTP"
          )}
        </Button>

        <Button
          onClick={handleVerifyOTP}
          disabled={loading}
          className="px-8 py-3 text-white font-semibold"
          style={{ backgroundColor: "#29688A" }}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Verify & Submit
            </>
          )}
        </Button>
      </div>

      <div className="text-center">
        <Button variant="ghost" onClick={() => setStep(1)} className="text-gray-500 hover:text-[#29688A]">
          ← Back to form
        </Button>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="text-center space-y-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center"
      >
        <CheckCircle className="h-8 w-8 text-green-600" />
      </motion.div>

      <div>
        <h3 className="text-2xl font-bold text-[#29688A] mb-2">Thank You!</h3>
        <p className="text-gray-600 mb-4">
          Your contact form has been submitted successfully. We'll get back to you within 24-48 hours.
        </p>
        <p className="text-sm text-gray-500">A confirmation email has been sent to {formData.email}</p>
      </div>

      <Button
        onClick={() => {
          setStep(1)
          setFormData({
            name: "",
            title: "",
            designation: "",
            companyName: "",
            businessInterest: "",
            email: "",
            contactDetail: "",
            address: "",
            message: "",
          })
          setOtpData({ emailOtp: "", smsOtp: "" })
          setError("")
          setSuccess("")
        }}
        variant="outline"
        className="border-[#29688A] text-[#29688A] hover:bg-[#29688A] hover:text-white"
      >
        Submit Another Form
      </Button>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <style jsx global>{`
        .phone-input-custom .PhoneInputInput {
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          line-height: 1.25rem;
          transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        }
        .phone-input-custom .PhoneInputInput:focus {
          outline: none;
          border-color: #29688A;
          box-shadow: 0 0 0 2px rgba(41, 104, 138, 0.2);
        }
        .phone-input-custom .PhoneInputCountrySelect {
          border: 1px solid #d1d5db;
          border-radius: 0.375rem 0 0 0.375rem;
          border-right: none;
        }
        .phone-input-custom .PhoneInputCountrySelect:focus {
          border-color: #29688A;
          box-shadow: 0 0 0 2px rgba(41, 104, 138, 0.2);
        }
      `}</style>

      <motion.div variants={fadeInUp} initial="initial" animate="animate">
        <Card className="max-w-4xl mx-auto border-2 hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-2xl text-center" style={{ color: "#29688A" }}>
              {step === 1 && "Get In Touch"}
              {step === 2 && "Verify Your Identity"}
              {step === 3 && "Submission Complete"}
            </CardTitle>

            {/* Progress indicator */}
            <div className="flex justify-center mt-4">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= 1 ? "bg-[#29688A] text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  1
                </div>
                <div className={`w-8 h-1 ${step >= 2 ? "bg-[#29688A]" : "bg-gray-200"}`} />
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= 2 ? "bg-[#29688A] text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  2
                </div>
                <div className={`w-8 h-1 ${step >= 3 ? "bg-[#29688A]" : "bg-gray-200"}`} />
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= 3 ? "bg-[#29688A] text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  3
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {error && (
              <Alert className="mb-6 border-red-200 bg-red-50">
                <AlertDescription className="text-red-700">{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-6 border-green-200 bg-green-50">
                <AlertDescription className="text-green-700">{success}</AlertDescription>
              </Alert>
            )}

            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default ContactFormWithOTP
