'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Ship,
  Mountain,
  Waves,
  Ticket,
  ShieldCheck,
  XCircle,
  BadgeCheck,
  Star,
  ArrowRight,
  Calendar,
} from 'lucide-react'

const bookingCategories = [
  {
    key: 'whaleWatching',
    icon: Ship,
    gradient: 'from-blue-500 to-cyan-500',
    image: '/images/whale-watching.jpg',
    href: '/experiences',
  },
  {
    key: 'teideTours',
    icon: Mountain,
    gradient: 'from-orange-500 to-red-500',
    image: '/images/teide.jpg',
    href: '/experiences',
  },
  {
    key: 'waterSports',
    icon: Waves,
    gradient: 'from-teal-500 to-emerald-500',
    image: '/images/water-sports.jpg',
    href: '/experiences',
  },
  {
    key: 'themeParks',
    icon: Ticket,
    gradient: 'from-purple-500 to-pink-500',
    image: '/images/theme-parks.jpg',
    href: '/experiences',
  },
]

const categoryLabels: Record<string, Record<string, string>> = {
  whaleWatching: {
    es: 'Avistamiento de Ballenas',
    en: 'Whale Watching',
    de: 'Walbeobachtung',
    fr: 'Observation des Baleines',
    it: 'Avvistamento Balene',
    ru: 'Наблюдение за Китами',
  },
  teideTours: {
    es: 'Tours al Teide',
    en: 'Teide Tours',
    de: 'Teide-Touren',
    fr: 'Tours du Teide',
    it: 'Tour del Teide',
    ru: 'Туры на Тейде',
  },
  waterSports: {
    es: 'Deportes Acuáticos',
    en: 'Water Sports',
    de: 'Wassersport',
    fr: 'Sports Nautiques',
    it: 'Sport Acquatici',
    ru: 'Водные Виды Спорта',
  },
  themeParks: {
    es: 'Parques Temáticos',
    en: 'Theme Parks',
    de: 'Freizeitparks',
    fr: 'Parcs à Thème',
    it: 'Parchi a Tema',
    ru: 'Парки Развлечений',
  },
}

export default function ReservasPage() {
  const t = useTranslations('reservas')

  // We need locale for category labels - derive from translations
  const locale = typeof window !== 'undefined' ? (document.documentElement.lang || 'en') : 'en'

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 via-slate-950 to-blue-600/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,146,60,0.15),transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 border border-orange-500/20 px-4 py-2 mb-6">
            <Calendar className="h-4 w-4 text-orange-400" />
            <span className="text-sm text-orange-300">{t('secureBooking')}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t('title')}
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            {t('subtitle')}
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
            <div className="flex items-center gap-2 text-gray-400">
              <ShieldCheck className="h-5 w-5 text-green-400" />
              <span className="text-sm">{t('secureBooking')}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <XCircle className="h-5 w-5 text-blue-400" />
              <span className="text-sm">{t('freeCancellation')}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <BadgeCheck className="h-5 w-5 text-orange-400" />
              <span className="text-sm">{t('bestPrice')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Categories */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-2">{t('popular')}</h2>
          <p className="text-gray-400 mb-10">{t('subtitle')}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bookingCategories.map((cat) => {
              const Icon = cat.icon
              const label = categoryLabels[cat.key]?.[locale] || categoryLabels[cat.key]?.['en'] || cat.key
              return (
                <Link key={cat.key} href={cat.href}>
                  <Card className="group relative overflow-hidden border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer h-full">
                    <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />
                    <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                      <div className={`rounded-xl bg-gradient-to-br ${cat.gradient} p-4`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">
                        {label}
                      </h3>
                      <div className="flex items-center gap-1 text-orange-400 text-sm font-medium group-hover:gap-2 transition-all">
                        {t('bookNow')} <ArrowRight className="h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* All Experiences Section */}
      <section className="py-16 sm:py-20 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-white">{t('allExperiences')}</h2>
            <Link href="/experiences">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                {t('allExperiences')} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Placeholder grid for experiences */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="border-white/10 bg-white/5 overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 animate-pulse" />
                <CardContent className="p-4 space-y-3">
                  <div className="h-5 w-3/4 bg-white/10 rounded animate-pulse" />
                  <div className="h-4 w-1/2 bg-white/5 rounded animate-pulse" />
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm text-gray-400">--</span>
                    </div>
                    <div className="h-8 w-24 bg-orange-500/20 rounded animate-pulse" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Civitatis Integration Placeholder */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl border-2 border-dashed border-orange-500/30 bg-gradient-to-br from-orange-500/5 to-blue-500/5 p-12 sm:p-16 text-center">
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center rounded-full bg-orange-500/10 border border-orange-500/20 px-3 py-1 text-xs text-orange-400 font-medium">
                Coming Soon
              </span>
            </div>
            <div className="mx-auto max-w-lg">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500/10">
                <Calendar className="h-8 w-8 text-orange-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Coming soon - Civitatis integration
              </h3>
              <p className="text-gray-400 mb-6">
                We are integrating with Civitatis to bring you the best booking experience for excursions, tours, and activities in Tenerife. Stay tuned!
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <span className="rounded-full bg-white/5 border border-white/10 px-4 py-2 text-sm text-gray-300">
                  Instant confirmation
                </span>
                <span className="rounded-full bg-white/5 border border-white/10 px-4 py-2 text-sm text-gray-300">
                  Free cancellation
                </span>
                <span className="rounded-full bg-white/5 border border-white/10 px-4 py-2 text-sm text-gray-300">
                  Best price guarantee
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
