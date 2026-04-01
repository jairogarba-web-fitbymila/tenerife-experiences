import { Link } from '@/i18n/routing'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Plane,
  Ship,
  Sun,
  Cloud,
  MapPin,
  Car,
  Bus,
  Smartphone,
  DollarSign,
  HelpCircle,
  ArrowRight,
  Thermometer,
  Droplets,
  TreePine,
  Compass,
} from 'lucide-react'

const content = {
  es: {
    meta: {
      title: 'Cómo organizar tu viaje a Tenerife | Guía completa 2026',
      description: 'Guía completa para planificar tu viaje a Tenerife: vuelos, alojamiento, transporte, presupuesto y consejos prácticos para disfrutar de la isla.',
    },
    hero: {
      badge: 'Guía de viaje',
      title: 'Cómo organizar tu viaje a Tenerife',
      subtitle: 'Todo lo que necesitas saber para planificar unas vacaciones perfectas en la isla más grande de las Canarias.',
    },
    arrival: {
      title: 'Cómo llegar a Tenerife',
      subtitle: 'Tenerife cuenta con dos aeropuertos y conexiones en ferry desde la península.',
      airports: {
        title: 'Aeropuertos',
        tfs: {
          name: 'Tenerife Sur (TFS) - Reina Sofía',
          desc: 'Principal aeropuerto para vuelos internacionales y chárter. Situado en el sur de la isla, cerca de las zonas turísticas de Los Cristianos, Playa de las Américas y Costa Adeje.',
        },
        tfn: {
          name: 'Tenerife Norte (TFN) - Los Rodeos',
          desc: 'Aeropuerto para vuelos nacionales y conexiones interinsulares. Ubicado cerca de Santa Cruz y La Laguna.',
        },
      },
      ferries: {
        title: 'Ferries',
        desc: 'Fred Olsen y Naviera Armas operan rutas desde Huelva y Cádiz (península) con travesías de 30-36 horas. También hay conexiones rápidas entre islas (Gran Canaria, La Gomera, La Palma, El Hierro).',
      },
    },
    weather: {
      title: 'Mejor época para visitar',
      subtitle: 'Tenerife disfruta de un clima primaveral todo el año. El sur es más seco y soleado; el norte más verde y húmedo.',
    },
    accommodation: {
      title: 'Dónde alojarse',
      subtitle: 'El norte y el sur ofrecen experiencias muy diferentes.',
      north: {
        title: 'Norte de Tenerife',
        pros: ['Naturaleza exuberante y paisajes verdes', 'Precios más económicos', 'Gastronomía local auténtica', 'Menos masificado'],
        cons: ['Más nublado y lluvioso', 'Playas volcánicas (arena negra)', 'Menos vida nocturna'],
        areas: 'Puerto de la Cruz, La Orotava, Icod de los Vinos',
      },
      south: {
        title: 'Sur de Tenerife',
        pros: ['Sol casi garantizado', 'Playas de arena dorada', 'Gran oferta de ocio nocturno', 'Más infraestructura turística'],
        cons: ['Precios más elevados', 'Más masificación turística', 'Paisaje más árido'],
        areas: 'Costa Adeje, Playa de las Américas, Los Cristianos, El Médano',
      },
    },
    transport: {
      title: 'Transporte en la isla',
      subtitle: 'Opciones para moverse por Tenerife.',
      options: [
        {
          title: 'Alquiler de coche',
          desc: 'La mejor opción para explorar la isla con libertad. Desde 20-35€/día. Reserva con antelación en temporada alta. Empresas: Cicar, Autoreisen, TopCar.',
          icon: 'car',
        },
        {
          title: 'Guaguas (TITSA)',
          desc: 'Red de autobuses que conecta toda la isla. Tarjeta TenMás con descuentos. Líneas principales: 110 (TFS-Santa Cruz), 343 (Costa Adeje-Puerto de la Cruz).',
          icon: 'bus',
        },
        {
          title: 'Tranvía',
          desc: 'Dos líneas que conectan Santa Cruz con La Laguna. Frecuencia cada 5-10 minutos. Ideal para moverse entre ambas ciudades.',
          icon: 'compass',
        },
        {
          title: 'Taxi',
          desc: 'Disponibles en toda la isla. Tarifa regulada. Aeropuerto Sur a Costa Adeje: ~30€. Aeropuerto Norte a Santa Cruz: ~15€. Apps: PideTaxi.',
          icon: 'mappin',
        },
      ],
    },
    budget: {
      title: 'Presupuesto diario',
      subtitle: 'Estimación de gastos por persona y día en Tenerife.',
      levels: [
        {
          name: 'Mochilero',
          range: '40-60€',
          color: 'from-green-500 to-emerald-500',
          items: ['Hostel o apartamento compartido', 'Comida en supermercado/guachinches', 'Transporte público (TITSA)', 'Playas y senderismo gratis'],
        },
        {
          name: 'Medio',
          range: '80-120€',
          color: 'from-blue-500 to-cyan-500',
          items: ['Hotel 3★ o apartamento privado', 'Restaurantes locales', 'Coche de alquiler', '1-2 excursiones/actividades'],
        },
        {
          name: 'Premium',
          range: '200+€',
          color: 'from-amber-500 to-orange-500',
          items: ['Hotel 4-5★ o villa', 'Restaurantes gourmet', 'Coche de alquiler premium', 'Excursiones privadas y spa'],
        },
      ],
    },
    apps: {
      title: 'Apps útiles',
      subtitle: 'Descarga estas aplicaciones antes de tu viaje.',
      list: [
        { name: 'Google Maps', desc: 'Navegación y mapas offline. Descarga el mapa de Tenerife antes de viajar.' },
        { name: 'TITSA (Guaguas)', desc: 'Horarios y rutas de autobuses en tiempo real. Imprescindible si no alquilas coche.' },
        { name: 'Permisos Teide', desc: 'Reserva obligatoria (gratuita) para subir al pico del Teide. Reserva con semanas de antelación.' },
        { name: 'AEMET / Windy', desc: 'Previsión meteorológica. Importante por la variabilidad climática entre zonas de la isla.' },
      ],
    },
    faq: {
      title: 'Preguntas frecuentes',
      items: [
        {
          q: '¿Necesito pasaporte para viajar a Tenerife?',
          a: 'No si eres ciudadano de la UE. Tenerife es territorio español y forma parte de la Unión Europea. Para ciudadanos de fuera de la UE, se aplican las mismas normas de entrada que para España continental.',
        },
        {
          q: '¿Cuál es la mejor época para visitar Tenerife?',
          a: 'Tenerife se puede visitar durante todo el año gracias a su clima subtropical. Los meses de abril a octubre ofrecen más horas de sol, aunque diciembre-febrero son populares para escapar del frío europeo. La temporada alta es de julio a septiembre y Navidad.',
        },
        {
          q: '¿Es necesario alquilar un coche en Tenerife?',
          a: 'Altamente recomendable si quieres explorar la isla en profundidad. El transporte público (TITSA) cubre las principales rutas, pero para acceder a playas remotas, senderos y pueblos del interior, el coche es la mejor opción. Desde 20€/día.',
        },
        {
          q: '¿Cuántos días necesito para visitar Tenerife?',
          a: 'Un mínimo de 5-7 días para conocer lo esencial: Teide, playas del sur, norte de la isla y alguna excursión. Con 10-14 días puedes explorar la isla en profundidad, incluyendo senderismo, pueblos con encanto y excursiones a islas vecinas.',
        },
        {
          q: '¿Se puede beber agua del grifo en Tenerife?',
          a: 'El agua del grifo es potable pero tiene un alto contenido mineral y sabor fuerte. La mayoría de residentes y turistas prefieren agua embotellada. En restaurantes se sirve agua embotellada por defecto.',
        },
      ],
    },
    cta: {
      title: '¿Listo para tu aventura en Tenerife?',
      subtitle: 'Explora nuestras experiencias y reserva las mejores actividades de la isla.',
      button: 'Ver experiencias y reservar',
    },
  },
  en: {
    meta: {
      title: 'How to Plan Your Trip to Tenerife | Complete Guide 2026',
      description: 'Complete guide to planning your trip to Tenerife: flights, accommodation, transport, budget, and practical tips to enjoy the island.',
    },
    hero: {
      badge: 'Travel guide',
      title: 'How to Plan Your Trip to Tenerife',
      subtitle: 'Everything you need to know to plan the perfect holiday on the largest of the Canary Islands.',
    },
    arrival: {
      title: 'How to Get to Tenerife',
      subtitle: 'Tenerife has two airports and ferry connections from mainland Spain.',
      airports: {
        title: 'Airports',
        tfs: {
          name: 'Tenerife South (TFS) - Reina Sofía',
          desc: 'Main airport for international and charter flights. Located in the south, near the tourist areas of Los Cristianos, Playa de las Américas, and Costa Adeje.',
        },
        tfn: {
          name: 'Tenerife North (TFN) - Los Rodeos',
          desc: 'Airport for domestic flights and inter-island connections. Located near Santa Cruz and La Laguna.',
        },
      },
      ferries: {
        title: 'Ferries',
        desc: 'Fred Olsen and Naviera Armas operate routes from Huelva and Cádiz (mainland) with 30-36 hour crossings. Fast inter-island connections are also available (Gran Canaria, La Gomera, La Palma, El Hierro).',
      },
    },
    weather: {
      title: 'Best Time to Visit',
      subtitle: 'Tenerife enjoys spring-like weather year-round. The south is drier and sunnier; the north is greener and wetter.',
    },
    accommodation: {
      title: 'Where to Stay',
      subtitle: 'The north and south offer very different experiences.',
      north: {
        title: 'North Tenerife',
        pros: ['Lush nature and green landscapes', 'More affordable prices', 'Authentic local cuisine', 'Less crowded'],
        cons: ['More cloudy and rainy', 'Volcanic beaches (black sand)', 'Less nightlife'],
        areas: 'Puerto de la Cruz, La Orotava, Icod de los Vinos',
      },
      south: {
        title: 'South Tenerife',
        pros: ['Almost guaranteed sunshine', 'Golden sand beaches', 'Great nightlife options', 'More tourist infrastructure'],
        cons: ['Higher prices', 'More tourist crowds', 'Drier landscape'],
        areas: 'Costa Adeje, Playa de las Américas, Los Cristianos, El Médano',
      },
    },
    transport: {
      title: 'Getting Around the Island',
      subtitle: 'Options for traveling around Tenerife.',
      options: [
        {
          title: 'Car Rental',
          desc: 'Best option to explore the island freely. From 20-35 per day. Book ahead in high season. Companies: Cicar, Autoreisen, TopCar.',
          icon: 'car',
        },
        {
          title: 'Buses (TITSA)',
          desc: 'Bus network covering the whole island. TenMas card for discounts. Key lines: 110 (TFS-Santa Cruz), 343 (Costa Adeje-Puerto de la Cruz).',
          icon: 'bus',
        },
        {
          title: 'Tram',
          desc: 'Two lines connecting Santa Cruz with La Laguna. Runs every 5-10 minutes. Ideal for traveling between both cities.',
          icon: 'compass',
        },
        {
          title: 'Taxi',
          desc: 'Available island-wide. Regulated fares. Airport South to Costa Adeje: ~30. Airport North to Santa Cruz: ~15. Apps: PideTaxi.',
          icon: 'mappin',
        },
      ],
    },
    budget: {
      title: 'Daily Budget',
      subtitle: 'Estimated costs per person per day in Tenerife.',
      levels: [
        {
          name: 'Backpacker',
          range: '40-60',
          color: 'from-green-500 to-emerald-500',
          items: ['Hostel or shared apartment', 'Supermarket/local eateries', 'Public transport (TITSA)', 'Free beaches & hiking'],
        },
        {
          name: 'Mid-range',
          range: '80-120',
          color: 'from-blue-500 to-cyan-500',
          items: ['3-star hotel or private apartment', 'Local restaurants', 'Rental car', '1-2 excursions/activities'],
        },
        {
          name: 'Premium',
          range: '200+',
          color: 'from-amber-500 to-orange-500',
          items: ['4-5 star hotel or villa', 'Gourmet restaurants', 'Premium rental car', 'Private tours & spa'],
        },
      ],
    },
    apps: {
      title: 'Useful Apps',
      subtitle: 'Download these apps before your trip.',
      list: [
        { name: 'Google Maps', desc: 'Navigation and offline maps. Download the Tenerife map before traveling.' },
        { name: 'TITSA (Buses)', desc: 'Real-time bus schedules and routes. Essential if you are not renting a car.' },
        { name: 'Teide Permits', desc: 'Mandatory (free) reservation to climb to Teide peak. Book weeks in advance.' },
        { name: 'AEMET / Windy', desc: 'Weather forecast. Important due to the climate variability between island zones.' },
      ],
    },
    faq: {
      title: 'Frequently Asked Questions',
      items: [
        {
          q: 'Do I need a passport to travel to Tenerife?',
          a: 'Not if you are an EU citizen. Tenerife is Spanish territory and part of the European Union. For non-EU citizens, the same entry rules apply as for mainland Spain.',
        },
        {
          q: 'What is the best time to visit Tenerife?',
          a: 'Tenerife can be visited year-round thanks to its subtropical climate. April to October offers more sunshine, while December-February is popular for escaping European winters. Peak season is July-September and Christmas.',
        },
        {
          q: 'Is it necessary to rent a car in Tenerife?',
          a: 'Highly recommended if you want to explore the island in depth. Public transport (TITSA) covers main routes, but for remote beaches, hiking trails, and inland villages, a car is the best option. From 20/day.',
        },
        {
          q: 'How many days do I need to visit Tenerife?',
          a: 'A minimum of 5-7 days to see the essentials: Teide, southern beaches, north of the island, and some excursions. With 10-14 days you can explore in depth, including hiking, charming villages, and trips to neighboring islands.',
        },
        {
          q: 'Can you drink tap water in Tenerife?',
          a: 'Tap water is safe to drink but has high mineral content and a strong taste. Most locals and tourists prefer bottled water. Restaurants serve bottled water by default.',
        },
      ],
    },
    cta: {
      title: 'Ready for Your Tenerife Adventure?',
      subtitle: 'Explore our experiences and book the best activities on the island.',
      button: 'Browse experiences & book',
    },
  },
}

const weatherData = [
  { month: { es: 'Enero', en: 'January' }, temp: '15-21°C', rain: { es: 'Moderada', en: 'Moderate' }, icon: 'cloud', sunny: 6 },
  { month: { es: 'Febrero', en: 'February' }, temp: '15-21°C', rain: { es: 'Moderada', en: 'Moderate' }, icon: 'cloud', sunny: 6 },
  { month: { es: 'Marzo', en: 'March' }, temp: '16-22°C', rain: { es: 'Baja', en: 'Low' }, icon: 'sun', sunny: 7 },
  { month: { es: 'Abril', en: 'April' }, temp: '16-23°C', rain: { es: 'Baja', en: 'Low' }, icon: 'sun', sunny: 8 },
  { month: { es: 'Mayo', en: 'May' }, temp: '18-24°C', rain: { es: 'Muy baja', en: 'Very low' }, icon: 'sun', sunny: 9 },
  { month: { es: 'Junio', en: 'June' }, temp: '20-27°C', rain: { es: 'Mínima', en: 'Minimal' }, icon: 'sun', sunny: 10 },
  { month: { es: 'Julio', en: 'July' }, temp: '22-29°C', rain: { es: 'Mínima', en: 'Minimal' }, icon: 'sun', sunny: 11 },
  { month: { es: 'Agosto', en: 'August' }, temp: '23-30°C', rain: { es: 'Mínima', en: 'Minimal' }, icon: 'sun', sunny: 11 },
  { month: { es: 'Septiembre', en: 'September' }, temp: '22-28°C', rain: { es: 'Baja', en: 'Low' }, icon: 'sun', sunny: 9 },
  { month: { es: 'Octubre', en: 'October' }, temp: '20-26°C', rain: { es: 'Moderada', en: 'Moderate' }, icon: 'cloud', sunny: 7 },
  { month: { es: 'Noviembre', en: 'November' }, temp: '18-23°C', rain: { es: 'Moderada', en: 'Moderate' }, icon: 'cloud', sunny: 6 },
  { month: { es: 'Diciembre', en: 'December' }, temp: '16-21°C', rain: { es: 'Moderada', en: 'Moderate' }, icon: 'cloud', sunny: 6 },
]

function getTransportIcon(icon: string) {
  switch (icon) {
    case 'car': return Car
    case 'bus': return Bus
    case 'compass': return Compass
    case 'mappin': return MapPin
    default: return Car
  }
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const lang = locale === 'es' ? 'es' : 'en'
  const t = content[lang]
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: `https://www.tenerifeexperiences.com/${locale}/planifica`,
    },
  }
}

export default async function PlanificaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const lang = locale === 'es' ? 'es' : 'en'
  const t = content[lang]

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-slate-950 to-orange-600/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="outline" className="border-blue-400/30 text-blue-400 px-4 py-1 mb-6">
            <Compass className="h-3 w-3 mr-1" />
            {t.hero.badge}
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t.hero.title}
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            {t.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Cómo llegar */}
      <section className="py-16 sm:py-20 bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">{t.arrival.title}</h2>
            <p className="mt-2 text-gray-400">{t.arrival.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-slate-900/80 border-white/10">
              <CardContent className="p-6 space-y-4">
                <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
                  <Plane className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">{t.arrival.airports.tfs.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{t.arrival.airports.tfs.desc}</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/80 border-white/10">
              <CardContent className="p-6 space-y-4">
                <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                  <Plane className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">{t.arrival.airports.tfn.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{t.arrival.airports.tfn.desc}</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/80 border-white/10">
              <CardContent className="p-6 space-y-4">
                <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500">
                  <Ship className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">{t.arrival.ferries.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{t.arrival.ferries.desc}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mejor época - Weather */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">{t.weather.title}</h2>
            <p className="mt-2 text-gray-400">{t.weather.subtitle}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {weatherData.map((month) => (
              <Card key={month.month.en} className="bg-slate-900/80 border-white/10 hover:border-white/20 transition-all">
                <CardContent className="p-4 text-center space-y-2">
                  <p className="text-sm font-medium text-gray-400">{month.month[lang]}</p>
                  <div className="flex justify-center">
                    {month.icon === 'sun' ? (
                      <Sun className="h-8 w-8 text-yellow-400" />
                    ) : (
                      <Cloud className="h-8 w-8 text-gray-400" />
                    )}
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <Thermometer className="h-3 w-3 text-orange-400" />
                    <span className="text-sm font-semibold text-white">{month.temp}</span>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <Droplets className="h-3 w-3 text-blue-400" />
                    <span className="text-xs text-gray-400">{month.rain[lang]}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dónde alojarse */}
      <section className="py-16 sm:py-20 bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">{t.accommodation.title}</h2>
            <p className="mt-2 text-gray-400">{t.accommodation.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* North */}
            <Card className="bg-slate-900/80 border-white/10">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500">
                    <TreePine className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{t.accommodation.north.title}</h3>
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-medium text-green-400">{lang === 'es' ? 'Ventajas' : 'Pros'}</p>
                  {t.accommodation.north.pros.map((pro) => (
                    <div key={pro} className="flex items-start gap-2 text-sm">
                      <span className="text-green-400 mt-0.5">+</span>
                      <span className="text-gray-300">{pro}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-medium text-red-400">{lang === 'es' ? 'Desventajas' : 'Cons'}</p>
                  {t.accommodation.north.cons.map((con) => (
                    <div key={con} className="flex items-start gap-2 text-sm">
                      <span className="text-red-400 mt-0.5">-</span>
                      <span className="text-gray-300">{con}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-white/10">
                  <p className="text-xs text-gray-500">{lang === 'es' ? 'Zonas recomendadas' : 'Recommended areas'}: {t.accommodation.north.areas}</p>
                </div>
              </CardContent>
            </Card>

            {/* South */}
            <Card className="bg-slate-900/80 border-white/10">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500">
                    <Sun className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{t.accommodation.south.title}</h3>
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-medium text-green-400">{lang === 'es' ? 'Ventajas' : 'Pros'}</p>
                  {t.accommodation.south.pros.map((pro) => (
                    <div key={pro} className="flex items-start gap-2 text-sm">
                      <span className="text-green-400 mt-0.5">+</span>
                      <span className="text-gray-300">{pro}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-medium text-red-400">{lang === 'es' ? 'Desventajas' : 'Cons'}</p>
                  {t.accommodation.south.cons.map((con) => (
                    <div key={con} className="flex items-start gap-2 text-sm">
                      <span className="text-red-400 mt-0.5">-</span>
                      <span className="text-gray-300">{con}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-white/10">
                  <p className="text-xs text-gray-500">{lang === 'es' ? 'Zonas recomendadas' : 'Recommended areas'}: {t.accommodation.south.areas}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Transporte */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">{t.transport.title}</h2>
            <p className="mt-2 text-gray-400">{t.transport.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {t.transport.options.map((option) => {
              const Icon = getTransportIcon(option.icon)
              return (
                <Card key={option.title} className="bg-slate-900/80 border-white/10 hover:border-white/20 transition-all">
                  <CardContent className="p-6 flex gap-4">
                    <div className="shrink-0">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">{option.title}</h3>
                      <p className="text-sm text-gray-400 leading-relaxed">{option.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Presupuesto */}
      <section className="py-16 sm:py-20 bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">{t.budget.title}</h2>
            <p className="mt-2 text-gray-400">{t.budget.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.budget.levels.map((level) => (
              <Card key={level.name} className="bg-slate-900/80 border-white/10 hover:border-white/20 transition-all hover:scale-[1.02]">
                <CardContent className="p-8 space-y-6">
                  <div className="text-center space-y-2">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${level.color}`}>
                      <DollarSign className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{level.name}</h3>
                    <p className="text-2xl font-bold text-white">{level.range}<span className="text-sm text-gray-400 font-normal">/{lang === 'es' ? 'día' : 'day'}</span></p>
                  </div>
                  <div className="space-y-3">
                    {level.items.map((item) => (
                      <div key={item} className="flex items-start gap-2 text-sm">
                        <span className="text-green-400 mt-0.5">&#10003;</span>
                        <span className="text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Apps útiles */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">{t.apps.title}</h2>
            <p className="mt-2 text-gray-400">{t.apps.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {t.apps.list.map((app) => (
              <Card key={app.name} className="bg-slate-900/80 border-white/10">
                <CardContent className="p-6 flex gap-4">
                  <div className="shrink-0">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500">
                      <Smartphone className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white mb-1">{app.name}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{app.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 bg-slate-900/50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">{t.faq.title}</h2>
          </div>

          <div className="space-y-4">
            {t.faq.items.map((item) => (
              <Card key={item.q} className="bg-slate-900/80 border-white/10">
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="h-5 w-5 text-orange-400 shrink-0 mt-0.5" />
                    <h3 className="text-base font-semibold text-white">{item.q}</h3>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed pl-8">{item.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500/20 to-blue-500/20 border border-orange-500/20 p-8 sm:p-12 text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]" />
            <div className="relative space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                {t.cta.title}
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                {t.cta.subtitle}
              </p>
              <Link href="/reservas">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg rounded-xl">
                  {t.cta.button}
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
