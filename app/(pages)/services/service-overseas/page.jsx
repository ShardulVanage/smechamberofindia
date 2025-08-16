"use client"

import { motion } from "framer-motion"
import {
  ArrowRight,
  Globe,
  Handshake,
  Factory,
  TrendingUp,
  Users,
  MapPin,
  ShoppingCart,
  Award,
  BarChart3,
  Truck,
  FileText,
  Building,
  Calendar,
} from "lucide-react"

const services = [
  {
    icon: <Users className="w-6 h-6" />,
    title: "Identifying Indian business partners, manufactures and suppliers",
    description: "Connect with verified Indian partners for your business needs",
  },
  {
    icon: <Factory className="w-6 h-6" />,
    title: "Identify SMEs for contract manufacturing in India",
    description: "Find reliable manufacturing partners for your products",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Identifying business and Investment opportunities in India",
    description: "Discover lucrative investment prospects in growing markets",
  },
  {
    icon: <Handshake className="w-6 h-6" />,
    title: "Buyer-Seller meets with the Indian SMEs in the various cities of India",
    description: "Facilitate direct meetings between international buyers and Indian sellers",
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Identify industrial land, industrial premises and industrial parks/zones",
    description: "Locate suitable industrial spaces for your operations",
  },
  {
    icon: <ShoppingCart className="w-6 h-6" />,
    title: "Identifying buyers, importers and distributors in India",
    description: "Connect with distribution networks across India",
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Business partnership opportunities in 'Make-In-India' initiatives",
    description: "Participate in government-backed manufacturing programs",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Marketing & distribution of products and services in India",
    description: "Comprehensive market entry and distribution strategies",
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Market development, survey, study and research on specific products",
    description: "In-depth market analysis and research services",
  },
  {
    icon: <Truck className="w-6 h-6" />,
    title: "Connecting manufacturing SMEs for exports business",
    description: "Link manufacturers with export opportunities",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Sourcing of quality raw materials and finished products from Indian SMEs",
    description: "Quality sourcing solutions from verified suppliers",
  },
  {
    icon: <Building className="w-6 h-6" />,
    title: "Liaison with the Central and provincial Government authorities",
    description: "Navigate regulatory requirements with expert guidance",
  },
  {
    icon: <Factory className="w-6 h-6" />,
    title: "Setting up manufacturing units and service activities in India",
    description: "End-to-end setup assistance for your operations",
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Assistance to resolve issues and disputes",
    description: "Professional support for business conflict resolution",
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    title: "Organise conferences and events for visiting delegations",
    description: "Event management for business delegations and conferences",
  },
]

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
}

export default function OverseasSMEPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section
        className="relative overflow-hidden bg-gradient-to-br from-[#29688A]/5 via-white to-[#4A90B8]/10 py-20 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-[url('/abstract-geometric-pattern.png')] opacity-5"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 bg-[#29688A]/10 text-[#29688A] rounded-full text-sm font-medium mb-4">
              Global Business Solutions
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Overseas SME
              <span className="block text-[#29688A]">Services</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive business solutions connecting overseas SMEs with Indian markets, manufacturing capabilities,
              and growth opportunities.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button className="group bg-[#29688A] hover:bg-[#29688A]/90 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105">
           Join Membership
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border-2 border-[#29688A] text-[#29688A] hover:bg-[#29688A] hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300">
              Learn More
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section
        className="py-20 px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Comprehensive Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tailored solutions to help overseas SMEs establish and expand their presence in the Indian market
            </p>
          </motion.div>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={containerVariants}>
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                }}
                className="group bg-white hover:bg-gray-50 border border-gray-200 rounded-xl p-6 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#29688A]/10 group-hover:bg-[#29688A] group-hover:text-white text-[#29688A] rounded-lg flex items-center justify-center transition-all duration-300">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#29688A] transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-20 px-4 bg-gradient-to-r from-[#29688A]/5 to-[#4A90B8]/10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Expand Your Business in India?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Let us help you navigate the Indian market with our comprehensive SME services and expert guidance.
          </p>
          <motion.button
            className="bg-[#29688A] hover:bg-[#29688A]/90 text-white px-10 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
           Join Membership
          </motion.button>
        </div>
      </motion.section>
    </div>
  )
}
