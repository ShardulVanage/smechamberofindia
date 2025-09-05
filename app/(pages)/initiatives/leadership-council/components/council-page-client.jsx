"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Users, Target, Lightbulb, TrendingUp, Globe, Award } from "lucide-react"
import Link from "next/link"
import CouncilForm from "./membership-form"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const iconVariants = {
  initial: { scale: 0 },
  animate: { scale: 1 },
  transition: { type: "spring", stiffness: 260, damping: 20 },
}

export default function CouncilPageClient({ siteKey }) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section
        className="relative py-20 px-4 text-center bg-gradient-to-br from-white to-gray-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900" {...fadeInUp}>
            India SME <span className="text-[#29688A]">Leadership Council</span>
          </motion.h1>
          <motion.p className="text-xl text-gray-600 mb-8 leading-relaxed" {...fadeInUp} transition={{ delay: 0.2 }}>
            Empowering entrepreneurs to transform SMEs into emerging enterprises with 10x growth potential
          </motion.p>
          <motion.div {...fadeInUp} transition={{ delay: 0.4 }}>
            <Link href="/membership">
              <Button size="lg" className="bg-[#29688A] hover:bg-[#1e4d66] text-white px-8 py-3 text-lg">
                Join now
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Introduction */}
      <motion.section
        className="py-16 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.p className="text-lg text-gray-700 leading-relaxed mb-6" {...fadeInUp}>
            SMEs contribute towards economic growth, employment generation and innovation. The good management strategy
            for SMEs should be development of a sound plan and design of an appropriate organizational structure. Good
            business leadership is a pre-requisite for the effective accomplishment of these tasks.
          </motion.p>
          <motion.p className="text-lg text-gray-700 leading-relaxed" {...fadeInUp} transition={{ delay: 0.2 }}>
            In SME Sector, an entrepreneur is the chief administrator, planner, chief risk bearer and a strategy
            implementer, crises solver, figure head, spokesperson and policy maker and takes care of Marketing,
            Branding, Promotion, Sales and puts efforts for a sustainable growth.
          </motion.p>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        className="py-16 px-4 bg-gray-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 className="text-4xl font-bold text-center mb-12 text-gray-900" {...fadeInUp}>
            About the <span className="text-[#29688A]">Council</span>
          </motion.h2>
          <motion.div
            className="grid md:grid-cols-2 gap-8 items-center"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp}>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                India SME Leadership Council is instituted by SME Chamber of India and SME Business Management Institute
                to provide a platform to successful Entrepreneurs from Small & Medium industries and business sector to
                connect, establish business cooperation, explore emerging business opportunities.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                The main objective of the Council is to establish the group of Entrepreneurs, who are looking for
                transformation of businesses into emerging enterprises and 10x business growth at National and
                International level.
              </p>
            </motion.div>
            <motion.div className="bg-[#29688A] text-white p-8 rounded-lg" variants={fadeInUp}>
              <h3 className="text-2xl font-bold mb-4">Eligibility</h3>
              <p className="text-lg">
                Enterprises with business turnover of <strong>Rs. 50 crores or above</strong> are entitled to enroll as
                members of the Council.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Vision Section */}
      <motion.section
        className="py-16 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 className="text-4xl font-bold text-center mb-12 text-gray-900" {...fadeInUp}>
            Our <span className="text-[#29688A]">Vision</span>
          </motion.h2>
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { icon: Users, text: "Establish group of successful Entrepreneurs" },
              { icon: TrendingUp, text: "Guide and mentor potential SMEs for 10x growth" },
              { icon: Globe, text: "Connect Entrepreneurs to establish new business partnership" },
              { icon: Award, text: "Development of Entrepreneurial leadership quality" },
              { icon: Lightbulb, text: "Exchange of knowledge, experience and success" },
              { icon: Target, text: "Empowering Young & Women Entrepreneurs and Start-Ups" },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <motion.div
                  variants={iconVariants}
                  className="w-12 h-12 bg-[#29688A] rounded-lg flex items-center justify-center mb-4"
                >
                  <item.icon className="w-6 h-6 text-white" />
                </motion.div>
                <p className="text-gray-700">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        className="py-16 px-4 bg-gray-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 className="text-4xl font-bold text-center mb-12 text-gray-900" {...fadeInUp}>
            Our <span className="text-[#29688A]">Mission</span>
          </motion.h2>
          <motion.div
            className="grid md:grid-cols-2 gap-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              "Preparing Entrepreneurs for better business growth",
              "Forming group for exploring emerging business opportunities",
              "Supporting for skill and scale development",
              "Support for wealth creation and wealth management",
              "Transforming SMEs into emerging enterprise / corporate",
              "Supporting SMEs for global footprint",
              "Setting up SME family office",
              "Strengthening struggling SMEs for better growth & profitability",
              "Recognizing remarkable achievements and contribution",
              "Establishing group for joint marketing and promotion",
              "Setting up fund for business growth and expansion",
              "Channelizing finance, ECB, private equity and investment",
              "Support and guidance for innovation and invention",
              "Assistance for International collaborations and joint ventures",
              "Establishing group of family managed businesses",
            ].map((mission, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="flex items-start space-x-3 bg-white p-4 rounded-lg shadow-sm"
              >
                <CheckCircle className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">{mission}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Activities Section */}
      <motion.section
        className="py-16 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 className="text-4xl font-bold text-center mb-12 text-gray-900" {...fadeInUp}>
            Our <span className="text-[#29688A]">Activities</span>
          </motion.h2>
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              "Monthly networking meetings at Mumbai and various chapters",
              "Sharing views, achievements and experience at SMETalks Shows",
              "Exchange of business leads, referrals, inquiries, business ideas",
              "Networking dinner and cocktails",
              "India SME Leadership Summit / Round Table Meets",
              "Establishment of experts group and committees",
              "Special publication on 'Rising SMEs of India'",
              "Review of various Government policies and regulations",
              "Interaction with tycoons, industrialist & CEOs",
              "Interface with policy makers and Government officials",
              "Motivation and mentoring session",
              "Executive training program for improvement of skill & scale",
            ].map((activity, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-2 h-2 bg-[#29688A] rounded-full mb-3"></div>
                <p className="text-gray-700">{activity}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Form Section */}
      <motion.section
        className="py-16 px-4 bg-gray-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2 className="text-4xl font-bold text-center mb-4 text-gray-900" {...fadeInUp}>
            Join the <span className="text-[#29688A]">Council</span>
          </motion.h2>
          <motion.p className="text-center text-gray-600 mb-12" {...fadeInUp} transition={{ delay: 0.2 }}>
            Add Your Name to Become India SME Leadership Council Member
          </motion.p>

          <motion.div {...fadeInUp} transition={{ delay: 0.4 }}>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-center text-[#29688A]">Membership Application</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <CouncilForm siteKey={siteKey} />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}
