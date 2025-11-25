import { NextRequest, NextResponse } from "next/server";

interface RateLimitConfig {
  interval: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per interval
}

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// In-memory store for rate limiting
// In production, consider using Redis or Upstash
const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up expired entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetTime < now) {
      rateLimitStore.delete(key);
    }
  }
}, 60000); // Clean up every minute

export function getClientIdentifier(request: NextRequest): string {
  // Try to get the real IP from various headers
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const cfConnectingIp = request.headers.get("cf-connecting-ip");

  // Use the first available IP
  const ip =
    cfConnectingIp ||
    realIp ||
    forwardedFor?.split(",")[0]?.trim() ||
    "unknown";

  return ip;
}

export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): { success: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const key = identifier;

  let entry = rateLimitStore.get(key);

  // If no entry or expired, create new one
  if (!entry || entry.resetTime < now) {
    entry = {
      count: 1,
      resetTime: now + config.interval,
    };
    rateLimitStore.set(key, entry);
    return {
      success: true,
      remaining: config.maxRequests - 1,
      resetTime: entry.resetTime,
    };
  }

  // Check if limit exceeded
  if (entry.count >= config.maxRequests) {
    return {
      success: false,
      remaining: 0,
      resetTime: entry.resetTime,
    };
  }

  // Increment counter
  entry.count++;
  rateLimitStore.set(key, entry);

  return {
    success: true,
    remaining: config.maxRequests - entry.count,
    resetTime: entry.resetTime,
  };
}

// Predefined rate limit configurations
export const RATE_LIMITS = {
  // General API: 100 requests per minute
  api: {
    interval: 60 * 1000,
    maxRequests: 100,
  },
  // AI Analysis: 10 requests per minute (expensive operation)
  analyze: {
    interval: 60 * 1000,
    maxRequests: 10,
  },
  // Authentication: 5 attempts per minute
  auth: {
    interval: 60 * 1000,
    maxRequests: 5,
  },
  // User updates: 20 per minute
  userUpdate: {
    interval: 60 * 1000,
    maxRequests: 20,
  },
} as const;

// Helper function to create rate limited response
export function rateLimitExceeded(resetTime: number): NextResponse {
  const retryAfter = Math.ceil((resetTime - Date.now()) / 1000);

  return NextResponse.json(
    {
      success: false,
      error: "Příliš mnoho požadavků. Zkuste to prosím později.",
      retryAfter,
    },
    {
      status: 429,
      headers: {
        "Retry-After": retryAfter.toString(),
        "X-RateLimit-Reset": resetTime.toString(),
      },
    }
  );
}

// Middleware helper for rate limiting
export function withRateLimit(
  request: NextRequest,
  config: RateLimitConfig,
  customIdentifier?: string
): { success: boolean; response?: NextResponse } {
  const identifier = customIdentifier || getClientIdentifier(request);
  const result = checkRateLimit(identifier, config);

  if (!result.success) {
    return {
      success: false,
      response: rateLimitExceeded(result.resetTime),
    };
  }

  return { success: true };
}

// Higher-order function for rate-limited route handlers
export function createRateLimitedHandler<T>(
  config: RateLimitConfig,
  handler: (request: NextRequest) => Promise<NextResponse<T>>
) {
  return async (request: NextRequest): Promise<NextResponse<T | { success: false; error: string; retryAfter: number }>> => {
    const { success, response } = withRateLimit(request, config);

    if (!success && response) {
      return response as NextResponse<{ success: false; error: string; retryAfter: number }>;
    }

    return handler(request);
  };
}
