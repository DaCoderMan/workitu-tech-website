import { NextResponse } from 'next/server';
import { authenticateAdmin } from '../../../../utils/auth';
import { rateLimit, getClientIP } from '../../../../utils/rateLimit';

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    
    // Rate limiting
    const clientIP = getClientIP(request);
    const rateLimitResult = rateLimit(`login:${clientIP}`);
    
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { message: 'Too many login attempts. Please try again later.' },
        { status: 429 }
      );
    }
    
    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }
    
    // Authenticate
    const result = await authenticateAdmin(email, password);
    
    if (!result.success) {
      return NextResponse.json(
        { message: result.message },
        { status: 401 }
      );
    }
    
    // Set cookie
    const response = NextResponse.json(
      { message: 'Login successful' },
      { status: 200 }
    );
    
    response.cookies.set('auth-token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 // 24 hours
    });
    
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
