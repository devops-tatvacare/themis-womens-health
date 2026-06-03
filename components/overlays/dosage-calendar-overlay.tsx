"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, PanInfo } from "framer-motion"
import { getOverlayStyles, getOverlayAnimation, getDragConfig } from "./overlay-config"
import { Pill, ChevronRight } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { addDays, isSameDay, startOfDay, format } from "date-fns"

interface DosageCalendarOverlayProps {
  isOpen: boolean
  onClose: () => void
}

// Generate dosage dates every 21 days starting from a fixed anchor
function getDosageDates(anchor: Date, monthsAhead: number = 6): Date[] {
  const dates: Date[] = []
  const end = addDays(new Date(), monthsAhead * 30)
  let current = startOfDay(anchor)
  let past = addDays(current, -21)
  while (past > addDays(new Date(), -monthsAhead * 30)) {
    dates.push(past)
    past = addDays(past, -21)
  }
  while (current <= end) {
    dates.push(current)
    current = addDays(current, 21)
  }
  return dates
}

const DOSAGE_ANCHOR = new Date(2026, 0, 5)
const dosageDates = getDosageDates(DOSAGE_ANCHOR)

function isDosageDay(date: Date): boolean {
  return dosageDates.some((d) => isSameDay(d, date))
}

function getNextDosageDate(): Date | undefined {
  const today = startOfDay(new Date())
  return dosageDates
    .filter((d) => d >= today)
    .sort((a, b) => a.getTime() - b.getTime())[0]
}

export function DosageCalendarOverlay({ isOpen, onClose }: DosageCalendarOverlayProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const constraintsRef = useRef<HTMLDivElement>(null)
  const dragConfig = getDragConfig()

  const nextDosage = getNextDosageDate()
  const today = startOfDay(new Date())
  const daysUntilNext = nextDosage
    ? Math.round((nextDosage.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    : null

  const upcomingDoses = dosageDates
    .filter((d) => d >= today)
    .sort((a, b) => a.getTime() - b.getTime())
    .slice(0, 4)

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false)
    if (info.offset.y > dragConfig.dismissThreshold || info.velocity.y > dragConfig.velocityThreshold) {
      onClose()
    }
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = "unset"
      }
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          key="dosage-calendar-overlay-panel"
          className="absolute inset-0 z-[175] flex items-end"
          ref={constraintsRef}
        >
          <motion.div
            className="absolute inset-0 bg-black"
            onClick={handleBackdropClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          <motion.div
            className="relative w-full rounded-t-3xl shadow-2xl flex flex-col"
            style={{
              ...getOverlayStyles("primary"),
              background: "linear-gradient(180deg, #f0f7ff 0%, #ffffff 35%)",
            }}
            initial={{ y: "100%" }}
            animate={{ y: isDragging ? undefined : 0 }}
            exit={{ y: "100%" }}
            transition={getOverlayAnimation()}
            drag="y"
            dragConstraints={{ top: -120, bottom: 420 }}
            dragElastic={{ top: 0.14, bottom: 0.22 }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            whileDrag={{
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            }}
          >
            {/* Drag Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </div>

            {/* Header with next dose banner */}
            <div className="px-5 pt-3 pb-4">
              <div
                className="rounded-2xl p-4"
                style={{
                  background: "linear-gradient(135deg, var(--app-primary) 0%, var(--app-primary-hover) 100%)",
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
                      <Pill className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-base font-semibold text-white">Dosage Schedule</h2>
                      <p className="text-sm text-white/80">
                        {daysUntilNext !== null
                          ? daysUntilNext === 0
                            ? "Due today"
                            : `Next in ${daysUntilNext} day${daysUntilNext !== 1 ? "s" : ""}`
                          : "No upcoming"}
                      </p>
                    </div>
                  </div>
                  {nextDosage && (
                    <div className="text-right">
                      <p className="text-2xl font-bold text-white">{format(nextDosage, "d")}</p>
                      <p className="text-xs text-white/70 uppercase font-medium">{format(nextDosage, "MMM")}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto pb-8" style={{ WebkitOverflowScrolling: "touch" }}>
              {/* Calendar */}
              <div className="px-3">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    modifiers={{
                      dosage: (date) => isDosageDay(date),
                    }}
                    modifiersClassNames={{
                      dosage: "dosage-day",
                    }}
                    className="!w-full [--cell-size:--spacing(9)]"
                    classNames={{
                      month: "w-full",
                      table: "w-full",
                    }}
                  />
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-5 mt-3 px-6">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--app-primary)" }} />
                  <span className="text-[11px] text-gray-500 font-medium">Dosage day</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-gray-300" />
                  <span className="text-[11px] text-gray-500 font-medium">Today</span>
                </div>
              </div>

              {/* Selected date detail */}
              {selectedDate && isDosageDay(selectedDate) && (
                <div className="px-5 mt-4">
                  <div
                    className="rounded-xl p-3.5 border"
                    style={{
                      backgroundColor: "rgba(var(--app-primary-rgb), 0.04)",
                      borderColor: "rgba(var(--app-primary-rgb), 0.12)",
                    }}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: "rgba(var(--app-primary-rgb), 0.1)" }}
                      >
                        <Pill className="w-4 h-4" style={{ color: "var(--app-primary)" }} />
                      </div>
                      <div>
                        <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                          {format(selectedDate, "EEEE, MMMM d")}
                        </p>
                        <p className="text-xs text-gray-500">HRT medication dosage</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Upcoming Doses */}
              <div className="px-5 mt-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                    Upcoming Doses
                  </h3>
                  <span className="text-[11px] text-gray-400 font-medium">Every 21 days</span>
                </div>
                <div className="space-y-2">
                  {upcomingDoses.map((date, i) => {
                    const isToday = isSameDay(date, today)
                    return (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 rounded-xl border transition-colors"
                        style={{
                          backgroundColor: isToday ? "rgba(var(--app-primary-rgb), 0.04)" : "var(--bg-secondary, #f9fafb)",
                          borderColor: isToday ? "rgba(var(--app-primary-rgb), 0.15)" : "transparent",
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center"
                            style={{
                              backgroundColor: isToday ? "var(--app-primary)" : "rgba(var(--app-primary-rgb), 0.08)",
                            }}
                          >
                            <span
                              className="text-sm font-semibold"
                              style={{ color: isToday ? "white" : "var(--app-primary)" }}
                            >
                              {format(date, "d")}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                              {format(date, "EEEE")}
                            </p>
                            <p className="text-xs text-gray-400">{format(date, "MMM d, yyyy")}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {isToday && (
                            <span
                              className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                              style={{
                                backgroundColor: "var(--app-primary)",
                                color: "white",
                              }}
                            >
                              TODAY
                            </span>
                          )}
                          <ChevronRight className="w-4 h-4 text-gray-300" />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
