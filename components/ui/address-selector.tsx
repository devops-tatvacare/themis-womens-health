"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Home, Building, Plus, Edit, Trash2, Search, Target } from "lucide-react"
import { ScreenHeader } from "@/components/ui/screen-header"

interface DeliveryAddress {
  id?: string
  name: string
  phone: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  pincode: string
  landmark?: string
  coordinates?: { lat: number; lng: number }
  type: "home" | "work" | "other"
}

interface AddressSelectorProps {
  onBack: () => void
  onAddressSelect: (address: DeliveryAddress) => void
  selectedAddress?: DeliveryAddress | null
}

const SAVED_ADDRESSES: DeliveryAddress[] = [
  {
    id: "1",
    name: "John Doe",
    phone: "+91 9876543210",
    addressLine1: "123 MG Road",
    addressLine2: "Near City Mall",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560001",
    landmark: "City Mall",
    type: "home",
    coordinates: { lat: 12.9716, lng: 77.5946 },
  },
  {
    id: "2",
    name: "John Doe",
    phone: "+91 9876543210",
    addressLine1: "456 Tech Park",
    addressLine2: "Building A, Floor 5",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560066",
    landmark: "Tech Park Gate",
    type: "work",
    coordinates: { lat: 12.9352, lng: 77.6245 },
  },
]

export function AddressSelector({ onBack, onAddressSelect, selectedAddress }: AddressSelectorProps) {
  const [addresses, setAddresses] = useState<DeliveryAddress[]>(SAVED_ADDRESSES)
  const [showAddForm, setShowAddForm] = useState(false)
  const [showMapSelector, setShowMapSelector] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [newAddress, setNewAddress] = useState<Partial<DeliveryAddress>>({
    type: "home",
  })

  const handleAddAddress = () => {
    if (
      newAddress.name &&
      newAddress.phone &&
      newAddress.addressLine1 &&
      newAddress.city &&
      newAddress.state &&
      newAddress.pincode
    ) {
      const address: DeliveryAddress = {
        id: Date.now().toString(),
        name: newAddress.name!,
        phone: newAddress.phone!,
        addressLine1: newAddress.addressLine1!,
        addressLine2: newAddress.addressLine2,
        city: newAddress.city!,
        state: newAddress.state!,
        pincode: newAddress.pincode!,
        landmark: newAddress.landmark,
        type: newAddress.type as "home" | "work" | "other",
        coordinates: newAddress.coordinates,
      }
      setAddresses([...addresses, address])
      setNewAddress({ type: "home" })
      setShowAddForm(false)
    }
  }

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setNewAddress((prev) => ({
            ...prev,
            coordinates: { lat: latitude, lng: longitude },
          }))
          // In a real app, you'd reverse geocode these coordinates
          alert(`Location detected: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`)
        },
        (error) => {
          alert("Unable to get your location. Please enter address manually.")
        },
      )
    }
  }

  if (showMapSelector) {
    return (
      <div className="flex flex-col h-full bg-gray-50">
        <ScreenHeader title="Select Location" onBack={() => setShowMapSelector(false)} />

        <div className="flex-1 relative">
          {/* Mock Map Interface */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-[#f15223] mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Interactive Map</h3>
              <p className="text-gray-600 mb-4">Tap to select your delivery location</p>
              <Button
                onClick={() => {
                  setNewAddress((prev) => ({
                    ...prev,
                    coordinates: { lat: 12.9716, lng: 77.5946 },
                    city: "Bangalore",
                    state: "Karnataka",
                  }))
                  setShowMapSelector(false)
                }}
              >
                Confirm Location
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="absolute top-4 left-4 right-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search for area, street name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white shadow-lg"
              />
            </div>
          </div>

          {/* Current Location Button */}
          <div className="absolute bottom-20 right-4">
            <Button size="icon" className="w-12 h-12 rounded-full shadow-lg" onClick={handleUseCurrentLocation}>
              <Target className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="bg-white p-4 border-t">
          <Button className="w-full" onClick={() => setShowMapSelector(false)}>
            Use This Location
          </Button>
        </div>
      </div>
    )
  }

  if (showAddForm) {
    return (
      <div className="flex flex-col h-full bg-gray-50">
        <ScreenHeader title="Add New Address" onBack={() => setShowAddForm(false)} />

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <Card className="shadow-sm border-0 bg-white rounded-xl">
            <CardContent className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter full name"
                    value={newAddress.name || ""}
                    onChange={(e) => setNewAddress((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    placeholder="Enter phone"
                    value={newAddress.phone || ""}
                    onChange={(e) => setNewAddress((prev) => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address1">Address Line 1 *</Label>
                <Input
                  id="address1"
                  placeholder="House/Flat/Office No, Building Name"
                  value={newAddress.addressLine1 || ""}
                  onChange={(e) => setNewAddress((prev) => ({ ...prev, addressLine1: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="address2">Address Line 2</Label>
                <Input
                  id="address2"
                  placeholder="Area, Street, Sector, Village"
                  value={newAddress.addressLine2 || ""}
                  onChange={(e) => setNewAddress((prev) => ({ ...prev, addressLine2: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    placeholder="City"
                    value={newAddress.city || ""}
                    onChange={(e) => setNewAddress((prev) => ({ ...prev, city: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    placeholder="State"
                    value={newAddress.state || ""}
                    onChange={(e) => setNewAddress((prev) => ({ ...prev, state: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="pincode">Pincode *</Label>
                  <Input
                    id="pincode"
                    placeholder="Pincode"
                    value={newAddress.pincode || ""}
                    onChange={(e) => setNewAddress((prev) => ({ ...prev, pincode: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="landmark">Landmark</Label>
                  <Input
                    id="landmark"
                    placeholder="Nearby landmark"
                    value={newAddress.landmark || ""}
                    onChange={(e) => setNewAddress((prev) => ({ ...prev, landmark: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label>Address Type</Label>
                <div className="flex gap-2 mt-2">
                  {(["home", "work", "other"] as const).map((type) => (
                    <Button
                      key={type}
                      variant={newAddress.type === type ? "default" : "outline"}
                      size="sm"
                      onClick={() => setNewAddress((prev) => ({ ...prev, type }))}
                      className="flex items-center gap-2"
                    >
                      {type === "home" && <Home className="w-4 h-4" />}
                      {type === "work" && <Building className="w-4 h-4" />}
                      {type === "other" && <MapPin className="w-4 h-4" />}
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Button onClick={() => setShowMapSelector(true)} variant="outline" className="w-full flex items-center gap-2">
            <Navigation className="w-4 h-4" />
            Use Map to Select Location
          </Button>
        </div>

        <div className="bg-white p-4 border-t">
          <Button className="w-full" onClick={handleAddAddress}>
            Save Address
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <ScreenHeader title="Select Address" onBack={onBack} />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Add New Address Button */}
        <Button onClick={() => setShowAddForm(true)} variant="outline" className="w-full flex items-center gap-2 h-12">
          <Plus className="w-4 h-4" />
          Add New Address
        </Button>

        {/* Saved Addresses */}
        <div className="space-y-3">
          {addresses.map((address) => (
            <Card
              key={address.id}
              className={`shadow-sm border-0 bg-white rounded-xl cursor-pointer transition-all ${
                selectedAddress?.id === address.id ? "ring-2 ring-[#f15223] bg-orange-50" : ""
              }`}
              onClick={() => onAddressSelect(address)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    {address.type === "home" && <Home className="w-5 h-5 text-gray-600" />}
                    {address.type === "work" && <Building className="w-5 h-5 text-gray-600" />}
                    {address.type === "other" && <MapPin className="w-5 h-5 text-gray-600" />}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{address.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {address.type.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{address.phone}</p>
                    <p className="text-sm text-gray-700">
                      {address.addressLine1}
                      {address.addressLine2 && `, ${address.addressLine2}`}
                    </p>
                    <p className="text-sm text-gray-700">
                      {address.city}, {address.state} - {address.pincode}
                    </p>
                    {address.landmark && <p className="text-sm text-gray-500">Near {address.landmark}</p>}
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
