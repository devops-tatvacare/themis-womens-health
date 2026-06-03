"use client"

import { useState } from "react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Upload,
  ChevronRight,
  ChevronDown,
  FileText,
  Receipt,
  MapPin,
  Package,
  Truck,
  CheckCircle,
  Activity,
  Gift,
  TestTube,
  Heart,
  Droplets,
  Zap,
  Bone,
  Shield,
  Calendar,
} from "lucide-react"
import { SPECIALISTS, TREATMENT_CYCLES, EDUCATIONAL_CONTENT } from "@/lib/constants/data"
import { useFilter } from "@/lib/hooks/use-filter"
import { ScreenHeader } from "@/components/ui/screen-header"
import { SearchFilterBar } from "@/components/ui/search-filter-bar"
import { HorizontalScroll } from "@/components/ui/horizontal-scroll"
import type { CycleData } from "@/lib/types"
import { BookConsultationScreenNew } from "@/components/screens/book-consultation-screen-new"
import { UnifiedStoreCard } from "@/components/cards/unified-store-card"
import { UnifiedStoreScreen } from "@/components/screens/unified-store-screen"
import { ProgramOverviewScreen } from "@/components/screens/program-overview-screen"
import { TreatmentJourneyCard } from "@/components/cards/treatment-journey-card"

type DrilldownView =
  | "main"
  | "appointments"
  | "education"
  | "treatment-journey"
  | "cycle-details"
  | "unified-store"
  | "lab-tests"

const LAB_TESTS = [
  {
    id: "liver-function",
    name: "Liver Function Test",
    description: "Comprehensive liver health assessment",
    icon: TestTube,
    price: 699,
    originalPrice: 899,
    discount: "22",
  },
  {
    id: "lipid-profile",
    name: "Lipid Profile",
    description: "Cholesterol and triglycerides check",
    icon: Heart,
    price: 320,
    originalPrice: 400,
    discount: "20",
  },
  {
    id: "cbc",
    name: "Complete Blood Count",
    description: "Complete blood analysis",
    icon: Droplets,
    price: 250,
    originalPrice: 300,
    discount: "17",
  },
  {
    id: "kidney-function",
    name: "Kidney Function Test",
    description: "Kidney health assessment",
    icon: Shield,
    price: 450,
    originalPrice: 550,
    discount: "18",
  },
  {
    id: "bone-health",
    name: "Bone Health Profile",
    description: "Calcium, Vitamin D, bone markers",
    icon: Bone,
    price: 850,
    originalPrice: 1200,
    discount: "29",
  },
  {
    id: "thyroid-function",
    name: "Thyroid Function Test",
    description: "TSH, T3, T4 levels",
    icon: Zap,
    price: 380,
    originalPrice: 500,
    discount: "24",
  },
]

export function CareProgramScreen({
  onBack,
  onNavigateToRecords,
  initialView,
}: {
  onBack: () => void
  onNavigateToRecords?: () => void
  initialView?: DrilldownView
}) {
  // Add this new state
  const [showProgramOverview, setShowProgramOverview] = useState(false)
  const [currentView, setCurrentView] = useState<DrilldownView>(initialView || "main")
  const [selectedCycle, setSelectedCycle] = useState<CycleData | null>(null)
  const [activeTab, setActiveTab] = useState("delivery")
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    prescribedTherapy: false,
    currentTreatment: false,
  })

  const [showConsultation, setShowConsultation] = useState(false)
  const [selectedSpecialist, setSelectedSpecialist] = useState<any>(null)

  const specialistFilter = useFilter(SPECIALISTS, ["name", "role"])
  const educationFilter = useFilter(EDUCATIONAL_CONTENT, ["title", "category"])
  const labTestsFilter = useFilter(LAB_TESTS, ["name", "description"])

  const handleNavigation = (view: DrilldownView, cycle?: CycleData) => {
    if (view === "main") {
      setCurrentView("main")
      setSelectedCycle(null)
    } else if (view === "cycle-details" && cycle) {
      setSelectedCycle(cycle)
      setCurrentView("cycle-details")
      setActiveTab("delivery")
    } else {
      setCurrentView(view)
    }
  }

  const toggleSection = (sectionKey: string) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Complete":
        return "bg-green-100 text-green-700 border-green-200"
      case "In Progress":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "Upcoming":
        return "bg-orange-100 text-orange-700 border-orange-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const completedCycles = TREATMENT_CYCLES.filter((cycle) => cycle.status === "Complete").length
  const recentCycle = TREATMENT_CYCLES.find((cycle) => cycle.status === "Complete")
  const nextCycle = TREATMENT_CYCLES.find((cycle) => cycle.status === "Upcoming" || cycle.status === "In Progress")

  const handleFileUpload = (type: string) => {
    console.log(`Uploading ${type} file`)
  }

  const handleBookConsultation = () => {
    setShowConsultation(true)
  }

  const handleBookLabTest = (test: any) => {
    console.log("Booking lab test:", test.name)
    // Add your booking logic here
  }

  const handleClaimFreeDrug = () => {
    console.log("Claiming treatment refill")
    // Add your claim logic here
  }

  // Extended treatment cycles data including cycles 4-6
  const extendedTreatmentCycles = [
    ...TREATMENT_CYCLES,
    {
      id: "cycle-4",
      cycleNumber: 4,
      status: "Complete" as const,
      completedDate: "March 15, 2025",
      targetTherapyDrug: "Current Treatment",
      therapyType: "Targeted Therapy",
      deliveryStatus: {
        ordered: true,
        shipped: true,
        delivered: true,
        deliveryAddress: "123 Main Street, Apartment 4B, Mumbai, Maharashtra 400001",
      },
    },
    {
      id: "cycle-5",
      cycleNumber: 5,
      status: "In Progress" as const,
      scheduledDate: "April 20, 2025",
      targetTherapyDrug: "Current Treatment",
      therapyType: "Targeted Therapy",
      deliveryStatus: {
        ordered: true,
        shipped: true,
        delivered: false,
        deliveryAddress: "123 Main Street, Apartment 4B, Mumbai, Maharashtra 400001",
      },
    },
    {
      id: "cycle-6",
      cycleNumber: 6,
      status: "Upcoming" as const,
      scheduledDate: "May 25, 2025",
      targetTherapyDrug: "Current Treatment",
      therapyType: "Targeted Therapy",
      deliveryStatus: {
        ordered: false,
        shipped: false,
        delivered: false,
        deliveryAddress: "123 Main Street, Apartment 4B, Mumbai, Maharashtra 400001",
      },
    },
  ]

  // Group cycles by drug
  const prescribedTherapyCycles = extendedTreatmentCycles.filter((cycle) => cycle.targetTherapyDrug === "Prescribed Therapy")
  const currentTreatmentCycles = extendedTreatmentCycles.filter((cycle) => cycle.targetTherapyDrug === "Current Treatment")

  if (showConsultation) {
    return <BookConsultationScreenNew onBack={() => setShowConsultation(false)} />
  }

  if (showProgramOverview) {
    return <ProgramOverviewScreen onBack={() => setShowProgramOverview(false)} />
  }

  // Unified Store Screen
  if (currentView === "unified-store") {
    return <UnifiedStoreScreen onBack={() => handleNavigation("main")} />
  }

  // Appointments Screen - Full specialist list
  if (currentView === "appointments") {
    return (
      <div className="flex flex-col h-full">
        <ScreenHeader title="Book Appointment" onBack={() => handleNavigation("main")} />

        <SearchFilterBar
          searchQuery={specialistFilter.searchQuery}
          onSearchChange={specialistFilter.setSearchQuery}
          filters={specialistFilter.getUniqueFilters("role")}
          selectedFilters={specialistFilter.selectedFilters}
          onFilterToggle={specialistFilter.toggleFilter}
        />

        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {specialistFilter.filteredData.map((specialist, index) => (
            <Card key={index} className="shadow-sm border-0 bg-white rounded-xl overflow-hidden">
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <Avatar className="w-14 h-14 border-2 border-white shadow-sm">
                    <AvatarImage src="/images/doctor-avatar.png" />
                    <AvatarFallback className="bg-blue-500 text-white font-medium">
                      {specialist.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-base text-gray-800">{specialist.name}</h3>
                    <p className="text-sm text-gray-600 mb-1">{specialist.role}</p>
                    <p className="text-xs text-gray-500">{specialist.experience}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-base font-bold text-green-600">₹{specialist.price}</span>
                      <Button className="font-medium text-sm">Book Now</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  // Education Screen
  if (currentView === "education") {
    return (
      <div className="flex flex-col h-full">
        <ScreenHeader title="Educational Content" onBack={() => handleNavigation("main")} />

        <SearchFilterBar
          searchQuery={educationFilter.searchQuery}
          onSearchChange={educationFilter.setSearchQuery}
          filters={educationFilter.getUniqueFilters("category")}
          selectedFilters={educationFilter.selectedFilters}
          onFilterToggle={educationFilter.toggleFilter}
        />

        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {educationFilter.filteredData.map((content, index) => (
            <Card key={index} className="shadow-sm border-0 bg-white rounded-xl overflow-hidden">
              <CardContent className="p-3">
                <div className="flex gap-3">
                  <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-xl overflow-hidden border border-yellow-200 w-20 h-16 flex-shrink-0">
                    <img
                      src={
                        index % 2 === 0 ? "/images/medical-consultation.png" : "/images/telemedicine-consultation.png"
                      }
                      alt={content.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm text-gray-800 mb-1.5 line-clamp-2">{content.title}</h3>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {content.tags.map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          variant="secondary"
                          className="text-xs rounded-full px-1.5 py-0.5"
                          style={{
                            backgroundColor: "var(--chip-bg-primary)",
                            color: "var(--chip-text-primary)",
                            border: `1px solid var(--chip-border-primary)`,
                          }}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{content.duration}</span>
                      <Button size="sm" variant="outline" className="font-medium text-xs bg-transparent">
                        Read More
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  // Lab Tests Screen
  if (currentView === "lab-tests") {
    return (
      <div className="flex flex-col h-full">
        <ScreenHeader title="Lab Tests" onBack={() => handleNavigation("main")} />

        <SearchFilterBar
          searchQuery={labTestsFilter.searchQuery}
          onSearchChange={labTestsFilter.setSearchQuery}
          filters={[]}
          selectedFilters={labTestsFilter.selectedFilters}
          onFilterToggle={labTestsFilter.toggleFilter}
        />

        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {labTestsFilter.filteredData.map((test, index) => {
            const IconComponent = test.icon
            return (
              <Card key={index} className="shadow-sm border-0 bg-white rounded-xl overflow-hidden">
                <CardContent className="p-3">
                  <div className="flex gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "var(--icon-bg-primary)" }}
                    >
                      <IconComponent className="w-6 h-6" style={{ color: "var(--app-primary)" }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm text-gray-800 mb-1">{test.name}</h3>
                      <p className="text-xs text-gray-600 mb-2">{test.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-base font-bold" style={{ color: "var(--status-success)" }}>
                            ₹{test.price}
                          </span>
                          <span className="text-sm line-through text-gray-500">₹{test.originalPrice}</span>
                          <Badge
                            className="text-xs font-medium px-1 py-0"
                            style={{
                              backgroundColor: "var(--status-error)",
                              color: "white",
                              border: "none",
                              fontSize: "10px",
                              height: "16px",
                              lineHeight: "16px",
                            }}
                          >
                            {test.discount}% OFF
                          </Badge>
                        </div>
                        <Button size="sm" className="font-medium text-xs" onClick={() => handleBookLabTest(test)}>
                          Book
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    )
  }

  // Treatment Journey Screen with Collapsible Sections
  if (currentView === "treatment-journey") {
    return (
      <div className="flex flex-col h-full">
        <ScreenHeader title="Treatment Journey" onBack={() => handleNavigation("main")} />

        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {/* Treatment Refill CTA */}
          <div
            className="rounded-xl p-4 mb-3"
            style={{
              background: `linear-gradient(135deg, var(--banner-bg-start), var(--banner-bg-end))`,
              border: `1px solid var(--banner-border)`,
            }}
          >
            <div className="flex items-start gap-3">
              <div className="bg-white rounded-full p-2 shadow-sm">
                <Gift className="w-5 h-5" style={{ color: "var(--app-primary)" }} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-base text-gray-800 mb-1">Your Next Step</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Your <span className="font-semibold">treatment refill</span> is ready for pickup for your next
                  check-up
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold" style={{ color: "var(--app-primary)" }}>
                      Free
                    </span>
                    <span className="text-sm text-gray-500 line-through">₹40,750</span>
                  </div>
                  <Button
                    className="text-white font-semibold px-6 py-2 rounded-full"
                    style={{ backgroundColor: "var(--app-primary)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "var(--app-primary-hover)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "var(--app-primary)"
                    }}
                    onClick={handleClaimFreeDrug}
                  >
                    Claim Now
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Drug Change Notification */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-2.5">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></div>
              <p className="text-xs text-blue-800 font-medium">
                Treatment updated to current therapy for enhanced effectiveness
              </p>
            </div>
          </div>

          {/* Current Treatment Section (Cycles 4-6) */}
          <Card className="shadow-sm border-0 bg-white rounded-lg overflow-hidden">
            <div
              className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleSection("currentTreatment")}
            >
              <div className="flex-1">
                <h2 className="text-base font-bold text-gray-800">Current Treatment</h2>
                <p className="text-xs text-gray-600">Cycles 4-6 • Targeted Therapy</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-700 border-green-200 text-xs px-2 py-0.5">Current</Badge>
                {collapsedSections.currentTreatment ? (
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </div>
            </div>

            {!collapsedSections.currentTreatment && (
              <div className="border-t border-gray-100">
                <div className="p-2 space-y-2">
                  {currentTreatmentCycles.map((cycle) => (
                    <div key={cycle.id} className="bg-gray-50 border border-gray-200 rounded-lg p-2.5">
                      <div className="flex items-center justify-between mb-1.5">
                        <h3 className="font-semibold text-sm text-gray-800">
                          {cycle.cycleNumber === 4 ? "4th" : cycle.cycleNumber === 5 ? "5th" : "6th"} Cycle
                        </h3>
                        <Badge className={`text-xs font-medium border ${getStatusColor(cycle.status)}`}>
                          {cycle.status}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-xs text-gray-600 mb-2">
                        <p>
                          <span className="font-medium">
                            {cycle.status === "Complete" ? "Completed:" : "Scheduled:"}
                          </span>{" "}
                          {cycle.completedDate || cycle.scheduledDate}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs h-7 bg-transparent"
                        onClick={() => handleNavigation("cycle-details", cycle)}
                      >
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* Prescribed Therapy Section (Cycles 1-3) */}
          <Card className="shadow-sm border-0 bg-white rounded-lg overflow-hidden">
            <div
              className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleSection("prescribedTherapy")}
            >
              <div className="flex-1">
                <h2 className="text-base font-bold text-gray-800">Prescribed Therapy</h2>
                <p className="text-xs text-gray-600">Cycles 1-3 • Neoadjuvant Therapy</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-gray-100 text-gray-700 border-gray-200 text-xs px-2 py-0.5">Previous</Badge>
                {collapsedSections.prescribedTherapy ? (
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </div>
            </div>

            {!collapsedSections.prescribedTherapy && (
              <div className="border-t border-gray-100">
                <div className="p-2 space-y-2">
                  {prescribedTherapyCycles.map((cycle) => (
                    <div key={cycle.id} className="bg-gray-50 border border-gray-200 rounded-lg p-2.5">
                      <div className="flex items-center justify-between mb-1.5">
                        <h3 className="font-semibold text-sm text-gray-800">
                          {cycle.cycleNumber === 1 ? "1st" : cycle.cycleNumber === 2 ? "2nd" : "3rd"} Cycle
                        </h3>
                        <Badge className={`text-xs font-medium border ${getStatusColor(cycle.status)}`}>
                          {cycle.status}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-xs text-gray-600 mb-2">
                        <p>
                          <span className="font-medium">
                            {cycle.status === "Complete" ? "Completed:" : "Scheduled:"}
                          </span>{" "}
                          {cycle.completedDate || cycle.scheduledDate}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs h-7 bg-transparent"
                        onClick={() => handleNavigation("cycle-details", cycle)}
                      >
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    )
  }

  // Cycle Details Screen
  if (currentView === "cycle-details" && selectedCycle) {
    return (
      <div className="flex flex-col h-full">
        <ScreenHeader
          title={`${
            selectedCycle.cycleNumber === 1
              ? "1st"
              : selectedCycle.cycleNumber === 2
                ? "2nd"
                : selectedCycle.cycleNumber === 3
                  ? "3rd"
                  : `${selectedCycle.cycleNumber}th`
          } Cycle Details`}
          onBack={() => handleNavigation("treatment-journey")}
        />

        {/* Cycle Info Header */}
        <div className="bg-white border-b border-gray-100 p-3">
          <Card className="shadow-sm border-0 bg-gray-50 rounded-xl overflow-hidden">
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-base text-gray-800">
                  {selectedCycle.cycleNumber === 1
                    ? "1st"
                    : selectedCycle.cycleNumber === 2
                      ? "2nd"
                      : selectedCycle.cycleNumber === 3
                        ? "3rd"
                        : `${selectedCycle.cycleNumber}th`}{" "}
                  Cycle
                </h3>
                <Badge className={`text-xs font-medium border ${getStatusColor(selectedCycle.status)}`}>
                  {selectedCycle.status}
                </Badge>
              </div>
              <div className="space-y-1.5 text-sm text-gray-600">
                <p>
                  <span className="font-medium">
                    {selectedCycle.status === "Complete" ? "Completed on:" : "Scheduled for:"}
                  </span>{" "}
                  {selectedCycle.completedDate || selectedCycle.scheduledDate}
                </p>
                <p>
                  <span className="font-medium">Target Therapy Drug:</span> {selectedCycle.targetTherapyDrug}
                </p>
                <p>
                  <span className="font-medium">Therapy Type:</span> {selectedCycle.therapyType}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex-1 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <div className="px-3 pt-3 pb-2 bg-white border-b border-gray-100">
              <TabsList className="grid w-full grid-cols-3 bg-gray-100 rounded-lg p-1 h-16">
                <TabsTrigger
                  value="delivery"
                  className="text-xs font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm text-gray-600 rounded-md h-14 flex flex-col items-center justify-center gap-1"
                >
                  <Package className="w-4 h-4" />
                  Delivery
                </TabsTrigger>
                <TabsTrigger
                  value="documents"
                  className="text-xs font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm text-gray-600 rounded-md h-14 flex flex-col items-center justify-center gap-1"
                >
                  <FileText className="w-4 h-4" />
                  Documents
                </TabsTrigger>
                <TabsTrigger
                  value="test-reports"
                  className="text-xs font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm text-gray-600 rounded-md h-14 flex flex-col items-center justify-center gap-1"
                >
                  <Activity className="w-4 h-4" />
                  Test Reports
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-y-auto">
              <TabsContent value="delivery" className="mt-0 p-3 space-y-3">
                <Card className="shadow-sm border-0 bg-white rounded-xl overflow-hidden">
                  <div className="px-3 pt-3 pb-2">
                    <CardTitle className="text-base font-semibold text-gray-800">Delivery Progress</CardTitle>
                  </div>
                  <CardContent className="space-y-4 px-3 pt-0 pb-3">
                    {/* Delivery Steps */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center ${
                            selectedCycle.deliveryStatus?.ordered ? "bg-green-500" : "bg-gray-300"
                          }`}
                        >
                          {selectedCycle.deliveryStatus?.ordered ? (
                            <CheckCircle className="w-4 h-4 text-white" />
                          ) : (
                            <span className="text-white font-bold text-xs">1</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 text-sm">Ordered</h4>
                          <p className="text-sm text-gray-600">Your medication has been ordered</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center ${
                            selectedCycle.deliveryStatus?.shipped ? "bg-green-500" : "bg-gray-300"
                          }`}
                        >
                          {selectedCycle.deliveryStatus?.shipped ? (
                            <CheckCircle className="w-4 h-4 text-white" />
                          ) : (
                            <Truck className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 text-sm">Shipped</h4>
                          <p className="text-sm text-gray-600">Your medication is on the way</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center ${
                            selectedCycle.deliveryStatus?.delivered ? "bg-green-500" : "bg-gray-300"
                          }`}
                        >
                          {selectedCycle.deliveryStatus?.delivered ? (
                            <CheckCircle className="w-4 h-4 text-white" />
                          ) : (
                            <Package className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 text-sm">Delivered</h4>
                          <p className="text-sm text-gray-600">Your medication has been delivered</p>
                        </div>
                      </div>
                    </div>

                    {/* Delivery Address */}
                    <div className="bg-gray-50 p-3 rounded-xl">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-gray-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-1 text-sm">Delivery Address</h4>
                          <p className="text-sm text-gray-600">{selectedCycle.deliveryStatus?.deliveryAddress}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="mt-0 p-3 space-y-3">
                <Card className="shadow-sm border-0 bg-white rounded-xl overflow-hidden">
                  <div className="px-3 pt-3 pb-2">
                    <CardTitle className="text-base font-semibold text-gray-800">Upload Documents</CardTitle>
                  </div>
                  <CardContent className="space-y-3 px-3 pt-0 pb-3">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-blue-400 transition-colors">
                        <FileText className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                        <h4 className="font-semibold text-gray-800 mb-1 text-sm">Discharge Summary</h4>
                        <p className="text-sm text-gray-600 mb-3">Upload your discharge summary document</p>
                        <Button
                          variant="outline"
                          className="font-medium text-sm bg-transparent"
                          onClick={() => handleFileUpload("discharge-summary")}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Document
                        </Button>
                      </div>

                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-blue-400 transition-colors">
                        <Receipt className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                        <h4 className="font-semibold text-gray-800 mb-1 text-sm">Purchase Invoice</h4>
                        <p className="text-sm text-gray-600 mb-3">Upload your purchase invoice</p>
                        <Button
                          variant="outline"
                          className="font-medium text-sm bg-transparent"
                          onClick={() => handleFileUpload("purchase-invoice")}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Document
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="test-reports" className="mt-0 p-3 space-y-3">
                <Card className="shadow-sm border-0 bg-white rounded-xl overflow-hidden">
                  <div className="px-3 pt-3 pb-2">
                    <CardTitle className="text-base font-semibold text-gray-800">Upload Test Reports</CardTitle>
                  </div>
                  <CardContent className="px-3 pt-0 pb-3">
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                      <Activity className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                      <h4 className="font-semibold text-base text-gray-800 mb-2">Test Reports</h4>
                      <p className="text-sm text-gray-600 mb-4">Upload your lab test reports and medical documents</p>
                      <Button className="text-sm" onClick={() => handleFileUpload("test-reports")}>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Test Reports
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    )
  }

  // Main view
  return (
    <div className="flex flex-col h-full">
      <ScreenHeader title="Care Program" hidden={true} />

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {/* Hero Banner */}
        <div
          className="relative overflow-hidden -mx-4 -mt-3 mb-3 rounded-b-2xl"
          style={{ backgroundColor: "var(--hero-bg-primary)" }}
        >
          {/* Static Floating Bubbles */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Large bubbles */}
            <div
              className="absolute top-4 left-8 w-16 h-16 rounded-full opacity-20"
              style={{
                background: `linear-gradient(135deg, var(--app-primary), var(--app-primary-light))`,
              }}
            />
            <div
              className="absolute top-12 right-12 w-12 h-12 rounded-full opacity-25"
              style={{
                background: `linear-gradient(45deg, var(--icon-bg-primary), var(--app-primary))`,
              }}
            />

            {/* Medium bubbles */}
            <div
              className="absolute bottom-8 left-16 w-10 h-10 rounded-full opacity-30"
              style={{
                background: `linear-gradient(90deg, var(--app-primary-light), var(--icon-bg-secondary))`,
              }}
            />
            <div
              className="absolute top-20 left-1/3 w-8 h-8 rounded-full opacity-25"
              style={{
                background: `linear-gradient(180deg, var(--app-primary), var(--banner-bg-start))`,
              }}
            />
            <div
              className="absolute bottom-12 right-8 w-10 h-10 rounded-full opacity-20"
              style={{
                background: `linear-gradient(225deg, var(--icon-bg-primary), var(--app-primary-light))`,
              }}
            />

            {/* Small bubbles */}
            <div
              className="absolute top-16 right-20 w-6 h-6 rounded-full opacity-35"
              style={{
                background: `linear-gradient(315deg, var(--app-primary-light), var(--icon-bg-secondary))`,
              }}
            />
            <div
              className="absolute bottom-16 left-1/4 w-4 h-4 rounded-full opacity-30"
              style={{
                background: `linear-gradient(60deg, var(--app-primary), var(--banner-bg-end))`,
              }}
            />
            <div
              className="absolute top-24 right-1/3 w-6 h-6 rounded-full opacity-25"
              style={{
                background: `linear-gradient(120deg, var(--icon-bg-primary), var(--app-primary))`,
              }}
            />
          </div>

          <div className="pt-8 px-4 pb-2">
            {/* Centered Logo */}
            <div className="flex justify-center mb-1.5">
              <img src="/images/viatris-logo.svg" alt="Viatris" className="h-8 object-contain" />
            </div>

            {/* Greeting Text - Centered */}
            <div className="text-center mb-2">
              <h1 className="text-base font-bold mb-0.5" style={{ color: "var(--hero-text-primary)" }}>
                Your Care Journey
              </h1>
              <p className="text-xs" style={{ color: "var(--hero-text-secondary)" }}>
                Comprehensive care with Viatris
              </p>
            </div>

            {/* Care Program Overview Button */}
            <div className="flex justify-center">
              <button className="inline-flex items-center px-2.5 py-1 bg-white/90 hover:bg-white text-gray-800 text-xs font-medium rounded-md shadow-sm hover:shadow-md transition-all duration-200 border border-white/50">
                <span>Care Program Overview</span>
                <svg className="w-2.5 h-2.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Treatment Journey Card - Using new component */}
        {false && <TreatmentJourneyCard onNavigate={() => handleNavigation("treatment-journey")} />}

        {/* Your Journey Card */}
        <Card className="shadow-sm border-0 bg-white rounded-xl overflow-hidden">
          <CardContent className="p-3">
            {/* Header - Remove the button with ChevronRight */}
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-gray-600" />
              <h3 className="font-semibold text-gray-900">Your Journey</h3>
            </div>

            {/* Progress Section */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Progress</span>
              <span className="text-sm font-medium text-gray-700">70/90 days</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
              <div
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: "var(--app-primary)",
                  width: "77%", // 70/90 = ~77%
                }}
              />
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 mb-3"></div>

            {/* Banner Section */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0"></div>
                <p className="text-sm text-red-800 font-medium">
                  Program ending soon.{" "}
                  <button className="text-red-600 underline hover:text-red-700 font-semibold">Extend Plan</button>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Your Services Container Card */}
        <Card className="shadow-sm border-0 bg-white rounded-xl overflow-hidden">
          <div className="px-4 pt-3 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold flex items-center gap-2 text-[#000000]">
                <Calendar className="w-4 h-4 text-gray-700" />
                Your Services
              </CardTitle>
            </div>
            <p className="text-sm text-gray-500 mt-1">Explore services part of your program</p>
          </div>
          <CardContent className="px-4 pt-0 pb-3 space-y-2">
            {/* Book Appointment Card - Scaled Down */}
            <div className="py-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "var(--icon-bg-primary)" }}
                  >
                    <Calendar className="w-4 h-4" style={{ color: "var(--app-primary)" }} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">Connect with a Specialist</h4>
                    <p className="text-xs text-gray-500">Wellness experts</p>
                  </div>
                </div>
                <Button size="sm" onClick={handleBookConsultation} className="h-7 px-3 text-xs font-medium">
                  Book
                </Button>
              </div>
            </div>

            {/* Lab Tests Card - Scaled Down */}
            <div className="py-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "var(--icon-bg-primary)" }}
                  >
                    <TestTube className="w-4 h-4" style={{ color: "var(--app-primary)" }} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">Lab Tests</h4>
                    <p className="text-xs text-gray-500">At discounted prices</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => {
                    console.log("Navigate to lab tests booking")
                  }}
                  className="h-7 px-3 text-xs font-medium"
                >
                  Book
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Unified Store Card - Replaces all individual store cards */}
        <UnifiedStoreCard onNavigate={() => handleNavigation("unified-store")} />

        {/* Educational Content */}
        <Card className="shadow-sm border-0 bg-white rounded-xl overflow-hidden">
          <div className="px-4 pt-3 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold flex items-center gap-2 text-[#000000]">
                <FileText className="w-4 h-4 text-gray-700" />
                Educational Content
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gray-100 rounded-full transition-colors h-8 w-8"
                onClick={() => handleNavigation("education")}
              >
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Button>
            </div>
          </div>
          <CardContent className="px-4 pt-0 pb-3">
            <p className="text-sm text-gray-600 mb-2">All your questions answered in one place.</p>
            <HorizontalScroll>
              {EDUCATIONAL_CONTENT.slice(0, 4).map((content, index) => (
                <div key={index} className="flex-shrink-0 w-44">
                  <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-xl overflow-hidden mb-2 border border-yellow-200">
                    <img
                      src={
                        index % 2 === 0 ? "/images/medical-consultation.png" : "/images/telemedicine-consultation.png"
                      }
                      alt={content.title}
                      className="w-full h-16 object-cover"
                    />
                  </div>
                  <div className="flex flex-wrap gap-1 mb-1.5">
                    {content.tags.slice(0, 2).map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="secondary"
                        className="text-xs rounded-full px-1.5 py-0.5"
                        style={{
                          backgroundColor: "var(--chip-bg-primary)",
                          color: "var(--chip-text-primary)",
                          border: `1px solid var(--chip-border-primary)`,
                        }}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="font-semibold text-xs leading-tight text-gray-800 line-clamp-2">{content.title}</h3>
                </div>
              ))}
            </HorizontalScroll>
          </CardContent>
        </Card>

        {/* Footer with single branding */}
        <div className="bg-gray-50 rounded-xl p-3 mt-4 mb-4">
          <div className="flex items-center justify-center gap-1.5 text-xs">
            <span className="text-gray-600">Powered by</span>
            <img src="/images/goodflip-logo.png" alt="GoodFlip" className="h-5 w-auto object-contain" />
          </div>
        </div>
      </div>
    </div>
  )
}
