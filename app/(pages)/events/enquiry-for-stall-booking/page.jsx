"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Phone, Mail, Send, CheckCircle } from "lucide-react"

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

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the data to your backend/PocketBase
    console.log("Form submitted:", formData)
    setIsSubmitted(true)

    // Reset form after 3 seconds
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
      {/* Header Section */}
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
          {/* Contact Information */}
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

          {/* Enquiry Form */}
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
              ) : (
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
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full bg-[#29688A] text-white py-4 px-6 rounded-lg font-semibold text-lg flex items-center justify-center space-x-2 hover:bg-[#1e4a5f] transition-all duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Send className="w-5 h-5" />
                    <span>Send Enquiry</span>
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
