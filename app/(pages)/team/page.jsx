"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import FounderPresident from "./components/founder-president"
import AdvisoryBoardRoles from "./components/advisory-board-roles"
import NationalAdvisoryBoard from "./components/national-advisory-board"
import InternationalAdvisoryBoard from "./components/international-advisory-board"

export default function TeamPage() {
  const [activeTab, setActiveTab] = useState("founder")

  const tabs = [
    { id: "founder", label: "Founder & President" },
    { id: "advisory-role", label: "Role & Responsibility of Advisory Board" },
    { id: "national-board", label: "Members of National Advisory Board" },
    { id: "international-board", label: "Members of International Advisory Board" },
  ]

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
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <motion.div
        className="bg-[#29688A] text-white py-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Team</h1>
          <p className="text-xl opacity-90">Leadership driving SME empowerment across India</p>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        className="bg-gray-50 border-b"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-2 py-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-[#29688A] text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {activeTab === "founder" && <FounderPresident />}
        {activeTab === "advisory-role" && <AdvisoryBoardRoles />}
        {activeTab === "national-board" && <NationalAdvisoryBoard />}
        {activeTab === "international-board" && <InternationalAdvisoryBoard />}
      </div>
    </div>
  )
}
