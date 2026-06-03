"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Gift } from "lucide-react"
import { ScreenHeader } from "@/components/ui/screen-header"
import type { CycleData } from "@/lib/types"

export function TreatmentJourneyDetailScreen({
  onBack,
  onCycleSelect,
}: {
  onBack: () => void
  onCycleSelect?: (cycle: CycleData) => void
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Complete":
        return "bg-green-100 text-green-700 border-green-200"
      case "In Progress":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "Upcoming":
        return "bg-orange-100 text-orange-700 border-orange-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const handleClaimFreeDrug = () => {
    console.log("Claiming treatment refill")
  }

  const treatmentCycles = [
    {
      id: "cycle-1",
      cycleNumber: 1,
      status: "Complete" as const,
      completedDate: "December 10, 2024",
      targetTherapyDrug: "Your Drug",
      therapyType: "Metabolism Drug",
      deliveryStatus: {
        ordered: true,
        shipped: true,
        delivered: true,
        deliveryAddress: "123 Main Street, Apartment 4B, Mumbai, Maharashtra 400001",
      },
    },
    {
      id: "cycle-2",
      cycleNumber: 2,
      status: "Complete" as const,
      completedDate: "January 15, 2025",
      targetTherapyDrug: "Your Drug",
      therapyType: "Metabolism Drug",
      deliveryStatus: {
        ordered: true,
        shipped: true,
        delivered: true,
        deliveryAddress: "123 Main Street, Apartment 4B, Mumbai, Maharashtra 400001",
      },
    },
    {
      id: "cycle-3",
      cycleNumber: 3,
      status: "Complete" as const,
      completedDate: "February 20, 2025",
      targetTherapyDrug: "Your Drug",
      therapyType: "Metabolism Drug",
      deliveryStatus: {
        ordered: true,
        shipped: true,
        delivered: true,
        deliveryAddress: "123 Main Street, Apartment 4B, Mumbai, Maharashtra 400001",
      },
    },
    {
      id: "cycle-4",
      cycleNumber: 4,
      status: "Complete" as const,
      completedDate: "March 15, 2025",
      targetTherapyDrug: "Your Drug",
      therapyType: "Metabolism Drug",
      deliveryStatus: {
        ordered: true,
        shipped: true,
        delivered: true,
        deliveryAddress: "123 Main Street, Apartment 4B, Mumbai, Maharashtra 400001",
      },
    },
    {
      id: "cycle-5",
      cycleNumber: 5,
      status: "In Progress" as const,
      scheduledDate: "April 20, 2025",
      targetTherapyDrug: "Your Drug",
      therapyType: "Metabolism Drug",
      deliveryStatus: {
        ordered: true,
        shipped: true,
        delivered: false,
        deliveryAddress: "123 Main Street, Apartment 4B, Mumbai, Maharashtra 400001",
      },
    },
    {
      id: "cycle-6",
      cycleNumber: 6,
      status: "Upcoming" as const,
      scheduledDate: "May 25, 2025",
      targetTherapyDrug: "Your Drug",
      therapyType: "Metabolism Drug",
      deliveryStatus: {
        ordered: false,
        shipped: false,
        delivered: false,
        deliveryAddress: "123 Main Street, Apartment 4B, Mumbai, Maharashtra 400001",
      },
    },
  ]

  const getCycleOrdinal = (num: number) => {
    const suffixes = ["th", "st", "nd", "rd"]
    const v = num % 100
    return num + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0])
  }

  return (
    <div className="flex flex-col h-full">
      <ScreenHeader title="Treatment Journey" onBack={onBack} />

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        <div
          className="rounded-xl p-4 mb-3 border-2"
          style={{
            background: `linear-gradient(135deg, #f0f9ff, #e0f2fe)`,
            borderColor: "#0ea5e9",
            boxShadow: "0 2px 8px rgba(14, 165, 233, 0.15)",
          }}
        >
          <div className="flex items-start gap-3">
            <div className="bg-white rounded-full p-2 shadow-sm border border-sky-200">
              <Gift className="w-5 h-5 text-sky-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-base text-gray-900 mb-1">Your Next Step</h3>
              <p className="text-sm text-gray-700 mb-3">
                Your Free DOSE is available for your next cycle
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-green-600">Free</span>
                  <span className="text-sm text-gray-500 line-through">₹40,750</span>
                </div>
                <Button
                  className="text-white font-semibold px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
                  style={{
                    backgroundColor: "#0ea5e9",
                    border: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#0284c7"
                    e.currentTarget.style.transform = "translateY(-1px)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#0ea5e9"
                    e.currentTarget.style.transform = "translateY(0)"
                  }}
                  onClick={handleClaimFreeDrug}
                >
                  Claim Now
                </Button>
              </div>
            </div>
          </div>
        </div>

        {[...treatmentCycles].reverse().map((cycle) => (
          <div key={cycle.id} className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 shadow-sm relative">
            <div className="flex items-center justify-between mb-1.5">
              <h3 className="font-semibold text-sm text-gray-800">{getCycleOrdinal(cycle.cycleNumber)} Cycle</h3>
              <Badge className={`text-xs font-medium border ${getStatusColor(cycle.status)}`}>{cycle.status}</Badge>
            </div>
            <div className="space-y-1 text-xs text-gray-600 mb-2">
              <p>
                <span className="font-medium">{cycle.status === "Complete" ? "Completed:" : "Scheduled:"}</span>{" "}
                {cycle.completedDate || cycle.scheduledDate}
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="text-xs h-7 bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              onClick={() => onCycleSelect?.(cycle)}
            >
              View Details
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
