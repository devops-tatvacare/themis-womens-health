"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

interface UserTypeStepProps {
  value: "patient" | "caregiver" | null
  onChange: (value: "patient" | "caregiver") => void
  onNext: () => void
  onBack: () => void
  isLoading?: boolean
}

export function UserTypeStep({ value, onChange, onNext, onBack, isLoading }: UserTypeStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value) {
      onNext()
    }
  }

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
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Who are you?</h1>
          <p className="text-[var(--text-secondary)]">Please select your role</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => onChange("patient")}
              className={cn(
                "w-full p-4 rounded-lg border-2 text-left transition-all",
                value === "patient"
                  ? "border-[var(--app-primary)] bg-[var(--app-primary)]/10"
                  : "border-[var(--border-color)] hover:border-[var(--app-primary)]/50",
              )}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={cn(
                    "w-5 h-5 rounded-full border-2",
                    value === "patient"
                      ? "border-[var(--app-primary)] bg-[var(--app-primary)]"
                      : "border-[var(--border-color)]",
                  )}
                >
                  {value === "patient" && <div className="w-full h-full rounded-full bg-white scale-50" />}
                </div>
                <div>
                  <h3 className="font-medium text-[var(--text-primary)]">I am the patient</h3>
                  <p className="text-sm text-[var(--text-secondary)]">I am enrolling in the women&apos;s health program for myself</p>
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => onChange("caregiver")}
              className={cn(
                "w-full p-4 rounded-lg border-2 text-left transition-all",
                value === "caregiver"
                  ? "border-[var(--app-primary)] bg-[var(--app-primary)]/10"
                  : "border-[var(--border-color)] hover:border-[var(--app-primary)]/50",
              )}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={cn(
                    "w-5 h-5 rounded-full border-2",
                    value === "caregiver"
                      ? "border-[var(--app-primary)] bg-[var(--app-primary)]"
                      : "border-[var(--border-color)]",
                  )}
                >
                  {value === "caregiver" && <div className="w-full h-full rounded-full bg-white scale-50" />}
                </div>
                <div>
                  <h3 className="font-medium text-[var(--text-primary)]">I am supporting someone</h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    I am helping a family member with her women&apos;s health journey
                  </p>
                </div>
              </div>
            </button>
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
