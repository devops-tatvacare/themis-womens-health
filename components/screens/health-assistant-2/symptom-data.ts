// Symptom tracking data - menstrual, perimenopause & menopause symptoms
// Smart organization with maintainable symptom definitions

export interface Symptom {
  id: string
  name: string
  emoji: string
  hasBodyLocation: boolean
  intensityRange: {
    min: number
    max: number
    unit: string
    labels: {
      low: string
      high: string
    }
  }
}

// Women's-health symptoms: cycle, perimenopause & menopause
export const WOMENS_HEALTH_SYMPTOMS: Symptom[] = [
  {
    id: "cramps",
    name: "Cramps",
    emoji: "🩸",
    hasBodyLocation: true,
    intensityRange: {
      min: 1,
      max: 10,
      unit: "severity",
      labels: { low: "Mild", high: "Severe" }
    }
  },
  {
    id: "hot-flushes",
    name: "Hot Flushes",
    emoji: "🔥",
    hasBodyLocation: false,
    intensityRange: {
      min: 1,
      max: 10,
      unit: "severity",
      labels: { low: "Mild", high: "Severe" }
    }
  },
  {
    id: "night-sweats",
    name: "Night Sweats",
    emoji: "💦",
    hasBodyLocation: false,
    intensityRange: {
      min: 1,
      max: 10,
      unit: "severity",
      labels: { low: "Mild", high: "Drenching" }
    }
  },
  {
    id: "mood-changes",
    name: "Mood Changes",
    emoji: "😟",
    hasBodyLocation: false,
    intensityRange: {
      min: 1,
      max: 10,
      unit: "severity",
      labels: { low: "Mild", high: "Severe" }
    }
  },
  {
    id: "sleep-disturbances",
    name: "Sleep Disturbances",
    emoji: "😴",
    hasBodyLocation: false,
    intensityRange: {
      min: 1,
      max: 10,
      unit: "severity",
      labels: { low: "Mild", high: "Severe" }
    }
  },
  {
    id: "bloating",
    name: "Bloating",
    emoji: "🎈",
    hasBodyLocation: false,
    intensityRange: {
      min: 1,
      max: 10,
      unit: "severity",
      labels: { low: "Slight", high: "Significant" }
    }
  },
  {
    id: "breast-tenderness",
    name: "Breast Tenderness",
    emoji: "🌸",
    hasBodyLocation: false,
    intensityRange: {
      min: 1,
      max: 10,
      unit: "severity",
      labels: { low: "Mild", high: "Severe" }
    }
  },
  {
    id: "low-energy",
    name: "Low Energy",
    emoji: "🪫",
    hasBodyLocation: false,
    intensityRange: {
      min: 1,
      max: 10,
      unit: "tiredness",
      labels: { low: "Slight", high: "Exhausted" }
    }
  },
  {
    id: "headache",
    name: "Headache",
    emoji: "🤕",
    hasBodyLocation: true,
    intensityRange: {
      min: 1,
      max: 10,
      unit: "pain level",
      labels: { low: "Mild", high: "Severe" }
    }
  },
  {
    id: "nausea",
    name: "Nausea",
    emoji: "🤢",
    hasBodyLocation: false,
    intensityRange: {
      min: 1,
      max: 10,
      unit: "intensity",
      labels: { low: "Mild", high: "Severe" }
    }
  }
]

// Keep backward compatibility with existing imports
export const SEMAGLUTIDE_SYMPTOMS = WOMENS_HEALTH_SYMPTOMS

// Frequency options for all symptoms
export const SYMPTOM_FREQUENCIES = [
  { id: "rarely", label: "Rarely (once a week or less)", value: "rarely" },
  { id: "occasionally", label: "Occasionally (2-3 times/week)", value: "occasionally" },
  { id: "frequently", label: "Frequently (daily)", value: "frequently" },
  { id: "constantly", label: "Constantly (multiple times/day)", value: "constantly" }
]

// Body location mappings for location-specific symptoms
export const BODY_LOCATIONS = {
  "headache": [
    { id: "forehead", label: "Forehead", icon: "🤕" },
    { id: "temples", label: "Temples", icon: "🤕" },
    { id: "back-head", label: "Back of Head", icon: "🤕" },
    { id: "top-head", label: "Top of Head", icon: "🤕" },
    { id: "entire-head", label: "Entire Head", icon: "🤕" }
  ],
  "cramps": [
    { id: "lower-abdomen", label: "Lower Abdomen", icon: "🩸" },
    { id: "lower-back", label: "Lower Back", icon: "🩸" },
    { id: "pelvis", label: "Pelvis", icon: "🩸" },
    { id: "inner-thighs", label: "Inner Thighs", icon: "🩸" }
  ]
}

// Utility functions
export const getSymptomById = (id: string): Symptom | undefined => {
  return WOMENS_HEALTH_SYMPTOMS.find(symptom => symptom.id === id)
}

export const getSymptomByName = (name: string): Symptom | undefined => {
  return WOMENS_HEALTH_SYMPTOMS.find(symptom => symptom.name === name)
}

export const getBodyLocationsForSymptom = (symptomId: string) => {
  return BODY_LOCATIONS[symptomId as keyof typeof BODY_LOCATIONS] || []
}
