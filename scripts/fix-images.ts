import { createClient } from '@supabase/supabase-js'

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://sqesgghvaazyajzjkoap.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

async function fixImages() {
  console.log('Starting image fixes...\n')
  let updated = 0
  let failed = 0

  // 1. CICAR Rent a Car (partners table)
  {
    const newImage = 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80'
    const { data, error } = await sb
      .from('partners')
      .update({ image: newImage })
      .ilike('name', '%CICAR%')
      .select('id, name, image')
    if (error) {
      console.log(`FAIL - CICAR Rent a Car: ${error.message}`)
      failed++
    } else if (data && data.length > 0) {
      console.log(`OK - CICAR Rent a Car (partners): updated ${data.length} row(s) -> ${newImage}`)
      updated++
    } else {
      console.log(`SKIP - CICAR Rent a Car: no matching rows found`)
    }
  }

  // 2. Eco Whale Watching (items table)
  {
    const newImage = 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=800&q=80'
    const { data, error } = await sb
      .from('items')
      .update({ image: newImage })
      .eq('slug', 'eco-whale-watching-adeje')
      .select('id, name, image')
    if (error) {
      console.log(`FAIL - Eco Whale Watching: ${error.message}`)
      failed++
    } else if (data && data.length > 0) {
      console.log(`OK - Eco Whale Watching (items): updated -> ${newImage}`)
      updated++
    } else {
      console.log(`SKIP - Eco Whale Watching: no matching rows found`)
    }
  }

  // 3. Teide by Night (items table)
  {
    const newImage = 'https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=800&q=80'
    const { data, error } = await sb
      .from('items')
      .update({ image: newImage })
      .eq('slug', 'teide-by-night')
      .select('id, name, image')
    if (error) {
      console.log(`FAIL - Teide by Night: ${error.message}`)
      failed++
    } else if (data && data.length > 0) {
      console.log(`OK - Teide by Night (items): updated -> ${newImage}`)
      updated++
    } else {
      console.log(`SKIP - Teide by Night: no matching rows found`)
    }
  }

  // 4. Tour Privado en Helicoptero (items table)
  {
    const newImage = 'https://images.unsplash.com/photo-1534786676866-f3a38a0e0baa?w=800&q=80'
    const { data, error } = await sb
      .from('items')
      .update({ image: newImage })
      .eq('slug', 'private-helicopter-tour')
      .select('id, name, image')
    if (error) {
      console.log(`FAIL - Private Helicopter Tour: ${error.message}`)
      failed++
    } else if (data && data.length > 0) {
      console.log(`OK - Private Helicopter Tour (items): updated -> ${newImage}`)
      updated++
    } else {
      console.log(`SKIP - Private Helicopter Tour: no matching rows found`)
    }
  }

  // 5. Piscinas naturales secretas (articles table)
  {
    const newImage = 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80'
    const { data, error } = await sb
      .from('articles')
      .update({ image: newImage })
      .eq('slug', 'piscinas-naturales-tenerife-secretas')
      .select('id, title, image')
    if (error) {
      console.log(`FAIL - Piscinas naturales: ${error.message}`)
      failed++
    } else if (data && data.length > 0) {
      console.log(`OK - Piscinas naturales (articles): updated -> ${newImage}`)
      updated++
    } else {
      console.log(`SKIP - Piscinas naturales: no matching rows found`)
    }
  }

  // 6. Centro de Tenerife area (areas table) - try slug 'centro' first, then region 'central'
  {
    const newImage = 'https://images.unsplash.com/photo-1506368387824-6cf9848c1638?w=1200&q=80'

    // Try by slug containing 'centro'
    const { data, error } = await sb
      .from('areas')
      .update({ image: newImage })
      .ilike('slug', '%centro%')
      .select('id, name, image')

    if (error) {
      console.log(`FAIL - Centro area (by slug): ${error.message}`)
      failed++
    } else if (data && data.length > 0) {
      console.log(`OK - Centro area (areas, by slug): updated ${data.length} row(s) -> ${newImage}`)
      updated++
    } else {
      // Fallback: try by region = 'central'
      console.log(`  Centro area not found by slug, trying region = 'central'...`)
      const res = await sb
        .from('areas')
        .update({ image: newImage })
        .eq('region', 'central')
        .select('id, name, image')
      if (res.error) {
        console.log(`FAIL - Centro area (by region): ${res.error.message}`)
        failed++
      } else if (res.data && res.data.length > 0) {
        console.log(`OK - Centro area (areas, by region='central'): updated ${res.data.length} row(s) -> ${newImage}`)
        updated++
      } else {
        // Last try: name containing 'centro'
        const res2 = await sb
          .from('areas')
          .update({ image: newImage })
          .ilike('name', '%centro%')
          .select('id, name, image')
        if (res2.error) {
          console.log(`FAIL - Centro area (by name): ${res2.error.message}`)
          failed++
        } else if (res2.data && res2.data.length > 0) {
          console.log(`OK - Centro area (areas, by name): updated ${res2.data.length} row(s) -> ${newImage}`)
          updated++
        } else {
          console.log(`SKIP - Centro area: no matching rows found by slug, region, or name`)
        }
      }
    }
  }

  console.log(`\nDone! Updated: ${updated}, Failed: ${failed}`)
}

fixImages().catch(console.error)
