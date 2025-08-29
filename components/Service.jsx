"use client"

import DisplayCards from "./card-stack"
import { Building2, Users, MessageSquare, Award } from "lucide-react"
import { motion } from "framer-motion"

const iconMap = {
  "SME-Marketplace": <Building2 className="size-4 text-white" />,
  "SME-talks": <MessageSquare className="size-4 text-white" />,
  "SME-Coach": <Users className="size-4 text-white" />,
  "brand-smes": <Award className="size-4 text-white" />,
}

const products = [
  {
    id: "SME-Marketplace",
    href: "https://market-app-bice.vercel.app/",
    title: "SME Marketplace",
    subtitle: "Global Markets",
    image:
      "https://images.unsplash.com/photo-1642543348745-03b1219733d9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    specs: [
      { label: "Markets", value: "180+" },
      { label: "Guidance", value: "Complete" },
      { label: "Documentation", value: "Full" },
      { label: "Success", value: "Proven" },
    ],
  },
  {
    id: "SME-talks",
    title: "SME talks",
    href: "https://smetalks.com/",
    subtitle: "Global Markets",
    image:
      "https://images.unsplash.com/photo-1449586919022-f3dfddc48a71?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    specs: [
      { label: "Process", value: "Simplified" },
      { label: "Time", value: "7-15 days" },
      { label: "Support", value: "Expert" },
      { label: "Cost", value: "Affordable" },
    ],
  },
  {
    id: "SME-Coach",
    title: "SMECoach",
    href: "https://smecoach.in/index.php#",
    subtitle: "Business Connections",
    image:
      "https://plus.unsplash.com/premium_photo-1665203422028-68d636f2c944?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    specs: [
      { label: "Members", value: "50,000+" },
      { label: "Events", value: "Monthly" },
      { label: "Sectors", value: "All" },
      { label: "Growth", value: "Assured" },
    ],
  },
  {
    id: "brand-smes",
    title: "Brand Smes",
    href: "https://brandsmes.com/",
    subtitle: "Skill Enhancement",
    image:
      "https://images.unsplash.com/photo-1568992688065-536aad8a12f6?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    specs: [
      { label: "Programs", value: "100+" },
      { label: "Experts", value: "Industry" },
      { label: "Format", value: "Online/Offline" },
      { label: "Certification", value: "Recognized" },
    ],
  },
]

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

const titleVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
}

const featureVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1
    }
  }
}

const cardContainerVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      delay: 0.3
    }
  }
}

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

export default function ServicesSection() {
  const serviceCards = products.slice(0, 6).map((product, index) => ({
    icon: iconMap[product.id],
    title: product.title,
    description: product.subtitle,
    image: product.image,
    specs: product.specs,
    href: product.href,
    className:
      index === 0
        ? "[grid-area:stack] translate-y-4 hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0"
        : index === 1
        ? "[grid-area:stack] translate-x-8 -translate-y-4 hover:-translate-y-12 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0"
        : index === 2
        ? "[grid-area:stack] translate-x-16 -translate-y-8 hover:-translate-y-15 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0"
        : index === 3
        ? "[grid-area:stack] translate-x-24 -translate-y-12 hover:-translate-y-18 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0"
        : index === 4
        ? "[grid-area:stack] translate-x-32 -translate-y-16 hover:-translate-y-21 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0"
        : "[grid-area:stack] translate-x-40 -translate-y-20 hover:-translate-y-24 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  }))

  return (
    <motion.section
      className="min-h-full bg-white py-12 px-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="grid lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
        >
          {/* Left Side Content */}
          <div className="space-y-8">
            <motion.div className="space-y-4" variants={itemVariants}>
              <motion.h2
                className="text-4xl lg:text-5xl font-bold leading-tight"
                style={{ color: "#29688A" }}
                variants={titleVariants}
              >
                Empowering SMEs with
                <motion.span
                  className="block"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  Comprehensive Solutions
                </motion.span>
              </motion.h2>
              <motion.p
                className="text-lg text-gray-600 leading-relaxed"
                variants={itemVariants}
              >
                Discover our suite of integrated services designed to accelerate your business growth, connect you with
                global markets, and provide expert guidance every step of the way.
              </motion.p>
            </motion.div>

            <motion.div className="space-y-6" variants={containerVariants}>
              <motion.div className="flex items-start gap-4" variants={featureVariants}>
                <motion.div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#29688A" }}
                  variants={iconVariants}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Building2 className="w-6 h-6 text-white" />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Global Market Access</h3>
                  <p className="text-gray-600">
                    Connect with 180+ markets worldwide and expand your business reach with our comprehensive
                    marketplace platform.
                  </p>
                </motion.div>
              </motion.div>

              <motion.div className="flex items-start gap-4" variants={featureVariants}>
                <motion.div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#29688A" }}
                  variants={iconVariants}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Users className="w-6 h-6 text-white" />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Coaching</h3>
                  <p className="text-gray-600">
                    Get personalized guidance from industry experts and join a community of 50,000+ successful
                    entrepreneurs.
                  </p>
                </motion.div>
              </motion.div>

              <motion.div className="flex items-start gap-4" variants={featureVariants}>
                <motion.div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#29688A" }}
                  variants={iconVariants}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Award className="w-6 h-6 text-white" />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Skill Development</h3>
                  <p className="text-gray-600">
                    Access 100+ training programs with recognized certifications to enhance your business capabilities.
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div className="pt-4" variants={itemVariants}>
              <motion.button
                className="px-8 py-3 text-white font-semibold rounded-lg transition-all duration-200"
                style={{ backgroundColor: "#29688A" }}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Explore All Services
              </motion.button>
            </motion.div>
          </div>

          {/* Right Side Cards */}
          <motion.div
            className="flex justify-center lg:justify-end"
            variants={cardContainerVariants}
          >
            <motion.div
              className="w-full max-w-lg"
              initial={{ opacity: 0, rotateY: 20 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <DisplayCards cards={serviceCards} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}