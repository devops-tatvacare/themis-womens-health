"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScreenLayout } from "@/components/layouts/screen-layout"
import { ConnectionIndicator } from "@/components/ui/connection-indicator"
import { TrendIcon } from "@/components/ui/trend-icon"
import { Settings, Battery } from "lucide-react"
import { getBatteryColor } from "@/lib/utils/status"
import type { Device } from "@/lib/constants/devices"

interface DeviceDetailsViewProps {
  device: Device
  onBack: () => void
}

export function DeviceDetailsView({ device, onBack }: DeviceDetailsViewProps) {
  const IconComponent = device.icon

  return (
    <ScreenLayout
      title={device.name}
      onBack={onBack}
      rightElement={
        <Button variant="ghost" size="icon">
          <Settings className="w-5 h-5 text-gray-600" />
        </Button>
      }
    >
      <div className="p-4 space-y-4">
        {/* Device Status Card */}
        <Card className="shadow-sm border-0 bg-white rounded-xl">
          <CardContent className="p-4">
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-3 rounded-lg ${device.bgColor}`}>
                <IconComponent className={`w-8 h-8 ${device.color}`} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-800">{device.name}</h3>
                <p className="text-sm text-gray-600">
                  {device.brand} {device.model}
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <ConnectionIndicator isConnected={device.isConnected} size="md" />
                  {device.batteryLevel && (
                    <div className="flex items-center gap-1">
                      <Battery className={`w-4 h-4 ${getBatteryColor(device.batteryLevel)}`} />
                      <span className="text-xs text-gray-600">{device.batteryLevel}%</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-500">Last sync: {device.lastSync}</div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        {device.stats && (
          <div className="grid grid-cols-2 gap-3">
            {device.stats.map((stat, index) => (
              <Card key={index} className="shadow-sm border-0 bg-white rounded-xl">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-600">{stat.label}</span>
                    <TrendIcon trend={stat.trend} />
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold text-gray-800">{stat.value}</span>
                    <span className="text-xs text-gray-500">{stat.unit}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="space-y-3">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Sync Now</Button>
          <Button variant="outline" className="w-full border-gray-300 text-gray-700">
            View History
          </Button>
          <Button variant="outline" className="w-full border-red-300 text-red-600 hover:bg-red-50">
            Remove Device
          </Button>
        </div>
      </div>
    </ScreenLayout>
  )
}
