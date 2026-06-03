"use client"

import { useState } from "react"
import {
  Calendar as CalendarIcon,
  CalendarHeart,
  ClipboardCheck,
  ClipboardList,
  UserRound,
  Stethoscope,
  Phone,
  X,
  ChevronRight,
} from "lucide-react"
import { Watch } from "lucide-react"
import { MenstrualDetailScreen } from "@/components/insights/menstrual-detail-screen"
import { useMenstrualData } from "@/lib/hooks/use-insights-data"
import { useNotifications } from "@/lib/hooks/use-notifications"
import { SPECIALISTS } from "@/lib/constants/data"
import { HeroBanner } from "@/components/home/hero-banner"
import { WalletCard } from "@/components/home/wallet-card"
import { LeftNavigation } from "@/components/shared/left-navigation"
import { NotificationsScreen } from "@/components/shared/notifications-screen"
import { HealthProgressOverviewCard } from "@/components/cards/health-progress-overview-card"
import { TreatmentJourneyCard } from "@/components/cards/treatment-journey-card"
import { DeviceManagementScreen } from "@/components/screens/device-management-screen"
import { SpecialistListView } from "./specialist-list-view"
import { ProgramOverviewScreen } from "./program-overview-screen"
import { BookConsultationScreenNew } from "@/components/screens/book-consultation-screen-new"
import { WalletDetailScreen } from "@/components/screens/wallet-detail-screen"
import { InsightsScreen } from "@/components/insights/insights-screen"
import { RecordsScreen } from "@/components/screens/records-screen"
import { ChatsScreen } from "@/components/screens/chats-screen"
import { ChatDetailScreen } from "@/components/screens/chat-detail-screen"
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { EducationCard } from "@/components/cards/education-card"
import { EducationArticlesScreen } from "@/components/screens/education-articles-screen"
import { UploadVideoScreen } from "@/components/screens/upload-video-screen"
import { QuickActionsCard } from "@/components/cards/quick-actions-card"
import { TreatmentJourneyDetailScreen } from "@/components/screens/treatment-journey-detail-screen"
import { CycleDetailScreen } from "@/components/screens/cycle-detail-screen"
import type { CycleData } from "@/lib/types"
import { ClinicalAppointmentsScreen } from "@/components/screens/clinical-appointments-screen"
import { DevicesOverlay } from "@/components/overlays/devices-overlay"
import { DosageCalendarOverlay } from "@/components/overlays/dosage-calendar-overlay"

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
  appointments?: Array<{
    id: string
    doctorName: string
    date: string
    time: string
    duration: number
    type: "video" | "phone"
    status: "scheduled" | "active" | "completed" | "cancelled"
  }>
}

export function HomeScreen({
  onTabChange,
  onNavigateToAssistant,
}: { onTabChange?: (tab: string) => void; onNavigateToAssistant?: (action: string) => void }) {
  const [showLeftNav, setShowLeftNav] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showDeviceManagement, setShowDeviceManagement] = useState(false)
  const [showDevicesOverlay, setShowDevicesOverlay] = useState(false)
  const [showDosageCalendar, setShowDosageCalendar] = useState(false)
  const [showSpecialistList, setShowSpecialistList] = useState(false)
  const [showProgramOverview, setShowProgramOverview] = useState(false)
  const [showConsultation, setShowConsultation] = useState(false)
  const [showWalletDetail, setShowWalletDetail] = useState(false)
  const [showInsights, setShowInsights] = useState(false)
  const [showRecords, setShowRecords] = useState(false)
  const [showChats, setShowChats] = useState(false)
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)
  const [selectedSpecialist, setSelectedSpecialist] = useState<any>(null)
  const [showAppointmentChat, setShowAppointmentChat] = useState(false)
  const [showCareProgram, setShowCareProgram] = useState(false)
  const [careProgramView, setCareProgramView] = useState<"main" | "treatment-journey">("main")
  const [currentSpecialistIndex, setCurrentSpecialistIndex] = useState(0)
  const [showEducationArticles, setShowEducationArticles] = useState(false)
  const [showUploadVideo, setShowUploadVideo] = useState(false)
  const [showTreatmentJourneyDetail, setShowTreatmentJourneyDetail] = useState(false)
  const [showCycleDetail, setShowCycleDetail] = useState(false)
  const [selectedCycle, setSelectedCycle] = useState<CycleData | null>(null)
  const [showClinicalAppointments, setShowClinicalAppointments] = useState(false)
  const [showTelecounselorCall, setShowTelecounselorCall] = useState(false)
  const [showMenstrualDetail, setShowMenstrualDetail] = useState(false)

  const { unreadCount, unreadNotifications, readNotifications, markAsRead, markAllAsRead } = useNotifications()

  // Surface current cycle phase + next period from the existing menstrual data
  const { menstrualData, calculatePhase } = useMenstrualData()
  const latestCycle = menstrualData.cycles[0]
  const cycleLength = latestCycle?.cycleLength || 28
  const today = new Date()
  const lastPeriodStart = new Date(latestCycle?.startDate || "2024-03-01")
  const daysSinceStart = Math.max(
    0,
    Math.floor((today.getTime() - lastPeriodStart.getTime()) / (1000 * 60 * 60 * 24)),
  )
  const cycleDay = (daysSinceStart % cycleLength) + 1
  const currentPhase = calculatePhase(today, lastPeriodStart, cycleLength)
  const phaseLabelMap: Record<string, string> = {
    period: "Period",
    "post-period": "Follicular",
    ovulation: "Ovulation",
    "pre-period": "Luteal",
  }
  const currentPhaseLabel = phaseLabelMap[currentPhase] || "Follicular"
  const daysToNextPeriod = ((cycleLength - ((daysSinceStart % cycleLength) + 1)) % cycleLength) + 1

  // Define Dr Sarah Johnson chat with appointments
  const drSarahJohnsonChat: Chat = {
    id: "dr-sarah-johnson",
    specialist: {
      name: "Dr Sarah Johnson",
      role: "Neurologist",
      avatar: "/placeholder.svg?height=40&width=40",
      isOnline: true,
    },
    lastMessage: {
      content: "Your latest cognitive assessment results are ready. We can discuss them during our appointment.",
      timestamp: "5 min ago",
      isFromUser: false,
    },
    unreadCount: 1,
    appointments: [
      {
        id: "sarah-johnson-1",
        doctorName: "Dr Sarah Johnson",
        date: new Date().toISOString().split("T")[0],
        time: "14:00",
        duration: 30,
        type: "video",
        status: "scheduled",
      },
    ],
  }

  // Define Dr Sarah Wilson chat for appointments
  const drSarahWilsonChat: Chat = {
    id: "dr-sarah-wilson",
    specialist: {
      name: "Psychologist",
      role: "Psychologist",
      avatar: "/placeholder.svg?height=40&width=40",
      isOnline: true,
    },
    lastMessage: {
      content: "Looking forward to our appointment tomorrow at 2:00 PM. Please bring your recent test results.",
      timestamp: "1 hour ago",
      isFromUser: false,
    },
    unreadCount: 0,
    appointments: [
      {
        id: "sarah-wilson-1",
        doctorName: "Psychologist",
        date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        time: "14:00",
        duration: 30,
        type: "video",
        status: "scheduled",
      },
    ],
  }

  const handleNotificationClick = (notification: any) => {
    console.log("Notification item clicked:", notification.id)
    markAsRead(notification.id)
  }

  const handleNotificationBellClick = () => {
    console.log("Notification bell clicked, opening notifications")
    setShowNotifications(true)
  }

  const handleCloseNotifications = () => {
    console.log("Closing notifications screen")
    setShowNotifications(false)
  }

  const handleDeviceManagement = () => {
    setShowDeviceManagement(true)
    setShowLeftNav(false)
  }

  const handleDeviceIconClick = () => {
    setShowDevicesOverlay(true)
  }

  const handleRecords = () => {
    setShowRecords(true)
    setShowLeftNav(false)
  }

  const handleBookConsultation = () => {
    setShowConsultation(true)
  }

  const handleWalletClick = () => {
    setShowWalletDetail(true)
  }

  const handleProgressClick = () => {
    setShowInsights(true)
  }

  const handleCareProgramClick = () => {
    setShowProgramOverview(true)
  }

  const handleFreeDrugReminderClick = () => {
    setCareProgramView("treatment-journey")
    setShowCareProgram(true)
    onTabChange?.("care-program")
  }

  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat)
  }

  const handleBackFromChat = () => {
    setSelectedChat(null)
  }

  const handleBackFromChats = () => {
    setShowChats(false)
    setSelectedChat(null)
  }

  const handleAppointmentReminderClick = () => {
    setShowAppointmentChat(true)
  }

  const handleBackFromAppointmentChat = () => {
    setShowAppointmentChat(false)
  }

  const handleSpecialistPrev = () => {
    setCurrentSpecialistIndex((prev) => (prev === 0 ? SPECIALISTS.length - 1 : prev - 1))
  }

  const handleSpecialistNext = () => {
    setCurrentSpecialistIndex((prev) => (prev === SPECIALISTS.length - 1 ? 0 : prev + 1))
  }

  const handleViewAllEducation = () => {
    setShowEducationArticles(true)
  }

  const handleNavigateToUploadVideo = () => {
    setShowUploadVideo(true)
  }

  const handleNavigateToHealthAssistantWithWorkflow = (workflowType: "pain" | "medication" | "symptoms" | "womac") => {
    // This function will be called by Quick Actions to navigate to Health Assistant
    // and trigger a specific workflow
    console.log(`[v0] Navigating to Health Assistant with workflow: ${workflowType}`)

    // Navigate to Health Assistant tab
    onTabChange?.("assistant")
  }

  const handleQuickActionLogPain = () => {
    if (onNavigateToAssistant) {
      onNavigateToAssistant("track_symptoms")
    }
  }

  const handleQuickActionUploadVideo = () => {
    setShowUploadVideo(true)
  }

  const handleQuickActionCheckMobility = () => {
    if (onNavigateToAssistant) {
      onNavigateToAssistant("mobility_index")
    }
  }

  const handleQuickActionCheckQualityOfLife = () => {
    if (onNavigateToAssistant) {
      onNavigateToAssistant("quality_of_life")
    }
  }

  const handleTreatmentJourneyNavigate = () => {
    setShowTreatmentJourneyDetail(true)
  }

  const handleTreatmentJourneyDetailBack = () => {
    setShowTreatmentJourneyDetail(false)
  }

  const handleCycleSelect = (cycle: CycleData) => {
    console.log("Cycle selected:", cycle)
    setSelectedCycle(cycle)
    setShowCycleDetail(true)
  }

  const handleCycleDetailBack = () => {
    setShowCycleDetail(false)
    setSelectedCycle(null)
  }

  const handleAvatarClick = () => {
    setShowLeftNav(true)
  }

  const handleClinicalAppointments = () => {
    setShowClinicalAppointments(true)
  }

  const handleTelecounselorCall = () => {
    setShowTelecounselorCall(true)
  }

  if (showCycleDetail && selectedCycle) {
    return <CycleDetailScreen cycle={selectedCycle} onBack={handleCycleDetailBack} />
  }

  if (showTreatmentJourneyDetail) {
    return <TreatmentJourneyDetailScreen onBack={handleTreatmentJourneyDetailBack} onCycleSelect={handleCycleSelect} />
  }

  if (showUploadVideo) {
    return <UploadVideoScreen onBack={() => setShowUploadVideo(false)} />
  }

  if (showEducationArticles) {
    return <EducationArticlesScreen onBack={() => setShowEducationArticles(false)} />
  }

  if (showAppointmentChat) {
    return <ChatDetailScreen chat={drSarahWilsonChat} onBack={handleBackFromAppointmentChat} />
  }

  if (showRecords) {
    return <RecordsScreen onBack={() => setShowRecords(false)} />
  }

  if (showInsights) {
    return <InsightsScreen onNavigateToAssistant={() => {}} />
  }

  if (showWalletDetail) {
    return <WalletDetailScreen onBack={() => setShowWalletDetail(false)} />
  }

  if (showConsultation) {
    return <BookConsultationScreenNew onBack={() => setShowConsultation(false)} />
  }

  if (showDeviceManagement) {
    return <DeviceManagementScreen onBack={() => setShowDeviceManagement(false)} />
  }

  if (showSpecialistList) {
    return <SpecialistListView specialists={SPECIALISTS} onBack={() => setShowSpecialistList(false)} />
  }

  if (showProgramOverview) {
    return <ProgramOverviewScreen onBack={() => setShowProgramOverview(false)} />
  }

  if (showChats) {
    if (selectedChat) {
      return <ChatDetailScreen chat={selectedChat} onBack={handleBackFromChat} />
    }
    return <ChatsScreen onBack={handleBackFromChats} onChatSelect={handleChatSelect} />
  }

  if (showClinicalAppointments) {
    return <ClinicalAppointmentsScreen onBack={() => setShowClinicalAppointments(false)} />
  }

  if (showMenstrualDetail) {
    return <MenstrualDetailScreen onBack={() => setShowMenstrualDetail(false)} />
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto relative">
        <div className="relative">
          <HeroBanner
            onAvatarClick={handleAvatarClick}
            onNotificationClick={handleNotificationBellClick}
            onCareProgramClick={handleCareProgramClick}
            unreadCount={unreadCount}
          />
          {/* Calendar + Device Icons */}
          <div className="absolute top-1.5 right-12 z-10 flex items-center gap-2">
            <button
              className="w-8 h-8 bg-white hover:bg-gray-50 rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center"
              onClick={() => setShowDosageCalendar(true)}
            >
              <CalendarIcon className="w-4 h-4 text-gray-700" />
            </button>
            <button
              className="w-8 h-8 bg-white hover:bg-gray-50 rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center"
              onClick={handleDeviceIconClick}
            >
              <Watch className="w-4 h-4 text-gray-700" />
            </button>
          </div>
        </div>

        <div className="px-4 space-y-4 mt-4">
          <HealthProgressOverviewCard />

          <Card className="shadow-sm border-0 bg-white rounded-xl overflow-hidden">
            <CardHeader className="px-3 py-2 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold flex items-center gap-2 text-[#000000]">
                  <div className="w-6 h-6 rounded-lg bg-rose-50 flex items-center justify-center flex-shrink-0">
                    <CalendarHeart className="w-3.5 h-3.5" style={{ color: "var(--app-primary)" }} />
                  </div>
                  Your Cycle
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-gray-100 rounded-full transition-colors h-8 w-8"
                  onClick={() => setShowMenstrualDetail(true)}
                >
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="px-3 py-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Current phase</p>
                  <p className="text-base font-semibold text-gray-900">{currentPhaseLabel}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Day {cycleDay} of your cycle</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Next period in</p>
                  <p className="text-base font-semibold" style={{ color: "var(--app-primary)" }}>
                    {daysToNextPeriod} {daysToNextPeriod === 1 ? "day" : "days"}
                  </p>
                  <button
                    onClick={() => setShowMenstrualDetail(true)}
                    className="text-xs font-medium mt-0.5"
                    style={{ color: "var(--app-primary)" }}
                  >
                    View calendar
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          <TreatmentJourneyCard onNavigate={handleTreatmentJourneyNavigate} />

          <QuickActionsCard onCheckQualityOfLife={handleQuickActionLogPain} />

          <Card className="shadow-sm border-0 bg-white rounded-xl overflow-hidden">
            <CardHeader className="px-4 pt-4 pb-3 border-b border-gray-100">
              <CardTitle className="text-base font-semibold flex items-center gap-2 text-[#000000]">
                <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
                  <CalendarIcon className="w-4 h-4 text-purple-600" />
                </div>
                Your Services
              </CardTitle>
              <p className="text-sm text-gray-500 mt-1">Explore services part of your program</p>
            </CardHeader>
            <CardContent className="px-4 pt-3 pb-4 space-y-2">
              <div className="py-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "var(--icon-bg-primary)" }}
                    >
                      <ClipboardList className="w-4 h-4" style={{ color: "var(--app-primary)" }} />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">Daily Log</h4>
                      <p className="text-xs text-gray-500">Log flow, symptoms, mood & sleep</p>
                    </div>
                  </div>
                  <Button size="sm" onClick={handleQuickActionLogPain} className="h-7 px-3 text-xs font-medium">
                    Log
                  </Button>
                </div>
              </div>

              <div className="py-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "var(--icon-bg-primary)" }}
                    >
                      <CalendarHeart className="w-4 h-4" style={{ color: "var(--app-primary)" }} />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">Cycle Tracker</h4>
                      <p className="text-xs text-gray-500">View your cycle & predictions</p>
                    </div>
                  </div>
                  <Button size="sm" onClick={() => setShowMenstrualDetail(true)} className="h-7 px-3 text-xs font-medium">
                    View
                  </Button>
                </div>
              </div>

              <div className="py-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "var(--icon-bg-primary)" }}
                    >
                      <ClipboardCheck className="w-4 h-4" style={{ color: "var(--app-primary)" }} />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">Wellbeing Check</h4>
                      <p className="text-xs text-gray-500">Take your symptom assessment (MRS)</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={handleQuickActionCheckQualityOfLife}
                    className="h-7 px-3 text-xs font-medium"
                  >
                    Start
                  </Button>
                </div>
              </div>

              <div className="py-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "var(--icon-bg-primary)" }}
                    >
                      <UserRound className="w-4 h-4" style={{ color: "var(--app-primary)" }} />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">Nurse Educator</h4>
                      <p className="text-xs text-gray-500">Talk to a women's-health nurse</p>
                    </div>
                  </div>
                  <Button size="sm" onClick={handleTelecounselorCall} className="h-7 px-3 text-xs font-medium">
                    Call
                  </Button>
                </div>
              </div>

              <div className="py-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "var(--icon-bg-primary)" }}
                    >
                      <Stethoscope className="w-4 h-4" style={{ color: "var(--app-primary)" }} />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">Gynae Teleconsult</h4>
                      <p className="text-xs text-gray-500">Book a gynaecologist</p>
                    </div>
                  </div>
                  <Button size="sm" onClick={handleBookConsultation} className="h-7 px-3 text-xs font-medium">
                    Book
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <EducationCard onViewAll={handleViewAllEducation} />

          <WalletCard onWalletClick={handleWalletClick} />

          <div className="bg-gray-50 rounded-xl p-3 mt-4 mb-4">
            <div className="flex items-center justify-center gap-1.5 text-xs">
              <span className="text-gray-600">Powered by</span>
              <img src="/images/goodflip-logo.png" alt="GoodFlip" className="h-5 w-auto object-contain" />
            </div>
          </div>
        </div>
      </div>

      <LeftNavigation
        isOpen={showLeftNav}
        onClose={() => setShowLeftNav(false)}
        onDeviceManagement={handleDeviceManagement}
        onRecords={handleRecords}
      />

      <NotificationsScreen
        isOpen={showNotifications}
        onClose={handleCloseNotifications}
        unreadNotifications={unreadNotifications}
        readNotifications={readNotifications}
        unreadCount={unreadCount}
        onMarkRead={markAsRead}
        onMarkAllRead={markAllAsRead}
        onNotificationClick={handleNotificationClick}
      />

      {showTelecounselorCall && (
        <div className="absolute inset-0 z-50 flex items-end">
          <div className="absolute inset-0 bg-black/20" onClick={() => setShowTelecounselorCall(false)} />
          <div className="relative w-full bg-white rounded-t-2xl shadow-xl animate-in slide-in-from-bottom duration-300 max-h-[70vh]">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Telecounselor</h3>
                <button
                  onClick={() => setShowTelecounselorCall(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="py-4 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-2xl font-semibold text-gray-900 mb-2">+91 800 123 4567</p>
                <p className="text-sm text-gray-500">Available Mon-Sat, 9 AM - 6 PM</p>
              </div>

              <div className="space-y-2 pt-2">
                <Button className="w-full h-12 text-base font-medium bg-green-600 hover:bg-green-700">Call Now</Button>
                <Button
                  onClick={() => setShowTelecounselorCall(false)}
                  variant="outline"
                  className="w-full h-12 text-base font-medium"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <DosageCalendarOverlay
        isOpen={showDosageCalendar}
        onClose={() => setShowDosageCalendar(false)}
      />

      <DevicesOverlay
        isOpen={showDevicesOverlay}
        onClose={() => setShowDevicesOverlay(false)}
        onAddDevice={() => {
          setShowDeviceManagement(true)
          setShowDevicesOverlay(false)
        }}
        onDeviceSelect={(device) => {
          console.log("Selected device:", device.name)
          setShowDevicesOverlay(false)
        }}
      />
    </div>
  )
}
