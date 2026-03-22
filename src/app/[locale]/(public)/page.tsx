import { Suspense } from 'react'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import {
  Waves,
  Mountain,
  Utensils,
  Camera,
  TreePine,
  Music,
  ShoppingBag,
  Baby,
  Sparkles,
  MapPin,
  Star,
  ArrowRight,
  ChevronRight,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FeaturedPartners } from '@/components/home/featured-partners'
import { HeroSearchBar } from '@/components/home/hero-search-bar'
import { MapSection } from '@/components/home/map-section'
import { NewsletterForm } from '@/components/home/newsletter-form'

const mapPins = [
  { name: 'Teide National Park', slug: 'areas/teide', category: 'nature', lat: 28.2723, lng: -16.6422 },
  { name: 'Costa Adeje', slug: 'areas/costa-adeje', category: 'beaches', lat: 28.0801, lng: -16.7266 },
  { name: 'Los Gigantes', slug: 'areas/los-gigantes', category: 'nature', lat: 28.2472, lng: -16.8411 },
  { name: 'Puerto de la Cruz', slug: 'areas/puerto-de-la-cruz', category: 'culture', lat: 28.4144, lng: -16.5483 },
  { name: 'Santa Cruz', slug: 'areas/santa-cruz', category: 'culture', lat: 28.4698, lng: -16.2548 },
  { name: 'La Laguna', slug: 'areas/la-laguna', category: 'culture', lat: 28.4853, lng: -16.3154 },
  { name: 'Anaga', slug: 'areas/anaga', category: 'nature', lat: 28.5434, lng: -16.1783 },
  { name: 'Playa de las Teresitas', slug: 'beaches/best-beaches', category: 'beaches', lat: 28.5082, lng: -16.1872 },
  { name: 'Masca', slug: 'nature/hiking-trails', category: 'nature', lat: 28.2948, lng: -16.8399 },
  { name: 'Siam Park', slug: 'family/theme-parks', category: 'family', lat: 28.0719, lng: -16.7260 },
]

const categories = [
  { id: 'experiences', icon: Camera, href: '/experiences', color: 'from-orange-500 to-amber-500', image: 'https://images.unsplash.com/photo-1713193160430-a4f8fa3e692f?w=600&q=80' }, // Roques de Garcia + Teide Tenerife
  { id: 'beaches', icon: Waves, href: '/beaches', color: 'from-blue-500 to-cyan-500', image: 'https://images.unsplash.com/photo-1605182054023-17d71f44aa11?w=600&q=80' }, // Playa de las Teresitas aerial
  { id: 'culture', icon: MapPin, href: '/culture', color: 'from-purple-500 to-pink-500', image: 'https://images.unsplash.com/photo-1661383279161-e2aadb6e8f2e?w=600&q=80' }, // La Laguna streets
  { id: 'nature', icon: TreePine, href: '/nature', color: 'from-green-500 to-emerald-500', image: 'https://images.unsplash.com/photo-1626033005784-e6c39eaa0669?w=600&q=80' }, // Anaga forest Tenerife
  { id: 'food', icon: Utensils, href: '/food', color: 'from-red-500 to-rose-500', image: 'https://images.unsplash.com/photo-1676160423254-1bd3ecfaec16?w=600&q=80' }, // Tenerife wine/food
  { id: 'nightlife', icon: Music, href: '/nightlife', color: 'from-violet-500 to-purple-500', image: 'https://images.unsplash.com/photo-1656252779225-5bbd338acd14?w=600&q=80' }, // Carnaval Tenerife
  { id: 'shopping', icon: ShoppingBag, href: '/shopping', color: 'from-pink-500 to-fuchsia-500', image: 'https://images.unsplash.com/photo-1562038226-76db9be41117?w=600&q=80' }, // La Laguna town
  { id: 'family', icon: Baby, href: '/family', color: 'from-yellow-500 to-orange-500', image: 'https://images.unsplash.com/photo-1611424458342-096fd23fc077?w=600&q=80' }, // Teresitas beach Tenerife
  { id: 'wellness', icon: Sparkles, href: '/wellness', color: 'from-teal-500 to-cyan-500', image: 'https://images.unsplash.com/photo-1594061019010-3e1f4f41c02d?w=600&q=80' }, // Tenerife coast
]

const areas = [
  {
    id: 'south',
    key: 'south',
    image: 'https://images.unsplash.com/photo-1673206212440-797e0e40bd0b?w=1200&q=80', // Costa Adeje Tenerife
    itemCount: 120,
  },
  {
    id: 'north',
    key: 'north',
    image: 'https://images.unsplash.com/photo-1661383279169-82ef95e11d3d?w=1200&q=80', // La Laguna / North Tenerife
    itemCount: 85,
  },
  {
    id: 'west',
    key: 'west',
    image: 'https://images.unsplash.com/photo-1669147951690-658f2e4b4dd3?w=1200&q=80', // Los Gigantes cliffs Tenerife (already correct!)
    itemCount: 45,
  },
  {
    id: 'central',
    key: 'central',
    image: 'https://images.unsplash.com/photo-1545289665-8143f6901607?w=1200&q=80', // Teide / Central Tenerife
    itemCount: 60,
  },
]

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  return {
    title: t('title'),
    description: t('description'),
  }
}

export default function HomePage() {
  const t = useTranslations('home')
  const tc = useTranslations('categories')

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Tenerife Experiences',
    url: 'https://www.tenerifeexperiences.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.tenerifeexperiences.com/en/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Tenerife Experiences',
    url: 'https://www.tenerifeexperiences.com',
    logo: 'https://www.tenerifeexperiences.com/logo.png',
    sameAs: [],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1605182054023-17d71f44aa11?w=1920&q=85"
            alt={t('hero.altImage')}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/30 to-slate-950/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center space-y-8">
            <Badge variant="outline" className="border-orange-400/30 text-orange-400 px-4 py-1 animate-fade-in">
              <MapPin className="h-3 w-3 mr-1" />
              {t('hero.badge')}
            </Badge>

            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight animate-fade-in-up">
              <span className="gradient-text">
                {t('hero.title')}
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg sm:text-xl text-gray-400 leading-relaxed">
              {t('hero.subtitle')}
            </p>

            {/* Search Bar */}
            <HeroSearchBar placeholder={t('hero.searchPlaceholder')} />

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 text-orange-400 fill-orange-400" /> 4.9/5 {t('hero.statsRating')}
              </span>
              <span>150+ {t('hero.statsBeaches')}</span>
              <span>500+ {t('hero.statsExperiences')}</span>
              <span>5 {t('hero.statsLanguages')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">{t('categories.title')}</h2>
            <p className="mt-2 text-gray-400">{t('categories.subtitle')}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 stagger-children">
            {categories.map((cat) => {
              const Icon = cat.icon
              return (
                <Link key={cat.id} href={cat.href}>
                  <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-all duration-300">
                    <img
                      src={cat.image}
                      alt={tc(cat.id)}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/70 transition-all duration-500" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                      <Icon className="h-7 w-7 text-white drop-shadow-lg" />
                      <span className="text-sm font-semibold text-white drop-shadow-lg text-center">
                        {tc(cat.id)}
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Areas Section */}
      <section className="py-20 bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white">{t('areas.title')}</h2>
              <p className="mt-2 text-gray-400">{t('areas.subtitle')}</p>
            </div>
            <Link href="/areas" className="hidden sm:flex items-center text-orange-400 hover:text-orange-300 text-sm font-medium gap-1">
              {t('areas.viewAll')} <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {areas.map((area) => (
              <Link key={area.id} href={`/areas/${area.id}`}>
                <div className="group relative aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer">
                  <img
                    src={area.image}
                    alt={t(`areas.${area.key}`)}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent group-hover:from-black/80 transition-all duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">{t(`areas.${area.key}`)}</h3>
                    <p className="text-sm text-gray-300 mt-1">
                      {area.itemCount}+ {t('areas.experiences')}
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-orange-400 text-sm font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      {t('areas.explore')} <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Partners */}
      <Suspense fallback={null}>
        <FeaturedPartners />
      </Suspense>

      {/* Explore the Map */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">{t('exploreMap.title')}</h2>
            <p className="mt-2 text-gray-400">{t('exploreMap.subtitle')}</p>
          </div>
          <MapSection items={mapPins} />
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/20 p-8 sm:p-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px]" />
            <div className="relative max-w-xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                {t('newsletter.title')}
              </h2>
              <p className="mt-2 text-gray-400">
                {t('newsletter.subtitle')}
              </p>
              <NewsletterForm
                placeholder={t('newsletter.placeholder')}
                ctaText={t('newsletter.cta')}
                privacyText={t('newsletter.privacy')}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
