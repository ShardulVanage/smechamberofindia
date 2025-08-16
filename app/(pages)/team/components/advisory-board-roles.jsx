"use client"

import { motion } from "framer-motion"

export default function AdvisoryBoardRoles() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const roles = [
    "To provide advice to organise various activities (virtual or ground events) for the empowerment of SME sector.",
    "To share views, new ideas & concepts for the benefit of SME sector",
    "To give suggestions and recommendations for policy framework change and its implementations, new schemes, incentives, plans & unique strategies for strengthening of SMEs for global competitiveness",
    "To participate in the various events, expert committee meetings and round table discussions with SMEs, Union Ministers, Government Officials, Heads of Agencies and Regulatory Bodies",
    "To associate & contribute in various projects or assignments taken up by the Chamber from Private sector or Government departments for the advantages of SME sector as per their expertise & interest.",
    "To guide and mentor SMEs, Start-Ups, Women and Young Entrepreneurs for business growth and transformation of SMEs into emerging enterprises.",
    "To represent the Chamber at the private, public and Government platforms.",
    "To review various issues related to SMEs and present to appropriate Government departments.",
    "To advise & encourage SMEs to become member of the Chamber to avail various support services for the business growth and expansion/diversification.",
    "To be the member of various expert committees or task force of the Chamber and Government Authorities",
    "To recommend Corporate, MNCs, companies or institutions for collaborations, association, sponsorship and membership",
    "To share articles for SMEConnect Magazine on various topics",
    "To suggest the member to be nominated as the member on various Government committees",
    "To recommend successful SMEs or Enterprises for India SME Excellence Awards",
    "To share views on the various TV Channels, media and member of the panel discussion",
    "The Chamber or members of the board will not be responsible for any personal or business issues or such legal complications or personal issues or legal cases of any member of the Board.",
    "Views, statements and opinions shared by any member in media or any other platform or event, will be their personal understandings. In this regard the chamber or board members will not be responsible or accountable for any legal complications.",
    "Members will not be responsible for any financial or legal complications arising from the activities of the Chamber or its office bearers or members",
  ]

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
      <motion.div variants={itemVariants} className="text-center">
        <h2 className="text-3xl font-bold text-[#29688A] mb-4">
          Role and Responsibility of the National Advisory Board
        </h2>
        <p className="text-gray-600 text-lg max-w-4xl mx-auto">
          The National Advisory Board plays a crucial role in guiding and empowering the SME sector through strategic
          advice, policy recommendations, and active participation in various initiatives.
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="max-w-6xl mx-auto">
        <div className="grid gap-4 md:gap-6">
          {roles.map((role, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex-shrink-0 w-6 h-6 bg-[#29688A] rounded-full flex items-center justify-center mt-1">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <p className="text-gray-700 leading-relaxed">{role}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="text-center bg-gray-50 p-6 rounded-lg">
        <p className="text-gray-600">
          Views and compliments or complaints can be shared on{" "}
          <a href="mailto:secretariat@smechamber.com" className="text-[#29688A] hover:underline font-medium">
            secretariat@smechamber.com
          </a>
        </p>
      </motion.div>
    </motion.div>
  )
}
