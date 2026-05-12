import { NextRequest, NextResponse } from 'next/server';
import { createHmac } from 'crypto';

const ADMIN_COOKIE = 'admin_auth';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_SECRET = process.env.ADMIN_SECRET;

const getAuthToken = () => {
  if (!ADMIN_PASSWORD || !ADMIN_SECRET) return '';
  return createHmac('sha256', ADMIN_SECRET).update(ADMIN_PASSWORD).digest('hex');
};

const isAuthorized = (req: NextRequest) => {
  const cookie = req.cookies.get(ADMIN_COOKIE)?.value;
  const expected = getAuthToken();
  return cookie === expected && !!expected;
};

export function middleware(req: NextRequest) {
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
    if (!isAuthorized(req)) {
      const loginUrl = new URL('/admin/login', req.url);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  if (pathname === '/api/garrett-takes' && req.method === 'POST') {
    if (!isAuthorized(req)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/garrett-takes', '/api/admin/login'],
};
