"use client"

import { motion } from "framer-motion"

export default function InternationalAdvisoryBoard() {
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

  const coordinatingTeam = [
    {
      name: "Mr. S. Maheshkumar",
      title: "Director & General Secretary",
      organization: "SME Chamber of India",
      image: "/assets/team/mahesh_salunkhe.jpg",
    },
    {
      name: "Ms. Saakshi Kulkarni",
      title: "Director",
      organization: "SME Chamber of India",
      image: "/assets/team/Saakshi_Kulkarni.png",
    },
  ]

  const boardMembers = [
    {
      name: "Dr. R. Seetharaman",
      title: "Principal Advisor, India - GCC SME Business Council",
      subtitle: "Former Chief Executive Officer of Doha Bank",
      image: "/assets/team/Dr_R_Seetharaman.jpg",
    },
    {
      name: "Mr. Ajay Jha",
      title: "CEO",
      subtitle: "INNOP Global Incubator / Accelerator, Denver, Colorado, USA",
      image: "/assets/team/Ajay Jha.jpg",
    },
    {
      name: "Mr Rakhmad Sobirov",
      title: "Managing Director",
      subtitle: "Sobirovs Law Firm, Toronto, Canada, Director – India-Canada SME Business Council (Canada Region)",
      image: "/assets/team/Rakhmad.jpg",
    },
    {
      name: "Mr. Deepak Shinde",
      title: "Chief Representative (Supply Chain & Sourcing)",
      subtitle: "Larsen & Toubro Ltd. Shanghai, China",
      image: "/assets/team/Deepak.jpg",
    },
    {
      name: "Mr. Radion Popov",
      title: "Director, Europe – India SME Business Council",
      subtitle: "Former State Minister for Foreign Affairs, Bulgaria",
      image: "/assets/team/Radion Popov.jpg",
    },
    {
      name: "Mr. Miten Mehta",
      title: "Global Business Leader, Xoogler, Google Cloud (GCP)",
      subtitle:
        "Chief Alliance Officer, CleverTap and Director of Start-Ups Council of India for USA (Initiated by SME Chamber of India)",
      image: "/assets/team/Miten Mehta.jpg",
    },
    {
      name: "Mr. Sailesh Nathan",
      title: "Chairman & MD, Buy-Do-Buy Advertising LLC, Dubai",
      subtitle: "Regional Director, SME Chamber of India (GCC Countries)",
      image: "/assets/team/Sailesh Nathan.jpg",
    },
    {
      name: "Datuk Abdul Malik Abdullah",
      title: "Group Chairman",
      subtitle: "D'Tandoor International Group of Companies, Malaysia",
      image: "/assets/team/Abdul Malik Abdullah.jpg",
    },
    {
      name: "Mr. Rajeev Supekar",
      title: "Director",
      subtitle: "Global Business Development Division, Chodai Co. Ltd. Tokyo- Japan",
      image: "/placeholder.jpg",
    },
  ]

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-12">
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center bg-blue-100 py-6 rounded-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">INTERNATIONAL ADVISORY BOARD</h2>
        <p className="text-gray-600">June 2023 - May 2025</p>
      </motion.div>

      {/* Chairman Section */}
      <motion.div variants={itemVariants} className="text-center space-y-6">
        <h3 className="text-2xl font-semibold text-gray-800">Chairman of International Advisory Board</h3>
        <div className="flex flex-col items-center space-y-4">
          <div className="w-48 h-48 rounded-lg overflow-hidden shadow-lg">
            <img
              src="/assets/team/president.png"
              alt="Mr. Chandrakant Salunkhe"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center">
            <h4 className="text-xl font-semibold text-[#29688A] mb-2">Mr. Chandrakant Salunkhe</h4>
            <p className="text-gray-600 mb-1">Founder & President</p>
            <p className="text-gray-600 text-sm max-w-md">
              SME Chamber of India and Federation of Indian SME Associations Chairman and Managing Director, Macro Group
              of Companies
            </p>
          </div>
        </div>
      </motion.div>

      {/* Coordinating Team */}
      <motion.div variants={itemVariants} className="space-y-6">
        <div className="text-center bg-blue-100 py-4 rounded-lg">
          <h3 className="text-2xl font-semibold text-gray-800">COORDINATING TEAM</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {coordinatingTeam.map((member, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-42 h-42 mx-auto mb-4 rounded-lg overflow-hidden">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <h4 className="text-lg font-semibold text-[#29688A] mb-2">{member.name}</h4>
              <p className="text-gray-600 text-sm mb-1">{member.title}</p>
              <p className="text-gray-500 text-sm">{member.organization}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Board Members */}
      <motion.div variants={itemVariants} className="space-y-6">
        <div className="text-center bg-blue-100 py-4 rounded-lg">
          <h3 className="text-2xl font-semibold text-gray-800">MEMBERS OF INTERNATIONAL ADVISORY BOARD</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {boardMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-42 h-42 mx-auto mb-4 rounded-lg overflow-hidden">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <h4 className="text-lg font-semibold text-[#29688A] mb-2">{member.name}</h4>
              <p className="text-gray-600 text-sm mb-2">{member.title}</p>
              <p className="text-gray-500 text-xs leading-relaxed">{member.subtitle}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
