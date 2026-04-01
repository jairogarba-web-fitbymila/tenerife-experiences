import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { Link } from '@/i18n/routing'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar, MapPin, PartyPopper, Church, Music, Trophy, Sparkles, Wine } from 'lucide-react'
import { t as getLocalizedText } from '@/lib/helpers'
import type { Locale } from '@/types/database'

import { buildAlternates } from '@/lib/metadata'
const EVENT_TYPE_ICONS: Record<string, typeof Calendar> = {
  fiesta_patronal: Church,
  carnival: PartyPopper,
  cultural: Sparkles,
  religious: Church,
  gastronomic: Wine,
  music: Music,
  sports: Trophy,
  market: MapPin,
}

const EVENT_TYPE_COLORS: Record<string, string> = {
  fiesta_patronal: 'border-purple-400/30 text-purple-400',
  carnival: 'border-orange-400/30 text-orange-400',
  cultural: 'border-blue-400/30 text-blue-400',
  religious: 'border-amber-400/30 text-amber-400',
  gastronomic: 'border-red-400/30 text-red-400',
  music: 'border-pink-400/30 text-pink-400',
  sports: 'border-green-400/30 text-green-400',
  market: 'border-cyan-400/30 text-cyan-400',
}

const EVENT_TYPE_LABELS: Record<string, Record<string, string>> = {
  fiesta_patronal: { es: 'Fiesta Patronal', en: 'Patron Saint Festival', de: 'Patronatsfest' },
  carnival: { es: 'Carnaval', en: 'Carnival', de: 'Karneval' },
  cultural: { es: 'Cultural', en: 'Cultural', de: 'Kulturell' },
  religious: { es: 'Religioso', en: 'Religious', de: 'Religiös' },
  gastronomic: { es: 'Gastronómico', en: 'Gastronomic', de: 'Gastronomisch' },
  music: { es: 'Música', en: 'Music', de: 'Musik' },
  sports: { es: 'Deportivo', en: 'Sports', de: 'Sport' },
  market: { es: 'Mercado', en: 'Market', de: 'Markt' },
}

// Culture types: fiestas patronales, carnivals, religious, cultural, gastronomic
const CULTURE_TYPES = ['fiesta_patronal', 'carnival', 'religious', 'cultural', 'gastronomic']
// Leisure types: music, sports, market
const LEISURE_TYPES = ['music', 'sports', 'market']

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const titles: Record<string, string> = {
    es: 'Cultura y Ocio en Tenerife - Fiestas, Romerías, Festivales y Más',
    en: 'Culture & Leisure in Tenerife - Festivals, Traditions, Events & More',
    de: 'Kultur & Freizeit auf Teneriffa - Feste, Traditionen, Veranstaltungen',
  }
  const descriptions: Record<string, string> = {
    es: 'Todo sobre la cultura y el ocio de Tenerife: fiestas patronales, romerías, bailes de magos, carnavales, festivales de música, beach clubs y mucho más.',
    en: 'Everything about Tenerife culture and leisure: patron saint festivals, pilgrimages, traditional dances, carnivals, music festivals, beach clubs and more.',
    de: 'Alles über Teneriffas Kultur und Freizeit: Patronatsfeste, Wallfahrten, Karneval, Musikfestivals, Beach Clubs und mehr.',
  }
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    alternates: buildAlternates(locale, '/events'),
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function EventCard({ event, locale }: { event: any; locale: Locale }) {
  const Icon = EVENT_TYPE_ICONS[event.event_type] || Calendar
  return (
    <Link href={`/events/${event.slug}`}>
      <Card className="group bg-slate-900/50 border-white/5 hover:border-purple-400/20 transition-all duration-300 h-full cursor-pointer overflow-hidden">
        {event.image ? (
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={event.image}
              alt={getLocalizedText(event.name, locale)}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : null}
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="outline" className={`text-xs ${EVENT_TYPE_COLORS[event.event_type] || ''}`}>
              <Icon className="h-3 w-3 mr-1" />
              {EVENT_TYPE_LABELS[event.event_type]?.[locale] || event.event_type}
            </Badge>
            {event.featured ? (
              <Badge className="bg-amber-500/20 text-amber-400 border-0 text-xs">
                {locale === 'es' ? 'Destacado' : 'Featured'}
              </Badge>
            ) : null}
          </div>
          <h3 className="text-base font-semibold text-white group-hover:text-purple-400 transition-colors">
            {getLocalizedText(event.name, locale)}
          </h3>
          <div className="mt-2 flex items-center gap-1 text-sm text-gray-400">
            <MapPin className="h-3.5 w-3.5 text-purple-400" />
            {String(event.municipality)}
          </div>
          <p className="mt-2 text-sm text-gray-500 line-clamp-2">
            {getLocalizedText(event.description, locale)}
          </p>
          {event.start_date ? (
            <div className="mt-3 flex items-center gap-1 text-xs text-gray-500">
              <Calendar className="h-3 w-3" />
              {String(event.start_date)}
            </div>
          ) : null}
        </CardContent>
      </Card>
    </Link>
  )
}

export default async function EventsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const supabase = await createClient()
  const loc = locale as Locale

  const { data: allEvents } = await supabase
    .from('events')
    .select('*')
    .eq('visible', true)
    .order('featured', { ascending: false })
    .order('month')

  // Split into culture and leisure
  const cultureEvents = allEvents?.filter(e => CULTURE_TYPES.includes(e.event_type)) || []
  const leisureEvents = allEvents?.filter(e => LEISURE_TYPES.includes(e.event_type)) || []

  // Get nightlife items grouped by subcategory type
  const { data: nightlifeCat } = await supabase.from('categories').select('id').eq('slug', 'nightlife').single()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let clubs: any[] = []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let beachClubs: any[] = []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let festivals: any[] = []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let bars: any[] = []
  if (nightlifeCat) {
    const { data: subs } = await supabase.from('subcategories').select('id, slug, name').eq('category_id', nightlifeCat.id).eq('visible', true)
    if (subs) {
      const subMap: Record<string, string> = {}
      subs.forEach(s => { subMap[s.slug] = s.id })

      // Clubs (clubs + best-areas)
      const clubSubIds = ['clubs', 'best-areas'].map(s => subMap[s]).filter(Boolean)
      if (clubSubIds.length) {
        const { data } = await supabase.from('items').select('*, subcategory:subcategories(slug, name)').in('subcategory_id', clubSubIds).eq('visible', true).order('rating', { ascending: false })
        clubs = data || []
      }

      // Beach Clubs
      if (subMap['beach-clubs']) {
        const { data } = await supabase.from('items').select('*, subcategory:subcategories(slug, name)').eq('subcategory_id', subMap['beach-clubs']).eq('visible', true).order('rating', { ascending: false })
        beachClubs = data || []
      }

      // Festivals
      if (subMap['festivals']) {
        const { data } = await supabase.from('items').select('*, subcategory:subcategories(slug, name)').eq('subcategory_id', subMap['festivals']).eq('visible', true).order('rating', { ascending: false })
        festivals = data || []
      }

      // Bars (bars-pubs + cocktail-bars + live-music)
      const barSubIds = ['bars-pubs', 'cocktail-bars', 'live-music'].map(s => subMap[s]).filter(Boolean)
      if (barSubIds.length) {
        const { data } = await supabase.from('items').select('*, subcategory:subcategories(slug, name)').in('subcategory_id', barSubIds).eq('visible', true).order('rating', { ascending: false })
        bars = data || []
      }
    }
  }

  // Also get music events from events table
  const musicEvents = allEvents?.filter(e => e.event_type === 'music') || []

  const pageTitle: Record<string, string> = {
    es: 'Cultura y Ocio en Tenerife',
    en: 'Culture & Leisure in Tenerife',
    de: 'Kultur & Freizeit auf Teneriffa',
  }
  const pageSubtitle: Record<string, string> = {
    es: 'Fiestas patronales, romerías, bailes de magos, carnavales, festivales de música, beach clubs y todo lo que necesitas para vivir Tenerife',
    en: 'Patron saint festivals, pilgrimages, traditional dances, carnivals, music festivals, beach clubs and everything you need to experience Tenerife',
    de: 'Patronatsfeste, Wallfahrten, traditionelle Tänze, Karneval, Musikfestivals, Beach Clubs und alles für Ihr Teneriffa-Erlebnis',
  }
  const cultureTitle: Record<string, string> = { es: 'Cultura y Tradiciones', en: 'Culture & Traditions', de: 'Kultur & Traditionen' }
  const cultureSubtitle: Record<string, string> = { es: 'Fiestas patronales, romerías, carnavales, bailes de magos y tradiciones de los 31 municipios', en: 'Patron saint festivals, pilgrimages, carnivals, traditional dances across all 31 municipalities', de: 'Patronatsfeste, Wallfahrten, Karneval und traditionelle Tänze in allen 31 Gemeinden' }
  const leisureTitle: Record<string, string> = { es: 'Ocio y Vida Nocturna', en: 'Leisure & Nightlife', de: 'Freizeit & Nachtleben' }
  const leisureSubtitle: Record<string, string> = { es: 'Discotecas, beach clubs, festivales de música, bares y la mejor vida nocturna de la isla', en: 'Clubs, beach clubs, music festivals, bars and the best nightlife on the island', de: 'Clubs, Beach Clubs, Musikfestivals, Bars und das beste Nachtleben der Insel' }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-white">
              {pageTitle[locale] || pageTitle.en}
            </h1>
            <p className="mt-4 text-lg text-gray-400 leading-relaxed">
              {pageSubtitle[locale] || pageSubtitle.en}
            </p>
          </div>
        </div>
      </section>

      {/* Tabs: Cultura / Ocio */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="culture" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-10 bg-slate-900/50 border border-white/5">
              <TabsTrigger value="culture" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
                <Church className="h-4 w-4 mr-2" />
                {cultureTitle[locale] || cultureTitle.en}
              </TabsTrigger>
              <TabsTrigger value="leisure" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
                <Music className="h-4 w-4 mr-2" />
                {leisureTitle[locale] || leisureTitle.en}
              </TabsTrigger>
            </TabsList>

            {/* CULTURE TAB */}
            <TabsContent value="culture">
              <p className="text-gray-400 mb-8">{cultureSubtitle[locale] || cultureSubtitle.en}</p>

              {/* Featured culture events */}
              {cultureEvents.filter(e => e.featured).length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">
                    {locale === 'es' ? 'Eventos Destacados' : 'Featured Events'}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cultureEvents.filter(e => e.featured).map((event) => (
                      <EventCard key={event.id} event={event} locale={loc} />
                    ))}
                  </div>
                </div>
              )}

              {/* All culture events by month */}
              <h2 className="text-2xl font-bold text-white mb-6">
                {locale === 'es' ? 'Calendario Cultural' : 'Cultural Calendar'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cultureEvents.map((event) => (
                  <EventCard key={event.id} event={event} locale={loc} />
                ))}
              </div>

              {cultureEvents.length === 0 && (
                <p className="text-gray-500 text-center py-12">
                  {locale === 'es' ? 'Cargando eventos culturales...' : 'Loading cultural events...'}
                </p>
              )}
            </TabsContent>

            {/* LEISURE TAB */}
            <TabsContent value="leisure" className="space-y-16">

              {/* ======= SECTION 1: BEACH CLUBS ======= */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20">
                    <Sparkles className="h-5 w-5 text-cyan-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    {locale === 'es' ? 'Beach Clubs' : locale === 'de' ? 'Beach Clubs' : 'Beach Clubs'}
                  </h2>
                </div>
                <p className="text-gray-400 mb-6 ml-12">
                  {locale === 'es' ? 'Los mejores beach clubs de Tenerife con piscina, cócteles, DJs y las mejores vistas al mar' : 'The best beach clubs in Tenerife with pools, cocktails, DJs and the best sea views'}
                </p>
                {beachClubs.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {beachClubs.map((item: any) => (
                      <Link key={item.id} href={`/nightlife/beach-clubs/${item.slug}`}>
                        <Card className="group bg-slate-900/50 border-white/5 hover:border-cyan-400/20 transition-all duration-300 h-full cursor-pointer overflow-hidden">
                          {item.image ? (
                            <div className="relative aspect-[16/9] overflow-hidden">
                              <Image src={item.image} alt={getLocalizedText(item.name, loc)} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                            </div>
                          ) : null}
                          <CardContent className="p-5">
                            <Badge className="bg-cyan-500/20 text-cyan-400 border-0 text-xs mb-2">Beach Club</Badge>
                            <h3 className="text-base font-semibold text-white group-hover:text-cyan-400 transition-colors">{getLocalizedText(item.name, loc)}</h3>
                            <p className="mt-2 text-sm text-gray-500 line-clamp-2">{getLocalizedText(item.description, loc)}</p>
                            <div className="mt-3 flex items-center justify-between">
                              {item.location ? (<span className="flex items-center gap-1 text-xs text-gray-500"><MapPin className="h-3 w-3" />{getLocalizedText(item.location, loc)}</span>) : null}
                              {item.price_from ? (<span className="text-sm font-semibold text-white">{locale === 'es' ? 'Desde' : 'From'} {item.price_from}€</span>) : null}
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">{locale === 'es' ? 'Próximamente...' : 'Coming soon...'}</p>
                )}
              </div>

              {/* ======= SECTION 2: CLUBS & DISCOS BY ZONE ======= */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20">
                    <Music className="h-5 w-5 text-violet-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    {locale === 'es' ? 'Discotecas y Clubs' : locale === 'de' ? 'Clubs & Discos' : 'Clubs & Discos'}
                  </h2>
                </div>
                <p className="text-gray-400 mb-6 ml-12">
                  {locale === 'es' ? 'Las mejores discotecas y clubs nocturnos de la isla, organizados por zona' : 'The best nightclubs and discos on the island, organized by area'}
                </p>
                {clubs.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {clubs.map((item: any) => (
                      <Link key={item.id} href={`/nightlife/${item.subcategory?.slug || 'clubs'}/${item.slug}`}>
                        <Card className="group bg-slate-900/50 border-white/5 hover:border-violet-400/20 transition-all duration-300 h-full cursor-pointer overflow-hidden">
                          {item.image ? (
                            <div className="relative aspect-[16/9] overflow-hidden">
                              <Image src={item.image} alt={getLocalizedText(item.name, loc)} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                            </div>
                          ) : null}
                          <CardContent className="p-5">
                            <Badge className="bg-violet-500/20 text-violet-400 border-0 text-xs mb-2">
                              {item.subcategory ? getLocalizedText(item.subcategory.name, loc) : 'Club'}
                            </Badge>
                            <h3 className="text-base font-semibold text-white group-hover:text-violet-400 transition-colors">{getLocalizedText(item.name, loc)}</h3>
                            <p className="mt-2 text-sm text-gray-500 line-clamp-2">{getLocalizedText(item.description, loc)}</p>
                            {item.location ? (<div className="mt-3 flex items-center gap-1 text-xs text-gray-500"><MapPin className="h-3 w-3 text-violet-400" />{getLocalizedText(item.location, loc)}</div>) : null}
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                ) : null}

                {/* Bars & Live Music */}
                {bars.length > 0 ? (
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-white mb-4 ml-12">
                      {locale === 'es' ? 'Bares, Cócteles y Música en Vivo' : 'Bars, Cocktails & Live Music'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {bars.map((item: any) => (
                        <Link key={item.id} href={`/nightlife/${item.subcategory?.slug || 'bars-pubs'}/${item.slug}`}>
                          <Card className="group bg-slate-900/50 border-white/5 hover:border-amber-400/20 transition-all duration-300 h-full cursor-pointer overflow-hidden">
                            {item.image ? (
                              <div className="relative aspect-[16/9] overflow-hidden">
                                <Image src={item.image} alt={getLocalizedText(item.name, loc)} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                              </div>
                            ) : null}
                            <CardContent className="p-5">
                              <Badge className="bg-amber-500/20 text-amber-400 border-0 text-xs mb-2">
                                {item.subcategory ? getLocalizedText(item.subcategory.name, loc) : 'Bar'}
                              </Badge>
                              <h3 className="text-base font-semibold text-white group-hover:text-amber-400 transition-colors">{getLocalizedText(item.name, loc)}</h3>
                              <p className="mt-2 text-sm text-gray-500 line-clamp-2">{getLocalizedText(item.description, loc)}</p>
                              {item.location ? (<div className="mt-3 flex items-center gap-1 text-xs text-gray-500"><MapPin className="h-3 w-3" />{getLocalizedText(item.location, loc)}</div>) : null}
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>

              {/* ======= SECTION 3: FESTIVALS ======= */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20">
                    <PartyPopper className="h-5 w-5 text-pink-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    {locale === 'es' ? 'Festivales de Música' : locale === 'de' ? 'Musikfestivals' : 'Music Festivals'}
                  </h2>
                </div>
                <p className="text-gray-400 mb-6 ml-12">
                  {locale === 'es' ? 'Los mejores festivales de música de Tenerife con fechas, precios y toda la información' : 'The best music festivals in Tenerife with dates, prices and all the information'}
                </p>
                {festivals.length > 0 || musicEvents.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Festival items from nightlife */}
                    {festivals.map((item: any) => (
                      <Link key={item.id} href={`/nightlife/festivals/${item.slug}`}>
                        <Card className="group bg-slate-900/50 border-white/5 hover:border-pink-400/20 transition-all duration-300 h-full cursor-pointer overflow-hidden">
                          {item.image ? (
                            <div className="relative aspect-[16/9] overflow-hidden">
                              <Image src={item.image} alt={getLocalizedText(item.name, loc)} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                            </div>
                          ) : null}
                          <CardContent className="p-5">
                            <Badge className="bg-pink-500/20 text-pink-400 border-0 text-xs mb-2">Festival</Badge>
                            <h3 className="text-base font-semibold text-white group-hover:text-pink-400 transition-colors">{getLocalizedText(item.name, loc)}</h3>
                            <p className="mt-2 text-sm text-gray-500 line-clamp-2">{getLocalizedText(item.description, loc)}</p>
                            <div className="mt-3 flex items-center justify-between">
                              {item.location ? (<span className="flex items-center gap-1 text-xs text-gray-500"><MapPin className="h-3 w-3" />{getLocalizedText(item.location, loc)}</span>) : null}
                              {item.price_from ? (<span className="text-sm font-semibold text-white">{locale === 'es' ? 'Desde' : 'From'} {item.price_from}€</span>) : null}
                            </div>
                            {item.duration ? (<div className="mt-2 flex items-center gap-1 text-xs text-pink-400"><Calendar className="h-3 w-3" />{item.duration}</div>) : null}
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                    {/* Music events from events table */}
                    {musicEvents.map((event: any) => (
                      <EventCard key={event.id} event={event} locale={loc} />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">{locale === 'es' ? 'Próximamente...' : 'Coming soon...'}</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  )
}
