"use client"
import { useState } from "react"

export default function AwardsAbout() {
  const [expandedSection, setExpandedSection] = useState(null)

  const awardCategories = [
    "The Best SME of the Year Award – Manufacturing",
    "The Global SME of the Year Award – Global Footprint",
    "Emerging SME of the Year Award – Manufacturing",
    "The Best SME of the Year Award – Manufacturing & Exports",
    "The Best SME of the Year Award – Exports",
    "The Innovative SME of the Year Award – Innovation & Invention",
    "The Best SME of the Year Award – Trade & Retail sectors",
    "The Best SME of the Year Award – Service sectors",
    "The Best Enterprise of the Year Award – Financial & Insurance",
    "The Best SME of the Year Award – Infrastructure, Construction & Realty",
    "The Best SME of the Year Award – E-commerce & Retail",
    "The Best SME of the Year Award – Logistics & Warehousing",
    "Emerging SME of the Year Award – Service sector & Allied Businesses",
    "The Best SME of the Year Award – Professional & Consultancy Services",
    "Inspiring Entrepreneur of the Year Award – Manufacturing & Service sectors",
    "Emerging Start-up of the Year Award – Manufacturing & Service sectors",
    "The Best Women Entrepreneur of the Year Award – Manufacturing & Service sectors",
    "The Best Promising Entrepreneur of the Year Award – Leadership Performance",
    "The Best Institution of the Year Award – Education, Industrial and Business Training",
    "The Best Corporate and Financial Institution of the Year Award (For supporting and empowering SMEs for better business growth, expansion, transformation and diversification)",
  ]

  const pastAwards = [
    { date: "March, 05 2025", title: "23RD NATIONAL ANNUAL - INDIA SME EXCELLENCE AWARDS" },
    { date: "March, 25 2023", title: "22ND NATIONAL ANNUAL - INDIA SME EXCELLENCE AWARDS" },
    { date: "February, 13 2022", title: "21ST NATIONAL ANNUAL - INDIA SME EXCELLENCE AWARDS" },
    { date: "February, 15 2022", title: "20TH NATIONAL ANNUAL - INDIA SME EXCELLENCE AWARDS" },
    { date: "February, 21 2019", title: "19TH NATIONAL ANNUAL - INDIA SME EXCELLENCE AWARDS" },
    { date: "September, 08 2017", title: "18TH NATIONAL ANNUAL - INDIA SME EXCELLENCE AWARDS" },
    { date: "January, 30 2016", title: "INDIA SME EXCELLENCE AWARDS" },
    { date: "September, 16 2014", title: "INDIA SME EXCELLENCE AWARDS" },
    { date: "February, 7 2014", title: "3rd Edition Annual GUJARAT SME EXCELLENCE AWARDS" },
    { date: "June 15 2013", title: "BEST BANKERS AND APPRECIATION AWARDS" },
    { date: "June 15 2013", title: "III Edition Annual INDIA SME EXCELLENCE AWARDS 2013" },
    { date: "April 12 2013", title: "II Edition Annual Flagship Activity GUJARAT SME EXCELLENCE AWARDS" },
    { date: "April 17, 2012", title: "GUJARAT ENTREPRENEURSHIP & SME EXCELLENCE AWARDS" },
    { date: "February 4th 2012", title: "BANK BEST BANKER AWARD 2012" },
    { date: "August 26, 2011", title: "SME INNOVATION AWARDS & SME EXCELLENCE AWARDS" },
    { date: "July 09, 2010", title: "SME & ENTREPRENEURSHIP EXCELLENCE AWARDS 2010" },
    { date: "February 21, 2009", title: "SME & ENTREPRENEURSHIP EXCELLENCE AWARDS 2009" },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#29688A] to-[#1e4a5f] text-white py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">India SME Excellence Awards</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
            Recognizing outstanding achievements and contributions of Small and Medium Enterprises for 24 years
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* About Section */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12 hover:shadow-xl transition-all duration-300">
            <h2 className="text-3xl md:text-4xl font-bold text-[#29688A] mb-8 text-center">About the Awards</h2>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p className="text-lg">
                SME Chamber of India has been recognizing Small and Medium Enterprises and Entrepreneurs by conferring
                <span className="font-semibold text-[#29688A]"> "INDIA SME EXCELLENCE AWARDS"</span> for the last 24
                years for their remarkable achievements & outstanding contributions, unique vision & mission for better
                & further business growth, enhancing profitability, strategic plans to achieve success in the local &
                global competitive markets, adoption of good governance & business ethics, fair business practices,
                better financial and business management strategies to improve credibility & creditworthiness to attract
                more business leads, channelise investments for further growth, collaborations with the Indian & foreign
                companies, unique concept for branding & marketing to attract more customers as well as clients.
              </p>

              <p className="text-lg">
                The Awards selection criteria also focuses on the improvement of quality productivity, industrial
                automation, innovations, inventions & its commercialisation, diversification, expansion, transformation
                of the businesses to become emerging enterprises, generation of employment, new entrepreneurship,
                research & new product developments, acquiring of advanced & patented technologies to enhance global
                compositeness, converting unique business ideas & concepts into business leads & growth, establishing
                co-operation with the Indian and foreign enterprises for the joint ventures, technology transfers,
                contract manufacturing and strategic alliances to enhance manufacturing activities.
              </p>

              <p className="text-lg">
                The Chamber is also recognising the corporates, financial institutions (Public sector, private, foreign,
                co-operative & multi-state banks and NBFCs), multinational companies, educational institutions research
                and development agencies, Government corporations and agencies for the empowerment and strengthening of
                SME sector for better business growth and expansion/diversification.
              </p>

              <div className="bg-gradient-to-r from-[#29688A]/10 to-transparent p-6 rounded-xl border-l-4 border-[#29688A]">
                <p className="text-lg font-medium text-[#29688A]">
                  The award winners will be recognized as the <span className="font-bold">"Business Ambassadors"</span>{" "}
                  to encourage other SMEs, entrepreneurs, Young & Women Entrepreneurs and start-ups to follow their
                  success path for further growth & achievements and adoption of their unique ideas & efforts for the
                  enhancement of business activities for more profitable.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Award Categories */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12 hover:shadow-xl transition-all duration-300">
            <h2 className="text-3xl md:text-4xl font-bold text-[#29688A] mb-8 text-center">Award Categories</h2>

            <div className="grid gap-4">
              {awardCategories.map((category, index) => (
                <div
                  key={index}
                  className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:border-[#29688A]/30 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="w-8 h-8 bg-[#29688A] text-white rounded-full flex items-center justify-center font-bold text-sm mr-4 group-hover:scale-110 transition-transform duration-300">
                    {index + 1}
                  </div>
                  <span className="text-gray-700 font-medium group-hover:text-[#29688A] transition-colors duration-300">
                    {category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-[#29688A] to-[#1e4a5f] text-white rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">Contact for More Information</h3>
            <div className="space-y-4">
              <p className="text-lg">
                Website:{" "}
                <a href="http://www.indiasmeawards.com" className="underline hover:text-blue-200 transition-colors">
                  www.indiasmeawards.com
                </a>
              </p>
              <p className="text-lg">
                Email:{" "}
                <a href="mailto:director@smechamber.com" className="underline hover:text-blue-200 transition-colors">
                  director@smechamber.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Past Awards */}
        <div>
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12 hover:shadow-xl transition-all duration-300">
            <h2 className="text-3xl md:text-4xl font-bold text-[#29688A] mb-8 text-center">Past Awards</h2>

            <div className="grid gap-4">
              {pastAwards.map((award, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:border-[#29688A]/30 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="mb-2 md:mb-0">
                    <h4 className="font-semibold text-gray-800 group-hover:text-[#29688A] transition-colors duration-300">
                      {award.title}
                    </h4>
                  </div>
                  <div className="text-[#29688A] font-medium bg-[#29688A]/10 px-4 py-2 rounded-full text-sm">
                    {award.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
