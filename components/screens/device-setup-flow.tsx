"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScreenLayout } from "@/components/layouts/screen-layout"
import { Bluetooth, Search, Wifi, CheckCircle, Loader2 } from "lucide-react"
import type { Device } from "@/lib/constants/devices"

interface DeviceSetupFlowProps {
  onBack: () => void
  onComplete: (device: Device) => void
}

export function DeviceSetupFlow({ onBack, onComplete }: DeviceSetupFlowProps) {
  const [step, setStep] = useState(1)
  const [isConnecting, setIsConnecting] = useState(false)

  const handleNext = async () => {
    setIsConnecting(true)

    setTimeout(() => {
      if (step < 4) {
        setStep(step + 1)
        setIsConnecting(false)
      } else {
        const newDevice: Device = {
          id: "cgm-002",
          name: "Continuous Glucose Monitor",
          type: "CGM",
          brand: "Dexcom",
          model: "G7",
          isConnected: true,
          lastSync: "Just now",
          batteryLevel: 100,
          icon: Search, // This should be imported from the devices constants
          color: "text-green-600",
          bgColor: "bg-green-50",
          stats: [
            { label: "Current", value: "98", unit: "mg/dL", trend: "stable" },
            { label: "Trend", value: "Stable", unit: "", trend: "stable" },
            { label: "Time Active", value: "2", unit: "min", trend: "up" },
          ],
        }
        onComplete(newDevice)
      }
    }, 2000)
  }

  const steps = [
    {
      icon: Bluetooth,
      title: "Enable Bluetooth",
      description: "We need Bluetooth access to connect your Continuous Glucose Monitor",
      buttonText: "Allow Bluetooth Access",
      color: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: Search,
      title: "Searching for Device",
      description: "Make sure your CGM sensor is active and nearby",
      buttonText: "Continue",
      color: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: Wifi,
      title: "Connecting Device",
      description: "Establishing secure connection with your Dexcom G7",
      buttonText: "Continue",
      color: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      icon: CheckCircle,
      title: "Successfully Connected!",
      description: "Your Dexcom G7 is now connected and ready to monitor your glucose levels",
      buttonText: "Complete Setup",
      color: "bg-green-100",
      iconColor: "text-green-600",
    },
  ]

  const currentStep = steps[step - 1]
  const IconComponent = currentStep.icon

  return (
    <ScreenLayout title="Add CGM Device" onBack={onBack}>
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="text-center space-y-6 max-w-sm">
          <div className={`w-20 h-20 ${currentStep.color} rounded-full flex items-center justify-center mx-auto`}>
            <IconComponent className={`w-10 h-10 ${currentStep.iconColor}`} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">{currentStep.title}</h2>
            <p className="text-sm text-gray-600">{currentStep.description}</p>
          </div>

          {step === 3 && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Dexcom G7</span>
                <Badge className="bg-orange-100 text-orange-700">Connecting</Badge>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full w-3/4 transition-all duration-1000"></div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Dexcom G7</span>
                <Badge className="bg-green-100 text-green-700">Connected</Badge>
              </div>
              <div className="text-xs text-gray-600">Battery: 100% • Signal: Strong</div>
            </div>
          )}

          <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleNext} disabled={isConnecting}>
            {isConnecting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {step === 1 ? "Requesting Permission..." : step === 2 ? "Searching..." : "Connecting..."}
              </>
            ) : (
              currentStep.buttonText
            )}
          </Button>
        </div>
      </div>
    </ScreenLayout>
  )
}
