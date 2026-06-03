"use client"

import type React from "react"
import { ArrowLeft, Coins, Calendar, ShoppingBag, Stethoscope, Pill, Heart, Smartphone } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { HorizontalScroll } from "@/components/ui/horizontal-scroll"

interface WalletDetailScreenProps {
  onBack: () => void
}

interface WalletAction {
  id: string
  title: string
  icon: React.ReactNode
  description: string
  color: string
}

interface Transaction {
  id: string
  type: "earned" | "spent"
  amount: number
  description: string
  date: string
  category: string
}

const walletActions: WalletAction[] = [
  {
    id: "appointment",
    title: "Book Appointment",
    icon: <Stethoscope className="w-6 h-6" />,
    description: "Consult with specialists",
    color: "bg-gradient-to-br from-primary/10 to-primary/20 border border-primary/30",
  },
  {
    id: "care-products",
    title: "Buy Care Products",
    icon: <Heart className="w-6 h-6" />,
    description: "Health & wellness products",
    color: "bg-gradient-to-br from-primary/10 to-primary/20 border border-primary/30",
  },
  {
    id: "pharmacy",
    title: "Buy Pharmacy Drugs",
    icon: <Pill className="w-6 h-6" />,
    description: "Medicines & supplements",
    color: "bg-gradient-to-br from-primary/10 to-primary/20 border border-primary/30",
  },
  {
    id: "care-plans",
    title: "Buy Care Plans",
    icon: <ShoppingBag className="w-6 h-6" />,
    description: "Comprehensive care packages",
    color: "bg-gradient-to-br from-primary/10 to-primary/20 border border-primary/30",
  },
  {
    id: "devices",
    title: "Buy Devices",
    icon: <Smartphone className="w-6 h-6" />,
    description: "Health monitoring devices",
    color: "bg-gradient-to-br from-primary/10 to-primary/20 border border-primary/30",
  },
]

const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "earned",
    amount: 100,
    description: "Completed health assessment",
    date: "2024-01-15",
    category: "Assessment",
  },
  {
    id: "2",
    type: "spent",
    amount: 250,
    description: "Nutrition consultation",
    date: "2024-01-14",
    category: "Consultation",
  },
  {
    id: "3",
    type: "earned",
    amount: 50,
    description: "Daily check-in bonus",
    date: "2024-01-13",
    category: "Bonus",
  },
  {
    id: "4",
    type: "earned",
    amount: 200,
    description: "Completed care program milestone",
    date: "2024-01-12",
    category: "Milestone",
  },
]

export function WalletDetailScreen({ onBack }: WalletDetailScreenProps) {
  const handleActionClick = (actionId: string) => {
    // Handle different wallet actions
    console.log("Wallet action clicked:", actionId)
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="relative bg-primary text-white overflow-hidden">
        {/* Floating static bubbles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-4 left-8 w-3 h-3 bg-white/10 rounded-full"></div>
          <div className="absolute top-12 right-12 w-4 h-4 bg-white/15 rounded-full"></div>
          <div className="absolute top-20 left-16 w-2 h-2 bg-white/8 rounded-full"></div>
          <div className="absolute top-6 right-20 w-5 h-5 bg-white/12 rounded-full"></div>
          <div className="absolute top-16 left-4 w-2.5 h-2.5 bg-white/10 rounded-full"></div>
          <div className="absolute top-8 right-6 w-3.5 h-3.5 bg-white/8 rounded-full"></div>
          <div className="absolute top-24 right-16 w-2 h-2 bg-white/15 rounded-full"></div>
          <div className="absolute top-14 left-12 w-4.5 h-4.5 bg-white/12 rounded-full"></div>
        </div>
        <div className="relative z-10 flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-3">
            <ArrowLeft className="w-5 h-5 cursor-pointer" onClick={onBack} />
            <h1 className="text-lg font-semibold">Your Wallet</h1>
          </div>
        </div>

        {/* Coin Balance */}
        <div className="relative z-10 px-4 pb-6">
          <div className="flex items-center gap-2 mb-2">
            <Coins className="w-6 h-6" />
            <span className="text-sm opacity-90">Available Balance</span>
          </div>
          <div className="text-3xl font-bold">1000 Coins</div>
          <div className="text-sm opacity-80">= ₹1,000</div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Put your coins to use section */}
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Put your coins to use</h2>

          <HorizontalScroll className="pb-4">
            <div className="flex gap-4">
              {walletActions.map((action) => (
                <Card
                  key={action.id}
                  className="min-w-[160px] cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleActionClick(action.id)}
                >
                  <CardContent className="p-4 text-center">
                    <div
                      className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center text-primary mx-auto mb-3`}
                    >
                      {action.icon}
                    </div>
                    <h3 className="font-medium text-sm text-gray-900 mb-1">{action.title}</h3>
                    <p className="text-xs text-gray-600">{action.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </HorizontalScroll>
        </div>

        {/* Transaction History section */}
        <div className="px-4 pb-4">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Transaction History</h2>

          <div className="space-y-2">
            {mockTransactions.map((transaction) => (
              <Card
                key={transaction.id}
                className="border border-[var(--border-color)] bg-[var(--bg-primary)] shadow-sm hover:shadow-md transition-shadow"
              >
                <CardContent className="p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-primary/10 to-primary/20 border border-primary/30">
                        {transaction.type === "earned" ? (
                          <Coins className="w-4 h-4 text-primary" />
                        ) : (
                          <ShoppingBag className="w-4 h-4 text-primary" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-[var(--text-primary)] truncate">
                          {transaction.description}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mt-1">
                          <Calendar className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{new Date(transaction.date).toLocaleDateString()}</span>
                          <span className="flex-shrink-0">•</span>
                          <span className="truncate">{transaction.category}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div
                        className={`font-semibold text-sm ${
                          transaction.type === "earned" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {transaction.type === "earned" ? "+" : "-"}
                        {transaction.amount}
                      </div>
                      <div className="text-xs text-[var(--text-muted)]">coins</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
