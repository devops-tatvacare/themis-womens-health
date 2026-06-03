"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

interface PatientNameStepProps {
  value: string
  onChange: (value: string) => void
  onNext: () => void
  onBack: () => void
  isLoading?: boolean
  error?: string
}

export function PatientNameStep({ value, onChange, onNext, onBack, isLoading, error }: PatientNameStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim()) {
      onNext()
    }
  }

  const isValid = value.trim().length > 0

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
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">What is the patient's name?</h1>
          <p className="text-[var(--text-secondary)]">Please enter the full name as per medical records</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Patient's Full Name</label>
            <Input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Enter patient's full name"
              className={cn("h-12 text-lg", error && "border-red-500")}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
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
