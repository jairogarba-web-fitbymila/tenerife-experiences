import { getTranslations } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import { Link } from '@/i18n/routing'
import { Badge } from '@/components/ui/badge'
import { Star, MapPin, Clock } from 'lucide-react'
import { Breadcrumbs } from '@/components/shared/breadcrumbs'
import { t as getLocalizedText, formatPrice } from '@/lib/helpers'
import { ScrollEffects } from '@/components/cinematic/scroll-effects'
import type { Locale } from '@/types/database'
import { notFound } from 'next/navigation'

export default async function SubcategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string; subcategory: string }>
}) {
  const { locale, category, subcategory } = await params
  const supabase = await createClient()
  const t = await getTranslations({ locale, namespace: 'item' })
  const tc = await getTranslations({ locale, namespace: 'common' })

  // Get category
  const { data: cat } = await supabase
    .from('categories')
    .select('id, name')
    .eq('slug', category)
    .single()

  if (!cat) notFound()

  // Get subcategory
  const { data: sub } = await supabase
    .from('subcategories')
    .select('*')
    .eq('category_id', cat.id)
    .eq('slug', subcategory)
    .single()

  if (!sub) notFound()

  // Get items
  const { data: items } = await supabase
    .from('items')
    .select('*')
    .eq('subcategory_id', sub.id)
    .eq('visible', true)
    .order('featured', { ascending: false })
    .order('rating', { ascending: false })

  const subcategoryName = getLocalizedText(sub.name, locale as Locale)
  const categoryName = getLocalizedText(cat.name, locale as Locale)

  return (
    <>
      <ScrollEffects />

      {/* Full-screen hero */}
      <section className="cinematic-section relative overflow-hidden" style={{ minHeight: '60vh' }}>
        {/* Background with Ken Burns animation */}
        {sub.image && (
          <div
            className="cinematic-bg animate-ken-burns"
            style={{
              backgroundImage: `url('${sub.image}')`,
            }}
            data-parallax
          />
        )}
        <div className="cinematic-overlay-gradient" />

        {/* Hero content */}
        <div className="relative z-10 flex flex-col justify-between h-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Breadcrumb */}
          <div className="reveal">
            <Breadcrumbs
              items={[
                { label: categoryName, href: `/${category}` },
                { label: subcategoryName },
              ]}
            />
          </div>

          {/* Title and description */}
          <div className="reveal">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
              {subcategoryName}
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl leading-relaxed">
              {getLocalizedText(sub.description, locale as Locale)}
            </p>
          </div>
        </div>
      </section>

      {/* Asymmetric Grid Inmersivo */}
      <section className="bg-slate-950 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {items && items.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-max gap-4 sm:gap-5 lg:gap-6">
              {items.map((item, idx) => {
                // Asymmetric layout: vary column and row spans
                let colSpan = 'lg:col-span-1'
                let rowSpan = 'lg:row-span-1'

                if (idx % 5 === 0) {
                  // Large feature card: 2 cols x 2 rows (featured items)
                  colSpan = 'sm:col-span-2 lg:col-span-2'
                  rowSpan = 'lg:row-span-2'
                } else if (idx % 5 === 2) {
                  // Tall card: 2 rows
                  rowSpan = 'lg:row-span-2'
                }

                return (
                  <Link
                    key={item.id}
                    href={`/${category}/${subcategory}/${item.slug}`}
                    className={`group relative overflow-hidden rounded-lg cursor-pointer reveal h-60 sm:h-72 ${colSpan} ${rowSpan}`}
                  >
                    {/* Background image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{
                        backgroundImage: item.image
                          ? `url('${item.image}')`
                          : `linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.9))`,
                      }}
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300" />

                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[inset_0_0_40px_rgba(249,115,22,0.3)]" />

                    {/* Content */}
                    <div className="relative z-10 h-full p-5 sm:p-6 flex flex-col justify-end">
                      {/* Featured badge */}
                      {item.featured && (
                        <div className="mb-3">
                          <Badge className="bg-orange-500/20 text-orange-400 border-0 text-xs">
                            {tc('featured')}
                          </Badge>
                        </div>
                      )}

                      <div className="transform transition-transform duration-300 group-hover:translate-y-0 translate-y-2">
                        {/* Rating stars */}
                        {item.rating > 0 && (
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < Math.round(item.rating)
                                      ? 'fill-amber-400 text-amber-400'
                                      : 'text-gray-600'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-400">
                              {item.rating.toFixed(1)} ({item.review_count})
                            </span>
                          </div>
                        )}

                        {/* Title */}
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug line-clamp-2">
                          {getLocalizedText(item.name, locale as Locale)}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                          {getLocalizedText(
                            item.short_description || item.description,
                            locale as Locale
                          )}
                        </p>

                        {/* Location and duration */}
                        <div className="flex flex-wrap gap-3 mb-4 text-xs text-gray-400">
                          {item.location && Object.keys(item.location).length > 0 && (
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5" />
                              {getLocalizedText(item.location, locale as Locale)}
                            </span>
                          )}
                          {item.duration && (
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              {item.duration}
                            </span>
                          )}
                        </div>

                        {/* Price and CTA */}
                        <div className="flex items-center justify-between pt-3 border-t border-white/10">
                          {item.price_from != null ? (
                            <div>
                              <span className="text-xs text-gray-500">{t('from')}</span>
                              <span className="ml-1 text-sm font-bold text-white">
                                {formatPrice(item.price_from, item.currency)}
                              </span>
                            </div>
                          ) : (
                            <div />
                          )}
                          <span className="text-orange-400 text-sm font-semibold group-hover:translate-x-1 transition-transform duration-300">
                            →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">{tc('noResults')}</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
