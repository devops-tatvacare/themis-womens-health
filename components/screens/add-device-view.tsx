"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScreenLayout } from "@/components/layouts/screen-layout"
import { Plus } from "lucide-react"

interface Device {
  id: string
  name: string
  brand: string
  model: string
  description: string
  icon: any
  color: string
  bgColor: string
}

interface AddDeviceViewProps {
  devices: Device[]
  onBack: () => void
  onAddDevice: (deviceId: string) => void
}

export function AddDeviceView({ devices, onBack, onAddDevice }: AddDeviceViewProps) {
  return (
    <ScreenLayout title="Add New Device" onBack={onBack}>
      <div className="p-3 space-y-3">
        <div className="text-sm text-gray-600 mb-3">
          Choose from our supported devices to enhance your health monitoring
        </div>

        {devices.map((device) => {
          const IconComponent = device.icon
          return (
            <Card key={device.id} className="shadow-sm border-0 bg-white rounded-xl">
              <CardContent className="p-3">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${device.bgColor}`}>
                    <IconComponent className={`w-6 h-6 ${device.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{device.name}</h3>
                    <p className="text-sm text-gray-600 mb-1">
                      {device.brand} {device.model}
                    </p>
                    <p className="text-xs text-gray-500">{device.description}</p>
                  </div>
                  <Button
                    size="sm"
                    style={{
                      backgroundColor: "#f15223",
                      color: "white",
                      border: "none",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#d63e1a"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#f15223"
                    }}
                    onClick={() => onAddDevice(device.id)}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </ScreenLayout>
  )
}
