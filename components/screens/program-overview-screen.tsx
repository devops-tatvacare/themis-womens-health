"use client"

import { Award, Users, Heart, Target, CheckCircle, Coins } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScreenLayout } from "@/components/layouts/screen-layout"

interface ProgramOverviewScreenProps {
  onBack: () => void
}

export function ProgramOverviewScreen({ onBack }: ProgramOverviewScreenProps) {
  return (
    <ScreenLayout title="Care Program Overview" onBack={onBack}>
      <div className="space-y-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
              Get our Care Program for <span className="text-green-600">free</span> with Actibile Purchase
            </h1>
            <p className="text-[var(--text-secondary)]">Comprehensive liver care with dedicated support</p>
          </div>
        </div>

        {/* Program Offerings */}
        <div className="bg-white rounded-xl p-6 border border-[var(--border-color)]">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Program Offerings</h2>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-1">Dedicated Coaches</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Get dedicated support from nutritionists, health coaches and psychologists to improve your liver
                  condition
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-1">Personalized Care Plans</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Customized treatment plans based on your specific condition and health goals
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-1">Progress Tracking</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Monitor your health metrics and treatment progress with advanced analytics
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Coins className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-1">Care Coins</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Earn Care Coins with every purchase that can be redeemed for booking lab tests and more healthcare
                  services
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Program Benefits */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Crafted with Liver specialists</h3>
                <p className="text-purple-100 text-sm">Expert-designed treatment protocols</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Trusted by 10,000+ customers</h3>
                <p className="text-purple-100 text-sm">Proven results and patient satisfaction</p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="bg-white rounded-xl p-6 border border-[var(--border-color)]">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">What's Included</h2>

          <div className="space-y-3">
            {[
              "24/7 access to healthcare professionals",
              "Personalized nutrition and exercise plans",
              "Regular health monitoring and check-ins",
              "Educational resources and workshops",
              "Medication management support",
              "Lab test coordination and analysis",
              "Progress tracking and reporting",
              "Community support groups",
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-[var(--text-secondary)]">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[var(--app-primary)] to-orange-500 rounded-xl p-6 text-white text-center">
          <h2 className="text-xl font-bold mb-2">Ready to Start Your Journey?</h2>
          <p className="text-orange-100 mb-4">
            Join thousands of patients who have improved their liver health with our comprehensive care program.
          </p>
          <Button variant="outline" className="bg-white text-[var(--app-primary)] border-white hover:bg-orange-50">
            Get Started Today
          </Button>
        </div>
      </div>
    </ScreenLayout>
  )
}
