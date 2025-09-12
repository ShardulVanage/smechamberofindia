"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getClientPb } from "@/lib/pocketbase"
import { usePocketBaseFetchWithLoading } from "@/hooks/use-pocketbase-fetch"

export default function NewsPage() {
  const [news, setNews] = useState([])
  const pb = getClientPb()

  const fetchNews = async (signal) => {
    try {
      const records = await pb.collection("news").getList(1, 20, {
        sort: "order",
        signal,
      })
      setNews(records.items)
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Error fetching news:", error)
      }
    }
  }

  const isLoading = usePocketBaseFetchWithLoading(fetchNews, [])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getImageUrl = (record, filename) => {
    if (!filename) return "/placeholder.svg?height=200&width=400"
    return pb.files.getUrl(record, filename)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-48 bg-muted rounded-t-lg"></div>
              <CardHeader>
                <div className="h-6 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        className="mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#29688A] to-[#29688A]/50 bg-clip-text text-transparent">
          Latest News
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Stay updated with our latest announcements, insights, and industry developments
        </p>
      </motion.div>

      <motion.div
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {news.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <Link href={`/news/${article.id}`}>
              <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={getImageUrl(article, article.img) || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="line-clamp-3  transition-colors duration-200 text-2xl">
                    {article.title}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {formatDate(article.created)}
                    </Badge>
                  </div>
                </CardHeader>
                    {/* <CardContent className="pt-0">
                    <div
                        className="text-muted-foreground line-clamp-3 text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{
                        __html: article.content?.replace(/<[^>]*>/g, "").substring(0, 150) + "...",
                        }}
                    />
                    </CardContent> */}
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {news.length === 0 && !isLoading && (
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-semibold mb-3">No news articles found</h3>
          <p className="text-muted-foreground text-lg">Check back later for updates</p>
        </motion.div>
      )}
    </div>
  )
}
