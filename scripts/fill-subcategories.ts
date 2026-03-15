/**
 * Script to fill empty/sparse subcategories with items
 * Targets subcategories with 0-1 items
 * Run with: npx tsx scripts/fill-subcategories.ts
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

// --- Main ---

async function main() {
  console.log('=== Filling Empty/Sparse Subcategories ===\n')

  // --- Load areas ---
  console.log('Loading areas...')
  const [costaAdeje, puertoCruz, santaCruz, anaga, losGigantes, teide, laLaguna, losCristianos] = await Promise.all([
    getAreaId('costa-adeje'),
    getAreaId('puerto-de-la-cruz'),
    getAreaId('santa-cruz'),
    getAreaId('anaga'),
    getAreaId('los-gigantes'),
    getAreaId('teide'),
    getAreaId('la-laguna'),
    getAreaId('los-cristianos'),
  ])
  console.log('Areas loaded\n')

  // --- Load subcategories ---
  console.log('Loading subcategories...')
  const [
    topExperiencesId,
    whaleWatchingId,
    dayTripsId,
    luxuryExperiencesId,
    bestBeachesId,
    hikingTrailsId,
    waterParksId,
    zoosAquariumsId,
    couplesId,
    cocktailBarsId,
    shoppingAreasId,
    museumsId,
    guancheHeritageId,
    architectureId,
  ] = await Promise.all([
    getSubcategoryId('experiences', 'top-experiences'),
    getSubcategoryId('experiences', 'whale-watching'),
    getSubcategoryId('experiences', 'day-trips'),
    getSubcategoryId('experiences', 'luxury-experiences'),
    getSubcategoryId('beaches', 'best-beaches'),
    getSubcategoryId('nature', 'hiking-trails'),
    getSubcategoryId('family', 'water-parks'),
    getSubcategoryId('family', 'zoos-aquariums'),
    getSubcategoryId('wellness', 'couples'),
    getSubcategoryId('nightlife', 'cocktail-bars'),
    getSubcategoryId('shopping', 'shopping-areas'),
    getSubcategoryId('culture', 'museums'),
    getSubcategoryId('culture', 'guanche-heritage'),
    getSubcategoryId('culture', 'architecture'),
  ])
  console.log('Subcategories loaded\n')

  // =============================================
  // EXPERIENCES - TOP EXPERIENCES (0 items)
  // =============================================
  console.log('Adding top experiences...')
  await upsertItems([
    {
      subcategory_id: topExperiencesId,
      slug: 'teide-by-night',
      name: { es: 'Teide de Noche y Observación de Estrellas', en: 'Teide by Night & Stargazing', de: 'Teide bei Nacht & Sternenbeobachtung' },
      description: {
        es: 'Excursión nocturna al Teide con observación astronómica guiada. Sube al parque nacional al atardecer, contempla una puesta de sol espectacular sobre el mar de nubes y después disfruta de la mejor observación de estrellas de Europa con telescopios profesionales. Incluye transporte, guía experto en astronomía, telescopios y bebida caliente.',
        en: 'Night tour to Mount Teide with guided stargazing. Ascend to the national park at sunset, witness a spectacular sunset above the sea of clouds, then enjoy Europe\'s best stargazing with professional telescopes. Includes transport, expert astronomy guide, telescopes and hot drink.',
        de: 'Nachttour zum Teide mit geführter Sternenbeobachtung. Fahren Sie bei Sonnenuntergang zum Nationalpark, erleben Sie einen spektakulären Sonnenuntergang über dem Wolkenmeer und genießen Sie anschließend Europas beste Sternenbeobachtung mit professionellen Teleskopen. Inklusive Transport, Astronomie-Experte, Teleskope und Heißgetränk.',
      },
      short_description: { es: 'Tour nocturno al Teide con observación de estrellas', en: 'Night tour to Teide with stargazing', de: 'Nachttour zum Teide mit Sternenbeobachtung' },
      image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80',
      location: { es: 'Parque Nacional del Teide', en: 'Teide National Park' },
      area_id: teide,
      coordinates: { lat: 28.2723, lng: -16.6422 },
      rating: 4.9,
      review_count: 1250,
      price_from: 45,
      currency: 'EUR',
      duration: '4 hours',
      bookable: true,
      featured: true,
      sort_order: 1,
      visible: true,
    },
    {
      subcategory_id: topExperiencesId,
      slug: 'catamaran-los-gigantes',
      name: { es: 'Catamarán a los Acantilados de Los Gigantes', en: 'Catamaran to Los Gigantes Cliffs', de: 'Katamaran zu den Klippen von Los Gigantes' },
      description: {
        es: 'Navega en catamarán de lujo a lo largo de los impresionantes acantilados de Los Gigantes, con paredes verticales de hasta 600 metros de altura. Durante el trayecto podrás avistar delfines y ballenas en su hábitat natural, nadar en una cala cristalina y disfrutar de comida y bebida a bordo. Una experiencia inolvidable en la costa oeste de Tenerife.',
        en: 'Sail on a luxury catamaran along the impressive Los Gigantes cliffs, with vertical walls up to 600 meters high. During the trip you can spot dolphins and whales in their natural habitat, swim in a crystal-clear cove and enjoy food and drinks on board. An unforgettable experience on Tenerife\'s west coast.',
        de: 'Segeln Sie auf einem Luxus-Katamaran entlang der beeindruckenden Klippen von Los Gigantes mit senkrechten Wänden von bis zu 600 Metern Höhe. Während der Fahrt können Sie Delfine und Wale in ihrem natürlichen Lebensraum beobachten, in einer kristallklaren Bucht schwimmen und Speisen und Getränke an Bord genießen. Ein unvergessliches Erlebnis an Teneriffas Westküste.',
      },
      short_description: { es: 'Catamarán de lujo por los acantilados de 600m', en: 'Luxury catamaran along the dramatic 600m cliffs', de: 'Luxus-Katamaran entlang der 600m hohen Klippen' },
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
      location: { es: 'Los Gigantes, Santiago del Teide', en: 'Los Gigantes, Santiago del Teide' },
      area_id: losGigantes,
      coordinates: { lat: 28.2470, lng: -16.8410 },
      rating: 4.8,
      review_count: 890,
      price_from: 55,
      currency: 'EUR',
      duration: '3 hours',
      bookable: true,
      featured: true,
      sort_order: 2,
      visible: true,
    },
    {
      subcategory_id: topExperiencesId,
      slug: 'quad-adventure-teide',
      name: { es: 'Aventura en Quad por el Teide', en: 'Quad Adventure around Teide', de: 'Quad-Abenteuer rund um den Teide' },
      description: {
        es: 'Recorre los paisajes volcánicos del Teide en quad todoterreno. Una aventura emocionante por pistas de tierra y caminos de montaña con vistas espectaculares al cráter, los roques y el mar de nubes. Incluye quad automático, casco, guía profesional, seguro y fotos del recorrido. Apto para principiantes con licencia de conducir.',
        en: 'Explore the volcanic landscapes of Teide on an off-road quad bike. An exciting adventure along dirt tracks and mountain paths with spectacular views of the crater, rock formations and sea of clouds. Includes automatic quad, helmet, professional guide, insurance and route photos. Suitable for beginners with a driving license.',
        de: 'Erkunden Sie die Vulkanlandschaften des Teide auf einem Offroad-Quad. Ein aufregendes Abenteuer auf Schotterpisten und Bergpfaden mit spektakulärem Blick auf den Krater, Felsformationen und das Wolkenmeer. Inklusive Automatik-Quad, Helm, professionellem Guide, Versicherung und Streckenfotos. Für Anfänger mit Führerschein geeignet.',
      },
      short_description: { es: 'Aventura en quad por paisajes volcánicos', en: 'Off-road quad tour through volcanic landscape', de: 'Offroad-Quad-Tour durch Vulkanlandschaft' },
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80',
      location: { es: 'Parque Nacional del Teide', en: 'Teide National Park' },
      area_id: teide,
      coordinates: { lat: 28.2600, lng: -16.6300 },
      rating: 4.7,
      review_count: 540,
      price_from: 65,
      currency: 'EUR',
      duration: '3 hours',
      bookable: true,
      featured: false,
      sort_order: 3,
      visible: true,
    },
  ])
  console.log('Top experiences added (3 items)')

  // =============================================
  // EXPERIENCES - WHALE WATCHING (0 items)
  // =============================================
  console.log('Adding whale watching items...')
  await upsertItems([
    {
      subcategory_id: whaleWatchingId,
      slug: 'whale-watching-los-cristianos',
      name: { es: 'Avistamiento de Cetáceos desde Los Cristianos', en: 'Whale & Dolphin Watching from Los Cristianos', de: 'Wal- & Delfinbeobachtung ab Los Cristianos' },
      description: {
        es: 'Excursión en barco desde Los Cristianos para avistar ballenas piloto y delfines mulares en su hábitat natural. El canal entre Tenerife y La Gomera alberga una colonia residente de calderones tropicales, lo que garantiza avistamientos durante todo el año. Barco con fondo de cristal, hidrófonos y guía biólogo marino.',
        en: 'Boat excursion from Los Cristianos to spot pilot whales and bottlenose dolphins in their natural habitat. The channel between Tenerife and La Gomera hosts a resident colony of tropical pilot whales, guaranteeing sightings year-round. Glass-bottom boat, hydrophones and marine biologist guide.',
        de: 'Bootsausflug ab Los Cristianos zur Beobachtung von Pilotwalen und Großen Tümmlern in ihrem natürlichen Lebensraum. Der Kanal zwischen Teneriffa und La Gomera beherbergt eine residente Kolonie tropischer Pilotwale, was ganzjährig Sichtungen garantiert. Glasbodenboot, Hydrophone und Meeresbiologe als Guide.',
      },
      short_description: { es: 'Avistamiento garantizado de ballenas y delfines', en: 'Guaranteed whale and dolphin watching', de: 'Garantierte Wal- und Delfinbeobachtung' },
      image: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=800&q=80',
      location: { es: 'Los Cristianos', en: 'Los Cristianos' },
      area_id: losCristianos,
      coordinates: { lat: 28.0514, lng: -16.7150 },
      rating: 4.7,
      review_count: 1820,
      price_from: 35,
      currency: 'EUR',
      duration: '3 hours',
      bookable: true,
      featured: true,
      sort_order: 1,
      visible: true,
    },
    {
      subcategory_id: whaleWatchingId,
      slug: 'eco-whale-watching-adeje',
      name: { es: 'Eco Whale Watching Premium', en: 'Eco Whale Watching Premium', de: 'Eco Whale Watching Premium' },
      description: {
        es: 'Experiencia premium de avistamiento de cetáceos en velero ecológico con grupo reducido (máx. 10 personas). Navegación silenciosa a vela para no perturbar a los animales, parada para baño en aguas cristalinas, tentempié con productos locales y cava. Certificado Blue Flag y compromiso con la observación responsable.',
        en: 'Premium whale watching experience on an eco-friendly sailboat with a small group (max 10 people). Silent sailing to avoid disturbing the animals, swimming stop in crystal-clear waters, snack with local products and cava. Blue Flag certified with responsible observation commitment.',
        de: 'Premium-Walbeobachtungserlebnis auf einem umweltfreundlichen Segelboot mit kleiner Gruppe (max. 10 Personen). Leises Segeln, um die Tiere nicht zu stören, Badestopp in kristallklarem Wasser, Snack mit lokalen Produkten und Cava. Blaue-Flagge-zertifiziert mit Engagement für verantwortungsvolle Beobachtung.',
      },
      short_description: { es: 'Avistamiento premium en velero con grupo reducido', en: 'Premium sailboat watching with small group', de: 'Premium-Segelboot-Beobachtung in kleiner Gruppe' },
      image: 'https://images.unsplash.com/photo-1511316695145-4992006fde05?w=800&q=80',
      location: { es: 'Costa Adeje', en: 'Costa Adeje' },
      area_id: costaAdeje,
      coordinates: { lat: 28.0740, lng: -16.7350 },
      rating: 4.9,
      review_count: 420,
      price_from: 65,
      currency: 'EUR',
      duration: '3 hours',
      bookable: true,
      featured: true,
      sort_order: 2,
      visible: true,
    },
    {
      subcategory_id: whaleWatchingId,
      slug: 'kayak-dolphins-los-gigantes',
      name: { es: 'Kayak con Delfines en Los Gigantes', en: 'Kayak with Dolphins at Los Gigantes', de: 'Kajak mit Delfinen bei Los Gigantes' },
      description: {
        es: 'Aventura en kayak por la costa de Los Gigantes con posibilidad de avistar delfines y tortugas marinas. Rema junto a los impresionantes acantilados, explora cuevas marinas y haz snorkel en calas secretas. Experiencia íntima con la naturaleza marina, guiada por instructores certificados. Incluye kayak doble, equipo de snorkel y fotos.',
        en: 'Kayak adventure along the Los Gigantes coast with chances to spot dolphins and sea turtles. Paddle alongside the impressive cliffs, explore sea caves and snorkel in secret coves. An intimate experience with marine nature, guided by certified instructors. Includes double kayak, snorkel gear and photos.',
        de: 'Kajak-Abenteuer entlang der Küste von Los Gigantes mit Chancen, Delfine und Meeresschildkröten zu sichten. Paddeln Sie entlang der beeindruckenden Klippen, erkunden Sie Meereshöhlen und schnorcheln Sie in versteckten Buchten. Ein intimes Naturerlebnis, geführt von zertifizierten Instructors. Inklusive Doppelkajak, Schnorchelausrüstung und Fotos.',
      },
      short_description: { es: 'Kayak junto a los acantilados con avistamiento de delfines', en: 'Kayak along cliffs with dolphin spotting', de: 'Kajak entlang der Klippen mit Delfinbeobachtung' },
      image: 'https://images.unsplash.com/photo-1472745942893-4b9f730c7668?w=800&q=80',
      location: { es: 'Los Gigantes', en: 'Los Gigantes' },
      area_id: losGigantes,
      coordinates: { lat: 28.2490, lng: -16.8430 },
      rating: 4.8,
      review_count: 670,
      price_from: 40,
      currency: 'EUR',
      duration: '2.5 hours',
      bookable: true,
      featured: false,
      sort_order: 3,
      visible: true,
    },
  ])
  console.log('Whale watching items added (3 items)')

  // =============================================
  // EXPERIENCES - DAY TRIPS (0 items)
  // =============================================
  console.log('Adding day trip items...')
  await upsertItems([
    {
      subcategory_id: dayTripsId,
      slug: 'la-gomera-day-trip',
      name: { es: 'Excursión a La Gomera', en: 'Day Trip to La Gomera', de: 'Tagesausflug nach La Gomera' },
      description: {
        es: 'Excursión de un día completo a la isla vecina de La Gomera. Incluye ferry rápido desde Los Cristianos, recorrido guiado por el Parque Nacional de Garajonay (Patrimonio de la Humanidad), visita al mirador de Los Roques, almuerzo típico gomero y demostración del Silbo Gomero, el lenguaje silbado único en el mundo.',
        en: 'Full-day excursion to the neighboring island of La Gomera. Includes fast ferry from Los Cristianos, guided tour of Garajonay National Park (UNESCO World Heritage), visit to the Los Roques viewpoint, traditional Gomeran lunch and demonstration of Silbo Gomero, the unique whistled language.',
        de: 'Ganztagesausflug zur Nachbarinsel La Gomera. Inklusive Schnellfähre ab Los Cristianos, geführte Tour durch den Garajonay-Nationalpark (UNESCO-Welterbe), Besuch des Aussichtspunkts Los Roques, traditionelles gomero-Mittagessen und Vorführung des Silbo Gomero, der einzigartigen Pfeifsprache.',
      },
      short_description: { es: 'Ferry + tour guiado a la isla vecina', en: 'Ferry + guided tour of the neighboring island', de: 'Fähre + geführte Tour der Nachbarinsel' },
      image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80',
      location: { es: 'Los Cristianos → La Gomera', en: 'Los Cristianos → La Gomera' },
      area_id: losCristianos,
      coordinates: { lat: 28.0514, lng: -16.7150 },
      rating: 4.7,
      review_count: 980,
      price_from: 75,
      currency: 'EUR',
      duration: 'Full day',
      bookable: true,
      featured: true,
      sort_order: 1,
      visible: true,
    },
    {
      subcategory_id: dayTripsId,
      slug: 'anaga-rural-park-tour',
      name: { es: 'Tour Guiado por el Parque Rural de Anaga', en: 'Anaga Rural Park Guided Tour', de: 'Geführte Tour durch den Anaga-Naturpark' },
      description: {
        es: 'Senderismo guiado por el Parque Rural de Anaga, Reserva de la Biosfera con bosques de laurisilva milenarios. Recorre senderos entre helechos gigantes y árboles cubiertos de musgo, visita el caserío de Chinamada con sus cuevas habitadas y disfruta de vistas panorámicas al océano desde los miradores. Incluye transporte, guía naturalista y picnic.',
        en: 'Guided hiking through Anaga Rural Park, a Biosphere Reserve with ancient laurel forests. Walk trails among giant ferns and moss-covered trees, visit the hamlet of Chinamada with its inhabited caves and enjoy panoramic ocean views from the lookouts. Includes transport, naturalist guide and picnic.',
        de: 'Geführte Wanderung durch den Anaga-Naturpark, ein Biosphärenreservat mit uralten Lorbeerwäldern. Wandern Sie auf Pfaden zwischen Riesenfarnen und moosbedeckten Bäumen, besuchen Sie den Weiler Chinamada mit seinen bewohnten Höhlen und genießen Sie Panoramablicke auf den Ozean. Inklusive Transport, Naturführer und Picknick.',
      },
      short_description: { es: 'Senderismo por bosques de laurisilva milenarios', en: 'Hike through ancient laurel forests', de: 'Wanderung durch uralte Lorbeerwälder' },
      image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80',
      location: { es: 'Parque Rural de Anaga', en: 'Anaga Rural Park' },
      area_id: anaga,
      coordinates: { lat: 28.5430, lng: -16.2060 },
      rating: 4.8,
      review_count: 720,
      price_from: 40,
      currency: 'EUR',
      duration: '5 hours',
      bookable: true,
      featured: true,
      sort_order: 2,
      visible: true,
    },
    {
      subcategory_id: dayTripsId,
      slug: 'masca-village-hike',
      name: { es: 'Excursión al Barranco de Masca', en: 'Masca Gorge Hiking Day Trip', de: 'Tagesausflug Masca-Schlucht' },
      description: {
        es: 'Excursión de un día al emblemático barranco de Masca, una de las rutas de senderismo más espectaculares de Canarias. Descenso por el barranco hasta la playa, con paredes rocosas de hasta 600 metros de altura, vegetación endémica y paisajes que quitan el aliento. Regreso en barco a Los Gigantes. Incluye transporte, guía y barco.',
        en: 'Full-day trip to the iconic Masca Gorge, one of the most spectacular hiking routes in the Canaries. Descend through the gorge to the beach, with rock walls up to 600 meters high, endemic vegetation and breathtaking landscapes. Return by boat to Los Gigantes. Includes transport, guide and boat.',
        de: 'Ganztagesausflug zur legendären Masca-Schlucht, einer der spektakulärsten Wanderrouten der Kanaren. Abstieg durch die Schlucht zum Strand mit bis zu 600 Meter hohen Felswänden, endemischer Vegetation und atemberaubenden Landschaften. Rückkehr per Boot nach Los Gigantes. Inklusive Transport, Guide und Boot.',
      },
      short_description: { es: 'Descenso por el barranco más espectacular de Canarias', en: 'Descend through the most spectacular gorge in the Canaries', de: 'Abstieg durch die spektakulärste Schlucht der Kanaren' },
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
      location: { es: 'Masca, Buenavista del Norte', en: 'Masca, Buenavista del Norte' },
      area_id: losGigantes,
      coordinates: { lat: 28.2930, lng: -16.8400 },
      rating: 4.9,
      review_count: 1540,
      price_from: 50,
      currency: 'EUR',
      duration: 'Full day',
      bookable: true,
      featured: true,
      sort_order: 3,
      visible: true,
    },
  ])
  console.log('Day trip items added (3 items)')

  // =============================================
  // EXPERIENCES - LUXURY EXPERIENCES (0 items)
  // =============================================
  console.log('Adding luxury experiences...')
  await upsertItems([
    {
      subcategory_id: luxuryExperiencesId,
      slug: 'private-helicopter-tour',
      name: { es: 'Tour Privado en Helicóptero por Tenerife', en: 'Private Helicopter Tour over Tenerife', de: 'Privater Hubschrauberrundflug über Teneriffa' },
      description: {
        es: 'Sobrevuela Tenerife en un helicóptero privado y contempla el Teide, los Acantilados de Los Gigantes y el Parque Rural de Anaga desde las alturas. Una perspectiva única de la isla que pocas personas tienen la oportunidad de experimentar. Vuelo privado para hasta 5 pasajeros con piloto experto y auriculares con comentarios en varios idiomas.',
        en: 'Fly over Tenerife in a private helicopter and see Teide, Los Gigantes Cliffs and Anaga Rural Park from above. A unique perspective of the island that few people get to experience. Private flight for up to 5 passengers with expert pilot and headsets with multilingual commentary.',
        de: 'Überfliegen Sie Teneriffa in einem privaten Hubschrauber und sehen Sie den Teide, die Klippen von Los Gigantes und den Anaga-Naturpark von oben. Eine einzigartige Perspektive der Insel, die nur wenige erleben. Privatflug für bis zu 5 Passagiere mit erfahrenem Piloten und Kopfhörern mit mehrsprachigem Kommentar.',
      },
      short_description: { es: 'Helicóptero privado sobre Teide, Los Gigantes y Anaga', en: 'Private helicopter over Teide, Los Gigantes and Anaga', de: 'Privater Hubschrauber über Teide, Los Gigantes und Anaga' },
      image: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=800&q=80',
      location: { es: 'Tenerife Sur', en: 'South Tenerife' },
      area_id: costaAdeje,
      coordinates: { lat: 28.0450, lng: -16.5720 },
      rating: 5.0,
      review_count: 180,
      price_from: 250,
      currency: 'EUR',
      duration: '30 min',
      bookable: true,
      featured: true,
      sort_order: 1,
      visible: true,
    },
    {
      subcategory_id: luxuryExperiencesId,
      slug: 'sunset-yacht-dinner',
      name: { es: 'Cena en Yate al Atardecer', en: 'Sunset Yacht Dinner', de: 'Sonnenuntergangs-Dinner auf der Yacht' },
      description: {
        es: 'Cena gourmet privada en yate de lujo mientras contemplas la puesta de sol sobre el Atlántico. Menú de 5 tiempos preparado por chef a bordo con ingredientes locales y maridaje de vinos canarios. Navega por la costa de Costa Adeje, con posibilidad de avistar delfines. Capacidad máxima 8 personas para una experiencia exclusiva.',
        en: 'Private gourmet dinner on a luxury yacht while watching the sunset over the Atlantic. 5-course menu prepared by an onboard chef with local ingredients and Canarian wine pairing. Sail along the Costa Adeje coast with chances to spot dolphins. Maximum 8 guests for an exclusive experience.',
        de: 'Privates Gourmet-Dinner auf einer Luxusyacht mit Blick auf den Sonnenuntergang über dem Atlantik. 5-Gänge-Menü, zubereitet vom Bordkoch mit lokalen Zutaten und kanarischer Weinbegleitung. Segeln Sie entlang der Küste von Costa Adeje mit Chancen auf Delfinbeobachtung. Maximal 8 Gäste für ein exklusives Erlebnis.',
      },
      short_description: { es: 'Cena gourmet privada en yate con puesta de sol', en: 'Private gourmet dinner on yacht watching the sunset', de: 'Privates Gourmet-Dinner auf der Yacht bei Sonnenuntergang' },
      image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=800&q=80',
      location: { es: 'Costa Adeje', en: 'Costa Adeje' },
      area_id: costaAdeje,
      coordinates: { lat: 28.0780, lng: -16.7340 },
      rating: 4.9,
      review_count: 210,
      price_from: 180,
      currency: 'EUR',
      duration: '3 hours',
      bookable: true,
      featured: true,
      sort_order: 2,
      visible: true,
    },
    {
      subcategory_id: luxuryExperiencesId,
      slug: 'private-wine-tour-volcanic',
      name: { es: 'Tour Privado de Vinos Volcánicos', en: 'Private Volcanic Wine Tour', de: 'Private Vulkanwein-Tour' },
      description: {
        es: 'Tour privado por las mejores bodegas de Tenerife con cata de vinos volcánicos únicos en el mundo. Visita 3 bodegas con denominación de origen, conoce el proceso de elaboración en suelos volcánicos, degusta 12 vinos diferentes maridados con tapas gourmet de productos locales. Incluye transporte en vehículo de lujo y sumiller privado.',
        en: 'Private tour of Tenerife\'s best wineries with tasting of unique volcanic wines. Visit 3 denomination of origin wineries, learn about winemaking on volcanic soils, taste 12 different wines paired with gourmet local tapas. Includes luxury vehicle transport and private sommelier.',
        de: 'Private Tour zu Teneriffas besten Weingütern mit Verkostung einzigartiger Vulkanweine. Besuchen Sie 3 Weingüter mit Herkunftsbezeichnung, erfahren Sie über Weinherstellung auf Vulkanböden, probieren Sie 12 verschiedene Weine mit Gourmet-Tapas aus lokalen Produkten. Inklusive Luxusfahrzeug-Transport und privatem Sommelier.',
      },
      short_description: { es: 'Tour privado por bodegas con sumiller y cata premium', en: 'Private winery tour with sommelier and premium tasting', de: 'Private Weingut-Tour mit Sommelier und Premium-Verkostung' },
      image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80',
      location: { es: 'Norte de Tenerife', en: 'Northern Tenerife' },
      area_id: puertoCruz,
      coordinates: { lat: 28.3930, lng: -16.5410 },
      rating: 4.8,
      review_count: 320,
      price_from: 150,
      currency: 'EUR',
      duration: '6 hours',
      bookable: true,
      featured: false,
      sort_order: 3,
      visible: true,
    },
  ])
  console.log('Luxury experiences added (3 items)')

  // =============================================
  // BEACHES - BEST BEACHES (0 items)
  // =============================================
  console.log('Adding best beaches...')
  await upsertItems([
    {
      subcategory_id: bestBeachesId,
      slug: 'playa-de-las-teresitas',
      name: { es: 'Playa de Las Teresitas', en: 'Las Teresitas Beach', de: 'Strand Las Teresitas' },
      description: {
        es: 'La playa más icónica de Tenerife, con arena dorada traída del Sáhara y aguas tranquilas protegidas por un dique. Rodeada de palmeras y con vistas al macizo de Anaga, es perfecta para familias. A solo 10 minutos de Santa Cruz. Chiringuitos, duchas, socorristas y aparcamiento amplio.',
        en: 'Tenerife\'s most iconic beach, with golden sand brought from the Sahara and calm waters protected by a breakwater. Surrounded by palm trees with views of the Anaga massif, it\'s perfect for families. Just 10 minutes from Santa Cruz. Beach bars, showers, lifeguards and large parking area.',
        de: 'Teneriffas berühmtester Strand mit goldenem Sand aus der Sahara und ruhigem Wasser, geschützt durch einen Wellenbrecher. Umgeben von Palmen mit Blick auf das Anaga-Massiv, perfekt für Familien. Nur 10 Minuten von Santa Cruz entfernt. Strandbars, Duschen, Rettungsschwimmer und großer Parkplatz.',
      },
      short_description: { es: 'Arena dorada del Sáhara con vistas a Anaga', en: 'Golden Saharan sand with Anaga views', de: 'Goldener Sahara-Sand mit Anaga-Blick' },
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
      location: { es: 'San Andrés, Santa Cruz', en: 'San Andrés, Santa Cruz' },
      area_id: santaCruz,
      coordinates: { lat: 28.5083, lng: -16.1873 },
      rating: 4.7,
      review_count: 2450,
      price_from: 0,
      currency: 'EUR',
      bookable: false,
      featured: true,
      sort_order: 1,
      visible: true,
    },
    {
      subcategory_id: bestBeachesId,
      slug: 'playa-del-duque',
      name: { es: 'Playa del Duque', en: 'Playa del Duque', de: 'Playa del Duque' },
      description: {
        es: 'Playa de arena dorada fina en la zona más exclusiva de Costa Adeje, rodeada de hoteles 5 estrellas y restaurantes de lujo. Aguas cristalinas y tranquilas, perfecta para nadar. Bandera azul, servicio de hamacas y sombrillas, duchas y paseo marítimo con boutiques. Una de las playas más elegantes de Canarias.',
        en: 'Fine golden sand beach in the most exclusive area of Costa Adeje, surrounded by 5-star hotels and luxury restaurants. Crystal-clear calm waters, perfect for swimming. Blue Flag, sun lounger and parasol service, showers and seafront promenade with boutiques. One of the most elegant beaches in the Canaries.',
        de: 'Feinsandiger goldener Strand im exklusivsten Gebiet von Costa Adeje, umgeben von 5-Sterne-Hotels und Luxusrestaurants. Kristallklares ruhiges Wasser, perfekt zum Schwimmen. Blaue Flagge, Liegen- und Sonnenschirmservice, Duschen und Strandpromenade mit Boutiquen. Einer der elegantesten Strände der Kanaren.',
      },
      short_description: { es: 'Playa exclusiva con arena dorada y aguas cristalinas', en: 'Exclusive beach with golden sand and crystal waters', de: 'Exklusiver Strand mit goldenem Sand und kristallklarem Wasser' },
      image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80',
      location: { es: 'Costa Adeje', en: 'Costa Adeje' },
      area_id: costaAdeje,
      coordinates: { lat: 28.0880, lng: -16.7410 },
      rating: 4.8,
      review_count: 1980,
      price_from: 0,
      currency: 'EUR',
      bookable: false,
      featured: true,
      sort_order: 2,
      visible: true,
    },
    {
      subcategory_id: bestBeachesId,
      slug: 'playa-benijo',
      name: { es: 'Playa de Benijo', en: 'Benijo Beach', de: 'Strand Benijo' },
      description: {
        es: 'Playa salvaje de arena negra volcánica en el extremo norte del macizo de Anaga. Famosa por sus Roques de Anaga emergiendo del mar y sus puestas de sol espectaculares. Oleaje fuerte, ideal para surfistas y amantes de la naturaleza indómita. Sin servicios pero con un chiringuito cercano en el pueblo de Benijo.',
        en: 'Wild black volcanic sand beach at the northern tip of the Anaga massif. Famous for the Roques de Anaga rising from the sea and its spectacular sunsets. Strong waves, ideal for surfers and lovers of untamed nature. No facilities but a nearby beach bar in the village of Benijo.',
        de: 'Wilder schwarzer Vulkansandstrand an der Nordspitze des Anaga-Massivs. Berühmt für die Roques de Anaga, die aus dem Meer ragen, und seine spektakulären Sonnenuntergänge. Starker Wellengang, ideal für Surfer und Liebhaber unberührter Natur. Keine Einrichtungen, aber eine nahegelegene Strandbar im Dorf Benijo.',
      },
      short_description: { es: 'Playa salvaje de arena negra con roques volcánicos', en: 'Wild black sand beach with volcanic rock formations', de: 'Wilder schwarzer Sandstrand mit Vulkanfelsen' },
      image: 'https://images.unsplash.com/photo-1509233725247-49e657c54213?w=800&q=80',
      location: { es: 'Anaga, Santa Cruz', en: 'Anaga, Santa Cruz' },
      area_id: anaga,
      coordinates: { lat: 28.5730, lng: -16.1780 },
      rating: 4.6,
      review_count: 890,
      price_from: 0,
      currency: 'EUR',
      bookable: false,
      featured: true,
      sort_order: 3,
      visible: true,
    },
  ])
  console.log('Best beaches added (3 items)')

  // =============================================
  // NATURE - HIKING TRAILS (0 items)
  // =============================================
  console.log('Adding hiking trail items...')
  await upsertItems([
    {
      subcategory_id: hikingTrailsId,
      slug: 'sendero-de-los-sentidos',
      name: { es: 'Sendero de los Sentidos (Anaga)', en: 'Trail of the Senses (Anaga)', de: 'Pfad der Sinne (Anaga)' },
      description: {
        es: 'Ruta circular fácil de 2 km por el bosque de laurisilva de Anaga. Sendero adaptado con paneles interpretativos que invitan a experimentar el bosque con los cinco sentidos: toca la corteza de los árboles centenarios, escucha el canto de las aves endémicas y respira los aromas del bosque húmedo. Perfecto para familias y principiantes.',
        en: 'Easy 2 km circular trail through the Anaga laurel forest. Adapted path with interpretive panels inviting you to experience the forest with all five senses: touch the bark of centuries-old trees, listen to endemic birdsong and breathe in the humid forest aromas. Perfect for families and beginners.',
        de: 'Leichter 2 km Rundweg durch den Lorbeerwald von Anaga. Angepasster Pfad mit Interpretationstafeln, die einladen, den Wald mit allen fünf Sinnen zu erleben: Berühren Sie die Rinde jahrhundertealter Bäume, lauschen Sie dem Gesang endemischer Vögel und atmen Sie die Aromen des feuchten Waldes ein. Perfekt für Familien und Anfänger.',
      },
      short_description: { es: 'Ruta sensorial por la laurisilva de Anaga', en: 'Sensory trail through Anaga laurel forest', de: 'Sinnespfad durch den Anaga-Lorbeerwald' },
      image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80',
      location: { es: 'Parque Rural de Anaga', en: 'Anaga Rural Park' },
      area_id: anaga,
      coordinates: { lat: 28.5390, lng: -16.2100 },
      rating: 4.5,
      review_count: 680,
      price_from: 0,
      currency: 'EUR',
      bookable: false,
      featured: true,
      sort_order: 1,
      visible: true,
    },
    {
      subcategory_id: hikingTrailsId,
      slug: 'ruta-pico-viejo',
      name: { es: 'Ruta al Pico Viejo desde Montaña Guajara', en: 'Pico Viejo Trail from Montaña Guajara', de: 'Pico Viejo Wanderweg ab Montaña Guajara' },
      description: {
        es: 'Ruta de senderismo avanzada por las cumbres del Parque Nacional del Teide. Desde el aparcamiento de la Degollada de Guajara, sube al tercer pico más alto de España (2718m) con vistas espectaculares a las Cañadas, el Teide y las islas vecinas. Distancia: 10 km, desnivel: 600m. Se recomienda madrugar y llevar ropa de abrigo.',
        en: 'Advanced hiking trail along the summits of Teide National Park. From the Degollada de Guajara parking, climb to Spain\'s third highest peak (2,718m) with spectacular views of Las Cañadas, Teide and neighboring islands. Distance: 10 km, elevation gain: 600m. Early start and warm clothing recommended.',
        de: 'Anspruchsvoller Wanderweg entlang der Gipfel des Teide-Nationalparks. Vom Parkplatz Degollada de Guajara aus steigen Sie zum dritthöchsten Gipfel Spaniens (2.718m) auf, mit spektakulärem Blick auf Las Cañadas, den Teide und die Nachbarinseln. Distanz: 10 km, Höhenunterschied: 600m. Früher Start und warme Kleidung empfohlen.',
      },
      short_description: { es: 'Ruta de montaña al tercer pico más alto de España', en: 'Mountain trail to Spain\'s third highest peak', de: 'Bergwanderung zum dritthöchsten Gipfel Spaniens' },
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
      location: { es: 'Parque Nacional del Teide', en: 'Teide National Park' },
      area_id: teide,
      coordinates: { lat: 28.2200, lng: -16.6370 },
      rating: 4.8,
      review_count: 420,
      price_from: 0,
      currency: 'EUR',
      bookable: false,
      featured: true,
      sort_order: 2,
      visible: true,
    },
    {
      subcategory_id: hikingTrailsId,
      slug: 'barranco-del-infierno',
      name: { es: 'Barranco del Infierno', en: 'Hell\'s Gorge Trail', de: 'Höllen-Schlucht Wanderweg' },
      description: {
        es: 'Reserva Natural Especial con una de las rutas más populares del sur de Tenerife. Sendero de 6.5 km (ida y vuelta) que desciende por un barranco espectacular hasta una cascada de 200 metros, la más alta de Tenerife. Vegetación endémica, aves rapaces y paisajes impresionantes. Acceso con reserva previa obligatoria (máx. 300 personas/día).',
        en: 'Special Nature Reserve with one of the most popular trails in southern Tenerife. A 6.5 km trail (round trip) descending through a spectacular gorge to a 200-meter waterfall, the highest in Tenerife. Endemic vegetation, birds of prey and impressive landscapes. Access requires advance booking (max 300 people/day).',
        de: 'Spezielles Naturreservat mit einem der beliebtesten Wanderwege Südteneriffas. Ein 6,5 km langer Weg (hin und zurück), der durch eine spektakuläre Schlucht zu einem 200 Meter hohen Wasserfall führt, dem höchsten Teneriffas. Endemische Vegetation, Greifvögel und beeindruckende Landschaften. Zugang nur mit Vorausbuchung (max. 300 Personen/Tag).',
      },
      short_description: { es: 'Barranco con la cascada más alta de Tenerife', en: 'Gorge with Tenerife\'s highest waterfall', de: 'Schlucht mit dem höchsten Wasserfall Teneriffas' },
      image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&q=80',
      location: { es: 'Adeje', en: 'Adeje' },
      area_id: costaAdeje,
      coordinates: { lat: 28.1170, lng: -16.7250 },
      rating: 4.7,
      review_count: 1350,
      price_from: 10,
      currency: 'EUR',
      duration: '3-4 hours',
      bookable: true,
      booking_url: 'https://www.barrancodelinfierno.es',
      featured: true,
      sort_order: 3,
      visible: true,
    },
  ])
  console.log('Hiking trail items added (3 items)')

  // =============================================
  // FAMILY - WATER PARKS (0 items)
  // =============================================
  console.log('Adding water park items...')
  await upsertItems([
    {
      subcategory_id: waterParksId,
      slug: 'aqualand-costa-adeje',
      name: { es: 'Aqualand Costa Adeje', en: 'Aqualand Costa Adeje', de: 'Aqualand Costa Adeje' },
      description: {
        es: 'Parque acuático con toboganes para todas las edades, espectáculos de delfines y zona infantil. Incluye piscina de olas, río lento, toboganes de vértigo como el Kamikaze y Tsunami, y área Dolphinland con interacción con delfines. Zona de restauración y tumbonas. Diversión garantizada para toda la familia durante un día completo.',
        en: 'Water park with slides for all ages, dolphin shows and kids area. Features wave pool, lazy river, thrilling slides like Kamikaze and Tsunami, and Dolphinland area with dolphin interaction. Food court and sun loungers. Guaranteed fun for the whole family for a full day.',
        de: 'Wasserpark mit Rutschen für jedes Alter, Delfinshows und Kinderbereich. Mit Wellenbecken, Strömungskanal, aufregenden Rutschen wie Kamikaze und Tsunami sowie dem Dolphinland-Bereich mit Delfin-Interaktion. Gastronomiebereich und Sonnenliegen. Garantierter Spaß für die ganze Familie für einen ganzen Tag.',
      },
      short_description: { es: 'Parque acuático con toboganes y espectáculos de delfines', en: 'Water park with slides, dolphin shows and kids area', de: 'Wasserpark mit Rutschen, Delfinshows und Kinderbereich' },
      image: 'https://images.unsplash.com/photo-1562078809-c5391e3e79de?w=800&q=80',
      location: { es: 'Costa Adeje', en: 'Costa Adeje' },
      area_id: costaAdeje,
      coordinates: { lat: 28.0790, lng: -16.7280 },
      rating: 4.3,
      review_count: 2100,
      price_from: 28,
      currency: 'EUR',
      duration: 'Full day',
      bookable: true,
      featured: true,
      sort_order: 1,
      visible: true,
    },
  ])
  console.log('Water park items added (1 item)')

  // =============================================
  // FAMILY - ZOOS & AQUARIUMS (0 items)
  // =============================================
  console.log('Adding zoo/aquarium items...')
  await upsertItems([
    {
      subcategory_id: zoosAquariumsId,
      slug: 'jungle-park-tenerife',
      name: { es: 'Jungle Park (Las Águilas)', en: 'Jungle Park (Las Aguilas)', de: 'Jungle Park (Las Águilas)' },
      description: {
        es: 'Parque de vida silvestre con espectáculos de aves rapaces, paseos por la jungla y actuaciones de leones marinos. Alberga más de 500 animales de 100 especies diferentes en un entorno tropical de 75.000 m². Incluye zona de aventura con tobogán gigante, puentes colgantes y tirolinas. Ideal para familias con niños de todas las edades.',
        en: 'Wildlife park with birds of prey shows, jungle walks and sea lion performances. Home to over 500 animals from 100 different species in a 75,000 m² tropical setting. Includes adventure zone with giant slide, suspension bridges and zip lines. Ideal for families with children of all ages.',
        de: 'Wildpark mit Greifvogelshows, Dschungelwanderungen und Seelöwen-Vorführungen. Beherbergt über 500 Tiere aus 100 verschiedenen Arten in einer 75.000 m² großen tropischen Umgebung. Inklusive Abenteuerzone mit Riesenrutsche, Hängebrücken und Seilrutschen. Ideal für Familien mit Kindern jeden Alters.',
      },
      short_description: { es: 'Parque de vida silvestre con espectáculos y aventuras', en: 'Wildlife park with shows, jungle walks and adventures', de: 'Wildpark mit Shows, Dschungelwanderungen und Abenteuern' },
      image: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?w=800&q=80',
      location: { es: 'Arona, Sur de Tenerife', en: 'Arona, South Tenerife' },
      area_id: losCristianos,
      coordinates: { lat: 28.0670, lng: -16.7050 },
      rating: 4.5,
      review_count: 1680,
      price_from: 26,
      currency: 'EUR',
      duration: 'Half day',
      bookable: true,
      featured: true,
      sort_order: 1,
      visible: true,
    },
    {
      subcategory_id: zoosAquariumsId,
      slug: 'pueblo-chico',
      name: { es: 'Pueblo Chico', en: 'Pueblo Chico', de: 'Pueblo Chico' },
      description: {
        es: 'Parque en miniatura con maquetas a escala de los edificios y paisajes más emblemáticos de Tenerife y Canarias. Reproduce con gran detalle la arquitectura tradicional canaria, monumentos históricos, barrancos, el Teide y los pueblos de la isla. Jardín tropical con plantas autóctonas y zona de juegos infantiles. Una forma divertida y educativa de conocer la isla.',
        en: 'Miniature park with scale models of Tenerife\'s and the Canary Islands\' most important buildings and landscapes. Reproduces traditional Canarian architecture, historic monuments, gorges, Teide and island villages in great detail. Tropical garden with native plants and children\'s playground. A fun and educational way to discover the island.',
        de: 'Miniaturpark mit maßstabsgetreuen Modellen der wichtigsten Gebäude und Landschaften Teneriffas und der Kanarischen Inseln. Reproduziert mit großer Detailtreue die traditionelle kanarische Architektur, historische Denkmäler, Schluchten, den Teide und Inseldörfer. Tropischer Garten mit einheimischen Pflanzen und Kinderspielplatz. Eine unterhaltsame und lehrreiche Art, die Insel zu entdecken.',
      },
      short_description: { es: 'Tenerife en miniatura con maquetas a escala', en: 'Miniature Tenerife with scale models', de: 'Teneriffa in Miniatur mit maßstabsgetreuen Modellen' },
      image: 'https://images.unsplash.com/photo-1558008258-3256797b43f3?w=800&q=80',
      location: { es: 'La Orotava', en: 'La Orotava' },
      area_id: puertoCruz,
      coordinates: { lat: 28.3900, lng: -16.5230 },
      rating: 4.0,
      review_count: 720,
      price_from: 15,
      currency: 'EUR',
      duration: '2 hours',
      bookable: true,
      featured: false,
      sort_order: 2,
      visible: true,
    },
  ])
  console.log('Zoo/aquarium items added (2 items)')

  // =============================================
  // WELLNESS - COUPLES (0 items)
  // =============================================
  console.log('Adding couples wellness items...')
  await upsertItems([
    {
      subcategory_id: couplesId,
      slug: 'thai-massage-costa-adeje',
      name: { es: 'Thai Massage Costa Adeje', en: 'Thai Massage Costa Adeje', de: 'Thai Massage Costa Adeje' },
      description: {
        es: 'Masaje tailandés auténtico en un ambiente relajado en Costa Adeje. Terapeutas certificados de Tailandia aplican técnicas ancestrales de presión y estiramiento para liberar tensiones y restaurar el equilibrio energético. Opciones para parejas en sala doble con aromaterapia, música relajante y té de bienvenida.',
        en: 'Authentic Thai massage in a relaxed setting in Costa Adeje. Certified therapists from Thailand apply ancient pressure and stretching techniques to release tension and restore energy balance. Couples options in double room with aromatherapy, relaxing music and welcome tea.',
        de: 'Authentische Thai-Massage in entspannter Atmosphäre in Costa Adeje. Zertifizierte Therapeuten aus Thailand wenden uralte Druck- und Dehnungstechniken an, um Verspannungen zu lösen und das Energiegleichgewicht wiederherzustellen. Paar-Optionen im Doppelraum mit Aromatherapie, entspannender Musik und Willkommenstee.',
      },
      short_description: { es: 'Masaje tailandés auténtico para parejas', en: 'Authentic Thai massage for couples', de: 'Authentische Thai-Massage für Paare' },
      image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80',
      location: { es: 'Costa Adeje', en: 'Costa Adeje' },
      area_id: costaAdeje,
      coordinates: { lat: 28.0810, lng: -16.7260 },
      rating: 4.6,
      review_count: 380,
      price_from: 60,
      currency: 'EUR',
      duration: '1 hour',
      bookable: true,
      featured: true,
      sort_order: 1,
      visible: true,
    },
    {
      subcategory_id: couplesId,
      slug: 'romantic-sunset-spa',
      name: { es: 'Spa Romántico al Atardecer', en: 'Romantic Sunset Spa Experience', de: 'Romantisches Sonnenuntergangs-Spa' },
      description: {
        es: 'Experiencia spa exclusiva para parejas al atardecer con jacuzzi privado con vistas al mar, masaje en pareja con aceites esenciales canarios, envolturas corporales de aloe vera y plátano de Canarias. Incluye cava, fresas y bombones artesanales. El paquete perfecto para celebrar aniversarios y ocasiones especiales.',
        en: 'Exclusive sunset spa experience for couples with private jacuzzi overlooking the sea, couples massage with Canarian essential oils, aloe vera and Canarian banana body wraps. Includes cava, strawberries and artisan chocolates. The perfect package for celebrating anniversaries and special occasions.',
        de: 'Exklusives Sonnenuntergangs-Spa-Erlebnis für Paare mit privatem Jacuzzi mit Meerblick, Paarmassage mit kanarischen ätherischen Ölen, Aloe-Vera- und kanarische Bananen-Körperwickel. Inklusive Cava, Erdbeeren und handwerkliche Pralinen. Das perfekte Paket für Jahrestage und besondere Anlässe.',
      },
      short_description: { es: 'Spa para parejas con jacuzzi privado y vistas al mar', en: 'Couples spa with private jacuzzi and sea views', de: 'Paar-Spa mit privatem Jacuzzi und Meerblick' },
      image: 'https://images.unsplash.com/photo-1583416750470-965b2707b355?w=800&q=80',
      location: { es: 'Costa Adeje', en: 'Costa Adeje' },
      area_id: costaAdeje,
      coordinates: { lat: 28.0850, lng: -16.7350 },
      rating: 4.8,
      review_count: 260,
      price_from: 120,
      currency: 'EUR',
      duration: '2 hours',
      bookable: true,
      featured: true,
      sort_order: 2,
      visible: true,
    },
    {
      subcategory_id: couplesId,
      slug: 'meditation-retreat-anaga',
      name: { es: 'Retiro de Meditación en Anaga', en: 'Silent Meditation Retreat in Anaga', de: 'Stilles Meditations-Retreat in Anaga' },
      description: {
        es: 'Retiro de meditación silenciosa de 3 días en el corazón del Parque Rural de Anaga. Desconecta del mundo en un entorno de laurisilva milenaria con sesiones guiadas de meditación vipassana, yoga restaurativo, caminatas contemplativas y alimentación vegetariana ecológica. Alojamiento en casas rurales restauradas. Ideal para parejas que buscan una experiencia transformadora.',
        en: '3-day silent meditation retreat in the heart of the Anaga Rural Park. Disconnect from the world in an ancient laurel forest setting with guided vipassana meditation sessions, restorative yoga, contemplative walks and organic vegetarian food. Accommodation in restored rural houses. Ideal for couples seeking a transformative experience.',
        de: '3-tägiges stilles Meditations-Retreat im Herzen des Anaga-Naturparks. Trennen Sie sich von der Welt in einer Umgebung uralter Lorbeerwälder mit geführten Vipassana-Meditationssitzungen, restaurativem Yoga, kontemplativen Wanderungen und ökologisch-vegetarischer Ernährung. Unterkunft in restaurierten Landhäusern. Ideal für Paare, die ein transformatives Erlebnis suchen.',
      },
      short_description: { es: 'Retiro de silencio de 3 días en la naturaleza', en: '3-day silent retreat in nature', de: '3-tägiges stilles Retreat in der Natur' },
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
      location: { es: 'Parque Rural de Anaga', en: 'Anaga Rural Park' },
      area_id: anaga,
      coordinates: { lat: 28.5450, lng: -16.2080 },
      rating: 4.9,
      review_count: 95,
      price_from: 350,
      currency: 'EUR',
      duration: '3 days',
      bookable: true,
      featured: false,
      sort_order: 3,
      visible: true,
    },
  ])
  console.log('Couples wellness items added (3 items)')

  // =============================================
  // NIGHTLIFE - COCKTAIL BARS (0 items)
  // =============================================
  console.log('Adding cocktail bar items...')
  await upsertItems([
    {
      subcategory_id: cocktailBarsId,
      slug: 'the-rooftop-santa-cruz',
      name: { es: 'The Rooftop - Terraza Panorámica', en: 'The Rooftop - Panoramic Terrace', de: 'The Rooftop - Panorama-Terrasse' },
      description: {
        es: 'Bar de cócteles en la azotea de un edificio histórico de Santa Cruz con vistas panorámicas de 360° sobre la ciudad, el puerto y el Teide. Carta de cócteles de autor con ingredientes locales como ron canario, plátano, mango y hierbas aromáticas de la isla. DJ sessions los viernes y sábados. Ambiente sofisticado y cosmopolita.',
        en: 'Rooftop cocktail bar atop a historic building in Santa Cruz with 360° panoramic views of the city, port and Teide. Signature cocktail menu with local ingredients like Canarian rum, banana, mango and aromatic island herbs. DJ sessions on Fridays and Saturdays. Sophisticated and cosmopolitan atmosphere.',
        de: 'Rooftop-Cocktailbar auf einem historischen Gebäude in Santa Cruz mit 360°-Panoramablick über die Stadt, den Hafen und den Teide. Signature-Cocktail-Karte mit lokalen Zutaten wie kanarischem Rum, Banane, Mango und aromatischen Inselkräutern. DJ-Sessions freitags und samstags. Anspruchsvolles und kosmopolitisches Ambiente.',
      },
      short_description: { es: 'Cócteles de autor con vistas panorámicas a Santa Cruz', en: 'Signature cocktails with panoramic Santa Cruz views', de: 'Signature-Cocktails mit Panoramablick auf Santa Cruz' },
      image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80',
      location: { es: 'Santa Cruz de Tenerife', en: 'Santa Cruz de Tenerife' },
      area_id: santaCruz,
      coordinates: { lat: 28.4680, lng: -16.2530 },
      rating: 4.6,
      review_count: 340,
      price_from: 10,
      currency: 'EUR',
      bookable: false,
      featured: true,
      sort_order: 1,
      visible: true,
    },
    {
      subcategory_id: cocktailBarsId,
      slug: 'monkey-beach-club-cocktails',
      name: { es: 'Monkey Beach Club - Cocktail Lounge', en: 'Monkey Beach Club - Cocktail Lounge', de: 'Monkey Beach Club - Cocktail Lounge' },
      description: {
        es: 'Lounge de cócteles junto a la playa en Costa Adeje con ambiente tropical y chill-out. Cócteles elaborados por mixólogos profesionales, carta de gintonics premium y selección de champagne. Tumbonas balinesas, música lounge en directo y puestas de sol inolvidables sobre el océano. El lugar perfecto para empezar la noche.',
        en: 'Beachside cocktail lounge in Costa Adeje with tropical chill-out vibe. Cocktails crafted by professional mixologists, premium gin & tonic menu and champagne selection. Balinese daybeds, live lounge music and unforgettable ocean sunsets. The perfect place to start the evening.',
        de: 'Cocktail-Lounge am Strand in Costa Adeje mit tropischem Chill-out-Flair. Cocktails von professionellen Mixologen zubereitet, Premium-Gin-Tonic-Karte und Champagner-Auswahl. Balinesische Tagesbetten, Live-Lounge-Musik und unvergessliche Sonnenuntergänge über dem Ozean. Der perfekte Ort, um den Abend zu beginnen.',
      },
      short_description: { es: 'Cócteles premium junto a la playa al atardecer', en: 'Premium beachside cocktails at sunset', de: 'Premium-Cocktails am Strand bei Sonnenuntergang' },
      image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80',
      location: { es: 'Costa Adeje', en: 'Costa Adeje' },
      area_id: costaAdeje,
      coordinates: { lat: 28.0850, lng: -16.7380 },
      rating: 4.5,
      review_count: 520,
      price_from: 12,
      currency: 'EUR',
      bookable: false,
      featured: true,
      sort_order: 2,
      visible: true,
    },
    {
      subcategory_id: cocktailBarsId,
      slug: 'la-noria-speakeasy',
      name: { es: 'La Noria Speakeasy', en: 'La Noria Speakeasy', de: 'La Noria Speakeasy' },
      description: {
        es: 'Bar clandestino escondido en La Laguna, acceso por puerta discreta en un callejón del casco histórico. Interior con decoración de los años 20, barra de madera noble y luz tenue de velas. Carta de cócteles clásicos reinterpretados con productos canarios: ron miel, gofio, higos picos y hierbas de monte. Aforo limitado, se recomienda reservar.',
        en: 'Hidden speakeasy bar in La Laguna, accessed through a discreet door in an alley of the historic center. Interior with 1920s décor, hardwood bar and soft candlelight. Classic cocktails reinterpreted with Canarian products: honey rum, gofio, prickly pear figs and mountain herbs. Limited capacity, reservations recommended.',
        de: 'Versteckte Speakeasy-Bar in La Laguna, Zugang durch eine diskrete Tür in einer Gasse der Altstadt. Interieur mit 1920er-Jahre-Dekor, Edelholz-Bar und sanftem Kerzenlicht. Klassische Cocktails, neu interpretiert mit kanarischen Produkten: Honigrum, Gofio, Kaktusfeigen und Bergkräuter. Begrenzte Kapazität, Reservierung empfohlen.',
      },
      short_description: { es: 'Speakeasy oculto con cócteles canarios de autor', en: 'Hidden speakeasy with Canarian signature cocktails', de: 'Versteckte Speakeasy-Bar mit kanarischen Signature-Cocktails' },
      image: 'https://images.unsplash.com/photo-1525268323446-0505b6fe7778?w=800&q=80',
      location: { es: 'San Cristóbal de La Laguna', en: 'San Cristóbal de La Laguna' },
      area_id: laLaguna,
      coordinates: { lat: 28.4870, lng: -16.3150 },
      rating: 4.7,
      review_count: 210,
      price_from: 12,
      currency: 'EUR',
      bookable: false,
      featured: false,
      sort_order: 3,
      visible: true,
    },
  ])
  console.log('Cocktail bar items added (3 items)')

  // =============================================
  // SHOPPING - SHOPPING AREAS (0 items)
  // =============================================
  console.log('Adding shopping area items...')
  await upsertItems([
    {
      subcategory_id: shoppingAreasId,
      slug: 'calle-castillo-santa-cruz',
      name: { es: 'Calle del Castillo, Santa Cruz', en: 'Calle del Castillo, Santa Cruz', de: 'Calle del Castillo, Santa Cruz' },
      description: {
        es: 'La arteria comercial principal de la capital tinerfeña. Calle peatonal de casi 1 km repleta de tiendas de moda nacionales e internacionales, zapateras, joyerías y tiendas de electrónica. También encontrarás cafeterías con terrazas, heladerías y puestos de artesanía. Los domingos hay ambiente más tranquilo, pero entre semana y sábados bulle de actividad.',
        en: 'The main shopping artery of the Tenerife capital. A nearly 1 km pedestrian street packed with national and international fashion stores, shoe shops, jewelers and electronics stores. You\'ll also find cafés with terraces, ice cream parlors and craft stalls. Sundays are quieter, but weekdays and Saturdays buzz with activity.',
        de: 'Die Haupteinkaufsstraße der Hauptstadt Teneriffas. Eine fast 1 km lange Fußgängerzone voller nationaler und internationaler Modegeschäfte, Schuhläden, Juweliere und Elektronikgeschäfte. Auch Cafés mit Terrassen, Eisdielen und Kunsthandwerksstände. Sonntags ruhiger, aber unter der Woche und samstags voller Leben.',
      },
      short_description: { es: 'Calle peatonal comercial principal de Santa Cruz', en: 'Main pedestrian shopping street of Santa Cruz', de: 'Haupteinkaufsstraße von Santa Cruz' },
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
      location: { es: 'Santa Cruz de Tenerife', en: 'Santa Cruz de Tenerife' },
      area_id: santaCruz,
      coordinates: { lat: 28.4680, lng: -16.2520 },
      rating: 4.3,
      review_count: 890,
      price_from: 0,
      currency: 'EUR',
      bookable: false,
      featured: true,
      sort_order: 1,
      visible: true,
    },
    {
      subcategory_id: shoppingAreasId,
      slug: 'la-laguna-centro-historico',
      name: { es: 'Centro Histórico de La Laguna', en: 'La Laguna Historic Centre Shopping', de: 'Historisches Zentrum La Laguna - Shopping' },
      description: {
        es: 'El centro histórico de San Cristóbal de La Laguna (Patrimonio de la Humanidad) alberga tiendas artesanales, librerías independientes, boutiques de diseñadores locales y tiendas de antigüedades. Pasea por calles empedradas entre casonas canarias del siglo XVI mientras descubres productos únicos. La Calle San Agustín y la Calle Herradores son especialmente recomendadas.',
        en: 'The historic center of San Cristóbal de La Laguna (UNESCO World Heritage) is home to artisan shops, independent bookstores, local designer boutiques and antique stores. Stroll cobblestone streets among 16th-century Canarian mansions while discovering unique products. Calle San Agustín and Calle Herradores are especially recommended.',
        de: 'Das historische Zentrum von San Cristóbal de La Laguna (UNESCO-Welterbe) beherbergt Handwerksläden, unabhängige Buchhandlungen, Boutiquen lokaler Designer und Antiquitätengeschäfte. Schlendern Sie über Kopfsteinpflasterstraßen zwischen kanarischen Herrenhäusern aus dem 16. Jahrhundert und entdecken Sie einzigartige Produkte. Calle San Agustín und Calle Herradores besonders empfehlenswert.',
      },
      short_description: { es: 'Tiendas artesanales en calles Patrimonio de la Humanidad', en: 'Artisan shops on UNESCO World Heritage streets', de: 'Handwerksläden in UNESCO-Welterbe-Straßen' },
      image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&q=80',
      location: { es: 'San Cristóbal de La Laguna', en: 'San Cristóbal de La Laguna' },
      area_id: laLaguna,
      coordinates: { lat: 28.4870, lng: -16.3150 },
      rating: 4.5,
      review_count: 650,
      price_from: 0,
      currency: 'EUR',
      bookable: false,
      featured: true,
      sort_order: 2,
      visible: true,
    },
  ])
  console.log('Shopping area items added (2 items)')

  // =============================================
  // CULTURE - MUSEUMS (1 item, add more)
  // =============================================
  console.log('Adding museum items...')
  await upsertItems([
    {
      subcategory_id: museumsId,
      slug: 'museo-naturaleza-arqueologia',
      name: { es: 'Museo de la Naturaleza y Arqueología (MUNA)', en: 'Museum of Nature and Archaeology (MUNA)', de: 'Museum für Natur und Archäologie (MUNA)' },
      description: {
        es: 'El museo más importante de Canarias, ubicado en el antiguo Hospital Civil de Santa Cruz. Alberga la mayor colección de momias guanches del mundo, restos arqueológicos aborígenes, y exhibiciones sobre la geología volcánica, flora y fauna endémica de las islas. Un viaje fascinante por la historia natural y humana del archipiélago.',
        en: 'The most important museum in the Canaries, housed in the former Civil Hospital of Santa Cruz. Home to the world\'s largest collection of Guanche mummies, aboriginal archaeological remains, and exhibitions on volcanic geology, endemic flora and fauna of the islands. A fascinating journey through the natural and human history of the archipelago.',
        de: 'Das wichtigste Museum der Kanaren, untergebracht im ehemaligen Zivilkrankenhaus von Santa Cruz. Beherbergt die weltweit größte Sammlung von Guanchen-Mumien, archäologische Überreste der Ureinwohner und Ausstellungen über Vulkangeologie, endemische Flora und Fauna der Inseln. Eine faszinierende Reise durch die Natur- und Menschheitsgeschichte des Archipels.',
      },
      short_description: { es: 'Mayor colección de momias guanches del mundo', en: 'World\'s largest collection of Guanche mummies', de: 'Weltweit größte Sammlung von Guanchen-Mumien' },
      image: 'https://images.unsplash.com/photo-1565060299509-453c4f3bc905?w=800&q=80',
      location: { es: 'Santa Cruz de Tenerife', en: 'Santa Cruz de Tenerife' },
      area_id: santaCruz,
      coordinates: { lat: 28.4680, lng: -16.2490 },
      rating: 4.5,
      review_count: 1240,
      price_from: 5,
      currency: 'EUR',
      duration: '2 hours',
      bookable: false,
      featured: true,
      sort_order: 1,
      visible: true,
    },
    {
      subcategory_id: museumsId,
      slug: 'museo-ciencia-cosmos',
      name: { es: 'Museo de la Ciencia y el Cosmos', en: 'Museum of Science and the Cosmos', de: 'Museum für Wissenschaft und Kosmos' },
      description: {
        es: 'Museo interactivo en La Laguna dedicado a la ciencia y la astronomía. Con planetario digital, simuladores, experimentos interactivos y exposiciones sobre el universo, el cuerpo humano y las energías renovables. Perfecto para visitar en familia, los niños pueden tocar, experimentar y aprender jugando. Vinculado al Instituto de Astrofísica de Canarias.',
        en: 'Interactive museum in La Laguna dedicated to science and astronomy. Features digital planetarium, simulators, interactive experiments and exhibitions on the universe, the human body and renewable energy. Perfect for family visits, children can touch, experiment and learn through play. Linked to the Canary Islands Astrophysics Institute.',
        de: 'Interaktives Museum in La Laguna, gewidmet der Wissenschaft und Astronomie. Mit digitalem Planetarium, Simulatoren, interaktiven Experimenten und Ausstellungen über das Universum, den menschlichen Körper und erneuerbare Energien. Perfekt für Familienbesuche, Kinder können anfassen, experimentieren und spielerisch lernen. Verbunden mit dem Kanarischen Astrophysik-Institut.',
      },
      short_description: { es: 'Museo interactivo de ciencia con planetario', en: 'Interactive science museum with planetarium', de: 'Interaktives Wissenschaftsmuseum mit Planetarium' },
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
      location: { es: 'San Cristóbal de La Laguna', en: 'San Cristóbal de La Laguna' },
      area_id: laLaguna,
      coordinates: { lat: 28.4830, lng: -16.3210 },
      rating: 4.3,
      review_count: 860,
      price_from: 5,
      currency: 'EUR',
      duration: '2 hours',
      bookable: false,
      featured: false,
      sort_order: 2,
      visible: true,
    },
  ])
  console.log('Museum items added (2 items)')

  // =============================================
  // CULTURE - GUANCHE HERITAGE (1 item, add more)
  // =============================================
  console.log('Adding Guanche heritage items...')
  await upsertItems([
    {
      subcategory_id: guancheHeritageId,
      slug: 'piramides-guimar',
      name: { es: 'Pirámides de Güímar', en: 'Pyramids of Güímar', de: 'Pyramiden von Güímar' },
      description: {
        es: 'Parque etnográfico con seis pirámides escalonadas de origen misterioso, estudiadas por Thor Heyerdahl. El recorrido incluye el Museo Casa Chacona con exhibiciones sobre las expediciones de Heyerdahl, jardín de plantas venenosas, ruta de exportaciones canarias y auditorio con documentales. Un lugar fascinante que conecta Canarias con culturas ancestrales de todo el mundo.',
        en: 'Ethnographic park with six step pyramids of mysterious origin, studied by Thor Heyerdahl. The tour includes the Casa Chacona Museum with exhibitions on Heyerdahl\'s expeditions, poisonous plant garden, Canarian exports route and auditorium with documentaries. A fascinating place connecting the Canaries with ancestral cultures worldwide.',
        de: 'Ethnographischer Park mit sechs Stufenpyramiden mysteriösen Ursprungs, erforscht von Thor Heyerdahl. Der Rundgang umfasst das Casa-Chacona-Museum mit Ausstellungen über Heyerdahls Expeditionen, Giftpflanzengarten, Route der kanarischen Exporte und Auditorium mit Dokumentarfilmen. Ein faszinierender Ort, der die Kanaren mit Urkulturen weltweit verbindet.',
      },
      short_description: { es: 'Pirámides escalonadas y museo de Thor Heyerdahl', en: 'Step pyramids and Thor Heyerdahl museum', de: 'Stufenpyramiden und Thor-Heyerdahl-Museum' },
      image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=800&q=80',
      location: { es: 'Güímar', en: 'Güímar' },
      area_id: null,
      coordinates: { lat: 28.3180, lng: -16.3820 },
      rating: 4.2,
      review_count: 1560,
      price_from: 13,
      currency: 'EUR',
      duration: '2 hours',
      bookable: true,
      featured: true,
      sort_order: 1,
      visible: true,
    },
    {
      subcategory_id: guancheHeritageId,
      slug: 'cueva-del-viento',
      name: { es: 'Cueva del Viento', en: 'Cave of the Wind', de: 'Höhle des Windes' },
      description: {
        es: 'El tubo volcánico más grande de Europa y el quinto del mundo, con 18 km de galerías subterráneas formadas por coladas de lava del Teide hace 27.000 años. La visita guiada recorre 200m del tubo con formaciones geológicas únicas, restos fósiles de animales extintos y fauna troglodita. Los guanches lo utilizaban como refugio. Imprescindible reservar con antelación.',
        en: 'Europe\'s largest volcanic tube and the fifth largest in the world, with 18 km of underground galleries formed by Teide lava flows 27,000 years ago. The guided tour covers 200m of the tube with unique geological formations, fossils of extinct animals and cave-dwelling fauna. The Guanches used it as a shelter. Advance booking essential.',
        de: 'Europas größte Vulkanröhre und die fünftgrößte der Welt, mit 18 km unterirdischen Galerien, geformt durch Lavaströme des Teide vor 27.000 Jahren. Die geführte Tour führt über 200m durch die Röhre mit einzigartigen geologischen Formationen, Fossilien ausgestorbener Tiere und Höhlenfauna. Die Guanchen nutzten sie als Zufluchtsort. Vorab-Buchung erforderlich.',
      },
      short_description: { es: 'El tubo volcánico más grande de Europa', en: 'Europe\'s largest volcanic tube', de: 'Europas größte Vulkanröhre' },
      image: 'https://images.unsplash.com/photo-1504699839613-ff5d5d25e2ea?w=800&q=80',
      location: { es: 'Icod de los Vinos', en: 'Icod de los Vinos' },
      area_id: null,
      coordinates: { lat: 28.3510, lng: -16.7180 },
      rating: 4.6,
      review_count: 920,
      price_from: 20,
      currency: 'EUR',
      duration: '2 hours',
      bookable: true,
      booking_url: 'https://www.cuevadelviento.net',
      featured: true,
      sort_order: 2,
      visible: true,
    },
  ])
  console.log('Guanche heritage items added (2 items)')

  // =============================================
  // CULTURE - ARCHITECTURE (1 item, add more)
  // =============================================
  console.log('Adding architecture items...')
  await upsertItems([
    {
      subcategory_id: architectureId,
      slug: 'auditorio-tenerife',
      name: { es: 'Auditorio de Tenerife Adán Martín', en: 'Tenerife Auditorium Adán Martín', de: 'Auditorium von Teneriffa Adán Martín' },
      description: {
        es: 'Obra maestra arquitectónica diseñada por Santiago Calatrava, icono de Santa Cruz y de toda Canarias. Su espectacular cubierta de hormigón blanco en forma de ola se ha convertido en el símbolo de la ciudad. Sede de la Orquesta Sinfónica de Tenerife, acoge conciertos, ópera, ballet y eventos culturales de primer nivel. Visitas guiadas disponibles.',
        en: 'Architectural masterpiece designed by Santiago Calatrava, icon of Santa Cruz and all the Canaries. Its spectacular white concrete wave-shaped roof has become the symbol of the city. Home to the Tenerife Symphony Orchestra, hosting concerts, opera, ballet and top cultural events. Guided tours available.',
        de: 'Architektonisches Meisterwerk von Santiago Calatrava, Wahrzeichen von Santa Cruz und der gesamten Kanaren. Sein spektakuläres wellenförmiges Dach aus weißem Beton ist zum Symbol der Stadt geworden. Sitz des Sinfonieorchesters von Teneriffa, mit Konzerten, Oper, Ballett und erstklassigen Kulturveranstaltungen. Führungen verfügbar.',
      },
      short_description: { es: 'Icónico auditorio de Calatrava junto al mar', en: 'Iconic Calatrava auditorium by the sea', de: 'Ikonisches Calatrava-Auditorium am Meer' },
      image: 'https://images.unsplash.com/photo-1590254553867-43e0cbc3f8f8?w=800&q=80',
      location: { es: 'Santa Cruz de Tenerife', en: 'Santa Cruz de Tenerife' },
      area_id: santaCruz,
      coordinates: { lat: 28.4576, lng: -16.2520 },
      rating: 4.7,
      review_count: 1850,
      price_from: 0,
      currency: 'EUR',
      bookable: false,
      featured: true,
      sort_order: 1,
      visible: true,
    },
    {
      subcategory_id: architectureId,
      slug: 'casa-de-los-balcones',
      name: { es: 'Casa de los Balcones', en: 'House of the Balconies', de: 'Haus der Balkone' },
      description: {
        es: 'Mansión canaria del siglo XVII en La Orotava, ejemplo perfecto de la arquitectura tradicional canaria con sus balcones de madera tallada de tea (pino canario). Interior con patio canario, bodega, telares artesanales en funcionamiento y tienda de artesanía local. La fachada con balcones corridos es una de las imágenes más fotografiadas de Tenerife.',
        en: '17th-century Canarian mansion in La Orotava, a perfect example of traditional Canarian architecture with its carved Canarian pine (tea) wooden balconies. Interior features a Canarian courtyard, wine cellar, working artisan looms and local craft shop. The facade with running balconies is one of Tenerife\'s most photographed sights.',
        de: 'Kanarisches Herrenhaus aus dem 17. Jahrhundert in La Orotava, ein perfektes Beispiel traditioneller kanarischer Architektur mit seinen geschnitzten Holzbalkonen aus kanarischer Kiefer (Tea). Innenraum mit kanarischem Innenhof, Weinkeller, funktionierenden Handwebstühlen und lokalem Kunsthandwerksladen. Die Fassade mit durchgehenden Balkonen ist eines der meistfotografierten Motive Teneriffas.',
      },
      short_description: { es: 'Mansión del siglo XVII con balcones de madera canaria', en: '17th-century mansion with traditional wooden balconies', de: 'Herrenhaus aus dem 17. Jh. mit traditionellen Holzbalkonen' },
      image: 'https://images.unsplash.com/photo-1582063289852-62e3ba2747f8?w=800&q=80',
      location: { es: 'La Orotava', en: 'La Orotava' },
      area_id: puertoCruz,
      coordinates: { lat: 28.3910, lng: -16.5230 },
      rating: 4.4,
      review_count: 1120,
      price_from: 5,
      currency: 'EUR',
      duration: '1 hour',
      bookable: false,
      featured: true,
      sort_order: 2,
      visible: true,
    },
  ])
  console.log('Architecture items added (2 items)')

  // --- Summary ---
  console.log('\n=== Subcategory filling complete! ===')
  console.log('Added items to the following subcategories:')
  console.log('  - experiences/top-experiences: 3 items (was 0)')
  console.log('  - experiences/whale-watching: 3 items (was 0)')
  console.log('  - experiences/day-trips: 3 items (was 0)')
  console.log('  - experiences/luxury-experiences: 3 items (was 0)')
  console.log('  - beaches/best-beaches: 3 items (was 0)')
  console.log('  - nature/hiking-trails: 3 items (was 0)')
  console.log('  - family/water-parks: 1 item (was 0)')
  console.log('  - family/zoos-aquariums: 2 items (was 0)')
  console.log('  - wellness/couples: 3 items (was 0)')
  console.log('  - nightlife/cocktail-bars: 3 items (was 0)')
  console.log('  - shopping/shopping-areas: 2 items (was 0)')
  console.log('  - culture/museums: 2 items (was 1)')
  console.log('  - culture/guanche-heritage: 2 items (was 1)')
  console.log('  - culture/architecture: 2 items (was 1)')
  console.log('\nTotal: 35 new items added')
}

main().catch((err) => {
  console.error('FATAL:', err)
  process.exit(1)
})
