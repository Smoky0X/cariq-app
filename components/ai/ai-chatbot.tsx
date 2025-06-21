"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Send, Bot, User, X } from "lucide-react"

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

interface AIChatbotProps {
  onClose?: () => void
}

export function AIChatbot({ onClose }: AIChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Bonjour ! Je suis l'assistant CarIQ. Je peux vous aider à trouver la voiture parfaite selon vos besoins. Que recherchez-vous ?",
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simuler une réponse IA
    setTimeout(() => {
      const aiResponses = [
        "Excellente question ! Basé sur vos critères, je recommande de regarder les voitures compactes qui offrent un bon rapport qualité-prix.",
        "Pour votre budget et vos besoins, les voitures électriques pourraient être intéressantes. Voulez-vous que je vous montre les options disponibles ?",
        "La fiabilité est importante ! Je peux vous guider vers les marques les plus fiables selon les dernières études.",
        "Pour un usage familial, je recommande de privilégier l'espace et la sécurité. Avez-vous des préférences particulières ?",
        "Le prix d'achat n'est qu'une partie du coût total. N'oubliez pas de considérer l'entretien et la consommation !"
      ]
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)]
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        isUser: false,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold">Assistant CarIQ</h3>
            <p className="text-sm text-gray-500">IA spécialisée automobile</p>
          </div>
        </div>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-[80%] ${message.isUser ? "order-2" : "order-1"}`}>
              <Card className={`${message.isUser ? "bg-blue-500 text-white" : "bg-gray-50"}`}>
                <CardContent className="p-3">
                  <div className="flex items-start gap-2">
                    {!message.isUser && (
                      <div className="p-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-1">
                        <Bot className="h-3 w-3 text-white" />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${message.isUser ? "text-blue-100" : "text-gray-500"}`}>
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                    {message.isUser && (
                      <div className="p-1 bg-white rounded-full mt-1">
                        <User className="h-3 w-3 text-blue-500" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <Card className="bg-gray-50">
              <CardContent className="p-3">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                    <Bot className="h-3 w-3 text-white" />
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Posez votre question..."
            className="flex-1"
            disabled={isTyping}
          />
          <Button onClick={handleSendMessage} disabled={!inputValue.trim() || isTyping}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Suggestions rapides */}
        <div className="flex flex-wrap gap-2 mt-3">
          {["Budget 30k€", "Électrique", "Familiale", "Fiabilité"].map((suggestion) => (
            <Button
              key={suggestion}
              variant="outline"
              size="sm"
              onClick={() => setInputValue(suggestion)}
              disabled={isTyping}
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
