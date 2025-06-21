"use client"

import type { Car } from "@/types/car"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Fuel, Users, Zap, Heart, Share2 } from "lucide-react"
import Image from "next/image"

interface CarCardProps {
  car: Car
  score?: number
  onCompare: (car: Car) => void
  onViewDetails: (car: Car) => void
  onToggleFavorite?: (carId: string) => void
  onShare?: (car: Car) => void
  isSelected?: boolean
  isFavorite?: boolean
}

export function CarCard({ 
  car, 
  score, 
  onCompare, 
  onViewDetails, 
  onToggleFavorite,
  onShare,
  isSelected = false,
  isFavorite = false 
}: CarCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50"
    if (score >= 60) return "text-yellow-600 bg-yellow-50"
    return "text-red-600 bg-red-50"
  }

  return (
    <Card className={`h-full transition-all hover:shadow-lg ${isSelected ? "ring-2 ring-blue-500" : ""}`}>
      <CardHeader className="pb-2">
        <div className="relative">
          <Image
            src={car.image || "/placeholder.svg"}
            alt={`${car.brand} ${car.model}`}
            width={300}
            height={200}
            className="w-full h-48 object-cover rounded-lg"
          />
          {score && (
            <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-sm font-bold ${getScoreColor(score)}`}>
              {Math.round(score)}/100
            </div>
          )}
          {isFavorite && (
            <div className="absolute top-2 left-2">
              <Heart className="h-5 w-5 fill-red-500 text-red-500" />
            </div>
          )}
        </div>
        <CardTitle className="text-lg">
          {car.brand} {car.model} ({car.year})
        </CardTitle>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">{car.price.toLocaleString()} €</span>
          <Badge variant="secondary">{car.category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-1">
            <Fuel className="h-4 w-4" />
            <span>{car.fuelType}</span>
          </div>
          <div className="flex items-center gap-1">
            <Zap className="h-4 w-4" />
            <span>{car.power} ch</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{car.seats} places</span>
          </div>
          <div className="text-sm">
            <span>
              {car.consumption} {car.fuelType === "Électrique" ? "kWh" : "L"}/100km
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>Fiabilité: {car.reliability}/5</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => onCompare(car)} className="flex-1">
            {isSelected ? "Retirer" : "Comparer"}
          </Button>
          <Button size="sm" onClick={() => onViewDetails(car)} className="flex-1">
            Détails
          </Button>
        </div>

        {/* Actions supplémentaires */}
        <div className="flex items-center justify-between pt-2 border-t">
          {onToggleFavorite && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleFavorite(car.id)}
              className={`flex items-center gap-1 ${isFavorite ? "text-red-500" : "text-gray-500"}`}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
              <span className="text-xs">{isFavorite ? "Favori" : "Favori"}</span>
            </Button>
          )}
          {onShare && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onShare(car)}
              className="flex items-center gap-1 text-gray-500"
            >
              <Share2 className="h-4 w-4" />
              <span className="text-xs">Partager</span>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
