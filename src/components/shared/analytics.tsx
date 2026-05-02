'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

/**
 * Google Analytics — only loads if the user has accepted analytics cookies.
 * Checks localStorage for 'cookie-consent' === 'accepted'.
 */
export function Analytics() {
  const [consented, setConsented] = useState(false)

  useEffect(() => {
    const check = () => {
      const consent = localStorage.getItem('cookie-consent')
      setConsented(consent === 'accepted')
    }
    check()
    // Re-check when consent changes — same tab via custom event, other tabs via storage event
    window.addEventListener('cookie-consent-change', check)
    window.addEventListener('storage', check)
    return () => {
      window.removeEventListener('cookie-consent-change', check)
      window.removeEventListener('storage', check)
    }
  }, [])

  if (!GA_ID || !consented) return null

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}', { anonymize_ip: true });`}
      </Script>
    </>
  )
}
