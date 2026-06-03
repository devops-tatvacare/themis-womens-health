"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

interface UploadSuccessStepProps {
  onNext: () => void
  isLoading?: boolean
}

export function UploadSuccessStep({ onNext, isLoading }: UploadSuccessStepProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onNext()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onNext])

  return (
    <div className="flex flex-col h-full bg-[var(--bg-primary)] pb-12">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl">✓</span>
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Document uploaded successfully!</h1>
            <p className="text-[var(--text-secondary)]">
              Your document is being processed and will be reviewed by our medical team.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-left">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">✓</span>
              </div>
              <span className="text-[var(--text-primary)]">Document uploaded securely</span>
            </div>
            <div className="flex items-center space-x-3 text-left">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">✓</span>
              </div>
              <span className="text-[var(--text-primary)]">Medical team notified</span>
            </div>
            <div className="flex items-center space-x-3 text-left">
              <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">⏳</span>
              </div>
              <span className="text-[var(--text-primary)]">Review in progress</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-[var(--border-color)]">
        <Button onClick={onNext} disabled={isLoading} className="w-full h-12 text-lg">
          Continue
        </Button>
      </div>
    </div>
  )
}
