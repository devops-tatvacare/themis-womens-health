"use client"
import { useState, useEffect, useRef } from "react"
import { SearchFilterBar } from "@/components/ui/search-filter-bar"
import { FileText, TestTube, Calendar, Sparkles, X, Pill, Plus } from "lucide-react"
import { ScreenHeader } from "@/components/ui/screen-header"

interface Document {
  id: string
  name: string
  type: "discharge" | "prescription" | "lab-test"
  fileType: string
  uploadDate: string
  size: string
  status: "uploaded" | "pending" | "processing"
  verificationStatus: "verified" | "rejected" | "in-progress"
  result?: string
  testStatus?: "normal" | "abnormal" | "pending"
  summary?: string
  showSummary?: boolean
}

const DOCUMENT_TYPES = ["All", "Discharge Summary", "Prescription", "Lab Test"]

const SAMPLE_DOCUMENTS: Document[] = [
  {
    id: "1",
    name: "Gynaecology Consultation — Menopause Review",
    type: "discharge",
    fileType: "PDF",
    uploadDate: "2024-01-20",
    size: "2.4 MB",
    status: "uploaded",
    verificationStatus: "verified",
  },
  {
    id: "2",
    name: "Hormone Panel (FSH, LH, Estradiol)",
    type: "lab-test",
    fileType: "PDF",
    uploadDate: "2024-01-18",
    size: "1.2 MB",
    status: "uploaded",
    verificationStatus: "verified",
    result: "FSH: 42 mIU/mL | Estradiol: 18 pg/mL",
    testStatus: "abnormal",
  },
  {
    id: "3",
    name: "Prescription — Hormone Replacement Therapy",
    type: "prescription",
    fileType: "PDF",
    uploadDate: "2024-01-15",
    size: "0.9 MB",
    status: "uploaded",
    verificationStatus: "verified",
  },
  {
    id: "4",
    name: "Thyroid & Iron Panel",
    type: "lab-test",
    fileType: "PDF",
    uploadDate: "2024-01-12",
    size: "1.5 MB",
    status: "uploaded",
    verificationStatus: "verified",
    result: "TSH: 5.8 mIU/L | Ferritin: 14 ng/mL | Hb: 10.6 g/dL",
    testStatus: "abnormal",
  },
  {
    id: "5",
    name: "Cycle & Symptom Tracking Report",
    type: "lab-test",
    fileType: "PDF",
    uploadDate: "2024-01-10",
    size: "3.1 MB",
    status: "uploaded",
    verificationStatus: "verified",
    result: "Cycle length: Irregular (24-38 days) | Hot flushes: Frequent",
    testStatus: "abnormal",
  },
  {
    id: "6",
    name: "Pelvic Ultrasound Scan Report",
    type: "lab-test",
    fileType: "PDF",
    uploadDate: "2024-01-08",
    size: "1.8 MB",
    status: "uploaded",
    verificationStatus: "verified",
    result: "Endometrial thickness: 9 mm | Ovaries: Normal | No fibroids",
    testStatus: "normal",
  },
  {
    id: "7",
    name: "Bone Density (DEXA) Scan",
    type: "lab-test",
    fileType: "PDF",
    uploadDate: "2024-01-05",
    size: "0.7 MB",
    status: "uploaded",
    verificationStatus: "in-progress",
    result: "Pending",
    testStatus: "pending",
  },
]

export function RecordsScreen() {
  const [documents, setDocuments] = useState<Document[]>(SAMPLE_DOCUMENTS)
  const [showUploadOptions, setShowUploadOptions] = useState(false)
  const [loadingSummary, setLoadingSummary] = useState<string | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [expandingDocId, setExpandingDocId] = useState<string | null>(null)
  const [scrollPosition, setScrollPosition] = useState(0)

  // Simple filtering state
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState<string[]>(["All"])

  // Filter documents based on search and selected filters
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = searchQuery === "" || doc.name.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter =
      selectedFilters.includes("All") ||
      selectedFilters.some((filter) => {
        switch (filter) {
          case "Discharge Summary":
            return doc.type === "discharge"
          case "Prescription":
            return doc.type === "prescription"
          case "Lab Test":
            return doc.type === "lab-test"
          default:
            return true
        }
      })

    return matchesSearch && matchesFilter
  })

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
  }

  const handleFilterToggle = (filter: string) => {
    if (filter === "All") {
      setSelectedFilters(["All"])
    } else {
      setSelectedFilters((prev) => {
        const newFilters = prev.filter((f) => f !== "All")
        if (newFilters.includes(filter)) {
          const filtered = newFilters.filter((f) => f !== filter)
          return filtered.length === 0 ? ["All"] : filtered
        } else {
          return [...newFilters, filter]
        }
      })
    }
  }

  const handleFileUpload = (documentType: string) => {
    console.log(`Uploading ${documentType} file`)
    setShowUploadOptions(false)
    // Here you would implement actual file upload logic
  }

  const generateAISummary = async (docId: string) => {
    if (scrollContainerRef.current) {
      setScrollPosition(scrollContainerRef.current.scrollTop)
    }

    setLoadingSummary(docId)
    setExpandingDocId(docId)

    // Simulate AI summary generation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const summaries: Record<string, string> = {
      "2": "**Hormone Panel Analysis**: Your FSH of 42 mIU/mL and low estradiol of 18 pg/mL are consistent with perimenopause. These changes can explain irregular periods, hot flushes and disturbed sleep. **Recommendation**: Discuss HRT options with your gynaecologist, track your cycle and symptoms in the app, prioritise sleep and calcium-rich nutrition, and review again in 3 months.",
      "4": "**Thyroid & Iron Assessment**: Your TSH of 5.8 mIU/L is mildly elevated (goal: <4.0) and ferritin of 14 ng/mL with Hb 10.6 g/dL indicates iron-deficiency anaemia, common with heavy periods. **Recommendation**: Start iron supplementation with vitamin C, add iron-rich foods, recheck thyroid in 6-8 weeks, and speak to your nurse educator about heavy menstrual bleeding.",
      "5": "**Cycle & Symptom Review**: Your cycle length is irregular (24-38 days) with frequent hot flushes and night sweats logged this month. This pattern points to a perimenopausal transition. **Recommendation**: Keep logging symptoms daily, maintain regular activity and good sleep hygiene, reduce caffeine and alcohol triggers, and book a women's health coach session to plan next steps.",
      "6": "**Pelvic Ultrasound Results**: Endometrial thickness of 9 mm is within the expected range, ovaries appear normal and no fibroids were detected. **Recommendation**: No action needed at this time. Continue routine screening, track any changes in bleeding patterns, and follow up with your gynaecologist at your next scheduled visit.",
    }

    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === docId
          ? {
              ...doc,
              summary:
                summaries[docId] || "Analysis complete. Consult your healthcare provider for detailed interpretation.",
              showSummary: true,
            }
          : doc,
      ),
    )
    setLoadingSummary(null)
    setExpandingDocId(null)
  }

  const dismissSummary = (docId: string) => {
    if (scrollContainerRef.current) {
      setScrollPosition(scrollContainerRef.current.scrollTop)
    }

    setDocuments((prev) => prev.map((doc) => (doc.id === docId ? { ...doc, showSummary: false } : doc)))

    requestAnimationFrame(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
          top: Math.max(0, scrollPosition - 100),
          behavior: "smooth",
        })
      }
    })
  }

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "discharge":
        return <FileText className="w-4 h-4 text-blue-600" />
      case "prescription":
        return <Pill className="w-4 h-4 text-green-600" />
      case "lab-test":
        return <TestTube className="w-4 h-4 text-purple-600" />
      default:
        return <FileText className="w-4 h-4 text-gray-600" />
    }
  }

  const getDocumentTypeLabel = (type: string) => {
    switch (type) {
      case "discharge":
        return "Discharge"
      case "prescription":
        return "Prescription"
      case "lab-test":
        return "Lab Test"
      default:
        return "Document"
    }
  }

  const renderDocumentCard = (doc: Document) => {
    const isLabTest = doc.type === "lab-test"

    return (
      <div key={doc.id} className="space-y-2">
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="p-4">
            {/* Header Row - Icon and Title */}
            <div className="flex items-start gap-3 mb-3">
              {/* Document Icon with colored background */}
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  doc.type === "discharge" ? "bg-blue-50" : doc.type === "prescription" ? "bg-green-50" : "bg-purple-50"
                }`}
              >
                {getDocumentIcon(doc.type)}
              </div>

              {/* Title and Type */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-gray-900 leading-5 mb-1.5">{doc.name}</h3>
                <span className="inline-flex items-center px-2 py-0.5 bg-gray-100 rounded text-xs font-medium text-gray-700">
                  {getDocumentTypeLabel(doc.type)}
                </span>
              </div>
            </div>

            {/* Metadata Row */}
            <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{new Date(doc.uploadDate).toLocaleDateString()}</span>
              </div>
              <span className="text-gray-300">•</span>
              <span>{doc.size}</span>
            </div>

            {/* Lab Result Row with AI Button (if applicable) */}
            {isLabTest && doc.result && (
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-600">Result:</span>
                  <span className="text-xs text-gray-900">{doc.result}</span>
                </div>

                <button
                  className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg flex items-center justify-center transition-all duration-200 disabled:opacity-50 flex-shrink-0"
                  onClick={() => generateAISummary(doc.id)}
                  disabled={loadingSummary === doc.id || doc.showSummary}
                  title="Generate AI Summary"
                >
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* AI Summary Expansion */}
        {isLabTest && (doc.showSummary || loadingSummary === doc.id) && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4 transform transition-all duration-300 ease-out">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-purple-800">AI Lab Insights</h4>
                  <p className="text-xs text-purple-600">{doc.name}</p>
                </div>
              </div>
              {doc.showSummary && (
                <button
                  onClick={() => dismissSummary(doc.id)}
                  className="p-1 hover:bg-purple-100 rounded-full transition-colors flex-shrink-0"
                >
                  <X className="w-3 h-3 text-purple-600" />
                </button>
              )}
            </div>

            {loadingSummary === doc.id ? (
              <div className="flex items-center justify-center py-6">
                <div className="text-center">
                  <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                  <p className="text-xs text-purple-700">Analyzing lab results...</p>
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-700 leading-relaxed">
                <div
                  dangerouslySetInnerHTML={{
                    __html: doc.summary?.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") || "",
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  // Handle smooth scroll adjustments when content changes
  useEffect(() => {
    if (!scrollContainerRef.current) return

    const container = scrollContainerRef.current
    let rafId: number

    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        container.style.scrollBehavior = "smooth"
      })
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === container) {
          requestAnimationFrame(() => {
            if (expandingDocId && scrollPosition > 0) {
              container.scrollTo({
                top: scrollPosition,
                behavior: "smooth",
              })
            }
          })
        }
      }
    })

    resizeObserver.observe(container)
    container.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      resizeObserver.disconnect()
      container.removeEventListener("scroll", handleScroll)
    }
  }, [expandingDocId, scrollPosition])

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-hidden relative">
      <ScreenHeader title="Medical Records" />

      {/* Search and Filter */}
      <SearchFilterBar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        filters={DOCUMENT_TYPES}
        selectedFilters={selectedFilters}
        onFilterToggle={handleFilterToggle}
      />

      {/* Documents List */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto"
        style={{
          scrollBehavior: "smooth",
          overscrollBehavior: "contain",
        }}
      >
        <div className="p-4 space-y-3 pb-24">
          {filteredDocuments.length > 0 ? (
            filteredDocuments.map((doc) => renderDocumentCard(doc))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="font-semibold text-base text-gray-800 mb-2">No Documents Found</h3>
              <p className="text-sm text-gray-500 max-w-sm leading-relaxed">
                {searchQuery || selectedFilters.length > 1
                  ? "Try adjusting your search or filters to find what you're looking for"
                  : "Upload your medical documents to get started with organizing your health records"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Floating Upload Button */}
      <div className="absolute bottom-4 right-4 z-50">
        <div className="relative">
          <button
            onClick={() => setShowUploadOptions(!showUploadOptions)}
            className="w-14 h-14 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-200 active:scale-95"
          >
            <Plus
              className={`w-6 h-6 text-white transition-transform duration-200 ${showUploadOptions ? "rotate-45" : ""}`}
            />
          </button>

          {/* Upload Options Menu */}
          {showUploadOptions && (
            <div className="absolute bottom-16 right-0 mb-2 bg-white border border-gray-200 rounded-xl shadow-xl min-w-48 overflow-hidden">
              <div className="py-2">
                <button
                  className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 flex items-center gap-3 transition-colors"
                  onClick={() => handleFileUpload("discharge")}
                >
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                    <FileText className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="font-medium text-gray-900">Discharge Summary</span>
                </button>
                <button
                  className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 flex items-center gap-3 transition-colors"
                  onClick={() => handleFileUpload("prescription")}
                >
                  <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                    <Pill className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="font-medium text-gray-900">Prescription</span>
                </button>
                <button
                  className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 flex items-center gap-3 transition-colors"
                  onClick={() => handleFileUpload("lab-test")}
                >
                  <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                    <TestTube className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="font-medium text-gray-900">Lab Test</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Overlay to close upload menu */}
      {showUploadOptions && <div className="fixed inset-0 z-0" onClick={() => setShowUploadOptions(false)} />}
    </div>
  )
}
