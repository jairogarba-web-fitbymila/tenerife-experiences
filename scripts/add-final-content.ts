/**
 * Script to add final content items to Supabase
 * Adds: Wellness items (spas, yoga), Shopping items (markets, malls, local products), More events
 * Run with: npx tsx scripts/add-final-content.ts
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

async function getAreaId(slug: string): Promise<string> {
  const { data, error } = await supabase.from('areas').select('id').eq('slug', slug).single()
  if (error) throw new Error(`Area "${slug}" not found: ${error.message}`)
  return data.id
}

async function upsertItems(items: any[]) {
  const { error } = await supabase.from('items').upsert(items, { onConflict: 'subcategory_id,slug' })
  if (error) throw new Error(`Items upsert failed: ${error.message}`)
}

async function upsertEvents(events: any[]) {
  const { error } = await supabase.from('events').upsert(events, { onConflict: 'slug' })
  if (error) throw new Error(`Events upsert failed: ${error.message}`)
}

// --- Main ---

async function main() {
  console.log('=== Adding Final Content ===\n')

  // --- Load areas ---
  console.log('Loading areas...')
  const [costaAdeje, puertoCruz, santaCruz, anaga] = await Promise.all([
    getAreaId('costa-adeje'),
    getAreaId('puerto-de-la-cruz'),
    getAreaId('santa-cruz'),
    getAreaId('anaga'),
  ])
  console.log('Areas loaded\n')

  // --- Load subcategories ---
  console.log('Loading subcategories...')
  const [
    spasId,
    yogaRetreatsId,
    couplesId,
    marketsId,
    shoppingMallsId,
    localProductsId,
  ] = await Promise.all([
    getSubcategoryId('wellness', 'spas'),
    getSubcategoryId('wellness', 'yoga-retreats'),
    getSubcategoryId('wellness', 'couples'),
    getSubcategoryId('shopping', 'markets'),
    getSubcategoryId('shopping', 'shopping-malls'),
    getSubcategoryId('shopping', 'local-products'),
  ])
  console.log('Subcategories loaded\n')

  // =============================================
  // WELLNESS - SPAS
  // =============================================
  console.log('Adding spa items...')
  await upsertItems([
    {
      subcategory_id: spasId,
      slug: 'spa-ritz-carlton',
      name: { es: 'The Ritz-Carlton Spa, Abama', en: 'The Ritz-Carlton Spa, Abama', de: 'The Ritz-Carlton Spa, Abama' },
      description: {
        es: 'Spa de lujo en el resort 5 estrellas The Ritz-Carlton, Abama. Tratamientos exclusivos con piedra volcánica, piscinas infinitas con vistas al océano Atlántico y jardines tropicales. Incluye circuito termal, sauna finlandesa, baño turco y zona de relajación al aire libre con vistas panorámicas a La Gomera.',
        en: 'Luxury spa at the 5-star Ritz-Carlton, Abama resort. Exclusive volcanic stone treatments, infinity pools with Atlantic Ocean views and tropical gardens. Includes thermal circuit, Finnish sauna, Turkish bath and outdoor relaxation area with panoramic views to La Gomera.',
        de: 'Luxus-Spa im 5-Sterne-Resort The Ritz-Carlton, Abama. Exklusive Behandlungen mit Vulkanstein, Infinity-Pools mit Blick auf den Atlantik und tropische Gärten. Inklusive Thermalkreislauf, finnische Sauna, türkisches Bad und Outdoor-Entspannungsbereich mit Panoramablick auf La Gomera.',
      },
      short_description: { es: 'Spa de lujo con tratamientos volcánicos y vistas al océano', en: 'Luxury spa with volcanic treatments and ocean views', de: 'Luxus-Spa mit Vulkanbehandlungen und Meerblick' },
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
      location: { es: 'Costa Adeje, Guía de Isora', en: 'Costa Adeje, Guía de Isora' },
      area_id: costaAdeje,
      coordinates: { lat: 28.1650, lng: -16.7980 },
      rating: 4.9,
      review_count: 520,
      price_from: 120,
      currency: 'EUR',
      duration: '2-4 hours',
      bookable: true,
      booking_url: 'https://www.ritzcarlton.com/en/hotels/spain/abama/spa',
      featured: true,
      sort_order: 1,
      visible: true,
    },
    {
      subcategory_id: spasId,
      slug: 'oriental-spa-garden',
      name: { es: 'Oriental Spa Garden en Hotel Botánico', en: 'Oriental Spa Garden at Hotel Botanico', de: 'Oriental Spa Garden im Hotel Botánico' },
      description: {
        es: 'Spa de inspiración tailandesa en el emblemático Hotel Botánico de Puerto de la Cruz. Con 2500m² de instalaciones que incluyen piscinas interiores y exteriores climatizadas, saunas, baños turcos y una amplia carta de tratamientos orientales y occidentales. Un oasis de tranquilidad con jardines zen.',
        en: 'Thai-inspired spa at the iconic Hotel Botánico in Puerto de la Cruz. With 2,500m² of facilities including heated indoor and outdoor pools, saunas, Turkish baths and an extensive menu of Eastern and Western treatments. An oasis of tranquility with zen gardens.',
        de: 'Thailändisch inspiriertes Spa im legendären Hotel Botánico in Puerto de la Cruz. Mit 2.500m² Einrichtungen einschließlich beheizter Innen- und Außenpools, Saunen, türkischen Bädern und einem umfangreichen Angebot an östlichen und westlichen Behandlungen. Eine Oase der Ruhe mit Zen-Gärten.',
      },
      short_description: { es: 'Spa tailandés de 2500m² en Puerto de la Cruz', en: 'Thai-inspired 2,500m² spa in Puerto de la Cruz', de: 'Thailändisch inspiriertes 2.500m² Spa in Puerto de la Cruz' },
      image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80',
      location: { es: 'Puerto de la Cruz', en: 'Puerto de la Cruz' },
      area_id: puertoCruz,
      coordinates: { lat: 28.4140, lng: -16.5470 },
      rating: 4.7,
      review_count: 380,
      price_from: 85,
      currency: 'EUR',
      duration: '2-3 hours',
      bookable: true,
      booking_url: 'https://www.hotelbotanico.com/spa',
      featured: true,
      sort_order: 2,
      visible: true,
    },
    {
      subcategory_id: spasId,
      slug: 'aqua-club-termal',
      name: { es: 'Aqua Club Termal', en: 'Aqua Club Termal', de: 'Aqua Club Termal' },
      description: {
        es: 'Centro termal público en Costa Adeje con piscinas climatizadas, chorros de hidromasaje, cascadas cervicales, saunas, baños turcos y zona de relajación. Ideal para una tarde de relax sin necesidad de alojarse en un hotel. Ambiente familiar y accesible. Incluye taquillas y tumbonas.',
        en: 'Public thermal spa in Costa Adeje with heated pools, hydromassage jets, cervical waterfalls, saunas, Turkish baths and relaxation area. Ideal for a relaxing afternoon without needing a hotel stay. Family-friendly and accessible atmosphere. Includes lockers and sun loungers.',
        de: 'Öffentliches Thermalbad in Costa Adeje mit beheizten Pools, Hydromassage-Düsen, Nackenduschen, Saunen, türkischen Bädern und Entspannungsbereich. Ideal für einen entspannten Nachmittag ohne Hotelaufenthalt. Familienfreundliche und zugängliche Atmosphäre. Inklusive Schließfächer und Sonnenliegen.',
      },
      short_description: { es: 'Centro termal público con piscinas y saunas', en: 'Public thermal spa with pools and saunas', de: 'Öffentliches Thermalbad mit Pools und Saunen' },
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=800&q=80',
      location: { es: 'Costa Adeje', en: 'Costa Adeje' },
      area_id: costaAdeje,
      coordinates: { lat: 28.0810, lng: -16.7290 },
      rating: 4.2,
      review_count: 640,
      price_from: 35,
      currency: 'EUR',
      duration: '2-4 hours',
      bookable: true,
      featured: false,
      sort_order: 3,
      visible: true,
    },
  ])
  console.log('Spa items added')

  // =============================================
  // WELLNESS - YOGA RETREATS
  // =============================================
  console.log('Adding yoga retreat items...')
  await upsertItems([
    {
      subcategory_id: yogaRetreatsId,
      slug: 'tenerife-yoga-retreat',
      name: { es: 'Retiro de yoga en las montañas de Anaga', en: 'Yoga Retreat in Anaga Mountains', de: 'Yoga-Retreat in den Anaga-Bergen' },
      description: {
        es: 'Retiros semanales de yoga en el corazón del Parque Rural de Anaga, rodeado de laurisilva milenaria. Incluye sesiones diarias de yoga y meditación, senderismo por bosques de laurisilva, alimentación saludable y ecológica, y alojamiento en casa rural con vistas al océano. Grupos reducidos para una experiencia íntima.',
        en: 'Weekly yoga retreats in the heart of the Anaga Rural Park, surrounded by ancient laurel forests. Includes daily yoga and meditation sessions, hiking through laurel forests, healthy organic food, and accommodation in a rural house with ocean views. Small groups for an intimate experience.',
        de: 'Wöchentliche Yoga-Retreats im Herzen des Anaga-Naturparks, umgeben von uralten Lorbeerwäldern. Inklusive täglicher Yoga- und Meditationssitzungen, Wanderungen durch Lorbeerwälder, gesunder Bio-Ernährung und Unterkunft in einem Landhaus mit Meerblick. Kleine Gruppen für ein intimes Erlebnis.',
      },
      short_description: { es: 'Retiro semanal con yoga, meditación y naturaleza', en: 'Weekly retreat with yoga, meditation and nature', de: 'Wöchentliches Retreat mit Yoga, Meditation und Natur' },
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
      location: { es: 'Parque Rural de Anaga', en: 'Anaga Rural Park' },
      area_id: anaga,
      coordinates: { lat: 28.5430, lng: -16.2060 },
      rating: 4.8,
      review_count: 145,
      price_from: 450,
      currency: 'EUR',
      duration: '7 days',
      bookable: true,
      featured: true,
      sort_order: 1,
      visible: true,
    },
    {
      subcategory_id: yogaRetreatsId,
      slug: 'surf-yoga-tenerife',
      name: { es: 'Combo Surf & Yoga', en: 'Surf & Yoga Combo', de: 'Surf & Yoga Kombination' },
      description: {
        es: 'La combinación perfecta: clases de surf por la mañana en las mejores olas del sur de Tenerife, seguido de sesiones de yoga en la playa por la tarde. Todo el material de surf incluido, instructores certificados y profesores de yoga titulados. Apto para todos los niveles. Recupera energías con una experiencia equilibrada entre deporte y relajación.',
        en: 'The perfect combination: morning surf lessons on the best waves in southern Tenerife, followed by afternoon yoga sessions on the beach. All surf equipment included, certified surf instructors and qualified yoga teachers. Suitable for all levels. Recharge with a balanced experience of sport and relaxation.',
        de: 'Die perfekte Kombination: Surfstunden am Morgen an den besten Wellen Südteneriffas, gefolgt von Yoga-Sitzungen am Strand am Nachmittag. Gesamte Surfausrüstung inklusive, zertifizierte Surflehrer und qualifizierte Yogalehrer. Für alle Niveaus geeignet. Neue Energie tanken mit einer ausgewogenen Sport- und Entspannungserfahrung.',
      },
      short_description: { es: 'Surf por la mañana y yoga en la playa por la tarde', en: 'Morning surf and beach yoga in the afternoon', de: 'Morgens surfen, nachmittags Yoga am Strand' },
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
      location: { es: 'Costa Adeje', en: 'Costa Adeje' },
      area_id: costaAdeje,
      coordinates: { lat: 28.0750, lng: -16.7310 },
      rating: 4.6,
      review_count: 230,
      price_from: 65,
      currency: 'EUR',
      duration: '1 day',
      bookable: true,
      featured: false,
      sort_order: 2,
      visible: true,
    },
  ])
  console.log('Yoga retreat items added')

  // =============================================
  // SHOPPING - MARKETS
  // =============================================
  console.log('Adding market items...')
  await upsertItems([
    {
      subcategory_id: marketsId,
      slug: 'mercado-nuestra-senora-africa',
      name: { es: 'Mercado de Nuestra Señora de África', en: 'Our Lady of Africa Market', de: 'Markt Nuestra Señora de África' },
      description: {
        es: 'El mercado más icónico de Tenerife, ubicado en el corazón de Santa Cruz desde 1944. Su arquitectura de estilo morisco alberga puestos de flores tropicales, frutas exóticas, pescado fresco, carnes, especias, quesos canarios y productos locales. La zona de la flor y el patio central son especialmente fotogénicos. Los domingos se celebra un rastro en los alrededores.',
        en: 'The most iconic market in Tenerife, located in the heart of Santa Cruz since 1944. Its Moorish-style architecture houses stalls selling tropical flowers, exotic fruits, fresh fish, meats, spices, Canarian cheeses and local products. The flower section and central courtyard are especially photogenic. A flea market is held in the surroundings on Sundays.',
        de: 'Der berühmteste Markt Teneriffas, seit 1944 im Herzen von Santa Cruz. Seine maurische Architektur beherbergt Stände mit tropischen Blumen, exotischen Früchten, frischem Fisch, Fleisch, Gewürzen, kanarischem Käse und lokalen Produkten. Die Blumenabteilung und der zentrale Innenhof sind besonders fotogen. Sonntags findet ein Flohmarkt in der Umgebung statt.',
      },
      short_description: { es: 'El mercado más emblemático de Tenerife desde 1944', en: 'Tenerife\'s most iconic market since 1944', de: 'Teneriffas berühmtester Markt seit 1944' },
      image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&q=80',
      location: { es: 'Santa Cruz de Tenerife', en: 'Santa Cruz de Tenerife' },
      area_id: santaCruz,
      coordinates: { lat: 28.4660, lng: -16.2520 },
      rating: 4.6,
      review_count: 1250,
      price_from: 0,
      currency: 'EUR',
      bookable: false,
      featured: true,
      sort_order: 1,
      visible: true,
    },
    {
      subcategory_id: marketsId,
      slug: 'mercadillo-agricultor-tacoronte',
      name: { es: 'Mercadillo del Agricultor de Tacoronte', en: 'Tacoronte Farmers Market', de: 'Bauernmarkt Tacoronte' },
      description: {
        es: 'Mercadillo de agricultores los fines de semana con productos ecológicos de la zona norte de Tenerife. Frutas y verduras de temporada, vinos de la denominación Tacoronte-Acentejo, quesos artesanos, mojos caseros, miel de abeja negra y repostería canaria. Ambiente auténtico y precios directos del productor.',
        en: 'Weekend farmers market with organic produce from northern Tenerife. Seasonal fruits and vegetables, Tacoronte-Acentejo denomination wines, artisan cheeses, homemade mojos, black bee honey and Canarian pastries. Authentic atmosphere and direct-from-farmer prices.',
        de: 'Wochenend-Bauernmarkt mit Bio-Produkten aus dem Norden Teneriffas. Saisonales Obst und Gemüse, Weine der Denomination Tacoronte-Acentejo, handwerklicher Käse, hausgemachte Mojos, Honig der schwarzen Biene und kanarisches Gebäck. Authentische Atmosphäre und Direktpreise vom Erzeuger.',
      },
      short_description: { es: 'Mercadillo de productos locales los fines de semana', en: 'Weekend market with local products', de: 'Wochenendmarkt mit lokalen Produkten' },
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80',
      location: { es: 'Tacoronte', en: 'Tacoronte' },
      area_id: null,
      coordinates: { lat: 28.4760, lng: -16.4100 },
      rating: 4.5,
      review_count: 340,
      price_from: 0,
      currency: 'EUR',
      bookable: false,
      featured: false,
      sort_order: 2,
      visible: true,
    },
    {
      subcategory_id: marketsId,
      slug: 'rastro-santa-cruz',
      name: { es: 'El Rastro de Santa Cruz', en: 'Santa Cruz Flea Market', de: 'Flohmarkt von Santa Cruz' },
      description: {
        es: 'Rastro dominical junto al Mercado de Nuestra Señora de África. Antigüedades, objetos de segunda mano, artesanía, ropa vintage y curiosidades de todo tipo. Ambiente muy local y auténtico, ideal para perderse entre los puestos y encontrar tesoros inesperados. Funciona cada domingo por la mañana.',
        en: 'Sunday flea market next to the Mercado de Nuestra Señora de África. Antiques, second-hand items, crafts, vintage clothing and all sorts of curiosities. Very local and authentic atmosphere, ideal for wandering between stalls and finding unexpected treasures. Open every Sunday morning.',
        de: 'Sonntags-Flohmarkt neben dem Mercado de Nuestra Señora de África. Antiquitäten, Secondhand-Artikel, Kunsthandwerk, Vintage-Kleidung und allerlei Kuriositäten. Sehr lokale und authentische Atmosphäre, ideal zum Stöbern und Entdecken unerwarteter Schätze. Jeden Sonntagmorgen geöffnet.',
      },
      short_description: { es: 'Rastro dominical con antigüedades y artesanía', en: 'Sunday flea market with antiques and crafts', de: 'Sonntags-Flohmarkt mit Antiquitäten und Kunsthandwerk' },
      image: 'https://images.unsplash.com/photo-1513884923967-4b182ef167ab?w=800&q=80',
      location: { es: 'Santa Cruz de Tenerife', en: 'Santa Cruz de Tenerife' },
      area_id: santaCruz,
      coordinates: { lat: 28.4655, lng: -16.2525 },
      rating: 4.2,
      review_count: 280,
      price_from: 0,
      currency: 'EUR',
      bookable: false,
      featured: false,
      sort_order: 3,
      visible: true,
    },
  ])
  console.log('Market items added')

  // =============================================
  // SHOPPING - SHOPPING MALLS
  // =============================================
  console.log('Adding shopping mall items...')
  await upsertItems([
    {
      subcategory_id: shoppingMallsId,
      slug: 'cc-siam-mall',
      name: { es: 'Siam Mall', en: 'Siam Mall', de: 'Siam Mall' },
      description: {
        es: 'El centro comercial más moderno del sur de Tenerife, junto al Siam Park. Más de 150 tiendas de moda, electrónica, deporte y complementos, además de una amplia oferta gastronómica y cines. Diseño contemporáneo con espacios abiertos y zonas verdes. Aparcamiento amplio y gratuito las primeras horas.',
        en: 'The most modern shopping center in southern Tenerife, next to Siam Park. Over 150 stores featuring fashion, electronics, sports and accessories, plus a wide range of restaurants and cinemas. Contemporary design with open spaces and green areas. Large parking with free first hours.',
        de: 'Das modernste Einkaufszentrum im Süden Teneriffas, neben dem Siam Park. Über 150 Geschäfte für Mode, Elektronik, Sport und Accessoires, dazu eine große Auswahl an Restaurants und Kinos. Zeitgenössisches Design mit offenen Bereichen und Grünflächen. Großer Parkplatz, erste Stunden kostenlos.',
      },
      short_description: { es: 'Centro comercial moderno junto a Siam Park', en: 'Modern shopping center next to Siam Park', de: 'Modernes Einkaufszentrum neben dem Siam Park' },
      image: 'https://images.unsplash.com/photo-1519567241046-7f570b28f36c?w=800&q=80',
      location: { es: 'Costa Adeje', en: 'Costa Adeje' },
      area_id: costaAdeje,
      coordinates: { lat: 28.0720, lng: -16.7260 },
      rating: 4.4,
      review_count: 920,
      price_from: 0,
      currency: 'EUR',
      bookable: false,
      featured: true,
      sort_order: 1,
      visible: true,
    },
    {
      subcategory_id: shoppingMallsId,
      slug: 'cc-meridiano',
      name: { es: 'Centro Comercial Meridiano', en: 'Meridiano Shopping Center', de: 'Einkaufszentrum Meridiano' },
      description: {
        es: 'El mayor centro comercial de Santa Cruz de Tenerife con más de 130 tiendas, zona de restauración, cines y supermercado. Ubicado en el centro de la ciudad, junto a la estación de guaguas. Marcas nacionales e internacionales, ocio familiar y eventos culturales frecuentes.',
        en: 'The largest shopping center in Santa Cruz de Tenerife with over 130 stores, food court, cinemas and supermarket. Located in the city center, next to the bus station. National and international brands, family entertainment and frequent cultural events.',
        de: 'Das größte Einkaufszentrum in Santa Cruz de Tenerife mit über 130 Geschäften, Food Court, Kinos und Supermarkt. Im Stadtzentrum gelegen, neben dem Busbahnhof. Nationale und internationale Marken, Familienunterhaltung und häufige kulturelle Veranstaltungen.',
      },
      short_description: { es: 'El mayor centro comercial de Santa Cruz', en: 'The largest shopping center in Santa Cruz', de: 'Das größte Einkaufszentrum in Santa Cruz' },
      image: 'https://images.unsplash.com/photo-1567449303078-57ad995bd329?w=800&q=80',
      location: { es: 'Santa Cruz de Tenerife', en: 'Santa Cruz de Tenerife' },
      area_id: santaCruz,
      coordinates: { lat: 28.4600, lng: -16.2560 },
      rating: 4.1,
      review_count: 680,
      price_from: 0,
      currency: 'EUR',
      bookable: false,
      featured: false,
      sort_order: 2,
      visible: true,
    },
  ])
  console.log('Shopping mall items added')

  // =============================================
  // SHOPPING - LOCAL PRODUCTS
  // =============================================
  console.log('Adding local product items...')
  await upsertItems([
    {
      subcategory_id: localProductsId,
      slug: 'vino-tenerife',
      name: { es: 'Vinos de Tenerife', en: 'Wines of Tenerife', de: 'Weine von Teneriffa' },
      description: {
        es: 'Tenerife cuenta con 5 denominaciones de origen vinícolas: Abona, Tacoronte-Acentejo, Valle de la Orotava, Valle de Güímar e Ycoden-Daute-Isora. Los suelos volcánicos y el clima único crean vinos excepcionales. Prueba el Listán Negro (tinto) y el Listán Blanco (blanco), variedades autóctonas que no encontrarás en ningún otro lugar del mundo.',
        en: 'Tenerife has 5 Denomination of Origin wine zones: Abona, Tacoronte-Acentejo, Valle de la Orotava, Valle de Güímar and Ycoden-Daute-Isora. Volcanic soils and the unique climate create exceptional wines. Try Listán Negro (red) and Listán Blanco (white), indigenous varieties you won\'t find anywhere else in the world.',
        de: 'Teneriffa verfügt über 5 Herkunftsbezeichnungen für Wein: Abona, Tacoronte-Acentejo, Valle de la Orotava, Valle de Güímar und Ycoden-Daute-Isora. Vulkanböden und das einzigartige Klima schaffen außergewöhnliche Weine. Probieren Sie Listán Negro (Rotwein) und Listán Blanco (Weißwein), einheimische Rebsorten, die es nirgendwo sonst auf der Welt gibt.',
      },
      short_description: { es: '5 denominaciones de origen con variedades únicas', en: '5 origin denominations with unique varieties', de: '5 Herkunftsbezeichnungen mit einzigartigen Rebsorten' },
      image: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=800&q=80',
      location: { es: 'Toda la isla', en: 'Whole island' },
      area_id: null,
      coordinates: { lat: 28.2916, lng: -16.6291 },
      rating: 4.7,
      review_count: 560,
      price_from: 8,
      currency: 'EUR',
      bookable: false,
      featured: true,
      sort_order: 1,
      visible: true,
    },
    {
      subcategory_id: localProductsId,
      slug: 'queso-tenerife',
      name: { es: 'Quesos de Tenerife', en: 'Tenerife Cheeses', de: 'Käse aus Teneriffa' },
      description: {
        es: 'Quesos artesanales de cabra y oveja elaborados con recetas tradicionales. Algunos se ahúman con madera de palmera canaria, dándoles un sabor único e inconfundible. Han ganado premios internacionales en los World Cheese Awards. Pruébalos en mercadillos, guachinches o tiendas especializadas. El queso ahumado de Anaga y el de Benijos son especialmente recomendados.',
        en: 'Artisan goat and sheep cheeses made with traditional recipes. Some are smoked with Canarian palm wood, giving them a unique and unmistakable flavor. They have won international awards at the World Cheese Awards. Try them at farmers markets, guachinches or specialty shops. The smoked cheese from Anaga and Benijos are especially recommended.',
        de: 'Handwerklicher Ziegen- und Schafskäse nach traditionellen Rezepten. Manche werden mit kanarischem Palmenholz geräuchert, was ihnen einen einzigartigen und unverwechselbaren Geschmack verleiht. Sie haben internationale Preise bei den World Cheese Awards gewonnen. Probieren Sie sie auf Bauernmärkten, in Guachinches oder Fachgeschäften. Der Räucherkäse aus Anaga und Benijos sind besonders empfehlenswert.',
      },
      short_description: { es: 'Quesos artesanales premiados internacionalmente', en: 'Internationally award-winning artisan cheeses', de: 'International preisgekrönter handwerklicher Käse' },
      image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=800&q=80',
      location: { es: 'Toda la isla', en: 'Whole island' },
      area_id: null,
      coordinates: { lat: 28.3500, lng: -16.5000 },
      rating: 4.6,
      review_count: 420,
      price_from: 5,
      currency: 'EUR',
      bookable: false,
      featured: true,
      sort_order: 2,
      visible: true,
    },
    {
      subcategory_id: localProductsId,
      slug: 'miel-tenerife',
      name: { es: 'Miel de Tenerife', en: 'Tenerife Honey', de: 'Honig aus Teneriffa' },
      description: {
        es: 'Miel única elaborada a partir de plantas endémicas como el tajinaste, la retama del Teide y el brezo. Protegida con Denominación de Origen (DOP), las mieles de Tenerife tienen sabores y aromas que no encontrarás en ningún otro lugar. Desde la miel multifloral de costa hasta la miel de cumbre con notas de tajinaste, cada variedad refleja un microclima diferente de la isla.',
        en: 'Unique honey made from endemic plants such as tajinaste (viper\'s bugloss), Teide broom and heather. Protected with Denomination of Origin (DOP), Tenerife honeys have flavors and aromas you won\'t find anywhere else. From coastal multifloral honey to summit honey with tajinaste notes, each variety reflects a different microclimate of the island.',
        de: 'Einzigartiger Honig aus endemischen Pflanzen wie Tajinaste (Natternkopf), Teide-Ginster und Heidekraut. Geschützt mit Ursprungsbezeichnung (DOP), haben die Honige Teneriffas Geschmäcker und Aromen, die man nirgendwo anders findet. Vom küstennahen Multiflora-Honig bis zum Gipfelhonig mit Tajinaste-Noten spiegelt jede Sorte ein anderes Mikroklima der Insel wider.',
      },
      short_description: { es: 'Miel DOP de plantas endémicas canarias', en: 'DOP honey from endemic Canarian plants', de: 'DOP-Honig aus endemischen kanarischen Pflanzen' },
      image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=80',
      location: { es: 'Toda la isla', en: 'Whole island' },
      area_id: null,
      coordinates: { lat: 28.3000, lng: -16.5500 },
      rating: 4.5,
      review_count: 290,
      price_from: 6,
      currency: 'EUR',
      bookable: false,
      featured: false,
      sort_order: 3,
      visible: true,
    },
  ])
  console.log('Local product items added')

  // =============================================
  // EVENTS - REMAINING MUNICIPALITIES
  // =============================================
  console.log('\nAdding events for remaining municipalities...')
  await upsertEvents([
    {
      slug: 'fiestas-san-juan-arico',
      name: { es: 'Fiestas de San Juan', en: 'Festival of Saint John', de: 'Fest des Heiligen Johannes' },
      description: {
        es: 'Fiesta patronal de Arico en honor a San Juan Bautista. Se celebra con hogueras tradicionales la noche del 23 de junio, procesiones religiosas, verbenas populares con música en vivo y degustación de productos locales. Las hogueras de San Juan son una de las tradiciones más arraigadas del municipio.',
        en: 'Patron saint festival of Arico honoring Saint John the Baptist. Celebrated with traditional bonfires on the night of June 23rd, religious processions, popular street parties with live music and local produce tasting. The Saint John bonfires are one of the most deeply rooted traditions of the municipality.',
        de: 'Patronatsfest von Arico zu Ehren Johannes des Täufers. Gefeiert mit traditionellen Lagerfeuern in der Nacht des 23. Juni, religiösen Prozessionen, Volksfesten mit Livemusik und Verkostung lokaler Produkte. Die Johannisfeuer sind eine der am tiefsten verwurzelten Traditionen der Gemeinde.',
      },
      municipality: 'Arico',
      municipality_slug: 'arico',
      area_id: null,
      event_type: 'fiesta_patronal',
      start_date: '06-24',
      month: 6,
      visible: true,
      featured: false,
    },
    {
      slug: 'san-joaquin-fasnia',
      name: { es: 'Fiesta de San Joaquín', en: 'Festival of Saint Joachim', de: 'Fest des Heiligen Joachim' },
      description: {
        es: 'Fiesta patronal de Fasnia en honor a San Joaquín. Procesiones religiosas por las calles del casco histórico, verbenas nocturnas, actividades deportivas y exhibiciones de folclore canario. Los vecinos preparan comida típica como carne de fiesta y papas con mojo para compartir en la plaza.',
        en: 'Patron saint festival of Fasnia honoring Saint Joachim. Religious processions through the historic center streets, evening street parties, sports activities and Canarian folklore exhibitions. Locals prepare traditional food like festive meat and potatoes with mojo to share in the square.',
        de: 'Patronatsfest von Fasnia zu Ehren des Heiligen Joachim. Religiöse Prozessionen durch die historische Altstadt, abendliche Volksfeste, Sportaktivitäten und kanarische Folklore-Darbietungen. Die Einheimischen bereiten traditionelle Gerichte wie Festtagsfleisch und Kartoffeln mit Mojo zum Teilen auf dem Platz zu.',
      },
      municipality: 'Fasnia',
      municipality_slug: 'fasnia',
      area_id: null,
      event_type: 'fiesta_patronal',
      start_date: '08-16',
      month: 8,
      visible: true,
      featured: false,
    },
    {
      slug: 'san-antonio-abad-los-silos',
      name: { es: 'Fiesta de San Antonio Abad', en: 'Festival of Saint Anthony the Abbot', de: 'Fest des Heiligen Antonius des Großen' },
      description: {
        es: 'Fiesta patronal de Los Silos en honor a San Antonio Abad, patrón de los animales. Tradicional bendición de animales domésticos y de granja en la plaza del pueblo, procesiones religiosas, hogueras y verbenas. Los vecinos llevan a sus mascotas para recibir la bendición del santo.',
        en: 'Patron saint festival of Los Silos honoring Saint Anthony the Abbot, patron of animals. Traditional blessing of domestic and farm animals in the town square, religious processions, bonfires and street parties. Locals bring their pets to receive the saint\'s blessing.',
        de: 'Patronatsfest von Los Silos zu Ehren des Heiligen Antonius des Großen, Schutzpatron der Tiere. Traditionelle Segnung von Haus- und Nutztieren auf dem Dorfplatz, religiöse Prozessionen, Lagerfeuer und Volksfeste. Die Einheimischen bringen ihre Haustiere zur Segnung des Heiligen.',
      },
      municipality: 'Los Silos',
      municipality_slug: 'los-silos',
      area_id: null,
      event_type: 'fiesta_patronal',
      start_date: '01-17',
      month: 1,
      visible: true,
      featured: false,
    },
    {
      slug: 'nuestra-senora-remedios-buenavista',
      name: { es: 'Fiesta de Nuestra Señora de Los Remedios', en: 'Festival of Our Lady of Remedies', de: 'Fest Unserer Lieben Frau der Heilmittel' },
      description: {
        es: 'Fiesta patronal de Buenavista del Norte en honor a la Virgen de Los Remedios. Procesión marítima con la imagen de la Virgen, actos religiosos solemnes, verbenas populares con orquestas y fuegos artificiales. El municipio, situado en el extremo noroeste de la isla, celebra con gran devoción a su patrona.',
        en: 'Patron saint festival of Buenavista del Norte honoring the Virgin of Remedies. Maritime procession with the Virgin\'s image, solemn religious events, popular street parties with orchestras and fireworks. The municipality, located at the northwestern tip of the island, celebrates its patron with great devotion.',
        de: 'Patronatsfest von Buenavista del Norte zu Ehren der Jungfrau der Heilmittel. Maritime Prozession mit dem Bildnis der Jungfrau, feierliche religiöse Veranstaltungen, Volksfeste mit Orchestern und Feuerwerk. Die Gemeinde, am nordwestlichsten Punkt der Insel gelegen, feiert ihre Schutzpatronin mit großer Hingabe.',
      },
      municipality: 'Buenavista del Norte',
      municipality_slug: 'buenavista-del-norte',
      area_id: null,
      event_type: 'fiesta_patronal',
      start_date: '09-08',
      month: 9,
      visible: true,
      featured: false,
    },
    {
      slug: 'san-antonio-abad-el-tanque',
      name: { es: 'Fiesta de San Antonio Abad', en: 'Festival of Saint Anthony the Abbot', de: 'Fest des Heiligen Antonius des Großen' },
      description: {
        es: 'Fiesta patronal de El Tanque en honor a San Antonio Abad. Bendición de animales, procesiones religiosas y verbenas populares en este pequeño municipio del noroeste de Tenerife. Las fiestas mantienen un carácter rural y auténtico con participación de todo el vecindario.',
        en: 'Patron saint festival of El Tanque honoring Saint Anthony the Abbot. Blessing of animals, religious processions and popular street parties in this small municipality in northwestern Tenerife. The festivities maintain a rural and authentic character with participation from the whole neighborhood.',
        de: 'Patronatsfest von El Tanque zu Ehren des Heiligen Antonius des Großen. Tiersegnung, religiöse Prozessionen und Volksfeste in dieser kleinen Gemeinde im Nordwesten Teneriffas. Die Feierlichkeiten bewahren einen ländlichen und authentischen Charakter mit Beteiligung der gesamten Nachbarschaft.',
      },
      municipality: 'El Tanque',
      municipality_slug: 'el-tanque',
      area_id: null,
      event_type: 'fiesta_patronal',
      start_date: '01-17',
      month: 1,
      visible: true,
      featured: false,
    },
    {
      slug: 'san-amaro-la-matanza',
      name: { es: 'Fiesta de San Amaro', en: 'Festival of Saint Amaro', de: 'Fest des Heiligen Amaro' },
      description: {
        es: 'Fiesta patronal de La Matanza de Acentejo en honor a San Amaro. Procesiones religiosas por las calles del municipio, verbenas con música tradicional canaria, exhibiciones folklóricas y degustación de vinos de la denominación Tacoronte-Acentejo. Un municipio con profunda tradición vinícola.',
        en: 'Patron saint festival of La Matanza de Acentejo honoring Saint Amaro. Religious processions through the municipality streets, street parties with traditional Canarian music, folklore exhibitions and wine tasting from the Tacoronte-Acentejo denomination. A municipality with deep winemaking tradition.',
        de: 'Patronatsfest von La Matanza de Acentejo zu Ehren des Heiligen Amaro. Religiöse Prozessionen durch die Gemeindestraßen, Volksfeste mit traditioneller kanarischer Musik, Folklore-Darbietungen und Weinverkostung der Denomination Tacoronte-Acentejo. Eine Gemeinde mit tiefer Weinbautradition.',
      },
      municipality: 'La Matanza de Acentejo',
      municipality_slug: 'la-matanza-de-acentejo',
      area_id: null,
      event_type: 'fiesta_patronal',
      start_date: '01-15',
      month: 1,
      visible: true,
      featured: false,
    },
    {
      slug: 'nuestra-senora-encarnacion-la-victoria',
      name: { es: 'Fiesta de Nuestra Señora de la Encarnación', en: 'Festival of Our Lady of the Incarnation', de: 'Fest Unserer Lieben Frau der Menschwerdung' },
      description: {
        es: 'Fiesta patronal de La Victoria de Acentejo en honor a la Virgen de la Encarnación. Actos religiosos solemnes, procesiones, verbenas y actividades culturales. El municipio celebra su patrona en la zona de medianías del norte, rodeado de viñedos de la denominación Tacoronte-Acentejo.',
        en: 'Patron saint festival of La Victoria de Acentejo honoring Our Lady of the Incarnation. Solemn religious events, processions, street parties and cultural activities. The municipality celebrates its patron in the mid-altitude northern zone, surrounded by Tacoronte-Acentejo vineyards.',
        de: 'Patronatsfest von La Victoria de Acentejo zu Ehren der Jungfrau der Menschwerdung. Feierliche religiöse Veranstaltungen, Prozessionen, Volksfeste und kulturelle Aktivitäten. Die Gemeinde feiert ihre Schutzpatronin in der mittleren Höhenlage des Nordens, umgeben von Weinbergen der Denomination Tacoronte-Acentejo.',
      },
      municipality: 'La Victoria de Acentejo',
      municipality_slug: 'la-victoria-de-acentejo',
      area_id: null,
      event_type: 'fiesta_patronal',
      start_date: '03-25',
      month: 3,
      visible: true,
      featured: false,
    },
    {
      slug: 'santa-ursula-fiesta-patronal',
      name: { es: 'Fiesta de Santa Úrsula', en: 'Festival of Saint Ursula', de: 'Fest der Heiligen Ursula' },
      description: {
        es: 'Fiesta patronal del municipio de Santa Úrsula en honor a su santa patrona. Procesiones religiosas, verbenas con música en vivo, actuaciones de grupos folklóricos y actividades deportivas. El pueblo, situado en la ladera norte con vistas al Valle de la Orotava, celebra con orgullo sus tradiciones.',
        en: 'Patron saint festival of the municipality of Santa Úrsula honoring its patron saint. Religious processions, street parties with live music, folklore group performances and sports activities. The town, located on the northern slope overlooking the Orotava Valley, proudly celebrates its traditions.',
        de: 'Patronatsfest der Gemeinde Santa Úrsula zu Ehren ihrer Schutzpatronin. Religiöse Prozessionen, Volksfeste mit Livemusik, Folkloregruppendarbietungen und Sportaktivitäten. Das Dorf, an der Nordflanke mit Blick auf das Orotava-Tal gelegen, feiert stolz seine Traditionen.',
      },
      municipality: 'Santa Úrsula',
      municipality_slug: 'santa-ursula',
      area_id: puertoCruz,
      event_type: 'fiesta_patronal',
      start_date: '10-21',
      month: 10,
      visible: true,
      featured: false,
    },
    {
      slug: 'san-pedro-el-sauzal',
      name: { es: 'Fiesta de San Pedro', en: 'Festival of Saint Peter', de: 'Fest des Heiligen Petrus' },
      description: {
        es: 'Fiesta patronal de El Sauzal en honor a San Pedro Apóstol. Procesiones religiosas, verbenas populares, conciertos y actividades deportivas. El Sauzal es conocido por sus impresionantes miradores sobre el Atlántico y su Casa del Vino, donde se pueden degustar los mejores caldos de la isla.',
        en: 'Patron saint festival of El Sauzal honoring Saint Peter the Apostle. Religious processions, popular street parties, concerts and sports activities. El Sauzal is known for its stunning Atlantic viewpoints and its Casa del Vino, where you can taste the island\'s best wines.',
        de: 'Patronatsfest von El Sauzal zu Ehren des Apostels Petrus. Religiöse Prozessionen, Volksfeste, Konzerte und Sportaktivitäten. El Sauzal ist bekannt für seine atemberaubenden Aussichtspunkte über den Atlantik und sein Casa del Vino, wo man die besten Weine der Insel probieren kann.',
      },
      municipality: 'El Sauzal',
      municipality_slug: 'el-sauzal',
      area_id: null,
      event_type: 'fiesta_patronal',
      start_date: '06-29',
      month: 6,
      visible: true,
      featured: false,
    },
    {
      slug: 'san-juan-degollado-arafo',
      name: { es: 'Fiesta de San Juan Degollado', en: 'Festival of the Beheading of Saint John', de: 'Fest der Enthauptung des Heiligen Johannes' },
      description: {
        es: 'Fiesta patronal de Arafo en honor a San Juan Degollado. Procesiones religiosas, verbenas con orquestas, exhibiciones de folclore canario y actividades para toda la familia. Arafo es un municipio agrícola conocido por sus viñedos y la elaboración de vinos artesanales de la denominación Valle de Güímar.',
        en: 'Patron saint festival of Arafo honoring the Beheading of Saint John. Religious processions, street parties with orchestras, Canarian folklore exhibitions and activities for the whole family. Arafo is an agricultural municipality known for its vineyards and artisan winemaking from the Valle de Güímar denomination.',
        de: 'Patronatsfest von Arafo zu Ehren der Enthauptung des Heiligen Johannes. Religiöse Prozessionen, Volksfeste mit Orchestern, kanarische Folklore-Darbietungen und Aktivitäten für die ganze Familie. Arafo ist eine landwirtschaftliche Gemeinde, bekannt für ihre Weinberge und die handwerkliche Weinherstellung der Denomination Valle de Güímar.',
      },
      municipality: 'Arafo',
      municipality_slug: 'arafo',
      area_id: null,
      event_type: 'fiesta_patronal',
      start_date: '08-29',
      month: 8,
      visible: true,
      featured: false,
    },
  ])
  console.log('Events added')

  // --- Summary ---
  console.log('\n=== Content addition complete! ===')
  console.log('Added:')
  console.log('  - 3 spa items (wellness/spas)')
  console.log('  - 2 yoga retreat items (wellness/yoga-retreats)')
  console.log('  - 3 market items (shopping/markets)')
  console.log('  - 2 shopping mall items (shopping/shopping-malls)')
  console.log('  - 3 local product items (shopping/local-products)')
  console.log('  - 10 events (remaining municipalities)')
}

main().catch((err) => {
  console.error('FATAL:', err)
  process.exit(1)
})
