export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  gmat: {
    Tables: {
      gmat_quiz_answers: {
        Row: {
          answers: string | null;
          quiz_id: number | null;
        };
        Insert: {
          answers?: string | null;
          quiz_id?: number | null;
        };
        Update: {
          answers?: string | null;
          quiz_id?: number | null;
        };
      };
      gmat_quizzes: {
        Row: {
          author: string | null;
          created_at: string | null;
          duration: number | null;
          id: number | null;
          name: string | null;
          question_ids: string | null;
        };
        Insert: {
          author?: string | null;
          created_at?: string | null;
          duration?: number | null;
          id?: number | null;
          name?: string | null;
          question_ids?: string | null;
        };
        Update: {
          author?: string | null;
          created_at?: string | null;
          duration?: number | null;
          id?: number | null;
          name?: string | null;
          question_ids?: string | null;
        };
      };
      gmat_submissions: {
        Row: {
          answers: string | null;
          avatar: string | null;
          created_at: string | null;
          display_name: string | null;
          id: number | null;
          quiz_id: number | null;
          score: number | null;
          submitted_at: string | null;
          taker: string | null;
          total_score: number | null;
        };
        Insert: {
          answers?: string | null;
          avatar?: string | null;
          created_at?: string | null;
          display_name?: string | null;
          id?: number | null;
          quiz_id?: number | null;
          score?: number | null;
          submitted_at?: string | null;
          taker?: string | null;
          total_score?: number | null;
        };
        Update: {
          answers?: string | null;
          avatar?: string | null;
          created_at?: string | null;
          display_name?: string | null;
          id?: number | null;
          quiz_id?: number | null;
          score?: number | null;
          submitted_at?: string | null;
          taker?: string | null;
          total_score?: number | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
