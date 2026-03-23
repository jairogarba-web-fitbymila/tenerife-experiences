'use client'

import { useLocale, useTranslations } from 'next-intl'
import { CivitatisCard } from './civitatis-card'
import { CATEGORY_LABELS, type CivitatisCategory, type CivitatisExperience } from '@/lib/civitatis'
import { buildCivitatisDestinationUrl } from '@/lib/civitatis'

interface CivitatisWidgetProps {
  /** Title override — defaults to category label */
  title?: string
  /** Experiences to show */
  experiences: CivitatisExperience[]
  /** Category for "View all" link */
  category?: CivitatisCategory
  /** Card variant */
  variant?: 'default' | 'compact' | 'featured'
  /** Max items to show */
  limit?: number
  /** Whether to show the "View all on Civitatis" link */
  showViewAll?: boolean
  /** Custom class for the wrapper */
  className?: string
}

/**
 * Embeddable widget that shows a set of Civitatis experiences.
 * Drop this into any page section for contextual booking suggestions.
 */
export function CivitatisWidget({
  title,
  experiences,
  category,
  variant = 'default',
  limit = 4,
  showViewAll = true,
  className = '',
}: CivitatisWidgetProps) {
  const locale = useLocale()
  const t = useTranslations('reservas')
  const items = experiences.slice(0, limit)

  const displayTitle = title || (category ? (CATEGORY_LABELS[category]?.[locale] || CATEGORY_LABELS[category]?.en) : t('popular'))

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">{displayTitle}</h3>
        {showViewAll && (
          <a
            href={buildCivitatisDestinationUrl(locale)}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="text-sm font-medium text-orange-400 hover:text-orange-300 transition-colors"
          >
            {t('allExperiences')} →
          </a>
        )}
      </div>

      {variant === 'compact' ? (
        <div className="space-y-3">
          {items.map((exp) => (
            <CivitatisCard key={exp.id} experience={exp} variant="compact" />
          ))}
        </div>
      ) : (
        <div className={`grid gap-5 ${
          variant === 'featured'
            ? 'grid-cols-1 md:grid-cols-2'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
        }`}>
          {items.map((exp) => (
            <CivitatisCard key={exp.id} experience={exp} variant={variant} />
          ))}
        </div>
      )}
    </div>
  )
}
