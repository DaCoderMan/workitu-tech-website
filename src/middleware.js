import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'workitu_tech_super_secret_key_2024'
);

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Protect admin pages and admin API routes (except login)
  if (pathname.startsWith('/admin') ||
      (pathname.startsWith('/api/admin') && !pathname.includes('/auth'))) {

    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      // For API routes, return 401
      if (pathname.startsWith('/api/')) {
        return NextResponse.json(
          { message: 'Authentication required' },
          { status: 401 }
        );
      }
      // For admin page, redirect to login
      const loginUrl = new URL('/api/auth/login-page', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      if (payload.role !== 'admin') {
        throw new Error('Invalid role');
      }
      return NextResponse.next();
    } catch (error) {
      // Invalid token - clear it and redirect/return error
      const response = pathname.startsWith('/api/')
        ? NextResponse.json({ message: 'Invalid token' }, { status: 401 })
        : NextResponse.redirect(new URL('/api/auth/login-page', request.url));

      response.cookies.delete('auth-token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
  ],
}
