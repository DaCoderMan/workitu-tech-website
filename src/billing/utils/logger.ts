// File: src/billing/utils/logger.ts

/**
 * Simple structured logger for billing operations
 * Can be replaced with your preferred logging library
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  [key: string]: any;
}

class Logger {
  private context: LogContext = {};
  private minLevel: LogLevel;

  constructor(context?: LogContext) {
    this.context = context || {};
    this.minLevel = process.env.NODE_ENV === 'production' ? 'info' : 'debug';
  }

  private shouldLog(level: LogLevel): boolean {
    const levels: LogLevel[] = ['debug', 'info', 'warn', 'error'];
    return levels.indexOf(level) >= levels.indexOf(this.minLevel);
  }

  private log(level: LogLevel, message: string, context?: LogContext) {
    if (!this.shouldLog(level)) return;

    const timestamp = new Date().toISOString();
    const logData = {
      timestamp,
      level,
      message,
      ...this.context,
      ...context,
    };

    const logMethod = level === 'error' ? console.error :
                      level === 'warn' ? console.warn : console.log;

    if (process.env.NODE_ENV === 'production') {
      // Structured JSON logging for production
      logMethod(JSON.stringify(logData));
    } else {
      // Human-readable for development
      logMethod(`[${timestamp}] [${level.toUpperCase()}] ${message}`, context || {});
    }
  }

  debug(message: string, context?: LogContext) {
    this.log('debug', message, context);
  }

  info(message: string, context?: LogContext) {
    this.log('info', message, context);
  }

  warn(message: string, context?: LogContext) {
    this.log('warn', message, context);
  }

  error(message: string, error?: Error | any, context?: LogContext) {
    const errorContext = error
      ? {
          error: {
            message: error.message,
            stack: error.stack,
            ...error,
          },
          ...context,
        }
      : context;

    this.log('error', message, errorContext);
  }

  child(context: LogContext): Logger {
    return new Logger({ ...this.context, ...context });
  }
}

export const logger = new Logger({ module: 'billing' });

export function createLogger(context: LogContext): Logger {
  return logger.child(context);
}
