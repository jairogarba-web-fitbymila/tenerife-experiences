import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://sqesgghvaazyajzjkoap.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxZXNnZ2h2YWF6eWFqemprb2FwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzUxMzgwOSwiZXhwIjoyMDg5MDg5ODA5fQ.UvbRfWU9seJPT9lyCyLmpD4uZrP9jXzsNoeSAjT9HnI'
);

const CAT = {
  culture: '9f8f3805-9f17-4848-99f1-90f80f8cbf59',
  experiences: '4af61632-1baa-457e-990e-e2e71a27def8',
  wellness: '2f0ec6f2-458e-4e7a-bbb5-4ff810263748',
  nature: '56eb6a9a-7360-48ec-a1a0-a7a74bef61b5',
  nightlife: '35a0c7ad-a724-4097-9ab2-62e6ff7276e1',
};

const articles = [
  // 1. Puerto de la Cruz: qué ver y hacer
  {
    slug: 'puerto-de-la-cruz-guia',
    title: {
      es: 'Puerto de la Cruz: qué ver y hacer',
      en: 'Puerto de la Cruz: What to See and Do',
    },
    excerpt: {
      es: 'Guía completa de Puerto de la Cruz: sus playas, jardines botánicos, casco histórico y los mejores planes para disfrutar del norte de Tenerife.',
      en: 'Complete guide to Puerto de la Cruz: its beaches, botanical gardens, historic centre and the best plans to enjoy the north of Tenerife.',
    },
    content: {
      es: `<h2>Puerto de la Cruz: guía completa del norte de Tenerife</h2>
<p>Puerto de la Cruz es la joya del norte de Tenerife, una ciudad con más de 500 años de historia que combina tradición canaria con una oferta turística de primer nivel. A diferencia del sur de la isla, aquí encontrarás un ambiente más auténtico, vegetación exuberante y un paisaje marcado por la cercanía del Teide y el valle de La Orotava.</p>

<h3>Qué ver en Puerto de la Cruz</h3>
<ul>
<li><strong>Lago Martiánez:</strong> complejo de piscinas de agua salada diseñado por César Manrique. Un espacio único para bañarse con vistas al Atlántico. Entrada desde 5,50 euros.</li>
<li><strong>Jardín Botánico:</strong> fundado en 1788 por orden de Carlos III, alberga más de 3.000 especies tropicales y subtropicales. Entrada: 3 euros.</li>
<li><strong>Playa Jardín:</strong> playa de arena volcánica negra rodeada de jardines tropicales diseñados también por Manrique. Acceso gratuito.</li>
<li><strong>Casco histórico:</strong> calles empedradas, balcones canarios de madera y plazas como la del Charco, corazón social de la ciudad.</li>
<li><strong>Loro Parque:</strong> uno de los zoológicos más reconocidos de Europa, con espectáculos de orcas, delfines y leones marinos. Desde 40 euros.</li>
</ul>

<h3>Gastronomía local</h3>
<p>El norte de Tenerife tiene una tradición gastronómica excepcional. No dejes de probar el <strong>pescado fresco</strong> en los restaurantes del puerto pesquero, las <strong>papas arrugadas con mojo</strong> en cualquier guachinche y los <strong>vinos del Valle de La Orotava</strong> en las bodegas cercanas. La calle San Felipe y los alrededores de la Plaza del Charco concentran los mejores restaurantes.</p>

<h3>Alojamiento y transporte</h3>
<p>Puerto de la Cruz ofrece hoteles de todas las categorías, desde apartamentos económicos hasta hoteles de lujo como el Botánico. La ciudad está conectada con Santa Cruz por la autopista TF-5 (unos 35 minutos) y con el sur por la TF-1 (aproximadamente 1 hora hasta Los Cristianos). Las guaguas municipales cubren toda la zona metropolitana.</p>

<h3>Excursiones desde Puerto de la Cruz</h3>
<ul>
<li><strong>La Orotava:</strong> a 10 minutos, uno de los pueblos más bonitos de Canarias</li>
<li><strong>Parque Nacional del Teide:</strong> a 45 minutos por carretera de montaña</li>
<li><strong>Icod de los Vinos:</strong> a 30 minutos, con el famoso Drago Milenario</li>
<li><strong>Bosque de laurisilva de Anaga:</strong> a 1 hora, senderismo entre bosque de niebla</li>
</ul>`,

      en: `<h2>Puerto de la Cruz: Complete Guide to Northern Tenerife</h2>
<p>Puerto de la Cruz is the jewel of northern Tenerife, a city with over 500 years of history that blends Canarian tradition with a first-class tourist offering. Unlike the south of the island, here you will find a more authentic atmosphere, lush vegetation and a landscape defined by the proximity of Mount Teide and the Orotava Valley.</p>

<h3>What to See in Puerto de la Cruz</h3>
<ul>
<li><strong>Lago Martiánez:</strong> a saltwater swimming pool complex designed by César Manrique. A unique spot for bathing with Atlantic views. Entry from 5.50 euros.</li>
<li><strong>Botanical Garden:</strong> founded in 1788 by order of King Carlos III, it houses over 3,000 tropical and subtropical species. Entry: 3 euros.</li>
<li><strong>Playa Jardín:</strong> a black volcanic sand beach surrounded by tropical gardens also designed by Manrique. Free access.</li>
<li><strong>Historic centre:</strong> cobbled streets, traditional wooden Canarian balconies and squares such as Plaza del Charco, the social heart of the city.</li>
<li><strong>Loro Parque:</strong> one of Europe's most renowned zoos, with orca, dolphin and sea lion shows. From 40 euros.</li>
</ul>

<h3>Local Gastronomy</h3>
<p>Northern Tenerife has an exceptional gastronomic tradition. Be sure to try the <strong>fresh fish</strong> at restaurants by the fishing port, <strong>papas arrugadas with mojo</strong> at any guachinche and <strong>wines from the Orotava Valley</strong> at nearby wineries. Calle San Felipe and the area around Plaza del Charco have the best restaurants.</p>

<h3>Accommodation and Transport</h3>
<p>Puerto de la Cruz offers hotels of all categories, from budget apartments to luxury hotels like the Botánico. The city is connected to Santa Cruz via the TF-5 motorway (about 35 minutes) and to the south via the TF-1 (approximately 1 hour to Los Cristianos). Local buses cover the entire metropolitan area.</p>

<h3>Day Trips from Puerto de la Cruz</h3>
<ul>
<li><strong>La Orotava:</strong> 10 minutes away, one of the prettiest towns in the Canary Islands</li>
<li><strong>Teide National Park:</strong> 45 minutes via mountain road</li>
<li><strong>Icod de los Vinos:</strong> 30 minutes away, home to the famous Millennial Dragon Tree</li>
<li><strong>Anaga laurel forest:</strong> 1 hour away, hiking through cloud forest</li>
</ul>`,
    },
    category_id: CAT.culture,
    tags: ['puerto-cruz', 'north'],
    image_url: 'https://images.unsplash.com/photo-1677503590969-1c16fd0a0981?w=1200&q=80',
  },

  // 2. Buceo en Tenerife: los mejores sitios
  {
    slug: 'buceo-tenerife-mejores-sitios',
    title: {
      es: 'Buceo en Tenerife: los mejores sitios',
      en: 'Diving in Tenerife: The Best Sites',
    },
    excerpt: {
      es: 'Descubre los mejores puntos de buceo de Tenerife: desde cuevas volcánicas hasta encuentros con tortugas y rayas. Guía para buceadores de todos los niveles.',
      en: 'Discover the best diving spots in Tenerife: from volcanic caves to encounters with turtles and rays. A guide for divers of all levels.',
    },
    content: {
      es: `<h2>Buceo en Tenerife: los mejores sitios para sumergirse</h2>
<p>Tenerife es uno de los destinos de buceo más atractivos de Europa gracias a sus aguas cristalinas, temperaturas agradables durante todo el año (entre 18 y 25 grados) y una biodiversidad marina sorprendente. Las formaciones volcánicas submarinas crean paisajes únicos con cuevas, arcos y paredes que fascinan a buceadores de todos los niveles.</p>

<h3>Los mejores puntos de buceo</h3>
<ul>
<li><strong>Los Gigantes:</strong> inmersiones junto a los acantilados de 600 metros con paredes volcánicas impresionantes. Se pueden ver rayas, tortugas y grandes bancos de peces. Profundidad: 12-40 metros.</li>
<li><strong>Radazul:</strong> en la costa este, ideal para principiantes. Aguas tranquilas con tortugas verdes, pulpos y morenas. Profundidad: 5-20 metros.</li>
<li><strong>El Porís de Abona:</strong> cuevas y túneles volcánicos con excelente visibilidad. Para buceadores con experiencia. Profundidad: 15-30 metros.</li>
<li><strong>Playa de Las Galletas:</strong> acceso fácil desde la orilla, perfecto para bautizos de buceo. Tortugas prácticamente garantizadas.</li>
<li><strong>Abades:</strong> antiguo lazareto con fondos variados y abundante vida marina. Uno de los favoritos de los locales.</li>
</ul>

<h3>Qué verás bajo el agua</h3>
<p>Las aguas de Tenerife albergan una fauna impresionante. Podrás encontrar <strong>tortugas verdes y boba</strong> en casi todas las inmersiones, <strong>rayas mariposa y águila</strong> en zonas arenosas, <strong>pulpos, morenas y barracudas</strong> entre las rocas, y con suerte, <strong>mantas raya y angelotes</strong> en inmersiones más profundas. De noviembre a marzo es posible escuchar el canto de las ballenas bajo el agua.</p>

<h3>Centros de buceo recomendados</h3>
<ul>
<li>Los centros de buceo certificados PADI y SSI operan por toda la isla</li>
<li>Un bautizo de buceo cuesta entre 50 y 70 euros (incluye equipo completo)</li>
<li>Inmersiones para certificados desde 35 euros con equipo</li>
<li>Cursos Open Water PADI desde 350 euros (3-4 días)</li>
</ul>

<h3>Consejos prácticos</h3>
<ul>
<li>La mejor visibilidad se da en verano (hasta 30 metros)</li>
<li>No necesitas traje seco: un traje de 5 mm es suficiente todo el año</li>
<li>Reserva con antelación en temporada alta (julio-septiembre)</li>
<li>Si buceas por libre, respeta las zonas protegidas y no toques la fauna</li>
</ul>`,

      en: `<h2>Diving in Tenerife: The Best Sites to Explore</h2>
<p>Tenerife is one of Europe's most attractive diving destinations thanks to its crystal-clear waters, pleasant year-round temperatures (between 18 and 25 degrees) and surprising marine biodiversity. Underwater volcanic formations create unique landscapes with caves, arches and walls that fascinate divers of all levels.</p>

<h3>The Best Dive Sites</h3>
<ul>
<li><strong>Los Gigantes:</strong> dives alongside 600-metre cliffs with impressive volcanic walls. You can spot rays, turtles and large schools of fish. Depth: 12-40 metres.</li>
<li><strong>Radazul:</strong> on the east coast, ideal for beginners. Calm waters with green turtles, octopuses and moray eels. Depth: 5-20 metres.</li>
<li><strong>El Porís de Abona:</strong> volcanic caves and tunnels with excellent visibility. For experienced divers. Depth: 15-30 metres.</li>
<li><strong>Playa de Las Galletas:</strong> easy shore entry, perfect for introductory dives. Turtles are virtually guaranteed.</li>
<li><strong>Abades:</strong> former lazaret with varied seabeds and abundant marine life. A local favourite.</li>
</ul>

<h3>What You Will See Underwater</h3>
<p>Tenerife's waters harbour impressive wildlife. You can expect to find <strong>green and loggerhead turtles</strong> on almost every dive, <strong>butterfly and eagle rays</strong> over sandy areas, <strong>octopuses, moray eels and barracudas</strong> among the rocks, and with luck, <strong>manta rays and angel sharks</strong> on deeper dives. From November to March it is possible to hear whale song underwater.</p>

<h3>Recommended Dive Centres</h3>
<ul>
<li>PADI and SSI certified dive centres operate across the island</li>
<li>A discovery dive costs between 50 and 70 euros (full equipment included)</li>
<li>Dives for certified divers from 35 euros with equipment</li>
<li>PADI Open Water courses from 350 euros (3-4 days)</li>
</ul>

<h3>Practical Tips</h3>
<ul>
<li>Best visibility is in summer (up to 30 metres)</li>
<li>No dry suit needed — a 5 mm wetsuit is sufficient year-round</li>
<li>Book ahead during high season (July-September)</li>
<li>If diving independently, respect protected areas and do not touch wildlife</li>
</ul>`,
    },
    category_id: CAT.experiences,
    tags: ['diving', 'water-sports'],
    image_url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80',
  },

  // 3. Tenerife en pareja: planes románticos
  {
    slug: 'tenerife-pareja-romantico',
    title: {
      es: 'Tenerife en pareja: planes románticos',
      en: 'Tenerife for Couples: Romantic Plans',
    },
    excerpt: {
      es: 'Descubre los planes más románticos para disfrutar de Tenerife en pareja: cenas con vistas, atardeceres, spas y excursiones para enamorados.',
      en: 'Discover the most romantic plans to enjoy Tenerife as a couple: dinners with views, sunsets, spas and excursions for lovers.',
    },
    content: {
      es: `<h2>Tenerife en pareja: los planes más románticos de la isla</h2>
<p>Tenerife es un destino perfecto para parejas que buscan experiencias románticas. La combinación de paisajes volcánicos, playas paradisíacas, atardeceres espectaculares y una gastronomía exquisita convierte a la isla en un escenario ideal para lunas de miel, aniversarios o simplemente una escapada a dos.</p>

<h3>Atardeceres para recordar</h3>
<ul>
<li><strong>Mirador de Masca:</strong> contempla la puesta de sol sobre los acantilados más impresionantes de la isla. Un espectáculo de colores que cambia cada día.</li>
<li><strong>Faro de Teno:</strong> el punto más occidental de Tenerife, donde el sol se hunde directamente en el Atlántico. Llega con tiempo para aparcar.</li>
<li><strong>Playa de La Tejita:</strong> arena dorada y vistas a la Montaña Roja mientras el sol desaparece. Ambiente tranquilo y natural.</li>
<li><strong>Teleférico del Teide al atardecer:</strong> experiencia exclusiva con cena y observación de estrellas posterior. Desde 72 euros por persona.</li>
</ul>

<h3>Experiencias gastronómicas en pareja</h3>
<p>Los restaurantes de Tenerife ofrecen propuestas ideales para una cena romántica. <strong>El Rincón de Juan Carlos</strong> (estrella Michelin) en Los Gigantes ofrece una experiencia gastronómica de autor. <strong>Bodega Monje</strong> en El Sauzal permite cenar entre viñedos con vistas al mar. Para algo más informal, una ruta de tapas por <strong>La Laguna</strong> al atardecer tiene un encanto especial.</p>

<h3>Spa y bienestar para dos</h3>
<ul>
<li><strong>Circuitos termales en hoteles del sur:</strong> muchos hoteles de cinco estrellas abren sus spas a no alojados. Desde 40 euros por persona.</li>
<li><strong>Masajes en pareja:</strong> disponibles en centros de bienestar por toda la isla, con productos locales como aloe vera y sal volcánica.</li>
<li><strong>Yoga al amanecer:</strong> sesiones en la playa o en terrazas de hoteles, ideal para empezar el día juntos.</li>
</ul>

<h3>Excursiones románticas</h3>
<ul>
<li><strong>Paseo en catamarán:</strong> navegación por la costa sur con avistamiento de cetáceos, incluida comida y barra libre. Desde 60 euros.</li>
<li><strong>Kayak al atardecer:</strong> recorre la costa de Los Gigantes en kayak doble mientras el sol se pone. Desde 35 euros por persona.</li>
<li><strong>Paseo a caballo por el Teide:</strong> rutas guiadas a caballo por paisajes volcánicos lunares. Desde 50 euros.</li>
<li><strong>Vuelo en parapente biplaza:</strong> sobrevuela los acantilados del sur con vistas que quitan el aliento. Desde 80 euros.</li>
</ul>`,

      en: `<h2>Tenerife for Couples: The Most Romantic Plans on the Island</h2>
<p>Tenerife is a perfect destination for couples seeking romantic experiences. The combination of volcanic landscapes, idyllic beaches, spectacular sunsets and exquisite gastronomy makes the island an ideal setting for honeymoons, anniversaries or simply a getaway for two.</p>

<h3>Sunsets to Remember</h3>
<ul>
<li><strong>Masca Viewpoint:</strong> watch the sunset over the most impressive cliffs on the island. A colour spectacle that changes every day.</li>
<li><strong>Teno Lighthouse:</strong> the westernmost point of Tenerife, where the sun sinks directly into the Atlantic. Arrive early to find parking.</li>
<li><strong>Playa de La Tejita:</strong> golden sand and views of Montaña Roja as the sun disappears. A calm and natural setting.</li>
<li><strong>Teide Cable Car at sunset:</strong> an exclusive experience with dinner and stargazing afterwards. From 72 euros per person.</li>
</ul>

<h3>Gastronomic Experiences for Two</h3>
<p>Tenerife's restaurants offer ideal settings for a romantic dinner. <strong>El Rincón de Juan Carlos</strong> (Michelin star) in Los Gigantes delivers an author gastronomy experience. <strong>Bodega Monje</strong> in El Sauzal lets you dine among vineyards with sea views. For something more relaxed, a tapas trail through <strong>La Laguna</strong> at dusk has a special charm.</p>

<h3>Spa and Wellness for Two</h3>
<ul>
<li><strong>Thermal circuits at southern hotels:</strong> many five-star hotels open their spas to non-guests. From 40 euros per person.</li>
<li><strong>Couples massage:</strong> available at wellness centres across the island, using local products such as aloe vera and volcanic salt.</li>
<li><strong>Sunrise yoga:</strong> beach or hotel terrace sessions, ideal for starting the day together.</li>
</ul>

<h3>Romantic Excursions</h3>
<ul>
<li><strong>Catamaran cruise:</strong> sail along the south coast with whale watching, including lunch and open bar. From 60 euros.</li>
<li><strong>Sunset kayaking:</strong> paddle along the Los Gigantes coast in a double kayak as the sun sets. From 35 euros per person.</li>
<li><strong>Horseback riding on Teide:</strong> guided routes on horseback through lunar volcanic landscapes. From 50 euros.</li>
<li><strong>Tandem paragliding:</strong> soar above the southern cliffs with breathtaking views. From 80 euros.</li>
</ul>`,
    },
    category_id: CAT.wellness,
    tags: ['couples', 'romantic'],
    image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
  },

  // 4. Fiestas patronales de Tenerife
  {
    slug: 'fiestas-patronales-tenerife',
    title: {
      es: 'Fiestas patronales de Tenerife: calendario completo',
      en: 'Tenerife Patron Saint Festivals: Complete Calendar',
    },
    excerpt: {
      es: 'Calendario completo de las fiestas patronales de Tenerife: romerías, verbenas, procesiones y tradiciones únicas de cada municipio canario.',
      en: 'Complete calendar of Tenerife patron saint festivals: pilgrimages, fairs, processions and unique traditions from each Canarian municipality.',
    },
    content: {
      es: `<h2>Fiestas patronales de Tenerife: calendario y tradiciones</h2>
<p>Las fiestas patronales son el corazón cultural de Tenerife. Cada uno de los 31 municipios de la isla celebra a su patrón o patrona con romerías, verbenas, procesiones religiosas y eventos populares que reflejan siglos de tradición canaria. Participar en una fiesta patronal es una de las mejores formas de conocer la cultura auténtica de la isla.</p>

<h3>Las fiestas más importantes</h3>
<ul>
<li><strong>Fiestas del Cristo de La Laguna (septiembre):</strong> las más antiguas y solemnes de Tenerife. Procesiones multitudinarias con el Santísimo Cristo, declaradas de Interés Turístico Nacional. La ciudad se llena de alfombras de flores y actos culturales.</li>
<li><strong>Romería de San Roque en Garachico (agosto):</strong> una de las romerías más bonitas, con carros engalanados, trajes típicos y gastronomía tradicional servida por todo el pueblo.</li>
<li><strong>Fiestas de la Cruz en Los Realejos (mayo):</strong> espectáculo pirotécnico que enfrenta a dos barrios en una batalla de fuegos artificiales. Declarada de Interés Turístico Nacional.</li>
<li><strong>Bajada de la Virgen de Candelaria (agosto):</strong> peregrinación a la basílica de Candelaria desde todos los puntos de la isla. Miles de personas caminan de noche hasta el santuario.</li>
</ul>

<h3>Calendario por meses</h3>
<ul>
<li><strong>Enero-febrero:</strong> fiestas de San Sebastián en Adeje y San Blas en diversos pueblos</li>
<li><strong>Marzo-abril:</strong> Semana Santa con procesiones en La Laguna y La Orotava</li>
<li><strong>Mayo-junio:</strong> Cruces de Mayo, Corpus Christi en La Orotava con sus famosas alfombras de arena volcánica</li>
<li><strong>Julio:</strong> fiestas del Carmen en los pueblos costeros, con procesiones marítimas</li>
<li><strong>Agosto:</strong> el mes grande de las fiestas con Candelaria, San Roque y muchas más</li>
<li><strong>Septiembre:</strong> Cristo de La Laguna y fiestas de la vendimia</li>
<li><strong>Noviembre-diciembre:</strong> San Andrés con la tradición de los cacharros en Icod y Puerto de la Cruz</li>
</ul>

<h3>Tradiciones que no te puedes perder</h3>
<ul>
<li><strong>Romerías:</strong> procesiones festivas con carros de bueyes, trajes típicos, folclore y comida gratis</li>
<li><strong>Alfombras de flores:</strong> obras de arte efímeras creadas en las calles para las procesiones</li>
<li><strong>Arrastre de cacharros:</strong> tradición de San Andrés donde se deslizan por las cuestas sobre tablas</li>
<li><strong>Libreas:</strong> representaciones teatrales populares en honor al patrón del pueblo</li>
</ul>`,

      en: `<h2>Tenerife Patron Saint Festivals: Calendar and Traditions</h2>
<p>Patron saint festivals are the cultural heart of Tenerife. Each of the island's 31 municipalities celebrates its patron saint with pilgrimages, fairs, religious processions and popular events that reflect centuries of Canarian tradition. Attending a patron saint festival is one of the best ways to experience the authentic culture of the island.</p>

<h3>The Most Important Festivals</h3>
<ul>
<li><strong>Fiestas del Cristo de La Laguna (September):</strong> the oldest and most solemn on Tenerife. Massive processions with the Holy Christ, declared a Festival of National Tourist Interest. The city fills with flower carpets and cultural events.</li>
<li><strong>Romería de San Roque in Garachico (August):</strong> one of the most beautiful pilgrimages, with decorated carts, traditional costumes and local food served throughout the town.</li>
<li><strong>Fiestas de la Cruz in Los Realejos (May):</strong> a pyrotechnic spectacle where two neighbourhoods compete in a fireworks battle. Declared a Festival of National Tourist Interest.</li>
<li><strong>Bajada de la Virgen de Candelaria (August):</strong> pilgrimage to the Candelaria basilica from all corners of the island. Thousands of people walk through the night to the sanctuary.</li>
</ul>

<h3>Calendar by Month</h3>
<ul>
<li><strong>January-February:</strong> fiestas of San Sebastián in Adeje and San Blas in various towns</li>
<li><strong>March-April:</strong> Holy Week with processions in La Laguna and La Orotava</li>
<li><strong>May-June:</strong> May Crosses, Corpus Christi in La Orotava with its famous volcanic sand carpets</li>
<li><strong>July:</strong> Carmen festivals in coastal towns, with maritime processions</li>
<li><strong>August:</strong> the biggest month for festivals with Candelaria, San Roque and many more</li>
<li><strong>September:</strong> Cristo de La Laguna and harvest festivals</li>
<li><strong>November-December:</strong> San Andrés with the cacharros sliding tradition in Icod and Puerto de la Cruz</li>
</ul>

<h3>Traditions You Cannot Miss</h3>
<ul>
<li><strong>Romerías:</strong> festive processions with ox carts, traditional dress, folklore and free food</li>
<li><strong>Flower carpets:</strong> ephemeral works of art created on streets for processions</li>
<li><strong>Cacharros dragging:</strong> San Andrés tradition of sliding down hills on wooden boards</li>
<li><strong>Libreas:</strong> popular theatrical performances in honour of the village patron</li>
</ul>`,
    },
    category_id: CAT.culture,
    tags: ['fiestas', 'traditions'],
    image_url: 'https://images.unsplash.com/photo-1656252779225-5bbd338acd14?w=1200&q=80',
  },

  // 5. Presupuesto real para Tenerife
  {
    slug: 'presupuesto-tenerife-cuanto-cuesta',
    title: {
      es: '¿Cuánto cuesta un viaje a Tenerife? Presupuesto real',
      en: 'How Much Does a Tenerife Trip Cost? Real Budget',
    },
    excerpt: {
      es: 'Presupuesto detallado para un viaje a Tenerife: vuelos, alojamiento, comidas, transporte y actividades. Cuánto cuesta realmente viajar a la isla.',
      en: 'Detailed budget for a trip to Tenerife: flights, accommodation, meals, transport and activities. How much it really costs to travel to the island.',
    },
    content: {
      es: `<h2>¿Cuánto cuesta un viaje a Tenerife? Presupuesto real actualizado</h2>
<p>Tenerife es un destino sorprendentemente asequible comparado con otros destinos vacacionales europeos. Sin embargo, el presupuesto puede variar mucho según tu estilo de viaje. Aquí te ofrecemos un desglose realista de costes para que puedas planificar tu escapada sin sorpresas.</p>

<h3>Vuelos</h3>
<p>Los vuelos a Tenerife desde ciudades europeas son bastante competitivos gracias a la alta oferta de aerolíneas low cost. Desde la península española puedes encontrar billetes de ida y vuelta desde <strong>40 a 150 euros</strong> con Ryanair, Vueling o Binter. Desde otras capitales europeas (Londres, Berlín, Ámsterdam) los precios oscilan entre <strong>80 y 250 euros</strong> ida y vuelta. Reservar con 2-3 meses de antelación suele ofrecer los mejores precios.</p>

<h3>Alojamiento (por noche para dos personas)</h3>
<ul>
<li><strong>Presupuesto bajo:</strong> hostales y apartamentos sencillos desde 35-50 euros la noche</li>
<li><strong>Presupuesto medio:</strong> hoteles 3 estrellas y apartamentos turísticos desde 60-90 euros</li>
<li><strong>Presupuesto alto:</strong> hoteles 4-5 estrellas y villas privadas desde 120-300 euros</li>
<li><strong>Consejo:</strong> el norte es generalmente más económico que el sur de la isla</li>
</ul>

<h3>Comida y bebida (por persona y día)</h3>
<ul>
<li><strong>Económico:</strong> 15-25 euros al día comiendo en guachinches y bares locales</li>
<li><strong>Medio:</strong> 30-50 euros con restaurantes y alguna experiencia gastronómica</li>
<li><strong>Alto:</strong> 60-100 euros en restaurantes premium y cenas especiales</li>
<li><strong>Dato:</strong> un menú del día completo cuesta entre 8 y 15 euros, y una caña de cerveza entre 1,50 y 2,50 euros</li>
</ul>

<h3>Transporte</h3>
<p>El <strong>alquiler de coche</strong> es la opción más práctica y cuesta entre 20 y 40 euros al día (seguro incluido). La gasolina es más barata que en la península. Las <strong>guaguas</strong> (autobuses) cubren toda la isla con precios entre 1,50 y 10 euros por trayecto. El <strong>tranvía</strong> entre Santa Cruz y La Laguna cuesta 1,35 euros.</p>

<h3>Presupuesto total estimado (7 días, 2 personas)</h3>
<ul>
<li><strong>Viaje económico:</strong> 700-1.000 euros (vuelos + alojamiento básico + comida local)</li>
<li><strong>Viaje medio:</strong> 1.200-1.800 euros (vuelos + hotel 3* + restaurantes + coche + actividades)</li>
<li><strong>Viaje premium:</strong> 2.500-4.000 euros (vuelos + hotel 4-5* + experiencias exclusivas + coche)</li>
</ul>`,

      en: `<h2>How Much Does a Tenerife Trip Cost? Updated Real Budget</h2>
<p>Tenerife is a surprisingly affordable destination compared to other European holiday spots. However, budgets can vary greatly depending on your travel style. Here is a realistic cost breakdown so you can plan your getaway without surprises.</p>

<h3>Flights</h3>
<p>Flights to Tenerife from European cities are quite competitive thanks to a wide range of low-cost airlines. From mainland Spain you can find return tickets from <strong>40 to 150 euros</strong> with Ryanair, Vueling or Binter. From other European capitals (London, Berlin, Amsterdam) prices range from <strong>80 to 250 euros</strong> return. Booking 2-3 months ahead usually gets the best prices.</p>

<h3>Accommodation (per night for two people)</h3>
<ul>
<li><strong>Low budget:</strong> hostels and simple apartments from 35-50 euros per night</li>
<li><strong>Mid-range:</strong> 3-star hotels and holiday apartments from 60-90 euros</li>
<li><strong>High-end:</strong> 4-5 star hotels and private villas from 120-300 euros</li>
<li><strong>Tip:</strong> the north is generally cheaper than the south of the island</li>
</ul>

<h3>Food and Drink (per person per day)</h3>
<ul>
<li><strong>Budget:</strong> 15-25 euros per day eating at guachinches and local bars</li>
<li><strong>Mid-range:</strong> 30-50 euros with restaurants and some gastronomic experiences</li>
<li><strong>High-end:</strong> 60-100 euros at premium restaurants and special dinners</li>
<li><strong>Fact:</strong> a full set lunch costs between 8 and 15 euros, and a small beer between 1.50 and 2.50 euros</li>
</ul>

<h3>Transport</h3>
<p><strong>Car rental</strong> is the most practical option and costs between 20 and 40 euros per day (insurance included). Petrol is cheaper than on the mainland. <strong>Guaguas</strong> (buses) cover the entire island with fares between 1.50 and 10 euros per journey. The <strong>tram</strong> between Santa Cruz and La Laguna costs 1.35 euros.</p>

<h3>Estimated Total Budget (7 days, 2 people)</h3>
<ul>
<li><strong>Budget trip:</strong> 700-1,000 euros (flights + basic accommodation + local food)</li>
<li><strong>Mid-range trip:</strong> 1,200-1,800 euros (flights + 3* hotel + restaurants + car + activities)</li>
<li><strong>Premium trip:</strong> 2,500-4,000 euros (flights + 4-5* hotel + exclusive experiences + car)</li>
</ul>`,
    },
    category_id: CAT.experiences,
    tags: ['budget', 'planning'],
    image_url: 'https://images.unsplash.com/photo-1449965408869-ebd13bc9e5d8?w=1200&q=80',
  },
];

async function main() {
  console.log('Inserting batch 4a: 5 blog articles...\n');

  for (const article of articles) {
    const row = {
      slug: article.slug,
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      category_id: article.category_id,
      tags: article.tags,
      image: article.image_url,
      published: true,
      ai_generated: true,
      published_at: new Date().toISOString(),
      author: 'Tenerife Experiences',
    };

    const { data, error } = await supabase
      .from('articles')
      .upsert(row, { onConflict: 'slug' })
      .select('id, slug');

    if (error) {
      console.error(`ERROR [${article.slug}]:`, error.message);
    } else {
      console.log(`OK [${article.slug}]`, data);
    }
  }

  console.log('\nBatch 4a done!');
}

main();
