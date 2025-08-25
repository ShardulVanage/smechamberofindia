"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { getClientPb } from "@/lib/pocketbase"
import { usePocketBaseFetchWithLoading } from "@/hooks/use-pocketbase-fetch"


export default function EventDetail({ params }) {
  const { id } = React.use(params)
  const [event, setEvent] = useState(null)
  const [error, setError] = useState(null)

  const isLoading = usePocketBaseFetchWithLoading(
    async (signal) => {
      try {
        const pb = getClientPb()
        const response = await pb.collection("forthcoming_events").getOne(id, {
          requestKey: null, // Disable auto-cancellation for this specific request
        })

        if (!signal.aborted) {
          setEvent(response )
          setError(null)
        }
      } catch (err) {
        if (!signal.aborted) {
          console.error("Error fetching event:", err)
          setError("Event not found or failed to load.")
        }
      }
    },
    [id], // Refetch when ID changes
    200, // 200ms delay
  )

  const getBannerImageUrl = () => {
    if (!event?.bannerImageScreen && !event?.bannerImageFront) {
      return "/vibrant-event-banner.png"
    }
    const pb = getClientPb()
    const imageField = event.bannerImageScreen || event.bannerImageFront
    return pb.files.getUrl(event, imageField)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#29688A] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading event details...</p>
        </div>
      </div>
    )
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h1>
          <p className="text-gray-600 mb-4">{error || "The requested event could not be found."}</p>
          <Link href="/events/forthcoming-events" className="text-[#29688A] hover:underline">
            Back to Events
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-sm border-b"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/events/forthcoming-events"
            className="inline-flex items-center text-[#29688A] hover:text-[#1e4f6b] mb-4 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Events
          </Link>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900"
          >
            {event.title}
          </motion.h1>
        </div>
      </motion.div>

      {/* Event Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            {/* Banner Image */}
            <div className="mb-8">
              <img
                src={getBannerImageUrl() || "/placeholder.svg"}
                alt={event.title}
                className="w-full h-64 md:h-[700px] object-contain rounded-lg shadow-lg"
              />
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">About This Event</h2>
              <p className="text-gray-700 leading-relaxed text-lg">{event.description}</p>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Event Info Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Event Details</h3>

              <div className="space-y-4">
                <div className="flex items-start">
                  <svg
                    className="w-5 h-5 text-[#29688A] mt-1 mr-3 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-900">Date</p>
                    <p className="text-gray-600">
                      {new Date(event.eventDate).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg
                    className="w-5 h-5 text-[#29688A] mt-1 mr-3 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-900">Time</p>
                    <p className="text-gray-600">{event.timeOnward}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg
                    className="w-5 h-5 text-[#29688A] mt-1 mr-3 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-900">Venue</p>
                    <p className="text-gray-600">{event.venue}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Registration Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#29688A] rounded-lg shadow-lg p-6 text-white"
            >
              <h3 className="text-xl font-semibold mb-4">Ready to Join?</h3>
              <p className="mb-6 opacity-90">Register now to secure your spot at this amazing event.</p>
              <a
                href={event.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-white text-[#29688A] text-center py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Register Now
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
