import { createClient } from '@supabase/supabase-js'
const sb = createClient('https://sqesgghvaazyajzjkoap.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxZXNnZ2h2YWF6eWFqemprb2FwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzUxMzgwOSwiZXhwIjoyMDg5MDg5ODA5fQ.UvbRfWU9seJPT9lyCyLmpD4uZrP9jXzsNoeSAjT9HnI')

async function main() {
  const { data: areas } = await sb.from('areas').select('id, slug')
  const am: Record<string, string> = {}
  areas?.forEach(a => { am[a.slug] = a.id })

  const partners = [
    { slug: 'restaurante-fiore', name: 'Restaurante Fiore', type: 'restaurant', description: { es: 'Cocina italiana premium en el corazon de Playa de las Americas. Pasta fresca, pizzas artesanales y los mejores vinos italianos.', en: 'Premium Italian cuisine in the heart of Playa de las Americas. Fresh pasta, artisan pizzas and the finest Italian wines.', de: 'Premium italienische Kueche im Herzen von Playa de las Americas.' }, area_id: am['costa-adeje'], address: 'CC Safari, Playa de las Americas', phone: '+34 922 123 456', website: 'https://fiore.es', featured: true, plan: 'premium', visible: true, image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80' },
    { slug: 'hotel-botanico', name: 'Hotel Botanico & The Oriental Spa Garden', type: 'hotel', description: { es: 'Hotel 5 estrellas Gran Lujo en Puerto de la Cruz con spa oriental, jardines tropicales y restaurantes de alta cocina.', en: '5-star Grand Luxury hotel in Puerto de la Cruz with oriental spa, tropical gardens and fine dining restaurants.', de: '5-Sterne Grand Luxury Hotel in Puerto de la Cruz mit orientalischem Spa.' }, area_id: am['puerto-de-la-cruz'], address: 'Av. Richard J. Yeoward, 1, Puerto de la Cruz', phone: '+34 922 381 400', website: 'https://hotelbotanico.com', featured: true, plan: 'premium', visible: true, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80' },
    { slug: 'atlantic-excursions', name: 'Atlantic Excursions', type: 'operator', description: { es: 'Excursiones en barco, avistamiento de ballenas y delfines, fiestas en catamaran y paseos privados por la costa de Tenerife.', en: 'Boat excursions, whale and dolphin watching, catamaran parties and private coastal cruises in Tenerife.', de: 'Bootsausfluege, Wal- und Delfinbeobachtung, Katamaranpartys.' }, area_id: am['costa-adeje'], address: 'Puerto Colon, Costa Adeje', phone: '+34 922 714 567', website: 'https://atlanticexcursions.com', featured: true, plan: 'basic', visible: true, image: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=800&q=80' },
    { slug: 'tenerife-surf-school', name: 'Tenerife Surf School', type: 'operator', description: { es: 'Escuela de surf en Las Americas con clases para todos los niveles. Instructores certificados, material incluido y sesiones de foto/video.', en: 'Surf school in Las Americas with classes for all levels. Certified instructors, equipment included and photo/video sessions.', de: 'Surfschule in Las Americas mit Kursen fuer alle Niveaus.' }, area_id: am['costa-adeje'], address: 'Playa de Las Americas', featured: true, plan: 'basic', visible: true, image: 'https://images.unsplash.com/photo-1502680390548-bdbac40e4a9f?w=800&q=80' },
    { slug: 'guachinche-el-primo', name: 'Guachinche El Primo', type: 'restaurant', description: { es: 'Guachinche autentico en La Orotava con comida casera canaria, vino del cosechero y ambiente familiar. Papas arrugadas, carne fiesta y queso asado.', en: 'Authentic guachinche in La Orotava with homemade Canarian food, house wine and family atmosphere. Wrinkled potatoes, fiesta meat and grilled cheese.', de: 'Authentischer Guachinche in La Orotava mit hausgemachter kanarischer Kueche.' }, address: 'Camino La Perdoma, La Orotava', featured: false, plan: 'free', visible: true, image: 'https://images.unsplash.com/photo-1515443961218-a51367888e4b?w=800&q=80' },
  ]

  const { error } = await sb.from('partners').upsert(partners, { onConflict: 'slug' })
  if (error) console.error(error.message)
  else console.log(`${partners.length} partners added!`)
}
main()
