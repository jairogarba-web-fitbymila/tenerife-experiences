import { createClient } from '@supabase/supabase-js'

const sb = createClient(
  'https://sqesgghvaazyajzjkoap.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxZXNnZ2h2YWF6eWFqemprb2FwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzUxMzgwOSwiZXhwIjoyMDg5MDg5ODA5fQ.UvbRfWU9seJPT9lyCyLmpD4uZrP9jXzsNoeSAjT9HnI'
)

async function main() {
  // Get all items
  const { data: items } = await sb.from('items').select('id, slug, image')
  console.log('Items in DB:', items?.map(i => i.slug).join(', '))

  // Update images for items that exist
  const updates: Record<string, string> = {
    'whale-watching-catamaran': 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=1200&q=80',
    'private-yacht-whale-watching': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80',
    'eco-whale-watching': 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=1200&q=80',
    'teide-stargazing': 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80',
    'teide-sunrise-cable-car': 'https://images.unsplash.com/photo-1547234935-80c7145ec969?w=1200&q=80',
    'playa-del-duque': 'https://images.unsplash.com/photo-1559511260-66a654ae982a?w=1200&q=80',
    'playa-de-las-teresitas': 'https://images.unsplash.com/photo-1580137189272-c9379f8864fd?w=1200&q=80',
    'playa-de-benijo': 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=80',
    'playa-la-tejita': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
    'masca-valley': 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=80',
    'anaga-laurel-forest': 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=80',
    'siam-park': 'https://images.unsplash.com/photo-1565275945520-e79e0fd6bf46?w=1200&q=80',
    'loro-parque': 'https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=1200&q=80',
    'el-rincon-de-juan-carlos': 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80',
    'nub': 'https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?w=1200&q=80',
  }

  for (const [slug, image] of Object.entries(updates)) {
    const { error, count } = await sb.from('items').update({ image }).eq('slug', slug)
    if (error) console.log(`  Error ${slug}:`, error.message)
    else console.log(`  Updated: ${slug}`)
  }

  console.log('\nDone!')
}

main()
