import { createClient } from '@supabase/supabase-js'

const sb = createClient(
  'https://sqesgghvaazyajzjkoap.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxZXNnZ2h2YWF6eWFqemprb2FwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzUxMzgwOSwiZXhwIjoyMDg5MDg5ODA5fQ.UvbRfWU9seJPT9lyCyLmpD4uZrP9jXzsNoeSAjT9HnI'
)

const accommodations = [
  // ==========================================
  // CASAS RURALES - NORTE (10)
  // ==========================================
  {
    business_name: 'Casa Regina',
    category: 'accommodation',
    subcategory: 'casa-rural',
    zone: 'norte',
    website: 'https://www.escapadarural.com/casas-rurales/tenerife',
    source: 'web-search',
    status: 'new',
    priority: 'medium',
    notes: 'Casa rural en Icod de los Vinos. Salón, cocina equipada, 1 dormitorio, 1 baño. Capacidad 4 personas.',
  },
  {
    business_name: 'Casa Montiel',
    category: 'accommodation',
    subcategory: 'casa-rural',
    zone: 'norte',
    website: 'https://www.escapadarural.com/casas-rurales/tenerife',
    source: 'web-search',
    status: 'new',
    priority: 'medium',
    notes: 'Casa rural en Icod de los Vinos, cerca del Drago Milenario y Cueva del Viento.',
  },
  {
    business_name: 'Casa Amarilla Los Silos',
    category: 'accommodation',
    subcategory: 'casa-rural',
    zone: 'norte',
    website: 'https://www.escapadarural.com/casas-rurales/tenerife',
    source: 'web-search',
    status: 'new',
    priority: 'medium',
    notes: 'Casa rural ideal para parejas en Los Silos, cerca del Parque Rural de Teno y piscinas naturales.',
  },
  {
    business_name: 'Casa Rural Chamorga',
    category: 'accommodation',
    subcategory: 'casa-rural',
    zone: 'norte',
    website: 'https://islanaga-tenerife.tenerifehotel.net',
    source: 'web-search',
    status: 'new',
    priority: 'medium',
    notes: 'Pension-guesthouse a 10 min del Parque Rural de Anaga. Entorno natural privilegiado.',
  },
  {
    business_name: 'Lomo de Las Bodegas',
    category: 'accommodation',
    subcategory: 'casa-rural',
    zone: 'norte',
    website: 'https://www.escapadarural.com/casas-rurales/parque-rural-de-anaga',
    source: 'web-search',
    status: 'new',
    priority: 'medium',
    notes: 'Casa rural en el Parque Rural de Anaga con huerto de frutales.',
  },
  {
    business_name: 'Casa Rural Monte del Agua',
    category: 'accommodation',
    subcategory: 'casa-rural',
    zone: 'norte',
    website: 'https://casamontedelagua.com',
    source: 'web-search',
    status: 'new',
    priority: 'high',
    notes: 'Casa rural con web propia en el norte de Tenerife. Entorno natural de montaña.',
  },
  {
    business_name: 'Finca Aurora Ecorural',
    category: 'accommodation',
    subcategory: 'casa-rural',
    zone: 'norte',
    website: 'https://www.casasrurales.net/casas-rurales/tenerife',
    source: 'web-search',
    status: 'new',
    priority: 'high',
    notes: 'Dos casas rurales con barbacoa y piscina compartida. Rodeadas de pinar canario en Icod de los Vinos.',
  },
  {
    business_name: 'La Deseada',
    category: 'accommodation',
    subcategory: 'casa-rural',
    zone: 'norte',
    website: 'https://www.casasrurales.net/casas-rurales/tenerife',
    source: 'web-search',
    status: 'new',
    priority: 'medium',
    notes: 'Casa de 90m2 con 2 dormitorios en finca de 11.000m2 con frutales, viñedos y huerta.',
  },
  {
    business_name: 'Finca El Pastel',
    category: 'accommodation',
    subcategory: 'casa-rural',
    zone: 'norte',
    website: 'https://www.booking.com/country-houses/region/es/tenerife-island.html',
    source: 'web-search',
    status: 'new',
    priority: 'medium',
    notes: 'Finca rural en Tacoronte. Zona vinícola del norte de Tenerife.',
  },
  {
    business_name: 'Finca El Castillo',
    category: 'accommodation',
    subcategory: 'casa-rural',
    zone: 'norte',
    website: 'https://www.booking.com/country-houses/region/es/tenerife-island.html',
    source: 'web-search',
    status: 'new',
    priority: 'medium',
    notes: 'Apartamentos de autoservicio en Buenavista del Norte, cerca del Parque Rural de Teno.',
  },

  // ==========================================
  // CASAS RURALES - SUR (5)
  // ==========================================
  {
    business_name: 'Finca Rural Los Corcos',
    category: 'accommodation',
    subcategory: 'casa-rural',
    zone: 'sur',
    website: 'https://www.booking.com/country-houses/region/es/tenerife-sur.html',
    source: 'web-search',
    status: 'new',
    priority: 'medium',
    notes: 'Finca en Guía de Isora, a pocos km de las mejores playas del sur. Piscina privada.',
  },
  {
    business_name: 'La Era de Taucho',
    category: 'accommodation',
    subcategory: 'casa-rural',
    zone: 'sur',
    website: 'https://www.booking.com/country-houses/region/es/tenerife-sur.html',
    source: 'web-search',
    status: 'new',
    priority: 'medium',
    notes: 'Casa vacacional en Taucho, Adeje. A 10 min de Adeje y 15 min de zonas turísticas y playas.',
  },
  {
    business_name: 'Casa Rural Arona',
    category: 'accommodation',
    subcategory: 'casa-rural',
    zone: 'sur',
    website: 'https://www.secretplaces.com/spain/canary-islands/tenerife/best-boutique-hotels-holiday-homes',
    source: 'web-search',
    status: 'new',
    priority: 'medium',
    notes: 'Casa de campo tradicional con jardín de frutales y plantas tropicales. A 6km de playas.',
  },
  {
    business_name: 'Casa Rural Masca Morrocatana',
    category: 'accommodation',
    subcategory: 'casa-rural',
    zone: 'sur',
    website: 'https://www.booking.com/country-houses/region/es/tenerife-island.html',
    source: 'web-search',
    status: 'new',
    priority: 'high',
    notes: 'Casa rural solo adultos en Masca, uno de los pueblos más bonitos de Tenerife.',
  },
  {
    business_name: 'Finca Rural House Tenerife Relax',
    category: 'accommodation',
    subcategory: 'casa-rural',
    zone: 'sur',
    website: 'https://www.booking.com/country-houses/region/es/tenerife-sur.html',
    source: 'web-search',
    status: 'new',
    priority: 'medium',
    notes: 'Finca rural popular entre parejas en el sur de Tenerife.',
  },

  // ==========================================
  // FINCAS (5)
  // ==========================================
  {
    business_name: 'Finca Rural Casonas de Marengo',
    category: 'accommodation',
    subcategory: 'finca',
    zone: 'norte',
    website: 'https://www.zonasrurales.com/finca-rural-casonas-de-marengo-4451/',
    source: 'web-search',
    status: 'new',
    priority: 'high',
    notes: 'Cinco casas rurales independientes en finca de 30.000m2, arquitectura canaria, junto a Cueva del Viento.',
  },
  {
    business_name: 'Hotel Rural Finca Salamanca',
    category: 'accommodation',
    subcategory: 'finca',
    zone: 'sur',
    website: 'https://www.hotelfincasalamanca.com',
    source: 'web-search',
    status: 'new',
    priority: 'high',
    notes: 'Hotel rural en Güímar. Finca con web propia y reservas directas.',
  },
  {
    business_name: 'Finca El Picacho',
    category: 'accommodation',
    subcategory: 'finca',
    zone: 'norte',
    website: 'https://fincaelpicacho.com',
    source: 'web-search',
    status: 'new',
    priority: 'high',
    notes: 'Finca en Tejina/San Cristóbal de La Laguna. Turismo rural con web multiidioma.',
  },
  {
    business_name: 'Finca Paraíso',
    category: 'accommodation',
    subcategory: 'finca',
    zone: 'norte',
    website: 'https://www.agoda.com/finca-paraiso/hotel/tenerife-es.html',
    source: 'web-search',
    status: 'new',
    priority: 'medium',
    notes: 'Finca rural popular en el norte de Tenerife. Listada en múltiples plataformas de reservas.',
  },
  {
    business_name: 'Hacienda El Terrero',
    category: 'accommodation',
    subcategory: 'finca',
    zone: 'norte',
    website: 'https://www.secretplaces.com/spain/canary-islands/tenerife/best-boutique-hotels-holiday-homes',
    source: 'web-search',
    status: 'new',
    priority: 'high',
    notes: 'Complejo de 12 casas vacacionales en 50 acres cerca de Los Realejos. Idílico entorno rural.',
  },

  // ==========================================
  // VILLAS DE LUJO (5)
  // ==========================================
  {
    business_name: 'Villa Oasis Paraíso',
    category: 'accommodation',
    subcategory: 'villa',
    zone: 'sur',
    website: 'https://villasdelujotenerife.com',
    source: 'web-search',
    status: 'new',
    priority: 'high',
    notes: 'Villa privada de lujo en Playa Paraíso, Costa Adeje. Intimidad y confort premium.',
  },
  {
    business_name: 'Finca Santa María',
    category: 'accommodation',
    subcategory: 'villa',
    zone: 'sur',
    website: 'https://villasdelujotenerife.com',
    source: 'web-search',
    status: 'new',
    priority: 'high',
    notes: 'Villa de lujo con piscina, hammam, jacuzzi, sauna. 5 dormitorios, hasta 10 personas.',
  },
  {
    business_name: 'Karat Luxury Rentals Tenerife',
    category: 'accommodation',
    subcategory: 'villa',
    zone: 'sur',
    website: 'https://karatluxuryrentals.com',
    source: 'web-search',
    status: 'new',
    priority: 'high',
    notes: 'Agencia de alquiler de villas de lujo en Tenerife. Cartera de propiedades premium.',
  },
  {
    business_name: 'Las Casas Canarias Villas',
    category: 'accommodation',
    subcategory: 'villa',
    zone: 'norte',
    website: 'https://www.lascasascanarias.com',
    source: 'web-search',
    status: 'new',
    priority: 'high',
    notes: 'Casas y villas de lujo en Tenerife. Incluyen propiedades en El Sauzal con vistas al mar.',
  },
  {
    business_name: 'VIA Unique Properties Tenerife',
    category: 'accommodation',
    subcategory: 'villa',
    zone: 'sur',
    website: 'https://www.viauniqueproperties.com',
    source: 'web-search',
    status: 'new',
    priority: 'medium',
    notes: 'Selección exclusiva de villas de lujo en Costa Adeje, La Caleta, La Caldera.',
  },

  // ==========================================
  // GLAMPING (4)
  // ==========================================
  {
    business_name: 'Eco-resort Domo Maestra',
    category: 'accommodation',
    subcategory: 'glamping',
    zone: 'sur',
    website: 'https://glampinghub.com/spain/tenerife/',
    source: 'web-search',
    status: 'new',
    priority: 'high',
    notes: 'Eco-resort con domos cerca del Parque Nacional del Teide en Vilaflor. Experiencia de stargazing.',
  },
  {
    business_name: 'Glamp Tenerife',
    category: 'accommodation',
    subcategory: 'glamping',
    zone: 'sur',
    website: 'https://glampinghub.com/spain/tenerife/',
    source: 'web-search',
    status: 'new',
    priority: 'high',
    notes: 'Glamping con cápsulas transparentes y vistas. Tendencia en auge en la isla.',
  },
  {
    business_name: 'Blue Ocean Camp',
    category: 'accommodation',
    subcategory: 'glamping',
    zone: 'sur',
    website: 'https://www.blueoceancamp.com',
    source: 'web-search',
    status: 'new',
    priority: 'high',
    notes: 'Camping de lujo junto a la playa. Web propia con reservas directas.',
  },
  {
    business_name: 'Camping Montaña Roja Eco-Wooden Houses',
    category: 'accommodation',
    subcategory: 'glamping',
    zone: 'sur',
    website: 'https://www.pitchup.com/en-us/glamping/spain/islas_canarias/santa_cruz_de_tenerife/',
    source: 'web-search',
    status: 'new',
    priority: 'medium',
    notes: 'Casas ecológicas de madera cerca de playa La Tejita. Restaurante, bar, piscina.',
  },

  // ==========================================
  // CASAS CUEVA (2)
  // ==========================================
  {
    business_name: 'Cueva Los Almendros',
    category: 'accommodation',
    subcategory: 'casa-rural',
    zone: 'sur',
    website: 'https://www.cuevalosalmendros.com',
    source: 'web-search',
    status: 'new',
    priority: 'high',
    notes: 'Alojamiento único en barrica real de sidra en Vilaflor. Baño privado, cocina, pinar canario. Desde 200EUR/noche.',
  },
  {
    business_name: 'Cave House Justine Chimiche',
    category: 'accommodation',
    subcategory: 'casa-rural',
    zone: 'sur',
    website: 'https://www.airbnb.com/santa-cruz-de-tenerife-region-spain/stays/caves',
    source: 'web-search',
    status: 'new',
    priority: 'medium',
    notes: 'Casa cueva de casi 100 años en Chimiche. Experiencia rural auténtica y contacto con la naturaleza.',
  },

  // ==========================================
  // PENSIONES Y B&B (5)
  // ==========================================
  {
    business_name: 'Pensión Silene Orotava',
    category: 'accommodation',
    subcategory: 'pension',
    zone: 'norte',
    website: 'https://www.cozycozy.com/es/pension-tenerife',
    source: 'web-search',
    status: 'new',
    priority: 'medium',
    notes: 'Pensión familiar muy bien valorada en La Orotava. Popular entre familias.',
  },
  {
    business_name: 'Pensión Casablanca B&B',
    category: 'accommodation',
    subcategory: 'bnb',
    zone: 'metropolitana',
    website: 'https://pension-casablanca-bb-tenerife.tenerifehoteles.net',
    source: 'web-search',
    status: 'new',
    priority: 'low',
    notes: 'Bed & Breakfast en Santa Cruz de Tenerife. Opción económica y céntrica.',
  },
  {
    business_name: 'Sansofi Guesthouse',
    category: 'accommodation',
    subcategory: 'bnb',
    zone: 'sur',
    website: 'https://www.booking.com/bed-and-breakfast/region/es/tenerife-island.html',
    source: 'web-search',
    status: 'new',
    priority: 'medium',
    notes: 'Guesthouse popular en el sur de Tenerife. Bien valorada en Booking.',
  },
  {
    business_name: 'Canary Bio Hostel Tenerife',
    category: 'accommodation',
    subcategory: 'bnb',
    zone: 'norte',
    website: 'https://www.hostelworld.com/bed-and-breakfasts/europe/spain/tenerife/',
    source: 'web-search',
    status: 'new',
    priority: 'medium',
    notes: 'Hostel bio en Los Realejos. Excelentes valoraciones en limpieza y ubicación.',
  },
  {
    business_name: 'Malvasia Bed Arico',
    category: 'accommodation',
    subcategory: 'bnb',
    zone: 'sur',
    website: 'https://www.secretplaces.com/spain/canary-islands/tenerife/best-boutique-hotels-holiday-homes',
    source: 'web-search',
    status: 'new',
    priority: 'high',
    notes: '3 casas de vacaciones en finca de Arico Viejo rodeada de 80 hectáreas de viñedos Malvasia.',
  },

  // ==========================================
  // ALBERGUES (2)
  // ==========================================
  {
    business_name: 'Albergue de Bolico',
    category: 'accommodation',
    subcategory: 'albergue',
    zone: 'norte',
    website: 'https://www.alberguebolico.com',
    source: 'web-search',
    status: 'new',
    priority: 'high',
    notes: 'Albergue de montaña en Parque Rural de Teno. 36 plazas. Senderismo, escalada, MTB, surf.',
  },
  {
    business_name: 'Albergue Montes de Anaga',
    category: 'accommodation',
    subcategory: 'albergue',
    zone: 'norte',
    website: 'https://www.tenerife.es/albergues',
    source: 'web-search',
    status: 'new',
    priority: 'high',
    notes: 'Albergue de montaña en El Bailadero, macizo de Anaga. 40 plazas, 9 habitaciones. Senderismo.',
  },

  // ==========================================
  // APARTAMENTOS (4)
  // ==========================================
  {
    business_name: 'Apartamentos El Médano',
    category: 'accommodation',
    subcategory: 'apartamento',
    zone: 'sur',
    website: 'https://www.apartamentosmedano.com',
    source: 'web-search',
    status: 'new',
    priority: 'medium',
    notes: 'Apartamentos turísticos 100% legales en El Médano. Registrados en turismo.',
  },
  {
    business_name: 'Villa La Victoria',
    category: 'accommodation',
    subcategory: 'apartamento',
    zone: 'sur',
    website: 'https://www.booking.com/country-houses/region/es/tenerife-sur.html',
    source: 'web-search',
    status: 'new',
    priority: 'medium',
    notes: 'Apartamento vacacional popular entre parejas en el sur de Tenerife.',
  },
  {
    business_name: 'Tenerife Apartments EU',
    category: 'accommodation',
    subcategory: 'apartamento',
    zone: 'sur',
    website: 'https://tenerifeapartments.eu',
    source: 'web-search',
    status: 'new',
    priority: 'medium',
    notes: 'Plataforma de apartamentos vacacionales en Tenerife con web propia.',
  },
  {
    business_name: 'Villas Tenerife Piscina Climatizada',
    category: 'accommodation',
    subcategory: 'apartamento',
    zone: 'sur',
    website: 'https://villas.tenerife.com',
    source: 'web-search',
    status: 'new',
    priority: 'high',
    notes: 'Villas y apartamentos de lujo con piscina climatizada privada. Web propia con reservas.',
  },
]

async function main() {
  console.log('=== Scrape Casas Rurales, Fincas & Accommodation Tenerife ===')
  console.log(`Total accommodations to upsert: ${accommodations.length}\n`)

  // Fetch existing business names to avoid duplicates
  console.log('Fetching existing leads...')
  const { data: existing } = await sb.from('leads').select('business_name')
  const existingNames = new Set((existing || []).map((l: { business_name: string }) => l.business_name.toLowerCase()))
  console.log(`  Found ${existingNames.size} existing leads\n`)

  // Filter to only new accommodations (case-insensitive check)
  const newAccommodations = accommodations.filter(a => !existingNames.has(a.business_name.toLowerCase()))
  const skipped = accommodations.length - newAccommodations.length

  // Summary by subcategory
  const subcategories = accommodations.reduce(
    (acc, a) => {
      acc[a.subcategory] = (acc[a.subcategory] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  console.log('By subcategory (total):')
  for (const [sub, count] of Object.entries(subcategories)) {
    console.log(`  ${sub}: ${count}`)
  }

  // Summary by zone
  const zones = accommodations.reduce(
    (acc, a) => {
      acc[a.zone] = (acc[a.zone] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  console.log('\nBy zone (total):')
  for (const [zone, count] of Object.entries(zones)) {
    console.log(`  ${zone}: ${count}`)
  }

  console.log(`\n  New to insert: ${newAccommodations.length}`)
  console.log(`  Skipped (already exist): ${skipped}\n`)

  if (newAccommodations.length === 0) {
    console.log('All accommodations already exist in the database. Nothing to insert.')
    return
  }

  // Insert in batches of 10
  const batchSize = 10
  let inserted = 0
  let errors = 0

  for (let i = 0; i < newAccommodations.length; i += batchSize) {
    const batch = newAccommodations.slice(i, i + batchSize)
    const batchNum = Math.floor(i / batchSize) + 1

    const { error } = await sb.from('leads').insert(batch)

    if (error) {
      console.error(`  Batch ${batchNum} ERROR:`, error.message)
      errors += batch.length
    } else {
      inserted += batch.length
      console.log(`  Batch ${batchNum}: inserted ${batch.length} accommodations`)
    }
  }

  console.log(`\n=== Results ===`)
  console.log(`  Inserted: ${inserted}`)
  console.log(`  Skipped: ${skipped}`)
  console.log(`  Errors: ${errors}`)

  // Verify total leads in DB
  const { count } = await sb.from('leads').select('*', { count: 'exact', head: true })
  console.log(`  Total leads in DB: ${count}`)

  // Count accommodations specifically
  const { count: accommodationCount } = await sb
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .eq('category', 'accommodation')
  console.log(`  Total accommodation leads: ${accommodationCount}`)

  console.log('\nDone!')
}

main().catch(console.error)
