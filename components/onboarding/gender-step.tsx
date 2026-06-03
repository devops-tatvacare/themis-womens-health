"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

interface GenderStepProps {
  value: "male" | "female" | "other" | null
  onChange: (value: "male" | "female" | "other") => void
  onNext: () => void
  onBack: () => void
  isLoading?: boolean
}

export function GenderStep({ value, onChange, onNext, onBack, isLoading }: GenderStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value) {
      onNext()
    }
  }

  const genderOptions = [
    { value: "male" as const, label: "Male" },
    { value: "female" as const, label: "Female" },
    { value: "other" as const, label: "Other" },
  ]

  return (
    <div className="flex flex-col h-full bg-[var(--bg-primary)] pb-12">
      <div className="flex-1 overflow-y-auto p-6">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors mb-4"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">What is the patient's gender?</h1>
          <p className="text-[var(--text-secondary)]">This helps us provide personalized care</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            {genderOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => onChange(option.value)}
                className={cn(
                  "w-full p-4 rounded-lg border-2 text-left transition-all",
                  value === option.value
                    ? "border-[var(--app-primary)] bg-[var(--app-primary)]/10"
                    : "border-[var(--border-color)] hover:border-[var(--app-primary)]/50",
                )}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={cn(
                      "w-5 h-5 rounded-full border-2",
                      value === option.value
                        ? "border-[var(--app-primary)] bg-[var(--app-primary)]"
                        : "border-[var(--border-color)]",
                    )}
                  >
                    {value === option.value && <div className="w-full h-full rounded-full bg-white scale-50" />}
                  </div>
                  <span className="font-medium text-[var(--text-primary)]">{option.label}</span>
                </div>
              </button>
            ))}
          </div>
        </form>
      </div>

      <div className="p-6 border-t border-[var(--border-color)]">
        <Button onClick={handleSubmit} disabled={!value || isLoading} className="w-full h-12 text-lg">
          {isLoading ? "Processing..." : "Continue"}
        </Button>
      </div>
    </div>
  )
}
