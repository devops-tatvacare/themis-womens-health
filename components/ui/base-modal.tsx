"use client"

import type React from "react"

import { X } from "lucide-react"

interface BaseModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  actions?: React.ReactNode
}

export function BaseModal({ isOpen, onClose, title, children, actions }: BaseModalProps) {
  if (!isOpen) return null

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="mb-4">{children}</div>

        {actions && <div className="flex gap-3">{actions}</div>}
      </div>
    </div>
  )
}
