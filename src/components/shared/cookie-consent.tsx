'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'

export function CookieConsent() {
  const t = useTranslations('cookies')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setVisible(false)
    // Enable analytics by reloading if GA ID is set
    if (process.env.NEXT_PUBLIC_GA_ID) {
      window.location.reload()
    }
  }

  const handleReject = () => {
    localStorage.setItem('cookie-consent', 'rejected')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 p-4 transition-all duration-500 ease-out ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-[#0a0e1a]/80 p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-300 sm:max-w-[65%]">
            {t('message')}
          </p>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleReject}
              className="rounded-lg border border-white/20 px-5 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10"
            >
              {t('reject')}
            </button>
            <button
              onClick={handleAccept}
              className="rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-orange-600"
            >
              {t('accept')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
