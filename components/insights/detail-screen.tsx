"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScreenLayout } from "@/components/layouts/screen-layout"
import { MiniChart } from "@/components/charts/mini-chart"
import { GoalModal } from "@/components/modals/goal-modal"
import { ReminderModal } from "@/components/modals/reminder-modal"
import { useModal } from "@/lib/hooks/use-modal"
import { useGoals } from "@/lib/hooks/use-insights-data"
import { useToast } from "@/lib/hooks/use-toast"
import {
  Calendar,
  Clock,
  Target,
  Bell,
  Plus,
  Filter,
  TrendingUp,
  TrendingDown,
  Minus,
  Droplets,
  Moon,
  Footprints,
  Pill,
  Zap,
} from "lucide-react"
import type { InsightData } from "@/lib/hooks/use-insights-data"

interface DetailScreenProps {
  title: string
  onBack: () => void
  data: InsightData
}

interface LogEntry {
  id: string
  date: string
  time: string
  value: number | string
  notes?: string
  type?: string
  duration?: string
  location?: string
}

export function DetailScreen({ title, onBack, data }: DetailScreenProps) {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const goalModal = useModal()
  const reminderModal = useModal()
  const { getGoalValue, setGoal } = useGoals()

  const handleSetGoal = (value: number) => {
    setGoal(title, value)
    goalModal.close()
    toast({
      title: "Goal Updated",
      description: `Your ${title.toLowerCase()} goal has been updated.`,
    })
  }

  const handleSetReminder = (reminderData: any) => {
    console.log("Setting reminder:", reminderData)
    reminderModal.close()
    toast({
      title: "Reminder Set",
      description: `Reminder for ${title.toLowerCase()} has been set.`,
    })
  }

  // Generate log data based on the insight type
  const generateLogData = (): LogEntry[] => {
    const logs: LogEntry[] = []
    const today = new Date()

    for (let i = 0; i < 30; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() - i)
      const dateStr = date.toISOString().split("T")[0]

      if (title === "Pain Logs") {
        // Generate 1-3 pain entries per day
        const entriesPerDay = Math.floor(Math.random() * 3) + 1
        for (let j = 0; j < entriesPerDay; j++) {
          const painTypes = ["Headache", "Back Pain", "Joint Pain", "Muscle Pain", "Neck Pain", "Chest Pain"]
          const locations = ["Head", "Lower Back", "Upper Back", "Knee", "Shoulder", "Neck", "Chest", "Hip"]
          const hour = Math.floor(Math.random() * 12) + 8
          const minute = Math.floor(Math.random() * 60)

          logs.push({
            id: `${dateStr}-${j}`,
            date: dateStr,
            time: `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`,
            value: Math.floor(Math.random() * 8) + 2, // Pain level 2-10
            type: painTypes[Math.floor(Math.random() * painTypes.length)],
            location: locations[Math.floor(Math.random() * locations.length)],
            duration: ["15 min", "30 min", "1 hour", "2 hours", "3 hours", "All day"][Math.floor(Math.random() * 6)],
            notes: [
              "Sharp pain when moving",
              "Dull ache throughout the day",
              "Throbbing sensation",
              "Stiffness and discomfort",
              "Pain improved with rest",
              "Worse in the morning",
            ][Math.floor(Math.random() * 6)],
          })
        }
      } else if (title === "Water Logs") {
        // Generate water intake entries
        const glasses = Math.floor(Math.random() * 6) + 4 // 4-10 glasses
        for (let j = 0; j < glasses; j++) {
          const hour = Math.floor(Math.random() * 14) + 7 // 7 AM to 9 PM
          const minute = Math.floor(Math.random() * 60)
          logs.push({
            id: `${dateStr}-${j}`,
            date: dateStr,
            time: `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`,
            value: "250ml",
            type: "Water",
            notes: j === 0 ? "Morning hydration" : j === glasses - 1 ? "Evening water" : "",
          })
        }
      } else if (title === "Sleep Logs") {
        // Generate sleep entries
        const bedtime = Math.floor(Math.random() * 3) + 22 // 10 PM to 12 AM
        const wakeTime = Math.floor(Math.random() * 3) + 6 // 6 AM to 8 AM
        const sleepHours = wakeTime + (24 - bedtime)

        logs.push({
          id: dateStr,
          date: dateStr,
          time: `${bedtime}:00 - ${wakeTime}:00`,
          value: `${sleepHours}h ${Math.floor(Math.random() * 60)}m`,
          type: "Sleep",
          notes: ["Good quality sleep", "Restless night", "Deep sleep", "Woke up refreshed"][
            Math.floor(Math.random() * 4)
          ],
        })
      } else if (title === "Steps Logs") {
        // Generate steps entries
        const steps = Math.floor(Math.random() * 8000) + 4000 // 4000-12000 steps
        logs.push({
          id: dateStr,
          date: dateStr,
          time: "All day",
          value: steps.toLocaleString(),
          type: "Steps",
          notes: steps > 8000 ? "Active day!" : steps < 6000 ? "Low activity" : "Moderate activity",
        })
      } else if (title === "Medication Logs") {
        // Generate medication entries
        const medications = ["Morning dose", "Afternoon dose", "Evening dose"]
        medications.forEach((med, j) => {
          const hour = j === 0 ? 8 : j === 1 ? 14 : 20
          logs.push({
            id: `${dateStr}-${j}`,
            date: dateStr,
            time: `${hour}:00`,
            value: "Taken",
            type: med,
            notes: Math.random() > 0.8 ? "Taken with food" : "",
          })
        })
      }
    }

    return logs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  const logData = generateLogData()

  // Filter options based on insight type
  const getFilterOptions = () => {
    if (title === "Pain Logs") {
      return [
        { value: "all", label: "All Pain" },
        { value: "headache", label: "Headache" },
        { value: "back", label: "Back Pain" },
        { value: "joint", label: "Joint Pain" },
        { value: "high", label: "High (7-10)" },
        { value: "moderate", label: "Moderate (4-6)" },
        { value: "low", label: "Low (1-3)" },
      ]
    }
    return [
      { value: "all", label: "All Entries" },
      { value: "recent", label: "Last 7 Days" },
      { value: "month", label: "This Month" },
    ]
  }

  const filteredLogs = logData.filter((log) => {
    if (selectedFilter === "all") return true
    if (selectedFilter === "recent") {
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return new Date(log.date) >= weekAgo
    }
    if (selectedFilter === "month") {
      const monthAgo = new Date()
      monthAgo.setMonth(monthAgo.getMonth() - 1)
      return new Date(log.date) >= monthAgo
    }
    if (title === "Pain Logs") {
      if (selectedFilter === "headache") return log.type?.toLowerCase().includes("headache")
      if (selectedFilter === "back") return log.type?.toLowerCase().includes("back")
      if (selectedFilter === "joint") return log.type?.toLowerCase().includes("joint")
      if (selectedFilter === "high") return typeof log.value === "number" && log.value >= 7
      if (selectedFilter === "moderate") return typeof log.value === "number" && log.value >= 4 && log.value <= 6
      if (selectedFilter === "low") return typeof log.value === "number" && log.value <= 3
    }
    return true
  })

  const getIcon = () => {
    switch (title) {
      case "Pain Logs":
        return Zap
      case "Water Logs":
        return Droplets
      case "Sleep Logs":
        return Moon
      case "Steps Logs":
        return Footprints
      case "Medication Logs":
        return Pill
      default:
        return Calendar
    }
  }

  const Icon = getIcon()
  const goalValue = getGoalValue(title)

  return (
    <ScreenLayout title={title} onBack={onBack} contentPadding="none">
      <div className="flex flex-col h-full">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
          <div className="px-4 pt-4 pb-2 bg-white border-b border-gray-100 flex-shrink-0">
            <TabsList className="grid w-full grid-cols-2 bg-gray-100 rounded-lg p-1">
              <TabsTrigger
                value="overview"
                className="text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm text-gray-600 rounded-md py-2"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="logs"
                className="text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm text-gray-600 rounded-md py-2"
              >
                Logs
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-hidden">
            <TabsContent value="overview" className="h-full overflow-y-auto px-4 py-4 space-y-4 mt-0">
              {/* Summary Card */}
              <Card className="shadow-sm border-0 bg-white rounded-xl">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium flex items-center gap-2 text-gray-900">
                    <Icon className={`w-5 h-5 ${data.color}`} />
                    {title} Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">{data.logged}</div>
                      <div className="text-sm text-gray-600">Logged</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">{data.missed}</div>
                      <div className="text-sm text-gray-600">Missed</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Progress</span>
                      <span className="text-sm text-gray-600">
                        {Math.round((data.logged / (data.logged + data.missed)) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(data.logged / (data.logged + data.missed)) * 100}%` }}
                      />
                    </div>
                  </div>

                  <p className="text-sm text-gray-600">{data.description}</p>
                </CardContent>
              </Card>

              {/* Chart Card */}
              <Card className="shadow-sm border-0 bg-white rounded-xl">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium text-gray-900">Trend Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48">
                    <MiniChart data={data.chartData} color="#3B82F6" />
                  </div>
                </CardContent>
              </Card>

              {/* Goal Card */}
              <Card className="shadow-sm border-0 bg-white rounded-xl">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium flex items-center gap-2 text-gray-900">
                    <Target className="w-5 h-5 text-green-600" />
                    Goal Setting
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">Current Goal</div>
                      <div className="text-sm text-gray-600">
                        {goalValue} {data.unit}
                      </div>
                    </div>
                    <Button onClick={() => goalModal.open()} variant="outline" size="sm">
                      <Target className="w-4 h-4 mr-2" />
                      Update Goal
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Reminder Card */}
              <Card className="shadow-sm border-0 bg-white rounded-xl">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium flex items-center gap-2 text-gray-900">
                    <Bell className="w-5 h-5 text-orange-600" />
                    Reminders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => reminderModal.open()} variant="outline" size="sm" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Set Reminder
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="logs" className="h-full overflow-y-auto px-4 py-4 space-y-4 mt-0">
              {/* Filter Bar */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                <Filter className="w-4 h-4 text-gray-500 flex-shrink-0" />
                {getFilterOptions().map((option) => (
                  <Button
                    key={option.value}
                    variant={selectedFilter === option.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter(option.value)}
                    className="whitespace-nowrap"
                  >
                    {option.label}
                  </Button>
                ))}
              </div>

              {/* Log Entries */}
              <div className="space-y-3">
                {filteredLogs.map((log) => (
                  <Card key={log.id} className="shadow-sm border-0 bg-white rounded-xl">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span className="text-sm font-medium text-gray-900">
                              {new Date(log.date).toLocaleDateString()}
                            </span>
                            <Clock className="w-4 h-4 text-gray-500 ml-2" />
                            <span className="text-sm text-gray-600">{log.time}</span>
                          </div>

                          <div className="flex items-center gap-2 mb-2">
                            {title === "Pain Logs" && typeof log.value === "number" && (
                              <>
                                <Badge
                                  variant={log.value >= 7 ? "destructive" : log.value >= 4 ? "secondary" : "default"}
                                  className="text-xs"
                                >
                                  {log.value}/10 ⚡
                                </Badge>
                                {log.type && (
                                  <Badge variant="outline" className="text-xs">
                                    {log.type}
                                  </Badge>
                                )}
                                {log.location && (
                                  <Badge variant="outline" className="text-xs">
                                    {log.location}
                                  </Badge>
                                )}
                              </>
                            )}
                            {title !== "Pain Logs" && (
                              <Badge variant="secondary" className="text-xs">
                                {log.value}
                              </Badge>
                            )}
                            {log.type && title !== "Pain Logs" && (
                              <Badge variant="outline" className="text-xs">
                                {log.type}
                              </Badge>
                            )}
                          </div>

                          {log.duration && <div className="text-sm text-gray-600 mb-1">Duration: {log.duration}</div>}

                          {log.notes && <div className="text-sm text-gray-600">{log.notes}</div>}
                        </div>

                        {title === "Pain Logs" && typeof log.value === "number" && (
                          <div className="flex items-center">
                            {log.value >= 7 ? (
                              <TrendingUp className="w-4 h-4 text-red-500" />
                            ) : log.value <= 3 ? (
                              <TrendingDown className="w-4 h-4 text-green-500" />
                            ) : (
                              <Minus className="w-4 h-4 text-yellow-500" />
                            )}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Modals */}
      <GoalModal
        title={title}
        isOpen={goalModal.isOpen}
        onClose={goalModal.close}
        onSave={handleSetGoal}
        currentValue={goalValue}
      />

      <ReminderModal isOpen={reminderModal.isOpen} onClose={reminderModal.close} onSave={handleSetReminder} />
    </ScreenLayout>
  )
}
