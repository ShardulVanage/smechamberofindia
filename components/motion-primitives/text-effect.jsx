"use client"

import { motion } from "framer-motion"

export function TextEffect({ children, per = "word", as = "div", preset = "fade", className = "" }) {
  const Component = as

  const text = typeof children === "string" ? children : ""
  const segments = per === "char" ? text.split("") : text.split(" ")

  const variants = {
    fade: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
  }

  return (
    <Component className={className}>
      {segments.map((segment, index) => (
        <motion.span
          key={index}
          variants={variants[preset]}
          initial="hidden"
          animate="visible"
          transition={{
            duration: 0.5,
            delay: index * 0.1,
          }}
          style={{ display: per === "word" ? "inline-block" : "inline" }}
        >
          {segment}
          {per === "word" && index < segments.length - 1 && " "}
        </motion.span>
      ))}
    </Component>
  )
}
