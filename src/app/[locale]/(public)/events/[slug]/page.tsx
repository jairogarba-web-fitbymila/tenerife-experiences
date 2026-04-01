import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { Link } from '@/i18n/routing'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Check, Info, Star } from 'lucide-react'
import { Breadcrumbs } from '@/components/shared/breadcrumbs'
import { t as getLocalizedText } from '@/lib/helpers'
import type { Locale } from '@/types/database'
import { notFound } from 'next/navigation'

import { buildAlternates } from '@/lib/metadata'
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const supabase = await createClient()

  const { data: event } = await supabase
    .from('events')
    .select('name, meta_title, meta_description, description')
    .eq('slug', slug)
    .single()

  if (!event) return { title: 'Event' }

  return {
    title: getLocalizedText(event.meta_title || event.name, locale as Locale),
    description: getLocalizedText(event.meta_description || event.description, locale as Locale),
    alternates: buildAlternates(locale, `/events/${slug}`),
  }
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const supabase = await createClient()
  const loc = locale as Locale

  const { data: event } = await supabase
    .from('events')
    .select('*')
    .eq('slug', slug)
    .eq('visible', true)
    .single()

  if (!event) notFound()

  // Get other events in the same municipality
  const { data: relatedEvents } = await supabase
    .from('events')
    .select('id, slug, name, event_type, month')
    .eq('municipality_slug', event.municipality_slug)
    .neq('id', event.id)
    .eq('visible', true)
    .limit(5)

  const highlights = (event.highlights || []) as Record<string, string>[]
  const traditions = (event.traditions || []) as Record<string, string>[]
  const practicalInfo = (event.practical_info || {}) as Record<string, string>

  return (
    <div className="pb-20">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-8 mb-8">
        <Breadcrumbs
          items={[
            { label: locale === 'es' ? 'Cultura y Ocio' : locale === 'de' ? 'Kultur & Freizeit' : 'Culture & Leisure', href: '/events' },
            { label: getLocalizedText(event.name, loc) },
          ]}
        />
      </div>

      {/* Header */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Badge variant="outline" className="border-purple-400/30 text-purple-400 mb-4">
          <MapPin className="h-3 w-3 mr-1" />
          {event.municipality}
        </Badge>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
          {getLocalizedText(event.name, loc)}
        </h1>

        {event.start_date && (
          <div className="mt-4 flex items-center gap-2 text-lg text-purple-400">
            <Calendar className="h-5 w-5" />
            {event.start_date}{event.end_date ? ` — ${event.end_date}` : ''}
          </div>
        )}
      </div>

      {/* Image */}
      {event.image && (
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-8">
          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden">
            <Image
              src={event.image}
              alt={getLocalizedText(event.name, loc)}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 80vw"
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-12 space-y-10">
        {/* Description */}
        <div>
          <p className="text-lg text-gray-300 leading-relaxed whitespace-pre-line">
            {getLocalizedText(event.description, loc)}
          </p>
        </div>

        {/* Highlights */}
        {highlights.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Star className="h-5 w-5 text-purple-400" />
              {locale === 'es' ? 'Destacados' : locale === 'de' ? 'Highlights' : 'Highlights'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2 text-gray-300 bg-slate-900/50 rounded-xl p-4 border border-white/5">
                  <Check className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
                  {getLocalizedText(h, loc)}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Traditions */}
        {traditions.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">
              {locale === 'es' ? 'Tradiciones' : locale === 'de' ? 'Traditionen' : 'Traditions'}
            </h2>
            <ul className="space-y-3">
              {traditions.map((t, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-300">
                  <span className="text-purple-400 font-bold shrink-0">{i + 1}.</span>
                  {getLocalizedText(t, loc)}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Practical Info */}
        {Object.keys(practicalInfo).length > 0 && (
          <Card className="bg-purple-500/5 border-purple-500/20">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <Info className="h-5 w-5 text-purple-400" />
                {locale === 'es' ? 'Información Práctica' : locale === 'de' ? 'Praktische Informationen' : 'Practical Information'}
              </h2>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                {getLocalizedText(practicalInfo, loc)}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Related Events */}
        {relatedEvents && relatedEvents.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">
              {locale === 'es' ? `Más eventos en ${event.municipality}` : `More events in ${event.municipality}`}
            </h2>
            <div className="flex flex-wrap gap-3">
              {relatedEvents.map((re) => (
                <Link key={re.id} href={`/events/${re.slug}`}>
                  <Badge
                    variant="outline"
                    className="border-white/10 text-gray-300 hover:border-purple-400/30 hover:text-purple-400 transition-colors cursor-pointer px-4 py-2"
                  >
                    {getLocalizedText(re.name, loc)}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Event',
              name: getLocalizedText(event.name, loc),
              description: getLocalizedText(event.description, loc),
              image: event.image,
              location: {
                '@type': 'Place',
                name: event.municipality,
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: event.municipality,
                  addressRegion: 'Tenerife',
                  addressCountry: 'ES',
                },
              },
              organizer: {
                '@type': 'Organization',
                name: `Ayuntamiento de ${event.municipality}`,
              },
            }),
          }}
        />
      </div>
    </div>
  )
}
