"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import MembershipTabs from "./membership-tabs"
import MembershipForm from "./membership-form"

export default function MembershipPage() {
  const [activeTab, setActiveTab] = useState("advantages")
  const [membershipType, setMembershipType] = useState("overseas")

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Membership</h1>
          <p className="text-lg text-gray-600">Join our community and unlock exclusive benefits</p>

          <div className="flex justify-center gap-4 mt-6">
            <Button
              variant={membershipType === "indian" ? "default" : "outline"}
              className={
                membershipType === "indian"
                  ? "bg-[#29688A] hover:bg-[#29688A]/90"
                  : "border-[#29688A] text-[#29688A] hover:bg-[#29688A]/10"
              }
              onClick={() => setMembershipType("indian")}
            >
              Membership for Indian Company
            </Button>
            <Button
              variant={membershipType === "overseas" ? "default" : "outline"}
              className={
                membershipType === "overseas"
                  ? "bg-[#29688A] hover:bg-[#29688A]/90"
                  : "border-[#29688A] text-[#29688A] hover:bg-[#29688A]/10"
              }
              onClick={() => setMembershipType("overseas")}
            >
              Membership for Overseas Company
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - Tabs */}
          <Card className="p-6">
            <MembershipTabs activeTab={activeTab} setActiveTab={setActiveTab} membershipType={membershipType} />
          </Card>

          {/* Right Side - Form */}
          <Card className="p-6">
            <MembershipForm membershipType={membershipType} />
          </Card>
        </div>
      </div>
    </div>
  )
}
