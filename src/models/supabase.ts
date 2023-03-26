export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      gmat_quiz_answers: {
        Row: {
          answers: string
          quiz_id: number
        }
        Insert: {
          answers: string
          quiz_id?: number
        }
        Update: {
          answers?: string
          quiz_id?: number
        }
      }
      gmat_quizzes: {
        Row: {
          author: string
          created_at: string | null
          duration: number
          id: number
          name: string
          question_ids: string
        }
        Insert: {
          author: string
          created_at?: string | null
          duration: number
          id?: number
          name: string
          question_ids: string
        }
        Update: {
          author?: string
          created_at?: string | null
          duration?: number
          id?: number
          name?: string
          question_ids?: string
        }
      }
      gmat_submissions: {
        Row: {
          answers: string
          avatar: string | null
          created_at: string | null
          displayName: string | null
          id: number
          quiz_id: number
          score: number
          submitted_at: string | null
          taker: string
          totalScore: number
        }
        Insert: {
          answers: string
          avatar?: string | null
          created_at?: string | null
          displayName?: string | null
          id?: number
          quiz_id: number
          score?: number
          submitted_at?: string | null
          taker: string
          totalScore?: number
        }
        Update: {
          answers?: string
          avatar?: string | null
          created_at?: string | null
          displayName?: string | null
          id?: number
          quiz_id?: number
          score?: number
          submitted_at?: string | null
          taker?: string
          totalScore?: number
        }
      }
      ygg_leaderboard: {
        Row: {
          "🍍": number
          "💎": number | null
          avatar: string | null
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          "🍍"?: number
          "💎"?: number | null
          avatar?: string | null
          created_at?: string | null
          id: string
          name?: string
        }
        Update: {
          "🍍"?: number
          "💎"?: number | null
          avatar?: string | null
          created_at?: string | null
          id?: string
          name?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
