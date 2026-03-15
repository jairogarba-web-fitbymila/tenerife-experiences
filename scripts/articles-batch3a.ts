import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://sqesgghvaazyajzjkoap.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxZXNnZ2h2YWF6eWFqemprb2FwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzUxMzgwOSwiZXhwIjoyMDg5MDg5ODA5fQ.UvbRfWU9seJPT9lyCyLmpD4uZrP9jXzsNoeSAjT9HnI'
);

const CAT = {
  culture: '9f8f3805-9f17-4848-99f1-90f80f8cbf59',
  experiences: '4af61632-1baa-457e-990e-e2e71a27def8',
  shopping: 'babfa564-9060-4653-a4bd-55065416fe32',
  nature: '56eb6a9a-7360-48ec-a1a0-a7a74bef61b5',
  food: 'df3caffa-ef68-4b50-93f7-1a9edf1ae8ea',
};

const articles = [
  // 1. Carnaval de Tenerife 2026
  {
    slug: 'carnaval-tenerife-2026',
    title: {
      es: 'Carnaval de Tenerife 2026: fechas y programa',
      en: 'Tenerife Carnival 2026: Dates and Program',
    },
    excerpt: {
      es: 'Descubre todo sobre el Carnaval de Santa Cruz de Tenerife 2026: fechas, programa de eventos, cabalgata, elección de la reina y consejos para disfrutarlo al máximo.',
      en: 'Discover everything about the 2026 Santa Cruz de Tenerife Carnival: dates, event schedule, parade, queen election and tips to enjoy it to the fullest.',
    },
    content: {
      es: `<h2>Carnaval de Tenerife 2026: la fiesta más grande del Atlántico</h2>
<p>El Carnaval de Santa Cruz de Tenerife es el segundo más famoso del mundo tras el de Río de Janeiro y ha sido declarado Fiesta de Interés Turístico Internacional. Cada año, cientos de miles de personas llenan las calles de la capital tinerfeña durante casi un mes de celebraciones.</p>

<h3>Fechas del Carnaval 2026</h3>
<p>El Carnaval de Tenerife 2026 se celebrará entre febrero y marzo, con las principales actividades concentradas en las dos semanas previas al Miércoles de Ceniza. La inauguración oficial suele ser un viernes con la <strong>Gala de Elección de la Reina</strong>, un espectáculo televisado con trajes que pueden pesar más de 200 kilos y alcanzar los 5 metros de altura.</p>

<h3>Eventos principales</h3>
<ul>
<li><strong>Gala de la Reina:</strong> el evento más espectacular, con trajes de fantasía impresionantes. Entrada desde 15€.</li>
<li><strong>Murgas y comparsas:</strong> concursos de agrupaciones musicales con letras satíricas y humor canario.</li>
<li><strong>Cabalgata Anunciadora:</strong> desfile de carrozas y grupos por las calles principales de Santa Cruz.</li>
<li><strong>Coso Apoteosis:</strong> el gran desfile final con todas las agrupaciones y carrozas.</li>
<li><strong>Entierro de la Sardina:</strong> cierre del Carnaval con un desfile cómico-fúnebre y fuegos artificiales.</li>
<li><strong>Carnaval de Día:</strong> fiestas callejeras gratuitas con orquestas y DJ durante toda la semana.</li>
</ul>

<h3>Consejos para disfrutar del Carnaval</h3>
<ul>
<li>Disfrazarse es casi obligatorio: los disfraces en grupo son tradición</li>
<li>Las fiestas callejeras son gratuitas y duran hasta el amanecer</li>
<li>Reserva alojamiento con meses de antelación, los hoteles se llenan</li>
<li>El transporte público refuerza sus servicios durante el Carnaval</li>
<li>Lleva calzado cómodo: caminarás mucho por las calles de Santa Cruz</li>
<li>Prueba las tortillas de Carnaval, un dulce típico de estas fechas</li>
</ul>

<h3>Cómo llegar</h3>
<p>El epicentro es la <strong>Plaza de España</strong> y las calles aledañas de Santa Cruz. El tranvía y las guaguas (autobuses) ofrecen servicios especiales nocturnos. Si vienes del sur de la isla, hay buses directos desde Los Cristianos y Costa Adeje.</p>`,

      en: `<h2>Tenerife Carnival 2026: The Biggest Party in the Atlantic</h2>
<p>The Santa Cruz de Tenerife Carnival is the second most famous in the world after Rio de Janeiro and has been declared a Festival of International Tourist Interest. Every year, hundreds of thousands of people fill the streets of the Tenerife capital for nearly a month of celebrations.</p>

<h3>Carnival 2026 Dates</h3>
<p>The 2026 Tenerife Carnival will take place between February and March, with the main activities concentrated in the two weeks before Ash Wednesday. The official opening is usually a Friday with the <strong>Queen Election Gala</strong>, a televised show featuring costumes that can weigh over 200 kilos and reach 5 metres in height.</p>

<h3>Main Events</h3>
<ul>
<li><strong>Queen's Gala:</strong> the most spectacular event, with jaw-dropping fantasy costumes. Tickets from €15.</li>
<li><strong>Murgas and comparsas:</strong> musical group competitions with satirical lyrics and Canarian humour.</li>
<li><strong>Announcement Parade:</strong> a parade of floats and groups through the main streets of Santa Cruz.</li>
<li><strong>Coso Apoteosis:</strong> the grand final parade with all groups and floats.</li>
<li><strong>Burial of the Sardine:</strong> Carnival closing with a comic-funeral procession and fireworks.</li>
<li><strong>Daytime Carnival:</strong> free street parties with live bands and DJs throughout the week.</li>
</ul>

<h3>Tips for Enjoying Carnival</h3>
<ul>
<li>Wearing a costume is almost mandatory — group costumes are a tradition</li>
<li>Street parties are free and last until dawn</li>
<li>Book accommodation months in advance as hotels fill up quickly</li>
<li>Public transport runs extra services during Carnival</li>
<li>Wear comfortable shoes — you will walk a lot through the streets of Santa Cruz</li>
<li>Try the tortillas de Carnaval, a traditional sweet treat for the season</li>
</ul>

<h3>Getting There</h3>
<p>The epicentre is <strong>Plaza de España</strong> and the surrounding streets of Santa Cruz. The tram and guaguas (buses) offer special night services. If coming from the south of the island, there are direct buses from Los Cristianos and Costa Adeje.</p>`,
    },
    category_id: CAT.culture,
    tags: ['carnival', 'events', 'santa-cruz'],
    image_url: 'https://images.unsplash.com/photo-1656252779225-5bbd338acd14?w=1200&q=80',
  },

  // 2. Qué hacer en Tenerife cuando llueve
  {
    slug: 'que-hacer-tenerife-lluvia',
    title: {
      es: 'Qué hacer en Tenerife cuando llueve: 15 planes',
      en: 'What to Do in Tenerife When It Rains: 15 Ideas',
    },
    excerpt: {
      es: 'No dejes que la lluvia arruine tus vacaciones. Descubre 15 planes geniales para disfrutar de Tenerife en días lluviosos: museos, spas, gastronomía y más.',
      en: 'Don\'t let rain ruin your holiday. Discover 15 great plans to enjoy Tenerife on rainy days: museums, spas, gastronomy and more.',
    },
    content: {
      es: `<h2>Qué hacer en Tenerife cuando llueve: 15 planes imprescindibles</h2>
<p>Aunque Tenerife goza de un clima privilegiado con más de 300 días de sol al año, ocasionalmente puede llover, especialmente en el norte de la isla entre noviembre y febrero. Pero un día de lluvia no tiene por qué arruinar tus vacaciones. Aquí tienes 15 planes perfectos para días grises.</p>

<h3>Cultura y museos</h3>
<ul>
<li><strong>1. Museo de la Naturaleza y Arqueología (MUNA):</strong> en Santa Cruz, con momias guanches y la historia natural de las islas. Entrada: 5€.</li>
<li><strong>2. TEA Tenerife Espacio de las Artes:</strong> arte contemporáneo y cine en Santa Cruz. Entrada gratuita a exposiciones.</li>
<li><strong>3. Museo de la Ciencia y el Cosmos:</strong> en La Laguna, interactivo y perfecto para familias. Entrada: 5€.</li>
<li><strong>4. Casa de los Balcones:</strong> en La Orotava, artesanía canaria y arquitectura colonial. Entrada gratuita.</li>
</ul>

<h3>Gastronomía y compras</h3>
<ul>
<li><strong>5. Mercado de Nuestra Señora de África:</strong> mercado tradicional en Santa Cruz con productos locales, flores y tapas.</li>
<li><strong>6. Ruta de tapas por La Laguna:</strong> el casco histórico tiene decenas de bares con tapas canarias y vinos locales.</li>
<li><strong>7. Centro Comercial Meridiano:</strong> en Santa Cruz, con tiendas, cine y restaurantes.</li>
<li><strong>8. Clase de cocina canaria:</strong> aprende a hacer papas arrugadas, mojo y otras delicias. Desde 40€/persona.</li>
</ul>

<h3>Bienestar y relax</h3>
<ul>
<li><strong>9. Spa en un hotel de lujo:</strong> los hoteles del sur ofrecen circuitos termales desde 30€.</li>
<li><strong>10. Aloe vera spa:</strong> Tenerife produce aloe vera de calidad; disfruta de tratamientos especializados.</li>
</ul>

<h3>Entretenimiento</h3>
<ul>
<li><strong>11. Loro Parque:</strong> muchas de sus atracciones son cubiertas. Ideal para días de lluvia.</li>
<li><strong>12. Palmetum:</strong> jardín botánico con secciones cubiertas en Santa Cruz.</li>
<li><strong>13. Catas de vino:</strong> visita bodegas como Monje o Reverón y degusta vinos volcánicos.</li>
<li><strong>14. Cine en versión original:</strong> varias salas en la isla proyectan películas en inglés.</li>
<li><strong>15. Escape rooms:</strong> varias opciones en Santa Cruz y el sur, desde 15€/persona.</li>
</ul>

<h3>Consejo extra</h3>
<p>Recuerda que cuando llueve en el norte, el sur suele estar soleado. Un trayecto de 40 minutos por autopista puede llevarte del gris al azul. Y si llueve en toda la isla, aprovecha para explorar la rica gastronomía canaria en un restaurante con vistas.</p>`,

      en: `<h2>What to Do in Tenerife When It Rains: 15 Great Ideas</h2>
<p>Although Tenerife enjoys a privileged climate with over 300 sunny days a year, it can occasionally rain, especially in the north of the island between November and February. But a rainy day does not have to ruin your holiday. Here are 15 perfect plans for grey days.</p>

<h3>Culture and Museums</h3>
<ul>
<li><strong>1. Museum of Nature and Archaeology (MUNA):</strong> in Santa Cruz, with Guanche mummies and the natural history of the islands. Entry: €5.</li>
<li><strong>2. TEA Tenerife Arts Space:</strong> contemporary art and cinema in Santa Cruz. Free entry to exhibitions.</li>
<li><strong>3. Museum of Science and the Cosmos:</strong> in La Laguna, interactive and perfect for families. Entry: €5.</li>
<li><strong>4. Casa de los Balcones:</strong> in La Orotava, Canarian crafts and colonial architecture. Free entry.</li>
</ul>

<h3>Food and Shopping</h3>
<ul>
<li><strong>5. Nuestra Señora de África Market:</strong> traditional market in Santa Cruz with local produce, flowers and tapas.</li>
<li><strong>6. Tapas trail through La Laguna:</strong> the historic centre has dozens of bars with Canarian tapas and local wines.</li>
<li><strong>7. Centro Comercial Meridiano:</strong> in Santa Cruz, with shops, cinema and restaurants.</li>
<li><strong>8. Canarian cooking class:</strong> learn to make papas arrugadas, mojo and other delicacies. From €40/person.</li>
</ul>

<h3>Wellness and Relaxation</h3>
<ul>
<li><strong>9. Luxury hotel spa:</strong> southern hotels offer thermal circuits from €30.</li>
<li><strong>10. Aloe vera spa:</strong> Tenerife produces quality aloe vera; enjoy specialised treatments.</li>
</ul>

<h3>Entertainment</h3>
<ul>
<li><strong>11. Loro Parque:</strong> many of its attractions are indoors. Great for rainy days.</li>
<li><strong>12. Palmetum:</strong> botanical garden with covered sections in Santa Cruz.</li>
<li><strong>13. Wine tastings:</strong> visit wineries like Monje or Reverón and taste volcanic wines.</li>
<li><strong>14. Original version cinema:</strong> several cinemas on the island show films in English.</li>
<li><strong>15. Escape rooms:</strong> several options in Santa Cruz and the south, from €15/person.</li>
</ul>

<h3>Bonus Tip</h3>
<p>Remember that when it rains in the north, the south is usually sunny. A 40-minute drive on the motorway can take you from grey to blue skies. And if it rains across the whole island, take the chance to explore the rich Canarian gastronomy at a restaurant with views.</p>`,
    },
    category_id: CAT.experiences,
    tags: ['rain', 'indoor', 'plans'],
    image_url: null,
  },

  // 3. Mercadillos en Tenerife
  {
    slug: 'mercadillos-tenerife',
    title: {
      es: 'Mercadillos en Tenerife: los mejores',
      en: 'Markets in Tenerife: The Best Ones',
    },
    excerpt: {
      es: 'Guía completa de los mejores mercadillos de Tenerife: horarios, ubicaciones y qué comprar en cada uno. Desde el Rastro de Santa Cruz hasta los mercados agrícolas.',
      en: 'Complete guide to Tenerife\'s best markets: opening hours, locations and what to buy. From the Santa Cruz flea market to agricultural markets.',
    },
    content: {
      es: `<h2>Los mejores mercadillos de Tenerife</h2>
<p>Tenerife cuenta con una rica tradición de mercadillos y mercados donde encontrarás productos locales, artesanía, ropa y antigüedades. Visitar un mercadillo es una forma perfecta de sumergirte en la cultura canaria y llevarte recuerdos auténticos.</p>

<h3>Mercados agrícolas y gastronómicos</h3>
<ul>
<li><strong>Mercado del Agricultor de Tacoronte:</strong> sábados y domingos de 8:00 a 14:00. Frutas tropicales, quesos, vinos y miel de la zona. Uno de los más completos de la isla.</li>
<li><strong>Mercado del Agricultor de La Matanza:</strong> sábados y domingos de 8:00 a 14:00. Pequeño pero con productos de gran calidad y precios justos.</li>
<li><strong>Mercado del Agricultor de Tegueste:</strong> sábados y domingos de 8:00 a 14:00. Famoso por sus vinos artesanales y quesos de cabra.</li>
<li><strong>Mercado Municipal de Nuestra Señora de África:</strong> en Santa Cruz, abierto de lunes a sábado. Productos frescos, flores y una planta de tapas.</li>
</ul>

<h3>Mercadillos de artesanía y segunda mano</h3>
<ul>
<li><strong>Rastro de Santa Cruz:</strong> domingos de 9:00 a 14:00 junto al mercado de África. Antigüedades, ropa vintage y objetos curiosos.</li>
<li><strong>Mercadillo de Candelaria:</strong> miércoles de 16:00 a 21:00. Artesanía, ropa y bisutería junto a la basílica.</li>
<li><strong>Mercadillo del Puerto de la Cruz:</strong> jueves de 9:00 a 14:00. Artesanía local, jabones naturales y productos gourmet.</li>
<li><strong>Mercadillo de Los Cristianos:</strong> jueves y sábados de 9:00 a 14:00. Popular entre turistas, con ropa y souvenirs.</li>
</ul>

<h3>Qué comprar en los mercadillos</h3>
<ul>
<li><strong>Mojo canario:</strong> salsas tradicionales en botes para llevar (rojo y verde)</li>
<li><strong>Queso de cabra:</strong> especialmente el ahumado, premiado internacionalmente</li>
<li><strong>Miel de Tenerife:</strong> variedad única con denominación de origen</li>
<li><strong>Plátano canario:</strong> más pequeño y sabroso que los de importación</li>
<li><strong>Vino local:</strong> tinto, blanco y malvasía de bodegas artesanales</li>
<li><strong>Artesanía en calado:</strong> bordados tradicionales canarios</li>
</ul>

<h3>Consejos para ir al mercadillo</h3>
<ul>
<li>Llega temprano para encontrar los mejores productos</li>
<li>Lleva efectivo, muchos puestos no aceptan tarjeta</li>
<li>Trae tu propia bolsa reutilizable</li>
<li>Prueba antes de comprar: los vendedores ofrecen degustaciones</li>
</ul>`,

      en: `<h2>The Best Markets in Tenerife</h2>
<p>Tenerife has a rich tradition of markets where you can find local produce, crafts, clothing and antiques. Visiting a market is a perfect way to immerse yourself in Canarian culture and take home authentic souvenirs.</p>

<h3>Agricultural and Food Markets</h3>
<ul>
<li><strong>Tacoronte Farmers' Market:</strong> Saturdays and Sundays from 8:00 to 14:00. Tropical fruits, cheeses, wines and local honey. One of the most complete on the island.</li>
<li><strong>La Matanza Farmers' Market:</strong> Saturdays and Sundays from 8:00 to 14:00. Small but with high-quality products and fair prices.</li>
<li><strong>Tegueste Farmers' Market:</strong> Saturdays and Sundays from 8:00 to 14:00. Famous for its artisan wines and goat cheeses.</li>
<li><strong>Nuestra Señora de África Municipal Market:</strong> in Santa Cruz, open Monday to Saturday. Fresh produce, flowers and a tapas floor.</li>
</ul>

<h3>Craft and Second-hand Markets</h3>
<ul>
<li><strong>Santa Cruz Flea Market:</strong> Sundays from 9:00 to 14:00 next to the Africa market. Antiques, vintage clothing and curious objects.</li>
<li><strong>Candelaria Market:</strong> Wednesdays from 16:00 to 21:00. Crafts, clothing and jewellery near the basilica.</li>
<li><strong>Puerto de la Cruz Market:</strong> Thursdays from 9:00 to 14:00. Local crafts, natural soaps and gourmet products.</li>
<li><strong>Los Cristianos Market:</strong> Thursdays and Saturdays from 9:00 to 14:00. Popular with tourists, offering clothes and souvenirs.</li>
</ul>

<h3>What to Buy at the Markets</h3>
<ul>
<li><strong>Canarian mojo:</strong> traditional sauces in jars to take home (red and green)</li>
<li><strong>Goat cheese:</strong> especially the smoked variety, internationally awarded</li>
<li><strong>Tenerife honey:</strong> unique variety with designation of origin</li>
<li><strong>Canarian banana:</strong> smaller and tastier than imported ones</li>
<li><strong>Local wine:</strong> red, white and malvasia from artisan wineries</li>
<li><strong>Calado embroidery:</strong> traditional Canarian needlework</li>
</ul>

<h3>Tips for Visiting Markets</h3>
<ul>
<li>Arrive early to find the best products</li>
<li>Bring cash — many stalls do not accept cards</li>
<li>Bring your own reusable bag</li>
<li>Taste before buying — vendors offer free samples</li>
</ul>`,
    },
    category_id: CAT.shopping,
    tags: ['markets', 'shopping', 'local'],
    image_url: null,
  },

  // 4. Observación de estrellas en el Teide
  {
    slug: 'estrellas-teide-observacion',
    title: {
      es: 'Observación de estrellas en el Teide',
      en: 'Stargazing on Mount Teide',
    },
    excerpt: {
      es: 'El Teide es uno de los mejores lugares del mundo para observar estrellas. Descubre cómo organizar tu experiencia astronómica en este cielo certificado Starlight.',
      en: 'Mount Teide is one of the best places in the world for stargazing. Discover how to organise your astronomical experience under this Starlight-certified sky.',
    },
    content: {
      es: `<h2>Observación de estrellas en el Teide: una experiencia única</h2>
<p>El Parque Nacional del Teide es uno de los mejores lugares del planeta para observar el cielo nocturno. A más de 2.000 metros de altitud, lejos de la contaminación lumínica y bajo un cielo certificado como <strong>Destino Starlight</strong>, las condiciones son excepcionales. No en vano, aquí se encuentra el Observatorio del Teide, uno de los más importantes del mundo.</p>

<h3>Por qué el Teide es ideal para ver estrellas</h3>
<ul>
<li><strong>Altitud:</strong> a 2.356 metros (base del teleférico), estás por encima de las nubes y la inversión térmica</li>
<li><strong>Contaminación lumínica mínima:</strong> la Ley del Cielo de Canarias protege la calidad del cielo</li>
<li><strong>Clima seco:</strong> más de 300 noches despejadas al año</li>
<li><strong>Posición geográfica:</strong> latitud 28°N permite ver constelaciones del hemisferio norte y sur</li>
<li><strong>Se pueden observar 83 de las 88 constelaciones reconocidas</strong></li>
</ul>

<h3>Excursiones de observación astronómica</h3>
<p>Varias empresas ofrecen experiencias guiadas que incluyen telescopios profesionales y explicaciones de astrónomos certificados:</p>
<ul>
<li><strong>Volcano Teide (empresa oficial):</strong> observación astronómica con teleférico al atardecer. Desde 72€/adulto. Incluye cena ligera y guía con telescopio.</li>
<li><strong>Tours privados:</strong> grupos reducidos con astrónomos profesionales. Desde 50€/persona, 2-3 horas de duración.</li>
<li><strong>Observatorio del Teide:</strong> visitas diurnas guiadas al observatorio científico. Reserva en volcanoteide.com. 19€ adultos.</li>
</ul>

<h3>Qué verás en el cielo del Teide</h3>
<ul>
<li>La Vía Láctea con una claridad impresionante (mejor en verano)</li>
<li>Planetas como Júpiter, Saturno, Marte y Venus a simple vista</li>
<li>Nebulosas, cúmulos estelares y galaxias con telescopio</li>
<li>Lluvias de estrellas: Perseidas (agosto), Gemínidas (diciembre)</li>
<li>La luz zodiacal y el gegenschein en noches sin luna</li>
</ul>

<h3>Consejos prácticos</h3>
<ul>
<li>Abrígate mucho: de noche puede bajar a 0°C incluso en verano</li>
<li>Consulta las fases lunares: la luna nueva es ideal para observar</li>
<li>Lleva linterna roja para no perder la adaptación nocturna de los ojos</li>
<li>Evita usar el móvil con brillo alto</li>
<li>La mejor época es de mayo a octubre por el clima más estable</li>
<li>Si vas por libre, el Mirador de La Tarta y el aparcamiento del teleférico son buenos puntos</li>
</ul>`,

      en: `<h2>Stargazing on Mount Teide: A Unique Experience</h2>
<p>Teide National Park is one of the best places on the planet to observe the night sky. At over 2,000 metres altitude, far from light pollution and under a sky certified as a <strong>Starlight Destination</strong>, conditions are exceptional. It is no coincidence that the Teide Observatory, one of the world's most important, is located here.</p>

<h3>Why Teide is Ideal for Stargazing</h3>
<ul>
<li><strong>Altitude:</strong> at 2,356 metres (cable car base), you are above the clouds and thermal inversion layer</li>
<li><strong>Minimal light pollution:</strong> the Canary Islands Sky Law protects sky quality</li>
<li><strong>Dry climate:</strong> over 300 clear nights per year</li>
<li><strong>Geographic position:</strong> latitude 28°N allows views of both northern and southern hemisphere constellations</li>
<li><strong>83 of the 88 recognised constellations are visible</strong></li>
</ul>

<h3>Stargazing Excursions</h3>
<p>Several companies offer guided experiences that include professional telescopes and explanations from certified astronomers:</p>
<ul>
<li><strong>Volcano Teide (official company):</strong> astronomical observation with sunset cable car ride. From €72/adult. Includes light dinner and guided telescope session.</li>
<li><strong>Private tours:</strong> small groups with professional astronomers. From €50/person, 2-3 hours long.</li>
<li><strong>Teide Observatory:</strong> daytime guided visits to the scientific observatory. Book at volcanoteide.com. €19 adults.</li>
</ul>

<h3>What You Will See in the Teide Sky</h3>
<ul>
<li>The Milky Way with stunning clarity (best in summer)</li>
<li>Planets such as Jupiter, Saturn, Mars and Venus with the naked eye</li>
<li>Nebulae, star clusters and galaxies through the telescope</li>
<li>Meteor showers: Perseids (August), Geminids (December)</li>
<li>Zodiacal light and gegenschein on moonless nights</li>
</ul>

<h3>Practical Tips</h3>
<ul>
<li>Wrap up warm — temperatures can drop to 0°C even in summer at night</li>
<li>Check moon phases — a new moon is ideal for observation</li>
<li>Bring a red torch to preserve your night vision</li>
<li>Avoid using your phone on high brightness</li>
<li>The best season is May to October due to more stable weather</li>
<li>If going independently, the Mirador de La Tarta and cable car car park are good spots</li>
</ul>`,
    },
    category_id: CAT.nature,
    tags: ['stargazing', 'teide', 'night'],
    image_url: null,
  },

  // 5. Vinos de Tenerife
  {
    slug: 'vinos-tenerife-bodegas',
    title: {
      es: 'Vinos de Tenerife: bodegas y catas',
      en: 'Tenerife Wines: Wineries and Tastings',
    },
    excerpt: {
      es: 'Descubre los vinos volcánicos de Tenerife, las mejores bodegas para visitar y cómo organizar catas y rutas del vino por la isla.',
      en: 'Discover Tenerife\'s volcanic wines, the best wineries to visit and how to organise tastings and wine routes across the island.',
    },
    content: {
      es: `<h2>Vinos de Tenerife: una tradición volcánica única</h2>
<p>Tenerife es la isla canaria con mayor tradición vinícola y cuenta con <strong>cinco denominaciones de origen</strong>, más que cualquier otra isla del mundo. Sus viñedos crecen en suelos volcánicos a altitudes que van desde el nivel del mar hasta los 1.500 metros, creando vinos con un carácter mineral y único que conquista paladares internacionales.</p>

<h3>Las denominaciones de origen</h3>
<ul>
<li><strong>DO Tacoronte-Acentejo:</strong> la más grande y conocida. Tintos con cuerpo y blancos frescos.</li>
<li><strong>DO Valle de la Orotava:</strong> viñedos en terrazas con vistas al Teide. Excelentes blancos de listán blanco.</li>
<li><strong>DO Ycoden-Daute-Isora:</strong> al noroeste, famosa por sus vinos dulces de malvasía.</li>
<li><strong>DO Abona:</strong> los viñedos más altos de Europa, hasta 1.500 m. Blancos minerales.</li>
<li><strong>DO Valle de Güímar:</strong> al este, vinos blancos ligeros y afrutados.</li>
</ul>

<h3>Bodegas que debes visitar</h3>
<ul>
<li><strong>Bodega Monje:</strong> en El Sauzal, la más turística. Visita con cata y tapas desde 15€. Restaurante con vistas espectaculares. Abierta todos los días.</li>
<li><strong>Bodega Reverón:</strong> en Valle de la Orotava. Visitas personalizadas con el enólogo. Desde 20€.</li>
<li><strong>Bodegas Insulares Tenerife:</strong> la cooperativa más grande de la isla en Tacoronte. Visita gratuita con cata desde 8€.</li>
<li><strong>Casa del Vino La Baranda:</strong> en El Sauzal, museo del vino con catas, restaurante y vistas al mar. Entrada: 3€.</li>
<li><strong>Bodega Cráter:</strong> vinos ecológicos de parcelas volcánicas. Visitas con cita previa.</li>
</ul>

<h3>Variedades de uva autóctonas</h3>
<ul>
<li><strong>Listán negro:</strong> la tinta más plantada, da tintos frescos y afrutados</li>
<li><strong>Listán blanco:</strong> blanca principal, vinos secos y aromáticos</li>
<li><strong>Malvasía volcánica:</strong> vinos dulces y semidulces de alta calidad</li>
<li><strong>Negramoll:</strong> tinta para rosados y tintos suaves</li>
<li><strong>Baboso negro:</strong> variedad recuperada, tintos premium</li>
</ul>

<h3>Consejos para la ruta del vino</h3>
<ul>
<li>Reserva las visitas con antelación, especialmente en fin de semana</li>
<li>Contrata un conductor o únete a un tour organizado para no preocuparte por conducir</li>
<li>La mejor época para visitar bodegas es septiembre durante la vendimia</li>
<li>Lleva una nevera portátil si quieres comprar botellas y viajas en verano</li>
</ul>`,

      en: `<h2>Tenerife Wines: A Unique Volcanic Tradition</h2>
<p>Tenerife is the Canary Island with the greatest winemaking tradition and boasts <strong>five denominations of origin</strong>, more than any other island in the world. Its vineyards grow on volcanic soils at altitudes ranging from sea level to 1,500 metres, creating wines with a unique mineral character that wins over international palates.</p>

<h3>Denominations of Origin</h3>
<ul>
<li><strong>DO Tacoronte-Acentejo:</strong> the largest and best known. Full-bodied reds and fresh whites.</li>
<li><strong>DO Valle de la Orotava:</strong> terraced vineyards with views of Teide. Excellent listán blanco whites.</li>
<li><strong>DO Ycoden-Daute-Isora:</strong> in the northwest, famous for its sweet malvasia wines.</li>
<li><strong>DO Abona:</strong> the highest vineyards in Europe, up to 1,500 m. Mineral whites.</li>
<li><strong>DO Valle de Güímar:</strong> in the east, light and fruity white wines.</li>
</ul>

<h3>Wineries You Must Visit</h3>
<ul>
<li><strong>Bodega Monje:</strong> in El Sauzal, the most tourist-friendly. Tour with tasting and tapas from €15. Restaurant with spectacular views. Open daily.</li>
<li><strong>Bodega Reverón:</strong> in Valle de la Orotava. Personalised visits with the winemaker. From €20.</li>
<li><strong>Bodegas Insulares Tenerife:</strong> the island's largest cooperative in Tacoronte. Free visit with tasting from €8.</li>
<li><strong>Casa del Vino La Baranda:</strong> in El Sauzal, wine museum with tastings, restaurant and sea views. Entry: €3.</li>
<li><strong>Bodega Cráter:</strong> organic wines from volcanic plots. Visits by appointment.</li>
</ul>

<h3>Indigenous Grape Varieties</h3>
<ul>
<li><strong>Listán negro:</strong> the most planted red variety, producing fresh and fruity reds</li>
<li><strong>Listán blanco:</strong> the main white grape, dry and aromatic wines</li>
<li><strong>Malvasía volcánica:</strong> high-quality sweet and semi-sweet wines</li>
<li><strong>Negramoll:</strong> red grape used for rosés and soft reds</li>
<li><strong>Baboso negro:</strong> a recovered variety, premium reds</li>
</ul>

<h3>Wine Route Tips</h3>
<ul>
<li>Book visits in advance, especially at weekends</li>
<li>Hire a driver or join an organised tour so you do not have to worry about driving</li>
<li>The best time to visit wineries is September during the harvest</li>
<li>Bring a cool bag if buying bottles and travelling in summer</li>
</ul>`,
    },
    category_id: CAT.food,
    tags: ['wine', 'bodegas', 'tasting'],
    image_url: null,
  },
];

async function main() {
  console.log('Inserting batch 3a: 5 blog articles...\n');

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

  console.log('\nBatch 3a done!');
}

main();
