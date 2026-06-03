"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { BaseModal } from "@/components/ui/base-modal"
import { MedicationScheduleModal } from "./medication-schedule-modal"
import { Pill, Clock, Calendar, ChevronRight } from "lucide-react"
import { useMedicationSchedules } from "@/lib/hooks/use-medication-schedules"
import type { MedicationSchedule } from "@/lib/types/medication"

interface MedicationScheduleListProps {
  isOpen: boolean
  onClose: () => void
  medications: string[]
}

export function MedicationScheduleList({ isOpen, onClose, medications }: MedicationScheduleListProps) {
  const [selectedMedication, setSelectedMedication] = useState<string | null>(null)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const { schedules, addSchedule, updateSchedule, getScheduleByMedication } = useMedicationSchedules()

  const handleMedicationClick = (medicationName: string) => {
    setSelectedMedication(medicationName)
    setShowScheduleModal(true)
  }

  const handleScheduleSave = (schedule: Omit<MedicationSchedule, "id" | "createdAt" | "updatedAt">) => {
    const existingSchedule = getScheduleByMedication(schedule.medicationName)

    if (existingSchedule) {
      updateSchedule(existingSchedule.id, schedule)
    } else {
      addSchedule(schedule)
    }

    setShowScheduleModal(false)
    setSelectedMedication(null)
  }

  const formatSchedulePreview = (schedule: MedicationSchedule) => {
    const timeCount = schedule.timeSlots.length
    const frequencyText =
      schedule.frequency.type === "daily"
        ? "Daily"
        : schedule.frequency.type === "weekly"
          ? "Weekly"
          : `Every ${schedule.frequency.interval} days`

    return `${timeCount} time${timeCount > 1 ? "s" : ""} ${frequencyText.toLowerCase()}`
  }

  const getNextDose = (schedule: MedicationSchedule) => {
    if (schedule.timeSlots.length === 0) return "No times set"

    const now = new Date()
    const currentTime = now.getHours() * 60 + now.getMinutes()

    // Find next upcoming time slot
    const upcomingSlots = schedule.timeSlots
      .map((slot) => {
        const [hours, minutes] = slot.time.split(":").map(Number)
        const slotTime = hours * 60 + minutes
        return { ...slot, slotTime }
      })
      .filter((slot) => slot.slotTime > currentTime)
      .sort((a, b) => a.slotTime - b.slotTime)

    if (upcomingSlots.length > 0) {
      return `Next: ${upcomingSlots[0].time}`
    } else {
      // Next dose is tomorrow's first time
      const firstSlot = schedule.timeSlots
        .map((slot) => {
          const [hours, minutes] = slot.time.split(":").map(Number)
          return { ...slot, slotTime: hours * 60 + minutes }
        })
        .sort((a, b) => a.slotTime - b.slotTime)[0]

      return `Next: Tomorrow ${firstSlot.time}`
    }
  }

  return (
    <>
      <BaseModal isOpen={isOpen} onClose={onClose} className="max-w-md">
        <div className="bg-white min-h-screen flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <Button variant="ghost" onClick={onClose} className="text-blue-500 hover:text-blue-600 p-0 h-auto">
              ← Back
            </Button>
            <h2 className="text-lg font-semibold">Medication Reminders</h2>
            <div className="w-12"></div> {/* Spacer for centering */}
          </div>

          {/* Content */}
          <div className="flex-1 p-4">
            <div className="space-y-3">
              {medications.map((medication) => {
                const schedule = getScheduleByMedication(medication)
                const hasSchedule = !!schedule

                return (
                  <div
                    key={medication}
                    onClick={() => handleMedicationClick(medication)}
                    className="bg-white border border-gray-200 rounded-xl p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Pill className="w-6 h-6 text-blue-600" />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{medication}</h3>
                        {hasSchedule ? (
                          <div className="space-y-1">
                            <p className="text-sm text-gray-600 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {formatSchedulePreview(schedule)}
                            </p>
                            <p className="text-xs text-blue-600 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {getNextDose(schedule)}
                            </p>
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500">No schedule set</p>
                        )}
                      </div>

                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                )
              })}
            </div>

            {medications.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Pill className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="font-semibold text-gray-600 mb-2">No Medications</h3>
                <p className="text-sm text-gray-500">Add medications first to set up reminders.</p>
              </div>
            )}
          </div>
        </div>
      </BaseModal>

      {/* Schedule Modal */}
      {showScheduleModal && selectedMedication && (
        <MedicationScheduleModal
          isOpen={showScheduleModal}
          onClose={() => {
            setShowScheduleModal(false)
            setSelectedMedication(null)
          }}
          medicationName={selectedMedication}
          existingSchedule={getScheduleByMedication(selectedMedication)}
          onSave={handleScheduleSave}
        />
      )}
    </>
  )
}
