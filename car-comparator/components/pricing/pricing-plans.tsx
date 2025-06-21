"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { subscriptionPlans } from "@/data/subscriptions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Crown, Zap, Star } from "lucide-react"

export function PricingPlans() {
  const { user } = useAuth()
  const [loading, setLoading] = useState<string | null>(null)

  const handleSubscribe = async (planType: string) => {
    setLoading(planType)
    // Ici vous intégreriez Stripe ou un autre système de paiement
    setTimeout(() => {
      setLoading(null)
      // Simuler la mise à jour de l'abonnement
    }, 2000)
  }

  const getPlanIcon = (type: string) => {
    switch (type) {
      case "free":
        return <Star className="h-6 w-6" />
      case "premium":
        return <Zap className="h-6 w-6" />
      case "pro":
        return <Crown className="h-6 w-6" />
      default:
        return <Star className="h-6 w-6" />
    }
  }

  const getPlanColor = (type: string) => {
    switch (type) {
      case "free":
        return "border-gray-200"
      case "premium":
        return "border-blue-500 ring-2 ring-blue-200"
      case "pro":
        return "border-purple-500 ring-2 ring-purple-200"
      default:
        return "border-gray-200"
    }
  }

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Choisissez votre plan</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Débloquez toutes les fonctionnalités pour trouver la voiture parfaite selon vos besoins
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {subscriptionPlans.map((plan) => (
          <Card key={plan.type} className={`relative ${getPlanColor(plan.type)}`}>
            {plan.type === "premium" && (
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">
                Le plus populaire
              </Badge>
            )}

            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">{getPlanIcon(plan.type)}</div>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>
                <span className="text-3xl font-bold">{plan.price === 0 ? "Gratuit" : `${plan.price}€`}</span>
                {plan.price > 0 && <span className="text-sm">/mois</span>}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full"
                variant={plan.type === "premium" ? "default" : "outline"}
                onClick={() => handleSubscribe(plan.type)}
                disabled={loading === plan.type || user?.subscription.type === plan.type}
              >
                {loading === plan.type
                  ? "Traitement..."
                  : user?.subscription.type === plan.type
                    ? "Plan actuel"
                    : plan.type === "free"
                      ? "Plan gratuit"
                      : `Choisir ${plan.name}`}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-sm text-gray-600">Tous les plans incluent une garantie de remboursement de 30 jours</p>
      </div>
    </div>
  )
}
