/**
 * Batch 5: Add 20 more items across multiple categories
 * Run with: npx tsx scripts/add-items-batch5.ts
 */

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://sqesgghvaazyajzjkoap.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxZXNnZ2h2YWF6eWFqemprb2FwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzUxMzgwOSwiZXhwIjoyMDg5MDg5ODA5fQ.UvbRfWU9seJPT9lyCyLmpD4uZrP9jXzsNoeSAjT9HnI'
)

// --- Helpers ---

async function getCategoryId(slug: string): Promise<string> {
  const { data, error } = await supabase.from('categories').select('id').eq('slug', slug).single()
  if (error) throw new Error(`Category "${slug}" not found: ${error.message}`)
  return data.id
}

async function getSubcategoryId(categorySlug: string, subSlug: string): Promise<string> {
  const catId = await getCategoryId(categorySlug)
  const { data, error } = await supabase.from('subcategories').select('id').eq('category_id', catId).eq('slug', subSlug).single()
  if (error) throw new Error(`Subcategory "${categorySlug}/${subSlug}" not found: ${error.message}`)
  return data.id
}

async function upsertItems(items: any[]) {
  const { error } = await supabase.from('items').upsert(items, { onConflict: 'subcategory_id,slug' })
  if (error) throw new Error(`Items upsert failed: ${error.message}`)
}

// --- Main ---

async function main() {
  console.log('=== Batch 5: Adding 20 Items ===\n')

  // Load all subcategories we need
  console.log('Loading subcategories...')
  const [
    topExperiencesId,
    whaleWatchingId,
    southBeachesId,
    northBeachesId,
    hikingTrailsId,
    bestRestaurantsId,
    guachinchesId,
    beachClubsId,
    barsPubsId,
    spasId,
    localProductsId,
    historicTownsId,
    guancheHeritageId,
    themeParksId,
    zoosAquariumsId,
    naturalPoolsId,
  ] = await Promise.all([
    getSubcategoryId('experiences', 'top-experiences'),
    getSubcategoryId('experiences', 'whale-watching'),
    getSubcategoryId('beaches', 'south-beaches'),
    getSubcategoryId('beaches', 'north-beaches'),
    getSubcategoryId('nature', 'hiking-trails'),
    getSubcategoryId('food', 'best-restaurants'),
    getSubcategoryId('food', 'guachinches'),
    getSubcategoryId('nightlife', 'beach-clubs'),
    getSubcategoryId('nightlife', 'bars-pubs'),
    getSubcategoryId('wellness', 'spas'),
    getSubcategoryId('shopping', 'local-products'),
    getSubcategoryId('culture', 'historic-towns'),
    getSubcategoryId('culture', 'guanche-heritage'),
    getSubcategoryId('family', 'theme-parks'),
    getSubcategoryId('family', 'zoos-aquariums'),
    getSubcategoryId('nature', 'natural-pools'),
  ])
  console.log('Subcategories loaded\n')

  // 1. Paragliding Tenerife
  console.log('1. Adding paragliding-tenerife...')
  await upsertItems([{
    subcategory_id: topExperiencesId,
    slug: 'paragliding-tenerife',
    name: { es: 'Parapente en Ifonche', en: 'Paragliding in Ifonche' },
    description: {
      es: 'Vuelo en parapente biplaza desde Ifonche con vistas espectaculares al Teide y la costa sur de Tenerife. Despega desde 800 metros de altitud y disfruta de 30 minutos sobrevolando barrancos, pueblos y el océano Atlántico. Incluye instructor titulado, equipo completo y fotos/vídeo del vuelo. No se necesita experiencia previa.',
      en: 'Tandem paragliding flight from Ifonche with spectacular views of Mount Teide and the south coast of Tenerife. Take off from 800 meters altitude and enjoy 30 minutes flying over ravines, villages and the Atlantic Ocean. Includes certified instructor, full equipment and photos/video of the flight. No previous experience required.',
    },
    short_description: { es: 'Vuelo en parapente con vistas al Teide', en: 'Paragliding flight with views of Mount Teide' },
    image: 'https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?w=800&q=80',
    location: { es: 'Ifonche, Adeje', en: 'Ifonche, Adeje' },
    coordinates: { lat: 28.1200, lng: -16.7100 },
    rating: 4.9,
    review_count: 380,
    price_from: 70,
    currency: 'EUR',
    duration: '30 min',
    bookable: true,
    featured: true,
    sort_order: 10,
    visible: true,
  }])

  // 2. Quad Safari Teide
  console.log('2. Adding quad-safari-teide...')
  await upsertItems([{
    subcategory_id: topExperiencesId,
    slug: 'quad-safari-teide',
    name: { es: 'Safari en Quad por el Teide', en: 'Quad Safari through Teide' },
    description: {
      es: 'Ruta off-road en quad por el paisaje volcánico del Parque Nacional del Teide. Recorre pistas de tierra entre coladas de lava, conos volcánicos y formaciones rocosas únicas. 3 horas de aventura con guía experto, equipo de seguridad y paradas para fotos en los miradores más impresionantes. Apto para principiantes con licencia de conducir.',
      en: 'Off-road quad route through the volcanic landscape of Teide National Park. Ride along dirt tracks between lava flows, volcanic cones and unique rock formations. 3 hours of adventure with an expert guide, safety equipment and photo stops at the most impressive viewpoints. Suitable for beginners with a driving license.',
    },
    short_description: { es: 'Ruta off-road por paisaje volcánico', en: 'Off-road route through volcanic landscape' },
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80',
    location: { es: 'Parque Nacional del Teide', en: 'Teide National Park' },
    coordinates: { lat: 28.2700, lng: -16.6400 },
    rating: 4.7,
    review_count: 290,
    price_from: 65,
    currency: 'EUR',
    duration: '3h',
    bookable: true,
    featured: true,
    sort_order: 11,
    visible: true,
  }])

  // 3. Speed Boat Dolphins
  console.log('3. Adding speed-boat-dolphins...')
  await upsertItems([{
    subcategory_id: whaleWatchingId,
    slug: 'speed-boat-dolphins',
    name: { es: 'Speed Boat Delfines', en: 'Speed Boat Dolphins' },
    description: {
      es: 'Excursión en lancha rápida para avistamiento de delfines en la costa suroeste de Tenerife. En solo 1.5 horas vivirás una experiencia emocionante recorriendo las aguas donde habitan delfines mulares y calderones tropicales. La velocidad de la lancha permite cubrir más territorio y aumentar las posibilidades de avistamiento. Grupos reducidos para mayor comodidad.',
      en: 'Speed boat excursion for dolphin watching off the southwest coast of Tenerife. In just 1.5 hours you will enjoy a thrilling experience cruising the waters where bottlenose dolphins and tropical pilot whales live. The speed of the boat allows covering more territory and increases sighting chances. Small groups for greater comfort.',
    },
    short_description: { es: 'Lancha rápida para avistamiento de delfines', en: 'Speed boat for dolphin watching' },
    image: 'https://images.unsplash.com/photo-1607153333879-c174d265f1d2?w=800&q=80',
    location: { es: 'Puerto Colón, Costa Adeje', en: 'Puerto Colón, Costa Adeje' },
    coordinates: { lat: 28.0740, lng: -16.7350 },
    rating: 4.6,
    review_count: 210,
    price_from: 40,
    currency: 'EUR',
    duration: '1.5h',
    bookable: true,
    featured: false,
    sort_order: 10,
    visible: true,
  }])

  // 4. Playa de El Médano
  console.log('4. Adding playa-el-medano...')
  await upsertItems([{
    subcategory_id: southBeachesId,
    slug: 'playa-el-medano',
    name: { es: 'Playa de El Médano', en: 'El Médano Beach' },
    description: {
      es: 'La playa favorita de los windsurfistas y kitesurfistas de Tenerife. Arena dorada y viento constante la convierten en el paraíso de los deportes acuáticos de vela. Cuenta con una amplia zona de kitesurf delimitada, escuelas de windsurf, chiringuitos y un ambiente joven y deportivo. Al fondo, la silueta de la Montaña Roja completa un paisaje inconfundible.',
      en: 'The favourite beach for windsurfers and kitesurfers in Tenerife. Golden sand and constant wind make it a paradise for wind water sports. It features a large designated kitesurf area, windsurf schools, beach bars and a young sporty atmosphere. In the background, the silhouette of Montaña Roja completes an unmistakable landscape.',
    },
    short_description: { es: 'La playa favorita de los windsurfistas', en: 'The favourite beach for windsurfers' },
    image: 'https://images.unsplash.com/photo-1509233725247-49e657c54213?w=800&q=80',
    location: { es: 'El Médano, Granadilla de Abona', en: 'El Médano, Granadilla de Abona' },
    coordinates: { lat: 28.0440, lng: -16.5360 },
    rating: 4.5,
    review_count: 870,
    price_from: 0,
    currency: 'EUR',
    bookable: false,
    featured: true,
    sort_order: 10,
    visible: true,
  }])

  // 5. Playa de San Juan
  console.log('5. Adding playa-san-juan...')
  await upsertItems([{
    subcategory_id: southBeachesId,
    slug: 'playa-san-juan',
    name: { es: 'Playa de San Juan', en: 'San Juan Beach' },
    description: {
      es: 'Pequeña playa local tranquila en el pueblo pesquero de San Juan, municipio de Guía de Isora. Arena oscura volcánica, aguas cristalinas y un ambiente relajado lejos del turismo masivo. Excelente para hacer snorkel gracias a sus fondos rocosos. Rodeada de restaurantes de pescado fresco y terrazas con vistas al mar.',
      en: 'Small quiet local beach in the fishing village of San Juan, municipality of Guía de Isora. Dark volcanic sand, crystal-clear waters and a relaxed atmosphere away from mass tourism. Excellent for snorkelling thanks to its rocky seabed. Surrounded by fresh fish restaurants and terraces with sea views.',
    },
    short_description: { es: 'Pequeña playa local tranquila con buen snorkel', en: 'Small quiet local beach with great snorkelling' },
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    location: { es: 'San Juan, Guía de Isora', en: 'San Juan, Guía de Isora' },
    coordinates: { lat: 28.1640, lng: -16.8180 },
    rating: 4.3,
    review_count: 320,
    price_from: 0,
    currency: 'EUR',
    bookable: false,
    featured: false,
    sort_order: 11,
    visible: true,
  }])

  // 6. Playa El Rincón
  console.log('6. Adding playa-el-rincon...')
  await upsertItems([{
    subcategory_id: northBeachesId,
    slug: 'playa-el-rincon',
    name: { es: 'Playa El Rincón', en: 'El Rincón Beach' },
    description: {
      es: 'Playa escondida en la costa de Tacoronte, solo accesible por un camino empinado entre plataneras. Arena negra volcánica gruesa, oleaje fuerte y un entorno salvaje y natural. No es apta para baño debido a las corrientes, pero su belleza paisajística la convierte en una visita imprescindible para los amantes de la naturaleza y la fotografía.',
      en: 'Hidden beach on the coast of Tacoronte, only accessible via a steep path through banana plantations. Coarse black volcanic sand, strong waves and a wild natural setting. Not suitable for swimming due to currents, but its landscape beauty makes it a must-visit for nature and photography lovers.',
    },
    short_description: { es: 'Playa escondida de arena negra volcánica', en: 'Hidden black volcanic sand beach' },
    image: 'https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=800&q=80',
    location: { es: 'Tacoronte', en: 'Tacoronte' },
    coordinates: { lat: 28.4850, lng: -16.4050 },
    rating: 4.2,
    review_count: 180,
    price_from: 0,
    currency: 'EUR',
    bookable: false,
    featured: false,
    sort_order: 10,
    visible: true,
  }])

  // 7. Sendero Lunar (Paisaje Lunar)
  console.log('7. Adding sendero-lunar-teide...')
  await upsertItems([{
    subcategory_id: hikingTrailsId,
    slug: 'sendero-lunar-teide',
    name: { es: 'Sendero del Paisaje Lunar', en: 'Lunar Landscape Trail' },
    description: {
      es: 'Ruta de senderismo hasta las formaciones lunares de Vilaflor, una de las maravillas geológicas más sorprendentes de Tenerife. Columnas de piedra pómez blanca esculpidas por la erosión crean un paisaje que parece de otro planeta. La ruta parte del área recreativa de Las Lajas y tiene una dificultad media. 3 horas ida y vuelta. Llevar agua y protección solar.',
      en: 'Hiking trail to the lunar formations of Vilaflor, one of the most surprising geological wonders of Tenerife. White pumice stone columns sculpted by erosion create a landscape that looks like another planet. The route starts from Las Lajas recreation area and has medium difficulty. 3 hours round trip. Bring water and sun protection.',
    },
    short_description: { es: 'Ruta a las formaciones lunares de Vilaflor', en: 'Trail to the lunar formations of Vilaflor' },
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    location: { es: 'Vilaflor', en: 'Vilaflor' },
    coordinates: { lat: 28.1550, lng: -16.6350 },
    rating: 4.7,
    review_count: 540,
    price_from: 0,
    currency: 'EUR',
    duration: '3h',
    bookable: false,
    featured: true,
    sort_order: 10,
    visible: true,
  }])

  // 8. Barranco del Infierno
  console.log('8. Adding barranco-infierno-adeje...')
  await upsertItems([{
    subcategory_id: hikingTrailsId,
    slug: 'barranco-infierno-adeje',
    name: { es: 'Barranco del Infierno', en: 'Hell\'s Gorge' },
    description: {
      es: 'Impresionante cañón natural en Adeje que culmina en una cascada de 200 metros de altura. La ruta de senderismo discurre por un barranco espectacular con vegetación endémica, aves rapaces y formaciones geológicas sorprendentes. Es necesario reservar con antelación ya que el acceso está limitado a 300 personas diarias. 3 horas ida y vuelta. Dificultad moderada.',
      en: 'Stunning natural canyon in Adeje culminating in a 200-metre waterfall. The hiking trail runs through a spectacular gorge with endemic vegetation, birds of prey and surprising geological formations. Advance booking is required as access is limited to 300 people per day. 3 hours round trip. Moderate difficulty.',
    },
    short_description: { es: 'Cañón con cascada de 200m en Adeje', en: 'Canyon with 200m waterfall in Adeje' },
    image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&q=80',
    location: { es: 'Adeje', en: 'Adeje' },
    coordinates: { lat: 28.1100, lng: -16.7250 },
    rating: 4.8,
    review_count: 920,
    price_from: 8,
    currency: 'EUR',
    duration: '3h',
    bookable: true,
    featured: true,
    sort_order: 11,
    visible: true,
  }])

  // 9. Restaurante El Cine
  console.log('9. Adding restaurante-el-cine...')
  await upsertItems([{
    subcategory_id: bestRestaurantsId,
    slug: 'restaurante-el-cine',
    name: { es: 'El Cine, La Orotava', en: 'El Cine, La Orotava' },
    description: {
      es: 'Cocina canaria contemporánea en un edificio histórico restaurado que fue un antiguo cine de La Orotava. El chef combina productos locales de temporada con técnicas modernas para crear platos creativos que respetan la tradición. Menú degustación de 45€ con maridaje de vinos canarios. Ambiente elegante e íntimo en el corazón del casco histórico.',
      en: 'Contemporary Canarian cuisine in a restored historic building that was once a cinema in La Orotava. The chef combines local seasonal produce with modern techniques to create creative dishes that respect tradition. Tasting menu at 45 euros with Canarian wine pairing. Elegant and intimate atmosphere in the heart of the historic centre.',
    },
    short_description: { es: 'Cocina canaria contemporánea en edificio histórico', en: 'Contemporary Canarian cuisine in a historic building' },
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    location: { es: 'La Orotava', en: 'La Orotava' },
    coordinates: { lat: 28.3900, lng: -16.5230 },
    rating: 4.7,
    review_count: 310,
    price_from: 45,
    currency: 'EUR',
    bookable: true,
    featured: true,
    sort_order: 10,
    visible: true,
  }])

  // 10. Tasca El Obispo
  console.log('10. Adding tasca-el-obispo...')
  await upsertItems([{
    subcategory_id: bestRestaurantsId,
    slug: 'tasca-el-obispo',
    name: { es: 'Tasca El Obispo, La Laguna', en: 'Tasca El Obispo, La Laguna' },
    description: {
      es: 'Tapas canarias creativas en pleno casco histórico UNESCO de San Cristóbal de La Laguna. Un local pequeño y acogedor muy popular entre los locales, donde se sirven raciones generosas de cocina canaria con toques modernos. Productos km0, quesos artesanales y una selección de vinos de la isla. Conviene reservar, especialmente los fines de semana.',
      en: 'Creative Canarian tapas in the heart of the UNESCO historic centre of San Cristóbal de La Laguna. A small, cozy venue very popular among locals, serving generous portions of Canarian cuisine with modern touches. Km0 produce, artisan cheeses and a selection of island wines. Reservations recommended, especially on weekends.',
    },
    short_description: { es: 'Tapas canarias creativas en el casco UNESCO', en: 'Creative Canarian tapas in the UNESCO old town' },
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
    location: { es: 'San Cristóbal de La Laguna', en: 'San Cristóbal de La Laguna' },
    coordinates: { lat: 28.4870, lng: -16.3150 },
    rating: 4.6,
    review_count: 450,
    price_from: 15,
    currency: 'EUR',
    bookable: true,
    featured: false,
    sort_order: 11,
    visible: true,
  }])

  // 11. Guachinche Bodega Castro
  console.log('11. Adding guachinche-bodega-castro...')
  await upsertItems([{
    subcategory_id: guachinchesId,
    slug: 'guachinche-bodega-castro',
    name: { es: 'Bodega Castro, Tacoronte', en: 'Bodega Castro, Tacoronte' },
    description: {
      es: 'Uno de los guachinches más auténticos del norte de Tenerife, situado en la zona vinícola de Tacoronte. Carne de fiesta casera, queso asado, papas con mojo y vino tinto de cosecha propia servido directamente de la barrica. Ambiente familiar y rústico, mesas de madera en un patio rodeado de viñas. Solo abre en temporada cuando hay vino disponible.',
      en: 'One of the most authentic guachinches in northern Tenerife, located in the wine-growing area of Tacoronte. Homemade festive meat, grilled cheese, potatoes with mojo and red wine from their own harvest served straight from the barrel. Family-friendly and rustic atmosphere, wooden tables in a patio surrounded by vines. Only open in season when wine is available.',
    },
    short_description: { es: 'Guachinche auténtico con carne fiesta y vino propio', en: 'Authentic guachinche with festive meat and own wine' },
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
    location: { es: 'Tacoronte', en: 'Tacoronte' },
    coordinates: { lat: 28.4780, lng: -16.4120 },
    rating: 4.5,
    review_count: 260,
    price_from: 12,
    currency: 'EUR',
    bookable: false,
    featured: true,
    sort_order: 10,
    visible: true,
  }])

  // 12. Bahia Beach Club
  console.log('12. Adding bahia-beach-club...')
  await upsertItems([{
    subcategory_id: beachClubsId,
    slug: 'bahia-beach-club',
    name: { es: 'Bahía Beach Club, Fañabé', en: 'Bahía Beach Club, Fañabé' },
    description: {
      es: 'Beach club con piscina infinity frente al mar en la playa de Fañabé. Sesiones de DJs al atardecer, cocina fusión mediterránea-asiática, cócteles premium y un ambiente sofisticado pero relajado. Tumbonas balinesas, zona chill-out y eventos temáticos los fines de semana. Entrada con consumición mínima de 25€.',
      en: 'Beach club with infinity pool facing the sea at Fañabé beach. DJ sessions at sunset, Mediterranean-Asian fusion cuisine, premium cocktails and a sophisticated yet relaxed atmosphere. Balinese daybeds, chill-out area and themed events on weekends. Entry with 25 euro minimum spend.',
    },
    short_description: { es: 'Beach club con piscina infinity y DJs al atardecer', en: 'Beach club with infinity pool and sunset DJs' },
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80',
    location: { es: 'Playa Fañabé, Costa Adeje', en: 'Fañabé Beach, Costa Adeje' },
    coordinates: { lat: 28.0810, lng: -16.7340 },
    rating: 4.4,
    review_count: 340,
    price_from: 25,
    currency: 'EUR',
    bookable: true,
    featured: true,
    sort_order: 10,
    visible: true,
  }])

  // 13. The Great Escape Pub
  console.log('13. Adding the-great-escape-pub...')
  await upsertItems([{
    subcategory_id: barsPubsId,
    slug: 'the-great-escape-pub',
    name: { es: 'The Great Escape, Playa de las Américas', en: 'The Great Escape, Playa de las Americas' },
    description: {
      es: 'Irish pub popular en Playa de las Américas con música en vivo los fines de semana. Ambiente acogedor con decoración típica irlandesa, amplia carta de cervezas de grifo, whiskies y cócteles. Retransmisiones de fútbol y rugby en pantallas grandes. Uno de los puntos de encuentro favoritos de la comunidad internacional del sur de Tenerife.',
      en: 'Popular Irish pub in Playa de las Americas with live music on weekends. Cozy atmosphere with typical Irish decor, wide selection of draft beers, whiskeys and cocktails. Football and rugby broadcasts on big screens. One of the favourite meeting points for the international community in southern Tenerife.',
    },
    short_description: { es: 'Irish pub con música en vivo los fines de semana', en: 'Irish pub with live music on weekends' },
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80',
    location: { es: 'Playa de las Américas', en: 'Playa de las Americas' },
    coordinates: { lat: 28.0560, lng: -16.7290 },
    rating: 4.2,
    review_count: 280,
    price_from: 5,
    currency: 'EUR',
    bookable: false,
    featured: false,
    sort_order: 10,
    visible: true,
  }])

  // 14. Spa Royal Garden
  console.log('14. Adding spa-royal-garden...')
  await upsertItems([{
    subcategory_id: spasId,
    slug: 'spa-royal-garden',
    name: { es: 'Spa Royal Garden, Adeje', en: 'Spa Royal Garden, Adeje' },
    description: {
      es: 'Spa de inspiración tailandesa en Costa Adeje con circuito de aguas completo y tratamientos balineses. Piscina climatizada, jacuzzi, sauna finlandesa, baño turco, ducha escocesa y zona de relajación con tumbonas térmicas. Masajes con aceites aromáticos y tratamientos faciales personalizados. Un refugio de paz y bienestar en el sur de Tenerife.',
      en: 'Thai-inspired spa in Costa Adeje with a full water circuit and Balinese treatments. Heated pool, jacuzzi, Finnish sauna, Turkish bath, Scottish shower and relaxation area with thermal loungers. Massages with aromatic oils and personalised facial treatments. A haven of peace and wellness in southern Tenerife.',
    },
    short_description: { es: 'Spa tailandés con circuito de aguas y tratamientos balineses', en: 'Thai spa with water circuit and Balinese treatments' },
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80',
    location: { es: 'Costa Adeje', en: 'Costa Adeje' },
    coordinates: { lat: 28.0800, lng: -16.7300 },
    rating: 4.6,
    review_count: 290,
    price_from: 75,
    currency: 'EUR',
    duration: '2-3h',
    bookable: true,
    featured: false,
    sort_order: 10,
    visible: true,
  }])

  // 15. Ron Miel Canario
  console.log('15. Adding ron-miel-canario...')
  await upsertItems([{
    subcategory_id: localProductsId,
    slug: 'ron-miel-canario',
    name: { es: 'Ron Miel Canario', en: 'Canarian Honey Rum' },
    description: {
      es: 'El licor más emblemático de las Islas Canarias. Mezcla artesanal de ron y miel de palma o miel de abeja que da como resultado un licor dulce, suave y aromático. Se sirve frío como digestivo después de las comidas. Marcas locales como Arehucas, Cocal y Artemi elaboran las versiones más populares. Ideal como regalo o souvenir de Tenerife.',
      en: 'The most emblematic liqueur of the Canary Islands. An artisan blend of rum and palm honey or bee honey resulting in a sweet, smooth and aromatic liqueur. Served cold as a digestif after meals. Local brands like Arehucas, Cocal and Artemi produce the most popular versions. Ideal as a gift or souvenir from Tenerife.',
    },
    short_description: { es: 'El licor más emblemático de Canarias', en: 'The most emblematic liqueur of the Canary Islands' },
    image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=800&q=80',
    location: { es: 'Toda la isla', en: 'Whole island' },
    coordinates: { lat: 28.2916, lng: -16.6291 },
    rating: 4.4,
    review_count: 380,
    price_from: 8,
    currency: 'EUR',
    bookable: false,
    featured: true,
    sort_order: 10,
    visible: true,
  }])

  // 16. Icod de los Vinos
  console.log('16. Adding icod-de-los-vinos...')
  await upsertItems([{
    subcategory_id: historicTownsId,
    slug: 'icod-de-los-vinos',
    name: { es: 'Icod de los Vinos', en: 'Icod de los Vinos' },
    description: {
      es: 'Pueblo famoso por albergar el Drago Milenario, un ejemplar de Dracaena draco considerado el árbol más viejo de su especie con más de 800 años. Además del drago, Icod ofrece un casco histórico encantador con iglesias coloniales, casonas señoriales y plazas acogedoras. La plaza del drago, la Iglesia de San Marcos y la mariposa del sur son visitas imprescindibles.',
      en: 'Town famous for housing the Millennial Dragon Tree, a Dracaena draco specimen considered the oldest tree of its species at over 800 years old. Besides the dragon tree, Icod offers a charming historic centre with colonial churches, stately mansions and cozy squares. The dragon tree square, San Marcos Church and the butterfly garden are must-visits.',
    },
    short_description: { es: 'Pueblo del Drago Milenario, el árbol más viejo de su especie', en: 'Home of the Millennial Dragon Tree, the oldest of its species' },
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80',
    location: { es: 'Icod de los Vinos', en: 'Icod de los Vinos' },
    coordinates: { lat: 28.3670, lng: -16.7180 },
    rating: 4.6,
    review_count: 1100,
    price_from: 0,
    currency: 'EUR',
    bookable: false,
    featured: true,
    sort_order: 10,
    visible: true,
  }])

  // 17. Cueva del Viento
  console.log('17. Adding cueva-del-viento...')
  await upsertItems([{
    subcategory_id: guancheHeritageId,
    slug: 'cueva-del-viento',
    name: { es: 'Cueva del Viento, Icod', en: 'Cave of the Wind, Icod' },
    description: {
      es: 'El tubo volcánico más largo de Europa y el quinto del mundo, con más de 17 km de galerías subterráneas. Las visitas guiadas de 2 horas recorren una parte del tubo donde se pueden observar formaciones de lava espectaculares, lagos subterráneos y especies endémicas. Situado en Icod de los Vinos, es una experiencia única para comprender la geología volcánica de Tenerife.',
      en: 'The longest volcanic tube in Europe and fifth in the world, with over 17 km of underground galleries. The 2-hour guided tours cover a section of the tube where you can observe spectacular lava formations, underground lakes and endemic species. Located in Icod de los Vinos, it is a unique experience to understand the volcanic geology of Tenerife.',
    },
    short_description: { es: 'El tubo volcánico más largo de Europa', en: 'The longest volcanic tube in Europe' },
    image: 'https://images.unsplash.com/photo-1504699439244-ba8ed2cf0a3e?w=800&q=80',
    location: { es: 'Icod de los Vinos', en: 'Icod de los Vinos' },
    coordinates: { lat: 28.3530, lng: -16.7080 },
    rating: 4.8,
    review_count: 760,
    price_from: 20,
    currency: 'EUR',
    duration: '2h',
    bookable: true,
    featured: true,
    sort_order: 10,
    visible: true,
  }])

  // 18. Monkey Park
  console.log('18. Adding monkey-park-tenerife...')
  await upsertItems([{
    subcategory_id: themeParksId,
    slug: 'monkey-park-tenerife',
    name: { es: 'Monkey Park, Los Cristianos', en: 'Monkey Park, Los Cristianos' },
    description: {
      es: 'Pequeño zoo familiar en Los Cristianos especializado en primates. Hogar de monos titís, lemures, guacamayos y tortugas gigantes. Los visitantes pueden interactuar con algunos animales bajo supervisión. Muy popular entre familias con niños pequeños por su tamaño manejable y cercanía con los animales. Visita de aproximadamente 1 hora.',
      en: 'Small family zoo in Los Cristianos specialising in primates. Home to marmoset monkeys, lemurs, macaws and giant tortoises. Visitors can interact with some animals under supervision. Very popular with families with young children due to its manageable size and closeness to the animals. Visit takes approximately 1 hour.',
    },
    short_description: { es: 'Pequeño zoo con monos, lemures y tortugas', en: 'Small zoo with monkeys, lemurs and tortoises' },
    image: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=800&q=80',
    location: { es: 'Los Cristianos, Arona', en: 'Los Cristianos, Arona' },
    coordinates: { lat: 28.0510, lng: -16.7150 },
    rating: 4.1,
    review_count: 520,
    price_from: 10,
    currency: 'EUR',
    duration: '1h',
    bookable: false,
    featured: false,
    sort_order: 10,
    visible: true,
  }])

  // 19. Palmetum Santa Cruz
  console.log('19. Adding palmetum-santa-cruz...')
  await upsertItems([{
    subcategory_id: zoosAquariumsId,
    slug: 'palmetum-santa-cruz',
    name: { es: 'Palmetum, Santa Cruz', en: 'Palmetum, Santa Cruz' },
    description: {
      es: 'Jardín botánico tropical ubicado sobre un antiguo vertedero rehabilitado en Santa Cruz de Tenerife. Alberga la mayor colección de palmeras de Europa con más de 600 especies de los cinco continentes. Recorrido por senderos temáticos organizados por regiones biogeográficas, con vistas panorámicas al puerto y al océano. Un ejemplo mundial de recuperación ambiental.',
      en: 'Tropical botanical garden built on a former rehabilitated landfill in Santa Cruz de Tenerife. Houses the largest palm collection in Europe with over 600 species from five continents. Walk through themed paths organised by biogeographical regions, with panoramic views of the harbour and ocean. A world example of environmental recovery.',
    },
    short_description: { es: 'Mayor colección de palmeras de Europa', en: 'Largest palm collection in Europe' },
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80',
    location: { es: 'Santa Cruz de Tenerife', en: 'Santa Cruz de Tenerife' },
    coordinates: { lat: 28.4530, lng: -16.2460 },
    rating: 4.5,
    review_count: 680,
    price_from: 6,
    currency: 'EUR',
    bookable: false,
    featured: true,
    sort_order: 10,
    visible: true,
  }])

  // 20. Charco del Viento
  console.log('20. Adding charco-del-viento-la-guancha...')
  await upsertItems([{
    subcategory_id: naturalPoolsId,
    slug: 'charco-del-viento-la-guancha',
    name: { es: 'Charco del Viento, La Guancha', en: 'Charco del Viento, La Guancha' },
    description: {
      es: 'Impresionante piscina natural formada entre rocas volcánicas en la costa de La Guancha. Sus aguas cristalinas y tranquilas contrastan con el oleaje del Atlántico que rompe justo al lado. El acceso es por un sendero costero que ofrece vistas espectaculares. Menos conocida que otras piscinas naturales de la isla, lo que la convierte en un tesoro por descubrir.',
      en: 'Stunning natural pool formed between volcanic rocks on the coast of La Guancha. Its crystal-clear calm waters contrast with the Atlantic waves breaking just beside it. Access is via a coastal path offering spectacular views. Less known than other natural pools on the island, making it a treasure to discover.',
    },
    short_description: { es: 'Piscina natural entre rocas volcánicas', en: 'Natural pool between volcanic rocks' },
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&q=80',
    location: { es: 'La Guancha', en: 'La Guancha' },
    coordinates: { lat: 28.3890, lng: -16.6590 },
    rating: 4.4,
    review_count: 230,
    price_from: 0,
    currency: 'EUR',
    bookable: false,
    featured: false,
    sort_order: 10,
    visible: true,
  }])

  console.log('\n=== Batch 5 complete! ===')
  console.log('Added 20 items across 16 subcategories:')
  console.log('  1. paragliding-tenerife (experiences/top-experiences)')
  console.log('  2. quad-safari-teide (experiences/top-experiences)')
  console.log('  3. speed-boat-dolphins (experiences/whale-watching)')
  console.log('  4. playa-el-medano (beaches/south-beaches)')
  console.log('  5. playa-san-juan (beaches/south-beaches)')
  console.log('  6. playa-el-rincon (beaches/north-beaches)')
  console.log('  7. sendero-lunar-teide (nature/hiking-trails)')
  console.log('  8. barranco-infierno-adeje (nature/hiking-trails)')
  console.log('  9. restaurante-el-cine (food/best-restaurants)')
  console.log('  10. tasca-el-obispo (food/best-restaurants)')
  console.log('  11. guachinche-bodega-castro (food/guachinches)')
  console.log('  12. bahia-beach-club (nightlife/beach-clubs)')
  console.log('  13. the-great-escape-pub (nightlife/bars-pubs)')
  console.log('  14. spa-royal-garden (wellness/spas)')
  console.log('  15. ron-miel-canario (shopping/local-products)')
  console.log('  16. icod-de-los-vinos (culture/historic-towns)')
  console.log('  17. cueva-del-viento (culture/guanche-heritage)')
  console.log('  18. monkey-park-tenerife (family/theme-parks)')
  console.log('  19. palmetum-santa-cruz (family/zoos-aquariums)')
  console.log('  20. charco-del-viento-la-guancha (nature/natural-pools)')
}

main().catch((err) => {
  console.error('FATAL:', err)
  process.exit(1)
})
