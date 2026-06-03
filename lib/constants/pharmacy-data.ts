export interface PharmacyLink {
  id: string
  title: string
  subtitle: string
  icon: string
  action: string
  url: string
}

export interface InfoItem {
  id: string
  title: string
  subtitle: string
  icon: string
  action: string
}

export interface RecommendationSection {
  title: string
  type: string
  items: (PharmacyLink | InfoItem)[]
}

export const PHARMACY_LINKS: PharmacyLink[] = [
  {
    id: "apollo-pharmacy",
    title: "Apollo Pharmacy",
    subtitle: "Free delivery • Prescription required",
    icon: "🏥",
    action: "pharmacy-link",
    url: "https://www.apollopharmacy.in",
  },
  {
    id: "netmeds",
    title: "Netmeds",
    subtitle: "24/7 service • Express delivery",
    icon: "💊",
    action: "pharmacy-link",
    url: "https://www.netmeds.com",
  },
  {
    id: "pharmeasy",
    title: "PharmEasy",
    subtitle: "Discount available • Home delivery",
    icon: "🚚",
    action: "pharmacy-link",
    url: "https://pharmeasy.in",
  },
  {
    id: "1mg",
    title: "1mg",
    subtitle: "Genuine medicines • Quick delivery",
    icon: "⚡",
    action: "pharmacy-link",
    url: "https://www.1mg.com",
  },
]

export const PRESCRIPTION_INFO: InfoItem[] = [
  {
    id: "prescription-required",
    title: "Prescription Required",
    subtitle: "Your treatment requires a valid prescription",
    icon: "📄",
    action: "info-item",
  },
  {
    id: "insurance-coverage",
    title: "Check Insurance Coverage",
    subtitle: "Verify if your insurance covers the cost",
    icon: "🛡️",
    action: "info-item",
  },
  {
    id: "storage-instructions",
    title: "Proper Storage",
    subtitle: "Keep refrigerated (2-8°C)",
    icon: "❄️",
    action: "info-item",
  },
]

export const VIDEO_TUTORIALS = [
  {
    id: "injection-technique",
    title: "Proper Injection Technique",
    subtitle: "8 min tutorial • Beginner friendly",
    icon: "🎬",
    action: "video-content",
  },
  {
    id: "pen-preparation",
    title: "Preparing Your Medication",
    subtitle: "5 min guide • Pre-injection steps",
    icon: "📹",
    action: "video-content",
  },
  {
    id: "site-rotation",
    title: "Injection Site Rotation",
    subtitle: "6 min explanation • Best practices",
    icon: "🔄",
    action: "video-content",
  },
  {
    id: "troubleshooting",
    title: "Common Issues & Solutions",
    subtitle: "10 min comprehensive guide",
    icon: "🛠️",
    action: "video-content",
  },
]

export const INJECTION_GUIDES = [
  {
    id: "injection-checklist",
    title: "Pre-Injection Checklist",
    subtitle: "Step-by-step preparation guide",
    icon: "✅",
    action: "educational-content",
  },
  {
    id: "safety-tips",
    title: "Safety Tips & Best Practices",
    subtitle: "Ensure safe administration",
    icon: "🛡️",
    action: "educational-content",
  },
  {
    id: "disposal-guide",
    title: "Proper Disposal of Pens",
    subtitle: "Safe disposal methods",
    icon: "♻️",
    action: "educational-content",
  },
]

export const INJECTION_TOOLS = [
  {
    id: "set-injection-reminder",
    title: "Set Weekly Injection Reminder",
    subtitle: "Never miss your dose",
    icon: "⏰",
    action: "set-reminder",
  },
  {
    id: "track-injection-sites",
    title: "Track Injection Sites",
    subtitle: "Log rotation pattern",
    icon: "📍",
    action: "track-sites",
  },
  {
    id: "contact-nurse",
    title: "Contact Nurse for Demo",
    subtitle: "Schedule in-person training",
    icon: "👩‍⚕️",
    action: "contact-nurse",
  },
]

export const DRUG_EDUCATION = [
  {
    id: "mechanism-action",
    title: "Mechanism of Action",
    subtitle: "How your treatment works in your body",
    icon: "⚙️",
    action: "educational-content",
  },
  {
    id: "clinical-studies",
    title: "Clinical Trial Results",
    subtitle: "Evidence-based effectiveness data",
    icon: "📊",
    action: "educational-content",
  },
  {
    id: "side-effects-guide",
    title: "Complete Side Effects Guide",
    subtitle: "Common, rare, and serious effects",
    icon: "⚠️",
    action: "educational-content",
  },
  {
    id: "drug-interactions",
    title: "Drug Interactions",
    subtitle: "Medications to avoid or monitor",
    icon: "🔄",
    action: "educational-content",
  },
]