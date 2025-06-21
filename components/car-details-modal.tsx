"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Fuel, Users, Zap, Euro, Shield, Award } from "lucide-react"
import Image from "next/image"
import type { Car } from "@/types/car"

interface CarDetailsModalProps {
  car: Car
  onClose: () => void
}

export function CarDetailsModal({ car, onClose }: CarDetailsModalProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {car.brand} {car.model} ({car.year})
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Image et informations principales */}
          <div className="space-y-4">
            <div className="relative">
              <Image
                src={car.image || "/placeholder.svg"}
                alt={`${car.brand} ${car.model}`}
                width={500}
                height={300}
                className="w-full h-64 object-cover rounded-lg"
              />
              <Badge className="absolute top-2 right-2 bg-blue-600">
                {car.category}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{car.price.toLocaleString()} €</div>
                <div className="text-sm text-gray-600">Prix</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{car.consumption}</div>
                <div className="text-sm text-gray-600">
                  {car.fuelType === "Électrique" ? "kWh" : "L"}/100km
                </div>
              </div>
            </div>
          </div>

          {/* Détails techniques */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Caractéristiques techniques</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Fuel className="h-4 w-4 text-gray-500" />
                    <span>Carburant</span>
                  </div>
                  <Badge variant="secondary">{car.fuelType}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-gray-500" />
                    <span>Puissance</span>
                  </div>
                  <span className="font-medium">{car.power} ch</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span>Places</span>
                  </div>
                  <span className="font-medium">{car.seats}</span>
                </div>
              </div>
            </div>

            {/* Notes et évaluations */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Évaluations</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>Fiabilité</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < car.reliability ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">({car.reliability}/5)</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-blue-500" />
                    <span>Sécurité</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < car.safety ? "fill-blue-400 text-blue-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">({car.safety}/5)</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-green-500" />
                    <span>Confort</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < car.comfort ? "fill-green-400 text-green-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">({car.comfort}/5)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Équipements */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Équipements</h3>
              <div className="flex flex-wrap gap-2">
                {car.features.map((feature, index) => (
                  <Badge key={index} variant="outline">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Avantages et inconvénients */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <h3 className="text-lg font-semibold mb-3 text-green-700">Avantages</h3>
            <ul className="space-y-2">
              {car.pros.map((pro, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">{pro}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3 text-red-700">Inconvénients</h3>
            <ul className="space-y-2">
              {car.cons.map((con, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm">{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6 pt-6 border-t">
          <Button className="flex-1" onClick={onClose}>
            Fermer
          </Button>
          <Button variant="outline" className="flex-1">
            Comparer
          </Button>
          <Button variant="outline" className="flex-1">
            Partager
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
