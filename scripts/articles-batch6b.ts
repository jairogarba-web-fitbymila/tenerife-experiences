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
  food: 'df3caffa-ef68-4b50-93f7-1a9edf1ae8ea',
  beaches: 'ffb0cb8c-4606-4abd-911e-c5d1dc05b88e',
};

const articles = [
  // 16. Fotografía en Tenerife
  {
    slug: 'fotografia-tenerife-mejores-spots',
    title: {
      es: 'Fotografía en Tenerife: los spots más instagrameables',
      en: 'Photography in Tenerife: Most Instagrammable Spots',
    },
    excerpt: {
      es: 'Los mejores spots de fotografía en Tenerife: miradores, paisajes volcánicos, pueblos con encanto y rincones secretos para fotos espectaculares.',
      en: 'The best photography spots in Tenerife: viewpoints, volcanic landscapes, charming villages and secret corners for spectacular photos.',
    },
    content: {
      es: `<h2>Fotografía en Tenerife: los spots más instagrameables</h2>
<p>Tenerife es un paraíso fotográfico. La diversidad de paisajes concentrada en una isla de apenas 2.000 kilómetros cuadrados ofrece oportunidades únicas para la fotografía: desde paisajes lunares volcánicos hasta bosques envueltos en niebla, pasando por acantilados vertiginosos y atardeceres atlánticos. Aquí tienes los spots que no puedes perderte con tu cámara.</p>

<h3>Paisajes volcánicos</h3>
<ul>
<li><strong>Roques de García (Teide):</strong> las formaciones rocosas más icónicas de Canarias. La hora dorada al amanecer o atardecer crea sombras dramáticas. El Roque Cinchado con el Teide detrás es la foto clásica.</li>
<li><strong>Paisaje Lunar (Vilaflor):</strong> formaciones de roca erosionada que parecen de otro planeta. La luz de la mañana crea texturas espectaculares. Acceso por ruta de senderismo de 3 km.</li>
<li><strong>Minas de San José:</strong> llanura volcánica con colores ocres y el Teide como telón de fondo. Perfecta para fotografía minimalista.</li>
</ul>

<h3>Costa y acantilados</h3>
<ul>
<li><strong>Acantilados de Los Gigantes:</strong> paredes verticales de 600 metros cayendo al mar. Mejor desde un barco o kayak para captar su escala. La luz del atardecer los tiñe de naranja.</li>
<li><strong>Faro de Teno:</strong> el faro en el extremo oeste con La Gomera de fondo. Atardeceres espectaculares con el sol hundíendose en el océano.</li>
<li><strong>Playa de Benijo:</strong> los roques emergiendo del mar con el oleaje atlántico. Una de las playas más fotogénicas de Canarias.</li>
</ul>

<h3>Pueblos y arquitectura</h3>
<ul>
<li><strong>La Laguna:</strong> calles coloniales con fachadas de colores y balcones de madera. La luz matutina es la más favorable.</li>
<li><strong>Masca:</strong> el pueblo de montaña más fotogénico de Tenerife, rodeado de picos y barrancos.</li>
<li><strong>Garachico:</strong> las piscinas naturales de lava con el pueblo histórico de fondo.</li>
</ul>

<h3>Naturaleza y bosques</h3>
<ul>
<li><strong>Bosque de Anaga:</strong> árboles cubiertos de musgo y helechos gigantes envueltos en niebla. Perfecto para fotografía atmosférica.</li>
<li><strong>Drago Milenario (Icod):</strong> el árbol dragón más famoso del mundo. Mejor a primera hora antes de las multitudes.</li>
</ul>

<h3>Consejos fotográficos</h3>
<ul>
<li>El amanecer y el atardecer son las mejores horas en toda la isla</li>
<li>Lleva trípode para exposiciones largas en los acantilados y playas</li>
<li>Un filtro polarizador mejora enormemente los cielos y el agua</li>
<li>Para astrofotografía, el Teide es uno de los mejores cielos del mundo</li>
</ul>`,

      en: `<h2>Photography in Tenerife: The Most Instagrammable Spots</h2>
<p>Tenerife is a photographer's paradise. The diversity of landscapes packed into an island of just 2,000 square kilometres offers unique photographic opportunities: from lunar volcanic scenery to mist-wrapped forests, vertiginous cliffs and Atlantic sunsets. Here are the spots you can't miss with your camera.</p>

<h3>Volcanic Landscapes</h3>
<ul>
<li><strong>Roques de García (Teide):</strong> the most iconic rock formations in the Canaries. The golden hour at sunrise or sunset creates dramatic shadows. Roque Cinchado with Teide behind is the classic shot.</li>
<li><strong>Lunar Landscape (Vilaflor):</strong> eroded rock formations that look like another planet. Morning light creates spectacular textures. Access via a 3 km hiking trail.</li>
<li><strong>Minas de San José:</strong> a volcanic plain with ochre colours and Teide as a backdrop. Perfect for minimalist photography.</li>
</ul>

<h3>Coast and Cliffs</h3>
<ul>
<li><strong>Los Gigantes Cliffs:</strong> 600-metre vertical walls plunging into the sea. Best from a boat or kayak to capture their scale. Sunset light turns them orange.</li>
<li><strong>Teno Lighthouse:</strong> the lighthouse at the western tip with La Gomera in the background. Spectacular sunsets with the sun sinking into the ocean.</li>
<li><strong>Playa de Benijo:</strong> sea stacks rising from the water with the Atlantic swell. One of the most photogenic beaches in the Canaries.</li>
</ul>

<h3>Villages and Architecture</h3>
<ul>
<li><strong>La Laguna:</strong> colonial streets with colourful facades and wooden balconies. Morning light is most flattering.</li>
<li><strong>Masca:</strong> Tenerife's most photogenic mountain village, surrounded by peaks and ravines.</li>
<li><strong>Garachico:</strong> the natural lava pools with the historic town in the background.</li>
</ul>

<h3>Nature and Forests</h3>
<ul>
<li><strong>Anaga Forest:</strong> moss-covered trees and giant ferns wrapped in mist. Perfect for atmospheric photography.</li>
<li><strong>Millennial Dragon Tree (Icod):</strong> the world's most famous dragon tree. Best first thing in the morning before the crowds.</li>
</ul>

<h3>Photography Tips</h3>
<ul>
<li>Sunrise and sunset are the best times across the entire island</li>
<li>Bring a tripod for long exposures at cliffs and beaches</li>
<li>A polarising filter hugely improves skies and water</li>
<li>For astrophotography, Teide has one of the best skies in the world</li>
</ul>`,
    },
    category_id: CAT.nature,
    tags: ['photography', 'instagram', 'spots'],
    image_url: 'https://images.unsplash.com/photo-1506368387824-6cf9848c1638?w=1200&q=80',
  },

  // 17. Romerías en Tenerife
  {
    slug: 'romerias-tenerife-tradicion',
    title: {
      es: 'Romerías en Tenerife: tradición y fiesta canaria',
      en: 'Pilgrimages in Tenerife: Canarian Tradition and Celebration',
    },
    excerpt: {
      es: 'Descubre las romerías más importantes de Tenerife: tradición, trajes típicos, carros engalanados, comida canaria y música folclórica.',
      en: 'Discover the most important romerías in Tenerife: tradition, typical costumes, decorated carts, Canarian food and folk music.',
    },
    content: {
      es: `<h2>Romerías en Tenerife: tradición y fiesta canaria</h2>
<p>Las romerías son una de las expresiones culturales más auténticas de Tenerife. Estas fiestas populares de origen religioso se han convertido en celebraciones que reúnen a miles de personas vestidas con trajes típicos canarios, acompañadas de carros tirados por bueyes, música folclórica y abundante comida y bebida. Cada pueblo tiene su propia romería, y algunas son verdaderos espectáculos.</p>

<h3>Las romerías más importantes</h3>
<ul>
<li><strong>Romería de San Benito (La Laguna):</strong> la más grande y famosa de Tenerife. Se celebra en julio con miles de romeros recorriendo las calles del casco histórico. Carros engalanados con flores y productos del campo. Ambiente festivo con parrandas y folclore.</li>
<li><strong>Romería de San Isidro (La Orotava):</strong> en junio, coincide con las famosas alfombras de flores del Corpus Christi. Los romeros suben al casco histórico entre tapices florales y carretas tradicionales.</li>
<li><strong>Romería de San Roque (Garachico):</strong> en agosto, una de las más tradicionales. Recorre el casco histórico del antiguo puerto con danzas, música de parrandas y degustación de productos locales.</li>
<li><strong>Romería de San Marcos (Tegueste):</strong> en abril, destaca por el ganado decorado con flores y las carretas repletas de productos agrícolas. Ambiente rural y auténtico.</li>
</ul>

<h3>Tradiciones de la romería</h3>
<ul>
<li><strong>Trajes típicos:</strong> los romeros visten el traje canario tradicional con chaleco, faja, sombrero de paja y polainas. Las mujeres llevan falda, blusa blanca y mantilla.</li>
<li><strong>Carros y carretas:</strong> decorados con flores, frutas y productos del campo. Algunos llevan barriles de vino que se reparten entre los asistentes.</li>
<li><strong>Comida:</strong> papas arrugadas, queso asado, carne de fiesta, gofio amasado, vino del país y miel de palma. Todo se comparte generosamente.</li>
<li><strong>Música:</strong> parrandas con timples, guitarras, laúdes y chácaras. Canciones folclóricas canarias que animan la procesión.</li>
</ul>

<h3>Consejos para disfrutarlas</h3>
<ul>
<li>Consulta el calendario de romerías del Cabildo de Tenerife</li>
<li>Vístete cómodo y con calzado plano, se camina mucho</li>
<li>Las romerías son abiertas a todos, no necesitas invitación</li>
<li>Prueba todo lo que te ofrezcan: la generosidad canaria es legendaria</li>
</ul>`,

      en: `<h2>Pilgrimages in Tenerife: Canarian Tradition and Celebration</h2>
<p>Romerías are one of the most authentic cultural expressions in Tenerife. These popular festivals of religious origin have become celebrations that bring together thousands of people dressed in traditional Canarian costumes, accompanied by ox-drawn carts, folk music and abundant food and drink. Every village has its own romería, and some are true spectacles.</p>

<h3>The Most Important Romerías</h3>
<ul>
<li><strong>Romería de San Benito (La Laguna):</strong> the biggest and most famous in Tenerife. Held in July with thousands of pilgrims walking through the historic centre. Carts decorated with flowers and countryside produce. Festive atmosphere with parrandas and folklore.</li>
<li><strong>Romería de San Isidro (La Orotava):</strong> in June, it coincides with the famous Corpus Christi flower carpets. Pilgrims climb to the historic centre between floral tapestries and traditional carts.</li>
<li><strong>Romería de San Roque (Garachico):</strong> in August, one of the most traditional. It winds through the historic centre of the former port with dances, parranda music and tastings of local produce.</li>
<li><strong>Romería de San Marcos (Tegueste):</strong> in April, notable for livestock decorated with flowers and carts laden with agricultural produce. Rural and authentic atmosphere.</li>
</ul>

<h3>Romería Traditions</h3>
<ul>
<li><strong>Traditional costumes:</strong> pilgrims wear the traditional Canarian outfit with waistcoat, sash, straw hat and gaiters. Women wear a skirt, white blouse and mantilla.</li>
<li><strong>Carts and carriages:</strong> decorated with flowers, fruit and countryside produce. Some carry wine barrels that are shared among attendees.</li>
<li><strong>Food:</strong> papas arrugadas, grilled cheese, fiesta meat, kneaded gofio, local wine and palm honey. Everything is shared generously.</li>
<li><strong>Music:</strong> parrandas with timples, guitars, lutes and chácaras. Canarian folk songs that liven up the procession.</li>
</ul>

<h3>Tips for Enjoying Them</h3>
<ul>
<li>Check the romería calendar on the Tenerife Cabildo website</li>
<li>Dress comfortably with flat shoes — there's a lot of walking</li>
<li>Romerías are open to everyone — you don't need an invitation</li>
<li>Try everything you're offered — Canarian generosity is legendary</li>
</ul>`,
    },
    category_id: CAT.culture,
    tags: ['romerias', 'tradition', 'culture'],
    image_url: 'https://images.unsplash.com/photo-1656252779225-5bbd338acd14?w=1200&q=80',
  },

  // 18. Yoga y retiros en Tenerife
  {
    slug: 'yoga-retiros-tenerife',
    title: {
      es: 'Yoga y retiros en Tenerife: guía completa',
      en: 'Yoga Retreats in Tenerife: Complete Guide',
    },
    excerpt: {
      es: 'Guía de retiros de yoga en Tenerife: los mejores centros, estilos de yoga, precios y experiencias de bienestar en la isla.',
      en: 'Guide to yoga retreats in Tenerife: the best centres, yoga styles, prices and wellness experiences on the island.',
    },
    content: {
      es: `<h2>Yoga y retiros en Tenerife: guía completa</h2>
<p>Tenerife se ha convertido en uno de los destinos preferidos de Europa para retiros de yoga y bienestar. El clima primaveral durante todo el año, los paisajes naturales inspiradores y la energía especial de la isla volcánica atraen a practicantes de todo el mundo. Desde retiros intensivos de una semana hasta clases sueltas con vistas al océano, la oferta es amplia y variada.</p>

<h3>Mejores zonas para yoga</h3>
<ul>
<li><strong>Norte de Tenerife (Valle de La Orotava):</strong> fincas rurales rodeadas de naturaleza con vistas al Teide. Ambiente tranquilo y místico. Ideal para retiros inmersivos de varios días.</li>
<li><strong>Sur (Costa Adeje y El Médano):</strong> hoteles y estudios con sesiones de yoga al amanecer frente al mar. Combinación de práctica y vacaciones de playa.</li>
<li><strong>Anaga:</strong> retiros en plena naturaleza entre el bosque de laurisilva. Desconexión total y conexión con la tierra.</li>
<li><strong>Montaña (Vilaflor y zona del Teide):</strong> yoga a gran altitud con aire puro y cielos despejados. Experiencia energética única.</li>
</ul>

<h3>Tipos de retiros</h3>
<ul>
<li><strong>Retiro de fin de semana (2-3 días):</strong> perfecto para una primera experiencia. Incluye sesiones de yoga, meditación, alimentación saludable y excursión por la naturaleza. Desde 200-350 euros.</li>
<li><strong>Retiro de una semana (7 días):</strong> experiencia transformadora con dos sesiones diarias de yoga, talleres de meditación, alimentación vegana o vegetariana y actividades complementarias. Desde 600-1.200 euros.</li>
<li><strong>Formación de profesores (200h):</strong> varios centros ofrecen formaciones certificadas por Yoga Alliance en Tenerife. Duración: 3-4 semanas. Desde 2.500 euros.</li>
</ul>

<h3>Estilos de yoga disponibles</h3>
<p>Encontrarás <strong>Hatha</strong>, <strong>Vinyasa</strong>, <strong>Ashtanga</strong>, <strong>Yin Yoga</strong>, <strong>Kundalini</strong> y <strong>yoga restaurativo</strong>. Muchos retiros combinan varios estilos y añaden <strong>meditación mindfulness</strong>, <strong>pranayama</strong> y <strong>yoga nidra</strong>.</p>

<h3>Consejos para elegir retiro</h3>
<ul>
<li>Lee opiniones de otros participantes en plataformas como BookYogaRetreats</li>
<li>Comprueba la certificación de los profesores y el estilo que enseñan</li>
<li>Pregunta qué incluye el precio: alojamiento, comidas, excursiones</li>
<li>La primavera y el otoño son las mejores épocas: clima perfecto y precios moderados</li>
</ul>`,

      en: `<h2>Yoga Retreats in Tenerife: Complete Guide</h2>
<p>Tenerife has become one of Europe's favourite destinations for yoga and wellness retreats. The year-round spring-like climate, inspiring natural landscapes and the special energy of the volcanic island attract practitioners from around the world. From intensive week-long retreats to drop-in classes with ocean views, the options are wide and varied.</p>

<h3>Best Areas for Yoga</h3>
<ul>
<li><strong>North Tenerife (Orotava Valley):</strong> rural estates surrounded by nature with views of Teide. A tranquil, mystical atmosphere. Ideal for multi-day immersive retreats.</li>
<li><strong>South (Costa Adeje and El Médano):</strong> hotels and studios with sunrise yoga sessions facing the sea. A combination of practice and beach holiday.</li>
<li><strong>Anaga:</strong> retreats in the heart of nature among the laurel forest. Total disconnection and connection with the earth.</li>
<li><strong>Mountains (Vilaflor and Teide area):</strong> yoga at high altitude with pure air and clear skies. A unique energetic experience.</li>
</ul>

<h3>Types of Retreats</h3>
<ul>
<li><strong>Weekend retreat (2-3 days):</strong> perfect for a first experience. Includes yoga sessions, meditation, healthy food and a nature excursion. From 200-350 euros.</li>
<li><strong>One-week retreat (7 days):</strong> a transformative experience with two daily yoga sessions, meditation workshops, vegan or vegetarian meals and complementary activities. From 600-1,200 euros.</li>
<li><strong>Teacher training (200h):</strong> several centres offer Yoga Alliance certified training in Tenerife. Duration: 3-4 weeks. From 2,500 euros.</li>
</ul>

<h3>Yoga Styles Available</h3>
<p>You'll find <strong>Hatha</strong>, <strong>Vinyasa</strong>, <strong>Ashtanga</strong>, <strong>Yin Yoga</strong>, <strong>Kundalini</strong> and <strong>Restorative Yoga</strong>. Many retreats combine several styles and add <strong>mindfulness meditation</strong>, <strong>pranayama</strong> and <strong>yoga nidra</strong>.</p>

<h3>Tips for Choosing a Retreat</h3>
<ul>
<li>Read reviews from other participants on platforms like BookYogaRetreats</li>
<li>Check the teachers' certification and the style they teach</li>
<li>Ask what the price includes: accommodation, meals, excursions</li>
<li>Spring and autumn are the best times: perfect weather and moderate prices</li>
</ul>`,
    },
    category_id: CAT.wellness,
    tags: ['yoga', 'retreats', 'wellness'],
    image_url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80',
  },

  // 19. Tenerife gratis
  {
    slug: 'tenerife-free-things-gratis',
    title: {
      es: 'Tenerife gratis: 20 cosas que hacer sin gastar',
      en: 'Free Tenerife: 20 Things to Do Without Spending',
    },
    excerpt: {
      es: 'Las mejores actividades gratuitas en Tenerife: playas, senderismo, miradores, mercados, pueblos y experiencias que no cuestan nada.',
      en: 'The best free activities in Tenerife: beaches, hiking, viewpoints, markets, villages and experiences that cost nothing.',
    },
    content: {
      es: `<h2>Tenerife gratis: 20 cosas que hacer sin gastar</h2>
<p>Tenerife es un destino que se puede disfrutar enormemente sin gastar dinero. Muchas de las mejores experiencias de la isla son completamente gratuitas: desde playas espectaculares hasta rutas de senderismo por parques naturales, pasando por miradores de infarto y fiestas populares. Aquí tienes 20 planes que no te costarán ni un euro.</p>

<h3>Naturaleza y senderismo</h3>
<ol>
<li><strong>Subir al Parque Nacional del Teide:</strong> el acceso en coche es gratuito. Los senderos del parque no tienen coste y las vistas son impresionantes.</li>
<li><strong>Caminar por el bosque de Anaga:</strong> la laurisilva milenaria no tiene precio. El Sendero de los Sentidos es corto y mágico.</li>
<li><strong>Ruta de los Roques de García:</strong> la ruta circular más emblemática del Teide es libre y espectacular.</li>
<li><strong>Barranco de Masca:</strong> una de las rutas más famosas de Canarias (necesitas reserva online gratuita).</li>
<li><strong>Paisaje Lunar de Vilaflor:</strong> formaciones rocosas surrealistas en una ruta de senderismo sin coste.</li>
</ol>

<h3>Playas y piscinas naturales</h3>
<ol start="6">
<li><strong>Playa de las Teresitas:</strong> arena dorada y aguas cristalinas sin entrada ni tumbonas obligatorias.</li>
<li><strong>Playa de Benijo:</strong> playa salvaje con los roques más fotogénicos de Tenerife.</li>
<li><strong>Piscinas naturales de Garachico:</strong> bañarte en piscinas de lava volcánica con el pueblo de fondo.</li>
<li><strong>Playa de la Tejita:</strong> la playa natural más larga de Tenerife con la Montaña Roja.</li>
<li><strong>Charco de La Laja (San Juan de la Rambla):</strong> piscina natural escondida de aguas cristalinas.</li>
</ol>

<h3>Cultura y pueblos</h3>
<ol start="11">
<li><strong>Pasear por La Laguna:</strong> recorrer las calles Patrimonio de la Humanidad es gratuito y precioso.</li>
<li><strong>Visitar el Mercado de Nuestra Señora de África:</strong> mercado tradicional en Santa Cruz, solo mirar es un placer.</li>
<li><strong>Casco histórico de La Orotava:</strong> palacios, balcones y jardines sin coste de entrada.</li>
<li><strong>Pueblo de Garachico:</strong> historia y piscinas naturales sin gastar un céntimo.</li>
<li><strong>Callejear por el Puerto de la Cruz:</strong> el casco antiguo, el muelle y la plaza del Charco son puro encanto.</li>
</ol>

<h3>Miradores y experiencias</h3>
<ol start="16">
<li><strong>Mirador de Cherfe:</strong> una de las vistas más impactantes de Tenerife, gratuita.</li>
<li><strong>Atardecer desde Los Gigantes:</strong> el espectáculo natural del sol tras los acantilados.</li>
<li><strong>Observar estrellas en el Teide:</strong> uno de los mejores cielos del mundo, sin coste.</li>
<li><strong>Romerías y fiestas populares:</strong> las fiestas de los pueblos son abiertas y gratuitas.</li>
<li><strong>Street art en Puerto de la Cruz:</strong> murales y arte urbano repartidos por las calles del casco.</li>
</ol>`,

      en: `<h2>Free Tenerife: 20 Things to Do Without Spending</h2>
<p>Tenerife is a destination that can be enjoyed enormously without spending money. Many of the island's best experiences are completely free: from spectacular beaches to hiking trails through natural parks, jaw-dropping viewpoints and popular festivals. Here are 20 plans that won't cost you a single euro.</p>

<h3>Nature and Hiking</h3>
<ol>
<li><strong>Visit Teide National Park:</strong> car access is free. The park's trails have no charge and the views are breathtaking.</li>
<li><strong>Walk through Anaga forest:</strong> the ancient laurel woodland is priceless. The Sendero de los Sentidos is short and magical.</li>
<li><strong>Roques de García trail:</strong> the most emblematic circular route in Teide is free and spectacular.</li>
<li><strong>Masca Ravine:</strong> one of the most famous trails in the Canaries (free online booking required).</li>
<li><strong>Lunar Landscape of Vilaflor:</strong> surreal rock formations on a free hiking trail.</li>
</ol>

<h3>Beaches and Natural Pools</h3>
<ol start="6">
<li><strong>Playa de las Teresitas:</strong> golden sand and crystal-clear waters with no entry fee or obligatory sun loungers.</li>
<li><strong>Playa de Benijo:</strong> a wild beach with Tenerife's most photogenic sea stacks.</li>
<li><strong>Garachico natural pools:</strong> swim in volcanic lava pools with the town as a backdrop.</li>
<li><strong>Playa de la Tejita:</strong> Tenerife's longest natural beach with Montaña Roja.</li>
<li><strong>Charco de La Laja (San Juan de la Rambla):</strong> a hidden natural pool with crystal-clear water.</li>
</ol>

<h3>Culture and Villages</h3>
<ol start="11">
<li><strong>Stroll through La Laguna:</strong> exploring the World Heritage streets is free and beautiful.</li>
<li><strong>Visit the Mercado de Nuestra Señora de África:</strong> a traditional market in Santa Cruz — just browsing is a pleasure.</li>
<li><strong>La Orotava historic centre:</strong> palaces, balconies and gardens with no entry fee.</li>
<li><strong>Garachico village:</strong> history and natural pools without spending a penny.</li>
<li><strong>Wander around Puerto de la Cruz:</strong> the old town, the pier and Plaza del Charco are pure charm.</li>
</ol>

<h3>Viewpoints and Experiences</h3>
<ol start="16">
<li><strong>Mirador de Cherfe:</strong> one of Tenerife's most striking views, completely free.</li>
<li><strong>Sunset from Los Gigantes:</strong> nature's spectacle as the sun sets behind the cliffs.</li>
<li><strong>Stargazing at Teide:</strong> one of the world's best skies, at no cost.</li>
<li><strong>Romerías and popular festivals:</strong> village fiestas are open and free for all.</li>
<li><strong>Street art in Puerto de la Cruz:</strong> murals and urban art scattered through the old town streets.</li>
</ol>`,
    },
    category_id: CAT.experiences,
    tags: ['free', 'budget', 'tips'],
    image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
  },

  // 20. Dónde alojarse en Tenerife
  {
    slug: 'donde-alojarse-tenerife-zonas',
    title: {
      es: 'Dónde alojarse en Tenerife: guía por zonas',
      en: 'Where to Stay in Tenerife: Guide by Area',
    },
    excerpt: {
      es: 'Guía completa de las mejores zonas para alojarse en Tenerife según tu tipo de viaje: sur turístico, norte auténtico, montaña y ciudades.',
      en: 'Complete guide to the best areas to stay in Tenerife for your type of trip: tourist south, authentic north, mountains and cities.',
    },
    content: {
      es: `<h2>Dónde alojarse en Tenerife: guía por zonas</h2>
<p>Elegir dónde alojarse en Tenerife puede marcar la diferencia en tu experiencia de viaje. La isla ofrece ambientes muy distintos según la zona: el sur turístico con sol garantizado, el norte verde y auténtico, las ciudades con vida cultural y la montaña para los amantes de la naturaleza. Aquí te ayudamos a elegir según tu estilo de viaje.</p>

<h3>Sur de Tenerife: sol y playa</h3>
<ul>
<li><strong>Costa Adeje:</strong> la zona más exclusiva del sur. Hoteles de lujo, restaurantes gourmet y playas tranquilas. Ideal para parejas y viajeros que buscan calidad. Playa del Duque y La Caleta son las joyas de la zona.</li>
<li><strong>Playa de las Américas:</strong> el centro del turismo de masas con todo incluido, vida nocturna y ambiente animado. Ideal para jóvenes y viajes económicos. Cerca de Siam Park.</li>
<li><strong>Los Cristianos:</strong> antiguo pueblo pesquero reconvertido en zona turística. Más tranquilo que Las Américas, con puerto, mercados y ambiente familiar. Buena base para excursiones al sur.</li>
<li><strong>El Médano:</strong> paraíso del windsurf con ambiente bohemio y relajado. Playa natural, chiringuitos y precios más bajos. Perfecto para deportistas y viajeros alternativos.</li>
</ul>

<h3>Norte de Tenerife: naturaleza y autenticidad</h3>
<ul>
<li><strong>Puerto de la Cruz:</strong> la ciudad turística del norte con historia. Playa Jardín, Lago Martiánez, casco antiguo y acceso fácil a Anaga y el Teide. Ambiente más canario y cultural.</li>
<li><strong>La Orotava:</strong> villa histórica perfecta para alojarse en casas rurales y disfrutar de la arquitectura canaria. Base ideal para senderismo.</li>
<li><strong>Garachico:</strong> tranquilidad absoluta en un pueblo con encanto, piscinas naturales y excelentes restaurantes. Para desconectar de verdad.</li>
</ul>

<h3>Ciudades</h3>
<ul>
<li><strong>Santa Cruz:</strong> la capital con vida cultural, tiendas, restaurantes y el auditorio de Calatrava. Ideal si combinas playa con cultura urbana.</li>
<li><strong>La Laguna:</strong> ambiente universitario, bares, historia y buenas conexiones con el tranvía. Perfecta para viajeros culturales.</li>
</ul>

<h3>Montaña</h3>
<p>Las casas rurales en <strong>Vilaflor</strong>, <strong>Anaga</strong> y la <strong>corona forestal</strong> del Teide ofrecen paz total, cielos estrellados y contacto directo con la naturaleza. Ideal para senderistas y parejas que buscan romanticismo.</p>

<h3>Consejos generales</h3>
<ul>
<li>Si solo tienes 3-4 días, elige una zona y explora desde ahí</li>
<li>Para 7 días o más, combina 2 zonas: sur + norte</li>
<li>El sur es más caro que el norte en alojamiento</li>
<li>Reserva con antelación en Navidad, Carnaval y verano</li>
</ul>`,

      en: `<h2>Where to Stay in Tenerife: Guide by Area</h2>
<p>Choosing where to stay in Tenerife can make all the difference to your travel experience. The island offers very different atmospheres depending on the area: the sunny tourist south, the green and authentic north, cities with cultural life and the mountains for nature lovers. Here we help you choose according to your travel style.</p>

<h3>South Tenerife: Sun and Beach</h3>
<ul>
<li><strong>Costa Adeje:</strong> the most exclusive area in the south. Luxury hotels, gourmet restaurants and quiet beaches. Ideal for couples and travellers seeking quality. Playa del Duque and La Caleta are the area's gems.</li>
<li><strong>Playa de las Américas:</strong> the centre of mass tourism with all-inclusive options, nightlife and a lively atmosphere. Ideal for young travellers and budget trips. Close to Siam Park.</li>
<li><strong>Los Cristianos:</strong> a former fishing village turned tourist zone. Quieter than Las Américas, with a harbour, markets and a family atmosphere. A good base for southern excursions.</li>
<li><strong>El Médano:</strong> a windsurfing paradise with a bohemian, relaxed vibe. Natural beach, beach bars and lower prices. Perfect for sporty and alternative travellers.</li>
</ul>

<h3>North Tenerife: Nature and Authenticity</h3>
<ul>
<li><strong>Puerto de la Cruz:</strong> the north's historic tourist town. Playa Jardín, Lago Martiánez, old town and easy access to Anaga and Teide. A more Canarian and cultural atmosphere.</li>
<li><strong>La Orotava:</strong> a historic town perfect for staying in rural houses and enjoying Canarian architecture. An ideal hiking base.</li>
<li><strong>Garachico:</strong> absolute tranquillity in a charming village with natural pools and excellent restaurants. For truly switching off.</li>
</ul>

<h3>Cities</h3>
<ul>
<li><strong>Santa Cruz:</strong> the capital with cultural life, shops, restaurants and Calatrava's auditorium. Ideal if combining beach with urban culture.</li>
<li><strong>La Laguna:</strong> university atmosphere, bars, history and good tram connections. Perfect for cultural travellers.</li>
</ul>

<h3>Mountains</h3>
<p>Rural houses in <strong>Vilaflor</strong>, <strong>Anaga</strong> and the Teide <strong>corona forestal</strong> offer total peace, starry skies and direct contact with nature. Ideal for hikers and couples seeking romance.</p>

<h3>General Tips</h3>
<ul>
<li>If you only have 3-4 days, choose one area and explore from there</li>
<li>For 7 days or more, combine 2 areas: south + north</li>
<li>The south is more expensive than the north for accommodation</li>
<li>Book in advance for Christmas, Carnival and summer</li>
</ul>`,
    },
    category_id: CAT.experiences,
    tags: ['accommodation', 'zones', 'hotels'],
    image_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
  },
];

async function main() {
  console.log('Inserting batch 6b: 5 blog articles...\n');

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

  console.log('\nBatch 6b done!');
}

main();
