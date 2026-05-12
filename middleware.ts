import { NextRequest, NextResponse } from 'next/server';

// Admin password protection is currently disabled.
// We keep this middleware file in place so the auth guard can be re-enabled later.
export function middleware(_req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
