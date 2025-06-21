"use client"

import type { Car, ComparisonCriteria } from "@/types/car"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Star, Fuel, Users, Zap, Euro, Shield, Award, TrendingUp } from "lucide-react"
import Image from "next/image"

interface CarComparisonProps {
  cars: Car[]
  scores: { [key: string]: number }
  onRemoveCar: (carId: string) => void
  criteria?: ComparisonCriteria
}

export function CarComparison({ cars, scores, onRemoveCar, criteria }: CarComparisonProps) {
  if (cars.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">Sélectionnez des voitures à comparer</p>
        </CardContent>
      </Card>
    )
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50"
    if (score >= 60) return "text-yellow-600 bg-yellow-50"
    return "text-red-600 bg-red-50"
  }

  const bestCar = cars.reduce((best, car) => (scores[car.id] > scores[best.id] ? car : best))
  const worstCar = cars.reduce((worst, car) => (scores[car.id] < scores[worst.id] ? car : worst))

  const getWinner = (criterion: keyof Car, higherIsBetter = true) => {
    if (cars.length === 0) return null
    return cars.reduce((winner, car) => {
      const currentValue = car[criterion] as number
      const winnerValue = winner[criterion] as number
      return higherIsBetter ? 
        (currentValue > winnerValue ? car : winner) :
        (currentValue < winnerValue ? car : winner)
    })
  }

  const priceWinner = getWinner('price', false)
  const consumptionWinner = getWinner('consumption', false)
  const powerWinner = getWinner('power', true)
  const reliabilityWinner = getWinner('reliability', true)

  return (
    <div className="space-y-6">
      {/* Résumé de la comparaison */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Résumé de la comparaison ({cars.length} voitures)</span>
            {cars.length > 0 && (
              <Badge variant="default" className="bg-gradient-to-r from-green-600 to-blue-600">
                <Award className="h-3 w-3 mr-1" />
                Meilleur choix: {bestCar.brand} {bestCar.model}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-green-600">{Math.round(scores[bestCar.id])}</div>
              <div className="text-sm text-gray-600">Meilleur score IA</div>
              <div className="text-xs text-gray-500">{bestCar.brand} {bestCar.model}</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-blue-600">{priceWinner?.price.toLocaleString()} €</div>
              <div className="text-sm text-gray-600">Prix le plus bas</div>
              <div className="text-xs text-gray-500">{priceWinner?.brand} {priceWinner?.model}</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-purple-600">{consumptionWinner?.consumption}</div>
              <div className="text-sm text-gray-600">Consommation min</div>
              <div className="text-xs text-gray-500">{consumptionWinner?.brand} {consumptionWinner?.model}</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-orange-600">{reliabilityWinner?.reliability}/5</div>
              <div className="text-sm text-gray-600">Fiabilité max</div>
              <div className="text-xs text-gray-500">{reliabilityWinner?.brand} {reliabilityWinner?.model}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tableau de comparaison détaillé */}
      <Card>
        <CardHeader>
          <CardTitle>Comparaison détaillée</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <td className="p-2 font-medium">Critère</td>
                  {cars.map((car) => (
                    <td key={car.id} className="p-2 text-center min-w-[200px]">
                      <div className="relative">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute -top-2 -right-2 h-6 w-6 p-0 hover:bg-red-100"
                          onClick={() => onRemoveCar(car.id)}
                        >
                          <X className="h-4 w-4 text-red-500" />
                        </Button>
                        <Image
                          src={car.image || "/placeholder.svg"}
                          alt={`${car.brand} ${car.model}`}
                          width={150}
                          height={100}
                          className="w-full h-24 object-cover rounded mb-2"
                        />
                        <div className="font-medium">
                          {car.brand} {car.model}
                        </div>
                        <div
                          className={`inline-block px-2 py-1 rounded-full text-sm font-bold mt-1 ${getScoreColor(scores[car.id])}`}
                        >
                          Score: {Math.round(scores[car.id])}/100
                        </div>
                        {car.id === bestCar.id && (
                          <Badge className="mt-1 bg-gradient-to-r from-green-500 to-blue-500 text-white">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Recommandé
                          </Badge>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              </thead>
              <tbody className="space-y-2">
                <tr className="border-t">
                  <td className="p-2 font-medium flex items-center gap-2">
                    <Euro className="h-4 w-4" />
                    Prix
                  </td>
                  {cars.map((car) => (
                    <td key={car.id} className="p-2 text-center">
                      <span className={`font-bold ${car.id === priceWinner?.id ? 'text-green-600' : 'text-blue-600'}`}>
                        {car.price.toLocaleString()} €
                      </span>
                      {car.id === priceWinner?.id && <Award className="h-4 w-4 text-green-600 mx-auto mt-1" />}
                    </td>
                  ))}
                </tr>

                <tr className="border-t">
                  <td className="p-2 font-medium flex items-center gap-2">
                    <Fuel className="h-4 w-4" />
                    Carburant
                  </td>
                  {cars.map((car) => (
                    <td key={car.id} className="p-2 text-center">
                      <Badge variant="secondary">{car.fuelType}</Badge>
                    </td>
                  ))}
                </tr>

                <tr className="border-t">
                  <td className="p-2 font-medium">Consommation</td>
                  {cars.map((car) => (
                    <td key={car.id} className="p-2 text-center">
                      <span className={car.id === consumptionWinner?.id ? 'text-green-600 font-semibold' : ''}>
                        {car.consumption} {car.fuelType === "Électrique" ? "kWh" : "L"}/100km
                      </span>
                      {car.id === consumptionWinner?.id && <Award className="h-4 w-4 text-green-600 mx-auto mt-1" />}
                    </td>
                  ))}
                </tr>

                <tr className="border-t">
                  <td className="p-2 font-medium flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Puissance
                  </td>
                  {cars.map((car) => (
                    <td key={car.id} className="p-2 text-center">
                      <span className={car.id === powerWinner?.id ? 'text-orange-600 font-semibold' : ''}>
                        {car.power} ch
                      </span>
                      {car.id === powerWinner?.id && <Award className="h-4 w-4 text-orange-600 mx-auto mt-1" />}
                    </td>
                  ))}
                </tr>

                <tr className="border-t">
                  <td className="p-2 font-medium flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Places
                  </td>
                  {cars.map((car) => (
                    <td key={car.id} className="p-2 text-center">
                      {car.seats}
                    </td>
                  ))}
                </tr>

                <tr className="border-t">
                  <td className="p-2 font-medium flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    Fiabilité
                  </td>
                  {cars.map((car) => (
                    <td key={car.id} className="p-2 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < car.reliability ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="ml-1 text-sm">({car.reliability}/5)</span>
                      </div>
                      {car.id === reliabilityWinner?.id && <Award className="h-4 w-4 text-yellow-600 mx-auto mt-1" />}
                    </td>
                  ))}
                </tr>

                <tr className="border-t">
                  <td className="p-2 font-medium flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Sécurité
                  </td>
                  {cars.map((car) => (
                    <td key={car.id} className="p-2 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < car.safety ? "fill-blue-400 text-blue-400" : "text-gray-300"}`}
                          />
                        ))}
                        <span className="ml-1 text-sm">({car.safety}/5)</span>
                      </div>
                    </td>
                  ))}
                </tr>

                <tr className="border-t">
                  <td className="p-2 font-medium">Confort</td>
                  {cars.map((car) => (
                    <td key={car.id} className="p-2 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < car.comfort ? "fill-green-400 text-green-400" : "text-gray-300"}`}
                          />
                        ))}
                        <span className="ml-1 text-sm">({car.comfort}/5)</span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Critères personnalisés si disponibles */}
                {criteria && (
                  <>
                    <tr className="border-t bg-gray-50">
                      <td className="p-2 font-medium" colSpan={cars.length + 1}>
                        Critères personnalisés
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-2 font-medium">Budget respecté</td>
                      {cars.map((car) => (
                        <td key={car.id} className="p-2 text-center">
                          <Badge variant={car.price <= criteria.budget ? "default" : "destructive"}>
                            {car.price <= criteria.budget ? "✅" : "❌"}
                          </Badge>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-t">
                      <td className="p-2 font-medium">Places suffisantes</td>
                      {cars.map((car) => (
                        <td key={car.id} className="p-2 text-center">
                          <Badge variant={car.seats >= criteria.familySize ? "default" : "destructive"}>
                            {car.seats >= criteria.familySize ? "✅" : "❌"}
                          </Badge>
                        </td>
                      ))}
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
