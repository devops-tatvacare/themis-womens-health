"use client"
import { NotificationBell } from "@/components/ui/notification-bell"

interface HeroBannerProps {
  onAvatarClick: () => void
  onNotificationClick: () => void
  unreadCount: number
  logoSrc?: string
}

export function HeroBanner({
  onAvatarClick,
  onNotificationClick,
  unreadCount,
  logoSrc = "/images/themismedicare_logo.jpeg",
}: HeroBannerProps) {
  return (
    <div
      className="mx-0 mt-0 rounded-b-2xl relative overflow-hidden"
      style={{ backgroundColor: "var(--hero-bg-primary)" }}
    >
      {/* Static Floating Bubbles */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large bubbles */}
        <div
          className="absolute top-4 left-8 w-16 h-16 rounded-full opacity-20"
          style={{
            background: `linear-gradient(135deg, var(--app-primary), var(--app-primary-light))`,
          }}
        />
        <div
          className="absolute top-12 right-12 w-12 h-12 rounded-full opacity-25"
          style={{
            background: `linear-gradient(45deg, var(--icon-bg-primary), var(--app-primary))`,
          }}
        />

        {/* Medium bubbles */}
        <div
          className="absolute bottom-8 left-16 w-10 h-10 rounded-full opacity-30"
          style={{
            background: `linear-gradient(90deg, var(--app-primary-light), var(--icon-bg-secondary))`,
          }}
        />
        <div
          className="absolute top-20 left-1/3 w-8 h-8 rounded-full opacity-25"
          style={{
            background: `linear-gradient(180deg, var(--app-primary), var(--banner-bg-start))`,
          }}
        />
        <div
          className="absolute bottom-12 right-8 w-10 h-10 rounded-full opacity-20"
          style={{
            background: `linear-gradient(225deg, var(--icon-bg-primary), var(--app-primary-light))`,
          }}
        />

        {/* Small bubbles */}
        <div
          className="absolute top-16 right-20 w-6 h-6 rounded-full opacity-35"
          style={{
            background: `linear-gradient(315deg, var(--app-primary-light), var(--icon-bg-secondary))`,
          }}
        />
        <div
          className="absolute bottom-16 left-1/4 w-4 h-4 rounded-full opacity-30"
          style={{
            background: `linear-gradient(60deg, var(--app-primary), var(--banner-bg-end))`,
          }}
        />
        <div
          className="absolute top-24 right-1/3 w-6 h-6 rounded-full opacity-25"
          style={{
            background: `linear-gradient(120deg, var(--icon-bg-primary), var(--app-primary))`,
          }}
        />
      </div>

      {/* Avatar at top left corner */}
      <div className="absolute top-1.5 left-3 z-10">
        <button
          className="relative w-8 h-8 rounded-full shadow-md hover:shadow-lg transition-shadow border-2 border-white flex items-center justify-center"
          style={{ backgroundColor: "var(--app-primary)" }}
          onClick={onAvatarClick}
        >
          <span className="text-white font-medium text-xs">P</span>
        </button>
      </div>

      {/* Notifications icon at top right corner */}
      <div className="absolute top-1.5 right-3 z-10">
        <NotificationBell unreadCount={unreadCount} onClick={onNotificationClick} />
      </div>

      <div className="pt-8 px-4 pb-2">
        {/* Centered Logo */}
        <div className="flex justify-center mb-1.5">
          <img
            src="/images/themismedicare_logo.jpeg"
            alt="Themis Medicare"
            className="h-9 w-auto object-contain rounded"
          />
        </div>

        {/* Greeting Text - Centered */}
        <div className="text-center mb-2">
          <h1 className="text-base font-bold mb-0.5" style={{ color: "var(--hero-text-primary)" }}>
            Namaste, Priya!
          </h1>
          <p className="text-xs" style={{ color: "var(--hero-text-secondary)" }}>
            Welcome to your Women's Health program
          </p>
        </div>

        {/* Care Program Button */}
        <div className="flex justify-center">
          <button className="inline-flex items-center px-2.5 py-1 bg-white/90 hover:bg-white text-gray-800 text-xs font-medium rounded-md shadow-sm hover:shadow-md transition-all duration-200 border border-white/50">
            <span>View Care Program</span>
            <svg className="w-2.5 h-2.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
