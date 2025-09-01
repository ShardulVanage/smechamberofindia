'use client'
import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import { ArrowRight, Users, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { motion } from "framer-motion"

function Hero() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const badgeVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8 
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.2
      }
    }
  }

  const imageVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      x: 100 
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
        delay: 0.4
      }
    }
  }

  const statsVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.6
      }
    }
  }

  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9 
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.95
    }
  }

  return (
    <motion.section 
      className="relative min-h-screen bg-gradient-to-tr from-white via-white to- overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Background Pattern */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1.5, delay: 0.2 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(41,104,138,0.1)_0%,transparent_50%)]"></div>
      </motion.div>

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Left Content */}
          <motion.div 
            className="space-y-8"
            variants={containerVariants}
          >
            {/* Badge */}
            <motion.div variants={badgeVariants}>
              <div className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-6 py-2 text-sm font-medium text-amber-800">
                <span>36 Years of Excellence</span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.div className="space-y-4" variants={titleVariants}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                <motion.span 
                  className="text-slate-900 block"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Empowering SMEs
                </motion.span>
                <motion.span 
                  className="text-slate-900 inline"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  for{' '}
                </motion.span>
                <motion.span 
                  className="text-[#29688A] inline"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  Global Success
                </motion.span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p 
              className="text-lg sm:text-xl text-slate-600 max-w-2xl leading-relaxed"
              variants={itemVariants}
            >
              Leading organization empowering small and medium enterprises through business growth, export promotion, 
              technology transfers and global market opportunities.
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <Link href="/membership">
                <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                  <Button className="bg-[#29688A] hover:bg-[#29688A]/90 text-white px-8 py-6 rounded-full text-lg font-medium transition-all duration-300 flex items-center gap-3">
                    <Users className="h-5 w-5" />
                    Join Membership
                  </Button>
                </motion.div>
              </Link>
              <Link href="/about">
                <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                  <Button 
                    variant="outline" 
                    className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-6 rounded-full text-lg font-medium transition-all duration-300 flex items-center gap-3"
                  >
                    Learn More
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Stats Cards */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 pt-8"
              variants={statsVariants}
            >
              <motion.div 
                className="flex items-center gap-3 bg-white/70 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
                }}
              >
                <motion.div 
                  className="w-10 h-10 rounded-full bg-[#29688A]/10 flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Users className="h-5 w-5 text-[#29688A]" />
                </motion.div>
                <div>
                  <motion.div 
                    className="text-xl font-bold text-slate-900"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                  >
                    50,000+
                  </motion.div>
                  <div className="text-sm text-slate-600">Members</div>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-3 bg-white/70 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
                }}
              >
                <motion.div 
                  className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Globe className="h-5 w-5 text-amber-600" />
                </motion.div>
                <div>
                  <motion.div 
                    className="text-xl font-bold text-slate-900"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                  >
                    180+
                  </motion.div>
                  <div className="text-sm text-slate-600">Countries</div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Side - Global Network Visualization with Image */}
          <motion.div 
            className="relative"
            variants={imageVariants}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
            >
              <Image 
                src="/leftherobg.png"
                alt="Indian Parliament Building"
                className="w-full h-full object-cover object-start pointer-events-none select-none"
                width={600}
                height={600}
              />
            </motion.div>

            {/* Floating Animation Elements */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-4 h-4 bg-[#29688A]/30 rounded-full"
              animate={{ 
                y: [0, -10, 0],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute top-3/4 right-1/4 w-3 h-3 bg-amber-400/40 rounded-full"
              animate={{ 
                y: [0, -15, 0],
                opacity: [0.4, 0.7, 0.4]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
            <motion.div
              className="absolute top-1/2 right-1/3 w-2 h-2 bg-blue-400/30 rounded-full"
              animate={{ 
                y: [0, -8, 0],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{ 
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-[#29688A]/5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1 }}
      />
    </motion.section>
  )
}

export default Hero