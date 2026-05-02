import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { Link } from '@/i18n/routing'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { buildAlternates } from '@/lib/metadata'
import {
  MapPin,
  Star,
  ChevronRight,
  ArrowRight,
  Ship,
  Mountain,
  Waves,
  Users,
  Compass,
} from 'lucide-react'
import { t as getLocalizedText, formatRating, formatPrice } from '@/lib/helpers'
import type { Locale } from '@/types/database'

const text = {
  meta: {
    title: { es: 'Excursiones y actividades en Tenerife - Guía 2026', en: 'Tours & Activities in Tenerife - Guide 2026' },
    description: {
      es: 'Descubre las mejores excursiones en Tenerife: avistamiento de cetáceos, senderismo, deportes acuáticos y actividades para familias.',
      en: 'Discover the best tours in Tenerife: whale watching, hiking, water sports and family activities.',
    },
  },
  hero: {
    badge: { es: 'Experiencias', en: 'Experiences' },
    title: { es: 'Excursiones y actividades en Tenerife', en: 'Tours & activities in Tenerife' },
    subtitle: {
      es: 'Desde el avistamiento de ballenas hasta rutas de senderismo por paisajes volcánicos: las mejores experiencias para vivir en la isla.',
      en: 'From whale watching to hiking trails through volcanic landscapes: the best experiences on the island.',
    },
  },
  top: {
    badge: { es: 'Destacadas', en: 'Featured' },
    title: { es: 'Top experiencias', en: 'Top experiences' },
    subtitle: { es: 'Las actividades mejor valoradas por nuestros visitantes', en: 'Top-rated activities by our visitors' },
  },
  boats: {
    badge: { es: 'En el mar', en: 'At sea' },
    title: { es: 'Excursiones en barco', en: 'Boat tours' },
    subtitle: { es: 'Avistamiento de cetáceos y paseos por la costa', en: 'Whale watching and coastal tours' },
  },
  hiking: {
    badge: { es: 'Naturaleza', en: 'Nature' },
    title: { es: 'Senderismo', en: 'Hiking' },
    subtitle: { es: 'Rutas por paisajes volcánicos, bosques de laurisilva y barrancos', en: 'Trails through volcanic landscapes, laurel forests and ravines' },
  },
  water: {
    badge: { es: 'Aventura', en: 'Adventure' },
    title: { es: 'Deportes acuáticos', en: 'Water sports' },
    subtitle: { es: 'Surf, kayak, buceo, jet ski y más', en: 'Surf, kayak, diving, jet ski and more' },
  },
  family: {
    badge: { es: 'Familias', en: 'Families' },
    title: { es: 'Para familias', en: 'For families' },
    subtitle: { es: 'Parques temáticos y actividades para disfrutar con niños', en: 'Theme parks and activities to enjoy with kids' },
  },
  cta: {
    title: { es: '¿Listo para tu aventura?', en: 'Ready for your adventure?' },
    subtitle: { es: 'Reserva ahora y asegura tu plaza en las mejores experiencias de Tenerife', en: 'Book now and secure your spot for the best experiences in Tenerife' },
    button: { es: 'Reservar ahora', en: 'Book now' },
  },
  noData: { es: 'Contenido próximamente', en: 'Content coming soon' },
  viewAll: { es: 'Ver todos', en: 'View all' },
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
    alternates: buildAlternates(locale, '/experiences'),
  }
}

export default async function ExperienciasPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const supabase = await createClient()
  const loc = locale as Locale

  // Featured experiences
  const { data: featured } = await supabase
    .from('items')
    .select('*, subcategory:subcategories!inner(slug, category:categories!inner(slug))')
    .eq('visible', true)
    .eq('featured', true)
    .eq('subcategory.category.slug', 'experiences')
    .order('rating', { ascending: false })
    .limit(6)

  // Whale watching / boat tours
  const { data: boatItems } = await supabase
    .from('items')
    .select('*, subcategory:subcategories!inner(slug, category:categories!inner(slug))')
    .eq('visible', true)
    .eq('subcategory.category.slug', 'experiences')
    .eq('subcategory.slug', 'whale-watching')
    .order('rating', { ascending: false })
    .limit(6)

  // Hiking
  const { data: hikingItems } = await supabase
    .from('items')
    .select('*, subcategory:subcategories!inner(slug, category:categories!inner(slug))')
    .eq('visible', true)
    .eq('subcategory.category.slug', 'experiences')
    .eq('subcategory.slug', 'hiking-trails')
    .order('rating', { ascending: false })
    .limit(6)

  // Water sports
  const { data: waterItems } = await supabase
    .from('items')
    .select('*, subcategory:subcategories!inner(slug, category:categories!inner(slug))')
    .eq('visible', true)
    .eq('subcategory.category.slug', 'experiences')
    .eq('subcategory.slug', 'water-sports')
    .order('rating', { ascending: false })
    .limit(6)

  // Family / theme parks
  const { data: familyItems } = await supabase
    .from('items')
    .select('*, subcategory:subcategories!inner(slug, category:categories!inner(slug))')
    .eq('visible', true)
    .eq('subcategory.category.slug', 'experiences')
    .eq('subcategory.slug', 'family-theme-parks')
    .order('rating', { ascending: false })
    .limit(6)

  function itemUrl(item: NonNullable<typeof featured>[number]) {
    const sub = item.subcategory as { slug: string; category: { slug: string } } | null
    if (sub?.category?.slug && sub?.slug) {
      return `/${sub.category.slug}/${sub.slug}/${item.slug}`
    }
    return '#'
  }

  function renderSection(
    sectionText: { badge: Record<string, string>; title: Record<string, string>; subtitle: Record<string, string> },
    items: typeof featured,
    badgeColor: string,
    hoverColor: string,
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
                  <Card className={`group bg-slate-900/50 border-white/5 hover:border-${hoverColor}-400/20 transition-all duration-300 overflow-hidden h-full cursor-pointer`}>
                    {item.image && (
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={item.image}
                          alt={getLocalizedText(item.name, loc)}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
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
                      <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
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

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=1920&q=85"
            alt={getLocalizedText(text.hero.title, loc)}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/50 to-slate-950" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="max-w-4xl">
            <Badge variant="outline" className="border-orange-400/30 text-orange-400 px-4 py-1 mb-6">
              <Compass className="h-3 w-3 mr-1" />
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

      {/* TOP EXPERIENCIAS */}
      {renderSection(
        text.top,
        featured,
        'orange',
        'orange',
        <Star className="h-3 w-3 mr-1 fill-orange-400" />,
        '/experiences'
      )}

      {/* EXCURSIONES EN BARCO */}
      {renderSection(
        text.boats,
        boatItems,
        'blue',
        'blue',
        <Ship className="h-3 w-3 mr-1" />,
        '/experiences/whale-watching',
        'bg-slate-900/50'
      )}

      {/* SENDERISMO */}
      {renderSection(
        text.hiking,
        hikingItems,
        'green',
        'green',
        <Mountain className="h-3 w-3 mr-1" />,
        '/experiences/hiking-trails'
      )}

      {/* DEPORTES ACUATICOS */}
      {renderSection(
        text.water,
        waterItems,
        'cyan',
        'cyan',
        <Waves className="h-3 w-3 mr-1" />,
        '/experiences/water-sports',
        'bg-slate-900/50'
      )}

      {/* PARA FAMILIAS */}
      {renderSection(
        text.family,
        familyItems,
        'pink',
        'pink',
        <Users className="h-3 w-3 mr-1" />,
        '/experiences/family-theme-parks'
      )}

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/20 p-8 sm:p-16 text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/10 rounded-full blur-[60px]" />
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
