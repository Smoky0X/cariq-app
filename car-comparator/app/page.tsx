"use client"

import { useState, useMemo, useEffect } from "react"
import type { Car, ComparisonCriteria } from "@/types/car"
import { cars } from "@/data/extended-cars"
import { calculateCarScore } from "@/utils/scoring"
import { SearchFilters } from "@/components/search-filters"
import { CarCard } from "@/components/car-card"
import { CarComparison } from "@/components/car-comparison"
import { CarDetailsModal } from "@/components/car-details-modal"
import { AIChatbot } from "@/components/ai/ai-chatbot"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { CarIcon, BarChart3, Trophy, MessageSquare, Sparkles, TrendingUp, Filter, X, Heart, Share2 } from "lucide-react"
import { AuthProvider } from "@/hooks/useAuth"
import { Header } from "@/components/layout/header"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

function CarComparatorContent() {
  const [filters, setFilters] = useState<any>({})
  const [criteria, setCriteria] = useState<ComparisonCriteria>({
    budget: 50000,
    fuelPreference: "",
    usage: "Mixte",
    priority: "Économie",
    familySize: 4,
  })
  const [selectedCars, setSelectedCars] = useState<Car[]>([])
  const [detailsCar, setDetailsCar] = useState<Car | null>(null)
  const [activeTab, setActiveTab] = useState("search")
  const [showAIChat, setShowAIChat] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<"score" | "price" | "consumption">("score")
  const [showFilters, setShowFilters] = useState(false)
  const { toast } = useToast()

  // Charger les favoris depuis localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("car-favorites")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  // Sauvegarder les favoris
  useEffect(() => {
    localStorage.setItem("car-favorites", JSON.stringify(favorites))
  }, [favorites])

  // Filtrer les voitures
  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      if (filters.search && !`${car.brand} ${car.model}`.toLowerCase().includes(filters.search.toLowerCase())) {
        return false
      }
      if (filters.category && filters.category !== "all" && car.category !== filters.category) {
        return false
      }
      if (filters.maxPrice && car.price > filters.maxPrice) {
        return false
      }
      if (filters.fuelType && filters.fuelType !== "any" && car.fuelType !== filters.fuelType) {
        return false
      }
      if (filters.favoritesOnly && !favorites.includes(car.id)) {
        return false
      }
      return true
    })
  }, [filters, favorites])

  // Calculer les scores
  const carScores = useMemo(() => {
    const scores: { [key: string]: number } = {}
    filteredCars.forEach((car) => {
      scores[car.id] = calculateCarScore(car, criteria)
    })
    return scores
  }, [filteredCars, criteria])

  // Trier les voitures
  const sortedCars = useMemo(() => {
    return [...filteredCars].sort((a, b) => {
      switch (sortBy) {
        case "price":
          return a.price - b.price
        case "consumption":
          return a.consumption - b.consumption
        case "score":
        default:
          return carScores[b.id] - carScores[a.id]
      }
    })
  }, [filteredCars, carScores, sortBy])

  const handleCompare = (car: Car) => {
    setSelectedCars((prev) => {
      const isSelected = prev.some((c) => c.id === car.id)
      if (isSelected) {
        return prev.filter((c) => c.id !== car.id)
      } else if (prev.length < 4) {
        toast({
          title: "Voiture ajoutée à la comparaison",
          description: `${car.brand} ${car.model} a été ajoutée à votre comparaison.`,
        })
        return [...prev, car]
      } else {
        toast({
          title: "Limite atteinte",
          description: "Vous ne pouvez comparer que 4 voitures maximum.",
          variant: "destructive",
        })
        return prev
      }
    })
  }

  const handleRemoveFromComparison = (carId: string) => {
    setSelectedCars((prev) => prev.filter((c) => c.id !== carId))
  }

  const handleToggleFavorite = (carId: string) => {
    setFavorites((prev) => {
      const isFavorite = prev.includes(carId)
      if (isFavorite) {
        toast({
          title: "Retiré des favoris",
          description: "Voiture retirée de vos favoris.",
        })
        return prev.filter((id) => id !== carId)
      } else {
        toast({
          title: "Ajouté aux favoris",
          description: "Voiture ajoutée à vos favoris.",
        })
        return [...prev, carId]
      }
    })
  }

  const handleShare = async (car: Car) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${car.brand} ${car.model}`,
          text: `Découvrez la ${car.brand} ${car.model} - ${car.price.toLocaleString()}€`,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Erreur lors du partage:", error)
      }
    } else {
      // Fallback pour les navigateurs qui ne supportent pas l'API Share
      navigator.clipboard.writeText(`${car.brand} ${car.model} - ${car.price.toLocaleString()}€`)
      toast({
        title: "Lien copié",
        description: "Les informations de la voiture ont été copiées dans le presse-papiers.",
      })
    }
  }

  const selectedCarScores = useMemo(() => {
    const scores: { [key: string]: number } = {}
    selectedCars.forEach((car) => {
      scores[car.id] = calculateCarScore(car, criteria)
    })
    return scores
  }, [selectedCars, criteria])

  const bestCar = sortedCars[0]
  const topCars = sortedCars.slice(0, 3)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full mb-4">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Propulsé par l'Intelligence Artificielle</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            CarIQ
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            L'assistant automobile intelligent qui trouve la voiture parfaite selon vos besoins, votre budget et vos
            préférences
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <TrendingUp className="h-3 w-3 mr-1" />
              {cars.length}+ voitures analysées
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              <BarChart3 className="h-3 w-3 mr-1" />
              Comparaisons intelligentes
            </Badge>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              <MessageSquare className="h-3 w-3 mr-1" />
              Assistant IA 24/7
            </Badge>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm">
            <TabsTrigger value="search" className="flex items-center gap-2">
              <CarIcon className="h-4 w-4" />
              Recherche ({filteredCars.length})
            </TabsTrigger>
            <TabsTrigger value="comparison" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Comparaison ({selectedCars.length})
            </TabsTrigger>
            <TabsTrigger value="recommendation" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Recommandations IA
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-6">
            {/* Filtres et contrôles */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                {showFilters ? "Masquer" : "Afficher"} les filtres
              </Button>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Trier par:</span>
                <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="score">Score IA</SelectItem>
                    <SelectItem value="price">Prix</SelectItem>
                    <SelectItem value="consumption">Consommation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {showFilters && (
              <SearchFilters onFiltersChange={setFilters} onCriteriaChange={setCriteria} />
            )}

            {/* Top Recommendations */}
            {topCars.length > 0 && (
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
                    <Trophy className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">Top 3 Recommandations IA</h2>
                    <p className="text-gray-600">Sélectionnées spécialement pour vous</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {topCars.map((car, index) => (
                    <div key={car.id} className="relative">
                      {index === 0 && (
                        <div className="absolute -top-2 -right-2 z-10">
                          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">#1 Choix</Badge>
                        </div>
                      )}
                      <CarCard
                        car={car}
                        score={carScores[car.id]}
                        onCompare={handleCompare}
                        onViewDetails={setDetailsCar}
                        onToggleFavorite={handleToggleFavorite}
                        onShare={handleShare}
                        isSelected={selectedCars.some((c) => c.id === car.id)}
                        isFavorite={favorites.includes(car.id)}
                      />
                    </div>
                  ))}
                </div>

                {bestCar && (
                  <div className="mt-6 p-4 bg-white/50 rounded-lg">
                    <h3 className="font-semibold mb-2">
                      Pourquoi {bestCar.brand} {bestCar.model} ?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <ul className="space-y-1 text-gray-700">
                        <li>✅ Respecte votre budget de {criteria.budget.toLocaleString()} €</li>
                        <li>✅ Correspond à votre priorité : {criteria.priority}</li>
                        <li>✅ Adapté à un usage {criteria.usage.toLowerCase()}</li>
                      </ul>
                      <ul className="space-y-1 text-gray-700">
                        <li>⭐ Score de fiabilité : {bestCar.reliability}/5</li>
                        <li>🛡️ Note de sécurité : {bestCar.safety}/5</li>
                        <li>💰 Consommation : {bestCar.consumption} L/100km</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Liste des voitures */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedCars.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  score={carScores[car.id]}
                  onCompare={handleCompare}
                  onViewDetails={setDetailsCar}
                  onToggleFavorite={handleToggleFavorite}
                  onShare={handleShare}
                  isSelected={selectedCars.some((c) => c.id === car.id)}
                  isFavorite={favorites.includes(car.id)}
                />
              ))}
            </div>

            {sortedCars.length === 0 && (
              <div className="text-center py-12">
                <CarIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune voiture trouvée</h3>
                <p className="text-gray-500">Essayez d'ajuster vos filtres pour voir plus de résultats.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="comparison" className="space-y-6">
            {selectedCars.length > 0 ? (
              <CarComparison
                cars={selectedCars}
                scores={selectedCarScores}
                onRemoveCar={handleRemoveFromComparison}
                criteria={criteria}
              />
            ) : (
              <div className="text-center py-12">
                <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune voiture sélectionnée</h3>
                <p className="text-gray-500 mb-4">
                  Sélectionnez des voitures dans l'onglet Recherche pour les comparer.
                </p>
                <Button onClick={() => setActiveTab("search")}>Aller à la recherche</Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="recommendation" className="space-y-6">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Recommandations Personnalisées</h2>
                  <p className="text-gray-600">Basées sur vos préférences et l'analyse IA</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {topCars.map((car, index) => (
                  <div key={car.id} className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{car.brand} {car.model}</h3>
                      <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                        #{index + 1}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Score IA: <span className="font-semibold text-purple-600">{Math.round(carScores[car.id])}/100</span>
                    </p>
                    <div className="space-y-1 text-xs text-gray-500">
                      <div>Prix: {car.price.toLocaleString()} €</div>
                      <div>Consommation: {car.consumption} L/100km</div>
                      <div>Fiabilité: {car.reliability}/5</div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" onClick={() => handleCompare(car)} className="flex-1">
                        Comparer
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setDetailsCar(car)}>
                        Détails
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Assistant IA */}
        <Dialog open={showAIChat} onOpenChange={setShowAIChat}>
          <DialogContent className="max-w-2xl h-[600px]">
            <AIChatbot onClose={() => setShowAIChat(false)} />
          </DialogContent>
        </Dialog>

        {/* Détails de la voiture */}
        {detailsCar && (
          <CarDetailsModal car={detailsCar} onClose={() => setDetailsCar(null)} />
        )}

        {/* Bouton flottant pour l'assistant IA */}
        <Button
          onClick={() => setShowAIChat(true)}
          className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </main>
    </div>
  )
}

export default function CarComparator() {
  return (
    <AuthProvider>
      <CarComparatorContent />
    </AuthProvider>
  )
}
