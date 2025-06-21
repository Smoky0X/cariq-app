import type { Car, ComparisonCriteria } from "@/types/car"

export function calculateCarScore(car: Car, criteria: ComparisonCriteria): number {
  let score = 0
  const maxScore = 100

  // Score de base (20 points)
  score += 20

  // Budget (25 points)
  const budgetScore = Math.max(0, 25 - (car.price - criteria.budget) / 1000)
  score += Math.min(25, budgetScore)

  // Consommation (15 points)
  const maxConsumption = 10 // L/100km
  const consumptionScore = Math.max(0, 15 - (car.consumption / maxConsumption) * 15)
  score += consumptionScore

  // Fiabilité (15 points)
  const reliabilityScore = (car.reliability / 5) * 15
  score += reliabilityScore

  // Sécurité (10 points)
  const safetyScore = (car.safety / 5) * 10
  score += safetyScore

  // Confort (10 points)
  const comfortScore = (car.comfort / 5) * 10
  score += comfortScore

  // Places (5 points)
  if (car.seats >= criteria.familySize) {
    score += 5
  } else {
    score += Math.max(0, 5 - (criteria.familySize - car.seats) * 2)
  }

  // Bonus selon les priorités
  switch (criteria.priority) {
    case "Économie":
      if (car.consumption < 6) score += 5
      if (car.price < 25000) score += 5
      break
    case "Performance":
      if (car.power > 150) score += 5
      if (car.reliability > 4) score += 5
      break
    case "Confort":
      if (car.comfort > 4) score += 5
      if (car.seats >= 5) score += 5
      break
    case "Écologie":
      if (car.fuelType === "Électrique") score += 10
      else if (car.fuelType === "Hybride") score += 7
      else if (car.consumption < 5) score += 3
      break
  }

  // Bonus selon l'usage
  switch (criteria.usage) {
    case "Ville":
      if (car.category === "Citadine" || car.category === "Compacte") score += 3
      if (car.consumption < 6) score += 2
      break
    case "Route":
      if (car.category === "Berline" || car.category === "SUV") score += 3
      if (car.comfort > 4) score += 2
      break
    case "Mixte":
      score += 2 // Bonus général pour usage mixte
      break
  }

  // Bonus carburant préféré
  if (criteria.fuelPreference && car.fuelType === criteria.fuelPreference) {
    score += 5
  }

  // Pénalités
  if (car.price > criteria.budget * 1.2) {
    score -= 10
  }

  if (car.seats < criteria.familySize) {
    score -= 15
  }

  // Retourner un score entre 0 et 100
  return Math.max(0, Math.min(100, Math.round(score)))
}

export function getScoreColor(score: number): string {
  if (score >= 80) return "text-green-600 bg-green-50"
  if (score >= 60) return "text-yellow-600 bg-yellow-50"
  if (score >= 40) return "text-orange-600 bg-orange-50"
  return "text-red-600 bg-red-50"
}

export function getScoreLabel(score: number): string {
  if (score >= 80) return "Excellent"
  if (score >= 60) return "Bon"
  if (score >= 40) return "Moyen"
  return "Faible"
}
