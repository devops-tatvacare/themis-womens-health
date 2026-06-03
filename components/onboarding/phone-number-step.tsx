"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProgressIndicator } from "@/components/onboarding/progress-indicator"
import { cn } from "@/lib/utils"

interface PhoneNumberStepProps {
  value: string
  onChange: (value: string) => void
  onNext: () => void
  isLoading?: boolean
  error?: string
}

export function PhoneNumberStep({ value, onChange, onNext, isLoading, error }: PhoneNumberStepProps) {
  const [agreed, setAgreed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.length === 10 && agreed) {
      onNext()
    }
  }

  const isValid = value.length === 10 && agreed

  return (
    <div className="flex flex-col h-full bg-[var(--bg-primary)] pb-12">
      {/* Header Banner */}
      <div
        className="mx-0 mt-0 rounded-b-2xl relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, var(--banner-bg-start) 0%, var(--banner-bg-end) 100%)`,
          height: "120px",
        }}
      >
        {/* Static Floating Bubbles */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-2 left-5 w-10 h-10 rounded-full"
            style={{ background: `var(--icon-bg-primary)`, opacity: 0.6 }}
          />
          <div
            className="absolute top-7 right-7 w-7 h-7 rounded-full"
            style={{ background: `var(--icon-bg-secondary)`, opacity: 0.7 }}
          />
          <div
            className="absolute bottom-5 left-10 w-6 h-6 rounded-full"
            style={{ background: `var(--icon-bg-primary)`, opacity: 0.5 }}
          />
          <div
            className="absolute top-12 left-1/3 w-5 h-5 rounded-full"
            style={{ background: `var(--icon-bg-secondary)`, opacity: 0.6 }}
          />
          <div
            className="absolute bottom-7 right-5 w-6 h-6 rounded-full"
            style={{ background: `var(--icon-bg-primary)`, opacity: 0.4 }}
          />
          <div
            className="absolute top-10 right-12 w-4 h-4 rounded-full"
            style={{ background: `var(--icon-bg-secondary)`, opacity: 0.8 }}
          />
          <div
            className="absolute bottom-10 left-1/4 w-2 h-2 rounded-full"
            style={{ background: `var(--icon-bg-primary)`, opacity: 0.7 }}
          />
          <div
            className="absolute top-14 right-1/3 w-4 h-4 rounded-full"
            style={{ background: `var(--icon-bg-secondary)`, opacity: 0.5 }}
          />
        </div>

        {/* Centered Logo */}
        <div className="flex justify-center items-center h-full">
          <img src="/images/themismedicare_logo.jpeg" alt="Themis Medicare" className="h-8 w-auto object-contain rounded" />
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="p-4 border-b border-[var(--border-color)]">
        <ProgressIndicator currentStep={1} totalSteps={8} />
      </div>

      {/* Content Area - Scrollable */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Enter your phone number</h1>
          <p className="text-[var(--text-secondary)]">We'll send you a verification code</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Phone Number</label>
            <div className="flex">
              <div className="flex items-center px-3 border-2 border-r-0 border-[var(--border-color)] rounded-l-lg bg-[var(--bg-secondary)]">
                <span className="text-[var(--text-primary)]">+91</span>
              </div>
              <Input
                type="tel"
                value={value}
                onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, 10))}
                placeholder="Enter 10-digit mobile number"
                className={cn("flex-1 rounded-l-none border-l-0", error && "border-red-500")}
                maxLength={10}
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="terms"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1"
            />
            <label htmlFor="terms" className="text-sm text-[var(--text-secondary)]">
              I agree to the{" "}
              <a href="#" className="text-[var(--app-primary)] underline">
                Terms & Conditions
              </a>{" "}
              and{" "}
              <a href="#" className="text-[var(--app-primary)] underline">
                Privacy Policy
              </a>
            </label>
          </div>
        </form>
      </div>

      {/* Fixed Button Area */}
      <div className="p-6 border-t border-[var(--border-color)]">
        <Button onClick={handleSubmit} disabled={!isValid || isLoading} className="w-full h-12 text-lg">
          {isLoading ? "Sending..." : "Send OTP"}
        </Button>
      </div>
    </div>
  )
}
