export interface Car {
  id: string
  brand: string
  model: string
  year: number
  price: number
  fuelType: "Essence" | "Diesel" | "Électrique" | "Hybride"
  consumption: number // L/100km ou kWh/100km pour électrique
  power: number // chevaux
  seats: number
  category: "Citadine" | "Compacte" | "Berline" | "SUV" | "Familiale"
  reliability: number // sur 5
  safety: number // sur 5
  comfort: number // sur 5
  image: string
  features: string[]
  pros: string[]
  cons: string[]
}

export interface ComparisonCriteria {
  budget: number
  fuelPreference: string
  usage: "Ville" | "Route" | "Mixte"
  priority: "Économie" | "Performance" | "Confort" | "Écologie"
  familySize: number
}
