export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  subscription: SubscriptionPlan
  createdAt: string
  preferences: UserPreferences
}

export interface UserPreferences {
  favoriteCategories: string[]
  budgetRange: [number, number]
  preferredFuelTypes: string[]
  notifications: {
    priceAlerts: boolean
    newModels: boolean
    recommendations: boolean
  }
}

export interface SubscriptionPlan {
  type: "free" | "premium" | "pro"
  name: string
  price: number
  features: string[]
  comparisonsLimit: number
  favoritesLimit: number
  alertsLimit: number
  expiresAt?: string
}

export interface SavedComparison {
  id: string
  name: string
  cars: string[]
  criteria: any
  createdAt: string
  userId: string
}

export interface PriceAlert {
  id: string
  carId: string
  targetPrice: number
  currentPrice: number
  isActive: boolean
  createdAt: string
  userId: string
}
