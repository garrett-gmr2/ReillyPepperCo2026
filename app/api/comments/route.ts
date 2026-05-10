import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  const recipeSlug = req.nextUrl.searchParams.get('recipeSlug');
  if (!recipeSlug) return NextResponse.json([]);

  const db = getSupabase();
  if (!db) return NextResponse.json([]);

  const { data } = await db
    .from('comments')
    .select('id, author_name, body, created_at')
    .eq('recipe_slug', recipeSlug)
    .order('created_at', { ascending: false });

  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest) {
  const { recipeSlug, authorName, body } = await req.json();
  if (!recipeSlug || !authorName?.trim() || !body?.trim()) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }
  if (body.length > 1000 || authorName.length > 60) {
    return NextResponse.json({ error: 'Input too long' }, { status: 400 });
  }

  const db = getSupabase();
  if (!db) return NextResponse.json({ error: 'Database not configured' }, { status: 503 });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (db as any)
    .from('comments')
    .insert({ recipe_slug: recipeSlug, author_name: authorName.trim(), body: body.trim() })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
