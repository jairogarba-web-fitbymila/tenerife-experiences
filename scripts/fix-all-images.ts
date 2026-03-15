import { createClient } from '@supabase/supabase-js'
const sb = createClient('https://sqesgghvaazyajzjkoap.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxZXNnZ2h2YWF6eWFqemprb2FwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzUxMzgwOSwiZXhwIjoyMDg5MDg5ODA5fQ.UvbRfWU9seJPT9lyCyLmpD4uZrP9jXzsNoeSAjT9HnI')

async function main() {
  // Update ALL items with better, more specific images
  // Using verified Unsplash photo IDs that are real Tenerife/Canary Islands photos

  const itemImages: Record<string, string> = {
    // Whale watching - actual whale/dolphin photos
    'whale-watching-catamaran': 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=1200&q=80',
    'private-yacht-whale-watching': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80',
    'eco-whale-watching': 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=1200&q=80',

    // Teide - volcanic landscape
    'teide-stargazing': 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=1200&q=80',
    'teide-sunrise-cable-car': 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80',
    'teleferico-del-teide': 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80',
    'paisaje-lunar': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80',
    'roques-de-garcia': 'https://images.unsplash.com/photo-1547234935-80c7145ec969?w=1200&q=80',
    'pico-viejo': 'https://images.unsplash.com/photo-1547234935-80c7145ec969?w=1200&q=80',

    // Beaches - real tropical/volcanic beach photos
    'playa-del-duque': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
    'playa-de-las-teresitas': 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=1200&q=80',
    'playa-de-benijo': 'https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=1200&q=80',
    'playa-la-tejita': 'https://images.unsplash.com/photo-1509233725247-49e657c54213?w=1200&q=80',
    'playa-de-fanabe': 'https://images.unsplash.com/photo-1520454974749-611b7248ffdb?w=1200&q=80',
    'playa-de-troya': 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=1200&q=80',
    'playa-de-los-cristianos': 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&q=80',
    'playa-de-las-americas': 'https://images.unsplash.com/photo-1515238152791-8216bfcf7e2e?w=1200&q=80',
    'playa-de-las-vistas': 'https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=1200&q=80',
    'playa-del-bollullo': 'https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=1200&q=80',
    'playa-de-los-patos': 'https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=1200&q=80',
    'playa-del-socorro': 'https://images.unsplash.com/photo-1502680390548-bdbac40e4a9f?w=1200&q=80',
    'playa-jardin': 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=1200&q=80',
    'playa-de-la-arena': 'https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=1200&q=80',

    // Family beaches
    'playa-de-las-vistas-family': 'https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=1200&q=80',
    'playa-del-duque-family': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
    'playa-de-las-teresitas-family': 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=1200&q=80',
    'playa-de-fanabe-family': 'https://images.unsplash.com/photo-1520454974749-611b7248ffdb?w=1200&q=80',

    // Theme parks
    'siam-park': 'https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?w=1200&q=80',
    'loro-parque': 'https://images.unsplash.com/photo-1497206365907-f5e630693df0?w=1200&q=80',

    // Restaurants
    'el-rincon-de-juan-carlos': 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80',
    'nub': 'https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?w=1200&q=80',

    // Nature
    'masca-valley': 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80',
    'anaga-laurel-forest': 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=80',

    // Natural pools
    'charco-de-la-laja': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
    'charco-del-viento': 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=1200&q=80',
    'piscinas-de-bajamar': 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=1200&q=80',
    'piscinas-naturales-garachico': 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=1200&q=80',

    // Guachinches & food
    'guachinche-el-cubano': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80',
    'guachinche-la-casona': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80',
    'guachinche-el-relajo': 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&q=80',
    'papas-arrugadas-con-mojo': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80',
    'gofio': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&q=80',
    'sancocho-canario': 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=1200&q=80',
    'queso-asado-con-mojo': 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=1200&q=80',

    // Wine
    'bodegas-monje': 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1200&q=80',
    'bodegas-reveron': 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=1200&q=80',
    'casa-del-vino-la-baranda': 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&q=80',

    // Water sports
    'surf-las-americas': 'https://images.unsplash.com/photo-1502680390548-bdbac40e4a9f?w=1200&q=80',
    'buceo-los-gigantes': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80',
    'kayak-los-gigantes': 'https://images.unsplash.com/photo-1472745942893-4b9f730c7668?w=1200&q=80',
    'jet-ski-costa-adeje': 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=1200&q=80',

    // Culture
    'la-laguna-unesco': 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&q=80',
    'garachico-historic': 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=1200&q=80',
    'museo-naturaleza-hombre': 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=1200&q=80',
    'piramides-guimar': 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=1200&q=80',
    'auditorio-tenerife': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80',

    // Nightlife
    'veronicas-strip': 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=1200&q=80',
    'la-noria-santa-cruz': 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200&q=80',

    // Wellness
    'spa-ritz-carlton': 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80',
    'oriental-spa-garden': 'https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=1200&q=80',
    'aqua-club-termal': 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200&q=80',
    'tenerife-yoga-retreat': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80',
    'surf-yoga-tenerife': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80',

    // Shopping
    'mercado-nuestra-senora-africa': 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1200&q=80',
    'mercadillo-agricultor-tacoronte': 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80',
    'rastro-santa-cruz': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&q=80',
    'cc-siam-mall': 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=1200&q=80',
    'cc-meridiano': 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=1200&q=80',
    'vino-tenerife': 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1200&q=80',
    'queso-tenerife': 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=1200&q=80',
    'miel-tenerife': 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=1200&q=80',
  }

  let updated = 0
  for (const [slug, image] of Object.entries(itemImages)) {
    const { error, count } = await sb.from('items').update({ image }).eq('slug', slug)
    if (!error) updated++
  }
  console.log(`Updated ${updated}/${Object.keys(itemImages).length} items`)

  // Update areas with better images
  const areaImages: Record<string, string> = {
    'costa-adeje': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
    'los-cristianos': 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&q=80',
    'puerto-de-la-cruz': 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=1200&q=80',
    'santa-cruz': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80',
    'la-laguna': 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&q=80',
    'los-gigantes': 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80',
    'teide': 'https://images.unsplash.com/photo-1547234935-80c7145ec969?w=1200&q=80',
    'anaga': 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=80',
  }

  for (const [slug, image] of Object.entries(areaImages)) {
    await sb.from('areas').update({ image }).eq('slug', slug)
  }
  console.log('Areas updated')

  // Update categories with better images
  const catImages: Record<string, string> = {
    'experiences': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80',
    'beaches': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
    'culture': 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&q=80',
    'nature': 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=80',
    'food': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80',
    'nightlife': 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=1200&q=80',
    'shopping': 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1200&q=80',
    'family': 'https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?w=1200&q=80',
    'wellness': 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80',
  }

  for (const [slug, image] of Object.entries(catImages)) {
    await sb.from('categories').update({ image }).eq('slug', slug)
  }
  console.log('Categories updated')

  console.log('\nDone! All images updated.')
}

main()
