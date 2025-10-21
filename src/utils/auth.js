import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'workitu_tech_super_secret_key_2024';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'jonathanperlin@gmail.com';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '$2a$10$rQZ8K9mN2pL3sT4uV5wX6yA7bC8dE9fG0hI1jK2lM3nO4pQ5rS6tU7vW8xY9zA';

export async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

export function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export async function authenticateAdmin(email, password) {
  if (email !== ADMIN_EMAIL) {
    return { success: false, message: 'Invalid credentials' };
  }

  const isValidPassword = await verifyPassword(password, ADMIN_PASSWORD_HASH);
  if (!isValidPassword) {
    return { success: false, message: 'Invalid credentials' };
  }

  const token = generateToken({ email, role: 'admin' });
  return { success: true, token };
}

export function requireAuth(handler) {
  return async (request) => {
    try {
      const token = request.cookies.get('auth-token')?.value;
      
      if (!token) {
        return NextResponse.json(
          { message: 'No token provided' },
          { status: 401 }
        );
      }

      const decoded = verifyToken(token);
      if (!decoded || decoded.role !== 'admin') {
        return NextResponse.json(
          { message: 'Invalid token' },
          { status: 401 }
        );
      }

      // Add user to request context
      request.user = decoded;
      return handler(request);
    } catch (error) {
      console.error('Auth middleware error:', error);
      return NextResponse.json(
        { message: 'Authentication failed' },
        { status: 401 }
      );
    }
  };
}
