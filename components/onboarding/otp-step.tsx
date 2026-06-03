"use client"

import React, { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

interface OTPStepProps {
  phoneNumber: string
  value: string
  onChange: (value: string) => void
  onNext: () => void
  onBack: () => void
  isLoading?: boolean
  error?: string
}

export function OTPStep({ phoneNumber, value, onChange, onNext, onBack, isLoading, error }: OTPStepProps) {
  const [countdown, setCountdown] = useState(30)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.length === 6) {
      onNext()
    }
  }

  const handleInputChange = (index: number, digit: string) => {
    if (digit.length > 1) return

    const newOtp = value.split("")
    newOtp[index] = digit
    const newValue = newOtp.join("")
    onChange(newValue)

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleResend = () => {
    setCountdown(30)
  }

  const isValid = value.length === 6

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
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Enter verification code</h1>
          <p className="text-[var(--text-secondary)]">We've sent a 6-digit code to +91 {phoneNumber}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-4">Enter 6-digit code</label>
            <div className="flex space-x-3 justify-center">
              {Array.from({ length: 6 }).map((_, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={value[index] || ""}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={cn(
                    "w-12 h-12 text-center text-lg font-semibold",
                    "border-2 border-[var(--border-color)] rounded-lg",
                    "focus:border-[var(--app-primary)] focus:outline-none",
                    "bg-[var(--bg-primary)] text-[var(--text-primary)]",
                    error && "border-red-500",
                  )}
                />
              ))}
            </div>
            {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
          </div>

          <div className="text-center">
            {countdown > 0 ? (
              <p className="text-[var(--text-secondary)]">Resend code in {countdown}s</p>
            ) : (
              <button type="button" onClick={handleResend} className="text-[var(--app-primary)] underline">
                Resend code
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="p-6 border-t border-[var(--border-color)]">
        <Button onClick={handleSubmit} disabled={!isValid || isLoading} className="w-full h-12 text-lg">
          {isLoading ? "Verifying..." : "Verify"}
        </Button>
      </div>
    </div>
  )
}
