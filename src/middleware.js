import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'workitu_tech_super_secret_key_2024'
);

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Protect admin API routes (except auth endpoints)
  if (pathname.startsWith('/api/admin') && !pathname.includes('/auth')) {
    // Allow public reads of content for site pages
    if (pathname.startsWith('/api/admin/content') && request.method === 'GET') {
      return NextResponse.next();
    }


    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      );
    }

    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      if (payload.role !== 'admin') {
        throw new Error('Invalid role');
      }
      return NextResponse.next();
    } catch (error) {
      // Invalid token - clear it and redirect/return error
      const response = NextResponse.json({ message: 'Invalid token' }, { status: 401 });
      response.cookies.delete('auth-token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/admin/:path*',
  ],
}
