"use client"


import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { MapPin, Phone, Mail, Clock, Building2, Globe } from "lucide-react"
import contactData from "@/data/contact-data.json"
import Form from "./Form"

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

export default function ContactPage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#29688A" }}>
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get in touch with us through any of our offices worldwide or fill out the form below
          </p>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Head Office */}
          <motion.div variants={fadeInUp}>
            <Card className="h-full border-2 hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2" style={{ color: "#29688A" }}>
                  <Building2 className="h-5 w-5" />
                  {contactData.headOffice.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-1 text-gray-500" />
                  <p className="text-sm text-gray-700">{contactData.headOffice.address}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <div className="text-sm">
                    {contactData.headOffice.emails.map((email, idx) => (
                      <div key={idx} className="text-gray-700">
                        {email}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <div className="text-sm text-gray-700">
                    Mobile: {contactData.headOffice.phones.join(" / ")}
                    <br />
                    Tel: {contactData.headOffice.landlines.join(" / ")}
                    <br />
                    Fax: {contactData.headOffice.fax}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <div className="text-sm text-gray-700">
                    {contactData.headOffice.workingDays} | {contactData.headOffice.workingHours}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Regional Offices */}
          <motion.div variants={fadeInUp}>
            <Card className="h-full border-2 hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2" style={{ color: "#29688A" }}>
                  <Globe className="h-5 w-5" />
                  Regional Offices
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 max-h-96 overflow-y-auto">
                {contactData.regionalOffices.map((office, idx) => (
                  <div key={idx} className="border-b border-gray-100 pb-2 last:border-b-0">
                    <h4 className="font-semibold text-sm" style={{ color: "#29688A" }}>
                      {office.region}
                    </h4>
                    {office.address && <p className="text-xs text-gray-600 mt-1">{office.address}</p>}
                    <div className="flex flex-col gap-1 mt-1">
                      <span className="text-xs text-gray-700">Mobile: {office.mobile}</span>
                      <span className="text-xs text-gray-700">Email: {office.email}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Overseas Offices */}
        <motion.div className="mb-16" variants={fadeInUp} initial="initial" animate="animate">
          <Card className="border-2 hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2" style={{ color: "#29688A" }}>
                <Globe className="h-5 w-5" />
                Overseas Offices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contactData.overseasOffices.map((office, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-sm mb-2" style={{ color: "#29688A" }}>
                      {office.region}
                    </h4>
                    {office.company && <p className="text-xs font-medium text-gray-700 mb-1">{office.company}</p>}
                    <p className="text-xs text-gray-600 mb-2">{office.address}</p>
                    <span className="text-xs text-gray-700">Email: {office.email}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Form */}
         <Form/>       
      </div>
    </div>
  )
}
