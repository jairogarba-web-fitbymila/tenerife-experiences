import { createClient } from '@/lib/supabase/server'
import { getTranslations, getLocale } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  ExternalLink,
  ShieldCheck,
  Crown,
  MapPin,
  ArrowRight,
  Building2,
  UtensilsCrossed,
  Hotel,
  ShoppingBag,
  Wrench,
} from 'lucide-react'
import type { Partner, Locale } from '@/types/database'

const typeIcons: Record<string, typeof Building2> = {
  restaurant: UtensilsCrossed,
  hotel: Hotel,
  operator: Building2,
  shop: ShoppingBag,
  service: Wrench,
}

const typeColors: Record<string, string> = {
  restaurant: 'bg-red-500/20 text-red-400 border-red-500/30',
  hotel: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  operator: 'bg-green-500/20 text-green-400 border-green-500/30',
  shop: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  service: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
}

export async function FeaturedPartners() {
  const supabase = await createClient()
  const locale = (await getLocale()) as Locale
  const t = await getTranslations('partners')

  const { data: partners } = await supabase
    .from('partners')
    .select('*')
    .eq('featured', true)
    .eq('visible', true)
    .order('plan', { ascending: false })
    .limit(6)

  if (!partners || partners.length === 0) {
    return null
  }

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-px w-8 bg-orange-500" />
              <span className="text-sm font-medium text-orange-400 uppercase tracking-wider">
                {t('trustedPartners')}
              </span>
            </div>
            <h2 className="text-3xl font-bold text-white">
              {t('featuredTitle')}
            </h2>
            <p className="mt-2 text-gray-400">
              {t('featuredSubtitle')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(partners as Partner[]).map((partner) => {
            const TypeIcon = typeIcons[partner.type] || Building2
            const description =
              partner.description?.[locale] ||
              partner.description?.en ||
              ''

            const localBusinessJsonLd = {
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: partner.name,
              ...(partner.address && {
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: partner.address,
                  addressRegion: 'Tenerife',
                  addressCountry: 'ES',
                },
              }),
              ...(partner.phone && { telephone: partner.phone }),
              ...(partner.website && { url: partner.website }),
              ...(partner.image && { image: partner.image }),
              ...(partner.area && {
                areaServed: partner.area.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
              }),
            }

            return (
              <Card
                key={partner.id}
                className="group bg-slate-900/50 border-white/5 hover:border-white/20 transition-all duration-300 overflow-hidden"
              >
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
                />
                {/* Image / Logo Header */}
                <div className="relative h-40 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
                  {partner.image ? (
                    <img
                      src={partner.image}
                      alt={partner.name}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                  ) : partner.logo ? (
                    <div className="flex items-center justify-center h-full">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-h-20 max-w-[60%] object-contain"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <TypeIcon className="h-12 w-12 text-gray-600" />
                    </div>
                  )}

                  {/* Badges overlay */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge
                      variant="outline"
                      className={`text-xs ${typeColors[partner.type] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'}`}
                    >
                      <TypeIcon className="h-3 w-3 mr-1" />
                      {partner.type.charAt(0).toUpperCase() + partner.type.slice(1)}
                    </Badge>
                  </div>

                  {partner.plan === 'premium' && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 text-xs shadow-lg">
                        <Crown className="h-3 w-3 mr-1" />
                        {t('premium')}
                      </Badge>
                    </div>
                  )}

                  {partner.plan === 'basic' && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 text-xs shadow-lg">
                        <ShieldCheck className="h-3 w-3 mr-1" />
                        {t('verified')}
                      </Badge>
                    </div>
                  )}
                </div>

                <CardContent className="p-5 space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-orange-400 transition-colors">
                      {partner.name}
                    </h3>
                    {partner.area && (
                      <p className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                        <MapPin className="h-3 w-3" />
                        {partner.area.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                      </p>
                    )}
                  </div>

                  {description && (
                    <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
                      {description}
                    </p>
                  )}

                  {partner.website && (
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-orange-400 hover:text-orange-300 transition-colors"
                    >
                      {t('visitWebsite')}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20">
            <p className="text-lg font-medium text-white">
              {t('ctaQuestion')}
            </p>
            <Link href="/partners">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 rounded-xl">
                {t('becomePartner')}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
