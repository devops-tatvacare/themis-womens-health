"use client"

import { Heart, Droplets } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Device {
  id: string
  name: string
  type: "blood-pressure" | "glucose"
  connected: boolean
}

interface DevicesCardProps {
  devices?: Device[]
  onDeviceView?: (deviceId: string) => void
}

export function DevicesCard({ devices = [], onDeviceView }: DevicesCardProps) {
  const defaultDevices: Device[] = [
    {
      id: "bp-monitor",
      name: "Blood Pressure Monitor",
      type: "blood-pressure",
      connected: true,
    },
    {
      id: "glucose-monitor",
      name: "Glucose Monitor",
      type: "glucose",
      connected: true,
    },
  ]

  const displayDevices = devices.length > 0 ? devices : defaultDevices

  const getIcon = (type: string) => {
    switch (type) {
      case "blood-pressure":
        return (
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "var(--icon-bg-primary)" }}
          >
            <Heart className="w-4 h-4" style={{ color: "var(--app-primary)" }} />
          </div>
        )
      case "glucose":
        return (
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "var(--icon-bg-primary)" }}
          >
            <Droplets className="w-4 h-4" style={{ color: "var(--app-primary)" }} />
          </div>
        )
      default:
        return <Heart className="w-4 h-4 text-gray-600" />
    }
  }

  const handleDeviceView = (deviceId: string) => {
    if (onDeviceView) {
      onDeviceView(deviceId)
    }
  }

  return (
    <Card className="bg-white border border-gray-100 shadow-sm">
      <CardContent className="p-3">
        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <Heart className="w-4 h-4 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Your Devices</h3>
        </div>

        {/* Device Items */}
        <div className="space-y-1">
          {displayDevices.map((device) => (
            <div
              key={device.id}
              className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-2 flex-1">
                {getIcon(device.type)}
                <span className="font-medium text-gray-900 text-sm">{device.name}</span>
                <div className={`w-2 h-2 rounded-full ${device.connected ? "bg-green-500" : "bg-red-500"}`} />
              </div>
              <Button
                size="sm"
                variant="outline"
                className="h-7 px-3 text-xs bg-transparent"
                onClick={() => handleDeviceView(device.id)}
              >
                View
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
