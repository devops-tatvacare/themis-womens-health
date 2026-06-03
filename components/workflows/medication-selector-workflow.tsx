"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pill } from "lucide-react"

interface Medication {
  id: string
  name: string
  dosage: string
  description: string
}

const TKR_MEDICATIONS: Medication[] = [
  {
    id: "dolo",
    name: "Dolo 650",
    dosage: "650mg",
    description: "Paracetamol — for fever & mild pain relief",
  },
  {
    id: "prescribed-treatment",
    name: "Prescribed HRT",
    dosage: "As directed",
    description: "Primary hormone replacement therapy",
  },
  {
    id: "vitamin-e",
    name: "Vitamin E",
    dosage: "400 IU",
    description: "Antioxidant supplement",
  },
  {
    id: "omega3",
    name: "Omega-3",
    dosage: "1000mg",
    description: "Supports heart & hormonal health",
  },
  {
    id: "vitd3",
    name: "Vitamin D3",
    dosage: "60,000 IU (weekly)",
    description: "Supplement — bone & hormonal health",
  },
]

interface MedicationSelectorWorkflowProps {
  onSubmit: (medication: Medication) => void
  disabled?: boolean
  selectedMedication?: Medication
}

export function MedicationSelectorWorkflow({
  onSubmit,
  disabled = false,
  selectedMedication: initialSelected,
}: MedicationSelectorWorkflowProps) {
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(initialSelected || null)

  const handleSubmit = () => {
    if (selectedMedication) {
      onSubmit(selectedMedication)
    }
  }

  const displayMedication = disabled ? initialSelected : selectedMedication

  return (
    <Card className={`border ${disabled ? "border-gray-300 bg-gray-50" : "border-gray-200 bg-white"}`}>
      <CardContent className="p-3 space-y-3">
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Select Medication</h4>
          <p className="text-xs text-gray-600 mb-3">Choose the medication you want to log</p>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {TKR_MEDICATIONS.map((med) => (
              <button
                key={med.id}
                onClick={() => !disabled && setSelectedMedication(med)}
                disabled={disabled}
                className={`w-full text-left p-2.5 rounded-lg border transition-colors disabled:cursor-not-allowed ${
                  displayMedication?.id === med.id
                    ? "border-[var(--app-primary)] bg-[var(--icon-bg-primary)]"
                    : "border-gray-200 bg-white hover:border-gray-300"
                } ${disabled ? "opacity-60" : ""}`}
              >
                <div className="flex items-start gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      displayMedication?.id === med.id ? "bg-[var(--app-primary)]" : "bg-gray-100"
                    }`}
                  >
                    <Pill className={`w-4 h-4 ${displayMedication?.id === med.id ? "text-white" : "text-gray-600"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{med.name}</p>
                    <p className="text-xs text-gray-600">{med.dosage}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{med.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
        {!disabled && (
          <Button onClick={handleSubmit} disabled={!selectedMedication} className="w-full h-9 text-sm">
            Submit
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
