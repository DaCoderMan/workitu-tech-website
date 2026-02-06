/**
 * Sentry Error Tracking Utility
 * Lightweight wrapper for error tracking
 */

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

/**
 * Initialize Sentry (placeholder for now - install @sentry/nextjs for full functionality)
 */
export function initSentry() {
  if (!SENTRY_DSN || !IS_PRODUCTION) {
    console.log('Sentry is disabled in development or DSN not configured');
    return;
  }

  // When you're ready to use Sentry, install @sentry/nextjs and uncomment:
  /*
  import * as Sentry from '@sentry/nextjs';

  Sentry.init({
    dsn: SENTRY_DSN,
    tracesSampleRate: 1.0,
    environment: process.env.NODE_ENV,
  });
  */

  console.log('Sentry initialized');
}

/**
 * Capture an exception
 * @param {Error} error - The error to capture
 * @param {Object} context - Additional context
 */
export function captureException(error, context = {}) {
  if (IS_PRODUCTION && SENTRY_DSN) {
    // When Sentry is installed: Sentry.captureException(error, { extra: context });
    console.error('[Sentry]', error, context);
  } else {
    console.error('[Error]', error, context);
  }
}

/**
 * Capture a message
 * @param {string} message - The message to capture
 * @param {string} level - The severity level (info, warning, error)
 */
export function captureMessage(message, level = 'info') {
  if (IS_PRODUCTION && SENTRY_DSN) {
    // When Sentry is installed: Sentry.captureMessage(message, level);
    console.log(`[Sentry ${level}]`, message);
  } else {
    console.log(`[${level}]`, message);
  }
}

/**
 * Set user context
 * @param {Object} user - User information
 */
export function setUser(user) {
  if (IS_PRODUCTION && SENTRY_DSN) {
    // When Sentry is installed: Sentry.setUser(user);
    console.log('[Sentry] User context set:', user);
  }
}

/**
 * Clear user context
 */
export function clearUser() {
  if (IS_PRODUCTION && SENTRY_DSN) {
    // When Sentry is installed: Sentry.setUser(null);
    console.log('[Sentry] User context cleared');
  }
}

export default {
  initSentry,
  captureException,
  captureMessage,
  setUser,
  clearUser,
};
