// Health Assistant Messages - Centralized message management
// Keeps core functionality clean and messages maintainable

export const HEALTH_ASSISTANT_MESSAGES = {
  // System messages
  PROCESSING: "Welcome to your personalized women's health companion. I'm Kaira, here to support your journey through cycle tracking, perimenopause and menopause with evidence-based guidance, symptom logging, and check-ins tailored to your needs.",
  VOICE_PROCESSED: "Voice input successfully captured and processed. How may I help you log your cycle, symptoms, or how you're feeling today?",
  
  // Action confirmations
  TRACK_SYMPTOMS: "Track Symptoms",
  LOG_ACTIVITIES: "Log Health Activities",
  BUY_DRUG: "Purchase Medication",
  TAKE_INJECTION: "Injection Guidance",
  KNOW_DRUG: "Medication Education",
  AI_HEALTH_PLANS: "Personalized Health Plans",
  
  // Symptom flow messages
  SYMPTOM_SELECTION: "Which symptom are you noticing today? Your symptom data helps us spot patterns across your cycle, track perimenopause and menopause changes, and personalize your support.",
  INTENSITY_RATING: "Please rate your symptom severity on a scale of 1-10, where 1 represents minimal discomfort and 10 indicates severe impact on your day.",
  FREQUENCY_QUESTION: "How frequently has this symptom occurred in the past 7 days? Tracking this over time helps us understand how it relates to your cycle and hormone changes.",
  BODY_LOCATION_QUESTION: (symptomName: string) => `Where are you feeling your ${symptomName.toLowerCase()}? Pinpointing the location helps us understand your symptoms and flag anything that needs a closer look.`,
  
  // Success messages
  SYMPTOM_SUCCESS_TITLE: "Symptom recorded successfully",
  SYMPTOM_SUCCESS_DETAILS: (answers: Record<string, any>) => {
    const symptom = answers['symptom-selection'] || 'Unknown'
    const intensity = answers.intensity || 'Not specified'
    const frequency = answers.frequency || 'Not specified'
    const location = answers['body-location'] || 'General'
    const timestamp = new Date().toLocaleString('en-US', { 
      dateStyle: 'medium', 
      timeStyle: 'short' 
    })
    
    return `Medical Record Updated\n\nSymptom: ${symptom}\nSeverity: ${intensity}/10\nFrequency: ${frequency}\nLocation: ${location}\nRecorded: ${timestamp}\n\nYour symptom has been documented in your health record. Your care team will be notified if intervention is recommended.`
  },
  
  // Activity messages
  ACTIVITY_TRACKING: "Health Activity Logging\n\nTracking your daily habits helps us understand how diet, movement, sleep and hydration relate to your cycle, mood and menopause symptoms. Please select the activity category you wish to record.",
  ACTIVITY_SELECTION: "Select the health activity category to log in your record:",
  
  // Drug ordering messages
  BUY_DRUG_INTRO: "Medication Procurement Services\n\nAccess your prescribed medications through our network of licensed pharmacies. All partners maintain GDP (Good Distribution Practice) compliance and provide lot traceability for patient safety.",
  PHARMACY_SECTION_TITLE: "Accredited Pharmacy Network\n\nOur verified pharmacy partners provide dedicated patient support programs, prior authorization assistance, and copay optimization services. Each pharmacy maintains URAC accreditation and NABP VIPPS certification.",
  
  // Injection guidance
  INJECTION_GUIDE_INTRO: "Medication Administration Protocol\n\nCorrect medication administration is critical for optimal therapeutic effect. This step-by-step protocol ensures safe and effective medication delivery.",
  INJECTION_EATING_CHECK: "Pre-Administration Screening\n\nTo minimize gastrointestinal adverse events and optimize medication tolerance, please confirm your current status. Have you consumed any food or beverages within the past 2 hours?",
  
  // Learning content
  LEARN_DRUG_INTRO: "Clinical Education Resource Center\n\nComprehensive understanding of your prescribed therapy enhances treatment adherence and clinical outcomes. Access evidence-based educational materials covering mechanism of action, clinical efficacy data, and adverse event management protocols.",
  
  // AI Health Plans
  AI_PLANS_INTRO: "AI-Driven Precision Medicine Planning\n\nOur clinical decision support system utilizes machine learning algorithms to analyze your biomarkers, treatment response patterns, and phenotypic data to generate personalized, evidence-based therapeutic recommendations aligned with current clinical guidelines.",
  AI_PLANS_FEATURES: "Personalized Plan Components:\n\n• Nutrition guidance tailored to your cycle and hormone changes\n• Movement and strength routines for energy and bone health\n• Sleep and mood support strategies for perimenopause and menopause\n• Trend insights from your cycle, symptom and hot-flush logs\n• Hot-flush and night-sweat management techniques\n• HRT and supplement adherence support with gentle reminders",
  
  // Assessment flow
  ASSESSMENT_START: "Comprehensive Clinical Assessment Protocol\n\nTo develop your individualized therapeutic strategy, we need to collect detailed information about your medical history, current health status, treatment objectives, and psychosocial factors. This validated assessment instrument takes approximately 5-7 minutes and ensures your care plan aligns with evidence-based clinical guidelines and personalized medicine principles.\n\nAre you ready to begin your clinical assessment?",
  
  // Error and fallback messages
  INFO_NOTED: "Information recorded in your health profile",
  FEATURE_ACTIVATED: "Advanced health tracking interface activated. Your dashboard will now adapt to your current treatment phase and health priorities.",
  
  // Progress tracking messages
  PROGRESS_DETAILS: (actionIndex: number) => {
    const actions = ['Detailed Analytics', 'Goal Management']
    const selectedAction = actions[actionIndex]
    return `${selectedAction}\n\nAccessing your comprehensive health metrics and treatment progress indicators.`
  },
  
  PROGRESS_SUMMARY: "Weekly Progress Report\n\nKey Indicators:\n• HRT / supplement adherence: 95% (Target: ≥80%)\n• Menopause Rating Scale (MRS): Improved from baseline\n• Hot flushes: -35% from baseline\n• Pittsburgh Sleep Quality Index: 7.2/10 (Clinically significant improvement)\n• Daily Function Score: 85/100 (Target: Maintain or improve)\n• Mood: Stable, fewer low-mood days this week\n\nInterpretation: Symptoms trending in the right direction. Keep up your current routine and check-in schedule.",
  
  // Metrics messages
  METRICS_LOADING: (actionIndex: number) => {
    const actions = ['Advanced Health Analytics', 'Comparative Analysis']
    const selectedAction = actions[actionIndex]
    return `${selectedAction}\n\nProcessing your health data using machine learning algorithms to identify patterns and optimization opportunities.`
  },
  
  METRICS_ANALYSIS: "Health Analytics Report\n\nKey Findings:\n• Symptom burden: 23% lower than baseline\n• Compared with similar users: 85th percentile for symptom relief\n• Cycle regularity trending toward your typical pattern\n• Hot-flush frequency: 1.3x better than the group average\n• Cardiovascular markers: within healthy ranges\n\nRecommendation: Keep up your current routine. We'll check in on your symptoms again in 4 weeks.",
  
  // Reminder and tracking messages
  REMINDER_SET: "Reminder Schedule Configured\n\nDosing Protocol:\n• Medication: As prescribed by your gynaecologist\n• Administration: Daily as directed\n• Scheduled Time: 10:00 AM (maintain consistent timing)\n• Alert System: Multi-modal reminders with a quick pre-dose checklist\n• Preparation Alert: 30 minutes prior\n\nAdherence Tracking Active: Taking your HRT or supplements consistently keeps levels steady and helps manage your symptoms.",
  
  SITE_TRACKING: "Medication Tracking Protocol Activated\n\nClinical Management Features:\n• Systematic dose tracking per prescription guidelines\n• Daily medication log with timing records\n• Side effect monitoring and reporting\n• Treatment response tracking\n• Comprehensive medication history\n\nClinical Rationale: Consistent medication tracking ensures optimal treatment adherence and helps your care team monitor therapeutic response.",
  
  NURSE_CONSULTATION: "Nurse Educator Consultation\n\nEducation Session:\n• Provider: Certified Women's Health Nurse Educator\n• Consultation Type: Cycle, symptom and HRT guidance\n• Duration: 30-45 minute session\n• Setting: Clinic or telehealth platform\n• Components: Symptom review, HRT and supplement guidance, lifestyle strategies, educational materials\n\nEvidence Base: Structured education improves symptom management and confidence through perimenopause and menopause.",
  
  DOCTOR_CONSULTATION: "Gynaecology Consultation Appointment\n\nVisit Details:\n• Appointment: Next available slot - Tomorrow, 2:00 PM\n• Provider: Dr. Sarah Johnson, MD (Gynaecologist)\n• Visit Type: Comprehensive Symptom & HRT Review\n• Agenda: Cycle and symptom review, HRT review, treatment adjustment, quality-of-life review, shared care planning\n• Allocated Time: 20-30 minutes\n\nPreparation: Note your recent symptoms, cycle changes, HRT adherence, and any questions for a productive visit.",
  
  SUPPORT_GROUP: "Therapeutic Support Community\n\nPeer Support Resources:\n• Structured Support Groups: Weekly facilitated sessions led by certified health coaches\n• Patient Narratives: Clinically-verified treatment success stories and outcome data\n• Moderated Forums: 24/7 peer support with clinical moderator oversight\n• Evidence-Based Resources: Curated clinical guidelines and self-management tools\n• Expert Panels: Monthly Q&A with multidisciplinary healthcare team\n\nClinical Evidence: Peer support participation associated with 40% improvement in medication persistence and 25% better clinical outcomes (Diabetes Care, 2020).",
  
  COMPANION_APP: "Digital Health Companion\n\nKey Features:\n• HRT and supplement adherence tracking\n• Cycle, symptom and mood monitoring with trend analysis\n• Hot-flush and night-sweat logging\n• Gentle dosing reminders that fit your routine\n• Device integration (blood pressure, fitness trackers, wearables)\n• Secure, privacy-first data synchronization\n\nAvailable for iOS 14+ and Android 10+ platforms."
}

// Helper function to format messages consistently
export const formatMessage = (template: string | ((args: any) => string), args?: any): string => {
  if (typeof template === 'function') {
    return template(args)
  }
  return template
}

// Message types for type safety
export type MessageType = keyof typeof HEALTH_ASSISTANT_MESSAGES