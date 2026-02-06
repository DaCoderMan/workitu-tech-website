// File: src/billing/utils/validate.ts

/**
 * Validation utilities for billing operations
 */

export class ValidationError extends Error {
  constructor(
    message: string,
    public field?: string,
    public code?: string
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class Validator {
  /**
   * Validate offering key exists in config
   */
  static validateOfferingKey(offeringKey: string | undefined): string {
    if (!offeringKey || typeof offeringKey !== 'string') {
      throw new ValidationError('Offering key is required', 'offeringKey', 'REQUIRED');
    }

    if (offeringKey.length > 100) {
      throw new ValidationError(
        'Offering key too long',
        'offeringKey',
        'TOO_LONG'
      );
    }

    // Alphanumeric, underscores, hyphens only
    if (!/^[a-zA-Z0-9_-]+$/.test(offeringKey)) {
      throw new ValidationError(
        'Offering key must be alphanumeric with underscores or hyphens',
        'offeringKey',
        'INVALID_FORMAT'
      );
    }

    return offeringKey;
  }

  /**
   * Validate user ID
   */
  static validateUserId(userId: string | undefined): string {
    if (!userId || typeof userId !== 'string') {
      throw new ValidationError('User ID is required', 'userId', 'REQUIRED');
    }

    if (userId.length > 255) {
      throw new ValidationError('User ID too long', 'userId', 'TOO_LONG');
    }

    return userId;
  }

  /**
   * Validate quantity
   */
  static validateQuantity(quantity: number | undefined): number {
    if (quantity === undefined || quantity === null) {
      return 1; // Default
    }

    const qty = Number(quantity);

    if (isNaN(qty) || qty < 1) {
      throw new ValidationError(
        'Quantity must be a positive number',
        'quantity',
        'INVALID'
      );
    }

    if (qty > 1000) {
      throw new ValidationError(
        'Quantity exceeds maximum allowed',
        'quantity',
        'TOO_LARGE'
      );
    }

    return Math.floor(qty);
  }

  /**
   * Validate URL
   */
  static validateUrl(url: string | undefined, fieldName: string): string | undefined {
    if (!url) return undefined;

    try {
      new URL(url);
      return url;
    } catch {
      throw new ValidationError(
        `Invalid URL format for ${fieldName}`,
        fieldName,
        'INVALID_URL'
      );
    }
  }

  /**
   * Validate custom amount (for flexible pricing)
   */
  static validateCustomAmount(
    amount: number | undefined,
    min: number = 100,
    max: number = 1000000
  ): number {
    if (!amount) {
      throw new ValidationError('Amount is required', 'amount', 'REQUIRED');
    }

    const amt = Number(amount);

    if (isNaN(amt)) {
      throw new ValidationError('Amount must be a number', 'amount', 'INVALID');
    }

    if (amt < min) {
      throw new ValidationError(
        `Amount must be at least $${(min / 100).toFixed(2)}`,
        'amount',
        'TOO_SMALL'
      );
    }

    if (amt > max) {
      throw new ValidationError(
        `Amount cannot exceed $${(max / 100).toFixed(2)}`,
        'amount',
        'TOO_LARGE'
      );
    }

    return Math.floor(amt);
  }

  /**
   * Sanitize custom data object
   */
  static sanitizeCustomData(data: any): Record<string, any> {
    if (!data || typeof data !== 'object') {
      return {};
    }

    // Remove functions, limit depth, size
    const sanitized: Record<string, any> = {};
    const keys = Object.keys(data).slice(0, 20); // Max 20 keys

    for (const key of keys) {
      const value = data[key];
      const type = typeof value;

      if (
        type === 'string' ||
        type === 'number' ||
        type === 'boolean' ||
        value === null
      ) {
        // Limit string length
        if (type === 'string' && value.length > 500) {
          sanitized[key] = value.substring(0, 500);
        } else {
          sanitized[key] = value;
        }
      }
    }

    return sanitized;
  }
}
