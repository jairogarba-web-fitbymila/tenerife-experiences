import { createClient } from '@supabase/supabase-js'

const sb = createClient(
  'https://sqesgghvaazyajzjkoap.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxZXNnZ2h2YWF6eWFqemprb2FwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzUxMzgwOSwiZXhwIjoyMDg5MDg5ODA5fQ.UvbRfWU9seJPT9lyCyLmpD4uZrP9jXzsNoeSAjT9HnI'
)

/**
 * Restaurants scraped from web searches:
 * - "mejores restaurantes costa adeje"
 * - "guachinches tenerife norte abiertos"
 * - "restaurantes puerto de la cruz"
 * - "marisquerias tenerife"
 * - "restaurantes la laguna"
 * - "restaurantes estrella michelin tenerife"
 * - "mejores chiringuitos tenerife sur"
 */

const restaurants = [
  // === MICHELIN-STARRED / FINE DINING ===
  {
    business_name: 'Restaurante Donaire',
    category: 'restaurant',
    subcategory: 'fine-dining',
    zone: 'sur',
    website: 'https://restaurantedonaire.com',
    source: 'web-search',
    status: 'new' as const,
    priority: 'high' as const,
    notes: '1 estrella Michelin. Chef Jesús Camacho. Ubicado en GF Victoria, Costa Adeje.',
  },
  {
    business_name: 'San-Hô',
    category: 'restaurant',
    subcategory: 'fine-dining',
    zone: 'sur',
    website: 'https://www.gastrocorales.com/es-es/san-ho/',
    source: 'web-search',
    status: 'new' as const,
    priority: 'high' as const,
    notes: '1 estrella Michelin. Fusión japonesa-peruana-canaria. Chefs Adrián Bosch y Eduardo Domínguez.',
  },
  {
    business_name: 'Haydée by Víctor Suárez',
    category: 'restaurant',
    subcategory: 'fine-dining',
    zone: 'sur',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'high' as const,
    notes: '1 estrella Michelin. Chef Víctor Suárez. Adeje.',
  },
  {
    business_name: 'Il Bocconcino',
    category: 'restaurant',
    subcategory: 'fine-dining',
    zone: 'sur',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'high' as const,
    notes: '1 estrella Michelin. Chef Niki Pavanelli. Cocina italiana reinterpretada con productos locales.',
  },
  {
    business_name: 'M.B. Restaurante (Martín Berasategui)',
    category: 'restaurant',
    subcategory: 'fine-dining',
    zone: 'sur',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'high' as const,
    notes: '2 estrellas Michelin. Embajada de Martín Berasategui en Canarias. Hotel Ritz-Carlton Abama.',
  },
  {
    business_name: 'El Taller Seve Díaz',
    category: 'restaurant',
    subcategory: 'fine-dining',
    zone: 'norte',
    website: 'https://eltallersevediaz.com',
    source: 'web-search',
    status: 'new' as const,
    priority: 'high' as const,
    notes: '1 estrella Michelin. Puerto de la Cruz. Fusión mar y tierra canaria con influencias mediterráneas.',
  },

  // === COSTA ADEJE RESTAURANTS ===
  {
    business_name: 'El Cenador',
    category: 'restaurant',
    subcategory: 'fine-dining',
    zone: 'sur',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Bistronómico en Costa Adeje. Cocina de autor.',
  },
  {
    business_name: 'Duquesa Bistrò',
    category: 'restaurant',
    subcategory: 'international',
    zone: 'sur',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Bistronómico en Costa Adeje. Terraza popular entre turistas.',
  },
  {
    business_name: 'Picamar Tapas Bistrò',
    category: 'restaurant',
    subcategory: 'tapas',
    zone: 'sur',
    website: 'https://picamar-tapas-bistro.eatbu.com',
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Tapas y cocina bistró en Costa Adeje.',
  },
  {
    business_name: 'Restaurante Carlos',
    category: 'restaurant',
    subcategory: 'international',
    zone: 'sur',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Cocina española-portuguesa en Costa Adeje.',
  },
  {
    business_name: 'Pico Negro Cocktails & Grill',
    category: 'restaurant',
    subcategory: 'international',
    zone: 'sur',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Only adults. Restaurante con terraza en Costa Adeje.',
  },

  // === PUERTO DE LA CRUZ ===
  {
    business_name: 'Tasca Ihüey',
    category: 'restaurant',
    subcategory: 'canarian',
    zone: 'norte',
    website: 'https://ihueytasca.es',
    source: 'web-search',
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Barrio de La Ranilla, Puerto de la Cruz. Chefs Claudio Martínez y Melisa Mastroianni. Gastronomía canaria revisitada.',
  },
  {
    business_name: "Brunelli's Restaurant",
    category: 'restaurant',
    subcategory: 'international',
    zone: 'norte',
    website: 'https://brunellis.com',
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Steakhouse en Puerto de la Cruz. Vistas al océano. Chuletón, entrecôte, solomillo.',
  },
  {
    business_name: 'Bambi Gourmet',
    category: 'restaurant',
    subcategory: 'fine-dining',
    zone: 'norte',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Cocina creativa en casco antiguo de Puerto de la Cruz. Ingredientes frescos de temporada.',
  },
  {
    business_name: 'Olea Pintxos Bar',
    category: 'restaurant',
    subcategory: 'tapas',
    zone: 'norte',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Bar de pintxos en Puerto de la Cruz. Productos locales destacados.',
  },
  {
    business_name: 'Cumai',
    category: 'restaurant',
    subcategory: 'fine-dining',
    zone: 'norte',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Cocina creativa en Puerto de la Cruz.',
  },
  {
    business_name: 'Papa Teide',
    category: 'restaurant',
    subcategory: 'canarian',
    zone: 'norte',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Bistronómico canario-mediterráneo en Puerto de la Cruz.',
  },
  {
    business_name: 'Mare Nubium',
    category: 'restaurant',
    subcategory: 'international',
    zone: 'norte',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Cocina fusión moderna en Puerto de la Cruz.',
  },
  {
    business_name: 'Muxacho',
    category: 'restaurant',
    subcategory: 'canarian',
    zone: 'norte',
    website: 'https://www.covermanager.com/reservation/module_restaurant/restaurante-muxacho/spanish',
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Cocina tradicional española y mediterránea en Puerto de la Cruz.',
  },
  {
    business_name: 'El Limón Restaurante Vegano',
    category: 'restaurant',
    subcategory: 'international',
    zone: 'norte',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Restaurante vegetariano y vegano en Puerto de la Cruz. Nicho en crecimiento.',
  },

  // === MARISQUERIAS ===
  {
    business_name: 'Restaurante Los Abrigos',
    category: 'restaurant',
    subcategory: 'marisqueria',
    zone: 'sur',
    website: 'https://restaurantelosabrigos.com',
    source: 'web-search',
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Pescado y marisco fresco seleccionado diariamente. Pueblo costero de Los Abrigos.',
  },
  {
    business_name: 'Restaurante La Vieja',
    category: 'restaurant',
    subcategory: 'marisqueria',
    zone: 'sur',
    website: 'https://restaurantelavieja.com',
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Pescados y mariscos frescos de lonjas locales todo el año.',
  },
  {
    business_name: 'Los Roques',
    category: 'restaurant',
    subcategory: 'marisqueria',
    zone: 'sur',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Abierto desde 2005. Vistas al puerto de Los Abrigos. Destino gastronómico de referencia.',
  },
  {
    business_name: 'El Porrón Tasca Andaluza',
    category: 'restaurant',
    subcategory: 'marisqueria',
    zone: 'metropolitana',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Mariscos y pescados frescos en Santa Cruz de Tenerife.',
  },

  // === LA LAGUNA ===
  {
    business_name: 'La Tasca Faracho',
    category: 'restaurant',
    subcategory: 'tapas',
    zone: 'metropolitana',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Considerado el mejor restaurante de La Laguna. Tapas, croquetas y cocina canaria en casco histórico.',
  },
  {
    business_name: 'Restaurante Malaka',
    category: 'restaurant',
    subcategory: 'international',
    zone: 'metropolitana',
    website: 'https://malakarestaurant.com',
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Fusión asiática en centro histórico de La Laguna.',
  },
  {
    business_name: 'Guanchinch & Fusion',
    category: 'restaurant',
    subcategory: 'canarian',
    zone: 'metropolitana',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Cocina canaria tradicional con toques internacionales. Centro histórico de La Laguna.',
  },
  {
    business_name: 'La Abadía Gastrobar & Lounge',
    category: 'restaurant',
    subcategory: 'tapas',
    zone: 'metropolitana',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Cocina canaria y de fusión junto a Torre de la Concepción, La Laguna.',
  },
  {
    business_name: 'El Jinete Sin Cabeza',
    category: 'restaurant',
    subcategory: 'canarian',
    zone: 'metropolitana',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Cocina canaria tradicional. Detrás de la Catedral de La Laguna.',
  },
  {
    business_name: 'La Hormiga',
    category: 'restaurant',
    subcategory: 'canarian',
    zone: 'metropolitana',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Cocina canaria tradicional con toques creativos. Centro histórico La Laguna.',
  },
  {
    business_name: 'Restaurante Maquila',
    category: 'restaurant',
    subcategory: 'international',
    zone: 'metropolitana',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Cocina española e internacional en centro histórico La Laguna.',
  },
  {
    business_name: 'Cofradía de Bajamar',
    category: 'restaurant',
    subcategory: 'marisqueria',
    zone: 'metropolitana',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Uno de los mejores para pescado fresco en La Laguna. Zona costera.',
  },

  // === GUACHINCHES ===
  {
    business_name: 'Guachinche Los Gómez',
    category: 'restaurant',
    subcategory: 'guachinche',
    zone: 'norte',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'La Orotava. Guachinche popular con buenas reseñas.',
  },
  {
    business_name: 'Guachinche El Cubano',
    category: 'restaurant',
    subcategory: 'guachinche',
    zone: 'norte',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'La Orotava. Lema "del campo a la mesa". Cultivan sus propios productos.',
  },
  {
    business_name: 'Bodegón El Primero',
    category: 'restaurant',
    subcategory: 'guachinche',
    zone: 'norte',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Santa Úrsula. Comida casera auténtica, solomillo a la plancha, pescado frito.',
  },
  {
    business_name: 'Guachinche La Casona',
    category: 'restaurant',
    subcategory: 'guachinche',
    zone: 'norte',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'La Orotava. Finca rural con aparcamiento y vistas.',
  },
  {
    business_name: 'Guachinche La Huerta de Ana y Eva',
    category: 'restaurant',
    subcategory: 'guachinche',
    zone: 'norte',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'La Matanza. Especialidad: setas con almogrote, queso a la plancha, carne de cabra.',
  },
  {
    business_name: 'Guachinche La Cueva de Casiano',
    category: 'restaurant',
    subcategory: 'guachinche',
    zone: 'norte',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Tacoronte. Construido dentro de una cueva. Experiencia única.',
  },
  {
    business_name: 'Guachinche Romance',
    category: 'restaurant',
    subcategory: 'guachinche',
    zone: 'norte',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'La Orotava. Terraza, croquetas y carnes.',
  },
  {
    business_name: 'Guachinche La Viña',
    category: 'restaurant',
    subcategory: 'guachinche',
    zone: 'norte',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Los Realejos. Guachinche popular con buenas reseñas.',
  },
  {
    business_name: 'El Patio de Pedro',
    category: 'restaurant',
    subcategory: 'guachinche',
    zone: 'metropolitana',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'La Laguna. Cocina canaria tipo guachinche.',
  },

  // === CHIRINGUITOS ===
  {
    business_name: 'Chiringuito El Pirata',
    category: 'restaurant',
    subcategory: 'chiringuito',
    zone: 'sur',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Playa de La Tejita. Estilo slow-life, reggae. Ceviche, ensaladas, salpicón de atún.',
  },
  {
    business_name: 'Chiringuito Las Salinas',
    category: 'restaurant',
    subcategory: 'chiringuito',
    zone: 'sur',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Playa de las Américas. Famoso por sus mojitos.',
  },
  {
    business_name: 'Chiringuito El Cabezo',
    category: 'restaurant',
    subcategory: 'chiringuito',
    zone: 'sur',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Playa del Cabezo, El Médano. Zona de windsurf. Paella los fines de semana.',
  },
  {
    business_name: 'Mana Nui Beach Bar',
    category: 'restaurant',
    subcategory: 'chiringuito',
    zone: 'sur',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Costa del Silencio. Bar chill-out ecológico. Espacio protegido.',
  },
]

async function main() {
  console.log('=== Scrape Restaurants: Web Search Results ===\n')
  console.log(`Total restaurants to insert: ${restaurants.length}\n`)

  // 1. Check what already exists to avoid duplicates
  const { data: existing, error: fetchError } = await sb
    .from('leads')
    .select('business_name')
    .eq('category', 'restaurant')
    .eq('source', 'web-search')

  if (fetchError) {
    console.log('Note: Could not check existing web-search leads:', fetchError.message)
  }

  // Also check restaurants category (old format used 'restaurants')
  const { data: existingOld } = await sb
    .from('leads')
    .select('business_name')
    .in('category', ['restaurant', 'restaurants'])

  const existingNames = new Set([
    ...(existing || []).map((r) => r.business_name.toLowerCase()),
    ...(existingOld || []).map((r) => r.business_name.toLowerCase()),
  ])

  console.log(`Existing restaurant leads: ${existingNames.size}`)
  console.log('Existing:', [...existingNames].join(', '))
  console.log('')

  // 2. Filter out duplicates
  const newRestaurants = restaurants.filter(
    (r) => !existingNames.has(r.business_name.toLowerCase())
  )

  const skipped = restaurants.length - newRestaurants.length
  if (skipped > 0) {
    console.log(`Skipping ${skipped} restaurants that already exist.\n`)
  }

  if (newRestaurants.length === 0) {
    console.log('No new restaurants to insert. All already exist.')
    return
  }

  console.log(`Inserting ${newRestaurants.length} new restaurants...\n`)

  // 3. Upsert in batches
  const batchSize = 10
  let inserted = 0

  for (let i = 0; i < newRestaurants.length; i += batchSize) {
    const batch = newRestaurants.slice(i, i + batchSize)
    const { error } = await sb.from('leads').upsert(batch, {
      onConflict: 'business_name',
      ignoreDuplicates: true,
    })

    if (error) {
      // If upsert on business_name fails (no unique constraint), fall back to insert
      console.log(`  Batch ${Math.floor(i / batchSize) + 1}: upsert failed (${error.message}), trying insert...`)
      const { error: insertError } = await sb.from('leads').insert(batch)
      if (insertError) {
        console.error(`  ERROR batch ${Math.floor(i / batchSize) + 1}:`, insertError.message)
      } else {
        inserted += batch.length
        console.log(`  Inserted batch ${Math.floor(i / batchSize) + 1}: ${batch.length} restaurants`)
      }
    } else {
      inserted += batch.length
      console.log(`  Upserted batch ${Math.floor(i / batchSize) + 1}: ${batch.length} restaurants`)
    }
  }

  console.log(`\n✅ Successfully added ${inserted} new restaurant leads!\n`)

  // 4. Summary
  const subcategories = newRestaurants.reduce(
    (acc, r) => {
      acc[r.subcategory] = (acc[r.subcategory] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  console.log('By subcategory:')
  for (const [sub, count] of Object.entries(subcategories).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${sub}: ${count}`)
  }

  const zones = newRestaurants.reduce(
    (acc, r) => {
      acc[r.zone] = (acc[r.zone] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  console.log('\nBy zone:')
  for (const [zone, count] of Object.entries(zones).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${zone}: ${count}`)
  }

  const priorities = newRestaurants.reduce(
    (acc, r) => {
      acc[r.priority] = (acc[r.priority] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  console.log('\nBy priority:')
  for (const [pri, count] of Object.entries(priorities).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${pri}: ${count}`)
  }

  // 5. Final count
  const { count } = await sb
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .in('category', ['restaurant', 'restaurants'])

  console.log(`\nTotal restaurant leads in database: ${count}`)
}

main().catch(console.error)
