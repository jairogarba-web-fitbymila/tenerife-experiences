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
  ArrowRight,
} from 'lucide-react'
import { Breadcrumbs } from '@/components/shared/breadcrumbs'
import { ScrollEffects } from '@/components/cinematic/scroll-effects'
import { t as getLocalizedText, formatPrice } from '@/lib/helpers'
import type { Locale } from '@/types/database'
import { notFound } from 'next/navigation'
import { ReviewSection } from '@/components/review/review-panel'

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

  // Split description into chunks for immersive photo sections
  const descriptionText = getLocalizedText(item.description, loc)
  const descriptionChunks = descriptionText
    .split(/(?<=[.!?])\s+/)
    .reduce((chunks, sentence, i) => {
      if (i % 3 === 0) chunks.push([])
      chunks[chunks.length - 1].push(sentence)
      return chunks
    }, [] as string[][])
    .map((chunk) => chunk.join(' '))

  return (
    <div className="bg-slate-950 text-white overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ScrollEffects />

      {/* Full-Screen Hero with Ken Burns Animation */}
      <ReviewSection page="detail" sectionId={`hero-${itemSlug}`} sectionLabel={`Hero: ${getLocalizedText(item.name, loc)}`}>
      <div className="relative h-screen w-full overflow-hidden">
        {item.image && (
          <>
            <img
              src={item.image}
              alt={getLocalizedText(item.name, loc)}
              className="absolute inset-0 w-full h-full object-cover animate-ken-burns"
            />
            {/* Gradient overlay - darker at bottom */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80" />
          </>
        )}

        {/* Info Panel Over Hero Bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
            {/* Breadcrumbs */}
            <div className="mb-8">
              <Breadcrumbs
                items={[
                  { label: cat ? getLocalizedText(cat.name, loc) : category, href: `/${category}` },
                  { label: sub ? getLocalizedText(sub.name, loc) : subcategory, href: `/${category}/${subcategory}` },
                  { label: getLocalizedText(item.name, loc) },
                ]}
              />
            </div>

            {/* Title in huge type */}
            <div className="space-y-6">
              <div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4">
                  {getLocalizedText(item.name, loc)}
                </h1>
              </div>

              {/* Rating, location, highlights */}
              <div className="flex flex-col gap-4 max-w-2xl">
                {/* Rating */}
                {item.rating > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.round(item.rating)
                              ? 'text-orange-400 fill-orange-400'
                              : 'text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-lg text-gray-200">
                      {item.rating} · {item.review_count} {t('reviews')}
                    </span>
                  </div>
                )}

                {/* Location & Duration */}
                <div className="flex flex-col sm:flex-row gap-4 text-gray-200">
                  {item.location && Object.keys(item.location).length > 0 && (
                    <span className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-orange-400 shrink-0" />
                      {getLocalizedText(item.location, loc)}
                    </span>
                  )}
                  {item.duration && (
                    <span className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-orange-400 shrink-0" />
                      {item.duration}
                    </span>
                  )}
                </div>

                {/* Key highlights */}
                {item.highlights && (item.highlights as unknown[]).length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {(item.highlights as Record<string, string>[])
                      .slice(0, 3)
                      .map((h, i) => (
                        <Badge
                          key={i}
                          className="bg-orange-500/20 text-orange-300 border-orange-400/30 border"
                        >
                          {getLocalizedText(h, loc)}
                        </Badge>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      </ReviewSection>

      {/* Immersive Description Sections with Photo Backgrounds */}
      <ReviewSection page="detail" sectionId={`description-${itemSlug}`} sectionLabel={`Descripción: ${getLocalizedText(item.name, loc)}`}>
      <div className="relative">
        {descriptionChunks.map((chunk, index) => (
          <div
            key={index}
            className="reveal min-h-[80vh] flex items-center relative overflow-hidden"
          >
            {/* Alternating side photos */}
            {index % 2 === 0 && item.image && (
              <div className="absolute inset-0 opacity-15">
                <img
                  src={item.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
              <div className={`max-w-2xl ${index % 2 === 1 ? 'ml-auto' : ''}`}>
                <p className="text-xl md:text-2xl leading-relaxed text-gray-100 font-light">
                  {chunk}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      </ReviewSection>

      {/* Practical Info Section - Grid of Cards */}
      <ReviewSection page="detail" sectionId={`info-${itemSlug}`} sectionLabel={`Info práctica: ${getLocalizedText(item.name, loc)}`}>
      <div className="reveal bg-gradient-to-b from-slate-950 to-slate-900 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-16">
            {t('essentialInfo')}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Sand Type */}
            {item.sand_type && (
              <Card className="bg-slate-900/60 border-orange-400/20 hover:border-orange-400/40 transition-colors">
                <CardContent className="p-6 space-y-3">
                  <div className="inline-block p-3 bg-blue-500/20 rounded-lg">
                    <Waves className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-white">{t('sandType')}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {getLocalizedText(item.sand_type, loc)}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Bathing Conditions */}
            {item.bathing_conditions && (
              <Card className="bg-slate-900/60 border-orange-400/20 hover:border-orange-400/40 transition-colors">
                <CardContent className="p-6 space-y-3">
                  <div className="inline-block p-3 bg-green-500/20 rounded-lg">
                    <Shield className="h-6 w-6 text-green-400" />
                  </div>
                  <h3 className="font-semibold text-white">{t('bathingConditions')}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {getLocalizedText(item.bathing_conditions, loc)}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Accessibility */}
            {item.accessibility && (
              <Card className="bg-slate-900/60 border-orange-400/20 hover:border-orange-400/40 transition-colors">
                <CardContent className="p-6 space-y-3">
                  <div className="inline-block p-3 bg-purple-500/20 rounded-lg">
                    <Accessibility className="h-6 w-6 text-purple-400" />
                  </div>
                  <h3 className="font-semibold text-white">{t('accessibility')}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {getLocalizedText(item.accessibility, loc)}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Risk Level */}
            {item.typical_risk && (
              <Card className="bg-slate-900/60 border-orange-400/20 hover:border-orange-400/40 transition-colors">
                <CardContent className="p-6 space-y-3">
                  <div className="inline-block p-3 bg-amber-500/20 rounded-lg">
                    <AlertTriangle className="h-6 w-6 text-amber-400" />
                  </div>
                  <h3 className="font-semibold text-white">{t('riskLevel')}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {getLocalizedText(item.typical_risk, loc)}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Price */}
            {item.price_from != null && (
              <Card className="bg-slate-900/60 border-orange-400/20 hover:border-orange-400/40 transition-colors">
                <CardContent className="p-6 space-y-3">
                  <div className="inline-block p-3 bg-orange-500/20 rounded-lg">
                    <ArrowRight className="h-6 w-6 text-orange-400" />
                  </div>
                  <h3 className="font-semibold text-white">{t('startingPrice')}</h3>
                  <p className="text-orange-400 text-2xl font-bold">
                    {formatPrice(item.price_from, item.currency)}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
      </ReviewSection>

      {/* Reviews Section */}
      {reviews && reviews.length > 0 && (
        <ReviewSection page="detail" sectionId={`reviews-${itemSlug}`} sectionLabel={`Reviews: ${getLocalizedText(item.name, loc)}`}>
        <div className="reveal py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">
              {t('reviews')} ({item.review_count})
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((review) => (
                <Card
                  key={review.id}
                  className="bg-slate-900/40 border-orange-400/10 hover:border-orange-400/30 transition-colors"
                >
                  <CardContent className="p-8 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-white text-lg">
                        {review.author_name}
                      </h3>
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? 'text-orange-400 fill-orange-400'
                                : 'text-gray-700'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      "{getLocalizedText(review.comment, loc)}"
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
        </ReviewSection>
      )}

      {/* Advertise Here + Civitatis Section */}
      <div className="reveal py-16 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* CTA for businesses */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500/15 to-amber-500/10 border border-orange-500/20 p-8">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-[60px]" />
              <div className="relative">
                <h3 className="text-2xl font-bold text-white mb-3">
                  {locale === 'es' ? '¿Tienes un negocio en Tenerife?' : locale === 'de' ? 'Haben Sie ein Unternehmen auf Teneriffa?' : 'Have a business in Tenerife?'}
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {locale === 'es'
                    ? 'Aparece en nuestra guía y llega a miles de turistas que buscan experiencias únicas en la isla.'
                    : locale === 'de'
                      ? 'Erscheinen Sie in unserem Reiseführer und erreichen Sie Tausende von Touristen.'
                      : 'Get featured in our guide and reach thousands of tourists looking for unique experiences.'}
                </p>
                <a
                  href={`/${locale}/partners`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-400 text-white font-semibold transition-colors"
                >
                  {locale === 'es' ? 'Anúnciate aquí' : locale === 'de' ? 'Hier werben' : 'Advertise here'}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Civitatis affiliate */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 p-8">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[60px]" />
              <div className="relative">
                <h3 className="text-2xl font-bold text-white mb-3">
                  {locale === 'es' ? 'Reserva experiencias verificadas' : locale === 'de' ? 'Verifizierte Erlebnisse buchen' : 'Book verified experiences'}
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {locale === 'es'
                    ? 'Encuentra y reserva actividades, tours y excursiones con cancelación gratuita a través de Civitatis.'
                    : locale === 'de'
                      ? 'Finden und buchen Sie Aktivitäten, Touren und Ausflüge mit kostenloser Stornierung.'
                      : 'Find and book activities, tours and excursions with free cancellation through Civitatis.'}
                </p>
                <a
                  href={`https://www.civitatis.com/${locale === 'es' ? 'es' : locale === 'de' ? 'de' : locale === 'fr' ? 'fr' : locale === 'it' ? 'it' : locale === 'ru' ? 'ru' : 'en'}/tenerife/${process.env.NEXT_PUBLIC_CIVITATIS_AID ? `?aid=${process.env.NEXT_PUBLIC_CIVITATIS_AID}` : ''}`}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors"
                >
                  {locale === 'es' ? 'Ver excursiones en Civitatis' : locale === 'de' ? 'Ausflüge auf Civitatis ansehen' : 'Browse Civitatis tours'}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Mobile CTA */}
      {item.bookable && item.booking_url && (
        <div className="fixed bottom-0 left-0 right-0 md:hidden bg-slate-950 border-t border-orange-400/20 p-4 z-40">
          <a href={item.booking_url} target="_blank" rel="noopener noreferrer">
            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg py-6 font-semibold">
              {t('bookNow')}
              <ExternalLink className="h-5 w-5 ml-2" />
            </Button>
          </a>
        </div>
      )}

      {/* Desktop Sidebar Booking Card */}
      <div className="hidden md:block fixed bottom-8 right-8 z-30 max-w-sm">
        <Card className="bg-slate-900/95 border-orange-400/20 backdrop-blur-sm">
          <CardContent className="p-6 space-y-4">
            {item.price_from != null && (
              <div>
                <p className="text-sm text-gray-400">{t('from')}</p>
                <p className="text-3xl font-bold text-orange-400 mt-1">
                  {formatPrice(item.price_from, item.currency)}
                </p>
                <p className="text-xs text-gray-500 mt-1">{t('perPerson')}</p>
              </div>
            )}

            {item.bookable && item.booking_url && (
              <a href={item.booking_url} target="_blank" rel="noopener noreferrer">
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-5 font-semibold">
                  {t('bookNow')}
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </a>
            )}

            {item.includes && (item.includes as unknown[]).length > 0 && (
              <div className="pt-4 border-t border-white/5 space-y-2">
                <p className="text-xs font-medium text-gray-300 uppercase tracking-wide">
                  {t('includes')}
                </p>
                <ul className="space-y-1.5">
                  {(item.includes as Record<string, string>[])
                    .slice(0, 3)
                    .map((inc, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-gray-400">
                        <Check className="h-3.5 w-3.5 text-orange-400 shrink-0" />
                        {getLocalizedText(inc, loc)}
                      </li>
                    ))}
                </ul>
              </div>
            )}

            <div className="flex gap-2 pt-4 border-t border-white/5">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-white/10 text-gray-400 hover:text-orange-400 hover:border-orange-400/50"
              >
                <Heart className="h-4 w-4 mr-1" /> {t('save')}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-white/10 text-gray-400 hover:text-orange-400 hover:border-orange-400/50"
              >
                <Share2 className="h-4 w-4 mr-1" /> {t('share')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Spacer for mobile with sticky CTA */}
      {item.bookable && item.booking_url && <div className="md:hidden h-24" />}
    </div>
  )
}
