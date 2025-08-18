"use client"
import { useState } from "react"

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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSpecializationChange = (area) => {
    const updatedSpecialization = formData.specialization.includes(area)
      ? formData.specialization.filter((item) => item !== area)
      : [...formData.specialization, area]

    setFormData({
      ...formData,
      specialization: updatedSpecialization,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("SME Consultant Application:", formData)
    alert("Thank you for your interest! We will contact you soon.")
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

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Consultant Name *</label>
                    <input
                      type="text"
                      name="consultantName"
                      required
                      value={formData.consultantName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#29688A] focus:ring-4 focus:ring-[#29688A]/10 transition-all duration-200 group-hover:border-gray-300"
                    />
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
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#29688A] focus:ring-4 focus:ring-[#29688A]/10 transition-all duration-200 group-hover:border-gray-300"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#29688A] focus:ring-4 focus:ring-[#29688A]/10 transition-all duration-200 group-hover:border-gray-300"
                    />
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
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#29688A] focus:ring-4 focus:ring-[#29688A]/10 transition-all duration-200 group-hover:border-gray-300"
                    >
                      <option value="">Select Experience</option>
                      <option value="1-3">1-3 years</option>
                      <option value="4-7">4-7 years</option>
                      <option value="8-15">8-15 years</option>
                      <option value="15+">15+ years</option>
                    </select>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Areas of Specialization * (Select multiple)
                    </label>
                    <div className="max-h-48 overflow-y-auto border-2 border-gray-200 rounded-xl p-4 bg-gray-50 group-hover:border-gray-300 transition-all duration-200">
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
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Qualifications *</label>
                    <textarea
                      name="qualifications"
                      required
                      rows="3"
                      value={formData.qualifications}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#29688A] focus:ring-4 focus:ring-[#29688A]/10 transition-all duration-200 group-hover:border-gray-300 resize-none"
                      placeholder="Your educational and professional qualifications..."
                    ></textarea>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Services Offered *</label>
                    <textarea
                      name="services"
                      required
                      rows="3"
                      value={formData.services}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#29688A] focus:ring-4 focus:ring-[#29688A]/10 transition-all duration-200 group-hover:border-gray-300 resize-none"
                      placeholder="Describe your consulting services and expertise..."
                    ></textarea>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Message</label>
                    <textarea
                      name="message"
                      rows="3"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#29688A] focus:ring-4 focus:ring-[#29688A]/10 transition-all duration-200 group-hover:border-gray-300 resize-none"
                      placeholder="Any additional information..."
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#29688A] to-[#1e4a63] text-white py-4 px-6 rounded-xl hover:from-[#1e4a63] hover:to-[#29688A] transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Submit Application
                </button>
              </form>
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
