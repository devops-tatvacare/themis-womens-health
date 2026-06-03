"use client"

import type React from "react"
import { ContentContainer } from "@/components/ui/content-container"
import { ScreenHeader } from "@/components/ui/screen-header"

interface ScreenLayoutProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  onBack?: () => void
  actions?: React.ReactNode
  rightElement?: React.ReactNode
  className?: string
  contentSpacing?: "none" | "sm" | "md" | "lg"
  contentPadding?: "none" | "sm" | "md" | "lg"
}

export function ScreenLayout({
  children,
  title,
  subtitle,
  onBack,
  actions,
  rightElement,
  className,
  contentSpacing = "md",
  contentPadding = "md",
}: ScreenLayoutProps) {
  return (
    <div className="flex flex-col h-full">
      {(title || onBack || actions || rightElement) && (
        <ScreenHeader title={title} subtitle={subtitle} onBack={onBack} rightElement={actions || rightElement} />
      )}

      <ContentContainer className={className} spacing={contentSpacing} padding={contentPadding}>
        {children}
      </ContentContainer>
    </div>
  )
}
