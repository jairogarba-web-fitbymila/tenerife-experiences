/**
 * Migration script to populate Supabase with complete content
 * Run with: npx tsx scripts/migrate-content.ts
 */

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://sqesgghvaazyajzjkoap.supabase.co',
  // Using service role key for admin access
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxZXNnZ2h2YWF6eWFqemprb2FwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzUxMzgwOSwiZXhwIjoyMDg5MDg5ODA5fQ.UvbRfWU9seJPT9lyCyLmpD4uZrP9jXzsNoeSAjT9HnI'
)

async function getCategoryId(slug: string): Promise<string> {
  const { data } = await supabase.from('categories').select('id').eq('slug', slug).single()
  return data!.id
}

async function getSubcategoryId(categorySlug: string, subSlug: string): Promise<string> {
  const catId = await getCategoryId(categorySlug)
  const { data } = await supabase.from('subcategories').select('id').eq('category_id', catId).eq('slug', subSlug).single()
  return data!.id
}

async function getAreaId(slug: string): Promise<string> {
  const { data } = await supabase.from('areas').select('id').eq('slug', slug).single()
  return data!.id
}

async function addMissingSubcategories() {
  console.log('Adding missing subcategories...')

  // Experiences - missing ones
  const expId = await getCategoryId('experiences')
  await supabase.from('subcategories').upsert([
    { category_id: expId, slug: 'day-trips', name: { es: 'Excursiones de un Día', en: 'Day Trips', de: 'Tagesausflüge' }, description: { es: 'Excursiones de un día para explorar toda la isla', en: 'Full day excursions to explore the whole island', de: 'Ganztagesausflüge zur Erkundung der gesamten Insel' }, sort_order: 5 },
    { category_id: expId, slug: 'luxury-experiences', name: { es: 'Experiencias de Lujo', en: 'Luxury Experiences', de: 'Luxuserlebnisse' }, description: { es: 'Experiencias exclusivas y premium en Tenerife', en: 'Exclusive and premium experiences in Tenerife', de: 'Exklusive und Premium-Erlebnisse auf Teneriffa' }, sort_order: 6 },
  ], { onConflict: 'category_id,slug' })

  // Nightlife
  const nightId = await getCategoryId('nightlife')
  await supabase.from('subcategories').upsert([
    { category_id: nightId, slug: 'best-areas', name: { es: 'Mejores Zonas de Fiesta', en: 'Best Nightlife Areas', de: 'Beste Ausgehviertel' }, description: { es: 'Las zonas con más ambiente nocturno', en: 'The areas with the best nightlife scene', de: 'Die Gebiete mit dem besten Nachtleben' }, sort_order: 1 },
    { category_id: nightId, slug: 'bars-pubs', name: { es: 'Bares y Pubs', en: 'Bars & Pubs', de: 'Bars & Pubs' }, description: { es: 'Los mejores bares y pubs de la isla', en: 'The best bars and pubs on the island', de: 'Die besten Bars und Pubs der Insel' }, sort_order: 2 },
    { category_id: nightId, slug: 'clubs', name: { es: 'Discotecas y Clubs', en: 'Clubs & Discos', de: 'Clubs & Discos' }, description: { es: 'Discotecas y clubs para bailar toda la noche', en: 'Clubs and discos to dance all night long', de: 'Clubs und Diskotheken zum Tanzen die ganze Nacht' }, sort_order: 3 },
    { category_id: nightId, slug: 'live-music', name: { es: 'Música en Vivo', en: 'Live Music', de: 'Livemusik' }, description: { es: 'Locales con música en directo', en: 'Venues with live music performances', de: 'Veranstaltungsorte mit Livemusik' }, sort_order: 4 },
    { category_id: nightId, slug: 'cocktail-bars', name: { es: 'Bares de Cócteles', en: 'Cocktail Bars', de: 'Cocktailbars' }, description: { es: 'Los mejores cócteles de Tenerife', en: 'The best cocktails in Tenerife', de: 'Die besten Cocktails auf Teneriffa' }, sort_order: 5 },
  ], { onConflict: 'category_id,slug' })

  // Shopping
  const shopId = await getCategoryId('shopping')
  await supabase.from('subcategories').upsert([
    { category_id: shopId, slug: 'shopping-areas', name: { es: 'Zonas de Compras', en: 'Shopping Areas', de: 'Einkaufsviertel' }, description: { es: 'Las mejores zonas para ir de compras', en: 'The best areas for shopping', de: 'Die besten Einkaufsviertel' }, sort_order: 1 },
    { category_id: shopId, slug: 'markets', name: { es: 'Mercadillos', en: 'Markets', de: 'Märkte' }, description: { es: 'Mercadillos locales con productos frescos y artesanía', en: 'Local markets with fresh produce and crafts', de: 'Lokale Märkte mit frischen Produkten und Handwerk' }, sort_order: 2 },
    { category_id: shopId, slug: 'local-products', name: { es: 'Productos Locales', en: 'Local Products', de: 'Lokale Produkte' }, description: { es: 'Quesos, mojos, vinos y artesanía canaria', en: 'Cheeses, mojos, wines and Canarian crafts', de: 'Käse, Mojos, Weine und kanarisches Handwerk' }, sort_order: 3 },
    { category_id: shopId, slug: 'shopping-malls', name: { es: 'Centros Comerciales', en: 'Shopping Malls', de: 'Einkaufszentren' }, description: { es: 'Los principales centros comerciales de la isla', en: 'The main shopping centers on the island', de: 'Die wichtigsten Einkaufszentren der Insel' }, sort_order: 4 },
  ], { onConflict: 'category_id,slug' })

  // Family
  const famId = await getCategoryId('family')
  await supabase.from('subcategories').upsert([
    { category_id: famId, slug: 'theme-parks', name: { es: 'Parques Temáticos', en: 'Theme Parks', de: 'Themenparks' }, description: { es: 'Los mejores parques de atracciones de la isla', en: 'The best theme parks on the island', de: 'Die besten Themenparks der Insel' }, sort_order: 1 },
    { category_id: famId, slug: 'water-parks', name: { es: 'Parques Acuáticos', en: 'Water Parks', de: 'Wasserparks' }, description: { es: 'Diversión acuática para toda la familia', en: 'Water fun for the whole family', de: 'Wasserspaß für die ganze Familie' }, sort_order: 2 },
    { category_id: famId, slug: 'zoos-aquariums', name: { es: 'Zoológicos y Acuarios', en: 'Zoos & Aquariums', de: 'Zoos & Aquarien' }, description: { es: 'Animales exóticos y vida marina', en: 'Exotic animals and marine life', de: 'Exotische Tiere und Meeresleben' }, sort_order: 3 },
  ], { onConflict: 'category_id,slug' })

  // Wellness
  const wellId = await getCategoryId('wellness')
  await supabase.from('subcategories').upsert([
    { category_id: wellId, slug: 'spas', name: { es: 'Spas y Bienestar', en: 'Spas & Wellness', de: 'Spas & Wellness' }, description: { es: 'Los mejores spas y centros de bienestar', en: 'The best spas and wellness centers', de: 'Die besten Spas und Wellnesszentren' }, sort_order: 1 },
    { category_id: wellId, slug: 'yoga-retreats', name: { es: 'Yoga y Retiros', en: 'Yoga Retreats', de: 'Yoga-Retreats' }, description: { es: 'Retiros de yoga y meditación en la isla', en: 'Yoga and meditation retreats on the island', de: 'Yoga- und Meditationsretreats auf der Insel' }, sort_order: 2 },
    { category_id: wellId, slug: 'couples', name: { es: 'Experiencias para Parejas', en: 'Couples Experiences', de: 'Erlebnisse für Paare' }, description: { es: 'Experiencias románticas y de relax para parejas', en: 'Romantic and relaxing experiences for couples', de: 'Romantische und entspannende Erlebnisse für Paare' }, sort_order: 3 },
  ], { onConflict: 'category_id,slug' })

  console.log('✓ Subcategories complete')
}

async function addItems() {
  console.log('Adding items...')

  // Get area IDs
  const costaAdejeId = await getAreaId('costa-adeje')
  const losCristianosId = await getAreaId('los-cristianos')
  const losGigantesId = await getAreaId('los-gigantes')
  const teideId = await getAreaId('teide')
  const puertoCruzId = await getAreaId('puerto-de-la-cruz')
  const anagaId = await getAreaId('anaga')

  // === EXPERIENCES ===
  const whaleId = await getSubcategoryId('experiences', 'whale-watching')
  await supabase.from('items').upsert([
    { subcategory_id: whaleId, slug: 'whale-dolphin-catamaran', name: { es: 'Catamarán Avistamiento de Ballenas y Delfines', en: 'Whale & Dolphin Watching Catamaran', de: 'Wal- & Delfinbeobachtung Katamaran' }, description: { es: 'Navega en un lujoso catamarán por la costa sur de Tenerife y observa ballenas piloto y delfines en su hábitat natural. Incluye comida, bebidas y tiempo para nadar.', en: 'Sail on a luxury catamaran along the southern coast of Tenerife and observe pilot whales and dolphins in their natural habitat. Includes food, drinks and swimming time.', de: 'Segeln Sie auf einem luxuriösen Katamaran entlang der Südküste Teneriffas und beobachten Sie Pilotwale und Delfine in ihrem natürlichen Lebensraum. Inklusive Essen, Getränke und Schwimmzeit.' }, short_description: { es: 'Excursión en catamarán con avistamiento de cetáceos', en: 'Catamaran trip with cetacean watching', de: 'Katamaranfahrt mit Walbeobachtung' }, area_id: costaAdejeId, location: { es: 'Puerto Colón, Costa Adeje', en: 'Puerto Colón, Costa Adeje' }, price_from: 55, duration: '3 hours', rating: 4.8, review_count: 342, bookable: true, featured: true, image: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=800&q=80' },
    { subcategory_id: whaleId, slug: 'private-yacht-whale-watching', name: { es: 'Yate Privado Avistamiento de Ballenas', en: 'Private Yacht Whale Watching', de: 'Private Yacht Walbeobachtung' }, description: { es: 'Experiencia exclusiva en yate privado con capitán y tripulación. Avistamiento garantizado de cetáceos, snorkel en aguas cristalinas y champán a bordo.', en: 'Exclusive private yacht experience with captain and crew. Guaranteed cetacean sighting, snorkeling in crystal clear waters and champagne on board.', de: 'Exklusives Privat-Yacht-Erlebnis mit Kapitän und Crew. Garantierte Walsichtung, Schnorcheln in kristallklarem Wasser und Champagner an Bord.' }, short_description: { es: 'Experiencia premium en yate privado', en: 'Premium private yacht experience', de: 'Premium Privat-Yacht-Erlebnis' }, area_id: costaAdejeId, location: { es: 'Puerto Colón, Costa Adeje', en: 'Puerto Colón, Costa Adeje' }, price_from: 350, duration: '4 hours', rating: 4.9, review_count: 89, bookable: true, featured: true, image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80' },
    { subcategory_id: whaleId, slug: 'eco-whale-watching', name: { es: 'Eco Tour Avistamiento Responsable', en: 'Eco Responsible Whale Watching', de: 'Öko-Verantwortungsvolle Walbeobachtung' }, description: { es: 'Tour ecológico con biólogos marinos que respeta las distancias con los cetáceos. Aprende sobre las especies residentes mientras navegas de forma sostenible.', en: 'Ecological tour with marine biologists that respects distances with cetaceans. Learn about resident species while sailing sustainably.', de: 'Ökologische Tour mit Meeresbiologen unter Einhaltung des Abstands zu den Walen. Lernen Sie über die heimischen Arten beim nachhaltigen Segeln.' }, short_description: { es: 'Tour ecológico con biólogos marinos', en: 'Eco tour with marine biologists', de: 'Ökotour mit Meeresbiologen' }, area_id: losGigantesId, location: { es: 'Los Gigantes', en: 'Los Gigantes' }, price_from: 45, duration: '2.5 hours', rating: 4.7, review_count: 156, bookable: true, image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&q=80' },
  ], { onConflict: 'subcategory_id,slug' })

  // Teide Tours
  const teideToursId = await getSubcategoryId('experiences', 'teide-tours')
  await supabase.from('items').upsert([
    { subcategory_id: teideToursId, slug: 'teide-stargazing', name: { es: 'Observación de Estrellas en el Teide', en: 'Teide Stargazing Experience', de: 'Sternenbeobachtung am Teide' }, description: { es: 'Observa las estrellas con telescopios profesionales a 2.100m de altitud en el Parque Nacional del Teide, certificado como Destino Starlight. Guías astrónomos te explicarán constelaciones, planetas y galaxias.', en: 'Observe the stars with professional telescopes at 2,100m altitude in Teide National Park, certified as a Starlight Destination. Astronomer guides will explain constellations, planets and galaxies.', de: 'Beobachten Sie die Sterne mit professionellen Teleskopen auf 2.100m Höhe im Teide-Nationalpark, zertifiziert als Starlight-Destination.' }, short_description: { es: 'Astronomía con telescopios profesionales', en: 'Astronomy with professional telescopes', de: 'Astronomie mit professionellen Teleskopen' }, area_id: teideId, location: { es: 'Parque Nacional del Teide', en: 'Teide National Park' }, price_from: 35, duration: '3 hours', rating: 4.9, review_count: 521, bookable: true, featured: true, image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80' },
    { subcategory_id: teideToursId, slug: 'teide-sunrise-cable-car', name: { es: 'Amanecer en el Teide con Teleférico', en: 'Teide Sunrise with Cable Car', de: 'Teide Sonnenaufgang mit Seilbahn' }, description: { es: 'Sube al pico del Teide antes del amanecer y contempla un espectáculo único: el mar de nubes teñido de rosa y naranja. Incluye transporte, teleférico y guía.', en: 'Ascend to the peak of Teide before dawn and witness a unique spectacle: the sea of clouds painted in pink and orange. Includes transport, cable car and guide.', de: 'Steigen Sie vor Sonnenaufgang auf den Gipfel des Teide und erleben Sie ein einzigartiges Schauspiel: das Wolkenmeer in Rosa und Orange.' }, short_description: { es: 'Amanecer desde la cima de España', en: 'Sunrise from the top of Spain', de: 'Sonnenaufgang vom höchsten Punkt Spaniens' }, area_id: teideId, location: { es: 'Parque Nacional del Teide', en: 'Teide National Park' }, price_from: 65, duration: '6 hours', rating: 4.8, review_count: 287, bookable: true, featured: true, image: 'https://images.unsplash.com/photo-1547234935-80c7145ec969?w=800&q=80' },
  ], { onConflict: 'subcategory_id,slug' })

  // === BEACHES ===
  const bestBeachesId = await getSubcategoryId('beaches', 'best-beaches')
  await supabase.from('items').upsert([
    { subcategory_id: bestBeachesId, slug: 'playa-del-duque', name: { es: 'Playa del Duque', en: 'Playa del Duque', de: 'Playa del Duque' }, description: { es: 'Considerada la playa más elegante de Tenerife, con arena dorada importada del Sáhara, aguas cristalinas y rodeada de resorts 5 estrellas. Perfecta para familias y amantes del lujo.', en: 'Considered the most elegant beach in Tenerife, with golden sand imported from the Sahara, crystal clear waters and surrounded by 5-star resorts. Perfect for families and luxury lovers.', de: 'Gilt als elegantester Strand Teneriffas, mit goldenem Sand aus der Sahara, kristallklarem Wasser und umgeben von 5-Sterne-Resorts.' }, area_id: costaAdejeId, location: { es: 'Costa Adeje', en: 'Costa Adeje' }, sand_type: { es: 'Arena dorada', en: 'Golden sand', de: 'Goldener Sand' }, bathing_conditions: { es: 'Aguas tranquilas, protegida por espigones', en: 'Calm waters, protected by breakwaters', de: 'Ruhiges Wasser, durch Wellenbrecher geschützt' }, accessibility: { es: 'Excelente. Acceso para sillas de ruedas, duchas, aseos', en: 'Excellent. Wheelchair access, showers, toilets', de: 'Ausgezeichnet. Rollstuhlzugang, Duschen, Toiletten' }, typical_risk: { es: 'Bajo', en: 'Low', de: 'Niedrig' }, rating: 4.7, review_count: 892, featured: true, image: 'https://images.unsplash.com/photo-1559511260-66a654ae982a?w=800&q=80' },
    { subcategory_id: bestBeachesId, slug: 'playa-de-las-teresitas', name: { es: 'Playa de las Teresitas', en: 'Playa de las Teresitas', de: 'Playa de las Teresitas' }, description: { es: 'La playa más famosa de Tenerife con su arena dorada traída del Sáhara en los años 70. Un kilómetro de playa protegida con aguas tranquilas, palmeras y vistas al Macizo de Anaga.', en: 'The most famous beach in Tenerife with golden sand brought from the Sahara in the 70s. One kilometer of protected beach with calm waters, palm trees and views of the Anaga massif.', de: 'Der berühmteste Strand Teneriffas mit goldenem Sand aus der Sahara aus den 70er Jahren. Ein Kilometer geschützter Strand mit ruhigem Wasser, Palmen und Blick auf das Anaga-Massiv.' }, area_id: anagaId, location: { es: 'San Andrés, Santa Cruz', en: 'San Andrés, Santa Cruz' }, sand_type: { es: 'Arena dorada (importada del Sáhara)', en: 'Golden sand (imported from Sahara)', de: 'Goldener Sand (aus der Sahara importiert)' }, bathing_conditions: { es: 'Aguas muy tranquilas, rompeolas artificial', en: 'Very calm waters, artificial breakwater', de: 'Sehr ruhiges Wasser, künstlicher Wellenbrecher' }, accessibility: { es: 'Buena. Aparcamiento amplio, duchas, chiringuitos', en: 'Good. Large parking, showers, beach bars', de: 'Gut. Großer Parkplatz, Duschen, Strandbars' }, typical_risk: { es: 'Muy bajo', en: 'Very low', de: 'Sehr niedrig' }, rating: 4.6, review_count: 1203, featured: true, image: 'https://images.unsplash.com/photo-1580137189272-c9379f8864fd?w=800&q=80' },
    { subcategory_id: bestBeachesId, slug: 'playa-de-benijo', name: { es: 'Playa de Benijo', en: 'Playa de Benijo', de: 'Playa de Benijo' }, description: { es: 'Playa salvaje de arena negra volcánica en el Parque Rural de Anaga. Famosa por sus espectaculares puestas de sol y los Roques de Anaga emergiendo del océano. No apta para baño pero increíble para fotos.', en: 'Wild black volcanic sand beach in Anaga Rural Park. Famous for its spectacular sunsets and the Roques de Anaga emerging from the ocean. Not suitable for swimming but incredible for photos.', de: 'Wilder Strand mit schwarzem Vulkansand im Anaga-Naturpark. Berühmt für spektakuläre Sonnenuntergänge und die aus dem Ozean ragenden Roques de Anaga.' }, area_id: anagaId, location: { es: 'Taganana, Anaga', en: 'Taganana, Anaga' }, sand_type: { es: 'Arena negra volcánica', en: 'Black volcanic sand', de: 'Schwarzer Vulkansand' }, bathing_conditions: { es: 'Peligroso. Oleaje fuerte y corrientes', en: 'Dangerous. Strong waves and currents', de: 'Gefährlich. Starke Wellen und Strömungen' }, accessibility: { es: 'Difícil. Sendero empinado de acceso', en: 'Difficult. Steep access path', de: 'Schwierig. Steiler Zugangsweg' }, typical_risk: { es: 'Alto. No recomendado para baño', en: 'High. Not recommended for swimming', de: 'Hoch. Nicht zum Schwimmen empfohlen' }, rating: 4.8, review_count: 567, featured: true, image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80' },
    { subcategory_id: bestBeachesId, slug: 'playa-la-tejita', name: { es: 'Playa de La Tejita', en: 'Playa de La Tejita', de: 'Playa de La Tejita' }, description: { es: 'La playa natural más larga de Tenerife con arena dorada oscura y la icónica Montaña Roja al fondo. Popular entre surfistas y naturistas. Ambiente relajado y sin masificación.', en: 'The longest natural beach in Tenerife with dark golden sand and the iconic Red Mountain in the background. Popular with surfers and naturists. Relaxed atmosphere without overcrowding.', de: 'Der längste Naturstrand Teneriffas mit dunkelgoldenem Sand und dem ikonischen Roten Berg im Hintergrund. Beliebt bei Surfern und Naturisten.' }, location: { es: 'El Médano, Granadilla', en: 'El Médano, Granadilla' }, sand_type: { es: 'Arena dorada oscura', en: 'Dark golden sand', de: 'Dunkelgoldener Sand' }, bathing_conditions: { es: 'Variable. Viento frecuente, ideal para windsurf', en: 'Variable. Frequent wind, ideal for windsurfing', de: 'Variabel. Häufiger Wind, ideal zum Windsurfen' }, accessibility: { es: 'Buena. Aparcamiento cercano', en: 'Good. Nearby parking', de: 'Gut. Parkplatz in der Nähe' }, typical_risk: { es: 'Medio. Corrientes y viento', en: 'Medium. Currents and wind', de: 'Mittel. Strömungen und Wind' }, rating: 4.5, review_count: 445, image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80' },
  ], { onConflict: 'subcategory_id,slug' })

  // === FAMILY ===
  const themeParksId = await getSubcategoryId('family', 'theme-parks')
  await supabase.from('items').upsert([
    { subcategory_id: themeParksId, slug: 'siam-park', name: { es: 'Siam Park', en: 'Siam Park', de: 'Siam Park' }, description: { es: 'Considerado el mejor parque acuático del mundo por TripAdvisor durante años consecutivos. Toboganes de vértigo, una playa con olas artificiales, río lento y la Tower of Power de 28 metros. Temática tailandesa espectacular.', en: 'Considered the best water park in the world by TripAdvisor for consecutive years. Thrilling slides, a beach with artificial waves, lazy river and the 28-meter Tower of Power. Spectacular Thai theming.', de: 'Laut TripAdvisor mehrere Jahre in Folge der beste Wasserpark der Welt. Aufregende Rutschen, ein Strand mit künstlichen Wellen, ein Lazy River und der 28 Meter hohe Tower of Power.' }, area_id: costaAdejeId, location: { es: 'Costa Adeje', en: 'Costa Adeje' }, price_from: 40, duration: 'Full day', rating: 4.8, review_count: 2340, bookable: true, featured: true, image: 'https://images.unsplash.com/photo-1565275945520-e79e0fd6bf46?w=800&q=80' },
    { subcategory_id: themeParksId, slug: 'loro-parque', name: { es: 'Loro Parque', en: 'Loro Parque', de: 'Loro Parque' }, description: { es: 'Uno de los mejores zoológicos del mundo con la mayor colección de loros, shows de orcas y delfines, pingüinos, gorilas y un acuario impresionante. Referencia mundial en conservación animal.', en: 'One of the best zoos in the world with the largest parrot collection, orca and dolphin shows, penguins, gorillas and an impressive aquarium. World reference in animal conservation.', de: 'Einer der besten Zoos der Welt mit der größten Papageiensammlung, Orca- und Delfinshows, Pinguinen, Gorillas und einem beeindruckenden Aquarium.' }, area_id: puertoCruzId, location: { es: 'Puerto de la Cruz', en: 'Puerto de la Cruz' }, price_from: 38, duration: 'Full day', rating: 4.6, review_count: 1890, bookable: true, featured: true, image: 'https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=800&q=80' },
  ], { onConflict: 'subcategory_id,slug' })

  // === FOOD - Best Restaurants ===
  const bestRestId = await getSubcategoryId('food', 'best-restaurants')
  await supabase.from('items').upsert([
    { subcategory_id: bestRestId, slug: 'el-rincon-de-juan-carlos', name: { es: 'El Rincón de Juan Carlos', en: 'El Rincón de Juan Carlos', de: 'El Rincón de Juan Carlos' }, description: { es: 'Restaurante con 2 estrellas Michelin de los hermanos Padrón. Cocina creativa canaria de altísimo nivel con productos locales de temporada. Una experiencia gastronómica inolvidable en el sur de Tenerife.', en: '2 Michelin star restaurant by the Padrón brothers. Creative Canarian cuisine at the highest level with seasonal local produce. An unforgettable gastronomic experience in southern Tenerife.', de: '2-Sterne-Michelin-Restaurant der Brüder Padrón. Kreative kanarische Küche auf höchstem Niveau mit saisonalen lokalen Produkten.' }, area_id: costaAdejeId, location: { es: 'Los Gigantes', en: 'Los Gigantes' }, price_from: 120, rating: 4.9, review_count: 234, featured: true, image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80' },
    { subcategory_id: bestRestId, slug: 'nub', name: { es: 'NUB', en: 'NUB', de: 'NUB' }, description: { es: 'Restaurante con estrella Michelin en el Hotel Bahía del Duque. Cocina de autor que fusiona sabores canarios con técnicas internacionales. Terraza con vistas espectaculares.', en: 'Michelin star restaurant at Hotel Bahía del Duque. Signature cuisine fusing Canarian flavors with international techniques. Terrace with spectacular views.', de: 'Michelin-Stern-Restaurant im Hotel Bahía del Duque. Signature-Küche, die kanarische Aromen mit internationalen Techniken verbindet.' }, area_id: costaAdejeId, location: { es: 'Costa Adeje', en: 'Costa Adeje' }, price_from: 95, rating: 4.8, review_count: 178, featured: true, image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?w=800&q=80' },
  ], { onConflict: 'subcategory_id,slug' })

  // === NATURE - Hiking ===
  const hikingId = await getSubcategoryId('nature', 'hiking-trails')
  await supabase.from('items').upsert([
    { subcategory_id: hikingId, slug: 'masca-valley', name: { es: 'Barranco de Masca', en: 'Masca Valley Hike', de: 'Masca-Schlucht Wanderung' }, description: { es: 'La ruta de senderismo más famosa de Tenerife. Descenso por el espectacular barranco de Masca hasta la playa, entre paredes volcánicas de hasta 600 metros. Se necesita reserva previa obligatoria.', en: 'The most famous hiking trail in Tenerife. Descent through the spectacular Masca gorge to the beach, between volcanic walls up to 600 meters. Mandatory advance reservation required.', de: 'Der berühmteste Wanderweg Teneriffas. Abstieg durch die spektakuläre Masca-Schlucht zum Strand, zwischen bis zu 600 Meter hohen Vulkanwänden.' }, area_id: losGigantesId, location: { es: 'Masca, Santiago del Teide', en: 'Masca, Santiago del Teide' }, duration: '5-6 hours', rating: 4.9, review_count: 890, bookable: true, price_from: 0, featured: true, image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80' },
    { subcategory_id: hikingId, slug: 'anaga-laurel-forest', name: { es: 'Bosque de Laurisilva de Anaga', en: 'Anaga Laurel Forest Trail', de: 'Anaga Lorbeerwald Wanderung' }, description: { es: 'Camina entre árboles milenarios en la Reserva de la Biosfera de Anaga. Senderos envueltos en niebla que atraviesan el bosque de laurisilva, una reliquia del Terciario que solo sobrevive en las islas atlánticas.', en: 'Walk among ancient trees in the Anaga Biosphere Reserve. Misty trails through the laurel forest, a Tertiary-era relic that only survives on Atlantic islands.', de: 'Wandern Sie zwischen uralten Bäumen im Biosphärenreservat Anaga. Neblige Pfade durch den Lorbeerwald, ein Relikt aus dem Tertiär.' }, area_id: anagaId, location: { es: 'Parque Rural de Anaga', en: 'Anaga Rural Park' }, duration: '3-4 hours', rating: 4.8, review_count: 456, price_from: 0, featured: true, image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80' },
  ], { onConflict: 'subcategory_id,slug' })

  console.log('✓ Items added')
}

async function main() {
  console.log('🚀 Starting content migration...\n')
  await addMissingSubcategories()
  await addItems()
  console.log('\n✅ Migration complete!')
}

main().catch(console.error)
