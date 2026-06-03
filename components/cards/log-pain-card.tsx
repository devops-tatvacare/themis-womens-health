"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Activity, Check } from "lucide-react"
import { getSliderGradient, getSliderTextColor } from "@/lib/utils/slider-colors"

export function LogPainCard() {
  const [painLevel, setPainLevel] = useState(5)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = () => {
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
    }, 3000)
  }

  const textColorClass = getSliderTextColor({ value: painLevel, min: 1, max: 10 })
  const sliderGradient = getSliderGradient({ value: painLevel, min: 1, max: 10 })

  return (
    <Card className="shadow-sm border-0 bg-white rounded-xl">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold flex items-center gap-2 text-[#000000]">
          <Activity className="w-4 h-4" style={{ color: "var(--app-primary)" }} />
          Log Your Pain
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        {!isSubmitted ? (
          <>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Pain Level: {painLevel}/10</span>
                <span className={`font-medium ${textColorClass}`}>
                  {painLevel <= 3 ? "Mild" : painLevel <= 6 ? "Moderate" : "Severe"}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={painLevel}
                onChange={(e) => setPainLevel(Number.parseInt(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: sliderGradient,
                }}
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>1 - No Pain</span>
                <span>10 - Severe</span>
              </div>
            </div>
            <Button onClick={handleSubmit} className="w-full">
              Submit Pain Log
            </Button>
          </>
        ) : (
          <div className="flex items-center gap-2 p-3 rounded-lg" style={{ backgroundColor: "var(--icon-bg-primary)" }}>
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "var(--status-success)" }}
            >
              <Check className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                Pain log submitted successfully!
              </p>
              <p className="text-xs text-gray-600">Your doctor has been notified.</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
