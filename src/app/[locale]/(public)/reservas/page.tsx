'use client'

import { useTranslations, useLocale } from 'next-intl'
import {
  ShieldCheck,
  XCircle,
  BadgeCheck,
  Calendar,
  Sparkles,
} from 'lucide-react'
import { CivitatisCard } from '@/components/civitatis/civitatis-card'
import { CivitatisWidget } from '@/components/civitatis/civitatis-widget'
import {
  CIVITATIS_EXPERIENCES,
  CATEGORY_LABELS,
  CATEGORY_ICONS,
  getFeaturedExperiences,
  getCategoriesWithCounts,
  getExperiencesByCategory,
  buildCivitatisDestinationUrl,
} from '@/lib/civitatis'
import type { CivitatisCategory } from '@/lib/civitatis'
import { useState } from 'react'
import { ReviewSection } from '@/components/review/review-panel'
import { ScrollEffects } from '@/components/cinematic/scroll-effects'

export default function ReservasPage() {
  const t = useTranslations('reservas')
  const locale = useLocale()
  const [activeCategory, setActiveCategory] = useState<CivitatisCategory | 'all'>('all')

  const featured = getFeaturedExperiences()
  const categories = getCategoriesWithCounts()

  const filteredExperiences =
    activeCategory === 'all'
      ? CIVITATIS_EXPERIENCES
      : getExperiencesByCategory(activeCategory)

  return (
    <div className="min-h-screen">
      <ScrollEffects />

      {/* Hero Section */}
      <ReviewSection page="reservas" sectionId="reservas-hero" sectionLabel="Hero: Reservas">
        <section className="relative overflow-hidden py-20 sm:py-28">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 via-slate-950 to-blue-600/20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,146,60,0.15),transparent_50%)]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 border border-orange-500/20 px-4 py-2 mb-6">
              <Calendar className="h-4 w-4 text-orange-400" />
              <span className="text-sm text-orange-300">{t('secureBooking')}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t('title')}
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10">
              {t('subtitle')}
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
              <div className="flex items-center gap-2 text-gray-400">
                <ShieldCheck className="h-5 w-5 text-green-400" />
                <span className="text-sm">{t('secureBooking')}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <XCircle className="h-5 w-5 text-blue-400" />
                <span className="text-sm">{t('freeCancellation')}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <BadgeCheck className="h-5 w-5 text-orange-400" />
                <span className="text-sm">{t('bestPrice')}</span>
              </div>
            </div>
          </div>
        </section>
      </ReviewSection>

      {/* Featured Experiences */}
      <ReviewSection page="reservas" sectionId="reservas-featured" sectionLabel="Destacados">
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-orange-400" />
              <h2 className="text-3xl font-bold text-white">{t('popular')}</h2>
            </div>
            <p className="text-gray-400 mb-10">{t('subtitle')}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.slice(0, 6).map((exp) => (
                <CivitatisCard key={exp.id} experience={exp} variant="featured" />
              ))}
            </div>
          </div>
        </section>
      </ReviewSection>

      {/* Category Filter + All Experiences */}
      <ReviewSection page="reservas" sectionId="reservas-catalog" sectionLabel="Catálogo">
        <section className="py-16 sm:py-20 bg-white/[0.02]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">{t('allExperiences')}</h2>
              <a
                href={buildCivitatisDestinationUrl(locale)}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="hidden sm:flex items-center gap-1 text-sm font-medium text-orange-400 hover:text-orange-300 transition-colors"
              >
                {t('allExperiences')} →
              </a>
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2 mb-10">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === 'all'
                    ? 'bg-orange-500 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                Todos ({CIVITATIS_EXPERIENCES.length})
              </button>
              {categories.map(({ category, count }) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category
                      ? 'bg-orange-500 text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  {CATEGORY_ICONS[category]} {CATEGORY_LABELS[category]?.[locale] || CATEGORY_LABELS[category]?.en} ({count})
                </button>
              ))}
            </div>

            {/* Experience grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredExperiences.map((exp) => (
                <CivitatisCard key={exp.id} experience={exp} variant="default" />
              ))}
            </div>
          </div>
        </section>
      </ReviewSection>

      {/* By Category Sections */}
      <ReviewSection page="reservas" sectionId="reservas-by-category" sectionLabel="Por Categoría">
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20">
            {categories.map(({ category }) => {
              const experiences = getExperiencesByCategory(category)
              if (experiences.length === 0) return null
              return (
                <CivitatisWidget
                  key={category}
                  category={category}
                  experiences={experiences}
                  variant="default"
                  limit={4}
                />
              )
            })}
          </div>
        </section>
      </ReviewSection>

      {/* Bottom CTA */}
      <ReviewSection page="reservas" sectionId="reservas-cta" sectionLabel="CTA Final">
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="rounded-2xl bg-gradient-to-br from-orange-500/10 via-slate-900 to-blue-500/10 border border-orange-500/20 p-10 sm:p-14">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                {t('title')}
              </h2>
              <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                {t('subtitle')}
              </p>
              <a
                href={buildCivitatisDestinationUrl(locale)}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-colors text-lg"
              >
                {t('allExperiences')} →
              </a>
              <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-gray-500">
                <span>{t('secureBooking')}</span>
                <span>·</span>
                <span>{t('freeCancellation')}</span>
                <span>·</span>
                <span>{t('bestPrice')}</span>
              </div>
            </div>
          </div>
        </section>
      </ReviewSection>
    </div>
  )
}
