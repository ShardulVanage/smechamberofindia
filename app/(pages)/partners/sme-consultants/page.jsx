"use client"

import dynamic from "next/dynamic"
import { useEffect, useRef, useState } from "react"
import "react-phone-number-input/style.css"
import PhoneInput from "react-phone-number-input"

// Dynamically import react-google-recaptcha to avoid SSR issues
const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"), { ssr: false })

export default function SMEConsultantPage() {
  const [formData, setFormData] = useState({
    consultantName: "",
    companyName: "",
    email: "",
    phone: "",
    website: "",
    experience: "",
    specialization: [],
    qualifications: "",
    services: "",
    message: "",
  })

  const consultingAreas = [
    "Business Process and Transformation",
    "Preparation of effective business plans",
    "Business & Financial Risk Mitigations",
    "General and Life Insurance",
    "IT and ITes services",
    "Statutory compliances",
    "Enterprise management",
    "Legal services",
    "Project management consultancy",
    "Human Resource management",
    "Training & educational services",
    "Branding and Promotions",
    "Customs & excise",
    "GST",
    "Exhibition Support Services",
    "Investment advisory Services",
    "Finance and Accounts",
    "Capital Market Access",
    "Securitization",
    "Market Research",
    "International Trade",
    "3-D printing & design",
    "EPC Consulting",
    "Structural and Design Consulting",
    "Environmental consultancy",
    "Security and safety",
    "Energy conservation",
    "Telecom management",
    "Printing & publishing",
  ]

  const [step, setStep] = useState("form")
  const [recaptchaToken, setRecaptchaToken] = useState(null)
  const [emailOtp, setEmailOtp] = useState("")
  const [smsOtp, setSmsOtp] = useState("")
  const [otpExpiresIn, setOtpExpiresIn] = useState(0)
  const [resendCooldown, setResendCooldown] = useState(0)
  const [verificationToken, setVerificationToken] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [validationErrors, setValidationErrors] = useState({})

  const recaptchaRef = useRef(null)
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

  useEffect(() => {
    if (otpExpiresIn <= 0) return
    const t = setInterval(() => setOtpExpiresIn((s) => (s > 0 ? s - 1 : 0)), 1000)
    return () => clearInterval(t)
  }, [otpExpiresIn])

  useEffect(() => {
    if (resendCooldown <= 0) return
    const t = setInterval(() => setResendCooldown((s) => (s > 0 ? s - 1 : 0)), 1000)
    return () => clearInterval(t)
  }, [resendCooldown])

  function handleInputChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (validationErrors[e.target.name]) {
      setValidationErrors((prev) => ({ ...prev, [e.target.name]: "" }))
    }
  }

  function handlePhoneChange(value) {
    setFormData((prev) => ({ ...prev, phone: value || "" }))
    if (validationErrors.phone) {
      setValidationErrors((prev) => ({ ...prev, phone: "" }))
    }
  }

  function handleSpecializationChange(area) {
    const updated = formData.specialization.includes(area)
      ? formData.specialization.filter((a) => a !== area)
      : [...formData.specialization, area]
    setFormData((prev) => ({ ...prev, specialization: updated }))
    if (validationErrors.specialization) {
      setValidationErrors((prev) => ({ ...prev, specialization: "" }))
    }
  }

  function normalizeEmail(email) {
    return email.toLowerCase().trim()
  }

  function validateForm() {
    const errors = {}
    const requiredFields = [
      { key: "consultantName", label: "Consultant Name" },
      { key: "email", label: "Email" },
      { key: "phone", label: "Phone" },
      { key: "experience", label: "Years of Experience" },
      { key: "qualifications", label: "Qualifications" },
      { key: "services", label: "Services Offered" },
    ]

    requiredFields.forEach(({ key, label }) => {
      const value = formData[key]
      if (!value || (typeof value === "string" && value.trim() === "")) {
        errors[key] = `${label} is required`
      }
    })

    if (formData.specialization.length === 0) {
      errors.specialization = "Select at least one specialization"
    }

    if (formData.email && formData.email.trim() !== "") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email.trim())) {
        errors.email = "Please enter a valid email address"
      }
    }

    if (formData.phone && formData.phone.trim() !== "") {
      if (!formData.phone.startsWith("+") || formData.phone.length < 10) {
        errors.phone = "Please enter a valid phone number with country code"
      }
    }

    return errors
  }

  async function executeRecaptcha() {
    try {
      if (recaptchaRef.current && typeof recaptchaRef.current.execute === "function") {
        const token = await recaptchaRef.current.executeAsync()
        return token
      }
      return recaptchaToken
    } catch {
      return recaptchaToken
    }
  }

  async function handleSendOtp(isResend = false) {
    try {
      setError(null)

      if (!isResend) {
        const errors = validateForm()
        if (Object.keys(errors).length > 0) {
          setValidationErrors(errors)
          setError("Please fill in all required fields correctly")
          return
        }
        setValidationErrors({})
      }

      setLoading(true)

      let token = recaptchaToken
      if (!isResend) {
        token = await executeRecaptcha()
        setRecaptchaToken(token || null)
      }

      const res = await fetch("/api/consultant/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: normalizeEmail(formData.email),
          mobile: formData.phone,
          recaptchaToken: token,
          isResend,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Failed to send OTP")

      setEmailOtp("")
      setSmsOtp("")
      setStep("otp")
      setOtpExpiresIn(data?.expiresIn ?? 180)
      setResendCooldown(30)
    } catch (e) {
      setError(e.message || "Could not send OTP. Please try again.")
    } finally {
      setLoading(false)
      if (recaptchaRef.current && typeof recaptchaRef.current.reset === "function") {
        recaptchaRef.current.reset()
      }
      setRecaptchaToken(null)
    }
  }

  async function handleVerifyOtp() {
    try {
      setError(null)
      setLoading(true)

      const res = await fetch("/api/consultant/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: normalizeEmail(formData.email),
          emailOtp,
          smsOtp,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Failed to verify OTP")

      setVerificationToken(data.token)
      setStep("submitting")

      const token = await executeRecaptcha()
      setRecaptchaToken(token || null)

      const submitRes = await fetch("/api/consultant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          verificationToken: data.token,
          recaptchaToken: token,
          formData,
        }),
      })

      const submitData = await submitRes.json()
      if (!submitRes.ok) throw new Error(submitData?.error || "Submission failed")

      setStep("done")
    } catch (e) {
      setError(e.message || "Verification or submission failed")
      setStep("otp")
    } finally {
      setLoading(false)
      if (recaptchaRef.current && typeof recaptchaRef.current.reset === "function") {
        recaptchaRef.current.reset()
      }
      setRecaptchaToken(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <div className="relative bg-gradient-to-r from-[#29688A] to-[#1e4a63] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">SME Consultant</h1>
          <p className="text-xl md:text-2xl opacity-90 font-light">Join Our Consortium of Business Advisors</p>
          <div className="mt-8 w-24 h-1 bg-white/30 mx-auto rounded-full"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-100">
              <h2 className="text-3xl font-bold text-[#29688A] mb-6 flex items-center">
                <div className="w-2 h-8 bg-gradient-to-b from-[#29688A] to-[#1e4a63] rounded-full mr-4"></div>
                SME Consultant Consortium
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                SME Chamber of India has initiated consortium for SME consultants and business advisors to provide their
                advisory services and consultancy to SMEs from manufacturing, service industry, allied industries and
                start-ups companies for business growth, improvement of knowledge, transformation & transition of SMEs,
                business & finance management system, marketing & sales, business process ecosystem, enhance
                capabilities & capacities, focus on productivity and quality improvement.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-100">
              <h3 className="text-2xl font-bold text-[#29688A] mb-8 flex items-center">
                <div className="w-2 h-6 bg-gradient-to-b from-[#29688A] to-[#1e4a63] rounded-full mr-4"></div>
                Opportunities for SME Consultants
              </h3>
              <div className="grid sm:grid-cols-1 gap-4">
                {[
                  [
                    "Consultancy to SMEs for business growth & expansion/diversification",
                    "Listing in SME consultant directory of Chamber",
                    "Business leads and referral from SME sectors",
                    "Connectivity with the potential SMEs",
                    "Mentoring and interactive sessions",
                    "Monthly and annual contracts with SMEs",
                    "Suggestions and information for business transformation",
                    "Assistance for quality productivity and improvement of services",
                    "Support to SMEs for innovation & inventions",
                    "Resolving issues and problems related to industrial sectors",
                    "Full page advertisement in SME Connect Magazine",
                    "Logo and link with SME Chamber website",
                    "Sharing articles about business advisory services",
                    "Support for market development and expansion",
                    "Exploring business consultancy for SMEs from manufacturing & service sector",
                    "Participation in round table discussions and debates",
                    "Free participation in appropriate events",
                    "Opportunity to be the member of expert committee and jury",
                  ],
                ].map((opportunity, index) => (
                  <div
                    key={index}
                    className="group flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200"
                  >
                    <div className="w-3 h-3 bg-gradient-to-r from-[#29688A] to-[#1e4a63] rounded-full mt-1.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200"></div>
                    <span className="text-gray-700 leading-relaxed">{opportunity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-100">
              <h3 className="text-2xl font-bold text-[#29688A] mb-8 flex items-center">
                <div className="w-2 h-6 bg-gradient-to-b from-[#29688A] to-[#1e4a63] rounded-full mr-4"></div>
                Consulting Areas
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {consultingAreas.map((area, index) => (
                  <div
                    key={index}
                    className="group flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200"
                  >
                    <div className="w-2.5 h-2.5 bg-gradient-to-r from-[#29688A] to-[#1e4a63] rounded-full mt-2 flex-shrink-0 group-hover:scale-110 transition-transform duration-200"></div>
                    <span className="text-gray-700 text-sm leading-relaxed">{area}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8 bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-[#29688A] mb-2">Join as SME Consultant</h3>
                <div className="w-16 h-1 bg-gradient-to-r from-[#29688A] to-[#1e4a63] mx-auto rounded-full"></div>
              </div>

              {error && (
                <div className="mb-4 rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-700">{error}</div>
              )}

              {step === "form" && (
                <form
                  className="space-y-6"
                  noValidate
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSendOtp(false)
                  }}
                >
                  <div className="space-y-4">
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Consultant Name *</label>
                      <input
                        type="text"
                        name="consultantName"
                        required
                        value={formData.consultantName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#29688A]/10 ${
                          validationErrors.consultantName
                            ? "border-red-300 focus:border-red-500"
                            : "border-gray-200 focus:border-[#29688A]"
                        }`}
                      />
                      {validationErrors.consultantName && (
                        <p className="mt-1 text-sm text-red-600">{validationErrors.consultantName}</p>
                      )}
                    </div>

                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Company/Firm Name</label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#29688A] focus:ring-4 focus:ring-[#29688A]/10 transition-all duration-200 group-hover:border-gray-300"
                      />
                    </div>

                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#29688A]/10 ${
                          validationErrors.email
                            ? "border-red-300 focus:border-red-500"
                            : "border-gray-200 focus:border-[#29688A]"
                        }`}
                      />
                      {validationErrors.email && <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>}
                    </div>

                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone *</label>
                      <PhoneInput
                        international
                        countryCallingCodeEditable={false}
                        defaultCountry="IN"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#29688A]/10  ${
                          validationErrors.phone
                            ? "border-red-300 focus:border-red-500"
                            : "border-gray-200 focus:border-[#29688A]"
                        }`}
                        style={{
                          "--PhoneInputCountryFlag-height": "1em",
                          "--PhoneInputCountrySelectArrow-color": "#6b7280",
                        }}
                      />
                      {validationErrors.phone && <p className="mt-1 text-sm text-red-600">{validationErrors.phone}</p>}
                    </div>

                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Website</label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#29688A] focus:ring-4 focus:ring-[#29688A]/10 transition-all duration-200 group-hover:border-gray-300"
                      />
                    </div>

                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Years of Experience *</label>
                      <select
                        name="experience"
                        required
                        value={formData.experience}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#29688A]/10 ${
                          validationErrors.experience
                            ? "border-red-300 focus:border-red-500"
                            : "border-gray-200 focus:border-[#29688A]"
                        }`}
                      >
                        <option value="">Select Experience</option>
                        <option value="1-3">1-3 years</option>
                        <option value="4-7">4-7 years</option>
                        <option value="8-15">8-15 years</option>
                        <option value="15+">15+ years</option>
                      </select>
                      {validationErrors.experience && (
                        <p className="mt-1 text-sm text-red-600">{validationErrors.experience}</p>
                      )}
                    </div>

                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Areas of Specialization * (Select multiple)
                      </label>
                      <div
                        className={`max-h-48 overflow-y-auto border-2 rounded-xl p-4 transition-all duration-200 ${
                          validationErrors.specialization ? "border-red-300" : "border-gray-200"
                        } bg-gray-50 group-hover:border-gray-300`}
                      >
                        {consultingAreas.slice(0, 10).map((area, index) => (
                          <label
                            key={index}
                            className="flex items-center space-x-3 py-2 hover:bg-white rounded-lg px-2 transition-all duration-150 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={formData.specialization.includes(area)}
                              onChange={() => handleSpecializationChange(area)}
                              className="w-4 h-4 text-[#29688A] border-2 border-gray-300 rounded focus:ring-[#29688A] focus:ring-2"
                            />
                            <span className="text-sm text-gray-700">{area}</span>
                          </label>
                        ))}
                      </div>
                      {validationErrors.specialization && (
                        <p className="mt-1 text-sm text-red-600">{validationErrors.specialization}</p>
                      )}
                    </div>

                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Qualifications *</label>
                      <textarea
                        name="qualifications"
                        required
                        rows={3}
                        value={formData.qualifications}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#29688A]/10 resize-none ${
                          validationErrors.qualifications
                            ? "border-red-300 focus:border-red-500"
                            : "border-gray-200 focus:border-[#29688A]"
                        }`}
                        placeholder="Your educational and professional qualifications..."
                      ></textarea>
                      {validationErrors.qualifications && (
                        <p className="mt-1 text-sm text-red-600">{validationErrors.qualifications}</p>
                      )}
                    </div>

                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Services Offered *</label>
                      <textarea
                        name="services"
                        required
                        rows={3}
                        value={formData.services}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#29688A]/10 resize-none ${
                          validationErrors.services
                            ? "border-red-300 focus:border-red-500"
                            : "border-gray-200 focus:border-[#29688A]"
                        }`}
                        placeholder="Describe your consulting services and expertise..."
                      ></textarea>
                      {validationErrors.services && (
                        <p className="mt-1 text-sm text-red-600">{validationErrors.services}</p>
                      )}
                    </div>

                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Message</label>
                      <textarea
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#29688A] focus:ring-4 focus:ring-[#29688A]/10 transition-all duration-200 group-hover:border-gray-300 resize-none"
                        placeholder="Any additional information..."
                      ></textarea>
                    </div>
                  </div>

                  {siteKey ? (
                    <div className="mt-2">
                      <ReCAPTCHA ref={recaptchaRef} sitekey={siteKey} onChange={(token) => setRecaptchaToken(token)} />
                    </div>
                  ) : (
                    <p className="text-sm text-amber-600">Missing reCAPTCHA site key.</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-[#29688A] to-[#1e4a63] text-white py-4 px-6 rounded-xl hover:from-[#1e4a63] hover:to-[#29688A] transition-all duration-300 font-semibold text-lg shadow-lg disabled:opacity-50"
                  >
                    {loading ? "Sending OTP..." : "Send OTP"}
                  </button>
                </form>
              )}

              {step === "otp" && (
                <form
                  className="space-y-4"
                  noValidate
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleVerifyOtp()
                  }}
                >
                  <p className="text-gray-700">We sent verification codes to:</p>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>
                      📧 <span className="font-semibold">{formData.email}</span>
                    </div>
                    <div>
                      📱 <span className="font-semibold">{formData.phone}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Email OTP</label>
                      <input
                        type="text"
                        maxLength={6}
                        inputMode="numeric"
                        placeholder="Enter email OTP"
                        value={emailOtp}
                        onChange={(e) => setEmailOtp(e.target.value.replace(/[^0-9]/g, ""))}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#29688A] focus:ring-4 focus:ring-[#29688A]/10 tracking-widest text-center"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">SMS OTP</label>
                      <input
                        type="text"
                        maxLength={6}
                        inputMode="numeric"
                        placeholder="Enter SMS OTP"
                        value={smsOtp}
                        onChange={(e) => setSmsOtp(e.target.value.replace(/[^0-9]/g, ""))}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#29688A] focus:ring-4 focus:ring-[#29688A]/10 tracking-widest text-center"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Expires in: {otpExpiresIn}s</span>
                    <button
                      type="button"
                      disabled={resendCooldown > 0 || loading}
                      onClick={() => handleSendOtp(true)}
                      className="text-[#29688A] font-semibold disabled:opacity-50"
                    >
                      {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend OTP"}
                    </button>
                  </div>

                  {siteKey ? (
                    <div className="mt-2">
                      <ReCAPTCHA ref={recaptchaRef} sitekey={siteKey} onChange={(token) => setRecaptchaToken(token)} />
                    </div>
                  ) : null}

                  <button
                    type="submit"
                    disabled={loading || emailOtp.length !== 6 || smsOtp.length !== 6}
                    className="w-full bg-gradient-to-r from-[#29688A] to-[#1e4a63] text-white py-3 px-6 rounded-xl hover:from-[#1e4a63] hover:to-[#29688A] transition-all font-semibold shadow-lg disabled:opacity-50"
                  >
                    {loading ? "Verifying..." : "Verify & Submit"}
                  </button>
                </form>
              )}

              {step === "submitting" && (
                <div className="py-6 text-center">
                  <p className="text-gray-700">Submitting your application...</p>
                </div>
              )}

              {step === "done" && (
                <div className="py-6 text-center">
                  <h4 className="text-lg font-semibold text-[#29688A] mb-2">Application submitted successfully!</h4>
                  <p className="text-gray-700">We will get back to you within 2-3 business days.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  )
}
