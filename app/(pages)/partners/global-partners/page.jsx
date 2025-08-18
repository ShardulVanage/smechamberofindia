"use client"
import { useState } from "react"

export default function GlobalPartnersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("")

  const partners = {
    Afghanistan: [{ name: "Afghanistan Investment Support Agency (AISA)", url: "http://www.aisa.org.af/" }],
    Armenia: [{ name: "Chamber of Commerce and Industry of the Republic of Armenia", url: "http://www.armcci.am" }],
    Australia: [
      { name: "Indo-Australia Chamber of Commerce", url: "" },
      { name: "Western Australia Chamber of Commerce", url: "http://www.cciwa.com/" },
    ],
    Canada: [
      { name: "Corporation of the City of Brampton", url: "http://www.brampton.ca/en/pages/welcome.aspx" },
      { name: "The Indo-Canada Chamber of Commerce (ICCC)", url: "http://www.iccc.org/" },
    ],
    China: [
      { name: "China Council for the Promotion of International Trade (CCPIT-HQ)", url: "http://english.ccpit.org/" },
      { name: "China International Exhibition Centre, Beijing", url: "http://www.ciec-expo.com" },
      { name: "China International Purchase Centre", url: "" },
      { name: "China Foreign Trade Centre", url: "http://www.cftc.org.cn" },
      { name: "Suzhou Industrial Park", url: "http://www.sipac.gov.cn" },
      { name: "Suzhou International Expo Centre", url: "http://www.suzhouexpo.com" },
      { name: "China Association for Pharmaceutical Equipments", url: "" },
    ],
    "Czech Republic": [{ name: "Czech Trade, Mumbai", url: "" }],
    Europe: [
      { name: "Europe-India SME Business Council (EISBC)", url: "http://www.eisbc.org/" },
      { name: "Excedea", url: "http://www.excedea.com/" },
      { name: "Gibbels Public Affairs", url: "http://www.gibbelspa.eu/" },
    ],
    Greece: [{ name: "Athens Chamber of Commerce and Industry", url: "http://www.athenscc.org/" }],
    Hungary: [{ name: "Central European Financial Group", url: "http://www.cefg.hu/" }],
    Indonesia: [
      { name: "The Indonesia Chamber of Commerce & Industry", url: "http://www.kadin.net.id/" },
      { name: "Importers Association of Indonesia", url: "" },
      { name: "Indonesian Packaging Federation", url: "http://www.packindo.org/" },
    ],
    Malaysia: [
      { name: "SME Corporation Malaysia", url: "http://www.smecorp.gov.my/" },
      { name: "Young Entrepreneur Organization Malaysia (GMB MALAYSIA)", url: "http://aybiz.org/" },
      { name: "Malaysian Franchise Association", url: "http://www.mfa.org.my/" },
    ],
    Malta: [{ name: "Malta Chamber of SMEs (GRTU)", url: "http://grtu.net/" }],
    Mauritius: [
      { name: "Small Enterprise and Handicrafts Development Authority (SEHDA)", url: "http://www.sehda.org/" },
      { name: "SME Chamber, Mauritius", url: "" },
    ],
    Netherlands: [{ name: "The Netherlands India Chamber of Commerce & Trade", url: "https://www.nicct.nl/" }],
    Qatar: [{ name: "Doha Bank, Qatar", url: "http://www.dohabank.com.qa/" }],
    "Saudi Arabia": [
      { name: "Federation of GCC Chambers", url: "http://www.fgccc.org/" },
      { name: "Asharqia Chamber", url: "http://www.chamber.org.saba" },
    ],
    Singapore: [
      { name: "Singapore Exposition Pvt Ltd", url: "http://www.singapore-expo.com.sg/Index.htm" },
      { name: "Singapore Industrial Automation Association (SIAA)", url: "http://www.siaa.org/" },
      { name: "Singex Venues Pte Ltd, Singapore", url: "http://www.singexexhibitions.com.sg" },
    ],
    Slovenia: [
      {
        name: "Republic of Slovenia for Entrepreneurship and Foreign Investments (JAPTI)",
        url: "http://www.japti.si/",
      },
      { name: "Chambers of Craft and Small Business of Slovenia", url: "" },
      { name: "Ljubljana Exhibition and Convention Centre", url: "http://en.gr-sejem.si/home/" },
      { name: "Celje Expo Centre", url: "http://www.ce-sejem.si/en" },
      { name: "Technology Park Ljubljana Ltd", url: "http://www.tp-lj.si/en/" },
    ],
    "South Korea": [
      { name: "Korea Federation of Small and Medium Business", url: "http://www.kbiz.or.kr/english/" },
      { name: "Korea M&A Investment Association", url: "http://eng.mnai.kr/" },
      { name: "Gyeonggi Small & Medium Business Center (GSBC)", url: "http://www.gsbc.or.kr/" },
      { name: "Incheon Techno Park", url: "http://www.itp.or.kr/" },
      { name: "Asia M&A Association", url: "" },
      { name: "Korea Importers Association", url: "http://www.import.or.kr/" },
      { name: "Small-Medium Business Support Centre", url: "http://global.kita.net/" },
      { name: "Korea International Trade Association", url: "" },
      { name: "Daejeon Chamber of Commerce & Industry", url: "http://daejeoncci.korcham.net/" },
      { name: "Cheongju Chamber of Commerce", url: "http://cheongjucci.korcham.net/" },
      { name: "Scosan Ginseng Cooperative Association", url: "" },
    ],
    "Sri Lanka": [{ name: "Chelina Capital Corporation (Pvt) Ltd", url: "http://www.chelinacc.com/" }],
    Taiwan: [{ name: "New Alico Enterprises", url: "" }],
    Thailand: [
      { name: "The Federation of Thai Industries", url: "http://www.fti.or.th" },
      { name: "The Thai Chamber of Commerce", url: "http://www.thaiechamber.com/" },
    ],
    Turkey: [
      { name: "Business Life Cooperation Association (ISHAD)", url: "http://www.ishad.org.tr/" },
      { name: "Aegean Region Chamber of Industry (EBSO)", url: "http://www.ebso.org.tr/index_en.php" },
      { name: "EXPATIA", url: "http://www.expatia.net" },
    ],
    UAE: [
      { name: "BUYDOBUY ADVERTISING LLC (BDB)", url: "http://www.bdbme.com/" },
      { name: "International Exposition", url: "http://www.intexdubai.com/" },
    ],
    "United Kingdom": [
      { name: "London Chamber of Commerce", url: "http://www.londonchamber.co.uk/" },
      { name: "Birmingham Chamber of Commerce", url: "http://www.birmingham-chamber.com/" },
      { name: "Black County Chamber of Commerce", url: "http://www.blackcountrychamber.co.uk/" },
      { name: "Halton Chamber of Commerce", url: "http://www.haltonchamber.com/" },
      { name: "Indo British Trade Council", url: "" },
      { name: "UK India Business Council", url: "http://www.ukibc.com/" },
      { name: "University of Wolverhampton", url: "http://www.wlv.ac.uk/" },
      { name: "Wolverhampton City Council", url: "http://www.wolverhampton.gov.uk/" },
      { name: "Invest Black Country", url: "http://www.investblackcountry.com/" },
    ],
    "United States of America": [
      { name: "World Trade Centers' Association", url: "http://world.wtca.org" },
      { name: "Trade Terra. Inc", url: "" },
      { name: "Sales Automation Support, Inc.", url: "http://www.salescampaigns.com/" },
      { name: "The National US India Chamber of Commerce (NUICC)", url: "http://www.nuicc.info/" },
      { name: "Richardson Chamber of Commerce", url: "" },
      { name: "Dallas Chamber of Commerce", url: "" },
      { name: "Illinois Chamber of Commerce", url: "" },
    ],
    Vietnam: [{ name: "Vietnam Chamber of Commerce & Industry", url: "http://www.vccisme.com.vn/Index.htm" }],
    Zambia: [{ name: "Zambia Development Agency", url: "http://www.zpa.org.zm/" }],
  }

  const countries = Object.keys(partners).sort()

  const filteredPartners = Object.entries(partners).filter(([country, partnerList]) => {
    const matchesCountry = selectedCountry === "" || country === selectedCountry
    const matchesSearch =
      searchTerm === "" ||
      country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partnerList.some((partner) => partner.name.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCountry && matchesSearch
  })

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#29688A] text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">Global Partners</h1>
          <p className="text-xl text-center opacity-90">Our International Network of Partners</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search partners or countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#29688A]"
            />
          </div>
          <div className="sm:w-64">
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#29688A]"
            >
              <option value="">All Countries</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 text-center">
          <p className="text-gray-600">
            <span className="font-semibold text-[#29688A]">{countries.length}</span> countries •
            <span className="font-semibold text-[#29688A] ml-1">
              {Object.values(partners).reduce((total, partnerList) => total + partnerList.length, 0)}
            </span>{" "}
            partners
          </p>
        </div>

        {/* Partners List */}
        <div className="space-y-8">
          {filteredPartners.map(([country, partnerList]) => (
            <div key={country} className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-[#29688A] mb-4 flex items-center">
                <span className="mr-3">{country}</span>
                <span className="text-sm font-normal text-gray-500">
                  ({partnerList.length} partner{partnerList.length !== 1 ? "s" : ""})
                </span>
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {partnerList.map((partner, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-md border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-medium text-gray-900 mb-2 leading-tight">{partner.name}</h3>
                    {partner.url && (
                      <a
                        href={partner.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#29688A] hover:underline text-sm break-all"
                      >
                        Visit Website →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredPartners.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No partners found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
