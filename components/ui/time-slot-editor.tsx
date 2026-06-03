"use client"

import { useState } from "react"
import { Minus, Plus } from "lucide-react"
import type { TimeSlot } from "@/lib/types/medication"

interface TimeSlotEditorProps {
  timeSlots: TimeSlot[]
  onChange: (timeSlots: TimeSlot[]) => void
}

export function TimeSlotEditor({ timeSlots, onChange }: TimeSlotEditorProps) {
  const [newTime, setNewTime] = useState("08:00")
  const [newDosage, setNewDosage] = useState("1 capsule")

  const addTimeSlot = () => {
    const newSlot: TimeSlot = {
      id: `slot_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      time: newTime,
      dosage: newDosage,
    }
    onChange([...timeSlots, newSlot])
  }

  const removeTimeSlot = (slotId: string) => {
    onChange(timeSlots.filter((slot) => slot.id !== slotId))
  }

  const updateTimeSlot = (slotId: string, field: keyof TimeSlot, value: string) => {
    onChange(timeSlots.map((slot) => (slot.id === slotId ? { ...slot, [field]: value } : slot)))
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-white">At what time?</h3>

      {/* Existing Time Slots */}
      <div className="space-y-3">
        {timeSlots.map((slot) => (
          <div key={slot.id} className="flex items-center gap-3 bg-gray-700 rounded-lg p-3">
            <button
              onClick={() => removeTimeSlot(slot.id)}
              className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              <Minus className="w-4 h-4 text-white" />
            </button>

            <input
              type="time"
              value={slot.time}
              onChange={(e) => updateTimeSlot(slot.id, "time", e.target.value)}
              className="bg-transparent text-white text-lg font-medium border-none outline-none"
            />

            <input
              type="text"
              value={slot.dosage}
              onChange={(e) => updateTimeSlot(slot.id, "dosage", e.target.value)}
              className="bg-transparent text-blue-400 text-sm border-none outline-none flex-1 text-right"
              placeholder="1 capsule"
            />
          </div>
        ))}
      </div>

      {/* Add New Time Slot */}
      <div className="flex items-center gap-3 bg-gray-700 rounded-lg p-3">
        <button
          onClick={addTimeSlot}
          className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
        >
          <Plus className="w-4 h-4 text-white" />
        </button>

        <input
          type="time"
          value={newTime}
          onChange={(e) => setNewTime(e.target.value)}
          className="bg-transparent text-blue-400 text-lg font-medium border-none outline-none"
        />

        <span className="text-blue-400 text-sm">Add a Time</span>
      </div>
    </div>
  )
}
