"use client"

import { motion } from "framer-motion"

const ChallengesSection = () => {
  const challenges = [
    "Inadequate and timely banking finance",
    "Shortage of skilled manpower",
    "Limited capital and knowledge resources",
    "Non-availability of suitable technology",
    "Low production capacity constraints",
    "Ineffective marketing strategies",
    "Difficulty in identifying new markets",
    "Constraints on modernisation & expansions",
    "Non-availability of highly skilled labourers at affordable costs",
    "Complex follow-up processes with Government agencies",
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <section className="py-20 ">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Challenges to SMEs</h2>
          <div className="w-24 h-1 bg-[#29688A] mx-auto mb-8"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto text-center">
            Despite its commendable contributions to the Nation's economy, the SME sector does not get the required
            support from the concerned Government agencies, banks, financial institutions and other stake holders, which
            is hindering SMEs in becoming more competitive at the National and International levels.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {challenges.map((challenge, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group bg-white p-6 rounded-lg shadow-sm border border-blue-100 hover:shadow-md hover:border-blue-200 transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-3 h-3 bg-[#29688A] rounded-full mt-2 group-hover:scale-110 transition-transform duration-300"></div>
                <p className="text-gray-800 leading-relaxed group-hover:text-[#29688A] transition-colors duration-300">
                  {challenge}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 italic">
            These challenges require coordinated efforts from all stakeholders to strengthen the SME ecosystem.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default ChallengesSection
