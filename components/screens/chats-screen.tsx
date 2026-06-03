"use client"

import { useState } from "react"
import { Search, MessageCircle, Video, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScreenHeader } from "@/components/ui/screen-header"

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
  appointments?: Array<{
    id: string
    doctorName: string
    date: string
    time: string
    duration: number
    type: "video" | "phone"
    status: "scheduled" | "active" | "completed" | "cancelled"
  }>
}

interface ChatsScreenProps {
  onChatSelect: (chat: Chat) => void
}

export function ChatsScreen({ onChatSelect }: ChatsScreenProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const chats: Chat[] = [
    {
      id: "1",
      specialist: {
        name: "Dr. Meera Sharma",
        role: "Gynaecologist",
        avatar: "/placeholder.svg?height=40&width=40",
        isOnline: true,
      },
      lastMessage: {
        content: "Your hormone panel looks stable on the current HRT dose. Let's review your symptoms at our next visit.",
        timestamp: "2 min ago",
        isFromUser: false,
      },
      unreadCount: 0,
      appointments: [
        {
          id: "1",
          doctorName: "Dr. Meera Sharma",
          date: new Date().toISOString().split("T")[0],
          time: "15:30",
          duration: 30,
          type: "video",
          status: "scheduled",
        },
      ],
    },
    {
      id: "2",
      specialist: {
        name: "Anjali Verma",
        role: "Nurse Educator",
        avatar: "/placeholder.svg?height=40&width=40",
        isOnline: true,
      },
      lastMessage: {
        content: "Your iron levels are improving since we started the supplements. Keep taking them with vitamin C.",
        timestamp: "45 min ago",
        isFromUser: false,
      },
      unreadCount: 1,
    },
    {
      id: "3",
      specialist: {
        name: "Priya Nair",
        role: "Women's Health Coach",
        avatar: "/placeholder.svg?height=40&width=40",
        isOnline: false,
      },
      lastMessage: {
        content: "I've updated your plan — more protein and calcium at breakfast to support energy through your cycle.",
        timestamp: "2 hours ago",
        isFromUser: false,
      },
      unreadCount: 2,
    },
    {
      id: "4",
      specialist: {
        name: "Dr. Vikram Desai",
        role: "General Practitioner",
        avatar: "/placeholder.svg?height=40&width=40",
        isOnline: true,
      },
      lastMessage: {
        content: "Blood pressure readings look stable. Continue with the current regimen.",
        timestamp: "5 hours ago",
        isFromUser: false,
      },
      unreadCount: 0,
    },
    {
      id: "5",
      specialist: {
        name: "Dr. Kavita Joshi",
        role: "Gynaecologist",
        avatar: "/placeholder.svg?height=40&width=40",
        isOnline: false,
      },
      lastMessage: {
        content: "Your hot flushes have reduced since we adjusted your plan. The symptom tracking is really helping.",
        timestamp: "Yesterday",
        isFromUser: false,
      },
      unreadCount: 0,
    },
    {
      id: "6",
      specialist: {
        name: "Sanya Kapoor",
        role: "Women's Health Coach",
        avatar: "/placeholder.svg?height=40&width=40",
        isOnline: false,
      },
      lastMessage: {
        content: "Great job logging consistently! You've tracked your cycle and sleep every day this week.",
        timestamp: "Yesterday",
        isFromUser: false,
      },
      unreadCount: 1,
    },
  ]

  const filteredChats = chats.filter(
    (chat) =>
      chat.specialist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.specialist.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.content.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getUpcomingAppointment = (chat: Chat) => {
    if (!chat.appointments) return null

    const today = new Date().toISOString().split("T")[0]
    return chat.appointments.find((apt) => apt.date === today && apt.status === "scheduled")
  }

  const getTimeUntilAppointment = (appointment: any) => {
    const now = new Date()
    const [appointmentHours, minutes] = appointment.time.split(":").map(Number)
    const appointmentTime = new Date()
    appointmentTime.setHours(appointmentHours, minutes, 0, 0)

    const diffMs = appointmentTime.getTime() - now.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))

    if (diffMins <= 0) return "Starting soon"
    if (diffMins < 60) return `${diffMins} min`

    const hours = Math.floor(diffMins / 60)
    const mins = diffMins % 60
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
  }

  return (
    <div className="flex flex-col h-full bg-[var(--bg-primary)]">
      <ScreenHeader title="Chats" />

      {/* Search Bar */}
      <div className="px-4 py-4 border-b border-[var(--border-color)]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
          <Input
            placeholder="Search specialists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-[var(--bg-secondary)] border-0 rounded-xl text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.length > 0 ? (
          filteredChats.map((chat) => {
            const upcomingAppointment = getUpcomingAppointment(chat)

            return (
              <div
                key={chat.id}
                className="flex items-center gap-3 p-4 hover:bg-[var(--bg-secondary)] cursor-pointer border-b border-[var(--border-color)] transition-colors"
                onClick={() => onChatSelect(chat)}
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={chat.specialist.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-[var(--accent-primary)] text-white font-medium">
                      {chat.specialist.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {chat.specialist.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>

                {/* Chat Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-[var(--text-primary)] truncate">{chat.specialist.name}</h3>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] truncate mb-1">{chat.lastMessage.content}</p>

                  {/* Appointment Indicator */}
                  {upcomingAppointment && (
                    <div className="flex items-center gap-1 mt-1 flex-wrap">
                      <div className="flex items-center gap-1">
                        <Video className="w-3 h-3 text-blue-600" />
                        <span className="text-xs text-blue-600 font-medium whitespace-nowrap">
                          Video call at {upcomingAppointment.time}
                        </span>
                        <Clock className="w-3 h-3 text-blue-600 ml-1" />
                        <span className="text-xs text-blue-600 whitespace-nowrap">
                          {getTimeUntilAppointment(upcomingAppointment)}
                        </span>
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-[var(--text-muted)] mt-1">{chat.specialist.role}</p>
                </div>

                {/* Time and Badge */}
                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs text-[var(--text-muted)]">{chat.lastMessage.timestamp}</span>
                  {chat.unreadCount > 0 && (
                    <span className="bg-[var(--accent-primary)] text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            )
          })
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <MessageCircle className="w-12 h-12 text-[var(--text-muted)] mb-4" />
            <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2">No chats found</h3>
            <p className="text-[var(--text-secondary)]">Try adjusting your search terms</p>
          </div>
        )}
      </div>
    </div>
  )
}
