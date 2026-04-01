import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import { Link } from '@/i18n/routing'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin } from 'lucide-react'
import { t as getLocalizedText } from '@/lib/helpers'
import type { Locale } from '@/types/database'

const REGION_LABELS: Record<string, Record<string, string>> = {
  north: { es: 'Norte', en: 'North', de: 'Norden' },
  south: { es: 'Sur', en: 'South', de: 'Süden' },
  east: { es: 'Este', en: 'East', de: 'Osten' },
  west: { es: 'Oeste', en: 'West', de: 'Westen' },
  central: { es: 'Centro', en: 'Central', de: 'Zentral' },
}

const REGION_COLORS: Record<string, string> = {
  north: 'border-blue-400/30 text-blue-400',
  south: 'border-orange-400/30 text-orange-400',
  east: 'border-emerald-400/30 text-emerald-400',
  west: 'border-purple-400/30 text-purple-400',
  central: 'border-amber-400/30 text-amber-400',
}

const REGION_GRADIENT: Record<string, string> = {
  north: 'from-blue-500/10 to-transparent',
  south: 'from-orange-500/10 to-transparent',
  east: 'from-emerald-500/10 to-transparent',
  west: 'from-purple-500/10 to-transparent',
  central: 'from-amber-500/10 to-transparent',
}

const REGION_ORDER = ['north', 'south', 'west', 'central', 'east']

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'areas' })
  return {
    title: t('title'),
    description: t('subtitle'),
  }
}

export default async function AreasPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const supabase = await createClient()
  const t = await getTranslations({ locale, namespace: 'areas' })
  const tc = await getTranslations({ locale, namespace: 'common' })
  const loc = locale as Locale

  const { data: areas } = await supabase
    .from('areas')
    .select('*')
    .order('name->>en')

  // Group by region
  const areasByRegion: Record<string, typeof areas> = {}
  areas?.forEach((area) => {
    const region = area.region || 'central'
    if (!areasByRegion[region]) areasByRegion[region] = []
    areasByRegion[region]!.push(area)
  })

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="outline" className="border-orange-400/30 text-orange-400 mb-4">
              <MapPin className="h-3 w-3 mr-1" />
              Tenerife
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-white">
              {t('title')}
            </h1>
            <p className="mt-4 text-lg text-gray-400 leading-relaxed">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Areas by Region */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {REGION_ORDER
            .filter((region) => areasByRegion[region] && areasByRegion[region]!.length > 0)
            .map((region) => (
              <div key={region} className="mb-16">
                {/* Region Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br ${REGION_GRADIENT[region]} border border-white/5`}>
                    <MapPin className={`h-5 w-5 ${REGION_COLORS[region]?.split(' ')[1] || 'text-gray-400'}`} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {REGION_LABELS[region]?.[locale] || REGION_LABELS[region]?.en || region}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {areasByRegion[region]?.length}{' '}
                      {locale === 'es' ? 'zonas' : locale === 'de' ? 'Gebiete' : 'areas'}
                    </p>
                  </div>
                </div>

                {/* Areas Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {areasByRegion[region]?.map((area) => (
                    <Link key={area.id} href={`/areas/${area.slug}`}>
                      <Card className="group bg-slate-900/50 border-white/5 hover:border-orange-400/20 transition-all duration-300 overflow-hidden h-full cursor-pointer">
                        {area.image && (
                          <div className="relative aspect-[16/9] overflow-hidden">
                            <Image
                              src={area.image}
                              alt={getLocalizedText(area.name, loc)}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                        )}
                        <CardContent className="p-5">
                          <div className="flex items-center gap-2 mb-3">
                            <Badge
                              variant="outline"
                              className={`text-xs ${REGION_COLORS[area.region] || ''}`}
                            >
                              {REGION_LABELS[area.region]?.[locale] || area.region}
                            </Badge>
                          </div>
                          <h3 className="text-lg font-semibold text-white group-hover:text-orange-400 transition-colors">
                            {getLocalizedText(area.name, loc)}
                          </h3>
                          <p className="mt-2 text-sm text-gray-400 line-clamp-3">
                            {getLocalizedText(area.description, loc)}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            ))}

          {(!areas || areas.length === 0) && (
            <div className="text-center py-20">
              <MapPin className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">{tc('noResults')}</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
