import { getTranslations } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import { Link } from '@/i18n/routing'
import { Badge } from '@/components/ui/badge'
import { t as getLocalizedText } from '@/lib/helpers'
import { ScrollEffects } from '@/components/cinematic/scroll-effects'
import type { Locale } from '@/types/database'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>
}) {
  const { locale, category } = await params
  const supabase = await createClient()

  const { data: cat } = await supabase
    .from('categories')
    .select('name, description')
    .eq('slug', category)
    .single()

  if (!cat) return { title: 'Category' }

  return {
    title: getLocalizedText(cat.name, locale as Locale),
    description: getLocalizedText(cat.description, locale as Locale),
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>
}) {
  const { locale, category } = await params
  const supabase = await createClient()
  const t = await getTranslations({ locale, namespace: 'common' })

  // Fetch category
  const { data: cat } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', category)
    .single()

  if (!cat) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-white">{t('notFound')}</h1>
        <Link href="/" className="mt-4 text-orange-400 hover:text-orange-300">
          {t('backHome')}
        </Link>
      </div>
    )
  }

  // Fetch subcategories
  const { data: subcategories } = await supabase
    .from('subcategories')
    .select('*, items:items(count)')
    .eq('category_id', cat.id)
    .eq('visible', true)
    .order('sort_order')

  const categoryName = getLocalizedText(cat.name, locale as Locale)

  return (
    <>
      <ScrollEffects />

      {/* Full-screen hero */}
      <section className="cinematic-section relative overflow-hidden" style={{ minHeight: '60vh' }}>
        {/* Background with Ken Burns animation */}
        {cat.image && (
          <div
            className="cinematic-bg animate-ken-burns"
            style={{
              backgroundImage: `url('${cat.image}')`,
            }}
            data-parallax
          />
        )}
        <div className="cinematic-overlay-gradient" />

        {/* Hero content */}
        <div className="relative z-10 flex flex-col justify-end h-full px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
          <div className="reveal">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
              {categoryName}
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl leading-relaxed">
              {getLocalizedText(cat.description, locale as Locale)}
            </p>
          </div>
        </div>
      </section>

      {/* Sticky filter bar with subcategories */}
      {subcategories && subcategories.length > 0 && (
        <section className="sticky top-16 z-20 bg-slate-950/95 backdrop-blur-sm border-b border-white/5 py-4">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {subcategories.map((sub) => (
                <Link
                  key={sub.id}
                  href={`/${category}/${sub.slug}`}
                  className="inline-block"
                >
                  <Badge
                    variant="outline"
                    className="bg-slate-900/50 text-white border-orange-400/30 hover:border-orange-400/60 hover:bg-orange-400/10 transition-all duration-200 cursor-pointer whitespace-nowrap min-h-8 px-4 text-sm"
                  >
                    {getLocalizedText(sub.name, locale as Locale)}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Asymmetric Grid Inmersivo */}
      <section className="bg-slate-950 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {subcategories && subcategories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-max gap-4 sm:gap-5 lg:gap-6">
              {subcategories.map((sub, idx) => {
                // Asymmetric layout: vary column and row spans
                let colSpan = 'lg:col-span-1'
                let rowSpan = 'lg:row-span-1'

                if (idx % 5 === 0) {
                  // Large feature card: 2 cols x 2 rows
                  colSpan = 'sm:col-span-2 lg:col-span-2'
                  rowSpan = 'lg:row-span-2'
                } else if (idx % 5 === 2) {
                  // Tall card: 2 rows
                  rowSpan = 'lg:row-span-2'
                }

                return (
                  <Link
                    key={sub.id}
                    href={`/${category}/${sub.slug}`}
                    className={`group relative overflow-hidden rounded-lg cursor-pointer reveal h-60 sm:h-72 ${colSpan} ${rowSpan}`}
                  >
                    {/* Background image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{
                        backgroundImage: sub.image
                          ? `url('${sub.image}')`
                          : `linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.9))`,
                      }}
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300" />

                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[inset_0_0_40px_rgba(249,115,22,0.3)]" />

                    {/* Content */}
                    <div className="relative z-10 h-full p-5 sm:p-6 flex flex-col justify-end">
                      <div className="transform transition-transform duration-300 group-hover:translate-y-0 translate-y-2">
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-snug line-clamp-2">
                          {getLocalizedText(sub.name, locale as Locale)}
                        </h3>

                        <p className="text-sm sm:text-base text-gray-300 mb-4 line-clamp-2">
                          {getLocalizedText(sub.description, locale as Locale)}
                        </p>

                        {sub.items?.[0]?.count > 0 && (
                          <div className="flex items-center justify-between">
                            <Badge className="bg-orange-500/20 text-orange-400 border-0 text-xs">
                              {sub.items[0].count} {sub.items[0].count === 1 ? 'item' : 'items'}
                            </Badge>
                            <span className="text-orange-400 text-sm font-semibold group-hover:translate-x-1 transition-transform duration-300">
                              →
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">{t('noResults')}</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
