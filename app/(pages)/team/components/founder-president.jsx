"use client"

import { motion } from "framer-motion"
import { Facebook, Twitter, Linkedin, Mail, X } from "lucide-react"

export default function FounderPresident() {
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

  const companies = [
    "Salunkhe Packaging Pvt. Ltd.",
    "Macro Corporate Services Pvt. Ltd.",
    "SME Industrial Park India Pvt. Ltd.",
    "Salunkhe Exports Pvt. Ltd",
    "SME Credit Check Pvt. Ltd.",
    "Geoptech Solutions Pvt. Ltd.",
  ]

  const organizations = [
    "SME Chamber of India (Small and Medium Business Development Chamber of India)",
    "Federation of Indian SME Associations (FISA)",
    "India International Trade Centre (Investment and Trade Promotion Organisation – recognized and supported by the Government of India and the Government of Maharashtra)",
    "Maharashtra Industry Development Association (MIDA)",
    "National SME Manufacturing Mission",
    "SME Industrial Parks of India",
    "SME Export Promotion Council",
    "SME Legal Council",
    "Start-Ups Council of India",
    "SME Electronics Product Export Promotion Council",
    "SME Investment Promotion Council",
    "Gujarat Industry Development Association (GIDA)",
    "SME Business Management Institute",
    "Packaging Industry Association of India (PIAI)",
    "World SME Trade Centre",
    "SME Technology Development Council",
    "SME Insurance Promotion Council",
    "Women Entrepreneurs Development Council (WEDC)",
  ]

  const internationalForums = [
    "India – Japan SME Business Council",
    "India – US SME Business Council",
    "Europe - India SME Business Council",
    "India – South Korea SME Business Council",
    "India – GCC SME Business Council",
    "India - Canada SME Business Council",
    "India - UK SME Business Council",
    "India - China Business Council",
    "India - Poland Business Council",
    "India - Hungary Business Council",
    "India - Africa SME Business Council",
    "India - Germany SME Business Council",
    "India - Romania Business Council",
    "India – Bulgaria Business Council",
  ]

  const brands = [
    "India SME Excellence Awards (25th Edition)",
    "Pride of Maharashtra Awards (15th Edition)",
    "Maharashtra Business Excellence Awards",
    "SMEtv & SME E-News | SMEConnect Magazine",
    "SME Business Forum",
    "Pride of Gujarat Awards (14th Edition)",
    "www.doingbusinessinMaharashtra.com (Portal)",
    "Entrepreneurship Development Council (jointly with Educational Institutes)",
    '"SMEtalks" & "SMECoach" Platforms',
  ]

  const goldenMoments = [
    "Mr. Salunkhe was invited by Mr. Narendra Modi, Hon'ble Prime Minister on 27th December 2019, to present suggestions, recommendations, various issues and grievances related to SME & manufacturing sectors as well as initiatives and efforts taken by him for the empowerment of SME sector for better performance & global competitiveness.",
    "The then Hon'ble Prime Minister, Mr. Atal Bihari Vajpayee had attended SME & Entrepreneurship Awards function organised Mr. Salunkhe on 1st May, 2002 at New Delhi and recommended to the Prime Minister to change the criteria and definitions of Small-Scale Industrial sector to give unique recognition as MSMEs.",
    "The former Deputy Prime Minister & BPJ Leader, Mr. L.K. Advani had attended SME & Entrepreneurship Awards function on 1st May, 2003 at New Delhi.",
    'Mr. Salunkhe has inaugurated the "Industrial & Commercial Bank of China" – ICBC Bank, India Branch on 15th September 2011 at Mumbai. ICBC is the world\'s largest Chinese Bank, with a brand value of more than US$ 55 billion. ICBC Bank ranks 1st amongst the most valuable financial brands in the world.',
    'Mr. Salunkhe was on lead to organise the first ever & a mega event on "Global Investors Meet" - Advantage Maharashtra, jointly with the Government of Maharashtra in 1996 at Mumbai. Attended by the then Prime minister, Mr. H.D. Deve Gowda and the then Chief Minister of Maharashtra, Late Mr. Manohar Joshi and 500 plus foreign delegates, who attended 3 days event.',
    'Key note Speaker at "European SME Congress" organized by European commission in October 2016 at Katowice, Poland.',
    'Key note Speaker at "SME Assembly" organized by the European commission in November 2013 at Vilnius, Lithuania.',
    'Speaker at "World Trade Symposium" annual conference organized by the Financial Times in June 2016 at London.',
    "Speaker at G-20 Conference on SME sector at Riyadh, Saudi Arabia, 2014.",
  ]

  const efforts = [
    'Mr. Salunkhe was appointed as the Chairman of Law & Order of "Federation of Association of Maharashtra", and he was on the forefront with the Commissioner of Police, Mumbai to weed out goons & anti-social elements, which were affecting the businesses and industries in Mumbai region and they have deteriorated law and order situations in Mumbai from April to November, 1998.',
    "Member of RBI Empowered Committee for SMEs and SLIC for the various States for the last 15 years.",
    'Member of the working group to study "MSME Development Act, 2006" for advocating to change the definitions of MSME sector constituted on 8th January 2020 by the Ministry and previously 2002, 2005 & 2006.',
    "Active Member of the Industry and Task Force, Maharashtra, under the Chairmanship of the then Chief Minister (2002 – 2007).",
    "Member of the National Advisory Board of MSME, Government of India (2011-2013).",
    "Board of Director of Bharat Heavy Plates and Vessels Ltd. (2002 – 2004).",
    "Board of Director of Asia Mergers and Acquisitions Association.",
    "Mr. Salunkhe has taken lead to provide collateral free loans to micro and small enterprises in 2002 and SIDBI. Thereafter, Mr. Salunkhe has also pursued for the enhancement of collateral free loans from Rs.25 lakhs to Rs.50 lakhs and from Rs.50 lakhs to Rs.1 crore and subsequently, from Rs.1 crore to Rs.2 crores.",
    "Mr. Salunkhe has also suggested and advocated to the Prime Minister to enhance collateral free loans up to Rs. 5 crores for SME sector.",
    "He has been active Member of the various Government Committees, Study Groups and expert groups to present new concepts and new ideas and given inputs on Industry, Finance and SME Sector for the last 20 years.",
    "He has been regularly participating in the national and international conferences as a speaker and sharing his views on the current affairs through various medias, TV channels, Business magazines, newspapers and webinars, conferences, round table, debates and various other events & business meetings.",
  ]

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-12">
      {/* Profile Section */}
      <motion.div variants={itemVariants} className="text-center">
        <div className="mb-8">
          <img
            src="/assets/team/president.png"
            alt="Mr. Chandrakant Salunkhe"
            className="w-64 h-64 rounded-full mx-auto object-cover shadow-2xl "
          />
        </div>

        <h2 className="text-3xl font-bold text-[#29688A] mb-4">Mr. Chandrakant Salunkhe</h2>
        <p className="text-xl text-gray-600 mb-6">Founder & President, SME Chamber of India</p>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-4 mb-8">
          <a href="https://www.facebook.com/casalunkhe" className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-500/80 transition-colors">
            <Facebook size={20} />
          </a>
          <a href="https://twitter.com/chandrasalunkhe" className="p-3 bg-black text-white rounded-full hover:bg-gray-900 transition-colors">
            <X size={20} />
          </a>
          <a href="https://www.linkedin.com/in/chandrakant-salunkhe-b0861835" className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-600/80 transition-colors">
            <Linkedin size={20} />
          </a>
          <a
            href="mailto:president@smechamber.com"
            className="p-3 bg-[#29688A] text-white rounded-full hover:bg-[#1e4a5f] transition-colors"
          >
            <Mail size={20} />
          </a>
        </div>
      </motion.div>

      {/* Background Section */}
      <motion.div variants={itemVariants} className="bg-white rounded-lg p-8 shadow-sm">
        <h3 className="text-2xl font-bold text-[#29688A] mb-6">Background</h3>
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            As a serial & successful entrepreneur, influencer, mentor, business rights activist, having practical
            experience in the business management, commerce background, Mr. Chandrakant Salunkhe has spent 9 years
            working in the family business, he has established his own business group "Macro Group of Companies" in
            1991, situated in Mumbai, India and involved in the manufacturing and export of Industrial Packaging
            Machinery, equipments and material, industrial products, food processing products, industrial equipments and
            supporting various Industries & SMEs for the upgradation of their business and packaging units by adopting
            advanced packaging technology, patented and advanced industrial technologies for quality productivity and
            global competitiveness.
          </p>

          <p>
            With a passionate vision, mission, dynamic & indomitable entrepreneurial leadership qualities, Mr.
            Chandrakant Salunkhe has founded "SME Chamber of India" in 1993 to empower small & medium entrepreneurs and
            enterprises for better business growth, integration for enhancement of business connections and explore
            various business opportunities in India and abroad. Under his dynamic leadership, SME Chamber of India has
            been constantly striving for various activities for the benefit of SME Sector, manufacturing industries,
            exporters, allied industrial & business sectors and specially providing hand holding and support to
            start-ups, young entrepreneurs and members of family-owned businesses.
          </p>
        </div>
      </motion.div>

      {/* Vision & Mission */}
      <motion.div variants={itemVariants} className="bg-gray-50 rounded-lg p-8">
        <h3 className="text-2xl font-bold text-[#29688A] mb-6">Vision & Mission</h3>
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            The Chamber has been providing value addition services for enhancement of quality productivity, entering
            into emerging markets for exports, channelising finance and investment for sustainable business growth,
            establishing cooperation with the foreign companies for collaborations, excellence in the manufacturing,
            contract manufacturing, joint ventures, technology transfers, new products design & development,
            innovations, inventions, connectivity with the large corporates for supply and procurement, franchise,
            distribution, marketing, improve creditworthiness and credibility to attract strategic partners & investors,
            encouraging them to enter into capital market for alternative finance, setting up new & additional
            manufacturing units and actively involve SMEs for accomplishment of dream project of Hon'ble Prime Minister
            to march towards "Viksit Bharat", make India as a manufacturing hub and achieve largest economy in the
            world.
          </p>
        </div>
      </motion.div>

      {/* Advocacy Work */}
      <motion.div variants={itemVariants} className="bg-white rounded-lg p-8 shadow-sm">
        <h3 className="text-2xl font-bold text-[#29688A] mb-6">Advocacy & Leadership</h3>
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            Mr. Chandrakant Salunkhe he has been on the forefront to take up various issues and grievances of SMEs &
            manufacturing industries with the appropriate authorities, Prime Minister, Union Ministers, Government
            officials, heads of regulatory authorities & financial institutions for policy frame work change and its
            speedy implementation as well as to secure the interest of SME & manufacturing sectors and focus on level
            playing field in "Ease of Doing Business", promote and encourage enterprises to avail various benefits &
            advantages of the Government schemes and policies. Mr. Salunkhe is putting more efforts by educating and
            creating awareness amongst entrepreneurs for developing quality and competitive products to brand at the
            national and international levels to enter into emerging markets.
          </p>

          <p>
            Mr. Chandrakant Salunkhe has strongly advocated to set up "SME Stock Exchange", TReDS – Electronic platform
            for Trade Receivables, National Skill Development Corporation, Change of the Definition & Act of small-scale
            industries into MSME Act, set up of exclusive SME Ministry and Departments in the various State Governments,
            SME Desks/Divisions in the Indian Embassies to enter into the concerned markets, Start-up India platform to
            boost start-ups to convert into unicorns and collateral free financial facilities for SME sector upto Rs.5
            crores.
          </p>
        </div>
      </motion.div>

      {/* Companies */}
      <motion.div variants={itemVariants} className="bg-gray-50 rounded-lg p-8">
        <h3 className="text-2xl font-bold text-[#29688A] mb-6">Macro Group of Companies</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {companies.map((company, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm"
            >
              <div className="w-2 h-2 bg-[#29688A] rounded-full"></div>
              <span className="text-gray-700">{company}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Organizations */}
      <motion.div variants={itemVariants} className="bg-white rounded-lg p-8 shadow-sm">
        <h3 className="text-2xl font-bold text-[#29688A] mb-6">Organizations Initiated</h3>
        <p className="text-gray-600 mb-6">(Registered under the Companies Act)</p>
        <div className="grid grid-cols-1 gap-3">
          {organizations.map((org, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="w-2 h-2 bg-[#29688A] rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-700">{org}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* International Forums */}
      <motion.div variants={itemVariants} className="bg-gray-50 rounded-lg p-8">
        <h3 className="text-2xl font-bold text-[#29688A] mb-6">International Business Forums of India</h3>
        <p className="text-gray-600 mb-6">
          (Officially endorsed and supported by the concerned countries Embassies in India & Indian Embassies abroad)
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {internationalForums.map((forum, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm"
            >
              <div className="w-2 h-2 bg-[#29688A] rounded-full"></div>
              <span className="text-gray-700">{forum}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Brands & Platforms */}
      <motion.div variants={itemVariants} className="bg-white rounded-lg p-8 shadow-sm">
        <h3 className="text-2xl font-bold text-[#29688A] mb-6">Brands and Platforms Initiated</h3>
        <div className="grid grid-cols-1 gap-3">
          {brands.map((brand, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="w-2 h-2 bg-[#29688A] rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-700">{brand}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Golden Moments */}
      <motion.div variants={itemVariants} className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-8">
        <h3 className="text-2xl font-bold text-[#29688A] mb-6">Golden Moments</h3>
        <div className="space-y-4">
          {goldenMoments.map((moment, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="p-4 bg-white rounded-lg shadow-sm border-l-4 border-yellow-400"
            >
              <p className="text-gray-700 leading-relaxed">{moment}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Efforts & Contributions */}
      <motion.div variants={itemVariants} className="bg-white rounded-lg p-8 shadow-sm">
        <h3 className="text-2xl font-bold text-[#29688A] mb-6">Efforts & Contributions</h3>
        <div className="space-y-4">
          {efforts.map((effort, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex items-start space-x-3 p-4 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="w-2 h-2 bg-[#29688A] rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-700 leading-relaxed">{effort}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Contact */}
      <motion.div variants={itemVariants} className="bg-[#29688A] text-white rounded-lg p-8 text-center">
        <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
        <p className="text-lg">
          Email:{" "}
          <a href="mailto:president@smechamber.com" className="underline hover:text-gray-200">
            president@smechamber.com
          </a>
        </p>
      </motion.div>
    </motion.div>
  )
}
