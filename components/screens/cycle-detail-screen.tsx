"use client"

import { useState } from "react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, FileText, Receipt, MapPin, Package, CheckCircle, Activity, Truck } from "lucide-react"
import { ScreenHeader } from "@/components/ui/screen-header"
import type { CycleData } from "@/lib/types"

export function CycleDetailScreen({
  cycle,
  onBack,
}: {
  cycle: CycleData
  onBack: () => void
}) {
  const [activeTab, setActiveTab] = useState("delivery")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Complete":
        return "bg-green-100 text-green-700 border-green-200"
      case "In Progress":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "Upcoming":
        return "bg-orange-100 text-orange-700 border-orange-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const handleFileUpload = (type: string) => {
    console.log(`Uploading ${type} file`)
  }

  const getCycleOrdinal = (num: number) => {
    const suffixes = ["th", "st", "nd", "rd"]
    const v = num % 100
    return num + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0])
  }

  return (
    <div className="flex flex-col h-full">
      <ScreenHeader title={`${getCycleOrdinal(cycle.cycleNumber)} Cycle Details`} onBack={onBack} />

      {/* Cycle Info Header */}
      <div className="bg-white border-b border-gray-100 p-3">
        <Card className="shadow-sm border-0 bg-gray-50 rounded-xl overflow-hidden">
          <CardContent className="p-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-base text-gray-800">{getCycleOrdinal(cycle.cycleNumber)} Cycle</h3>
              <Badge className={`text-xs font-medium border ${getStatusColor(cycle.status)}`}>{cycle.status}</Badge>
            </div>
            <div className="space-y-1.5 text-sm text-gray-600">
              <p>
                <span className="font-medium">{cycle.status === "Complete" ? "Completed on:" : "Scheduled for:"}</span>{" "}
                {cycle.completedDate || cycle.scheduledDate}
              </p>
              <p>
                <span className="font-medium">Target Therapy Drug:</span> {cycle.targetTherapyDrug}
              </p>
              <p>
                <span className="font-medium">Therapy Type:</span> {cycle.therapyType}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex-1 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <div className="px-3 pt-3 pb-2 bg-white border-b border-gray-100">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100 rounded-lg p-1 h-16">
              <TabsTrigger
                value="delivery"
                className="text-xs font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm text-gray-600 rounded-md h-14 flex flex-col items-center justify-center gap-1"
              >
                <Package className="w-4 h-4" />
                Delivery
              </TabsTrigger>
              <TabsTrigger
                value="documents"
                className="text-xs font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm text-gray-600 rounded-md h-14 flex flex-col items-center justify-center gap-1"
              >
                <FileText className="w-4 h-4" />
                Documents
              </TabsTrigger>
              <TabsTrigger
                value="test-reports"
                className="text-xs font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm text-gray-600 rounded-md h-14 flex flex-col items-center justify-center gap-1"
              >
                <Activity className="w-4 h-4" />
                Test Reports
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-y-auto">
            <TabsContent value="delivery" className="mt-0 p-3 space-y-3">
              <Card className="shadow-sm border-0 bg-white rounded-xl overflow-hidden">
                <div className="px-3 pt-3 pb-2">
                  <CardTitle className="text-base font-semibold text-gray-800">Delivery Progress</CardTitle>
                </div>
                <CardContent className="space-y-4 px-3 pt-0 pb-3">
                  {/* Delivery Steps */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center ${
                          cycle.deliveryStatus?.ordered ? "bg-green-500" : "bg-gray-300"
                        }`}
                      >
                        {cycle.deliveryStatus?.ordered ? (
                          <CheckCircle className="w-4 h-4 text-white" />
                        ) : (
                          <span className="text-white font-bold text-xs">1</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 text-sm">Ordered</h4>
                        <p className="text-sm text-gray-600">Your medication has been ordered</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center ${
                          cycle.deliveryStatus?.shipped ? "bg-green-500" : "bg-gray-300"
                        }`}
                      >
                        {cycle.deliveryStatus?.shipped ? (
                          <CheckCircle className="w-4 h-4 text-white" />
                        ) : (
                          <Truck className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 text-sm">Shipped</h4>
                        <p className="text-sm text-gray-600">Your medication is on the way</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center ${
                          cycle.deliveryStatus?.delivered ? "bg-green-500" : "bg-gray-300"
                        }`}
                      >
                        {cycle.deliveryStatus?.delivered ? (
                          <CheckCircle className="w-4 h-4 text-white" />
                        ) : (
                          <Package className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 text-sm">Delivered</h4>
                        <p className="text-sm text-gray-600">Your medication has been delivered</p>
                      </div>
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div className="bg-gray-50 p-3 rounded-xl">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gray-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1 text-sm">Delivery Address</h4>
                        <p className="text-sm text-gray-600">{cycle.deliveryStatus?.deliveryAddress}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="mt-0 p-3 space-y-3">
              <Card className="shadow-sm border-0 bg-white rounded-xl overflow-hidden">
                <div className="px-3 pt-3 pb-2">
                  <CardTitle className="text-base font-semibold text-gray-800">Upload Documents</CardTitle>
                </div>
                <CardContent className="space-y-3 px-3 pt-0 pb-3">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-blue-400 transition-colors">
                      <FileText className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                      <h4 className="font-semibold text-gray-800 mb-1 text-sm">Discharge Summary</h4>
                      <p className="text-sm text-gray-600 mb-3">Upload your discharge summary document</p>
                      <Button
                        variant="outline"
                        className="font-medium text-sm bg-transparent"
                        onClick={() => handleFileUpload("discharge-summary")}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Document
                      </Button>
                    </div>

                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-blue-400 transition-colors">
                      <Receipt className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                      <h4 className="font-semibold text-gray-800 mb-1 text-sm">Purchase Invoice</h4>
                      <p className="text-sm text-gray-600 mb-3">Upload your purchase invoice</p>
                      <Button
                        variant="outline"
                        className="font-medium text-sm bg-transparent"
                        onClick={() => handleFileUpload("purchase-invoice")}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Document
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="test-reports" className="mt-0 p-3 space-y-3">
              <Card className="shadow-sm border-0 bg-white rounded-xl overflow-hidden">
                <div className="px-3 pt-3 pb-2">
                  <CardTitle className="text-base font-semibold text-gray-800">Upload Test Reports</CardTitle>
                </div>
                <CardContent className="px-3 pt-0 pb-3">
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                    <Activity className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                    <h4 className="font-semibold text-base text-gray-800 mb-2">Test Reports</h4>
                    <p className="text-sm text-gray-600 mb-4">Upload your lab test reports and medical documents</p>
                    <Button className="text-sm" onClick={() => handleFileUpload("test-reports")}>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Test Reports
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
