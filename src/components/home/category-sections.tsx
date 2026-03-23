'use client'

import { useState, useEffect, useCallback } from 'react'
import { Link } from '@/i18n/routing'
import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { ReviewSection } from '@/components/review/review-panel'
import { EditableImage } from '@/components/review/editable-image'
import { useReview } from '@/components/review/review-context'

interface ThumbData {
  image: string
  href: string
  labelKey: string
}

interface CategoryData {
  id: string
  href: string
  image: string
  label: string
  thumbs: ThumbData[]
}

interface LandingImage {
  section_id: string
  category: string
  position: string
  image_url: string
  label: string
}

export function CategorySections({ categories }: { categories: CategoryData[] }) {
  const t = useTranslations('home')
  const tc = useTranslations('categories')
  const { isReviewMode } = useReview()
  const [overrides, setOverrides] = useState<Record<string, string>>({})

  // Load image overrides from Supabase
  useEffect(() => {
    async function loadOverrides() {
      try {
        const res = await fetch('/api/admin/landing-images')
        if (res.ok) {
          const data: LandingImage[] = await res.json()
          const map: Record<string, string> = {}
          data.forEach(img => {
            map[img.section_id] = img.image_url
          })
          setOverrides(map)
        }
      } catch {}
    }
    loadOverrides()
  }, [])

  const getImage = useCallback((sectionId: string, fallback: string) => {
    return overrides[sectionId] || fallback
  }, [overrides])

  const handleImageChange = useCallback((sectionId: string, newUrl: string) => {
    setOverrides(prev => ({ ...prev, [sectionId]: newUrl }))
  }, [])

  return (
    <div className="relative z-10">
      {categories.map((cat, i) => {
        const isAlt = i % 2 !== 0
        const bgSectionId = `${cat.id}-bg`
        const bgImage = getImage(bgSectionId, cat.image)

        return (
          <ReviewSection key={cat.id} page="landing" sectionId={`cat-${cat.id}`} sectionLabel={`Categoría: ${cat.id}`}>
            <section
              className="cinematic-section h-[70vh] min-h-[500px] md:min-h-[600px] flex items-center border-b border-orange-500/10"
            >
              {/* Background */}
              <div
                className="cinematic-bg"
                data-parallax
                style={{ backgroundImage: `url('${bgImage}')` }}
              />
              <div className="cinematic-overlay" />

              {/* Edit button for background (admin only) */}
              <EditableImage
                sectionId={bgSectionId}
                currentImage={bgImage}
                categoryFilter={cat.id}
                label={`Fondo: ${tc(cat.id)}`}
                onImageChange={(url) => handleImageChange(bgSectionId, url)}
                className="absolute top-3 right-3"
              />

              {/* Content */}
              <div className={`relative z-10 w-full flex items-center px-6 md:px-12 lg:px-16 ${isAlt ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-lg ${isAlt ? 'text-right' : 'text-left'} reveal`}>
                  <span className="inline-block text-xs sm:text-sm font-bold tracking-[3px] text-orange-400 uppercase mb-3">
                    {cat.label}
                  </span>
                  <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold tracking-tight leading-[1.1] text-white mb-5">
                    {tc(cat.id)}
                  </h2>
                  <Link
                    href={cat.href}
                    className={`inline-flex items-center gap-2 text-orange-400 font-semibold text-lg hover:gap-3 transition-all duration-300 ${isAlt ? 'flex-row-reverse' : ''}`}
                  >
                    {isAlt ? <ArrowRight className="h-5 w-5 rotate-180" /> : null}
                    <span>{t('areas.explore')}</span>
                    {!isAlt ? <ArrowRight className="h-5 w-5" /> : null}
                  </Link>
                </div>
              </div>

              {/* Thumbnails (desktop) */}
              <div
                className={`hidden lg:flex absolute top-1/2 -translate-y-1/2 flex-col gap-4 z-20 ${isAlt ? 'left-12' : 'right-12'}`}
              >
                {cat.thumbs.map((thumb, j) => {
                  const thumbSectionId = `${cat.id}-thumb-${j}`
                  const thumbImage = getImage(thumbSectionId, thumb.image)
                  return (
                    <div key={j} className="relative group/edit">
                      <Link
                        href={thumb.href}
                        className="group/thumb relative block w-[110px] h-[110px] xl:w-[130px] xl:h-[130px] rounded-lg overflow-hidden shadow-2xl border-2 border-transparent hover:border-orange-500/60 hover:scale-105 transition-all duration-300"
                      >
                        <img src={thumbImage} alt={thumb.labelKey} className="w-full h-full object-cover" loading="lazy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <span className="absolute bottom-1.5 left-0 right-0 text-center text-[10px] xl:text-xs font-bold text-white leading-tight px-1">
                          {thumb.labelKey}
                        </span>
                      </Link>
                      {/* Edit button for thumbnail (admin only) */}
                      <EditableImage
                        sectionId={thumbSectionId}
                        currentImage={thumbImage}
                        categoryFilter={cat.id}
                        label={`${tc(cat.id)}: ${thumb.labelKey}`}
                        onImageChange={(url) => handleImageChange(thumbSectionId, url)}
                        className="absolute -top-1 -right-1"
                      />
                    </div>
                  )
                })}
              </div>

              {/* Thumbnails (mobile) */}
              <div className="flex lg:hidden absolute top-4 left-4 gap-2 z-20">
                {cat.thumbs.map((thumb, j) => {
                  const thumbSectionId = `${cat.id}-thumb-${j}`
                  const thumbImage = getImage(thumbSectionId, thumb.image)
                  return (
                    <Link
                      key={j}
                      href={thumb.href}
                      className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 border-white/20 shadow-lg flex-shrink-0"
                    >
                      <img src={thumbImage} alt={thumb.labelKey} className="w-full h-full object-cover" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <span className="absolute bottom-0.5 left-0 right-0 text-center text-[7px] sm:text-[8px] font-bold text-white leading-tight px-0.5">
                        {thumb.labelKey}
                      </span>
                    </Link>
                  )
                })}
              </div>
            </section>
          </ReviewSection>
        )
      })}
    </div>
  )
}
