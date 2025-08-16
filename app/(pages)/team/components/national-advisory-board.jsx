"use client"

import { motion } from "framer-motion"

export default function NationalAdvisoryBoard() {
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

  const chairman = {
    name: "Mr. Chandrakant Salunkhe",
    title: "Founder & President",
    organization:
      "SME Chamber of India and Federation of Indian SME Associations Chairman and Managing Director, Macro Group of Companies",
    image: "/assets/team/president.png",
  }

  const managementTeam = [
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
    {
      name: "Ms. Madhuri Khanwalkar",
      title: "Secretary General",
      organization: "SME Chamber of India",
      image: "/assets/team/madhuri.png",
    },
  ]

  const boardMembers = [
    {
      name: "Mr. Varathan T. R.",
      title: "Director",
      organization: "Macro Group Pvt. Ltd. Vice President of the Chamber",
      image: "/assets/team/Varadhan.t.r.jpg",
    },
    {
      name: "Mr. Prabhpreet Nathani",
      title: "Founder",
      organization: "Beacon Trusteeship Ltd Vermillion Analytics Pvt. Ltd. and Vice President of the Chamber",
      image: "/assets/team/PratapsinghNathani.jpg",
    },
    {
      name: "Mr. Virendra Jivani",
      title: "Founder & MD",
      organization: "Orbit Earth Solution India Pvt. Ltd.",
      image: "/assets/team/VirendraJhamb.jpg",
    },
    {
      name: "Mr. Kishor Kharat",
      title: "Former MD & CEO",
      organization: "Indian Bank and IDBI Bank and Chairman, SME Banking and Finance Council, SME Chamber of India",
      image: "/assets/team/KishorKharat.jpg",
    },
    {
      name: "Dr. Rajendra Jagdale",
      title: "Director",
      organization:
        "Science and Technology Park Ltd. Institute Promoted by Govt. of Science & Technology, Government of India",
      image: "/assets/team/RajendraJagdale.jpg",
    },
    {
      name: "Prof. Seema Sane",
      title: "Former",
      organization: "Higher Education Society",
      image: "/assets/team/SeemaSaini.jpg",
    },
    {
      name: "Mr. Prashant Nagre",
      title: "Managing Director",
      organization: "Advertising & Consultant",
      image: "/assets/team/PrashantNagre.jpg",
    },
    {
      name: "Dr. R. Krishnamani",
      title: "Principal Consultant",
      organization: "SME Business Coach Former Chief Executive Officer of Dena Bank",
      image: "/assets/team/Dr_R_Seetharaman.jpg",
    },
    {
      name: "Mr. Prakash Patil",
      title: "Managing Director",
      organization: "Bhumi World International Pvt. Ltd. President, SME Chamber of India (Industrial) Pune & MIDC",
      image: "/assets/team/PrakashPatel.jpg",
    },
    {
      name: "Mr. Alessandro Giuliani",
      title: "Managing Director",
      organization: "SDA Bocconi Asia Center (India and Italy)",
      image: "/assets/team/AlessandroGiuliani.jpg",
    },
    {
      name: "Mr. Subodh Benkar",
      title: "Former MD & CEO",
      organization: "Investment Advisory & Distribution, JM Financial Ltd.",
      image: "/assets/team/subodh_shinkar.jpg",
    },
    {
      name: "Mr. Ranjit Saha",
      title: "Chief Executive Officer",
      organization: "SEAAG",
      image: "/assets/team/Samir_Sathe.jpg",
    },
    {
      name: "Dr. Subramanya Kumar",
      title: "Chairman & CEO",
      organization: "AquaKraft Group Ventures",
      image: "/assets/team/Kusnur.jpg",
    },
    {
      name: "Ms. Manjusha Bhave",
      title: "Chairperson & MD",
      organization: "GRMA Group of Companies India & Singapore",
      image: "/assets/team/Bhave.jpg",
    },
    {
      name: "Mr. Markus Pfefferer",
      title: "Managing Partner",
      organization: "CORMAG Advisory LLP Bangalore, India",
      image: "/assets/team/Markus_Pfefferer.jpg",
    },
    {
      name: "Dr. Sushant Thappa",
      title: "Director",
      organization: "India Medical Mart",
      image: "/assets/team/Sushant_Thappa.jpg",
    },
    {
      name: "Mr. Ajit Shah",
      title: "Director",
      organization: "Universal Connections (Consultancy on International Trade & Training)",
      image: "/assets/team/AjitShah.jpg",
    },
    {
      name: "Mr. Rajesh Bhagat",
      title: "Managing Director",
      organization: "Worldex India Exhibition & Promotion Pvt. Ltd.",
      image: "/assets/team/RajeshBhagat.jpg",
    },
    {
      name: "Mr. Ravindra Kumar",
      title: "Former Director",
      organization: "Standard Bank (South Africa) and Consultant, Finance & Advisory",
      image: "/assets/team/RavindraKumar.jpg",
    },
  ]

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-12">
      <motion.div variants={itemVariants} className="text-center bg-blue-100 py-6 rounded-lg">
        <h2 className="text-3xl font-bold text-[#29688A] mb-2">NATIONAL ADVISORY BOARD</h2>
        <p className="text-gray-600 text-lg">June 2025 - May 2027</p>
      </motion.div>

      <motion.div variants={itemVariants} className="text-center space-y-6">
        <h3 className="text-2xl font-bold text-[#29688A]">Chairman of National Advisory Board</h3>
        <div className="flex flex-col items-center space-y-4">
          <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#29688A]">
            <img
              src={chairman.image || "/placeholder.svg"}
              alt={chairman.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center">
            <h4 className="text-xl font-bold text-[#29688A] underline">{chairman.name}</h4>
            <p className="text-gray-700 font-medium">{chairman.title}</p>
            <p className="text-gray-600 max-w-md mx-auto">{chairman.organization}</p>
          </div>
        </div>
      </motion.div>

 <motion.div variants={itemVariants} className="space-y-6">
        <div className="text-center bg-blue-100 py-4 rounded-lg">
          <h3 className="text-2xl font-bold text-[#29688A]">MEMBERS OF THE BOARD</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {boardMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center space-y-3 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-[#29688A]">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h4 className="font-bold text-[#29688A] text-sm">{member.name}</h4>
                <p className="text-gray-700 text-xs">{member.title}</p>
                <p className="text-gray-600 text-xs leading-tight">{member.organization}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-6">
        <div className="text-center bg-blue-100 py-4 rounded-lg">
          <h3 className="text-2xl font-bold text-[#29688A]">MANAGEMENT TEAM</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {managementTeam.map((member, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center space-y-4 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-[#29688A]">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h4 className="font-bold text-[#29688A]">{member.name}</h4>
                <p className="text-gray-700 text-sm">{member.title}</p>
                <p className="text-gray-600 text-xs">{member.organization}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

     
    </motion.div>
  )
}
