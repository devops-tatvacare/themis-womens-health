"use client"

import { useState } from "react"
import { Pill, Zap } from "lucide-react"

export interface InsightData {
  title: string
  icon: any
  color: string
  bgColor: string
  logged: number
  missed: number
  unit: string
  description: string
  chart: number[]
  period: string
  hasData: boolean
  value: string
  chartData: Array<{ day: string; value: number }>
}

export function useInsightsData(): InsightData[] {
  return [
    {
      title: "Medication Logs",
      icon: Pill,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      logged: 28,
      missed: 2,
      unit: "doses",
      description: "Track your daily medication intake and adherence",
      chart: [3, 4, 3, 5, 4, 3, 4],
      period: "7 days",
      hasData: true,
      value: "93%",
      chartData: [
        { day: "Mon", value: 3 },
        { day: "Tue", value: 4 },
        { day: "Wed", value: 3 },
        { day: "Thu", value: 5 },
        { day: "Fri", value: 4 },
        { day: "Sat", value: 3 },
        { day: "Sun", value: 4 },
      ],
    },
    {
      title: "Pain Logs",
      icon: Zap,
      color: "text-red-600",
      bgColor: "bg-red-50",
      logged: 21,
      missed: 4,
      unit: "entries",
      description: "Track your daily pain levels and patterns",
      chart: [3, 2, 4, 3, 2, 3, 4],
      period: "7 days",
      hasData: true,
      value: "3.0",
      chartData: [
        { day: "Mon", value: 3 },
        { day: "Tue", value: 2 },
        { day: "Wed", value: 4 },
        { day: "Thu", value: 3 },
        { day: "Fri", value: 2 },
        { day: "Sat", value: 3 },
        { day: "Sun", value: 4 },
      ],
    },
  ]
}

export function useSymptomData() {
  const dates = ["2024-03-15", "2024-03-16", "2024-03-17", "2024-03-18", "2024-03-19", "2024-03-20", "2024-03-21"]

  const symptomLogs = [
    {
      id: "1",
      date: "2024-03-21",
      time: "14:30",
      symptom: "Headache",
      severity: 6,
      duration: "2 hours",
      notes: "Started after lunch, mild throbbing",
      triggers: ["Stress", "Screen time"],
    },
    {
      id: "2",
      date: "2024-03-21",
      time: "09:15",
      symptom: "Nausea",
      severity: 4,
      duration: "30 minutes",
      notes: "Morning nausea, improved after eating",
      triggers: ["Empty stomach"],
    },
    {
      id: "3",
      date: "2024-03-20",
      time: "16:45",
      symptom: "Back Pain",
      severity: 7,
      duration: "4 hours",
      notes: "Lower back pain, sharp when bending",
      triggers: ["Poor posture", "Long sitting"],
    },
    {
      id: "4",
      date: "2024-03-19",
      time: "11:20",
      symptom: "Fatigue",
      severity: 5,
      duration: "All day",
      notes: "General tiredness, low energy",
      triggers: ["Poor sleep", "Stress"],
    },
    {
      id: "5",
      date: "2024-03-18",
      time: "08:30",
      symptom: "Joint Pain",
      severity: 4,
      duration: "1 hour",
      notes: "Knee stiffness in the morning",
      triggers: ["Weather change"],
    },
  ]

  const symptomsByDate = symptomLogs.reduce(
    (acc, log) => {
      if (!acc[log.date]) {
        acc[log.date] = []
      }
      acc[log.date].push(log)
      return acc
    },
    {} as Record<string, typeof symptomLogs>,
  )

  return { dates, symptomLogs, symptomsByDate }
}

export function useGoals() {
  const [goals, setGoals] = useState<Record<string, number>>({
    "Water Logs": 8,
    "Sleep Logs": 8,
    "Steps Logs": 10000,
    "Pain Logs": 2,
  })

  const getGoalValue = (title: string) => goals[title]

  const setGoal = (title: string, value: number) => {
    setGoals((prev) => ({ ...prev, [title]: value }))
  }

  return { getGoalValue, setGoal }
}

export function useMedications() {
  const [medications, setMedications] = useState<string[]>(["Paracetamol", "Vitamin D", "Aspirin", "Actibile", "Dolo"])

  const addMedication = (medication: string) => {
    setMedications((prev) => [...prev, medication])
  }

  const removeMedication = (index: number) => {
    setMedications((prev) => prev.filter((_, i) => i !== index))
  }

  return { medications, addMedication, removeMedication }
}

export function useMenstrualData() {
  const [menstrualData, setMenstrualData] = useState({
    cycles: [
      {
        id: "cycle-1",
        startDate: "2024-03-01",
        duration: 5,
        cycleLength: 28,
        flow: "Normal",
        pain: 6,
        mood: "Neutral",
      },
      {
        id: "cycle-2",
        startDate: "2024-02-02",
        duration: 4,
        cycleLength: 30,
        flow: "Heavy",
        pain: 8,
        mood: "Frustrated",
      },
      {
        id: "cycle-3",
        startDate: "2024-01-05",
        duration: 5,
        cycleLength: 27,
        flow: "Normal",
        pain: 5,
        mood: "Happy",
      },
    ],
  })

  const addCycle = (cycle: any) => {
    setMenstrualData((prev) => ({
      ...prev,
      cycles: [cycle, ...prev.cycles],
    }))
  }

  const calculatePhase = (date: Date, lastPeriodStart: Date, cycleLength: number) => {
    const daysSinceLastPeriod = Math.floor((date.getTime() - lastPeriodStart.getTime()) / (1000 * 60 * 60 * 24))
    const dayInCycle = daysSinceLastPeriod % cycleLength

    if (dayInCycle >= 0 && dayInCycle <= 5) return "period"
    if (dayInCycle >= 6 && dayInCycle <= 11) return "post-period"
    if (dayInCycle >= 12 && dayInCycle <= 16) return "ovulation"
    if (dayInCycle >= 17 && dayInCycle <= 23) return "pre-period"
    return "pre-period"
  }

  return { menstrualData, addCycle, calculatePhase }
}
