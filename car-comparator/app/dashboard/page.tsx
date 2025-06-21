"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Car, 
  Heart, 
  BarChart3, 
  TrendingUp, 
  Users, 
  Euro, 
  Star, 
  Settings,
  History,
  Bookmark,
  Share2,
  Filter
} from "lucide-react"
import { cars } from "@/data/extended-cars"
import { CarCard } from "@/components/car-card"
import { Header } from "@/components/layout/header"
import { useToast } from "@/hooks/use-toast"
import type { Car as CarType } from "@/types/car"

export default function DashboardPage() {
  const [favorites, setFavorites] = useState<string[]>([])
  const [recentViews, setRecentViews] = useState<string[]>([])
  const [comparisons, setComparisons] = useState<string[][]>([])
  const [activeTab, setActiveTab] = useState("overview")
  const { toast } = useToast()

  // Charger les données depuis localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("car-favorites")
    const savedRecentViews = localStorage.getItem("car-recent-views")
    const savedComparisons = localStorage.getItem("car-comparisons")
    
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites))
    if (savedRecentViews) setRecentViews(JSON.parse(savedRecentViews))
    if (savedComparisons) setComparisons(JSON.parse(savedComparisons))
  }, [])

  // Sauvegarder les données
  useEffect(() => {
    localStorage.setItem("car-favorites", JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem("car-recent-views", JSON.stringify(recentViews))
  }, [recentViews])

  useEffect(() => {
    localStorage.setItem("car-comparisons", JSON.stringify(comparisons))
  }, [comparisons])

  const favoriteCars = cars.filter(car => favorites.includes(car.id))
  const recentCars = cars.filter(car => recentViews.includes(car.id))

  const handleToggleFavorite = (carId: string) => {
    setFavorites(prev => {
      const isFavorite = prev.includes(carId)
      if (isFavorite) {
        toast({
          title: "Retiré des favoris",
          description: "Voiture retirée de vos favoris.",
        })
        return prev.filter(id => id !== carId)
      } else {
        toast({
          title: "Ajouté aux favoris",
          description: "Voiture ajoutée à vos favoris.",
        })
        return [...prev, carId]
      }
    })
  }

  const handleShare = async (car: CarType) => {
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
      navigator.clipboard.writeText(`${car.brand} ${car.model} - ${car.price.toLocaleString()}€`)
      toast({
        title: "Lien copié",
        description: "Les informations de la voiture ont été copiées dans le presse-papiers.",
      })
    }
  }

  const handleCompare = (car: CarType) => {
    toast({
      title: "Fonctionnalité à venir",
      description: "La comparaison sera bientôt disponible depuis le tableau de bord.",
    })
  }

  const handleViewDetails = (car: CarType) => {
    // Ajouter à l'historique des vues
    setRecentViews(prev => {
      const newViews = [car.id, ...prev.filter(id => id !== car.id)].slice(0, 10)
      return newViews
    })
    
    toast({
      title: "Détails de la voiture",
      description: `Affichage des détails de ${car.brand} ${car.model}`,
    })
  }

  // Statistiques
  const totalCars = cars.length
  const averagePrice = Math.round(cars.reduce((sum, car) => sum + car.price, 0) / totalCars)
  const electricCars = cars.filter(car => car.fuelType === "Électrique").length
  const topRatedCars = cars.filter(car => car.reliability >= 4.5).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* En-tête du tableau de bord */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tableau de bord</h1>
          <p className="text-gray-600">Gérez vos favoris, suivez vos recherches et analysez vos préférences</p>
        </div>

        {/* Statistiques générales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total des voitures</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCars}</div>
              <p className="text-xs text-muted-foreground">Voitures disponibles</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Prix moyen</CardTitle>
              <Euro className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averagePrice.toLocaleString()} €</div>
              <p className="text-xs text-muted-foreground">Prix moyen du parc</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Voitures électriques</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{electricCars}</div>
              <p className="text-xs text-muted-foreground">Électriques disponibles</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hautement fiables</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{topRatedCars}</div>
              <p className="text-xs text-muted-foreground">Fiabilité ≥ 4.5/5</p>
            </CardContent>
          </Card>
        </div>

        {/* Onglets principaux */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Vue d'ensemble
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Favoris ({favorites.length})
            </TabsTrigger>
            <TabsTrigger value="recent" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              Récentes
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Paramètres
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Activité récente */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Activité récente
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Heart className="h-5 w-5 text-red-500" />
                        <div>
                          <p className="font-medium">Favoris ajoutés</p>
                          <p className="text-sm text-gray-600">{favorites.length} voitures</p>
                        </div>
                      </div>
                      <Badge variant="secondary">{favorites.length}</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <History className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="font-medium">Voitures consultées</p>
                          <p className="text-sm text-gray-600">{recentViews.length} récemment</p>
                        </div>
                      </div>
                      <Badge variant="secondary">{recentViews.length}</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <BarChart3 className="h-5 w-5 text-purple-500" />
                        <div>
                          <p className="font-medium">Comparaisons</p>
                          <p className="text-sm text-gray-600">{comparisons.length} effectuées</p>
                        </div>
                      </div>
                      <Badge variant="secondary">{comparisons.length}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recommandations personnalisées */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Recommandations pour vous
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {favoriteCars.slice(0, 3).map((car) => (
                      <div key={car.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <img
                          src={car.image || "/placeholder.svg"}
                          alt={`${car.brand} ${car.model}`}
                          className="w-12 h-8 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="font-medium">{car.brand} {car.model}</p>
                          <p className="text-sm text-gray-600">{car.price.toLocaleString()} €</p>
                        </div>
                        <Badge variant="secondary">{car.category}</Badge>
                      </div>
                    ))}
                    {favoriteCars.length === 0 && (
                      <p className="text-center text-gray-500 py-4">
                        Aucune voiture en favoris. Commencez à explorer !
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Mes voitures favorites</h2>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtrer
              </Button>
            </div>

            {favoriteCars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favoriteCars.map((car) => (
                  <CarCard
                    key={car.id}
                    car={car}
                    onCompare={handleCompare}
                    onViewDetails={handleViewDetails}
                    onToggleFavorite={handleToggleFavorite}
                    onShare={handleShare}
                    isFavorite={true}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun favori</h3>
                  <p className="text-gray-500 mb-4">
                    Vous n'avez pas encore ajouté de voitures à vos favoris.
                  </p>
                  <Button onClick={() => setActiveTab("overview")}>
                    Découvrir des voitures
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="recent" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Voitures récemment consultées</h2>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setRecentViews([])
                  toast({
                    title: "Historique effacé",
                    description: "Votre historique de consultation a été effacé.",
                  })
                }}
              >
                Effacer l'historique
              </Button>
            </div>

            {recentCars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {recentCars.map((car) => (
                  <CarCard
                    key={car.id}
                    car={car}
                    onCompare={handleCompare}
                    onViewDetails={handleViewDetails}
                    onToggleFavorite={handleToggleFavorite}
                    onShare={handleShare}
                    isFavorite={favorites.includes(car.id)}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <History className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune consultation récente</h3>
                  <p className="text-gray-500 mb-4">
                    Vous n'avez pas encore consulté de voitures.
                  </p>
                  <Button onClick={() => setActiveTab("overview")}>
                    Commencer à explorer
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres du compte</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Préférences</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Notifications</p>
                        <p className="text-sm text-gray-600">Recevoir des alertes sur les nouvelles voitures</p>
                      </div>
                      <Button variant="outline" size="sm">Configurer</Button>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Partage de données</p>
                        <p className="text-sm text-gray-600">Améliorer les recommandations</p>
                      </div>
                      <Button variant="outline" size="sm">Gérer</Button>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Thème</p>
                        <p className="text-sm text-gray-600">Personnaliser l'apparence</p>
                      </div>
                      <Button variant="outline" size="sm">Changer</Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Données</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Exporter mes données</p>
                        <p className="text-sm text-gray-600">Télécharger vos favoris et préférences</p>
                      </div>
                      <Button variant="outline" size="sm">Exporter</Button>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Supprimer le compte</p>
                        <p className="text-sm text-gray-600">Supprimer définitivement toutes vos données</p>
                      </div>
                      <Button variant="destructive" size="sm">Supprimer</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
