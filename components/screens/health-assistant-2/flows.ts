import { Message, MessageFlow } from "./types"
import { ASSESSMENT_QUESTIONS, GENERATED_PLAN_DATA } from "./constants"

// Message Flow Templates for Different Actions
export const MESSAGE_FLOWS: Record<string, MessageFlow> = {
  "order-drug": {
    id: "order-drug",
    name: "Order Prescription Flow",
    messages: [
      {
        content: "I'll help you order your prescription. Let me show you the available options and guide you through the process.",
        isUser: false,
        type: "unified-message",
        data: {
          type: "order-drug",
          title: "Order Your Prescription",
          message: "I'll help you order your prescription through your preferred pharmacy.",
          primaryAction: "Shop Now",
          secondaryAction: "Browse Options",
          sections: [
            {
              title: "Pharmacy Partners",
              items: [
                { title: "CVS Pharmacy", subtitle: "Free same-day delivery", action: "order-cvs" },
                { title: "Walgreens", subtitle: "24/7 pickup available", action: "order-walgreens" },
                { title: "Express Scripts", subtitle: "Mail order pharmacy", action: "order-express" }
              ]
            },
            {
              title: "Prescription Details",
              items: [
                { title: "Prescribed Treatment", subtitle: "Current dosage", action: "view-details" },
                { title: "Dosing Schedule", subtitle: "As prescribed by your doctor", action: "view-schedule" }
              ]
            }
          ]
        }
      }
    ]
  },

  "take-medication": {
    id: "take-medication",
    name: "Take Medication Flow",
    messages: [
      {
        content: "Let me guide you through taking your prescribed medication with step-by-step instructions and safety tips.",
        isUser: false,
        type: "unified-message",
        data: {
          type: "administer-drug",
          title: "Medication Guide",
          message: "Follow these steps for safe and effective administration of your prescribed treatment.",
          primaryAction: "Start",
          secondaryAction: "Watch Video",
          sections: [
            {
              title: "Pre-Medication Checklist",
              items: [
                { title: "Wash your hands", subtitle: "Use soap and warm water for 20 seconds", action: "check-hands" },
                { title: "Check expiration date", subtitle: "Ensure medication is not expired", action: "check-date" },
                { title: "Verify dosage", subtitle: "Confirm with your prescription label", action: "check-dosage" }
              ]
            },
            {
              title: "Administration Steps",
              items: [
                { title: "Take with water", subtitle: "Follow dosing instructions", action: "take-dose" },
                { title: "Note the time", subtitle: "Maintain consistent timing", action: "log-time" },
                { title: "Take with or without food", subtitle: "As directed by your doctor", action: "food-guidance" }
              ]
            },
            {
              title: "Post-Medication Care",
              items: [
                { title: "Monitor for side effects", subtitle: "Note any changes in how you feel", action: "monitor-effects" },
                { title: "Record medication", subtitle: "Log date and time taken", action: "log-medication" }
              ]
            }
          ]
        }
      }
    ]
  },

  "know-treatment": {
    id: "know-treatment",
    name: "Know Your Treatment Flow",
    messages: [
      {
        content: "Here's comprehensive information about your treatment to help you understand your care plan better.",
        isUser: false,
        type: "unified-message",
        data: {
          type: "drug-education",
          title: "Your Treatment: Complete Guide",
          message: "Understanding your treatment is key to successful care. Here's everything you need to know about your prescribed therapy.",
          primaryAction: "Learn More",
          secondaryAction: "Ask Questions",
          sections: [
            {
              title: "How Your Treatment Works",
              items: [
                { title: "Hormone Balance", subtitle: "Helps restore oestrogen levels to ease symptoms", action: "learn-mechanism" },
                { title: "Hot Flush Relief", subtitle: "Reduces frequency and intensity of hot flushes", action: "learn-protection" },
                { title: "Bone & Mood Support", subtitle: "Supports bone health and a steadier mood", action: "learn-neurotransmitters" }
              ]
            },
            {
              title: "Benefits & Effects",
              items: [
                { title: "Symptom Relief", subtitle: "May ease hot flushes, night sweats and mood swings", action: "view-memory-data" },
                { title: "Better Sleep & Energy", subtitle: "Supports more restful sleep and daily energy", action: "view-function-data" },
                { title: "Quality of Life", subtitle: "Aims to help you feel like yourself again", action: "view-qol-benefits" }
              ]
            },
            {
              title: "Important Safety Information",
              items: [
                { title: "Common Side Effects", subtitle: "Nausea, dizziness, headache (usually temporary)", action: "view-side-effects" },
                { title: "When to Contact Doctor", subtitle: "Severe symptoms or allergic reactions", action: "view-warnings" },
                { title: "Other Medications", subtitle: "Inform your doctor of all medications", action: "check-interactions" }
              ]
            }
          ]
        }
      }
    ]
  },

  "start-assessment": {
    id: "start-assessment", 
    name: "Health Assessment Flow",
    messages: [
      {
        content: "I'll help you create a personalized health plan. Let me ask you a few questions about your health, lifestyle, and goals.",
        isUser: false,
        type: "normal"
      }
      // Assessment questions will be dynamically added based on ASSESSMENT_QUESTIONS
    ]
  }
}

// Helper function to create assessment flow messages
export const createAssessmentFlow = (): Message[] => {
  const messages: Message[] = [
    {
      id: Date.now().toString(),
      content: "I'll help you create a personalized health plan. Let me ask you a few questions about your health, lifestyle, and goals.",
      isUser: false,
      timestamp: new Date(),
      type: "normal"
    }
  ]

  // Add each assessment question as a message
  ASSESSMENT_QUESTIONS.forEach((question, index) => {
    messages.push({
      id: (Date.now() + index + 1).toString(),
      content: `Question ${index + 1} of ${ASSESSMENT_QUESTIONS.length}: ${question.question}`,
      isUser: false,
      timestamp: new Date(),
      type: question.questionType === "single-choice" || question.questionType === "multiple-choice" 
        ? "assessment-choice" 
        : "assessment-input",
      data: {
        questionId: question.id,
        questionType: question.questionType,
        options: question.options,
        placeholder: question.placeholder
      },
      isActive: index === 0 // Only first question is active initially
    })
  })

  return messages
}

// Helper function to create AI generation and plan ready messages
export const createPlanGenerationFlow = (): Message[] => {
  return [
    {
      id: Date.now().toString(),
      content: "AI is analyzing your responses...",
      isUser: false,
      timestamp: new Date(),
      type: "ai-generation"
    },
    {
      id: (Date.now() + 1).toString(),
      content: "🎉 Great news! Your personalized health plan is ready. This comprehensive plan is tailored specifically to your goals, preferences, and health profile.",
      isUser: false,
      timestamp: new Date(),
      type: "plan-ready-card",
      data: GENERATED_PLAN_DATA
    }
  ]
}

// Action to Flow Mapping
export const ACTION_FLOW_MAP: Record<string, string> = {
  "order-drug": "order-drug",
  "take-injection": "take-injection", 
  "know-drug": "know-drug",
  "start-assessment": "start-assessment"
}

// Helper function to get flow messages for an action
export const getFlowMessages = (action: string): Message[] => {
  const flowId = ACTION_FLOW_MAP[action]
  if (!flowId) return []

  const flow = MESSAGE_FLOWS[flowId]
  if (!flow) return []

  if (flowId === "start-assessment") {
    return createAssessmentFlow()
  }

  return flow.messages.map((template, index) => ({
    ...template,
    id: (Date.now() + index).toString(),
    timestamp: new Date()
  }))
}

// Helper function to handle action clicks and return appropriate messages
export const handleActionFlow = (action: string): Message[] => {
  console.log("Handling action flow for:", action)
  return getFlowMessages(action)
}