/**
 * In-memory idempotency store for Stripe webhooks
 * Prevents duplicate processing when Stripe retries events
 * TTL: 24 hours (Stripe retries within 72h but we keep recent events)
 */

const processedEvents = new Map<string, number>() // eventId -> timestamp
const TTL_MS = 24 * 60 * 60 * 1000 // 24 hours

// Cleanup every hour
setInterval(() => {
  const now = Date.now()
  for (const [id, ts] of processedEvents.entries()) {
    if (now - ts > TTL_MS) processedEvents.delete(id)
  }
}, 60 * 60 * 1000)

/**
 * Check if an event has already been processed
 */
export function isEventProcessed(eventId: string): boolean {
  const ts = processedEvents.get(eventId)
  if (!ts) return false
  if (Date.now() - ts > TTL_MS) {
    processedEvents.delete(eventId)
    return false
  }
  return true
}

/**
 * Mark an event as processed
 */
export function markEventProcessed(eventId: string): void {
  processedEvents.set(eventId, Date.now())
}
