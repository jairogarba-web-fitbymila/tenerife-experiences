/**
 * Batch 6: Add 30 more items across multiple categories
 * Run with: npx tsx scripts/add-items-batch6.ts
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
  console.log('=== Batch 6: Adding 30 Items ===\n')

  // Load all subcategories we need
  console.log('Loading subcategories...')
  const [
    topExperiencesId,
    dayTripsId,
    bestBeachesId,
    hikingTrailsId,
    bestRestaurantsId,
    canarianCuisineId,
    festivalsId,
    clubsId,
    spasId,
    marketsId,
    historicTownsId,
    museumsId,
    themeParksId,
    naturalPoolsId,
  ] = await Promise.all([
    getSubcategoryId('experiences', 'top-experiences'),
    getSubcategoryId('experiences', 'day-trips'),
    getSubcategoryId('beaches', 'best-beaches'),
    getSubcategoryId('nature', 'hiking-trails'),
    getSubcategoryId('food', 'best-restaurants'),
    getSubcategoryId('food', 'canarian-cuisine'),
    getSubcategoryId('nightlife', 'festivals'),
    getSubcategoryId('nightlife', 'clubs'),
    getSubcategoryId('wellness', 'spas'),
    getSubcategoryId('shopping', 'markets'),
    getSubcategoryId('culture', 'historic-towns'),
    getSubcategoryId('culture', 'museums'),
    getSubcategoryId('family', 'theme-parks'),
    getSubcategoryId('nature', 'natural-pools'),
  ])
  console.log('Subcategories loaded\n')

  // 1. Buggy Adventure Teide (experiences/top-experiences)
  console.log('1. Adding buggy-adventure-tenerife...')
  await upsertItems([{
    subcategory_id: topExperiencesId,
    slug: 'buggy-adventure-tenerife',
    name: { es: 'Buggy Adventure Teide', en: 'Buggy Adventure Teide' },
    description: {
      es: 'Aventura off-road en buggy por los senderos volcánicos del Parque Nacional del Teide. Conduce tu propio buggy por pistas de tierra entre paisajes lunares, coladas de lava y bosques de pinos canarios. 2.5 horas de adrenalina pura con un guía experto que te llevará por rutas exclusivas lejos de las carreteras principales. Incluye equipo de seguridad, casco y gafas protectoras.',
      en: 'Off-road buggy adventure through the volcanic trails of Teide National Park. Drive your own buggy along dirt tracks through lunar landscapes, lava flows and Canarian pine forests. 2.5 hours of pure adrenaline with an expert guide who will take you on exclusive routes away from main roads. Includes safety equipment, helmet and protective goggles.',
    },
    short_description: { es: 'Aventura off-road en buggy por el Teide', en: 'Off-road buggy adventure through Teide' },
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80',
    location: { es: 'Parque Nacional del Teide', en: 'Teide National Park' },
    coordinates: { lat: 28.2700, lng: -16.6400 },
    rating: 4.7,
    review_count: 320,
    price_from: 75,
    currency: 'EUR',
    duration: '2.5h',
    bookable: true,
    featured: true,
    sort_order: 12,
    visible: true,
  }])

  // 2. Helicopter Tour South Coast (experiences/top-experiences)
  console.log('2. Adding helicopter-south-coast...')
  await upsertItems([{
    subcategory_id: topExperiencesId,
    slug: 'helicopter-south-coast',
    name: { es: 'Tour en Helicóptero Costa Sur', en: 'Helicopter Tour South Coast' },
    description: {
      es: 'Sobrevuela los acantilados de Los Gigantes y la costa sur de Tenerife en un vuelo en helicóptero de 15 minutos. Contempla desde el aire las impresionantes paredes verticales de 600 metros, las playas volcánicas, los pueblos costeros y el océano Atlántico infinito. Una experiencia inolvidable con vistas panorámicas de 360 grados que no se pueden conseguir de ninguna otra forma.',
      en: 'Fly over the cliffs of Los Gigantes and the south coast of Tenerife on a 15-minute helicopter flight. See from above the stunning 600-metre vertical walls, volcanic beaches, coastal villages and the infinite Atlantic Ocean. An unforgettable experience with 360-degree panoramic views that cannot be achieved any other way.',
    },
    short_description: { es: 'Vuelo en helicóptero sobre Los Gigantes y costa sur', en: '15-minute flight over Los Gigantes and south coast' },
    image: 'https://images.unsplash.com/photo-1534786676866-f3a38a0e0baa?w=800&q=80',
    location: { es: 'Helipuerto del Sur, Adeje', en: 'South Heliport, Adeje' },
    coordinates: { lat: 28.0800, lng: -16.7260 },
    rating: 4.9,
    review_count: 180,
    price_from: 150,
    currency: 'EUR',
    duration: '15 min',
    bookable: true,
    featured: true,
    sort_order: 13,
    visible: true,
  }])

  // 3. Segway Tour Santa Cruz (experiences/top-experiences)
  console.log('3. Adding segway-tour-santa-cruz...')
  await upsertItems([{
    subcategory_id: topExperiencesId,
    slug: 'segway-tour-santa-cruz',
    name: { es: 'Tour en Segway por Santa Cruz', en: 'Segway Tour Santa Cruz' },
    description: {
      es: 'Recorre la capital de Tenerife de una forma divertida y diferente en segway. Un guía local te llevará por los lugares más emblemáticos de Santa Cruz: la Plaza de España, el Auditorio de Calatrava, el Parque García Sanabria, la Calle del Castillo y el puerto. 1.5 horas de paseo guiado con explicaciones históricas y culturales. Incluye formación previa y casco.',
      en: 'Explore the capital of Tenerife in a fun and different way on a segway. A local guide will take you through the most iconic spots of Santa Cruz: Plaza de España, the Calatrava Auditorium, García Sanabria Park, Castillo Street and the harbour. 1.5 hours of guided ride with historical and cultural explanations. Includes prior training and helmet.',
    },
    short_description: { es: 'Paseo guiado en segway por la capital', en: 'Guided segway ride through the capital' },
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80',
    location: { es: 'Santa Cruz de Tenerife', en: 'Santa Cruz de Tenerife' },
    coordinates: { lat: 28.4682, lng: -16.2546 },
    rating: 4.5,
    review_count: 240,
    price_from: 35,
    currency: 'EUR',
    duration: '1.5h',
    bookable: true,
    featured: false,
    sort_order: 14,
    visible: true,
  }])

  // 4. Day Trip La Palma Volcanoes (experiences/day-trips)
  console.log('4. Adding tour-la-palma-volcanes...')
  await upsertItems([{
    subcategory_id: dayTripsId,
    slug: 'tour-la-palma-volcanes',
    name: { es: 'Excursión a La Palma: Volcanes', en: 'Day Trip La Palma Volcanoes' },
    description: {
      es: 'Excursión de un día completo a la isla de La Palma para visitar el volcán Tajogaite, que erupcionó en 2021. Incluye ferry de ida y vuelta desde Los Cristianos, autobús con guía profesional, visita al mirador del volcán, recorrido por las coladas de lava solidificada y parada en la capital Santa Cruz de La Palma. Una oportunidad única para ver de cerca la fuerza de la naturaleza.',
      en: 'Full day trip to La Palma island to visit the Tajogaite volcano that erupted in 2021. Includes return ferry from Los Cristianos, bus with professional guide, visit to the volcano viewpoint, tour through the solidified lava flows and a stop in the capital Santa Cruz de La Palma. A unique opportunity to see the force of nature up close.',
    },
    short_description: { es: 'Visita el nuevo volcán Tajogaite en La Palma', en: 'Visit the new Tajogaite volcano in La Palma' },
    image: 'https://images.unsplash.com/photo-1462332420958-a05d1e002413?w=800&q=80',
    location: { es: 'La Palma (salida desde Los Cristianos)', en: 'La Palma (departure from Los Cristianos)' },
    coordinates: { lat: 28.6135, lng: -17.8632 },
    rating: 4.6,
    review_count: 290,
    price_from: 89,
    currency: 'EUR',
    duration: 'Full day',
    bookable: true,
    featured: true,
    sort_order: 10,
    visible: true,
  }])

  // 5. North Tenerife Full Day Tour (experiences/day-trips)
  console.log('5. Adding north-tenerife-tour...')
  await upsertItems([{
    subcategory_id: dayTripsId,
    slug: 'north-tenerife-tour',
    name: { es: 'Tour Norte de Tenerife Día Completo', en: 'North Tenerife Full Day Tour' },
    description: {
      es: 'Descubre la cara verde y auténtica de Tenerife en esta excursión de día completo por el norte de la isla. Visita la ciudad patrimonio UNESCO de La Laguna, adéntrate en el bosque de laurisilva del Parque Rural de Anaga, descubre el pueblo pesquero de Taganana y relájate en la playa de Las Teresitas. 8 horas con guía profesional, transporte y tiempo libre para almorzar.',
      en: 'Discover the green and authentic side of Tenerife on this full day tour of the island\'s north. Visit the UNESCO heritage city of La Laguna, explore the laurel forest of Anaga Rural Park, discover the fishing village of Taganana and relax at Las Teresitas beach. 8 hours with professional guide, transport and free time for lunch.',
    },
    short_description: { es: 'La Laguna, Anaga, Taganana y Las Teresitas', en: 'La Laguna, Anaga, Taganana and Las Teresitas' },
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80',
    location: { es: 'Norte de Tenerife', en: 'North Tenerife' },
    coordinates: { lat: 28.5165, lng: -16.2906 },
    rating: 4.7,
    review_count: 410,
    price_from: 55,
    currency: 'EUR',
    duration: '8h',
    bookable: true,
    featured: true,
    sort_order: 11,
    visible: true,
  }])

  // 6. Playa Diego Hernández (beaches/best-beaches)
  console.log('6. Adding playa-diego-hernandez...')
  await upsertItems([{
    subcategory_id: bestBeachesId,
    slug: 'playa-diego-hernandez',
    name: { es: 'Playa Diego Hernández', en: 'Playa Diego Hernández' },
    description: {
      es: 'Playa escondida solo accesible a pie desde La Caleta, a través de un sendero costero de unos 20 minutos. Agua cristalina color turquesa, arena clara y un ambiente bohemio y natural. No hay servicios ni chiringuitos, lo que la convierte en una de las playas más vírgenes del sur de Tenerife. Es frecuentada por nudistas y amantes de la naturaleza. Lleva agua, comida y protección solar.',
      en: 'Hidden beach only accessible on foot from La Caleta, via a coastal path of about 20 minutes. Crystal clear turquoise water, light sand and a bohemian natural atmosphere. There are no services or beach bars, making it one of the most pristine beaches in southern Tenerife. Popular with nudists and nature lovers. Bring water, food and sun protection.',
    },
    short_description: { es: 'Playa escondida con agua turquesa cristalina', en: 'Hidden beach with crystal clear turquoise water' },
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80',
    location: { es: 'La Caleta, Adeje', en: 'La Caleta, Adeje' },
    coordinates: { lat: 28.1010, lng: -16.7620 },
    rating: 4.8,
    review_count: 520,
    price_from: 0,
    currency: 'EUR',
    bookable: false,
    featured: true,
    sort_order: 10,
    visible: true,
  }])

  // 7. Playa de Abama (beaches/best-beaches)
  console.log('7. Adding playa-abama...')
  await upsertItems([{
    subcategory_id: bestBeachesId,
    slug: 'playa-abama',
    name: { es: 'Playa de Abama', en: 'Abama Beach' },
    description: {
      es: 'Playa exclusiva junto al resort Ritz-Carlton de Guía de Isora. Arena oscura volcánica, aguas tranquilas y acantilados impresionantes rodean esta pequeña cala de gran belleza. Se accede por un sendero desde el resort o en barco. A pesar de su asociación con el hotel de lujo, la playa es pública. Ambiente selecto y tranquilo, ideal para un día de relax total.',
      en: 'Exclusive beach next to the Ritz-Carlton resort in Guía de Isora. Dark volcanic sand, calm waters and stunning cliffs surround this small cove of great beauty. Accessed via a path from the resort or by boat. Despite its association with the luxury hotel, the beach is public. Select and peaceful atmosphere, ideal for a day of total relaxation.',
    },
    short_description: { es: 'Playa exclusiva junto al Ritz-Carlton con acantilados', en: 'Exclusive beach at Ritz-Carlton resort with stunning cliffs' },
    image: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=800&q=80',
    location: { es: 'Guía de Isora', en: 'Guía de Isora' },
    coordinates: { lat: 28.1640, lng: -16.8410 },
    rating: 4.7,
    review_count: 380,
    price_from: 0,
    currency: 'EUR',
    bookable: false,
    featured: true,
    sort_order: 11,
    visible: true,
  }])

  // 8. Playa de Los Güíos (beaches/best-beaches)
  console.log('8. Adding playa-los-guios...')
  await upsertItems([{
    subcategory_id: bestBeachesId,
    slug: 'playa-los-guios',
    name: { es: 'Playa de Los Güíos', en: 'Los Güíos Beach' },
    description: {
      es: 'Pequeña playa situada al pie de los acantilados de Los Gigantes, con vistas impresionantes a las paredes verticales de más de 600 metros de altura. Arena negra volcánica y aguas cristalinas hacen de esta playa una de las más fotografiadas de Tenerife. Se accede desde el puerto deportivo de Los Gigantes. Cuenta con restaurantes cercanos y alquiler de kayaks.',
      en: 'Small beach at the foot of the Los Gigantes cliffs, with stunning views of the vertical walls rising over 600 metres. Black volcanic sand and crystal-clear waters make this one of the most photographed beaches in Tenerife. Accessed from Los Gigantes marina. Features nearby restaurants and kayak rental.',
    },
    short_description: { es: 'Playa al pie de los acantilados de 600m de Los Gigantes', en: 'Beach at the base of the 600m Los Gigantes cliffs' },
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    location: { es: 'Los Gigantes, Santiago del Teide', en: 'Los Gigantes, Santiago del Teide' },
    coordinates: { lat: 28.2470, lng: -16.8430 },
    rating: 4.6,
    review_count: 650,
    price_from: 0,
    currency: 'EUR',
    bookable: false,
    featured: true,
    sort_order: 12,
    visible: true,
  }])

  // 9. Roques de García trail (nature/hiking-trails)
  console.log('9. Adding sendero-roques-garcia...')
  await upsertItems([{
    subcategory_id: hikingTrailsId,
    slug: 'sendero-roques-garcia',
    name: { es: 'Sendero Circular Roques de García', en: 'Roques de García Circular Trail' },
    description: {
      es: 'Ruta circular fácil de 3.5 km alrededor de las icónicas formaciones rocosas de los Roques de García, en el corazón del Parque Nacional del Teide. Pasea entre el famoso Roque Cinchado, la Catedral y otras esculturas naturales de lava erosionada. Vistas espectaculares al Teide y a la caldera de Las Cañadas. Apta para todos los niveles. 1.5 horas. Gratuita.',
      en: 'Easy 3.5 km circular route around the iconic rock formations of Roques de García, in the heart of Teide National Park. Walk among the famous Roque Cinchado, the Cathedral and other natural sculptures of eroded lava. Spectacular views of Teide and the Las Cañadas caldera. Suitable for all levels. 1.5 hours. Free.',
    },
    short_description: { es: 'Ruta fácil de 3.5 km entre formaciones rocosas icónicas', en: 'Easy 3.5 km loop around iconic rock formations' },
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    location: { es: 'Parque Nacional del Teide', en: 'Teide National Park' },
    coordinates: { lat: 28.2244, lng: -16.6340 },
    rating: 4.8,
    review_count: 1200,
    price_from: 0,
    currency: 'EUR',
    duration: '1.5h',
    bookable: false,
    featured: true,
    sort_order: 12,
    visible: true,
  }])

  // 10. Camino Real de Chasna (nature/hiking-trails)
  console.log('10. Adding camino-real-chasna...')
  await upsertItems([{
    subcategory_id: hikingTrailsId,
    slug: 'camino-real-chasna',
    name: { es: 'Camino Real de Chasna', en: 'Royal Road of Chasna' },
    description: {
      es: 'Histórico camino real que conectaba Vilaflor con la costa sur, utilizado durante siglos por los habitantes de la isla para el comercio y el transporte. Hoy es una ruta de senderismo de dificultad media que atraviesa pinares canarios, zonas agrícolas abandonadas y paisajes volcánicos. 4 horas de recorrido con desnivel significativo. Un viaje al pasado de Tenerife.',
      en: 'Historic royal road that connected Vilaflor with the south coast, used for centuries by island inhabitants for trade and transport. Today it is a medium-difficulty hiking route that crosses Canarian pine forests, abandoned agricultural areas and volcanic landscapes. 4-hour route with significant elevation change. A journey into Tenerife\'s past.',
    },
    short_description: { es: 'Camino histórico de Vilaflor a la costa', en: 'Historic royal road from Vilaflor to the coast' },
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
    location: { es: 'Vilaflor - Costa Sur', en: 'Vilaflor - South Coast' },
    coordinates: { lat: 28.1580, lng: -16.6360 },
    rating: 4.5,
    review_count: 280,
    price_from: 0,
    currency: 'EUR',
    duration: '4h',
    bookable: false,
    featured: false,
    sort_order: 13,
    visible: true,
  }])

  // 11. Punta de Teno Lighthouse hike (nature/hiking-trails)
  console.log('11. Adding punta-teno-lighthouse...')
  await upsertItems([{
    subcategory_id: hikingTrailsId,
    slug: 'punta-teno-lighthouse',
    name: { es: 'Sendero del Faro de Punta de Teno', en: 'Punta de Teno Lighthouse Hike' },
    description: {
      es: 'Caminata hasta el punto más occidental de Tenerife, donde se encuentra el faro de Punta de Teno. El sendero ofrece vistas dramáticas de los acantilados más impresionantes de la isla, con La Gomera al fondo en días claros. El recorrido discurre por un paisaje árido y volcánico con vegetación costera endémica. 2 horas ida y vuelta. Acceso en guagua desde Buenavista.',
      en: 'Walk to the westernmost point of Tenerife, where the Punta de Teno lighthouse stands. The trail offers dramatic views of the island\'s most impressive cliffs, with La Gomera in the background on clear days. The route runs through an arid volcanic landscape with endemic coastal vegetation. 2 hours round trip. Access by bus from Buenavista.',
    },
    short_description: { es: 'Caminata al punto más occidental con acantilados dramáticos', en: 'Walk to the westernmost point with dramatic cliffs' },
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80',
    location: { es: 'Punta de Teno, Buenavista del Norte', en: 'Punta de Teno, Buenavista del Norte' },
    coordinates: { lat: 28.3420, lng: -16.9240 },
    rating: 4.7,
    review_count: 460,
    price_from: 0,
    currency: 'EUR',
    duration: '2h',
    bookable: false,
    featured: true,
    sort_order: 14,
    visible: true,
  }])

  // 12. Kazan Restaurant (food/best-restaurants)
  console.log('12. Adding restaurante-kazan...')
  await upsertItems([{
    subcategory_id: bestRestaurantsId,
    slug: 'restaurante-kazan',
    name: { es: 'Kazan, Costa Adeje', en: 'Kazan, Costa Adeje' },
    description: {
      es: 'Restaurante de fusión japonesa con ingredientes canarios en Costa Adeje. La experiencia omakase del chef combina técnicas japonesas tradicionales con productos locales de Tenerife: atún rojo de las islas, mojo rojo en salsas asiáticas y frutas tropicales en los postres. Ambiente minimalista y elegante con barra de sushi y mesas íntimas. Menú omakase desde 80€.',
      en: 'Japanese fusion restaurant with Canarian ingredients in Costa Adeje. The chef\'s omakase experience combines traditional Japanese techniques with local Tenerife produce: island red tuna, mojo rojo in Asian sauces and tropical fruits in desserts. Minimalist and elegant atmosphere with sushi bar and intimate tables. Omakase menu from 80 euros.',
    },
    short_description: { es: 'Fusión japonesa con ingredientes canarios y omakase', en: 'Japanese fusion with Canarian ingredients and omakase' },
    image: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=800&q=80',
    location: { es: 'Costa Adeje', en: 'Costa Adeje' },
    coordinates: { lat: 28.0790, lng: -16.7290 },
    rating: 4.8,
    review_count: 310,
    price_from: 80,
    currency: 'EUR',
    bookable: true,
    featured: true,
    sort_order: 12,
    visible: true,
  }])

  // 13. La Torre del Mirador (food/best-restaurants)
  console.log('13. Adding restaurante-la-torre-del-mirador...')
  await upsertItems([{
    subcategory_id: bestRestaurantsId,
    slug: 'restaurante-la-torre-del-mirador',
    name: { es: 'La Torre del Mirador, Arona', en: 'La Torre del Mirador, Arona' },
    description: {
      es: 'Restaurante panorámico con vistas de 360 grados situado en las alturas de Arona. Su terraza circular ofrece una perspectiva única del sur de Tenerife, desde el Teide hasta el océano. Cocina internacional con toques canarios: carnes a la brasa, pescados frescos y postres artesanales. Ideal para cenas románticas al atardecer. Precio medio 40€ por persona.',
      en: 'Panoramic restaurant with 360-degree views located in the heights of Arona. Its circular terrace offers a unique perspective of southern Tenerife, from Teide to the ocean. International cuisine with Canarian touches: grilled meats, fresh fish and artisan desserts. Ideal for romantic sunset dinners. Average price 40 euros per person.',
    },
    short_description: { es: 'Restaurante panorámico con vistas 360° en Arona', en: 'Panoramic restaurant with 360° views in Arona' },
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    location: { es: 'Arona', en: 'Arona' },
    coordinates: { lat: 28.0940, lng: -16.6810 },
    rating: 4.5,
    review_count: 270,
    price_from: 40,
    currency: 'EUR',
    bookable: true,
    featured: false,
    sort_order: 13,
    visible: true,
  }])

  // 14. Taberna El Mitón (food/best-restaurants)
  console.log('14. Adding taberna-el-miton...')
  await upsertItems([{
    subcategory_id: bestRestaurantsId,
    slug: 'taberna-el-miton',
    name: { es: 'Taberna El Mitón, La Laguna', en: 'Taberna El Mitón, La Laguna' },
    description: {
      es: 'Taberna canaria tradicional en el centro histórico UNESCO de La Laguna. Un local pequeño y auténtico con decoración rústica que sirve tapas y raciones de cocina canaria casera a precios muy asequibles. Papas arrugadas, queso asado, croquetas de gofio, carne de cabra y vinos de la isla. Ambiente animado con parroquianos locales. Tapas desde 3€.',
      en: 'Traditional Canarian tavern in the UNESCO historic centre of La Laguna. A small and authentic venue with rustic decor serving tapas and portions of homemade Canarian cuisine at very affordable prices. Wrinkled potatoes, grilled cheese, gofio croquettes, goat meat and island wines. Lively atmosphere with local regulars. Tapas from 3 euros.',
    },
    short_description: { es: 'Taberna canaria tradicional con tapas desde 3€', en: 'Traditional Canarian tavern with tapas from 3 euros' },
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
    location: { es: 'San Cristóbal de La Laguna', en: 'San Cristóbal de La Laguna' },
    coordinates: { lat: 28.4870, lng: -16.3150 },
    rating: 4.6,
    review_count: 490,
    price_from: 3,
    currency: 'EUR',
    bookable: false,
    featured: true,
    sort_order: 14,
    visible: true,
  }])

  // 15. Ropa Vieja Canaria (food/canarian-cuisine)
  console.log('15. Adding ropa-vieja-canaria...')
  await upsertItems([{
    subcategory_id: canarianCuisineId,
    slug: 'ropa-vieja-canaria',
    name: { es: 'Ropa Vieja Canaria', en: 'Canarian Ropa Vieja' },
    description: {
      es: 'El plato de cuchara más reconfortante de la gastronomía canaria. Un guiso lento de garbanzos con carne de ternera deshilachada, pollo, papa, zanahoria, pimiento y tomate. Cada familia tiene su receta secreta, pero el resultado siempre es un plato con sabor a hogar. Se sirve tradicionalmente los domingos y en fiestas populares. Imprescindible probarlo en un guachinche auténtico.',
      en: 'The most comforting stew in Canarian gastronomy. A slow-cooked chickpea stew with shredded beef, chicken, potato, carrot, pepper and tomato. Every family has their secret recipe, but the result is always a dish that tastes like home. Traditionally served on Sundays and at popular festivals. A must-try at an authentic guachinche.',
    },
    short_description: { es: 'Guiso tradicional de garbanzos con carne deshilachada', en: 'Traditional chickpea and shredded meat stew' },
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80',
    location: { es: 'Toda la isla', en: 'Whole island' },
    coordinates: { lat: 28.2916, lng: -16.6291 },
    rating: 4.7,
    review_count: 350,
    price_from: 0,
    currency: 'EUR',
    bookable: false,
    featured: true,
    sort_order: 10,
    visible: true,
  }])

  // 16. Bienmesabe (food/canarian-cuisine)
  console.log('16. Adding bienmesabe...')
  await upsertItems([{
    subcategory_id: canarianCuisineId,
    slug: 'bienmesabe',
    name: { es: 'Bienmesabe', en: 'Bienmesabe' },
    description: {
      es: 'Postre tradicional canario elaborado con almendras molidas, miel de palma o de abeja, yema de huevo y limón. Su nombre significa "me sabe bien" y es uno de los dulces más antiguos del archipiélago, con origen en la repostería conventual. Se sirve como postre solo o acompañando helado, bizcocho o quesillo. Textura cremosa, sabor dulce e intenso a almendra.',
      en: 'Traditional Canarian dessert made with ground almonds, palm or bee honey, egg yolk and lemon. Its name means "it tastes good to me" and it is one of the oldest sweets in the archipelago, originating from convent pastry-making. Served as a dessert on its own or accompanying ice cream, sponge cake or quesillo. Creamy texture with a sweet and intense almond flavour.',
    },
    short_description: { es: 'Postre tradicional de almendras con miel', en: 'Traditional almond cream dessert with honey' },
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80',
    location: { es: 'Toda la isla', en: 'Whole island' },
    coordinates: { lat: 28.2916, lng: -16.6291 },
    rating: 4.5,
    review_count: 280,
    price_from: 0,
    currency: 'EUR',
    bookable: false,
    featured: false,
    sort_order: 11,
    visible: true,
  }])

  // 17. Magma Festival (nightlife/festivals)
  console.log('17. Adding magma-festival...')
  await upsertItems([{
    subcategory_id: festivalsId,
    slug: 'magma-festival',
    name: { es: 'Magma Festival', en: 'Magma Festival' },
    description: {
      es: 'Festival anual de música techno y electrónica que se celebra en un recinto industrial en el sur de Tenerife. DJs nacionales e internacionales de primer nivel en un ambiente underground con producción de sonido e iluminación de última generación. Varias salas con diferentes estilos: techno, house, minimal y ambient. Una cita imprescindible para los amantes de la música electrónica.',
      en: 'Annual techno and electronic music festival held in an industrial venue in southern Tenerife. Top national and international DJs in an underground atmosphere with state-of-the-art sound and lighting production. Multiple rooms with different styles: techno, house, minimal and ambient. A must-attend event for electronic music lovers.',
    },
    short_description: { es: 'Festival de techno y electrónica en venue industrial', en: 'Techno and electronic music festival in industrial venue' },
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80',
    location: { es: 'Sur de Tenerife', en: 'South Tenerife' },
    coordinates: { lat: 28.0530, lng: -16.7200 },
    rating: 4.4,
    review_count: 190,
    price_from: 40,
    currency: 'EUR',
    bookable: true,
    featured: true,
    sort_order: 10,
    visible: true,
  }])

  // 18. Tenerife Latin Fest (nightlife/festivals)
  console.log('18. Adding tenerife-latin-fest...')
  await upsertItems([{
    subcategory_id: festivalsId,
    slug: 'tenerife-latin-fest',
    name: { es: 'Tenerife Latin Fest', en: 'Tenerife Latin Fest' },
    description: {
      es: 'Festival de música latina que combina salsa, bachata y reggaetón durante un fin de semana completo en el sur de Tenerife. Pool parties durante el día, talleres de baile por la tarde y fiestas nocturnas con artistas y DJs latinos internacionales. El evento atrae a bailarines y amantes de la música latina de toda Europa. Pases desde 30€.',
      en: 'Latin music festival combining salsa, bachata and reggaeton over a full weekend in southern Tenerife. Pool parties during the day, dance workshops in the afternoon and night parties with international Latin artists and DJs. The event attracts dancers and Latin music lovers from all over Europe. Passes from 30 euros.',
    },
    short_description: { es: 'Festival de salsa, bachata y reggaetón con pool parties', en: 'Salsa, bachata and reggaeton festival with pool parties' },
    image: 'https://images.unsplash.com/photo-1504680177321-2e6a879aac86?w=800&q=80',
    location: { es: 'Sur de Tenerife', en: 'South Tenerife' },
    coordinates: { lat: 28.0560, lng: -16.7290 },
    rating: 4.3,
    review_count: 220,
    price_from: 30,
    currency: 'EUR',
    bookable: true,
    featured: false,
    sort_order: 11,
    visible: true,
  }])

  // 19. Tibu Nightclub (nightlife/clubs)
  console.log('19. Adding tibu-disco-playa-americas...')
  await upsertItems([{
    subcategory_id: clubsId,
    slug: 'tibu-disco-playa-americas',
    name: { es: 'Tibu Nightclub, Playa de las Américas', en: 'Tibu Nightclub, Playa de las Americas' },
    description: {
      es: 'Discoteca de alto standing en Playa de las Américas con zona VIP, rooftop bar y una pista de baile principal con sistema de sonido envolvente. Música comercial, urban, reggaetón y sesiones especiales de DJs residentes e invitados. Decoración sofisticada, servicio de botellas y reservas de mesa. El punto de referencia de la noche exclusiva en el sur de Tenerife.',
      en: 'Upscale nightclub in Playa de las Americas with VIP area, rooftop bar and a main dance floor with surround sound system. Commercial, urban, reggaeton music and special sessions by resident and guest DJs. Sophisticated decor, bottle service and table reservations. The reference point for exclusive nightlife in southern Tenerife.',
    },
    short_description: { es: 'Discoteca exclusiva con VIP y rooftop', en: 'Upscale nightclub with VIP area and rooftop' },
    image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=800&q=80',
    location: { es: 'Playa de las Américas', en: 'Playa de las Americas' },
    coordinates: { lat: 28.0560, lng: -16.7290 },
    rating: 4.1,
    review_count: 340,
    price_from: 15,
    currency: 'EUR',
    bookable: true,
    featured: true,
    sort_order: 10,
    visible: true,
  }])

  // 20. Monkey Nightclub (nightlife/clubs)
  console.log('20. Adding monkey-club-playa-americas...')
  await upsertItems([{
    subcategory_id: clubsId,
    slug: 'monkey-club-playa-americas',
    name: { es: 'Monkey Nightclub, Playa de las Américas', en: 'Monkey Nightclub, Playa de las Americas' },
    description: {
      es: 'Club de varias plantas conectado con el Monkey Beach Club, lo que permite pasar del ambiente de playa diurno a la fiesta nocturna sin cambiar de lugar. Música house y techno con DJs internacionales invitados regularmente. Terraza al aire libre, sala principal y zona chill. Eventos temáticos y fiestas de espuma en verano. Uno de los clubs más animados del sur.',
      en: 'Multi-floor club connected to Monkey Beach Club, allowing you to transition from daytime beach vibes to nighttime party without changing venue. House and techno music with international guest DJs regularly. Open-air terrace, main room and chill zone. Themed events and foam parties in summer. One of the liveliest clubs in the south.',
    },
    short_description: { es: 'Club multi-planta con house y techno junto al beach club', en: 'Multi-floor club with house and techno next to beach club' },
    image: 'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=800&q=80',
    location: { es: 'Playa de las Américas', en: 'Playa de las Americas' },
    coordinates: { lat: 28.0550, lng: -16.7280 },
    rating: 4.0,
    review_count: 280,
    price_from: 10,
    currency: 'EUR',
    bookable: true,
    featured: false,
    sort_order: 11,
    visible: true,
  }])

  // 21. Spa Vincci La Plantación (wellness/spas)
  console.log('21. Adding spa-vincci-la-plantacion...')
  await upsertItems([{
    subcategory_id: spasId,
    slug: 'spa-vincci-la-plantacion',
    name: { es: 'Spa Vincci La Plantación del Sur', en: 'Spa Vincci La Plantación del Sur' },
    description: {
      es: 'Spa de estilo colonial en el hotel Vincci La Plantación del Sur, Costa Adeje. Circuito de hidroterapia completo con piscina dinámica, jacuzzi, cascada cervical, camas de burbujas, sauna finlandesa, baño turco y duchas de sensaciones. Tratamientos corporales y faciales con productos naturales canarios como aloe vera y miel de palma. Ambiente sereno y elegante.',
      en: 'Colonial-style spa at the Vincci La Plantación del Sur hotel, Costa Adeje. Full hydrotherapy circuit with dynamic pool, jacuzzi, cervical waterfall, bubble beds, Finnish sauna, Turkish bath and sensation showers. Body and facial treatments with natural Canarian products like aloe vera and palm honey. Serene and elegant atmosphere.',
    },
    short_description: { es: 'Spa colonial con circuito de hidroterapia completo', en: 'Colonial-style spa with full hydrotherapy circuit' },
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
    location: { es: 'Costa Adeje', en: 'Costa Adeje' },
    coordinates: { lat: 28.0780, lng: -16.7310 },
    rating: 4.5,
    review_count: 260,
    price_from: 65,
    currency: 'EUR',
    duration: '2h',
    bookable: true,
    featured: false,
    sort_order: 11,
    visible: true,
  }])

  // 22. Thai Room Spa (wellness/spas)
  console.log('22. Adding thai-room-spa-tenerife...')
  await upsertItems([{
    subcategory_id: spasId,
    slug: 'thai-room-spa-tenerife',
    name: { es: 'Thai Room Spa', en: 'Thai Room Spa' },
    description: {
      es: 'Centro de masajes y tratamientos tailandeses auténticos realizados por terapeutas profesionales tailandeses. Masaje tradicional thai, masaje con aceites aromáticos, reflexología podal, masaje de espalda y tratamientos faciales. Ambiente zen con decoración tailandesa original. Varias ubicaciones en el sur de Tenerife. Masajes desde 50€. Sin circuito de aguas.',
      en: 'Authentic Thai massage and treatment centre with professional Thai therapists. Traditional Thai massage, aromatic oil massage, foot reflexology, back massage and facial treatments. Zen atmosphere with original Thai decor. Several locations in southern Tenerife. Massages from 50 euros. No water circuit.',
    },
    short_description: { es: 'Masajes tailandeses auténticos por terapeutas thai', en: 'Authentic Thai treatments by Thai therapists' },
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80',
    location: { es: 'Sur de Tenerife', en: 'South Tenerife' },
    coordinates: { lat: 28.0720, lng: -16.7260 },
    rating: 4.6,
    review_count: 340,
    price_from: 50,
    currency: 'EUR',
    duration: '1h',
    bookable: true,
    featured: true,
    sort_order: 12,
    visible: true,
  }])

  // 23. Mercadillo de Torviscas (shopping/markets)
  console.log('23. Adding mercadillo-torviscas...')
  await upsertItems([{
    subcategory_id: marketsId,
    slug: 'mercadillo-torviscas',
    name: { es: 'Mercadillo de Torviscas', en: 'Torviscas Market' },
    description: {
      es: 'Mercadillo al aire libre que se celebra los jueves y sábados en Costa Adeje. Más de 100 puestos con ropa, artesanía local, souvenirs, joyería, complementos y productos canarios. Ambiente animado y turístico con música en vivo ocasional. Ideal para comprar regalos y recuerdos a buen precio. Horario de 9:00 a 14:00. Aparcamiento gratuito cercano.',
      en: 'Open-air market held on Thursdays and Saturdays in Costa Adeje. Over 100 stalls with clothes, local crafts, souvenirs, jewellery, accessories and Canarian products. Lively tourist atmosphere with occasional live music. Ideal for buying gifts and souvenirs at good prices. Open 9:00 to 14:00. Free parking nearby.',
    },
    short_description: { es: 'Mercadillo los jueves y sábados en Costa Adeje', en: 'Thursday and Saturday market in Costa Adeje' },
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
    location: { es: 'Torviscas, Costa Adeje', en: 'Torviscas, Costa Adeje' },
    coordinates: { lat: 28.0780, lng: -16.7340 },
    rating: 4.0,
    review_count: 420,
    price_from: 0,
    currency: 'EUR',
    bookable: false,
    featured: false,
    sort_order: 10,
    visible: true,
  }])

  // 24. Mercado Municipal La Laguna (shopping/markets)
  console.log('24. Adding mercado-municipal-laguna...')
  await upsertItems([{
    subcategory_id: marketsId,
    slug: 'mercado-municipal-laguna',
    name: { es: 'Mercado Municipal de La Laguna', en: 'La Laguna Municipal Market' },
    description: {
      es: 'Mercado de abastos diario en el corazón de la ciudad UNESCO de San Cristóbal de La Laguna. Frutas tropicales, verduras de la huerta canaria, flores frescas, pescado del día, quesos artesanales y productos locales. Un edificio histórico renovado donde los laguneros hacen su compra diaria. Ambiente auténtico y precios locales. Lunes a sábado de 7:00 a 14:00.',
      en: 'Daily fresh market in the heart of the UNESCO city of San Cristóbal de La Laguna. Tropical fruits, Canarian garden vegetables, fresh flowers, catch of the day, artisan cheeses and local products. A renovated historic building where locals do their daily shopping. Authentic atmosphere and local prices. Monday to Saturday 7:00 to 14:00.',
    },
    short_description: { es: 'Mercado diario de productos frescos en la ciudad UNESCO', en: 'Daily fresh market in the UNESCO city' },
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&q=80',
    location: { es: 'San Cristóbal de La Laguna', en: 'San Cristóbal de La Laguna' },
    coordinates: { lat: 28.4870, lng: -16.3150 },
    rating: 4.4,
    review_count: 310,
    price_from: 0,
    currency: 'EUR',
    bookable: false,
    featured: true,
    sort_order: 11,
    visible: true,
  }])

  // 25. Candelaria (culture/historic-towns)
  console.log('25. Adding candelaria-basilica...')
  await upsertItems([{
    subcategory_id: historicTownsId,
    slug: 'candelaria-basilica',
    name: { es: 'Candelaria', en: 'Candelaria' },
    description: {
      es: 'Pueblo costero que alberga la Basílica de Nuestra Señora de la Candelaria, patrona de las Islas Canarias. La plaza de la basílica está flanqueada por las estatuas de bronce de los nueve menceyes guanches, creando una imagen icónica. Además del santuario, Candelaria ofrece una playa de arena negra, un paseo marítimo agradable y una cueva donde según la leyenda apareció la virgen.',
      en: 'Coastal town housing the Basilica of Our Lady of Candelaria, patron saint of the Canary Islands. The basilica square is flanked by bronze statues of the nine Guanche menceys, creating an iconic image. Besides the sanctuary, Candelaria offers a black sand beach, a pleasant seafront promenade and a cave where legend says the virgin appeared.',
    },
    short_description: { es: 'Basílica de la patrona de Canarias y estatuas guanches', en: 'Basilica of the patron saint and Guanche statues' },
    image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80',
    location: { es: 'Candelaria', en: 'Candelaria' },
    coordinates: { lat: 28.3530, lng: -16.3720 },
    rating: 4.5,
    review_count: 890,
    price_from: 0,
    currency: 'EUR',
    bookable: false,
    featured: true,
    sort_order: 11,
    visible: true,
  }])

  // 26. Vilaflor (culture/historic-towns)
  console.log('26. Adding vilaflor-pueblo-alto...')
  await upsertItems([{
    subcategory_id: historicTownsId,
    slug: 'vilaflor-pueblo-alto',
    name: { es: 'Vilaflor, el pueblo más alto de España', en: 'Vilaflor, Highest Village in Spain' },
    description: {
      es: 'Situado a 1.400 metros de altitud, Vilaflor ostenta el título de pueblo más alto de España. Puerta de entrada al Parque Nacional del Teide, este tranquilo pueblo de montaña ofrece aire puro, bosques de pinos canarios centenarios y vistas espectaculares. Pasea por sus calles empedradas, visita la iglesia de San Pedro Apóstol y prueba los vinos de altura de las bodegas locales.',
      en: 'Situated at 1,400 metres altitude, Vilaflor holds the title of the highest village in Spain. Gateway to Teide National Park, this peaceful mountain village offers clean air, centuries-old Canarian pine forests and spectacular views. Stroll its cobblestone streets, visit the Church of San Pedro Apóstol and try the high-altitude wines from local wineries.',
    },
    short_description: { es: 'El pueblo más alto de España a 1.400m, puerta al Teide', en: 'Highest village in Spain at 1,400m, gateway to Teide' },
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    location: { es: 'Vilaflor, Granadilla de Abona', en: 'Vilaflor, Granadilla de Abona' },
    coordinates: { lat: 28.1580, lng: -16.6360 },
    rating: 4.4,
    review_count: 420,
    price_from: 0,
    currency: 'EUR',
    bookable: false,
    featured: false,
    sort_order: 12,
    visible: true,
  }])

  // 27. Museo Militar de Almeida (culture/museums)
  console.log('27. Adding museo-militar-tenerife...')
  await upsertItems([{
    subcategory_id: museumsId,
    slug: 'museo-militar-tenerife',
    name: { es: 'Museo Militar de Almeida', en: 'Almeida Military Museum' },
    description: {
      es: 'Museo de historia militar ubicado en la fortaleza histórica de Almeida en Santa Cruz de Tenerife. Alberga el famoso cañón El Tigre, que según la tradición fue el que hirió al almirante Nelson durante el ataque británico de 1797. Colección de armas, uniformes, maquetas y documentos que recorren la historia militar de las Islas Canarias desde la conquista hasta el siglo XX. Entrada gratuita.',
      en: 'Military history museum located in the historic Almeida fortress in Santa Cruz de Tenerife. Houses the famous El Tigre cannon, which according to tradition was the one that wounded Admiral Nelson during the British attack of 1797. Collection of weapons, uniforms, models and documents covering the military history of the Canary Islands from the conquest to the 20th century. Free entry.',
    },
    short_description: { es: 'Fortaleza con el cañón que hirió a Nelson. Gratis', en: 'Fortress with the cannon that wounded Nelson. Free' },
    image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&q=80',
    location: { es: 'Santa Cruz de Tenerife', en: 'Santa Cruz de Tenerife' },
    coordinates: { lat: 28.4682, lng: -16.2460 },
    rating: 4.3,
    review_count: 340,
    price_from: 0,
    currency: 'EUR',
    bookable: false,
    featured: false,
    sort_order: 10,
    visible: true,
  }])

  // 28. Museo de Historia y Antropología (culture/museums)
  console.log('28. Adding museo-historia-antropologia...')
  await upsertItems([{
    subcategory_id: museumsId,
    slug: 'museo-historia-antropologia',
    name: { es: 'Museo de Historia y Antropología', en: 'Museum of History and Anthropology' },
    description: {
      es: 'Museo dedicado a la historia y antropología de las Islas Canarias, ubicado en un hermoso edificio colonial del siglo XVI en La Laguna. Recorre la historia de Tenerife desde los guanches hasta la era moderna a través de colecciones de cerámica aborigen, momias guanches, documentos históricos y objetos de la vida cotidiana. El propio edificio, la Casa Lercaro, es una joya arquitectónica. Entrada 3€.',
      en: 'Museum dedicated to the history and anthropology of the Canary Islands, housed in a beautiful 16th-century colonial building in La Laguna. Traces the history of Tenerife from the Guanches to the modern era through collections of aboriginal ceramics, Guanche mummies, historical documents and everyday life objects. The building itself, Casa Lercaro, is an architectural gem. Entry 3 euros.',
    },
    short_description: { es: 'Historia canaria desde los guanches en edificio colonial', en: 'Canarian history from Guanches in colonial building' },
    image: 'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=800&q=80',
    location: { es: 'San Cristóbal de La Laguna', en: 'San Cristóbal de La Laguna' },
    coordinates: { lat: 28.4870, lng: -16.3150 },
    rating: 4.4,
    review_count: 410,
    price_from: 3,
    currency: 'EUR',
    bookable: false,
    featured: true,
    sort_order: 11,
    visible: true,
  }])

  // 29. Pueblo Chico (family/theme-parks)
  console.log('29. Adding pueblo-chico-tenerife...')
  await upsertItems([{
    subcategory_id: themeParksId,
    slug: 'pueblo-chico-tenerife',
    name: { es: 'Pueblo Chico', en: 'Pueblo Chico' },
    description: {
      es: 'Parque temático de miniaturas en La Orotava con maquetas a escala de los monumentos, edificios y paisajes más representativos de Tenerife y las Islas Canarias. Más de 100 modelos a escala 1:25 reproducen con detalle impresionante iglesias, casonas, plazas, barcos y volcanes. Jardines tropicales con plantas autóctonas rodean las maquetas. Ideal para familias con niños. Entrada 15€ adultos.',
      en: 'Miniature theme park in La Orotava with scale models of the most representative monuments, buildings and landscapes of Tenerife and the Canary Islands. Over 100 models at 1:25 scale reproduce churches, mansions, squares, ships and volcanoes in impressive detail. Tropical gardens with native plants surround the models. Ideal for families with children. Entry 15 euros for adults.',
    },
    short_description: { es: 'Parque de miniaturas con maquetas de Tenerife', en: 'Miniature park with scale models of Tenerife landmarks' },
    image: 'https://images.unsplash.com/photo-1513807016779-d51c0c026263?w=800&q=80',
    location: { es: 'La Orotava', en: 'La Orotava' },
    coordinates: { lat: 28.3900, lng: -16.5230 },
    rating: 4.1,
    review_count: 380,
    price_from: 15,
    currency: 'EUR',
    duration: '1.5h',
    bookable: true,
    featured: false,
    sort_order: 11,
    visible: true,
  }])

  // 30. Charco de Jover (nature/natural-pools)
  console.log('30. Adding charco-jover-buenavista...')
  await upsertItems([{
    subcategory_id: naturalPoolsId,
    slug: 'charco-jover-buenavista',
    name: { es: 'Charco de Jover, Buenavista del Norte', en: 'Charco de Jover, Buenavista del Norte' },
    description: {
      es: 'Piscina natural remota en la costa de Buenavista del Norte, rodeada de plantaciones de plátanos y accesible solo por un sendero rural. Aguas cristalinas y tranquilas protegidas por formaciones de roca volcánica que crean una poza natural perfecta para el baño. Un rincón secreto del noroeste de Tenerife, lejos del turismo masivo. Gratuita y sin servicios. Llevar agua y calzado adecuado.',
      en: 'Remote natural pool on the coast of Buenavista del Norte, surrounded by banana plantations and accessible only via a rural path. Crystal-clear calm waters protected by volcanic rock formations that create a perfect natural bathing pool. A secret corner of northwest Tenerife, far from mass tourism. Free and without services. Bring water and suitable footwear.',
    },
    short_description: { es: 'Piscina natural remota entre plataneras', en: 'Remote natural pool surrounded by banana plantations' },
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&q=80',
    location: { es: 'Buenavista del Norte', en: 'Buenavista del Norte' },
    coordinates: { lat: 28.3720, lng: -16.8680 },
    rating: 4.3,
    review_count: 150,
    price_from: 0,
    currency: 'EUR',
    bookable: false,
    featured: false,
    sort_order: 11,
    visible: true,
  }])

  console.log('\n=== Batch 6 complete! ===')
  console.log('Added 30 items across 14 subcategories:')
  console.log('  1. buggy-adventure-tenerife (experiences/top-experiences)')
  console.log('  2. helicopter-south-coast (experiences/top-experiences)')
  console.log('  3. segway-tour-santa-cruz (experiences/top-experiences)')
  console.log('  4. tour-la-palma-volcanes (experiences/day-trips)')
  console.log('  5. north-tenerife-tour (experiences/day-trips)')
  console.log('  6. playa-diego-hernandez (beaches/best-beaches)')
  console.log('  7. playa-abama (beaches/best-beaches)')
  console.log('  8. playa-los-guios (beaches/best-beaches)')
  console.log('  9. sendero-roques-garcia (nature/hiking-trails)')
  console.log('  10. camino-real-chasna (nature/hiking-trails)')
  console.log('  11. punta-teno-lighthouse (nature/hiking-trails)')
  console.log('  12. restaurante-kazan (food/best-restaurants)')
  console.log('  13. restaurante-la-torre-del-mirador (food/best-restaurants)')
  console.log('  14. taberna-el-miton (food/best-restaurants)')
  console.log('  15. ropa-vieja-canaria (food/canarian-cuisine)')
  console.log('  16. bienmesabe (food/canarian-cuisine)')
  console.log('  17. magma-festival (nightlife/festivals)')
  console.log('  18. tenerife-latin-fest (nightlife/festivals)')
  console.log('  19. tibu-disco-playa-americas (nightlife/clubs)')
  console.log('  20. monkey-club-playa-americas (nightlife/clubs)')
  console.log('  21. spa-vincci-la-plantacion (wellness/spas)')
  console.log('  22. thai-room-spa-tenerife (wellness/spas)')
  console.log('  23. mercadillo-torviscas (shopping/markets)')
  console.log('  24. mercado-municipal-laguna (shopping/markets)')
  console.log('  25. candelaria-basilica (culture/historic-towns)')
  console.log('  26. vilaflor-pueblo-alto (culture/historic-towns)')
  console.log('  27. museo-militar-tenerife (culture/museums)')
  console.log('  28. museo-historia-antropologia (culture/museums)')
  console.log('  29. pueblo-chico-tenerife (family/theme-parks)')
  console.log('  30. charco-jover-buenavista (nature/natural-pools)')
}

main().catch((err) => {
  console.error('FATAL:', err)
  process.exit(1)
})
