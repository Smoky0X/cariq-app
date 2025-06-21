"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { X, Filter, RotateCcw } from "lucide-react"
import type { ComparisonCriteria } from "@/types/car"

interface SearchFiltersProps {
  onFiltersChange: (filters: any) => void
  onCriteriaChange: (criteria: ComparisonCriteria) => void
}

export function SearchFilters({ onFiltersChange, onCriteriaChange }: SearchFiltersProps) {
  const [budget, setBudget] = useState([50000])
  const [criteria, setCriteria] = useState<ComparisonCriteria>({
    budget: 50000,
    fuelPreference: "",
    usage: "Mixte",
    priority: "Économie",
    familySize: 4,
  })
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleCriteriaUpdate = (updates: Partial<ComparisonCriteria>) => {
    const newCriteria = { ...criteria, ...updates }
    setCriteria(newCriteria)
    onCriteriaChange(newCriteria)
  }

  const handleReset = () => {
    const defaultCriteria: ComparisonCriteria = {
      budget: 50000,
      fuelPreference: "",
      usage: "Mixte",
      priority: "Économie",
      familySize: 4,
    }
    setCriteria(defaultCriteria)
    setBudget([50000])
    onCriteriaChange(defaultCriteria)
    onFiltersChange({})
  }

  const activeFiltersCount = Object.keys(criteria).filter(key => {
    const value = criteria[key as keyof ComparisonCriteria]
    return value !== "" && value !== 0 && value !== "Mixte" && value !== "Économie" && value !== 4
  }).length

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtres et Préférences
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount} actif{activeFiltersCount > 1 ? 's' : ''}
              </Badge>
            )}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              {showAdvanced ? "Masquer" : "Avancé"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="flex items-center gap-1"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Filtres de base */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="search">Rechercher</Label>
            <Input
              id="search"
              placeholder="Marque, modèle..."
              onChange={(e) => onFiltersChange({ search: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Catégorie</Label>
            <Select onValueChange={(value) => onFiltersChange({ category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Toutes catégories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes catégories</SelectItem>
                <SelectItem value="Citadine">Citadine</SelectItem>
                <SelectItem value="Compacte">Compacte</SelectItem>
                <SelectItem value="Berline">Berline</SelectItem>
                <SelectItem value="SUV">SUV</SelectItem>
                <SelectItem value="Familiale">Familiale</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Budget */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Budget maximum: {budget[0].toLocaleString()} €</Label>
            <Badge variant="outline" className="text-sm">
              {budget[0].toLocaleString()} €
            </Badge>
          </div>
          <Slider
            value={budget}
            onValueChange={(value) => {
              setBudget(value)
              handleCriteriaUpdate({ budget: value[0] })
              onFiltersChange({ maxPrice: value[0] })
            }}
            max={100000}
            min={10000}
            step={1000}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>10 000 €</span>
            <span>100 000 €</span>
          </div>
        </div>

        {/* Filtres avancés */}
        {showAdvanced && (
          <div className="space-y-6 pt-4 border-t">
            <h3 className="font-medium text-gray-900">Préférences avancées</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Type de carburant préféré</Label>
                <Select
                  onValueChange={(value) => {
                    handleCriteriaUpdate({ fuelPreference: value })
                    onFiltersChange({ fuelType: value })
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Aucune préférence" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Aucune préférence</SelectItem>
                    <SelectItem value="Essence">Essence</SelectItem>
                    <SelectItem value="Diesel">Diesel</SelectItem>
                    <SelectItem value="Électrique">Électrique</SelectItem>
                    <SelectItem value="Hybride">Hybride</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Usage principal</Label>
                <Select onValueChange={(value: any) => handleCriteriaUpdate({ usage: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Mixte" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ville">Ville</SelectItem>
                    <SelectItem value="Route">Route</SelectItem>
                    <SelectItem value="Mixte">Mixte</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Priorité</Label>
                <Select onValueChange={(value: any) => handleCriteriaUpdate({ priority: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Économie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Économie">Économie</SelectItem>
                    <SelectItem value="Performance">Performance</SelectItem>
                    <SelectItem value="Confort">Confort</SelectItem>
                    <SelectItem value="Écologie">Écologie</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Nombre de places minimum</Label>
                <Select onValueChange={(value) => handleCriteriaUpdate({ familySize: Number.parseInt(value) })}>
                  <SelectTrigger>
                    <SelectValue placeholder="4" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 places</SelectItem>
                    <SelectItem value="4">4 places</SelectItem>
                    <SelectItem value="5">5 places</SelectItem>
                    <SelectItem value="7">7 places</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Critères de fiabilité et sécurité */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Fiabilité minimum</Label>
                <Select onValueChange={(value) => onFiltersChange({ minReliability: Number.parseInt(value) })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Toutes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Toutes</SelectItem>
                    <SelectItem value="3">3/5 minimum</SelectItem>
                    <SelectItem value="4">4/5 minimum</SelectItem>
                    <SelectItem value="4.5">4.5/5 minimum</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Sécurité minimum</Label>
                <Select onValueChange={(value) => onFiltersChange({ minSafety: Number.parseInt(value) })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Toutes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Toutes</SelectItem>
                    <SelectItem value="3">3/5 minimum</SelectItem>
                    <SelectItem value="4">4/5 minimum</SelectItem>
                    <SelectItem value="4.5">4.5/5 minimum</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Options supplémentaires */}
            <div className="space-y-3">
              <Label>Options supplémentaires</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="favoritesOnly" 
                    onCheckedChange={(checked) => onFiltersChange({ favoritesOnly: checked })}
                  />
                  <Label htmlFor="favoritesOnly" className="text-sm">Favoris uniquement</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="electricOnly" 
                    onCheckedChange={(checked) => {
                      if (checked) {
                        onFiltersChange({ fuelType: "Électrique" })
                        handleCriteriaUpdate({ fuelPreference: "Électrique" })
                      } else {
                        onFiltersChange({ fuelType: "any" })
                        handleCriteriaUpdate({ fuelPreference: "" })
                      }
                    }}
                  />
                  <Label htmlFor="electricOnly" className="text-sm">Électriques uniquement</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="newCarsOnly" 
                    onCheckedChange={(checked) => onFiltersChange({ newCarsOnly: checked })}
                  />
                  <Label htmlFor="newCarsOnly" className="text-sm">Nouvelles voitures (2024)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="highPerformance" 
                    onCheckedChange={(checked) => onFiltersChange({ highPerformance: checked })}
                  />
                  <Label htmlFor="highPerformance" className="text-sm">Haute performance (150+ ch)</Label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Résumé des critères actifs */}
        {activeFiltersCount > 0 && (
          <div className="pt-4 border-t">
            <Label className="text-sm font-medium">Critères actifs :</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {criteria.budget !== 50000 && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Budget: {criteria.budget.toLocaleString()}€
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handleCriteriaUpdate({ budget: 50000 })}
                  />
                </Badge>
              )}
              {criteria.fuelPreference && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {criteria.fuelPreference}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handleCriteriaUpdate({ fuelPreference: "" })}
                  />
                </Badge>
              )}
              {criteria.usage !== "Mixte" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Usage: {criteria.usage}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handleCriteriaUpdate({ usage: "Mixte" })}
                  />
                </Badge>
              )}
              {criteria.priority !== "Économie" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Priorité: {criteria.priority}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handleCriteriaUpdate({ priority: "Économie" })}
                  />
                </Badge>
              )}
              {criteria.familySize !== 4 && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {criteria.familySize}+ places
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handleCriteriaUpdate({ familySize: 4 })}
                  />
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
