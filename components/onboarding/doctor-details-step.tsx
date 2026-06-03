"use client"

import { type FormEvent, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, ChevronDown, X } from "lucide-react"
import { INDIAN_STATES, CITIES_BY_STATE, HOSPITALS_BY_CITY } from "@/lib/constants/onboarding-data"
import { cn } from "@/lib/utils"

interface DoctorDetailsStepProps {
  value: {
    doctorState: string
    doctorCity: string
    hospital: string
    doctorName: string
  }
  onChange: (value: { doctorState: string; doctorCity: string; hospital: string; doctorName: string }) => void
  onNext: () => void
  onBack: () => void
  isLoading?: boolean
}

export function DoctorDetailsStep({ value, onChange, onNext, onBack, isLoading }: DoctorDetailsStepProps) {
  const [showStateModal, setShowStateModal] = useState(false)
  const [showCityModal, setShowCityModal] = useState(false)
  const [showHospitalModal, setShowHospitalModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (value.doctorState && value.doctorCity && value.hospital && value.doctorName.trim()) {
      onNext()
    }
  }

  const isValid = value.doctorState && value.doctorCity && value.hospital && value.doctorName.trim()

  const availableCities = value.doctorState ? CITIES_BY_STATE[value.doctorState] || [] : []
  const availableHospitals = value.doctorCity ? HOSPITALS_BY_CITY[value.doctorCity] || [] : []

  const filteredStates = INDIAN_STATES.filter((state) => state.toLowerCase().includes(searchQuery.toLowerCase()))
  const filteredCities = availableCities.filter((city) => city.toLowerCase().includes(searchQuery.toLowerCase()))
  const filteredHospitals = availableHospitals.filter((hospital) =>
    hospital.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleStateSelect = (state: string) => {
    onChange({ doctorState: state, doctorCity: "", hospital: "", doctorName: value.doctorName })
    setShowStateModal(false)
    setSearchQuery("")
  }

  const handleCitySelect = (city: string) => {
    onChange({ ...value, doctorCity: city, hospital: "" })
    setShowCityModal(false)
    setSearchQuery("")
  }

  const handleHospitalSelect = (hospital: string) => {
    onChange({ ...value, hospital })
    setShowHospitalModal(false)
    setSearchQuery("")
  }

  const SelectModal = ({
    isOpen,
    onClose,
    title,
    items,
    onSelect,
  }: {
    isOpen: boolean
    onClose: () => void
    title: string
    items: string[]
    onSelect: (item: string) => void
  }) => {
    if (!isOpen) return null

    return (
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-[var(--bg-primary)] rounded-lg w-full max-w-[320px] max-h-[400px] overflow-hidden shadow-xl">
          <div className="p-4 border-b border-[var(--border-color)] flex items-center justify-between">
            <h3 className="font-medium text-[var(--text-primary)]">{title}</h3>
            <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className="p-4">
            <Input
              placeholder={`Search ${title.toLowerCase()}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-4"
            />
            <div className="max-h-48 overflow-y-auto space-y-1">
              {items.length > 0 ? (
                items.map((item) => (
                  <button
                    key={item}
                    onClick={() => onSelect(item)}
                    className="w-full text-left p-3 hover:bg-[var(--bg-secondary)] rounded text-[var(--text-primary)] transition-colors"
                  >
                    {item}
                  </button>
                ))
              ) : (
                <p className="text-[var(--text-secondary)] text-center py-4">No results found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-[var(--bg-primary)] pb-12 relative">
      <div className="flex-1 overflow-y-auto p-6">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors mb-4"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
            Please provide details of the patient's doctor
          </h1>
          <p className="text-[var(--text-secondary)]">
            We ask your doctor's details to ensure seamless coordination of your care
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Doctor's state</label>
            <button
              type="button"
              onClick={() => setShowStateModal(true)}
              className={cn(
                "w-full h-12 px-4 rounded-lg border-2 bg-[var(--bg-primary)]",
                "text-left text-[var(--text-primary)] border-[var(--border-color)]",
                "hover:border-[var(--app-primary)] focus:border-[var(--app-primary)] focus:outline-none",
                "flex items-center justify-between transition-colors",
              )}
            >
              <span className={value.doctorState ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]"}>
                {value.doctorState || "Select your doctor's state"}
              </span>
              <ChevronDown className="w-4 h-4 text-[var(--text-secondary)]" />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Doctor's city</label>
            <button
              type="button"
              onClick={() => value.doctorState && setShowCityModal(true)}
              disabled={!value.doctorState}
              className={cn(
                "w-full h-12 px-4 rounded-lg border-2 bg-[var(--bg-primary)]",
                "text-left border-[var(--border-color)]",
                "flex items-center justify-between transition-colors",
                value.doctorState
                  ? "text-[var(--text-primary)] hover:border-[var(--app-primary)] focus:border-[var(--app-primary)] cursor-pointer"
                  : "text-[var(--text-muted)] cursor-not-allowed opacity-50",
              )}
            >
              <span className={value.doctorCity ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]"}>
                {value.doctorCity || "Select your doctor's city"}
              </span>
              <ChevronDown className="w-4 h-4 text-[var(--text-secondary)]" />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Hospital</label>
            <button
              type="button"
              onClick={() => value.doctorCity && setShowHospitalModal(true)}
              disabled={!value.doctorCity}
              className={cn(
                "w-full h-12 px-4 rounded-lg border-2 bg-[var(--bg-primary)]",
                "text-left border-[var(--border-color)]",
                "flex items-center justify-between transition-colors",
                value.doctorCity
                  ? "text-[var(--text-primary)] hover:border-[var(--app-primary)] focus:border-[var(--app-primary)] cursor-pointer"
                  : "text-[var(--text-muted)] cursor-not-allowed opacity-50",
              )}
            >
              <span className={value.hospital ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]"}>
                {value.hospital || "Select Hospital"}
              </span>
              <ChevronDown className="w-4 h-4 text-[var(--text-secondary)]" />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Doctor's name</label>
            <Input
              type="text"
              value={value.doctorName}
              onChange={(e) => onChange({ ...value, doctorName: e.target.value })}
              placeholder="Enter doctor's name"
              className="h-12"
            />
          </div>
        </form>
      </div>

      <div className="p-6 border-t border-[var(--border-color)]">
        <Button onClick={handleSubmit} disabled={!isValid || isLoading} className="w-full h-12 text-lg">
          {isLoading ? "Processing..." : "Continue"}
        </Button>
      </div>

      <SelectModal
        isOpen={showStateModal}
        onClose={() => {
          setShowStateModal(false)
          setSearchQuery("")
        }}
        title="Select your doctor's State"
        items={filteredStates}
        onSelect={handleStateSelect}
      />

      <SelectModal
        isOpen={showCityModal}
        onClose={() => {
          setShowCityModal(false)
          setSearchQuery("")
        }}
        title="Select your doctor's city"
        items={filteredCities}
        onSelect={handleCitySelect}
      />

      <SelectModal
        isOpen={showHospitalModal}
        onClose={() => {
          setShowHospitalModal(false)
          setSearchQuery("")
        }}
        title="Select Hospital"
        items={filteredHospitals}
        onSelect={handleHospitalSelect}
      />
    </div>
  )
}
