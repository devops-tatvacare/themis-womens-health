"use client"

import { Home, PieChart, Sparkles, BookOpen, MessageCircle } from "lucide-react"

interface BottomNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "diary", label: "Diary", icon: BookOpen },
    { id: "health-assistant", label: "Kaira", icon: Sparkles },
    { id: "insights", label: "Insights", icon: PieChart },
    { id: "chats", label: "Chats", icon: MessageCircle },
  ]

  return (
    <div className="bg-white border-t border-gray-200 px-2 py-2 flex-shrink-0 relative">
      <div className="flex justify-around">
        {tabs.map((tab) => {
          const IconComponent = tab.icon
          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-all duration-300 min-w-0 flex-1 relative"
            >
              {tab.id === "health-assistant" ? (
                <div
                  className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-br from-[var(--app-primary-light)] via-[var(--app-primary)] to-[var(--app-primary-dark)] shadow-lg shadow-primary/30 scale-110"
                      : "bg-gradient-to-br from-primary/10 via-primary/5 to-primary/5 border-2 border-primary/30 hover:border-primary/50 hover:shadow-md"
                  }`}
                >
                  <IconComponent
                    className={`w-5 h-5 transition-colors ${isActive ? "text-white drop-shadow-sm" : "text-primary"}`}
                  />
                  {isActive && (
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--app-primary-light)]/20 via-[var(--app-primary)]/20 to-[var(--app-primary-dark)]/20 animate-pulse" />
                  )}
                </div>
              ) : (
                <IconComponent
                  className={`w-6 h-6 transition-colors ${isActive ? "text-[var(--app-primary)]" : "text-gray-500"}`}
                />
              )}
              {tab.id !== "health-assistant" && (
                <span
                  className={`text-xs font-medium text-center leading-tight transition-colors mt-1 ${
                    isActive ? "text-[var(--app-primary)]" : "text-gray-500"
                  }`}
                >
                  {tab.label}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
