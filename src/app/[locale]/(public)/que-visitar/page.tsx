import { getTranslations } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import { Link } from '@/i18n/routing'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  MapPin,
  Star,
  Clock,
  ChevronRight,
  ArrowRight,
  Mountain,
  Waves,
  Landmark,
  Utensils,
  Calendar,
  Camera,
  Sun,
  TreePine,
} from 'lucide-react'
import { t as getLocalizedText, formatPrice, formatRating } from '@/lib/helpers'
import type { Locale } from '@/types/database'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pillar' })
  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: '/que-visitar',
    },
  }
}

export default async function PillarPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const supabase = await createClient()
  const t = await getTranslations({ locale, namespace: 'pillar' })
  const loc = locale as Locale

  // Fetch featured items (top 10)
  const { data: featuredItems } = await supabase
    .from('items')
    .select('*, subcategory:subcategories(slug, category:categories(slug))')
    .eq('visible', true)
    .eq('featured', true)
    .order('rating', { ascending: false })
    .limit(10)

  // Fetch all areas
  const { data: areas } = await supabase
    .from('areas')
    .select('*')
    .order('name->>en')

  // Fetch beach items (top 5)
  const { data: beachItems } = await supabase
    .from('items')
    .select('*, subcategory:subcategories(slug, category:categories(slug))')
    .eq('visible', true)
    .ilike('subcategory.category.slug', 'beaches')
    .order('rating', { ascending: false })
    .limit(5)

  // Group areas by region
  const areasByRegion: Record<string, typeof areas> = {}
  areas?.forEach((area) => {
    const region = area.region || 'central'
    if (!areasByRegion[region]) areasByRegion[region] = []
    areasByRegion[region]!.push(area)
  })

  const REGION_LABELS: Record<string, Record<string, string>> = {
    north: { es: 'Norte', en: 'North' },
    south: { es: 'Sur', en: 'South' },
    east: { es: 'Este', en: 'East' },
    west: { es: 'Oeste', en: 'West' },
    central: { es: 'Centro', en: 'Central' },
  }

  const tocSections = [
    { id: 'top-10', label: t('toc.top10') },
    { id: 'por-zonas', label: t('toc.byArea') },
    { id: 'playas', label: t('toc.beaches') },
    { id: 'naturaleza', label: t('toc.nature') },
    { id: 'cultura', label: t('toc.culture') },
    { id: 'gastronomia', label: t('toc.gastronomy') },
    { id: 'itinerarios', label: t('toc.itineraries') },
    { id: 'faq', label: t('toc.faq') },
  ]

  // Build item URL helper
  function itemUrl(item: NonNullable<typeof featuredItems>[number]) {
    const sub = item.subcategory as { slug: string; category: { slug: string } } | null
    if (sub?.category?.slug && sub?.slug) {
      return `/${sub.category.slug}/${sub.slug}/${item.slug}`
    }
    return '#'
  }

  // FAQ JSON-LD
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: t('faq.q1'),
        acceptedAnswer: { '@type': 'Answer', text: t('faq.a1') },
      },
      {
        '@type': 'Question',
        name: t('faq.q2'),
        acceptedAnswer: { '@type': 'Answer', text: t('faq.a2') },
      },
      {
        '@type': 'Question',
        name: t('faq.q3'),
        acceptedAnswer: { '@type': 'Answer', text: t('faq.a3') },
      },
      {
        '@type': 'Question',
        name: t('faq.q4'),
        acceptedAnswer: { '@type': 'Answer', text: t('faq.a4') },
      },
      {
        '@type': 'Question',
        name: t('faq.q5'),
        acceptedAnswer: { '@type': 'Answer', text: t('faq.a5') },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1506368387824-6cf9848c1638?w=1920&q=85"
            alt={t('hero.altImage')}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/50 to-slate-950" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="max-w-4xl">
            <Badge variant="outline" className="border-orange-400/30 text-orange-400 px-4 py-1 mb-6">
              <MapPin className="h-3 w-3 mr-1" />
              {t('hero.badge')}
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight">
              <span className="gradient-text">{t('hero.title')}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg sm:text-xl text-gray-300 leading-relaxed">
              {t('hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* ============ TABLE OF CONTENTS ============ */}
      <section className="py-12 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-semibold text-white mb-4">{t('toc.title')}</h2>
          <nav className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {tocSections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-orange-400 transition-colors group"
              >
                <ChevronRight className="h-3 w-3 text-orange-400/50 group-hover:text-orange-400" />
                {s.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* ============ TOP 10 IMPRESCINDIBLES ============ */}
      <section id="top-10" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <Badge variant="outline" className="border-orange-400/30 text-orange-400 mb-4">
              <Star className="h-3 w-3 mr-1 fill-orange-400" />
              {t('sections.mustSee')}
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">{t('sections.top10Title')}</h2>
            <p className="mt-3 text-gray-400 max-w-2xl">{t('sections.top10Subtitle')}</p>
          </div>

          {featuredItems && featuredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredItems.map((item, index) => (
                <Link key={item.id} href={itemUrl(item)}>
                  <Card className="group bg-slate-900/50 border-white/5 hover:border-orange-400/20 transition-all duration-300 overflow-hidden h-full cursor-pointer">
                    <div className="flex flex-col sm:flex-row h-full">
                      {item.image && (
                        <div className="relative sm:w-48 aspect-video sm:aspect-auto shrink-0 overflow-hidden">
                          <img
                            src={item.image}
                            alt={getLocalizedText(item.name, loc)}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute top-3 left-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-white text-sm font-bold">
                              {index + 1}
                            </span>
                          </div>
                        </div>
                      )}
                      <CardContent className="p-5 flex flex-col justify-between flex-1">
                        <div>
                          <h3 className="text-lg font-semibold text-white group-hover:text-orange-400 transition-colors">
                            {getLocalizedText(item.name, loc)}
                          </h3>
                          <p className="mt-2 text-sm text-gray-400 line-clamp-2">
                            {getLocalizedText(item.short_description || item.description, loc)}
                          </p>
                        </div>
                        <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                          {item.rating > 0 && (
                            <span className="flex items-center gap-1">
                              <Star className="h-3.5 w-3.5 text-orange-400 fill-orange-400" />
                              {formatRating(item.rating)}
                            </span>
                          )}
                          {item.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5" />
                              {getLocalizedText(item.location, loc)}
                            </span>
                          )}
                          {item.price_from != null && item.price_from > 0 && (
                            <span className="text-orange-400 font-medium">
                              {formatPrice(item.price_from)}
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">{t('sections.noData')}</p>
          )}
        </div>
      </section>

      {/* ============ POR ZONAS ============ */}
      <section id="por-zonas" className="py-20 bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">{t('sections.byAreaTitle')}</h2>
              <p className="mt-3 text-gray-400 max-w-2xl">{t('sections.byAreaSubtitle')}</p>
            </div>
            <Link href="/areas" className="hidden sm:flex items-center text-orange-400 hover:text-orange-300 text-sm font-medium gap-1">
              {t('sections.viewAllAreas')} <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {areas && areas.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {areas.map((area) => (
                <Link key={area.id} href={`/areas/${area.slug}`}>
                  <div className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer">
                    {area.image ? (
                      <img
                        src={area.image}
                        alt={getLocalizedText(area.name, loc)}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent group-hover:from-black/80 transition-all duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <Badge
                        variant="outline"
                        className="border-white/20 text-white/70 text-xs mb-2"
                      >
                        {REGION_LABELS[area.region]?.[locale] || area.region}
                      </Badge>
                      <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                        {getLocalizedText(area.name, loc)}
                      </h3>
                      <p className="mt-1 text-sm text-gray-300 line-clamp-2">
                        {getLocalizedText(area.description, loc)}
                      </p>
                      <div className="mt-3 flex items-center gap-1 text-orange-400 text-sm font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        {t('sections.explore')} <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">{t('sections.noData')}</p>
          )}
        </div>
      </section>

      {/* ============ PLAYAS ============ */}
      <section id="playas" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <Badge variant="outline" className="border-blue-400/30 text-blue-400 mb-4">
                <Waves className="h-3 w-3 mr-1" />
                {t('sections.beachesLabel')}
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">{t('sections.beachesTitle')}</h2>
              <p className="mt-3 text-gray-400 max-w-2xl">{t('sections.beachesSubtitle')}</p>
            </div>
            <Link href="/beaches" className="hidden sm:flex items-center text-orange-400 hover:text-orange-300 text-sm font-medium gap-1">
              {t('sections.viewAllBeaches')} <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {beachItems && beachItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {beachItems.slice(0, 5).map((item) => (
                <Link key={item.id} href={itemUrl(item)}>
                  <Card className="group bg-slate-900/50 border-white/5 hover:border-blue-400/20 transition-all duration-300 overflow-hidden h-full cursor-pointer">
                    {item.image && (
                      <div className="aspect-[16/10] overflow-hidden">
                        <img
                          src={item.image}
                          alt={getLocalizedText(item.name, loc)}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <CardContent className="p-5">
                      <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                        {getLocalizedText(item.name, loc)}
                      </h3>
                      <p className="mt-2 text-sm text-gray-400 line-clamp-2">
                        {getLocalizedText(item.short_description || item.description, loc)}
                      </p>
                      <div className="flex items-center gap-3 mt-3 text-sm text-gray-500">
                        {item.rating > 0 && (
                          <span className="flex items-center gap-1">
                            <Star className="h-3.5 w-3.5 text-orange-400 fill-orange-400" />
                            {formatRating(item.rating)}
                          </span>
                        )}
                        {item.sand_type && (
                          <span>{getLocalizedText(item.sand_type, loc)}</span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Playa de Las Teresitas', desc: t('beaches.teresitas'), img: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&q=80' },
                { name: 'Playa del Duque', desc: t('beaches.duque'), img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80' },
                { name: 'Playa de Benijo', desc: t('beaches.benijo'), img: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80' },
              ].map((beach) => (
                <Card key={beach.name} className="bg-slate-900/50 border-white/5 overflow-hidden">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={beach.img} alt={beach.name} className="w-full h-full object-cover" />
                  </div>
                  <CardContent className="p-5">
                    <h3 className="text-lg font-semibold text-white">{beach.name}</h3>
                    <p className="mt-2 text-sm text-gray-400">{beach.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============ NATURALEZA ============ */}
      <section id="naturaleza" className="py-20 bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge variant="outline" className="border-green-400/30 text-green-400 mb-4">
            <Mountain className="h-3 w-3 mr-1" />
            {t('sections.natureLabel')}
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">{t('sections.natureTitle')}</h2>
          <p className="text-gray-400 max-w-2xl mb-12">{t('sections.natureSubtitle')}</p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Teide */}
            <div className="group relative aspect-[3/4] rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1506368387824-6cf9848c1638?w=800&q=80"
                alt="Teide"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white">{t('nature.teideTitle')}</h3>
                <p className="mt-2 text-sm text-gray-300">{t('nature.teideDesc')}</p>
                <Link href="/nature" className="mt-3 inline-flex items-center gap-1 text-green-400 text-sm font-medium hover:text-green-300">
                  {t('sections.learnMore')} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Anaga */}
            <div className="group relative aspect-[3/4] rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1677503590969-1c16fd0a0981?w=800&q=80"
                alt="Anaga"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white">{t('nature.anagaTitle')}</h3>
                <p className="mt-2 text-sm text-gray-300">{t('nature.anagaDesc')}</p>
                <Link href="/nature" className="mt-3 inline-flex items-center gap-1 text-green-400 text-sm font-medium hover:text-green-300">
                  {t('sections.learnMore')} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Masca */}
            <div className="group relative aspect-[3/4] rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1669147951690-658f2e4b4dd3?w=800&q=80"
                alt="Masca"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white">{t('nature.mascaTitle')}</h3>
                <p className="mt-2 text-sm text-gray-300">{t('nature.mascaDesc')}</p>
                <Link href="/nature" className="mt-3 inline-flex items-center gap-1 text-green-400 text-sm font-medium hover:text-green-300">
                  {t('sections.learnMore')} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CULTURA ============ */}
      <section id="cultura" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge variant="outline" className="border-purple-400/30 text-purple-400 mb-4">
            <Landmark className="h-3 w-3 mr-1" />
            {t('sections.cultureLabel')}
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">{t('sections.cultureTitle')}</h2>
          <p className="text-gray-400 max-w-2xl mb-12">{t('sections.cultureSubtitle')}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* La Laguna */}
            <Card className="group bg-slate-900/50 border-white/5 hover:border-purple-400/20 transition-all duration-300 overflow-hidden">
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1564429238961-bf8ee3a83cda?w=800&q=80"
                  alt="La Laguna"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <CardContent className="p-5">
                <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors">
                  {t('culture.lagunaTitle')}
                </h3>
                <p className="mt-2 text-sm text-gray-400">{t('culture.lagunaDesc')}</p>
              </CardContent>
            </Card>

            {/* Garachico */}
            <Card className="group bg-slate-900/50 border-white/5 hover:border-purple-400/20 transition-all duration-300 overflow-hidden">
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=800&q=80"
                  alt="Garachico"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <CardContent className="p-5">
                <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors">
                  {t('culture.garachicoTitle')}
                </h3>
                <p className="mt-2 text-sm text-gray-400">{t('culture.garachicoDesc')}</p>
              </CardContent>
            </Card>

            {/* Museums */}
            <Card className="group bg-slate-900/50 border-white/5 hover:border-purple-400/20 transition-all duration-300 overflow-hidden">
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=800&q=80"
                  alt={t('culture.museumsTitle')}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <CardContent className="p-5">
                <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors">
                  {t('culture.museumsTitle')}
                </h3>
                <p className="mt-2 text-sm text-gray-400">{t('culture.museumsDesc')}</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Link href="/culture">
              <Button variant="outline" className="border-purple-400/30 text-purple-400 hover:bg-purple-400/10">
                {t('sections.viewAllCulture')} <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ GASTRONOMIA ============ */}
      <section id="gastronomia" className="py-20 bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1">
              <Badge variant="outline" className="border-red-400/30 text-red-400 mb-4">
                <Utensils className="h-3 w-3 mr-1" />
                {t('sections.gastronomyLabel')}
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">{t('sections.gastronomyTitle')}</h2>
              <p className="text-gray-400 leading-relaxed mb-4">{t('gastronomy.intro')}</p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 mt-1">&#8226;</span>
                  {t('gastronomy.highlight1')}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 mt-1">&#8226;</span>
                  {t('gastronomy.highlight2')}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 mt-1">&#8226;</span>
                  {t('gastronomy.highlight3')}
                </li>
              </ul>
              <div className="mt-8">
                <Link href="/food">
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                    {t('gastronomy.cta')} <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex-1 w-full">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80"
                  alt={t('sections.gastronomyLabel')}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ ITINERARIOS SUGERIDOS ============ */}
      <section id="itinerarios" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge variant="outline" className="border-orange-400/30 text-orange-400 mb-4">
            <Calendar className="h-3 w-3 mr-1" />
            {t('sections.itinerariesLabel')}
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">{t('sections.itinerariesTitle')}</h2>
          <p className="text-gray-400 max-w-2xl mb-12">{t('sections.itinerariesSubtitle')}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 3 days */}
            <Card className="bg-slate-900/50 border-white/5 hover:border-orange-400/20 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 border border-orange-500/20">
                    <span className="text-xl font-bold text-orange-400">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{t('itineraries.3days.title')}</h3>
                    <p className="text-xs text-gray-500">{t('itineraries.3days.subtitle')}</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  <li className="flex gap-3 text-sm">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center text-xs font-bold">1</span>
                    <span className="text-gray-300">{t('itineraries.3days.day1')}</span>
                  </li>
                  <li className="flex gap-3 text-sm">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center text-xs font-bold">2</span>
                    <span className="text-gray-300">{t('itineraries.3days.day2')}</span>
                  </li>
                  <li className="flex gap-3 text-sm">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center text-xs font-bold">3</span>
                    <span className="text-gray-300">{t('itineraries.3days.day3')}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* 5 days */}
            <Card className="bg-slate-900/50 border-orange-400/20 transition-all duration-300 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-orange-500 text-white text-xs">{t('itineraries.recommended')}</Badge>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 border border-orange-500/20">
                    <span className="text-xl font-bold text-orange-400">5</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{t('itineraries.5days.title')}</h3>
                    <p className="text-xs text-gray-500">{t('itineraries.5days.subtitle')}</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  <li className="flex gap-3 text-sm">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center text-xs font-bold">1</span>
                    <span className="text-gray-300">{t('itineraries.5days.day1')}</span>
                  </li>
                  <li className="flex gap-3 text-sm">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center text-xs font-bold">2</span>
                    <span className="text-gray-300">{t('itineraries.5days.day2')}</span>
                  </li>
                  <li className="flex gap-3 text-sm">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center text-xs font-bold">3</span>
                    <span className="text-gray-300">{t('itineraries.5days.day3')}</span>
                  </li>
                  <li className="flex gap-3 text-sm">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center text-xs font-bold">4</span>
                    <span className="text-gray-300">{t('itineraries.5days.day4')}</span>
                  </li>
                  <li className="flex gap-3 text-sm">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center text-xs font-bold">5</span>
                    <span className="text-gray-300">{t('itineraries.5days.day5')}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* 7 days */}
            <Card className="bg-slate-900/50 border-white/5 hover:border-orange-400/20 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 border border-orange-500/20">
                    <span className="text-xl font-bold text-orange-400">7</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{t('itineraries.7days.title')}</h3>
                    <p className="text-xs text-gray-500">{t('itineraries.7days.subtitle')}</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  <li className="flex gap-3 text-sm">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center text-xs font-bold">1-2</span>
                    <span className="text-gray-300">{t('itineraries.7days.days12')}</span>
                  </li>
                  <li className="flex gap-3 text-sm">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center text-xs font-bold">3</span>
                    <span className="text-gray-300">{t('itineraries.7days.day3')}</span>
                  </li>
                  <li className="flex gap-3 text-sm">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center text-xs font-bold">4-5</span>
                    <span className="text-gray-300">{t('itineraries.7days.days45')}</span>
                  </li>
                  <li className="flex gap-3 text-sm">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center text-xs font-bold">6</span>
                    <span className="text-gray-300">{t('itineraries.7days.day6')}</span>
                  </li>
                  <li className="flex gap-3 text-sm">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center text-xs font-bold">7</span>
                    <span className="text-gray-300">{t('itineraries.7days.day7')}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section id="faq" className="py-20 bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">{t('sections.faqTitle')}</h2>
          <p className="text-gray-400 max-w-2xl mb-12">{t('sections.faqSubtitle')}</p>

          <div className="max-w-3xl space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="border border-white/5 rounded-xl p-6 bg-slate-900/30">
                <h3 className="text-lg font-semibold text-white mb-3">{t(`faq.q${i}`)}</h3>
                <p className="text-gray-400 leading-relaxed">{t(`faq.a${i}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/20 p-8 sm:p-16 text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/10 rounded-full blur-[60px]" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{t('cta.title')}</h2>
              <p className="text-gray-300 max-w-xl mx-auto mb-8">{t('cta.subtitle')}</p>
              <Link href="/reservas">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-6 rounded-xl">
                  {t('cta.button')} <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
