"use client"

import type React from "react"
import { Droplets, Footprints, Moon } from "lucide-react"

interface CircularProgressProps {
  value: number
  max?: number
  size?: number
  strokeWidth?: number
  color?: string
  backgroundColor?: string
  children?: React.ReactNode
  icon?: "water" | "steps" | "sleep"
}

export function CircularProgress({
  value,
  max = 100,
  size = 64,
  strokeWidth = 3,
  color = "#3b82f6",
  backgroundColor = "#e5e7eb",
  children,
  icon,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const percentage = Math.min((value / max) * 100, 100)
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  const getIconComponent = () => {
    switch (icon) {
      case "water":
        return <Droplets className="w-6 h-6" style={{ color }} />
      case "steps":
        return <Footprints className="w-6 h-6" style={{ color }} />
      case "sleep":
        return <Moon className="w-6 h-6" style={{ color }} />
      default:
        return null
    }
  }

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          className="opacity-30"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
          style={{
            transformOrigin: "center",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{icon ? getIconComponent() : children}</div>
    </div>
  )
}
