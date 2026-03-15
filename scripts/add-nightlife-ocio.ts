import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://sqesgghvaazyajzjkoap.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxZXNnZ2h2YWF6eWFqemprb2FwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzUxMzgwOSwiZXhwIjoyMDg5MDg5ODA5fQ.UvbRfWU9seJPT9lyCyLmpD4uZrP9jXzsNoeSAjT9HnI'
)

async function main() {
  console.log('=== Fetching nightlife category ===')

  // 1. Get nightlife category
  const { data: categories, error: catErr } = await supabase
    .from('categories')
    .select('id, slug, name')

  if (catErr) throw catErr
  console.log('Categories:', categories?.map(c => `${c.slug} (${c.id})`))

  const nightlife = categories?.find(c => c.slug === 'nightlife' || c.slug === 'ocio-nocturno' || c.slug === 'vida-nocturna')
  if (!nightlife) {
    console.error('No nightlife category found! Available:', categories?.map(c => c.slug))
    process.exit(1)
  }
  console.log(`Found nightlife category: ${nightlife.slug} (${nightlife.id})`)

  // 2. Get existing subcategories
  const { data: existingSubs, error: subErr } = await supabase
    .from('subcategories')
    .select('id, slug, name, category_id')
    .eq('category_id', nightlife.id)

  if (subErr) throw subErr
  console.log('\nExisting nightlife subcategories:')
  existingSubs?.forEach(s => console.log(`  - ${s.slug} (${s.id})`))

  // 3. Add new subcategories: beach-clubs and festivals
  console.log('\n=== Adding new subcategories ===')

  const newSubcategories = [
    {
      category_id: nightlife.id,
      slug: 'beach-clubs',
      name: { es: 'Beach Clubs', en: 'Beach Clubs', de: 'Beach Clubs', fr: 'Beach Clubs', ru: 'Пляжные клубы', it: 'Beach Club' },
      description: {
        es: 'Los mejores beach clubs de Tenerife con piscinas, DJs, cócteles y gastronomía junto al mar.',
        en: 'The best beach clubs in Tenerife with pools, DJs, cocktails and cuisine by the sea.',
        de: 'Die besten Beach Clubs auf Teneriffa mit Pools, DJs, Cocktails und Küche am Meer.',
        fr: 'Les meilleurs beach clubs de Tenerife avec piscines, DJ, cocktails et cuisine en bord de mer.',
        ru: 'Лучшие пляжные клубы Тенерифе с бассейнами, диджеями, коктейлями и кухней у моря.',
        it: 'I migliori beach club di Tenerife con piscine, DJ, cocktail e cucina sul mare.'
      },
      short_description: {
        es: 'Beach clubs con piscina, DJs y cócteles junto al mar.',
        en: 'Beach clubs with pools, DJs and cocktails by the sea.',
        de: 'Beach Clubs mit Pool, DJs und Cocktails am Meer.',
      },
      image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800',
      sort_order: 10,
      visible: true,
    },
    {
      category_id: nightlife.id,
      slug: 'festivals',
      name: { es: 'Festivales de Música', en: 'Music Festivals', de: 'Musikfestivals', fr: 'Festivals de Musique', ru: 'Музыкальные фестивали', it: 'Festival Musicali' },
      description: {
        es: 'Festivales de música y arte en Tenerife: electrónica, indie, clásica, cine y artes escénicas durante todo el año.',
        en: 'Music and arts festivals in Tenerife: electronic, indie, classical, film and performing arts throughout the year.',
        de: 'Musik- und Kunstfestivals auf Teneriffa: Elektronik, Indie, Klassik, Film und darstellende Künste das ganze Jahr über.',
        fr: 'Festivals de musique et d\'art à Tenerife : électronique, indie, classique, cinéma et arts du spectacle toute l\'année.',
        ru: 'Музыкальные и художественные фестивали на Тенерифе: электронная, инди, классическая музыка, кино и исполнительские искусства в течение всего года.',
        it: 'Festival musicali e artistici a Tenerife: elettronica, indie, classica, cinema e arti performative durante tutto l\'anno.'
      },
      short_description: {
        es: 'Festivales de música electrónica, indie, clásica y artes en Tenerife.',
        en: 'Electronic, indie, classical music and arts festivals in Tenerife.',
        de: 'Elektronik-, Indie-, Klassik- und Kunstfestivals auf Teneriffa.',
      },
      image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800',
      sort_order: 11,
      visible: true,
    },
  ]

  const { data: upsertedSubs, error: upsertSubErr } = await supabase
    .from('subcategories')
    .upsert(newSubcategories, { onConflict: 'category_id,slug' })
    .select('id, slug')

  if (upsertSubErr) {
    console.error('Error upserting subcategories:', upsertSubErr)
    throw upsertSubErr
  }
  console.log('Upserted subcategories:', upsertedSubs)

  // 4. Re-fetch all nightlife subcategories to get IDs
  const { data: allSubs, error: allSubErr } = await supabase
    .from('subcategories')
    .select('id, slug')
    .eq('category_id', nightlife.id)

  if (allSubErr) throw allSubErr

  const subMap: Record<string, string> = {}
  allSubs?.forEach(s => { subMap[s.slug] = s.id })
  console.log('\nSubcategory ID map:', subMap)

  // Helper to get subcategory ID
  const subId = (slug: string) => {
    const id = subMap[slug]
    if (!id) throw new Error(`Subcategory not found: ${slug}`)
    return id
  }

  // 5. Build all items
  console.log('\n=== Adding items ===')

  const items = [
    // ─── BEACH CLUBS ─────────────────────────────────────────
    {
      subcategory_id: subId('beach-clubs'),
      slug: 'monkey-beach-club',
      name: {
        es: 'Monkey Beach Club',
        en: 'Monkey Beach Club',
        de: 'Monkey Beach Club',
      },
      description: {
        es: 'El beach club más famoso del sur de Tenerife. Disfruta de sesiones de DJ, fiestas en la piscina, cócteles tropicales y comida mediterránea en un ambiente vibrante. Ubicado en la zona de Costa Adeje, abierto todos los días. Consumo mínimo 15€.',
        en: 'The most famous beach club in south Tenerife. Enjoy DJ sessions, pool parties, tropical cocktails and Mediterranean food in a vibrant atmosphere. Located in the Costa Adeje area, open daily. Minimum consumption 15€.',
        de: 'Der berühmteste Beach Club im Süden Teneriffas. Genießen Sie DJ-Sessions, Poolpartys, tropische Cocktails und mediterrane Küche in lebhafter Atmosphäre. Im Gebiet Costa Adeje gelegen, täglich geöffnet. Mindestverzehr 15€.',
      },
      short_description: {
        es: 'El beach club más famoso del sur de Tenerife con DJs, piscina y cócteles.',
        en: 'The most famous beach club in south Tenerife with DJs, pool and cocktails.',
        de: 'Der berühmteste Beach Club im Süden Teneriffas mit DJs, Pool und Cocktails.',
      },
      image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800',
      images: [
        'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
      ],
      location: { es: 'Las Américas, Costa Adeje', en: 'Las Americas, Costa Adeje', de: 'Las Américas, Costa Adeje' },
      area_id: '4430c2ad-70b3-4de3-9914-ca4dd66ebb34', // costa-adeje
      coordinates: { lat: 28.0572, lng: -16.7266 },
      rating: 4.3,
      review_count: 856,
      price_from: 15,
      currency: 'EUR',
      duration: null,
      highlights: [
        { es: 'Sesiones de DJ en vivo', en: 'Live DJ sessions', de: 'Live-DJ-Sessions' },
        { es: 'Piscina y tumbonas', en: 'Pool and sun loungers', de: 'Pool und Sonnenliegen' },
        { es: 'Comida mediterránea', en: 'Mediterranean food', de: 'Mediterrane Küche' },
      ],
      includes: [],
      bookable: true,
      booking_url: null,
      affiliate_url: null,
      visible: true,
      featured: true,
      sort_order: 1,
    },
    {
      subcategory_id: subId('beach-clubs'),
      slug: 'hard-rock-cafe-tenerife',
      name: {
        es: 'Hard Rock Cafe Tenerife',
        en: 'Hard Rock Cafe Tenerife',
        de: 'Hard Rock Cafe Teneriffa',
      },
      description: {
        es: 'El icónico Hard Rock Cafe en Playa Paraíso con temática rock, piscina, música en vivo y las mejores hamburguesas. Un clásico que combina ocio y gastronomía en la zona de Costa Adeje.',
        en: 'The iconic Hard Rock Cafe in Playa Paraiso with rock theme, pool, live music and the best burgers. A classic combining entertainment and gastronomy in the Costa Adeje area.',
        de: 'Das ikonische Hard Rock Cafe in Playa Paraíso mit Rock-Thema, Pool, Live-Musik und den besten Burgern. Ein Klassiker, der Unterhaltung und Gastronomie in Costa Adeje verbindet.',
      },
      short_description: {
        es: 'Icónico venue con temática rock, piscina, música en vivo y hamburguesas.',
        en: 'Iconic rock-themed venue with pool, live music and burgers.',
        de: 'Ikonischer Rock-Venue mit Pool, Live-Musik und Burgern.',
      },
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800',
      images: [
        'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800',
      ],
      location: { es: 'Playa Paraíso, Costa Adeje', en: 'Playa Paraiso, Costa Adeje', de: 'Playa Paraíso, Costa Adeje' },
      area_id: '4430c2ad-70b3-4de3-9914-ca4dd66ebb34', // costa-adeje
      coordinates: { lat: 28.1080, lng: -16.7760 },
      rating: 4.2,
      review_count: 1243,
      price_from: null,
      currency: 'EUR',
      duration: null,
      highlights: [
        { es: 'Temática rock con memorabilia', en: 'Rock theme with memorabilia', de: 'Rock-Thema mit Memorabilia' },
        { es: 'Piscina y zona chill-out', en: 'Pool and chill-out area', de: 'Pool und Chill-out-Bereich' },
        { es: 'Música en vivo los fines de semana', en: 'Live music on weekends', de: 'Live-Musik am Wochenende' },
      ],
      includes: [],
      bookable: false,
      booking_url: null,
      affiliate_url: null,
      visible: true,
      featured: false,
      sort_order: 2,
    },
    {
      subcategory_id: subId('beach-clubs'),
      slug: 'kaluna-beach-club',
      name: {
        es: 'Kaluna Beach Club',
        en: 'Kaluna Beach Club',
        de: 'Kaluna Beach Club',
      },
      description: {
        es: 'Beach club exclusivo en La Caleta con camas balinesas, piscina infinity, vistas espectaculares al atardecer y cocina fusión. Una experiencia premium en la costa de Adeje. Consumo mínimo 30€.',
        en: 'Upscale beach club in La Caleta with Balinese beds, infinity pool, spectacular sunset views and fusion cuisine. A premium experience on the Adeje coast. Minimum consumption 30€.',
        de: 'Gehobener Beach Club in La Caleta mit balinesischen Betten, Infinity-Pool, spektakulären Sonnenuntergangsblicken und Fusionsküche. Ein Premium-Erlebnis an der Küste von Adeje. Mindestverzehr 30€.',
      },
      short_description: {
        es: 'Beach club exclusivo con camas balinesas, piscina infinity y cocina fusión.',
        en: 'Upscale beach club with Balinese beds, infinity pool and fusion cuisine.',
        de: 'Gehobener Beach Club mit balinesischen Betten, Infinity-Pool und Fusionsküche.',
      },
      image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800',
      images: [
        'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800',
        'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800',
      ],
      location: { es: 'La Caleta, Costa Adeje', en: 'La Caleta, Costa Adeje', de: 'La Caleta, Costa Adeje' },
      area_id: '4430c2ad-70b3-4de3-9914-ca4dd66ebb34', // costa-adeje
      coordinates: { lat: 28.1020, lng: -16.7830 },
      rating: 4.5,
      review_count: 412,
      price_from: 30,
      currency: 'EUR',
      duration: null,
      highlights: [
        { es: 'Camas balinesas junto a la piscina', en: 'Balinese beds by the pool', de: 'Balinesische Betten am Pool' },
        { es: 'Piscina infinity con vistas al mar', en: 'Infinity pool with sea views', de: 'Infinity-Pool mit Meerblick' },
        { es: 'Cocina fusión de alta calidad', en: 'High-quality fusion cuisine', de: 'Hochwertige Fusionsküche' },
      ],
      includes: [],
      bookable: true,
      booking_url: null,
      affiliate_url: null,
      visible: true,
      featured: true,
      sort_order: 3,
    },
    {
      subcategory_id: subId('beach-clubs'),
      slug: 'papagayo-beach-club',
      name: {
        es: 'Papagayo Beach Club',
        en: 'Papagayo Beach Club',
        de: 'Papagayo Beach Club',
      },
      description: {
        es: 'Gran beach club en Playa de las Américas con múltiples piscinas, sesiones de DJ, food trucks y fiestas temáticas. El lugar perfecto para pasar el día y la noche. Entrada desde 20€.',
        en: 'Large beach club in Playa de las Americas with multiple pools, DJ sessions, food trucks and themed parties. The perfect place to spend the day and night. Entry from 20€.',
        de: 'Großer Beach Club in Playa de las Américas mit mehreren Pools, DJ-Sessions, Food Trucks und Themenpartys. Der perfekte Ort für Tag und Nacht. Eintritt ab 20€.',
      },
      short_description: {
        es: 'Gran beach club con múltiples piscinas, DJs y fiestas temáticas.',
        en: 'Large beach club with multiple pools, DJs and themed parties.',
        de: 'Großer Beach Club mit mehreren Pools, DJs und Themenpartys.',
      },
      image: 'https://images.unsplash.com/photo-1504681869696-d977211a5f4c?w=800',
      images: [
        'https://images.unsplash.com/photo-1504681869696-d977211a5f4c?w=800',
      ],
      location: { es: 'Playa de las Américas', en: 'Playa de las Americas', de: 'Playa de las Américas' },
      area_id: '4430c2ad-70b3-4de3-9914-ca4dd66ebb34', // costa-adeje
      coordinates: { lat: 28.0530, lng: -16.7290 },
      rating: 4.1,
      review_count: 678,
      price_from: 20,
      currency: 'EUR',
      duration: null,
      highlights: [
        { es: 'Múltiples piscinas y zonas de fiesta', en: 'Multiple pools and party areas', de: 'Mehrere Pools und Partybereiche' },
        { es: 'Sesiones de DJ internacionales', en: 'International DJ sessions', de: 'Internationale DJ-Sessions' },
        { es: 'Food trucks y gastronomía variada', en: 'Food trucks and varied gastronomy', de: 'Food Trucks und vielfältige Gastronomie' },
      ],
      includes: [],
      bookable: true,
      booking_url: null,
      affiliate_url: null,
      visible: true,
      featured: false,
      sort_order: 4,
    },
    {
      subcategory_id: subId('beach-clubs'),
      slug: 'le-club-tenerife',
      name: {
        es: 'Le Club',
        en: 'Le Club',
        de: 'Le Club',
      },
      description: {
        es: 'Club exclusivo de día y noche en Costa Adeje. Pool parties durante el día con cócteles premium y música electrónica de primer nivel por la noche. Entrada desde 25€.',
        en: 'Exclusive day-and-night club in Costa Adeje. Pool parties during the day with premium cocktails and top-level electronic music at night. Entry from 25€.',
        de: 'Exklusiver Tag-und-Nacht-Club in Costa Adeje. Poolpartys tagsüber mit Premium-Cocktails und erstklassiger elektronischer Musik in der Nacht. Eintritt ab 25€.',
      },
      short_description: {
        es: 'Club exclusivo con pool parties de día y música electrónica de noche.',
        en: 'Exclusive club with pool parties by day and electronic music at night.',
        de: 'Exklusiver Club mit Poolpartys am Tag und elektronischer Musik in der Nacht.',
      },
      image: 'https://images.unsplash.com/photo-1571266028243-d220a1fcc16f?w=800',
      images: [
        'https://images.unsplash.com/photo-1571266028243-d220a1fcc16f?w=800',
      ],
      location: { es: 'Costa Adeje', en: 'Costa Adeje', de: 'Costa Adeje' },
      area_id: '4430c2ad-70b3-4de3-9914-ca4dd66ebb34', // costa-adeje
      coordinates: { lat: 28.0810, lng: -16.7410 },
      rating: 4.4,
      review_count: 325,
      price_from: 25,
      currency: 'EUR',
      duration: null,
      highlights: [
        { es: 'Pool parties con DJs residentes', en: 'Pool parties with resident DJs', de: 'Poolpartys mit Resident-DJs' },
        { es: 'Cócteles premium y servicio VIP', en: 'Premium cocktails and VIP service', de: 'Premium-Cocktails und VIP-Service' },
        { es: 'Ambiente exclusivo día y noche', en: 'Exclusive atmosphere day and night', de: 'Exklusive Atmosphäre Tag und Nacht' },
      ],
      includes: [],
      bookable: true,
      booking_url: null,
      affiliate_url: null,
      visible: true,
      featured: false,
      sort_order: 5,
    },

    // ─── MUSIC FESTIVALS ──────────────────────────────────────
    {
      subcategory_id: subId('festivals'),
      slug: 'sunblast-festival',
      name: {
        es: 'Sunblast Festival',
        en: 'Sunblast Festival',
        de: 'Sunblast Festival',
      },
      description: {
        es: 'Festival de música electrónica en el sur de Tenerife con DJs internacionales de primer nivel. Se celebra anualmente en verano con varios escenarios y miles de asistentes. Entradas desde 40-80€.',
        en: 'Electronic music festival in south Tenerife with top international DJs. Held annually in summer with multiple stages and thousands of attendees. Tickets from 40-80€.',
        de: 'Elektronisches Musikfestival im Süden Teneriffas mit internationalen Top-DJs. Findet jährlich im Sommer statt mit mehreren Bühnen und Tausenden von Besuchern. Tickets ab 40-80€.',
      },
      short_description: {
        es: 'Festival de electrónica con DJs internacionales en el sur de Tenerife.',
        en: 'Electronic music festival with international DJs in south Tenerife.',
        de: 'Elektronikfestival mit internationalen DJs im Süden Teneriffas.',
      },
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800',
      images: [
        'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800',
        'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800',
      ],
      location: { es: 'Sur de Tenerife', en: 'South Tenerife', de: 'Süd-Teneriffa' },
      area_id: '4430c2ad-70b3-4de3-9914-ca4dd66ebb34', // costa-adeje
      coordinates: null,
      rating: 4.3,
      review_count: 234,
      price_from: 40,
      currency: 'EUR',
      duration: '2 days',
      highlights: [
        { es: 'DJs internacionales de primer nivel', en: 'Top-tier international DJs', de: 'Erstklassige internationale DJs' },
        { es: 'Varios escenarios y zonas temáticas', en: 'Multiple stages and themed areas', de: 'Mehrere Bühnen und Themenbereiche' },
        { es: 'Ambiente festivalero bajo el sol canario', en: 'Festival vibes under the Canarian sun', de: 'Festival-Atmosphäre unter kanarischer Sonne' },
      ],
      includes: [],
      bookable: true,
      booking_url: null,
      affiliate_url: null,
      visible: true,
      featured: true,
      sort_order: 1,
    },
    {
      subcategory_id: subId('festivals'),
      slug: 'mueca-festival',
      name: {
        es: 'Mueca Festival',
        en: 'Mueca Festival',
        de: 'Mueca Festival',
      },
      description: {
        es: 'Festival internacional de artes de calle en Puerto de la Cruz con teatro, circo, música y danza en las calles del casco histórico. Entrada gratuita. Se celebra en mayo y atrae a artistas de todo el mundo.',
        en: 'International street arts festival in Puerto de la Cruz featuring theater, circus, music and dance in the historic town streets. Free entry. Held in May, attracting artists from around the world.',
        de: 'Internationales Straßenkunstfestival in Puerto de la Cruz mit Theater, Zirkus, Musik und Tanz in den Straßen der Altstadt. Freier Eintritt. Findet im Mai statt und zieht Künstler aus aller Welt an.',
      },
      short_description: {
        es: 'Festival de artes de calle con teatro, circo y música en Puerto de la Cruz. Gratuito.',
        en: 'Street arts festival with theater, circus and music in Puerto de la Cruz. Free.',
        de: 'Straßenkunstfestival mit Theater, Zirkus und Musik in Puerto de la Cruz. Kostenlos.',
      },
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800',
      images: [
        'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800',
      ],
      location: { es: 'Puerto de la Cruz', en: 'Puerto de la Cruz', de: 'Puerto de la Cruz' },
      area_id: '3c9434ca-a842-4090-aefe-6c5f1a4c2df4', // puerto-de-la-cruz
      coordinates: { lat: 28.4145, lng: -16.5497 },
      rating: 4.6,
      review_count: 567,
      price_from: 0,
      currency: 'EUR',
      duration: '4 days',
      highlights: [
        { es: 'Teatro, circo y danza en la calle', en: 'Theater, circus and dance in the streets', de: 'Theater, Zirkus und Tanz auf der Straße' },
        { es: 'Artistas internacionales', en: 'International artists', de: 'Internationale Künstler' },
        { es: 'Entrada completamente gratuita', en: 'Completely free entry', de: 'Komplett kostenloser Eintritt' },
      ],
      includes: [],
      bookable: false,
      booking_url: null,
      affiliate_url: null,
      visible: true,
      featured: true,
      sort_order: 2,
    },
    {
      subcategory_id: subId('festivals'),
      slug: 'arona-summer-festival',
      name: {
        es: 'Arona Summer Festival',
        en: 'Arona Summer Festival',
        de: 'Arona Summer Festival',
      },
      description: {
        es: 'Festival de música electrónica de varios días en Playa de las Américas con los mejores DJs del mundo. Celebrado en junio, es uno de los eventos musicales más grandes de Canarias. Entradas desde 50-120€.',
        en: 'Multi-day electronic music festival in Playa de las Americas with the world\'s best DJs. Held in June, it is one of the largest music events in the Canary Islands. Tickets from 50-120€.',
        de: 'Mehrtägiges Elektronik-Musikfestival in Playa de las Américas mit den besten DJs der Welt. Im Juni veranstaltet, ist es eines der größten Musikevents der Kanarischen Inseln. Tickets ab 50-120€.',
      },
      short_description: {
        es: 'Gran festival de electrónica con DJs mundiales en Playa de las Américas.',
        en: 'Major electronic festival with world-class DJs in Playa de las Americas.',
        de: 'Großes Elektronikfestival mit Weltklasse-DJs in Playa de las Américas.',
      },
      image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800',
      images: [
        'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800',
        'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800',
      ],
      location: { es: 'Playa de las Américas, Arona', en: 'Playa de las Americas, Arona', de: 'Playa de las Américas, Arona' },
      area_id: '4430c2ad-70b3-4de3-9914-ca4dd66ebb34', // costa-adeje
      coordinates: { lat: 28.0520, lng: -16.7300 },
      rating: 4.5,
      review_count: 892,
      price_from: 50,
      currency: 'EUR',
      duration: '3 days',
      highlights: [
        { es: 'DJs de fama mundial', en: 'World-famous DJs', de: 'Weltberühmte DJs' },
        { es: 'Varios escenarios al aire libre', en: 'Multiple open-air stages', de: 'Mehrere Open-Air-Bühnen' },
        { es: 'Uno de los mayores festivales de Canarias', en: 'One of the largest festivals in the Canaries', de: 'Eines der größten Festivals der Kanaren' },
      ],
      includes: [],
      bookable: true,
      booking_url: null,
      affiliate_url: null,
      visible: true,
      featured: true,
      sort_order: 3,
    },
    {
      subcategory_id: subId('festivals'),
      slug: 'festival-musica-canarias',
      name: {
        es: 'Festival de Música de Canarias',
        en: 'Canary Islands Music Festival',
        de: 'Musikfestival der Kanarischen Inseln',
      },
      description: {
        es: 'Prestigioso festival de música clásica celebrado en enero y febrero en los auditorios de Santa Cruz de Tenerife y San Cristóbal de La Laguna. Orquestas y solistas internacionales de primer nivel. Entradas desde 10-40€.',
        en: 'Prestigious classical music festival held in January and February across auditoriums in Santa Cruz de Tenerife and San Cristóbal de La Laguna. Top international orchestras and soloists. Tickets from 10-40€.',
        de: 'Renommiertes klassisches Musikfestival im Januar und Februar in den Auditorien von Santa Cruz de Tenerife und San Cristóbal de La Laguna. Internationale Top-Orchester und Solisten. Tickets ab 10-40€.',
      },
      short_description: {
        es: 'Festival de música clásica con orquestas internacionales en Santa Cruz y La Laguna.',
        en: 'Classical music festival with international orchestras in Santa Cruz and La Laguna.',
        de: 'Klassisches Musikfestival mit internationalen Orchestern in Santa Cruz und La Laguna.',
      },
      image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800',
      images: [
        'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800',
      ],
      location: { es: 'Santa Cruz de Tenerife y La Laguna', en: 'Santa Cruz de Tenerife and La Laguna', de: 'Santa Cruz de Tenerife und La Laguna' },
      area_id: '2cd4360c-6f21-48e3-80aa-ea8b0ed6c4c9', // santa-cruz
      coordinates: { lat: 28.4682, lng: -16.2546 },
      rating: 4.7,
      review_count: 345,
      price_from: 10,
      currency: 'EUR',
      duration: '6 weeks',
      highlights: [
        { es: 'Orquestas y solistas de fama mundial', en: 'World-renowned orchestras and soloists', de: 'Weltbekannte Orchester und Solisten' },
        { es: 'Auditorios de Santa Cruz y La Laguna', en: 'Auditoriums in Santa Cruz and La Laguna', de: 'Auditorien in Santa Cruz und La Laguna' },
        { es: 'Más de 30 años de tradición', en: 'Over 30 years of tradition', de: 'Über 30 Jahre Tradition' },
      ],
      includes: [],
      bookable: true,
      booking_url: null,
      affiliate_url: null,
      visible: true,
      featured: false,
      sort_order: 4,
    },
    {
      subcategory_id: subId('festivals'),
      slug: 'gff-garachico-film-festival',
      name: {
        es: 'Garachico Film Festival',
        en: 'Garachico Film Festival',
        de: 'Garachico Filmfestival',
      },
      description: {
        es: 'Festival de cine independiente en el pueblo histórico de Garachico. Proyecciones al aire libre, cortometrajes, documentales y encuentros con cineastas. Se celebra en septiembre. Entradas desde 5-15€.',
        en: 'Independent film festival in the historic town of Garachico. Open-air screenings, short films, documentaries and filmmaker meetups. Held in September. Tickets from 5-15€.',
        de: 'Unabhängiges Filmfestival in der historischen Stadt Garachico. Open-Air-Vorführungen, Kurzfilme, Dokumentarfilme und Filmemacher-Treffen. Findet im September statt. Tickets ab 5-15€.',
      },
      short_description: {
        es: 'Festival de cine independiente con proyecciones al aire libre en Garachico.',
        en: 'Independent film festival with open-air screenings in Garachico.',
        de: 'Unabhängiges Filmfestival mit Open-Air-Vorführungen in Garachico.',
      },
      image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800',
      images: [
        'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800',
      ],
      location: { es: 'Garachico', en: 'Garachico', de: 'Garachico' },
      area_id: null,
      coordinates: { lat: 28.3722, lng: -16.7639 },
      rating: 4.2,
      review_count: 123,
      price_from: 5,
      currency: 'EUR',
      duration: '5 days',
      highlights: [
        { es: 'Cine independiente al aire libre', en: 'Independent open-air cinema', de: 'Unabhängiges Open-Air-Kino' },
        { es: 'Marco histórico incomparable', en: 'Unmatched historic setting', de: 'Unvergleichliche historische Kulisse' },
        { es: 'Encuentros con cineastas', en: 'Filmmaker meetups', de: 'Filmemacher-Treffen' },
      ],
      includes: [],
      bookable: true,
      booking_url: null,
      affiliate_url: null,
      visible: true,
      featured: false,
      sort_order: 5,
    },
    {
      subcategory_id: subId('festivals'),
      slug: 'phe-festival',
      name: {
        es: 'Phe Festival',
        en: 'Phe Festival',
        de: 'Phe Festival',
      },
      description: {
        es: 'Festival de música indie, alternativa y artes en Puerto de la Cruz. Combina conciertos con exposiciones, talleres y gastronomía local. Se celebra en octubre. Entradas desde 30-60€.',
        en: 'Indie, alternative music and arts festival in Puerto de la Cruz. Combines concerts with exhibitions, workshops and local gastronomy. Held in October. Tickets from 30-60€.',
        de: 'Indie-, Alternative-Musik- und Kunstfestival in Puerto de la Cruz. Verbindet Konzerte mit Ausstellungen, Workshops und lokaler Gastronomie. Findet im Oktober statt. Tickets ab 30-60€.',
      },
      short_description: {
        es: 'Festival indie y de artes alternativas en Puerto de la Cruz.',
        en: 'Indie and alternative arts festival in Puerto de la Cruz.',
        de: 'Indie- und alternatives Kunstfestival in Puerto de la Cruz.',
      },
      image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800',
      images: [
        'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800',
      ],
      location: { es: 'Puerto de la Cruz', en: 'Puerto de la Cruz', de: 'Puerto de la Cruz' },
      area_id: '3c9434ca-a842-4090-aefe-6c5f1a4c2df4', // puerto-de-la-cruz
      coordinates: { lat: 28.4145, lng: -16.5497 },
      rating: 4.4,
      review_count: 289,
      price_from: 30,
      currency: 'EUR',
      duration: '3 days',
      highlights: [
        { es: 'Música indie y alternativa en vivo', en: 'Live indie and alternative music', de: 'Live-Indie- und Alternative-Musik' },
        { es: 'Exposiciones de arte y talleres', en: 'Art exhibitions and workshops', de: 'Kunstausstellungen und Workshops' },
        { es: 'Gastronomía local en un marco único', en: 'Local gastronomy in a unique setting', de: 'Lokale Gastronomie in einzigartiger Kulisse' },
      ],
      includes: [],
      bookable: true,
      booking_url: null,
      affiliate_url: null,
      visible: true,
      featured: true,
      sort_order: 6,
    },

    // ─── CLUBS & DISCOS ───────────────────────────────────────
    {
      subcategory_id: subId('clubs'),
      slug: 'papagayo-disco',
      name: {
        es: 'Papagayo Disco',
        en: 'Papagayo Disco',
        de: 'Papagayo Disco',
      },
      description: {
        es: 'La discoteca más grande del sur de Tenerife en Playa de las Américas. Múltiples salas con diferentes estilos musicales, DJs de primer nivel y fiestas temáticas. Abierta de jueves a domingo.',
        en: 'The biggest nightclub in southern Tenerife in Playa de las Americas. Multiple rooms with different music styles, top DJs and themed parties. Open Thursday to Sunday.',
        de: 'Die größte Diskothek im Süden Teneriffas in Playa de las Américas. Mehrere Räume mit verschiedenen Musikstilen, Top-DJs und Themenpartys. Geöffnet Donnerstag bis Sonntag.',
      },
      short_description: {
        es: 'La discoteca más grande del sur con múltiples salas y fiestas temáticas.',
        en: 'The biggest nightclub in the south with multiple rooms and themed parties.',
        de: 'Die größte Diskothek im Süden mit mehreren Räumen und Themenpartys.',
      },
      image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800',
      images: [
        'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800',
        'https://images.unsplash.com/photo-1571173069043-87f32caa1e98?w=800',
      ],
      location: { es: 'Playa de las Américas', en: 'Playa de las Americas', de: 'Playa de las Américas' },
      area_id: '4430c2ad-70b3-4de3-9914-ca4dd66ebb34', // costa-adeje
      coordinates: { lat: 28.0530, lng: -16.7290 },
      rating: 4.0,
      review_count: 1456,
      price_from: null,
      currency: 'EUR',
      duration: null,
      highlights: [
        { es: 'Múltiples salas con diferentes estilos', en: 'Multiple rooms with different styles', de: 'Mehrere Räume mit verschiedenen Stilen' },
        { es: 'DJs nacionales e internacionales', en: 'National and international DJs', de: 'Nationale und internationale DJs' },
        { es: 'Fiestas temáticas cada semana', en: 'Themed parties every week', de: 'Themenpartys jede Woche' },
      ],
      includes: [],
      bookable: false,
      booking_url: null,
      affiliate_url: null,
      visible: true,
      featured: true,
      sort_order: 1,
    },
    {
      subcategory_id: subId('clubs'),
      slug: 'achaman-club',
      name: {
        es: 'Achaman Club',
        en: 'Achaman Club',
        de: 'Achaman Club',
      },
      description: {
        es: 'El club nocturno más icónico de la capital, Santa Cruz de Tenerife. Música electrónica y comercial con los mejores DJs locales e internacionales. Abierto viernes y sábados hasta el amanecer.',
        en: 'The most iconic nightclub in the capital, Santa Cruz de Tenerife. Electronic and commercial music with the best local and international DJs. Open Friday and Saturday until dawn.',
        de: 'Der ikonischste Nachtclub der Hauptstadt, Santa Cruz de Tenerife. Elektronische und kommerzielle Musik mit den besten lokalen und internationalen DJs. Geöffnet Freitag und Samstag bis zum Morgengrauen.',
      },
      short_description: {
        es: 'El club nocturno más icónico de Santa Cruz con electrónica y comercial.',
        en: 'The most iconic nightclub in Santa Cruz with electronic and commercial music.',
        de: 'Der ikonischste Nachtclub in Santa Cruz mit Elektronik und kommerzieller Musik.',
      },
      image: 'https://images.unsplash.com/photo-1571173069043-87f32caa1e98?w=800',
      images: [
        'https://images.unsplash.com/photo-1571173069043-87f32caa1e98?w=800',
      ],
      location: { es: 'Santa Cruz de Tenerife', en: 'Santa Cruz de Tenerife', de: 'Santa Cruz de Tenerife' },
      area_id: '2cd4360c-6f21-48e3-80aa-ea8b0ed6c4c9', // santa-cruz
      coordinates: { lat: 28.4682, lng: -16.2546 },
      rating: 4.1,
      review_count: 567,
      price_from: null,
      currency: 'EUR',
      duration: null,
      highlights: [
        { es: 'Club icónico de la capital', en: 'Iconic club of the capital', de: 'Ikonischer Club der Hauptstadt' },
        { es: 'Música electrónica y comercial', en: 'Electronic and commercial music', de: 'Elektronische und kommerzielle Musik' },
        { es: 'Abierto hasta el amanecer', en: 'Open until dawn', de: 'Geöffnet bis zum Morgengrauen' },
      ],
      includes: [],
      bookable: false,
      booking_url: null,
      affiliate_url: null,
      visible: true,
      featured: false,
      sort_order: 2,
    },
    {
      subcategory_id: subId('clubs'),
      slug: 'blanco-bar',
      name: {
        es: 'Blanco Bar',
        en: 'Blanco Bar',
        de: 'Blanco Bar',
      },
      description: {
        es: 'Club popular en Playa de las Américas con terraza en la azotea, cócteles creativos y sesiones de DJ. Favorito entre turistas por su ambiente internacional y noches temáticas.',
        en: 'Popular club in Playa de las Americas with rooftop terrace, creative cocktails and DJ sets. Tourist favourite for its international atmosphere and themed nights.',
        de: 'Beliebter Club in Playa de las Américas mit Dachterrasse, kreativen Cocktails und DJ-Sets. Touristenliebling wegen seiner internationalen Atmosphäre und Themenabende.',
      },
      short_description: {
        es: 'Club popular con terraza, cócteles y DJs. Favorito de los turistas.',
        en: 'Popular club with rooftop, cocktails and DJs. Tourist favourite.',
        de: 'Beliebter Club mit Dachterrasse, Cocktails und DJs. Touristenliebling.',
      },
      image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800',
      images: [
        'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800',
      ],
      location: { es: 'Playa de las Américas', en: 'Playa de las Americas', de: 'Playa de las Américas' },
      area_id: '4430c2ad-70b3-4de3-9914-ca4dd66ebb34', // costa-adeje
      coordinates: { lat: 28.0530, lng: -16.7280 },
      rating: 4.0,
      review_count: 789,
      price_from: null,
      currency: 'EUR',
      duration: null,
      highlights: [
        { es: 'Terraza en la azotea con vistas', en: 'Rooftop terrace with views', de: 'Dachterrasse mit Aussicht' },
        { es: 'Cócteles creativos y premium', en: 'Creative and premium cocktails', de: 'Kreative und Premium-Cocktails' },
        { es: 'Ambiente internacional animado', en: 'Lively international atmosphere', de: 'Lebhafte internationale Atmosphäre' },
      ],
      includes: [],
      bookable: false,
      booking_url: null,
      affiliate_url: null,
      visible: true,
      featured: false,
      sort_order: 3,
    },
    {
      subcategory_id: subId('clubs'),
      slug: 'kiu-disco',
      name: {
        es: 'KIU',
        en: 'KIU',
        de: 'KIU',
      },
      description: {
        es: 'Club de música electrónica underground en Santa Cruz de Tenerife. DJs locales e internacionales con sonido de alta calidad. El referente de la escena electrónica capitalina.',
        en: 'Underground electronic music club in Santa Cruz de Tenerife. Local and international DJs with high-quality sound. The reference point of the capital\'s electronic scene.',
        de: 'Underground-Elektronikmusik-Club in Santa Cruz de Tenerife. Lokale und internationale DJs mit hochwertigem Sound. Die Referenz der elektronischen Szene der Hauptstadt.',
      },
      short_description: {
        es: 'Club underground de electrónica en la capital con DJs locales e internacionales.',
        en: 'Underground electronic club in the capital with local and international DJs.',
        de: 'Underground-Elektronikclub in der Hauptstadt mit lokalen und internationalen DJs.',
      },
      image: 'https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?w=800',
      images: [
        'https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?w=800',
      ],
      location: { es: 'Santa Cruz de Tenerife', en: 'Santa Cruz de Tenerife', de: 'Santa Cruz de Tenerife' },
      area_id: '2cd4360c-6f21-48e3-80aa-ea8b0ed6c4c9', // santa-cruz
      coordinates: { lat: 28.4690, lng: -16.2540 },
      rating: 4.3,
      review_count: 234,
      price_from: null,
      currency: 'EUR',
      duration: null,
      highlights: [
        { es: 'Sonido de alta calidad', en: 'High-quality sound system', de: 'Hochwertiges Soundsystem' },
        { es: 'Escena electrónica underground', en: 'Underground electronic scene', de: 'Underground-Elektronikszene' },
        { es: 'DJs locales e internacionales', en: 'Local and international DJs', de: 'Lokale und internationale DJs' },
      ],
      includes: [],
      bookable: false,
      booking_url: null,
      affiliate_url: null,
      visible: true,
      featured: false,
      sort_order: 4,
    },

    // ─── BARS & PUBS ──────────────────────────────────────────
    {
      subcategory_id: subId('bars-pubs'),
      slug: 'bulan-craft-beer',
      name: {
        es: 'Bulan Craft Beer',
        en: 'Bulan Craft Beer',
        de: 'Bulan Craft Beer',
      },
      description: {
        es: 'Pub de cerveza artesanal en el centro histórico de La Laguna con más de 20 grifos de cervezas locales e internacionales. Ambiente universitario y tapas canarias. El paraíso de los amantes de la craft beer.',
        en: 'Craft beer pub in the historic center of La Laguna with over 20 taps of local and international beers. University atmosphere and Canarian tapas. Paradise for craft beer lovers.',
        de: 'Craft-Beer-Pub im historischen Zentrum von La Laguna mit über 20 Zapfhähnen lokaler und internationaler Biere. Universitäre Atmosphäre und kanarische Tapas. Paradies für Craft-Beer-Liebhaber.',
      },
      short_description: {
        es: 'Pub de cerveza artesanal con 20+ grifos en el centro histórico de La Laguna.',
        en: 'Craft beer pub with 20+ taps in the historic center of La Laguna.',
        de: 'Craft-Beer-Pub mit 20+ Zapfhähnen im historischen Zentrum von La Laguna.',
      },
      image: 'https://images.unsplash.com/photo-1436076863939-06870fe779c2?w=800',
      images: [
        'https://images.unsplash.com/photo-1436076863939-06870fe779c2?w=800',
      ],
      location: { es: 'La Laguna', en: 'La Laguna', de: 'La Laguna' },
      area_id: '75cdf978-f228-43a0-b7d9-ba51ce7bc37d', // la-laguna
      coordinates: { lat: 28.4872, lng: -16.3167 },
      rating: 4.5,
      review_count: 345,
      price_from: null,
      currency: 'EUR',
      duration: null,
      highlights: [
        { es: 'Más de 20 grifos de cerveza artesanal', en: 'Over 20 craft beer taps', de: 'Über 20 Craft-Beer-Zapfhähne' },
        { es: 'Cervezas locales canarias', en: 'Local Canarian beers', de: 'Lokale kanarische Biere' },
        { es: 'Centro histórico de La Laguna', en: 'Historic center of La Laguna', de: 'Historisches Zentrum von La Laguna' },
      ],
      includes: [],
      bookable: false,
      booking_url: null,
      affiliate_url: null,
      visible: true,
      featured: false,
      sort_order: 1,
    },
    {
      subcategory_id: subId('bars-pubs'),
      slug: 'the-outsider-pub',
      name: {
        es: 'The Outsider',
        en: 'The Outsider',
        de: 'The Outsider',
      },
      description: {
        es: 'Pub de estilo británico en Playa de las Américas, popular entre expatriados. Deportes en vivo en pantalla grande, noches de quiz, karaoke y ambiente divertido. El punto de encuentro de la comunidad internacional.',
        en: 'British-style pub in Playa de las Americas, popular with expats. Live sports on big screens, quiz nights, karaoke and fun atmosphere. The meeting point of the international community.',
        de: 'Pub im britischen Stil in Playa de las Américas, beliebt bei Expats. Live-Sport auf Großbildschirmen, Quiz-Abende, Karaoke und lustige Atmosphäre. Der Treffpunkt der internationalen Gemeinschaft.',
      },
      short_description: {
        es: 'Pub británico con deportes en vivo, quiz nights y karaoke.',
        en: 'British pub with live sports, quiz nights and karaoke.',
        de: 'Britischer Pub mit Live-Sport, Quiz-Abenden und Karaoke.',
      },
      image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=800',
      images: [
        'https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=800',
      ],
      location: { es: 'Playa de las Américas', en: 'Playa de las Americas', de: 'Playa de las Américas' },
      area_id: '4430c2ad-70b3-4de3-9914-ca4dd66ebb34', // costa-adeje
      coordinates: { lat: 28.0530, lng: -16.7270 },
      rating: 4.1,
      review_count: 567,
      price_from: null,
      currency: 'EUR',
      duration: null,
      highlights: [
        { es: 'Deportes en vivo en pantalla grande', en: 'Live sports on big screens', de: 'Live-Sport auf Großbildschirmen' },
        { es: 'Noches de quiz y karaoke', en: 'Quiz nights and karaoke', de: 'Quiz-Abende und Karaoke' },
        { es: 'Ambiente internacional y divertido', en: 'International and fun atmosphere', de: 'Internationale und lustige Atmosphäre' },
      ],
      includes: [],
      bookable: false,
      booking_url: null,
      affiliate_url: null,
      visible: true,
      featured: false,
      sort_order: 2,
    },
    {
      subcategory_id: subId('bars-pubs'),
      slug: 'el-aguarde',
      name: {
        es: 'El Aguarde',
        en: 'El Aguarde',
        de: 'El Aguarde',
      },
      description: {
        es: 'Bar de cócteles en un edificio colonial restaurado en Santa Cruz. Cócteles creativos elaborados con ingredientes locales canarios. Ambiente sofisticado y decoración colonial elegante.',
        en: 'Cocktail bar in a restored colonial building in Santa Cruz. Creative cocktails crafted with local Canarian ingredients. Sophisticated atmosphere and elegant colonial décor.',
        de: 'Cocktailbar in einem restaurierten Kolonialgebäude in Santa Cruz. Kreative Cocktails mit lokalen kanarischen Zutaten. Anspruchsvolle Atmosphäre und elegantes koloniales Dekor.',
      },
      short_description: {
        es: 'Bar de cócteles creativos con ingredientes locales en edificio colonial.',
        en: 'Creative cocktail bar with local ingredients in a colonial building.',
        de: 'Kreative Cocktailbar mit lokalen Zutaten in einem Kolonialgebäude.',
      },
      image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800',
      images: [
        'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800',
      ],
      location: { es: 'Santa Cruz de Tenerife', en: 'Santa Cruz de Tenerife', de: 'Santa Cruz de Tenerife' },
      area_id: '2cd4360c-6f21-48e3-80aa-ea8b0ed6c4c9', // santa-cruz
      coordinates: { lat: 28.4685, lng: -16.2530 },
      rating: 4.6,
      review_count: 198,
      price_from: null,
      currency: 'EUR',
      duration: null,
      highlights: [
        { es: 'Cócteles con ingredientes locales canarios', en: 'Cocktails with local Canarian ingredients', de: 'Cocktails mit lokalen kanarischen Zutaten' },
        { es: 'Edificio colonial restaurado', en: 'Restored colonial building', de: 'Restauriertes Kolonialgebäude' },
        { es: 'Ambiente sofisticado y único', en: 'Sophisticated and unique atmosphere', de: 'Anspruchsvolle und einzigartige Atmosphäre' },
      ],
      includes: [],
      bookable: false,
      booking_url: null,
      affiliate_url: null,
      visible: true,
      featured: true,
      sort_order: 3,
    },

    // ─── LIVE MUSIC ───────────────────────────────────────────
    {
      subcategory_id: subId('live-music'),
      slug: 'hard-rock-cafe-live',
      name: {
        es: 'Hard Rock Cafe Live',
        en: 'Hard Rock Cafe Live',
        de: 'Hard Rock Cafe Live',
      },
      description: {
        es: 'Música en vivo cada fin de semana en el Hard Rock Cafe de Playa Paraíso. Bandas de covers de rock, pop y soul en un ambiente increíble. Entrada gratuita, consumiciones aparte.',
        en: 'Live music every weekend at the Hard Rock Cafe in Playa Paraiso. Rock, pop and soul cover bands in an incredible atmosphere. Free entry, drinks separate.',
        de: 'Live-Musik jedes Wochenende im Hard Rock Cafe in Playa Paraíso. Rock-, Pop- und Soul-Coverbands in einer unglaublichen Atmosphäre. Freier Eintritt, Getränke separat.',
      },
      short_description: {
        es: 'Bandas en vivo de rock, pop y soul cada fin de semana. Entrada gratuita.',
        en: 'Live rock, pop and soul cover bands every weekend. Free entry.',
        de: 'Live-Rock-, Pop- und Soul-Coverbands jedes Wochenende. Freier Eintritt.',
      },
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
      images: [
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
        'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800',
      ],
      location: { es: 'Playa Paraíso, Costa Adeje', en: 'Playa Paraiso, Costa Adeje', de: 'Playa Paraíso, Costa Adeje' },
      area_id: '4430c2ad-70b3-4de3-9914-ca4dd66ebb34', // costa-adeje
      coordinates: { lat: 28.1080, lng: -16.7760 },
      rating: 4.3,
      review_count: 678,
      price_from: 0,
      currency: 'EUR',
      duration: null,
      highlights: [
        { es: 'Bandas de covers en vivo', en: 'Live cover bands', de: 'Live-Coverbands' },
        { es: 'Entrada gratuita', en: 'Free entry', de: 'Freier Eintritt' },
        { es: 'Rock, pop y soul los fines de semana', en: 'Rock, pop and soul on weekends', de: 'Rock, Pop und Soul am Wochenende' },
      ],
      includes: [],
      bookable: false,
      booking_url: null,
      affiliate_url: null,
      visible: true,
      featured: false,
      sort_order: 1,
    },
    {
      subcategory_id: subId('live-music'),
      slug: 'berlina-cafe',
      name: {
        es: 'Berlina Cafe',
        en: 'Berlina Cafe',
        de: 'Berlina Cafe',
      },
      description: {
        es: 'Bar de jazz y blues en la ciudad universitaria de La Laguna. Música en vivo de jueves a sábado con artistas locales e internacionales. Ambiente íntimo y acogedor, perfecto para los amantes del jazz.',
        en: 'Jazz and blues bar in the university town of La Laguna. Live music Thursday to Saturday with local and international artists. Intimate and cozy atmosphere, perfect for jazz lovers.',
        de: 'Jazz- und Blues-Bar in der Universitätsstadt La Laguna. Live-Musik von Donnerstag bis Samstag mit lokalen und internationalen Künstlern. Intime und gemütliche Atmosphäre, perfekt für Jazzliebhaber.',
      },
      short_description: {
        es: 'Bar de jazz y blues con música en vivo en La Laguna.',
        en: 'Jazz and blues bar with live music in La Laguna.',
        de: 'Jazz- und Blues-Bar mit Live-Musik in La Laguna.',
      },
      image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800',
      images: [
        'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800',
      ],
      location: { es: 'La Laguna', en: 'La Laguna', de: 'La Laguna' },
      area_id: '75cdf978-f228-43a0-b7d9-ba51ce7bc37d', // la-laguna
      coordinates: { lat: 28.4872, lng: -16.3167 },
      rating: 4.5,
      review_count: 234,
      price_from: null,
      currency: 'EUR',
      duration: null,
      highlights: [
        { es: 'Jazz y blues en vivo', en: 'Live jazz and blues', de: 'Live-Jazz und Blues' },
        { es: 'Ambiente íntimo y acogedor', en: 'Intimate and cozy atmosphere', de: 'Intime und gemütliche Atmosphäre' },
        { es: 'Artistas locales e internacionales', en: 'Local and international artists', de: 'Lokale und internationale Künstler' },
      ],
      includes: [],
      bookable: false,
      booking_url: null,
      affiliate_url: null,
      visible: true,
      featured: true,
      sort_order: 2,
    },
  ]

  // 6. Upsert all items
  console.log(`\nUpserting ${items.length} items...`)

  const { data: upsertedItems, error: itemErr } = await supabase
    .from('items')
    .upsert(items, { onConflict: 'subcategory_id,slug' })
    .select('id, slug, subcategory_id')

  if (itemErr) {
    console.error('Error upserting items:', itemErr)
    throw itemErr
  }

  console.log(`\nSuccessfully upserted ${upsertedItems?.length} items:`)
  upsertedItems?.forEach(i => console.log(`  - ${i.slug} (${i.id})`))

  // 7. Verify counts
  const { count: totalItems } = await supabase
    .from('items')
    .select('*', { count: 'exact', head: true })
    .in('subcategory_id', Object.values(subMap))

  console.log(`\n=== DONE ===`)
  console.log(`Total nightlife items in DB: ${totalItems}`)
  console.log(`New subcategories added: beach-clubs, festivals`)
  console.log(`Items added by category:`)
  console.log(`  - Beach Clubs: 5`)
  console.log(`  - Festivals: 6`)
  console.log(`  - Clubs: 4`)
  console.log(`  - Bars & Pubs: 3`)
  console.log(`  - Live Music: 2`)
  console.log(`  TOTAL: 20 items`)
}

main().catch(err => {
  console.error('FATAL:', err)
  process.exit(1)
})
