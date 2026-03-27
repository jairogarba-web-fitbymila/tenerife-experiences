/**
 * Simple in-memory rate limiter (no external dependencies).
 * Suitable for serverless with moderate traffic.
 * For high-traffic production, consider @upstash/ratelimit with Redis.
 */

interface RateLimitEntry {
  count: number
  resetAt: number
}

const store = new Map<string, RateLimitEntry>()

// Clean up expired entries every 5 minutes
const CLEANUP_INTERVAL = 5 * 60 * 1000
let lastCleanup = Date.now()

function cleanup() {
  const now = Date.now()
  if (now - lastCleanup < CLEANUP_INTERVAL) return
  lastCleanup = now
  for (const [key, entry] of store) {
    if (now > entry.resetAt) {
      store.delete(key)
    }
  }
}

interface RateLimitOptions {
  /** Max requests allowed in the window */
  limit: number
  /** Window size in seconds */
  windowSeconds: number
}

interface RateLimitResult {
  success: boolean
  remaining: number
  resetAt: number
}

/**
 * Check rate limit for a given identifier (usually IP address).
 */
export function rateLimit(
  identifier: string,
  options: RateLimitOptions
): RateLimitResult {
  cleanup()

  const now = Date.now()
  const key = `${identifier}:${options.limit}:${options.windowSeconds}`
  const entry = store.get(key)

  // First request or window expired
  if (!entry || now > entry.resetAt) {
    const resetAt = now + options.windowSeconds * 1000
    store.set(key, { count: 1, resetAt })
    return { success: true, remaining: options.limit - 1, resetAt }
  }

  // Within window
  if (entry.count < options.limit) {
    entry.count++
    return { success: true, remaining: options.limit - entry.count, resetAt: entry.resetAt }
  }

  // Rate limited
  return { success: false, remaining: 0, resetAt: entry.resetAt }
}

/**
 * Get client IP from request headers (works with Vercel/Cloudflare).
 */
export function getClientIP(request: Request): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
}
