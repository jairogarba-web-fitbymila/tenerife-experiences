'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

function getSessionId(): string {
  if (typeof window === 'undefined') return ''
  let sessionId = sessionStorage.getItem('te_session_id')
  if (!sessionId) {
    sessionId = crypto.randomUUID()
    sessionStorage.setItem('te_session_id', sessionId)
  }
  return sessionId
}

function getLocaleFromPath(pathname: string): string | null {
  const match = pathname.match(/^\/([a-z]{2})(\/|$)/)
  return match ? match[1] : null
}

export function PageTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname) return

    try {
      const sessionId = getSessionId()
      const locale = getLocaleFromPath(pathname)

      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page_path: pathname,
          locale,
          referrer: document.referrer || null,
          session_id: sessionId,
        }),
      }).catch(() => {})
    } catch {
      // Silent fail
    }
  }, [pathname])

  return null
}
