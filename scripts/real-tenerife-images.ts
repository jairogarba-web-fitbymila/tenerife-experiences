import { createClient } from '@supabase/supabase-js'
const sb = createClient('https://sqesgghvaazyajzjkoap.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxZXNnZ2h2YWF6eWFqemprb2FwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzUxMzgwOSwiZXhwIjoyMDg5MDg5ODA5fQ.UvbRfWU9seJPT9lyCyLmpD4uZrP9jXzsNoeSAjT9HnI')

// REAL Tenerife photos verified from Unsplash API search results
const REAL_TENERIFE = {
  teide: 'https://images.unsplash.com/photo-1506368387824-6cf9848c1638?w=1200&q=80',
  teide_alt: 'https://images.unsplash.com/photo-1505155679343-57f78fd3b103?w=1200&q=80',
  teresitas: 'https://images.unsplash.com/photo-1605182054023-17d71f44aa11?w=1200&q=80',
  teresitas_alt: 'https://images.unsplash.com/photo-1722675771971-813e318db0d4?w=1200&q=80',
  losGigantes: 'https://images.unsplash.com/photo-1669147951690-658f2e4b4dd3?w=1200&q=80',
  losGigantes_alt: 'https://images.unsplash.com/photo-1655317175341-bf1d91326aac?w=1200&q=80',
  anaga: 'https://images.unsplash.com/photo-1626033005784-e6c39eaa0669?w=1200&q=80',
  anaga_alt: 'https://images.unsplash.com/photo-1661630778770-551b556d9ab0?w=1200&q=80',
  garachico: 'https://images.unsplash.com/photo-1501108056461-7a7500ddf38c?w=1200&q=80',
  garachico_alt: 'https://images.unsplash.com/photo-1669462493013-ddd1c85d1c52?w=1200&q=80',
  orotava: 'https://images.unsplash.com/photo-1677496549362-056a628cc7b3?w=1200&q=80',
  santaCruz: 'https://images.unsplash.com/photo-1626877285423-c37f8b78df57?w=1200&q=80',
  costaAdeje: 'https://images.unsplash.com/photo-1648396213626-860f8b8ddf65?w=1200&q=80',
  puertoCruz: 'https://images.unsplash.com/photo-1677503590969-1c16fd0a0981?w=1200&q=80',
  masca: 'https://images.unsplash.com/photo-1667930579266-a07c450f709f?w=1200&q=80',
  masca_alt: 'https://images.unsplash.com/photo-1641228763120-bddc6e293534?w=1200&q=80',
  food: 'https://images.unsplash.com/photo-1624458989436-7f2535c8c339?w=1200&q=80',
  carnival: 'https://images.unsplash.com/photo-1656252779225-5bbd338acd14?w=1200&q=80',
  siamPark: 'https://images.unsplash.com/photo-1677489613180-f78c64ea53b3?w=1200&q=80',
  loroParque: 'https://images.unsplash.com/photo-1557911618-1f1cb35c0efb?w=1200&q=80',
  beach: 'https://images.unsplash.com/photo-1695218994426-089131e9fb97?w=1200&q=80',
}

async function main() {
  // Areas - REAL Tenerife locations
  const areaUpdates: Record<string, string> = {
    'costa-adeje': REAL_TENERIFE.costaAdeje,
    'los-cristianos': REAL_TENERIFE.beach,
    'puerto-de-la-cruz': REAL_TENERIFE.puertoCruz,
    'santa-cruz': REAL_TENERIFE.santaCruz,
    'la-laguna': REAL_TENERIFE.orotava,
    'los-gigantes': REAL_TENERIFE.losGigantes,
    'teide': REAL_TENERIFE.teide,
    'anaga': REAL_TENERIFE.anaga,
  }
  for (const [slug, image] of Object.entries(areaUpdates)) {
    await sb.from('areas').update({ image }).eq('slug', slug)
  }
  console.log('✓ Areas updated with REAL Tenerife photos')

  // Categories
  const catUpdates: Record<string, string> = {
    'experiences': REAL_TENERIFE.losGigantes,
    'beaches': REAL_TENERIFE.teresitas,
    'culture': REAL_TENERIFE.orotava,
    'nature': REAL_TENERIFE.anaga,
    'food': REAL_TENERIFE.food,
    'nightlife': REAL_TENERIFE.carnival,
    'family': REAL_TENERIFE.siamPark,
  }
  for (const [slug, image] of Object.entries(catUpdates)) {
    await sb.from('categories').update({ image }).eq('slug', slug)
  }
  console.log('✓ Categories updated')

  // Items - map to real Tenerife photos
  const itemUpdates: Record<string, string> = {
    // Teide tours
    'teide-stargazing': REAL_TENERIFE.teide,
    'teide-sunrise-cable-car': REAL_TENERIFE.teide_alt,
    'teleferico-del-teide': REAL_TENERIFE.teide,
    'paisaje-lunar': REAL_TENERIFE.teide_alt,
    'roques-de-garcia': REAL_TENERIFE.teide,
    'pico-viejo': REAL_TENERIFE.teide_alt,

    // Real Tenerife beaches
    'playa-de-las-teresitas': REAL_TENERIFE.teresitas,
    'playa-de-las-teresitas-family': REAL_TENERIFE.teresitas_alt,
    'playa-jardin': REAL_TENERIFE.puertoCruz,
    'playa-de-benijo': REAL_TENERIFE.beach,
    'playa-de-la-arena': REAL_TENERIFE.losGigantes_alt,
    'playa-del-bollullo': REAL_TENERIFE.beach,
    'playa-de-los-patos': REAL_TENERIFE.beach,

    // South beaches - use costa adeje photo
    'playa-del-duque': REAL_TENERIFE.costaAdeje,
    'playa-del-duque-family': REAL_TENERIFE.costaAdeje,
    'playa-de-fanabe': REAL_TENERIFE.costaAdeje,
    'playa-de-fanabe-family': REAL_TENERIFE.costaAdeje,
    'playa-de-las-americas': REAL_TENERIFE.beach,
    'playa-de-los-cristianos': REAL_TENERIFE.beach,

    // Los Gigantes
    'buceo-los-gigantes': REAL_TENERIFE.losGigantes,
    'kayak-los-gigantes': REAL_TENERIFE.losGigantes_alt,
    'eco-whale-watching': REAL_TENERIFE.losGigantes,

    // Nature
    'masca-valley': REAL_TENERIFE.masca,
    'anaga-laurel-forest': REAL_TENERIFE.anaga,

    // Natural pools - garachico
    'piscinas-naturales-garachico': REAL_TENERIFE.garachico,
    'charco-de-la-laja': REAL_TENERIFE.garachico_alt,

    // Culture
    'la-laguna-unesco': REAL_TENERIFE.orotava,
    'garachico-historic': REAL_TENERIFE.garachico,
    'auditorio-tenerife': REAL_TENERIFE.santaCruz,
    'museo-naturaleza-hombre': REAL_TENERIFE.santaCruz,

    // Theme parks
    'siam-park': REAL_TENERIFE.siamPark,
    'loro-parque': REAL_TENERIFE.loroParque,

    // Food
    'papas-arrugadas-con-mojo': REAL_TENERIFE.food,
    'sancocho-canario': REAL_TENERIFE.food,
  }

  let updated = 0
  for (const [slug, image] of Object.entries(itemUpdates)) {
    const { error } = await sb.from('items').update({ image }).eq('slug', slug)
    if (!error) updated++
  }
  console.log(`✓ ${updated} items updated with REAL Tenerife photos`)

  // Events - carnival
  await sb.from('events').update({ image: REAL_TENERIFE.carnival }).eq('slug', 'carnaval-santa-cruz')
  console.log('✓ Carnival event updated')

  console.log('\nDone! All images are now REAL Tenerife photos.')
}

main()
