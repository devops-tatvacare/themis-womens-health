import type { OnboardingStep } from '@/lib/types/onboarding'

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 1,
    title: 'Phone Number',
    description: 'Enter your phone number for verification',
    component: 'PhoneNumberStep',
    isCompleted: false,
    isActive: true,
  },
  {
    id: 2,
    title: 'OTP Verification',
    description: 'Verify your phone number with OTP',
    component: 'OtpStep',
    isCompleted: false,
    isActive: false,
  },
  {
    id: 3,
    title: 'User Type',
    description: 'Select if you are a patient or supporting someone',
    component: 'UserTypeStep',
    isCompleted: false,
    isActive: false,
  },
  {
    id: 4,
    title: 'Patient Name',
    description: 'Enter the patient name',
    component: 'PatientNameStep',
    isCompleted: false,
    isActive: false,
  },
  {
    id: 5,
    title: 'Gender',
    description: 'Select gender',
    component: 'GenderStep',
    isCompleted: false,
    isActive: false,
  },
  {
    id: 6,
    title: 'Date of Birth',
    description: 'Enter date of birth',
    component: 'DateOfBirthStep',
    isCompleted: false,
    isActive: false,
  },
  {
    id: 7,
    title: 'Doctor Details',
    description: 'Enter your doctor information',
    component: 'DoctorDetailsStep',
    isCompleted: false,
    isActive: false,
  },
  {
    id: 8,
    title: 'Document Upload',
    description: 'Upload required documents',
    component: 'DocumentUploadStep',
    isCompleted: false,
    isActive: false,
  },
]

export const INITIAL_ONBOARDING_DATA = {
  phoneNumber: '',
  otp: '',
  userType: null,
  patientName: '',
  gender: null,
  dateOfBirth: '',
  doctorDetails: {
    name: '',
    hospitalName: '',
    contactNumber: '',
  },
  documents: {},
}

// Date selection constants
export const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0"))
export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]
export const YEARS = Array.from({ length: 100 }, (_, i) => String(new Date().getFullYear() - i))

// Indian states and location data
export const INDIAN_STATES = [
  "Delhi",
  "Karnataka",
  "Maharashtra",
  "Tamil Nadu",
]

export const CITIES_BY_STATE: Record<string, string[]> = {
  "Delhi": ["New Delhi", "Dwarka", "Noida"],
  "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
}

export const HOSPITALS_BY_CITY: Record<string, string[]> = {
  // Delhi
  "New Delhi": ["AIIMS", "Max Super Speciality Hospital", "Fortis Hospital"],
  "Dwarka": ["Manipal Hospital Dwarka", "Venkateshwar Hospital", "Aakash Healthcare"],
  "Noida": ["Jaypee Hospital", "Fortis Hospital Noida", "Max Hospital Noida"],
  // Karnataka
  "Bengaluru": ["NIMHANS", "Manipal Hospital", "Apollo Hospital"],
  "Mysuru": ["JSS Hospital", "Columbia Asia Hospital", "Apollo BGS Hospital"],
  "Mangaluru": ["KMC Hospital", "AJ Hospital", "Yenepoya Hospital"],
  // Maharashtra
  "Mumbai": ["Lilavati Hospital", "Hinduja Hospital", "Kokilaben Hospital"],
  "Pune": ["Ruby Hall Clinic", "Sahyadri Hospital", "Jehangir Hospital"],
  "Nagpur": ["Orange City Hospital", "Wockhardt Hospital", "CIIMS Hospital"],
  // Tamil Nadu
  "Chennai": ["Apollo Hospital", "MIOT International", "Sri Ramachandra Hospital"],
  "Coimbatore": ["PSG Hospital", "KMCH Hospital", "Kovai Medical Center"],
  "Madurai": ["Meenakshi Mission Hospital", "Apollo Hospital Madurai", "Vadamalayan Hospital"],
}
