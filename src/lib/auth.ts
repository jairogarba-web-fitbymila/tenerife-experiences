import { cookies } from 'next/headers'
import { timingSafeEqual, createHmac } from 'crypto'

// Session expiration: 7 days in milliseconds
const SESSION_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000

/**
 * Timing-safe string comparison to prevent timing attacks
 */
export function safeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  try {
    return timingSafeEqual(Buffer.from(a), Buffer.from(b))
  } catch {
    return false
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')
  if (!session) return false

  try {
    const parsed = JSON.parse(session.value)
    if (!parsed.authenticated || !parsed.createdAt) return false

    // Check session expiration
    const sessionAge = Date.now() - new Date(parsed.createdAt).getTime()
    if (sessionAge > SESSION_MAX_AGE_MS) return false

    return true
  } catch {
    // Reject plain strings — old format no longer accepted
    return false
  }
}

export async function requireEditor(): Promise<{
  email: string
  name: string
  role: string
} | null> {
  const user = await getAdminUser()
  if (!user) return null
  if (user.role === 'viewer') return null
  return user
}

export async function getAdminUser(): Promise<{
  email: string
  name: string
  role: string
} | null> {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')
  if (!session) return null

  try {
    const parsed = JSON.parse(session.value)
    if (!parsed.authenticated || !parsed.createdAt) return null

    // Check session expiration
    const sessionAge = Date.now() - new Date(parsed.createdAt).getTime()
    if (sessionAge > SESSION_MAX_AGE_MS) return null

    return { email: parsed.email, name: parsed.name, role: parsed.role }
  } catch {
    return null
  }
}

/**
 * Generate a CSRF token based on session + secret
 */
export function generateCSRFToken(sessionId: string): string {
  const secret = process.env.CSRF_SECRET || process.env.ADMIN_PASSWORD
  if (!secret) throw new Error('CSRF_SECRET or ADMIN_PASSWORD must be set')
  return createHmac('sha256', secret).update(sessionId).digest('hex')
}

/**
 * Verify CSRF token from request header
 */
export function verifyCSRFToken(token: string | null, sessionId: string): boolean {
  if (!token) return false
  const expected = generateCSRFToken(sessionId)
  return safeCompare(token, expected)
}
