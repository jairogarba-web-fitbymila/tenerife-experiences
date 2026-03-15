import { createClient } from '@supabase/supabase-js'
const sb = createClient('https://sqesgghvaazyajzjkoap.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxZXNnZ2h2YWF6eWFqemprb2FwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzUxMzgwOSwiZXhwIjoyMDg5MDg5ODA5fQ.UvbRfWU9seJPT9lyCyLmpD4uZrP9jXzsNoeSAjT9HnI')

async function main() {
  const updates: Record<string, string> = {
    // Beach clubs - luxury pool/beach photos
    'monkey-beach-club': 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=80',
    'hard-rock-cafe-tenerife': 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200&q=80',
    'kaluna-beach-club': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80',
    'papagayo-beach-club': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
    'le-club-tenerife': 'https://images.unsplash.com/photo-1572331165267-854da2b021b1?w=1200&q=80',

    // Clubs - neon/dance floor photos
    'papagayo-disco': 'https://images.unsplash.com/photo-1571266028243-d220e15cdeff?w=1200&q=80',
    'achaman-club': 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=1200&q=80',
    'blanco-bar': 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&q=80',
    'kiu-disco': 'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=1200&q=80',
    'veronicas-strip': 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=1200&q=80',
    'la-noria-santa-cruz': 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200&q=80',

    // Festivals - crowd/stage photos
    'sunblast-festival': 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&q=80',
    'mueca-festival': 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200&q=80',
    'arona-summer-festival': 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200&q=80',
    'festival-musica-canarias': 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1200&q=80',
    'gff-garachico-film-festival': 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200&q=80',
    'phe-festival': 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200&q=80',

    // Bars - craft beer/cocktails
    'bulan-craft-beer': 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=1200&q=80',
    'the-outsider-pub': 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200&q=80',
    'el-aguarde': 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=1200&q=80',

    // Live music
    'hard-rock-cafe-live': 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80',
    'berlina-cafe': 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=1200&q=80',
  }

  let count = 0
  for (const [slug, image] of Object.entries(updates)) {
    const { error } = await sb.from('items').update({ image }).eq('slug', slug)
    if (!error) count++
  }
  console.log(`Updated ${count}/${Object.keys(updates).length} nightlife images`)
}

main()
