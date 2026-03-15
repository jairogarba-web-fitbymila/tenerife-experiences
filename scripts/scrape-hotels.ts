import { createClient } from '@supabase/supabase-js'

const sb = createClient(
  'https://sqesgghvaazyajzjkoap.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxZXNnZ2h2YWF6eWFqemprb2FwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzUxMzgwOSwiZXhwIjoyMDg5MDg5ODA5fQ.UvbRfWU9seJPT9lyCyLmpD4uZrP9jXzsNoeSAjT9HnI'
)

const hotels = [
  // ==========================================
  // HOTELES RURALES (8)
  // ==========================================
  {
    business_name: 'Hotel Rural El Patio',
    category: 'hotel',
    subcategory: 'hotel-rural',
    zone: 'norte',
    website: 'https://hotelelpatio.com',
    source: 'web-search',
    status: 'new',
    priority: 'high',
    notes: 'Hotel rural cerca de Garachico, próximo a Cueva del Viento y Drago de Icod. Ideal turismo naturaleza.',
  },
  {
    business_name: 'Hotel Rural La Casa Amarilla',
    category: 'hotel',
    subcategory: 'hotel-rural',
    zone: 'norte',
    website: 'https://lacasamarilla.es',
    source: 'web-search',
    status: 'new',
    priority: 'medium',
    notes: 'Hotel con encanto en Los Silos, norte de Tenerife.',
  },
  {
    business_name: 'Hotel Rural Casablanca',
    category: 'hotel',
    subcategory: 'hotel-rural',
    zone: 'norte',
    website: 'https://hotelruralcasablanca.com',
    source: 'web-search',
    status: 'new',
    priority: 'medium',
    notes: 'En Los Realejos, casitas del siglo XVIII con vistas al Teide y al Atlántico.',
  },
  {
    business_name: 'Hotel Rural Orotava',
    category: 'hotel',
    subcategory: 'hotel-rural',
    zone: 'norte',
    website: 'https://hotelruralorotava.com',
    source: 'web-search',
    status: 'new',
    priority: 'medium',
    notes: 'Restaurante de cocina canaria tradicional y bodega propia. Valle de La Orotava.',
  },
  {
    business_name: 'Hotel Rural Ohana',
    category: 'hotel',
    subcategory: 'hotel-rural',
    zone: 'norte',
    website: 'https://www.hotelruralohana.es',
    source: 'web-search',
    status: 'new',
    priority: 'medium',
    notes: 'En La Esperanza, a 905m de altitud, rodeado de vegetación. Turismo rural y senderismo.',
  },
  {
    business_name: 'Hotel Spa Villalba',
    category: 'hotel',
    subcategory: 'hotel-spa',
    zone: 'sur',
    website: 'https://www.hotelvillalba.com',
    source: 'web-search',
    status: 'new',
    priority: 'high',
    notes: 'A 1500m de altitud en Vilaflor. Spa con baño turco, sauna, jacuzzi. Vistas al pinar.',
  },
  {
    business_name: 'El Sitio de la Casa',
    category: 'hotel',
    subcategory: 'casa-rural',
    zone: 'norte',
    website: 'https://elsitiodelacasa.com',
    source: 'web-search',
    status: 'new',
    priority: 'low',
    notes: 'Casa rural con encanto. Alojamiento alternativo en entorno natural.',
  },
  {
    business_name: 'Jardín de la Paz',
    category: 'hotel',
    subcategory: 'hotel-boutique',
    zone: 'norte',
    website: 'https://jardin-de-la-paz.com',
    source: 'web-search',
    status: 'new',
    priority: 'medium',
    notes: 'Hotel boutique con vistas al Atlántico, villas y apartamentos con diseño único.',
  },

  // ==========================================
  // HOTELES BOUTIQUE (7)
  // ==========================================
  {
    business_name: 'Hotel Boutique San Roque',
    category: 'hotel',
    subcategory: 'hotel-boutique',
    zone: 'norte',
    website: 'https://hotelsanroque.com',
    source: 'web-search',
    status: 'new',
    priority: 'high',
    notes: 'Hotel de diseño elegante en el pueblo histórico de Garachico, junto al mar.',
  },
  {
    business_name: 'Flamingo Suites Boutique Hotel',
    category: 'hotel',
    subcategory: 'hotel-boutique',
    zone: 'sur',
    website: 'https://flamingosuites.com',
    source: 'web-search',
    status: 'new',
    priority: 'medium',
    notes: 'Hotel boutique en zona turística del sur. Suites con diseño moderno.',
  },
  {
    business_name: 'Sir Anthony Hotel',
    category: 'hotel',
    subcategory: 'hotel-boutique',
    zone: 'sur',
    website: 'https://siranthonyhotel.com',
    source: 'web-search',
    status: 'new',
    priority: 'high',
    notes: 'Hotel boutique de lujo en Costa Adeje. Referencia en diseño y exclusividad.',
  },
  {
    business_name: 'Royal Garden Villas',
    category: 'hotel',
    subcategory: 'hotel-luxury',
    zone: 'sur',
    website: 'https://royalgardenvillas.com',
    source: 'web-search',
    status: 'new',
    priority: 'high',
    notes: 'Villas de lujo en Costa Adeje. Experiencia exclusiva y privada.',
  },
  {
    business_name: 'Hotel Baobab Suites',
    category: 'hotel',
    subcategory: 'hotel-boutique',
    zone: 'sur',
    website: 'https://baobabsuites.com',
    source: 'web-search',
    status: 'new',
    priority: 'high',
    notes: 'A 10 min de Playa del Duque. 2 piscinas climatizadas, terraza. Diseño contemporáneo.',
  },
  {
    business_name: 'DWO Nopal',
    category: 'hotel',
    subcategory: 'hotel-boutique',
    zone: 'norte',
    website: 'https://www.dwohotels.com/en/our-hotels/dwo-nopal',
    source: 'web-search',
    status: 'new',
    priority: 'medium',
    notes: 'A 250m de la playa en Puerto de la Cruz. Junto a Plaza del Charco.',
  },
  {
    business_name: 'Vincci Selección La Plantación del Sur',
    category: 'hotel',
    subcategory: 'hotel-boutique',
    zone: 'sur',
    website: 'https://vinccihoteles.com',
    source: 'web-search',
    status: 'new',
    priority: 'high',
    notes: 'Hotel boutique premium en Costa Adeje. Spa y gastronomía de alto nivel.',
  },

  // ==========================================
  // HOTELES 5 ESTRELLAS / LUXURY (8)
  // ==========================================
  {
    business_name: 'Hotel Bahía del Duque',
    category: 'hotel',
    subcategory: 'hotel-luxury',
    zone: 'sur',
    website: 'https://bahia-del-duque.com',
    source: 'web-search',
    status: 'new',
    priority: 'urgent',
    notes: '5 estrellas GL en Costa Adeje. 6 hectáreas de jardines subtropicales. Referente del lujo en Tenerife.',
  },
  {
    business_name: 'Iberostar Selection Sábila',
    category: 'hotel',
    subcategory: 'hotel-luxury',
    zone: 'sur',
    website: 'https://www.iberostar.com',
    source: 'web-search',
    status: 'new',
    priority: 'high',
    notes: '5 estrellas all-inclusive solo adultos en Costa Adeje, junto a playa Fañabé.',
  },
  {
    business_name: 'Adrián Hoteles Roca Nivaria',
    category: 'hotel',
    subcategory: 'hotel-luxury',
    zone: 'sur',
    website: 'https://adrianhoteles.com',
    source: 'web-search',
    status: 'new',
    priority: 'high',
    notes: '5 estrellas en Costa Adeje. Gran resort con spa y piscinas.',
  },
  {
    business_name: 'GF Gran Costa Adeje',
    category: 'hotel',
    subcategory: 'hotel-luxury',
    zone: 'sur',
    website: 'https://www.gfhoteles.com/en/gf-gran-costa-adeje.html',
    source: 'web-search',
    status: 'new',
    priority: 'high',
    notes: '5 estrellas resort de lujo en Costa Adeje. Ideal para familias.',
  },
  {
    business_name: 'Mediterranean Palace Hotel',
    category: 'hotel',
    subcategory: 'hotel-luxury',
    zone: 'sur',
    website: 'https://www.mediterraneanpalacehotel.com',
    source: 'web-search',
    status: 'new',
    priority: 'medium',
    notes: '5 estrellas all-inclusive en el sur de Tenerife.',
  },
  {
    business_name: 'Hotel Bahia Principe Fantasia Tenerife',
    category: 'hotel',
    subcategory: 'hotel-luxury',
    zone: 'sur',
    website: 'https://www.bahia-principe.com/en/hotels-in-spain/resort-fantasia/',
    source: 'web-search',
    status: 'new',
    priority: 'medium',
    notes: 'Resort temático 5 estrellas. Ideal para familias con niños.',
  },
  {
    business_name: 'Tivoli La Caleta Tenerife Resort',
    category: 'hotel',
    subcategory: 'hotel-luxury',
    zone: 'sur',
    website: 'https://www.tivolihotels.com',
    source: 'web-search',
    status: 'new',
    priority: 'high',
    notes: 'Resort de lujo en Costa Adeje. Marca internacional Tivoli.',
  },
  {
    business_name: 'Dreams Jardín Tropical Resort & Spa',
    category: 'hotel',
    subcategory: 'hotel-spa',
    zone: 'sur',
    website: 'https://www.dreamsresorts.com',
    source: 'web-search',
    status: 'new',
    priority: 'high',
    notes: 'En costa de Adeje, vistas al Atlántico y La Gomera. 12.000m2 de jardines. Spa completo.',
  },

  // ==========================================
  // HOTELES PUERTO DE LA CRUZ (5)
  // ==========================================
  {
    business_name: 'Hotel Puerto Palace',
    category: 'hotel',
    subcategory: 'hotel-chain',
    zone: 'norte',
    website: 'https://www.puertopalace.com',
    source: 'web-search',
    status: 'new',
    priority: 'medium',
    notes: 'En zona residencial tranquila de Puerto de la Cruz, a 10 min de la playa y del centro.',
  },
  {
    business_name: 'Sol Puerto de la Cruz',
    category: 'hotel',
    subcategory: 'hotel-chain',
    zone: 'norte',
    website: 'https://www.melia.com/en/hotels/spain/tenerife/sol-puerto-de-la-cruz',
    source: 'web-search',
    status: 'new',
    priority: 'medium',
    notes: 'Hotel Meliá en el corazón de Puerto de la Cruz, junto a Playa Jardín.',
  },
  {
    business_name: 'Hotel AF Valle Orotava',
    category: 'hotel',
    subcategory: 'hotel-chain',
    zone: 'norte',
    website: 'https://afhotels.es',
    source: 'web-search',
    status: 'new',
    priority: 'low',
    notes: '4 estrellas renovado en centro de Puerto de la Cruz. A 10 min de Playa Jardín.',
  },
  {
    business_name: 'H10 Costa Adeje Palace',
    category: 'hotel',
    subcategory: 'hotel-chain',
    zone: 'sur',
    website: 'https://www.h10hotels.com/en/tenerife-hotels/h10-costa-adeje-palace',
    source: 'web-search',
    status: 'new',
    priority: 'medium',
    notes: 'Hotel H10 en primera línea de mar en Costa Adeje. Cadena hotelera reconocida.',
  },
  {
    business_name: 'HOVIMA Suites Costa Adeje',
    category: 'hotel',
    subcategory: 'hotel-chain',
    zone: 'sur',
    website: 'https://www.hovimasuitescostaadeje.com',
    source: 'web-search',
    status: 'new',
    priority: 'low',
    notes: 'Suites espaciosas en el corazón de Costa Adeje.',
  },

  // ==========================================
  // HOSTELS (5)
  // ==========================================
  {
    business_name: 'Casa Grande Surf Hostel',
    category: 'hotel',
    subcategory: 'hostel',
    zone: 'sur',
    website: 'https://casagrandesurfhostel.com',
    source: 'web-search',
    status: 'new',
    priority: 'medium',
    notes: 'A 20m de playa El Médano. Alquiler de equipo de surf, terraza chill-out. Público joven.',
  },
  {
    business_name: 'Ocean Nomads Coworking Tenerife',
    category: 'hotel',
    subcategory: 'hostel',
    zone: 'sur',
    website: 'https://oceannomads.co',
    source: 'web-search',
    status: 'new',
    priority: 'high',
    notes: 'Hostel + coworking frente a playa Los Cristianos. Nómadas digitales. Gran potencial de partnership.',
  },
  {
    business_name: 'Duque Nest Hostel',
    category: 'hotel',
    subcategory: 'hostel',
    zone: 'sur',
    website: 'https://duquenesthostel.com',
    source: 'web-search',
    status: 'new',
    priority: 'low',
    notes: '4 estrellas a menos de 1km de Playa de Fañabé. Cocina compartida.',
  },
  {
    business_name: 'The Tree House Tenerife',
    category: 'hotel',
    subcategory: 'hostel',
    zone: 'sur',
    website: 'https://thetreehousetenerife.com',
    source: 'web-search',
    status: 'new',
    priority: 'low',
    notes: 'En El Médano. Piscina exterior, cocina compartida con barbacoa. Ambiente relajado.',
  },
  {
    business_name: 'Hostel Tenerife',
    category: 'hotel',
    subcategory: 'hostel',
    zone: 'metropolitana',
    website: 'https://hosteltenerife.com',
    source: 'web-search',
    status: 'new',
    priority: 'low',
    notes: 'Hostel en Santa Cruz de Tenerife. Opción económica para mochileros.',
  },

  // ==========================================
  // HOTELES SPA (5)
  // ==========================================
  {
    business_name: 'OCÉANO Health Spa Hotel',
    category: 'hotel',
    subcategory: 'hotel-spa',
    zone: 'norte',
    website: 'https://oceano.de/en/',
    source: 'web-search',
    status: 'new',
    priority: 'high',
    notes: 'Al pie de la Reserva de la Biosfera de Anaga. Hotel de salud y bienestar. Nicho premium.',
  },
  {
    business_name: 'H10 Atlantic Sunset',
    category: 'hotel',
    subcategory: 'hotel-spa',
    zone: 'sur',
    website: 'https://www.h10hotels.com',
    source: 'web-search',
    status: 'new',
    priority: 'medium',
    notes: 'Horizons Collection de H10. Hotel con spa en el sur de Tenerife.',
  },
  {
    business_name: 'Hotel El Tejar & Spa',
    category: 'hotel',
    subcategory: 'hotel-spa',
    zone: 'norte',
    website: 'https://hoteleltejar.com',
    source: 'web-search',
    status: 'new',
    priority: 'medium',
    notes: 'Hotel con spa en el norte de Tenerife. Combinación de rural y bienestar.',
  },
  {
    business_name: 'Landmar Playa La Arena',
    category: 'hotel',
    subcategory: 'hotel-spa',
    zone: 'sur',
    website: 'https://landmarhotels.com',
    source: 'web-search',
    status: 'new',
    priority: 'medium',
    notes: 'Hotel con spa en Playa La Arena. Vistas a Los Gigantes.',
  },
  {
    business_name: 'JOIA El Mirador by Iberostar',
    category: 'hotel',
    subcategory: 'hotel-luxury',
    zone: 'sur',
    website: 'https://www.iberostar.com',
    source: 'web-search',
    status: 'new',
    priority: 'high',
    notes: 'Nueva marca premium de Iberostar en Costa Adeje. Resort de alta gama.',
  },

  // ==========================================
  // EXTRAS (para llegar a 42+)
  // ==========================================
  {
    business_name: 'Hotel Rural Vilaflor',
    category: 'hotel',
    subcategory: 'hotel-rural',
    zone: 'sur',
    website: 'https://rural.tenerifehotel.net',
    source: 'web-search',
    status: 'new',
    priority: 'medium',
    notes: 'Casa canaria de +150 años restaurada en Vilaflor. Cerca del Parque Nacional del Teide.',
  },
  {
    business_name: 'Sunset Bay Club',
    category: 'hotel',
    subcategory: 'hotel-chain',
    zone: 'sur',
    website: 'https://sunsetbayclub.com',
    source: 'web-search',
    status: 'new',
    priority: 'low',
    notes: 'Aparthotel a 5 min de playa Fañabé. 2 piscinas exteriores. Playa de Las Américas.',
  },
  {
    business_name: 'Royal Sunset Beach Club',
    category: 'hotel',
    subcategory: 'hotel-chain',
    zone: 'sur',
    website: 'https://royalsunsetbeachclub.com',
    source: 'web-search',
    status: 'new',
    priority: 'low',
    notes: 'A 100m de playa Fañabé. Piscinas en jardines, sauna y masajes.',
  },
  {
    business_name: 'HG Tenerife Sur',
    category: 'hotel',
    subcategory: 'hotel-chain',
    zone: 'sur',
    website: 'https://hgtenerifesur.com',
    source: 'web-search',
    status: 'new',
    priority: 'low',
    notes: 'Aparthotel a 10 min de playa Los Cristianos. 2 piscinas, sauna. Estilo canario.',
  },
]

async function main() {
  console.log('=== Scrape Hotels Tenerife ===')
  console.log(`Total hotels to upsert: ${hotels.length}\n`)

  // Fetch existing business names to avoid duplicates
  console.log('Fetching existing leads...')
  const { data: existing } = await sb.from('leads').select('business_name')
  const existingNames = new Set((existing || []).map((l: { business_name: string }) => l.business_name))
  console.log(`  Found ${existingNames.size} existing leads\n`)

  // Filter to only new hotels
  const newHotels = hotels.filter(h => !existingNames.has(h.business_name))
  const skipped = hotels.length - newHotels.length

  // Summary by subcategory
  const subcategories = hotels.reduce(
    (acc, h) => {
      acc[h.subcategory] = (acc[h.subcategory] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  console.log('By subcategory (total):')
  for (const [sub, count] of Object.entries(subcategories)) {
    console.log(`  ${sub}: ${count}`)
  }
  console.log(`\n  New to insert: ${newHotels.length}`)
  console.log(`  Skipped (already exist): ${skipped}\n`)

  if (newHotels.length === 0) {
    console.log('All hotels already exist in the database. Nothing to insert.')
  }

  // Insert in batches of 10
  const batchSize = 10
  let inserted = 0
  let errors = 0

  for (let i = 0; i < newHotels.length; i += batchSize) {
    const batch = newHotels.slice(i, i + batchSize)
    const batchNum = Math.floor(i / batchSize) + 1

    const { error } = await sb.from('leads').insert(batch)

    if (error) {
      console.error(`  Batch ${batchNum} ERROR:`, error.message)
      errors += batch.length
    } else {
      inserted += batch.length
      console.log(`  Batch ${batchNum}: inserted ${batch.length} hotels`)
    }
  }

  console.log(`\n=== Results ===`)
  console.log(`  Inserted: ${inserted}`)
  console.log(`  Skipped: ${skipped}`)
  console.log(`  Errors: ${errors}`)

  // Verify total leads in DB
  const { count } = await sb.from('leads').select('*', { count: 'exact', head: true })
  console.log(`  Total leads in DB: ${count}`)

  // Count hotels specifically
  const { count: hotelCount } = await sb
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .eq('category', 'hotel')
  console.log(`  Total hotel leads: ${hotelCount}`)

  console.log('\nDone!')
}

main().catch(console.error)
