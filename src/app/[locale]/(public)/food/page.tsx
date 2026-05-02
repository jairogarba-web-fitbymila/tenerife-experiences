import Image from 'next/image'
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
  Utensils,
  Wine,
} from 'lucide-react'
import { t as getLocalizedText, formatRating } from '@/lib/helpers'
import type { Locale } from '@/types/database'
import { buildAlternates } from '@/lib/metadata'

const text = {
  meta: {
    title: { es: 'Dónde comer en Tenerife - Guía gastronómica 2026', en: 'Where to Eat in Tenerife - Food Guide 2026' },
    description: {
      es: 'Descubre los mejores restaurantes, guachinches y platos típicos de Tenerife. Papas arrugadas, mojo, vinos con DO y mucho más.',
      en: 'Discover the best restaurants, guachinches and typical dishes of Tenerife. Papas arrugadas, mojo, DO wines and much more.',
    },
  },
  hero: {
    badge: { es: 'Guía Gastronómica', en: 'Food Guide' },
    title: { es: 'Dónde comer en Tenerife', en: 'Where to eat in Tenerife' },
    subtitle: {
      es: 'Guía completa de gastronomía canaria: platos típicos, restaurantes recomendados, guachinches auténticos y los mejores vinos de la isla.',
      en: 'Complete Canarian gastronomy guide: typical dishes, recommended restaurants, authentic guachinches and the best wines on the island.',
    },
  },
  dishes: {
    title: { es: '10 platos imprescindibles de Tenerife', en: '10 must-try dishes in Tenerife' },
    subtitle: { es: 'La cocina canaria que no puedes perderte', en: 'Canarian cuisine you cannot miss' },
  },
  restaurants: {
    title: { es: 'Restaurantes recomendados', en: 'Recommended restaurants' },
    subtitle: { es: 'Los mejores restaurantes seleccionados por nuestro equipo', en: 'Top restaurants selected by our team' },
  },
  guachinches: {
    title: { es: 'Guachinches', en: 'Guachinches' },
    subtitle: { es: 'La experiencia gastronómica más auténtica de Tenerife', en: 'The most authentic gastronomic experience in Tenerife' },
    explanation: {
      es: 'Los guachinches son establecimientos familiares del norte de Tenerife donde los viticultores sirven su propio vino acompañado de comida casera a precios muy económicos. Son temporales y cambian cada pocos meses, ofreciendo una experiencia única y genuina.',
      en: 'Guachinches are family-run establishments in northern Tenerife where winemakers serve their own wine alongside homemade food at very affordable prices. They are temporary and change every few months, offering a unique and genuine experience.',
    },
  },
  wines: {
    title: { es: 'Vinos de Tenerife', en: 'Wines of Tenerife' },
    subtitle: { es: 'Cinco denominaciones de origen en una sola isla', en: 'Five designations of origin on a single island' },
    intro: {
      es: 'Tenerife es la única isla del mundo con 5 Denominaciones de Origen: Tacoronte-Acentejo, Valle de La Orotava, Ycoden-Daute-Isora, Abona y Valle de Güímar. Sus viñedos, muchos en laderas volcánicas a gran altitud, producen variedades únicas como el Listán Negro y la Malvasía.',
      en: 'Tenerife is the only island in the world with 5 Designations of Origin: Tacoronte-Acentejo, Valle de La Orotava, Ycoden-Daute-Isora, Abona and Valle de Güímar. Its vineyards, many on volcanic slopes at high altitude, produce unique varieties like Listán Negro and Malvasía.',
    },
  },
  faq: {
    title: { es: 'Preguntas frecuentes sobre gastronomía en Tenerife', en: 'Frequently asked questions about food in Tenerife' },
    q1: { es: '¿Qué es un guachinche y cómo encontrar uno?', en: 'What is a guachinche and how to find one?' },
    a1: {
      es: 'Un guachinche es un establecimiento temporal donde los viticultores del norte de Tenerife venden su vino casero con comida tradicional. Se encuentran principalmente en la zona de Tacoronte-Acentejo y La Orotava. La mejor forma de encontrarlos es preguntar a los locales o consultar redes sociales.',
      en: 'A guachinche is a temporary establishment where winemakers from northern Tenerife sell their homemade wine with traditional food. They are mainly found in the Tacoronte-Acentejo and La Orotava areas. The best way to find them is to ask locals or check social media.',
    },
    q2: { es: '¿Cuáles son los platos típicos de Tenerife?', en: 'What are the typical dishes of Tenerife?' },
    a2: {
      es: 'Los platos más representativos son las papas arrugadas con mojo (picón y verde), el gofio escaldado, el sancocho canario, el conejo en salmorejo, la ropa vieja, la carne fiesta, el queso asado con mojo y postres como el bienmesabe y el frangollo.',
      en: 'The most representative dishes are papas arrugadas with mojo (picón and green), gofio escaldado, Canarian sancocho, rabbit in salmorejo, ropa vieja, carne fiesta, grilled cheese with mojo, and desserts like bienmesabe and frangollo.',
    },
    q3: { es: '¿Merece la pena hacer una cata de vinos en Tenerife?', en: 'Is it worth doing a wine tasting in Tenerife?' },
    a3: {
      es: 'Absolutamente. Tenerife tiene 5 Denominaciones de Origen y variedades autóctonas que no encontrarás en ningún otro lugar del mundo. Las bodegas ofrecen catas guiadas con vistas espectaculares a los viñedos volcánicos. Es una experiencia imprescindible para amantes del vino.',
      en: 'Absolutely. Tenerife has 5 Designations of Origin and indigenous varieties you won\'t find anywhere else in the world. Wineries offer guided tastings with spectacular views of the volcanic vineyards. It\'s an essential experience for wine lovers.',
    },
  },
  cta: {
    title: { es: '¿Listo para saborear Tenerife?', en: 'Ready to taste Tenerife?' },
    subtitle: { es: 'Reserva experiencias gastronómicas, catas de vino y tours culinarios', en: 'Book food experiences, wine tastings and culinary tours' },
    button: { es: 'Reservar experiencia', en: 'Book experience' },
  },
  noData: { es: 'Contenido próximamente', en: 'Content coming soon' },
  viewAll: { es: 'Ver todos', en: 'View all' },
}

const PLATOS = [
  { name: 'Papas arrugadas con mojo', desc: { es: 'Papas cocidas con sal marina servidas con mojo picón (rojo) y mojo verde de cilantro.', en: 'Potatoes boiled in sea salt served with red picón mojo and green cilantro mojo.' } },
  { name: 'Mojo canario', desc: { es: 'Salsa emblemática en dos versiones: rojo con pimentón y verde con cilantro o perejil.', en: 'Iconic sauce in two versions: red with paprika and green with cilantro or parsley.' } },
  { name: 'Gofio escaldado', desc: { es: 'Harina de millo tostado mezclada con caldo de pescado, un alimento ancestral guanche.', en: 'Toasted corn flour mixed with fish broth, an ancestral Guanche food.' } },
  { name: 'Sancocho canario', desc: { es: 'Pescado salado (cherne) con papas, batatas, gofio y mojo. Plato de celebración.', en: 'Salted fish (wreckfish) with potatoes, sweet potatoes, gofio and mojo. A celebration dish.' } },
  { name: 'Queso asado con mojo', desc: { es: 'Queso fresco a la plancha bañado en mojo rojo. Entrante clásico de toda guachinchería.', en: 'Grilled fresh cheese topped with red mojo. Classic starter in every guachinche.' } },
  { name: 'Ropa vieja', desc: { es: 'Garbanzos con carne deshilachada, pimientos y tomate. Reconfortante y sabroso.', en: 'Chickpeas with shredded meat, peppers and tomato. Comforting and flavorful.' } },
  { name: 'Conejo en salmorejo', desc: { es: 'Conejo marinado en adobo canario con ajo, pimentón, orégano y vinagre.', en: 'Rabbit marinated in Canarian adobo with garlic, paprika, oregano and vinegar.' } },
  { name: 'Carne fiesta', desc: { es: 'Cerdo adobado frito en tiras, típico de romerías y fiestas populares.', en: 'Marinated fried pork strips, typical of local festivals and pilgrimages.' } },
  { name: 'Bienmesabe', desc: { es: 'Postre de almendra molida, huevo, azúcar y limón. Dulce tradición canaria.', en: 'Dessert of ground almonds, egg, sugar and lemon. Sweet Canarian tradition.' } },
  { name: 'Frangollo', desc: { es: 'Postre de harina de millo con leche, pasas, almendras y canela.', en: 'Corn flour dessert with milk, raisins, almonds and cinnamon.' } },
]

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
    alternates: buildAlternates(locale, '/food'),
  }
}

export default async function GastronomiaPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const supabase = await createClient()
  const loc = locale as Locale

  // Fetch restaurants
  const { data: restaurants } = await supabase
    .from('items')
    .select('*, subcategory:subcategories!inner(slug, category:categories!inner(slug))')
    .eq('visible', true)
    .eq('subcategory.category.slug', 'food')
    .eq('subcategory.slug', 'best-restaurants')
    .order('rating', { ascending: false })
    .limit(6)

  // Fetch guachinches
  const { data: guachinches } = await supabase
    .from('items')
    .select('*, subcategory:subcategories!inner(slug, category:categories!inner(slug))')
    .eq('visible', true)
    .eq('subcategory.category.slug', 'food')
    .eq('subcategory.slug', 'guachinches')
    .order('rating', { ascending: false })
    .limit(6)

  // Fetch wine experiences
  const { data: wineItems } = await supabase
    .from('items')
    .select('*, subcategory:subcategories!inner(slug, category:categories!inner(slug))')
    .eq('visible', true)
    .eq('subcategory.category.slug', 'food')
    .eq('subcategory.slug', 'wine-tasting')
    .order('rating', { ascending: false })
    .limit(6)

  function itemUrl(item: NonNullable<typeof restaurants>[number]) {
    const sub = item.subcategory as { slug: string; category: { slug: string } } | null
    if (sub?.category?.slug && sub?.slug) {
      return `/${sub.category.slug}/${sub.slug}/${item.slug}`
    }
    return '#'
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
          <Image
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=85"
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
              <Utensils className="h-3 w-3 mr-1" />
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

      {/* 10 PLATOS IMPRESCINDIBLES */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <Badge variant="outline" className="border-orange-400/30 text-orange-400 mb-4">
              <Star className="h-3 w-3 mr-1 fill-orange-400" />
              {getLocalizedText(text.dishes.subtitle, loc)}
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              {getLocalizedText(text.dishes.title, loc)}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PLATOS.map((plato, i) => (
              <Card key={plato.name} className="bg-slate-900/50 border-white/5 hover:border-orange-400/20 transition-all duration-300">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-white text-sm font-bold shrink-0">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-white">{plato.name}</h3>
                      <p className="mt-1 text-sm text-gray-400">{getLocalizedText(plato.desc, loc)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* RESTAURANTES RECOMENDADOS */}
      <section className="py-20 bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <Badge variant="outline" className="border-red-400/30 text-red-400 mb-4">
                <Utensils className="h-3 w-3 mr-1" />
                {getLocalizedText(text.restaurants.subtitle, loc)}
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                {getLocalizedText(text.restaurants.title, loc)}
              </h2>
            </div>
            <Link href="/food/best-restaurants" className="hidden sm:flex items-center text-orange-400 hover:text-orange-300 text-sm font-medium gap-1">
              {getLocalizedText(text.viewAll, loc)} <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          {restaurants && restaurants.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurants.map((item) => (
                <Link key={item.id} href={itemUrl(item)}>
                  <Card className="group bg-slate-900/50 border-white/5 hover:border-red-400/20 transition-all duration-300 overflow-hidden h-full cursor-pointer">
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

      {/* GUACHINCHES */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              {getLocalizedText(text.guachinches.title, loc)}
            </h2>
            <p className="mt-3 text-gray-400 max-w-2xl">
              {getLocalizedText(text.guachinches.subtitle, loc)}
            </p>
          </div>
          <div className="mb-10 rounded-2xl bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20 p-6 sm:p-8">
            <p className="text-gray-300 leading-relaxed">
              {getLocalizedText(text.guachinches.explanation, loc)}
            </p>
          </div>
          {guachinches && guachinches.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {guachinches.map((item) => (
                <Link key={item.id} href={itemUrl(item)}>
                  <Card className="group bg-slate-900/50 border-white/5 hover:border-orange-400/20 transition-all duration-300 overflow-hidden h-full cursor-pointer">
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

      {/* VINOS DE TENERIFE */}
      <section className="py-20 bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <Badge variant="outline" className="border-purple-400/30 text-purple-400 mb-4">
              <Wine className="h-3 w-3 mr-1" />
              {getLocalizedText(text.wines.subtitle, loc)}
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              {getLocalizedText(text.wines.title, loc)}
            </h2>
          </div>
          <div className="mb-10 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 p-6 sm:p-8">
            <p className="text-gray-300 leading-relaxed">
              {getLocalizedText(text.wines.intro, loc)}
            </p>
          </div>
          {wineItems && wineItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wineItems.map((item) => (
                <Link key={item.id} href={itemUrl(item)}>
                  <Card className="group bg-slate-900/50 border-white/5 hover:border-purple-400/20 transition-all duration-300 overflow-hidden h-full cursor-pointer">
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
                      <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors">
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

      {/* FAQ */}
      <section className="py-20">
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
