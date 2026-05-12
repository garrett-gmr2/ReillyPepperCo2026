import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

type GarrettTakeRow = { recipe_slug: string; rating: number; take: string; updated_at: string };

export async function GET(req: NextRequest) {
  const recipeSlug = req.nextUrl.searchParams.get('recipeSlug');
  const db = getSupabase();
  if (!db) return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const anyDb = db as any;
  const query = anyDb.from('garrett_takes').select('recipe_slug, rating, take, updated_at');
  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (recipeSlug) {
    const take = (data as GarrettTakeRow[]).find((row) => row.recipe_slug === recipeSlug) || null;
    return NextResponse.json({ take });
  }

  return NextResponse.json({ takes: data || [] });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { recipeSlug, rating, take } = body;
  if (!recipeSlug || !rating || !take) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  if (![1, 2, 3, 4, 5].includes(Number(rating))) {
    return NextResponse.json({ error: 'Rating must be 1-5' }, { status: 400 });
  }

  const db = getSupabase();
  if (!db) return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const anyDb = db as any;
  const { error } = await anyDb
    .from('garrett_takes')
    .upsert({ recipe_slug: recipeSlug, rating: Number(rating), take }, { onConflict: 'recipe_slug' });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
