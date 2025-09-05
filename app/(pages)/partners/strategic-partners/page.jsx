"use client"
import dynamic from "next/dynamic"
import { useEffect, useRef, useState } from "react"
import "react-phone-number-input/style.css"
import PhoneInput from "react-phone-number-input"

// Dynamically import react-google-recaptcha to avoid SSR issues
const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"), { ssr: false })

const fetcher = (url) => fetch(url).then((r) => r.json())

export default function StrategicPartnersPage() {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    designation: "",
    companyName: "",
    businessActivity: "",
    businessSector: "",
    businessInterest: "",
    productsServices: "",
    smeBusinessSectors: "",
    contactDetail: "",
    email: "",
    address: "",
  })

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

  // Countdown timers
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
    // Clear validation error for this field when user starts typing
    if (validationErrors[e.target.name]) {
      setValidationErrors((prev) => ({ ...prev, [e.target.name]: "" }))
    }
  }

  function handlePhoneChange(value) {
    setFormData((prev) => ({ ...prev, contactDetail: value || "" }))
    // Clear validation error for phone field when user starts typing
    if (validationErrors.contactDetail) {
      setValidationErrors((prev) => ({ ...prev, contactDetail: "" }))
    }
  }

  function normalizeEmail(email) {
    return email.toLowerCase().trim()
  }

  function validateForm() {
    const errors = {}
    const requiredFields = [
      { key: "name", label: "Name" },
      { key: "designation", label: "Designation" },
      { key: "companyName", label: "Company Name" },
      { key: "businessActivity", label: "Business Activity" },
      { key: "businessSector", label: "Business Sector" },
      { key: "businessInterest", label: "Business Interest" },
      { key: "productsServices", label: "Products & Services" },
      { key: "smeBusinessSectors", label: "Business Sectors of SMEs" },
      { key: "contactDetail", label: "Contact Detail" },
      { key: "email", label: "Email" },
      { key: "address", label: "Address" },
    ]

    // Check required fields
    requiredFields.forEach(({ key, label }) => {
      if (!formData[key] || formData[key].trim() === "") {
        errors[key] = `${label} is required`
      }
    })

    // Email validation
    if (formData.email && formData.email.trim() !== "") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email.trim())) {
        errors.email = "Please enter a valid email address"
      }
    }

    // Phone validation (basic check for numbers)
    if (formData.contactDetail && formData.contactDetail.trim() !== "") {
      if (formData.contactDetail.length < 10) {
        errors.contactDetail = "Please enter a valid phone number"
      }
    }

    return errors
  }

  async function executeRecaptcha() {
    try {
      // Prefer executing explicitly for v2 invisible; for checkbox we read from onChange
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

      // Validate form only for initial submission, not resend
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
        setRecaptchaToken(token)
      }

      const res = await fetch("/api/strategic/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: normalizeEmail(formData.email),
          mobile: formData.contactDetail,
          recaptchaToken: token,
          isResend,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data?.error || "Failed to send OTP")
      }

      setEmailOtp("")
      setSmsOtp("")
      setStep("otp")
      setOtpExpiresIn(data?.expiresIn ?? 180)
      setResendCooldown(30)
    } catch (e) {
      setError(e.message || "Could not send OTP. Please try again.")
    } finally {
      setLoading(false)
      // Reset the checkbox if used
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

      const res = await fetch("/api/strategic/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: normalizeEmail(formData.email),
          emailOtp,
          smsOtp,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data?.error || "Failed to verify OTP")
      }

      setVerificationToken(data.token)
      setStep("submitting")

      // Execute reCAPTCHA again for the final submission
      const token = await executeRecaptcha()
      setRecaptchaToken(token)

      const submitRes = await fetch("/api/strategic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          verificationToken: data.token,
          recaptchaToken: token,
          formData,
        }),
      })

      const submitData = await submitRes.json()
      if (!submitRes.ok) {
        throw new Error(submitData?.error || "Submission failed")
      }

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
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Strategic Partners</h1>
          <p className="text-xl md:text-2xl opacity-90 font-light">Explore Emerging Business Opportunities</p>
          <div className="mt-8 w-24 h-1 bg-white/30 mx-auto rounded-full"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-100">
              <h2 className="text-3xl font-bold text-[#29688A] mb-6 text-center flex items-center justify-center">
                <div className="w-2 h-8 bg-gradient-to-b from-[#29688A] to-[#1e4a63] rounded-full mr-4"></div>
                Opportunity to be the Strategic Partner
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg text-center">
                SME Chamber of India invites proposals to register as a strategic partner from the corporates, financial
                institutions, MNCs, mid corporates, SMEs, manufacturers, exporters, importers and service providers for
                the business growth and expansion to enrol as the strategic business partners to promote, brand and
                market their products and services for the advantages of SMEs and manufacturing industries.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-100">
              <h3 className="text-2xl font-bold text-[#29688A] mb-8 text-center flex items-center justify-center">
                <div className="w-2 h-6 bg-gradient-to-b from-[#29688A] to-[#1e4a63] rounded-full mr-4"></div>
                Advantages & Opportunities of Strategic Partnership
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Connect with potential SMEs and manufacturing industries",
                  "Generate business leads, referrals and inquiries",
                  "Establish contacts with potential buyers and suppliers",
                  "Identify strategic & channel partners for franchise",
                  "Establish alliance for contract manufacturing, JV",
                  "Brand and market through premium members database",
                  "Branding through SME Connect Magazine",
                  "Logo branding on website",
                  "Brand & market at various events",
                  "Logo branding on backdrop and social media",
                  "Exclusive interactive sessions with CEOs",
                  "Promote unique business ideas and innovations",
                  "Research & market survey opportunities",
                  "Participation in round table discussions",
                  "Identifying distributors and franchisers",
                  "Social media and business events branding",
                ].map((advantage, index) => (
                  <div
                    key={index}
                    className="group flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200"
                  >
                    <div className="w-3 h-3 bg-gradient-to-r from-[#29688A] to-[#1e4a63] rounded-full mt-1.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200"></div>
                    <span className="text-gray-700 leading-relaxed">{advantage}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-100">
              <h3 className="text-2xl font-bold text-[#29688A] mb-8 text-center flex items-center justify-center">
                <div className="w-2 h-6 bg-gradient-to-b from-[#29688A] to-[#1e4a63] rounded-full mr-4"></div>
                Who Can Become a Strategic Partner?
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "Manufacturing companies & Industrial Service providers",
                  "Financial Institutions (PSBs, private & foreign banks, NBFCs)",
                  "All kinds of Service Industries and Outsourcing services",
                  "IT & IT Enabled services",
                  "Digital Media & digital support services",
                  "Automobiles and Industrial automation services",
                  "HR Services (Recruitment, Training)",
                  "Waste Management, Water Treatment",
                  "Business Consulting Firms",
                  "Insurance and insurance service providers",
                  "Rental Services (Industrial Machineries, Equipment)",
                  "Investment Bankers, financial consultants",
                  "Telecommunication, IT services",
                  "Project Management Consultancy",
                  "Logistics, Warehousing & transportation",
                  "Hospitality, FMCG, retail, Healthcare",
                  "Industrial parks, SEZs, Realty Sector",
                  "Capital goods manufacturers and suppliers",
                  "Media & Communication",
                  "Legal and Business Advisory Services",
                ].map((type, index) => (
                  <div
                    key={index}
                    className="group flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200"
                  >
                    <div className="w-2.5 h-2.5 bg-gradient-to-r from-[#29688A] to-[#1e4a63] rounded-full mt-2 flex-shrink-0 group-hover:scale-110 transition-transform duration-200"></div>
                    <span className="text-gray-700 leading-relaxed">{type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-[#29688A] mb-2">Apply for Strategic Partnership</h3>
                <div className="w-16 h-1 bg-gradient-to-r from-[#29688A] to-[#1e4a63] mx-auto rounded-full"></div>
              </div>

              {error && (
                <div className="mb-4 rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-700">{error}</div>
              )}

              {step === "form" && (
                <form
                  className="space-y-4"
                  noValidate
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSendOtp(false)
                  }}
                >
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#29688A]/10 ${
                          validationErrors.name
                            ? "border-red-300 focus:border-red-500"
                            : "border-gray-200 focus:border-[#29688A]"
                        }`}
                      />
                      {validationErrors.name && <p className="mt-1 text-sm text-red-600">{validationErrors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                      <select
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#29688A] focus:ring-4 focus:ring-[#29688A]/10"
                      >
                        <option value="">Select Title</option>
                        <option value="Mr">Mr</option>
                        <option value="Mrs">Mrs</option>
                        <option value="Miss">Miss</option>
                        <option value="Ms">Ms</option>
                        <option value="Dr">Dr</option>
                        <option value="Prof">Prof</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Designation *</label>
                      <input
                        type="text"
                        name="designation"
                        required
                        value={formData.designation}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#29688A]/10 ${
                          validationErrors.designation
                            ? "border-red-300 focus:border-red-500"
                            : "border-gray-200 focus:border-[#29688A]"
                        }`}
                      />
                      {validationErrors.designation && (
                        <p className="mt-1 text-sm text-red-600">{validationErrors.designation}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name *</label>
                      <input
                        type="text"
                        name="companyName"
                        required
                        value={formData.companyName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#29688A]/10 ${
                          validationErrors.companyName
                            ? "border-red-300 focus:border-red-500"
                            : "border-gray-200 focus:border-[#29688A]"
                        }`}
                      />
                      {validationErrors.companyName && (
                        <p className="mt-1 text-sm text-red-600">{validationErrors.companyName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Business Activity *</label>
                      <input
                        type="text"
                        name="businessActivity"
                        required
                        value={formData.businessActivity}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#29688A]/10 ${
                          validationErrors.businessActivity
                            ? "border-red-300 focus:border-red-500"
                            : "border-gray-200 focus:border-[#29688A]"
                        }`}
                      />
                      {validationErrors.businessActivity && (
                        <p className="mt-1 text-sm text-red-600">{validationErrors.businessActivity}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Business Sector *</label>
                      <input
                        type="text"
                        name="businessSector"
                        required
                        value={formData.businessSector}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#29688A]/10 ${
                          validationErrors.businessSector
                            ? "border-red-300 focus:border-red-500"
                            : "border-gray-200 focus:border-[#29688A]"
                        }`}
                      />
                      {validationErrors.businessSector && (
                        <p className="mt-1 text-sm text-red-600">{validationErrors.businessSector}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Business Interest *</label>
                      <input
                        type="text"
                        name="businessInterest"
                        required
                        value={formData.businessInterest}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#29688A]/10 ${
                          validationErrors.businessInterest
                            ? "border-red-300 focus:border-red-500"
                            : "border-gray-200 focus:border-[#29688A]"
                        }`}
                      />
                      {validationErrors.businessInterest && (
                        <p className="mt-1 text-sm text-red-600">{validationErrors.businessInterest}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Details of Products & Services to promote amongst SMEs *
                      </label>
                      <textarea
                        name="productsServices"
                        required
                        rows={3}
                        value={formData.productsServices}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#29688A]/10 resize-none ${
                          validationErrors.productsServices
                            ? "border-red-300 focus:border-red-500"
                            : "border-gray-200 focus:border-[#29688A]"
                        }`}
                        placeholder="Describe your products and services..."
                      ></textarea>
                      {validationErrors.productsServices && (
                        <p className="mt-1 text-sm text-red-600">{validationErrors.productsServices}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Business Sectors of SMEs *
                      </label>
                      <input
                        type="text"
                        name="smeBusinessSectors"
                        required
                        value={formData.smeBusinessSectors}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#29688A]/10 ${
                          validationErrors.smeBusinessSectors
                            ? "border-red-300 focus:border-red-500"
                            : "border-gray-200 focus:border-[#29688A]"
                        }`}
                        placeholder="e.g., Manufacturing, IT, Healthcare..."
                      />
                      {validationErrors.smeBusinessSectors && (
                        <p className="mt-1 text-sm text-red-600">{validationErrors.smeBusinessSectors}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Detail *</label>
                      <PhoneInput
                        international
                        countryCallingCodeEditable={false}
                        defaultCountry="IN"
                        value={formData.contactDetail}
                        onChange={handlePhoneChange}
                        className={`phone-input ${
                          validationErrors.contactDetail
                            ? "border-red-300 focus:border-red-500"
                            : "border-gray-200 focus:border-[#29688A]"
                        }`}
                        style={{
                          "--PhoneInputCountryFlag-height": "1em",
                          "--PhoneInputCountrySelectArrow-color": "#6b7280",
                        }}
                      />
                      {validationErrors.contactDetail && (
                        <p className="mt-1 text-sm text-red-600">{validationErrors.contactDetail}</p>
                      )}
                    </div>
                    <div>
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
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Address *</label>
                      <textarea
                        name="address"
                        required
                        rows={3}
                        value={formData.address}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#29688A]/10 resize-none ${
                          validationErrors.address
                            ? "border-red-300 focus:border-red-500"
                            : "border-gray-200 focus:border-[#29688A]"
                        }`}
                        placeholder="Enter your complete address..."
                      ></textarea>
                      {validationErrors.address && (
                        <p className="mt-1 text-sm text-red-600">{validationErrors.address}</p>
                      )}
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
                    className="w-full bg-gradient-to-r from-[#29688A] to-[#1e4a63] text-white py-3 px-6 rounded-xl hover:from-[#1e4a63] hover:to-[#29688A] transition-all font-semibold shadow-lg disabled:opacity-50"
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
                  <p className="text-gray-700 text-sm">We sent verification codes to:</p>
                  <div className="bg-gray-50 p-3 rounded-lg text-sm">
                    <p>
                      <strong>Email:</strong> {formData.email}
                    </p>
                    <p>
                      <strong>SMS:</strong> {formData.contactDetail}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email OTP *</label>
                    <input
                      type="text"
                      maxLength={6}
                      inputMode="numeric"
                      placeholder="Enter 6-digit Email OTP"
                      value={emailOtp}
                      onChange={(e) => setEmailOtp(e.target.value.replace(/[^0-9]/g, ""))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#29688A] focus:ring-4 focus:ring-[#29688A]/10 tracking-widest text-center"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">SMS OTP *</label>
                    <input
                      type="text"
                      maxLength={6}
                      inputMode="numeric"
                      placeholder="Enter 6-digit SMS OTP"
                      value={smsOtp}
                      onChange={(e) => setSmsOtp(e.target.value.replace(/[^0-9]/g, ""))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#29688A] focus:ring-4 focus:ring-[#29688A]/10 tracking-widest text-center"
                    />
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

              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                <p className="text-sm text-gray-700 text-center">
                  <strong className="text-[#29688A]">Note:</strong> Send your company profile and specific services to:
                  <br />
                  <a href="mailto:director@smechamber.com" className="text-[#29688A] hover:underline font-semibold">
                    director@smechamber.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        :global(.phone-input .PhoneInputInput) {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          outline: none;
          transition: all 0.2s;
          font-size: 16px;
        }
        :global(.phone-input .PhoneInputInput:focus) {
          border-color: #29688A;
          box-shadow: 0 0 0 4px rgba(41, 104, 138, 0.1);
        }
        :global(.phone-input.border-red-300 .PhoneInputInput) {
          border-color: #fca5a5;
        }
        :global(.phone-input.border-red-300 .PhoneInputInput:focus) {
          border-color: #ef4444;
        }
        :global(.phone-input .PhoneInputCountrySelect) {
          border: none;
          background: transparent;
          margin-right: 8px;
        }
        :global(.phone-input .PhoneInputCountrySelectArrow) {
          border-top-color: #6b7280;
          opacity: 0.8;
        }
      `}</style>
    </div>
  )
}
