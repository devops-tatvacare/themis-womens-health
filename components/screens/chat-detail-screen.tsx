"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ChevronLeft, Send, Video, Calendar, Clock, Paperclip } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Message {
  id: string
  content: string
  isFromUser: boolean
  timestamp: string
}

interface Appointment {
  id: string
  doctorName: string
  date: string
  time: string
  duration: number
  type: "video" | "phone"
  status: "scheduled" | "active" | "completed" | "cancelled"
}

interface Chat {
  id: string
  specialist: {
    name: string
    role: string
    avatar?: string
    isOnline: boolean
  }
  lastMessage: {
    content: string
    timestamp: string
    isFromUser: boolean
  }
  unreadCount: number
  appointments?: Appointment[]
}

interface ChatDetailScreenProps {
  chat: Chat
  onBack: () => void
}

export function ChatDetailScreen({ chat, onBack }: ChatDetailScreenProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! How are you feeling today?",
      isFromUser: false,
      timestamp: "10:30 AM",
    },
    {
      id: "2",
      content: "I'm doing much better, thank you for asking. The new medication seems to be helping.",
      isFromUser: true,
      timestamp: "10:32 AM",
    },
    {
      id: "3",
      content:
        "That's wonderful to hear! Keep taking the medication as prescribed and let me know if you experience any side effects.",
      isFromUser: false,
      timestamp: "10:35 AM",
    },
    {
      id: "4",
      content: "Will do. I have some questions about my diet plan that I'd like to discuss during our video call.",
      isFromUser: true,
      timestamp: "10:37 AM",
    },
    {
      id: "5",
      content: "Perfect! We can go over everything in detail during our scheduled consultation today at 3:30 PM.",
      isFromUser: false,
      timestamp: "10:40 AM",
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        content: newMessage,
        isFromUser: true,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages([...messages, message])
      setNewMessage("")

      // Simulate specialist response
      setTimeout(() => {
        const response: Message = {
          id: (Date.now() + 1).toString(),
          content: "Thank you for your message. I'll get back to you shortly.",
          isFromUser: false,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }
        setMessages((prev) => [...prev, response])
      }, 2000)
    }
  }

  const getUpcomingAppointment = () => {
    if (!chat.appointments) return null

    const today = new Date().toISOString().split("T")[0]
    return chat.appointments.find((apt) => apt.date === today && apt.status === "scheduled")
  }

  const isAppointmentActive = (appointment: Appointment) => {
    const now = new Date()
    const [appointmentHours, appointmentMinutes] = appointment.time.split(":").map(Number)
    const appointmentStart = new Date()
    appointmentStart.setHours(appointmentHours, appointmentMinutes, 0, 0)

    const appointmentEnd = new Date(appointmentStart)
    appointmentEnd.setMinutes(appointmentEnd.getMinutes() + appointment.duration)

    return now >= appointmentStart && now <= appointmentEnd
  }

  const getTimeUntilAppointment = (appointment: Appointment) => {
    const now = new Date()
    const [appointmentHours, appointmentMinutes] = appointment.time.split(":").map(Number)
    const appointmentTime = new Date()
    appointmentTime.setHours(appointmentHours, appointmentMinutes, 0, 0)

    const diffMs = appointmentTime.getTime() - now.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))

    if (diffMins <= 0) return null
    if (diffMins < 60) return `${diffMins} minutes`

    const hours = Math.floor(diffMins / 60)
    const mins = diffMins % 60
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      // You can add file upload logic here
      console.log("Selected file:", file.name)
    }
  }

  const upcomingAppointment = getUpcomingAppointment()
  const isVideoCallActive = upcomingAppointment ? isAppointmentActive(upcomingAppointment) : false
  const timeUntilAppointment = upcomingAppointment ? getTimeUntilAppointment(upcomingAppointment) : null

  const handleJoinVideoCall = () => {
    if (isVideoCallActive) {
      // Implement video call joining logic
      alert("Joining video consultation...")
    }
  }

  return (
    <div className="flex flex-col h-full bg-[var(--bg-primary)]">
      {/* Header */}
      <div className="bg-[var(--bg-primary)] border-b border-[var(--border-color)] px-4 py-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-1 hover:bg-[var(--bg-secondary)] rounded-full transition-colors">
              <ChevronLeft className="w-5 h-5 text-[var(--text-secondary)]" />
            </button>
            <Avatar className="w-10 h-10">
              <AvatarImage src={chat.specialist.avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-[var(--accent-primary)] text-white font-medium">
                {chat.specialist.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-[var(--text-primary)]">{chat.specialist.name}</h3>
              <p className="text-sm text-[var(--text-secondary)]">{chat.specialist.isOnline ? "Online" : "Offline"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Notification */}
      {upcomingAppointment && (
        <div className="bg-blue-50 border-b border-blue-200 px-4 py-3 flex-shrink-0">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Upcoming Video Consultation</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-blue-700">
                Today at {upcomingAppointment.time}
                {timeUntilAppointment && ` (in ${timeUntilAppointment})`}
                {isVideoCallActive && " - Active Now"}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.isFromUser ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                message.isFromUser
                  ? "bg-[var(--accent-primary)] text-white"
                  : "bg-[var(--bg-secondary)] text-[var(--text-primary)]"
              }`}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
              <p className={`text-xs mt-1 ${message.isFromUser ? "text-white/70" : "text-[var(--text-muted)]"}`}>
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Video Call Button */}
      {upcomingAppointment && (
        <div className="px-4 py-2 border-t border-[var(--border-color)] flex-shrink-0">
          <Button
            onClick={handleJoinVideoCall}
            disabled={!isVideoCallActive}
            className={`w-full flex items-center justify-center gap-2 ${
              isVideoCallActive
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <Video className="w-4 h-4" />
            {isVideoCallActive ? "Join Video Call" : `Video Call Available at ${upcomingAppointment.time}`}
          </Button>
        </div>
      )}

      {/* Message Input */}
      <div className="bg-[var(--bg-primary)] border-t border-[var(--border-color)] p-4 flex-shrink-0">
        <div className="flex gap-2">
          <div className="relative">
            <input
              type="file"
              id="file-input"
              className="hidden"
              accept="image/*,.pdf,.doc,.docx"
              onChange={handleFileSelect}
            />
            <Button
              onClick={() => document.getElementById("file-input")?.click()}
              size="sm"
              variant="outline"
              className="bg-[var(--bg-secondary)] border-[var(--border-color)] hover:bg-[var(--bg-tertiary)] rounded-full px-3"
            >
              <Paperclip className="w-4 h-4 text-[var(--text-secondary)]" />
            </Button>
          </div>
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 bg-[var(--bg-secondary)] border-0 rounded-full px-4"
          />
          <Button
            onClick={handleSendMessage}
            size="sm"
            className="bg-[var(--accent-primary)] hover:bg-[var(--accent-secondary)] text-white rounded-full px-4"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        {selectedFile && (
          <div className="mt-2 p-2 bg-[var(--bg-secondary)] rounded-lg flex items-center justify-between">
            <span className="text-sm text-[var(--text-primary)]">{selectedFile.name}</span>
            <Button
              onClick={() => setSelectedFile(null)}
              size="sm"
              variant="ghost"
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              ×
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
