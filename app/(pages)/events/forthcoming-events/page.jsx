"use client"

import { Calendar } from "@/components/ui/calendar"

import { motion } from "framer-motion"
import  EventCard  from "./components/event-card"
import { eventsData } from "@/lib/sample-data/events-data"

export default function ForthcomingEventsPage() {
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {eventsData.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </motion.div>

        {eventsData.length === 0 && (
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
