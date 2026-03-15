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
}

const leads: Lead[] = [
  // ============================
  // EXCURSIONS - Boat trips (8)
  // ============================
  {
    business_name: 'White Tenerife',
    category: 'excursions',
    subcategory: 'boat-trips',
    zone: 'sur',
    website: 'https://whitetenerife.com',
    source: 'web-search',
    status: 'new',
  },
  {
    business_name: 'Neptuno Whales',
    category: 'excursions',
    subcategory: 'boat-trips',
    zone: 'sur',
    website: 'https://neptunowhales.com',
    source: 'web-search',
    status: 'new',
  },
  {
    business_name: 'Nattivus Tenerife',
    category: 'excursions',
    subcategory: 'boat-trips',
    zone: 'sur',
    website: 'https://www.nattivus.com',
    source: 'web-search',
    status: 'new',
  },
  {
    business_name: 'Tenerife Eco Tours',
    category: 'excursions',
    subcategory: 'boat-trips',
    zone: 'sur',
    website: 'https://tenerifecotours.com',
    source: 'web-search',
    status: 'new',
  },
  {
    business_name: 'SailWiz Tenerife',
    category: 'excursions',
    subcategory: 'boat-trips',
    zone: 'sur',
    website: 'https://www.sailwiz.com',
    source: 'web-search',
    status: 'new',
  },

  // ============================
  // EXCURSIONS - Whale watching (6)
  // ============================
  {
    business_name: 'Whale Watch Tenerife',
    category: 'excursions',
    subcategory: 'whale-watching',
    zone: 'sur',
    website: 'https://whalewatchtenerife.org',
    source: 'web-search',
    status: 'new',
  },
  {
    business_name: 'Third Element Charters',
    category: 'excursions',
    subcategory: 'whale-watching',
    zone: 'sur',
    website: 'https://thirdelementcharters.com',
    source: 'web-search',
    status: 'new',
  },
  {
    business_name: 'Whale Express',
    category: 'excursions',
    subcategory: 'whale-watching',
    zone: 'sur',
    website: 'https://whaleexpress.com',
    source: 'web-search',
    status: 'new',
  },
  {
    business_name: 'Biosean Whale Watching',
    category: 'excursions',
    subcategory: 'whale-watching',
    zone: 'sur',
    website: 'https://biosean.com',
    source: 'web-search',
    status: 'new',
  },
  {
    business_name: 'Tenerife Whale Watching',
    category: 'excursions',
    subcategory: 'whale-watching',
    zone: 'sur',
    website: 'https://www.tenerifewhalewatching.com',
    source: 'web-search',
    status: 'new',
  },
  {
    business_name: 'Whale Watching Tenerife Eco',
    category: 'excursions',
    subcategory: 'whale-watching',
    zone: 'sur',
    website: 'https://whalewatchingtenerife.com',
    source: 'web-search',
    status: 'new',
  },

  // ============================
  // WATER SPORTS - Surf schools (7)
  // ============================
  {
    business_name: 'Tenerife Surf School - Friends of the Ocean',
    category: 'water-sports',
    subcategory: 'surfing',
    zone: 'sur',
    website: 'https://www.tenerifesurfing.com',
    source: 'web-search',
    status: 'new',
  },
  {
    business_name: 'Ocadila Surf School',
    category: 'water-sports',
    subcategory: 'surfing',
    zone: 'norte',
    website: 'https://ocadilasurfschool.com',
    source: 'web-search',
    status: 'new',
  },
  {
    business_name: 'Extreme Tenerife Surf',
    category: 'water-sports',
    subcategory: 'surfing',
    zone: 'sur',
    website: 'https://extremetenerife.com',
    source: 'web-search',
    status: 'new',
  },
  {
    business_name: 'Ika Ika Surf School',
    category: 'water-sports',
    subcategory: 'surfing',
    zone: 'sur',
    website: 'https://ikaikasurfschooltenerife.com',
    source: 'web-search',
    status: 'new',
  },
  {
    business_name: 'Ocean Freaks Surf School',
    category: 'water-sports',
    subcategory: 'surfing',
    zone: 'sur',
    website: 'https://www.oceanfreaks.world',
    source: 'web-search',
    status: 'new',
  },
  {
    business_name: 'Ocean Life Surf School',
    category: 'water-sports',
    subcategory: 'surfing',
    zone: 'sur',
    website: 'https://www.oceanlifesurfschool.com',
    source: 'web-search',
    status: 'new',
  },
  {
    business_name: 'Shaka Surf Tenerife',
    category: 'water-sports',
    subcategory: 'surfing',
    zone: 'sur',
    website: 'https://www.shakasurftenerife.com',
    source: 'web-search',
    status: 'new',
  },

  // ============================
  // WATER SPORTS - Diving (7)
  // ============================
  {
    business_name: 'Diving Atlantis',
    category: 'water-sports',
    subcategory: 'diving',
    zone: 'sur',
    website: 'https://divingatlantis.com',
    source: 'web-search',
    status: 'new',
  },
  {
    business_name: 'Big Fish Tenerife Dive Center',
    category: 'water-sports',
    subcategory: 'diving',
    zone: 'sur',
    website: 'https://bigfishtenerife.com',
    source: 'web-search',
    status: 'new',
  },
  {
    business_name: 'Diving Center OLA',
    category: 'water-sports',
    subcategory: 'diving',
    zone: 'sur',
    website: 'https://tenerife-diving.club',
    source: 'web-search',
    status: 'new',
  },
  {
    business_name: 'Ocean Trek Diving School',
    category: 'water-sports',
    subcategory: 'diving',
    zone: 'sur',
    website: 'https://tenerife-diving.com',
    source: 'web-search',
    status: 'new',
  },
  {
    business_name: 'One Two Dive Tenerife',
    category: 'water-sports',
    subcategory: 'diving',
    zone: 'sur',
    website: 'https://onetwodive.com',
    source: 'web-search',
    status: 'new',
  },
  {
    business_name: 'Wet Monster Dive Center',
    category: 'water-sports',
    subcategory: 'diving',
    zone: 'sur',
    website: 'https://wetmonster.com',
    source: 'web-search',
    status: 'new',
  },
  {
    business_name: 'Tenerife Diving Academy',
    category: 'water-sports',
    subcategory: 'diving',
    zone: 'sur',
    website: 'https://tenerifedivingacademy.com',
    source: 'web-search',
    status: 'new',
  },
  {
    business_name: 'Aqua-Marina Dive Center',
    category: 'water-sports',
    subcategory: 'diving',
    zone: 'sur',
    website: 'https://aqua-marina.com',
    source: 'web-search',
    status: 'new',
  },
  {
    business_name: 'Blackstone Dive Center',
    category: 'water-sports',
    subcategory: 'diving',
    zone: 'sur',
    website: 'https://www.blackstonedivecenter.com',
    source: 'web-search',
    status: 'new',
  },

  // ============================
  // WATER SPORTS - Jet ski (4)
  // ============================
  {
    business_name: 'Radikal Jet Ski',
    category: 'water-sports',
    subcategory: 'jet-ski',
    zone: 'sur',
    website: 'https://radikaljetski.com',
    source: 'web-search',
    status: 'new',
  },
  {
    business_name: 'Turbo Jet Ski Tenerife',
    category: 'water-sports',
    subcategory: 'jet-ski',
    zone: 'sur',
    website: 'https://www.turbojetski.es',
    source: 'web-search',
    status: 'new',
  },
  {
    business_name: 'WOW Tenerife Watersports',
    category: 'water-sports',
    subcategory: 'jet-ski',
    zone: 'sur',
    website: 'https://tenerifeworldofwatersports.com',
    source: 'web-search',
    status: 'new',
  },
  {
    business_name: 'Tenerife Adventures Jet Ski',
    category: 'water-sports',
    subcategory: 'jet-ski',
    zone: 'sur',
    website: 'https://tenerife-adventures.com',
    source: 'web-search',
    status: 'new',
  },

  // ============================
  // CAR RENTAL (5)
  // ============================
  {
    business_name: 'Autos Jocar',
    category: 'car-rental',
    subcategory: 'general',
    zone: 'isla',
    website: 'https://www.autosjocar.com',
    source: 'web-search',
    status: 'new',
  },
  {
    business_name: 'Cabrera Medina',
    category: 'car-rental',
    subcategory: 'general',
    zone: 'isla',
    website: 'https://www.cabreramedina.com',
    source: 'web-search',
    status: 'new',
  },
  {
    business_name: 'Europcar Tenerife',
    category: 'car-rental',
    subcategory: 'general',
    zone: 'isla',
    website: 'https://www.europcar.com',
    source: 'web-search',
    status: 'new',
  },
  {
    business_name: 'Canarias.com Rent a Car',
    category: 'car-rental',
    subcategory: 'general',
    zone: 'isla',
    website: 'https://rentacar.canarias.com',
    source: 'web-search',
    status: 'new',
  },
  {
    business_name: 'OK Mobility Tenerife',
    category: 'car-rental',
    subcategory: 'general',
    zone: 'isla',
    website: 'https://okmobility.com',
    source: 'web-search',
    status: 'new',
  },

  // ============================
  // TRANSFER (6)
  // ============================
  {
    business_name: 'Suntransfers Tenerife',
    category: 'transfer',
    subcategory: 'airport-transfer',
    zone: 'isla',
    website: 'https://www.suntransfers.com',
    source: 'web-search',
    status: 'new',
  },
  {
    business_name: 'Chofix Transfers',
    category: 'transfer',
    subcategory: 'airport-transfer',
    zone: 'isla',
    website: 'https://www.chofix.com',
    source: 'web-search',
    status: 'new',
  },
  {
    business_name: 'Canary Shuttle',
    category: 'transfer',
    subcategory: 'airport-transfer',
    zone: 'isla',
    website: 'https://www.canaryshuttle.com',
    source: 'web-search',
    status: 'new',
  },
  {
    business_name: 'Inpe Transfer',
    category: 'transfer',
    subcategory: 'airport-transfer',
    zone: 'isla',
    website: 'https://www.inpetransfer.com',
    source: 'web-search',
    status: 'new',
  },
  {
    business_name: 'Holiday Taxis Tenerife',
    category: 'transfer',
    subcategory: 'airport-transfer',
    zone: 'isla',
    website: 'https://www.holidaytaxis.com',
    source: 'web-search',
    status: 'new',
  },
  {
    business_name: 'Shuttle Spain Transfers Tenerife',
    category: 'transfer',
    subcategory: 'airport-transfer',
    zone: 'isla',
    website: 'https://www.shuttlespaintransfers.com',
    source: 'web-search',
    status: 'new',
  },

  // ============================
  // WELLNESS - Yoga retreats (6)
  // ============================
  {
    business_name: 'Mandala de Masca Yoga Retreat',
    category: 'wellness',
    subcategory: 'yoga-retreat',
    zone: 'norte',
    website: 'https://www.mandalademasca.com',
    source: 'web-search',
    status: 'new',
  },
  {
    business_name: 'Purple Valley Yoga Tenerife',
    category: 'wellness',
    subcategory: 'yoga-retreat',
    zone: 'sur',
    website: 'https://yogagoa.com/tenerife-retreats/',
    source: 'web-search',
    status: 'new',
  },
  {
    business_name: 'Wanderlust Yoga Tenerife',
    category: 'wellness',
    subcategory: 'yoga-retreat',
    zone: 'norte',
    website: 'https://www.wanderlustyoga.info',
    source: 'web-search',
    status: 'new',
  },
  {
    business_name: 'Bliss Yoga Retreats Tenerife',
    category: 'wellness',
    subcategory: 'yoga-retreat',
    zone: 'metropolitana',
    website: 'https://www.blissyogaretreats.co.uk',
    source: 'web-search',
    status: 'new',
  },
  {
    business_name: 'Yoga Escapes Tenerife',
    category: 'wellness',
    subcategory: 'yoga-retreat',
    zone: 'sur',
    website: 'https://www.yoga-escapes.com',
    source: 'web-search',
    status: 'new',
  },
  {
    business_name: 'Dharmanas Yoga Tenerife',
    category: 'wellness',
    subcategory: 'yoga-retreat',
    zone: 'sur',
    website: 'https://www.dharmanasyoga.com',
    source: 'web-search',
    status: 'new',
  },

  // ============================
  // WELLNESS - Spa (3)
  // ============================
  {
    business_name: 'Wellness Canarias Spa',
    category: 'wellness',
    subcategory: 'spa',
    zone: 'sur',
    website: 'https://www.wellnesscanarias.com',
    source: 'web-search',
    status: 'new',
  },
  {
    business_name: 'Iberostar Sábila Spa',
    category: 'wellness',
    subcategory: 'spa',
    zone: 'sur',
    website: 'https://local-experiences.iberostar.com',
    source: 'web-search',
    status: 'new',
  },
  {
    business_name: 'Bahía del Duque Family Spa',
    category: 'wellness',
    subcategory: 'spa',
    zone: 'sur',
    website: 'https://thetaishotels.com',
    source: 'web-search',
    status: 'new',
  },

  // ============================
  // ADVENTURE - Paragliding (5)
  // ============================
  {
    business_name: 'Tenerfly Parapente',
    category: 'adventure',
    subcategory: 'paragliding',
    zone: 'sur',
    website: 'https://www.tenerfly.com',
    source: 'web-search',
    status: 'new',
  },
  {
    business_name: 'Day Dream Paragliding',
    category: 'adventure',
    subcategory: 'paragliding',
    zone: 'sur',
    website: 'https://daydreamparagliding.es',
    source: 'web-search',
    status: 'new',
  },
  {
    business_name: 'Lets Fly Tenerife',
    category: 'adventure',
    subcategory: 'paragliding',
    zone: 'sur',
    website: 'https://letsflytenerife.com',
    source: 'web-search',
    status: 'new',
  },
  {
    business_name: 'Enminube Parapente Tenerife',
    category: 'adventure',
    subcategory: 'paragliding',
    zone: 'norte',
    website: 'https://enminubeparapente.com',
    source: 'web-search',
    status: 'new',
  },
  {
    business_name: 'Overfly Tenerife',
    category: 'adventure',
    subcategory: 'paragliding',
    zone: 'sur',
    website: 'https://overflytenerife.com',
    source: 'web-search',
    status: 'new',
  },
]

async function main() {
  console.log(`\n🔍 Scrape Activities — Web Search Results`)
  console.log(`   Total leads to upsert: ${leads.length}\n`)

  // Get existing business names to avoid duplicates (manual dedup since no unique constraint)
  const { data: existing } = await sb
    .from('leads')
    .select('business_name')
  const existingNames = new Set((existing || []).map(e => e.business_name))

  const newLeads = leads.filter(l => !existingNames.has(l.business_name))
  const skipped = leads.length - newLeads.length
  if (skipped > 0) {
    console.log(`  ⏭️  Skipping ${skipped} leads that already exist in DB`)
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
      console.error(`  ❌ Batch ${Math.floor(i / batchSize) + 1} error:`, error.message)
      errors++
    } else {
      upserted += batch.length
      const names = batch.map(l => l.business_name).join(', ')
      console.log(`  ✅ Batch ${Math.floor(i / batchSize) + 1}: ${batch.length} leads (${names})`)
    }
  }

  console.log(`\n📊 Results:`)
  console.log(`   Upserted: ${upserted}`)
  console.log(`   Errors:   ${errors}`)

  // Summary by category
  const byCat = leads.reduce((acc, l) => {
    acc[l.category] = (acc[l.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  console.log(`\n📂 By category:`)
  for (const [cat, count] of Object.entries(byCat)) {
    console.log(`   ${cat}: ${count}`)
  }

  // Summary by subcategory
  const bySub = leads.reduce((acc, l) => {
    acc[l.subcategory] = (acc[l.subcategory] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  console.log(`\n🏷️  By subcategory:`)
  for (const [sub, count] of Object.entries(bySub)) {
    console.log(`   ${sub}: ${count}`)
  }

  // Verify total in DB
  const { count } = await sb
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .eq('source', 'web-search')

  console.log(`\n🗄️  Total web-search leads in DB: ${count}`)

  // Total leads in DB
  const { count: totalCount } = await sb
    .from('leads')
    .select('*', { count: 'exact', head: true })

  console.log(`   Total leads in DB: ${totalCount}`)
  console.log(`\n✅ Done!\n`)
}

main().catch(console.error)
