"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Mic, Camera, Paperclip, Plus, Phone, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { VoiceRecordingScreen } from "./voice-recording-screen"
import { MedicationSelectorWorkflow } from "@/components/workflows/medication-selector-workflow"
import { SymptomQuestionWorkflow } from "@/components/workflows/symptom-question-workflow"
import { WomacQuestionWorkflow } from "@/components/workflows/womac-question-workflow"

interface SymptomQuestion {
  id: string
  question: string
  type: "slider" | "select"
  options?: string[]
  min?: number
  max?: number
  minLabel?: string
  maxLabel?: string
}

interface WomacQuestion {
  id: string
  section: "Physical Function" | "Self-Esteem" | "Social"
  question: string
}

interface AssessmentQuestion {
  id: string
  question: string
  type: "slider" | "select"
  options?: string[]
  min?: number
  max?: number
  minLabel?: string
  maxLabel?: string
}

const WOMAC_QUESTIONS: WomacQuestion[] = [
  { id: "energy_day", section: "Physical Function", question: "How would you rate your energy levels throughout the day?" },
  { id: "physical_activity", section: "Physical Function", question: "How much do your symptoms limit your physical activity?" },
  { id: "daily_tasks", section: "Physical Function", question: "How difficult is it to perform your daily tasks and chores?" },
  { id: "body_image", section: "Self-Esteem", question: "How confident do you feel about your body and wellbeing?" },
  { id: "mood", section: "Self-Esteem", question: "How often do you experience mood swings or irritability?" },
  { id: "sleep_quality", section: "Self-Esteem", question: "How satisfied are you with your sleep quality?" },
  { id: "social_participation", section: "Social", question: "How much do your symptoms limit your participation in social activities?" },
  { id: "overall_qol", section: "Social", question: "Overall, how would you rate your quality of life right now?" },
]

// MRS severity scale shared across the Menopause Rating Scale questions
const MRS_OPTIONS = ["None", "Mild", "Moderate", "Severe", "Very Severe"]

// "Wellbeing Check (MRS)" — Menopause Rating Scale quality-of-life option
const AD_QOL_QUESTIONS: AssessmentQuestion[] = [
  { id: "qol_symptom_impact", question: "Overall, how much do menopausal symptoms affect your daily life?", type: "select", options: ["Not at all", "A little", "Moderately", "Quite a bit", "A great deal"] },
  { id: "qol_energy", question: "How would you rate your energy levels lately?", type: "slider", min: 1, max: 5, minLabel: "Very Low", maxLabel: "Very High" },
  { id: "qol_mood", question: "How often do you feel emotionally balanced during the day?", type: "select", options: ["Rarely", "Sometimes", "Often", "Most of the time", "Always"] },
  { id: "qol_sleep", question: "How restorative is your sleep?", type: "slider", min: 1, max: 5, minLabel: "Not Restorative", maxLabel: "Very Restorative" },
  { id: "qol_confidence", question: "How confident do you feel managing your symptoms?", type: "slider", min: 1, max: 5, minLabel: "Not Confident", maxLabel: "Very Confident" },
]

const STARS_AMD_QUESTIONS: AssessmentQuestion[] = [
  { id: "mrs_hot_flashes", question: "Hot flashes and sweating", type: "select", options: MRS_OPTIONS },
  { id: "mrs_heart_discomfort", question: "Heart discomfort (racing, skipping, tightness)", type: "select", options: MRS_OPTIONS },
  { id: "mrs_sleep_problems", question: "Sleep problems (difficulty falling or staying asleep)", type: "select", options: MRS_OPTIONS },
  { id: "mrs_depressive_mood", question: "Depressive mood (feeling down, sad, tearful)", type: "select", options: MRS_OPTIONS },
  { id: "mrs_irritability", question: "Irritability (feeling tense, easily upset)", type: "select", options: MRS_OPTIONS },
]

// "Symptom & Cycle Check" — short daily-style check
const COGNITIVE_ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  { id: "daily_flow", question: "How would you describe your flow today?", type: "select", options: ["None", "Spotting", "Light", "Normal", "Heavy"] },
  { id: "daily_cramps", question: "How intense are your cramps right now?", type: "slider", min: 1, max: 5, minLabel: "None", maxLabel: "Severe" },
  { id: "daily_mood", question: "How is your mood today?", type: "select", options: ["Low", "Irritable", "Neutral", "Good", "Great"] },
  { id: "daily_sleep", question: "How well did you sleep last night?", type: "slider", min: 1, max: 5, minLabel: "Very Poor", maxLabel: "Very Good" },
  { id: "daily_energy", question: "How are your energy levels today?", type: "slider", min: 1, max: 5, minLabel: "Very Low", maxLabel: "Very High" },
]

// "Wellbeing Check (MRS)" — full Menopause Rating Scale: 11 symptoms across 3 groups, each scored 0-4
const ALZHEIMERS_ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  // Somatic
  { id: "mrs_hot_flashes", question: "Hot flashes, sweating (episodes of sweating)", type: "select", options: MRS_OPTIONS },
  { id: "mrs_heart_discomfort", question: "Heart discomfort (racing, skipping beats, tightness)", type: "select", options: MRS_OPTIONS },
  { id: "mrs_sleep_problems", question: "Sleep problems (difficulty falling asleep, waking early)", type: "select", options: MRS_OPTIONS },
  { id: "mrs_joint_muscle", question: "Joint and muscular discomfort (aches, pain)", type: "select", options: MRS_OPTIONS },
  // Psychological
  { id: "mrs_depressive_mood", question: "Depressive mood (feeling down, sad, tearful, mood swings)", type: "select", options: MRS_OPTIONS },
  { id: "mrs_irritability", question: "Irritability (feeling nervous, tense, easily upset)", type: "select", options: MRS_OPTIONS },
  { id: "mrs_anxiety", question: "Anxiety (inner restlessness, feeling panicky)", type: "select", options: MRS_OPTIONS },
  { id: "mrs_exhaustion", question: "Physical and mental exhaustion (low performance, forgetfulness)", type: "select", options: MRS_OPTIONS },
  // Urogenital
  { id: "mrs_sexual_problems", question: "Sexual problems (change in desire, activity, satisfaction)", type: "select", options: MRS_OPTIONS },
  { id: "mrs_bladder_problems", question: "Bladder problems (difficulty, urgency, leaking)", type: "select", options: MRS_OPTIONS },
  { id: "mrs_vaginal_dryness", question: "Dryness of the vagina (sensation of dryness or discomfort)", type: "select", options: MRS_OPTIONS },
]

const SYMPTOM_QUESTIONS: SymptomQuestion[] = [
  {
    id: "neurological_symptoms",
    question: "How is your flow today?",
    type: "select",
    options: [
      "None",
      "Spotting",
      "Light",
      "Normal",
      "Heavy",
      "Very heavy / flooding",
      "Bleeding between periods",
    ],
  },
  {
    id: "infusion_reactions",
    question: "Which symptoms are you noticing today?",
    type: "select",
    options: [
      "Cramps",
      "Hot flashes",
      "Headache",
      "Bloating",
      "Breast tenderness",
      "Severe pelvic pain",
      "Fainting or severe dizziness",
      "None of the above",
    ],
  },
  {
    id: "symptom_severity",
    question: "How severe are your symptoms?",
    type: "slider",
    min: 1,
    max: 10,
    minLabel: "Mild",
    maxLabel: "Severe",
  },
  {
    id: "symptom_duration",
    question: "How is your mood today?",
    type: "select",
    options: ["Low", "Irritable", "Anxious", "Neutral", "Good", "Great"],
  },
  {
    id: "sleep_quality",
    question: "How well did you sleep last night?",
    type: "select",
    options: ["Very poor", "Poor", "Okay", "Good", "Very good"],
  },
]

interface Message {
  id: string
  type: "user" | "assistant" | "workflow"
  content: string
  timestamp: Date
  quickActions?: QuickAction[]
  workflowType?:
    | "pain"
    | "medication"
    | "symptom_question"
    | "womac_question"
    | "womac_intro"
    | "assessment_selector"
    | "assessment_question"
    | "stars_intro"
    | "pv_alert"
  workflowData?: {
    disabled: boolean
    selectedValue?: any
    symptomQuestion?: SymptomQuestion
    symptomProgress?: {
      currentIndex: number
      responses: Record<string, string | number>
    }
    womacQuestion?: WomacQuestion
    womacProgress?: {
      currentIndex: number
      responses: Record<string, number>
    }
    assessmentQuestion?: AssessmentQuestion
    assessmentProgress?: {
      currentIndex: number
      responses: Record<string, string | number>
      assessmentType: "ad_qol" | "cognitive" | "stars_amd" // Updated type definition
    }
  }
}

interface QuickAction {
  label: string
  action: string
}

const initialMessages: Message[] = [
  {
    id: "1",
    type: "assistant",
    content:
      "Hi! I'm Kaira, your AI Health Assistant. I'm here to support your women's health journey — daily logging, cycle tracking, symptoms, and check-ins. How can I help you today?",
    timestamp: new Date(),
  },
]

interface HealthAssistantScreenProps {
  onBack?: () => void
  initialAction?: string
}

export function HealthAssistantScreen({ onBack, initialAction }: HealthAssistantScreenProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showVoiceRecording, setShowVoiceRecording] = useState(false)
  const [symptomWorkflowState, setSymptomWorkflowState] = useState<{
    active: boolean
    currentIndex: number
    responses: Record<string, string | number>
  } | null>(null)
  const [womacWorkflowState, setWomacWorkflowState] = useState<{
    active: boolean
    currentIndex: number
    responses: Record<string, number>
  } | null>(null)
  const [assessmentWorkflowState, setAssessmentWorkflowState] = useState<{
    active: boolean
    currentIndex: number
    responses: Record<string, string | number>
    assessmentType: "ad_qol" | "cognitive" | "stars_amd" // Added stars_amd type
  } | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    console.log("[v0] HealthAssistantScreen mounted, checking for workflow trigger")
    if (initialAction) {
      console.log(`[v0] Triggering workflow from initialAction prop: ${initialAction}`)

      // Map initialAction to handleQuickAction format
      const actionMap: Record<string, string> = {
        log_pain: "track_symptoms",
        log_medication: "log_medication",
        track_symptoms: "track_symptoms",
        mobility_index: "take_assessment",
        take_assessment: "take_assessment",
        quality_of_life: "quality_of_life", // Added quality of life action mapping
      }

      const action = actionMap[initialAction]
      if (action) {
        // Small delay to ensure component is fully mounted
        setTimeout(() => {
          console.log("[v0] Executing handleQuickAction with action:", action)
          handleQuickAction(action)
        }, 100)
      }
    }
  }, [initialAction])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: getAIResponse(inputValue),
        timestamp: new Date(),
        quickActions: getQuickActions(inputValue),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  const getAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase()

    if (lowerInput.includes("pain")) {
      return "I understand you're experiencing pain. On a scale of 1-10, how would you rate your current pain level? This will help me provide better recommendations."
    } else if (lowerInput.includes("medication") || lowerInput.includes("medicine")) {
      return "I can help you track your medications. Which medication would you like to log? Please provide the name and dosage if possible."
    } else if (lowerInput.includes("exercise") || lowerInput.includes("mobility")) {
      return "Great that you're thinking about exercises! Based on your recovery stage, I recommend gentle range-of-motion exercises. Would you like me to show you some specific exercises for your current recovery phase?"
    } else if (lowerInput.includes("sleep") || lowerInput.includes("rest")) {
      return "Quality sleep is crucial for recovery. Are you having trouble sleeping? I can suggest some positions and tips to help you sleep more comfortably after knee replacement surgery."
    } else {
      return "I'm here to support your women's health program. You can log your flow, symptoms, mood and sleep, track your cycle, take a wellbeing check, or ask me anything about your health journey."
    }
  }

  const getQuickActions = (input: string): QuickAction[] | undefined => {
    const lowerInput = input.toLowerCase()

    if (lowerInput.includes("pain")) {
      return [
        { label: "Log Pain Level", action: "log_pain" },
        { label: "Pain History", action: "pain_history" },
        { label: "Pain Tips", action: "pain_tips" },
      ]
    } else if (lowerInput.includes("medication")) {
      return [
        { label: "Log Medication", action: "log_medication" },
        { label: "Medication Schedule", action: "med_schedule" },
        { label: "Set Reminder", action: "set_reminder" },
      ]
    } else if (lowerInput.includes("exercise")) {
      return [
        { label: "View Exercises", action: "view_exercises" },
        { label: "Log Activity", action: "log_activity" },
        { label: "Exercise Tips", action: "exercise_tips" },
      ]
    }
    return undefined
  }

  const handleQuickAction = (action: string) => {
    if (action === "log_medication") {
      const userMessage: Message = {
        id: Date.now().toString(),
        type: "user",
        content: "Log Medication",
        timestamp: new Date(),
      }
      const workflowMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "workflow",
        content: "medication_workflow",
        timestamp: new Date(),
        workflowType: "medication",
      }
      setMessages((prev) => [...prev, userMessage, workflowMessage])
      return
    }

    if (action === "track_symptoms") {
      const userMessage: Message = {
        id: Date.now().toString(),
        type: "user",
        content: "Track Symptoms",
        timestamp: new Date(),
      }

      setSymptomWorkflowState({
        active: true,
        currentIndex: 0,
        responses: {},
      })

      const firstQuestion = SYMPTOM_QUESTIONS[0]
      const workflowMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "workflow",
        content: "symptom_question_workflow",
        timestamp: new Date(),
        workflowType: "symptom_question",
        workflowData: {
          disabled: false,
          symptomQuestion: firstQuestion,
          symptomProgress: {
            currentIndex: 0,
            responses: {},
          },
        },
      }

      setMessages((prev) => [...prev, userMessage, workflowMessage])
      return
    }

    if (action === "take_assessment") {
      const userMessage: Message = {
        id: Date.now().toString(),
        type: "user",
        content: "Take Assessment",
        timestamp: new Date(),
      }

      const introMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "workflow",
        content: "stars_intro",
        timestamp: new Date(),
        workflowType: "stars_intro",
        workflowData: {
          disabled: false,
        },
      }

      setMessages((prev) => [...prev, userMessage, introMessage])
      return
    }

    if (action === "quality_of_life") {
      const userMessage: Message = {
        id: Date.now().toString(),
        type: "user",
        content: "Take Wellbeing Check (MRS)",
        timestamp: new Date(),
      }
      const introMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: "Let's check in on how you've been feeling. The Wellbeing Check (MRS) takes about 3 minutes and rates 11 common menopausal and cycle-related symptoms. Ready to begin?",
        timestamp: new Date(),
        quickActions: [
          { label: "Start Assessment", action: "take_assessment" },
        ],
      }
      setMessages((prev) => [...prev, userMessage, introMessage])
      return
    }

    const actionMessages: { [key: string]: string } = {
      view_progress: "Show me my recovery progress",
      pain_history: "Show my pain history",
      pain_tips: "Give me pain management tips",
      med_schedule: "Show my medication schedule",
      set_reminder: "Set a medication reminder",
      view_exercises: "Show me recommended exercises",
      log_activity: "Log my exercise activity",
      exercise_tips: "Give me exercise tips",
    }

    if (actionMessages[action]) {
      setInputValue(actionMessages[action])
      handleSend()
    }
  }

  const handleMedicationSubmit = (medication: any) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: `Logged: ${medication.name} (${medication.dosage})`,
      timestamp: new Date(),
    }

    const successMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: "assistant",
      content: `${medication.name} has been logged successfully. Remember to take it as prescribed. Would you like me to set a reminder for your next dose?`,
      timestamp: new Date(),
    }

    setMessages((prev) =>
      prev.map((msg) =>
        msg.type === "workflow" && msg.workflowType === "medication" && !msg.workflowData?.disabled
          ? { ...msg, workflowData: { disabled: true, selectedValue: medication } }
          : msg,
      ),
    )

    setMessages((prev) => [...prev, userMessage, successMessage])
  }

  const handleSymptomQuestionSubmit = (answer: string | number, messageId: string) => {
    if (!symptomWorkflowState) return

    const currentQuestion = SYMPTOM_QUESTIONS[symptomWorkflowState.currentIndex]
    const updatedResponses = {
      ...symptomWorkflowState.responses,
      [currentQuestion.id]: answer,
    }

    const answerText = typeof answer === "number" ? `${answer}/10` : answer
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: `${currentQuestion.question} - ${answerText}`,
      timestamp: new Date(),
    }

    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? {
              ...msg,
              workflowData: {
                ...msg.workflowData,
                disabled: true,
                selectedValue: answer,
              },
            }
          : msg,
      ),
    )

    const nextIndex = symptomWorkflowState.currentIndex + 1
    const isLastQuestion = nextIndex >= SYMPTOM_QUESTIONS.length

    if (isLastQuestion) {
      // Side effects that require PV team escalation
      const pvEscalationSymptoms = [
        "Very heavy / flooding",
        "Bleeding between periods",
        "Severe pelvic pain",
        "Fainting or severe dizziness",
      ]

      const reportedNeuro = updatedResponses["neurological_symptoms"]
      const reportedInfusion = updatedResponses["infusion_reactions"]
      const severity = updatedResponses["symptom_severity"]

      const allReported = [
        ...(typeof reportedNeuro === "string" ? [reportedNeuro] : []),
        ...(typeof reportedInfusion === "string" ? [reportedInfusion] : []),
      ]

      const hasPvTrigger =
        allReported.some((s) => pvEscalationSymptoms.includes(s)) ||
        (typeof severity === "number" && severity >= 7)

      const newMessages: Message[] = [userMessage]

      if (hasPvTrigger) {
        const pvMessage: Message = {
          id: (Date.now() + 2).toString(),
          type: "workflow",
          content: "pv_alert",
          timestamp: new Date(),
          workflowType: "pv_alert",
          workflowData: { disabled: false },
        }
        newMessages.push(pvMessage)
      } else {
        const successMessage: Message = {
          id: (Date.now() + 2).toString(),
          type: "assistant",
          content: "Your daily log has been recorded successfully. Keep logging each day — it helps your nurse educator spot patterns across your cycle and adjust your care plan.",
          timestamp: new Date(),
        }
        newMessages.push(successMessage)
      }

      setMessages((prev) => [...prev, ...newMessages])
      setSymptomWorkflowState(null)
    } else {
      const nextQuestion = SYMPTOM_QUESTIONS[nextIndex]
      const nextWorkflowMessage: Message = {
        id: (Date.now() + 2).toString(),
        type: "workflow",
        content: "symptom_question_workflow",
        timestamp: new Date(),
        workflowType: "symptom_question",
        workflowData: {
          disabled: false,
          symptomQuestion: nextQuestion,
          symptomProgress: {
            currentIndex: nextIndex,
            responses: updatedResponses,
          },
        },
      }

      setMessages((prev) => [...prev, userMessage, nextWorkflowMessage])
      setSymptomWorkflowState({
        active: true,
        currentIndex: nextIndex,
        responses: updatedResponses,
      })
    }
  }

  const handleWomacIntroContinue = () => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.workflowType === "womac_intro" && !msg.workflowData?.disabled
          ? { ...msg, workflowData: { disabled: true } }
          : msg,
      ),
    )

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: "Continue",
      timestamp: new Date(),
    }

    setWomacWorkflowState({
      active: true,
      currentIndex: 0,
      responses: {},
    })

    const firstQuestion = WOMAC_QUESTIONS[0]
    const workflowMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: "workflow",
      content: "womac_question_workflow",
      timestamp: new Date(),
      workflowType: "womac_question",
      workflowData: {
        disabled: false,
        womacQuestion: firstQuestion,
        womacProgress: {
          currentIndex: 0,
          responses: {},
        },
      },
    }

    setMessages((prev) => [...prev, userMessage, workflowMessage])
  }

  const handleWomacQuestionSubmit = (rating: number, messageId: string) => {
    if (!womacWorkflowState) return

    const currentQuestion = WOMAC_QUESTIONS[womacWorkflowState.currentIndex]
    const updatedResponses = {
      ...womacWorkflowState.responses,
      [currentQuestion.id]: rating,
    }

    const ratingLabels = ["None", "Slight", "Moderate", "Severe", "Extreme"]
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: `${currentQuestion.question} - ${ratingLabels[rating]} (${rating})`,
      timestamp: new Date(),
    }

    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? {
              ...msg,
              workflowData: {
                ...msg.workflowData,
                disabled: true,
                selectedValue: rating,
              },
            }
          : msg,
      ),
    )

    const nextIndex = womacWorkflowState.currentIndex + 1
    const isLastQuestion = nextIndex >= WOMAC_QUESTIONS.length

    if (isLastQuestion) {
      // Calculate scores by section
      const painScore = Object.entries(updatedResponses)
        .filter(([key]) => key.startsWith("pain_"))
        .reduce((sum, [, value]) => sum + value, 0)
      const stiffnessScore = Object.entries(updatedResponses)
        .filter(([key]) => key.startsWith("stiffness_"))
        .reduce((sum, [, value]) => sum + value, 0)
      const functionScore = Object.entries(updatedResponses)
        .filter(([key]) => key.startsWith("function_"))
        .reduce((sum, [, value]) => sum + value, 0)
      const totalScore = painScore + stiffnessScore + functionScore

      const successMessage: Message = {
        id: (Date.now() + 2).toString(),
        type: "assistant",
        content: `Wellbeing Assessment completed!\n\n📊 Your Quality of Life Results:\n\n• Physical Function Score: ${painScore}/20\n• Self-Esteem Score: ${stiffnessScore}/8\n• Social & Overall Score: ${functionScore}/40\n• Total Score: ${totalScore}/68\n\nHigher scores indicate better quality of life. Your results have been recorded and will help your care team track your progress.`,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, userMessage, successMessage])
      setWomacWorkflowState(null)
    } else {
      const nextQuestion = WOMAC_QUESTIONS[nextIndex]
      const nextWorkflowMessage: Message = {
        id: (Date.now() + 2).toString(),
        type: "workflow",
        content: "womac_question_workflow",
        timestamp: new Date(),
        workflowType: "womac_question",
        workflowData: {
          disabled: false,
          womacQuestion: nextQuestion,
          womacProgress: {
            currentIndex: nextIndex,
            responses: updatedResponses,
          },
        },
      }

      setMessages((prev) => [...prev, userMessage, nextWorkflowMessage])
      setWomacWorkflowState({
        active: true,
        currentIndex: nextIndex,
        responses: updatedResponses,
      })
    }
  }

  const handleAssessmentSelection = (assessmentType: "ad_qol" | "cognitive") => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.workflowType === "assessment_selector" && !msg.workflowData?.disabled
          ? { ...msg, workflowData: { disabled: true, selectedValue: assessmentType } }
          : msg,
      ),
    )

    const assessmentName = assessmentType === "ad_qol" ? "Wellbeing Check (MRS)" : "Symptom & Cycle Check"
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: assessmentName,
      timestamp: new Date(),
    }

    setAssessmentWorkflowState({
      active: true,
      currentIndex: 0,
      responses: {},
      assessmentType,
    })

    const questions = assessmentType === "ad_qol" ? AD_QOL_QUESTIONS : COGNITIVE_ASSESSMENT_QUESTIONS
    const firstQuestion = questions[0]
    const workflowMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: "workflow",
      content: "assessment_question_workflow",
      timestamp: new Date(),
      workflowType: "assessment_question",
      workflowData: {
        disabled: false,
        assessmentQuestion: firstQuestion,
        assessmentProgress: {
          currentIndex: 0,
          responses: {},
          assessmentType,
        },
      },
    }

    setMessages((prev) => [...prev, userMessage, workflowMessage])
  }

  const handleAssessmentQuestionSubmit = (answer: string | number, messageId: string) => {
    if (!assessmentWorkflowState) return

    const questions =
      assessmentWorkflowState.assessmentType === "ad_qol"
        ? AD_QOL_QUESTIONS
        : assessmentWorkflowState.assessmentType === "cognitive"
          ? COGNITIVE_ASSESSMENT_QUESTIONS
          : ALZHEIMERS_ASSESSMENT_QUESTIONS
    const currentQuestion = questions[assessmentWorkflowState.currentIndex]
    const updatedResponses = {
      ...assessmentWorkflowState.responses,
      [currentQuestion.id]: answer,
    }

    const answerText = typeof answer === "number" ? `${answer}` : answer
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: `${currentQuestion.question} - ${answerText}`,
      timestamp: new Date(),
    }

    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? {
              ...msg,
              workflowData: {
                ...msg.workflowData,
                disabled: true,
                selectedValue: answer,
              },
            }
          : msg,
      ),
    )

    const nextIndex = assessmentWorkflowState.currentIndex + 1
    const isLastQuestion = nextIndex >= questions.length

    if (isLastQuestion) {
      const assessmentName =
        assessmentWorkflowState.assessmentType === "ad_qol"
          ? "Wellbeing Check (MRS)"
          : assessmentWorkflowState.assessmentType === "cognitive"
            ? "Symptom & Cycle Check"
            : "Wellbeing Check (MRS)"
      const successMessage: Message = {
        id: (Date.now() + 2).toString(),
        type: "assistant",
        content: `${assessmentName} completed successfully!\n\nThank you for completing your Wellbeing Check. Your responses have been recorded and will help us track your symptoms and how you're feeling across your cycle and menopause journey. This information helps your nurse educator and care team personalise your plan. Please discuss any concerns with your gynaecologist or care team.`,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, userMessage, successMessage])
      setAssessmentWorkflowState(null)
    } else {
      const nextQuestion = questions[nextIndex]
      const nextWorkflowMessage: Message = {
        id: (Date.now() + 2).toString(),
        type: "workflow",
        content: "assessment_question_workflow",
        timestamp: new Date(),
        workflowType: "assessment_question",
        workflowData: {
          disabled: false,
          assessmentQuestion: nextQuestion,
          assessmentProgress: {
            currentIndex: nextIndex,
            responses: updatedResponses,
            assessmentType: assessmentWorkflowState.assessmentType,
          },
        },
      }

      setMessages((prev) => [...prev, userMessage, nextWorkflowMessage])
      setAssessmentWorkflowState({
        active: true,
        currentIndex: nextIndex,
        responses: updatedResponses,
        assessmentType: assessmentWorkflowState.assessmentType,
      })
    }
  }

  const handleStarsIntroContinue = () => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.workflowType === "stars_intro" && !msg.workflowData?.disabled
          ? { ...msg, workflowData: { disabled: true } }
          : msg,
      ),
    )

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: "Continue",
      timestamp: new Date(),
    }

    setAssessmentWorkflowState({
      active: true,
      currentIndex: 0,
      responses: {},
      assessmentType: "stars_amd",
    })

    const firstQuestion = ALZHEIMERS_ASSESSMENT_QUESTIONS[0]
    const workflowMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: "workflow",
      content: "assessment_question_workflow",
      timestamp: new Date(),
      workflowType: "assessment_question",
      workflowData: {
        disabled: false,
        assessmentQuestion: firstQuestion,
        assessmentProgress: {
          currentIndex: 0,
          responses: {},
          assessmentType: "stars_amd",
        },
      },
    }

    setMessages((prev) => [...prev, userMessage, workflowMessage])
  }

  const handleVoiceRecordingComplete = (transcript: string) => {
    setInputValue(transcript)
    handleSend()
    setShowVoiceRecording(false)
  }

  if (showVoiceRecording) {
    return (
      <VoiceRecordingScreen onComplete={handleVoiceRecordingComplete} onCancel={() => setShowVoiceRecording(false)} />
    )
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex flex-col items-center">
        <h1 className="text-lg font-semibold text-gray-900 text-center">Kaira</h1>
        <p className="text-xs text-gray-500 text-center">Your personal recovery companion</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id}>
            {message.type === "workflow" ? (
              <div className="flex justify-start">
                <div className="max-w-[85%]">
                  {message.workflowType === "medication" && (
                    <MedicationSelectorWorkflow
                      onSubmit={handleMedicationSubmit}
                      disabled={message.workflowData?.disabled}
                      selectedMedication={message.workflowData?.selectedValue}
                    />
                  )}
                  {message.workflowType === "symptom_question" && message.workflowData?.symptomQuestion && (
                    <SymptomQuestionWorkflow
                      question={message.workflowData.symptomQuestion.question}
                      type={message.workflowData.symptomQuestion.type}
                      options={message.workflowData.symptomQuestion.options}
                      min={message.workflowData.symptomQuestion.min}
                      max={message.workflowData.symptomQuestion.max}
                      minLabel={message.workflowData.symptomQuestion.minLabel}
                      maxLabel={message.workflowData.symptomQuestion.maxLabel}
                      onSubmit={(answer) => handleSymptomQuestionSubmit(answer, message.id)}
                      disabled={message.workflowData?.disabled}
                      selectedAnswer={message.workflowData?.selectedValue}
                    />
                  )}
                  {message.workflowType === "womac_intro" && (
                    <Card className="bg-white border border-gray-200">
                      <CardContent className="p-4">
                        <div className="mb-4">
                          <h3 className="text-sm font-semibold text-gray-900 mb-2">Wellbeing Questionnaire</h3>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Take this short wellbeing questionnaire to assess how your symptoms are affecting your
                            energy, mood, sleep, and quality of life.
                          </p>
                        </div>
                        {!message.workflowData?.disabled && (
                          <Button onClick={handleWomacIntroContinue} className="w-full" size="sm">
                            Continue
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  )}
                  {message.workflowType === "womac_question" && message.workflowData?.womacQuestion && (
                    <WomacQuestionWorkflow
                      question={message.workflowData.womacQuestion.question}
                      section={message.workflowData.womacQuestion.section}
                      onSubmit={(rating) => handleWomacQuestionSubmit(rating, message.id)}
                      disabled={message.workflowData?.disabled}
                      selectedRating={message.workflowData?.selectedValue}
                    />
                  )}

                  {message.workflowType === "assessment_selector" && (
                    <Card className="bg-white border border-gray-200">
                      <CardContent className="p-4">
                        <div className="mb-3">
                          <h3 className="text-sm font-semibold text-gray-900 mb-1">Choose an Assessment</h3>
                          <p className="text-xs text-gray-600">Select the assessment you would like to take</p>
                        </div>
                        {!message.workflowData?.disabled && (
                          <div className="space-y-2.5">
                            <button
                              onClick={() => handleAssessmentSelection("ad_qol")}
                              className="w-full p-3 text-left bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors"
                            >
                              <div className="font-medium text-sm text-gray-900 mb-0.5">Wellbeing Check (MRS)</div>
                              <div className="text-xs text-gray-500">Menopause Rating Scale quality of life</div>
                            </button>
                            <button
                              onClick={() => handleAssessmentSelection("cognitive")}
                              className="w-full p-3 text-left bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors"
                            >
                              <div className="font-medium text-sm text-gray-900 mb-0.5">Symptom & Cycle Check</div>
                              <div className="text-xs text-gray-500">Quick daily flow, mood & sleep check-in</div>
                            </button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}

                  {message.workflowType === "assessment_question" && message.workflowData?.assessmentQuestion && (
                    <SymptomQuestionWorkflow
                      question={message.workflowData.assessmentQuestion.question}
                      type={message.workflowData.assessmentQuestion.type}
                      options={message.workflowData.assessmentQuestion.options}
                      min={message.workflowData.assessmentQuestion.min}
                      max={message.workflowData.assessmentQuestion.max}
                      minLabel={message.workflowData.assessmentQuestion.minLabel}
                      maxLabel={message.workflowData.assessmentQuestion.maxLabel}
                      onSubmit={(answer) => handleAssessmentQuestionSubmit(answer, message.id)}
                      disabled={message.workflowData?.disabled}
                      selectedAnswer={message.workflowData?.selectedValue}
                    />
                  )}

                  {message.workflowType === "stars_intro" && (
                    <Card className="bg-white border border-gray-200">
                      <CardContent className="p-4">
                        <div className="mb-4">
                          <h3 className="text-sm font-semibold text-gray-900 mb-2">Wellbeing Check (MRS)</h3>
                          <p className="text-xs text-gray-600 mb-3">
                            Menopause Rating Scale symptom assessment
                          </p>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            This validated check rates 11 common symptoms across three groups — somatic (hot flashes,
                            heart discomfort, sleep, joint and muscle aches), psychological (mood, irritability,
                            anxiety, exhaustion), and urogenital (sexual, bladder, vaginal dryness). Each is rated from
                            none to very severe. It helps your nurse educator and care team understand how you're
                            feeling and personalise your plan. It takes about 3 minutes to complete.
                          </p>
                        </div>
                        {!message.workflowData?.disabled && (
                          <Button onClick={handleStarsIntroContinue} className="w-full" size="sm">
                            Continue
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  )}

                  {message.workflowType === "pv_alert" && (
                    <Card className="bg-white border border-gray-200 shadow-sm">
                      <CardContent className="p-0">
                        <div className="px-4 pt-4 pb-3">
                          <p className="text-[13px] text-gray-700 leading-[1.6]">
                            Your symptoms have been recorded. As part of our care commitment, the TatvaCare patient safety team has been notified. This is routine — you&apos;re in good hands.
                          </p>
                        </div>
                        <div className="border-t border-gray-100 px-4 py-3">
                          <a
                            href="tel:18002091234"
                            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-[13px] font-medium text-white transition-colors"
                            style={{ backgroundColor: "var(--app-primary)" }}
                          >
                            <Phone className="w-3.5 h-3.5" />
                            Call 1800-209-1234
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            ) : (
              <div className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] ${message.type === "user" ? "order-2" : "order-1"}`}>
                  <Card
                    className={`${
                      message.type === "user"
                        ? "bg-[var(--app-primary)] text-white"
                        : "bg-white border border-gray-200 text-gray-900"
                    }`}
                  >
                    <CardContent className="p-3">
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <p className={`text-xs mt-1 ${message.type === "user" ? "text-white/70" : "text-gray-400"}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </CardContent>
                  </Card>

                  {message.quickActions && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {message.quickActions.map((action, idx) => (
                        <Button
                          key={idx}
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickAction(action.action)}
                          className="text-xs h-7"
                        >
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <Card className="bg-white border border-gray-200">
              <CardContent className="p-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex items-center gap-2 mb-3 overflow-x-auto scrollbar-hide">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickAction("log_medication")}
            className="h-8 text-xs flex-shrink-0 whitespace-nowrap px-4"
          >
            <Plus className="w-3 h-3 mr-1" />
            Log Medication
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickAction("track_symptoms")}
            className="h-8 text-xs flex-shrink-0 whitespace-nowrap px-4"
          >
            <Plus className="w-3 h-3 mr-1" />
            Track Symptoms
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickAction("take_assessment")}
            className="h-8 text-xs flex-shrink-0 whitespace-nowrap px-4"
          >
            <Plus className="w-3 h-3 mr-1" />
            Take Assessment
          </Button>
          {/* <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickAction("quality_of_life")}
            className="h-8 text-xs flex-shrink-0 whitespace-nowrap px-4"
          >
            <Plus className="w-3 h-3 mr-1" />
            Check Quality of Life
          </Button> */}
        </div>

        <div className="flex items-end gap-2">
          <Button variant="ghost" size="icon" className="h-10 w-10 flex-shrink-0">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10 flex-shrink-0">
            <Camera className="h-5 w-5" />
          </Button>
          <div className="flex-1 relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="pr-10"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowVoiceRecording(true)}
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
            >
              <Mic className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={handleSend} size="icon" className="h-10 w-10 flex-shrink-0" disabled={!inputValue.trim()}>
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
