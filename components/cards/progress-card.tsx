"use client"

import { Activity } from "lucide-react"
import { BaseCard } from "./base-card"
import { CircularProgress } from "@/components/ui/circular-progress"

interface ProgressCardProps {
  onNavigate: (section: string) => void
}

export function ProgressCard({ onNavigate }: ProgressCardProps) {
  const progressItems = [
    {
      label: "Water",
      value: 60,
      max: 100,
      color: "#3b82f6", // Blue for water
      section: "water-trends",
      icon: "water" as const,
    },
    {
      label: "Steps",
      value: 80,
      max: 100,
      color: "#10b981", // Green for steps
      section: "steps-trends",
      icon: "steps" as const,
    },
    {
      label: "Sleep",
      value: 85,
      max: 100,
      color: "#8b5cf6", // Purple for sleep
      section: "sleep-trends",
      icon: "sleep" as const,
    },
  ]

  return (
    <BaseCard
      header={{
        title: "Today's Progress",
        icon: Activity,
        iconColor: "text-[var(--app-primary)]",
        showNavigation: false,
      }}
    >
      <div className="flex justify-around items-center gap-4 px-2">
        {progressItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => onNavigate(item.section)}
          >
            <CircularProgress
              value={item.value}
              max={item.max}
              size={64}
              strokeWidth={3}
              color={item.color}
              backgroundColor="#e5e7eb"
              icon={item.icon}
            />
            <div className="text-xs text-[var(--text-secondary)] uppercase tracking-wide">{item.label}</div>
          </div>
        ))}
      </div>
    </BaseCard>
  )
}
