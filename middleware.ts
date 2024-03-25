import { NextRequest, NextResponse, userAgent } from 'next/server';

import { getAuthSession } from '@lib/server/server-session';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const agent = userAgent(request);
  const session = await getAuthSession();

  if (agent.isBot) {
    return NextResponse.json(
      { message: 'Bot can\'t access.' },
      { status: 403 },
    );
  }

  // Allow Auth Logic
  if (url.pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // No Admin - API
  if (url.pathname.startsWith('/api/admins')) {
    if (!session.isAdmin) {
      return NextResponse.json(
        { message: 'Forbidden.' },
        { status: 403 },
      );
    }
  }

  // No Session - API
  if (url.pathname.startsWith('/api')) {
    if (session.name === undefined || session.name === null) {
      return NextResponse.json(
        { message: 'Unauthorized.' },
        { status: 401 },
      );
    }
  }

  // No Session - Exclude API
  if (session.name === undefined || session.name === null) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // No Admin - Page
  if (url.pathname.startsWith('/admins')) {
    if (!session.isAdmin) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admins/:path*', '/api/:path*'],
};
