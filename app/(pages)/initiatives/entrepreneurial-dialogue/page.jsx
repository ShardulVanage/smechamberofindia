"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, Globe } from "lucide-react"

export default function SMELeadershipCouncil() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
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

  const topics = [
    "Interest, Initiative, Involvement, Innovation & success story",
    "Strategies for profitable & sustainable business growth",
    "Challenges, struggle, competition, revival, survival & growth",
    "Unique Strategies & leadership qualities for developing business growth",
    "Initiatives & strategies for people management, marketing, branding and promotion",
    "Acquiring advanced technology, unique idea and its commercialisation",
    "Adoption of good governance, fair business practices and business ethics",
    "Potentiality of business valuation & creditworthiness to attract investors",
    "Transforming and diversifying the enterprise into emerging corporate",
    "Advantages of the access of capital markets",
    "Strategies, competition and competitiveness to enter into global markets",
    "Benefits of various government policies, incentives & advantages",
    "Family managed businesses - challenges, opportunities and succession planning",
    "Strategies to exit business at the appropriate situation",
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Registration Banner */}
      <motion.section
        className="py-12 bg-gradient-to-b from-gray-50 to-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto px-6">
          {/* Registration Banner */}
          {/* <motion.div className="mb-12 flex justify-center" {...fadeInUp}>
            <Card className="overflow-hidden border-2 border-[#29688A]/20 shadow-lg">
              <CardContent className="p-0">
                <div className="flex items-center bg-white">
                  <div className="p-6">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6DOPn9nSizfDwW9BjVGIKROZQ148jZ.png"
                      alt="QR Code for Registration"
                      className="w-32 h-32 object-contain"
                    />
                  </div>
                  <div className="bg-[#29688A] text-white p-6 flex-1">
                    <h3 className="text-xl font-bold mb-2">Register Now</h3>
                    <p className="text-sm opacity-90">https://bit.ly/3Nx1VuG</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div> */}

          {/* Main Title */}
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h1 className="text-4xl md:text-5xl font-bold text-[#29688A] mb-6 leading-tight">
              India SME Leadership Council
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">Entrepreneurs Leadership Dialogue</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-12">
            {/* Introduction */}
            <motion.div variants={fadeInUp}>
              <Card className="border-l-4 border-l-[#29688A] shadow-sm">
                <CardContent className="p-8">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    SME Chamber of India and Maharashtra Industry Development Association have initiated an interactive
                    & enlightening platform to provide opportunities to entrepreneurs, business tycoons, industrialists,
                    technocrats, inventors, thought leaders and senior executives from corporates, MNCs, policy makers,
                    financial, educational, research & development institutions, diplomat missions, media, entertainment
                    and business leaders to share their success journey.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Purpose */}
            <motion.div variants={fadeInUp}>
              <h2 className="text-2xl font-bold text-[#29688A] mb-6">Our Mission</h2>
              <Card className="shadow-sm">
                <CardContent className="p-8">
                  <p className="text-gray-700 leading-relaxed">
                    This activity will be useful to existing entrepreneurs, SMEs, start-ups, women entrepreneurs & young
                    generations to follow the success path and enlighten them to achieve sustainable growth in business.
                    The eminent speakers will share their experience & views on various topics essential for business
                    growth.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Topics */}
            <motion.div variants={fadeInUp}>
              <h2 className="text-2xl font-bold text-[#29688A] mb-8">Discussion Topics</h2>
              <div className="grid gap-4">
                {topics.map((topic, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="hover:shadow-md transition-shadow duration-300 border-l-2 border-l-[#29688A]/30">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-2 h-2 bg-[#29688A] rounded-full mt-3 flex-shrink-0"></div>
                          <p className="text-gray-700 leading-relaxed">{topic}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Partnership */}
            <motion.div variants={fadeInUp}>
              <h2 className="text-2xl font-bold text-[#29688A] mb-6">Our Partners</h2>
              <Card className="bg-gray-50 shadow-sm">
                <CardContent className="p-8">
                  <p className="text-gray-700 leading-relaxed">
                    This dialogue activity has been partnered by SME Business Management Institute, Start-up Council of
                    India, Entrepreneurship Development Council, Federation of Indian SME Associations, Women
                    Entrepreneurs Development Council, Packaging Industries Association of India and India International
                    Trade Centre.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* About SME Chamber */}
            <motion.div variants={fadeInUp}>
              <h2 className="text-2xl font-bold text-[#29688A] mb-6">About SME Chamber of India</h2>
              <Card className="shadow-sm">
                <CardContent className="p-8">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    SME Chamber of India has been working for the growth of SMEs, manufacturing, service and allied
                    industrial & business sectors for the last 30 years and on the forefront for policy framework change
                    and its quick implementation for the benefit of SMEs.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    The Chamber organizes various activities to impart knowledge & skill to SMEs and supporting them to
                    enhance exports, identify opportunities in emerging markets, joint ventures, technology transfers,
                    contract manufacturing & strategic partnership for further business growth with Indian and foreign
                    companies.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Call to Action */}
            <motion.div variants={fadeInUp} className="text-center py-12">
              <Card className="bg-[#29688A] text-white shadow-lg">
                <CardContent className="p-12">
                  <h2 className="text-3xl font-bold mb-6">Join the Leadership Dialogue</h2>
                  <p className="text-xl mb-8 opacity-90">
                    Share your success story and inspire the next generation of entrepreneurs
                  </p>
                  <Button
                    size="lg"
                    className="bg-white text-[#29688A] hover:bg-gray-100 font-semibold px-8 py-3 text-lg"
                  >
                    Register Now
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="  py-12">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="grid md:grid-cols-2 gap-8">
              {/* Registration & Membership */}
              <Card className="bg-[#29688A] text-white border-0">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    REGISTRATION & MEMBERSHIP
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p>Shekhar Kulkarni</p>
                    <p>Fax: +91 - 22 - 6951 1111</p>
                    <p className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      registration@smechamber.in
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Sponsorship & Partnership */}
              <Card className="bg-[#29688A] text-white border-0">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4">SPONSORSHIP & PARTNERSHIP</h3>
                  <div className="space-y-2 text-sm">
                    <p>Shekhar Kulkarni</p>
                    <p>Director, SME Chamber of India</p>
                    <p>+91 - 98201 79184</p>
                    <p className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      skulkarni@smechamber.com
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Website */}
            <div className="text-center mt-8 pt-8 border-t border-gray-700">
              <div className="flex items-center justify-center gap-2 text-xl font-bold">
                <Globe className="w-6 h-6 text-[#29688A]" />
                <span>www.smechamberofIndia.com</span>
              </div>
            </div>

            {/* Founder Info */}
            <div className="text-center mt-8 pt-8 border-t border-gray-700">
              <p className="text-gray-900 mb-2">Regards</p>
              <p className="font-semibold text-lg">Chandrakant Salunkhe</p>
              <p className="text-gray-900">Founder & President</p>
              <p className="text-gray-900">SME Chamber of India</p>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
