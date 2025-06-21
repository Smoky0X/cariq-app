"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Bot, User, Send, Sparkles, Car, Calculator, MapPin } from "lucide-react"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
  suggestions?: string[]
  carRecommendations?: string[]
}

export function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Bonjour ! Je suis CarIQ Assistant, votre conseiller automobile intelligent. Comment puis-je vous aider à trouver la voiture parfaite ?",
      timestamp: new Date(),
      suggestions: [
        "Je cherche une voiture électrique",
        "Quel SUV pour une famille ?",
        "Budget 25 000€ maximum",
        "Calculer mes mensualités",
      ],
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async (message?: string) => {
    const messageText = message || input
    if (!messageText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: messageText,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simuler une réponse IA
    setTimeout(() => {
      const aiResponse = generateAIResponse(messageText)
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("électrique")) {
      return {
        id: Date.now().toString(),
        type: "ai",
        content:
          "Excellente question ! Les voitures électriques sont parfaites pour l'environnement et l'économie. Basé sur vos critères, je recommande la Tesla Model 3 pour les performances, ou la Renault Mégane E-Tech pour un excellent rapport qualité-prix.",
        timestamp: new Date(),
        carRecommendations: ["23", "24", "25"],
        suggestions: [
          "Comparer ces modèles électriques",
          "Calculer l'économie vs essence",
          "Trouver des bornes de recharge",
          "Aides gouvernementales",
        ],
      }
    }

    if (lowerMessage.includes("suv") || lowerMessage.includes("famille")) {
      return {
        id: Date.now().toString(),
        type: "ai",
        content:
          "Pour une famille, je recommande des SUV spacieux et sûrs. Le Volvo XC40 excelle en sécurité, le BMW X3 en luxe, et le Peugeot 3008 offre un excellent rapport qualité-prix.",
        timestamp: new Date(),
        carRecommendations: ["18", "21", "22"],
        suggestions: [
          "Comparer ces SUV familiaux",
          "Voir les notes de sécurité",
          "Calculer l'espace de coffre",
          "Options 7 places",
        ],
      }
    }

    if (lowerMessage.includes("budget") || lowerMessage.includes("€") || lowerMessage.includes("prix")) {
      return {
        id: Date.now().toString(),
        type: "ai",
        content:
          "Je peux vous aider à optimiser votre budget ! Dites-moi votre budget maximum et vos priorités (économie, confort, performance) pour des recommandations personnalisées.",
        timestamp: new Date(),
        suggestions: ["Budget 15 000€", "Budget 25 000€", "Budget 40 000€", "Calculer un financement"],
      }
    }

    // Réponse générique
    return {
      id: Date.now().toString(),
      type: "ai",
      content:
        "Je comprends votre demande. Pouvez-vous me donner plus de détails sur vos besoins ? Par exemple : votre budget, le type d'usage (ville/route), le nombre de places nécessaires ?",
      timestamp: new Date(),
      suggestions: [
        "Usage principalement en ville",
        "Longs trajets fréquents",
        "Famille avec enfants",
        "Premier achat automobile",
      ],
    }
  }

  return (
    <Card className="w-full max-w-md h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <div className="relative">
            <Bot className="h-6 w-6 text-blue-600" />
            <Sparkles className="h-3 w-3 text-yellow-500 absolute -top-1 -right-1" />
          </div>
          CarIQ Assistant
          <Badge variant="secondary" className="ml-auto">
            IA
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 px-4" ref={scrollAreaRef}>
          <div className="space-y-4 pb-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex gap-3 ${message.type === "user" ? "justify-end" : ""}`}>
                {message.type === "ai" && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}

                <div className={`max-w-[80%] ${message.type === "user" ? "order-first" : ""}`}>
                  <div
                    className={`rounded-lg p-3 ${
                      message.type === "user" ? "bg-blue-600 text-white ml-auto" : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>

                  {message.suggestions && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs h-7"
                          onClick={() => handleSend(suggestion)}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}

                  {message.carRecommendations && (
                    <div className="mt-2 p-2 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-1 text-xs text-blue-600 mb-1">
                        <Car className="h-3 w-3" />
                        Recommandations IA
                      </div>
                      <div className="text-xs text-blue-800">
                        {message.carRecommendations.length} voitures sélectionnées pour vous
                      </div>
                    </div>
                  )}
                </div>

                {message.type === "user" && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Posez votre question..."
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              className="flex-1"
            />
            <Button onClick={() => handleSend()} size="sm">
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-1 mt-2">
            <Button variant="ghost" size="sm" className="text-xs h-6">
              <Calculator className="h-3 w-3 mr-1" />
              Financement
            </Button>
            <Button variant="ghost" size="sm" className="text-xs h-6">
              <MapPin className="h-3 w-3 mr-1" />
              Concessionnaires
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
