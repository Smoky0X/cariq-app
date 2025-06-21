import type { Car, ComparisonCriteria } from "@/types/car"

export function calculateCarScore(car: Car, criteria: ComparisonCriteria): number {
  let score = 0
  let maxScore = 0

  // Score basé sur le budget (30% du score total)
  const budgetWeight = 30
  const budgetScore = Math.max(0, 100 - ((car.price - criteria.budget) / criteria.budget) * 100)
  score += (budgetScore * budgetWeight) / 100
  maxScore += budgetWeight

  // Score basé sur la consommation (25% du score total)
  const consumptionWeight = 25
  const avgConsumption = car.fuelType === "Électrique" ? 20 : 7 // Référence
  const consumptionScore = Math.max(0, 100 - ((car.consumption - avgConsumption) / avgConsumption) * 100)
  score += (consumptionScore * consumptionWeight) / 100
  maxScore += consumptionWeight

  // Score basé sur la fiabilité (20% du score total)
  const reliabilityWeight = 20
  score += (car.reliability * reliabilityWeight) / 5
  maxScore += reliabilityWeight

  // Score basé sur la sécurité (15% du score total)
  const safetyWeight = 15
  score += (car.safety * safetyWeight) / 5
  maxScore += safetyWeight

  // Score basé sur le confort (10% du score total)
  const comfortWeight = 10
  score += (car.comfort * comfortWeight) / 5
  maxScore += comfortWeight

  // Bonus/malus selon les préférences
  if (criteria.fuelPreference === car.fuelType) {
    score += 5
  }

  if (criteria.familySize <= car.seats) {
    score += 3
  }

  // Ajustement selon la priorité
  switch (criteria.priority) {
    case "Économie":
      if (car.consumption < 5 || car.fuelType === "Électrique") score += 5
      break
    case "Performance":
      if (car.power > 150) score += 5
      break
    case "Confort":
      if (car.comfort >= 4) score += 5
      break
    case "Écologie":
      if (car.fuelType === "Électrique" || car.fuelType === "Hybride") score += 8
      break
  }

  return Math.min(100, (score / maxScore) * 100)
}

export function getScoreColor(score: number): string {
  if (score >= 80) return "text-green-600"
  if (score >= 60) return "text-yellow-600"
  return "text-red-600"
}

export function getScoreLabel(score: number): string {
  if (score >= 80) return "Excellent choix"
  if (score >= 60) return "Bon choix"
  return "À éviter"
}
