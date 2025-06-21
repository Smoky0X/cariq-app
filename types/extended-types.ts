import type { User } from "firebase/auth"

export interface Car {
  id: string
  brand: string
  model: string
  year: number
  price: number
  fuelType: "Essence" | "Diesel" | "Électrique" | "Hybride"
  consumption: number
  power: number
  seats: number
  category: "Citadine" | "Compacte" | "Berline" | "SUV" | "Familiale"
  reliability: number
  safety: number
  comfort: number
  image: string
  features: string[]
  pros: string[]
  cons: string[]
  ecoScore?: number
  resaleValue?: number
  maintenanceCost?: number
  insuranceCost?: number
  co2Emissions?: number
}

export interface Review {
  id: string
  carId: string
  userId: string
  userName: string
  rating: number
  title: string
  content: string
  pros: string[]
  cons: string[]
  verified: boolean
  createdAt: string
  helpful: number
}

export interface Dealer {
  id: string
  name: string
  address: string
  city: string
  phone: string
  email: string
  rating: number
  distance?: number
  brands: string[]
  services: string[]
  coordinates: {
    lat: number
    lng: number
  }
}

export interface TestDrive {
  id: string
  carId: string
  dealerId: string
  userId: string
  date: string
  time: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  notes?: string
}

export interface FinancingOption {
  id: string
  type: "loan" | "lease" | "cash"
  monthlyPayment: number
  duration: number
  interestRate: number
  downPayment: number
  totalCost: number
}

export interface AIRecommendation {
  carId: string
  score: number
  reasons: string[]
  matchPercentage: number
  category: "perfect_match" | "good_option" | "consider" | "avoid"
}

export interface UserProfile extends User {
  drivingStyle: "eco" | "comfort" | "sport" | "mixed"
  annualMileage: number
  parkingType: "garage" | "street" | "parking_lot"
  hasChildren: boolean
  budget: {
    min: number
    max: number
    financing: boolean
  }
  location: {
    city: string
    country: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
}

export interface Notification {
  id: string
  userId: string
  type: "price_drop" | "new_model" | "recommendation" | "test_drive" | "review"
  title: string
  message: string
  data?: any
  read: boolean
  createdAt: string
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  category: "explorer" | "expert" | "social" | "eco"
  points: number
  unlocked: boolean
  unlockedAt?: string
}
