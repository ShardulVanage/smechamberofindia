"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { ArrowRight, Building2, DollarSign, Globe, TrendingUp, Users, Zap, ChevronDown, UserPlus } from "lucide-react"
import Link from "next/link"

const services = [
  {
    title: "DOMESTIC BUSINESS OPPORTUNITIES",
    icon: Building2,
    gradient: "from-[#29688A]/20 to-[#29688A]/5", // replaced primary tokens with direct color
    items: [
      "Business advisory services for growth and expansion",
      "Sourcing, supply & procurement opportunities",
      "Setting up manufacturing units, identify industrial land & ready-made premises",
      "Connectivity with the buyers, manufacturers, exporters and suppliers",
      "Vendor development, supply to SMEs, corporates and MNCs",
      "Marketing, branding and promotion",
      "Identifying potential investors and business partners",
      "Government services, liaison and corporate communications",
      "Revival of sick and struggling units",
    ],
  },
  {
    title: "FINANCE & INVESTMENT",
    icon: DollarSign,
    gradient: "from-[#4A90B8]/20 to-[#4A90B8]/5", // replaced secondary tokens with lighter blue
    items: [
      "Channelise bank finance, investment and ECB",
      "Private Equity and Venture Capital",
      "Identify investors and strategic partners",
      "Listing on the SME stock exchange for availing alternative finance",
      "Finance facility for participation in the International Exhibitions",
      "Finance for setting up manufacturing units and ready-made industrial premises",
      "Factoring and forfeiting services",
      "NPA settlements and restructuring of stressed SMEs",
    ],
  },
  {
    title: "INTERNATIONAL BUSINESS OPPORTUNITIES",
    icon: Globe,
    gradient: "from-[#6BA8C4]/20 to-[#6BA8C4]/5", // replaced accent tokens with even lighter blue
    items: [
      "Export business opportunities",
      "Business alliances with the overseas SMEs and corporates",
      "Joint ventures, technology transfers and collaborations",
      "Import facilitation services",
      "Contract manufacturing tie-ups with the overseas companies",
      "Identification of business partners, buyers, importers and distributors",
      "Sourcing of raw materials, advanced technology, machinery & equipment",
      "Marketing & distributorship in the specific overseas markets",
      "Identify industrial land, premises, and industrial parks / SEZs",
      "Promotion and launching of new products & services in the overseas markets",
      "Go to market strategic planning",
      "Business leads and referrals for exports, imports, JVs and supplies",
      "International trade Advisory services for formalities, compliances & procedures",
    ],
  },
]

const stats = [
  { icon: Users, value: "10K+", label: "SMEs Served" },
  { icon: TrendingUp, value: "₹500Cr+", label: "Business Facilitated" },
  { icon: Globe, value: "25+", label: "Countries Connected" },
  { icon: Zap, value: "95%", label: "Success Rate" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const sectionVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

const statVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

export default function SMEIndiaPage() {
  const [openSections, setOpenSections] = useState({
    0: false,
    1: false,
    2: false,
  })

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#29688A]/5 via-white to-[#4A90B8]/5">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 py-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-[#29688A]/10 text-[#29688A] px-4 py-2 rounded-full text-sm font-medium mb-6" // replaced primary tokens
            >
              <Zap className="w-4 h-4" />
              Empowering Indian SMEs
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-[#29688A] via-[#29688A] to-[#4A90B8] bg-clip-text text-transparent mb-6 leading-tight">
              Transform Your Business
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Comprehensive solutions for Small and Medium Enterprises to scale, grow, and succeed in the global
              marketplace
            </p>
{/* 
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(41, 104, 138, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#29688A] text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center gap-2 shadow-lg hover:bg-[#29688A]/90 transition-all duration-300" // replaced primary tokens
              >
                Get Started Today
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-[#29688A] text-[#29688A] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#29688A] hover:text-white transition-all duration-300" // replaced primary tokens
              >
                Learn More
              </motion.button>
            </motion.div> */}
          </motion.div>
        </div>
      </section>
      <section className="py-16 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div key={index} variants={statVariants} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#29688A]/10 rounded-2xl mb-4 group-hover:bg-[#29688A]/20 transition-colors duration-300">
                  <stat.icon className="w-8 h-8 text-[#29688A]" /> {/* replaced primary token */}
                </div>
                <div className="text-3xl font-bold text-[#29688A] mb-2">{stat.value}</div>{" "}
                {/* replaced primary token */}
                <div className="text-gray-600 font-medium">{stat.label}</div> {/* replaced muted-foreground */}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <main className="container mx-auto px-4 py-20">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-[#29688A] text-center mb-12"
        >
          Our Services
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          {services.map((section, sectionIndex) => (
            <motion.section
              key={sectionIndex}
              variants={sectionVariants}
              className={`relative overflow-hidden bg-gradient-to-br ${section.gradient} rounded-3xl shadow-xl border border-gray-200/50 hover:shadow-2xl transition-all duration-500`}
            >
              <motion.div
                className="p-8 md:p-12 cursor-pointer"
                onClick={() => toggleSection(sectionIndex)}
                whileHover={{ backgroundColor: "rgba(41, 104, 138, 0.02)" }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#29688A]/10 to-transparent rounded-full -translate-y-16 translate-x-16" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#4A90B8]/10 to-transparent rounded-full translate-y-12 -translate-x-12" />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-4 bg-[#29688A]/10 rounded-2xl">
                        <section.icon className="w-8 h-8 text-[#29688A]" />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-[#29688A]">{section.title}</h2>
                    </div>

                    <div className="flex items-center gap-3">
                      <Link href='/membership'>
                      <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(41, 104, 138, 0.3)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation() // Prevent dropdown toggle when clicking button
                        }}
                        className="bg-[#29688A] text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow-md hover:bg-[#29688A]/90 transition-all duration-300 text-sm"
                        >
                        <UserPlus className="w-4 h-4" />
                        Join Membership
                      </motion.button>
                        </Link>

                      <motion.div
                        animate={{ rotate: openSections[sectionIndex] ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-2 bg-[#29688A]/10 rounded-full"
                      >
                        <ChevronDown className="w-6 h-6 text-[#29688A]" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <AnimatePresence>
                {openSections[sectionIndex] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 md:px-12 pb-8 md:pb-12 bg-white">
                      <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                      >
                        {section.items.map((item, itemIndex) => (
                          <motion.div
                            key={itemIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: itemIndex * 0.05 }}
                            className="flex items-start gap-3 text-base text-gray-800 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300 border border-gray-200"
                          >
                            <div className="w-2 h-2 bg-[#29688A] rounded-full mt-2 flex-shrink-0" />
                            <span className="leading-relaxed font-medium">{item}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.section>
          ))}
        </motion.div>
      </main>
    </div>
  )
}
