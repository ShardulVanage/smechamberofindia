"use client"
import { useState } from "react"

export default function StrategicPartnersPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    website: "",
    businessType: "",
    services: "",
    message: "",
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Strategic Partner Application:", formData)
    alert("Thank you for your interest! We will contact you soon.")
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
            <div className="sticky top-8 bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-[#29688A] mb-2">Apply for Strategic Partnership</h3>
                <div className="w-16 h-1 bg-gradient-to-r from-[#29688A] to-[#1e4a63] mx-auto rounded-full"></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name *</label>
                    <input
                      type="text"
                      name="companyName"
                      required
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#29688A] focus:ring-4 focus:ring-[#29688A]/10 transition-all duration-200 group-hover:border-gray-300"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Person *</label>
                    <input
                      type="text"
                      name="contactPerson"
                      required
                      value={formData.contactPerson}
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
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Business Type *</label>
                    <select
                      name="businessType"
                      required
                      value={formData.businessType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#29688A] focus:ring-4 focus:ring-[#29688A]/10 transition-all duration-200 group-hover:border-gray-300"
                    >
                      <option value="">Select Business Type</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="financial">Financial Institution</option>
                      <option value="it-services">IT & IT Services</option>
                      <option value="consulting">Consulting</option>
                      <option value="logistics">Logistics & Transportation</option>
                      <option value="other">Other</option>
                    </select>
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
                      placeholder="Describe your services and how you can help SMEs..."
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
