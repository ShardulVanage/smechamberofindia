"use client"

import { motion } from "framer-motion"

const SMESectorSection = () => {
  const tableData = [
    {
      category: "Micro Enterprise",
      currentInvestment: "₹1 crore",
      revisedInvestment: "₹2.5 crore",
      currentTurnover: "₹5 crore",
      revisedTurnover: "₹10 crore",
    },
    {
      category: "Small Enterprise",
      currentInvestment: "₹10 crore",
      revisedInvestment: "₹25 crore",
      currentTurnover: "₹50 crore",
      revisedTurnover: "₹100 crore",
    },
    {
      category: "Medium Enterprise",
      currentInvestment: "₹50 crore",
      revisedInvestment: "₹125 crore",
      currentTurnover: "₹250 crore",
      revisedTurnover: "₹500 crore",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="bg-[#29688A] text-white py-4 px-8 rounded-lg inline-block mb-8">
            <h2 className="text-3xl font-bold">SME SECTOR IN INDIA</h2>
          </div>
        </motion.div>

        {/* Content Paragraphs */}
        <div className="space-y-8 mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-700 leading-relaxed text-justify"
          >
            Micro, Small and Medium Enterprise (MSME) sector has emerged as a very important sector of the Indian
            economy, contributing significantly to the employment generation, innovation, exports, and inclusive growth
            of the economy. Micro, Small and Medium Enterprises (MSME) are the backbone of the socio-economic
            development of our country. It also accounts for 45 % of total industrial production, 40% of total exports
            and contributes very significantly to the GDP. Manufacturing segment within the MSME contributes to 7.09% of
            GDP. MSMEs also contribute to 30.50% of services. The total contribution of MSMEs to the GDP is 37.54.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-700 leading-relaxed text-justify"
          >
            The MSME Act, 2006, was enacted to provide enabling policy environment for promotion and development of the
            sector by way of defining MSMEs, putting in place a framework for developing and enhancing competitiveness
            of the MSME enterprises, ensuring flow of credit to the sector and paving the way for preference in
            Government procurement to products and services of the MSEs, address the issue of delayed payments, etc. It
            is expected that the new law will be able to address the major challenges, relating to physical
            infrastructural bottlenecks, absence of formalization, technology adoption, capacity building, backward and
            forward linkages, lack of access to credit, risk capital, perennial problem of delayed payments, etc. These
            problems are hindering the development of a conducive business environment for expansion of the sector. The
            Ministry of MSME noted that a thriving entrepreneurial eco-system is a policy imperative for realizing the
            potential of the sector and ensuring sustainable growth of the sector.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-700 leading-relaxed text-justify"
          >
            Global trends in classifying the MSMEs show that they widely differs across jurisdictions and depends upon
            the Government policies of the country. Though, a comparison of some of the countries revealed that most of
            them are using number of employees as a variable to define MSMEs. In India, MSMEs are presently defined
            based on investment in plant and machinery / equipment. To facilitate ease of doing business, the Government
            has introduced the new criteria from 1st July 2020 for classification of micro, small and medium enterprises
            turnover based, which will be useful for MSMEs.
          </motion.p>
        </div>

        {/* Classification Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gray-50 rounded-lg p-8"
        >
          <h3 className="text-2xl font-bold text-[#29688A] text-center mb-8">
            New MSME Classification as per Union Budget 2025
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 bg-white rounded-lg overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-[#29688A] text-white">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Enterprise Category</th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold">
                    Current Investment Limit
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold">
                    Revised Investment Limit
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Current Turnover Limit</th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Revised Turnover Limit</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="border border-gray-300 px-4 py-3 font-medium text-[#29688A]">{row.category}</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">{row.currentInvestment}</td>
                    <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-[#29688A]">
                      {row.revisedInvestment}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">{row.currentTurnover}</td>
                    <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-[#29688A]">
                      {row.revisedTurnover}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-sm text-gray-600 text-center mt-4 italic"
          >
            *Source from Ministry of MSME
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}

export default SMESectorSection
