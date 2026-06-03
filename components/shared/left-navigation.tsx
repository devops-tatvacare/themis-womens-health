"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { X, CreditCard, User, FileText } from "lucide-react"

interface LeftNavigationProps {
  isOpen: boolean
  onClose: () => void
  onDeviceManagement?: () => void
  onRecords?: () => void
}

export function LeftNavigation({ isOpen, onClose, onDeviceManagement, onRecords }: LeftNavigationProps) {
  if (!isOpen) return null

  return (
    <div className="absolute inset-0 z-50">
      {/* Backdrop */}
      <div className="absolute left-0 right-0 top-11 bottom-0 bg-black bg-opacity-50" onClick={onClose} />

      {/* Sidebar */}
      <div className="absolute left-0 top-11 bottom-0 w-64 bg-white shadow-xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12 border-2 border-gray-200">
                <AvatarFallback className="bg-[var(--app-primary)] text-white font-medium">K</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-[var(--text-primary)]">Kumar</h3>
                <p className="text-sm text-[var(--text-secondary)]">Welcome back!</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-5 h-5 text-[var(--text-secondary)]" />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="space-y-2">
            <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
              <CreditCard className="w-5 h-5 text-[var(--app-primary)]" />
              <span className="font-medium text-[var(--text-primary)]">Wallet</span>
            </button>
            <button
              className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
              onClick={onRecords}
            >
              <FileText className="w-5 h-5 text-[var(--app-primary)]" />
              <span className="font-medium text-[var(--text-primary)]">My Profile</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
              <User className="w-5 h-5 text-[var(--app-primary)]" />
              <span className="font-medium text-[var(--text-primary)]">Profile</span>
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}
