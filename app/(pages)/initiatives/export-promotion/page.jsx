"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const tabs = [
  { id: "introduction", label: "INTRODUCTION" },
  { id: "objectives", label: "OBJECTIVES" },
  { id: "activities", label: "ACTIVITIES" },
  { id: "support", label: "SUPPORT SERVICE" },
  { id: "initiated", label: "INITIATED BY" },
]

const tabContent = {
  introduction: {
    title: "Introduction",
    content: `In today's globalized economy, Small and Medium Enterprises (SMEs) play a crucial role in driving the economic growth, fostering innovation, and creating jobs. However, despite their significant contributions, SMEs often face numerous challenges, when attempting to enter into international markets. To address these challenges and support SMEs in their export endeavours, there is an imminent need to help SMEs to guide, handhold and mentor them with the required information and help them to grow and increase their exports.

We have observed that many enterprises are successfully running their businesses and having enough turnover for local markets but they are not able to explore the international markets, due to lack of knowledge, connectivity, procedural lacuna, awareness about trade benefits and barriers, fear about loss of receivables, knowledgeable and skilled work force for compliances, procedures, formalities and difficulties while dealing with the customers, customs, shipping, ports, local taxation, banking, international trade norms, restrictions, benefits and advantages of various schemes and policies, insurance, competitions in the markets, quality, price, demand, supply and other aspects, which are creating hurdles and loss of revenues.

Keeping in mind the pivotal role of SMEs, SME Export Promotion Council jointly with SME Chamber of India, SME Business Management Institute, Packaging Industry Association of India (PIAI), Maharashtra Industry Development Association (MIDA), Gujarat Industry Development Association (GIDA) and India International Trade Centre (IITC-INDIA) have initiated "SME EXPORT PROMOTION FACILITATION CENTRE" (SEPFC), to support & assist the emerging SMEs and manufacturing industries to enter into global markets for the promotion of exports and allied business activities.`,
  },
  objectives: {
    title: "Objectives",
    content: `The main objectives of the SME Export Promotion Facilitation Centre are:

• Enhancing Export Readiness: Equipping SMEs with the necessary knowledge, skills, and resources to prepare for and succeed in the international markets.

• Market Expansion: Assisting SMEs in identifying and penetrating new export markets to increase their global footprint.

• Capacity Building: Strengthening the operational and strategic capabilities of SMEs to sustain long-term export growth.

• Reducing Export Barriers: Providing solutions to mitigate the barriers and challenges faced by SMEs in the export process.

• Fostering Innovation and Competitiveness: Encouraging SMEs to innovate and adopt competitive practices to enhance their export performance.`,
  },
  activities: {
    title: "Activities",
    content: `• Awareness Campaigns: Raising awareness about the benefits and opportunities of exporting through seminars, webinars, and informational materials.

• Training and Workshops: Offering targeted training programs and workshops on various aspects of exporting, such as market research, export documentation, international trade regulations, and logistics.

• Consultation Services: Providing one-on-one consultations with export experts to address specific challenges and develop tailored export strategies.

• Market Research and Intelligence: Conducting market research to provide SMEs with insights into potential export markets, consumer preferences, competitive landscapes, and emerging markets.

• Networking and Matchmaking: Organizing networking events and trade missions to connect SMEs with the potential international partners, buyers, and distributors.

• Financial Assistance and Incentives: Facilitating access to export financing options, grants, and incentives to support SMEs in their export activities.

• Legal and Regulatory Assistance: Offering guidance on legal and regulatory compliance, including rules and regulations, quality standards, and certification requirements, to ensure SMEs adhere to necessary standards and practices.

• Digital Export Promotion: Leveraging digital platforms and e-commerce to promote SME products and services globally.

• Logistics and Shipping Support: Providing assistance with logistics, shipping, and packaging to ensure that products reach international markets efficiently and in good condition.`,
  },
  support: {
    title: "Support Services",
    content: `The SME Export Promotion Facilitation Centre will provide a comprehensive suite of offerings designed to support SMEs at every stage of their export journey. These offerings include:

• Export Readiness Assessment: An in-depth evaluation to determine an SME's preparedness for export activities, identifying strengths and areas for improvement.

• Customized Export Plans: Development of tailored export plans that outline strategic steps for market entry, growth, and sustainability.

• Training Programs: A variety of training modules covering topics such as international marketing, export finance, cross-cultural communication, and supply chain management.

• Advisory Services: Access to expert advisors who provide ongoing support and guidance on export-related issues and opportunities.

• Market Entry Support: Assistance with market entry strategies, including partner identification, market visits, promotional activities, and understanding the company's products and rates.

• Trade Missions and Expos: Opportunities to participate in international trade missions, exhibitions, and fairs to showcase products and services to a global audience.

• Export Financing Solutions: Information and support on obtaining export financing, including loans, insurance, and risk management products.

• Regulatory Compliance Assistance: Guidance on meeting international standards, certifications, and regulatory requirements to ensure smooth market entry and operations.

• E-commerce Enablement: Support for SMEs to develop and enhance their online presence, leveraging e-commerce platforms to reach international customers.

• Documentation and Formalities: Assistance with the preparation and management of export documentation, formalities, and compliance with policies and schemes.`,
  },
  initiated: {
    title: "Initiated By",
    content: `SME CHAMBER OF INDIA is a prominent national apex organization, and has been offering support and assistance for the past 31 years to SMEs, manufacturing industries, exporters, service sectors, mid-corporates, startups, allied industrial and business entities. Its support spans various aspects such as business growth, export promotion, supply and procurement, finance and investment channelization, import facilitation, establishment of new manufacturing industries, joint ventures, technology transfers, collaborations, contract manufacturing, branding, marketing, promotion, franchise, distribution, Government services, liaison activities and identification of business partners for mergers and acquisitions.



SME EXPORT PROMOTION COUNCIL has been providing support services to Indian SMEs, manufacturers, exporters and service export companies, to initiate and enhance export business, identify emerging markets, establish business contacts, promote products & services in specific markets, channelize trade finance and financial support, appointment of buying and selling agents, connectivity with buyers, importers, marketing and distribution agencies, companies from supply chain management, experts and consultants, exhibitions, conferences, buyer-seller meets, business matchmaking organizers and facilitators from various companies.

`,
  },
}

export default function SMEExportCentre() {
  const [activeTab, setActiveTab] = useState("introduction")

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Image Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative h-80 bg-gradient-to-r from-[#29688A] to-[#3a7ba3] flex items-center justify-center"
      >
        <div className="text-center text-white px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            SME Export Promotion
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl md:text-3xl font-light"
          >
            Facilitation Centre
          </motion.h2>
        </div>
      </motion.div>
        <>
              <div>
                        <Image
                            src="/smeexportpromo.jpg"
                            alt="SME Export Promotion Facilitation Centre"
                            width={800} 
                            height={400}
                            className="mx-auto h-auto mb-6  object-contain "
                        />
                        <hr className="mb-4"/>
                    </div>
        </>
      {/* Navigation Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-white shadow-sm border-b"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-2 py-4">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id ? "bg-[#29688A] text-white shadow-md" : "text-[#29688A] hover:bg-[#29688A]/10"
                }`}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="text-3xl font-bold text-[#29688A] mb-6"
                >
                    
                  {tabContent[activeTab].title}
                </motion.h3>

                 {activeTab === "initiated" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-8 flex justify-center gap-8 items-center py-3"
                  >
                    <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
                    <Link href="https://www.smechamberofindia.com/" target="_blank" rel="noopener noreferrer">
                      <img
                        src="/sme-logo.svg"
                        alt="SME Chamber of India"
                        className="h-20 w-auto"
                      />
                        </Link>
                    </div>
                    <div className="bg-gray-100 p-1 rounded-lg shadow-sm">
                        <Link href="https://www.smeexports.com/" target="_blank" rel="noopener noreferrer">
                      <img
                        src="/smeepc.jpg"
                        alt="SME Export Promotion Council"
                        className="h-32 w-auto"
                      />
                        </Link>
                    </div>
                  </motion.div>
                )}
               
              
               
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                >
                  {tabContent[activeTab].content.split("\n").map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </motion.div>

                {/* Logo section for "Initiated By" tab */}
               
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="bg-[#29688A] text-white py-8 mt-12"
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-lg font-medium mb-2">SME Export Promotion Facilitation Centre</p>
          <p className="text-sm opacity-90">Empowering SMEs to achieve global success</p>
        </div>
      </motion.footer>
    </div>
  )
}
