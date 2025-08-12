"use client"

import { motion } from "framer-motion"

export function AnimatedGroup({ children, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        staggerChildren: 0.1,
      }}
    >
      {children}
    </motion.div>
  )
}
