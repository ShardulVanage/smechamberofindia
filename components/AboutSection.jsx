'use client'
import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { label: 'Years of Excellence', value: '32+' },
  { label: 'Business Growth', value: '10X' },
  { label: 'Global Markets', value: '50+' },
  { label: 'SMEs Empowered', value: '10,000+' },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      duration: 0.6
    }
  }
};

const slideInLeft = {
  hidden: { 
    opacity: 0, 
    x: -100,
    scale: 0.8
  },
  visible: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
      duration: 0.8
    }
  }
};

const slideInRight = {
  hidden: { 
    opacity: 0, 
    x: 100 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
      duration: 0.8
    }
  }
};

const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 50 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      duration: 0.6
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const floatingVariants = {
  floating: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export default function About() {
  return (
    <div className="bg-white py-2 sm:py-4">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div 
          className="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Left side - Image and Quote */}
          <motion.div 
            className="lg:pr-4"
            variants={slideInLeft}
          >
            <motion.div 
              className="relative overflow-hidden rounded-3xl bg-gray-900 px-6 pb-9 pt-64 shadow-2xl sm:px-12 lg:max-w-lg lg:px-8 lg:pb-8 xl:px-10 xl:pb-10"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <motion.img
                alt=""
                src="/abouthome.png"
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
              <div className="absolute inset-0 bg-gray-900/70" />
              
              {/* Floating gradient blob */}
              <motion.div
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 -ml-16 -translate-x-1/2 -translate-y-1/2 transform-gpu blur-3xl"
                variants={floatingVariants}
                animate="floating"
              >
                <div
                  style={{
                    clipPath:
                      'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                  }}
                  className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#29688A]/80 to-[#46cbff]/80 opacity-40"
                />
              </motion.div>

              <motion.figure 
                className="relative isolate"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <svg
                  fill="none"
                  viewBox="0 0 162 128"
                  aria-hidden="true"
                  className="absolute -left-2 -top-4 -z-10 h-32 stroke-white/60"
                >
                  <path
                    d="M65.5697 118.507L65.8918 118.89C68.9503 116.314 71.367 113.253 73.1386 109.71C74.9162 106.155 75.8027 102.28 75.8027 98.0919C75.8027 94.237 75.16 90.6155 73.8708 87.2314C72.5851 83.8565 70.8137 80.9533 68.553 78.5292C66.4529 76.1079 63.9476 74.2482 61.0407 72.9536C58.2795 71.4949 55.276 70.767 52.0386 70.767C48.9935 70.767 46.4686 71.1668 44.4872 71.9924L44.4799 71.9955L44.4726 71.9988C42.7101 72.7999 41.1035 73.6831 39.6544 74.6492C38.2407 75.5916 36.8279 76.455 35.4159 77.2394L35.4047 77.2457L35.3938 77.2525C34.2318 77.9787 32.6713 78.3634 30.6736 78.3634C29.0405 78.3634 27.5131 77.2868 26.1274 74.8257C24.7483 72.2185 24.0519 69.2166 24.0519 65.8071C24.0519 60.0311 25.3782 54.4081 28.0373 48.9335C30.703 43.4454 34.3114 38.345 38.8667 33.6325C43.5812 28.761 49.0045 24.5159 55.1389 20.8979C60.1667 18.0071 65.4966 15.6179 71.1291 13.7305C73.8626 12.8145 75.8027 10.2968 75.8027 7.38572C75.8027 3.6497 72.6341 0.62247 68.8814 1.1527C61.1635 2.2432 53.7398 4.41426 46.6119 7.66522C37.5369 11.6459 29.5729 17.0612 22.7236 23.9105C16.0322 30.6019 10.618 38.4859 6.47981 47.558L6.47976 47.558L6.47682 47.5647C2.4901 56.6544 0.5 66.6148 0.5 77.4391C0.5 84.2996 1.61702 90.7679 3.85425 96.8404L3.8558 96.8445C6.08991 102.749 9.12394 108.02 12.959 112.654L12.959 112.654L12.9646 112.661C16.8027 117.138 21.2829 120.739 26.4034 123.459L26.4033 123.459L26.4144 123.465C31.5505 126.033 37.0873 127.316 43.0178 127.316C47.5035 127.316 51.6783 126.595 55.5376 125.148L55.5376 125.148L55.5477 125.144C59.5516 123.542 63.0052 121.456 65.9019 118.881L65.5697 118.507Z"
                    id="0ef284b8-28c2-426e-9442-8655d393522e"
                  />
                  <use x={86} href="#0ef284b8-28c2-426e-9442-8655d393522e" />
                </svg>
                
                <motion.img 
                  alt="" 
                  src="https://tailwindui.com/img/logos/workcation-logo-white.svg" 
                  className="h-12 w-auto"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                />
                
                <motion.blockquote 
                  className="mt-6 text-xl font-semibold leading-8 text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                >
                  <p>
                    "SME Chamber of India has been at the forefront of empowering the SME sector for global competitiveness and business transformation, creating opportunities for entrepreneurs to achieve remarkable growth in domestic and international markets."
                  </p>
                </motion.blockquote>
                
                <motion.figcaption 
                  className="mt-6 text-sm leading-6 text-gray-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1, duration: 0.5 }}
                >
                  <strong className="font-semibold text-white">Mr. Chandrakant Salunkhe</strong> <br />Founder & President, SME Chamber of India
                </motion.figcaption>
              </motion.figure>
            </motion.div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div variants={slideInRight}>
            <div className="text-base leading-7 text-gray-700 lg:max-w-lg">
              <motion.p 
                className="text-base font-semibold leading-7 text-[#29688A]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                About SME Chamber of India
              </motion.p>
              
              <motion.h1 
                className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.7 }}
              >
                <motion.span
                  initial={{ backgroundSize: "0% 2px" }}
                  whileInView={{ backgroundSize: "100% 2px" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 1 }}
                  className=""
                  // style={{ backgroundImage: "linear-gradient(to right, #29688A, #46cbff)" }}
                >
                  Empowering SMEs for Global Competitiveness
                </motion.span>
              </motion.h1>
              
              <div className="max-w-xl">
                <motion.p 
                  className="mt-6"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  SME Chamber of India is a leading organisation putting efforts for the empowerment of SME sector for global competitiveness, business growth, export promotion, business transformation and diversification for the last 32 years.
                </motion.p>
                
                <motion.p 
                  className="mt-8"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  The Chamber has been integrating SMEs, manufacturers, exporters, service providers, corporates, mid-corporates, start-ups, professionals, and allied industrial & business sectors to explore emerging business opportunities in domestic and global markets. We facilitate channelizing finance & investment, identifying partners for technology transfers, industrial automation, joint ventures, collaborations, mergers & acquisitions, and contract manufacturing.
                </motion.p>
                
                <motion.p 
                  className="mt-8"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  Under the dynamic leadership of Founder & President <strong>Mr. Chandrakant Salunkhe</strong>, the Chamber provides a unique networking platform connecting CEOs of corporates, financial institutions, Government officials, and regulatory authorities with potential SMEs, buyers, suppliers, manufacturers, exporters, and investors to enhance marketing and achieve 10X business growth.
                </motion.p>
              </div>
            </div>

            {/* Animated Stats */}
            <motion.dl 
              className="mt-10 grid grid-cols-2 gap-8 border-t border-gray-900/10 pt-10 sm:grid-cols-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {stats.map((stat, statIdx) => (
                <motion.div 
                  key={statIdx}
                  variants={fadeInUp}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { type: "spring", stiffness: 400, damping: 10 }
                  }}
                  className="group cursor-pointer"
                >
                  <motion.dt 
                    className="text-sm font-semibold leading-6 text-gray-600 group-hover:text-[#29688A] transition-colors duration-300"
                  >
                    {stat.label}
                  </motion.dt>
                  <motion.dd 
                    className="mt-2 text-3xl font-bold leading-10 tracking-tight text-gray-900"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: 0.8 + (statIdx * 0.1),
                      type: "spring",
                      stiffness: 200,
                      damping: 10
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      color: "#29688A"
                    }}
                  >
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 + (statIdx * 0.1), duration: 0.5 }}
                    >
                      {stat.value}
                    </motion.span>
                  </motion.dd>
                </motion.div>
              ))}
            </motion.dl>

            {/* Call to Action */}
            <motion.div 
              className="mt-10 flex"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <motion.a 
                href="/about" 
                className="text-base font-semibold leading-7 text-[#29688A] group inline-flex items-center"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Learn more about our mission{' '}
                <motion.span 
                  aria-hidden="true"
                  className="ml-1 group-hover:translate-x-1 transition-transform duration-300"
                  initial={{ x: 0 }}
                  animate={{ x: [0, 5, 0] }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut"
                  }}
                >
                  &rarr;
                </motion.span>
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}