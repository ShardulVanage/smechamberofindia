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
    content: `SME ELECTRONIC PRODUCTS EXPORT PROMOTION COUNCIL is initiated to provide an exclusive support to the SME Sector for the promotion of exports and other business activities. Indian SMEs have limited resource and support to identify emerging business opportunities from international markets. They are also facing problems to get export orders because of lack of information, contacts, negotiation skills, knowledge about potential markets, insufficient funds and lack of support from the various Government agencies. The Council has connectivity in various countries for the promotion of SMEs business and to identify potential markets for their quality products.

The Council is founded by Mr. Chandrakant Salunkhe, President, SME Chamber of India (Small and Medium Business Development Chamber of India) and SME Export Promotion Council for enhancing the business growth of SMEs and to develop trade with untapped markets. Mr. Salunkhe observed that many Small and Medium Entrepreneurs are not capable to enter into international markets of their own, even though they have quality products and services.

The Council offers a range of services designed to accelerate exports for its members, market research and studies in key international markets, and facilitates participation in global trade shows, conferences, and exhibitions to promote India's electronics, software, and IT sectors. To enhance the brand equity of Indian IT, publicity campaigns and created exclusive India pavilions at the major trade shows.

The Council also fosters business connections by organising buyer-seller meets, managing business missions, and providing matchmaking and contract promotion services. Additionally, it sends trade inquiries and global tenders related to the electronics and IT to its members.

For foreign companies looking to establish business links in India, The Council offers services such as locating reliable suppliers of Indian products, providing current supply information, and delivering customized services. It also supports its members and overseas companies with valuable information, acting as a single point of contact and an information kiosk for smaller enterprises, and assisting them in advancing the value chain..`,
  },
  objectives: {
    title: "Objectives",
    content: `Export promotion of SME Sector
• Partnership and Alliances
• Education and Awareness Programs
• Quality Improvement
• Channelize Finance for Exports
• Connectivity between SMEs & Large Companies`,
  },
  activities: {
    title: "Activities",
    content: `
• Delegations and Trade Missions
• Trade Promotional activities
• Interface with the Government Agencies
• Group Marketing
• Expo Participation Services
• Permanent display centers in the various countries
• Country Specific Information on Trade Policies
• Catalogue shows in the overseas exhibitions
• Newsletters / Magazines
• Buyer - Seller Meets and Matchmaking
• Organise Trade Fairs / Exhibitions & Conferences
TRAINING PROGRAMS AND EDUCATIONAL ACTIVITIES
• Basic Knowledge on Exports to start Exports
• How to identify buyers and importers?
• Export documentation and procedures
• Foreign Trade Policy and Advantages
• Export Incentives and Schemes
• Financial assistance for export promotion
• Deemed Export Activities
• Service Exports
• How to avail Export Finance and Buyers Credit?
• Import Management
• How to avail facility from ECGC?
• How to avail EPCG Scheme?
• Advance License facility
• FEMA with reference to export-import
• International Marketing and strategy
• FOREX Management and Risk Minimization
• Letter of Credit and International Payment Settlements
• Logistic and Shipping Management
• Improvement of quality and productivity`,
  },
  support: {
    title: "Support Services",
    content: `•Initiate and develop exports
•Identify Overseas Buyers, Importers & New Markets
•Avail Market Development Assistance (MDA)
•Promote products & services in the specific markets
•Provide business, export leads and import needs
•Identify Representatives / Buying & Selling Agents
•Channelise Export and Project Finance
•Source Raw Materials, Machinery, Products
•Sourcing agent or representatives for International Markets
•Quality and Productivity Improvement
•Investment Promotion
•Identify substitute products
•One - on - One and Buyer-Seller Meetings
•Market research and market survey
•Support for Contract Manufacturing Tie-ups
•Negotiations and Business Advisory Services
•Business Matchmaking
•Export / Import documentation and formalities`,
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
        className="relative h-36 mb-4 bg-gradient-to-r from-[#29688A] to-[#3a7ba3] flex items-center justify-center"
      >
        <div className="text-center text-white px-2">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold mb-1"
          >
            SME ELECTRONIC PRODUCTS EXPORT PROMOTION COUNCIL
          </motion.h1>
          {/* <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl md:text-3xl font-light"
          >
            Facilitation Centre
          </motion.h2> */}
        </div>
      </motion.div>
        <>
              <div>
                        <Image
                            src="/electronic-export/smeefc.jpg"
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
               
                 {activeTab === "introduction" && (<>
                    <div>
                        <Image
                            src="/electronic-export/img.jpeg"
                            alt="SME Export Promotion Facilitation Centre"
                            width={800} 
                            height={400}
                            className="mx-auto h-auto mt-6 object-contain "
                            />
                        <hr className="mt-4"/>
                    </div>
                    <div>
                        <p>Mr. S. Krishnan – Secretary, Ministry of Electronics & Information Technology, Government of India Launching of SME Electronic Products Export Promotion Council (Initiated by SME Chamber of India and SME Export Promotion Council). Others (L to R) Mr. Chandrakant Salunkhe, Founder and President - SME Chamber of India and Maharashtra Industry Development Association (MIDA), Mr. Ashish Kumar Chauhan - MD & CEO, National Stock Exchange of India Ltd. and Mr. S. Maheshkumar – Director, SME Chamber of India.</p>
                    </div>
                            </>
                 )}
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
