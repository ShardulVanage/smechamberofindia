"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MapPin, Clock } from "lucide-react"
import { getClientPb } from "@/lib/pocketbase"
import { usePocketBaseFetchWithLoading } from "@/hooks/use-pocketbase-fetch"
import Link from "next/link"


export default function PastEventsPage() {
  const [events, setEvents] = useState([])
  const [selectedYear, setSelectedYear] = useState("all")
  const [availableYears, setAvailableYears] = useState([])

  const fetchPastEvents = useCallback(async (signal) => {
    try {
      const pb = getClientPb()
      const currentDate = new Date().toISOString()

      // Fetch past events from both collections
      const [exhibitions, events] = await Promise.all([
        pb.collection("supported_exhibitions").getList(1, 100, {
          filter: `eventDate < "${currentDate}"`,
          sort: "-eventDate",
          signal,
        }),
        pb.collection("forthcoming_events").getList(1, 100, {
          filter: `eventDate < "${currentDate}"`,
          sort: "-eventDate",
          signal,
        }),
      ])

      // Combine and sort all events
      const allEvents = [...exhibitions.items, ...events.items]
      allEvents.sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime())

      // Extract unique years for filter
      const years = [...new Set(allEvents.map((event) => new Date(event.eventDate).getFullYear()))].sort(
        (a, b) => b - a,
      )

      setEvents(allEvents)
      setAvailableYears(years)
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Error fetching past events:", error)
      }
    }
  }, [])

  const isLoading = usePocketBaseFetchWithLoading(fetchPastEvents, [])

  const filteredEvents =
    selectedYear === "all"
      ? events
      : events.filter((event) => new Date(event.eventDate).getFullYear().toString() === selectedYear)

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getImageUrl = (event, imageField) => {
    if (!event[imageField]) return "/vibrant-event-banner.png"
    const pb = getClientPb()
    return pb.files.getUrl(event, event[imageField])
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#29688A] mb-4">Past Events</h1>
          <p className="text-gray-600 text-lg">
            Explore our previous exhibitions and events that have shaped our community
          </p>
        </div>

        {/* Year Filter */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <label htmlFor="year-filter" className="text-sm font-medium text-gray-700">
              Filter by Year:
            </label>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {availableYears.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#29688A]"></div>
          </div>
        )}

        {/* Events Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <Card
                key={`${event.collectionName}-${event.id}`}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={getImageUrl(event, "bannerImageFront") || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span className="bg-[#29688A] text-white px-2 py-1 rounded text-xs font-medium">
                      {event.collectionName === "supported_exhibitions" ? "Exhibition" : "Event"}
                    </span>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-[#29688A] line-clamp-2">{event.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{event.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(event.eventDate)}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{event.timeOnward}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span className="line-clamp-1">{event.venue}</span>
                  </div>

                  <div className="pt-2">
                    <Link href={`/events/${event.collectionName}/${event.id}`}>
                      <Button className="w-full bg-[#29688A] hover:bg-[#1e4f6b] text-white">View Details</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Calendar className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Past Events Found</h3>
            <p className="text-gray-500">
              {selectedYear === "all"
                ? "There are no past events to display at the moment."
                : `No events found for the year ${selectedYear}.`}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
