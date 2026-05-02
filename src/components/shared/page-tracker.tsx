'use client'

import { useEffect, useState } from 'react'
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

/**
 * Page view tracker — only sends data if the user has accepted cookies.
 * Respects RGPD by checking consent before any tracking.
 */
export function PageTracker() {
  const pathname = usePathname()
  const [consented, setConsented] = useState(false)

  useEffect(() => {
    const check = () => setConsented(localStorage.getItem('cookie-consent') === 'accepted')
    check()
    window.addEventListener('cookie-consent-change', check)
    window.addEventListener('storage', check)
    return () => {
      window.removeEventListener('cookie-consent-change', check)
      window.removeEventListener('storage', check)
    }
  }, [])

  useEffect(() => {
    if (!pathname || !consented) return

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
  }, [pathname, consented])

  return null
}
