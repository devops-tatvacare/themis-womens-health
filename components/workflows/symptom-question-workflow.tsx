"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getSliderGradient } from "@/lib/utils/slider-colors"

interface SymptomQuestionWorkflowProps {
  question: string
  type: "slider" | "select"
  options?: string[]
  min?: number
  max?: number
  minLabel?: string
  maxLabel?: string
  onSubmit: (answer: string | number) => void
  disabled?: boolean
  selectedAnswer?: string | number
}

export function SymptomQuestionWorkflow({
  question,
  type,
  options,
  min = 1,
  max = 10,
  minLabel,
  maxLabel,
  onSubmit,
  disabled = false,
  selectedAnswer,
}: SymptomQuestionWorkflowProps) {
  const [answer, setAnswer] = useState<string | number>(selectedAnswer || (type === "slider" ? min : ""))

  const handleSubmit = () => {
    onSubmit(answer)
  }

  const hasAnswer = type === "slider" ? true : answer !== ""

  const sliderGradient = type === "slider" ? getSliderGradient({ value: answer as number, min, max }) : ""

  if (disabled && selectedAnswer !== undefined) {
    return (
      <Card className="border border-gray-300 bg-gray-50">
        <CardContent className="p-3">
          <p className="text-sm text-gray-600 mb-1">{question}</p>
          <p className="text-sm font-medium text-gray-900">{selectedAnswer}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border border-gray-200 bg-white">
      <CardContent className="p-3 space-y-3">
        <p className="text-sm font-medium text-gray-900">{question}</p>

        {type === "slider" && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Level: {answer}</span>
            </div>
            <input
              type="range"
              min={min}
              max={max}
              value={answer as number}
              onChange={(e) => setAnswer(Number.parseInt(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
              style={{
                background: sliderGradient,
              }}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{minLabel}</span>
              <span>{maxLabel}</span>
            </div>
          </div>
        )}

        {type === "select" && (
          <div className="space-y-2">
            {options?.map((option) => (
              <button
                key={option}
                onClick={() => setAnswer(option)}
                className={`w-full text-left p-2.5 rounded-lg border transition-colors ${
                  answer === option
                    ? "border-[var(--app-primary)] bg-[var(--icon-bg-primary)]"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <p className="text-sm text-gray-900">{option}</p>
              </button>
            ))}
          </div>
        )}

        <Button onClick={handleSubmit} disabled={!hasAnswer} className="w-full h-9 text-sm">
          Submit
        </Button>
      </CardContent>
    </Card>
  )
}
