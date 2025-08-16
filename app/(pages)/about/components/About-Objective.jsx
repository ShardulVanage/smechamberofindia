"use client"

import { motion } from "framer-motion"

export default function About_Objective() {
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

  const objectives = [
    "Preparing and empowering SMEs for global competitiveness",
    "Establish co-operation for further business growth",
    "Protect business interest of SMEs & manufacturing Industries",
    "Advocacy for securing the interest of SMEs & policy implementations",
    "Strengthening capacities and capabilities for further business growth",
    "Establishing international cooperations for bilateral trade promotion",
    "Innovation, invention and its commercialisation",
    "Awards & Recognitions for remarkable achievements & contributions",
  ]

  return (
    <motion.section
      className="py-16 bg-white"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <motion.h1 className="text-5xl font-bold mb-6" style={{ color: "#29688A" }}>
            Our Objectives
          </motion.h1>
          <motion.div
            className="w-24 h-1 mx-auto mb-8"
            style={{ backgroundColor: "#29688A" }}
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
        </motion.div>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={containerVariants}>
          {objectives.map((objective, index) => (
            <motion.div
              key={index}
              className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-300"
              variants={itemVariants}
              whileHover={{ x: 10 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="w-3 h-3 rounded-full mt-2 flex-shrink-0"
                style={{ backgroundColor: "#29688A" }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
              />
              <motion.p className="text-gray-700 leading-relaxed" variants={itemVariants}>
                {objective}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
