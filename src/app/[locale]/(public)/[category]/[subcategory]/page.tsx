import { getTranslations } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import { Link } from '@/i18n/routing'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, MapPin, Clock, ArrowLeft } from 'lucide-react'
import { Breadcrumbs } from '@/components/shared/breadcrumbs'
import { t as getLocalizedText, formatPrice } from '@/lib/helpers'
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

  return (
    <>
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Breadcrumbs
              items={[
                { label: getLocalizedText(cat.name, locale as Locale), href: `/${category}` },
                { label: getLocalizedText(sub.name, locale as Locale) },
              ]}
            />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            {getLocalizedText(sub.name, locale as Locale)}
          </h1>
          <p className="mt-3 text-lg text-gray-400 max-w-3xl">
            {getLocalizedText(sub.description, locale as Locale)}
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items?.map((item) => (
              <Link key={item.id} href={`/${category}/${subcategory}/${item.slug}`}>
                <Card className="group bg-slate-900/50 border-white/5 hover:border-orange-400/20 transition-all duration-300 overflow-hidden h-full cursor-pointer">
                  {item.image && (
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={item.image}
                        alt={getLocalizedText(item.name, locale as Locale)}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      {item.featured && (
                        <Badge className="bg-orange-500/20 text-orange-400 border-0 text-xs">
                          {tc('featured')}
                        </Badge>
                      )}
                      {item.rating > 0 && (
                        <span className="flex items-center gap-1 text-sm text-amber-400">
                          <Star className="h-3.5 w-3.5 fill-amber-400" />
                          {item.rating}
                          <span className="text-gray-500">({item.review_count})</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-semibold text-white group-hover:text-orange-400 transition-colors line-clamp-2">
                      {getLocalizedText(item.name, locale as Locale)}
                    </h3>

                    <p className="mt-1.5 text-sm text-gray-400 line-clamp-2">
                      {getLocalizedText(item.short_description || item.description, locale as Locale)}
                    </p>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        {item.location && Object.keys(item.location).length > 0 && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {getLocalizedText(item.location, locale as Locale)}
                          </span>
                        )}
                        {item.duration && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {item.duration}
                          </span>
                        )}
                      </div>

                      {item.price_from != null && (
                        <div className="text-right">
                          <span className="text-xs text-gray-500">{t('from')}</span>
                          <span className="ml-1 text-sm font-bold text-white">
                            {formatPrice(item.price_from, item.currency)}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {(!items || items.length === 0) && (
            <div className="text-center py-12">
              <p className="text-gray-500">{tc('noResults')}</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
