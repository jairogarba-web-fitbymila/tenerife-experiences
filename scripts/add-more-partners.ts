import { createClient } from '@supabase/supabase-js'
const sb = createClient('https://sqesgghvaazyajzjkoap.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxZXNnZ2h2YWF6eWFqemprb2FwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzUxMzgwOSwiZXhwIjoyMDg5MDg5ODA5fQ.UvbRfWU9seJPT9lyCyLmpD4uZrP9jXzsNoeSAjT9HnI')

async function main() {
  const { data: areas } = await sb.from('areas').select('id, slug, name')
  const am: Record<string, string> = {}
  areas?.forEach(a => { am[a.slug] = a.id })

  console.log('Available areas:', areas?.map(a => `${a.slug} (${a.name})`).join(', '))

  const partners = [
    {
      slug: 'freebird-catamaran',
      name: 'Freebird Catamaran',
      type: 'operator',
      area_id: am['costa-adeje'],
      plan: 'premium',
      featured: true,
      visible: true,
      website: 'https://freebirdone.com',
      description: { es: 'Catamaranes de lujo para avistamiento de cetaceos', en: 'Luxury catamarans for whale watching' },
      image: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=800&q=80',
    },
    {
      slug: 'hotel-san-roque',
      name: 'Hotel San Roque',
      type: 'hotel',
      area_id: am['garachico'],
      plan: 'basic',
      featured: true,
      visible: true,
      website: 'https://hotelsanroque.com',
      description: { es: 'Hotel boutique design en el pueblo historico de Garachico', en: 'Design boutique hotel in the historic town of Garachico' },
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    },
    {
      slug: 'bodegas-monje-partner',
      name: 'Bodegas Monje',
      type: 'restaurant',
      area_id: am['el-sauzal'],
      plan: 'basic',
      featured: true,
      visible: true,
      website: 'https://bodegasmonje.com',
      description: { es: 'Bodega centenaria con catas y eventos en El Sauzal', en: 'Century-old winery with tastings and events in El Sauzal' },
      image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80',
    },
    {
      slug: 'cicar-rent-a-car',
      name: 'CICAR Rent a Car',
      type: 'service',
      plan: 'premium',
      featured: true,
      visible: true,
      website: 'https://cicar.com',
      description: { es: 'La empresa de alquiler de coches lider en Canarias', en: 'The leading car rental company in the Canary Islands' },
      image: 'https://images.unsplash.com/photo-1449965408869-ebd13bc9e5d8?w=800&q=80',
    },
    {
      slug: 'water-sports-tenerife',
      name: 'Water Sports Tenerife',
      type: 'operator',
      area_id: am['costa-adeje'],
      plan: 'basic',
      featured: false,
      visible: true,
      website: 'https://watersportstenerife.com',
      description: { es: 'Jet ski parasailing flyboard y mas en Puerto Colon', en: 'Jet ski parasailing flyboard and more at Puerto Colon' },
      image: 'https://images.unsplash.com/photo-1605181684285-1b2245bc5804?w=800&q=80',
    },
    {
      slug: 'restaurante-el-cine-partner',
      name: 'El Cine Restaurante',
      type: 'restaurant',
      area_id: am['la-orotava'],
      plan: 'free',
      featured: false,
      visible: true,
      website: null,
      description: { es: 'Cocina canaria contemporanea en edificio historico', en: 'Contemporary Canarian cuisine in a historic building' },
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    },
    {
      slug: 'kaluna-beach-club-partner',
      name: 'Kaluna Beach Club',
      type: 'restaurant',
      area_id: am['costa-adeje'],
      plan: 'premium',
      featured: true,
      visible: true,
      website: 'https://kalunabeachclub.com',
      description: { es: 'Beach club exclusivo con camas balinesas y piscina infinity', en: 'Exclusive beach club with Balinese beds and infinity pool' },
      image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80',
    },
    {
      slug: 'spa-royal-garden-partner',
      name: 'Spa Royal Garden',
      type: 'service',
      area_id: am['costa-adeje'],
      plan: 'basic',
      featured: false,
      visible: true,
      website: null,
      description: { es: 'Spa tailandes con circuito de aguas y tratamientos balineses', en: 'Thai spa with water circuit and Balinese treatments' },
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
    },
    {
      slug: 'tenerife-dolphin',
      name: 'Tenerife Dolphin',
      type: 'operator',
      area_id: am['costa-adeje'],
      plan: 'free',
      featured: false,
      visible: true,
      website: 'https://tenerifedolphin.com',
      description: { es: 'Excursiones de avistamiento de cetaceos', en: 'Whale and dolphin watching excursions' },
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&q=80',
    },
    {
      slug: 'gf-hotels',
      name: 'GF Hotels',
      type: 'hotel',
      area_id: am['costa-adeje'],
      plan: 'basic',
      featured: true,
      visible: true,
      website: 'https://gfrhotels.com',
      description: { es: 'Cadena hotelera local con hoteles 4 y 5 estrellas en el sur', en: 'Local hotel chain with 4 and 5 star hotels in the south' },
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    },
  ]

  const { error } = await sb.from('partners').upsert(partners, { onConflict: 'slug' })
  if (error) console.error('Error:', error.message)
  else console.log(`${partners.length} partners added!`)
}
main()
