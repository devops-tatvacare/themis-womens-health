"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface SymptomQuestion {
  id: string
  question: string
  type: "slider" | "select"
  options?: string[]
  min?: number
  max?: number
  minLabel?: string
  maxLabel?: string
}

const SYMPTOM_QUESTIONS: SymptomQuestion[] = [
  {
    id: "memory",
    question: "How is your memory today?",
    type: "slider",
    min: 1,
    max: 10,
    minLabel: "Very Forgetful",
    maxLabel: "Clear & Sharp",
  },
  {
    id: "confusion",
    question: "Any confusion or disorientation?",
    type: "select",
    options: ["None", "Mild", "Moderate", "Severe"],
  },
  {
    id: "mood",
    question: "How is your mood today?",
    type: "select",
    options: ["Very Low", "Low", "Neutral", "Good", "Excellent"],
  },
  {
    id: "sleep",
    question: "How well did you sleep?",
    type: "select",
    options: ["Very Poor", "Poor", "Fair", "Good", "Excellent"],
  },
]

interface SymptomTrackerWorkflowProps {
  onSubmit: (responses: Record<string, string | number>) => void
  disabled?: boolean
  responses?: Record<string, string | number>
}

export function SymptomTrackerWorkflow({
  onSubmit,
  disabled = false,
  responses: initialResponses,
}: SymptomTrackerWorkflowProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [responses, setResponses] = useState<Record<string, string | number>>(initialResponses || {})

  const currentQuestion = SYMPTOM_QUESTIONS[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === SYMPTOM_QUESTIONS.length - 1

  const handleSliderChange = (value: number) => {
    setResponses((prev) => ({ ...prev, [currentQuestion.id]: value }))
  }

  const handleSelectOption = (option: string) => {
    setResponses((prev) => ({ ...prev, [currentQuestion.id]: option }))
  }

  const handleNext = () => {
    if (isLastQuestion) {
      onSubmit(responses)
    } else {
      setCurrentQuestionIndex((prev) => prev + 1)
    }
  }

  const hasResponse = currentQuestion.id in responses

  if (disabled && initialResponses) {
    return (
      <Card className="border border-gray-300 bg-gray-50">
        <CardContent className="p-3 space-y-2">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Symptom Tracking Summary</h4>
          {SYMPTOM_QUESTIONS.map((question) => (
            <div key={question.id} className="flex justify-between items-center text-sm">
              <span className="text-gray-600">{question.question}</span>
              <span className="font-medium text-gray-900">{initialResponses[question.id]}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border border-gray-200 bg-white">
      <CardContent className="p-3 space-y-3">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-gray-900">Track Symptoms</h4>
            <span className="text-xs text-gray-500">
              {currentQuestionIndex + 1} of {SYMPTOM_QUESTIONS.length}
            </span>
          </div>

          <p className="text-sm text-gray-900 mb-3">{currentQuestion.question}</p>

          {currentQuestion.type === "slider" && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  Level: {responses[currentQuestion.id] || currentQuestion.min || 1}
                </span>
              </div>
              <input
                type="range"
                min={currentQuestion.min || 1}
                max={currentQuestion.max || 10}
                value={(responses[currentQuestion.id] as number) || currentQuestion.min || 1}
                onChange={(e) => handleSliderChange(Number.parseInt(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, var(--app-primary) 0%, var(--app-primary) ${(((responses[currentQuestion.id] as number) || (currentQuestion.min || 1) - 1) / ((currentQuestion.max || 10) - 1)) * 100}%, #e5e7eb ${(((responses[currentQuestion.id] as number) || (currentQuestion.min || 1) - 1) / ((currentQuestion.max || 10) - 1)) * 100}%, #e5e7eb 100%)`,
                }}
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>{currentQuestion.minLabel}</span>
                <span>{currentQuestion.maxLabel}</span>
              </div>
            </div>
          )}

          {currentQuestion.type === "select" && (
            <div className="space-y-2">
              {currentQuestion.options?.map((option) => (
                <button
                  key={option}
                  onClick={() => handleSelectOption(option)}
                  className={`w-full text-left p-2.5 rounded-lg border transition-colors ${
                    responses[currentQuestion.id] === option
                      ? "border-[var(--app-primary)] bg-[var(--icon-bg-primary)]"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <p className="text-sm text-gray-900">{option}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        <Button onClick={handleNext} disabled={!hasResponse} className="w-full h-9 text-sm">
          {isLastQuestion ? "Submit" : "Next"}
        </Button>
      </CardContent>
    </Card>
  )
}
