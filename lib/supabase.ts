import { createClient } from '@supabase/supabase-js';

export type Database = {
  public: {
    Tables: {
      ratings: {
        Row: { id: string; recipe_slug: string; session_id: string; stars: number; created_at: string };
        Insert: { recipe_slug: string; session_id: string; stars: number };
        Update: { stars?: number };
      };
      comments: {
        Row: { id: string; recipe_slug: string; author_name: string; body: string; created_at: string };
        Insert: { recipe_slug: string; author_name: string; body: string };
      };
      garrett_takes: {
        Row: { recipe_slug: string; rating: number; take: string; updated_at: string };
        Insert: { recipe_slug: string; rating: number; take: string };
        Update: { rating?: number; take?: string };
      };
    };
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getSupabase(): ReturnType<typeof createClient> | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}
