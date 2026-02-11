// Security: These MUST be set via environment variables
const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;

if (!JWT_SECRET || !ADMIN_EMAIL || !ADMIN_PASSWORD_HASH) {
  console.warn('Warning: Missing required auth environment variables. Set JWT_SECRET, ADMIN_EMAIL, and ADMIN_PASSWORD_HASH.');
}

/**
 * Get the current admin user from JWT token
 */
export async function getCurrentUser(request) {
  const token = request.cookies.get('auth-token')?.value;
  if (!token) return null;

  const decoded = verifyToken(token);
  return decoded;
}

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
