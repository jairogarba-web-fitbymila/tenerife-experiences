import { createClient } from '@/lib/supabase/server'
import { Link } from '@/i18n/routing'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  MapPin,
  Star,
  ChevronRight,
  ArrowRight,
  Waves,
  Sun,
  Users,
  Droplets,
} from 'lucide-react'
import { t as getLocalizedText, formatRating } from '@/lib/helpers'
import type { Locale } from '@/types/database'

const text = {
  meta: {
    title: { es: 'Mejores playas de Tenerife - Guía completa 2026', en: 'Best Beaches in Tenerife - Complete Guide 2026' },
    description: {
      es: 'Descubre las mejores playas de Tenerife: playas del sur, del norte, piscinas naturales y playas familiares. Arena negra, dorada y volcánica.',
      en: 'Discover the best beaches in Tenerife: south beaches, north beaches, natural pools and family beaches. Black, golden and volcanic sand.',
    },
  },
  hero: {
    badge: { es: 'Playas', en: 'Beaches' },
    title: { es: 'Mejores playas de Tenerife', en: 'Best beaches in Tenerife' },
    subtitle: {
      es: 'Desde calas de arena negra volcánica hasta extensas playas doradas: guía completa con las mejores playas de la isla para todos los gustos.',
      en: 'From black volcanic sand coves to wide golden beaches: complete guide to the best beaches on the island for every taste.',
    },
  },
  best: {
    badge: { es: 'Top playas', en: 'Top beaches' },
    title: { es: 'Mejores playas', en: 'Best beaches' },
    subtitle: { es: 'Las playas mejor valoradas de toda la isla', en: 'The top-rated beaches across the island' },
  },
  south: {
    badge: { es: 'Sur', en: 'South' },
    title: { es: 'Playas del Sur', en: 'South beaches' },
    subtitle: { es: 'Sol garantizado, aguas tranquilas y ambiente turístico', en: 'Guaranteed sun, calm waters and tourist atmosphere' },
  },
  north: {
    badge: { es: 'Norte', en: 'North' },
    title: { es: 'Playas del Norte', en: 'North beaches' },
    subtitle: { es: 'Arena negra volcánica, oleaje y paisajes salvajes', en: 'Black volcanic sand, waves and wild landscapes' },
  },
  pools: {
    badge: { es: 'Piscinas', en: 'Pools' },
    title: { es: 'Piscinas naturales', en: 'Natural pools' },
    subtitle: { es: 'Formaciones volcánicas únicas donde bañarse con seguridad', en: 'Unique volcanic formations for safe swimming' },
  },
  family: {
    badge: { es: 'Familias', en: 'Families' },
    title: { es: 'Playas para familias', en: 'Family beaches' },
    subtitle: { es: 'Playas seguras con servicios, poco oleaje y zonas de juego', en: 'Safe beaches with services, low waves and play areas' },
  },
  faq: {
    title: { es: 'Preguntas frecuentes sobre playas en Tenerife', en: 'Frequently asked questions about Tenerife beaches' },
    q1: { es: '¿Las playas de Tenerife son de arena negra?', en: 'Are Tenerife beaches made of black sand?' },
    a1: {
      es: 'No todas. En el norte predomina la arena negra volcánica (Benijo, Bollullo), mientras que en el sur hay playas de arena dorada, muchas importada del Sáhara como Las Teresitas. También encontrarás playas de callaos (guijarros) y piscinas naturales de roca volcánica.',
      en: 'Not all of them. In the north, black volcanic sand predominates (Benijo, Bollullo), while in the south there are golden sand beaches, many imported from the Sahara like Las Teresitas. You\'ll also find pebble beaches and volcanic rock natural pools.',
    },
    q2: { es: '¿Cuál es la mejor zona de playas en Tenerife?', en: 'What is the best beach area in Tenerife?' },
    a2: {
      es: 'Depende de tus preferencias. El sur (Costa Adeje, Los Cristianos) ofrece sol constante y aguas calmadas. El norte (Anaga, Puerto de la Cruz) tiene playas salvajes y paisajes espectaculares. Para familias, las playas del sur y Las Teresitas son ideales.',
      en: 'It depends on your preferences. The south (Costa Adeje, Los Cristianos) offers constant sun and calm waters. The north (Anaga, Puerto de la Cruz) has wild beaches and spectacular landscapes. For families, south beaches and Las Teresitas are ideal.',
    },
    q3: { es: '¿Se puede nadar en las piscinas naturales de Tenerife?', en: 'Can you swim in Tenerife\'s natural pools?' },
    a3: {
      es: 'Sí, las piscinas naturales son formaciones de roca volcánica que crean pozas protegidas del oleaje. Las más famosas son Garachico, Bajamar y Jover. Son seguras para el baño, aunque siempre hay que respetar las señales y el estado del mar.',
      en: 'Yes, natural pools are volcanic rock formations that create pools protected from waves. The most famous are Garachico, Bajamar and Jover. They are safe for swimming, although you should always respect signs and sea conditions.',
    },
  },
  cta: {
    title: { es: '¿Preparado para el chapuzón?', en: 'Ready for a dip?' },
    subtitle: { es: 'Reserva actividades acuáticas y excursiones costeras en Tenerife', en: 'Book water activities and coastal tours in Tenerife' },
    button: { es: 'Ver actividades', en: 'View activities' },
  },
  noData: { es: 'Contenido próximamente', en: 'Content coming soon' },
  viewAll: { es: 'Ver todas', en: 'View all' },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const loc = locale as Locale
  return {
    title: getLocalizedText(text.meta.title, loc),
    description: getLocalizedText(text.meta.description, loc),
    alternates: { canonical: '/playas-tenerife' },
  }
}

export default async function PlayasTenerifePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const supabase = await createClient()
  const loc = locale as Locale

  // Best beaches
  const { data: bestBeaches } = await supabase
    .from('items')
    .select('*, subcategory:subcategories!inner(slug, category:categories!inner(slug))')
    .eq('visible', true)
    .eq('subcategory.category.slug', 'beaches')
    .eq('subcategory.slug', 'best-beaches')
    .order('rating', { ascending: false })
    .limit(6)

  // South beaches
  const { data: southBeaches } = await supabase
    .from('items')
    .select('*, subcategory:subcategories!inner(slug, category:categories!inner(slug))')
    .eq('visible', true)
    .eq('subcategory.category.slug', 'beaches')
    .eq('subcategory.slug', 'south-beaches')
    .order('rating', { ascending: false })
    .limit(6)

  // North beaches
  const { data: northBeaches } = await supabase
    .from('items')
    .select('*, subcategory:subcategories!inner(slug, category:categories!inner(slug))')
    .eq('visible', true)
    .eq('subcategory.category.slug', 'beaches')
    .eq('subcategory.slug', 'north-beaches')
    .order('rating', { ascending: false })
    .limit(6)

  // Natural pools
  const { data: naturalPools } = await supabase
    .from('items')
    .select('*, subcategory:subcategories!inner(slug, category:categories!inner(slug))')
    .eq('visible', true)
    .eq('subcategory.category.slug', 'beaches')
    .eq('subcategory.slug', 'natural-pools')
    .order('rating', { ascending: false })
    .limit(6)

  // Family beaches
  const { data: familyBeaches } = await supabase
    .from('items')
    .select('*, subcategory:subcategories!inner(slug, category:categories!inner(slug))')
    .eq('visible', true)
    .eq('subcategory.category.slug', 'beaches')
    .eq('subcategory.slug', 'family-beaches')
    .order('rating', { ascending: false })
    .limit(6)

  function itemUrl(item: NonNullable<typeof bestBeaches>[number]) {
    const sub = item.subcategory as { slug: string; category: { slug: string } } | null
    if (sub?.category?.slug && sub?.slug) {
      return `/${sub.category.slug}/${sub.slug}/${item.slug}`
    }
    return '#'
  }

  function renderBeachSection(
    sectionText: { badge: Record<string, string>; title: Record<string, string>; subtitle: Record<string, string> },
    items: typeof bestBeaches,
    badgeColor: string,
    icon: React.ReactNode,
    linkHref?: string,
    bgClass?: string
  ) {
    return (
      <section className={`py-20 ${bgClass || ''}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <Badge variant="outline" className={`border-${badgeColor}-400/30 text-${badgeColor}-400 mb-4`}>
                {icon}
                {getLocalizedText(sectionText.badge, loc)}
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                {getLocalizedText(sectionText.title, loc)}
              </h2>
              <p className="mt-3 text-gray-400 max-w-2xl">
                {getLocalizedText(sectionText.subtitle, loc)}
              </p>
            </div>
            {linkHref && (
              <Link href={linkHref} className="hidden sm:flex items-center text-orange-400 hover:text-orange-300 text-sm font-medium gap-1">
                {getLocalizedText(text.viewAll, loc)} <ChevronRight className="h-4 w-4" />
              </Link>
            )}
          </div>
          {items && items.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <Link key={item.id} href={itemUrl(item)}>
                  <Card className={`group bg-slate-900/50 border-white/5 hover:border-${badgeColor}-400/20 transition-all duration-300 overflow-hidden h-full cursor-pointer`}>
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
                      <h3 className="text-lg font-semibold text-white group-hover:text-orange-400 transition-colors">
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
                        {item.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            {getLocalizedText(item.location, loc)}
                          </span>
                        )}
                        {item.sand_type && (
                          <span className="text-xs text-gray-500">
                            {getLocalizedText(item.sand_type, loc)}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">{getLocalizedText(text.noData, loc)}</p>
          )}
        </div>
      </section>
    )
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [1, 2, 3].map((i) => ({
      '@type': 'Question',
      name: getLocalizedText(text.faq[`q${i}` as keyof typeof text.faq], loc),
      acceptedAnswer: {
        '@type': 'Answer',
        text: getLocalizedText(text.faq[`a${i}` as keyof typeof text.faq], loc),
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=1920&q=85"
            alt={getLocalizedText(text.hero.title, loc)}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/50 to-slate-950" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="max-w-4xl">
            <Badge variant="outline" className="border-blue-400/30 text-blue-400 px-4 py-1 mb-6">
              <Waves className="h-3 w-3 mr-1" />
              {getLocalizedText(text.hero.badge, loc)}
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight">
              <span className="gradient-text">{getLocalizedText(text.hero.title, loc)}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg sm:text-xl text-gray-300 leading-relaxed">
              {getLocalizedText(text.hero.subtitle, loc)}
            </p>
          </div>
        </div>
      </section>

      {/* MEJORES PLAYAS */}
      {renderBeachSection(
        text.best,
        bestBeaches,
        'orange',
        <Star className="h-3 w-3 mr-1 fill-orange-400" />,
        '/beaches/best-beaches'
      )}

      {/* PLAYAS DEL SUR */}
      {renderBeachSection(
        text.south,
        southBeaches,
        'amber',
        <Sun className="h-3 w-3 mr-1" />,
        '/beaches/south-beaches',
        'bg-slate-900/50'
      )}

      {/* PLAYAS DEL NORTE */}
      {renderBeachSection(
        text.north,
        northBeaches,
        'blue',
        <Waves className="h-3 w-3 mr-1" />,
        '/beaches/north-beaches'
      )}

      {/* PISCINAS NATURALES */}
      {renderBeachSection(
        text.pools,
        naturalPools,
        'cyan',
        <Droplets className="h-3 w-3 mr-1" />,
        '/beaches/natural-pools',
        'bg-slate-900/50'
      )}

      {/* PLAYAS PARA FAMILIAS */}
      {renderBeachSection(
        text.family,
        familyBeaches,
        'pink',
        <Users className="h-3 w-3 mr-1" />,
        '/beaches/family-beaches'
      )}

      {/* FAQ */}
      <section className="py-20 bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12">
            {getLocalizedText(text.faq.title, loc)}
          </h2>
          <div className="max-w-3xl space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-white/5 rounded-xl p-6 bg-slate-900/30">
                <h3 className="text-lg font-semibold text-white mb-3">
                  {getLocalizedText(text.faq[`q${i}` as keyof typeof text.faq], loc)}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {getLocalizedText(text.faq[`a${i}` as keyof typeof text.faq], loc)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/20 p-8 sm:p-16 text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-[60px]" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                {getLocalizedText(text.cta.title, loc)}
              </h2>
              <p className="text-gray-300 max-w-xl mx-auto mb-8">
                {getLocalizedText(text.cta.subtitle, loc)}
              </p>
              <Link href="/reservas">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-6 rounded-xl">
                  {getLocalizedText(text.cta.button, loc)} <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
