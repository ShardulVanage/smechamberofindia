"use client"

import { motion } from "framer-motion"

const ScopeSection = () => {
  const scopeItems = [
    "Investment Opportunity",
    "Promotion of Advanced Technology",
    "Private Equity Funding",
    "Franchise Business",
    "Technology Transfers & Joint Ventures",
    "Strategic Business Partnership to enter into Indian Markets",
    "Contract Manufacturing Tie-Ups in India",
    "Marketing and Promotion in Indian Markets",
    "Development of Products for Indian Markets",
    "Support for Innovation & Invention",
    "Project Management Consultancy",
    "Promotion of Unique Support Services for Better Productivity",
    "Business and Financial Management Consultancy",
    "Value Addition for Quality Improvement",
    "Support for People's Management",
    "Support for Branding and Enhancement of Sales",
    "Support for Business or Manufacturing Units Transformation",
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#29688A] mb-4">Scope in Indian SMEs</h2>
          <div className="flex items-center justify-center gap-2 text-lg text-gray-600 mb-8">
            <span className="font-medium">Business</span>
            <span className="w-1 h-1 bg-[#29688A] rounded-full"></span>
            <span className="font-medium">Investment</span>
            <span className="w-1 h-1 bg-[#29688A] rounded-full"></span>
            <span className="font-medium">Technology</span>
            <span className="w-1 h-1 bg-[#29688A] rounded-full"></span>
            <span className="font-medium">Alliance</span>
          </div>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            SME Chamber of India would like to offer scope of opportunity to Overseas SMEs & Companies as well as Indian
            Companies to provide unique support and co-operation with SMEs for the following:
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {scopeItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group bg-gray-50 rounded-lg p-6 hover:bg-[#29688A] hover:text-white transition-all duration-300 cursor-pointer border border-gray-100 hover:border-[#29688A] hover:shadow-lg"
            >
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#29688A] rounded-full mt-2 group-hover:bg-white transition-colors duration-300 flex-shrink-0"></div>
                <p className="text-gray-800 group-hover:text-white transition-colors duration-300 font-medium leading-relaxed">
                  {item}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#29688A] text-white px-6 py-3 rounded-full font-medium hover:bg-[#1e4f66] transition-colors duration-300 cursor-pointer">
            <span>Explore Opportunities</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ScopeSection
