"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import type { CardVariant } from "@/lib/types/common"

interface UniversalCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: CardVariant["type"]
  padding?: CardVariant["padding"]
  className?: string
}

export function UniversalCard({
  children,
  variant = "default",
  padding = "md",
  className,
  ...props
}: UniversalCardProps) {
  const baseClasses = "app-card"

  const variantClasses = {
    default: "",
    elevated: "shadow-[var(--shadow-md)]",
    outlined: "border border-[var(--border-light)]",
    filled: "bg-[var(--bg-tertiary)]",
  }

  const paddingClasses = {
    sm: "p-[var(--space-2)]",
    md: "p-[var(--space-3)]",
    lg: "p-[var(--space-4)]",
  }

  return (
    <div className={cn(baseClasses, variantClasses[variant], paddingClasses[padding], className)} {...props}>
      {children}
    </div>
  )
}
