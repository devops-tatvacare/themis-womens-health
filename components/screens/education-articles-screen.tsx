"use client"

import { useState } from "react"
import { ArrowLeft, Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

interface EducationArticlesScreenProps {
  onBack: () => void
}

const categories = [
  "All",
  "Your Cycle",
  "Perimenopause & Menopause",
  "Hormone Therapy",
  "Symptoms & Tracking",
  "Lifestyle & Wellbeing",
]

const articles = [
  { id: 1, title: "Understanding Your Cycle Phases", tags: ["Basics", "Cycle"], image: "/images/medical-consultation.png", duration: "8 min read", category: "Your Cycle" },
  { id: 2, title: "What Your Period Says About Your Health", tags: ["Cycle", "Health"], image: "/images/telemedicine-consultation.png", duration: "6 min read", category: "Your Cycle" },
  { id: 3, title: "Tracking Ovulation: A Simple Guide", tags: ["Ovulation", "Tracking"], image: "/images/medical-consultation.png", duration: "7 min read", category: "Your Cycle" },
  { id: 4, title: "Irregular Cycles: When to Check In", tags: ["Cycle", "When to Ask"], image: "/images/telemedicine-consultation.png", duration: "9 min read", category: "Your Cycle" },
  { id: 5, title: "Perimenopause: What's Changing & Why", tags: ["Perimenopause", "Basics"], image: "/images/medical-consultation.png", duration: "10 min read", category: "Perimenopause & Menopause" },
  { id: 6, title: "Common Menopause Symptoms, Explained", tags: ["Menopause", "Symptoms"], image: "/images/telemedicine-consultation.png", duration: "8 min read", category: "Perimenopause & Menopause" },
  { id: 7, title: "Hot Flushes & Night Sweats: Managing Them", tags: ["Symptoms", "Self-Care"], image: "/images/medical-consultation.png", duration: "7 min read", category: "Perimenopause & Menopause" },
  { id: 8, title: "Mood Changes During Menopause", tags: ["Menopause", "Mood"], image: "/images/telemedicine-consultation.png", duration: "9 min read", category: "Perimenopause & Menopause" },
  { id: 9, title: "Hormone Therapy, Explained", tags: ["HRT", "Basics"], image: "/images/medical-consultation.png", duration: "8 min read", category: "Hormone Therapy" },
  { id: 10, title: "Is HRT Right for You? Questions to Ask", tags: ["HRT", "Decisions"], image: "/images/telemedicine-consultation.png", duration: "11 min read", category: "Hormone Therapy" },
  { id: 11, title: "Managing HRT Side Effects", tags: ["HRT", "Side Effects"], image: "/images/medical-consultation.png", duration: "9 min read", category: "Hormone Therapy" },
  { id: 12, title: "Non-Hormonal Options for Symptom Relief", tags: ["Non-Hormonal", "Relief"], image: "/images/telemedicine-consultation.png", duration: "8 min read", category: "Hormone Therapy" },
  { id: 13, title: "Why Daily Symptom Logs Matter", tags: ["Logging", "Self-Care"], image: "/images/medical-consultation.png", duration: "6 min read", category: "Symptoms & Tracking" },
  { id: 14, title: "Reading Your Symptom Trends", tags: ["Trends", "Tracking"], image: "/images/telemedicine-consultation.png", duration: "7 min read", category: "Symptoms & Tracking" },
  { id: 15, title: "Sleep, Mood & Hormones", tags: ["Sleep", "Mood"], image: "/images/medical-consultation.png", duration: "9 min read", category: "Symptoms & Tracking" },
  { id: 16, title: "Bladder & Pelvic Health Basics", tags: ["Pelvic Health", "Basics"], image: "/images/telemedicine-consultation.png", duration: "8 min read", category: "Symptoms & Tracking" },
  { id: 17, title: "Bone & Heart Health After Menopause", tags: ["Bone Health", "Heart"], image: "/images/medical-consultation.png", duration: "10 min read", category: "Lifestyle & Wellbeing" },
  { id: 18, title: "Nutrition for Hormonal Balance", tags: ["Nutrition", "Hormones"], image: "/images/telemedicine-consultation.png", duration: "8 min read", category: "Lifestyle & Wellbeing" },
  { id: 19, title: "Movement & Strength for Midlife", tags: ["Exercise", "Strength"], image: "/images/medical-consultation.png", duration: "9 min read", category: "Lifestyle & Wellbeing" },
  { id: 20, title: "Stress, Rest & Your Hormones", tags: ["Stress", "Wellbeing"], image: "/images/telemedicine-consultation.png", duration: "8 min read", category: "Lifestyle & Wellbeing" },
]

export function EducationArticlesScreen({ onBack }: EducationArticlesScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Educational Content</h1>
      </div>

      {/* Search Bar */}
      <div className="bg-white px-4 py-3 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2 w-full rounded-lg border border-gray-200 focus:border-gray-300 focus:ring-1 focus:ring-gray-300"
          />
        </div>
      </div>

      {/* Filter Chips */}
      <div className="bg-white px-4 py-3 border-b border-gray-200">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? "text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
              }`}
              style={
                selectedCategory === category
                  ? {
                      backgroundColor: "var(--app-primary)",
                    }
                  : undefined
              }
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Articles List */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-3">
          {filteredArticles.map((article) => (
            <Card key={article.id} className="shadow-sm border-0 bg-white rounded-xl overflow-hidden">
              <CardContent className="p-3">
                <div className="flex gap-3">
                  <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-xl overflow-hidden border border-yellow-200 w-24 h-20 flex-shrink-0">
                    <img
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm leading-tight text-gray-800 mb-1.5 line-clamp-2">
                      {article.title}
                    </h3>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {article.tags.map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          variant="secondary"
                          className="text-xs rounded-full px-2 py-0.5"
                          style={{
                            backgroundColor: "var(--chip-bg-primary)",
                            color: "var(--chip-text-primary)",
                            border: `1px solid var(--chip-border-primary)`,
                          }}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{article.duration}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
