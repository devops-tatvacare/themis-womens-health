"use client"

import { Bell } from "lucide-react"

interface NotificationBellProps {
  unreadCount: number
  onClick: () => void
}

export function NotificationBell({ unreadCount, onClick }: NotificationBellProps) {
  return (
    <button
      onClick={onClick}
      className="relative p-2 bg-[var(--bg-primary)] rounded-full shadow-md hover:shadow-lg transition-shadow"
    >
      <Bell className="w-4 h-4 text-[var(--text-primary)]" />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {unreadCount > 9 ? "9+" : unreadCount}
        </span>
      )}
    </button>
  )
}
