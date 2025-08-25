"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function SMEConnectPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const scaleOnHover = {
    whileHover: { scale: 1.02 },
    transition: { type: "spring", stiffness: 300 },
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <motion.header
        className="border-b border-gray-100"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <motion.h1
            className="text-2xl font-bold"
            style={{ color: "#29688A" }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            SME Connect Magazine
          </motion.h1>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section className="py-20 px-6" variants={staggerContainer} initial="initial" animate="animate">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 className="text-5xl font-bold mb-6 leading-tight" style={{ color: "#29688A" }} variants={fadeInUp}>
            Empowering SMEs Through
            <br />
            <span className="text-gray-800">Knowledge & Connection</span>
          </motion.h2>

          <motion.p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed" variants={fadeInUp}>
            A bi-monthly magazine showcasing the activities of SME Chamber of India towards development of SMEs from
            various sectors
          </motion.p>

          <motion.div variants={fadeInUp}>
            <Button size="lg" className="px-8 py-3 text-lg font-medium" style={{ backgroundColor: "#29688A" }} asChild>
              <motion.a
                href="https://www.smeconnect.in"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Visit SME Connect
              </motion.a>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Grid */}
      <motion.section
        className="py-16 px-6 bg-gray-50"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h3 className="text-3xl font-bold text-center mb-12" style={{ color: "#29688A" }} variants={fadeInUp}>
            What We Offer
          </motion.h3>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div variants={fadeInUp}>
              <Card className="h-full border-0 shadow-sm hover:shadow-md transition-shadow">
                <motion.div {...scaleOnHover}>
                  <CardContent className="p-8 text-center">
                    <div
                      className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
                      style={{ backgroundColor: "#29688A" }}
                    >
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                        />
                      </svg>
                    </div>
                    <h4 className="text-xl font-semibold mb-4" style={{ color: "#29688A" }}>
                      Industry Insights
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      Thoughts, experiences and achievements of small and medium enterprises from various sectors
                    </p>
                  </CardContent>
                </motion.div>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full border-0 shadow-sm hover:shadow-md transition-shadow">
                <motion.div {...scaleOnHover}>
                  <CardContent className="p-8 text-center">
                    <div
                      className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
                      style={{ backgroundColor: "#29688A" }}
                    >
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <h4 className="text-xl font-semibold mb-4" style={{ color: "#29688A" }}>
                      Expert Articles
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      Articles from thought leaders, technocrats, experts, and Government officials for knowledge
                      enhancement
                    </p>
                  </CardContent>
                </motion.div>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full border-0 shadow-sm hover:shadow-md transition-shadow">
                <motion.div {...scaleOnHover}>
                  <CardContent className="p-8 text-center">
                    <div
                      className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
                      style={{ backgroundColor: "#29688A" }}
                    >
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                        />
                      </svg>
                    </div>
                    <h4 className="text-xl font-semibold mb-4" style={{ color: "#29688A" }}>
                      Brand Promotion
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      Effective platform to brand and promote products and services through targeted advertisements
                    </p>
                  </CardContent>
                </motion.div>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Registration Info */}
      <motion.section
        className="py-16 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="bg-gray-50 rounded-2xl p-8"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="text-2xl font-bold mb-4" style={{ color: "#29688A" }}>
              Officially Registered Publication
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Registered under Registrar of Newspaper of India (RNI) with Registration No:
              <span className="font-semibold" style={{ color: "#29688A" }}>
                {" "}
                MAHENG/2011/48842
              </span>
            </p>
            <p className="text-gray-600 leading-relaxed">
              Circulated amongst members, Government agencies, banks, financial institutions, start-ups, entrepreneurs,
              stakeholders, policy makers, embassies, and corporates.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="border-t border-gray-100 py-8 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-600 mb-4">
            For more information, visit:{" "}
            <motion.a
              href="https://www.smeconnect.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline"
              style={{ color: "#29688A" }}
              whileHover={{ scale: 1.05 }}
            >
              www.smeconnect.in
            </motion.a>
          </p>
          <motion.p
            className="text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            © 2024 SME Chamber of India. All rights reserved.
          </motion.p>
        </div>
      </motion.footer>
    </div>
  )
}
