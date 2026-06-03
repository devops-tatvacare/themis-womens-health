"use client"

import { useState } from "react"
import { ScreenHeader } from "@/components/ui/screen-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Video, Upload, Play, Info } from "lucide-react"

interface UploadVideoScreenProps {
  onBack: () => void
}

const pastVideos = [
  {
    id: "1",
    date: "Dec 15, 2024",
    thumbnail: "/placeholder.svg?height=120&width=160",
    duration: "2:30",
  },
  {
    id: "2",
    date: "Dec 10, 2024",
    thumbnail: "/placeholder.svg?height=120&width=160",
    duration: "1:45",
  },
  {
    id: "3",
    date: "Dec 5, 2024",
    thumbnail: "/placeholder.svg?height=120&width=160",
    duration: "3:15",
  },
]

const recordingInstructions = [
  "Record in a well-lit area with good visibility",
  "Ensure the camera is stable and at knee level",
  "Wear shorts or fitted clothing to show knee movement",
  "Perform the exercises as demonstrated by your therapist",
  "Record for 2-3 minutes showing range of motion",
  "Speak clearly if adding voice narration",
]

export function UploadVideoScreen({ onBack }: UploadVideoScreenProps) {
  const [selectedAction, setSelectedAction] = useState<"record" | "upload" | null>(null)

  return (
    <div className="flex flex-col h-full bg-[var(--bg-primary)]">
      <ScreenHeader title="Upload Recovery Video" onBack={onBack} />

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => setSelectedAction("record")}
              className="h-14 flex flex-col items-center justify-center gap-1.5"
              variant={selectedAction === "record" ? "default" : "outline"}
            >
              <Video className="w-5 h-5" />
              <span className="text-xs font-medium">Record Video</span>
            </Button>
            <Button
              onClick={() => setSelectedAction("upload")}
              className="h-14 flex flex-col items-center justify-center gap-1.5"
              variant={selectedAction === "upload" ? "default" : "outline"}
            >
              <Upload className="w-5 h-5" />
              <span className="text-xs font-medium">Upload Video</span>
            </Button>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                <Info className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900">Recording Instructions</h3>
            </div>
            <ul className="space-y-1.5 ml-8">
              {recordingInstructions.map((instruction, index) => (
                <li key={index} className="flex gap-2 text-xs text-gray-700 leading-relaxed">
                  <span className="text-blue-600 font-medium flex-shrink-0">{index + 1}.</span>
                  <span>{instruction}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2">Past Videos</h3>
            <div className="space-y-2">
              {pastVideos.map((video) => (
                <Card key={video.id} className="shadow-sm border-0 bg-white rounded-xl overflow-hidden">
                  <CardContent className="p-2.5">
                    <div className="flex gap-2.5">
                      <div className="relative flex-shrink-0">
                        <img
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={`Video from ${video.date}`}
                          className="w-28 h-18 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-lg">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: "var(--app-primary)" }}
                          >
                            <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                          </div>
                        </div>
                        <div className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-[10px] px-1.5 py-0.5 rounded">
                          {video.duration}
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <p className="text-xs font-medium text-[var(--text-primary)]">Recovery Progress</p>
                        <p className="text-[10px] text-gray-500 mt-0.5">{video.date}</p>
                        <Button size="sm" variant="outline" className="mt-1.5 h-6 text-[10px] bg-transparent px-2">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
