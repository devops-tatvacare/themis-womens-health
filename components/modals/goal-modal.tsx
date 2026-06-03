"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { BaseModal } from "@/components/ui/base-modal"
import { useToast } from "@/lib/hooks/use-toast"

interface GoalModalProps {
  title: string
  isOpen: boolean
  onClose: () => void
  onSave: (value: number) => void
}

export function GoalModal({ title, isOpen, onClose, onSave }: GoalModalProps) {
  const { toast } = useToast()
  const [tempGoal, setTempGoal] = useState("")

  const handleSave = () => {
    const value = Number.parseInt(tempGoal) || 0
    if (value > 0) {
      onSave(value)
      toast({
        title: "Goal Updated!",
        description: `${title} goal set to ${value}`,
        type: "success",
      })
      onClose()
      setTempGoal("")
    }
  }

  const getPlaceholder = () => {
    if (title.includes("Water")) return "Enter ml"
    if (title.includes("Sleep")) return "Enter hours"
    if (title.includes("Steps")) return "Enter steps"
    return "Enter value"
  }

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Set Goal"
      actions={
        <>
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!tempGoal || Number.parseInt(tempGoal) <= 0}
            className="flex-1 bg-[var(--app-primary)] hover:bg-[var(--app-primary-hover)] text-white"
          >
            Set Goal
          </Button>
        </>
      }
    >
      <div>
        <p className="text-sm text-gray-600 mb-2">Set your daily goal for {title}</p>
        <input
          type="number"
          value={tempGoal}
          onChange={(e) => setTempGoal(e.target.value)}
          placeholder={getPlaceholder()}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </BaseModal>
  )
}
