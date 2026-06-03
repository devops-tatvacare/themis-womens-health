"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, CheckCircle, Clock, Upload, ChevronRight } from "lucide-react"

interface TreatmentJourneyCardProps {
  onNavigate: () => void
}

export function TreatmentJourneyCard({ onNavigate }: TreatmentJourneyCardProps) {
  const treatmentItems = [
    {
      id: "completed",
      label: "Weeks in Program",
      value: "12",
      icon: CheckCircle,
    },
    {
      id: "next",
      label: "Next Nurse Check-In",
      value: "April 20, 2025",
      icon: Clock,
    },
  ]

  return (
    <Card className="shadow-sm border-0 bg-white rounded-xl overflow-hidden">
      <CardHeader className="px-3 py-2 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold flex items-center gap-2 text-[#000000]">
            <div className="w-6 h-6 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-3.5 h-3.5 text-indigo-600" />
            </div>
            Treatment Journey
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gray-100 rounded-full transition-colors h-8 w-8"
            onClick={onNavigate}
          >
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="px-3 py-2">
        {/* Treatment Items */}
        <div className="space-y-0.5">
          {treatmentItems.map((item) => {
            const ItemIcon = item.icon
            return (
              <div
                key={item.id}
                className="flex items-center justify-between p-1.5 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-2 flex-1">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "var(--icon-bg-primary)" }}
                  >
                    <ItemIcon className="w-3 h-3" style={{ color: "var(--app-primary)" }} />
                  </div>
                  <span className="font-medium text-gray-900 text-sm">{item.label}</span>
                </div>
                <span className="text-sm font-medium text-gray-700">{item.value}</span>
              </div>
            )
          })}
        </div>

        <div className="mt-2 pt-2 border-t border-gray-100">
          <div
            className="rounded-lg p-2.5"
            style={{
              background: `linear-gradient(135deg, var(--banner-bg-start), var(--banner-bg-end))`,
              border: `1px solid var(--banner-border)`,
            }}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "var(--icon-bg-secondary)" }}
                >
                  <Upload className="w-3 h-3" style={{ color: "var(--app-primary)" }} />
                </div>
                <span className="text-xs font-medium text-gray-800 truncate">Upload documents for next check-up</span>
              </div>
              <Button
                variant="default"
                size="sm"
                className="text-xs font-medium px-3 py-1.5 h-auto rounded-md shadow-sm flex-shrink-0"
                style={{
                  backgroundColor: "var(--app-primary)",
                  color: "white",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--app-primary-hover)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--app-primary)"
                }}
                onClick={onNavigate}
              >
                Upload
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
