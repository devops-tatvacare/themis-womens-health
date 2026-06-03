"use client"

import { useState } from "react"
import { MobileFrame } from "@/components/mobile-frame"
import { BottomNavigation } from "@/components/bottom-navigation"
import { HomeScreen } from "@/components/screens/home-screen"
import { DiaryScreen } from "@/components/screens/diary-screen"
import { InsightsScreen } from "@/components/insights/insights-screen"
import { HealthAssistantScreen } from "@/components/screens/health-assistant-screen"
import { CommunitiesScreen } from "@/components/screens/communities-screen"
import { ChatsScreen } from "@/components/screens/chats-screen"
import { ChatDetailScreen } from "@/components/screens/chat-detail-screen"
import { ToastProvider } from "@/lib/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { TabNavigation } from "@/components/tab-navigation"
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow"
import Image from "next/image"

interface Chat {
  id: string
  specialist: {
    name: string
    role: string
    avatar?: string
    isOnline: boolean
  }
  lastMessage: {
    content: string
    timestamp: string
    isFromUser: boolean
  }
  unreadCount: number
}

export default function HealthApp() {
  const [activeTab, setActiveTab] = useState("home")
  const [assistantInitialAction, setAssistantInitialAction] = useState<string | undefined>(undefined)
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)

  const handleNavigateToAssistant = (action: string) => {
    setAssistantInitialAction(action)
    setActiveTab("health-assistant")
  }

  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat)
  }

  const handleBackFromChat = () => {
    setSelectedChat(null)
  }

  const handleOnboardingComplete = () => {
    console.log("[v0] Onboarding completed")
    // Could navigate to app tab or show success message
  }

  const renderScreen = () => {
    // If a chat is selected, show full-screen chat
    if (selectedChat) {
      return <ChatDetailScreen chat={selectedChat} onBack={handleBackFromChat} />
    }

    switch (activeTab) {
      case "home":
        return <HomeScreen onTabChange={setActiveTab} onNavigateToAssistant={handleNavigateToAssistant} />
      case "diary":
        return <DiaryScreen onBack={() => setActiveTab("home")} />
      case "insights":
        return <InsightsScreen onNavigateToAssistant={handleNavigateToAssistant} />
      case "health-assistant":
        const screen = <HealthAssistantScreen initialAction={assistantInitialAction} />
        // Clear the initial action after rendering
        if (assistantInitialAction) {
          setTimeout(() => setAssistantInitialAction(undefined), 100)
        }
        return screen
      case "communities":
        return <CommunitiesScreen onBack={() => setActiveTab("home")} />
      case "chats":
        return <ChatsScreen onBack={() => setActiveTab("home")} onChatSelect={handleChatSelect} />
      default:
        return <HomeScreen onTabChange={setActiveTab} onNavigateToAssistant={handleNavigateToAssistant} />
    }
  }

  const renderTabContent = (projectTab: string) => {
    if (projectTab === "app") {
      // Existing app content
      return (
        <MobileFrame>
          <div className="flex flex-col h-full bg-gray-50">
            <div className="flex-1 overflow-hidden">{renderScreen()}</div>
            {/* Hide bottom navigation when in chat detail */}
            {!selectedChat && <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />}
            <Toaster />
          </div>
        </MobileFrame>
      )
    } else if (projectTab === "scan-qr") {
      return (
        <MobileFrame>
          <div className="relative w-full h-full bg-black overflow-hidden">
            <Image
              src="/images/qr-scanner-camera.png"
              alt="QR Scanner Camera Interface"
              fill
              className="object-cover"
              priority
            />
          </div>
        </MobileFrame>
      )
    } else if (projectTab === "website") {
      return (
        <MobileFrame>
          <div className="flex items-center justify-center w-full h-full bg-white">
            <Image
              src="/images/themismedicare_logo.jpeg"
              alt="Themis Medicare"
              width={200}
              height={80}
              className="object-contain"
              priority
            />
          </div>
        </MobileFrame>
      )
    } else if (projectTab === "onboarding") {
      return (
        <MobileFrame>
          <OnboardingFlow onComplete={handleOnboardingComplete} />
        </MobileFrame>
      )
    } else {
      // Empty mobile frame for other tabs
      return (
        <MobileFrame>
          <div className="flex flex-col h-full bg-gray-50 items-center justify-center">
            <p className="text-gray-400 text-sm">Content coming soon</p>
          </div>
        </MobileFrame>
      )
    }
  }

  return (
    <ToastProvider>
      <TabNavigation>{(projectTab) => renderTabContent(projectTab)}</TabNavigation>
    </ToastProvider>
  )
}
