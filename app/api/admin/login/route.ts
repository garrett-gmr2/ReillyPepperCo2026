import { NextRequest, NextResponse } from 'next/server';
import { createHmac } from 'crypto';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_SECRET = process.env.ADMIN_SECRET;
const ADMIN_COOKIE = 'admin_auth';

const getAuthToken = () => {
  if (!ADMIN_PASSWORD || !ADMIN_SECRET) return '';
  return createHmac('sha256', ADMIN_SECRET).update(ADMIN_PASSWORD).digest('hex');
};

export async function POST(req: NextRequest) {
  if (!ADMIN_PASSWORD || !ADMIN_SECRET) {
    return NextResponse.json({ error: 'Admin auth is not configured' }, { status: 503 });
  }

  const { password } = await req.json();
  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  const token = getAuthToken();
  const res = NextResponse.json({ success: true });
  res.cookies.set({
    name: ADMIN_COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24,
  });
  return res;
}
