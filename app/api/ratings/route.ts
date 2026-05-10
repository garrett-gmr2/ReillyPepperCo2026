import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

type RatingRow = { stars: number; session_id: string };

export async function GET(req: NextRequest) {
  const planSlug = req.nextUrl.searchParams.get('planSlug');
  const sessionId = req.nextUrl.searchParams.get('sessionId');
  if (!planSlug) return NextResponse.json({ average: 0, count: 0, userStars: null });

  const db = getSupabase();
  if (!db) return NextResponse.json({ average: 0, count: 0, userStars: null });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = await (db as any)
    .from('ratings')
    .select('stars, session_id')
    .eq('plan_slug', planSlug) as { data: RatingRow[] | null };

  if (!data || data.length === 0) {
    return NextResponse.json({ average: 0, count: 0, userStars: null });
  }

  const average = data.reduce((sum, r) => sum + r.stars, 0) / data.length;
  const userStars = sessionId ? (data.find((r) => r.session_id === sessionId)?.stars ?? null) : null;

  return NextResponse.json({ average: Math.round(average * 10) / 10, count: data.length, userStars });
}

export async function POST(req: NextRequest) {
  const { planSlug, sessionId, stars } = await req.json();
  if (!planSlug || !sessionId || !stars || stars < 1 || stars > 5) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const db = getSupabase();
  if (!db) return NextResponse.json({ error: 'Database not configured' }, { status: 503 });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const anyDb = db as any;

  await anyDb
    .from('ratings')
    .upsert({ plan_slug: planSlug, session_id: sessionId, stars }, { onConflict: 'plan_slug,session_id' });

  const { data } = await anyDb
    .from('ratings')
    .select('stars, session_id')
    .eq('plan_slug', planSlug) as { data: RatingRow[] | null };

  if (!data) return NextResponse.json({ average: stars, count: 1, userStars: stars });

  const average = data.reduce((sum, r) => sum + r.stars, 0) / data.length;
  return NextResponse.json({
    average: Math.round(average * 10) / 10,
    count: data.length,
    userStars: stars,
  });
}
