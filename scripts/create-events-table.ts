import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://sqesgghvaazyajzjkoap.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxZXNnZ2h2YWF6eWFqemprb2FwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzUxMzgwOSwiZXhwIjoyMDg5MDg5ODA5fQ.UvbRfWU9seJPT9lyCyLmpD4uZrP9jXzsNoeSAjT9HnI'
)

async function createTable() {
  // Try to query the table first
  const { error } = await supabase.from('events').select('id').limit(1)

  if (error && error.message.includes('does not exist')) {
    console.log('Table does not exist, need to create via SQL editor')
    // Output the SQL for the user
    console.log(`
Please run this SQL in Supabase SQL Editor:

CREATE TABLE public.events (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name jsonb not null default '{}',
  description jsonb not null default '{}',
  municipality text not null,
  municipality_slug text not null,
  area_id uuid references public.areas(id),
  event_type text not null default 'fiesta_patronal',
  start_date text,
  end_date text,
  month int,
  image text,
  highlights jsonb default '[]',
  traditions jsonb default '[]',
  practical_info jsonb default '{}',
  meta_title jsonb,
  meta_description jsonb,
  visible boolean not null default true,
  featured boolean not null default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read visible events" ON public.events FOR SELECT USING (visible = true);
    `)
    return false
  }

  console.log('Events table exists!')
  return true
}

async function seedEvents() {
  const exists = await createTable()
  if (!exists) {
    console.log('Please create the table first, then run this script again')
    return
  }

  // Get area IDs
  const { data: areas } = await supabase.from('areas').select('id, slug')
  const areaMap: Record<string, string> = {}
  areas?.forEach(a => { areaMap[a.slug] = a.id })

  const events = [
    // MAJOR ISLAND-WIDE EVENTS
    {
      slug: 'carnaval-santa-cruz',
      name: { es: 'Carnaval de Santa Cruz de Tenerife', en: 'Santa Cruz de Tenerife Carnival', de: 'Karneval von Santa Cruz de Teneriffa' },
      description: { es: 'El segundo carnaval mas grande del mundo, solo superado por el de Rio de Janeiro. Semanas de desfiles, musica, disfraces espectaculares, eleccion de la Reina del Carnaval y el entierro de la sardina. La isla entera se paraliza para celebrar esta fiesta unica.', en: 'The second largest carnival in the world, surpassed only by Rio de Janeiro. Weeks of parades, music, spectacular costumes, election of the Carnival Queen and the burial of the sardine. The entire island stops to celebrate this unique festival.', de: 'Der zweitgroesste Karneval der Welt, nur uebertroffen von Rio de Janeiro. Wochen voller Umzuege, Musik, spektakulaere Kostueme, Wahl der Karnevalskoenigin und die Beerdigung der Sardine.' },
      municipality: 'Santa Cruz de Tenerife',
      municipality_slug: 'santa-cruz',
      area_id: areaMap['santa-cruz'] || null,
      event_type: 'carnival',
      start_date: 'Febrero',
      end_date: 'Marzo',
      month: 2,
      image: 'https://images.unsplash.com/photo-1551907034-09d3c543c04d?w=1200&q=80',
      featured: true,
      highlights: [
        { es: 'Eleccion de la Reina del Carnaval', en: 'Carnival Queen Election', de: 'Wahl der Karnevalskoenigin' },
        { es: 'Coso o Gran Cabalgata', en: 'Grand Carnival Parade', de: 'Grosse Karnevalsparade' },
        { es: 'Entierro de la Sardina', en: 'Burial of the Sardine', de: 'Beerdigung der Sardine' },
        { es: 'Murgas y comparsas', en: 'Murgas and comparsas musical groups', de: 'Murgas und Comparsas Musikgruppen' }
      ],
      practical_info: { es: 'Entrada gratuita a la mayoria de eventos. Recomendable ir disfrazado. Transporte publico reforzado. Se celebra entre febrero y marzo.', en: 'Free entry to most events. Costumes recommended. Enhanced public transport. Held between February and March.', de: 'Freier Eintritt zu den meisten Veranstaltungen. Kostueme empfohlen. Verstaerkter oeffentlicher Nahverkehr.' }
    },
    {
      slug: 'corpus-christi-orotava',
      name: { es: 'Corpus Christi de La Orotava', en: 'Corpus Christi in La Orotava', de: 'Fronleichnam in La Orotava' },
      description: { es: 'Las famosas alfombras de flores y arenas volcanicas del Teide que cubren las calles del casco historico de La Orotava. Declarada Fiesta de Interes Turistico Nacional. La alfombra central en la Plaza del Ayuntamiento es la mas grande del mundo hecha con tierras volcanicas.', en: 'The famous flower and volcanic sand carpets from Teide that cover the streets of La Orotava historic center. Declared a Festival of National Tourist Interest. The central carpet in the Town Hall Square is the worlds largest made with volcanic soils.', de: 'Die beruehmten Blumen- und Vulkansandteppiche vom Teide, die die Strassen der Altstadt von La Orotava bedecken. Als Fest von nationalem touristischem Interesse erklaert.' },
      municipality: 'La Orotava',
      municipality_slug: 'la-orotava',
      event_type: 'religious',
      start_date: 'Junio',
      month: 6,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&q=80',
      featured: true,
      highlights: [
        { es: 'Alfombras de flores naturales', en: 'Natural flower carpets', de: 'Natuerliche Blumenteppiche' },
        { es: 'Tapiz de arenas volcanicas del Teide', en: 'Volcanic sand tapestry from Teide', de: 'Vulkansandteppich vom Teide' },
        { es: 'Procesion del Corpus', en: 'Corpus Christi procession', de: 'Fronleichnamsprozession' }
      ],
      practical_info: { es: 'Las alfombras se montan la noche anterior y se pueden ver por la manana antes de la procesion. Llegar temprano. Parking limitado.', en: 'Carpets are set up the night before and can be seen in the morning before the procession. Arrive early. Limited parking.', de: 'Teppiche werden am Vorabend aufgebaut. Frueh kommen. Begrenztes Parken.' }
    },
    {
      slug: 'bajada-virgen-candelaria',
      name: { es: 'Bajada de la Virgen de Candelaria', en: 'Festival of the Virgin of Candelaria', de: 'Fest der Jungfrau von Candelaria' },
      description: { es: 'La celebracion religiosa mas importante de Canarias. Miles de peregrinos caminan desde toda la isla hasta la Basilica de Candelaria para venerar a la patrona del archipielago. La noche del 14 de agosto se celebra una espectacular procesion con antorchas.', en: 'The most important religious celebration in the Canary Islands. Thousands of pilgrims walk from across the island to the Basilica of Candelaria to venerate the patron saint of the archipelago. On the night of August 14th a spectacular torchlight procession takes place.', de: 'Die wichtigste religioese Feier der Kanarischen Inseln. Tausende Pilger wandern von der ganzen Insel zur Basilika von Candelaria.' },
      municipality: 'Candelaria',
      municipality_slug: 'candelaria',
      event_type: 'religious',
      start_date: '14 Agosto',
      end_date: '15 Agosto',
      month: 8,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80',
      featured: true,
      highlights: [
        { es: 'Peregrinacion nocturna con antorchas', en: 'Nighttime pilgrimage with torches', de: 'Naechtliche Pilgerfahrt mit Fackeln' },
        { es: 'Misa solemne en la Basilica', en: 'Solemn mass at the Basilica', de: 'Feierliche Messe in der Basilika' },
        { es: 'Representacion de la aparicion de la Virgen a los guanches', en: 'Reenactment of the Virgin appearing to the Guanches', de: 'Nachstellung der Erscheinung der Jungfrau' }
      ],
      practical_info: { es: 'Muchos peregrinos caminan descalzos. Llevar agua y calzado comodo. Transporte publico especial disponible.', en: 'Many pilgrims walk barefoot. Bring water and comfortable shoes. Special public transport available.', de: 'Viele Pilger gehen barfuss. Wasser und bequeme Schuhe mitbringen.' }
    },
    {
      slug: 'fuegos-realejos',
      name: { es: 'Fuegos del Apostol Santiago - Los Realejos', en: 'Fireworks of Santiago - Los Realejos', de: 'Feuerwerk des Apostels Santiago - Los Realejos' },
      description: { es: 'El espectaculo pirotecnico mas antiguo de Espana, con mas de 400 anos de historia. Dos barrios rivales (El Carmen y La Cruz) compiten lanzando fuegos artificiales durante horas en una batalla epica. Declarada Fiesta de Interes Turistico Nacional.', en: 'The oldest fireworks display in Spain, with over 400 years of history. Two rival neighborhoods (El Carmen and La Cruz) compete launching fireworks for hours in an epic battle. Declared a Festival of National Tourist Interest.', de: 'Das aelteste Feuerwerk Spaniens mit ueber 400 Jahren Geschichte. Zwei rivalisierende Stadtviertel konkurrieren stundenlang mit Feuerwerk.' },
      municipality: 'Los Realejos',
      municipality_slug: 'los-realejos',
      event_type: 'fiesta_patronal',
      start_date: '25 Julio',
      month: 7,
      image: 'https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?w=1200&q=80',
      featured: true,
      highlights: [
        { es: 'Batalla pirotecnica entre dos barrios', en: 'Fireworks battle between two neighborhoods', de: 'Feuerwerkschlacht zwischen zwei Vierteln' },
        { es: 'Mas de 400 anos de tradicion', en: 'Over 400 years of tradition', de: 'Ueber 400 Jahre Tradition' },
        { es: 'Espectaculo visible desde kilometros', en: 'Show visible from kilometers away', de: 'Show von Kilometern entfernt sichtbar' }
      ],
      practical_info: { es: 'Llegar con antelacion, se cortan calles. Proteccion para oidos recomendada. Aparcamiento muy limitado. Mejor ir en transporte publico.', en: 'Arrive early, streets are closed. Ear protection recommended. Very limited parking. Better to use public transport.', de: 'Frueh kommen, Strassen werden gesperrt. Gehoerschutz empfohlen.' }
    },
    // FIESTAS PATRONALES BY MUNICIPALITY
    {
      slug: 'fiestas-santa-ursula-adeje',
      name: { es: 'Fiestas de Santa Ursula - Adeje', en: 'Santa Ursula Festival - Adeje', de: 'Santa-Ursula-Fest - Adeje' },
      description: { es: 'Fiestas patronales de Adeje en honor a Santa Ursula con verbenas, romerias, actos religiosos y actividades culturales.', en: 'Patron saint festival of Adeje in honor of Santa Ursula with open-air dances, pilgrimages, religious acts and cultural activities.', de: 'Patronatsfest von Adeje zu Ehren der Heiligen Ursula.' },
      municipality: 'Adeje', municipality_slug: 'adeje', area_id: areaMap['costa-adeje'] || null,
      event_type: 'fiesta_patronal', start_date: '21 Octubre', month: 10,
      highlights: [{ es: 'Romeria tipica', en: 'Traditional pilgrimage', de: 'Traditionelle Wallfahrt' }],
      practical_info: { es: 'Actividades gratuitas en el casco historico de Adeje.', en: 'Free activities in the historic center of Adeje.', de: 'Kostenlose Aktivitaeten im historischen Zentrum von Adeje.' }
    },
    {
      slug: 'san-antonio-abad-arona',
      name: { es: 'San Antonio Abad - Arona', en: 'San Antonio Abad - Arona', de: 'San Antonio Abad - Arona' },
      description: { es: 'Fiestas en honor a San Antonio Abad con bendicion de animales, verbenas y actos religiosos en el casco de Arona.', en: 'Festival in honor of San Antonio Abad with blessing of animals, open-air dances and religious events in Arona town center.', de: 'Fest zu Ehren des Heiligen Antonio Abad mit Tiersegnung.' },
      municipality: 'Arona', municipality_slug: 'arona', area_id: areaMap['los-cristianos'] || null,
      event_type: 'fiesta_patronal', start_date: '17 Enero', month: 1,
      highlights: [{ es: 'Bendicion de animales', en: 'Blessing of animals', de: 'Tiersegnung' }],
      practical_info: { es: 'Fiesta familiar, llevar mascotas para la bendicion.', en: 'Family festival, bring pets for the blessing.', de: 'Familienfest, Haustiere zur Segnung mitbringen.' }
    },
    {
      slug: 'san-miguel-arcangel',
      name: { es: 'Fiestas de San Miguel Arcangel', en: 'San Miguel Arcangel Festival', de: 'San Miguel Arcangel Fest' },
      description: { es: 'Fiestas patronales de San Miguel de Abona con procesiones, verbenas, exhibiciones folkloricas y gastronomia local.', en: 'Patron saint festival of San Miguel de Abona with processions, dances, folk exhibitions and local cuisine.', de: 'Patronatsfest von San Miguel de Abona.' },
      municipality: 'San Miguel de Abona', municipality_slug: 'san-miguel-de-abona',
      event_type: 'fiesta_patronal', start_date: '29 Septiembre', month: 9,
      highlights: [{ es: 'Exhibicion folklorica', en: 'Folk exhibition', de: 'Volkstanzausfuehrung' }],
      practical_info: { es: 'Gastronomia local en puestos callejeros.', en: 'Local food at street stalls.', de: 'Lokales Essen an Strassenstaenden.' }
    },
    {
      slug: 'san-antonio-padua-granadilla',
      name: { es: 'San Antonio de Padua - Granadilla', en: 'San Antonio de Padua - Granadilla', de: 'San Antonio von Padua - Granadilla' },
      description: { es: 'Fiestas patronales de Granadilla de Abona con procesiones, romerias, conciertos y actividades para toda la familia.', en: 'Patron saint festival of Granadilla de Abona with processions, pilgrimages, concerts and family activities.', de: 'Patronatsfest von Granadilla de Abona.' },
      municipality: 'Granadilla de Abona', municipality_slug: 'granadilla-de-abona',
      event_type: 'fiesta_patronal', start_date: '13 Junio', month: 6,
      highlights: [{ es: 'Romeria tradicional', en: 'Traditional pilgrimage', de: 'Traditionelle Wallfahrt' }],
      practical_info: { es: 'Actividades en el casco historico.', en: 'Activities in the historic center.', de: 'Aktivitaeten im historischen Zentrum.' }
    },
    {
      slug: 'gran-fiesta-carmen-puerto-cruz',
      name: { es: 'Gran Fiesta del Carmen - Puerto de la Cruz', en: 'Grand Festival of Carmen - Puerto de la Cruz', de: 'Grosses Carmen-Fest - Puerto de la Cruz' },
      description: { es: 'Las fiestas mas importantes del norte de Tenerife. Procesion marinera de la Virgen del Carmen por el puerto, embarcaciones engalanadas, fuegos artificiales sobre el mar y verbenas. Semanas de celebraciones con conciertos y actividades culturales.', en: 'The most important festival in northern Tenerife. Maritime procession of the Virgin of Carmen through the port, decorated boats, fireworks over the sea and open-air dances. Weeks of celebrations with concerts and cultural activities.', de: 'Das wichtigste Fest im Norden Teneriffas. Maritime Prozession der Jungfrau Carmen durch den Hafen.' },
      municipality: 'Puerto de la Cruz', municipality_slug: 'puerto-de-la-cruz', area_id: areaMap['puerto-de-la-cruz'] || null,
      event_type: 'fiesta_patronal', start_date: '16 Julio', month: 7, featured: true,
      highlights: [
        { es: 'Procesion marinera', en: 'Maritime procession', de: 'Maritime Prozession' },
        { es: 'Fuegos artificiales sobre el mar', en: 'Fireworks over the sea', de: 'Feuerwerk ueber dem Meer' },
        { es: 'Embarcada de la Virgen', en: 'Embarkation of the Virgin', de: 'Einschiffung der Jungfrau' }
      ],
      practical_info: { es: 'Mejor situarse en el muelle para ver la procesion marinera. Reservar restaurante con antelacion.', en: 'Best to position yourself at the pier for the maritime procession. Book restaurants in advance.', de: 'Am besten am Pier positionieren. Restaurants im Voraus reservieren.' }
    },
    {
      slug: 'fiestas-cristo-laguna',
      name: { es: 'Fiestas del Cristo de La Laguna', en: 'Festival of the Christ of La Laguna', de: 'Fest des Christus von La Laguna' },
      description: { es: 'Las fiestas mas multitudinarias de Tenerife. La procesion del Santisimo Cristo de La Laguna reune a mas de 100.000 personas. Verbenas, conciertos, atracciones de feria y gastronomia popular durante dos semanas.', en: 'The most attended festival in Tenerife. The procession of the Holy Christ of La Laguna gathers more than 100,000 people. Open-air dances, concerts, fairground attractions and street food for two weeks.', de: 'Das meistbesuchte Fest Teneriffas. Die Prozession des Heiligen Christus von La Laguna versammelt ueber 100.000 Menschen.' },
      municipality: 'San Cristobal de La Laguna', municipality_slug: 'la-laguna', area_id: areaMap['la-laguna'] || null,
      event_type: 'fiesta_patronal', start_date: '14 Septiembre', month: 9, featured: true,
      highlights: [
        { es: 'Procesion del Cristo con 100.000+ asistentes', en: 'Christ procession with 100,000+ attendees', de: 'Christusprozession mit 100.000+ Teilnehmern' },
        { es: 'Feria con atracciones', en: 'Fairground with rides', de: 'Jahrmarkt mit Fahrgeschaeften' },
        { es: 'Conciertos gratuitos', en: 'Free concerts', de: 'Kostenlose Konzerte' }
      ],
      practical_info: { es: 'Ir en tranvia desde Santa Cruz. No llevar coche, imposible aparcar. La procesion es el 14 de septiembre por la noche.', en: 'Take the tram from Santa Cruz. Dont drive, impossible to park. The procession is on September 14th at night.', de: 'Strassenbahn von Santa Cruz nehmen. Nicht mit dem Auto fahren.' }
    },
    {
      slug: 'romeria-san-benito-laguna',
      name: { es: 'Romeria de San Benito - La Laguna', en: 'San Benito Pilgrimage - La Laguna', de: 'San Benito Wallfahrt - La Laguna' },
      description: { es: 'Colorida romeria con carretas engalanadas, trajes tipicos canarios, musica folklorica y degustacion de productos locales. Una de las romerias mas bonitas de Canarias.', en: 'Colorful pilgrimage with decorated carts, traditional Canarian costumes, folk music and local food tasting. One of the most beautiful pilgrimages in the Canary Islands.', de: 'Farbenfrohe Wallfahrt mit geschmueckten Wagen, traditionellen kanarischen Trachten und Volksmusik.' },
      municipality: 'San Cristobal de La Laguna', municipality_slug: 'la-laguna', area_id: areaMap['la-laguna'] || null,
      event_type: 'cultural', start_date: 'Julio', month: 7,
      highlights: [
        { es: 'Carretas tipicas decoradas', en: 'Traditional decorated carts', de: 'Traditionelle geschmueckte Wagen' },
        { es: 'Trajes regionales canarios', en: 'Regional Canarian costumes', de: 'Regionale kanarische Trachten' }
      ],
      practical_info: { es: 'Ponerse traje tipico canario si tienes. Probar el vino y la comida tradicional en los puestos.', en: 'Wear traditional Canarian costume if you have one. Try wine and traditional food at the stalls.', de: 'Traditionelle Tracht tragen. Wein und traditionelles Essen probieren.' }
    },
    {
      slug: 'santa-ana-garachico',
      name: { es: 'Fiestas de Santa Ana - Garachico', en: 'Santa Ana Festival - Garachico', de: 'Santa-Ana-Fest - Garachico' },
      description: { es: 'Fiestas patronales del historico pueblo de Garachico con procesiones, verbenas y el famoso bano en las piscinas naturales de El Caleton. Garachico fue el puerto principal de Tenerife antes de la erupcion volcanica de 1706.', en: 'Patron saint festival of the historic town of Garachico with processions, dances and the famous swim in El Caleton natural pools. Garachico was the main port of Tenerife before the volcanic eruption of 1706.', de: 'Patronatsfest des historischen Ortes Garachico.' },
      municipality: 'Garachico', municipality_slug: 'garachico',
      event_type: 'fiesta_patronal', start_date: '26 Julio', month: 7,
      highlights: [
        { es: 'Bano en las piscinas naturales de El Caleton', en: 'Swimming in El Caleton natural pools', de: 'Schwimmen in den Naturpools von El Caleton' }
      ],
      practical_info: { es: 'Visitar el casco historico y las piscinas naturales. Parking disponible a la entrada del pueblo.', en: 'Visit the historic center and natural pools. Parking available at the town entrance.', de: 'Historisches Zentrum und Naturpools besuchen.' }
    },
    {
      slug: 'san-marcos-icod',
      name: { es: 'Fiestas de San Marcos - Icod de los Vinos', en: 'San Marcos Festival - Icod de los Vinos', de: 'San-Marcos-Fest - Icod de los Vinos' },
      description: { es: 'Fiestas del pueblo famoso por el Drago Milenario. Procesiones, verbenas, y la popular tradicion de soltar un toro por las calles. Icod es tambien conocido por sus vinos locales.', en: 'Festival of the town famous for the Thousand-Year Dragon Tree. Processions, dances, and the popular tradition of releasing a bull through the streets. Icod is also known for its local wines.', de: 'Fest des Ortes, der fuer den Tausendjahre-Drachenbaum bekannt ist.' },
      municipality: 'Icod de los Vinos', municipality_slug: 'icod-de-los-vinos',
      event_type: 'fiesta_patronal', start_date: '25 Abril', month: 4,
      highlights: [
        { es: 'Suelta del toro por las calles', en: 'Bull release through the streets', de: 'Stierfreilassung durch die Strassen' },
        { es: 'Visita al Drago Milenario', en: 'Visit the Thousand-Year Dragon Tree', de: 'Besuch des Tausendjahre-Drachenbaums' }
      ],
      practical_info: { es: 'Aprovechar para visitar el Drago Milenario. Cuidado con la suelta del toro.', en: 'Take the opportunity to visit the Dragon Tree. Be careful with the bull release.', de: 'Gelegenheit nutzen, den Drachenbaum zu besuchen.' }
    },
    {
      slug: 'fiestas-mayo-santa-cruz',
      name: { es: 'Fiestas de Mayo - Santa Cruz', en: 'May Festivals - Santa Cruz', de: 'Maifeste - Santa Cruz' },
      description: { es: 'Celebraciones del Dia de la Cruz (3 de mayo) con cruces decoradas con flores por toda la ciudad, verbenas y actuaciones musicales.', en: 'Celebrations of the Day of the Cross (May 3rd) with flower-decorated crosses throughout the city, open-air dances and musical performances.', de: 'Feierlichkeiten zum Tag des Kreuzes am 3. Mai mit blumengeschmueckten Kreuzen in der ganzen Stadt.' },
      municipality: 'Santa Cruz de Tenerife', municipality_slug: 'santa-cruz', area_id: areaMap['santa-cruz'] || null,
      event_type: 'cultural', start_date: '3 Mayo', month: 5,
      highlights: [
        { es: 'Cruces decoradas con flores', en: 'Flower-decorated crosses', de: 'Blumengeschmueckte Kreuze' }
      ],
      practical_info: { es: 'Pasear por el centro de Santa Cruz para ver las cruces. Entrada gratuita.', en: 'Walk through Santa Cruz center to see the crosses. Free entry.', de: 'Durch das Zentrum spazieren. Freier Eintritt.' }
    },
    {
      slug: 'santiago-apostol-santiago-teide',
      name: { es: 'Santiago Apostol - Santiago del Teide', en: 'Santiago Apostol - Santiago del Teide', de: 'Santiago Apostel - Santiago del Teide' },
      description: { es: 'Fiestas patronales del municipio que alberga el famoso pueblo de Masca. Procesiones, musica y gastronomia local.', en: 'Patron saint festival of the municipality that houses the famous village of Masca. Processions, music and local gastronomy.', de: 'Patronatsfest der Gemeinde mit dem beruehmten Dorf Masca.' },
      municipality: 'Santiago del Teide', municipality_slug: 'santiago-del-teide', area_id: areaMap['los-gigantes'] || null,
      event_type: 'fiesta_patronal', start_date: '25 Julio', month: 7,
      highlights: [{ es: 'Visitar Masca y Los Gigantes', en: 'Visit Masca and Los Gigantes', de: 'Masca und Los Gigantes besuchen' }],
      practical_info: { es: 'Combinar con visita a Masca y acantilados de Los Gigantes.', en: 'Combine with a visit to Masca and Los Gigantes cliffs.', de: 'Mit Besuch von Masca und Los Gigantes kombinieren.' }
    },
    {
      slug: 'san-pedro-guimar',
      name: { es: 'San Pedro Apostol - Guimar', en: 'San Pedro Apostol - Guimar', de: 'San Pedro Apostel - Guimar' },
      description: { es: 'Fiestas patronales de Guimar con procesiones, verbenas y actos culturales. Guimar es conocido por sus piramides y su importante pasado guanche.', en: 'Patron saint festival of Guimar with processions, dances and cultural events. Guimar is known for its pyramids and important Guanche past.', de: 'Patronatsfest von Guimar.' },
      municipality: 'Guimar', municipality_slug: 'guimar',
      event_type: 'fiesta_patronal', start_date: '29 Junio', month: 6,
      highlights: [{ es: 'Visitar las Piramides de Guimar', en: 'Visit the Pyramids of Guimar', de: 'Pyramiden von Guimar besuchen' }],
      practical_info: { es: 'Aprovechar para visitar las Piramides de Guimar.', en: 'Take the chance to visit the Pyramids of Guimar.', de: 'Gelegenheit nutzen, die Pyramiden zu besuchen.' }
    },
    {
      slug: 'san-juan-bautista-rambla',
      name: { es: 'San Juan Bautista - San Juan de la Rambla', en: 'San Juan Bautista - San Juan de la Rambla', de: 'San Juan Bautista - San Juan de la Rambla' },
      description: { es: 'Celebracion de la noche de San Juan con hogueras en la playa, saltos sobre el fuego y bano nocturno en el mar. Una de las noches mas magicas del ano en Tenerife.', en: 'Celebration of St Johns Night with bonfires on the beach, jumping over fire and nighttime sea bathing. One of the most magical nights of the year in Tenerife.', de: 'Feier der Johannisnacht mit Lagerfeuern am Strand.' },
      municipality: 'San Juan de la Rambla', municipality_slug: 'san-juan-de-la-rambla',
      event_type: 'fiesta_patronal', start_date: '24 Junio', month: 6,
      highlights: [
        { es: 'Hogueras en la playa', en: 'Bonfires on the beach', de: 'Lagerfeuer am Strand' },
        { es: 'Bano nocturno en el mar', en: 'Nighttime sea bathing', de: 'Naechtliches Meeresbaden' }
      ],
      practical_info: { es: 'Llevar banador para el bano nocturno. Las hogueras empiezan al anochecer.', en: 'Bring swimwear for the night swim. Bonfires start at dusk.', de: 'Badesachen fuer das Nachtschwimmen mitbringen.' }
    },
    {
      slug: 'santa-catalina-tacoronte',
      name: { es: 'Santa Catalina - Tacoronte', en: 'Santa Catalina - Tacoronte', de: 'Santa Catalina - Tacoronte' },
      description: { es: 'Fiestas patronales de Tacoronte, famoso por sus vinos. Verbenas, procesiones y degustacion de vinos locales de la comarca.', en: 'Patron saint festival of Tacoronte, famous for its wines. Dances, processions and tasting of local wines from the region.', de: 'Patronatsfest von Tacoronte, bekannt fuer seine Weine.' },
      municipality: 'Tacoronte', municipality_slug: 'tacoronte',
      event_type: 'fiesta_patronal', start_date: '25 Noviembre', month: 11,
      highlights: [{ es: 'Degustacion de vinos de Tacoronte-Acentejo', en: 'Wine tasting from Tacoronte-Acentejo', de: 'Weinverkostung aus Tacoronte-Acentejo' }],
      practical_info: { es: 'No perderse los vinos locales DO Tacoronte-Acentejo.', en: 'Dont miss the local DO Tacoronte-Acentejo wines.', de: 'Die lokalen Weine nicht verpassen.' }
    },
    {
      slug: 'san-marcos-tegueste',
      name: { es: 'San Marcos - Tegueste', en: 'San Marcos - Tegueste', de: 'San Marcos - Tegueste' },
      description: { es: 'Fiestas de San Marcos con la famosa Romeria de Tegueste, una de las mas coloridas de la isla con carretas, folclore y productos tipicos.', en: 'San Marcos festival with the famous Tegueste Pilgrimage, one of the most colorful on the island with carts, folklore and typical products.', de: 'San-Marcos-Fest mit der beruehmten Wallfahrt von Tegueste.' },
      municipality: 'Tegueste', municipality_slug: 'tegueste',
      event_type: 'fiesta_patronal', start_date: '25 Abril', month: 4,
      highlights: [{ es: 'Romeria con carretas tipicas', en: 'Pilgrimage with traditional carts', de: 'Wallfahrt mit traditionellen Wagen' }],
      practical_info: { es: 'Ponerse ropa de mago (traje tipico) si se tiene.', en: 'Wear traditional Canarian costume if you have one.', de: 'Traditionelle Tracht tragen.' }
    },
    {
      slug: 'nuestra-senora-rosario',
      name: { es: 'Nuestra Senora del Rosario - El Rosario', en: 'Our Lady of the Rosary - El Rosario', de: 'Unsere Liebe Frau vom Rosenkranz - El Rosario' },
      description: { es: 'Fiestas patronales de El Rosario con actos religiosos, verbenas y actividades familiares.', en: 'Patron saint festival of El Rosario with religious events, dances and family activities.', de: 'Patronatsfest von El Rosario.' },
      municipality: 'El Rosario', municipality_slug: 'el-rosario',
      event_type: 'fiesta_patronal', start_date: '7 Octubre', month: 10,
      highlights: [{ es: 'Actos religiosos y culturales', en: 'Religious and cultural events', de: 'Religioese und kulturelle Veranstaltungen' }],
      practical_info: { es: 'Fiestas familiares y tranquilas.', en: 'Family-friendly and relaxed festival.', de: 'Familienfreundliches und entspanntes Fest.' }
    },
    {
      slug: 'nuestra-senora-luz-guia-isora',
      name: { es: 'Nuestra Senora de la Luz - Guia de Isora', en: 'Our Lady of the Light - Guia de Isora', de: 'Unsere Liebe Frau des Lichts - Guia de Isora' },
      description: { es: 'Fiestas patronales de Guia de Isora con procesiones, romerias, verbenas y gastronomia local.', en: 'Patron saint festival of Guia de Isora with processions, pilgrimages, dances and local cuisine.', de: 'Patronatsfest von Guia de Isora.' },
      municipality: 'Guia de Isora', municipality_slug: 'guia-de-isora',
      event_type: 'fiesta_patronal', start_date: 'Agosto', month: 8,
      highlights: [{ es: 'Romeria y gastronomia local', en: 'Pilgrimage and local cuisine', de: 'Wallfahrt und lokale Kueche' }],
      practical_info: { es: 'Probar la gastronomia local en los puestos.', en: 'Try local cuisine at the stalls.', de: 'Lokale Kueche an den Staenden probieren.' }
    },
    {
      slug: 'san-pedro-vilaflor',
      name: { es: 'San Pedro Apostol - Vilaflor', en: 'San Pedro Apostol - Vilaflor', de: 'San Pedro Apostel - Vilaflor' },
      description: { es: 'Fiestas del pueblo mas alto de Espana (1.400m). Procesiones, verbenas y la oportunidad de disfrutar del aire puro de montaña. Vilaflor es la puerta de acceso al Parque Nacional del Teide.', en: 'Festival of the highest village in Spain (1,400m). Processions, dances and the opportunity to enjoy pure mountain air. Vilaflor is the gateway to Teide National Park.', de: 'Fest des hoechsten Dorfes Spaniens (1.400m).' },
      municipality: 'Vilaflor', municipality_slug: 'vilaflor', area_id: areaMap['teide'] || null,
      event_type: 'fiesta_patronal', start_date: '29 Junio', month: 6,
      highlights: [{ es: 'Pueblo mas alto de Espana', en: 'Highest village in Spain', de: 'Hoechstes Dorf Spaniens' }],
      practical_info: { es: 'Subir al Teide despues de las fiestas. Llevar ropa de abrigo por la altitud.', en: 'Go up to Teide after the festival. Bring warm clothes due to altitude.', de: 'Nach dem Fest zum Teide fahren. Warme Kleidung wegen der Hoehe.' }
    }
  ]

  // Ensure all events have featured set (required by DB constraint)
  const eventsWithDefaults = events.map(e => ({
    ...e,
    featured: e.featured ?? false,
    visible: e.visible ?? true,
  }))

  console.log('Inserting events...')
  const { data, error } = await supabase.from('events').upsert(eventsWithDefaults, { onConflict: 'slug' })
  if (error) {
    console.error('Error:', error.message)
  } else {
    console.log(`✓ ${events.length} events inserted!`)
  }
}

seedEvents()
