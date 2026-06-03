"use client"

import { Button } from "@/components/ui/button"
import {
  CheckCircle,
  UserCheck,
  ClipboardList,
  Phone,
  Activity,
  Heart,
  BookOpen,
  Shield,
} from "lucide-react"

interface CompletionStepProps {
  onComplete: () => void
  isLoading?: boolean
}

export function CompletionStep({ onComplete, isLoading }: CompletionStepProps) {
  return (
    <div className="flex flex-col h-full bg-[var(--bg-primary)] pb-12">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-md mx-auto space-y-6">
          {/* Logo */}
          <div className="text-center pt-2">
            <img src="/images/themismedicare_logo.jpeg" alt="Themis Medicare" className="h-10 w-auto mx-auto rounded" />
          </div>

          {/* Success icon + heading */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--icon-bg-primary)" }}>
              <CheckCircle className="w-8 h-8" style={{ color: "var(--app-primary)" }} />
            </div>
            <h1 className="text-xl font-bold text-[var(--text-primary)]">
              Welcome to Your Support Program
            </h1>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Your profile is ready. Our care team will review your details and connect with you to begin your personalised women&apos;s health support journey.
            </p>
          </div>

          {/* What happens next — timeline style */}
          <div className="rounded-xl border border-gray-100 bg-white p-4 space-y-4">
            <h3 className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-2">
              <ClipboardList className="w-4 h-4" style={{ color: "var(--app-primary)" }} />
              What happens next
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center bg-green-50">
                  <UserCheck className="w-3.5 h-3.5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">Profile review</p>
                  <p className="text-xs text-[var(--text-secondary)]">A care specialist will review your information</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center bg-blue-50">
                  <Activity className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">Personalised care plan</p>
                  <p className="text-xs text-[var(--text-secondary)]">Tailored to your women&apos;s health needs</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center bg-purple-50">
                  <Phone className="w-3.5 h-3.5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">Welcome call within 24 hours</p>
                  <p className="text-xs text-[var(--text-secondary)]">Discuss your care journey and answer questions</p>
                </div>
              </div>
            </div>
          </div>

          {/* Your program includes */}
          <div className="rounded-xl border border-gray-100 bg-white p-4 space-y-3">
            <h3 className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-2">
              <Shield className="w-4 h-4" style={{ color: "var(--app-primary)" }} />
              Your program includes
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: Activity, label: "Cycle & symptom tracking", color: "text-blue-600", bg: "bg-blue-50" },
                { icon: Heart, label: "Symptom monitoring", color: "text-pink-600", bg: "bg-pink-50" },
                { icon: BookOpen, label: "Education resources", color: "text-green-600", bg: "bg-green-50" },
                { icon: Phone, label: "Specialist access", color: "text-purple-600", bg: "bg-purple-50" },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="flex items-center gap-2 p-2.5 rounded-lg bg-gray-50">
                    <div className={`w-6 h-6 rounded-md flex-shrink-0 flex items-center justify-center ${item.bg}`}>
                      <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                    </div>
                    <span className="text-xs font-medium text-[var(--text-primary)]">{item.label}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-[var(--border-color)]">
        <Button onClick={onComplete} disabled={isLoading} className="w-full h-12 text-base font-semibold">
          Download App
        </Button>
      </div>
    </div>
  )
}
