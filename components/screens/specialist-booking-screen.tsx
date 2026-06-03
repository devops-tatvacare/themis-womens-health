"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScreenHeader } from "@/components/ui/screen-header"
import { Calendar } from "lucide-react"

const MOCK_DATES = [
  { date: 18, day: "Mon", isSelected: false },
  { date: 19, day: "Tue", isSelected: false },
  { date: 20, day: "Wed", isSelected: true },
  { date: 21, day: "Thu", isSelected: false },
  { date: 22, day: "Fri", isSelected: false },
  { date: 23, day: "Sat", isSelected: false },
  { date: 24, day: "Sun", isSelected: false },
]

const MOCK_TIME_SLOTS = [
  { time: "9:00 AM", available: true },
  { time: "10:30 AM", available: true },
  { time: "12:00 PM", available: false },
  { time: "2:00 PM", available: true },
  { time: "4:30 PM", available: false },
  { time: "6:00 PM", available: true },
  { time: "7:30 PM", available: true },
  { time: "9:00 PM", available: true },
]

export function SpecialistBookingScreen({
  specialist,
  onBack,
}: {
  specialist: any
  onBack: () => void
}) {
  const [selectedDate, setSelectedDate] = useState(20)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null)
  const [showFullCalendar, setShowFullCalendar] = useState(false)

  const handleDateSelect = (date: number) => {
    setSelectedDate(date)
    setSelectedTimeSlot(null) // Reset time slot when date changes
  }

  const handleTimeSlotSelect = (time: string) => {
    setSelectedTimeSlot(time)
  }

  const handleConfirmBooking = () => {
    console.log("Booking confirmed:", {
      specialist: specialist.name,
      date: selectedDate,
      time: selectedTimeSlot,
      price: specialist.price,
    })
    // Handle booking confirmation
    onBack()
  }

  const IconComponent = specialist.icon

  return (
    <div className="flex flex-col h-full">
      <ScreenHeader title={`Book ${specialist.name}`} onBack={onBack} />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Date Selector */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Select Date:</h3>
          <div className="flex items-center gap-3">
            <div className="flex-1 overflow-x-auto">
              <div className="flex gap-2 pb-2">
                {MOCK_DATES.map((dateItem) => (
                  <button
                    key={dateItem.date}
                    onClick={() => handleDateSelect(dateItem.date)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg border-2 flex flex-col items-center justify-center transition-all ${
                      selectedDate === dateItem.date
                        ? "border-[var(--app-primary)] bg-[var(--app-primary)]/10"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <span
                      className={`text-lg font-bold ${
                        selectedDate === dateItem.date ? "text-[var(--app-primary)]" : "text-gray-800"
                      }`}
                    >
                      {dateItem.date}
                    </span>
                    <span
                      className={`text-xs ${
                        selectedDate === dateItem.date ? "text-[var(--app-primary)]" : "text-gray-500"
                      }`}
                    >
                      {dateItem.day}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="flex-shrink-0 h-16 px-3 bg-transparent"
              onClick={() => setShowFullCalendar(!showFullCalendar)}
            >
              <Calendar className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-sm text-gray-600 mt-2">Selected: Wed, Dec {selectedDate}, 2024</p>
        </div>

        {/* Time Slots */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Available Time Slots</h3>
          <div className="grid grid-cols-2 gap-3">
            {MOCK_TIME_SLOTS.map((slot) => (
              <button
                key={slot.time}
                onClick={() => slot.available && handleTimeSlotSelect(slot.time)}
                disabled={!slot.available}
                className={`p-3 rounded-lg border-2 text-center transition-all ${
                  selectedTimeSlot === slot.time
                    ? "border-[var(--app-primary)] bg-[var(--app-primary)]/10"
                    : slot.available
                      ? "border-gray-200 bg-white hover:border-gray-300"
                      : "border-gray-100 bg-gray-50 cursor-not-allowed"
                }`}
              >
                <div
                  className={`font-medium text-sm ${
                    selectedTimeSlot === slot.time
                      ? "text-[var(--app-primary)]"
                      : slot.available
                        ? "text-gray-800"
                        : "text-gray-400"
                  }`}
                >
                  {slot.time}
                </div>
                <div className="mt-1">
                  {slot.available ? (
                    <Badge
                      variant="secondary"
                      className="text-xs"
                      style={{
                        backgroundColor: "var(--status-success)",
                        color: "white",
                        border: "none",
                      }}
                    >
                      Available
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="text-xs bg-gray-200 text-gray-500 border-none">
                      Booked
                    </Badge>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Booking Summary */}
        {selectedTimeSlot && (
          <Card className="shadow-sm border-0 bg-gray-50 rounded-xl overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "var(--icon-bg-primary)" }}
                >
                  <IconComponent className="w-5 h-5" style={{ color: "var(--app-primary)" }} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{specialist.name} Consultation</h4>
                  <p className="text-sm text-gray-600">
                    Dec {selectedDate}, 2024 • {selectedTimeSlot}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-700">Total Amount:</span>
                <span className="text-lg font-bold" style={{ color: "var(--app-primary)" }}>
                  {specialist.price}
                </span>
              </div>
              <Button className="w-full font-semibold" onClick={handleConfirmBooking}>
                Confirm Booking
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
