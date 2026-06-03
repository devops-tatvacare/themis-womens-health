"use client"

import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Video, ChevronRight } from "lucide-react"

interface UploadVideoCardProps {
  onNavigate: () => void
}

export function UploadVideoCard({ onNavigate }: UploadVideoCardProps) {
  return (
    <Card className="shadow-sm border-0 bg-white rounded-xl cursor-pointer" onClick={onNavigate}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold flex items-center gap-2 text-[#000000]">
            <Video className="w-4 h-4" style={{ color: "var(--app-primary)" }} />
            Upload Your Recovery Video
          </CardTitle>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      </CardHeader>
    </Card>
  )
}
