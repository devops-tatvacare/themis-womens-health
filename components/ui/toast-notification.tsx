"use client"

import { CheckCircle, XCircle } from "lucide-react"

interface ToastNotificationProps {
  message: string
  type: "success" | "error"
  onClose: () => void
}

export function ToastNotification({ message, type, onClose }: ToastNotificationProps) {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999] pointer-events-none">
      <div
        className={`flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg backdrop-blur-sm pointer-events-auto animate-in slide-in-from-top-2 duration-300 ${
          type === "success"
            ? "bg-green-50 text-[var(--status-success)] border border-green-200"
            : "bg-red-50 text-[var(--status-error)] border border-red-200"
        }`}
      >
        {type === "success" ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
        <span className="text-sm font-medium">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 p-1 hover:bg-black hover:bg-opacity-10 rounded-full transition-colors"
        >
          <XCircle className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
