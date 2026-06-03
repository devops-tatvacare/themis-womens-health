"use client"

import { ScreenLayout } from "@/components/layouts/screen-layout"
import { SpecialistCard } from "@/components/cards/specialist-card"

interface Specialist {
  name: string
  role: string
  avatar: string
  price?: number
  experience?: string
}

interface SpecialistListViewProps {
  specialists: Specialist[]
  onBack: () => void
}

export function SpecialistListView({ specialists, onBack }: SpecialistListViewProps) {
  return (
    <ScreenLayout title="All Specialists" onBack={onBack}>
      <div className="p-4 space-y-4">
        {specialists.map((specialist, index) => (
          <SpecialistCard
            key={index}
            specialist={specialist}
            showPricing
            onBook={() => console.log("Book", specialist.name)}
          />
        ))}
      </div>
    </ScreenLayout>
  )
}
