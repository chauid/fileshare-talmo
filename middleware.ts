import { getAuthSession } from '@lib/server/server-session';
import { NextRequest, NextResponse, userAgent } from 'next/server';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const agent = userAgent(request);
  const session = await getAuthSession();

  if (agent.isBot) {
    return NextResponse.json({ message: "Bot can't access." }, { status: 403 });
  }

  // Allow Auth, SignUp API
  if (url.pathname.startsWith('/api/auth') || url.pathname.startsWith('/api/signup')) {
    return NextResponse.next();
  }

  // No Session - API
  if (url.pathname.startsWith('/api')) {
    if (!session.id) {
      return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 });
    }
  }

  // No Session - Page
  if (url.pathname.startsWith('/home') || url.pathname.startsWith('/settings')) {
    if (!session.id) {
      return NextResponse.redirect(new URL('/noauth', request.url));
    }
  }

  // No Admin Session - API
  if (url.pathname.startsWith('/api/admin')) {
    if (!session.isAdmin) {
      return NextResponse.json({ message: 'Forbidden.' }, { status: 403 });
    }
  }

  // No Admin Session - Page
  if (url.pathname.startsWith('/admin')) {
    if (!session.isAdmin) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  return NextResponse.next();
}

export const config = { matcher: ['/home/:path*', '/settings/:path*', '/admins/:path*', '/api/:path*'] };
