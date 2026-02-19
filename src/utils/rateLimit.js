// In-memory rate limiting — best-effort on serverless (resets per cold start).
// For stricter enforcement, use a persistent store (e.g., Firestore or Upstash Redis).
const attempts = new Map();
const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX) || 5;
const RATE_LIMIT_WINDOW = parseInt(process.env.RATE_LIMIT_WINDOW) || 900000; // 15 minutes

export function rateLimit(identifier) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW;
  
  // Clean up old attempts
  if (attempts.has(identifier)) {
    const userAttempts = attempts.get(identifier).filter(time => time > windowStart);
    attempts.set(identifier, userAttempts);
  } else {
    attempts.set(identifier, []);
  }
  
  const userAttempts = attempts.get(identifier);
  
  if (userAttempts.length >= RATE_LIMIT_MAX) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: userAttempts[0] + RATE_LIMIT_WINDOW
    };
  }
  
  // Add current attempt
  userAttempts.push(now);
  attempts.set(identifier, userAttempts);
  
  return {
    allowed: true,
    remaining: RATE_LIMIT_MAX - userAttempts.length,
    resetTime: now + RATE_LIMIT_WINDOW
  };
}

export function getClientIP(req) {
  // Support both Next.js App Router Request (headers.get) and Express-style (headers[])
  if (typeof req.headers?.get === 'function') {
    return req.headers.get('x-forwarded-for') ||
           req.headers.get('x-real-ip') ||
           'unknown';
  }
  return req.headers?.['x-forwarded-for'] ||
         req.headers?.['x-real-ip'] ||
         req.connection?.remoteAddress ||
         req.socket?.remoteAddress ||
         'unknown';
}
