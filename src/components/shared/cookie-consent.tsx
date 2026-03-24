'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { Settings, Shield } from 'lucide-react'

type ConsentLevel = 'all' | 'essential' | null

export function CookieConsent() {
  const t = useTranslations('cookies')
  const [visible, setVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 800)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAcceptAll = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    localStorage.setItem('cookie-consent-date', new Date().toISOString())
    setVisible(false)
    // Reload so Analytics + PageTracker detect consent
    window.location.reload()
  }

  const handleEssentialOnly = () => {
    localStorage.setItem('cookie-consent', 'essential')
    localStorage.setItem('cookie-consent-date', new Date().toISOString())
    setVisible(false)
  }

  const handleReject = () => {
    localStorage.setItem('cookie-consent', 'rejected')
    localStorage.setItem('cookie-consent-date', new Date().toISOString())
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 p-4 transition-all duration-500 ease-out ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-[#0a0e1a]/95 p-6 shadow-2xl backdrop-blur-xl">
        {/* Main message */}
        <div className="flex items-start gap-3 mb-4">
          <Shield className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-300 leading-relaxed">
              {t('banner.message')}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {t('banner.detail')}{' '}
              <Link href="/cookies" className="text-orange-400 hover:underline">
                {t('banner.policyLink')}
              </Link>
              {' · '}
              <Link href="/privacidad" className="text-orange-400 hover:underline">
                {t('banner.privacyLink')}
              </Link>
            </p>
          </div>
        </div>

        {/* Granular options (collapsible) */}
        {showDetails && (
          <div className="mb-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 space-y-3">
            {/* Essential - always on */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-white">{t('banner.essential')}</span>
                <p className="text-xs text-gray-500">{t('banner.essentialDesc')}</p>
              </div>
              <span className="text-xs text-green-400 font-medium px-2 py-1 rounded bg-green-400/10">{t('banner.alwaysOn')}</span>
            </div>
            {/* Analytics */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-white">{t('banner.analytics')}</span>
                <p className="text-xs text-gray-500">{t('banner.analyticsDesc')}</p>
              </div>
              <span className="text-xs text-gray-400">{t('banner.optional')}</span>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center justify-center gap-1.5 rounded-lg border border-white/10 px-4 py-2.5 text-xs font-medium text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            <Settings className="h-3.5 w-3.5" />
            {t('banner.customize')}
          </button>
          <div className="flex-1" />
          <button
            onClick={handleReject}
            className="rounded-lg border border-white/20 px-5 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10"
          >
            {t('reject')}
          </button>
          {showDetails && (
            <button
              onClick={handleEssentialOnly}
              className="rounded-lg border border-white/20 px-5 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10"
            >
              {t('banner.essentialOnly')}
            </button>
          )}
          <button
            onClick={handleAcceptAll}
            className="rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-orange-600"
          >
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  )
}
