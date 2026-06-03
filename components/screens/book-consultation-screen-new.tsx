"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScreenHeader } from "@/components/ui/screen-header"
import { HorizontalScroll } from "@/components/ui/horizontal-scroll"
import { SpecialistBookingScreen } from "./specialist-booking-screen"
import { Apple, Dumbbell, Target, Brain, CheckCircle, Calendar, X, RotateCcw } from "lucide-react"

const SPECIALISTS = [
  {
    id: "cbt",
    name: "CBT Coaching",
    icon: Brain,
    price: "₹600",
    isPaid: true,
  },
]

const APPOINTMENT_HISTORY = [
  {
    id: "1",
    specialistType: "CBT Coaching",
    specialistIcon: Brain,
    date: "Dec 15, 2024",
    time: "10:30 AM",
    status: "completed",
  },
  {
    id: "2",
    specialistType: "CBT Coaching",
    specialistIcon: Brain,
    date: "Dec 20, 2024",
    time: "2:00 PM",
    status: "scheduled",
  },
  {
    id: "3",
    specialistType: "CBT Coaching",
    specialistIcon: Brain,
    date: "Dec 10, 2024",
    time: "11:00 AM",
    status: "cancelled",
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return (
        <Badge className="text-xs px-2 py-1 bg-green-100 text-green-700 border-0">
          <CheckCircle className="w-3 h-3 mr-1" />
          Completed
        </Badge>
      )
    case "scheduled":
      return (
        <Badge className="text-xs px-2 py-1 bg-blue-100 text-blue-700 border-0">
          <Calendar className="w-3 h-3 mr-1" />
          Scheduled
        </Badge>
      )
    case "cancelled":
      return (
        <Badge className="text-xs px-2 py-1 bg-red-100 text-red-700 border-0">
          <X className="w-3 h-3 mr-1" />
          Cancelled
        </Badge>
      )
    case "rescheduled":
      return (
        <Badge className="text-xs px-2 py-1 bg-orange-100 text-orange-700 border-0">
          <RotateCcw className="w-3 h-3 mr-1" />
          Rescheduled
        </Badge>
      )
    default:
      return null
  }
}

export function BookConsultationScreenNew({ onBack }: { onBack: () => void }) {
  const [selectedSpecialist, setSelectedSpecialist] = useState<any>(null)
  const [showBookingScreen, setShowBookingScreen] = useState(false)

  const handleBookSpecialist = (specialist: any) => {
    setSelectedSpecialist(specialist)
    setShowBookingScreen(true)
  }

  const handleBackFromBooking = () => {
    setShowBookingScreen(false)
    setSelectedSpecialist(null)
  }

  const handleReschedule = (appointmentId: string) => {
    console.log("Reschedule appointment:", appointmentId)
  }

  const handleCancel = (appointmentId: string) => {
    console.log("Cancel appointment:", appointmentId)
  }

  if (showBookingScreen && selectedSpecialist) {
    return <SpecialistBookingScreen specialist={selectedSpecialist} onBack={handleBackFromBooking} />
  }

  return (
    <div className="flex flex-col h-full">
      <ScreenHeader title="Book Consultation" onBack={onBack} />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Specialist Cards */}
        <div>
          <HorizontalScroll>
            {SPECIALISTS.map((specialist) => {
              const IconComponent = specialist.icon
              return (
                <div key={specialist.id} className="flex-shrink-0 w-36">
                  <Card className="shadow-sm border-0 bg-white rounded-xl overflow-hidden h-44">
                    <CardContent className="p-3 h-full flex flex-col justify-between">
                      <div className="flex-1 flex flex-col items-center justify-center">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                          style={{ backgroundColor: "var(--icon-bg-primary)" }}
                        >
                          <IconComponent className="w-6 h-6" style={{ color: "var(--app-primary)" }} />
                        </div>
                        <h3 className="font-semibold text-sm text-gray-800 mb-2 text-center">{specialist.name}</h3>
                        <div className="mb-3">
                          {specialist.isPaid ? (
                            <span className="text-base font-bold" style={{ color: "var(--status-success)" }}>
                              {specialist.price}
                            </span>
                          ) : (
                            <Badge
                              className="text-xs font-medium px-2 py-1"
                              style={{
                                backgroundColor: "var(--status-success)",
                                color: "white",
                                border: "none",
                              }}
                            >
                              Free
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="w-full font-medium text-sm h-8"
                        onClick={() => handleBookSpecialist(specialist)}
                      >
                        Book
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </HorizontalScroll>
        </div>

        {/* History Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">History</h2>
          <div className="space-y-2">
            {APPOINTMENT_HISTORY.map((appointment) => {
              const IconComponent = appointment.specialistIcon
              return (
                <Card key={appointment.id} className="shadow-sm border-0 bg-white rounded-xl overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-3">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: "var(--icon-bg-primary)" }}
                          >
                            <IconComponent className="w-4 h-4" style={{ color: "var(--app-primary)" }} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-sm text-gray-800">{appointment.specialistType}</h3>
                            <p className="text-xs text-gray-600">
                              {appointment.date} • {appointment.time}
                            </p>
                          </div>
                        </div>
                        {getStatusBadge(appointment.status)}
                      </div>
                    </div>

                    {appointment.status === "scheduled" && (
                      <>
                        <div className="border-t border-gray-100"></div>
                        <div className="px-3 py-2 flex justify-between">
                          <button
                            className="text-sm font-medium"
                            style={{ color: "var(--app-primary)" }}
                            onClick={() => handleReschedule(appointment.id)}
                          >
                            Reschedule
                          </button>
                          <button
                            className="text-sm font-medium"
                            style={{ color: "var(--status-error)" }}
                            onClick={() => handleCancel(appointment.id)}
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
