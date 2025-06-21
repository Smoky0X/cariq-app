"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/useAuth"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, BarChart3, Bell, Settings, Crown, TrendingUp, Car } from "lucide-react"
import type { SavedComparison, PriceAlert } from "@/types/user"

export function UserDashboard() {
  const { user } = useAuth()
  const [favorites, setFavorites] = useState([])
  const [savedComparisons, setSavedComparisons] = useState<SavedComparison[]>([])
  const [priceAlerts, setPriceAlerts] = useState<PriceAlert[]>([])
  const [stats, setStats] = useState({
    totalComparisons: 0,
    totalFavorites: 0,
    activeAlerts: 0,
    monthlySearches: 0,
  })

  useEffect(() => {
    if (user) {
      fetchUserData()
    }
  }, [user])

  const fetchUserData = async () => {
    if (!user) return

    // Fetch favorites
    const { data: favoritesData } = await supabase.from("favorites").select("*").eq("user_id", user.id)

    // Fetch saved comparisons
    const { data: comparisonsData } = await supabase
      .from("saved_comparisons")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    // Fetch price alerts
    const { data: alertsData } = await supabase
      .from("price_alerts")
      .select("*")
      .eq("user_id", user.id)
      .eq("is_active", true)

    setFavorites(favoritesData || [])
    setSavedComparisons(comparisonsData || [])
    setPriceAlerts(alertsData || [])

    setStats({
      totalComparisons: comparisonsData?.length || 0,
      totalFavorites: favoritesData?.length || 0,
      activeAlerts: alertsData?.length || 0,
      monthlySearches: Math.floor(Math.random() * 50) + 10, // Simulé
    })
  }

  if (!user) return null

  return (
    <div className="space-y-8">
      {/* Header avec profil utilisateur */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.avatar || "/placeholder.svg"} />
            <AvatarFallback className="text-lg">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">Bonjour, {user.name} !</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={user.subscription.type === "free" ? "secondary" : "default"}>
                {user.subscription.name}
              </Badge>
              {user.subscription.type !== "free" && <Crown className="h-4 w-4 text-yellow-500" />}
            </div>
          </div>
        </div>
        <Button variant="outline">
          <Settings className="h-4 w-4 mr-2" />
          Paramètres
        </Button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Comparaisons</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalComparisons}</div>
            <p className="text-xs text-muted-foreground">
              Limite: {user.subscription.comparisonsLimit === -1 ? "∞" : user.subscription.comparisonsLimit}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Favoris</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalFavorites}</div>
            <p className="text-xs text-muted-foreground">
              Limite: {user.subscription.favoritesLimit === -1 ? "∞" : user.subscription.favoritesLimit}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertes actives</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeAlerts}</div>
            <p className="text-xs text-muted-foreground">
              Limite: {user.subscription.alertsLimit === -1 ? "∞" : user.subscription.alertsLimit}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recherches ce mois</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.monthlySearches}</div>
            <p className="text-xs text-muted-foreground">+12% vs mois dernier</p>
          </CardContent>
        </Card>
      </div>

      {/* Contenu principal */}
      <Tabs defaultValue="comparisons" className="space-y-6">
        <TabsList>
          <TabsTrigger value="comparisons">Mes Comparaisons</TabsTrigger>
          <TabsTrigger value="favorites">Mes Favoris</TabsTrigger>
          <TabsTrigger value="alerts">Alertes Prix</TabsTrigger>
          <TabsTrigger value="recommendations">Recommandations</TabsTrigger>
        </TabsList>

        <TabsContent value="comparisons" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Comparaisons sauvegardées</h3>
            <Button size="sm">Nouvelle comparaison</Button>
          </div>

          {savedComparisons.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Aucune comparaison sauvegardée</p>
                <p className="text-sm text-gray-500 mt-1">Commencez par comparer des voitures pour les retrouver ici</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {savedComparisons.map((comparison) => (
                <Card key={comparison.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{comparison.name}</CardTitle>
                      <Badge variant="outline">{comparison.cars.length} voitures</Badge>
                    </div>
                    <CardDescription>Créée le {new Date(comparison.createdAt).toLocaleDateString()}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button size="sm">Voir</Button>
                      <Button size="sm" variant="outline">
                        Modifier
                      </Button>
                      <Button size="sm" variant="outline">
                        Partager
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="favorites" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Mes voitures favorites</h3>
            <Badge variant="outline">
              {stats.totalFavorites}/{user.subscription.favoritesLimit === -1 ? "∞" : user.subscription.favoritesLimit}
            </Badge>
          </div>

          {favorites.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Aucune voiture favorite</p>
                <p className="text-sm text-gray-500 mt-1">
                  Ajoutez des voitures à vos favoris pour les retrouver rapidement
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Ici vous afficheriez les voitures favorites */}
            </div>
          )}
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Alertes de prix</h3>
            <Button size="sm" disabled={user.subscription.alertsLimit === 0}>
              Nouvelle alerte
            </Button>
          </div>

          {user.subscription.alertsLimit === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Crown className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Fonctionnalité Premium</p>
                <p className="text-sm text-gray-500 mt-1 mb-4">Passez à Premium pour recevoir des alertes de prix</p>
                <Button>Passer à Premium</Button>
              </CardContent>
            </Card>
          ) : priceAlerts.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Aucune alerte configurée</p>
                <p className="text-sm text-gray-500 mt-1">Créez des alertes pour être notifié des baisses de prix</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {priceAlerts.map((alert) => (
                <Card key={alert.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Voiture #{alert.carId}</p>
                        <p className="text-sm text-gray-600">Prix cible: {alert.targetPrice.toLocaleString()}€</p>
                        <p className="text-sm text-gray-600">Prix actuel: {alert.currentPrice.toLocaleString()}€</p>
                      </div>
                      <Badge variant={alert.currentPrice <= alert.targetPrice ? "default" : "secondary"}>
                        {alert.currentPrice <= alert.targetPrice ? "Objectif atteint" : "En attente"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <h3 className="text-lg font-semibold">Recommandations personnalisées</h3>

          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Car className="h-5 w-5" />
                  Basé sur vos recherches récentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Nous avons remarqué que vous recherchez souvent des voitures électriques dans votre budget.
                </p>
                <Button size="sm">Voir les suggestions</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Tendances du marché
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Les prix des voitures hybrides ont baissé de 8% ce mois-ci.
                </p>
                <Button size="sm" variant="outline">
                  En savoir plus
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
