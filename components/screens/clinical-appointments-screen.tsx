"use client"

import { useState } from "react"
import {
  ChevronLeft,
  Search,
  SlidersHorizontal,
  Clock,
  Award,
  MessageSquare,
  Building,
  User,
  X,
  Eye,
  Syringe,
  Heart,
  Droplet,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"

interface Doctor {
  id: string
  name: string
  specialty: string
  experience: number
  languages: string[]
  qualifications: string
  clinic: string
  fee: number
  avatar?: string
  available: boolean
  availableIn?: number
}

interface Patient {
  name: string
  gender: string
  phone: string
}

const SPECIALTIES = [
  { id: "retina", name: "Retina Specialist", icon: Eye },
  { id: "diabetologist", name: "Diabetologist", icon: Syringe },
  { id: "cardiologist", name: "Cardiologist", icon: Heart },
  { id: "nephrologist", name: "Nephrologist", icon: Droplet },
]

const MOCK_DOCTORS: Doctor[] = [
  {
    id: "1",
    name: "Dr. Rajesh Kumar",
    specialty: "Retina Specialist",
    experience: 15,
    languages: ["English", "Hindi", "Tamil"],
    qualifications: "MBBS, MS Ophthalmology, FRCS",
    clinic: "Sankara Eye Hospital - Bangalore",
    fee: 800,
    available: true,
    availableIn: 30,
  },
  {
    id: "2",
    name: "Dr. Priya Sharma",
    specialty: "Diabetologist",
    experience: 12,
    languages: ["English", "Hindi", "Kannada"],
    qualifications: "MBBS, MD Endocrinology",
    clinic: "Manipal Hospital - Bangalore",
    fee: 700,
    available: true,
    availableIn: 45,
  },
  {
    id: "3",
    name: "Dr. Arun Mehta",
    specialty: "Cardiologist",
    experience: 18,
    languages: ["English", "Hindi", "Telugu"],
    qualifications: "MBBS, DM Cardiology",
    clinic: "Apollo Hospital - Bangalore",
    fee: 900,
    available: true,
    availableIn: 20,
  },
  {
    id: "4",
    name: "Dr. Sanjay Reddy",
    specialty: "Nephrologist",
    experience: 14,
    languages: ["English", "Telugu", "Kannada"],
    qualifications: "MBBS, DM Nephrology",
    clinic: "Fortis Hospital - Bangalore",
    fee: 850,
    available: true,
    availableIn: 35,
  },
]

const MOCK_PATIENT: Patient = {
  name: "KUMAR PATEL",
  gender: "Male",
  phone: "9876543210",
}

export function ClinicalAppointmentsScreen({ onBack }: { onBack: () => void }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null)
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [showPatientSheet, setShowPatientSheet] = useState(false)

  const filteredDoctors = MOCK_DOCTORS.filter((doctor) => {
    const matchesSearch =
      searchQuery === "" ||
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSpecialty = !selectedSpecialty || doctor.specialty === selectedSpecialty
    return matchesSearch && matchesSpecialty
  })

  const handleConsultNow = (doctor: Doctor) => {
    setSelectedDoctor(doctor)
    setShowPatientSheet(true)
  }

  const handleBookAppointment = () => {
    console.log("Booking appointment for:", selectedDoctor, "Patient:", MOCK_PATIENT)
    setShowPatientSheet(false)
    setSelectedDoctor(null)
  }

  const handleBack = () => {
    if (selectedSpecialty) {
      setSelectedSpecialty(null)
    } else {
      onBack()
    }
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3 border-b border-gray-100">
        <button onClick={handleBack} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-gray-900" />
        </button>
        <h1 className="text-xl font-semibold text-gray-900">Clinical Appointments</h1>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search doctors or specialists"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-50 border-0 h-11"
            />
          </div>
          <Button variant="outline" size="icon" className="h-11 w-11 border-2 border-primary bg-transparent">
            <SlidersHorizontal className="w-5 h-5 text-primary" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Common Specialities */}
        {!selectedSpecialty && (
          <div className="px-4 py-4">
            <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">COMMON SPECIALITIES</h2>
            <div className="space-y-2">
              {SPECIALTIES.map((specialty) => {
                const IconComponent = specialty.icon
                return (
                  <button
                    key={specialty.id}
                    onClick={() => setSelectedSpecialty(specialty.name)}
                    className="w-full flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-lg hover:border-primary/50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-medium text-gray-900">{specialty.name}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Available Doctors */}
        {(selectedSpecialty || searchQuery) && (
          <div className="px-4 py-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Available Now</h2>
            <div className="flex items-center gap-1.5 text-sm text-gray-600 mb-4">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>Available in 30 mins</span>
            </div>

            <div className="space-y-3">
              {filteredDoctors.map((doctor) => (
                <Card key={doctor.id} className="p-4 border border-gray-100 shadow-sm">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="relative">
                      <Avatar className="w-14 h-14">
                        <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-semibold text-lg">
                          {doctor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                      </Avatar>
                      {doctor.available && (
                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-base">{doctor.name}</h3>
                      <p className="text-sm text-gray-600">{doctor.specialty}</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Award className="w-4 h-4 text-orange-500" />
                      <span>{doctor.experience} years exp</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MessageSquare className="w-4 h-4 text-blue-500" />
                      <span>{doctor.languages.join(", ")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Award className="w-4 h-4 text-pink-500" />
                      <span>{doctor.qualifications}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Building className="w-4 h-4 text-green-500" />
                      <span>{doctor.clinic}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div>
                      <span className="text-sm text-gray-600">Your Consultation Fee</span>
                      <p className="text-lg font-semibold text-gray-900">₹ {doctor.fee}</p>
                    </div>
                    <Button onClick={() => handleConsultNow(doctor)} className="px-6">
                      Consult Now
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Patient Selection Sheet */}
      <Sheet open={showPatientSheet} onOpenChange={setShowPatientSheet}>
        <SheetContent side="bottom" className="h-auto max-h-[90vh] rounded-t-3xl">
          <SheetHeader className="text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                <SheetTitle>Select Patient</SheetTitle>
              </div>
              <button onClick={() => setShowPatientSheet(false)} className="hover:bg-gray-100 p-1 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
          </SheetHeader>
          <div className="mt-6 pb-6">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700">
                Booking will be cancelled by the doctor if the patient name and the patient taking the consultation are
                different.
              </p>
            </div>

            <button
              onClick={handleBookAppointment}
              className="w-full flex items-center gap-3 p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-primary transition-colors"
            >
              <Avatar className="w-12 h-12">
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">
                  {MOCK_PATIENT.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
              </Avatar>
              <div className="flex-1 text-left">
                <h4 className="font-semibold text-gray-900">{MOCK_PATIENT.name}</h4>
                <p className="text-sm text-gray-600">
                  {MOCK_PATIENT.gender}, {MOCK_PATIENT.phone}
                </p>
              </div>
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
