import type { Car } from "@/types/car"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Star, Fuel, Users, Zap, CheckCircle, XCircle } from "lucide-react"
import Image from "next/image"

interface CarDetailsModalProps {
  car: Car | null
  isOpen: boolean
  onClose: () => void
  score?: number
}

export function CarDetailsModal({ car, isOpen, onClose, score }: CarDetailsModalProps) {
  if (!car) return null

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50"
    if (score >= 60) return "text-yellow-600 bg-yellow-50"
    return "text-red-600 bg-red-50"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent choix"
    if (score >= 60) return "Bon choix"
    return "À éviter"
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {car.brand} {car.model} ({car.year})
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Image
              src={car.image || "/placeholder.svg"}
              alt={`${car.brand} ${car.model}`}
              width={400}
              height={300}
              className="w-full h-64 object-cover rounded-lg"
            />

            {score && (
              <div className={`mt-4 p-4 rounded-lg ${getScoreColor(score)}`}>
                <div className="text-center">
                  <div className="text-3xl font-bold">{Math.round(score)}/100</div>
                  <div className="text-lg font-medium">{getScoreLabel(score)}</div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-blue-600">{car.price.toLocaleString()} €</span>
              <Badge variant="secondary" className="text-lg px-3 py-1">
                {car.category}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Fuel className="h-5 w-5" />
                <span>{car.fuelType}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                <span>{car.power} chevaux</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>{car.seats} places</span>
              </div>
              <div>
                <span>
                  {car.consumption} {car.fuelType === "Électrique" ? "kWh" : "L"}/100km
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="font-medium mb-2">Fiabilité</div>
                <div className="flex items-center gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < car.reliability ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                  <span>({car.reliability}/5)</span>
                </div>
              </div>

              <div>
                <div className="font-medium mb-2">Sécurité</div>
                <div className="flex items-center gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < car.safety ? "fill-blue-400 text-blue-400" : "text-gray-300"}`}
                    />
                  ))}
                  <span>({car.safety}/5)</span>
                </div>
              </div>

              <div>
                <div className="font-medium mb-2">Confort</div>
                <div className="flex items-center gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < car.comfort ? "fill-green-400 text-green-400" : "text-gray-300"}`}
                    />
                  ))}
                  <span>({car.comfort}/5)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div>
            <h3 className="font-semibold mb-3">Équipements</h3>
            <ul className="space-y-1">
              {car.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-green-600">Points forts</h3>
            <ul className="space-y-1">
              {car.pros.map((pro, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  {pro}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-red-600">Points faibles</h3>
            <ul className="space-y-1">
              {car.cons.map((con, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <XCircle className="h-4 w-4 text-red-500" />
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
