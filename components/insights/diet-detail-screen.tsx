"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Activity, ChevronDown } from "lucide-react"
import { ScreenLayout } from "@/components/layouts/screen-layout"

interface DietDetailScreenProps {
  title: string
  onBack: () => void
}

type NutrientType = "calories" | "carbs" | "protein" | "fiber" | "fat"
type ChartPeriod = "D" | "W" | "M" | "Y"

export function DietDetailScreen({ title, onBack }: DietDetailScreenProps) {
  const [activeTab, setActiveTab] = useState("trends")
  const [chartPeriod, setChartPeriod] = useState<ChartPeriod>("W")
  const [selectedNutrient, setSelectedNutrient] = useState<NutrientType>("calories")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  const nutrients = [
    { id: "calories", label: "Calories", unit: "kcal" },
    { id: "carbs", label: "Carbs", unit: "g" },
    { id: "protein", label: "Protein", unit: "g" },
    { id: "fiber", label: "Fiber", unit: "g" },
    { id: "fat", label: "Fat", unit: "g" },
  ]

  const generateChartData = () => {
    const chartData = []
    const today = new Date()
    let periods = 7

    switch (chartPeriod) {
      case "D":
        periods = 24
        break
      case "W":
        periods = 7
        break
      case "M":
        periods = 30
        break
      case "Y":
        periods = 12
        break
    }

    for (let i = periods - 1; i >= 0; i--) {
      const date = new Date(today)
      if (chartPeriod === "D") {
        date.setHours(today.getHours() - i)
      } else if (chartPeriod === "W") {
        date.setDate(today.getDate() - i)
      } else if (chartPeriod === "M") {
        date.setDate(today.getDate() - i)
      } else {
        date.setMonth(today.getMonth() - i)
      }

      let value = 0
      switch (selectedNutrient) {
        case "calories":
          value = Math.floor(Math.random() * 500) + 1500
          break
        case "carbs":
          value = Math.floor(Math.random() * 100) + 150
          break
        case "protein":
          value = Math.floor(Math.random() * 50) + 80
          break
        case "fiber":
          value = Math.floor(Math.random() * 15) + 20
          break
        case "fat":
          value = Math.floor(Math.random() * 30) + 50
          break
      }

      let label = ""
      if (chartPeriod === "D") {
        label = date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })
      } else if (chartPeriod === "W") {
        label = date.toLocaleDateString("en-US", { weekday: "short" })
      } else if (chartPeriod === "M") {
        label = date.getDate().toString()
      } else {
        label = date.toLocaleDateString("en-US", { month: "short" })
      }

      chartData.push({
        period: label,
        value,
      })
    }

    return chartData
  }

  const generateNutrientData = () => {
    const macroNutrients = [
      { name: "Carbs", consumed: 180, recommended: 225, unit: "g" },
      { name: "Protein", consumed: 95, recommended: 120, unit: "g" },
      { name: "Fat", consumed: 65, recommended: 75, unit: "g" },
    ]

    const microNutrients = [
      { name: "Vitamin C", consumed: 85, recommended: 90, unit: "mg" },
      { name: "Iron", consumed: 12, recommended: 18, unit: "mg" },
      { name: "Calcium", consumed: 950, recommended: 1000, unit: "mg" },
      { name: "Fiber", consumed: 22, recommended: 25, unit: "g" },
    ]

    return { macroNutrients, microNutrients }
  }

  const generateDietLogs = () => {
    const logs = []
    const today = new Date()
    const meals = ["Breakfast", "Lunch", "Dinner", "Snack"]
    const foods = [
      "Grilled Chicken Salad",
      "Brown Rice Bowl",
      "Greek Yogurt",
      "Mixed Nuts",
      "Salmon Fillet",
      "Quinoa Salad",
      "Apple Slices",
      "Protein Smoothie",
      "Vegetable Stir Fry",
      "Whole Grain Toast",
    ]

    for (let i = 0; i < 30; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() - i)
      const dateStr = date.toISOString().split("T")[0]

      meals.forEach((meal, index) => {
        if (Math.random() > 0.2) {
          logs.push({
            id: `${dateStr}-${index}`,
            date: dateStr,
            time: ["08:00", "13:00", "19:00", "15:30"][index],
            meal,
            food: foods[Math.floor(Math.random() * foods.length)],
            calories: Math.floor(Math.random() * 400) + 200,
            carbs: Math.floor(Math.random() * 50) + 20,
            protein: Math.floor(Math.random() * 30) + 15,
            fiber: Math.floor(Math.random() * 10) + 5,
            fat: Math.floor(Math.random() * 20) + 10,
            status: "Logged",
          })
        }
      })
    }

    return logs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  const dietLogs = generateDietLogs()
  const chartData = generateChartData()
  const maxValue = Math.max(...chartData.map((d) => d.value))
  const currentNutrient = nutrients.find((n) => n.id === selectedNutrient)
  const { macroNutrients, microNutrients } = generateNutrientData()

  const filteredLogs = dietLogs.filter((log) => {
    const matchesSearch =
      searchQuery === "" ||
      Object.values(log).some((value) => String(value).toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesFilters =
      selectedFilters.length === 0 || selectedFilters.some((filter) => Object.values(log).includes(filter))

    return matchesSearch && matchesFilters
  })

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const NutrientBar = ({
    nutrient,
  }: { nutrient: { name: string; consumed: number; recommended: number; unit: string } }) => {
    const percentage = Math.min((nutrient.consumed / nutrient.recommended) * 100, 100)
    const isDeficient = percentage < 80
    const isExcess = percentage > 120

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-[var(--text-primary)]">{nutrient.name}</span>
          <span className="text-xs text-[var(--text-secondary)]">
            {nutrient.consumed}/{nutrient.recommended} {nutrient.unit}
          </span>
        </div>
        <div className="w-full bg-[var(--bg-secondary)] rounded-full h-2">
          <div
            className="h-2 rounded-full transition-all duration-300"
            style={{
              width: `${Math.min(percentage, 100)}%`,
              backgroundColor: isDeficient
                ? "var(--status-warning)"
                : isExcess
                  ? "var(--status-error)"
                  : "var(--app-primary)",
            }}
          />
        </div>
        <div className="flex items-center justify-between">
          <span
            className="text-xs font-medium"
            style={{
              color: isDeficient ? "var(--status-warning)" : isExcess ? "var(--status-error)" : "var(--app-primary)",
            }}
          >
            {percentage.toFixed(0)}%
          </span>
          <span className="text-xs text-[var(--text-muted)]">
            {isDeficient ? "Below target" : isExcess ? "Above target" : "On track"}
          </span>
        </div>
      </div>
    )
  }

  return (
    <ScreenLayout title={title} onBack={onBack}>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
        <div className="px-3 pt-3 pb-2 bg-white border-b border-gray-100">
          <TabsList className="grid w-full grid-cols-2 bg-[var(--bg-secondary)] rounded-lg p-1">
            <TabsTrigger
              value="trends"
              className="text-xs font-medium data-[state=active]:bg-[var(--bg-primary)] data-[state=active]:text-[var(--app-primary)] data-[state=active]:shadow-sm text-[var(--text-secondary)] rounded-md py-2 px-1"
            >
              Trends
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="text-xs font-medium data-[state=active]:bg-[var(--bg-primary)] data-[state=active]:text-[var(--app-primary)] data-[state=active]:shadow-sm text-[var(--text-secondary)] rounded-md py-2 px-1"
            >
              History
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="trends" className="flex-1" style={{ backgroundColor: "var(--bg-secondary)" }}>
          {/* Chart Section */}
          <div className="bg-white border-b border-gray-100 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-medium text-[var(--text-primary)]">Nutrition Trends</h3>
              <div className="flex rounded-lg p-1" style={{ backgroundColor: "var(--bg-secondary)" }}>
                {["D", "W", "M", "Y"].map((period) => (
                  <button
                    key={period}
                    onClick={() => setChartPeriod(period as ChartPeriod)}
                    className="px-2.5 py-1 text-sm font-medium rounded-md transition-colors"
                    style={{
                      backgroundColor: chartPeriod === period ? "var(--app-primary)" : "transparent",
                      color: chartPeriod === period ? "white" : "var(--text-secondary)",
                    }}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>

            {/* Nutrient Selector */}
            <div className="mb-4">
              <div className="relative">
                <select
                  value={selectedNutrient}
                  onChange={(e) => setSelectedNutrient(e.target.value as NutrientType)}
                  className="w-full appearance-none bg-white border rounded-lg px-4 py-2 pr-10 text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2"
                  style={{
                    borderColor: "var(--border-color)",
                  }}
                >
                  {nutrients.map((nutrient) => (
                    <option key={nutrient.id} value={nutrient.id}>
                      {nutrient.label} ({nutrient.unit})
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none" />
              </div>
            </div>

            <div className="rounded-xl p-4" style={{ backgroundColor: "var(--bg-secondary)" }}>
              <div className="relative w-full overflow-x-auto">
                <div
                  className="flex items-end justify-start gap-1 pb-6"
                  style={{
                    minWidth: `${chartData.length * (chartPeriod === "D" ? 20 : chartPeriod === "M" ? 15 : 40)}px`,
                    height: "180px",
                  }}
                >
                  {chartData.map((item, index) => {
                    const barHeight = maxValue > 0 ? (item.value / maxValue) * 140 : 0
                    const shouldShowLabel =
                      chartPeriod === "D" ? index % 4 === 0 : chartPeriod === "M" ? index % 5 === 0 : true

                    return (
                      <div
                        key={index}
                        className="flex flex-col items-center justify-end"
                        style={{
                          width: chartPeriod === "D" ? "16px" : chartPeriod === "M" ? "12px" : "36px",
                          height: "180px",
                        }}
                      >
                        <div
                          className="rounded-t-sm transition-all duration-300 hover:opacity-80 w-full"
                          style={{
                            height: `${Math.max(barHeight, 4)}px`,
                            backgroundColor: "var(--app-primary)",
                          }}
                          title={`${item.period}: ${item.value} ${currentNutrient?.unit}`}
                        />
                        {shouldShowLabel && (
                          <div className="absolute bottom-0 text-xs text-[var(--text-muted)] text-center leading-tight pt-2">
                            {item.period}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Nutrients Information */}
          <div className="bg-white p-4 space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Macro Nutrients</h4>
              <div className="grid grid-cols-1 gap-4">
                {macroNutrients.map((nutrient) => (
                  <NutrientBar key={nutrient.name} nutrient={nutrient} />
                ))}
              </div>
            </div>

            <div className="border-t pt-4" style={{ borderColor: "var(--border-color)" }}>
              <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Micro Nutrients</h4>
              <div className="grid grid-cols-1 gap-4">
                {microNutrients.map((nutrient) => (
                  <NutrientBar key={nutrient.name} nutrient={nutrient} />
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history" className="flex-1 flex flex-col">
          {/* Search and Filters */}
          <div className="bg-white border-b p-3" style={{ borderColor: "var(--border-color)" }}>
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)] w-4 h-4" />
              <input
                type="text"
                placeholder="Search diet logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2"
                style={{
                  borderColor: "var(--border-color)",
                }}
              />
            </div>
            <div
              className="flex gap-2 overflow-x-auto pb-2"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {["Breakfast", "Lunch", "Dinner", "Snack"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => toggleFilter(filter)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors border"
                  style={{
                    backgroundColor: selectedFilters.includes(filter)
                      ? "var(--chip-bg-primary)"
                      : "var(--bg-secondary)",
                    color: selectedFilters.includes(filter) ? "var(--chip-text-primary)" : "var(--text-secondary)",
                    borderColor: selectedFilters.includes(filter) ? "var(--chip-border-primary)" : "transparent",
                  }}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Diet Logs List */}
          <div className="flex-1 overflow-y-auto" style={{ backgroundColor: "var(--bg-secondary)" }}>
            <div className="p-4 space-y-3">
              {filteredLogs.map((log) => (
                <Card
                  key={log.id}
                  className="shadow-sm border-0 rounded-lg overflow-hidden"
                  style={{ backgroundColor: "var(--bg-primary)" }}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{
                            background: "linear-gradient(135deg, var(--icon-bg-primary), var(--icon-bg-secondary))",
                          }}
                        >
                          <span className="text-lg">🍽️</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-[var(--text-primary)] text-sm truncate mb-1">{log.food}</h3>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-[var(--text-muted)]">
                              {formatDate(log.date)} • {log.time} • {log.meal}
                            </p>
                            <p className="text-xs text-[var(--text-secondary)] font-medium">{log.calories} kcal</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredLogs.length === 0 && (
                <div className="text-center py-12">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3"
                    style={{ backgroundColor: "var(--bg-secondary)" }}
                  >
                    <Activity className="w-8 h-8 text-[var(--text-muted)]" />
                  </div>
                  <h3 className="font-semibold text-base text-[var(--text-secondary)] mb-2">No diet logs found</h3>
                  <p className="text-sm text-[var(--text-muted)] max-w-sm mx-auto">
                    Try adjusting your search terms or filters to find what you're looking for.
                  </p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </ScreenLayout>
  )
}
