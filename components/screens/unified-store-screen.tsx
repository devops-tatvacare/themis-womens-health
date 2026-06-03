"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, ShoppingCart, TestTube, Pill, Calendar, Leaf, Star, Plus } from "lucide-react"
import { ScreenHeader } from "@/components/ui/screen-header"
import { LAB_TESTS, CARE_PRODUCTS } from "@/lib/constants/data"
import { CARE_PLANS } from "@/lib/constants/care-plans"
import { useCart } from "@/lib/hooks/use-cart"
import { CartScreen } from "@/components/screens/cart-screen"
import { CheckoutScreen } from "@/components/screens/checkout-screen"

interface UnifiedStoreScreenProps {
  onBack: () => void
}

const PHARMACY_PRODUCTS = [
  {
    id: "actibile-10",
    name: "Actibile 10mg",
    price: 399,
    discountedPrice: 299,
    discount: "25% OFF",
    category: "Tablets",
    rating: 4.5,
    inStock: true,
  },
  {
    id: "actibile-20",
    name: "Actibile 20mg",
    price: 599,
    discountedPrice: 449,
    discount: "25% OFF",
    category: "Tablets",
    rating: 4.6,
    inStock: true,
  },
]

const SUPPLEMENTS = [
  ...CARE_PRODUCTS.slice(0, 2),
  {
    id: "omega-3",
    name: "Omega-3 Fish Oil",
    price: 899,
    discountedPrice: 699,
    discount: "22% OFF",
    category: "Supplements",
    rating: 4.4,
    inStock: true,
  },
  {
    id: "vitamin-d",
    name: "Vitamin D3 2000 IU",
    price: 599,
    discountedPrice: 449,
    discount: "25% OFF",
    category: "Vitamins",
    rating: 4.3,
    inStock: true,
  },
]

type StoreView = "store" | "cart" | "checkout"

export function UnifiedStoreScreen({ onBack }: UnifiedStoreScreenProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("tests")
  const [currentView, setCurrentView] = useState<StoreView>("store")
  const { addToCart, getCartCount } = useCart()

  const handleAddToCart = (item: any, category: string) => {
    addToCart({
      id: item.id || item.name,
      name: item.name,
      price: item.discountedPrice || item.price,
      originalPrice: item.price,
      category,
      image: "/placeholder.svg?height=60&width=60",
    })
  }

  const handleNavigateToCart = () => {
    setCurrentView("cart")
  }

  const handleNavigateToCheckout = () => {
    setCurrentView("checkout")
  }

  const handleBackToStore = () => {
    setCurrentView("store")
  }

  const handleBackToCart = () => {
    setCurrentView("cart")
  }

  // Cart Screen
  if (currentView === "cart") {
    return <CartScreen onBack={handleBackToStore} onCheckout={handleNavigateToCheckout} />
  }

  // Checkout Screen
  if (currentView === "checkout") {
    return <CheckoutScreen onBack={handleBackToCart} onOrderComplete={onBack} />
  }

  const renderProductCard = (item: any, category: string) => (
    <Card key={item.id || item.name} className="shadow-sm border-0 bg-white rounded-xl overflow-hidden">
      <CardContent className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2.5 flex-1">
            <div className="bg-gray-50 p-2 rounded-lg">
              {category === "tests" && <TestTube className="w-4 h-4 text-blue-600" />}
              {category === "pharmacy" && <Pill className="w-4 h-4 text-green-600" />}
              {category === "plans" && <Calendar className="w-4 h-4 text-purple-600" />}
              {category === "supplements" && <Leaf className="w-4 h-4 text-emerald-600" />}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm text-gray-800 truncate">{item.name}</h3>
              <p className="text-xs text-gray-500">
                {item.category}
                {item.rating && (
                  <>
                    {" • "}
                    <Star className="w-3 h-3 inline fill-yellow-400 text-yellow-400" />
                    {item.rating}
                  </>
                )}
              </p>
            </div>
          </div>
          {item.discount && (
            <Badge className="bg-[#f15223]/10 text-[#f15223] border-[#f15223]/20 text-xs font-bold">
              {item.discount}
            </Badge>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-base font-bold text-black">₹{item.discountedPrice || item.price}</span>
            {item.discountedPrice && (
              <span className="text-xs font-normal text-gray-500 line-through">₹{item.price}</span>
            )}
          </div>
          <Button size="sm" onClick={() => handleAddToCart(item, category)}>
            <Plus className="w-3 h-3 mr-1" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  // Store Screen (default view)
  return (
    <div className="flex flex-col h-full">
      <ScreenHeader
        title="Health Store"
        onBack={onBack}
        rightElement={
          <Button variant="ghost" size="icon" className="relative" onClick={handleNavigateToCart}>
            <ShoppingCart className="w-5 h-5" />
            {getCartCount() > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-[#f15223] text-white">
                {getCartCount()}
              </Badge>
            )}
          </Button>
        }
      />

      {/* Search Bar */}
      <div className="p-4 bg-white border-b border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4"
          />
        </div>
      </div>

      {/* Store Tabs */}
      <div className="flex-1 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <div className="px-4 pt-3 pb-2 bg-white border-b border-gray-100">
            <TabsList className="grid w-full grid-cols-4 bg-gray-50 rounded-xl p-1 h-12">
              <TabsTrigger
                value="tests"
                className="text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm text-gray-600 rounded-lg py-2"
              >
                Tests
              </TabsTrigger>
              <TabsTrigger
                value="pharmacy"
                className="text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-green-600 data-[state=active]:shadow-sm text-gray-600 rounded-lg py-2"
              >
                Pharmacy
              </TabsTrigger>
              <TabsTrigger
                value="plans"
                className="text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-purple-600 data-[state=active]:shadow-sm text-gray-600 rounded-lg py-2"
              >
                Plans
              </TabsTrigger>
              <TabsTrigger
                value="supplements"
                className="text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-emerald-600 data-[state=active]:shadow-sm text-gray-600 rounded-lg py-2"
              >
                Wellness
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-y-auto">
            <TabsContent value="tests" className="mt-0 p-4 space-y-3">
              {LAB_TESTS.map((test) => renderProductCard(test, "tests"))}
            </TabsContent>

            <TabsContent value="pharmacy" className="mt-0 p-4 space-y-3">
              {PHARMACY_PRODUCTS.map((product) => renderProductCard(product, "pharmacy"))}
            </TabsContent>

            <TabsContent value="plans" className="mt-0 p-4 space-y-3">
              {CARE_PLANS.map((plan) => renderProductCard(plan, "plans"))}
            </TabsContent>

            <TabsContent value="supplements" className="mt-0 p-4 space-y-3">
              {SUPPLEMENTS.map((supplement) => renderProductCard(supplement, "supplements"))}
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
