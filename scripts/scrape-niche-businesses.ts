import { createClient } from '@supabase/supabase-js'

const sb = createClient(
  'https://sqesgghvaazyajzjkoap.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxZXNnZ2h2YWF6eWFqemprb2FwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzUxMzgwOSwiZXhwIjoyMDg5MDg5ODA5fQ.UvbRfWU9seJPT9lyCyLmpD4uZrP9jXzsNoeSAjT9HnI'
)

interface Lead {
  business_name: string
  category: string
  subcategory: string
  zone: string
  website: string | null
  source: string
  status: string
  notes?: string
}

const leads: Lead[] = [
  // ============================
  // KAYAK & PADDLEBOARD (5)
  // ============================
  {
    business_name: 'La Caleta Adventures',
    category: 'water-sports',
    subcategory: 'kayak',
    zone: 'sur',
    website: 'https://lacaleta-adventures.com',
    source: 'web-search',
    status: 'new',
    notes: 'Kayak rental en La Caleta, Costa Adeje. Desde 20€ single, 30€ double. Aguas cristalinas.',
  },
  {
    business_name: 'Easy Kayak Tenerife',
    category: 'water-sports',
    subcategory: 'kayak',
    zone: 'sur',
    website: 'https://www.easykayaktenerife.com',
    source: 'web-search',
    status: 'new',
    notes: 'Tours de kayak con tortugas y snorkeling en Palm-Mar. Muy popular.',
  },
  {
    business_name: 'Sea-Thru Kayaks',
    category: 'water-sports',
    subcategory: 'kayak',
    zone: 'sur',
    website: 'https://seathru-kayaks.com',
    source: 'web-search',
    status: 'new',
    notes: 'Kayaks transparentes con snorkeling incluido. Experiencia única.',
  },
  {
    business_name: 'Adventure Time Tenerife',
    category: 'water-sports',
    subcategory: 'kayak',
    zone: 'sur',
    website: 'https://adventuretimetenerife.com',
    source: 'web-search',
    status: 'new',
    notes: 'Excursiones en kayak y actividades acuáticas en el sur de Tenerife.',
  },
  {
    business_name: 'Duotone Pro Center Tenerife',
    category: 'water-sports',
    subcategory: 'sup',
    zone: 'sur',
    website: 'https://www.dpc-tenerife.com',
    source: 'web-search',
    status: 'new',
    notes: 'Centro profesional de SUP y windsurf. Alquiler y clases de paddleboard.',
  },

  // ============================
  // FISHING CHARTERS (5)
  // ============================
  {
    business_name: 'Yate Sofia Fishing Charter',
    category: 'water-sports',
    subcategory: 'fishing',
    zone: 'sur',
    website: 'https://www.yatesofia.com',
    source: 'web-search',
    status: 'new',
    notes: 'Charter privado de pesca deportiva y deep sea fishing. Costa Adeje.',
  },
  {
    business_name: 'The Rodfather Tenerife',
    category: 'water-sports',
    subcategory: 'fishing',
    zone: 'sur',
    website: 'https://therodfathertenerife.es',
    source: 'web-search',
    status: 'new',
    notes: 'Fishing charter con trips de 4-6 horas. Atún, marlín, dorado. Licencia incluida.',
  },
  {
    business_name: 'Tenerife Sport Fishing',
    category: 'water-sports',
    subcategory: 'fishing',
    zone: 'sur',
    website: 'https://tenerifesportfishing.com',
    source: 'web-search',
    status: 'new',
    notes: 'Pesca deportiva desde Costa Adeje. Blue marlin, wahoo, yellowfin tuna.',
  },
  {
    business_name: 'Crested Wave Fishing',
    category: 'water-sports',
    subcategory: 'fishing',
    zone: 'sur',
    website: 'https://crestedwave.com',
    source: 'web-search',
    status: 'new',
    notes: 'Charter boat para fishing trips. Deep sea fishing en Tenerife.',
  },

  // ============================
  // CATAMARAN / PRIVATE CHARTER (4)
  // ============================
  {
    business_name: 'Kalima Kat Catamaran',
    category: 'excursions',
    subcategory: 'catamaran',
    zone: 'sur',
    website: 'https://kalimakat.es',
    source: 'web-search',
    status: 'new',
    notes: 'Catamarán privado para hasta 10 personas. 3 horas Costa Adeje con comida y bebidas.',
  },
  {
    business_name: 'Rent Boat Tenerife',
    category: 'excursions',
    subcategory: 'boat-rental',
    zone: 'sur',
    website: 'https://rentboattenerife.com',
    source: 'web-search',
    status: 'new',
    notes: 'Alquiler de barcos y catamaranes. Desde 110€/hora. Costa Adeje y Los Gigantes.',
  },
  {
    business_name: 'Club Canary Excursions',
    category: 'excursions',
    subcategory: 'multi-activity',
    zone: 'sur',
    website: 'https://clubcanary.com',
    source: 'web-search',
    status: 'new',
    notes: 'Plataforma de excursiones: catamaranes 5 estrellas, helicópteros, wine tours, karting.',
  },

  // ============================
  // SNORKELING (3)
  // ============================
  {
    business_name: 'Medano Diving & Snorkeling',
    category: 'water-sports',
    subcategory: 'snorkeling',
    zone: 'sur',
    website: 'https://www.medanodivingtenerife.com',
    source: 'web-search',
    status: 'new',
    notes: 'Centro de buceo y snorkeling en El Médano. Trips guiados en áreas protegidas.',
  },
  {
    business_name: 'Green Wave Tenerife',
    category: 'water-sports',
    subcategory: 'sup',
    zone: 'sur',
    website: 'https://greenwavetenerife.com',
    source: 'web-search',
    status: 'new',
    notes: 'SUP, surf y snorkeling. Escuela y alquiler de equipos en el sur.',
  },

  // ============================
  // MOUNTAIN BIKE (5)
  // ============================
  {
    business_name: 'Ridebase Tenerife',
    category: 'adventure',
    subcategory: 'mountain-bike',
    zone: 'sur',
    website: 'https://ridebasetenerife.com',
    source: 'web-search',
    status: 'new',
    notes: 'MTB y road bike rental. Tours guiados según nivel. Stevens, GT, Mondraker.',
  },
  {
    business_name: 'Bike Point Tenerife',
    category: 'adventure',
    subcategory: 'mountain-bike',
    zone: 'sur',
    website: 'https://bikepointtenerife.com',
    source: 'web-search',
    status: 'new',
    notes: 'Hi-end bike rental: road, MTB, e-bikes. Tours guiados de mountain bike.',
  },
  {
    business_name: 'Bike Experience Tenerife',
    category: 'adventure',
    subcategory: 'mountain-bike',
    zone: 'sur',
    website: 'https://bikeexperiencetenerife.com',
    source: 'web-search',
    status: 'new',
    notes: 'Alquiler de MTB para explorar paisajes volcánicos. Senderos y descensos.',
  },
  {
    business_name: 'Cycling in Tenerife',
    category: 'adventure',
    subcategory: 'cycling',
    zone: 'sur',
    website: 'https://www.cyclingintenerife.com',
    source: 'web-search',
    status: 'new',
    notes: 'Amplia selección de bikes para alquiler. Tours guiados para todos los niveles.',
  },
  {
    business_name: 'Pro Hire Bike Tenerife',
    category: 'adventure',
    subcategory: 'mountain-bike',
    zone: 'sur',
    website: 'https://www.prohirebiketenerife.com',
    source: 'web-search',
    status: 'new',
    notes: 'Carbon road bikes y mountain bikes de alta gama. Entrega en hotel.',
  },

  // ============================
  // ROCK CLIMBING (2)
  // ============================
  {
    business_name: 'Tenerife Climbing House',
    category: 'adventure',
    subcategory: 'climbing',
    zone: 'sur',
    website: 'https://tenerifeclimbinghouse.com',
    source: 'web-search',
    status: 'new',
    notes: 'Escalada en roca natural en Tenerife. Arico, El Rio, Tamadaya. Todos los niveles.',
  },

  // ============================
  // HORSEBACK RIDING (4)
  // ============================
  {
    business_name: 'Finca Cabuquero Horse Riding',
    category: 'adventure',
    subcategory: 'horseback-riding',
    zone: 'sur',
    website: 'https://www.horseridingintenerife.com',
    source: 'web-search',
    status: 'new',
    notes: 'Excursiones a caballo por el campo canario. Beginner, intermedio y avanzado.',
  },
  {
    business_name: 'Horse Adventures Tenerife',
    category: 'adventure',
    subcategory: 'horseback-riding',
    zone: 'sur',
    website: 'https://horseadventurestenerife.es',
    source: 'web-search',
    status: 'new',
    notes: 'Centro ecuestre desde 2010. Treks por la campiña canaria, paseos en playa.',
  },
  {
    business_name: 'Cuadras El Médano',
    category: 'adventure',
    subcategory: 'horseback-riding',
    zone: 'sur',
    website: 'https://hipicacuadraselmedano.com',
    source: 'web-search',
    status: 'new',
    notes: 'Centro hípico en El Médano. Rutas a caballo junto a Montaña Roja.',
  },

  // ============================
  // SEGWAY TOURS (2)
  // ============================
  {
    business_name: 'Ecologic Segway Sports Tenerife',
    category: 'entertainment',
    subcategory: 'segway',
    zone: 'sur',
    website: 'https://www.segwaytenerife.es',
    source: 'web-search',
    status: 'new',
    notes: 'Tours en Segway de 9 km (35€) y 18 km (55€). Sur de Tenerife. Todos los días excepto domingos.',
  },
  {
    business_name: 'Canco Segway Tenerife',
    category: 'entertainment',
    subcategory: 'segway',
    zone: 'norte',
    website: 'https://www.cancotenerife.com',
    source: 'web-search',
    status: 'new',
    notes: 'Tours guiados en Segway por Puerto de la Cruz. Grupos reducidos.',
  },

  // ============================
  // ESCAPE ROOMS (3)
  // ============================
  {
    business_name: 'Island Phobia Escape Rooms',
    category: 'entertainment',
    subcategory: 'escape-room',
    zone: 'sur',
    website: 'https://www.islandphobia.com',
    source: 'web-search',
    status: 'new',
    notes: '6 salas de escape de alta calidad. Temas: Harry Potter, Jumanji. Playa de las Américas.',
  },
  {
    business_name: 'Locked Up Room Escape Tenerife',
    category: 'entertainment',
    subcategory: 'escape-room',
    zone: 'sur',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Escape room en Arona. City Center CC. Experiencias inmersivas para turistas.',
  },
  {
    business_name: 'La Puerta Escape Room',
    category: 'entertainment',
    subcategory: 'escape-room',
    zone: 'metropolitana',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Escape room en Santa Cruz de Tenerife. Ambientación en Whitechapel.',
  },

  // ============================
  // KARTING (1)
  // ============================
  {
    business_name: 'Karting Club Tenerife',
    category: 'entertainment',
    subcategory: 'karting',
    zone: 'sur',
    website: 'https://www.kartingtenerife.com',
    source: 'web-search',
    status: 'new',
    notes: 'Pista de karts más grande de Tenerife. Junior 250m + Senior 1200m. Hasta 90 km/h. Bus gratis.',
  },

  // ============================
  // PAINTBALL (2)
  // ============================
  {
    business_name: 'Distrito 9 Paintball',
    category: 'entertainment',
    subcategory: 'paintball',
    zone: 'norte',
    website: 'https://distrito9paintball.es',
    source: 'web-search',
    status: 'new',
    notes: 'Paintball, airsoft, bubble football. Güímar. Zona BBQ y parque infantil. Desde 25€.',
  },
  {
    business_name: 'Paintball Tenerife',
    category: 'entertainment',
    subcategory: 'paintball',
    zone: 'norte',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Campo de paintball en La Esperanza. Modalidad niños 8-14 años y adultos.',
  },

  // ============================
  // STARGAZING / OBSERVATORY (2)
  // ============================
  {
    business_name: 'Night Skies Tenerife',
    category: 'excursions',
    subcategory: 'stargazing',
    zone: 'centro',
    website: 'https://www.nightskiestenerife.com',
    source: 'web-search',
    status: 'new',
    notes: 'Sunset y stargazing tours en el Teide. Telescopios profesionales. Guías Starlight.',
  },

  // ============================
  // HELICOPTER TOURS (2)
  // ============================
  {
    business_name: 'Helidream Helicopters',
    category: 'excursions',
    subcategory: 'helicopter',
    zone: 'sur',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Tours en helicóptero sobre Tenerife. Rutas de 8 a 50 min. Desde 98€/persona. Teide, Los Gigantes.',
  },
  {
    business_name: 'Canary VIP Helicopter Tours',
    category: 'excursions',
    subcategory: 'helicopter',
    zone: 'sur',
    website: 'https://canaryvip.com',
    source: 'web-search',
    status: 'new',
    notes: 'Tours VIP en helicóptero sobre Tenerife. 5 rutas distintas desde Costa Adeje.',
  },

  // ============================
  // PARAGLIDING / AIR SPORTS (2)
  // ============================
  {
    business_name: 'Airsports Tenerife',
    category: 'adventure',
    subcategory: 'paragliding',
    zone: 'sur',
    website: 'https://www.airsportstenerife.com',
    source: 'web-search',
    status: 'new',
    notes: 'Parapente tándem en Tenerife. Experiencia aérea desde ~130€.',
  },
  {
    business_name: 'Sky of Tenerife',
    category: 'adventure',
    subcategory: 'paragliding',
    zone: 'sur',
    website: 'https://www.skyoftenerife.com',
    source: 'web-search',
    status: 'new',
    notes: 'Vuelos en parapente y paracaídas tándem sobre el sur de Tenerife.',
  },

  // ============================
  // COOKING CLASSES (3)
  // ============================
  {
    business_name: 'Casa Carmen Chirche Cooking',
    category: 'food-tour',
    subcategory: 'cooking-class',
    zone: 'sur',
    website: 'https://www.canarygreen.org',
    source: 'web-search',
    status: 'new',
    notes: 'Clase de cocina canaria en Chirche. Mojo rojo, mojo verde, papas arrugadas. Chef Ave.',
  },
  {
    business_name: 'El Refugio Cooking Holiday',
    category: 'food-tour',
    subcategory: 'cooking-class',
    zone: 'norte',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Curso de cocina de 5 días con chef suizo Andreas. Incluye hiking guiado diario.',
  },

  // ============================
  // WINE TOURS (3)
  // ============================
  {
    business_name: 'Feel Tenerife Wine Tours',
    category: 'wine-tour',
    subcategory: 'wine-tour',
    zone: 'norte',
    website: 'https://feeltenerife.com',
    source: 'web-search',
    status: 'new',
    notes: 'Tours gastronómicos y enoturísticos privados con guía. Visitas a bodegas y guachinches.',
  },
  {
    business_name: 'Atlantico Excursiones Wine Tour',
    category: 'wine-tour',
    subcategory: 'wine-tour',
    zone: 'isla',
    website: 'https://en.atlanticoexcursiones.com',
    source: 'web-search',
    status: 'new',
    notes: 'Excursión Flavours & Wines. Visita a bodegas con cata y tapas incluidas.',
  },
  {
    business_name: 'Living Tours Tenerife Food & Wine',
    category: 'wine-tour',
    subcategory: 'food-wine-tour',
    zone: 'norte',
    website: 'https://www.livingtours.com',
    source: 'web-search',
    status: 'new',
    notes: 'Tour de comida y vino en el norte. Casa del Vino, Bodegas Monje, guachinche tradicional.',
  },

  // ============================
  // FOOD TOURS (3)
  // ============================
  {
    business_name: 'Tenerife Guachinche Food Tour',
    category: 'food-tour',
    subcategory: 'food-tour',
    zone: 'norte',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Tour de 4 horas por guachinches del norte. Papas arrugadas, mojo, escaldón, ropa vieja.',
  },
  {
    business_name: 'Tripspoint Tenerife Flavours',
    category: 'food-tour',
    subcategory: 'food-tour',
    zone: 'isla',
    website: 'https://www.tripspoint.com',
    source: 'web-search',
    status: 'new',
    notes: 'Tour de plantaciones, vinos y degustación. Full day trip por Tenerife.',
  },

  // ============================
  // STREET ART TOURS (2)
  // ============================
  {
    business_name: 'Puerto Street Art',
    category: 'excursions',
    subcategory: 'street-art',
    zone: 'norte',
    website: 'https://tenerifestreetart.org',
    source: 'web-search',
    status: 'new',
    notes: 'Museo de street art al aire libre en Puerto de la Cruz. Ruta autoguiada en 1 hora. Festival internacional.',
  },
  {
    business_name: 'Street Escape Tenerife',
    category: 'entertainment',
    subcategory: 'outdoor-escape',
    zone: 'metropolitana',
    website: 'https://streetskp.com',
    source: 'web-search',
    status: 'new',
    notes: 'Escape room callejero con realidad aumentada. Treasure hunt por Santa Cruz.',
  },

  // ============================
  // BOAT PARTIES (3)
  // ============================
  {
    business_name: 'Tenerife Boat Party',
    category: 'entertainment',
    subcategory: 'boat-party',
    zone: 'sur',
    website: 'https://tenerifeboat.party',
    source: 'web-search',
    status: 'new',
    notes: 'Boat party oficial. 3 horas con DJs, barra libre, swim stop. Desde Puerto Colón. 59€.',
  },
  {
    business_name: 'Utopia Parties Tenerife',
    category: 'entertainment',
    subcategory: 'boat-party',
    zone: 'sur',
    website: 'https://utopiaparties.com',
    source: 'web-search',
    status: 'new',
    notes: 'Mega boat party all-inclusive. DJs, barra libre, pool party en Kaluna Beach Club.',
  },
  {
    business_name: 'Insomnia Boat Party Tenerife',
    category: 'entertainment',
    subcategory: 'boat-party',
    zone: 'sur',
    website: 'https://boatpartytickets.com',
    source: 'web-search',
    status: 'new',
    notes: 'Boat party con DJs y free bar. Miércoles, viernes, sábados y domingos todo el año.',
  },
]

async function main() {
  console.log(`\n--- Scrape Niche Businesses --- Web Search Results`)
  console.log(`   Total leads to upsert: ${leads.length}\n`)

  // Get existing business names to avoid duplicates
  const { data: existing } = await sb
    .from('leads')
    .select('business_name')
  const existingNames = new Set((existing || []).map(e => e.business_name.toLowerCase().trim()))

  const newLeads = leads.filter(l => !existingNames.has(l.business_name.toLowerCase().trim()))
  const skipped = leads.length - newLeads.length
  if (skipped > 0) {
    console.log(`  Skipping ${skipped} leads that already exist in DB`)
  }

  if (newLeads.length === 0) {
    console.log('  No new leads to insert. All already exist.')
    return
  }

  // Insert in batches of 10
  const batchSize = 10
  let upserted = 0
  let errors = 0

  for (let i = 0; i < newLeads.length; i += batchSize) {
    const batch = newLeads.slice(i, i + batchSize)
    const { error } = await sb
      .from('leads')
      .insert(batch)

    if (error) {
      console.error(`  Batch ${Math.floor(i / batchSize) + 1} error:`, error.message)
      errors++
    } else {
      upserted += batch.length
      const names = batch.map(l => l.business_name).join(', ')
      console.log(`  Batch ${Math.floor(i / batchSize) + 1}: ${batch.length} leads (${names})`)
    }
  }

  console.log(`\n--- Results:`)
  console.log(`   Inserted: ${upserted}`)
  console.log(`   Skipped:  ${skipped}`)
  console.log(`   Errors:   ${errors}`)

  // Summary by category
  const byCat = newLeads.reduce((acc, l) => {
    acc[l.category] = (acc[l.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  console.log(`\n--- By category:`)
  for (const [cat, count] of Object.entries(byCat)) {
    console.log(`   ${cat}: ${count}`)
  }

  // Summary by subcategory
  const bySub = newLeads.reduce((acc, l) => {
    acc[l.subcategory] = (acc[l.subcategory] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  console.log(`\n--- By subcategory:`)
  for (const [sub, count] of Object.entries(bySub)) {
    console.log(`   ${sub}: ${count}`)
  }

  // Verify total in DB
  const { count: webSearchCount } = await sb
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .eq('source', 'web-search')

  console.log(`\n--- Total web-search leads in DB: ${webSearchCount}`)

  // Total leads in DB
  const { count: totalCount } = await sb
    .from('leads')
    .select('*', { count: 'exact', head: true })

  console.log(`   Total leads in DB: ${totalCount}`)
  console.log(`\n--- Done!\n`)
}

main().catch(console.error)
