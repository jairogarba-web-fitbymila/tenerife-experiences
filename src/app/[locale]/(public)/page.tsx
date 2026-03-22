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
  ChevronDown,
} from 'lucide-react'
import { FeaturedPartners } from '@/components/home/featured-partners'
import { HeroSearchBar } from '@/components/home/hero-search-bar'
import { MapSection } from '@/components/home/map-section'
import { NewsletterForm } from '@/components/home/newsletter-form'
import { ScrollEffects } from '@/components/cinematic/scroll-effects'

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
  {
    id: 'experiences',
    icon: Camera,
    href: '/experiences',
    image: 'https://images.unsplash.com/photo-1713193160430-a4f8fa3e692f?w=1920&q=85',
    label: 'Adventure Awaits',
    thumbs: [
      'https://images.unsplash.com/photo-1605182054023-17d71f44aa11?w=400&q=80',
      'https://images.unsplash.com/photo-1673206212440-797e0e40bd0b?w=400&q=80',
      'https://images.unsplash.com/photo-1611424458342-096fd23fc077?w=400&q=80',
    ],
  },
  {
    id: 'beaches',
    icon: Waves,
    href: '/beaches',
    image: 'https://images.unsplash.com/photo-1552934084-2590ebf9da25?w=1920&q=85',
    label: 'Golden Sand & Crystal Waters',
    thumbs: [
      'https://images.unsplash.com/photo-1594061019010-3e1f4f41c02d?w=400&q=80',
      'https://images.unsplash.com/photo-1611424458342-096fd23fc077?w=400&q=80',
      'https://images.unsplash.com/photo-1669147951690-658f2e4b4dd3?w=400&q=80',
    ],
  },
  {
    id: 'culture',
    icon: MapPin,
    href: '/culture',
    image: 'https://images.unsplash.com/photo-1661383279161-e2aadb6e8f2e?w=1920&q=85',
    label: 'Heritage & History',
    thumbs: [
      'https://images.unsplash.com/photo-1661383279161-e2aadb6e8f2e?w=400&q=80',
      'https://images.unsplash.com/photo-1656252779225-5bbd338acd14?w=400&q=80',
      'https://images.unsplash.com/photo-1673206212440-797e0e40bd0b?w=400&q=80',
    ],
  },
  {
    id: 'nature',
    icon: TreePine,
    href: '/nature',
    image: 'https://images.unsplash.com/photo-1626033005784-e6c39eaa0669?w=1920&q=85',
    label: 'Wild & Untamed',
    thumbs: [
      'https://images.unsplash.com/photo-1626033005784-e6c39eaa0669?w=400&q=80',
      'https://images.unsplash.com/photo-1669147951690-658f2e4b4dd3?w=400&q=80',
      'https://images.unsplash.com/photo-1713193160430-a4f8fa3e692f?w=400&q=80',
    ],
  },
  {
    id: 'food',
    icon: Utensils,
    href: '/food',
    image: 'https://images.unsplash.com/photo-1676160423254-1bd3ecfaec16?w=1920&q=85',
    label: 'Culinary Delights',
    thumbs: [
      'https://images.unsplash.com/photo-1676160423254-1bd3ecfaec16?w=400&q=80',
      'https://images.unsplash.com/photo-1552934084-2590ebf9da25?w=400&q=80',
      'https://images.unsplash.com/photo-1673206212440-797e0e40bd0b?w=400&q=80',
    ],
  },
  {
    id: 'nightlife',
    icon: Music,
    href: '/nightlife',
    image: 'https://images.unsplash.com/photo-1656252779225-5bbd338acd14?w=1920&q=85',
    label: 'After Dark Magic',
    thumbs: [
      'https://images.unsplash.com/photo-1656252779225-5bbd338acd14?w=400&q=80',
      'https://images.unsplash.com/photo-1673206212440-797e0e40bd0b?w=400&q=80',
      'https://images.unsplash.com/photo-1605182054023-17d71f44aa11?w=400&q=80',
    ],
  },
]

const areas = [
  {
    id: 'south',
    key: 'south',
    image: 'https://images.unsplash.com/photo-1673206212440-797e0e40bd0b?w=1200&q=80',
    itemCount: 120,
  },
  {
    id: 'north',
    key: 'north',
    image: 'https://images.unsplash.com/photo-1661383279169-82ef95e11d3d?w=1200&q=80',
    itemCount: 85,
  },
  {
    id: 'west',
    key: 'west',
    image: 'https://images.unsplash.com/photo-1669147951690-658f2e4b4dd3?w=1200&q=80',
    itemCount: 45,
  },
  {
    id: 'central',
    key: 'central',
    image: 'https://images.unsplash.com/photo-1713193160430-a4f8fa3e692f?w=1200&q=80',
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
      <ScrollEffects />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />

      {/* ===== HERO: Full-screen cinematic ===== */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden -mt-16">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1605182054023-17d71f44aa11?w=1920&q=85"
            alt={t('hero.altImage')}
            className="w-full h-full object-cover animate-ken-burns"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/20 to-slate-950/60" />
        </div>

        <div className="relative z-10 text-center space-y-6 px-4 animate-fade-in-up">
          <h1 className="text-[clamp(2.5rem,8vw,5.5rem)] font-extrabold tracking-tight leading-[1.1] text-white drop-shadow-xl">
            {t('hero.title')}
          </h1>
          <p className="text-[clamp(1rem,2.5vw,1.3rem)] font-light tracking-wide text-white/80 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>

          <HeroSearchBar placeholder={t('hero.searchPlaceholder')} />

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-white/50">
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 text-orange-400 fill-orange-400" /> 4.9/5 {t('hero.statsRating')}
            </span>
            <span>150+ {t('hero.statsBeaches')}</span>
            <span>500+ {t('hero.statsExperiences')}</span>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-down text-white/40">
          <ChevronDown className="h-6 w-6" />
        </div>
      </section>

      {/* ===== CINEMATIC CATEGORY SECTIONS ===== */}
      <div className="relative z-10">
        {categories.map((cat, i) => {
          const isAlt = i % 2 !== 0
          return (
            <section
              key={cat.id}
              className="cinematic-section h-[70vh] min-h-[500px] md:min-h-[600px] flex items-center border-b border-orange-500/10"
            >
              {/* Background */}
              <div
                className="cinematic-bg"
                data-parallax
                style={{ backgroundImage: `url('${cat.image}')` }}
              />
              <div className="cinematic-overlay" />

              {/* Content */}
              <div className={`relative z-10 w-full flex items-center px-6 md:px-12 lg:px-16 ${isAlt ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-lg ${isAlt ? 'text-right' : 'text-left'} reveal`}>
                  <span className="inline-block text-xs sm:text-sm font-bold tracking-[3px] text-orange-400 uppercase mb-3">
                    {cat.label}
                  </span>
                  <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold tracking-tight leading-[1.15] text-white mb-4">
                    {tc(cat.id)}
                  </h2>
                  <Link
                    href={cat.href}
                    className={`inline-flex items-center gap-2 text-orange-400 font-semibold hover:gap-3 transition-all duration-300 ${isAlt ? 'flex-row-reverse' : ''}`}
                  >
                    {isAlt ? <ArrowRight className="h-4 w-4 rotate-180" /> : null}
                    <span>{t('categories.explore') || 'Explore'}</span>
                    {!isAlt ? <ArrowRight className="h-4 w-4" /> : null}
                  </Link>
                </div>
              </div>

              {/* Thumbnails (desktop) */}
              <div
                className={`hidden lg:flex absolute top-1/2 -translate-y-1/2 flex-col gap-4 z-20 ${isAlt ? 'left-12' : 'right-12'}`}
              >
                {cat.thumbs.map((thumb, j) => (
                  <div
                    key={j}
                    className="w-[100px] h-[100px] xl:w-[120px] xl:h-[120px] rounded-lg overflow-hidden shadow-2xl border-2 border-transparent hover:border-orange-500/50 hover:scale-105 transition-all duration-300 cursor-pointer"
                  >
                    <img src={thumb} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                ))}
              </div>

              {/* Thumbnails (mobile) */}
              <div className={`flex lg:hidden absolute top-4 left-4 gap-2 z-20`}>
                {cat.thumbs.map((thumb, j) => (
                  <div
                    key={j}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border-2 border-white/20 shadow-lg flex-shrink-0"
                  >
                    <img src={thumb} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                ))}
              </div>
            </section>
          )
        })}
      </div>

      {/* ===== AREAS SECTION ===== */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10 md:mb-14 reveal">
            <div>
              <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-extrabold tracking-tight text-white">
                {t('areas.title')}
              </h2>
              <p className="mt-2 text-gray-400 text-base sm:text-lg">{t('areas.subtitle')}</p>
            </div>
            <Link href="/areas" className="hidden sm:flex items-center text-orange-400 hover:text-orange-300 text-sm font-medium gap-1">
              {t('areas.viewAll')} <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
            {areas.map((area) => (
              <Link key={area.id} href={`/areas/${area.id}`}>
                <div className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer reveal">
                  <img
                    src={area.image}
                    alt={t(`areas.${area.key}`)}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent group-hover:from-black/80 transition-all duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                      {t(`areas.${area.key}`)}
                    </h3>
                    <p className="text-sm text-gray-300 mt-1">
                      {area.itemCount}+ {t('areas.experiences')}
                    </p>
                    <div className="mt-2 flex items-center gap-1 text-orange-400 text-sm font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
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
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 reveal">
            <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-extrabold text-white">{t('exploreMap.title')}</h2>
            <p className="mt-2 text-gray-400">{t('exploreMap.subtitle')}</p>
          </div>
          <MapSection items={mapPins} />
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 md:py-24 border-t border-orange-500/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500/15 to-amber-500/10 border border-orange-500/20 p-8 sm:p-12 reveal">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px]" />
            <div className="relative max-w-xl mx-auto text-center sm:text-left sm:mx-0">
              <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-extrabold text-white">
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
