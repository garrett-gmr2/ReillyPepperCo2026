import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  const planSlug = req.nextUrl.searchParams.get('planSlug');
  if (!planSlug) return NextResponse.json([]);

  const db = getSupabase();
  if (!db) return NextResponse.json([]);

  const { data } = await db
    .from('comments')
    .select('id, author_name, body, created_at')
    .eq('plan_slug', planSlug)
    .order('created_at', { ascending: false });

  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest) {
  const { planSlug, authorName, body } = await req.json();
  if (!planSlug || !authorName?.trim() || !body?.trim()) {
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
    .insert({ plan_slug: planSlug, author_name: authorName.trim(), body: body.trim() })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
