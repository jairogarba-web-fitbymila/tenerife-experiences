import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import { ScrollEffects } from '@/components/cinematic/scroll-effects'
import { ReviewSection } from '@/components/review/review-panel'
import { GuideNotifyForm } from '@/components/guides/guide-notify-form'
import { BuyGuideButton } from '@/components/guides/buy-guide-button'
import { BookOpen, UtensilsCrossed, Waves, Mountain, Heart, Baby, Moon, Package } from 'lucide-react'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'guides' })
  return {
    title: t('meta.title'),
    description: t('meta.description'),
  }
}

const guides = [
  {
    id: 'foodie',
    icon: UtensilsCrossed,
    color: 'from-orange-500 to-amber-500',
    accent: 'orange',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    price: '9.90',
    status: 'coming_soon' as const,
    pages: '50+',
  },
  {
    id: 'beaches',
    icon: Waves,
    color: 'from-cyan-500 to-blue-500',
    accent: 'cyan',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    price: '7.90',
    status: 'planned' as const,
    pages: '40+',
  },
  {
    id: 'adventure',
    icon: Mountain,
    color: 'from-emerald-500 to-green-600',
    accent: 'emerald',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    price: '7.90',
    status: 'planned' as const,
    pages: '40+',
  },
  {
    id: 'romantic',
    icon: Heart,
    color: 'from-rose-500 to-pink-500',
    accent: 'rose',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    price: '5.90',
    status: 'planned' as const,
    pages: '30+',
  },
  {
    id: 'family',
    icon: Baby,
    color: 'from-violet-500 to-purple-500',
    accent: 'violet',
    image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80',
    price: '7.90',
    status: 'planned' as const,
    pages: '40+',
  },
  {
    id: 'nightlife',
    icon: Moon,
    color: 'from-indigo-500 to-blue-600',
    accent: 'indigo',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80',
    price: '5.90',
    status: 'planned' as const,
    pages: '30+',
  },
]

const bundle = {
  id: 'bible',
  icon: Package,
  color: 'from-orange-500 via-rose-500 to-violet-500',
  image: 'https://images.unsplash.com/photo-1605182054023-17d71f44aa11?w=1920&q=85',
  price: '19.90',
  originalPrice: '44.50',
}

export default async function GuidesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'guides' })

  return (
    <>
      <ScrollEffects />

      {/* Hero Section */}
      <ReviewSection page="guides" sectionId="guides-hero" sectionLabel="Hero: Guías">
        <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1605182054023-17d71f44aa11?w=1920&q=85"
              alt="Tenerife"
              className="w-full h-full object-cover animate-ken-burns"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/30 to-slate-950/80" />
          </div>

          <div className="relative z-10 text-center px-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-300 text-sm font-medium mb-6">
              <BookOpen className="h-4 w-4" />
              {t('hero.badge')}
            </div>
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white mb-6 tracking-tight drop-shadow-xl">
              {t('hero.title')}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto drop-shadow-lg">
              {t('hero.subtitle')}
            </p>
          </div>
        </section>
      </ReviewSection>

      {/* Guides Grid */}
      <ReviewSection page="guides" sectionId="guides-grid" sectionLabel="Grid: Guías">
        <section className="py-16 sm:py-24 bg-slate-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            {/* Section header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                {t('section.title')}
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                {t('section.subtitle')}
              </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {guides.map((guide) => {
                const Icon = guide.icon
                return (
                  <div
                    key={guide.id}
                    className="group relative overflow-hidden rounded-2xl bg-slate-900/50 border border-white/5 hover:border-orange-500/30 transition-all duration-500"
                  >
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={guide.image}
                        alt={t(`items.${guide.id}.title`)}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                      {/* Status badge */}
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                          guide.status === 'coming_soon'
                            ? 'bg-orange-500/90 text-white'
                            : 'bg-white/10 text-gray-300 backdrop-blur-sm border border-white/10'
                        }`}>
                          {t(`status.${guide.status}`)}
                        </span>
                      </div>

                      {/* Icon */}
                      <div className="absolute bottom-4 left-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${guide.color} flex items-center justify-center shadow-lg`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                        {t(`items.${guide.id}.title`)}
                      </h3>
                      <p className="text-sm text-gray-400 mb-4 line-clamp-3">
                        {t(`items.${guide.id}.description`)}
                      </p>

                      {/* Meta + Buy */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span>{guide.pages} {t('pages')}</span>
                          <span>•</span>
                          <span>PDF</span>
                        </div>
                        <BuyGuideButton
                          guideId={guide.id}
                          price={guide.price}
                          disabled={guide.status !== 'available'}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </ReviewSection>

      {/* Bundle Section */}
      <ReviewSection page="guides" sectionId="guides-bundle" sectionLabel="Bundle: La Biblia">
        <section className="py-16 sm:py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl border border-orange-500/20 bg-slate-900/80 backdrop-blur">
              {/* Background gradient glow */}
              <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />

              <div className="relative grid md:grid-cols-2 gap-8 p-8 sm:p-12">
                {/* Left: info */}
                <div className="flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-300 text-xs font-bold uppercase tracking-wider mb-6 w-fit">
                    {t('bundle.badge')}
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
                    {t('bundle.title')}
                  </h2>
                  <p className="text-gray-400 mb-8">
                    {t('bundle.description')}
                  </p>

                  {/* What's included */}
                  <ul className="space-y-3 mb-8">
                    {guides.map((guide) => {
                      const Icon = guide.icon
                      return (
                        <li key={guide.id} className="flex items-center gap-3 text-sm text-gray-300">
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${guide.color} flex items-center justify-center flex-shrink-0`}>
                            <Icon className="h-4 w-4 text-white" />
                          </div>
                          {t(`items.${guide.id}.title`)}
                        </li>
                      )
                    })}
                  </ul>

                  {/* Pricing */}
                  <div className="flex items-end gap-3 mb-6">
                    <span className="text-4xl font-black text-white">{bundle.price}€</span>
                    <span className="text-lg text-gray-500 line-through mb-1">{bundle.originalPrice}€</span>
                    <span className="px-2 py-1 rounded-md bg-green-500/20 text-green-400 text-xs font-bold mb-1">
                      {t('bundle.save')}
                    </span>
                  </div>

                  {/* Buy bundle button */}
                  <BuyGuideButton
                    guideId="bible"
                    price={bundle.price}
                    disabled
                    className="w-full justify-center text-base py-3"
                  />
                </div>

                {/* Right: image composition */}
                <div className="relative hidden md:flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-3 transform rotate-2">
                    {guides.slice(0, 4).map((guide) => (
                      <div key={guide.id} className="rounded-xl overflow-hidden shadow-2xl border border-white/10">
                        <img
                          src={guide.image}
                          alt={t(`items.${guide.id}.title`)}
                          className="w-full h-32 object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ReviewSection>

      {/* Newsletter / Notify Section */}
      <ReviewSection page="guides" sectionId="guides-notify" sectionLabel="Notificaciones">
        <section className="py-16 sm:py-20 bg-slate-950">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              {t('notify.title')}
            </h2>
            <p className="text-gray-400 mb-8">
              {t('notify.subtitle')}
            </p>
            <GuideNotifyForm
              placeholder={t('notify.placeholder')}
              buttonText={t('notify.button')}
            />
          </div>
        </section>
      </ReviewSection>
    </>
  )
}
