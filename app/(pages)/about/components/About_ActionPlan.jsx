"use client"

import { motion } from "framer-motion"

const ActionPlanSection = () => {
  const actionGroups = [
    {
      title: "Strategic Growth & Development",
      items: [
        'Empowering SMEs to contribute for marching towards "Viksit Bharat"',
        "Exploring emerging business & Export opportunities in the emerging markets",
        "Preparing strategic plans for sustainable business growth",
        "Creating elite group of SMEs & branding of fortune 500 SMEs",
        "Digital transformation of SMEs for further business growth",
      ],
    },
    {
      title: "Financial & Investment Support",
      items: [
        "Channelize private equity and ECBs for further business growth",
        "Reduction of interest rate & enhance credit flow for SME sector",
        "Preparing SMEs for international co-operation and IPO",
        "Pursuing with the Government & RBI for revival of sick units",
        "Certification of credibility and credit worthiness",
      ],
    },
    {
      title: "Leadership & Entrepreneurship",
      items: [
        "Developing entrepreneurial leadership capabilities/qualities",
        "Improvement of leadership qualities amongst entrepreneurs & start-ups",
        "Generation of skilled manpower for SMEs and new entrepreneurship",
        "Branding of successful entrepreneurs and their achievements",
        "Connect start-ups, SMEs & manufacturing sectors for better growth",
      ],
    },
    {
      title: "Operations & Manufacturing",
      items: [
        "Excellence in operations, innovations and manufacturing activities",
        "Integrating enterprises to set up manufacturing units in other countries",
        "Setting up of SME hi-tech industrial, packaging and allied parks/zones",
        "Allocation of industrial land and construct ready-made industrial premises",
        "Brand & promote made-in-India and made-by-SMEs",
      ],
    },
    {
      title: "Policy & Governance",
      items: [
        'Focus on "ease of doing business" to secure the interests of SMEs',
        "Awareness on fair business practices, business ethics and good governance",
        "Reformation of MSMED Act, labour and industrial laws",
        "Suggestions and recommendations for new schemes and policies",
        "Availing of Advantages of Free Trade Agreements with the various countries",
      ],
    },
    {
      title: "Business Intelligence & Networking",
      items: [
        "Transformation of SMEs into emerging corporates",
        "Performance measurement and business analysis for diversification",
        "Creating group of SMEs having turnover from Rs. 50 crores to Rs. 5,000 crores",
        "Creation of sectoral database of SMEs",
        "Show casing products & innovations through SMEtv & SMEconnect magazine",
      ],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  }

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Action Plan</h2>
          <div className="w-24 h-1 bg-[#29688A] mx-auto"></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {actionGroups.map((group, groupIndex) => (
            <motion.div
              key={groupIndex}
              variants={cardVariants}
              className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="mb-6">
                <div className="w-12 h-12 bg-[#29688A] rounded-xl flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-white rounded-full"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 leading-tight">{group.title}</h3>
              </div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
                className="space-y-4"
              >
                {group.items.map((item, itemIndex) => (
                  <motion.div key={itemIndex} variants={itemVariants} className="flex items-start gap-3 group">
                    <div className="w-2 h-2 bg-[#29688A] rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                    <p className="text-gray-700 text-sm leading-relaxed group-hover:text-gray-900 transition-colors duration-200">
                      {item}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ActionPlanSection
