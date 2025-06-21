import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types pour Supabase
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          avatar?: string
          subscription_type: string
          subscription_expires_at?: string
          preferences: any
          created_at: string
        }
        Insert: {
          id: string
          email: string
          name: string
          avatar?: string
          subscription_type?: string
          subscription_expires_at?: string
          preferences?: any
        }
        Update: {
          name?: string
          avatar?: string
          subscription_type?: string
          subscription_expires_at?: string
          preferences?: any
        }
      }
      favorites: {
        Row: {
          id: string
          user_id: string
          car_id: string
          created_at: string
        }
        Insert: {
          user_id: string
          car_id: string
        }
        Update: {}
      }
      saved_comparisons: {
        Row: {
          id: string
          user_id: string
          name: string
          car_ids: string[]
          criteria: any
          created_at: string
        }
        Insert: {
          user_id: string
          name: string
          car_ids: string[]
          criteria: any
        }
        Update: {
          name?: string
          car_ids?: string[]
          criteria?: any
        }
      }
      price_alerts: {
        Row: {
          id: string
          user_id: string
          car_id: string
          target_price: number
          current_price: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          user_id: string
          car_id: string
          target_price: number
          current_price: number
          is_active?: boolean
        }
        Update: {
          target_price?: number
          is_active?: boolean
        }
      }
    }
  }
}
