"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Activity } from "lucide-react"
import { ScreenLayout } from "@/components/layouts/screen-layout"
import { useNavigation } from "@/lib/hooks/use-navigation"
import { CONNECTED_DEVICES, AVAILABLE_DEVICES, type Device } from "@/lib/constants/devices"
import { DeviceSetupFlow } from "./device-setup-flow"
import { DeviceDetailsView } from "./device-details-view"
import { AddDeviceView } from "./add-device-view"

type DeviceView = "list" | "add-device" | "cgm-setup" | "device-details"

interface DeviceManagementScreenProps {
  onBack: () => void
}

export function DeviceManagementScreen({ onBack }: DeviceManagementScreenProps) {
  const { currentView, navigateTo, goBack } = useNavigation<DeviceView>("list")
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null)
  const [connectedDevices, setConnectedDevices] = useState(CONNECTED_DEVICES)

  const handleDeviceSelect = (device: Device) => {
    setSelectedDevice(device)
    navigateTo("device-details")
  }

  const handleAddDevice = (deviceId: string) => {
    if (deviceId === "cgm-new") {
      navigateTo("cgm-setup")
    }
  }

  const handleDeviceAdded = (device: Device) => {
    setConnectedDevices((prev) => [...prev, device])
    navigateTo("list")
  }

  if (currentView === "cgm-setup") {
    return <DeviceSetupFlow onBack={goBack} onComplete={handleDeviceAdded} />
  }

  if (currentView === "add-device") {
    return <AddDeviceView devices={AVAILABLE_DEVICES} onBack={goBack} onAddDevice={handleAddDevice} />
  }

  if (currentView === "device-details" && selectedDevice) {
    return <DeviceDetailsView device={selectedDevice} onBack={goBack} />
  }

  return (
    <ScreenLayout
      title="My Devices"
      onBack={onBack}
      headerContent={
        <div className="bg-white border-b border-gray-100 p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-800">Connected Devices</h2>
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
              onClick={() => navigateTo("add-device")}
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Device
            </Button>
          </div>
          <p className="text-sm text-gray-500">
            {connectedDevices.length} device{connectedDevices.length !== 1 ? "s" : ""} connected
          </p>
        </div>
      }
    >
      <div className="p-4">
        {connectedDevices.length === 0 ? (
          <EmptyDeviceState onAddDevice={() => navigateTo("add-device")} />
        ) : (
          <div className="space-y-3">
            {connectedDevices.map((device) => (
              <div key={device.id} className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Activity className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{device.name}</h3>
                      <p className="text-sm text-gray-500">{device.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${device.connected ? "bg-green-500" : "bg-red-500"}`} />
                    <span className={`text-xs font-medium ${device.connected ? "text-green-600" : "text-red-600"}`}>
                      {device.connected ? "Connected" : "Disconnected"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ScreenLayout>
  )
}

function EmptyDeviceState({ onAddDevice }: { onAddDevice: () => void }) {
  return (
    <div className="text-center py-16">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Activity className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="font-semibold text-lg text-gray-600 mb-2">No Devices Connected</h3>
      <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
        Connect health devices to track your progress automatically
      </p>
      <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={onAddDevice}>
        <Plus className="w-4 h-4 mr-2" />
        Add Your First Device
      </Button>
    </div>
  )
}
