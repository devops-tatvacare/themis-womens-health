"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Upload, FileText, CheckCircle, X } from "lucide-react"

interface DocumentUploadStepProps {
  onNext: () => void
  onBack: () => void
  isLoading?: boolean
}

export function DocumentUploadStep({ onNext, onBack, isLoading }: DocumentUploadStepProps) {
  const [attached, setAttached] = useState(false)

  const handleUploadClick = () => {
    setAttached(true)
  }

  return (
    <div className="flex flex-col h-full bg-[var(--bg-primary)] pb-12">
      <div className="flex-1 overflow-y-auto p-6">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Upload your documents</h1>
          <p className="text-sm text-[var(--text-secondary)] mb-6">
            Upload your doctor&apos;s prescription to get started with your care program
          </p>

          <div className="bg-[var(--bg-secondary)] rounded-xl p-4 border border-[var(--border-color)]">
            <h3 className="font-semibold text-[var(--text-primary)] mb-1 text-sm">Doctor Prescription</h3>
            <p className="text-xs text-[var(--text-secondary)] mb-4">
              Upload your prescription for treatment verification
            </p>

            {attached ? (
              <div className="flex items-center gap-3 p-3 bg-[var(--bg-primary)] rounded-lg border border-green-200">
                <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4.5 h-4.5 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[var(--text-primary)] text-sm">Prescription_Dr_Johnson.pdf</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                    <span className="text-xs text-green-600 font-medium">Attached</span>
                    <span className="text-xs text-[var(--text-muted)] ml-1">1.2 MB</span>
                  </div>
                </div>
                <button
                  onClick={() => setAttached(false)}
                  className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors flex-shrink-0"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            ) : (
              <div className="text-center">
                <Button
                  type="button"
                  onClick={handleUploadClick}
                  className="w-full text-white"
                  style={{ backgroundColor: "var(--app-primary)" }}
                  disabled={isLoading}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
                <p className="text-xs text-[var(--text-muted)] mt-2">Supported: PDF, JPG, PNG (Max 10MB)</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-[var(--border-color)]">
        <Button
          onClick={onNext}
          disabled={!attached || isLoading}
          className="w-full h-12 text-lg"
        >
          {isLoading ? "Processing..." : "Continue"}
        </Button>
      </div>
    </div>
  )
}
