"use client"

import { ScreenHeader } from "@/components/ui/screen-header"
import { NotificationItem } from "@/components/ui/notification-item"
import { Bell, CheckCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NotificationsScreenProps {
  isOpen: boolean
  onClose: () => void
  unreadNotifications: any[]
  readNotifications: any[]
  unreadCount: number
  onMarkRead: (id: number) => void
  onMarkAllRead: () => void
  onNotificationClick: (notification: any) => void
}

export function NotificationsScreen({
  isOpen,
  onClose,
  unreadNotifications,
  readNotifications,
  unreadCount,
  onMarkRead,
  onMarkAllRead,
  onNotificationClick,
}: NotificationsScreenProps) {
  if (!isOpen) return null

  const handleBackClick = () => {
    console.log("Notifications back button clicked")
    onClose()
  }

  const handleMarkAllRead = () => {
    console.log("Mark all read clicked")
    onMarkAllRead()
  }

  return (
    <div className="absolute inset-0 bg-[var(--bg-primary)] z-50 flex flex-col">
      <ScreenHeader title="Notifications" onBack={handleBackClick} />

      <div className="flex-1 overflow-y-auto relative">
        {unreadNotifications.length > 0 && (
          <Button
            onClick={handleMarkAllRead}
            variant="outline"
            size="sm"
            className="absolute top-4 right-4 z-10 bg-white shadow-sm"
          >
            <CheckCheck className="w-4 h-4 mr-2" />
            Mark All Read
          </Button>
        )}

        {unreadNotifications.length > 0 && (
          <div className="p-4">
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
              Unread ({unreadNotifications.length})
            </h2>
            <div className="space-y-3">
              {unreadNotifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkRead={onMarkRead}
                  onClick={onNotificationClick}
                />
              ))}
            </div>
          </div>
        )}

        {readNotifications.length > 0 && (
          <div className="p-4">
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">Read ({readNotifications.length})</h2>
            <div className="space-y-3">
              {readNotifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkRead={onMarkRead}
                  onClick={onNotificationClick}
                />
              ))}
            </div>
          </div>
        )}

        {unreadNotifications.length === 0 && readNotifications.length === 0 && (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center">
              <Bell className="w-16 h-16 text-[var(--text-muted)] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[var(--text-secondary)] mb-2">No Notifications</h3>
              <p className="text-sm text-[var(--text-muted)]">You're all caught up!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
