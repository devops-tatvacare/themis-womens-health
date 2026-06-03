"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, ChevronRight, Clock } from "lucide-react"

interface EducationCardProps {
  onViewAll: () => void
}

const educationContent = [
  {
    id: "1",
    title: "Understanding Your Cycle Phases",
    image: "/images/medical-consultation.png",
    duration: "8 min read",
    tags: ["Your Cycle"],
  },
  {
    id: "2",
    title: "Perimenopause: What's Changing & Why",
    image: "/images/telemedicine-consultation.png",
    duration: "10 min read",
    tags: ["Menopause"],
  },
  {
    id: "3",
    title: "Why Daily Symptom Logs Matter",
    image: "/images/medical-consultation.png",
    duration: "6 min read",
    tags: ["Symptoms & Tracking"],
  },
]

export function EducationCard({ onViewAll }: EducationCardProps) {
  return (
    <Card className="shadow-sm border-0 bg-white rounded-xl">
      <CardHeader className="px-3 py-2 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <CardTitle className="text-sm font-semibold flex items-center gap-2 text-[#000000]">
              <div className="w-6 h-6 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-3.5 h-3.5 text-green-600" />
              </div>
              Education
            </CardTitle>
            <p className="text-xs text-gray-500">Learn about women's health and your program</p>
          </div>
          <button
            onClick={onViewAll}
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="View all education content"
          >
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </CardHeader>
      <CardContent className="px-3 py-2">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {educationContent.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-36 bg-white border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            >
              <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-20 object-cover" />
              <div className="p-2">
                <div className="flex gap-1 mb-1.5">
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded-full"
                    style={{
                      backgroundColor: "var(--icon-bg-primary)",
                      color: "var(--app-primary)",
                    }}
                  >
                    {item.tags[0]}
                  </span>
                </div>
                <h4 className="text-[11px] font-medium text-gray-900 line-clamp-2 leading-tight mb-1.5">
                  {item.title}
                </h4>
                <div className="flex items-center gap-1 text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span className="text-[10px]">{item.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
