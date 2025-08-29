"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Phone, Mail, Send, CheckCircle, Loader2, Clock } from "lucide-react"

export default function EnquiryForStallBooking() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    stallSize: "",
    exhibition: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showOtpStep, setShowOtpStep] = useState(false)
  const [otp, setOtp] = useState("")
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false)
  const [isResendingOtp, setIsResendingOtp] = useState(false)
  const [canResendOtp, setCanResendOtp] = useState(false)
  const [resendTimer, setResendTimer] = useState(60)
  const [otpExpireTimer, setOtpExpireTimer] = useState(180)
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false)
  const recaptchaRef = useRef(null)
  const recaptchaWidgetId = useRef(null)

  useEffect(() => {
    const loadRecaptcha = () => {
      if ((window ).grecaptcha) {
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
    const grecaptcha = (window ).grecaptcha
    if (!showOtpStep && recaptchaLoaded && grecaptcha && recaptchaRef.current) {
      if (recaptchaWidgetId.current !== null) {
        try {
          grecaptcha.reset(recaptchaWidgetId.current)
        } catch {}
      }
      setTimeout(() => {
        try {
          if (recaptchaRef.current && recaptchaRef.current.innerHTML === "") {
            recaptchaWidgetId.current = grecaptcha.render(recaptchaRef.current, {
              sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
            })
          }
        } catch {
          if (recaptchaRef.current) {
            recaptchaRef.current.innerHTML = ""
            recaptchaWidgetId.current = grecaptcha.render(recaptchaRef.current, {
              sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
            })
          }
        }
      }, 100)
    }

    return () => {
      const grecaptcha = (window).grecaptcha
      if (recaptchaWidgetId.current !== null && grecaptcha) {
        try {
          grecaptcha.reset(recaptchaWidgetId.current)
        } catch {}
      }
    }
  }, [showOtpStep, recaptchaLoaded])

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
            setError("OTP has expired. Please request a new one.")
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

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!formData.name?.trim() || !formData.email?.trim() || !formData.phone?.trim()) {
      setError("Name, Email, and Phone are required.")
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.")
      return
    }
    const mobileDigits = (formData.phone || "").replace(/\D/g, "")
    if (mobileDigits.length < 10) {
      setError("Please enter a valid 10-digit mobile number.")
      return
    }

    const grecaptcha = (window ).grecaptcha
    let recaptchaToken = null
    if (recaptchaLoaded && grecaptcha) {
      recaptchaToken =
        recaptchaWidgetId.current !== null
          ? grecaptcha.getResponse(recaptchaWidgetId.current)
          : grecaptcha.getResponse()
      if (!recaptchaToken) {
        setError("Please complete the reCAPTCHA verification.")
        return
      }
    }

    setIsLoading(true)
    try {
      const res = await fetch("/api/enquiry/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          mobile: mobileDigits,
          recaptchaToken,
        }),
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.error || "Failed to send OTP. Please try again.")
      }

      setShowOtpStep(true)
      setResendTimer(60)
      setOtpExpireTimer(180)
      setCanResendOtp(false)
      setOtp("")
    } catch (err) {
      setError(err?.message || "Failed to send OTP. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleOtpVerification = async (e) => {
    e.preventDefault()
    setError("")

    if (!otp.trim() || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.")
      return
    }

    setIsVerifyingOtp(true)
    try {
      const res = await fetch("/api/enquiry/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          otp,
          formData: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            company: formData.company,
            stallSize: formData.stallSize,
            exhibition: formData.exhibition,
            message: formData.message,
          },
        }),
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.error || "Invalid OTP. Please try again.")
      }

      setIsSubmitted(true)
      setShowOtpStep(false)
      setOtp("")
      const grecaptcha = (window).grecaptcha
      if (recaptchaLoaded && grecaptcha && recaptchaWidgetId.current !== null) {
        try {
          grecaptcha.reset(recaptchaWidgetId.current)
        } catch {}
      }

      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          stallSize: "",
          exhibition: "",
          message: "",
        })
      }, 3000)
    } catch (err) {
      setError(err?.message || "Failed to verify OTP. Please try again.")
    } finally {
      setIsVerifyingOtp(false)
    }
  }

  const handleResendOtp = async () => {
    setError("")
    setIsResendingOtp(true)
    try {
      const res = await fetch("/api/enquiry/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          mobile: (formData.phone || "").replace(/\D/g, ""),
          isResend: true,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data?.error || "Failed to resend OTP. Please try again.")
      }
      setResendTimer(60)
      setOtpExpireTimer(180)
      setCanResendOtp(false)
      setOtp("")
    } catch (err) {
      setError(err?.message || "Failed to resend OTP. Please try again.")
    } finally {
      setIsResendingOtp(false)
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.div
        className="bg-gradient-to-r from-[#29688A] to-[#1e4a5f] text-white py-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Enquiry for Stall Booking</h1>
          <p className="text-xl md:text-2xl mb-2 opacity-90">Exhibitions supported by SME Chamber of India</p>
          <p className="text-lg md:text-xl font-semibold text-yellow-300">Reserve your stall at Discounted Rate!</p>
        </div>
      </motion.div>

      <motion.div
        className="max-w-6xl mx-auto px-4 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-[#29688A] mb-6">Contact Information</h2>
              <p className="text-gray-600 mb-8">
                Please connect with us for further details about stall booking and exhibition opportunities.
              </p>

              <div className="space-y-6">
                <motion.div
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-[#29688A] p-3 rounded-full">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Mobile No.</p>
                    <a href="tel:022-69511120" className="text-[#29688A] hover:underline text-lg font-medium">
                      022 - 69511120
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-[#29688A] p-3 rounded-full">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Email</p>
                    <a
                      href="mailto:director@smechamberofindia.in"
                      className="text-[#29688A] hover:underline text-lg font-medium"
                    >
                      director@smechamberofindia.in
                    </a>
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="mt-8 p-6 bg-gradient-to-r from-[#29688A]/10 to-[#1e4a5f]/10 rounded-lg border-l-4 border-[#29688A]"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <p className="text-gray-700 font-medium text-center">
                  Don't miss this chance to make your brand stand out.
                  <span className="text-[#29688A] font-bold"> Book your stall now</span> and make your presence count!
                </p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-[#29688A] mb-6">Send Your Enquiry</h2>

              {isSubmitted ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Thank You!</h3>
                  <p className="text-gray-600">
                    Your enquiry has been submitted successfully. We'll get back to you soon.
                  </p>
                </motion.div>
              ) : !showOtpStep ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#29688A] focus:border-transparent transition-all duration-200"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#29688A] focus:border-transparent transition-all duration-200"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#29688A] focus:border-transparent transition-all duration-200"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#29688A] focus:border-transparent transition-all duration-200"
                        placeholder="Enter your company name"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Stall Size</label>
                      <select
                        name="stallSize"
                        value={formData.stallSize}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#29688A] focus:border-transparent transition-all duration-200"
                      >
                        <option value="">Select stall size</option>
                        <option value="3x3">3x3 meters</option>
                        <option value="3x6">3x6 meters</option>
                        <option value="6x6">6x6 meters</option>
                        <option value="6x9">6x9 meters</option>
                        <option value="custom">Custom Size</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Exhibition Interest</label>
                      <input
                        type="text"
                        name="exhibition"
                        value={formData.exhibition}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#29688A] focus:border-transparent transition-all duration-200"
                        placeholder="Which exhibition are you interested in?"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#29688A] focus:border-transparent transition-all duration-200"
                      placeholder="Tell us more about your requirements..."
                      required
                    />
                  </div>

                  {recaptchaLoaded && (
                    <div className="flex justify-center">
                      <div ref={recaptchaRef}></div>
                    </div>
                  )}

                  {error ? (
                    <p className="text-red-600 text-sm" role="alert">
                      {error}
                    </p>
                  ) : null}

                  <motion.button
                    type="submit"
                    className="w-full bg-[#29688A] text-white py-4 px-6 rounded-lg font-semibold text-lg flex items-center justify-center space-x-2 hover:bg-[#1e4a5f] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                    disabled={isLoading}
                  >
                    {isLoading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Send className="w-5 h-5" />}
                    <span>{isLoading ? "Sending OTP..." : "Send OTP"}</span>
                  </motion.button>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 className="text-lg font-semibold text-[#29688A] mb-2">OTP Verification</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      We've sent a 6-digit OTP to your email ({formData.email})
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
                      <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                        Enter 6-digit OTP *
                      </label>
                      <input
                        id="otp"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#29688A] focus:border-transparent transition-all duration-200 text-center text-lg tracking-widest"
                        maxLength={6}
                      />
                    </div>

                    {error ? (
                      <p className="text-red-600 text-sm" role="alert">
                        {error}
                      </p>
                    ) : null}

                    <div className="flex gap-3">
                      <button
                        type="submit"
                        className="flex-1 bg-[#29688A] hover:bg-[#1e4a5f] text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                        disabled={isVerifyingOtp || otpExpireTimer === 0}
                      >
                        {isVerifyingOtp ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Verifying...
                          </>
                        ) : (
                          "Verify & Submit"
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={!canResendOtp || isResendingOtp}
                        className="px-6 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition disabled:opacity-60"
                      >
                        {isResendingOtp ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : canResendOtp ? (
                          "Resend OTP"
                        ) : (
                          `Resend in ${resendTimer}s`
                        )}
                      </button>
                    </div>
                  </form>

                  <button
                    type="button"
                    onClick={() => {
                      setShowOtpStep(false)
                      setOtp("")
                      setError("")
                      if (recaptchaRef.current) {
                        recaptchaRef.current.innerHTML = ""
                        recaptchaWidgetId.current = null
                      }
                    }}
                    className="w-full text-gray-600 hover:text-gray-800 text-sm"
                  >
                    ← Back to Form
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
