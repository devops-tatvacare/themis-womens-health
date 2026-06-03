"use client"

import { X, Activity } from "lucide-react"
import type { SymptomLog } from "@/lib/types"

interface DaySymptomOverlayProps {
  date: string
  symptoms: SymptomLog[]
  onClose: () => void
}

export function DaySymptomOverlay({ date, symptoms, onClose }: DaySymptomOverlayProps) {
  const formatFullDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getPainScaleColor = (scale: number) => {
    if (scale <= 3) return "text-green-600 bg-green-100"
    if (scale <= 6) return "text-yellow-600 bg-yellow-100"
    return "text-red-600 bg-red-100"
  }

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="bg-white rounded-t-2xl w-full max-h-[70%] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Symptoms Logged</h3>
              <p className="text-sm text-gray-600">{formatFullDate(date)}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {symptoms.length === 0 ? (
            <div className="text-center py-8">
              <Activity className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No symptoms logged for this day</p>
            </div>
          ) : (
            symptoms.map((symptom) => {
              const IconComponent = symptom.icon
              return (
                <div key={symptom.id} className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                      <IconComponent className={`w-5 h-5 ${symptom.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-800">{symptom.symptom}</h4>
                        <span className="text-sm text-gray-500">{symptom.time}</span>
                      </div>

                      <div className="space-y-2">
                        {symptom.painScale && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Pain Scale:</span>
                            <span
                              className={`text-xs px-2 py-1 rounded-full font-medium ${getPainScaleColor(symptom.painScale)}`}
                            >
                              {symptom.painScale}/10
                            </span>
                          </div>
                        )}

                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">Duration:</span>
                          <span className="text-sm text-gray-800">{symptom.duration}</span>
                        </div>

                        {symptom.notes && (
                          <div>
                            <span className="text-sm text-gray-600">Notes:</span>
                            <p className="text-sm text-gray-800 mt-1">{symptom.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
