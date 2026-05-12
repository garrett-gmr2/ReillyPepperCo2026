import { NextRequest, NextResponse } from 'next/server';

const ADMIN_COOKIE = 'admin_auth';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_SECRET = process.env.ADMIN_SECRET;

const hashValue = async (value: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(value);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, '0')).join('');
};

const getAuthToken = async () => {
  if (!ADMIN_PASSWORD || !ADMIN_SECRET) return '';
  return hashValue(ADMIN_SECRET + ADMIN_PASSWORD);
};

const isAuthorized = async (req: NextRequest) => {
  const cookie = req.cookies.get(ADMIN_COOKIE)?.value;
  const expected = await getAuthToken();
  return cookie === expected && !!expected;
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === '/admin/login' || pathname === '/api/admin/login') {
    return NextResponse.next();
  }

  if (pathname === '/api/garrett-takes' && req.method === 'GET') {
    return NextResponse.next();
  }

  if (!ADMIN_PASSWORD || !ADMIN_SECRET) {
    if (pathname.startsWith('/admin') || (pathname === '/api/garrett-takes' && req.method === 'POST')) {
      const loginUrl = new URL('/admin/login', req.url);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  if (pathname.startsWith('/admin')) {
    if (!(await isAuthorized(req))) {
      const loginUrl = new URL('/admin/login', req.url);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  if (pathname === '/api/garrett-takes' && req.method === 'POST') {
    if (!(await isAuthorized(req))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/garrett-takes', '/api/admin/login'],
};
