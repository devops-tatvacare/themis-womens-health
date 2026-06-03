"use client"

import { useState } from "react"
import { ChevronDown, Clock, Calendar, Droplets, Moon, Activity, Utensils, Pill } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ExpandableRemindersCardProps {
  onFreeDrugClick: () => void
  onAppointmentClick: () => void
  onNavigateToAssistant: () => void
  onNavigate?: (screen: string, data?: any) => void
}

export function ExpandableRemindersCard({
  onFreeDrugClick,
  onAppointmentClick,
  onNavigateToAssistant,
  onNavigate,
}: ExpandableRemindersCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleLogAction = (type: string) => {
    if (onNavigate) {
      onNavigateToAssistant()
    }
  }

  return (
    <Card className="bg-white border border-gray-100 shadow-sm">
      <CardContent className="p-3">
        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-4 h-4 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Reminders</h3>
        </div>

        {/* High Priority Reminders - Always Visible */}
        <div className="space-y-1 mb-2">
          <div
            className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
            onClick={onFreeDrugClick}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "var(--icon-bg-primary)" }}
              >
                <Pill className="w-4 h-4" style={{ color: "var(--app-primary)" }} />
              </div>
              <div>
                <p className="font-medium text-gray-900 text-sm">Treatment Refill Available</p>
                <p className="text-xs text-gray-600">Ready for pickup</p>
              </div>
            </div>
            <Button
              size="sm"
              className="h-7 px-3 text-xs text-white"
              style={{
                backgroundColor: "var(--app-primary)",
                borderColor: "var(--app-primary)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--app-primary-hover)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--app-primary)")}
            >
              Claim
            </Button>
          </div>

          <div
            className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
            onClick={onAppointmentClick}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "var(--icon-bg-primary)" }}
              >
                <Calendar className="w-4 h-4" style={{ color: "var(--app-primary)" }} />
              </div>
              <div>
                <p className="font-medium text-gray-900 text-sm">Appointment Tomorrow</p>
                <p className="text-xs text-gray-600">Dr. Sarah Wilson at 2:00 PM</p>
              </div>
            </div>
            <Button size="sm" variant="outline" className="h-7 px-3 text-xs bg-transparent">
              View
            </Button>
          </div>
        </div>

        {/* Expandable Health Logs */}
        {isExpanded && (
          <div className="space-y-1 mt-2 animate-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "var(--icon-bg-primary)" }}
                >
                  <Droplets className="w-4 h-4" style={{ color: "var(--app-primary)" }} />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">Water Intake</p>
                  <p className="text-xs text-gray-600">1.2L / 2L today</p>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="h-7 px-3 text-xs bg-transparent"
                onClick={() => handleLogAction("water")}
              >
                Log Now
              </Button>
            </div>

            <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "var(--icon-bg-primary)" }}
                >
                  <Moon className="w-4 h-4" style={{ color: "var(--app-primary)" }} />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">Sleep Log</p>
                  <p className="text-xs text-gray-600">Last night: 7h 30m</p>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="h-7 px-3 text-xs bg-transparent"
                onClick={() => handleLogAction("sleep")}
              >
                Log Now
              </Button>
            </div>

            <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "var(--icon-bg-primary)" }}
                >
                  <Activity className="w-4 h-4" style={{ color: "var(--app-primary)" }} />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">Steps</p>
                  <p className="text-xs text-gray-600">8,245 / 10,000 today</p>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="h-7 px-3 text-xs bg-transparent"
                onClick={() => handleLogAction("steps")}
              >
                Log Now
              </Button>
            </div>

            <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "var(--icon-bg-primary)" }}
                >
                  <Utensils className="w-4 h-4" style={{ color: "var(--app-primary)" }} />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">Diet Log</p>
                  <p className="text-xs text-gray-600">Breakfast logged</p>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="h-7 px-3 text-xs bg-transparent"
                onClick={() => handleLogAction("diet")}
              >
                Log Now
              </Button>
            </div>
          </div>
        )}
        {/* Bottom Chevron */}
        <div className="pt-1 mt-1">
          <div className="flex justify-center">
            <div className="relative">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`p-2 rounded-full transition-colors ${
                  !isExpanded ? "bg-gray-100 hover:bg-gray-200 border border-gray-200" : "hover:bg-gray-100"
                }`}
              >
                <ChevronDown
                  className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                />
                {/* Integrated badge dot */}
                {!isExpanded && (
                  <div
                    className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-white"
                    style={{ backgroundColor: "var(--app-primary)" }}
                  ></div>
                )}
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
