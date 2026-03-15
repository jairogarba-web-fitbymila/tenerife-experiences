import { getTranslations } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import { Link } from '@/i18n/routing'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ChevronRight } from 'lucide-react'
import { Breadcrumbs } from '@/components/shared/breadcrumbs'
import { t as getLocalizedText } from '@/lib/helpers'
import type { Locale } from '@/types/database'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>
}) {
  const { locale, category } = await params
  const supabase = await createClient()

  const { data: cat } = await supabase
    .from('categories')
    .select('name, description')
    .eq('slug', category)
    .single()

  if (!cat) return { title: 'Category' }

  return {
    title: getLocalizedText(cat.name, locale as Locale),
    description: getLocalizedText(cat.description, locale as Locale),
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>
}) {
  const { locale, category } = await params
  const supabase = await createClient()
  const t = await getTranslations({ locale, namespace: 'common' })

  // Fetch category
  const { data: cat } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', category)
    .single()

  if (!cat) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-white">{t('notFound')}</h1>
        <Link href="/" className="mt-4 text-orange-400 hover:text-orange-300">
          {t('backHome')}
        </Link>
      </div>
    )
  }

  // Fetch subcategories
  const { data: subcategories } = await supabase
    .from('subcategories')
    .select('*, items:items(count)')
    .eq('category_id', cat.id)
    .eq('visible', true)
    .order('sort_order')

  const categoryName = getLocalizedText(cat.name, locale as Locale)

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Breadcrumbs items={[{ label: categoryName }]} />
          </div>
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-white">
              {getLocalizedText(cat.name, locale as Locale)}
            </h1>
            <p className="mt-4 text-lg text-gray-400 leading-relaxed">
              {getLocalizedText(cat.description, locale as Locale)}
            </p>
          </div>
        </div>
      </section>

      {/* Subcategories Grid */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subcategories?.map((sub) => (
              <Link key={sub.id} href={`/${category}/${sub.slug}`}>
                <Card className="group bg-slate-900/50 border-white/5 hover:border-orange-400/30 transition-all duration-300 h-full cursor-pointer">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-semibold text-white group-hover:text-orange-400 transition-colors">
                        {getLocalizedText(sub.name, locale as Locale)}
                      </h3>
                      <ChevronRight className="h-5 w-5 text-gray-600 group-hover:text-orange-400 transition-colors shrink-0 mt-0.5" />
                    </div>
                    <p className="mt-2 text-sm text-gray-400 leading-relaxed flex-1">
                      {getLocalizedText(sub.description, locale as Locale)}
                    </p>
                    {sub.items?.[0]?.count > 0 && (
                      <Badge
                        variant="outline"
                        className="mt-4 w-fit border-white/10 text-gray-500 text-xs"
                      >
                        {sub.items[0].count} items
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {(!subcategories || subcategories.length === 0) && (
            <div className="text-center py-12">
              <p className="text-gray-500">{t('noResults')}</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
