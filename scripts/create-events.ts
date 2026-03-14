/**
 * Script to create events table and populate with Tenerife fiestas
 * Run with: npx tsx scripts/create-events.ts
 */

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://sqesgghvaazyajzjkoap.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxZXNnZ2h2YWF6eWFqemprb2FwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzUxMzgwOSwiZXhwIjoyMDg5MDg5ODA5fQ.UvbRfWU9seJPT9lyCyLmpD4uZrP9jXzsNoeSAjT9HnI'
)

async function getAreaId(slug: string): Promise<string | null> {
  const { data } = await supabase.from('areas').select('id').eq('slug', slug).single()
  return data?.id ?? null
}

async function createTable() {
  console.log('Attempting to create events table via rpc...')
  const sql = `
CREATE TABLE IF NOT EXISTS public.events (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name jsonb not null default '{}',
  description jsonb not null default '{}',
  municipality text not null,
  municipality_slug text not null,
  area_id uuid references public.areas(id),
  event_type text not null default 'fiesta_patronal' check (event_type in ('fiesta_patronal', 'carnival', 'cultural', 'religious', 'gastronomic', 'music', 'sports', 'market')),
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

CREATE INDEX IF NOT EXISTS idx_events_municipality ON public.events(municipality_slug);
CREATE INDEX IF NOT EXISTS idx_events_month ON public.events(month);
CREATE INDEX IF NOT EXISTS idx_events_type ON public.events(event_type);
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'events' AND policyname = 'Public can read visible events') THEN
    CREATE POLICY "Public can read visible events" ON public.events FOR SELECT USING (visible = true);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'events_updated_at') THEN
    CREATE TRIGGER events_updated_at BEFORE UPDATE ON public.events
      FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
  END IF;
END $$;
  `
  const { error } = await supabase.rpc('exec_sql', { sql })
  if (error) {
    console.log('rpc exec_sql not available:', error.message)
    console.log('Please create the table manually via Supabase SQL Editor, then re-run this script.')
    console.log('Continuing to insert data (assuming table exists)...')
  } else {
    console.log('Table created successfully!')
  }
}

async function insertEvents() {
  console.log('Loading area IDs...')
  const areas: Record<string, string | null> = {}
  for (const slug of ['costa-adeje', 'los-cristianos', 'puerto-de-la-cruz', 'santa-cruz', 'la-laguna', 'los-gigantes', 'teide', 'anaga']) {
    areas[slug] = await getAreaId(slug)
  }
  console.log('Areas loaded')

  const events = [
    // ===== SOUTH =====
    {
      slug: 'fiesta-santa-ursula-adeje',
      name: { es: 'Fiesta de Santa Úrsula', en: 'Festival of Saint Ursula', de: 'Fest der Heiligen Ursula' },
      description: {
        es: 'Fiesta patronal de Adeje en honor a Santa Úrsula, con procesiones religiosas, verbenas populares, actuaciones musicales y fuegos artificiales. Las calles se adornan con arcos florales y los vecinos disfrutan de comida típica canaria como papas arrugadas con mojo y carne de fiesta.',
        en: 'Patron saint festival of Adeje honoring Saint Ursula, featuring religious processions, popular street parties, live music performances and fireworks. Streets are decorated with floral arches and locals enjoy typical Canarian food such as wrinkled potatoes with mojo sauce and festive meat dishes.',
        de: 'Patronatsfest von Adeje zu Ehren der Heiligen Ursula mit religiösen Prozessionen, Volksfesten, Musikdarbietungen und Feuerwerk. Die Straßen werden mit Blumenbögen geschmückt und die Einwohner genießen typisch kanarisches Essen wie Runzelkartoffeln mit Mojo-Sauce und Festtagsfleisch.'
      },
      municipality: 'Adeje',
      municipality_slug: 'adeje',
      area_id: areas['costa-adeje'],
      event_type: 'fiesta_patronal',
      start_date: '10-19',
      end_date: '10-23',
      month: 10,
      highlights: [
        { es: 'Procesión de Santa Úrsula por el casco histórico', en: 'Saint Ursula procession through the historic center', de: 'Prozession der Heiligen Ursula durch die Altstadt' },
        { es: 'Verbenas con música en vivo y baile', en: 'Street parties with live music and dancing', de: 'Volksfeste mit Livemusik und Tanz' },
        { es: 'Fuegos artificiales en la plaza del pueblo', en: 'Fireworks in the town square', de: 'Feuerwerk auf dem Dorfplatz' }
      ],
      traditions: [
        { es: 'Misa solemne y ofrenda floral a la patrona', en: 'Solemn mass and floral offering to the patron saint', de: 'Feierliche Messe und Blumenopfer an die Schutzpatronin' },
        { es: 'Exhibición de folclore canario con trajes típicos', en: 'Canarian folklore exhibition with traditional costumes', de: 'Kanarische Folkloredarbietung mit traditionellen Trachten' }
      ],
      practical_info: {
        es: 'El centro de Adeje se cierra al tráfico durante las fiestas. Se recomienda aparcar en las zonas habilitadas. Las verbenas son de entrada libre.',
        en: 'Adeje town center is closed to traffic during the festival. Parking available in designated areas. Street parties are free admission.',
        de: 'Das Zentrum von Adeje ist während des Festes für den Verkehr gesperrt. Parken in ausgewiesenen Bereichen möglich. Volksfeste sind kostenlos.'
      },
      featured: false
    },
    {
      slug: 'fiesta-del-agua-adeje',
      name: { es: 'Fiesta del Agua', en: 'Water Festival', de: 'Wasserfest' },
      description: {
        es: 'Una de las fiestas más divertidas de Adeje donde los vecinos y visitantes se lanzan agua por las calles del pueblo. Una tradición única que celebra la importancia del agua en esta zona históricamente seca del sur de Tenerife.',
        en: 'One of the most fun festivals in Adeje where locals and visitors throw water at each other through the town streets. A unique tradition celebrating the importance of water in this historically dry area of southern Tenerife.',
        de: 'Eines der unterhaltsamsten Feste in Adeje, bei dem sich Einheimische und Besucher auf den Straßen mit Wasser bewerfen. Eine einzigartige Tradition, die die Bedeutung des Wassers in dieser historisch trockenen Gegend Südteneriffas feiert.'
      },
      municipality: 'Adeje',
      municipality_slug: 'adeje',
      area_id: areas['costa-adeje'],
      event_type: 'cultural',
      start_date: '09-01',
      end_date: '09-01',
      month: 9,
      highlights: [
        { es: 'Batalla de agua masiva en las calles', en: 'Massive water fight in the streets', de: 'Massive Wasserschlacht auf den Straßen' },
        { es: 'Música y ambiente festivo', en: 'Music and festive atmosphere', de: 'Musik und festliche Atmosphäre' }
      ],
      traditions: [],
      practical_info: {
        es: 'Lleva ropa que se pueda mojar y protege tu teléfono. Ambiente familiar durante el día.',
        en: 'Wear clothes that can get wet and protect your phone. Family-friendly atmosphere during the day.',
        de: 'Tragen Sie Kleidung, die nass werden kann, und schützen Sie Ihr Handy. Familienfreundliche Atmosphäre tagsüber.'
      },
      featured: false
    },
    {
      slug: 'san-antonio-abad-arona',
      name: { es: 'Fiesta de San Antonio Abad', en: 'Festival of Saint Anthony the Abbot', de: 'Fest des Heiligen Antonius des Großen' },
      description: {
        es: 'Fiesta patronal de Arona con la tradicional bendición de animales, procesión del santo y verbenas populares. Los vecinos llevan sus mascotas y animales de granja a la iglesia para recibir la bendición del santo protector de los animales.',
        en: 'Patron saint festival of Arona with the traditional blessing of animals, saint procession and popular street parties. Locals bring their pets and farm animals to the church to receive the blessing of the patron saint of animals.',
        de: 'Patronatsfest von Arona mit der traditionellen Tiersegnung, Heiligenprozession und Volksfesten. Die Einwohner bringen ihre Haustiere und Nutztiere zur Kirche, um den Segen des Schutzpatrons der Tiere zu empfangen.'
      },
      municipality: 'Arona',
      municipality_slug: 'arona',
      area_id: areas['los-cristianos'],
      event_type: 'fiesta_patronal',
      start_date: '01-17',
      end_date: '01-17',
      month: 1,
      highlights: [
        { es: 'Bendición de animales frente a la iglesia', en: 'Blessing of animals in front of the church', de: 'Tiersegnung vor der Kirche' },
        { es: 'Procesión de San Antonio Abad', en: 'Saint Anthony the Abbot procession', de: 'Prozession des Heiligen Antonius' },
        { es: 'Hogueras y música tradicional', en: 'Bonfires and traditional music', de: 'Lagerfeuer und traditionelle Musik' }
      ],
      traditions: [
        { es: 'Bendición de animales domésticos y de granja', en: 'Blessing of domestic and farm animals', de: 'Segnung von Haus- und Nutztieren' }
      ],
      practical_info: {
        es: 'Se celebra en el casco de Arona, no en la zona costera. Acceso en coche o guagua línea 480.',
        en: 'Celebrated in Arona town center, not the coastal area. Access by car or bus line 480.',
        de: 'Wird im Ortskern von Arona gefeiert, nicht im Küstengebiet. Erreichbar mit dem Auto oder Buslinie 480.'
      },
      featured: false
    },
    {
      slug: 'fiestas-san-miguel-arona',
      name: { es: 'Fiestas de San Miguel', en: 'Saint Michael Festival', de: 'Sankt-Michael-Fest' },
      description: {
        es: 'Fiestas en honor a San Miguel Arcángel en Arona, con actos religiosos, romería, verbenas y actividades deportivas. Incluye la tradicional romería con carretas engalanadas y los vecinos vestidos con trajes típicos canarios.',
        en: 'Festival honoring Saint Michael the Archangel in Arona, with religious events, pilgrimage, street parties and sporting activities. Includes the traditional pilgrimage with decorated carts and locals dressed in typical Canarian costumes.',
        de: 'Fest zu Ehren des Erzengels Michael in Arona mit religiösen Veranstaltungen, Wallfahrt, Volksfesten und Sportaktivitäten. Mit der traditionellen Wallfahrt mit geschmückten Wagen und Einheimischen in kanarischen Trachten.'
      },
      municipality: 'Arona',
      municipality_slug: 'arona',
      area_id: areas['los-cristianos'],
      event_type: 'fiesta_patronal',
      start_date: '09-25',
      end_date: '09-29',
      month: 9,
      highlights: [
        { es: 'Romería con carretas y trajes típicos', en: 'Pilgrimage with decorated carts and traditional costumes', de: 'Wallfahrt mit geschmückten Wagen und Trachten' },
        { es: 'Verbenas nocturnas con orquestas', en: 'Evening street parties with orchestras', de: 'Abendliche Volksfeste mit Orchestern' }
      ],
      traditions: [],
      practical_info: {
        es: 'Transporte público disponible desde Los Cristianos y Playa de las Américas.',
        en: 'Public transport available from Los Cristianos and Playa de las Américas.',
        de: 'Öffentliche Verkehrsmittel ab Los Cristianos und Playa de las Américas verfügbar.'
      },
      featured: false
    },
    {
      slug: 'san-miguel-arcangel-san-miguel',
      name: { es: 'Fiesta de San Miguel Arcángel', en: 'Saint Michael the Archangel Festival', de: 'Fest des Erzengels Michael' },
      description: {
        es: 'Fiesta patronal de San Miguel de Abona con procesiones, verbenas y la tradicional romería. El municipio celebra a su patrón con actos religiosos solemnes, música en vivo y gastronomía local incluyendo el famoso queso de cabra de la zona.',
        en: 'Patron saint festival of San Miguel de Abona with processions, street parties and the traditional pilgrimage. The municipality celebrates its patron with solemn religious events, live music and local gastronomy including the famous local goat cheese.',
        de: 'Patronatsfest von San Miguel de Abona mit Prozessionen, Volksfesten und der traditionellen Wallfahrt. Die Gemeinde feiert ihren Schutzpatron mit feierlichen religiösen Veranstaltungen, Livemusik und lokaler Gastronomie einschließlich des berühmten Ziegenkäses der Region.'
      },
      municipality: 'San Miguel de Abona',
      municipality_slug: 'san-miguel-de-abona',
      area_id: areas['los-cristianos'],
      event_type: 'fiesta_patronal',
      start_date: '09-25',
      end_date: '09-29',
      month: 9,
      highlights: [
        { es: 'Procesión del santo por las calles del pueblo', en: 'Saint procession through the village streets', de: 'Heiligenprozession durch die Dorfstraßen' },
        { es: 'Degustación de productos locales', en: 'Local product tasting', de: 'Verkostung lokaler Produkte' }
      ],
      traditions: [],
      practical_info: {
        es: 'El casco histórico se encuentra en la zona de medianías, a unos 15 minutos en coche de la costa.',
        en: 'The historic center is in the mid-altitude zone, about 15 minutes by car from the coast.',
        de: 'Das historische Zentrum liegt in der mittleren Höhenlage, etwa 15 Autominuten von der Küste entfernt.'
      },
      featured: false
    },
    {
      slug: 'san-antonio-padua-granadilla',
      name: { es: 'Fiesta de San Antonio de Padua', en: 'Festival of Saint Anthony of Padua', de: 'Fest des Heiligen Antonius von Padua' },
      description: {
        es: 'Fiesta patronal de Granadilla de Abona con procesiones religiosas, verbenas y actos culturales. San Antonio es venerado como el santo casamentero y es tradición que las jóvenes solteras le pidan pareja durante las fiestas.',
        en: 'Patron saint festival of Granadilla de Abona with religious processions, street parties and cultural events. Saint Anthony is venerated as the matchmaking saint and it is tradition for single young women to ask him for a partner during the festivities.',
        de: 'Patronatsfest von Granadilla de Abona mit religiösen Prozessionen, Volksfesten und kulturellen Veranstaltungen. Der Heilige Antonius wird als Schutzpatron der Eheschließung verehrt und es ist Tradition, dass junge Frauen ihn während des Festes um einen Partner bitten.'
      },
      municipality: 'Granadilla de Abona',
      municipality_slug: 'granadilla-de-abona',
      area_id: null,
      event_type: 'fiesta_patronal',
      start_date: '06-13',
      end_date: '06-13',
      month: 6,
      highlights: [
        { es: 'Procesión de San Antonio por el casco histórico', en: 'Saint Anthony procession through historic center', de: 'Prozession des Heiligen Antonius durch die Altstadt' },
        { es: 'Verbenas y conciertos en la plaza', en: 'Street parties and concerts in the square', de: 'Volksfeste und Konzerte auf dem Platz' }
      ],
      traditions: [],
      practical_info: {
        es: 'El casco histórico de Granadilla está en zona de medianías. Aparcamiento limitado, llega temprano.',
        en: 'Granadilla historic center is in the mid-altitude zone. Limited parking, arrive early.',
        de: 'Das historische Zentrum von Granadilla liegt in der mittleren Höhenlage. Begrenzte Parkplätze, kommen Sie früh.'
      },
      featured: false
    },
    {
      slug: 'san-juan-bautista-arico',
      name: { es: 'Fiesta de San Juan Bautista', en: 'Festival of Saint John the Baptist', de: 'Fest des Heiligen Johannes des Täufers' },
      description: {
        es: 'Fiesta patronal de Arico celebrada la noche de San Juan con hogueras en la playa, saltos sobre el fuego y baños en el mar a medianoche. Una noche mágica donde se mezclan tradiciones paganas y religiosas.',
        en: 'Patron saint festival of Arico celebrated on Saint John\'s Eve with bonfires on the beach, jumping over fire and midnight sea bathing. A magical night where pagan and religious traditions intertwine.',
        de: 'Patronatsfest von Arico, gefeiert in der Johannisnacht mit Lagerfeuern am Strand, Feuersprüngen und Mitternachtsbaden im Meer. Eine magische Nacht, in der heidnische und religiöse Traditionen verschmelzen.'
      },
      municipality: 'Arico',
      municipality_slug: 'arico',
      area_id: null,
      event_type: 'fiesta_patronal',
      start_date: '06-23',
      end_date: '06-24',
      month: 6,
      highlights: [
        { es: 'Hogueras en la playa de Arico', en: 'Bonfires on Arico beach', de: 'Lagerfeuer am Strand von Arico' },
        { es: 'Baño a medianoche para purificarse', en: 'Midnight swim for purification', de: 'Mitternachtsbad zur Reinigung' }
      ],
      traditions: [
        { es: 'Saltar las hogueras tres veces para ahuyentar los malos espíritus', en: 'Jumping over bonfires three times to ward off evil spirits', de: 'Dreimaliges Springen über Lagerfeuer zur Vertreibung böser Geister' }
      ],
      practical_info: {
        es: 'Las hogueras se celebran la noche del 23 de junio. Lleva ropa cómoda y algo de abrigo para la madrugada.',
        en: 'Bonfires are held on the night of June 23rd. Wear comfortable clothes and bring something warm for the early morning.',
        de: 'Die Lagerfeuer finden in der Nacht des 23. Juni statt. Tragen Sie bequeme Kleidung und bringen Sie etwas Warmes für den frühen Morgen mit.'
      },
      featured: false
    },
    {
      slug: 'san-joaquin-fasnia',
      name: { es: 'Fiesta de San Joaquín', en: 'Festival of Saint Joachim', de: 'Fest des Heiligen Joachim' },
      description: {
        es: 'Fiesta patronal de Fasnia en honor a San Joaquín, con procesiones, verbenas populares y actividades para toda la familia. Un pueblo tranquilo de medianías que cobra vida durante sus fiestas patronales.',
        en: 'Patron saint festival of Fasnia honoring Saint Joachim, with processions, popular street parties and family activities. A quiet mid-altitude village that comes alive during its patron saint festivities.',
        de: 'Patronatsfest von Fasnia zu Ehren des Heiligen Joachim mit Prozessionen, Volksfesten und Familienaktivitäten. Ein ruhiges Dorf in mittlerer Höhenlage, das während der Patronatsfeiern zum Leben erwacht.'
      },
      municipality: 'Fasnia',
      municipality_slug: 'fasnia',
      area_id: null,
      event_type: 'fiesta_patronal',
      start_date: '08-16',
      end_date: '08-16',
      month: 8,
      highlights: [
        { es: 'Procesión de San Joaquín', en: 'Saint Joachim procession', de: 'Prozession des Heiligen Joachim' },
        { es: 'Verbenas con música popular canaria', en: 'Street parties with Canarian folk music', de: 'Volksfeste mit kanarischer Volksmusik' }
      ],
      traditions: [],
      practical_info: {
        es: 'Fasnia está en la carretera general del sur (TF-28). Aparcamiento en las calles del pueblo.',
        en: 'Fasnia is on the southern main road (TF-28). Street parking available in the village.',
        de: 'Fasnia liegt an der südlichen Hauptstraße (TF-28). Straßenparken im Dorf möglich.'
      },
      featured: false
    },
    {
      slug: 'san-pedro-apostol-guimar',
      name: { es: 'Fiesta de San Pedro Apóstol', en: 'Festival of Saint Peter the Apostle', de: 'Fest des Heiligen Petrus' },
      description: {
        es: 'Fiesta patronal de Güímar en honor a San Pedro, con procesiones marítimas, verbenas y la tradicional suelta de fuegos artificiales. Güímar celebra con especial devoción a su patrón con una procesión que recorre todo el pueblo.',
        en: 'Patron saint festival of Güímar honoring Saint Peter, with maritime processions, street parties and traditional fireworks. Güímar celebrates its patron with special devotion through a procession that traverses the entire town.',
        de: 'Patronatsfest von Güímar zu Ehren des Heiligen Petrus mit maritimen Prozessionen, Volksfesten und traditionellem Feuerwerk. Güímar feiert seinen Schutzpatron mit besonderer Hingabe durch eine Prozession, die den gesamten Ort durchquert.'
      },
      municipality: 'Güímar',
      municipality_slug: 'guimar',
      area_id: null,
      event_type: 'fiesta_patronal',
      start_date: '06-29',
      end_date: '06-29',
      month: 6,
      highlights: [
        { es: 'Procesión de San Pedro por el pueblo', en: 'Saint Peter procession through the town', de: 'Prozession des Heiligen Petrus durch den Ort' },
        { es: 'Fuegos artificiales y verbenas', en: 'Fireworks and street parties', de: 'Feuerwerk und Volksfeste' }
      ],
      traditions: [],
      practical_info: {
        es: 'Güímar está bien comunicado por autopista TF-1. Aparcamiento disponible en las afueras del casco.',
        en: 'Güímar is well connected via TF-1 motorway. Parking available on the outskirts of the town center.',
        de: 'Güímar ist über die Autobahn TF-1 gut angebunden. Parkplätze am Rande des Ortskerns verfügbar.'
      },
      featured: false
    },
    // ===== NORTH =====
    {
      slug: 'gran-fiesta-del-carmen-puerto',
      name: { es: 'Gran Fiesta del Carmen', en: 'Grand Festival of Our Lady of Carmen', de: 'Großes Fest der Virgen del Carmen' },
      description: {
        es: 'La fiesta marinera más importante de Puerto de la Cruz con la embarcación de la Virgen del Carmen por el puerto pesquero. Miles de personas acompañan a la imagen en procesión marítima mientras los barcos engalanados surcan las aguas. Se sirve pescado fresco a la brasa y vino del norte.',
        en: 'The most important seafaring festival in Puerto de la Cruz with the embarkation of the Virgin of Carmen at the fishing port. Thousands accompany the image in a maritime procession while decorated boats sail the waters. Fresh grilled fish and northern wines are served.',
        de: 'Das wichtigste Seefahrerfest in Puerto de la Cruz mit der Einschiffung der Virgen del Carmen am Fischerhafen. Tausende begleiten das Bildnis in einer maritimen Prozession, während geschmückte Boote die Gewässer befahren. Frischer Grillfisch und Nordweine werden serviert.'
      },
      municipality: 'Puerto de la Cruz',
      municipality_slug: 'puerto-de-la-cruz',
      area_id: areas['puerto-de-la-cruz'],
      event_type: 'religious',
      start_date: '07-16',
      end_date: '07-16',
      month: 7,
      highlights: [
        { es: 'Embarque de la Virgen del Carmen en el muelle pesquero', en: 'Embarkation of the Virgin at the fishing dock', de: 'Einschiffung der Jungfrau am Fischerkai' },
        { es: 'Procesión marítima con decenas de barcos', en: 'Maritime procession with dozens of boats', de: 'Maritime Prozession mit Dutzenden von Booten' },
        { es: 'Fuegos artificiales sobre el mar', en: 'Fireworks over the sea', de: 'Feuerwerk über dem Meer' }
      ],
      traditions: [
        { es: 'Los pescadores portan a la Virgen hasta el mar', en: 'Fishermen carry the Virgin to the sea', de: 'Fischer tragen die Jungfrau zum Meer' }
      ],
      practical_info: {
        es: 'Llega con antelación para conseguir buen sitio en el muelle. Zona muy concurrida, usa transporte público.',
        en: 'Arrive early to get a good spot at the dock. Very crowded area, use public transport.',
        de: 'Kommen Sie früh, um einen guten Platz am Kai zu bekommen. Sehr belebtes Gebiet, nutzen Sie öffentliche Verkehrsmittel.'
      },
      featured: true
    },
    {
      slug: 'corpus-christi-orotava',
      name: { es: 'Corpus Christi - Alfombras de Flores de La Orotava', en: 'Corpus Christi - Flower Carpets of La Orotava', de: 'Fronleichnam - Blumenteppiche von La Orotava' },
      description: {
        es: 'Una de las celebraciones más espectaculares de Canarias donde las calles y la plaza del Ayuntamiento de La Orotava se cubren con enormes alfombras elaboradas con flores, arenas volcánicas del Teide y materiales naturales. La alfombra de la plaza es la más grande del mundo hecha con arena volcánica. Declarada Fiesta de Interés Turístico Nacional.',
        en: 'One of the most spectacular celebrations in the Canary Islands where the streets and town hall square of La Orotava are covered with enormous carpets made from flowers, volcanic sands from Teide and natural materials. The square carpet is the world\'s largest made with volcanic sand. Declared a Festival of National Tourist Interest.',
        de: 'Eine der spektakulärsten Feiern der Kanarischen Inseln, bei der die Straßen und der Rathausplatz von La Orotava mit riesigen Teppichen aus Blumen, vulkanischem Sand vom Teide und natürlichen Materialien bedeckt werden. Der Platzteppich ist der weltweit größte aus Vulkansand. Als Fest von nationalem touristischem Interesse erklärt.'
      },
      municipality: 'La Orotava',
      municipality_slug: 'la-orotava',
      area_id: areas['puerto-de-la-cruz'],
      event_type: 'religious',
      start_date: '06-15',
      end_date: '06-22',
      month: 6,
      highlights: [
        { es: 'Alfombra gigante de arena volcánica en la plaza del Ayuntamiento', en: 'Giant volcanic sand carpet in the town hall square', de: 'Riesiger Vulkansandteppich auf dem Rathausplatz' },
        { es: 'Alfombras de flores naturales en calles empedradas', en: 'Natural flower carpets on cobblestone streets', de: 'Natürliche Blumenteppiche auf Kopfsteinpflasterstraßen' },
        { es: 'Procesión del Corpus por las alfombras', en: 'Corpus Christi procession over the carpets', de: 'Fronleichnamsprozession über die Teppiche' }
      ],
      traditions: [
        { es: 'Vecinos recogen flores del Teide semanas antes para crear las alfombras', en: 'Neighbors collect flowers from Teide weeks before to create the carpets', de: 'Nachbarn sammeln wochenlang Blumen vom Teide, um die Teppiche zu gestalten' }
      ],
      practical_info: {
        es: 'Las alfombras se preparan la noche anterior y se pueden ver hasta la procesión del mediodía. Mejor ir por la mañana temprano. Transporte público desde Puerto de la Cruz.',
        en: 'Carpets are prepared the night before and can be seen until the midday procession. Best to go early morning. Public transport from Puerto de la Cruz.',
        de: 'Die Teppiche werden in der Nacht zuvor vorbereitet und sind bis zur Mittagsprozession zu sehen. Am besten früh morgens kommen. Öffentliche Verkehrsmittel ab Puerto de la Cruz.'
      },
      featured: true
    },
    {
      slug: 'fuegos-realejos',
      name: { es: 'Fuegos del Apóstol Santiago - Los Realejos', en: 'Fireworks of Apostle Santiago - Los Realejos', de: 'Feuerwerk des Apostels Santiago - Los Realejos' },
      description: {
        es: 'El espectáculo pirotécnico más antiguo de España, celebrado desde el siglo XVI en Los Realejos. Dos barrios rivales, El Realejo Alto y El Realejo Bajo, compiten con sus fuegos artificiales la noche del 24 al 25 de julio. Miles de personas acuden a presenciar este duelo de fuego entre las dos iglesias. Declarada Fiesta de Interés Turístico Nacional.',
        en: 'Spain\'s oldest fireworks display, celebrated since the 16th century in Los Realejos. Two rival neighborhoods, El Realejo Alto and El Realejo Bajo, compete with their fireworks on the night of July 24th-25th. Thousands come to witness this fire duel between the two churches. Declared a Festival of National Tourist Interest.',
        de: 'Spaniens ältestes Feuerwerk, seit dem 16. Jahrhundert in Los Realejos gefeiert. Zwei rivalisierende Stadtteile, El Realejo Alto und El Realejo Bajo, wetteifern mit ihrem Feuerwerk in der Nacht vom 24. zum 25. Juli. Tausende kommen, um dieses Feuerduell zwischen den beiden Kirchen zu erleben. Als Fest von nationalem touristischem Interesse erklärt.'
      },
      municipality: 'Los Realejos',
      municipality_slug: 'los-realejos',
      area_id: areas['puerto-de-la-cruz'],
      event_type: 'fiesta_patronal',
      start_date: '07-24',
      end_date: '07-25',
      month: 7,
      highlights: [
        { es: 'Duelo pirotécnico entre El Realejo Alto y El Realejo Bajo', en: 'Pyrotechnic duel between El Realejo Alto and El Realejo Bajo', de: 'Pyrotechnisches Duell zwischen El Realejo Alto und El Realejo Bajo' },
        { es: 'El espectáculo de fuegos artificiales más antiguo de España', en: 'Spain\'s oldest fireworks display', de: 'Spaniens ältestes Feuerwerk' },
        { es: 'Ambiente festivo con miles de espectadores', en: 'Festive atmosphere with thousands of spectators', de: 'Festliche Atmosphäre mit Tausenden von Zuschauern' }
      ],
      traditions: [
        { es: 'Rivalidad centenaria entre los dos barrios por hacer el mejor espectáculo', en: 'Centuries-old rivalry between the two neighborhoods for the best display', de: 'Jahrhundertealte Rivalität zwischen den beiden Stadtteilen um das beste Feuerwerk' }
      ],
      practical_info: {
        es: 'Llega horas antes para aparcar. Los mejores miradores están en las laderas entre ambas iglesias. Lleva tapones para los oídos. Se recomienda no llevar paraguas.',
        en: 'Arrive hours early to park. Best viewpoints are on the slopes between both churches. Bring earplugs. Umbrellas not recommended.',
        de: 'Kommen Sie Stunden vorher zum Parken. Beste Aussichtspunkte sind an den Hängen zwischen beiden Kirchen. Bringen Sie Ohrstöpsel mit. Regenschirme nicht empfohlen.'
      },
      featured: true
    },
    {
      slug: 'san-marcos-icod',
      name: { es: 'Fiesta de San Marcos', en: 'Festival of Saint Mark', de: 'Fest des Heiligen Markus' },
      description: {
        es: 'Fiesta patronal de Icod de los Vinos en honor a San Marcos, con la peculiar tradición de sacar al buey por las calles del pueblo. Se celebra con procesiones, verbenas y degustaciones de los famosos vinos de la comarca.',
        en: 'Patron saint festival of Icod de los Vinos honoring Saint Mark, with the peculiar tradition of parading an ox through the village streets. Celebrated with processions, street parties and tastings of the famous local wines.',
        de: 'Patronatsfest von Icod de los Vinos zu Ehren des Heiligen Markus mit der eigentümlichen Tradition, einen Ochsen durch die Dorfstraßen zu führen. Gefeiert mit Prozessionen, Volksfesten und Verkostungen der berühmten lokalen Weine.'
      },
      municipality: 'Icod de los Vinos',
      municipality_slug: 'icod-de-los-vinos',
      area_id: null,
      event_type: 'fiesta_patronal',
      start_date: '04-25',
      end_date: '04-25',
      month: 4,
      highlights: [
        { es: 'Tradición del buey de San Marcos', en: 'Saint Mark\'s ox tradition', de: 'Tradition des Markusochsen' },
        { es: 'Cata de vinos locales', en: 'Local wine tasting', de: 'Lokale Weinverkostung' }
      ],
      traditions: [
        { es: 'El buey engalanado se pasea por las calles y debe arrodillarse ante el santo', en: 'A decorated ox parades through the streets and must kneel before the saint', de: 'Ein geschmückter Ochse wird durch die Straßen geführt und muss vor dem Heiligen niederknien' }
      ],
      practical_info: {
        es: 'Icod de los Vinos es accesible por autopista TF-5. Visita también el Drago Milenario.',
        en: 'Icod de los Vinos is accessible via TF-5 motorway. Also visit the Millennial Dragon Tree.',
        de: 'Icod de los Vinos ist über die Autobahn TF-5 erreichbar. Besuchen Sie auch den Tausendjährigen Drachenbaum.'
      },
      featured: false
    },
    {
      slug: 'san-juan-bautista-rambla',
      name: { es: 'Fiesta de San Juan Bautista', en: 'Festival of Saint John the Baptist', de: 'Johannisfest' },
      description: {
        es: 'San Juan de la Rambla celebra su fiesta patronal con hogueras, verbenas y la noche de San Juan con baños en el mar. El pueblo costero del norte cobra vida con música, baile y tradiciones ancestrales.',
        en: 'San Juan de la Rambla celebrates its patron saint festival with bonfires, street parties and Saint John\'s Eve with sea bathing. The northern coastal town comes alive with music, dance and ancestral traditions.',
        de: 'San Juan de la Rambla feiert sein Patronatsfest mit Lagerfeuern, Volksfesten und der Johannisnacht mit Baden im Meer. Der nördliche Küstenort erwacht mit Musik, Tanz und uralten Traditionen zum Leben.'
      },
      municipality: 'San Juan de la Rambla',
      municipality_slug: 'san-juan-de-la-rambla',
      area_id: null,
      event_type: 'fiesta_patronal',
      start_date: '06-23',
      end_date: '06-24',
      month: 6,
      highlights: [
        { es: 'Hogueras en la noche de San Juan', en: 'Bonfires on Saint John\'s Eve', de: 'Johannisfeuer' },
        { es: 'Baños nocturnos en el mar', en: 'Nighttime sea bathing', de: 'Nächtliches Meeresbaden' }
      ],
      traditions: [],
      practical_info: {
        es: 'Pueblo pequeño con aparcamiento limitado. Se recomienda llegar temprano.',
        en: 'Small town with limited parking. Arriving early is recommended.',
        de: 'Kleiner Ort mit begrenzten Parkplätzen. Frühes Ankommen empfohlen.'
      },
      featured: false
    },
    {
      slug: 'san-juan-bautista-guancha',
      name: { es: 'Fiesta de San Juan Bautista', en: 'Festival of Saint John the Baptist', de: 'Johannisfest' },
      description: {
        es: 'La Guancha celebra la noche de San Juan con hogueras tradicionales, música canaria y la celebración del solsticio de verano. Un pueblo auténtico del norte donde se viven las tradiciones en su forma más pura.',
        en: 'La Guancha celebrates Saint John\'s Eve with traditional bonfires, Canarian music and the summer solstice celebration. An authentic northern village where traditions are experienced in their purest form.',
        de: 'La Guancha feiert die Johannisnacht mit traditionellen Lagerfeuern, kanarischer Musik und der Sommersonnenwende. Ein authentisches Norddorf, in dem Traditionen in ihrer reinsten Form erlebt werden.'
      },
      municipality: 'La Guancha',
      municipality_slug: 'la-guancha',
      area_id: null,
      event_type: 'fiesta_patronal',
      start_date: '06-23',
      end_date: '06-24',
      month: 6,
      highlights: [
        { es: 'Hogueras tradicionales', en: 'Traditional bonfires', de: 'Traditionelle Lagerfeuer' },
        { es: 'Celebración del solsticio de verano', en: 'Summer solstice celebration', de: 'Sommersonnenwende-Feier' }
      ],
      traditions: [],
      practical_info: {
        es: 'Accesible desde la autopista TF-5, salida La Guancha.',
        en: 'Accessible from TF-5 motorway, La Guancha exit.',
        de: 'Erreichbar über die Autobahn TF-5, Ausfahrt La Guancha.'
      },
      featured: false
    },
    {
      slug: 'santa-ana-garachico',
      name: { es: 'Fiesta de Santa Ana', en: 'Festival of Saint Anne', de: 'Fest der Heiligen Anna' },
      description: {
        es: 'Fiesta patronal de Garachico en honor a Santa Ana, celebrada en el histórico pueblo que fue destruido por la erupción volcánica de 1706. Las fiestas incluyen procesiones por las calles empedradas, verbenas y actividades acuáticas en las piscinas naturales de El Caletón.',
        en: 'Patron saint festival of Garachico honoring Saint Anne, celebrated in the historic town that was destroyed by the volcanic eruption of 1706. Festivities include processions through cobblestone streets, street parties and water activities in the natural pools of El Caletón.',
        de: 'Patronatsfest von Garachico zu Ehren der Heiligen Anna, gefeiert in dem historischen Ort, der durch den Vulkanausbruch von 1706 zerstört wurde. Die Festlichkeiten umfassen Prozessionen durch Kopfsteinpflasterstraßen, Volksfeste und Wasseraktivitäten in den Naturpools von El Caletón.'
      },
      municipality: 'Garachico',
      municipality_slug: 'garachico',
      area_id: null,
      event_type: 'fiesta_patronal',
      start_date: '07-26',
      end_date: '07-26',
      month: 7,
      highlights: [
        { es: 'Procesión por el casco histórico', en: 'Procession through the historic center', de: 'Prozession durch die Altstadt' },
        { es: 'Actividades en las piscinas naturales de El Caletón', en: 'Activities at El Caletón natural pools', de: 'Aktivitäten in den Naturpools von El Caletón' }
      ],
      traditions: [],
      practical_info: {
        es: 'Garachico es uno de los pueblos más bonitos de Tenerife. Combina la visita con un baño en El Caletón.',
        en: 'Garachico is one of the most beautiful towns in Tenerife. Combine your visit with a swim at El Caletón.',
        de: 'Garachico ist einer der schönsten Orte Teneriffas. Verbinden Sie Ihren Besuch mit einem Bad in El Caletón.'
      },
      featured: false
    },
    {
      slug: 'romeria-san-roque-garachico',
      name: { es: 'Romería de San Roque', en: 'Pilgrimage of Saint Roch', de: 'Wallfahrt des Heiligen Rochus' },
      description: {
        es: 'Una de las romerías más auténticas de Tenerife, donde los vecinos de Garachico se visten con trajes típicos y recorren las calles con carretas engalanadas, animales y productos de la tierra. Se reparten comida y vino típico en un ambiente de fiesta popular.',
        en: 'One of the most authentic pilgrimages in Tenerife, where locals of Garachico dress in traditional costumes and parade through the streets with decorated carts, animals and local produce. Traditional food and wine are shared in a popular festive atmosphere.',
        de: 'Eine der authentischsten Wallfahrten auf Teneriffa, bei der die Einwohner von Garachico traditionelle Trachten tragen und mit geschmückten Wagen, Tieren und lokalen Produkten durch die Straßen ziehen. Traditionelles Essen und Wein werden in volksfestartigem Ambiente geteilt.'
      },
      municipality: 'Garachico',
      municipality_slug: 'garachico',
      area_id: null,
      event_type: 'religious',
      start_date: '08-16',
      end_date: '08-16',
      month: 8,
      highlights: [
        { es: 'Carretas engalanadas con productos típicos', en: 'Decorated carts with typical products', de: 'Geschmückte Wagen mit typischen Produkten' },
        { es: 'Vecinos con trajes típicos canarios', en: 'Locals in traditional Canarian costumes', de: 'Einheimische in kanarischen Trachten' },
        { es: 'Reparto de comida y vino gratis', en: 'Free food and wine distribution', de: 'Kostenlose Verteilung von Essen und Wein' }
      ],
      traditions: [
        { es: 'La romería rememora la vida rural canaria tradicional', en: 'The pilgrimage commemorates traditional Canarian rural life', de: 'Die Wallfahrt erinnert an das traditionelle kanarische Landleben' }
      ],
      practical_info: {
        es: 'La romería recorre las calles principales de Garachico. Llega temprano para verla desde el inicio.',
        en: 'The pilgrimage goes through Garachico\'s main streets. Arrive early to see it from the start.',
        de: 'Die Wallfahrt führt durch die Hauptstraßen von Garachico. Kommen Sie früh, um sie von Anfang an zu sehen.'
      },
      featured: true
    },
    {
      slug: 'san-antonio-abad-los-silos',
      name: { es: 'Fiesta de San Antonio Abad', en: 'Festival of Saint Anthony the Abbot', de: 'Fest des Heiligen Antonius des Großen' },
      description: {
        es: 'Fiesta patronal de Los Silos con la bendición de animales, procesiones y verbenas en este encantador pueblo del noroeste de Tenerife rodeado de montañas y con vistas al mar.',
        en: 'Patron saint festival of Los Silos with animal blessings, processions and street parties in this charming northwestern Tenerife village surrounded by mountains with sea views.',
        de: 'Patronatsfest von Los Silos mit Tiersegnungen, Prozessionen und Volksfesten in diesem charmanten Dorf im Nordwesten Teneriffas, umgeben von Bergen mit Meerblick.'
      },
      municipality: 'Los Silos',
      municipality_slug: 'los-silos',
      area_id: null,
      event_type: 'fiesta_patronal',
      start_date: '01-17',
      end_date: '01-17',
      month: 1,
      highlights: [
        { es: 'Bendición de animales', en: 'Animal blessing', de: 'Tiersegnung' },
        { es: 'Procesión y verbenas', en: 'Procession and street parties', de: 'Prozession und Volksfeste' }
      ],
      traditions: [],
      practical_info: {
        es: 'Los Silos está en el noroeste, accesible por TF-42. Pueblo tranquilo con buen ambiente.',
        en: 'Los Silos is in the northwest, accessible via TF-42. Quiet town with good atmosphere.',
        de: 'Los Silos liegt im Nordwesten, erreichbar über die TF-42. Ruhiger Ort mit guter Atmosphäre.'
      },
      featured: false
    },
    {
      slug: 'nuestra-senora-remedios-buenavista',
      name: { es: 'Fiesta de Nuestra Señora de Los Remedios', en: 'Festival of Our Lady of Remedies', de: 'Fest Unserer Lieben Frau der Heilmittel' },
      description: {
        es: 'Fiesta patronal de Buenavista del Norte en honor a la Virgen de Los Remedios, con procesiones, verbenas y actividades culturales en el pueblo más occidental de Tenerife, a los pies del macizo de Teno.',
        en: 'Patron saint festival of Buenavista del Norte honoring the Virgin of Remedies, with processions, street parties and cultural activities in Tenerife\'s westernmost town, at the foot of the Teno massif.',
        de: 'Patronatsfest von Buenavista del Norte zu Ehren der Virgen de Los Remedios mit Prozessionen, Volksfesten und kulturellen Aktivitäten in Teneriffas westlichstem Ort am Fuße des Teno-Massivs.'
      },
      municipality: 'Buenavista del Norte',
      municipality_slug: 'buenavista-del-norte',
      area_id: null,
      event_type: 'fiesta_patronal',
      start_date: '09-08',
      end_date: '09-15',
      month: 9,
      highlights: [
        { es: 'Procesión de la Virgen de Los Remedios', en: 'Procession of the Virgin of Remedies', de: 'Prozession der Virgen de Los Remedios' },
        { es: 'Verbenas con vistas al Teno', en: 'Street parties with Teno views', de: 'Volksfeste mit Blick auf Teno' }
      ],
      traditions: [],
      practical_info: {
        es: 'Buenavista del Norte es el pueblo más al oeste de Tenerife. Aprovecha para visitar Punta de Teno.',
        en: 'Buenavista del Norte is the westernmost town in Tenerife. Take the opportunity to visit Punta de Teno.',
        de: 'Buenavista del Norte ist der westlichste Ort Teneriffas. Nutzen Sie die Gelegenheit, Punta de Teno zu besuchen.'
      },
      featured: false
    },
    {
      slug: 'san-antonio-abad-el-tanque',
      name: { es: 'Fiesta de San Antonio Abad', en: 'Festival of Saint Anthony the Abbot', de: 'Fest des Heiligen Antonius des Großen' },
      description: {
        es: 'El Tanque celebra a San Antonio Abad con la tradicional bendición de animales, procesiones y verbenas en este tranquilo pueblo de medianías del noroeste de Tenerife.',
        en: 'El Tanque celebrates Saint Anthony the Abbot with the traditional animal blessing, processions and street parties in this quiet mid-altitude village in northwestern Tenerife.',
        de: 'El Tanque feiert den Heiligen Antonius den Großen mit der traditionellen Tiersegnung, Prozessionen und Volksfesten in diesem ruhigen Dorf in mittlerer Höhenlage im Nordwesten Teneriffas.'
      },
      municipality: 'El Tanque',
      municipality_slug: 'el-tanque',
      area_id: null,
      event_type: 'fiesta_patronal',
      start_date: '01-17',
      end_date: '01-17',
      month: 1,
      highlights: [
        { es: 'Bendición de animales domésticos y de granja', en: 'Blessing of domestic and farm animals', de: 'Segnung von Haus- und Nutztieren' }
      ],
      traditions: [],
      practical_info: {
        es: 'El Tanque está entre Icod de los Vinos y Santiago del Teide. Acceso por TF-82.',
        en: 'El Tanque is between Icod de los Vinos and Santiago del Teide. Access via TF-82.',
        de: 'El Tanque liegt zwischen Icod de los Vinos und Santiago del Teide. Zufahrt über TF-82.'
      },
      featured: false
    },
    // ===== METROPOLITAN/CENTRAL =====
    {
      slug: 'carnaval-santa-cruz',
      name: { es: 'Carnaval de Santa Cruz de Tenerife', en: 'Carnival of Santa Cruz de Tenerife', de: 'Karneval von Santa Cruz de Tenerife' },
      description: {
        es: 'El segundo carnaval más grande del mundo, solo superado por el de Río de Janeiro. Durante tres semanas, Santa Cruz se transforma en una fiesta continua con la elección de la Reina del Carnaval, las murgas, comparsas, el Coso (gran cabalgata), y el Entierro de la Sardina. La música, los disfraces y el baile invaden cada rincón de la ciudad. Declarado Fiesta de Interés Turístico Internacional.',
        en: 'The second largest carnival in the world, surpassed only by Rio de Janeiro. For three weeks, Santa Cruz transforms into a continuous party with the Carnival Queen election, murgas (satirical music groups), comparsas (dance troupes), the Coso (grand parade), and the Burial of the Sardine. Music, costumes and dancing fill every corner of the city. Declared a Festival of International Tourist Interest.',
        de: 'Der zweitgrößte Karneval der Welt, nur übertroffen vom Karneval in Rio de Janeiro. Drei Wochen lang verwandelt sich Santa Cruz in ein ununterbrochenes Fest mit der Wahl der Karnevalskönigin, Murgas (satirische Musikgruppen), Comparsas (Tanzgruppen), dem Coso (großer Umzug) und der Beerdigung der Sardine. Musik, Kostüme und Tanz füllen jede Ecke der Stadt. Als Fest von internationalem touristischem Interesse erklärt.'
      },
      municipality: 'Santa Cruz de Tenerife',
      municipality_slug: 'santa-cruz-de-tenerife',
      area_id: areas['santa-cruz'],
      event_type: 'carnival',
      start_date: '02-15',
      end_date: '03-05',
      month: 2,
      highlights: [
        { es: 'Gala de Elección de la Reina del Carnaval con trajes de hasta 200 kg', en: 'Carnival Queen Gala with costumes weighing up to 200 kg', de: 'Karnevalskönigin-Gala mit Kostümen bis zu 200 kg' },
        { es: 'Concurso de Murgas con humor satírico y político', en: 'Murgas contest with satirical and political humor', de: 'Murgas-Wettbewerb mit satirischem und politischem Humor' },
        { es: 'Coso Apoteosis: la gran cabalgata final', en: 'Coso Apoteosis: the grand final parade', de: 'Coso Apoteosis: die große Abschlussparade' },
        { es: 'Entierro de la Sardina: cierre del carnaval con fuegos y llanto burlesco', en: 'Burial of the Sardine: carnival closing with fireworks and mock mourning', de: 'Beerdigung der Sardine: Karnevalsabschluss mit Feuerwerk und Scheintrauer' }
      ],
      traditions: [
        { es: 'Las murgas cantan coplas satíricas sobre actualidad política y social', en: 'Murgas sing satirical songs about political and social current events', de: 'Murgas singen satirische Lieder über politische und soziale Aktualitäten' },
        { es: 'El Entierro de la Sardina cierra el carnaval con un cortejo fúnebre paródico', en: 'The Burial of the Sardine closes carnival with a parodic funeral procession', de: 'Die Beerdigung der Sardine beendet den Karneval mit einem parodistischen Trauerzug' }
      ],
      practical_info: {
        es: 'El carnaval dura unas 3 semanas entre febrero y marzo. Las mejores noches son la Gala de la Reina, el Coso y el Entierro. Usa transporte público o taxi, no hay aparcamiento. Disfrazarse es casi obligatorio.',
        en: 'Carnival lasts about 3 weeks between February and March. Best nights are the Queen Gala, Coso and Burial. Use public transport or taxi, no parking available. Wearing a costume is almost mandatory.',
        de: 'Der Karneval dauert etwa 3 Wochen zwischen Februar und März. Die besten Nächte sind die Königinnengala, der Coso und die Beerdigung. Nutzen Sie öffentliche Verkehrsmittel oder Taxis, keine Parkplätze verfügbar. Ein Kostüm zu tragen ist fast Pflicht.'
      },
      featured: true
    },
    {
      slug: 'fiestas-mayo-santa-cruz',
      name: { es: 'Fiestas de Mayo', en: 'May Festivities', de: 'Mai-Festlichkeiten' },
      description: {
        es: 'Las Fiestas de Mayo celebran la fundación de Santa Cruz de Tenerife con conciertos, actuaciones culturales, ferias y la Cruz de Mayo. La ciudad se llena de cruces florales decoradas por los vecinos de cada barrio.',
        en: 'The May Festivities celebrate the founding of Santa Cruz de Tenerife with concerts, cultural performances, fairs and the May Cross tradition. The city fills with floral crosses decorated by neighbors from each district.',
        de: 'Die Mai-Festlichkeiten feiern die Gründung von Santa Cruz de Tenerife mit Konzerten, kulturellen Darbietungen, Messen und der Maikreuz-Tradition. Die Stadt füllt sich mit Blumenkreuzen, die von den Nachbarn jedes Viertels geschmückt werden.'
      },
      municipality: 'Santa Cruz de Tenerife',
      municipality_slug: 'santa-cruz-de-tenerife',
      area_id: areas['santa-cruz'],
      event_type: 'cultural',
      start_date: '05-01',
      end_date: '05-30',
      month: 5,
      highlights: [
        { es: 'Cruces de Mayo decoradas por barrios', en: 'May Crosses decorated by neighborhoods', de: 'Von Stadtvierteln geschmückte Maikreuze' },
        { es: 'Conciertos y espectáculos gratuitos', en: 'Free concerts and shows', de: 'Kostenlose Konzerte und Shows' }
      ],
      traditions: [],
      practical_info: {
        es: 'Las cruces se pueden ver por toda la ciudad durante mayo. Muchos eventos son gratuitos.',
        en: 'Crosses can be seen throughout the city during May. Many events are free.',
        de: 'Die Kreuze sind im Mai in der ganzen Stadt zu sehen. Viele Veranstaltungen sind kostenlos.'
      },
      featured: false
    },
    {
      slug: 'fiestas-cristo-laguna',
      name: { es: 'Fiestas del Cristo de La Laguna', en: 'Festival of the Christ of La Laguna', de: 'Fest des Christus von La Laguna' },
      description: {
        es: 'Las fiestas más importantes de San Cristóbal de La Laguna, declaradas de Interés Turístico Nacional. La imagen del Santísimo Cristo de La Laguna, venerada desde el siglo XV, sale en procesión por las calles del centro histórico Patrimonio de la Humanidad. Miles de fieles acompañan la imagen en una de las manifestaciones religiosas más emotivas de Canarias.',
        en: 'The most important festival of San Cristóbal de La Laguna, declared of National Tourist Interest. The image of the Holy Christ of La Laguna, venerated since the 15th century, is carried in procession through the UNESCO World Heritage historic center streets. Thousands of faithful accompany the image in one of the most emotional religious events in the Canary Islands.',
        de: 'Das wichtigste Fest von San Cristóbal de La Laguna, zum Fest von nationalem touristischem Interesse erklärt. Das Bildnis des Heiligen Christus von La Laguna, seit dem 15. Jahrhundert verehrt, wird in Prozession durch die Straßen des UNESCO-Welterbe-Zentrums getragen. Tausende Gläubige begleiten das Bildnis bei einem der emotionalsten religiösen Ereignisse der Kanarischen Inseln.'
      },
      municipality: 'San Cristóbal de La Laguna',
      municipality_slug: 'san-cristobal-de-la-laguna',
      area_id: areas['la-laguna'],
      event_type: 'religious',
      start_date: '09-13',
      end_date: '09-14',
      month: 9,
      highlights: [
        { es: 'Procesión del Cristo por el centro histórico', en: 'Christ procession through the historic center', de: 'Christusprozession durch das historische Zentrum' },
        { es: 'Alfombras de flores en las calles', en: 'Flower carpets on the streets', de: 'Blumenteppiche auf den Straßen' },
        { es: 'Ambiente devoto con miles de fieles', en: 'Devout atmosphere with thousands of faithful', de: 'Andächtige Atmosphäre mit Tausenden von Gläubigen' }
      ],
      traditions: [
        { es: 'El Cristo sale del Real Santuario y recorre las calles del casco histórico', en: 'The Christ leaves the Royal Sanctuary and traverses the historic center streets', de: 'Der Christus verlässt das Königliche Heiligtum und durchquert die Straßen der Altstadt' }
      ],
      practical_info: {
        es: 'El centro de La Laguna se cierra al tráfico. Usa el tranvía desde Santa Cruz. Llega con horas de antelación para la procesión nocturna.',
        en: 'La Laguna center is closed to traffic. Use the tram from Santa Cruz. Arrive hours early for the evening procession.',
        de: 'Das Zentrum von La Laguna ist für den Verkehr gesperrt. Nutzen Sie die Straßenbahn ab Santa Cruz. Kommen Sie Stunden vor der Abendprozession.'
      },
      featured: true
    },
    {
      slug: 'romeria-san-benito-laguna',
      name: { es: 'Romería de San Benito Abad', en: 'Pilgrimage of Saint Benedict the Abbot', de: 'Wallfahrt des Heiligen Benedikt' },
      description: {
        es: 'La romería más multitudinaria de Tenerife y una de las más grandes de Canarias. Miles de romeros vestidos con trajes típicos canarios recorren las calles de La Laguna con carretas tiradas por bueyes, cabras, burros y productos de la tierra. Se reparte vino, queso, gofio y papas arrugadas gratis.',
        en: 'The most popular pilgrimage in Tenerife and one of the largest in the Canary Islands. Thousands of pilgrims dressed in traditional Canarian costumes walk through La Laguna streets with ox-drawn carts, goats, donkeys and local produce. Wine, cheese, gofio and wrinkled potatoes are distributed for free.',
        de: 'Die meistbesuchte Wallfahrt Teneriffas und eine der größten der Kanarischen Inseln. Tausende Pilger in kanarischen Trachten ziehen mit Ochsenkarren, Ziegen, Eseln und lokalen Produkten durch die Straßen von La Laguna. Wein, Käse, Gofio und Runzelkartoffeln werden kostenlos verteilt.'
      },
      municipality: 'San Cristóbal de La Laguna',
      municipality_slug: 'san-cristobal-de-la-laguna',
      area_id: areas['la-laguna'],
      event_type: 'religious',
      start_date: '07-15',
      end_date: '07-15',
      month: 7,
      highlights: [
        { es: 'Miles de romeros con trajes típicos canarios', en: 'Thousands of pilgrims in traditional Canarian costumes', de: 'Tausende Pilger in kanarischen Trachten' },
        { es: 'Carretas engalanadas tiradas por bueyes', en: 'Decorated ox-drawn carts', de: 'Geschmückte Ochsenkarren' },
        { es: 'Reparto gratuito de vino, queso y gofio', en: 'Free distribution of wine, cheese and gofio', de: 'Kostenlose Verteilung von Wein, Käse und Gofio' }
      ],
      traditions: [
        { es: 'Los romeros llevan productos de la tierra para compartir con todos', en: 'Pilgrims bring local produce to share with everyone', de: 'Pilger bringen lokale Produkte zum Teilen mit allen mit' }
      ],
      practical_info: {
        es: 'La romería recorre la calle San Agustín y llega hasta la ermita de San Benito. Usa el tranvía. Lleva ropa cómoda y ganas de comer y beber.',
        en: 'The pilgrimage goes along San Agustín street to San Benito chapel. Use the tram. Wear comfortable clothes and come hungry and thirsty.',
        de: 'Die Wallfahrt verläuft entlang der San-Agustín-Straße zur San-Benito-Kapelle. Nutzen Sie die Straßenbahn. Tragen Sie bequeme Kleidung und kommen Sie hungrig und durstig.'
      },
      featured: true
    },
    {
      slug: 'nuestra-senora-rosario-el-rosario',
      name: { es: 'Fiesta de Nuestra Señora del Rosario', en: 'Festival of Our Lady of the Rosary', de: 'Fest Unserer Lieben Frau vom Rosenkranz' },
      description: {
        es: 'Fiesta patronal de El Rosario con procesiones, verbenas y actos religiosos en honor a la Virgen del Rosario.',
        en: 'Patron saint festival of El Rosario with processions, street parties and religious events honoring the Virgin of the Rosary.',
        de: 'Patronatsfest von El Rosario mit Prozessionen, Volksfesten und religiösen Veranstaltungen zu Ehren der Jungfrau vom Rosenkranz.'
      },
      municipality: 'El Rosario',
      municipality_slug: 'el-rosario',
      area_id: null,
      event_type: 'fiesta_patronal',
      start_date: '10-07',
      end_date: '10-07',
      month: 10,
      highlights: [
        { es: 'Procesión de la Virgen del Rosario', en: 'Procession of the Virgin of the Rosary', de: 'Prozession der Jungfrau vom Rosenkranz' }
      ],
      traditions: [],
      practical_info: {
        es: 'El Rosario está entre Santa Cruz y La Laguna, bien comunicado por guagua.',
        en: 'El Rosario is between Santa Cruz and La Laguna, well connected by bus.',
        de: 'El Rosario liegt zwischen Santa Cruz und La Laguna, gut mit dem Bus erreichbar.'
      },
      featured: false
    },
    {
      slug: 'san-marcos-tegueste',
      name: { es: 'Fiesta de San Marcos', en: 'Festival of Saint Mark', de: 'Fest des Heiligen Markus' },
      description: {
        es: 'Tegueste celebra a San Marcos con una de las romerías más populares del norte de Tenerife. La Romería de San Marcos atrae a miles de personas que disfrutan de carretas, trajes típicos, música folclórica y comida canaria tradicional.',
        en: 'Tegueste celebrates Saint Mark with one of the most popular pilgrimages in northern Tenerife. The Pilgrimage of Saint Mark attracts thousands who enjoy decorated carts, traditional costumes, folk music and traditional Canarian food.',
        de: 'Tegueste feiert den Heiligen Markus mit einer der beliebtesten Wallfahrten im Norden Teneriffas. Die Wallfahrt des Heiligen Markus zieht Tausende an, die geschmückte Wagen, traditionelle Trachten, Volksmusik und kanarisches Essen genießen.'
      },
      municipality: 'Tegueste',
      municipality_slug: 'tegueste',
      area_id: areas['la-laguna'],
      event_type: 'fiesta_patronal',
      start_date: '04-25',
      end_date: '04-25',
      month: 4,
      highlights: [
        { es: 'Romería de San Marcos con carretas y trajes típicos', en: 'Saint Mark pilgrimage with carts and traditional costumes', de: 'Markus-Wallfahrt mit Wagen und Trachten' },
        { es: 'Degustación de vinos y quesos locales', en: 'Local wine and cheese tasting', de: 'Verkostung lokaler Weine und Käse' }
      ],
      traditions: [],
      practical_info: {
        es: 'Tegueste está a 10 minutos de La Laguna. Aparcamiento limitado durante la romería.',
        en: 'Tegueste is 10 minutes from La Laguna. Limited parking during the pilgrimage.',
        de: 'Tegueste ist 10 Minuten von La Laguna entfernt. Begrenzte Parkplätze während der Wallfahrt.'
      },
      featured: false
    },
    {
      slug: 'santa-catalina-tacoronte',
      name: { es: 'Fiesta de Santa Catalina', en: 'Festival of Saint Catherine', de: 'Fest der Heiligen Katharina' },
      description: {
        es: 'Tacoronte celebra a su patrona Santa Catalina con procesiones, verbenas y la famosa degustación de vinos de la comarca, reconocidos con Denominación de Origen Tacoronte-Acentejo.',
        en: 'Tacoronte celebrates its patron saint Catherine with processions, street parties and the famous local wine tasting, recognized with Tacoronte-Acentejo Denomination of Origin.',
        de: 'Tacoronte feiert seine Schutzpatronin Katharina mit Prozessionen, Volksfesten und der berühmten lokalen Weinverkostung, anerkannt mit der Herkunftsbezeichnung Tacoronte-Acentejo.'
      },
      municipality: 'Tacoronte',
      municipality_slug: 'tacoronte',
      area_id: null,
      event_type: 'fiesta_patronal',
      start_date: '11-25',
      end_date: '11-25',
      month: 11,
      highlights: [
        { es: 'Degustación de vinos DO Tacoronte-Acentejo', en: 'Tacoronte-Acentejo DO wine tasting', de: 'Verkostung von Tacoronte-Acentejo DO Weinen' },
        { es: 'Procesión de Santa Catalina', en: 'Saint Catherine procession', de: 'Prozession der Heiligen Katharina' }
      ],
      traditions: [],
      practical_info: {
        es: 'Tacoronte está en la autopista del norte TF-5. Famoso por sus vinos y su gastronomía.',
        en: 'Tacoronte is on the northern TF-5 motorway. Famous for its wines and gastronomy.',
        de: 'Tacoronte liegt an der nördlichen Autobahn TF-5. Berühmt für seine Weine und Gastronomie.'
      },
      featured: false
    },
    {
      slug: 'cristo-tacoronte',
      name: { es: 'Fiestas del Cristo de Tacoronte', en: 'Festival of the Christ of Tacoronte', de: 'Fest des Christus von Tacoronte' },
      description: {
        es: 'Las Fiestas del Cristo de Tacoronte son las más importantes del municipio, con procesiones solemnes, verbenas y actividades culturales. El Cristo de Tacoronte es una imagen muy venerada en el norte de Tenerife.',
        en: 'The Festival of the Christ of Tacoronte is the most important in the municipality, with solemn processions, street parties and cultural activities. The Christ of Tacoronte is a highly venerated image in northern Tenerife.',
        de: 'Das Fest des Christus von Tacoronte ist das wichtigste der Gemeinde mit feierlichen Prozessionen, Volksfesten und kulturellen Aktivitäten. Der Christus von Tacoronte ist ein hoch verehrtes Bildnis im Norden Teneriffas.'
      },
      municipality: 'Tacoronte',
      municipality_slug: 'tacoronte',
      area_id: null,
      event_type: 'religious',
      start_date: '09-14',
      end_date: '09-14',
      month: 9,
      highlights: [
        { es: 'Procesión del Cristo por las calles de Tacoronte', en: 'Christ procession through Tacoronte streets', de: 'Christusprozession durch die Straßen von Tacoronte' }
      ],
      traditions: [],
      practical_info: {
        es: 'Se celebra en septiembre en el casco de Tacoronte.',
        en: 'Celebrated in September in Tacoronte town center.',
        de: 'Wird im September im Ortskern von Tacoronte gefeiert.'
      },
      featured: false
    },
    // ===== EAST =====
    {
      slug: 'bajada-virgen-candelaria',
      name: { es: 'Bajada de la Virgen de Candelaria', en: 'Descent of the Virgin of Candelaria', de: 'Abstieg der Jungfrau von Candelaria' },
      description: {
        es: 'El acto religioso más importante de las Islas Canarias. Cada 15 de agosto, la Basílica de Candelaria acoge a decenas de miles de peregrinos que caminan desde todos los rincones de Tenerife para venerar a la Virgen de Candelaria, patrona del archipiélago. La víspera, miles de personas llegan a pie por la autopista en una peregrinación nocturna multitudinaria. Se representan actos guanches y la aparición de la Virgen a los aborígenes.',
        en: 'The most important religious event in the Canary Islands. Every August 15th, the Basilica of Candelaria receives tens of thousands of pilgrims who walk from all corners of Tenerife to venerate the Virgin of Candelaria, patron saint of the archipelago. The eve before, thousands arrive on foot via the motorway in a massive nighttime pilgrimage. Guanche acts and the appearance of the Virgin to the aborigines are reenacted.',
        de: 'Das wichtigste religiöse Ereignis der Kanarischen Inseln. Jeden 15. August empfängt die Basilika von Candelaria Zehntausende Pilger, die aus allen Ecken Teneriffas wandern, um die Virgen de Candelaria, Schutzpatronin des Archipels, zu verehren. Am Vorabend kommen Tausende zu Fuß über die Autobahn in einer massiven nächtlichen Pilgerfahrt. Guanchen-Akte und die Erscheinung der Jungfrau vor den Ureinwohnern werden nachgestellt.'
      },
      municipality: 'Candelaria',
      municipality_slug: 'candelaria',
      area_id: null,
      event_type: 'religious',
      start_date: '08-14',
      end_date: '08-15',
      month: 8,
      highlights: [
        { es: 'Peregrinación nocturna masiva el 14 de agosto', en: 'Massive nighttime pilgrimage on August 14th', de: 'Massive nächtliche Pilgerfahrt am 14. August' },
        { es: 'Misa solemne en la Basílica de Candelaria', en: 'Solemn mass at the Basilica of Candelaria', de: 'Feierliche Messe in der Basilika von Candelaria' },
        { es: 'Representación de la aparición de la Virgen a los guanches', en: 'Reenactment of the Virgin\'s appearance to the Guanches', de: 'Nachstellung der Erscheinung der Jungfrau vor den Guanchen' },
        { es: 'Procesión de la Virgen por la plaza', en: 'Procession of the Virgin through the square', de: 'Prozession der Jungfrau über den Platz' }
      ],
      traditions: [
        { es: 'Miles de peregrinos caminan de noche por la autopista hasta Candelaria', en: 'Thousands of pilgrims walk through the night along the motorway to Candelaria', de: 'Tausende Pilger wandern nachts entlang der Autobahn nach Candelaria' },
        { es: 'Representación guanche de la aparición de la Virgen en la playa', en: 'Guanche reenactment of the Virgin\'s appearance on the beach', de: 'Guanchen-Nachstellung der Erscheinung der Jungfrau am Strand' }
      ],
      practical_info: {
        es: 'La peregrinación comienza la noche del 14 de agosto. Lleva calzado cómodo, agua y linterna. La autopista se cierra al tráfico para los peregrinos. El 15 hay misa solemne y procesión.',
        en: 'The pilgrimage begins on the night of August 14th. Bring comfortable shoes, water and a flashlight. The motorway is closed to traffic for pilgrims. August 15th has solemn mass and procession.',
        de: 'Die Pilgerfahrt beginnt in der Nacht des 14. August. Bringen Sie bequeme Schuhe, Wasser und eine Taschenlampe mit. Die Autobahn wird für Pilger gesperrt. Am 15. August gibt es feierliche Messe und Prozession.'
      },
      featured: true
    },
    {
      slug: 'san-juan-degollado-arafo',
      name: { es: 'Fiesta de San Juan Degollado', en: 'Festival of the Beheading of Saint John', de: 'Fest der Enthauptung des Heiligen Johannes' },
      description: {
        es: 'Fiesta patronal de Arafo con procesiones, verbenas y tradiciones populares en este pueblo agrícola del valle de Güímar.',
        en: 'Patron saint festival of Arafo with processions, street parties and popular traditions in this agricultural village in the Güímar valley.',
        de: 'Patronatsfest von Arafo mit Prozessionen, Volksfesten und Volkstraditionen in diesem landwirtschaftlichen Dorf im Güímar-Tal.'
      },
      municipality: 'Arafo',
      municipality_slug: 'arafo',
      area_id: null,
      event_type: 'fiesta_patronal',
      start_date: '08-29',
      end_date: '08-29',
      month: 8,
      highlights: [
        { es: 'Procesión de San Juan Degollado', en: 'Procession of the Beheading of Saint John', de: 'Prozession der Enthauptung des Heiligen Johannes' },
        { es: 'Verbenas populares', en: 'Popular street parties', de: 'Volksfeste' }
      ],
      traditions: [],
      practical_info: {
        es: 'Arafo está en el valle de Güímar, accesible por la autopista TF-1.',
        en: 'Arafo is in the Güímar valley, accessible via the TF-1 motorway.',
        de: 'Arafo liegt im Güímar-Tal, erreichbar über die Autobahn TF-1.'
      },
      featured: false
    },
    {
      slug: 'san-amaro-matanza',
      name: { es: 'Fiesta de San Amaro', en: 'Festival of Saint Amaro', de: 'Fest des Heiligen Amaro' },
      description: {
        es: 'La Matanza de Acentejo celebra a San Amaro con fiestas tradicionales, procesiones y verbenas. El pueblo es conocido por sus vinos y su gastronomía, con restaurantes donde se sirve carne a la brasa con papas y mojo.',
        en: 'La Matanza de Acentejo celebrates Saint Amaro with traditional festivities, processions and street parties. The town is known for its wines and gastronomy, with restaurants serving grilled meat with potatoes and mojo.',
        de: 'La Matanza de Acentejo feiert den Heiligen Amaro mit traditionellen Festlichkeiten, Prozessionen und Volksfesten. Der Ort ist bekannt für seine Weine und Gastronomie mit Restaurants, die Grillfleisch mit Kartoffeln und Mojo servieren.'
      },
      municipality: 'La Matanza de Acentejo',
      municipality_slug: 'la-matanza-de-acentejo',
      area_id: null,
      event_type: 'fiesta_patronal',
      start_date: '01-15',
      end_date: '01-15',
      month: 1,
      highlights: [
        { es: 'Procesión de San Amaro', en: 'Saint Amaro procession', de: 'Prozession des Heiligen Amaro' },
        { es: 'Degustación gastronómica con carnes a la brasa', en: 'Gastronomic tasting with grilled meats', de: 'Gastronomische Verkostung mit Grillfleisch' }
      ],
      traditions: [],
      practical_info: {
        es: 'La Matanza está en la carretera general del norte, zona de guachinches y restaurantes tradicionales.',
        en: 'La Matanza is on the northern main road, an area of guachinches and traditional restaurants.',
        de: 'La Matanza liegt an der nördlichen Hauptstraße, einer Gegend mit Guachinches und traditionellen Restaurants.'
      },
      featured: false
    },
    {
      slug: 'encarnacion-victoria',
      name: { es: 'Fiesta de Nuestra Señora de la Encarnación', en: 'Festival of Our Lady of the Incarnation', de: 'Fest Unserer Lieben Frau der Menschwerdung' },
      description: {
        es: 'La Victoria de Acentejo celebra a su patrona con procesiones y fiestas populares. El pueblo recuerda la victoria de los castellanos sobre los guanches en la batalla de Acentejo de 1495.',
        en: 'La Victoria de Acentejo celebrates its patron with processions and popular festivities. The town commemorates the Castilian victory over the Guanches in the Battle of Acentejo in 1495.',
        de: 'La Victoria de Acentejo feiert seine Schutzpatronin mit Prozessionen und Volksfesten. Der Ort erinnert an den kastilischen Sieg über die Guanchen in der Schlacht von Acentejo 1495.'
      },
      municipality: 'La Victoria de Acentejo',
      municipality_slug: 'la-victoria-de-acentejo',
      area_id: null,
      event_type: 'fiesta_patronal',
      start_date: '03-25',
      end_date: '03-25',
      month: 3,
      highlights: [
        { es: 'Procesión de la Virgen de la Encarnación', en: 'Procession of the Virgin of the Incarnation', de: 'Prozession der Jungfrau der Menschwerdung' }
      ],
      traditions: [],
      practical_info: {
        es: 'La Victoria está en la autopista del norte TF-5, entre Tacoronte y La Matanza.',
        en: 'La Victoria is on the northern TF-5 motorway, between Tacoronte and La Matanza.',
        de: 'La Victoria liegt an der nördlichen Autobahn TF-5, zwischen Tacoronte und La Matanza.'
      },
      featured: false
    },
    {
      slug: 'santa-ursula-santa-ursula',
      name: { es: 'Fiesta de Santa Úrsula', en: 'Festival of Saint Ursula', de: 'Fest der Heiligen Ursula' },
      description: {
        es: 'El municipio de Santa Úrsula celebra su fiesta patronal con procesiones, verbenas y actividades culturales. Un pueblo de medianías con impresionantes vistas al Teide y al valle de La Orotava.',
        en: 'The municipality of Santa Úrsula celebrates its patron saint festival with processions, street parties and cultural activities. A mid-altitude town with impressive views of Teide and the Orotava Valley.',
        de: 'Die Gemeinde Santa Úrsula feiert ihr Patronatsfest mit Prozessionen, Volksfesten und kulturellen Aktivitäten. Ein Ort in mittlerer Höhenlage mit beeindruckenden Blicken auf den Teide und das Orotava-Tal.'
      },
      municipality: 'Santa Úrsula',
      municipality_slug: 'santa-ursula',
      area_id: null,
      event_type: 'fiesta_patronal',
      start_date: '10-21',
      end_date: '10-21',
      month: 10,
      highlights: [
        { es: 'Procesión de Santa Úrsula', en: 'Saint Ursula procession', de: 'Prozession der Heiligen Ursula' },
        { es: 'Vistas espectaculares del Teide durante las fiestas', en: 'Spectacular Teide views during the festival', de: 'Spektakuläre Teide-Aussichten während des Festes' }
      ],
      traditions: [],
      practical_info: {
        es: 'Santa Úrsula está entre Puerto de la Cruz y La Orotava. Mirador con vistas al valle.',
        en: 'Santa Úrsula is between Puerto de la Cruz and La Orotava. Viewpoint overlooking the valley.',
        de: 'Santa Úrsula liegt zwischen Puerto de la Cruz und La Orotava. Aussichtspunkt mit Blick auf das Tal.'
      },
      featured: false
    },
    {
      slug: 'san-pedro-el-sauzal',
      name: { es: 'Fiesta de San Pedro', en: 'Festival of Saint Peter', de: 'Fest des Heiligen Petrus' },
      description: {
        es: 'El Sauzal celebra a San Pedro con fiestas patronales, procesiones y verbenas. El municipio es conocido por la Casa del Vino, donde se pueden degustar los mejores vinos de Tenerife.',
        en: 'El Sauzal celebrates Saint Peter with patron saint festivities, processions and street parties. The municipality is known for the Casa del Vino (Wine House), where you can taste the best wines of Tenerife.',
        de: 'El Sauzal feiert den Heiligen Petrus mit Patronatsfest, Prozessionen und Volksfesten. Die Gemeinde ist bekannt für die Casa del Vino (Weinhaus), wo man die besten Weine Teneriffas probieren kann.'
      },
      municipality: 'El Sauzal',
      municipality_slug: 'el-sauzal',
      area_id: null,
      event_type: 'fiesta_patronal',
      start_date: '06-29',
      end_date: '06-29',
      month: 6,
      highlights: [
        { es: 'Procesión de San Pedro', en: 'Saint Peter procession', de: 'Petrus-Prozession' },
        { es: 'Cata de vinos en la Casa del Vino', en: 'Wine tasting at Casa del Vino', de: 'Weinverkostung in der Casa del Vino' }
      ],
      traditions: [],
      practical_info: {
        es: 'Visita la Casa del Vino de Tenerife para una experiencia completa.',
        en: 'Visit the Casa del Vino de Tenerife for a complete experience.',
        de: 'Besuchen Sie die Casa del Vino de Tenerife für ein vollständiges Erlebnis.'
      },
      featured: false
    },
    // ===== WEST =====
    {
      slug: 'santiago-apostol-santiago-teide',
      name: { es: 'Fiesta de Santiago Apóstol', en: 'Festival of Saint James the Apostle', de: 'Fest des Heiligen Jakobus' },
      description: {
        es: 'Santiago del Teide celebra a su patrón Santiago Apóstol con procesiones, verbenas y actos religiosos. El municipio incluye el pueblo de Masca, uno de los más espectaculares de Tenerife, enclavado en el macizo de Teno.',
        en: 'Santiago del Teide celebrates its patron Saint James the Apostle with processions, street parties and religious events. The municipality includes the village of Masca, one of the most spectacular in Tenerife, nestled in the Teno massif.',
        de: 'Santiago del Teide feiert seinen Schutzpatron Jakobus den Apostel mit Prozessionen, Volksfesten und religiösen Veranstaltungen. Die Gemeinde umfasst das Dorf Masca, eines der spektakulärsten auf Teneriffa, eingebettet im Teno-Massiv.'
      },
      municipality: 'Santiago del Teide',
      municipality_slug: 'santiago-del-teide',
      area_id: areas['los-gigantes'],
      event_type: 'fiesta_patronal',
      start_date: '07-25',
      end_date: '07-25',
      month: 7,
      highlights: [
        { es: 'Procesión de Santiago Apóstol', en: 'Saint James the Apostle procession', de: 'Jakobusprozession' },
        { es: 'Verbenas con vistas a los acantilados de Los Gigantes', en: 'Street parties with Los Gigantes cliff views', de: 'Volksfeste mit Blick auf die Klippen von Los Gigantes' }
      ],
      traditions: [],
      practical_info: {
        es: 'Aprovecha la visita para recorrer Masca y los acantilados de Los Gigantes.',
        en: 'Take the opportunity to visit Masca and the Los Gigantes cliffs.',
        de: 'Nutzen Sie die Gelegenheit, Masca und die Klippen von Los Gigantes zu besuchen.'
      },
      featured: false
    },
    {
      slug: 'nuestra-senora-luz-guia-isora',
      name: { es: 'Fiesta de Nuestra Señora de la Luz', en: 'Festival of Our Lady of Light', de: 'Fest Unserer Lieben Frau des Lichts' },
      description: {
        es: 'Guía de Isora celebra a su patrona la Virgen de la Luz con procesiones, verbenas y actividades culturales. El municipio abarca desde la costa de Playa San Juan hasta las cumbres del Teide.',
        en: 'Guía de Isora celebrates its patron the Virgin of Light with processions, street parties and cultural activities. The municipality spans from the coast of Playa San Juan to the peaks of Teide.',
        de: 'Guía de Isora feiert seine Schutzpatronin, die Jungfrau des Lichts, mit Prozessionen, Volksfesten und kulturellen Aktivitäten. Die Gemeinde erstreckt sich von der Küste von Playa San Juan bis zu den Gipfeln des Teide.'
      },
      municipality: 'Guía de Isora',
      municipality_slug: 'guia-de-isora',
      area_id: areas['los-gigantes'],
      event_type: 'fiesta_patronal',
      start_date: '08-15',
      end_date: '08-22',
      month: 8,
      highlights: [
        { es: 'Procesión de la Virgen de la Luz', en: 'Procession of the Virgin of Light', de: 'Prozession der Jungfrau des Lichts' },
        { es: 'Verbenas y conciertos', en: 'Street parties and concerts', de: 'Volksfeste und Konzerte' }
      ],
      traditions: [],
      practical_info: {
        es: 'El casco de Guía de Isora está en zona de medianías. La costa (Playa San Juan, Alcalá) tiene ambiente más turístico.',
        en: 'Guía de Isora town center is in the mid-altitude zone. The coast (Playa San Juan, Alcalá) has a more touristic atmosphere.',
        de: 'Das Zentrum von Guía de Isora liegt in der mittleren Höhenlage. Die Küste (Playa San Juan, Alcalá) hat eine touristischere Atmosphäre.'
      },
      featured: false
    },
    {
      slug: 'san-pedro-apostol-vilaflor',
      name: { es: 'Fiesta de San Pedro Apóstol', en: 'Festival of Saint Peter the Apostle', de: 'Fest des Heiligen Petrus' },
      description: {
        es: 'Vilaflor, el pueblo más alto de España, celebra a San Pedro con procesiones y fiestas en un entorno natural privilegiado, entre pinares canarios y con vistas al Teide. La gastronomía local destaca por sus quesos, miel y almendras.',
        en: 'Vilaflor, the highest village in Spain, celebrates Saint Peter with processions and festivities in a privileged natural setting, among Canarian pine forests with views of Teide. Local gastronomy features cheeses, honey and almonds.',
        de: 'Vilaflor, das höchstgelegene Dorf Spaniens, feiert den Heiligen Petrus mit Prozessionen und Festlichkeiten in privilegierter Naturkulisse, inmitten kanarischer Kiefernwälder mit Blick auf den Teide. Die lokale Gastronomie bietet Käse, Honig und Mandeln.'
      },
      municipality: 'Vilaflor',
      municipality_slug: 'vilaflor',
      area_id: areas['teide'],
      event_type: 'fiesta_patronal',
      start_date: '06-29',
      end_date: '06-29',
      month: 6,
      highlights: [
        { es: 'Procesión en el pueblo más alto de España', en: 'Procession in Spain\'s highest village', de: 'Prozession im höchsten Dorf Spaniens' },
        { es: 'Degustación de productos locales: queso, miel, almendras', en: 'Local product tasting: cheese, honey, almonds', de: 'Verkostung lokaler Produkte: Käse, Honig, Mandeln' }
      ],
      traditions: [],
      practical_info: {
        es: 'Vilaflor está a 1.400 metros de altitud. Lleva ropa de abrigo, las noches son frescas. De camino al Teide.',
        en: 'Vilaflor is at 1,400 meters altitude. Bring warm clothes, nights are cool. On the way to Teide.',
        de: 'Vilaflor liegt auf 1.400 Metern Höhe. Bringen Sie warme Kleidung mit, die Nächte sind kühl. Auf dem Weg zum Teide.'
      },
      featured: false
    },
    // ===== ISLAND-WIDE MAJOR EVENTS (duplicates of above but as featured island events) =====
    {
      slug: 'fiestas-julio-puerto-cruz',
      name: { es: 'Fiestas de Julio de Puerto de la Cruz', en: 'July Festivities of Puerto de la Cruz', de: 'Juli-Festlichkeiten von Puerto de la Cruz' },
      description: {
        es: 'Todo el mes de julio Puerto de la Cruz se convierte en una fiesta continua con conciertos, espectáculos, verbenas y la emblemática Fiesta del Carmen. El paseo marítimo y el Lago Martiánez son escenarios de eventos culturales y musicales.',
        en: 'All through July, Puerto de la Cruz becomes a continuous party with concerts, shows, street parties and the emblematic Festival of Carmen. The seafront promenade and Lago Martiánez host cultural and musical events.',
        de: 'Den ganzen Juli über verwandelt sich Puerto de la Cruz in ein ununterbrochenes Fest mit Konzerten, Shows, Volksfesten und dem emblematischen Fest der Carmen. Die Strandpromenade und der Lago Martiánez sind Schauplätze kultureller und musikalischer Veranstaltungen.'
      },
      municipality: 'Puerto de la Cruz',
      municipality_slug: 'puerto-de-la-cruz',
      area_id: areas['puerto-de-la-cruz'],
      event_type: 'cultural',
      start_date: '07-01',
      end_date: '07-31',
      month: 7,
      highlights: [
        { es: 'Conciertos en el Lago Martiánez', en: 'Concerts at Lago Martiánez', de: 'Konzerte am Lago Martiánez' },
        { es: 'Verbenas en el paseo marítimo', en: 'Street parties on the seafront', de: 'Volksfeste an der Strandpromenade' },
        { es: 'Espectáculos culturales durante todo el mes', en: 'Cultural shows throughout the month', de: 'Kulturelle Veranstaltungen den ganzen Monat über' }
      ],
      traditions: [],
      practical_info: {
        es: 'Puerto de la Cruz tiene buena conexión en guagua desde toda la isla. Hay eventos casi cada noche durante julio.',
        en: 'Puerto de la Cruz has good bus connections from across the island. There are events almost every night during July.',
        de: 'Puerto de la Cruz hat gute Busverbindungen von der gesamten Insel. Im Juli gibt es fast jeden Abend Veranstaltungen.'
      },
      featured: true
    },
    {
      slug: 'fiesta-rama-guimar',
      name: { es: 'Fiesta de la Rama de Güímar', en: 'Branch Festival of Güímar', de: 'Zweigfest von Güímar' },
      description: {
        es: 'Antigua tradición guanche rescatada en Güímar donde los vecinos bajan ramas desde las cumbres hasta el pueblo en una celebración que rememora los ritos aborígenes de petición de lluvias. Una de las tradiciones prehispánicas más singulares de Canarias.',
        en: 'An ancient Guanche tradition revived in Güímar where locals carry branches down from the peaks to the village in a celebration that commemorates the aboriginal rain-requesting rites. One of the most unique pre-Hispanic traditions in the Canary Islands.',
        de: 'Eine alte Guanchen-Tradition, die in Güímar wiederbelebt wurde, bei der Einheimische Zweige von den Berggipfeln ins Dorf tragen, um die Regenrituale der Ureinwohner zu gedenken. Eine der einzigartigsten prähistorischen Traditionen der Kanarischen Inseln.'
      },
      municipality: 'Güímar',
      municipality_slug: 'guimar',
      area_id: null,
      event_type: 'cultural',
      start_date: '09-15',
      end_date: '09-15',
      month: 9,
      highlights: [
        { es: 'Bajada de ramas desde las cumbres al pueblo', en: 'Carrying branches from the peaks to the village', de: 'Zweige von den Gipfeln ins Dorf tragen' },
        { es: 'Recreación de rituales guanches', en: 'Reenactment of Guanche rituals', de: 'Nachstellung von Guanchen-Ritualen' }
      ],
      traditions: [
        { es: 'Los guanches golpeaban el mar con ramas para pedir lluvias a sus dioses', en: 'The Guanches struck the sea with branches to ask their gods for rain', de: 'Die Guanchen schlugen mit Zweigen auf das Meer, um ihre Götter um Regen zu bitten' }
      ],
      practical_info: {
        es: 'Se celebra en septiembre. Una experiencia única para conocer las raíces aborígenes de Tenerife.',
        en: 'Celebrated in September. A unique experience to discover Tenerife\'s aboriginal roots.',
        de: 'Wird im September gefeiert. Ein einzigartiges Erlebnis, um Teneriffas Ureinwohner-Wurzeln zu entdecken.'
      },
      featured: false
    },
    {
      slug: 'fiesta-marionetas-icod',
      name: { es: 'Festival de las Marionetas de Icod', en: 'Icod Puppet Festival', de: 'Marionettenfestival von Icod' },
      description: {
        es: 'Festival internacional de títeres y marionetas que se celebra en Icod de los Vinos, con espectáculos para toda la familia en las plazas y calles del pueblo, junto al famoso Drago Milenario.',
        en: 'International puppet and marionette festival held in Icod de los Vinos, with family-friendly shows in the town squares and streets, next to the famous Millennial Dragon Tree.',
        de: 'Internationales Puppen- und Marionettenfestival in Icod de los Vinos mit familienfreundlichen Aufführungen auf den Plätzen und Straßen der Stadt, neben dem berühmten Tausendjährigen Drachenbaum.'
      },
      municipality: 'Icod de los Vinos',
      municipality_slug: 'icod-de-los-vinos',
      area_id: null,
      event_type: 'cultural',
      start_date: '11-01',
      end_date: '11-10',
      month: 11,
      highlights: [
        { es: 'Espectáculos de títeres internacionales', en: 'International puppet shows', de: 'Internationale Puppenspiele' },
        { es: 'Actuaciones al aire libre junto al Drago', en: 'Open-air performances next to the Dragon Tree', de: 'Freiluftaufführungen neben dem Drachenbaum' }
      ],
      traditions: [],
      practical_info: {
        es: 'Espectáculos gratuitos en las plazas. Ideal para familias con niños.',
        en: 'Free shows in the squares. Ideal for families with children.',
        de: 'Kostenlose Aufführungen auf den Plätzen. Ideal für Familien mit Kindern.'
      },
      featured: false
    }
  ]

  console.log(`Inserting ${events.length} events...`)

  // Insert in batches of 5 to avoid issues
  for (let i = 0; i < events.length; i += 5) {
    const batch = events.slice(i, i + 5)
    const { error } = await supabase.from('events').upsert(batch, { onConflict: 'slug' })
    if (error) {
      console.error(`Error inserting batch ${Math.floor(i/5) + 1}:`, error.message)
      // Try one by one
      for (const event of batch) {
        const { error: singleError } = await supabase.from('events').upsert(event, { onConflict: 'slug' })
        if (singleError) {
          console.error(`  Failed: ${event.slug} - ${singleError.message}`)
        } else {
          console.log(`  OK: ${event.slug}`)
        }
      }
    } else {
      console.log(`  Batch ${Math.floor(i/5) + 1}: ${batch.map(e => e.slug).join(', ')}`)
    }
  }

  console.log('Done inserting events!')
}

async function main() {
  console.log('=== Create Events Table & Populate Data ===\n')
  await createTable()
  console.log('')
  await insertEvents()
  console.log('\n=== Complete ===')
}

main().catch(console.error)
