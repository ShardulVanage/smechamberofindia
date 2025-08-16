"use client"

import { motion } from "framer-motion"

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
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

  const highlightVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.4,
      },
    },
  }

  return (
    <main className="min-h-screen bg-white">
      <motion.div
        className="max-w-4xl mx-auto px-6 py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <motion.h1 className="text-5xl font-bold mb-6" style={{ color: "#29688A" }}>
            About SME Chamber of India
          </motion.h1>
          <motion.div
            className="w-24 h-1 mx-auto mb-8"
            style={{ backgroundColor: "#29688A" }}
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
        </motion.div>

        {/* Main Content */}
        <motion.div className="space-y-8 text-gray-700 leading-relaxed" variants={itemVariants}>
          <motion.p className="text-lg" variants={itemVariants}>
            SME Chamber of India is a leading organisation and putting efforts for the empowerment of SME sector for
            global competitiveness, business growth, export promotion, business transformation and diversification for
            the last{" "}
            <span className="font-semibold" style={{ color: "#29688A" }}>
              32 years
            </span>
            .
          </motion.p>

          <motion.p className="text-base" variants={itemVariants}>
            The Chamber has been integrating SMEs, manufacturers, exporters, service providers, corporates,
            mid-corporates, start-ups, professionals, allied industrial & business sectors to explore emerging business
            opportunities in the domestic and global markets, channelizing finance & investment, identifying partners
            for technology transfers, industrial automation, Import facilitation, joint ventures, collaborations,
            mergers & acquisitions, contract manufacturing as well as assisting for marketing, promotion, branding,
            franchise, distribution, Government services & liaison, acquiring advanced & patented technologies, business
            leads & referrals for exports, domestic supply & procurement.
          </motion.p>

          <motion.p className="text-base" variants={itemVariants}>
            The Chamber has been regularly organising various business promotional & educational activities & events to
            brand, market & promote various products and services as well as to enhance knowledge and skill of the
            entrepreneurs for enhancement of{" "}
            <span className="font-semibold" style={{ color: "#29688A" }}>
              10X business growth
            </span>
            , improvement of quality productivity to contribute for the local and global markets.
          </motion.p>

          <motion.p className="text-base" variants={itemVariants}>
            The Chamber provides a unique networking platform to interact with the CEOs of corporates, financial
            institutions, Government officials, heads of regulatory authorities and connectivity with the potential
            SMEs, buyers, suppliers, manufacturers, exporters, importers, investors, service providers, professionals
            and legal firms to communicate, commercialize their business ideas, share business referrals, contacts for
            supply, procurement, B2B & networking meetings & sectorial business meetings to enhance marketing and sales.
          </motion.p>
        </motion.div>

        {/* Leadership Section */}
        <motion.div className="mt-16 p-8 bg-gray-50 rounded-lg" variants={highlightVariants}>
          <motion.h2 className="text-2xl font-bold mb-4" style={{ color: "#29688A" }} variants={itemVariants}>
            Leadership
          </motion.h2>
          <motion.p className="text-base text-gray-700 leading-relaxed" variants={itemVariants}>
            The Chamber is functioning under the dynamic, indomitable leadership of Founder & President,{" "}
            <span className="font-semibold" style={{ color: "#29688A" }}>
              Mr. Chandrakant Salunkhe
            </span>
            , who has been on the forefront to secure the interests of SMEs & manufacturing industries for further
            business growth and achieve success in the local and global markets. He has been on the forefront for policy
            frame work change and its speedy implementation for strengthening SME & manufacturing sectors to make India
            as a manufacturing hub and march towards 'Viksit Bharat' to accomplish the dream of Hon'ble Prime Minister.
          </motion.p>
        </motion.div>

        {/* Key Initiatives */}
        <motion.div className="mt-16" variants={itemVariants}>
          <motion.h2
            className="text-2xl font-bold mb-8 text-center"
            style={{ color: "#29688A" }}
            variants={itemVariants}
          >
            Key Initiatives
          </motion.h2>

          <motion.div className="grid md:grid-cols-2 gap-8" variants={containerVariants}>
            <motion.div
              className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <h3 className="text-lg font-semibold mb-3" style={{ color: "#29688A" }}>
                National SME Manufacturing Mission
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Enhancing manufacturing activities in Tier 2 and 3 cities, providing support for acquiring industrial
                land and setting up manufacturing units.
              </p>
            </motion.div>

            <motion.div
              className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <h3 className="text-lg font-semibold mb-3" style={{ color: "#29688A" }}>
                Global Manufacturing Capability Centres
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Providing opportunities to collaborate with foreign companies for contract manufacturing and joint
                ventures.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Awards Section */}
        <motion.div className="mt-16 text-center" variants={itemVariants}>
          <motion.h2 className="text-2xl font-bold mb-6" style={{ color: "#29688A" }} variants={itemVariants}>
            Recognition & Awards
          </motion.h2>
          <motion.p className="text-base text-gray-700 leading-relaxed max-w-3xl mx-auto" variants={itemVariants}>
            The Chamber has been recognizing successful entrepreneurs, enterprises, Institutions & Individuals for the
            last{" "}
            <span className="font-semibold" style={{ color: "#29688A" }}>
              24 years
            </span>{" "}
            through various national level awards including "India SME Excellence Awards", "Emerging SMEs of India
            Awards", "SME Icons of India Awards", and "National Manufacturing Excellence Awards".
          </motion.p>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="mt-16 text-center p-8 rounded-lg"
          style={{ backgroundColor: "#29688A" }}
          variants={highlightVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <motion.h2 className="text-2xl font-bold text-white mb-4" variants={itemVariants}>
            Join Our Community
          </motion.h2>
          <motion.p className="text-white/90 leading-relaxed max-w-2xl mx-auto" variants={itemVariants}>
            We invite entrepreneurs, enterprises, corporates, family-owned businesses, multi-national companies,
            exporters, importers, buyers, suppliers, service providers, investors, traders, retailers, professionals,
            start-ups and allied industrial & business sectors to enroll the membership to avail various support
            services.
          </motion.p>
        </motion.div>
      </motion.div>
    </main>
  )
}
