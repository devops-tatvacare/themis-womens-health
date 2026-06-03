"use client"

import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, TestTube, Pill, Calendar, ShoppingCart, Leaf } from "lucide-react"
import { HorizontalScroll } from "@/components/ui/horizontal-scroll"

interface UnifiedStoreCardProps {
  onNavigate: () => void
}

const STORE_CATEGORIES = [
  {
    id: "lab-tests",
    name: "Lab Tests",
    icon: TestTube,
    color: "text-[var(--app-primary)]",
    bgColor: "bg-[var(--bg-secondary)]",
  },
  {
    id: "pharmacy",
    name: "Pharmacy",
    icon: Pill,
    color: "text-[var(--app-primary)]",
    bgColor: "bg-[var(--bg-secondary)]",
  },
  {
    id: "care-plans",
    name: "Care Plans",
    icon: Calendar,
    color: "text-[var(--app-primary)]",
    bgColor: "bg-[var(--bg-secondary)]",
  },
  {
    id: "care-products",
    name: "Care Products",
    icon: ShoppingCart,
    color: "text-[var(--app-primary)]",
    bgColor: "bg-[var(--bg-secondary)]",
  },
  {
    id: "nutraceuticals",
    name: "Nutraceuticals",
    icon: Leaf,
    color: "text-[var(--app-primary)]",
    bgColor: "bg-[var(--bg-secondary)]",
  },
]

export function UnifiedStoreCard({ onNavigate }: UnifiedStoreCardProps) {
  return (
    <Card className="shadow-sm border-0 bg-white rounded-xl overflow-hidden">
      <div className="px-4 pt-3 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold flex items-center gap-2 text-[#000000]">
            <ShoppingCart className="w-4 h-4 text-gray-700" />
            Health Store
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gray-100 rounded-full transition-colors h-8 w-8"
            onClick={onNavigate}
          >
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </Button>
        </div>
      </div>
      <CardContent className="px-4 pt-0 pb-3">
        <p className="text-sm text-gray-600 mb-2">Everything you need for your health journey</p>
        <HorizontalScroll>
          {STORE_CATEGORIES.map((category) => {
            const IconComponent = category.icon
            return (
              <div key={category.id} className="flex-shrink-0 w-32 text-center">
                <div className={`${category.bgColor} p-3 rounded-xl mb-2 border border-gray-100`}>
                  <IconComponent className={`w-6 h-6 ${category.color} mx-auto mb-1.5`} />
                  <h3 className="font-semibold text-sm text-gray-800">{category.name}</h3>
                </div>
              </div>
            )
          })}
        </HorizontalScroll>
      </CardContent>
    </Card>
  )
}
