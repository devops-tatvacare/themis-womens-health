"use client"

import type React from "react"
import { useState } from "react"
import { XMarkIcon } from "@heroicons/react/24/outline"

const InsightsScreen: React.FC = () => {
  const [showNotification, setShowNotification] = useState(true)

  const handleCloseNotification = () => {
    setShowNotification(false)
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Insights</h1>
        </div>
      </header>
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
              {/* Content goes here */}
              <p className="text-center text-gray-500 mt-20">Insights content will be displayed here.</p>
            </div>
          </div>
        </div>
      </main>

      {showNotification && (
        <div className="fixed bottom-20 left-4 right-4 z-[9999] bg-green-500 text-white py-3 px-5 rounded-md shadow-lg flex items-center justify-between">
          <span>New insights are available! Check them out.</span>
          <button onClick={handleCloseNotification} className="focus:outline-none">
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  )
}

export default InsightsScreen
