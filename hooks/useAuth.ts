"use client"

import { useState, useEffect, createContext, useContext, type ReactNode } from "react"
import { supabase } from "@/lib/supabase"
import type { User } from "@supabase/supabase-js"
import type { User as AppUser } from "@/types/user"
import { subscriptionPlans } from "@/data/subscriptions"

interface AuthContextType {
  user: AppUser | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<AppUser>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AppUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserProfile(session.user)
      } else {
        setLoading(false)
      }
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await fetchUserProfile(session.user)
      } else {
        setUser(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchUserProfile = async (authUser: User) => {
    try {
      const { data, error } = await supabase.from("users").select("*").eq("id", authUser.id).single()

      if (error && error.code === "PGRST116") {
        // User doesn't exist, create profile
        const newUser = {
          id: authUser.id,
          email: authUser.email!,
          name: authUser.user_metadata?.name || authUser.email!.split("@")[0],
          subscription_type: "free",
        }

        const { error: insertError } = await supabase.from("users").insert(newUser)

        if (!insertError) {
          setUser({
            ...newUser,
            subscription: subscriptionPlans[0],
            createdAt: new Date().toISOString(),
            preferences: {
              favoriteCategories: [],
              budgetRange: [10000, 50000],
              preferredFuelTypes: [],
              notifications: {
                priceAlerts: true,
                newModels: true,
                recommendations: true,
              },
            },
          })
        }
      } else if (data) {
        const subscription =
          subscriptionPlans.find((plan) => plan.type === data.subscription_type) || subscriptionPlans[0]
        setUser({
          id: data.id,
          email: data.email,
          name: data.name,
          avatar: data.avatar,
          subscription,
          createdAt: data.created_at,
          preferences: data.preferences || {
            favoriteCategories: [],
            budgetRange: [10000, 50000],
            preferredFuelTypes: [],
            notifications: {
              priceAlerts: true,
              newModels: true,
              recommendations: true,
            },
          },
        })
      }
    } catch (error) {
      console.error("Error fetching user profile:", error)
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }

  const signUp = async (email: string, password: string, name: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    })
    if (error) throw error
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  const updateProfile = async (updates: Partial<AppUser>) => {
    if (!user) return

    const { error } = await supabase.from("users").update(updates).eq("id", user.id)

    if (error) throw error

    setUser({ ...user, ...updates })
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
