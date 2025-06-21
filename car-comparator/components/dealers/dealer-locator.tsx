"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MapPin, Phone, Mail, Star, Navigation, Clock, Car } from "lucide-react"
import type { Dealer } from "@/types/extended-types"

// Données d'exemple
const mockDealers: Dealer[] = [
  {
    id: "1",
    name: "Peugeot Paris Centre",
    address: "123 Avenue des Champs-Élysées",
    city: "Paris 75008",
    phone: "01 42 25 67 89",
    email: "contact@peugeot-paris.fr",
    rating: 4.5,
    distance: 2.3,
    brands: ["Peugeot"],
    services: ["Vente neuf", "Occasion", "Entretien", "Pièces détachées", "Essai"],
    coordinates: { lat: 48.8566, lng: 2.3522 },
  },
  {
    id: "2",
    name: "Renault Boulogne",
    address: "45 Rue de la République",
    city: "Boulogne-Billancourt 92100",
    phone: "01 46 21 34 56",
    email: "info@renault-boulogne.fr",
    rating: 4.2,
    distance: 5.7,
    brands: ["Renault", "Dacia"],
    services: ["Vente neuf", "Occasion", "Entretien", "Financement"],
    coordinates: { lat: 48.8414, lng: 2.2395 },
  },
  {
    id: "3",
    name: "BMW Premium Motors",
    address: "78 Boulevard Saint-Germain",
    city: "Paris 75006",
    phone: "01 45 48 92 15",
    email: "premium@bmw-paris.fr",
    rating: 4.8,
    distance: 3.1,
    brands: ["BMW", "Mini"],
    services: ["Vente neuf", "Occasion", "Entretien", "Pièces détachées", "Essai", "Livraison"],
    coordinates: { lat: 48.8534, lng: 2.3488 },
  },
]

interface DealerLocatorProps {
  brands?: string[]
  city?: string
}

export function DealerLocator({ brands = [], city = "Paris" }: DealerLocatorProps) {
  const [dealers, setDealers] = useState<Dealer[]>(mockDealers)
  const [searchLocation, setSearchLocation] = useState(city)
  const [selectedDealer, setSelectedDealer] = useState<Dealer | null>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)

  useEffect(() => {
    // Simuler la géolocalisation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.log("Géolocalisation non disponible")
        },
      )
    }
  }, [])

  const filteredDealers = dealers.filter((dealer) => {
    if (brands.length > 0) {
      return dealer.brands.some((brand) => brands.includes(brand))
    }
    return true
  })

  const handleBookTestDrive = (dealer: Dealer) => {
    // Ici vous ajouteriez la logique pour réserver un essai
    console.log("Réserver essai chez:", dealer.name)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Trouver un concessionnaire
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Input
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              placeholder="Ville ou code postal..."
              className="flex-1"
            />
            <Button>
              <Navigation className="h-4 w-4 mr-2" />
              Rechercher
            </Button>
          </div>

          {brands.length > 0 && (
            <div className="flex gap-2 mb-4">
              <span className="text-sm text-gray-600">Marques sélectionnées:</span>
              {brands.map((brand) => (
                <Badge key={brand} variant="secondary">
                  {brand}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {filteredDealers.map((dealer) => (
            <Card
              key={dealer.id}
              className={`cursor-pointer transition-all ${
                selectedDealer?.id === dealer.id ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => setSelectedDealer(dealer)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{dealer.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(dealer.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({dealer.rating})</span>
                      {dealer.distance && (
                        <Badge variant="outline" className="text-xs">
                          {dealer.distance} km
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Avatar>
                    <AvatarFallback>
                      <Car className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>
                      {dealer.address}, {dealer.city}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{dealer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span>{dealer.email}</span>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {dealer.brands.map((brand) => (
                      <Badge key={brand} variant="secondary" className="text-xs">
                        {brand}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {dealer.services.slice(0, 3).map((service) => (
                      <Badge key={service} variant="outline" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                    {dealer.services.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{dealer.services.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button size="sm" className="flex-1">
                    <Phone className="h-3 w-3 mr-1" />
                    Appeler
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleBookTestDrive(dealer)
                    }}
                  >
                    <Car className="h-3 w-3 mr-1" />
                    Essai
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="lg:sticky lg:top-4">
          <Card>
            <CardHeader>
              <CardTitle>Carte des concessionnaires</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="h-12 w-12 mx-auto mb-2" />
                  <p>Carte interactive</p>
                  <p className="text-sm">Intégration Google Maps à venir</p>
                </div>
              </div>

              {selectedDealer && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium mb-2">{selectedDealer.name}</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      <span>Ouvert aujourd'hui: 9h-19h</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3" />
                      <span>{selectedDealer.address}</span>
                    </div>
                  </div>
                  <Button size="sm" className="w-full mt-3">
                    Obtenir l'itinéraire
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
