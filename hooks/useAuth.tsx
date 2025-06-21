"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface User {
  id: string
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (email: string, password: string, name: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simuler une vérification d'authentification
    const checkAuth = () => {
      const savedUser = localStorage.getItem("user")
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
      setLoading(false)
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    // Simulation d'une connexion
    const mockUser: User = {
      id: "1",
      email,
      name: email.split("@")[0]
    }
    
    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const register = async (email: string, password: string, name: string) => {
    // Simulation d'une inscription
    const mockUser: User = {
      id: "1",
      email,
      name
    }
    
    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))
  }

  const value = {
    user,
    loading,
    login,
    logout,
    register
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
} 