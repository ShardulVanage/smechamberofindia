"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Calendar, Clock, MapPin, ExternalLink } from "lucide-react"
import { getClientPb } from "@/lib/pocketbase"



export default function EventCard({ event, index }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getBannerImageUrl = () => {
    if (!event.bannerImageFront) return "/vibrant-event-banner.png"
    const pb = getClientPb()
    return pb.files.getUrl(event, event.bannerImageFront)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
    >
      {/* Banner Image */}
      <div className="relative h-70 overflow-hidden">
        <motion.img
          src={getBannerImageUrl()}
          alt={event.title}
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
          whileHover={{ scale: 1.05 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <motion.h3
          className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#29688A] transition-colors duration-200"
          whileHover={{ scale: 1.02 }}
        >
          {event.title}
        </motion.h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">{event.description}</p>

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-700">
            <Calendar className="w-4 h-4 mr-2 text-[#29688A]" />
            <span>{formatDate(event.eventDate)}</span>
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <Clock className="w-4 h-4 mr-2 text-[#29688A]" />
            <span>{event.timeOnward}</span>
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <MapPin className="w-4 h-4 mr-2 text-[#29688A]" />
            <span className="line-clamp-1">{event.venue}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href={`/events/forthcoming-events/${event.id}`} className="flex-1">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#29688A] text-white px-4 py-2.5 rounded-lg font-medium hover:bg-[#1e4a5f] transition-colors duration-200 flex items-center justify-center"
            >
              View Details
            </motion.button>
          </Link>

          <motion.a
            href={event.registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 border-2 border-[#29688A] text-[#29688A] px-4 py-2.5 rounded-lg font-medium hover:bg-[#29688A] hover:text-white transition-all duration-200 flex items-center justify-center"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Register
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}
