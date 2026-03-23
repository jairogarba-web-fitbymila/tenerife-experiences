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
import { ReviewSection } from '@/components/review/review-panel'
import { CategorySections } from '@/components/home/category-sections'

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
      { image: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=1200&q=80', href: '/experiences/top-experiences', labelKey: 'Top Experiencias' },
      { image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80', href: '/experiences/water-sports', labelKey: 'Deportes Acuáticos' },
      { image: 'https://images.unsplash.com/photo-1626033005784-e6c39eaa0669?w=400&q=80', href: '/experiences/day-trips', labelKey: 'Excursiones' },
    ],
  },
  {
    id: 'beaches',
    icon: Waves,
    href: '/beaches',
    image: 'https://images.unsplash.com/photo-1605182054023-17d71f44aa11?w=1920&q=85',
    label: 'Golden Sand & Crystal Waters',
    thumbs: [
      { image: 'https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=1200&q=80', href: '/beaches/best-beaches', labelKey: 'Mejores Playas' },
      { image: 'https://images.unsplash.com/photo-1731845811185-4d9ee26dadb8?w=400&q=80', href: '/beaches/north-beaches', labelKey: 'Playas del Norte' },
      { image: 'https://images.unsplash.com/photo-1762163121634-1525b4b3a90d?w=400&q=80', href: '/beaches/south-beaches', labelKey: 'Playas del Sur' },
    ],
  },
  {
    id: 'culture',
    icon: MapPin,
    href: '/culture',
    image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=1920&q=85',
    label: 'Heritage & History',
    thumbs: [
      { image: 'https://images.unsplash.com/photo-1501108056461-7a7500ddf38c?w=1200&q=80', href: '/culture/historic-towns', labelKey: 'Pueblos Históricos' },
      { image: 'https://images.unsplash.com/photo-1718563301211-65e9702765e4?w=400&q=80', href: '/culture/guanche-heritage', labelKey: 'Herencia Guanche' },
      { image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=400&q=80', href: '/culture/museums', labelKey: 'Museos' },
    ],
  },
  {
    id: 'nature',
    icon: TreePine,
    href: '/nature',
    image: 'https://images.unsplash.com/photo-1626033005784-e6c39eaa0669?w=1920&q=85',
    label: 'Wild & Untamed',
    thumbs: [
      { image: 'https://images.unsplash.com/photo-1626033005784-e6c39eaa0669?w=1200&q=80', href: '/nature/hiking-trails', labelKey: 'Senderismo' },
      { image: 'https://images.unsplash.com/photo-1718042416616-e03e7f56bf4b?w=400&q=80', href: '/nature/teide-national-park', labelKey: 'Parque del Teide' },
      { image: 'https://images.unsplash.com/photo-1665472832792-16160f9fce2e?w=400&q=80', href: '/nature/miradores', labelKey: 'Miradores' },
    ],
  },
  {
    id: 'food',
    icon: Utensils,
    href: '/food',
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1920&q=85',
    label: 'Culinary Delights',
    thumbs: [
      { image: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=1200&q=80', href: '/food/best-restaurants', labelKey: 'Restaurantes' },
      { image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80', href: '/food/guachinches', labelKey: 'Guachinches' },
      { image: 'https://images.unsplash.com/photo-1596107034599-ffdda4c9bb21?w=400&q=80', href: '/food/canarian-cuisine', labelKey: 'Cocina Canaria' },
    ],
  },
  {
    id: 'nightlife',
    icon: Music,
    href: '/nightlife',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1920&q=85',
    label: 'After Dark Magic',
    thumbs: [
      { image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', href: '/nightlife/beach-clubs', labelKey: 'Beach Clubs' },
      { image: 'https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?w=800', href: '/nightlife/clubs', labelKey: 'Discotecas' },
      { image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&q=80', href: '/nightlife/festivals', labelKey: 'Festivales' },
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
    id: 'metro',
    key: 'metro',
    image: 'https://images.unsplash.com/photo-1580309237429-661ea0218972?w=1200&q=80',
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
      <ReviewSection page="landing" sectionId="hero" sectionLabel="Hero">
        <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
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
      </ReviewSection>

      {/* ===== CINEMATIC CATEGORY SECTIONS ===== */}
      <CategorySections categories={categories.map(({ icon, ...rest }) => rest)} />

      {/* ===== AREAS SECTION ===== */}
      <ReviewSection page="landing" sectionId="areas" sectionLabel="Zonas">
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
      </ReviewSection>

      {/* Featured Partners */}
      <Suspense fallback={null}>
        <FeaturedPartners />
      </Suspense>

      {/* Explore the Map */}
      <ReviewSection page="landing" sectionId="map" sectionLabel="Mapa">
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 reveal">
            <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-extrabold text-white">{t('exploreMap.title')}</h2>
            <p className="mt-2 text-gray-400">{t('exploreMap.subtitle')}</p>
          </div>
          <MapSection items={mapPins} />
        </div>
      </section>
      </ReviewSection>

      {/* Newsletter */}
      <ReviewSection page="landing" sectionId="newsletter" sectionLabel="Newsletter">
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
      </ReviewSection>
    </>
  )
}
