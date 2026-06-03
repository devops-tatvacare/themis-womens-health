"use client"

import { useState } from "react"
import { BaseModal } from "@/components/ui/base-modal"
import { Button } from "@/components/ui/button"
import { useToast } from "@/lib/hooks/use-toast"

interface ReminderModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (reminder: ReminderData) => void
}

interface ReminderData {
  time: string
  frequency: string
  startDate: string
  endDate: string
}

export function ReminderModal({ isOpen, onClose, onSave }: ReminderModalProps) {
  const { toast } = useToast()
  const [time, setTime] = useState("09:00")
  const [frequency, setFrequency] = useState("daily")
  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0])
  const [endDate, setEndDate] = useState("")

  const handleSave = () => {
    onSave({
      time,
      frequency,
      startDate,
      endDate,
    })

    toast({
      title: "Reminder Set!",
      description: `Water reminder set for ${time} ${frequency}`,
      type: "success",
    })

    onClose()
  }

  const handleClose = () => {
    setTime("09:00")
    setFrequency("daily")
    setStartDate(new Date().toISOString().split("T")[0])
    setEndDate("")
    onClose()
  }

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Set Water Reminder"
      actions={
        <>
          <Button variant="outline" onClick={handleClose} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 bg-[var(--app-primary)] hover:bg-[var(--app-primary-hover)] text-white"
          >
            Save Reminder
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Reminder Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)]"
          >
            <option value="hourly">Every Hour</option>
            <option value="every2hours">Every 2 Hours</option>
            <option value="every3hours">Every 3 Hours</option>
            <option value="every4hours">Every 4 Hours</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="custom">Custom</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">End Date (Optional)</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)]"
          />
        </div>
      </div>
    </BaseModal>
  )
}
