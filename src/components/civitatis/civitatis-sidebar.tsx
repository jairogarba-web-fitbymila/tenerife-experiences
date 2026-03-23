'use client'

import { useLocale, useTranslations } from 'next-intl'
import { CivitatisCard } from './civitatis-card'
import { buildCivitatisDestinationUrl } from '@/lib/civitatis'
import { Ticket } from 'lucide-react'
import type { CivitatisExperience } from '@/lib/civitatis'

interface CivitatisSidebarProps {
  /** Experiences to show in sidebar */
  experiences: CivitatisExperience[]
  /** Max items */
  limit?: number
  className?: string
}

/**
 * Sidebar widget for article/detail pages.
 * Shows compact experience cards + CTA to see all.
 */
export function CivitatisSidebar({ experiences, limit = 3, className = '' }: CivitatisSidebarProps) {
  const locale = useLocale()
  const t = useTranslations('reservas')
  const items = experiences.slice(0, limit)

  return (
    <div className={`rounded-2xl bg-slate-900/50 border border-white/5 p-5 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
          <Ticket className="h-4 w-4 text-orange-400" />
        </div>
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">{t('bookNow')}</h3>
      </div>

      <div className="space-y-3">
        {items.map((exp) => (
          <CivitatisCard key={exp.id} experience={exp} variant="compact" />
        ))}
      </div>

      <a
        href={buildCivitatisDestinationUrl(locale)}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-colors"
      >
        {t('allExperiences')}
      </a>

      <div className="mt-3 flex flex-col items-center gap-1 text-xs text-gray-500">
        <span>{t('secureBooking')} · {t('freeCancellation')}</span>
        <span>{t('bestPrice')}</span>
      </div>
    </div>
  )
}
