'use client'

import { useLocale, useTranslations } from 'next-intl'
import { buildCivitatisUrl } from '@/lib/civitatis'
import { Star, Clock, Users } from 'lucide-react'
import type { CivitatisExperience } from '@/lib/civitatis'

interface CivitatisCardProps {
  experience: CivitatisExperience
  variant?: 'default' | 'compact' | 'featured'
}

/**
 * Experience card that links to Civitatis with affiliate tracking.
 * Renders as a visually rich card matching the cinematic design system.
 */
export function CivitatisCard({ experience, variant = 'default' }: CivitatisCardProps) {
  const locale = useLocale()
  const t = useTranslations('reservas')
  const href = buildCivitatisUrl(`tenerife/${experience.slug}`, locale)
  const title = experience.title[locale] || experience.title.en
  const description = experience.description[locale] || experience.description.en

  if (variant === 'compact') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="group flex gap-4 p-3 rounded-xl bg-slate-900/50 border border-white/5 hover:border-orange-500/30 transition-all duration-300"
      >
        <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
          <img src={experience.image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-white truncate group-hover:text-orange-400 transition-colors">{title}</h4>
          <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
            <Star className="h-3 w-3 text-orange-400 fill-orange-400" />
            <span>{experience.rating}</span>
            <span>·</span>
            <Clock className="h-3 w-3" />
            <span>{experience.duration}</span>
          </div>
          <div className="mt-1">
            {experience.freeTour ? (
              <span className="text-sm font-bold text-green-400">Free Tour</span>
            ) : (
              <span className="text-sm font-bold text-orange-400">{experience.priceFrom}€</span>
            )}
          </div>
        </div>
      </a>
    )
  }

  if (variant === 'featured') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="group relative overflow-hidden rounded-2xl bg-slate-900/50 border border-white/5 hover:border-orange-500/30 transition-all duration-500 col-span-2 md:col-span-1"
      >
        <div className="relative h-64 overflow-hidden">
          <img
            src={experience.image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Rating badge */}
          <div className="absolute top-4 left-4 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/10">
            <Star className="h-3.5 w-3.5 text-orange-400 fill-orange-400" />
            <span className="text-xs font-bold text-white">{experience.rating}</span>
            <span className="text-xs text-gray-400">({experience.reviewCount.toLocaleString()})</span>
          </div>

          {experience.freeTour && (
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-green-500/90 text-xs font-bold text-white uppercase tracking-wider">
              Free Tour
            </div>
          )}

          {/* Price + CTA */}
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors drop-shadow-lg">
                {title}
              </h3>
              <div className="flex items-center gap-3 mt-1 text-xs text-gray-300">
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{experience.duration}</span>
                <span className="flex items-center gap-1"><Users className="h-3 w-3" />{experience.reviewCount.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              {!experience.freeTour && (
                <span className="text-2xl font-black text-white drop-shadow-lg">{experience.priceFrom}€</span>
              )}
            </div>
          </div>
        </div>

        <div className="p-5">
          <p className="text-sm text-gray-400 line-clamp-2">{description}</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-gray-500">{t('secureBooking')} · {t('freeCancellation')}</span>
            <span className="text-sm font-semibold text-orange-400 group-hover:text-orange-300 transition-colors">
              {t('bookNow')} →
            </span>
          </div>
        </div>
      </a>
    )
  }

  // Default variant
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="group relative overflow-hidden rounded-2xl bg-slate-900/50 border border-white/5 hover:border-orange-500/30 transition-all duration-500"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={experience.image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

        {/* Rating */}
        <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-xs">
          <Star className="h-3 w-3 text-orange-400 fill-orange-400" />
          <span className="font-bold text-white">{experience.rating}</span>
        </div>

        {experience.freeTour && (
          <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-green-500/90 text-xs font-bold text-white uppercase">
            Free
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-base font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="mt-1 text-xs text-gray-400 line-clamp-2">{description}</p>

        <div className="mt-3 flex items-center justify-between pt-3 border-t border-white/5">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Clock className="h-3.5 w-3.5" />
            <span>{experience.duration}</span>
          </div>
          {experience.freeTour ? (
            <span className="text-lg font-bold text-green-400">Free Tour</span>
          ) : (
            <div className="text-right">
              <span className="text-xs text-gray-500">desde</span>
              <span className="ml-1 text-lg font-bold text-orange-400">{experience.priceFrom}€</span>
            </div>
          )}
        </div>
      </div>
    </a>
  )
}
