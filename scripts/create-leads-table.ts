import { createClient } from '@supabase/supabase-js'

const sb = createClient(
  'https://sqesgghvaazyajzjkoap.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxZXNnZ2h2YWF6eWFqemprb2FwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzUxMzgwOSwiZXhwIjoyMDg5MDg5ODA5fQ.UvbRfWU9seJPT9lyCyLmpD4uZrP9jXzsNoeSAjT9HnI'
)

const SQL_TO_RUN = `
CREATE TABLE IF NOT EXISTS public.leads (
  id uuid primary key default uuid_generate_v4(),
  business_name text not null,
  category text not null,
  subcategory text,
  zone text,
  address text,
  phone text,
  email text,
  website text,
  instagram text,
  google_rating numeric(2,1),
  google_reviews_count int,
  tripadvisor_rating numeric(2,1),
  source text default 'manual',
  status text not null default 'new' check (status in ('new', 'contacted', 'interested', 'negotiating', 'converted', 'rejected', 'later')),
  contact_attempts int default 0,
  last_contacted_at timestamptz,
  notes text,
  priority text default 'medium' check (priority in ('low', 'medium', 'high', 'urgent')),
  assigned_to text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_category ON public.leads(category);
CREATE INDEX IF NOT EXISTS idx_leads_zone ON public.leads(zone);
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
DROP TRIGGER IF EXISTS leads_updated_at ON public.leads;
CREATE TRIGGER leads_updated_at BEFORE UPDATE ON public.leads FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
`

const leads = [
  // === RESTAURANTS (8) ===
  {
    business_name: 'El Rincón de Juan Carlos',
    category: 'restaurants',
    subcategory: 'fine-dining',
    zone: 'sur',
    website: 'https://elrinconjuancarlos.com',
    instagram: '@elrinconjuancarlos',
    google_rating: 4.8,
    google_reviews_count: 1200,
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Restaurante con estrella Michelin en Los Gigantes. Alta prioridad para partnership premium.',
    source: 'manual',
  },
  {
    business_name: 'Nub Restaurante',
    category: 'restaurants',
    subcategory: 'fine-dining',
    zone: 'sur',
    website: 'https://nubrestaurante.com',
    instagram: '@nubrestaurante',
    google_rating: 4.7,
    google_reviews_count: 980,
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Restaurante con estrella Michelin en La Laguna. Cocina de autor.',
    source: 'manual',
  },
  {
    business_name: 'El Almar Playa San Juan',
    category: 'restaurants',
    subcategory: 'seafood',
    zone: 'sur',
    website: 'https://elalmar.es',
    google_rating: 4.5,
    google_reviews_count: 2100,
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Restaurante de mariscos frente al mar. Muy popular entre turistas.',
    source: 'manual',
  },
  {
    business_name: 'Masía del Mar',
    category: 'restaurants',
    subcategory: 'seafood',
    zone: 'sur',
    address: 'Playa de Las Américas',
    google_rating: 4.4,
    google_reviews_count: 1800,
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Restaurante de mariscos en Playa de Las Américas. Gran volumen de turistas.',
    source: 'manual',
  },
  {
    business_name: 'Molino Blanco',
    category: 'restaurants',
    subcategory: 'canarian',
    zone: 'sur',
    address: 'San Eugenio, Costa Adeje',
    google_rating: 4.3,
    google_reviews_count: 3200,
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Restaurante canario tradicional, muy conocido en la zona sur.',
    source: 'manual',
  },
  {
    business_name: 'La Cofradía de Pescadores',
    category: 'restaurants',
    subcategory: 'seafood',
    zone: 'norte',
    address: 'Puerto de la Cruz',
    google_rating: 4.6,
    google_reviews_count: 2800,
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Restaurante emblemático de Puerto de la Cruz. Pescado fresco del día.',
    source: 'manual',
  },
  {
    business_name: 'Restaurante Otelo',
    category: 'restaurants',
    subcategory: 'canarian',
    zone: 'norte',
    address: 'Puerto de la Cruz',
    google_rating: 4.5,
    google_reviews_count: 1500,
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Cocina canaria tradicional en Puerto de la Cruz.',
    source: 'manual',
  },
  {
    business_name: 'Tasca El Olivo',
    category: 'restaurants',
    subcategory: 'tapas',
    zone: 'metropolitana',
    address: 'La Laguna',
    google_rating: 4.6,
    google_reviews_count: 900,
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Tapas y cocina canaria en el casco histórico de La Laguna.',
    source: 'manual',
  },

  // === HOTELS (5) ===
  {
    business_name: 'Hotel Botánico & The Oriental Spa Garden',
    category: 'hotels',
    subcategory: 'luxury',
    zone: 'norte',
    website: 'https://hotelbotanico.com',
    instagram: '@hotelbotanico',
    google_rating: 4.6,
    google_reviews_count: 3500,
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Hotel 5 estrellas en Puerto de la Cruz. Referencia del turismo de lujo en el norte.',
    source: 'manual',
  },
  {
    business_name: 'The Ritz-Carlton, Abama',
    category: 'hotels',
    subcategory: 'luxury',
    zone: 'sur',
    website: 'https://ritzcarlton.com/abama',
    instagram: '@ritzcarltonabama',
    google_rating: 4.7,
    google_reviews_count: 4200,
    status: 'new' as const,
    priority: 'urgent' as const,
    notes: 'Hotel de lujo referencia en Tenerife. 2 restaurantes con estrella Michelin. Máxima prioridad.',
    source: 'manual',
  },
  {
    business_name: 'Hotel San Roque',
    category: 'hotels',
    subcategory: 'boutique',
    zone: 'norte',
    website: 'https://hotelsanroque.com',
    address: 'Garachico',
    google_rating: 4.5,
    google_reviews_count: 800,
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Hotel boutique en Garachico, pueblo histórico.',
    source: 'manual',
  },
  {
    business_name: 'Gran Meliá Palacio de Isora',
    category: 'hotels',
    subcategory: 'luxury',
    zone: 'sur',
    website: 'https://melia.com/palacio-de-isora',
    google_rating: 4.6,
    google_reviews_count: 5100,
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Resort 5 estrellas en Guía de Isora. Piscina infinity icónica.',
    source: 'manual',
  },
  {
    business_name: 'Iberostar Selection Anthelia',
    category: 'hotels',
    subcategory: 'resort',
    zone: 'sur',
    website: 'https://iberostar.com',
    address: 'Costa Adeje',
    google_rating: 4.5,
    google_reviews_count: 6200,
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Resort 5 estrellas todo incluido en Costa Adeje.',
    source: 'manual',
  },

  // === EXCURSION OPERATORS (5) ===
  {
    business_name: 'Freebird Catamarán',
    category: 'excursions',
    subcategory: 'boat-trips',
    zone: 'sur',
    website: 'https://freebirdone.com',
    instagram: '@freebirdcatamaran',
    google_rating: 4.7,
    google_reviews_count: 5500,
    status: 'new' as const,
    priority: 'urgent' as const,
    notes: 'Excursiones en catamarán con avistamiento de ballenas y delfines. Líder del sector.',
    source: 'manual',
  },
  {
    business_name: 'Tenerife Dolphin',
    category: 'excursions',
    subcategory: 'whale-watching',
    zone: 'sur',
    website: 'https://tenerifedolphin.com',
    google_rating: 4.8,
    google_reviews_count: 3200,
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Avistamiento de cetáceos desde Puerto Colón. Muy buenas reseñas.',
    source: 'manual',
  },
  {
    business_name: 'Marítima Acantilados',
    category: 'excursions',
    subcategory: 'boat-trips',
    zone: 'sur',
    website: 'https://maritimaacantilados.com',
    google_rating: 4.6,
    google_reviews_count: 1800,
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Excursiones a Los Gigantes y avistamiento de cetáceos.',
    source: 'manual',
  },
  {
    business_name: 'Teide by Night',
    category: 'excursions',
    subcategory: 'teide-tours',
    zone: 'centro',
    website: 'https://teidebynight.com',
    google_rating: 4.9,
    google_reviews_count: 2100,
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Tours nocturnos al Teide con observación de estrellas. Experiencia top.',
    source: 'manual',
  },
  {
    business_name: 'Volcano Teide Experience',
    category: 'excursions',
    subcategory: 'teide-tours',
    zone: 'centro',
    website: 'https://volcanoteide.com',
    instagram: '@volcanoteide',
    google_rating: 4.5,
    google_reviews_count: 8900,
    status: 'new' as const,
    priority: 'urgent' as const,
    notes: 'Teleférico del Teide y experiencias en el parque nacional. Partner estratégico clave.',
    source: 'manual',
  },

  // === WATER SPORTS (5) ===
  {
    business_name: 'Water Sports Tenerife',
    category: 'water-sports',
    subcategory: 'multi-activity',
    zone: 'sur',
    website: 'https://watersportstenerife.com',
    google_rating: 4.7,
    google_reviews_count: 1200,
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Jet ski, parasailing, banana boat en Costa Adeje.',
    source: 'manual',
  },
  {
    business_name: 'Ocean Jet Ski Tenerife',
    category: 'water-sports',
    subcategory: 'jet-ski',
    zone: 'sur',
    website: 'https://oceanjetskitenerife.com',
    google_rating: 4.8,
    google_reviews_count: 900,
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Alquiler de motos de agua en el sur de Tenerife.',
    source: 'manual',
  },
  {
    business_name: 'Atlantis Dive Center',
    category: 'water-sports',
    subcategory: 'diving',
    zone: 'sur',
    website: 'https://atlantisdiving.es',
    google_rating: 4.9,
    google_reviews_count: 1500,
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Centro de buceo con inmersiones en el pecio del Condesito y tortugas.',
    source: 'manual',
  },
  {
    business_name: 'Surf Life Tenerife',
    category: 'water-sports',
    subcategory: 'surfing',
    zone: 'sur',
    website: 'https://surflifetenerife.com',
    google_rating: 4.8,
    google_reviews_count: 700,
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Escuela de surf y SUP en Playa de Las Américas.',
    source: 'manual',
  },
  {
    business_name: 'Kayak Tenerife',
    category: 'water-sports',
    subcategory: 'kayak',
    zone: 'sur',
    website: 'https://kayaktenerife.com',
    google_rating: 4.7,
    google_reviews_count: 600,
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Excursiones en kayak por Los Gigantes y avistamiento de tortugas.',
    source: 'manual',
  },

  // === CAR RENTAL (3) ===
  {
    business_name: 'CICAR',
    category: 'car-rental',
    subcategory: 'general',
    zone: 'isla',
    website: 'https://cicar.com',
    instagram: '@cicar_canarias',
    google_rating: 4.3,
    google_reviews_count: 12000,
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Empresa canaria líder en alquiler de coches. Presencia en aeropuerto y toda la isla.',
    source: 'manual',
  },
  {
    business_name: 'AutoReisen',
    category: 'car-rental',
    subcategory: 'general',
    zone: 'isla',
    website: 'https://autoreisen.es',
    google_rating: 4.4,
    google_reviews_count: 5500,
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Empresa canaria de alquiler de coches con buenas valoraciones.',
    source: 'manual',
  },
  {
    business_name: 'TopCar',
    category: 'car-rental',
    subcategory: 'general',
    zone: 'isla',
    website: 'https://topcar.es',
    instagram: '@topcar_canarias',
    google_rating: 4.2,
    google_reviews_count: 8000,
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Alquiler de coches con amplia flota en Canarias.',
    source: 'manual',
  },

  // === WELLNESS & BODEGAS (4) ===
  {
    business_name: 'Bodegas Monje',
    category: 'wellness-bodegas',
    subcategory: 'winery',
    zone: 'norte',
    website: 'https://bodegasmonje.com',
    instagram: '@bodegasmonje',
    google_rating: 4.6,
    google_reviews_count: 2200,
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Bodega histórica en El Sauzal con visitas y catas. Experiencia enoturística top.',
    source: 'manual',
  },
  {
    business_name: 'Wanderlust Yoga Tenerife',
    category: 'wellness-bodegas',
    subcategory: 'yoga-retreat',
    zone: 'sur',
    website: 'https://wanderlustyogatenerife.com',
    instagram: '@wanderlustyogatfe',
    google_rating: 5.0,
    google_reviews_count: 300,
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Retiros de yoga y bienestar en el sur. Nicho en crecimiento.',
    source: 'manual',
  },
  {
    business_name: 'Bodegas Reverón',
    category: 'wellness-bodegas',
    subcategory: 'winery',
    zone: 'sur',
    website: 'https://bodegasreveron.com',
    google_rating: 4.5,
    google_reviews_count: 400,
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Bodega familiar en el sur con visitas guiadas y degustación.',
    source: 'manual',
  },
  {
    business_name: 'Thai Zen Spa',
    category: 'wellness-bodegas',
    subcategory: 'spa',
    zone: 'sur',
    address: 'Costa Adeje',
    website: 'https://thaizenspa.com',
    google_rating: 4.7,
    google_reviews_count: 1100,
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Spa y masajes tailandeses en Costa Adeje. Popular entre turistas.',
    source: 'manual',
  },
]

async function main() {
  console.log('Checking if leads table exists...')

  // Try to query the leads table
  const { error: checkError } = await sb.from('leads').select('id').limit(1)

  if (checkError && (checkError.code === '42P01' || checkError.code === 'PGRST205')) {
    // Table does not exist
    console.log('\n❌ The leads table does not exist yet.')
    console.log('\nPlease run the following SQL in the Supabase SQL Editor:')
    console.log('(The SQL has been copied to your clipboard)\n')

    // Copy SQL to clipboard
    const { execSync } = await import('child_process')
    try {
      execSync('pbcopy', { input: SQL_TO_RUN })
      console.log('✅ SQL copied to clipboard!')
    } catch {
      console.log('(Could not copy to clipboard automatically)')
    }

    console.log(SQL_TO_RUN)
    console.log('\nAfter creating the table, run this script again to seed the leads:')
    console.log('  npx tsx scripts/create-leads-table.ts')
    process.exit(1)
  }

  if (checkError) {
    console.log('Check error:', checkError)
  }

  console.log('✅ Leads table exists. Seeding data...\n')

  // Check if leads already exist
  const { count } = await sb.from('leads').select('*', { count: 'exact', head: true })

  if (count && count > 0) {
    console.log(`⚠️  Table already has ${count} leads. Skipping seed to avoid duplicates.`)
    console.log('   To re-seed, delete existing leads first.')
    process.exit(0)
  }

  // Insert leads in batches
  const batchSize = 10
  let inserted = 0

  for (let i = 0; i < leads.length; i += batchSize) {
    const batch = leads.slice(i, i + batchSize)
    const { error } = await sb.from('leads').insert(batch)

    if (error) {
      console.error(`Error inserting batch ${i / batchSize + 1}:`, error)
    } else {
      inserted += batch.length
      console.log(`  Inserted batch ${i / batchSize + 1}: ${batch.length} leads`)
    }
  }

  console.log(`\n✅ Successfully seeded ${inserted} leads!`)

  // Summary by category
  const categories = leads.reduce(
    (acc, lead) => {
      acc[lead.category] = (acc[lead.category] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  console.log('\nSummary by category:')
  for (const [cat, count] of Object.entries(categories)) {
    console.log(`  ${cat}: ${count}`)
  }

  // Summary by priority
  const priorities = leads.reduce(
    (acc, lead) => {
      acc[lead.priority] = (acc[lead.priority] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  console.log('\nSummary by priority:')
  for (const [pri, count] of Object.entries(priorities)) {
    console.log(`  ${pri}: ${count}`)
  }
}

main().catch(console.error)
