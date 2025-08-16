"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, CheckCircle, XCircle, Clock } from "lucide-react"

export default function MembershipForm({ membershipType }) {
  const [notification, setNotification] = useState({ type: null, message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false)
  const [showOtpStep, setShowOtpStep] = useState(false)
  const [otp, setOtp] = useState("")
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false)
  const [canResendOtp, setCanResendOtp] = useState(false)
  const [resendTimer, setResendTimer] = useState(60)
  const [otpExpireTimer, setOtpExpireTimer] = useState(180) // 3 minutes
  const [isResendingOtp, setIsResendingOtp] = useState(false)

  const [formData, setFormData] = useState({
    companyName: "",
    firstName: "",
    lastName: "",
    designation: "",
    businessActivity: "",
    turnover: "",
    email: "",
    mobile: "",
    city: "",
    state: "",
    country: "",
    interestedFor: "",
  })

  const showNotification = (type, message) => {
    setNotification({ type, message })
    setTimeout(() => {
      setNotification({ type: null, message: "" })
    }, 5000)
  }

  useEffect(() => {
    let resendInterval
    let expireInterval

    if (showOtpStep && !canResendOtp && resendTimer > 0) {
      resendInterval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            setCanResendOtp(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    if (showOtpStep && otpExpireTimer > 0) {
      expireInterval = setInterval(() => {
        setOtpExpireTimer((prev) => {
          if (prev <= 1) {
            showNotification("error", "OTP has expired. Please request a new one.")
            setCanResendOtp(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (resendInterval) clearInterval(resendInterval)
      if (expireInterval) clearInterval(expireInterval)
    }
  }, [showOtpStep, canResendOtp, resendTimer, otpExpireTimer])

  const getMembershipCategories = () => {
    if (membershipType === "indian") {
      return [
        "MSME - Micro Enterprises",
        "MSME - Small Enterprises",
        "MSME - Medium Enterprises",
        "Large Enterprises",
        "Startup Category",
        "Elite Business Group (CMD, CEO, Director, MD, CFO & Presidents)",
      ]
    } else {
      return [
        "SME International",
        "Multinational Corporations",
        "Trading Companies",
        "Investment Firms",
        "Global Partnerships",
        "Elite Business Group (CMD, CEO, Director, MD, CFO & Presidents)",
      ]
    }
  }

  const recaptchaRef = useRef(null)
  const recaptchaWidgetId = useRef(null)

  useEffect(() => {
    const loadRecaptcha = () => {
      if (window.grecaptcha) {
        setRecaptchaLoaded(true)
        return
      }

      const script = document.createElement("script")
      script.src = "https://www.google.com/recaptcha/api.js"
      script.async = true
      script.defer = true
      script.onload = () => setRecaptchaLoaded(true)
      document.head.appendChild(script)
    }

    loadRecaptcha()
  }, [])

  useEffect(() => {
    if (!showOtpStep && recaptchaLoaded && window.grecaptcha && recaptchaRef.current) {
      // Clean up existing widget if it exists
      if (recaptchaWidgetId.current !== null) {
        try {
          window.grecaptcha.reset(recaptchaWidgetId.current)
        } catch (error) {
          console.log("[v0] Error resetting reCAPTCHA:", error)
        }
      }

      // Small delay to ensure DOM is ready and previous cleanup is complete
      setTimeout(() => {
        try {
          // Check if the container is empty before rendering
          if (recaptchaRef.current && recaptchaRef.current.innerHTML === "") {
            recaptchaWidgetId.current = window.grecaptcha.render(recaptchaRef.current, {
              sitekey: "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI",
            })
          }
        } catch (error) {
          console.log("[v0] Error rendering reCAPTCHA:", error)
          // Clear the container and try again
          if (recaptchaRef.current) {
            recaptchaRef.current.innerHTML = ""
            recaptchaWidgetId.current = window.grecaptcha.render(recaptchaRef.current, {
              sitekey: "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI",
            })
          }
        }
      }, 100)
    }

    // Cleanup function
    return () => {
      if (recaptchaWidgetId.current !== null && window.grecaptcha) {
        try {
          window.grecaptcha.reset(recaptchaWidgetId.current)
        } catch (error) {
          console.log("[v0] Error in cleanup:", error)
        }
      }
    }
  }, [showOtpStep, recaptchaLoaded])

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (notification.type) {
      setNotification({ type: null, message: "" })
    }
  }

  const validateForm = () => {
    const requiredFields = [
      "companyName",
      "firstName",
      "lastName",
      "designation",
      "businessActivity",
      "turnover",
      "email",
      "mobile",
      "city",
      "state",
      "country",
      "interestedFor",
    ]

    for (const field of requiredFields) {
      if (!formData[field].trim()) {
        showNotification(
          "error",
          `${field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())} is required`,
        )
        return false
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      showNotification("error", "Please enter a valid email address")
      return false
    }

    const mobileRegex = /^\d{10}$/
    if (!mobileRegex.test(formData.mobile)) {
      showNotification("error", "Please enter a valid 10-digit mobile number")
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    if (recaptchaLoaded && window.grecaptcha) {
      const recaptchaResponse =
        recaptchaWidgetId.current !== null
          ? window.grecaptcha.getResponse(recaptchaWidgetId.current)
          : window.grecaptcha.getResponse()

      if (!recaptchaResponse) {
        showNotification("error", "Please complete the reCAPTCHA verification")
        return
      }
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/membership/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          mobile: formData.mobile,
          recaptchaToken:
            recaptchaLoaded && window.grecaptcha
              ? recaptchaWidgetId.current !== null
                ? window.grecaptcha.getResponse(recaptchaWidgetId.current)
                : window.grecaptcha.getResponse()
              : null,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setShowOtpStep(true)
        setResendTimer(60)
        setOtpExpireTimer(180)
        setCanResendOtp(false)
        setOtp("")
        showNotification("success", "OTP sent successfully to your email and mobile number.")
      } else {
        showNotification("error", data.error || "Failed to send OTP. Please try again.")
      }
    } catch (error) {
      showNotification("error", "Failed to send OTP. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleOtpVerification = async (e) => {
    e.preventDefault()

    if (!otp.trim()) {
      showNotification("error", "Please enter the OTP")
      return
    }

    if (otp.length !== 6) {
      showNotification("error", "Please enter a valid 6-digit OTP")
      return
    }

    setIsVerifyingOtp(true)

    try {
      const response = await fetch("/api/membership/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          otp: otp,
          formData: {
            ...formData,
            membershipType,
          },
        }),
      })

      const data = await response.json()

      if (response.ok) {
        showNotification(
          "success",
          "Your membership application has been submitted successfully. You will receive a confirmation email shortly.",
        )

        // Reset form
        setFormData({
          companyName: "",
          firstName: "",
          lastName: "",
          designation: "",
          businessActivity: "",
          turnover: "",
          email: "",
          mobile: "",
          city: "",
          state: "",
          country: "",
          interestedFor: "",
        })
        setOtp("")
        setShowOtpStep(false)

        if (recaptchaLoaded && window.grecaptcha && recaptchaWidgetId.current !== null) {
          try {
            window.grecaptcha.reset(recaptchaWidgetId.current)
          } catch (error) {
            console.log("[v0] Error resetting reCAPTCHA after success:", error)
          }
        }
      } else {
        showNotification("error", data.error || "Invalid OTP. Please try again.")
      }
    } catch (error) {
      showNotification("error", "Failed to verify OTP. Please try again.")
    } finally {
      setIsVerifyingOtp(false)
    }
  }

  const handleResendOtp = async () => {
    setIsResendingOtp(true)

    try {
      const response = await fetch("/api/membership/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          mobile: formData.mobile,
          isResend: true,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setResendTimer(60)
        setOtpExpireTimer(180)
        setCanResendOtp(false)
        setOtp("")
        showNotification("success", "New OTP sent successfully.")
      } else {
        showNotification("error", data.error || "Failed to resend OTP. Please try again.")
      }
    } catch (error) {
      showNotification("error", "Failed to resend OTP. Please try again.")
    } finally {
      setIsResendingOtp(false)
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#29688A] mb-2">
          Apply for {membershipType === "indian" ? "Indian Company" : "Overseas"} Membership
        </h2>
        <p className="text-sm text-gray-600">Fields marked with a * are required.</p>
      </div>

      {notification.type && (
        <div
          className={`mb-6 p-4 rounded-lg border flex items-center gap-3 ${
            notification.type === "success"
              ? "bg-green-50 border-green-200 text-green-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle className="w-5 h-5 text-green-600" />
          ) : (
            <XCircle className="w-5 h-5 text-red-600" />
          )}
          <p className="text-sm font-medium">{notification.message}</p>
        </div>
      )}

      {!showOtpStep ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="companyName">Company Name *</Label>
            <Input
              id="companyName"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={(e) => handleInputChange("companyName", e.target.value)}
              className="mt-1"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="designation">Designation *</Label>
            <Input
              id="designation"
              placeholder="Designation"
              value={formData.designation}
              onChange={(e) => handleInputChange("designation", e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="businessActivity">Business Activity *</Label>
            <Input
              id="businessActivity"
              placeholder="Business Activity"
              value={formData.businessActivity}
              onChange={(e) => handleInputChange("businessActivity", e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="turnover">Turnover in Crore *</Label>
            <Input
              id="turnover"
              placeholder="Turnover in Crore"
              value={formData.turnover}
              onChange={(e) => handleInputChange("turnover", e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="mobile">Mobile Number *</Label>
            <Input
              id="mobile"
              placeholder="10 digit Mobile Number"
              value={formData.mobile}
              onChange={(e) => handleInputChange("mobile", e.target.value)}
              className="mt-1"
              maxLength={10}
            />
          </div>

          <div>
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              placeholder="City"
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="state">State / Province *</Label>
            <Input
              id="state"
              placeholder="State / Province"
              value={formData.state}
              onChange={(e) => handleInputChange("state", e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="country">Country *</Label>
            <Input
              id="country"
              placeholder="Country"
              value={formData.country}
              onChange={(e) => handleInputChange("country", e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="interestedFor">Interested for *</Label>
            <Select value={formData.interestedFor} onValueChange={(value) => handleInputChange("interestedFor", value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select membership category" />
              </SelectTrigger>
              <SelectContent>
                {getMembershipCategories().map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {recaptchaLoaded && (
            <div className="flex justify-center">
              <div ref={recaptchaRef}></div>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-[#29688A] hover:bg-[#29688A]/90 text-white py-3 mt-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending OTP...
              </>
            ) : (
              "Send OTP"
            )}
          </Button>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-[#29688A] mb-2">OTP Verification</h3>
            <p className="text-sm text-gray-600 mb-4">
              We've sent a 6-digit OTP to your email ({formData.email})
              {/* and mobile number ({formData.mobile}) */}
            </p>
            <div className="flex items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-1 text-orange-600">
                <Clock className="w-4 h-4" />
                <span>Expires in: {formatTime(otpExpireTimer)}</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleOtpVerification} className="space-y-4">
            <div>
              <Label htmlFor="otp">Enter 6-digit OTP *</Label>
              <Input
                id="otp"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                  if (notification.type) {
                    setNotification({ type: null, message: "" })
                  }
                }}
                className="mt-1 text-center text-lg tracking-widest"
                maxLength={6}
              />
            </div>

            <div className="flex gap-3">
              <Button
                type="submit"
                className="flex-1 bg-[#29688A] hover:bg-[#29688A]/90 text-white py-3"
                disabled={isVerifyingOtp || otpExpireTimer === 0}
              >
                {isVerifyingOtp ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify & Submit"
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={handleResendOtp}
                disabled={!canResendOtp || isResendingOtp}
                className="px-6 bg-transparent"
              >
                {isResendingOtp ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : canResendOtp ? (
                  "Resend OTP"
                ) : (
                  `Resend in ${resendTimer}s`
                )}
              </Button>
            </div>
          </form>

          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setShowOtpStep(false)
              setOtp("")
              setNotification({ type: null, message: "" })
              if (recaptchaRef.current) {
                recaptchaRef.current.innerHTML = ""
                recaptchaWidgetId.current = null
              }
            }}
            className="w-full text-gray-600 hover:text-gray-800"
          >
            ← Back to Form
          </Button>
        </div>
      )}
    </div>
  )
}
