"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Mic,
  MicOff,
  Plus,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  Utensils,
  Brain,
  Heart,
  PenLine,
  Send,
  Smile,
  Meh,
  Frown,
  AlertTriangle,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

// --- Types ---

interface DiaryEntry {
  id: string
  date: string
  time: string
  text: string
  mood: { icon: LucideIcon; label: string; color: string; bg: string }
  tags: string[]
  preview: string
}

// --- Mood config ---

const MOODS = {
  Good: { icon: Smile, label: "Good", color: "text-green-600", bg: "bg-green-50" },
  Okay: { icon: Meh, label: "Okay", color: "text-amber-600", bg: "bg-amber-50" },
  Low: { icon: Frown, label: "Low", color: "text-blue-600", bg: "bg-blue-50" },
  Anxious: { icon: AlertTriangle, label: "Anxious", color: "text-red-600", bg: "bg-red-50" },
} as const

// --- Mock Data ---

const MOCK_ENTRIES: DiaryEntry[] = [
  {
    id: "1",
    date: "April 8, 2025",
    time: "8:20 AM",
    text: "Day 1 of my period. Cramps woke me early and my lower back is aching. Heat pad and a warm cup of ginger tea are helping a little. Taking it slow today.",
    mood: MOODS.Low,
    tags: ["Period", "Cramps"],
    preview: "Day 1 of my period. Cramps woke me early...",
  },
  {
    id: "2",
    date: "April 7, 2025",
    time: "6:45 AM",
    text: "Woke up a few times last night with hot flushes — kicked the blanket off twice and felt clammy. A bit groggy this morning but a cool shower helped reset me.",
    mood: MOODS.Okay,
    tags: ["Hot flush", "Sleep"],
    preview: "Woke up a few times last night with hot flushes...",
  },
  {
    id: "3",
    date: "April 6, 2025",
    time: "5:30 PM",
    text: "Feeling bloated and my breasts are tender today — the usual signs my period is on its way. Loose clothes and skipping the extra salt seems to make it more bearable.",
    mood: MOODS.Low,
    tags: ["Bloating", "Breast tenderness"],
    preview: "Feeling bloated and my breasts are tender today...",
  },
  {
    id: "4",
    date: "April 5, 2025",
    time: "11:00 AM",
    text: "Mid-cycle and full of energy! Got through my whole to-do list, cooked a proper lunch, and even had the patience for a long call with Mum. Days like this feel wonderful.",
    mood: MOODS.Good,
    tags: ["Energy", "Mood"],
    preview: "Mid-cycle and full of energy! Got through my whole...",
  },
  {
    id: "5",
    date: "April 4, 2025",
    time: "7:15 PM",
    text: "Felt low and a little weepy for no clear reason this afternoon. I think it's my hormones shifting before my period. Was gentle with myself, rested, and reminded myself it usually passes.",
    mood: MOODS.Low,
    tags: ["Mood"],
    preview: "Felt low and a little weepy for no clear reason...",
  },
  {
    id: "6",
    date: "April 3, 2025",
    time: "8:00 AM",
    text: "Went for a brisk 30-minute walk before breakfast and feel so much better for it. My mood lifted and the stiffness eased off. Want to keep this up a few mornings a week.",
    mood: MOODS.Good,
    tags: ["Exercise", "Energy"],
    preview: "Went for a brisk 30-minute walk before breakfast...",
  },
]

const AI_SUMMARY =
  "This week your entries show a familiar pattern — bloating, tender breasts, and a dip in mood in the days before your period, easing once it began. Sleep was a little broken, partly from night-time hot flushes, and you noticed more energy mid-cycle and after your morning walks. Logging consistently like this makes these trends easier to spot. When you're ready, it could be worth sharing this with your nurse educator."

const QUICK_ACTIONS = [
  { id: "logged", label: "I logged", icon: PenLine, color: "#0072BC" },
  { id: "ate", label: "I ate", icon: Utensils, color: "#10b981" },
  { id: "felt", label: "I felt", icon: Heart, color: "#E6007E" },
  { id: "remembered", label: "I remembered", icon: Brain, color: "#8b5cf6" },
]

// --- Helpers ---

function MoodBadge({ mood }: { mood: DiaryEntry["mood"] }) {
  const Icon = mood.icon
  return (
    <span className={cn("inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full", mood.bg, mood.color)}>
      <Icon className="w-3.5 h-3.5" />
      {mood.label}
    </span>
  )
}

function MoodIcon({ mood, size = "md" }: { mood: DiaryEntry["mood"]; size?: "sm" | "md" }) {
  const Icon = mood.icon
  const sizeClass = size === "sm" ? "w-5 h-5" : "w-6 h-6"
  return <Icon className={cn(sizeClass, mood.color)} />
}

// --- Sub-screens ---

function NoteDetailScreen({
  entry,
  onBack,
}: {
  entry: DiaryEntry
  onBack: () => void
}) {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <div className="flex-1">
          <h2 className="text-sm font-semibold text-gray-900">{entry.date}</h2>
          <p className="text-xs text-gray-500">{entry.time}</p>
        </div>
        <MoodBadge mood={entry.mood} />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Entry content */}
        <Card className="shadow-sm border-0 bg-white rounded-xl">
          <CardContent className="pt-4">
            <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">{entry.text}</p>
          </CardContent>
        </Card>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {entry.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{
                backgroundColor: "var(--chip-bg-primary)",
                color: "var(--app-primary)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function NewEntryScreen({ onBack, onSave }: { onBack: () => void; onSave: (entry: DiaryEntry) => void }) {
  const [text, setText] = useState("")
  const [isRecording, setIsRecording] = useState(false)

  const handleMicClick = () => {
    if (isRecording) return
    setIsRecording(true)
    setTimeout(() => {
      setText(
        (prev) =>
          prev +
          (prev ? " " : "") +
          "Today I went for a walk in the park with my daughter. I felt good but had trouble remembering the route back. She helped me and we stopped for tea."
      )
      setIsRecording(false)
    }, 2000)
  }

  const handleQuickAction = (label: string) => {
    const starters: Record<string, string> = {
      "I logged": "I logged — ",
      "I ate": "I ate — ",
      "I felt": "I felt — ",
      "I remembered": "I remembered — ",
    }
    setText((prev) => prev + (prev ? "\n" : "") + (starters[label] || ""))
  }

  const handleSave = () => {
    if (!text.trim()) return
    const now = new Date()
    const newEntry: DiaryEntry = {
      id: String(Date.now()),
      date: now.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      time: now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }),
      text: text.trim(),
      mood: MOODS.Good,
      tags: ["New"],
      preview: text.trim().slice(0, 50) + (text.trim().length > 50 ? "..." : ""),
    }
    onSave(newEntry)
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <div className="flex-1">
          <h2 className="text-sm font-semibold text-gray-900">New Entry</h2>
          <p className="text-xs text-gray-500">
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
        </div>
        <Button
          size="sm"
          onClick={handleSave}
          disabled={!text.trim()}
          className="text-xs text-white rounded-lg h-8 px-4"
          style={{ backgroundColor: "var(--app-primary)" }}
        >
          <Send className="w-3.5 h-3.5 mr-1.5" />
          Save
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Quick Action Chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon
            return (
              <button
                key={action.id}
                onClick={() => handleQuickAction(action.label)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all whitespace-nowrap"
              >
                <Icon className="w-3.5 h-3.5" style={{ color: action.color }} />
                <span className="text-xs font-medium text-gray-700">{action.label}</span>
              </button>
            )
          })}
        </div>

        {/* Text Area */}
        <Card className="shadow-sm border-0 bg-white rounded-xl flex-1">
          <CardContent className="pt-4 pb-3">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="How are you feeling today? Note symptoms, mood, sleep…"
              className="w-full min-h-[200px] text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none resize-none leading-relaxed"
              autoFocus
            />
          </CardContent>
        </Card>

        {/* STT Button — prominent CTA */}
        <button
          onClick={handleMicClick}
          disabled={isRecording}
          className="w-full flex items-center justify-center gap-3 py-4 rounded-xl transition-all duration-300"
          style={{
            backgroundColor: isRecording ? "#E6007E" : "var(--icon-bg-primary)",
            border: isRecording ? "none" : "1px dashed var(--app-primary)",
          }}
        >
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-all",
              isRecording ? "bg-white/20 animate-pulse" : ""
            )}
            style={{
              backgroundColor: isRecording ? "rgba(255,255,255,0.2)" : "var(--app-primary)",
            }}
          >
            {isRecording ? (
              <MicOff className="w-5 h-5 text-white" />
            ) : (
              <Mic className="w-5 h-5 text-white" />
            )}
          </div>
          <div className="text-left">
            <p
              className="text-sm font-semibold"
              style={{ color: isRecording ? "white" : "var(--app-primary)" }}
            >
              {isRecording ? "Listening..." : "Tap to speak"}
            </p>
            <p
              className="text-xs"
              style={{ color: isRecording ? "rgba(255,255,255,0.8)" : "var(--text-secondary)" }}
            >
              {isRecording ? "Recording your voice" : "Dictate your diary entry"}
            </p>
          </div>
        </button>
      </div>
    </div>
  )
}

// --- Utility ---

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

// --- Main Screen ---

export function DiaryScreen({ onBack }: { onBack: () => void }) {
  const [entries, setEntries] = useState<DiaryEntry[]>(MOCK_ENTRIES)
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null)
  const [showNewEntry, setShowNewEntry] = useState(false)

  // Drill-down: note detail
  if (selectedEntry) {
    return <NoteDetailScreen entry={selectedEntry} onBack={() => setSelectedEntry(null)} />
  }

  // Drill-down: new entry
  if (showNewEntry) {
    return (
      <NewEntryScreen
        onBack={() => setShowNewEntry(false)}
        onSave={(entry) => {
          setEntries((prev) => [entry, ...prev])
          setShowNewEntry(false)
        }}
      />
    )
  }

  // Group entries by date
  const grouped: Record<string, DiaryEntry[]> = {}
  for (const entry of entries) {
    if (!grouped[entry.date]) grouped[entry.date] = []
    grouped[entry.date].push(entry)
  }

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-bold text-gray-900">Diary</h1>
            <p className="text-xs text-gray-500">Your daily journal</p>
          </div>
          <Button
            size="sm"
            onClick={() => setShowNewEntry(true)}
            className="text-xs text-white rounded-lg h-8 px-3"
            style={{ backgroundColor: "var(--app-primary)" }}
          >
            <Plus className="w-3.5 h-3.5 mr-1" />
            New Entry
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4 pb-8">
          {/* AI Summary Card — gradient oomph */}
          <div
            className="rounded-xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, var(--app-primary-hover), var(--app-primary), #b3005f)",
            }}
          >
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/20">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">AI Weekly Summary</h3>
                  <p className="text-[10px] text-white/70">Based on your recent entries</p>
                </div>
              </div>
              <p className="text-xs text-white/90 leading-relaxed">{AI_SUMMARY}</p>
            </div>
          </div>

          {/* How are you feeling today? */}
          <Card className="shadow-sm border-0 bg-white rounded-xl">
            <CardContent className="pt-3 pb-3">
              <p className="text-xs font-semibold text-gray-500 mb-2.5">How are you feeling today?</p>
              <div className="flex justify-between">
                {(Object.values(MOODS) as Array<{ icon: LucideIcon; label: string; color: string; bg: string }>).map((mood) => {
                  const Icon = mood.icon
                  return (
                    <button
                      key={mood.label}
                      onClick={() => setShowNewEntry(true)}
                      className={cn(
                        "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all hover:scale-105",
                        mood.bg
                      )}
                    >
                      <Icon className={cn("w-5 h-5", mood.color)} />
                      <span className={cn("text-[10px] font-medium", mood.color)}>{mood.label}</span>
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Entries grouped by date */}
          {Object.entries(grouped).map(([date, dateEntries]) => (
            <div key={date}>
              <div className="flex items-center gap-2 mb-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{date}</p>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
              <div className="space-y-2">
                {dateEntries.map((entry) => (
                  <button
                    key={entry.id}
                    onClick={() => setSelectedEntry(entry)}
                    className="w-full text-left bg-white rounded-xl px-3.5 py-3 shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-3 group"
                  >
                    {/* Mood indicator */}
                    <MoodIcon mood={entry.mood} size="sm" />

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[11px] text-gray-400 font-medium">{entry.time}</span>
                        {entry.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-medium px-1.5 py-0.5 rounded-full"
                            style={{
                              backgroundColor: "var(--chip-bg-primary)",
                              color: "var(--app-primary)",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-gray-800 truncate">{entry.preview}</p>
                    </div>

                    {/* Arrow */}
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
