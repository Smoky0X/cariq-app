import type { SubscriptionPlan } from "@/types/user"

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    type: "free",
    name: "Gratuit",
    price: 0,
    features: [
      "Comparaison de 2 voitures max",
      "5 favoris maximum",
      "Recherche de base",
      "Accès aux fiches techniques",
    ],
    comparisonsLimit: 2,
    favoritesLimit: 5,
    alertsLimit: 0,
  },
  {
    type: "premium",
    name: "Premium",
    price: 9.99,
    features: [
      "Comparaisons illimitées",
      "50 favoris maximum",
      "Alertes de prix (5 max)",
      "Historique des recherches",
      "Recommandations personnalisées",
      "Export PDF des comparaisons",
      "Support prioritaire",
    ],
    comparisonsLimit: -1,
    favoritesLimit: 50,
    alertsLimit: 5,
  },
  {
    type: "pro",
    name: "Professionnel",
    price: 19.99,
    features: [
      "Tout Premium inclus",
      "Favoris illimités",
      "Alertes de prix illimitées",
      "API d'accès aux données",
      "Rapports détaillés",
      "Conseiller dédié",
      "Accès anticipé aux nouveautés",
    ],
    comparisonsLimit: -1,
    favoritesLimit: -1,
    alertsLimit: -1,
  },
]
