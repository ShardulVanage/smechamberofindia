"use client"

export function ProgressiveBlur({ children, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      {children}
      {/* Left blur gradient */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white dark:from-slate-900 to-transparent pointer-events-none z-10" />
      {/* Right blur gradient */}
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white dark:from-slate-900 to-transparent pointer-events-none z-10" />
    </div>
  )
}
