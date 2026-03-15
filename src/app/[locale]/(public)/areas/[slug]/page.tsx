import { getTranslations } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import { Link } from '@/i18n/routing'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Star, ArrowLeft, Calendar, Store } from 'lucide-react'
import { Breadcrumbs } from '@/components/shared/breadcrumbs'
import { t as getLocalizedText, formatPrice } from '@/lib/helpers'
import type { Locale } from '@/types/database'
import { notFound } from 'next/navigation'

const REGION_LABELS: Record<string, Record<string, string>> = {
  north: { es: 'Norte', en: 'North', de: 'Norden' },
  south: { es: 'Sur', en: 'South', de: 'Süden' },
  east: { es: 'Este', en: 'East', de: 'Osten' },
  west: { es: 'Oeste', en: 'West', de: 'Westen' },
  central: { es: 'Centro', en: 'Central', de: 'Zentral' },
}

const REGION_COLORS: Record<string, string> = {
  north: 'border-blue-400/30 text-blue-400',
  south: 'border-orange-400/30 text-orange-400',
  east: 'border-emerald-400/30 text-emerald-400',
  west: 'border-purple-400/30 text-purple-400',
  central: 'border-amber-400/30 text-amber-400',
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const supabase = await createClient()

  const { data: area } = await supabase
    .from('areas')
    .select('name, description')
    .eq('slug', slug)
    .single()

  if (!area) return { title: 'Area' }

  return {
    title: getLocalizedText(area.name, locale as Locale),
    description: getLocalizedText(area.description, locale as Locale),
  }
}

export default async function AreaDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const supabase = await createClient()
  const t = await getTranslations({ locale, namespace: 'areas' })
  const tc = await getTranslations({ locale, namespace: 'common' })
  const loc = locale as Locale

  // Fetch area
  const { data: area } = await supabase
    .from('areas')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!area) notFound()

  // Fetch items in this area
  const { data: items } = await supabase
    .from('items')
    .select('id, slug, name, short_description, image, rating, review_count, price_from, currency, featured, subcategory:subcategories(slug, category:categories(slug))')
    .eq('area', slug)
    .eq('visible', true)
    .order('featured', { ascending: false })
    .order('rating', { ascending: false })
    .limit(24)

  // Fetch partners in this area
  const { data: partners } = await supabase
    .from('partners')
    .select('id, slug, name, description, image, type, featured')
    .eq('area', slug)
    .eq('visible', true)
    .order('featured', { ascending: false })
    .limit(12)

  // Fetch events - match by municipality containing the area name
  // Areas may map to municipalities, so we search for events whose municipality matches
  const areaName = getLocalizedText(area.name, 'en' as Locale)
  const { data: events } = await supabase
    .from('events')
    .select('id, slug, name, event_type, municipality, month, start_date, image')
    .eq('visible', true)
    .ilike('municipality', `%${areaName}%`)
    .order('month')
    .limit(12)

  const sectionLabels: Record<string, Record<string, string>> = {
    thingsToDo: { es: 'Qué hacer', en: 'Things to Do', de: 'Aktivitäten' },
    partners: { es: 'Negocios locales', en: 'Local Businesses', de: 'Lokale Unternehmen' },
    events: { es: 'Eventos y fiestas', en: 'Events & Festivals', de: 'Veranstaltungen & Feste' },
    backToAreas: { es: 'Todas las Zonas', en: 'All Areas', de: 'Alle Gebiete' },
  }

  return (
    <div className="pb-20">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 mb-8">
        <Breadcrumbs
          items={[
            { label: sectionLabels.backToAreas[locale] || sectionLabels.backToAreas.en, href: '/areas' },
            { label: getLocalizedText(area.name, loc) },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="relative">
        {area.image && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8">
            <div className="aspect-[21/9] rounded-2xl overflow-hidden">
              <img
                src={area.image}
                alt={getLocalizedText(area.name, loc)}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge variant="outline" className={`mb-4 ${REGION_COLORS[area.region] || ''}`}>
            <MapPin className="h-3 w-3 mr-1" />
            {REGION_LABELS[area.region]?.[locale] || area.region}
          </Badge>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            {getLocalizedText(area.name, loc)}
          </h1>

          <p className="mt-4 text-lg text-gray-400 leading-relaxed max-w-3xl">
            {getLocalizedText(area.description, loc)}
          </p>
        </div>
      </section>

      {/* Things to Do */}
      {items && items.length > 0 && (
        <section className="mt-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
              <Star className="h-6 w-6 text-orange-400" />
              {sectionLabels.thingsToDo[locale] || sectionLabels.thingsToDo.en}
              <Badge variant="outline" className="border-white/10 text-gray-500 text-xs ml-2">
                {items.length}
              </Badge>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => {
                const sub = item.subcategory as unknown as { slug: string; category: { slug: string } } | null
                const href = sub
                  ? `/${sub.category.slug}/${sub.slug}/${item.slug}`
                  : '#'
                return (
                  <Link key={item.id} href={href}>
                    <Card className="group bg-slate-900/50 border-white/5 hover:border-orange-400/20 transition-all duration-300 overflow-hidden h-full cursor-pointer">
                      {item.image && (
                        <div className="aspect-[16/9] overflow-hidden">
                          <img
                            src={item.image}
                            alt={getLocalizedText(item.name, loc)}
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
                        </div>
                        <h3 className="text-base font-semibold text-white group-hover:text-orange-400 transition-colors line-clamp-2">
                          {getLocalizedText(item.name, loc)}
                        </h3>
                        <p className="mt-2 text-sm text-gray-400 line-clamp-2">
                          {getLocalizedText(item.short_description, loc)}
                        </p>
                        <div className="mt-3 flex items-center justify-between">
                          {item.rating > 0 && (
                            <span className="flex items-center gap-1 text-sm text-amber-400">
                              <Star className="h-3.5 w-3.5 fill-amber-400" />
                              {item.rating}
                              <span className="text-gray-500 text-xs">({item.review_count})</span>
                            </span>
                          )}
                          {item.price_from != null && (
                            <span className="text-sm text-gray-400">
                              {locale === 'es' ? 'Desde' : 'From'} {formatPrice(item.price_from, item.currency)}
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Partners */}
      {partners && partners.length > 0 && (
        <section className="mt-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
              <Store className="h-6 w-6 text-green-400" />
              {sectionLabels.partners[locale] || sectionLabels.partners.en}
              <Badge variant="outline" className="border-white/10 text-gray-500 text-xs ml-2">
                {partners.length}
              </Badge>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {partners.map((partner) => (
                <Card key={partner.id} className="group bg-slate-900/50 border-white/5 hover:border-green-400/20 transition-all duration-300 overflow-hidden h-full">
                  {partner.image && (
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={partner.image}
                        alt={partner.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="border-green-400/30 text-green-400 text-xs">
                        {partner.type}
                      </Badge>
                      {partner.featured && (
                        <Badge className="bg-amber-500/20 text-amber-400 border-0 text-xs">
                          {tc('featured')}
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-base font-semibold text-white group-hover:text-green-400 transition-colors">
                      {partner.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-400 line-clamp-2">
                      {getLocalizedText(partner.description, loc)}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Events */}
      {events && events.length > 0 && (
        <section className="mt-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
              <Calendar className="h-6 w-6 text-purple-400" />
              {sectionLabels.events[locale] || sectionLabels.events.en}
              <Badge variant="outline" className="border-white/10 text-gray-500 text-xs ml-2">
                {events.length}
              </Badge>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <Link key={event.id} href={`/events/${event.slug}`}>
                  <Card className="group bg-slate-900/50 border-white/5 hover:border-purple-400/20 transition-all duration-300 overflow-hidden h-full cursor-pointer">
                    {event.image && (
                      <div className="aspect-[16/9] overflow-hidden">
                        <img
                          src={event.image}
                          alt={getLocalizedText(event.name, loc)}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="border-purple-400/30 text-purple-400 text-xs">
                          {event.event_type}
                        </Badge>
                      </div>
                      <h3 className="text-base font-semibold text-white group-hover:text-purple-400 transition-colors line-clamp-2">
                        {getLocalizedText(event.name, loc)}
                      </h3>
                      <div className="mt-2 flex items-center gap-1 text-sm text-gray-400">
                        <MapPin className="h-3.5 w-3.5 text-purple-400" />
                        {event.municipality}
                      </div>
                      {event.start_date && (
                        <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                          <Calendar className="h-3 w-3" />
                          {event.start_date}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty state if nothing found */}
      {(!items || items.length === 0) && (!partners || partners.length === 0) && (!events || events.length === 0) && (
        <section className="mt-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center py-12">
            <p className="text-gray-500 text-lg">{tc('noResults')}</p>
          </div>
        </section>
      )}
    </div>
  )
}
