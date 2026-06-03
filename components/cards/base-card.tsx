"use client"

import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import type { BaseCardProps, CardColorScheme } from "@/lib/types/card-templates"
import { cn } from "@/lib/utils"

const defaultColorScheme: CardColorScheme = {
  headerBg: "bg-white",
  headerText: "text-[var(--text-primary)]",
  cardBg: "bg-white",
  contentText: "text-[var(--text-secondary)]",
  primaryButton: "bg-[var(--app-primary)] hover:bg-[var(--app-primary-hover)] text-white",
  secondaryButton:
    "border-2 border-[var(--app-primary)] text-[var(--app-primary)] bg-white hover:bg-[var(--app-primary)] hover:text-white",
  accent: "text-[var(--app-primary)]",
  border: "border-[var(--border-color)]",
}

export function BaseCard({ className, colorScheme = {}, header, children }: BaseCardProps) {
  const colors = { ...defaultColorScheme, ...colorScheme }

  return (
    <Card className={cn("shadow-sm border-0 rounded-xl overflow-hidden", colors.cardBg, colors.border, className)}>
      {header && (
        <CardHeader className={cn("px-4 pt-2 pb-1", colors.headerBg)}>
          <div className="flex items-center justify-between">
            <CardTitle className={cn("text-base font-semibold flex items-center gap-2", colors.headerText)}>
              {header.iconSrc ? (
                <img src={header.iconSrc || "/placeholder.svg"} alt="" className="w-4 h-4" />
              ) : header.icon ? (
                <header.icon className="w-4 h-4" />
              ) : null}
              <div>
                {header.title}
                {header.subtitle && (
                  <div className={cn("text-xs font-normal mt-0.5", colors.contentText)}>{header.subtitle}</div>
                )}
              </div>
            </CardTitle>
            <div className="flex items-center gap-1">
              {header.actions?.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant || "ghost"}
                  size="icon"
                  onClick={action.onClick}
                  className="hover:bg-gray-100 rounded-full transition-colors h-8 w-8"
                  title={action.label}
                >
                  <action.icon className="w-4 h-4 text-gray-400" />
                </Button>
              ))}
              {header.showNavigation && header.onNavigate && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={header.onNavigate}
                  className="hover:bg-gray-100 rounded-full transition-colors h-8 w-8"
                >
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
      )}
      <CardContent className={cn("px-4 pt-0 pb-2", colors.cardBg)}>{children}</CardContent>
    </Card>
  )
}
