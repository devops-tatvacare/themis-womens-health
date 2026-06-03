"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Activity, Zap } from "lucide-react"

interface QuickActionsCardProps {
  onCheckQualityOfLife: () => void
}

export function QuickActionsCard({ onCheckQualityOfLife }: QuickActionsCardProps) {
  return (
    <Card className="shadow-sm border-0 bg-white rounded-xl overflow-hidden">
      <CardHeader className="px-3 py-2 border-b border-gray-100">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 text-[#000000]">
          <div className="w-6 h-6 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
            <Zap className="w-3.5 h-3.5 text-amber-600" />
          </div>
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3 py-2">
        <div className="py-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "var(--icon-bg-primary)" }}
              >
                <Activity className="w-3.5 h-3.5" style={{ color: "var(--app-primary)" }} />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 text-sm">Log Today</h4>
                <p className="text-xs text-gray-500">Track flow, symptoms, mood & sleep</p>
              </div>
            </div>
            <Button size="sm" onClick={onCheckQualityOfLife} className="h-7 px-3 text-xs font-medium">
              Start
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
