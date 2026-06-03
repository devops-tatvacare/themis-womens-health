"use client"

import { useState } from "react"
import { PhoneNumberStep } from "./phone-number-step"
import { OTPStep } from "./otp-step"
import { UserTypeStep } from "./user-type-step"
import { PatientNameStep } from "./patient-name-step"
import { GenderStep } from "./gender-step"
import { DateOfBirthStep } from "./date-of-birth-step"
import { DoctorDetailsStep } from "./doctor-details-step"
import { DocumentUploadStep } from "./document-upload-step"
import { CompletionStep } from "./completion-step"
import { BrowserUrlBar } from "./browser-url-bar"

interface OnboardingFlowProps {
  onComplete: () => void
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  // Form state
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [userType, setUserType] = useState<"patient" | "caregiver" | null>(null)
  const [patientName, setPatientName] = useState("")
  const [gender, setGender] = useState<"male" | "female" | "other" | null>(null)
  const [dateOfBirth, setDateOfBirth] = useState({ day: "", month: "", year: "" })
  const [doctorDetails, setDoctorDetails] = useState({
    doctorState: "",
    doctorCity: "",
    hospital: "",
    doctorName: "",
  })

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PhoneNumberStep value={phoneNumber} onChange={setPhoneNumber} onNext={handleNext} isLoading={isLoading} />
        )
      case 2:
        return (
          <OTPStep
            phoneNumber={phoneNumber}
            value={otp}
            onChange={setOtp}
            onNext={handleNext}
            onBack={handleBack}
            isLoading={isLoading}
          />
        )
      case 3:
        return (
          <UserTypeStep
            value={userType}
            onChange={setUserType}
            onNext={handleNext}
            onBack={handleBack}
            isLoading={isLoading}
          />
        )
      case 4:
        return (
          <PatientNameStep
            value={patientName}
            onChange={setPatientName}
            onNext={handleNext}
            onBack={handleBack}
            isLoading={isLoading}
          />
        )
      case 5:
        return (
          <GenderStep
            value={gender}
            onChange={setGender}
            onNext={handleNext}
            onBack={handleBack}
            isLoading={isLoading}
          />
        )
      case 6:
        return (
          <DateOfBirthStep
            value={dateOfBirth}
            onChange={setDateOfBirth}
            onNext={handleNext}
            onBack={handleBack}
            isLoading={isLoading}
          />
        )
      case 7:
        return (
          <DoctorDetailsStep
            value={doctorDetails}
            onChange={setDoctorDetails}
            onNext={handleNext}
            onBack={handleBack}
            isLoading={isLoading}
          />
        )
      case 8:
        return <DocumentUploadStep onNext={handleNext} onBack={handleBack} isLoading={isLoading} />
      case 9:
        return <CompletionStep onComplete={onComplete} isLoading={isLoading} />
      default:
        return null
    }
  }

  return (
    <div className="h-full relative">
      {renderStep()}
      <BrowserUrlBar />
    </div>
  )
}
