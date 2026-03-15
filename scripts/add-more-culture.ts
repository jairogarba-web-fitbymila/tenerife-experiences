/**
 * Script to add more cultural events, romerías, and traditions to the events table
 * Run with: npx tsx scripts/add-more-culture.ts
 */

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://sqesgghvaazyajzjkoap.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxZXNnZ2h2YWF6eWFqemprb2FwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzUxMzgwOSwiZXhwIjoyMDg5MDg5ODA5fQ.UvbRfWU9seJPT9lyCyLmpD4uZrP9jXzsNoeSAjT9HnI'
)

// Images
const IMG_TRADITIONAL = 'https://images.unsplash.com/photo-1656252779225-5bbd338acd14?w=1200&q=80'
const IMG_FOOD = 'https://images.unsplash.com/photo-1624458989436-7f2535c8c339?w=1200&q=80'
const IMG_FIREWORKS = 'https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?w=1200&q=80'

async function main() {
  console.log('Adding more cultural events to Tenerife Experiences...\n')

  // Check which slugs already exist
  const { data: existing } = await supabase
    .from('events')
    .select('slug')
    .in('slug', ['romeria-san-benito-laguna', 'corpus-christi-orotava', 'alfombras-corpus-orotava'])

  const existingSlugs = new Set((existing || []).map(e => e.slug))
  console.log('Existing slugs found:', [...existingSlugs])

  const events: any[] = []

  // ===========================
  // ROMERÍAS (event_type: 'cultural')
  // ===========================

  events.push({
    slug: 'romeria-san-isidro-los-realejos',
    name: {
      es: 'Romeria de San Isidro Labrador - Los Realejos',
      en: 'San Isidro Labrador Pilgrimage - Los Realejos',
      de: 'Wallfahrt San Isidro Labrador - Los Realejos'
    },
    description: {
      es: 'Una de las romerias mas populares de Tenerife en honor a San Isidro Labrador, patron de los agricultores. Carretas decoradas tiradas por bueyes recorren las calles de Los Realejos, acompanadas de cientos de romeros vestidos con el traje de mago (traje tipico canario). Musica folklorica en vivo, degustacion de vino del pais y comida tradicional canaria.',
      en: 'One of the most popular pilgrimages in Tenerife honoring San Isidro Labrador, patron saint of farmers. Decorated carts pulled by oxen parade through the streets of Los Realejos, accompanied by hundreds of pilgrims dressed in traditional Canarian costumes (traje de mago). Live folk music, local wine tasting and traditional Canarian food.',
      de: 'Eine der beliebtesten Wallfahrten Teneriffas zu Ehren des Heiligen Isidro Labrador, Schutzpatron der Bauern. Geschmueckte Ochsenkarren ziehen durch die Strassen von Los Realejos, begleitet von Hunderten von Pilgern in traditioneller kanarischer Tracht (traje de mago). Live-Volksmusik, lokale Weinverkostung und traditionelles kanarisches Essen.'
    },
    municipality: 'Los Realejos',
    municipality_slug: 'los-realejos',
    event_type: 'cultural',
    start_date: 'Mayo',
    month: 5,
    image: IMG_TRADITIONAL,
    visible: true,
    featured: true,
    highlights: [
      { es: 'Carretas decoradas tiradas por bueyes', en: 'Decorated carts pulled by oxen', de: 'Geschmueckte Ochsenkarren' },
      { es: 'Cientos de romeros en traje de mago', en: 'Hundreds of pilgrims in traditional Canarian dress', de: 'Hunderte Pilger in traditioneller kanarischer Tracht' },
      { es: 'Musica folklorica canaria en vivo', en: 'Live Canarian folk music', de: 'Live kanarische Volksmusik' },
      { es: 'Degustacion de vino y comida tipica', en: 'Wine and traditional food tasting', de: 'Wein- und traditionelle Essensverkostung' }
    ],
    practical_info: {
      es: 'Se celebra en mayo. Vestirse con traje de mago si es posible. Las carretas salen por la manana y el ambiente festivo dura todo el dia. Comida y bebida gratis en muchos puestos.',
      en: 'Held in May. Wear traditional Canarian costume if possible. Carts depart in the morning and the festive atmosphere lasts all day. Free food and drinks at many stalls.',
      de: 'Findet im Mai statt. Traditionelle kanarische Tracht tragen wenn moeglich. Die Karren starten am Morgen und die festliche Stimmung haelt den ganzen Tag an. Kostenloses Essen und Trinken an vielen Staenden.'
    }
  })

  events.push({
    slug: 'romeria-san-isidro-la-orotava',
    name: {
      es: 'Romeria de San Isidro - La Orotava',
      en: 'San Isidro Pilgrimage - La Orotava',
      de: 'San Isidro Wallfahrt - La Orotava'
    },
    description: {
      es: 'Colorida romeria que recorre las calles historicas de La Orotava con cientos de personas vestidas con trajes tipicos canarios. Las carretas cargadas de productos tradicionales y decoradas con flores avanzan entre los edificios coloniales del casco historico. Ambiente festivo con musica folklorica y degustacion de productos locales.',
      en: 'Colorful pilgrimage through the historic streets of La Orotava with hundreds of people dressed in traditional Canarian costumes. Carts loaded with traditional products and decorated with flowers pass between the colonial buildings of the historic center. Festive atmosphere with folk music and local product tastings.',
      de: 'Farbenfrohe Wallfahrt durch die historischen Strassen von La Orotava mit Hunderten von Menschen in traditioneller kanarischer Tracht. Mit traditionellen Produkten beladene und mit Blumen geschmueckte Karren ziehen zwischen den Kolonialgebaeuden der Altstadt hindurch. Festliche Atmosphaere mit Volksmusik und lokalen Produktverkostungen.'
    },
    municipality: 'La Orotava',
    municipality_slug: 'la-orotava',
    event_type: 'cultural',
    start_date: 'Junio',
    month: 6,
    image: IMG_TRADITIONAL,
    visible: true,
    featured: false,
    highlights: [
      { es: 'Desfile por el casco historico colonial', en: 'Parade through the colonial historic center', de: 'Umzug durch die koloniale Altstadt' },
      { es: 'Carretas con productos tradicionales', en: 'Carts with traditional products', de: 'Karren mit traditionellen Produkten' },
      { es: 'Trajes tipicos canarios', en: 'Traditional Canarian costumes', de: 'Traditionelle kanarische Trachten' }
    ],
    practical_info: {
      es: 'Se celebra en junio. El recorrido pasa por las calles mas bonitas de La Orotava. Parking limitado, mejor usar transporte publico.',
      en: 'Held in June. The route passes through the most beautiful streets of La Orotava. Limited parking, better to use public transport.',
      de: 'Findet im Juni statt. Die Route fuehrt durch die schoensten Strassen von La Orotava. Begrenztes Parken, besser oeffentliche Verkehrsmittel nutzen.'
    }
  })

  events.push({
    slug: 'romeria-san-roque-garachico',
    name: {
      es: 'Romeria de San Roque - Garachico',
      en: 'San Roque Pilgrimage - Garachico',
      de: 'San Roque Wallfahrt - Garachico'
    },
    description: {
      es: 'Romeria historica en el bello pueblo de Garachico, antiguo puerto principal de Tenerife antes de la erupcion volcanica de 1706. Carretas decoradas, agrupaciones folkloricas y degustacion de comida tradicional en un entorno unico junto a las piscinas naturales de El Caleton y el casco historico.',
      en: 'Historic pilgrimage in the beautiful town of Garachico, former main port of Tenerife before the volcanic eruption of 1706. Decorated carts, folk groups and traditional food tasting in a unique setting next to El Caleton natural pools and the historic center.',
      de: 'Historische Wallfahrt im schoenen Ort Garachico, dem ehemaligen Haupthafen Teneriffas vor dem Vulkanausbruch von 1706. Geschmueckte Karren, Folkloregruppen und traditionelle Essensverkostung in einzigartiger Kulisse neben den Naturpools von El Caleton und der Altstadt.'
    },
    municipality: 'Garachico',
    municipality_slug: 'garachico',
    event_type: 'cultural',
    start_date: '08-16',
    month: 8,
    image: IMG_TRADITIONAL,
    visible: true,
    featured: false,
    highlights: [
      { es: 'Entorno unico junto a las piscinas naturales', en: 'Unique setting next to natural pools', de: 'Einzigartige Kulisse neben den Naturpools' },
      { es: 'Carretas decoradas y agrupaciones folkloricas', en: 'Decorated carts and folk groups', de: 'Geschmueckte Karren und Folkloregruppen' },
      { es: 'Casco historico de Garachico', en: 'Historic center of Garachico', de: 'Altstadt von Garachico' }
    ],
    practical_info: {
      es: 'Se celebra el 16 de agosto. Aprovechar para visitar las piscinas naturales de El Caleton y el castillo de San Miguel. Aparcamiento a la entrada del pueblo.',
      en: 'Held on August 16th. Take the opportunity to visit El Caleton natural pools and San Miguel castle. Parking at the town entrance.',
      de: 'Am 16. August. Gelegenheit nutzen, die Naturpools von El Caleton und die Burg San Miguel zu besuchen. Parkplaetze am Ortseingang.'
    }
  })

  // Romería de San Marcos, Tegueste - check if san-marcos-tegueste already exists
  // The existing one is a fiesta_patronal. We add the specific romería event.
  events.push({
    slug: 'romeria-san-marcos-tegueste',
    name: {
      es: 'Romeria de San Marcos - Tegueste',
      en: 'San Marcos Pilgrimage - Tegueste',
      de: 'San Marcos Wallfahrt - Tegueste'
    },
    description: {
      es: 'Una de las romerias mas coloridas y multitudinarias de Tenerife. Miles de personas vestidas con trajes de mago acompanan las carretas tipicas decoradas con flores y cargadas de productos del campo por las calles de Tegueste. Musica folklorica, bailes canarios, vino del pais y comida tradicional en un ambiente festivo inigualable.',
      en: 'One of the most colorful and crowded pilgrimages in Tenerife. Thousands of people dressed in traditional Canarian costumes accompany typical carts decorated with flowers and loaded with farm products through the streets of Tegueste. Folk music, Canarian dances, local wine and traditional food in an unmatched festive atmosphere.',
      de: 'Eine der farbenfrohsten und meistbesuchten Wallfahrten Teneriffas. Tausende Menschen in traditioneller kanarischer Tracht begleiten typische, mit Blumen geschmueckte und mit Landprodukten beladene Karren durch die Strassen von Tegueste. Volksmusik, kanarische Taenze, einheimischer Wein und traditionelles Essen in einzigartiger Festatmosphaere.'
    },
    municipality: 'Tegueste',
    municipality_slug: 'tegueste',
    event_type: 'cultural',
    start_date: '04-25',
    month: 4,
    image: IMG_TRADITIONAL,
    visible: true,
    featured: true,
    highlights: [
      { es: 'Miles de romeros en traje de mago', en: 'Thousands of pilgrims in traditional dress', de: 'Tausende Pilger in traditioneller Tracht' },
      { es: 'Carretas decoradas con flores y productos del campo', en: 'Carts decorated with flowers and farm products', de: 'Mit Blumen und Landprodukten geschmueckte Karren' },
      { es: 'Musica folklorica y bailes canarios', en: 'Folk music and Canarian dances', de: 'Volksmusik und kanarische Taenze' },
      { es: 'Degustacion de vino del pais y comida tipica', en: 'Local wine and traditional food tasting', de: 'Einheimischer Wein und traditionelle Essensverkostung' }
    ],
    practical_info: {
      es: 'Se celebra el 25 de abril. Llegar temprano para encontrar buen sitio. Transporte publico recomendado desde La Laguna. Vestirse de mago para integrarse en la fiesta.',
      en: 'Held on April 25th. Arrive early for a good spot. Public transport recommended from La Laguna. Wear traditional costume to blend in with the festivities.',
      de: 'Am 25. April. Frueh kommen fuer einen guten Platz. Oeffentliche Verkehrsmittel von La Laguna empfohlen. Traditionelle Tracht tragen um in die Festlichkeiten einzutauchen.'
    }
  })

  // Skip romeria-san-benito-laguna if it already exists
  if (!existingSlugs.has('romeria-san-benito-laguna')) {
    console.log('romeria-san-benito-laguna does not exist, but it was in create-events.ts as romeria-san-benito-laguna. Checking...')
  } else {
    console.log('Skipping romeria-san-benito-laguna (already exists)')
  }

  // ===========================
  // BAILES DE MAGOS (event_type: 'cultural')
  // ===========================

  events.push({
    slug: 'baile-magos-icod',
    name: {
      es: 'Baile de Magos - Icod de los Vinos',
      en: 'Traditional Folk Dance - Icod de los Vinos',
      de: 'Traditioneller Volkstanz - Icod de los Vinos'
    },
    description: {
      es: 'Encuentro tradicional de folclore canario donde todos los asistentes visten el traje de mago (traje tipico canario). Musica folklorica en vivo con timples, guitarras y bandurrias mientras los participantes bailan isas, folias y malaguenas. Vino del pais de Icod y comida tradicional. Una de las experiencias culturales mas autenticas de Tenerife.',
      en: 'Traditional Canarian folk gathering where all attendees dress in "traje de mago" (traditional Canarian costume). Live folk music with timples, guitars and bandurrias while participants dance isas, folias and malaguenas. Local wine from Icod and traditional food. One of the most authentic cultural experiences in Tenerife.',
      de: 'Traditionelles kanarisches Folkloretreffen, bei dem alle Teilnehmer den "traje de mago" (traditionelle kanarische Tracht) tragen. Live-Volksmusik mit Timples, Gitarren und Bandurrias, waehrend die Teilnehmer Isas, Folias und Malaguenas tanzen. Einheimischer Wein aus Icod und traditionelles Essen. Eine der authentischsten kulturellen Erfahrungen auf Teneriffa.'
    },
    municipality: 'Icod de los Vinos',
    municipality_slug: 'icod-de-los-vinos',
    event_type: 'cultural',
    start_date: 'Noviembre',
    month: 11,
    image: IMG_TRADITIONAL,
    visible: true,
    featured: false,
    highlights: [
      { es: 'Todos visten traje de mago tipico canario', en: 'Everyone wears traditional Canarian costume', de: 'Alle tragen die traditionelle kanarische Tracht' },
      { es: 'Musica folklorica en vivo con timple', en: 'Live folk music with timple', de: 'Live-Volksmusik mit Timple' },
      { es: 'Bailes tradicionales: isas, folias, malaguenas', en: 'Traditional dances: isas, folias, malaguenas', de: 'Traditionelle Taenze: Isas, Folias, Malaguenas' },
      { es: 'Vino del pais de Icod y gastronomia local', en: 'Local wine from Icod and regional gastronomy', de: 'Einheimischer Wein aus Icod und regionale Gastronomie' }
    ],
    practical_info: {
      es: 'Se celebra en noviembre. Imprescindible ir vestido de mago. Se puede alquilar o comprar trajes en tiendas de artesania. Ambiente muy acogedor y autentico.',
      en: 'Held in November. Essential to wear traditional costume. Costumes can be rented or bought at craft shops. Very welcoming and authentic atmosphere.',
      de: 'Findet im November statt. Traditionelle Tracht ist ein Muss. Trachten koennen in Handwerkslaeden gemietet oder gekauft werden. Sehr einladende und authentische Atmosphaere.'
    }
  })

  events.push({
    slug: 'baile-magos-la-orotava',
    name: {
      es: 'Gran Baile de Magos - La Orotava',
      en: 'Grand Traditional Folk Dance - La Orotava',
      de: 'Grosser Traditioneller Volkstanz - La Orotava'
    },
    description: {
      es: 'El Gran Baile de Magos de La Orotava es uno de los mas grandes y concurridos de la isla. Cientos de personas vestidas con el traje tipico canario se reunen en la hermosa villa de La Orotava para bailar al ritmo de la musica folklorica. Una celebracion de la identidad canaria con vino, comida tradicional y mucha alegria.',
      en: 'The Grand Baile de Magos of La Orotava is one of the largest and most attended on the island. Hundreds of people dressed in traditional Canarian costume gather in the beautiful town of La Orotava to dance to folk music. A celebration of Canarian identity with wine, traditional food and great joy.',
      de: 'Der Grosse Baile de Magos von La Orotava ist einer der groessten und meistbesuchten der Insel. Hunderte von Menschen in traditioneller kanarischer Tracht versammeln sich in der schoenen Stadt La Orotava, um zu Volksmusik zu tanzen. Ein Fest der kanarischen Identitaet mit Wein, traditionellem Essen und grosser Freude.'
    },
    municipality: 'La Orotava',
    municipality_slug: 'la-orotava',
    event_type: 'cultural',
    start_date: 'Noviembre',
    month: 11,
    image: IMG_TRADITIONAL,
    visible: true,
    featured: false,
    highlights: [
      { es: 'Uno de los bailes de magos mas grandes de la isla', en: 'One of the largest traditional dances on the island', de: 'Einer der groessten traditionellen Taenze der Insel' },
      { es: 'Cientos de personas en traje tipico', en: 'Hundreds of people in traditional costume', de: 'Hunderte Menschen in traditioneller Tracht' },
      { es: 'Marco incomparable del casco historico de La Orotava', en: 'Incomparable setting of La Orotava historic center', de: 'Unvergleichliche Kulisse der Altstadt von La Orotava' }
    ],
    practical_info: {
      es: 'Se celebra en noviembre. Vestirse de mago es casi obligatorio. La Orotava tiene transporte publico desde Puerto de la Cruz y Santa Cruz.',
      en: 'Held in November. Wearing traditional costume is practically mandatory. La Orotava has public transport from Puerto de la Cruz and Santa Cruz.',
      de: 'Findet im November statt. Traditionelle Tracht ist fast Pflicht. La Orotava ist mit oeffentlichen Verkehrsmitteln von Puerto de la Cruz und Santa Cruz erreichbar.'
    }
  })

  // ===========================
  // CARNAVALES (event_type: 'carnival')
  // ===========================

  events.push({
    slug: 'carnaval-puerto-cruz',
    name: {
      es: 'Carnaval de Puerto de la Cruz',
      en: 'Puerto de la Cruz Carnival',
      de: 'Karneval von Puerto de la Cruz'
    },
    description: {
      es: 'El segundo carnaval mas importante de Tenerife despues del de Santa Cruz. Mas intimo y local, con desfiles callejeros, comparsas, murgas, eleccion de la reina y el tradicional entierro de la sardina. El ambiente es mas cercano y autentico, con los vecinos del Puerto disfrazandose y bailando por las calles del casco historico.',
      en: 'The second most important carnival in Tenerife after Santa Cruz. More intimate and local, with street parades, comparsas, murgas, queen election and the traditional burial of the sardine. The atmosphere is more personal and authentic, with Puerto locals dressing up and dancing through the streets of the historic center.',
      de: 'Der zweitwichtigste Karneval Teneriffas nach Santa Cruz. Intimer und lokaler, mit Strassenumzuegen, Comparsas, Murgas, Koeniginnenwahl und der traditionellen Beerdigung der Sardine. Die Atmosphaere ist persoenlicher und authentischer, mit Einheimischen, die sich verkleiden und durch die Strassen der Altstadt tanzen.'
    },
    municipality: 'Puerto de la Cruz',
    municipality_slug: 'puerto-de-la-cruz',
    event_type: 'carnival',
    start_date: 'Febrero',
    end_date: 'Marzo',
    month: 2,
    image: IMG_TRADITIONAL,
    visible: true,
    featured: true,
    highlights: [
      { es: 'Ambiente mas intimo que Santa Cruz', en: 'More intimate atmosphere than Santa Cruz', de: 'Intimere Atmosphaere als Santa Cruz' },
      { es: 'Desfiles por el casco historico', en: 'Parades through the historic center', de: 'Umzuege durch die Altstadt' },
      { es: 'Comparsas y murgas locales', en: 'Local comparsas and murgas', de: 'Lokale Comparsas und Murgas' },
      { es: 'Entierro de la sardina', en: 'Burial of the sardine', de: 'Beerdigung der Sardine' }
    ],
    practical_info: {
      es: 'Se celebra entre febrero y marzo. Disfrazarse es casi obligatorio. Hoteles se llenan rapido, reservar con antelacion. Transporte publico reforzado desde La Orotava y Santa Cruz.',
      en: 'Held between February and March. Costumes are practically mandatory. Hotels fill up fast, book in advance. Enhanced public transport from La Orotava and Santa Cruz.',
      de: 'Zwischen Februar und Maerz. Kostueme sind fast Pflicht. Hotels fuellen sich schnell, frueh buchen. Verstaerkter oeffentlicher Nahverkehr von La Orotava und Santa Cruz.'
    }
  })

  events.push({
    slug: 'carnaval-los-cristianos',
    name: {
      es: 'Carnaval de Los Cristianos',
      en: 'Los Cristianos Carnival',
      de: 'Karneval von Los Cristianos'
    },
    description: {
      es: 'Carnaval popular en el sur turistico de Tenerife. Ambiente internacional y divertido con desfiles a lo largo del paseo maritimo, comparsas, musica y fiestas en la calle. Una alternativa mas accesible al carnaval de Santa Cruz para los visitantes que se alojan en el sur de la isla.',
      en: 'Popular carnival in the tourist south of Tenerife. International and fun atmosphere with parades along the promenade, comparsas, music and street parties. A more accessible alternative to Santa Cruz carnival for visitors staying in the south of the island.',
      de: 'Beliebter Karneval im touristischen Sueden Teneriffas. Internationale und lustige Atmosphaere mit Umzuegen entlang der Strandpromenade, Comparsas, Musik und Strassenfesten. Eine zugaenglichere Alternative zum Karneval von Santa Cruz fuer Besucher im Sueden der Insel.'
    },
    municipality: 'Arona',
    municipality_slug: 'arona',
    event_type: 'carnival',
    start_date: 'Febrero',
    end_date: 'Marzo',
    month: 2,
    image: IMG_TRADITIONAL,
    visible: true,
    featured: false,
    highlights: [
      { es: 'Desfiles por el paseo maritimo', en: 'Parades along the promenade', de: 'Umzuege entlang der Strandpromenade' },
      { es: 'Ambiente internacional y turistico', en: 'International and touristic atmosphere', de: 'Internationale und touristische Atmosphaere' },
      { es: 'Facil acceso desde hoteles del sur', en: 'Easy access from southern hotels', de: 'Einfacher Zugang von Suedhotels' }
    ],
    practical_info: {
      es: 'Se celebra entre febrero y marzo. Zona turistica con muchos hoteles y restaurantes. Facil acceso en transporte publico desde Costa Adeje y Las Americas.',
      en: 'Held between February and March. Tourist area with many hotels and restaurants. Easy access by public transport from Costa Adeje and Las Americas.',
      de: 'Zwischen Februar und Maerz. Touristengebiet mit vielen Hotels und Restaurants. Einfacher Zugang mit oeffentlichen Verkehrsmitteln von Costa Adeje und Las Americas.'
    }
  })

  events.push({
    slug: 'carnaval-la-orotava',
    name: {
      es: 'Carnaval de La Orotava',
      en: 'La Orotava Carnival',
      de: 'Karneval von La Orotava'
    },
    description: {
      es: 'Carnaval tradicional en el historico pueblo de La Orotava. El entierro de la sardina, la eleccion de la reina y los desfiles por las calles coloniales del casco historico le dan un encanto especial. Un carnaval con sabor a tradicion en uno de los pueblos mas bonitos de Tenerife.',
      en: 'Traditional carnival in the historic town of La Orotava. The burial of the sardine, queen election and parades through the colonial streets of the historic center give it a special charm. A carnival with a taste of tradition in one of the most beautiful towns in Tenerife.',
      de: 'Traditioneller Karneval in der historischen Stadt La Orotava. Die Beerdigung der Sardine, die Koeniginnenwahl und die Umzuege durch die Kolonialstrassen der Altstadt verleihen ihm einen besonderen Charme. Ein Karneval mit Tradition in einer der schoensten Staedte Teneriffas.'
    },
    municipality: 'La Orotava',
    municipality_slug: 'la-orotava',
    event_type: 'carnival',
    start_date: 'Febrero',
    end_date: 'Marzo',
    month: 2,
    image: IMG_TRADITIONAL,
    visible: true,
    featured: false,
    highlights: [
      { es: 'Desfiles por calles coloniales', en: 'Parades through colonial streets', de: 'Umzuege durch Kolonialstrassen' },
      { es: 'Entierro de la sardina', en: 'Burial of the sardine', de: 'Beerdigung der Sardine' },
      { es: 'Marco historico incomparable', en: 'Incomparable historic setting', de: 'Unvergleichliche historische Kulisse' }
    ],
    practical_info: {
      es: 'Se celebra entre febrero y marzo. Las calles del casco historico se cierran al trafico. Transporte publico desde Puerto de la Cruz.',
      en: 'Held between February and March. Historic center streets are closed to traffic. Public transport from Puerto de la Cruz.',
      de: 'Zwischen Februar und Maerz. Altstadtstrassen werden fuer den Verkehr gesperrt. Oeffentliche Verkehrsmittel von Puerto de la Cruz.'
    }
  })

  events.push({
    slug: 'carnaval-icod',
    name: {
      es: 'Carnaval de Icod de los Vinos',
      en: 'Icod de los Vinos Carnival',
      de: 'Karneval von Icod de los Vinos'
    },
    description: {
      es: 'Carnaval famoso por su tradicion unica: la "Boda de la Burra", una representacion satirica y humoristica que se celebra desde hace generaciones. Ademas, desfiles de disfraces, comparsas, verbenas y el entierro de la sardina. Un carnaval con personalidad propia en la villa del Drago Milenario.',
      en: 'Carnival famous for its unique tradition: the "Boda de la Burra" (Donkey Wedding), a satirical and humorous performance celebrated for generations. Also features costume parades, comparsas, open-air dances and the burial of the sardine. A carnival with its own personality in the town of the Thousand-Year Dragon Tree.',
      de: 'Karneval, berühmt fuer seine einzigartige Tradition: die "Boda de la Burra" (Eselshochzeit), eine satirische und humorvolle Auffuehrung, die seit Generationen gefeiert wird. Dazu Kostuemumzuege, Comparsas, Volksfeste und die Beerdigung der Sardine. Ein Karneval mit eigener Persoenlichkeit in der Stadt des Tausendjahre-Drachenbaums.'
    },
    municipality: 'Icod de los Vinos',
    municipality_slug: 'icod-de-los-vinos',
    event_type: 'carnival',
    start_date: 'Febrero',
    end_date: 'Marzo',
    month: 2,
    image: IMG_TRADITIONAL,
    visible: true,
    featured: false,
    highlights: [
      { es: 'La famosa "Boda de la Burra" (tradicion satirica unica)', en: 'The famous "Donkey Wedding" (unique satirical tradition)', de: 'Die beruehmte "Eselshochzeit" (einzigartige satirische Tradition)' },
      { es: 'Desfiles de disfraces y comparsas', en: 'Costume parades and comparsas', de: 'Kostuemumzuege und Comparsas' },
      { es: 'Entorno del Drago Milenario', en: 'Setting of the Thousand-Year Dragon Tree', de: 'Umgebung des Tausendjahre-Drachenbaums' }
    ],
    practical_info: {
      es: 'Se celebra entre febrero y marzo. La "Boda de la Burra" es el evento mas esperado. Aprovechar para visitar el Drago Milenario.',
      en: 'Held between February and March. The "Donkey Wedding" is the most anticipated event. Take the opportunity to visit the Dragon Tree.',
      de: 'Zwischen Februar und Maerz. Die "Eselshochzeit" ist das am meisten erwartete Ereignis. Gelegenheit nutzen, den Drachenbaum zu besuchen.'
    }
  })

  // ===========================
  // GASTRONOMIC (event_type: 'gastronomic')
  // ===========================

  events.push({
    slug: 'feria-vino-tacoronte',
    name: {
      es: 'Feria del Vino de Tacoronte',
      en: 'Tacoronte Wine Fair',
      de: 'Weinfest von Tacoronte'
    },
    description: {
      es: 'Feria dedicada a los vinos de la Denominacion de Origen Tacoronte-Acentejo, la mas antigua de Canarias. Degustacion de vinos tintos, blancos y rosados de las bodegas de la comarca, maridajes con gastronomia local, musica en vivo y actividades culturales. Una cita imprescindible para los amantes del vino canario.',
      en: 'Fair dedicated to the wines of the Tacoronte-Acentejo Denomination of Origin, the oldest in the Canary Islands. Tasting of red, white and rose wines from local wineries, food pairings with local gastronomy, live music and cultural activities. An essential event for lovers of Canarian wine.',
      de: 'Messe fuer die Weine der Herkunftsbezeichnung Tacoronte-Acentejo, der aeltesten der Kanarischen Inseln. Verkostung von Rot-, Weiss- und Roseweinen lokaler Weingueter, Speisenpaarungen mit lokaler Gastronomie, Live-Musik und kulturelle Aktivitaeten. Ein Muss fuer Liebhaber kanarischer Weine.'
    },
    municipality: 'Tacoronte',
    municipality_slug: 'tacoronte',
    event_type: 'gastronomic',
    start_date: 'Mayo',
    month: 5,
    image: IMG_FOOD,
    visible: true,
    featured: false,
    highlights: [
      { es: 'Degustacion de vinos DO Tacoronte-Acentejo', en: 'Tacoronte-Acentejo DO wine tasting', de: 'Tacoronte-Acentejo DO Weinverkostung' },
      { es: 'Maridajes con gastronomia local', en: 'Food pairings with local cuisine', de: 'Speisenpaarungen mit lokaler Kueche' },
      { es: 'Musica en vivo y actividades culturales', en: 'Live music and cultural activities', de: 'Live-Musik und kulturelle Aktivitaeten' }
    ],
    practical_info: {
      es: 'Se celebra en mayo en el centro de Tacoronte. Entrada con copa incluida. Llevar conductor designado o usar transporte publico. Los vinos se pueden comprar directamente a las bodegas.',
      en: 'Held in May in Tacoronte center. Entry includes a wine glass. Bring a designated driver or use public transport. Wines can be purchased directly from the wineries.',
      de: 'Findet im Mai im Zentrum von Tacoronte statt. Eintritt mit Weinglas inklusive. Einen Fahrer mitbringen oder oeffentliche Verkehrsmittel nutzen. Weine koennen direkt bei den Weinguetern gekauft werden.'
    }
  })

  events.push({
    slug: 'feria-queso-arico',
    name: {
      es: 'Feria del Queso de Arico',
      en: 'Arico Cheese Fair',
      de: 'Kaesemesse von Arico'
    },
    description: {
      es: 'Feria del queso artesano con los mejores quesos de cabra y oveja de Tenerife. Degustaciones, concursos de quesos, talleres de elaboracion y maridajes con vinos locales y miel de abeja negra canaria. Una oportunidad unica para conocer la tradicion quesera de la isla directamente de los productores.',
      en: 'Artisan cheese fair featuring the best goat and sheep cheeses from Tenerife. Tastings, cheese competitions, cheesemaking workshops and pairings with local wines and Canarian black bee honey. A unique opportunity to learn about the island cheese tradition directly from the producers.',
      de: 'Handwerkskaesemesse mit den besten Ziegen- und Schafskaesen aus Teneriffa. Verkostungen, Kaesewettbewerbe, Kaaseherstellungsworkshops und Paarungen mit lokalen Weinen und kanarischem Schwarzbienenhonig. Eine einzigartige Gelegenheit, die Kaesetradition der Insel direkt von den Produzenten kennenzulernen.'
    },
    municipality: 'Arico',
    municipality_slug: 'arico',
    event_type: 'gastronomic',
    start_date: 'Noviembre',
    month: 11,
    image: IMG_FOOD,
    visible: true,
    featured: false,
    highlights: [
      { es: 'Mejores quesos artesanos de Tenerife', en: 'Best artisan cheeses from Tenerife', de: 'Beste Handwerkskaese aus Teneriffa' },
      { es: 'Concursos y talleres de elaboracion', en: 'Competitions and cheesemaking workshops', de: 'Wettbewerbe und Kaaseherstellungsworkshops' },
      { es: 'Maridaje con vinos y miel local', en: 'Pairing with local wines and honey', de: 'Paarung mit lokalen Weinen und Honig' }
    ],
    practical_info: {
      es: 'Se celebra en noviembre en Arico. Los quesos se pueden comprar directamente a los productores. Precios muy razonables. Llevar nevera para conservar los quesos.',
      en: 'Held in November in Arico. Cheeses can be purchased directly from producers. Very reasonable prices. Bring a cooler to preserve the cheeses.',
      de: 'Findet im November in Arico statt. Kaese koennen direkt bei den Produzenten gekauft werden. Sehr guenstige Preise. Eine Kuehlbox mitbringen.'
    }
  })

  events.push({
    slug: 'ruta-tapas-santa-cruz',
    name: {
      es: 'Ruta de la Tapa - Santa Cruz',
      en: 'Tapas Route - Santa Cruz',
      de: 'Tapas-Route - Santa Cruz'
    },
    description: {
      es: 'Ruta gastronomica por los bares y restaurantes de Santa Cruz de Tenerife donde cada establecimiento ofrece una tapa especial a precio reducido. Una forma fantastica de descubrir la gastronomia local, desde tapas tradicionales canarias hasta propuestas de cocina creativa. Se celebra varias veces al ano en diferentes barrios de la ciudad.',
      en: 'Gastronomic route through the bars and restaurants of Santa Cruz de Tenerife where each establishment offers a special tapa at a reduced price. A fantastic way to discover local gastronomy, from traditional Canarian tapas to creative cuisine proposals. Held several times a year in different neighborhoods of the city.',
      de: 'Gastronomische Route durch die Bars und Restaurants von Santa Cruz de Tenerife, wo jedes Lokal eine spezielle Tapa zu einem reduzierten Preis anbietet. Eine fantastische Moeglichkeit, die lokale Gastronomie zu entdecken, von traditionellen kanarischen Tapas bis hin zu kreativer Kueche. Findet mehrmals im Jahr in verschiedenen Stadtvierteln statt.'
    },
    municipality: 'Santa Cruz de Tenerife',
    municipality_slug: 'santa-cruz',
    event_type: 'gastronomic',
    start_date: 'Varias fechas',
    month: null,
    image: IMG_FOOD,
    visible: true,
    featured: false,
    highlights: [
      { es: 'Tapas especiales a precios reducidos', en: 'Special tapas at reduced prices', de: 'Spezielle Tapas zu reduzierten Preisen' },
      { es: 'Descubrir bares y restaurantes locales', en: 'Discover local bars and restaurants', de: 'Lokale Bars und Restaurants entdecken' },
      { es: 'Gastronomia canaria tradicional y creativa', en: 'Traditional and creative Canarian gastronomy', de: 'Traditionelle und kreative kanarische Gastronomie' }
    ],
    practical_info: {
      es: 'Se celebra varias veces al ano. Consultar fechas exactas en la web del ayuntamiento de Santa Cruz. Cada tapa suele costar entre 2 y 3 euros. Mejor ir en grupo para compartir mas sabores.',
      en: 'Held several times a year. Check exact dates on the Santa Cruz town hall website. Each tapa usually costs 2-3 euros. Better to go in a group to share more flavors.',
      de: 'Findet mehrmals im Jahr statt. Genaue Termine auf der Website des Rathauses von Santa Cruz pruefen. Jede Tapa kostet normalerweise 2-3 Euro. Besser in der Gruppe gehen, um mehr Geschmaecker zu teilen.'
    }
  })

  // ===========================
  // RELIGIOUS/TRADITIONAL (event_type: 'religious')
  // ===========================

  events.push({
    slug: 'fiesta-rama-guimar',
    name: {
      es: 'Fiesta de la Rama - Guimar',
      en: 'Festival of the Branch - Guimar',
      de: 'Fest des Zweiges - Guimar'
    },
    description: {
      es: 'Antigua tradicion de origen guanche donde los participantes llevan ramas desde las montanas hasta el mar, pidiendo lluvia y buenas cosechas. Una de las tradiciones prehispanicas mas autenticas que sobreviven en las Islas Canarias, conectando directamente con las practicas rituales de los aborigenes de Tenerife. Evento profundamente emotivo y cultural.',
      en: 'Ancient tradition of Guanche origin where participants carry branches from the mountains to the sea, asking for rain and good harvests. One of the most authentic pre-Hispanic traditions surviving in the Canary Islands, directly connecting with the ritual practices of the aboriginal people of Tenerife. A deeply emotional and cultural event.',
      de: 'Alte Tradition guanchischen Ursprungs, bei der die Teilnehmer Zweige von den Bergen zum Meer tragen und um Regen und gute Ernten bitten. Eine der authentischsten vorhispanischen Traditionen, die auf den Kanarischen Inseln ueberlebt haben, und direkt mit den rituellen Praktiken der Ureinwohner Teneriffas verbunden. Ein zutiefst emotionales und kulturelles Ereignis.'
    },
    municipality: 'Guimar',
    municipality_slug: 'guimar',
    event_type: 'religious',
    start_date: 'Agosto',
    month: 8,
    image: IMG_TRADITIONAL,
    visible: true,
    featured: false,
    highlights: [
      { es: 'Tradicion de origen guanche prehispanico', en: 'Tradition of pre-Hispanic Guanche origin', de: 'Tradition vorhispanischen guanchischen Ursprungs' },
      { es: 'Procesion de ramas desde la montana hasta el mar', en: 'Branch procession from mountain to sea', de: 'Zweigprozession vom Berg zum Meer' },
      { es: 'Ritual ancestral pidiendo lluvia', en: 'Ancestral ritual asking for rain', de: 'Ahnenritual um Regen bittend' },
      { es: 'Conexion con las Piramides de Guimar', en: 'Connection with the Pyramids of Guimar', de: 'Verbindung mit den Pyramiden von Guimar' }
    ],
    practical_info: {
      es: 'Se celebra en agosto. Llevar calzado comodo para caminar por montaña. La procesion empieza en la montaña y termina en la costa. Evento gratuito y abierto a todos.',
      en: 'Held in August. Wear comfortable walking shoes for mountain terrain. The procession starts in the mountains and ends at the coast. Free event open to all.',
      de: 'Findet im August statt. Bequeme Wanderschuhe fuer Berggelaende tragen. Die Prozession beginnt in den Bergen und endet an der Kueste. Kostenlose Veranstaltung fuer alle.'
    }
  })

  // Alfombras del Corpus - only add if slug doesn't exist
  if (!existingSlugs.has('alfombras-corpus-orotava') && !existingSlugs.has('corpus-christi-orotava')) {
    events.push({
      slug: 'alfombras-corpus-orotava',
      name: {
        es: 'Alfombras de Flores del Corpus Christi - La Orotava',
        en: 'Corpus Christi Flower Carpets - La Orotava',
        de: 'Fronleichnams-Blumenteppiche - La Orotava'
      },
      description: {
        es: 'Las famosas alfombras de flores y arenas volcanicas del Teide que cubren las calles del casco historico de La Orotava durante la festividad del Corpus Christi. Declarada Fiesta de Interes Turistico Nacional. La alfombra central en la Plaza del Ayuntamiento es la mas grande del mundo hecha con tierras volcanicas. Artistas trabajan durante horas creando elaborados diseños con petalos de flores, semillas y arenas de colores.',
        en: 'The famous flower and volcanic sand carpets from Teide that cover the streets of La Orotava historic center during the Corpus Christi festivities. Declared a Festival of National Tourist Interest. The central carpet in the Town Hall Square is the world largest made with volcanic soils. Artists work for hours creating elaborate designs with flower petals, seeds and colored sands.',
        de: 'Die beruehmten Blumen- und Vulkansandteppiche vom Teide, die waehrend des Fronleichnamsfestes die Strassen der Altstadt von La Orotava bedecken. Als Fest von nationalem touristischem Interesse erklaert. Der zentrale Teppich auf dem Rathausplatz ist der groesste der Welt aus Vulkanboden. Kuenstler arbeiten stundenlang an kunstvollen Designs aus Bluetenblaettern, Samen und farbigem Sand.'
      },
      municipality: 'La Orotava',
      municipality_slug: 'la-orotava',
      event_type: 'religious',
      start_date: 'Junio',
      month: 6,
      image: IMG_TRADITIONAL,
      visible: true,
      featured: true,
      highlights: [
        { es: 'Alfombras de flores naturales', en: 'Natural flower carpets', de: 'Natuerliche Blumenteppiche' },
        { es: 'Tapiz de arenas volcanicas del Teide', en: 'Volcanic sand tapestry from Teide', de: 'Vulkansandteppich vom Teide' },
        { es: 'Declarada Fiesta de Interes Turistico Nacional', en: 'Declared Festival of National Tourist Interest', de: 'Als Fest von nationalem touristischem Interesse erklaert' }
      ],
      practical_info: {
        es: 'Las alfombras se montan la noche anterior y se pueden ver por la manana antes de la procesion. Llegar muy temprano. Parking muy limitado, usar transporte publico.',
        en: 'Carpets are set up the night before and can be seen in the morning before the procession. Arrive very early. Very limited parking, use public transport.',
        de: 'Teppiche werden am Vorabend aufgebaut und koennen am Morgen vor der Prozession besichtigt werden. Sehr frueh kommen. Sehr begrenztes Parken, oeffentliche Verkehrsmittel nutzen.'
      }
    })
  } else {
    console.log('Skipping alfombras-corpus-orotava (corpus-christi-orotava already exists)')
  }

  // ===========================
  // NOCHE DE SAN JUAN (event_type: 'cultural')
  // ===========================

  events.push({
    slug: 'noche-san-juan-hogueras',
    name: {
      es: 'Noche de San Juan - Hogueras',
      en: 'Saint John\'s Night - Bonfires',
      de: 'Johannisnacht - Lagerfeuer'
    },
    description: {
      es: 'La noche mas magica del ano en Tenerife. El 23 de junio, las playas de toda la isla se llenan de hogueras, musica y celebracion. La tradicion manda saltar sobre las llamas para purificarse, banarse en el mar a medianoche y quemar papeles con deseos. Se celebra en todas las localidades costeras de Tenerife, desde las playas del sur hasta las del norte.',
      en: 'The most magical night of the year in Tenerife. On June 23rd, beaches across the island fill with bonfires, music and celebration. Tradition calls for jumping over the flames for purification, swimming in the sea at midnight and burning papers with wishes. Celebrated in all coastal towns of Tenerife, from southern to northern beaches.',
      de: 'Die magischste Nacht des Jahres auf Teneriffa. Am 23. Juni fuellen sich die Straende der gesamten Insel mit Lagerfeuern, Musik und Feierlichkeiten. Die Tradition verlangt, ueber die Flammen zu springen zur Reinigung, um Mitternacht im Meer zu schwimmen und Papiere mit Wuenschen zu verbrennen. Wird in allen Kuestenorten Teneriffas gefeiert, von den suedlichen bis zu den noerdlichen Straenden.'
    },
    municipality: 'Isla de Tenerife (multiple municipalities)',
    municipality_slug: 'tenerife',
    event_type: 'cultural',
    start_date: '06-23',
    end_date: '06-24',
    month: 6,
    image: IMG_FIREWORKS,
    visible: true,
    featured: true,
    highlights: [
      { es: 'Hogueras en todas las playas de la isla', en: 'Bonfires on all island beaches', de: 'Lagerfeuer an allen Inselstraenden' },
      { es: 'Saltar sobre el fuego para purificarse', en: 'Jump over fire for purification', de: 'Ueber das Feuer springen zur Reinigung' },
      { es: 'Bano en el mar a medianoche', en: 'Midnight sea bathing', de: 'Mitternachtliches Meeresbaden' },
      { es: 'Quemar papeles con deseos y malos recuerdos', en: 'Burn papers with wishes and bad memories', de: 'Papiere mit Wuenschen und schlechten Erinnerungen verbrennen' }
    ],
    practical_info: {
      es: 'Se celebra la noche del 23 al 24 de junio. Las mejores hogueras estan en Playa de Las Teresitas (Santa Cruz), Puerto de la Cruz y playas del sur. Llevar banador, toalla y algo de cena. Llegar temprano para encontrar buen sitio junto a la hoguera.',
      en: 'Celebrated the night of June 23rd to 24th. The best bonfires are at Playa de Las Teresitas (Santa Cruz), Puerto de la Cruz and southern beaches. Bring swimwear, towel and some food. Arrive early for a good spot near the bonfire.',
      de: 'Gefeiert in der Nacht vom 23. auf den 24. Juni. Die besten Lagerfeuer sind am Playa de Las Teresitas (Santa Cruz), Puerto de la Cruz und den suedlichen Straenden. Badesachen, Handtuch und etwas zu essen mitbringen. Frueh kommen fuer einen guten Platz am Lagerfeuer.'
    }
  })

  // ===========================
  // UPSERT ALL EVENTS
  // ===========================

  console.log(`\nInserting ${events.length} cultural events...`)

  const { data, error } = await supabase
    .from('events')
    .upsert(events, { onConflict: 'slug' })

  if (error) {
    console.error('Error upserting events:', error.message)
    console.error('Details:', JSON.stringify(error, null, 2))
  } else {
    console.log(`Successfully upserted ${events.length} events!`)
  }

  // Verify
  const { data: count } = await supabase
    .from('events')
    .select('slug, name, event_type, featured', { count: 'exact' })
    .order('event_type')

  console.log(`\nTotal events in database: ${count?.length}`)
  console.log('\nEvents by type:')
  const byType: Record<string, number> = {}
  count?.forEach(e => {
    byType[e.event_type] = (byType[e.event_type] || 0) + 1
  })
  Object.entries(byType).sort().forEach(([type, n]) => {
    console.log(`  ${type}: ${n}`)
  })

  console.log('\nFeatured events:')
  count?.filter(e => e.featured).forEach(e => {
    console.log(`  - ${e.name.es} (${e.event_type})`)
  })

  console.log('\nDone!')
}

main().catch(console.error)
