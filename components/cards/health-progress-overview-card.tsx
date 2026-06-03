"use client"

import { Sparkles, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface HealthProgressOverviewCardProps {
  className?: string
}

export function HealthProgressOverviewCard({ className }: HealthProgressOverviewCardProps) {
  const progressMetrics = [
    { label: "Cycle Day", value: "Day 14", improvement: "Ovulation", subtitle: null, current: 14, total: 28 },
    { label: "Symptom Load", value: "Low", improvement: "78/100", subtitle: null, current: 78, total: 100 },
    { label: "Log Streak", value: "6 days", improvement: "+2 days", subtitle: null, current: 6, total: 7 },
  ]

  return (
    <div
      className={cn("rounded-lg border", className)}
      style={{
        background: `linear-gradient(135deg, var(--icon-bg-primary), var(--icon-bg-secondary))`,
        borderColor: "var(--app-primary)",
      }}
    >
      <div className="flex items-center justify-between p-3 pb-2">
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-md flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, var(--app-primary), var(--app-primary-light))`,
            }}
          >
            <Sparkles className="w-3 h-3 text-white" />
          </div>
          <div>
            <h3 className="font-medium text-sm" style={{ color: "var(--text-primary)" }}>
              Your Health Snapshot
            </h3>
          </div>
        </div>
        <TrendingUp className="w-4 h-4 text-green-600" />
      </div>

      <div className="px-3 pb-2">
        <div className="grid grid-cols-3 gap-2">
          {progressMetrics.map((metric, index) => {
            const progress = metric.current && metric.total ? metric.current / metric.total : 1
            const circumference = 2 * Math.PI * 27
            const strokeDashoffset = circumference * (1 - progress)
            const isJourneyMetric = metric.label === "Cycle Day"

            return (
              <div key={index} className="flex flex-col items-center gap-1">
                <div className="relative w-16 h-16">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                    <circle
                      cx="32"
                      cy="32"
                      r="27"
                      strokeWidth="3"
                      fill="none"
                      style={{ stroke: "rgba(0, 0, 0, 0.08)" }}
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="27"
                      stroke="url(#gradient)"
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray={circumference}
                      strokeDashoffset={metric.current && metric.total ? strokeDashoffset : 0}
                      className="transition-all duration-300"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="var(--app-primary)" />
                        <stop offset="50%" stopColor="var(--app-primary-light)" />
                        <stop offset="100%" stopColor="var(--status-info)" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="font-bold text-gray-900 text-center" style={{ fontSize: "70%" }}>
                      {metric.value}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-600 text-center">{metric.label}</div>
                {metric.improvement && (
                  <div
                    className={`text-xs ${isJourneyMetric ? "text-gray-600 font-normal" : "font-medium text-green-600"}`}
                  >
                    {metric.improvement}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
