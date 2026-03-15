import { getTranslations } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import { Link } from '@/i18n/routing'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Star,
  MapPin,
  Clock,
  Check,
  ExternalLink,
  Share2,
  Heart,
  Waves,
  Shield,
  Accessibility,
  AlertTriangle,
} from 'lucide-react'
import { Breadcrumbs } from '@/components/shared/breadcrumbs'
import { t as getLocalizedText, formatPrice } from '@/lib/helpers'
import type { Locale } from '@/types/database'
import { notFound } from 'next/navigation'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string; subcategory: string; item: string }>
}) {
  const { locale, item: itemSlug } = await params
  const supabase = await createClient()

  const { data: item } = await supabase
    .from('items')
    .select('name, meta_title, meta_description, short_description, image')
    .eq('slug', itemSlug)
    .single()

  if (!item) return { title: 'Item' }

  const title = getLocalizedText(item.meta_title || item.name, locale as Locale)
  const description = getLocalizedText(
    item.meta_description || item.short_description,
    locale as Locale
  )

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: item.image ? [item.image] : [],
    },
  }
}

export default async function ItemDetailPage({
  params,
}: {
  params: Promise<{ locale: string; category: string; subcategory: string; item: string }>
}) {
  const { locale, category, subcategory, item: itemSlug } = await params
  const supabase = await createClient()
  const t = await getTranslations({ locale, namespace: 'item' })

  const { data: item } = await supabase
    .from('items')
    .select('*')
    .eq('slug', itemSlug)
    .eq('visible', true)
    .single()

  if (!item) notFound()

  // Get category and subcategory names for breadcrumbs
  const { data: cat } = await supabase
    .from('categories')
    .select('name')
    .eq('slug', category)
    .single()

  const { data: sub } = await supabase
    .from('subcategories')
    .select('name')
    .eq('slug', subcategory)
    .single()

  // Get reviews
  const { data: reviews } = await supabase
    .from('reviews')
    .select('*')
    .eq('item_id', item.id)
    .eq('approved', true)
    .order('created_at', { ascending: false })
    .limit(10)

  const loc = locale as Locale

  // JSON-LD structured data
  const isBookable = item.bookable && item.booking_url
  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': isBookable ? 'Product' : 'TouristAttraction',
    name: getLocalizedText(item.name, loc),
    description: getLocalizedText(item.short_description || item.description, loc),
    ...(item.image && { image: item.image }),
    ...(item.location && typeof item.location === 'object' && Object.keys(item.location).length > 0 && {
      address: getLocalizedText(item.location, loc),
    }),
    ...(item.latitude && item.longitude && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: item.latitude,
        longitude: item.longitude,
      },
    }),
    ...(item.rating > 0 && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: item.rating,
        reviewCount: item.review_count || 1,
        bestRating: 5,
      },
    }),
    ...(isBookable && item.price_from != null && {
      offers: {
        '@type': 'Offer',
        price: item.price_from,
        priceCurrency: item.currency || 'EUR',
        availability: 'https://schema.org/InStock',
        url: item.booking_url,
      },
    }),
  }

  return (
    <div className="pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumbs
          items={[
            { label: cat ? getLocalizedText(cat.name, loc) : category, href: `/${category}` },
            { label: sub ? getLocalizedText(sub.name, loc) : subcategory, href: `/${category}/${subcategory}` },
            { label: getLocalizedText(item.name, loc) },
          ]}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image */}
            {item.image && (
              <div className="aspect-[16/9] rounded-2xl overflow-hidden">
                <img
                  src={item.image}
                  alt={getLocalizedText(item.name, loc)}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Title & Meta */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                {item.featured && (
                  <Badge className="bg-orange-500/20 text-orange-400 border-0">Featured</Badge>
                )}
                {item.rating > 0 && (
                  <span className="flex items-center gap-1 text-amber-400">
                    <Star className="h-4 w-4 fill-amber-400" />
                    {item.rating}
                    <span className="text-gray-500 text-sm">({item.review_count} {t('reviews')})</span>
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                {getLocalizedText(item.name, loc)}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-400">
                {item.location && Object.keys(item.location).length > 0 && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-orange-400" />
                    {getLocalizedText(item.location, loc)}
                  </span>
                )}
                {item.duration && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {t('duration')}: {item.duration}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-3">{t('description')}</h2>
              <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                {getLocalizedText(item.description, loc)}
              </div>
            </div>

            {/* Beach-specific info */}
            {item.sand_type && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {item.sand_type && (
                  <Card className="bg-slate-900/50 border-white/5">
                    <CardContent className="p-4 flex items-start gap-3">
                      <Waves className="h-5 w-5 text-blue-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-white">{t('sandType')}</p>
                        <p className="text-sm text-gray-400">{getLocalizedText(item.sand_type, loc)}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
                {item.bathing_conditions && (
                  <Card className="bg-slate-900/50 border-white/5">
                    <CardContent className="p-4 flex items-start gap-3">
                      <Shield className="h-5 w-5 text-green-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-white">{t('bathingConditions')}</p>
                        <p className="text-sm text-gray-400">{getLocalizedText(item.bathing_conditions, loc)}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
                {item.accessibility && (
                  <Card className="bg-slate-900/50 border-white/5">
                    <CardContent className="p-4 flex items-start gap-3">
                      <Accessibility className="h-5 w-5 text-purple-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-white">{t('accessibility')}</p>
                        <p className="text-sm text-gray-400">{getLocalizedText(item.accessibility, loc)}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
                {item.typical_risk && (
                  <Card className="bg-slate-900/50 border-white/5">
                    <CardContent className="p-4 flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-white">{t('riskLevel')}</p>
                        <p className="text-sm text-gray-400">{getLocalizedText(item.typical_risk, loc)}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Highlights */}
            {item.highlights && (item.highlights as unknown[]).length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-white mb-3">{t('highlights')}</h2>
                <ul className="space-y-2">
                  {(item.highlights as Record<string, string>[]).map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-300">
                      <Check className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                      {getLocalizedText(h, loc)}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Reviews */}
            {reviews && reviews.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">
                  {t('reviews')} ({item.review_count})
                </h2>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <Card key={review.id} className="bg-slate-900/50 border-white/5">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-white">{review.author_name}</span>
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3.5 w-3.5 ${
                                  i < review.rating
                                    ? 'text-amber-400 fill-amber-400'
                                    : 'text-gray-600'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-400">
                          {getLocalizedText(review.comment, loc)}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="bg-slate-900/80 border-white/10">
                <CardContent className="p-6 space-y-4">
                  {item.price_from != null && (
                    <div>
                      <span className="text-sm text-gray-400">{t('from')}</span>
                      <span className="ml-2 text-3xl font-bold text-white">
                        {formatPrice(item.price_from, item.currency)}
                      </span>
                      <span className="text-sm text-gray-400 ml-1">{t('perPerson')}</span>
                    </div>
                  )}

                  {item.bookable && item.booking_url && (
                    <a href={item.booking_url} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg py-6">
                        {t('bookNow')}
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Button>
                    </a>
                  )}

                  {item.includes && (item.includes as unknown[]).length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-white mb-2">{t('includes')}</h3>
                      <ul className="space-y-1.5">
                        {(item.includes as Record<string, string>[]).map((inc, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                            <Check className="h-3.5 w-3.5 text-green-400 shrink-0" />
                            {getLocalizedText(inc, loc)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1 border-white/10 text-gray-400">
                      <Heart className="h-4 w-4 mr-1" /> {t('save')}
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 border-white/10 text-gray-400">
                      <Share2 className="h-4 w-4 mr-1" /> {t('share')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
