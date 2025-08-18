"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import EventCard from "./components/event-card"
import { eventsData } from "@/lib/sample-data/past-events-data"

export default function PastEvents() {
  const [selectedYear, setSelectedYear] = useState("all")

  // Filter past events (events with year property)
  const pastEvents = useMemo(() => {
    return eventsData.filter((event) => event.year)
  }, [])

  // Get unique years from past events
  const availableYears = useMemo(() => {
    const years = [...new Set(pastEvents.map((event) => event.year))].sort((a, b) => b - a)
    return years
  }, [pastEvents])

  // Filter events by selected year
  const filteredEvents = useMemo(() => {
    if (selectedYear === "all") {
      return pastEvents.sort((a, b) => b.year - a.year)
    }
    return pastEvents.filter((event) => event.year === Number.parseInt(selectedYear))
  }, [pastEvents, selectedYear])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-sm border-b"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/"
            className="inline-flex items-center text-[#29688A] hover:text-[#1e4f6b] mb-4 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>

          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Past Events</h1>
            <p className="text-lg text-gray-600">Explore our successful events and conferences from previous years</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Year Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <label htmlFor="year-select" className="text-sm font-medium text-gray-700">
              Filter by Year:
            </label>
            <select
              id="year-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#29688A] focus:border-transparent bg-white text-gray-900"
            >
              <option value="all">All Years</option>
              {availableYears.map((year) => (
                <option key={year} value={year.toString()}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="text-sm text-gray-600">
            Showing {filteredEvents.length} event{filteredEvents.length !== 1 ? "s" : ""}
            {selectedYear !== "all" && ` from ${selectedYear}`}
          </div>
        </motion.div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {filteredEvents.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center py-16"
          >
            <div className="max-w-md mx-auto">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Events Found</h3>
              <p className="text-gray-600">
                {selectedYear === "all"
                  ? "No past events are currently available."
                  : `No events found for the year ${selectedYear}.`}
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-[#29688A] text-white py-16"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Don't Miss Our Upcoming Events</h2>
          <p className="text-xl mb-8 opacity-90">
            Join us for our latest conferences, workshops, and networking opportunities
          </p>
          <Link
            href="/events/forthcoming-events"
            className="inline-flex items-center bg-white text-[#29688A] px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            View Upcoming Events
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
