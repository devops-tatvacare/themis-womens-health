"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react"
import { ScreenLayout } from "@/components/layouts/screen-layout"
import { useMenstrualData } from "@/lib/hooks/use-insights-data"

interface MenstrualDetailScreenProps {
  onBack: () => void
}

export function MenstrualDetailScreen({ onBack }: MenstrualDetailScreenProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [activeTab, setActiveTab] = useState("calendar")
  const { menstrualData, calculatePhase } = useMenstrualData()

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case "period":
        return "bg-pink-200 text-pink-800"
      case "post-period":
        return "bg-purple-200 text-purple-800"
      case "ovulation":
        return "bg-green-200 text-green-800"
      case "pre-period":
        return "bg-yellow-200 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []
    const lastPeriodStart = new Date(menstrualData.cycles[0]?.startDate || "2024-03-01")
    const cycleLength = menstrualData.cycles[0]?.cycleLength || 28

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-10 w-10 flex items-center justify-center">
          <span className="text-gray-300"></span>
        </div>,
      )
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      const phase = calculatePhase(date, lastPeriodStart, cycleLength)
      const phaseColor = getPhaseColor(phase)
      const isToday = date.toDateString() === new Date().toDateString()

      days.push(
        <div
          key={day}
          className={`h-10 w-10 flex items-center justify-center rounded-full text-sm font-medium cursor-pointer transition-colors ${phaseColor} ${
            isToday ? "ring-2 ring-[var(--app-primary)]" : ""
          }`}
        >
          {day}
        </div>,
      )
    }

    return days
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getPhaseLabel = (phase: string) => {
    switch (phase) {
      case "period":
        return "Period Day"
      case "post-period":
        return "Post Period"
      case "ovulation":
        return "Ovulation"
      case "pre-period":
        return "Pre-Period"
      default:
        return "Regular Day"
    }
  }

  return (
    <ScreenLayout title="Menstruation Logs" onBack={onBack} contentPadding="none">
      <div className="flex flex-col h-full">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
          <div className="px-3 pt-3 pb-2 bg-white border-b border-gray-100 flex-shrink-0">
            <TabsList className="grid w-full grid-cols-2 bg-[var(--bg-secondary)] rounded-lg p-1">
              <TabsTrigger
                value="calendar"
                className="text-xs font-medium data-[state=active]:bg-[var(--bg-primary)] data-[state=active]:text-[var(--app-primary)] data-[state=active]:shadow-sm text-[var(--text-secondary)] rounded-md py-2 px-1"
              >
                Calendar
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="text-xs font-medium data-[state=active]:bg-[var(--bg-primary)] data-[state=active]:text-[var(--app-primary)] data-[state=active]:shadow-sm text-[var(--text-secondary)] rounded-md py-2 px-1"
              >
                History
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-hidden">
            <TabsContent value="calendar" className="h-full overflow-y-auto bg-gray-50 mt-0">
              <div className="bg-white p-4">
                {/* Month Navigation */}
                <div className="flex items-center justify-between mb-6">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => navigateMonth("prev")}
                    className="h-8 w-8 rounded-full"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                  </h2>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => navigateMonth("next")}
                    className="h-8 w-8 rounded-full"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>

                {/* Calendar Grid */}
                <div className="mb-6">
                  {/* Day Headers */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                      <div key={day} className="h-8 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-500">{day}</span>
                      </div>
                    ))}
                  </div>
                  {/* Calendar Days */}
                  <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
                </div>

                {/* Legend */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="text-sm font-medium text-gray-800 mb-3">Legend</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-yellow-200"></div>
                      <span className="text-xs text-gray-600">Pre-Period</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-pink-200"></div>
                      <span className="text-xs text-gray-600">Period Days</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-purple-200"></div>
                      <span className="text-xs text-gray-600">Post Period</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-green-200"></div>
                      <span className="text-xs text-gray-600">Peak Ovulation</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="history" className="h-full flex flex-col mt-0">
              <div className="flex-1 overflow-y-auto bg-gray-50">
                <div className="p-4 space-y-3">
                  {menstrualData.cycles.map((cycle, index) => {
                    const lastPeriodStart = new Date(menstrualData.cycles[0]?.startDate || "2024-03-01")
                    const cycleLength = menstrualData.cycles[0]?.cycleLength || 28
                    const currentDate = new Date(cycle.startDate)
                    const phase = calculatePhase(currentDate, lastPeriodStart, cycleLength)

                    return (
                      <Card key={cycle.id} className="shadow-sm border-0 bg-white rounded-lg overflow-hidden">
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 flex-1">
                              <div className="w-10 h-10 bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="text-lg">🩸</span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-gray-800 text-sm truncate mb-1">
                                  {formatDate(cycle.startDate)} • {getPhaseLabel(phase)}
                                </h3>
                                <div className="flex items-center justify-between">
                                  <p className="text-xs text-gray-500">
                                    Flow: {cycle.flow} • Pain: {cycle.pain}/10 • Mood: {cycle.mood}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}

                  {menstrualData.cycles.length === 0 && (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <CalendarIcon className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="font-semibold text-base text-gray-600 mb-2">No menstrual data found</h3>
                      <p className="text-sm text-gray-500 max-w-sm mx-auto">
                        Start tracking your menstrual cycle to see your history here.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </ScreenLayout>
  )
}
