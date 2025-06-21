"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { AuthForm } from "@/components/auth/login-form"
import { Badge } from "@/components/ui/badge"
import { Zap, User, Settings, LogOut, Crown, BarChart3, Heart, Bell, MessageSquare, Menu, X, Car } from "lucide-react"
import Link from "next/link"

export function Header() {
  const { user, signOut } = useAuth()
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
              <Car className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CarIQ
            </span>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
              Accueil
            </Link>
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">
              Tableau de bord
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
              Tarifs
            </Link>
          </nav>

          {/* Actions Desktop */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge
                            variant={user.subscription.type === "free" ? "secondary" : "default"}
                            className={
                              user.subscription.type !== "free" ? "bg-gradient-to-r from-purple-500 to-pink-500" : ""
                            }
                          >
                            {user.subscription.name}
                          </Badge>
                          {user.subscription.type !== "free" && <Crown className="h-3 w-3 text-yellow-500" />}
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>Tableau de bord</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard?tab=favorites" className="flex items-center">
                        <Heart className="mr-2 h-4 w-4" />
                        <span>Mes favoris</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard?tab=comparisons" className="flex items-center">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        <span>Mes comparaisons</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/ai-assistant" className="flex items-center">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        <span>Assistant IA</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/pricing" className="flex items-center">
                        <Crown className="mr-2 h-4 w-4" />
                        <span>Passer à Premium</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Paramètres</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Se déconnecter</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Connexion
                </Button>
                <Button size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Essai gratuit
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-white py-4">
            <nav className="flex flex-col space-y-3">
              <Link href="/" className="text-gray-600 hover:text-gray-900 px-2 py-1">
                Accueil
              </Link>
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 px-2 py-1">
                Tableau de bord
              </Link>
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900 px-2 py-1">
                Tarifs
              </Link>

              <div className="border-t pt-3 mt-3">
                {user ? (
                  <div className="space-y-2">
                    <div className="px-2 py-1">
                      <div className="text-sm font-medium">{user.name}</div>
                      <Badge variant="secondary" className="text-xs mt-1">
                        {user.subscription.name}
                      </Badge>
                    </div>
                    <Link href="/dashboard" className="block text-gray-600 hover:text-gray-900 px-2 py-1">
                      Tableau de bord
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="block text-gray-600 hover:text-gray-900 px-2 py-1 w-full text-left"
                    >
                      Se déconnecter
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Button variant="ghost" onClick={() => setShowAuthDialog(true)} className="w-full justify-start">
                      Connexion
                    </Button>
                    <Button
                      onClick={() => setShowAuthDialog(true)}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
                    >
                      Inscription
                    </Button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Auth Dialog */}
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="sm:max-w-md">
          <AuthForm onClose={() => setShowAuthDialog(false)} />
        </DialogContent>
      </Dialog>
    </header>
  )
}
