"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getSliderGradient, getSliderTextColor } from "@/lib/utils/slider-colors"

interface PainSliderWorkflowProps {
  onSubmit: (painLevel: number) => void
  disabled?: boolean
  selectedValue?: number
}

export function PainSliderWorkflow({ onSubmit, disabled = false, selectedValue }: PainSliderWorkflowProps) {
  const [painLevel, setPainLevel] = useState(selectedValue || 5)

  const handleSubmit = () => {
    onSubmit(painLevel)
  }

  const displayLevel = disabled ? selectedValue || painLevel : painLevel

  const textColorClass = getSliderTextColor({ value: displayLevel, min: 1, max: 10 })
  const sliderGradient = getSliderGradient({ value: displayLevel, min: 1, max: 10 })

  return (
    <Card className={`border ${disabled ? "border-gray-300 bg-gray-50" : "border-gray-200 bg-white"}`}>
      <CardContent className="p-3 space-y-3">
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Log Your Pain</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Pain Level: {displayLevel}/10</span>
              <span className={`font-medium ${textColorClass}`}>
                {displayLevel <= 3 ? "Mild" : displayLevel <= 6 ? "Moderate" : "Severe"}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={displayLevel}
              onChange={(e) => !disabled && setPainLevel(Number.parseInt(e.target.value))}
              disabled={disabled}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
              style={{
                background: sliderGradient,
              }}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>1 - No Pain</span>
              <span>10 - Severe</span>
            </div>
          </div>
        </div>
        {!disabled && (
          <Button onClick={handleSubmit} className="w-full h-9 text-sm">
            Submit
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
