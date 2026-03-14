import { getTranslations } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import { Link } from '@/i18n/routing'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, PartyPopper, Church, Music, Utensils, Trophy } from 'lucide-react'
import { t as getLocalizedText } from '@/lib/helpers'
import type { Locale } from '@/types/database'

const EVENT_TYPE_ICONS: Record<string, typeof Calendar> = {
  fiesta_patronal: Church,
  carnival: PartyPopper,
  cultural: Calendar,
  religious: Church,
  gastronomic: Utensils,
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

const MONTH_NAMES_EN = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const MONTH_NAMES_ES = ['', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const MONTH_NAMES_DE = ['', 'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']

function getMonthName(month: number, locale: string): string {
  if (locale === 'es') return MONTH_NAMES_ES[month] || ''
  if (locale === 'de') return MONTH_NAMES_DE[month] || ''
  return MONTH_NAMES_EN[month] || ''
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

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const titles: Record<string, string> = {
    es: 'Fiestas y Eventos en Tenerife - Calendario Cultural Completo',
    en: 'Tenerife Festivals & Events - Complete Cultural Calendar',
    de: 'Feste & Veranstaltungen auf Teneriffa - Vollständiger Kulturkalender',
    fr: 'Fêtes et Événements à Tenerife - Calendrier Culturel Complet',
    ru: 'Фестивали и События на Тенерифе - Полный Культурный Календарь',
    it: 'Feste ed Eventi a Tenerife - Calendario Culturale Completo',
  }
  const descriptions: Record<string, string> = {
    es: 'Descubre todas las fiestas patronales, carnavales y eventos culturales de los 31 municipios de Tenerife. Fechas, tradiciones y consejos prácticos.',
    en: 'Discover all patron saint festivals, carnivals and cultural events across Tenerife\'s 31 municipalities. Dates, traditions and practical tips.',
    de: 'Entdecken Sie alle Patronatsfeste, Karnevale und kulturellen Veranstaltungen in Teneriffas 31 Gemeinden. Termine, Traditionen und praktische Tipps.',
  }
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
  }
}

export default async function EventsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const supabase = await createClient()

  const { data: events } = await supabase
    .from('events')
    .select('*')
    .eq('visible', true)
    .order('month')
    .order('municipality')

  // Group by month
  const eventsByMonth: Record<number, typeof events> = {}
  events?.forEach((event) => {
    const month = event.month || 0
    if (!eventsByMonth[month]) eventsByMonth[month] = []
    eventsByMonth[month]!.push(event)
  })

  const loc = locale as Locale

  const pageTitle: Record<string, string> = {
    es: 'Fiestas y Eventos de Tenerife',
    en: 'Tenerife Festivals & Events',
    de: 'Feste & Veranstaltungen auf Teneriffa',
  }

  const pageSubtitle: Record<string, string> = {
    es: 'Calendario completo de las fiestas patronales, carnavales y eventos culturales de los 31 municipios de la isla',
    en: 'Complete calendar of patron saint festivals, carnivals and cultural events across all 31 municipalities of the island',
    de: 'Vollständiger Kalender der Patronatsfeste, Karnevale und kulturellen Veranstaltungen in allen 31 Gemeinden der Insel',
  }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="outline" className="border-purple-400/30 text-purple-400 mb-4">
              <Calendar className="h-3 w-3 mr-1" />
              31 {locale === 'es' ? 'municipios' : locale === 'de' ? 'Gemeinden' : 'municipalities'}
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-white">
              {pageTitle[locale] || pageTitle.en}
            </h1>
            <p className="mt-4 text-lg text-gray-400 leading-relaxed">
              {pageSubtitle[locale] || pageSubtitle.en}
            </p>
          </div>
        </div>
      </section>

      {/* Events by Month */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {Object.entries(eventsByMonth)
            .sort(([a], [b]) => Number(a) - Number(b))
            .map(([month, monthEvents]) => (
              <div key={month} className="mb-16">
                {/* Month Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20">
                    <span className="text-2xl font-bold text-purple-400">{month}</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {getMonthName(Number(month), locale)}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {monthEvents?.length} {locale === 'es' ? 'eventos' : locale === 'de' ? 'Veranstaltungen' : 'events'}
                    </p>
                  </div>
                </div>

                {/* Events Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {monthEvents?.map((event) => {
                    const Icon = EVENT_TYPE_ICONS[event.event_type] || Calendar
                    return (
                      <Link key={event.id} href={`/events/${event.slug}`}>
                        <Card className="group bg-slate-900/50 border-white/5 hover:border-purple-400/20 transition-all duration-300 h-full cursor-pointer">
                          {event.image && (
                            <div className="aspect-[16/9] overflow-hidden rounded-t-lg">
                              <img
                                src={event.image}
                                alt={getLocalizedText(event.name, loc)}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            </div>
                          )}
                          <CardContent className="p-5">
                            <div className="flex items-center gap-2 mb-3">
                              <Badge variant="outline" className={`text-xs ${EVENT_TYPE_COLORS[event.event_type] || ''}`}>
                                <Icon className="h-3 w-3 mr-1" />
                                {EVENT_TYPE_LABELS[event.event_type]?.[locale] || EVENT_TYPE_LABELS[event.event_type]?.en || event.event_type}
                              </Badge>
                              {event.featured && (
                                <Badge className="bg-amber-500/20 text-amber-400 border-0 text-xs">
                                  {locale === 'es' ? 'Destacado' : locale === 'de' ? 'Empfohlen' : 'Featured'}
                                </Badge>
                              )}
                            </div>

                            <h3 className="text-base font-semibold text-white group-hover:text-purple-400 transition-colors">
                              {getLocalizedText(event.name, loc)}
                            </h3>

                            <div className="mt-2 flex items-center gap-1 text-sm text-gray-400">
                              <MapPin className="h-3.5 w-3.5 text-purple-400" />
                              {event.municipality}
                            </div>

                            <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                              {getLocalizedText(event.description, loc)}
                            </p>

                            {event.start_date && (
                              <div className="mt-3 flex items-center gap-1 text-xs text-gray-500">
                                <Calendar className="h-3 w-3" />
                                {event.start_date}{event.end_date ? ` - ${event.end_date}` : ''}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}

          {(!events || events.length === 0) && (
            <div className="text-center py-20">
              <Calendar className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                {locale === 'es' ? 'Cargando eventos...' : 'Loading events...'}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
