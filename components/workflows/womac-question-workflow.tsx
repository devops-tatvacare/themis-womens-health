"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { getSliderColor, getSliderTextColor } from "@/lib/utils/slider-colors"

interface WomacQuestionWorkflowProps {
  question: string
  section: "Pain" | "Stiffness" | "Physical Function"
  onSubmit: (rating: number) => void
  disabled?: boolean
  selectedRating?: number
}

const RATING_LABELS = ["None", "Slight", "Mod.", "Sev.", "Extreme"]
const RATING_LABELS_FULL = ["None", "Slight", "Moderate", "Severe", "Extreme"]

export function WomacQuestionWorkflow({
  question,
  section,
  onSubmit,
  disabled = false,
  selectedRating,
}: WomacQuestionWorkflowProps) {
  const [rating, setRating] = useState<number>(selectedRating ?? 0)

  const handleSubmit = () => {
    onSubmit(rating)
  }

  const sliderColor = getSliderColor({ value: rating, min: 0, max: 4 })
  const textColorClass = getSliderTextColor({ value: rating, min: 0, max: 4 })

  if (disabled && selectedRating !== undefined) {
    return (
      <Card className="bg-white border border-gray-200 w-full max-w-sm">
        <CardContent className="p-4">
          <div className="mb-3">
            <span className="text-xs font-medium text-[var(--app-primary)] uppercase tracking-wide">{section}</span>
            <p className="text-sm text-gray-900 mt-1">{question}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
            <p className="text-sm font-medium text-gray-900">
              Selected: {RATING_LABELS_FULL[selectedRating]} ({selectedRating})
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white border border-gray-200 w-full max-w-sm">
      <CardContent className="px-4 py-4">
        <div className="mb-4">
          <span className="text-xs font-medium text-[var(--app-primary)] uppercase tracking-wide">{section}</span>
          <p className="text-sm text-gray-900 mt-1 font-medium">{question}</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-3">
            <div className="px-3">
              <Slider
                value={[rating]}
                onValueChange={(value) => setRating(value[0])}
                min={0}
                max={4}
                step={1}
                className="w-full"
                colorValue={sliderColor}
              />
            </div>
            <div className="flex justify-between items-center px-2">
              {RATING_LABELS.map((label, idx) => (
                <span
                  key={idx}
                  className={`text-[10px] text-center leading-tight ${
                    rating === idx ? `font-semibold ${textColorClass}` : "text-gray-600"
                  }`}
                  style={{ flex: "1 1 0", minWidth: 0 }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
            <p className="text-sm text-gray-700">
              Current rating: <span className={`font-semibold ${textColorClass}`}>{RATING_LABELS_FULL[rating]}</span> (
              {rating})
            </p>
          </div>

          <Button onClick={handleSubmit} className="w-full" size="sm">
            Next Question
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
