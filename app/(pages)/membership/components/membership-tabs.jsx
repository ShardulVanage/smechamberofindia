"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle, HeadphonesIcon, Users } from "lucide-react"



export default function MembershipTabs({ activeTab, setActiveTab, membershipType }) {
  const tabs = [
    { id: "advantages", label: "Membership Advantages", icon: CheckCircle },
    { id: "support", label: "Support Services", icon: HeadphonesIcon },
    { id: "category", label: "Membership Category", icon: Users },
  ]

  const getAdvantagesContent = () => {
    if (membershipType === "indian") {
      return (
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-[#29688A]">
            <h4 className="font-semibold text-[#29688A] mb-3">Annual Membership (One Year)</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#29688A] mt-0.5 flex-shrink-0" />
                <span>Membership Certificate of the Chamber</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#29688A] mt-0.5 flex-shrink-0" />
                <span>
                  Alerts & information about events, business leads, meetings, updates of Government schemes & policies
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#29688A] mt-0.5 flex-shrink-0" />
                <span>
                  Complimentary invitation for selected business events, conferences, webinars and interactive sessions
                  with Ministers, regulatory heads, corporates, and diplomatic missions
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#29688A] mt-0.5 flex-shrink-0" />
                <span>Eligibility to avail various business advisory services (charges on case-to-case basis)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#29688A] mt-0.5 flex-shrink-0" />
                <span>Opportunity to avail channel partner advantages, products & services at concessional rates</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#29688A] mt-0.5 flex-shrink-0" />
                <span>
                  Guidance for domestic business growth, export promotion, trade leads, marketing & resolving issues
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#29688A] mt-0.5 flex-shrink-0" />
                <span>Complimentary copy of SMEConnect Magazine and other publications</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#29688A] mt-0.5 flex-shrink-0" />
                <span>
                  Participation in executive & training programs on business management, policies, technology,
                  international trade at concessional fees
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-500">
            <h4 className="font-semibold text-amber-700 mb-3">Premium Membership (Three Years)</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <span>Membership Certificate & dedicated key account executive</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <span>Complimentary introduction amongst members through quarterly mailers</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <span>
                  Complimentary invitations to international business forums (GCC, USA, Japan, Canada, Europe, Africa,
                  UK, China)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <span>
                  Business advisory services: Finance channeling, Investment, Private Equity, Venture Capital, IPO
                  support
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <span>Marketing, promotion & branding at national and international markets</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <span>Vendor development registration with corporates, PSUs and MNCs</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <span>Identification of Joint Ventures, Technology Transfer, Mergers & Acquisitions opportunities</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <span>Revival of sick units, NPA restructuring & financially stressed companies support</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <span>Permission to use SME Chamber of India logo on business materials during membership tenure</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <span>20% special discount for SMEConnect Magazine advertisements</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <span>Opportunity to participate as speaker/panelist in conferences, SME TV, and business forums</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <span>Eligibility for India SME Excellence Awards and other recognition programs</span>
              </li>
            </ul>
          </div>
        </div>
      )
    } else {
      return (
        <div className="space-y-3">
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>
                Membership Registration for Inclusion in members Database in the specific sector for Business
                matchmaking & alliance
              </span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>Business leads or business inquiries from other members or clients</span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>
                Connectivity with other members and potential clients to explore emerging business opportunities in
                India
              </span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>Membership Certificate</span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>
                Enrolment to receive newsletter, events, business alerts, SMEConnect magazine, business meetings and
                information about the Government schemes
              </span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>
                Opportunities to participate in the various activities & business networking activities & events
                (virtual & ground events) for Business Connectivity with New Business Partners, Buyers, Suppliers,
                Exporters & clients
              </span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>
                Interactive session or round table with the Ministers, Heads of regulatory bodies, Heads of Corporates,
                thought leaders, Economists & Inventors
              </span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>Speaking Opportunity in webinars or ground events as per expertise</span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>Opportunity to be the Member of Expert or Sub Committees or Study Groups</span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>
                Opportunity to share Suggestions & Recommendations to various Government Departments, Regulatory
                Authorities, FIs, Diplomatic Missions, Issues related to policy and its implementation strategies
              </span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>
                Recommendation letters for Business Visa, Government Agencies, FIs, Corporates and other agencies
              </span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>
                Opportunity to Participate as a speaker or delegate at SMETalks shows, SME Business Forum, Webinar,
                Executive Training Programs & SME Coaching
              </span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>15% discount for Branding & Promotion at the various activities & events</span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>25% discount for Advertisement in SME Connect – Magazine</span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>Opportunity to be the Mentor & guide to Entrepreneurs and Start-ups on specific sector</span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>
                Eligibility to apply for "India SME Excellence Awards" and other Business Awards as a overseas member
              </span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>
                To join Debate & discussion at the various TV channels or Interaction with Press & Media on specific
                issues, policy or Government ordinances affecting or benefiting business sector
              </span>
            </li>
          </ul>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border-l-4 border-[#29688A]">
            <p className="text-sm text-gray-700">
              Kindly send your business requirements or inquires or specific issues on{" "}
              <a href="mailto:director@smechamber.com" className="text-[#29688A] hover:underline font-medium">
                director@smechamber.com
              </a>
            </p>
          </div>
        </div>
      )
    }
  }

  const getSupportContent = () => {
    if (membershipType === "indian") {
      return (
        <div className="space-y-3">
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <HeadphonesIcon className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>Business growth, expansion and diversification</span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <HeadphonesIcon className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>
                Channelising Bank Finance, Investment, Venture Capital, Private Equity and External Commercial
                Borrowings
              </span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <HeadphonesIcon className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>Export Promotion, Identify New Business Partners, Importers and Strategic business partners</span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <HeadphonesIcon className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>
                Import facilitation, identify genuine manufacturers, sourcing of quality & competitive products &
                services, trade finance for imports
              </span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <HeadphonesIcon className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>
                Identification of Foreign Business partners for Joint Ventures, Technology Transfer, Collaborations &
                Contract Manufacturing Tie-ups
              </span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <HeadphonesIcon className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>
                Identification of Advanced & Patented Technologies, Technical Alliances, Turn-key Projects & Capital
                Goods
              </span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <HeadphonesIcon className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>Government services and Liaison in India and other countries</span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <HeadphonesIcon className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>
                Marketing, Branding & Promotion, Franchise, Distributorship & Channel Partnership in India and overseas
                markets
              </span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <HeadphonesIcon className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>Mergers and Acquisitions in India and abroad</span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <HeadphonesIcon className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>Supply to Large Corporates, MNCs, Mid-corporates and Vendor Development</span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <HeadphonesIcon className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>Identify raw material supplier from India and other countries</span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <HeadphonesIcon className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>
                Business advisory services for transforming SMEs as the emerging enterprise and better business growth
              </span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <HeadphonesIcon className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>Availing of incentives, benefits, or financial support from specific Government agencies</span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <HeadphonesIcon className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>Setting up manufacturing units</span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <HeadphonesIcon className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>Study Report, Market Survey and Feasibility Reports on specific sector</span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <HeadphonesIcon className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>Support to Buy & Sell manufacturing unit or readymade Industrial premises or Industrial land</span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <HeadphonesIcon className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>
                Resolving issues related to the Manufacturing industry, international Trade, Banking, Recovery of
                delayed receivables and other problems
              </span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <HeadphonesIcon className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>Revival of Sick Units, Financially stressed SMEs nurturing and restructuring of SME companies</span>
            </li>
          </ul>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border-l-4 border-[#29688A]">
            <p className="text-sm text-gray-700">
              Kindly send your business requirements or inquires or specific issues on{" "}
              <a href="mailto:director@smechamber.com" className="text-[#29688A] hover:underline font-medium">
                director@smechamber.com
              </a>
            </p>
          </div>
        </div>
      )
    } else {
      return (
        <div className="space-y-3">
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <HeadphonesIcon className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>Business growth and expansion in India</span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <HeadphonesIcon className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>
                Channelising Finance, Investment, Venture Capital and Private Equity for projects to be setup in India
              </span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <HeadphonesIcon className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>
                Export Promotion, Identify New Business Partners, Buyers, Suppliers, Importers and Strategic business
                partners in India
              </span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <HeadphonesIcon className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>
                Identify Importers & Manufacturers, Sourcing of quality and competitive products & services, Trade
                finance for imports
              </span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <HeadphonesIcon className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>
                Identification of Indian SMEs for Joint Ventures, Technology Transfers, Collaborations & Contract
                Manufacturing Tie-ups
              </span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <HeadphonesIcon className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>
                Identification of Indian SMEs for Advanced & Patented Technologies, Technical Alliances, Turn-key
                Projects & Capital Goods
              </span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <HeadphonesIcon className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>Government Services and Liaison in India for Setting up manufacturing units and Industries</span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <HeadphonesIcon className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>Marketing, Branding & Promotion, Franchise, Distributorship & Channel Partnership in India</span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <HeadphonesIcon className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>Mergers and Acquisitions in India</span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <HeadphonesIcon className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>Supply to Large Corporates, MNCs, Mid-Corporates and Vendor Development in India</span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <HeadphonesIcon className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>Identify raw material supplier or buyer from India and other countries</span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <HeadphonesIcon className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>Business advisory services for better business growth in Indian Markets</span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <HeadphonesIcon className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>Study Report, Market Survey and Feasibility Reports on specific sector</span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <HeadphonesIcon className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>Buyer-Seller meets with Indian SMEs in various cities of India</span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <HeadphonesIcon className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>Virtual Office Facility</span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <HeadphonesIcon className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>Business partnership opportunities in Make-In-India initiative with Indian SMEs</span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <HeadphonesIcon className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>
                Availing of incentives, benefits, or financial support from specific Government agencies in India
              </span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <HeadphonesIcon className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>To Buyout manufacturing unit or readymade Industrial premises or Industrial land in India</span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <HeadphonesIcon className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>
                Resolving issues related to the Manufacturing Industry, International Trade, Banking, Recovery of
                delayed receivables and other business related problems
              </span>
            </li>
            <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <HeadphonesIcon className="w-5 h-5 text-[#29688A] mt-0.5 flex-shrink-0" />
              <span>Revival of Sick Units, Financially stressed SMEs nurturing and restructuring of SME companies</span>
            </li>
          </ul>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border-l-4 border-[#29688A]">
            <p className="text-sm text-gray-700">
              Kindly send your business requirements or inquires or specific issues on{" "}
              <a href="mailto:director@smechamber.com" className="text-[#29688A] hover:underline font-medium">
                director@smechamber.com
              </a>
            </p>
          </div>
        </div>
      )
    }
  }

  const getCategoryContent = () => {
    if (membershipType === "indian") {
      return (
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-[#29688A] text-white">
                  <th className="border border-gray-300 p-3 text-left">Sr No.</th>
                  <th className="border border-gray-300 p-3 text-left">Membership Categories</th>
                  <th className="border border-gray-300 p-3 text-left">Who Can Apply for Membership?</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-medium text-[#29688A]">1</td>
                  <td className="border border-gray-300 p-3">
                    <div className="font-medium">Micro Enterprises</div>
                    <div className="text-gray-600">(Turnover upto Rs. 10 cr)</div>
                  </td>
                  <td className="border border-gray-300 p-3">
                    <ul className="space-y-1 text-xs">
                      <li>
                        • Small & medium Enterprises involved in manufacturing, service sector, Healthcare, IT, ICT,
                        Exports, Marketing, Logistics, FMCG, garments, Textiles, Imports, Franchise, Distribution, HRD,
                        Media, Hospitality, Infrastructure, Construction, Utility services, Consumer Goods, research,
                        e-commerce, agro-based industries, sports, Retail, travels, warehousing, professional & legal
                        services, members of family-owned businesses, Young & Women Entrepreneurs, Start-Ups & allied
                        businesses & Manufacturing sectors.
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3 font-medium text-[#29688A]">2</td>
                  <td className="border border-gray-300 p-3">
                    <div className="font-medium">Small Enterprises</div>
                    <div className="text-gray-600">(Turnover Rs.11 cr to 100 crs.)</div>
                  </td>
                  <td className="border border-gray-300 p-3">
                    <ul className="space-y-1 text-xs">
                      <li>
                        • Mid-corporates, Corporates & Multinational companies involved in manufacturing, allied
                        industrial sectors, financial services, banking, IT, infrastructure, realty, research,
                        education, exports, construction, realty, E-commerce, telecommunication, ratings, logistics,
                        warehousing, Government PSUs, investment agencies, industrial park developers & other business
                        sectors as well as foreign enterprises / Subsidiaries operating in India and Diplomatic missions
                        and other enterprises.
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-medium text-[#29688A]">3</td>
                  <td className="border border-gray-300 p-3">
                    <div className="font-medium">Mid- sized Enterprises (A)</div>
                    <div className="text-gray-600">(Turnover from Rs. 101 crs. to Rs.250 crs.)</div>
                  </td>
                  <td className="border border-gray-300 p-3">
                    <ul className="space-y-1 text-xs">
                      <li>
                        • Enterprises involved in various industrial sectors, can enroll in the Elite Business Group to
                        explore better business cooperation & avail support services.
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3 font-medium text-[#29688A]">4</td>
                  <td className="border border-gray-300 p-3">
                    <div className="font-medium">Mid- sized Enterprises (B)</div>
                    <div className="text-gray-600">(Turnover from Rs. 251 crs. to Rs.500 crs.)</div>
                  </td>
                  <td className="border border-gray-300 p-3">
                    <ul className="space-y-1 text-xs">
                      <li>
                        • Enterprises involved in various industrial sectors, can enroll in the Elite Business Group to
                        explore better business cooperation & avail support services.
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-medium text-[#29688A]">5</td>
                  <td className="border border-gray-300 p-3">
                    <div className="font-medium">Mid - Corporate Enterprises</div>
                    <div className="text-gray-600">(Turnover from Rs. 501 cr to Rs 1000 cr)</div>
                  </td>
                  <td className="border border-gray-300 p-3">
                    <ul className="space-y-1 text-xs">
                      <li>
                        • Enterprises involved in various industrial sectors, can enroll in the Elite Business Group to
                        explore better business cooperation & avail support services.
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3 font-medium text-[#29688A]">6</td>
                  <td className="border border-gray-300 p-3">
                    <div className="font-medium">Corporate & MNCs Category</div>
                    <div className="text-gray-600">(Turnover from Rs. 1001 cr to Rs.3000 crs)</div>
                  </td>
                  <td className="border border-gray-300 p-3">
                    <ul className="space-y-1 text-xs">
                      <li>
                        • Enterprises involved in various industrial sectors, can enroll in the Elite Business Group to
                        explore better business cooperation & avail support services.
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-medium text-[#29688A]">7</td>
                  <td className="border border-gray-300 p-3">
                    <div className="font-medium">
                      Elite Business Group (CMD, CEO, Director, MD, CFO & Presidents of enterprises)
                    </div>
                  </td>
                  <td className="border border-gray-300 p-3">
                    <ul className="space-y-1 text-xs">
                      <li>
                        • Enterprises involved in various industrial sectors, can enroll in the Elite Business Group to
                        explore better business cooperation & avail support services.
                      </li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )
    } else {
      return (
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-[#29688A] text-white">
                  <th className="border border-gray-300 p-3 text-left">Sr No.</th>
                  <th className="border border-gray-300 p-3 text-left">Membership Categories</th>
                  <th className="border border-gray-300 p-3 text-left">Who Can Apply for Membership?</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-medium text-[#29688A]">1</td>
                  <td className="border border-gray-300 p-3">
                    <div className="font-medium">SMEs</div>
                  </td>
                  <td className="border border-gray-300 p-3">
                    <span className="text-xs">
                      Small & Medium Manufacturers, Exporters, Importers, Buying or Selling Agents, Distributors,
                      Suppliers, Service Providers, Consulting Companies, Professionals, Start-Ups, Individuals
                      Entrepreneurs, Marketing & Exhibitions Organisers
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3 font-medium text-[#29688A]">2</td>
                  <td className="border border-gray-300 p-3">
                    <div className="font-medium">Corporate</div>
                  </td>
                  <td className="border border-gray-300 p-3">
                    <span className="text-xs">
                      Public Limited & Multinational Companies, Overseas Banks & Financial Institutions and
                      International Business Organisations
                    </span>
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-medium text-[#29688A]">3</td>
                  <td className="border border-gray-300 p-3">
                    <div className="font-medium">Patron Membership</div>
                    <div className="text-gray-600">(By invitation)</div>
                  </td>
                  <td className="border border-gray-300 p-3">
                    <span className="text-xs">
                      Individual or Senior executive of Corporate / Foreign Institutional Investors / MNCs / Trade
                      Promotion organisations / Retired government official / Venture Capital or Private Equity Fund /
                      Technocrats / Educationist
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3 font-medium text-[#29688A]">4</td>
                  <td className="border border-gray-300 p-3">
                    <div className="font-medium">Associate Organisation</div>
                  </td>
                  <td className="border border-gray-300 p-3">
                    <span className="text-xs">
                      Chamber of Commerce, Associations, Government Agencies, NGOs and Other International Organisations
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case "advantages":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-[#29688A] mb-4">
              {membershipType === "indian" ? "Indian Company" : "Overseas Company"} Membership Advantages
            </h3>
            <div className="max-h-[400px] md:max-h-[500px] lg:max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#29688A] scrollbar-track-gray-100">
              {getAdvantagesContent()}
            </div>
          </div>
        )
      case "support":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-[#29688A] mb-4">Support Services</h3>
            <div className="max-h-[400px] md:max-h-[500px] lg:max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#29688A] scrollbar-track-gray-100">
              {getSupportContent()}
            </div>
          </div>
        )
      case "category":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-[#29688A] mb-4">Membership Categories</h3>
            <div className="max-h-[400px] md:max-h-[500px] lg:max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#29688A] scrollbar-track-gray-100">
              {getCategoryContent()}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex flex-col space-y-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              className={`justify-start h-auto p-4 ${
                activeTab === tab.id
                  ? "bg-[#29688A] hover:bg-[#29688A]/90 text-white"
                  : "hover:bg-[#29688A]/10 text-gray-700"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon className="w-5 h-5 mr-3" />
              <span className="font-medium">{tab.label}</span>
            </Button>
          )
        })}
      </div>

      {/* Tab Content */}
      <div className="mt-6">{renderContent()}</div>
    </div>
  )
}
