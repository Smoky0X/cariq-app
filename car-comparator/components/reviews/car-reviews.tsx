"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Star, ThumbsUp, ThumbsDown, Verified, MessageSquare } from "lucide-react"
import type { Review } from "@/types/extended-types"

interface CarReviewsProps {
  carId: string
  carName: string
}

// Données d'exemple
const mockReviews: Review[] = [
  {
    id: "1",
    carId: "1",
    userId: "user1",
    userName: "Marie L.",
    rating: 4.5,
    title: "Excellente citadine pour la ville",
    content:
      "J'ai cette Peugeot 208 depuis 6 mois et j'en suis très satisfaite. Parfaite pour la ville, économique et agréable à conduire. Le design est moderne et l'habitacle bien fini.",
    pros: ["Économique", "Maniable", "Design moderne", "Bien équipée"],
    cons: ["Coffre un peu petit", "Bruit de roulement sur autoroute"],
    verified: true,
    createdAt: "2024-01-15",
    helpful: 12,
  },
  {
    id: "2",
    carId: "1",
    userId: "user2",
    userName: "Pierre M.",
    rating: 4.0,
    title: "Bon rapport qualité-prix",
    content:
      "Voiture fiable et économique. Parfaite pour les trajets quotidiens. Quelques plastiques bon marché à l'intérieur mais dans l'ensemble très satisfait.",
    pros: ["Fiable", "Économique", "Confortable"],
    cons: ["Finitions moyennes", "Performances limitées"],
    verified: false,
    createdAt: "2024-01-10",
    helpful: 8,
  },
  {
    id: "3",
    carId: "1",
    userId: "user3",
    userName: "Sophie D.",
    rating: 5.0,
    title: "Ma voiture préférée !",
    content:
      "Après avoir essayé plusieurs citadines, j'ai craqué pour la 208. Elle a tout : style, économie, technologie. Je la recommande vivement !",
    pros: ["Très stylée", "Économique", "Technologie embarquée", "Confort"],
    cons: ["Prix des options"],
    verified: true,
    createdAt: "2024-01-05",
    helpful: 15,
  },
]

export function CarReviews({ carId, carName }: CarReviewsProps) {
  const [reviews] = useState<Review[]>(mockReviews)
  const [showWriteReview, setShowWriteReview] = useState(false)
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: "",
    content: "",
    pros: "",
    cons: "",
  })

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => Math.floor(r.rating) === rating).length,
    percentage: (reviews.filter((r) => Math.floor(r.rating) === rating).length / reviews.length) * 100,
  }))

  const handleSubmitReview = () => {
    // Ici vous ajouteriez la logique pour soumettre l'avis
    console.log("Nouvel avis:", newReview)
    setShowWriteReview(false)
    setNewReview({ rating: 5, title: "", content: "", pros: "", cons: "" })
  }

  return (
    <div className="space-y-6">
      {/* Résumé des avis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Avis clients - {carName}</span>
            <Button onClick={() => setShowWriteReview(true)}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Écrire un avis
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{averageRating.toFixed(1)}</div>
              <div className="flex justify-center mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm text-gray-600">Basé sur {reviews.length} avis</div>
            </div>

            <div className="space-y-2">
              {ratingDistribution.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center gap-2">
                  <span className="text-sm w-8">{rating}★</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${percentage}%` }} />
                  </div>
                  <span className="text-sm text-gray-600 w-8">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Formulaire d'avis */}
      {showWriteReview && (
        <Card>
          <CardHeader>
            <CardTitle>Écrire un avis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Note globale</Label>
              <div className="flex gap-1 mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <button key={i} onClick={() => setNewReview((prev) => ({ ...prev, rating: i + 1 }))} className="p-1">
                    <Star
                      className={`h-6 w-6 ${
                        i < newReview.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="title">Titre de votre avis</Label>
              <Input
                id="title"
                value={newReview.title}
                onChange={(e) => setNewReview((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Résumez votre expérience..."
              />
            </div>

            <div>
              <Label htmlFor="content">Votre avis détaillé</Label>
              <Textarea
                id="content"
                value={newReview.content}
                onChange={(e) => setNewReview((prev) => ({ ...prev, content: e.target.value }))}
                placeholder="Partagez votre expérience avec cette voiture..."
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="pros">Points positifs</Label>
                <Textarea
                  id="pros"
                  value={newReview.pros}
                  onChange={(e) => setNewReview((prev) => ({ ...prev, pros: e.target.value }))}
                  placeholder="Ce que vous avez aimé..."
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="cons">Points négatifs</Label>
                <Textarea
                  id="cons"
                  value={newReview.cons}
                  onChange={(e) => setNewReview((prev) => ({ ...prev, cons: e.target.value }))}
                  placeholder="Ce qui pourrait être amélioré..."
                  rows={3}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSubmitReview}>Publier l'avis</Button>
              <Button variant="outline" onClick={() => setShowWriteReview(false)}>
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Liste des avis */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>
                      {review.userName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{review.userName}</span>
                      {review.verified && (
                        <Badge variant="secondary" className="text-xs">
                          <Verified className="h-3 w-3 mr-1" />
                          Vérifié
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(review.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">{new Date(review.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">{review.title}</h4>
                <p className="text-gray-700">{review.content}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-green-700 mb-1">👍 Points positifs</div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {review.pros.map((pro, index) => (
                        <li key={index}>• {pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-red-700 mb-1">👎 Points négatifs</div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {review.cons.map((con, index) => (
                        <li key={index}>• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-green-600">
                      <ThumbsUp className="h-4 w-4" />
                      Utile ({review.helpful})
                    </button>
                    <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-600">
                      <ThumbsDown className="h-4 w-4" />
                      Pas utile
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
