// File: src/billing/utils/crypto.ts

import { createHmac, randomBytes } from 'crypto';

/**
 * Cryptographic utilities for webhook verification and security
 */

export class CryptoUtils {
  /**
   * Verify HMAC SHA-256 signature
   */
  static verifyHmacSha256(params: {
    data: string | Buffer;
    signature: string;
    secret: string;
  }): boolean {
    const { data, signature, secret } = params;

    try {
      const hmac = createHmac('sha256', secret);
      const dataString = typeof data === 'string' ? data : data.toString('utf8');
      hmac.update(dataString);
      const expectedSignature = hmac.digest('hex');

      // Constant-time comparison to prevent timing attacks
      return this.timingSafeEqual(signature, expectedSignature);
    } catch (error) {
      console.error('HMAC verification error:', error);
      return false;
    }
  }

  /**
   * Timing-safe string comparison
   */
  static timingSafeEqual(a: string, b: string): boolean {
    if (a.length !== b.length) {
      return false;
    }

    let result = 0;
    for (let i = 0; i < a.length; i++) {
      result |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }

    return result === 0;
  }

  /**
   * Generate a secure random nonce
   */
  static generateNonce(length: number = 16): string {
    return randomBytes(length).toString('hex');
  }

  /**
   * Hash data using SHA-256
   */
  static sha256(data: string | Buffer): string {
    const hash = createHmac('sha256', '');
    const dataString = typeof data === 'string' ? data : data.toString('utf8');
    hash.update(dataString);
    return hash.digest('hex');
  }

  /**
   * Generate event key for idempotency
   * Combines event ID with a hash of the payload
   */
  static generateEventKey(eventId: string, payload?: any): string {
    if (payload) {
      const payloadHash = this.sha256(JSON.stringify(payload)).substring(0, 8);
      return `${eventId}_${payloadHash}`;
    }
    return eventId;
  }
}
