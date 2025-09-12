"use client"

import { Calendar } from "@/components/ui/calendar"
import { motion } from "framer-motion"
import EventCard from "./components/event-card"
import { useState } from "react"
import { getClientPb } from "@/lib/pocketbase"
import { usePocketBaseFetchWithLoading } from "@/hooks/use-pocketbase-fetch"

export default function ForthcomingEventsPage() {
  const [events, setEvents] = useState([])
  const [error, setError] = useState(null)

  const isLoading = usePocketBaseFetchWithLoading(
    async (signal) => {
      try {
        const pb = getClientPb()
        const response = await pb.collection("supported_exhibitions").getList(1, 50, {
          sort: "order",
          requestKey: null, // Disable auto-cancellation for this specific request
        })

        if (!signal.aborted) {
          setEvents(response.items )
          setError(null)
        }
      } catch (err) {
        if (!signal.aborted) {
          console.error("Error fetching events:", err)
          setError("Failed to load events. Please try again later.")
        }
      }
    },
    [], // Empty deps array means fetch once on mount
    200, // 200ms delay to prevent rapid re-fetching
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#29688A] mb-4">Forthcoming Events</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover upcoming events, workshops, and conferences designed to inspire, educate, and connect professionals
            across various industries.
          </p>
        </motion.div>

        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#29688A] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading events...</p>
          </motion.div>
        )}

        {error && !isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <div className="text-red-500 mb-4">
              <Calendar className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-red-600 mb-2">Error Loading Events</h3>
            <p className="text-gray-500">{error}</p>
          </motion.div>
        )}

        {!isLoading && !error && events.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {events.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </motion.div>
        )}

        {!isLoading && !error && events.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <div className="text-gray-400 mb-4">
              <Calendar className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Events Available</h3>
            <p className="text-gray-500">Check back soon for upcoming events and workshops.</p>
          </motion.div>
        )}
      </main>
    </div>
  )
}
