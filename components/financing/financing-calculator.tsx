"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calculator, TrendingUp, PiggyBank, CreditCard } from "lucide-react"

interface FinancingCalculatorProps {
  carPrice: number
  carName?: string
}

export function FinancingCalculator({ carPrice, carName }: FinancingCalculatorProps) {
  const [downPayment, setDownPayment] = useState([carPrice * 0.2])
  const [loanTerm, setLoanTerm] = useState([60])
  const [interestRate, setInterestRate] = useState([3.5])
  const [tradeInValue, setTradeInValue] = useState(0)

  const calculations = useMemo(() => {
    const principal = carPrice - downPayment[0] - tradeInValue
    const monthlyRate = interestRate[0] / 100 / 12
    const numPayments = loanTerm[0]

    const monthlyPayment =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
      (Math.pow(1 + monthlyRate, numPayments) - 1)

    const totalInterest = monthlyPayment * numPayments - principal
    const totalCost = carPrice + totalInterest - tradeInValue

    return {
      monthlyPayment: isNaN(monthlyPayment) ? 0 : monthlyPayment,
      totalInterest,
      totalCost,
      principal,
    }
  }, [carPrice, downPayment, loanTerm, interestRate, tradeInValue])

  const leaseCalculation = useMemo(() => {
    // Calcul simplifié du leasing
    const residualValue = carPrice * 0.6 // 60% de valeur résiduelle
    const depreciation = (carPrice - residualValue) / loanTerm[0]
    const financeCharge = ((carPrice + residualValue) * (interestRate[0] / 100)) / 12
    const monthlyLease = depreciation + financeCharge

    return {
      monthlyPayment: monthlyLease,
      totalCost: monthlyLease * loanTerm[0] + downPayment[0],
      residualValue,
    }
  }, [carPrice, downPayment, loanTerm, interestRate])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Calculateur de Financement
            {carName && <Badge variant="outline">{carName}</Badge>}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label>Prix du véhicule</Label>
                <div className="text-2xl font-bold text-blue-600">{carPrice.toLocaleString()} €</div>
              </div>

              <div className="space-y-2">
                <Label>Apport initial: {downPayment[0].toLocaleString()} €</Label>
                <Slider
                  value={downPayment}
                  onValueChange={setDownPayment}
                  max={carPrice * 0.5}
                  min={0}
                  step={500}
                  className="w-full"
                />
                <div className="text-xs text-gray-500">{((downPayment[0] / carPrice) * 100).toFixed(0)}% du prix</div>
              </div>

              <div className="space-y-2">
                <Label>Durée du prêt: {loanTerm[0]} mois</Label>
                <Slider value={loanTerm} onValueChange={setLoanTerm} max={84} min={12} step={12} className="w-full" />
              </div>

              <div className="space-y-2">
                <Label>Taux d'intérêt: {interestRate[0]}%</Label>
                <Slider
                  value={interestRate}
                  onValueChange={setInterestRate}
                  max={8}
                  min={0.5}
                  step={0.1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="trade-in">Valeur de reprise (optionnel)</Label>
                <Input
                  id="trade-in"
                  type="number"
                  value={tradeInValue}
                  onChange={(e) => setTradeInValue(Number(e.target.value) || 0)}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="space-y-4">
              <Tabs defaultValue="loan" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="loan">Crédit</TabsTrigger>
                  <TabsTrigger value="lease">Leasing</TabsTrigger>
                </TabsList>

                <TabsContent value="loan" className="space-y-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Mensualité</span>
                          <span className="text-xl font-bold text-green-600">
                            {calculations.monthlyPayment.toLocaleString()} €
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Montant financé</span>
                          <span className="font-medium">{calculations.principal.toLocaleString()} €</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Intérêts totaux</span>
                          <span className="font-medium text-orange-600">
                            {calculations.totalInterest.toLocaleString()} €
                          </span>
                        </div>
                        <div className="flex justify-between items-center border-t pt-2">
                          <span className="text-sm font-medium">Coût total</span>
                          <span className="text-lg font-bold">{calculations.totalCost.toLocaleString()} €</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="lease" className="space-y-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Mensualité leasing</span>
                          <span className="text-xl font-bold text-blue-600">
                            {leaseCalculation.monthlyPayment.toLocaleString()} €
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Valeur résiduelle</span>
                          <span className="font-medium">{leaseCalculation.residualValue.toLocaleString()} €</span>
                        </div>
                        <div className="flex justify-between items-center border-t pt-2">
                          <span className="text-sm font-medium">Coût total leasing</span>
                          <span className="text-lg font-bold">{leaseCalculation.totalCost.toLocaleString()} €</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <div className="grid grid-cols-3 gap-2">
                <Button size="sm" variant="outline" className="text-xs">
                  <PiggyBank className="h-3 w-3 mr-1" />
                  Épargner
                </Button>
                <Button size="sm" variant="outline" className="text-xs">
                  <CreditCard className="h-3 w-3 mr-1" />
                  Simuler
                </Button>
                <Button size="sm" variant="outline" className="text-xs">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Optimiser
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Conseils de financement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="font-medium text-green-800 mb-1">💡 Conseil</div>
              <div className="text-green-700">Un apport de 20% minimum réduit significativement vos mensualités</div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="font-medium text-blue-800 mb-1">📊 Comparaison</div>
              <div className="text-blue-700">
                Le leasing coûte{" "}
                {((leaseCalculation.monthlyPayment / calculations.monthlyPayment - 1) * 100).toFixed(0)}%
                {leaseCalculation.monthlyPayment < calculations.monthlyPayment ? " moins" : " plus"} par mois
              </div>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <div className="font-medium text-orange-800 mb-1">⚠️ Attention</div>
              <div className="text-orange-700">Vérifiez votre taux d'endettement (max 33% des revenus)</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
