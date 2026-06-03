"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { DAYS, MONTHS, YEARS } from "@/lib/constants/onboarding-data"
import { cn } from "@/lib/utils"

interface DateOfBirthStepProps {
  value: {
    day: string
    month: string
    year: string
  }
  onChange: (value: { day: string; month: string; year: string }) => void
  onNext: () => void
  onBack: () => void
  isLoading?: boolean
}

export function DateOfBirthStep({ value, onChange, onNext, onBack, isLoading }: DateOfBirthStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.day && value.month && value.year) {
      onNext()
    }
  }

  const isValid = value.day && value.month && value.year

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
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">What is the patient's date of birth?</h1>
          <p className="text-[var(--text-secondary)]">This helps us provide age-appropriate care</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Day</label>
              <select
                value={value.day}
                onChange={(e) => onChange({ ...value, day: e.target.value })}
                className={cn(
                  "w-full h-12 px-3 rounded-lg border-2 border-[var(--border-color)]",
                  "bg-[var(--bg-primary)] text-[var(--text-primary)]",
                  "focus:border-[var(--app-primary)] focus:outline-none",
                )}
              >
                <option value="">Day</option>
                {DAYS.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Month</label>
              <select
                value={value.month}
                onChange={(e) => onChange({ ...value, month: e.target.value })}
                className={cn(
                  "w-full h-12 px-3 rounded-lg border-2 border-[var(--border-color)]",
                  "bg-[var(--bg-primary)] text-[var(--text-primary)]",
                  "focus:border-[var(--app-primary)] focus:outline-none",
                )}
              >
                <option value="">Month</option>
                {MONTHS.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Year</label>
              <select
                value={value.year}
                onChange={(e) => onChange({ ...value, year: e.target.value })}
                className={cn(
                  "w-full h-12 px-3 rounded-lg border-2 border-[var(--border-color)]",
                  "bg-[var(--bg-primary)] text-[var(--text-primary)]",
                  "focus:border-[var(--app-primary)] focus:outline-none",
                )}
              >
                <option value="">Year</option>
                {YEARS.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>
      </div>

      <div className="p-6 border-t border-[var(--border-color)]">
        <Button onClick={handleSubmit} disabled={!isValid || isLoading} className="w-full h-12 text-lg">
          {isLoading ? "Processing..." : "Continue"}
        </Button>
      </div>
    </div>
  )
}
