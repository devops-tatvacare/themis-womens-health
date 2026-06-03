"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wallet, ChevronRight, Coins } from "lucide-react"

interface WalletCardProps {
  onWalletClick: () => void
}

export function WalletCard({ onWalletClick }: WalletCardProps) {
  return (
    <Card className="shadow-sm border-0 bg-primary text-white rounded-xl overflow-hidden relative min-h-[140px]">
      {/* Floating Static Bubbles Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-2 left-4 w-2 h-2 bg-white/10 rounded-full"></div>
        <div className="absolute top-6 right-8 w-3 h-3 bg-white/15 rounded-full"></div>
        <div className="absolute bottom-8 left-8 w-4 h-4 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-4 right-4 w-2.5 h-2.5 bg-white/8 rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-6 h-6 bg-white/12 rounded-full"></div>
        <div className="absolute top-3 right-1/4 w-3.5 h-3.5 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-6 left-1/4 w-2 h-2 bg-white/15 rounded-full"></div>
        <div className="absolute top-1/3 right-6 w-5 h-5 bg-white/8 rounded-full"></div>
      </div>

      <CardContent className="pt-3 pb-6 relative z-10">
        {/* Header */}
        <div className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              <h3 className="text-lg font-semibold">My Wallet</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-white/10 rounded-full transition-colors h-8 w-8 text-white"
              onClick={onWalletClick}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 border-2 border-dashed border-white/30 rounded-lg bg-white/5">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-3xl font-bold mb-3">
              <Coins className="w-8 h-8" />
              <span>2,450 Coins</span>
            </div>
            <p className="text-white/90 text-sm leading-relaxed">Available balance for consultations and lab tests</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
