"use client"

import { useState, type ReactNode } from "react"

interface TabNavigationProps {
  children: (activeProjectTab: string) => ReactNode
}

export function TabNavigation({ children }: TabNavigationProps) {
  const [activeProjectTab, setActiveProjectTab] = useState("app")

  const tabs = [
    { id: "scan-qr", label: "Scan QR" },
    { id: "website", label: "Website" },
    { id: "onboarding", label: "Onboarding" },
    { id: "app", label: "App" },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Tab Navigation Bar */}
      <div className="flex justify-center items-center py-6 px-4 bg-gray-100">
        <div className="inline-flex items-center gap-2 bg-white rounded-full p-1.5 shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveProjectTab(tab.id)}
              className={`
                px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200
                ${
                  activeProjectTab === tab.id
                    ? "bg-gray-900 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex items-center justify-center py-8 px-4">{children(activeProjectTab)}</div>
    </div>
  )
}
