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
  // 6. Restaurantes con estrella Michelin en Tenerife
  {
    slug: 'restaurantes-michelin-tenerife',
    title: {
      es: 'Restaurantes con estrella Michelin en Tenerife',
      en: 'Michelin Star Restaurants in Tenerife',
    },
    excerpt: {
      es: 'Descubre los restaurantes con estrella Michelin en Tenerife: alta cocina canaria, creatividad y productos locales en un entorno volcánico único.',
      en: 'Discover the Michelin-starred restaurants in Tenerife: haute Canarian cuisine, creativity and local produce in a unique volcanic setting.',
    },
    content: {
      es: `<h2>Restaurantes con estrella Michelin en Tenerife</h2>
<p>Tenerife se ha convertido en un referente gastronómico internacional. La isla cuenta con varios restaurantes distinguidos con estrellas Michelin que combinan productos locales excepcionales con técnicas de vanguardia. La riqueza del mar, los microclimas que producen ingredientes únicos y la tradición culinaria canaria forman la base de una escena de alta cocina que sorprende a los visitantes más exigentes.</p>

<h3>Los restaurantes estrella</h3>
<ul>
<li><strong>M.B. (The Ritz-Carlton Abama):</strong> dos estrellas Michelin bajo la dirección de Martín Berasategui. Cocina vasca con toques canarios en un marco de lujo absoluto. El menú degustación es una experiencia inolvidable con maridaje de vinos canarios y peninsulares. Precio aproximado: 200-250 euros por persona.</li>
<li><strong>Kazan (The Ritz-Carlton Abama):</strong> una estrella Michelin de cocina japonesa fusionada con sabores locales. El sushi y el tataki con pescados atlánticos son excepcionales. Ambiente zen con vistas al jardín.</li>
<li><strong>El Rincón de Juan Carlos (Los Gigantes):</strong> una estrella Michelin. Cocina creativa canaria con productos kilómetro cero. Juan Carlos Padrón transforma ingredientes humildes en platos extraordinarios. Menú degustación desde 120 euros.</li>
<li><strong>Nub (La Laguna):</strong> una estrella Michelin. Fusión de cocina sudamericana y canaria con un enfoque en la sostenibilidad. Andrea Bernardi y Fernanda Fuentes crean platos que cuentan historias a través de los sabores.</li>
</ul>

<h3>Consejos para ir</h3>
<ul>
<li>Reserva con al menos 2-3 semanas de antelación, especialmente en temporada alta</li>
<li>Algunos restaurantes ofrecen menú degustación y carta: el degustación es la mejor forma de conocer la cocina del chef</li>
<li>Pide maridaje con vinos canarios: la denominación de origen Tacoronte-Acentejo y los blancos de Abona son excelentes</li>
<li>El código de vestimenta es smart-casual en la mayoría</li>
</ul>`,

      en: `<h2>Michelin Star Restaurants in Tenerife</h2>
<p>Tenerife has become an international gastronomic reference. The island boasts several Michelin-starred restaurants that combine exceptional local produce with cutting-edge techniques. The richness of the sea, the microclimates that produce unique ingredients and the Canarian culinary tradition form the base of a haute cuisine scene that surprises the most demanding visitors.</p>

<h3>The Starred Restaurants</h3>
<ul>
<li><strong>M.B. (The Ritz-Carlton Abama):</strong> two Michelin stars under the direction of Martín Berasategui. Basque cuisine with Canarian touches in a setting of absolute luxury. The tasting menu is an unforgettable experience with Canarian and mainland wine pairings. Approximate price: 200-250 euros per person.</li>
<li><strong>Kazan (The Ritz-Carlton Abama):</strong> one Michelin star for Japanese cuisine fused with local flavours. The sushi and tataki with Atlantic fish are exceptional. Zen atmosphere with garden views.</li>
<li><strong>El Rincón de Juan Carlos (Los Gigantes):</strong> one Michelin star. Creative Canarian cuisine with zero-kilometre produce. Juan Carlos Padrón transforms humble ingredients into extraordinary dishes. Tasting menu from 120 euros.</li>
<li><strong>Nub (La Laguna):</strong> one Michelin star. A fusion of South American and Canarian cuisine with a focus on sustainability. Andrea Bernardi and Fernanda Fuentes create dishes that tell stories through flavours.</li>
</ul>

<h3>Tips for Visiting</h3>
<ul>
<li>Book at least 2-3 weeks ahead, especially in peak season</li>
<li>Some restaurants offer both tasting menus and à la carte — the tasting menu is the best way to experience the chef's cuisine</li>
<li>Ask for Canarian wine pairings: the Tacoronte-Acentejo denomination and Abona whites are excellent</li>
<li>Dress code is smart-casual at most venues</li>
</ul>`,
    },
    category_id: CAT.food,
    tags: ['michelin', 'fine-dining'],
    image_url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80',
  },

  // 7. Tenerife con perros
  {
    slug: 'tenerife-perros-mascotas',
    title: {
      es: 'Tenerife con perros: playas y sitios pet-friendly',
      en: 'Tenerife with Dogs: Pet-Friendly Beaches and Places',
    },
    excerpt: {
      es: 'Guía para viajar a Tenerife con tu perro: playas caninas, restaurantes pet-friendly, alojamientos y consejos prácticos.',
      en: 'Guide to visiting Tenerife with your dog: dog beaches, pet-friendly restaurants, accommodation and practical tips.',
    },
    content: {
      es: `<h2>Tenerife con perros: guía pet-friendly completa</h2>
<p>Tenerife es un destino cada vez más amigable para los viajeros que no quieren separarse de sus mascotas. La isla cuenta con playas caninas oficiales, restaurantes con terraza donde los perros son bienvenidos y una oferta creciente de alojamientos pet-friendly. Aquí tienes todo lo que necesitas para planificar unas vacaciones perfectas con tu compañero de cuatro patas.</p>

<h3>Playas para perros</h3>
<ul>
<li><strong>Playa de El Confital (Granadilla):</strong> playa canina oficial en el sur de la isla. Arena volcánica, acceso fácil y espacio amplio para que tu perro corra libre. Aguas tranquilas.</li>
<li><strong>Playa de Bocacangrejo (El Rosario):</strong> cerca de Santa Cruz, esta playa de piedra volcánica permite perros todo el año. Zona abierta y poco concurrida.</li>
<li><strong>Playa de El Puertito (Güímar):</strong> cala tranquila donde los perros pueden bañarse libremente. Ambiente relajado y entorno natural.</li>
<li><strong>Playa de Los Tarajales (Adeje):</strong> una de las playas caninas más nuevas en la zona turística del sur.</li>
</ul>

<h3>Restaurantes y terrazas pet-friendly</h3>
<p>La mayoría de restaurantes con terraza en Tenerife aceptan perros sin problema. Los paseos marítimos de <strong>Costa Adeje</strong>, <strong>Los Cristianos</strong> y <strong>Puerto de la Cruz</strong> están llenos de opciones donde tu mascota puede descansar a tu lado mientras cenas. Muchos incluso ofrecen cuencos de agua para los perros.</p>

<h3>Alojamiento con mascotas</h3>
<ul>
<li>Muchos hoteles de cadena aceptan mascotas con suplemento (10-20 euros/noche)</li>
<li>Las casas rurales y apartamentos vacacionales suelen ser más flexibles</li>
<li>Busca alojamientos con jardín o terraza para más comodidad</li>
<li>Confirma siempre la política de mascotas antes de reservar</li>
</ul>

<h3>Consejos prácticos</h3>
<ul>
<li>Lleva siempre bolsas recogecacas y mantén a tu perro con correa en zonas urbanas</li>
<li>El calor del asfalto y la arena negra puede quemar las almohadillas: pasea en horas frescas</li>
<li>Lleva agua fresca y un cuenco plegable para las excursiones</li>
<li>Los vuelos a Tenerife permiten mascotas en cabina hasta 8 kg con la mayoría de aerolíneas</li>
</ul>`,

      en: `<h2>Tenerife with Dogs: Complete Pet-Friendly Guide</h2>
<p>Tenerife is an increasingly friendly destination for travellers who don't want to be separated from their pets. The island has official dog beaches, terrace restaurants where dogs are welcome and a growing range of pet-friendly accommodation. Here's everything you need to plan the perfect holiday with your four-legged companion.</p>

<h3>Dog Beaches</h3>
<ul>
<li><strong>Playa de El Confital (Granadilla):</strong> an official dog beach in the south of the island. Volcanic sand, easy access and plenty of space for your dog to run free. Calm waters.</li>
<li><strong>Playa de Bocacangrejo (El Rosario):</strong> near Santa Cruz, this volcanic stone beach allows dogs year-round. Open area with few crowds.</li>
<li><strong>Playa de El Puertito (Güímar):</strong> a quiet cove where dogs can swim freely. Relaxed atmosphere and natural surroundings.</li>
<li><strong>Playa de Los Tarajales (Adeje):</strong> one of the newest dog beaches in the southern tourist area.</li>
</ul>

<h3>Pet-Friendly Restaurants and Terraces</h3>
<p>Most terrace restaurants in Tenerife accept dogs without issue. The seafront promenades of <strong>Costa Adeje</strong>, <strong>Los Cristianos</strong> and <strong>Puerto de la Cruz</strong> are full of options where your pet can rest by your side while you dine. Many even offer water bowls for dogs.</p>

<h3>Pet-Friendly Accommodation</h3>
<ul>
<li>Many chain hotels accept pets with a supplement (10-20 euros per night)</li>
<li>Rural houses and holiday apartments tend to be more flexible</li>
<li>Look for places with a garden or terrace for extra comfort</li>
<li>Always confirm the pet policy before booking</li>
</ul>

<h3>Practical Tips</h3>
<ul>
<li>Always carry poop bags and keep your dog on a lead in urban areas</li>
<li>Hot tarmac and black sand can burn paw pads — walk during cooler hours</li>
<li>Bring fresh water and a collapsible bowl for excursions</li>
<li>Flights to Tenerife allow pets in the cabin up to 8 kg with most airlines</li>
</ul>`,
    },
    category_id: CAT.experiences,
    tags: ['dogs', 'pet-friendly'],
    image_url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&q=80',
  },

  // 8. Macizo de Anaga
  {
    slug: 'anaga-que-ver',
    title: {
      es: 'Macizo de Anaga: qué ver y mejores rutas',
      en: 'Anaga Mountains: What to See and Best Trails',
    },
    excerpt: {
      es: 'Guía del Macizo de Anaga en Tenerife: rutas de senderismo, bosque de laurisilva, miradores y pueblos escondidos en la Reserva de la Biosfera.',
      en: 'Guide to the Anaga Mountains in Tenerife: hiking trails, laurel forest, viewpoints and hidden villages in the Biosphere Reserve.',
    },
    content: {
      es: `<h2>Macizo de Anaga: qué ver y mejores rutas</h2>
<p>El Macizo de Anaga, en el extremo noreste de Tenerife, es uno de los tesoros naturales más valiosos de las Islas Canarias. Declarado <strong>Reserva de la Biosfera por la UNESCO</strong> en 2015, este rincón de la isla alberga uno de los últimos bosques de laurisilva del planeta, caseríos aislados que parecen detenidos en el tiempo y miradores con vistas que quitan el aliento.</p>

<h3>El bosque de laurisilva</h3>
<p>La laurisilva es un tipo de bosque subtropical que cubría toda la cuenca mediterránea hace millones de años. Hoy solo sobrevive en algunos archipiélagos atlánticos, y Anaga conserva uno de los mejores ejemplos. Caminar entre sus árboles cubiertos de musgo y helechos gigantes, envueltos en niebla, es como retroceder a la era terciaria.</p>

<h3>Mejores rutas de senderismo</h3>
<ul>
<li><strong>Sendero de los Sentidos:</strong> ruta corta y accesible (1,5 km) por el corazón de la laurisilva. Perfecta para familias y personas con movilidad reducida. Inicio en Cruz del Carmen.</li>
<li><strong>Cruz del Carmen a Punta del Hidalgo:</strong> ruta de 12 km de descenso espectacular entre bosque, caseríos y barrancos. Dificultad media. Usa transporte público para volver.</li>
<li><strong>Chamorga a Roque Bermejo:</strong> 10 km ida y vuelta por la costa hasta una playa aislada con un faro abandonado. Paisajes de acantilados y mar abierto.</li>
<li><strong>Chinamada:</strong> pueblo de casas cueva todavía habitadas. La ruta desde Las Carboneras (4 km) pasa por bosque y terrazas agrícolas con vistas al mar.</li>
</ul>

<h3>Miradores imprescindibles</h3>
<ul>
<li><strong>Mirador de Cruz del Carmen:</strong> vistas panorámicas sobre La Laguna y el Teide</li>
<li><strong>Mirador del Bailadero:</strong> entre las dos vertientes de la montaña, espectacular con niebla</li>
<li><strong>Mirador de Benijo:</strong> atardeceres mágicos sobre los roques y el océano</li>
</ul>

<h3>Consejos prácticos</h3>
<ul>
<li>Las carreteras de Anaga son estrechas y sinuosas: conduce con precaución</li>
<li>Lleva ropa de abrigo e impermeable, la niebla y la lluvia son frecuentes</li>
<li>El centro de visitantes de Cruz del Carmen ofrece mapas y orientación gratuita</li>
<li>Respeta la flora: muchas especies son endémicas y están protegidas</li>
</ul>`,

      en: `<h2>Anaga Mountains: What to See and Best Trails</h2>
<p>The Anaga Massif, at the far northeast of Tenerife, is one of the most valuable natural treasures in the Canary Islands. Declared a <strong>UNESCO Biosphere Reserve</strong> in 2015, this corner of the island is home to one of the last laurel forests on the planet, isolated hamlets that seem frozen in time and viewpoints with breathtaking vistas.</p>

<h3>The Laurel Forest</h3>
<p>Laurisilva is a type of subtropical forest that covered the entire Mediterranean basin millions of years ago. Today it only survives on some Atlantic archipelagos, and Anaga preserves one of the finest examples. Walking among its moss-covered trees and giant ferns, wrapped in mist, is like stepping back to the Tertiary era.</p>

<h3>Best Hiking Trails</h3>
<ul>
<li><strong>Sendero de los Sentidos:</strong> a short, accessible trail (1.5 km) through the heart of the laurel forest. Perfect for families and people with reduced mobility. Starting point at Cruz del Carmen.</li>
<li><strong>Cruz del Carmen to Punta del Hidalgo:</strong> a spectacular 12 km descent through forest, hamlets and ravines. Medium difficulty. Use public transport to return.</li>
<li><strong>Chamorga to Roque Bermejo:</strong> 10 km return along the coast to a secluded beach with an abandoned lighthouse. Cliff and open sea landscapes.</li>
<li><strong>Chinamada:</strong> a village of cave houses still inhabited. The trail from Las Carboneras (4 km) passes through forest and agricultural terraces with sea views.</li>
</ul>

<h3>Must-Visit Viewpoints</h3>
<ul>
<li><strong>Mirador de Cruz del Carmen:</strong> panoramic views over La Laguna and Teide</li>
<li><strong>Mirador del Bailadero:</strong> between the two sides of the mountain, spectacular in mist</li>
<li><strong>Mirador de Benijo:</strong> magical sunsets over the sea stacks and ocean</li>
</ul>

<h3>Practical Tips</h3>
<ul>
<li>Anaga's roads are narrow and winding — drive carefully</li>
<li>Bring warm clothing and waterproofs; mist and rain are common</li>
<li>The Cruz del Carmen visitor centre offers free maps and guidance</li>
<li>Respect the flora — many species are endemic and protected</li>
</ul>`,
    },
    category_id: CAT.nature,
    tags: ['anaga', 'hiking', 'biosphere'],
    image_url: 'https://images.unsplash.com/photo-1626033005784-e6c39eaa0669?w=1200&q=80',
  },

  // 9. Transporte público en Tenerife
  {
    slug: 'transporte-publico-tenerife',
    title: {
      es: 'Transporte público en Tenerife: guaguas y tranvía',
      en: 'Public Transport in Tenerife: Buses and Tram',
    },
    excerpt: {
      es: 'Todo sobre el transporte público en Tenerife: guaguas TITSA, tranvía, bonos, rutas y consejos para moverte por la isla sin coche.',
      en: 'Everything about public transport in Tenerife: TITSA buses, tram, passes, routes and tips for getting around without a car.',
    },
    content: {
      es: `<h2>Transporte público en Tenerife: guía completa</h2>
<p>Moverse por Tenerife sin coche es posible gracias a una red de transporte público que conecta los principales puntos de la isla. Aunque alquilar un coche ofrece más libertad, las guaguas (autobuses) y el tranvía son una alternativa económica y práctica para llegar a la mayoría de destinos turísticos.</p>

<h3>Guaguas TITSA</h3>
<p><strong>TITSA</strong> es la empresa de transporte público por carretera de Tenerife. Opera más de 100 líneas que cubren toda la isla. Las guaguas son modernas, con aire acondicionado y accesibles para sillas de ruedas.</p>
<ul>
<li><strong>Líneas principales:</strong> la 110 conecta los aeropuertos con Santa Cruz; la 111 une Santa Cruz con el sur turístico; la 343 sube al Teide desde Puerto de la Cruz.</li>
<li><strong>Horarios:</strong> las líneas principales operan de 6:00 a 23:00. Los fines de semana hay servicios nocturnos en zonas turísticas.</li>
<li><strong>Precios:</strong> billete sencillo desde 1,45 euros. El bonobús <strong>TenMás</strong> ofrece descuentos de hasta el 50 por ciento.</li>
</ul>

<h3>Tranvía de Tenerife</h3>
<p>El tranvía conecta <strong>Santa Cruz</strong> con <strong>La Laguna</strong> en dos líneas modernas y eficientes. Es la forma más cómoda de moverse entre ambas ciudades, con frecuencia cada 5-10 minutos y paradas en los principales puntos de interés.</p>
<ul>
<li><strong>Línea 1:</strong> Intercambiador Santa Cruz — La Trinidad (La Laguna). 25 minutos.</li>
<li><strong>Línea 2:</strong> La Cuesta — Tíncer. Conexión con zona universitaria.</li>
<li><strong>Precio:</strong> 1,35 euros con tarjeta TenMás.</li>
</ul>

<h3>Tarjeta TenMás</h3>
<p>La tarjeta <strong>TenMás</strong> es imprescindible si vas a usar transporte público. Se compra en estaciones de tranvía y puntos TITSA por 2 euros y se recarga con el importe que desees. Ofrece descuentos significativos en cada viaje tanto en guaguas como en tranvía.</p>

<h3>Consejos para moverte</h3>
<ul>
<li>Descarga la app de TITSA para consultar horarios y rutas en tiempo real</li>
<li>Los aeropuertos están bien conectados por guagua directa con las zonas turísticas</li>
<li>Para llegar al Teide en transporte público, planifica la salida temprano</li>
<li>En zonas rurales como Anaga o Masca, las frecuencias son limitadas: consulta horarios</li>
</ul>`,

      en: `<h2>Public Transport in Tenerife: Complete Guide</h2>
<p>Getting around Tenerife without a car is possible thanks to a public transport network connecting the island's main points. Although hiring a car offers more freedom, the guaguas (buses) and tram are an affordable and practical alternative for reaching most tourist destinations.</p>

<h3>TITSA Buses</h3>
<p><strong>TITSA</strong> is Tenerife's road transport company. It operates over 100 routes covering the whole island. The buses are modern, air-conditioned and wheelchair accessible.</p>
<ul>
<li><strong>Main routes:</strong> line 110 connects the airports with Santa Cruz; line 111 links Santa Cruz with the tourist south; line 343 goes up to Teide from Puerto de la Cruz.</li>
<li><strong>Timetables:</strong> main lines operate from 6:00 to 23:00. At weekends there are night services in tourist areas.</li>
<li><strong>Prices:</strong> single ticket from 1.45 euros. The <strong>TenMás</strong> bus pass offers discounts of up to 50 per cent.</li>
</ul>

<h3>Tenerife Tram</h3>
<p>The tram connects <strong>Santa Cruz</strong> with <strong>La Laguna</strong> on two modern and efficient lines. It's the most comfortable way to travel between both cities, running every 5-10 minutes with stops at the main points of interest.</p>
<ul>
<li><strong>Line 1:</strong> Intercambiador Santa Cruz — La Trinidad (La Laguna). 25 minutes.</li>
<li><strong>Line 2:</strong> La Cuesta — Tíncer. Connection with the university area.</li>
<li><strong>Price:</strong> 1.35 euros with TenMás card.</li>
</ul>

<h3>TenMás Card</h3>
<p>The <strong>TenMás</strong> card is essential if you plan to use public transport. Buy it at tram stations and TITSA points for 2 euros and top it up with any amount. It offers significant discounts per trip on both buses and tram.</p>

<h3>Getting Around Tips</h3>
<ul>
<li>Download the TITSA app to check timetables and routes in real time</li>
<li>The airports are well connected by direct bus to tourist areas</li>
<li>To reach Teide by public transport, plan an early departure</li>
<li>In rural areas like Anaga or Masca, frequencies are limited — check timetables</li>
</ul>`,
    },
    category_id: CAT.experiences,
    tags: ['transport', 'buses', 'practical'],
    image_url: 'https://images.unsplash.com/photo-1449965408869-ebd13bc9e5d8?w=1200&q=80',
  },

  // 10. Mejores chiringuitos de Tenerife
  {
    slug: 'mejores-chiringuitos-tenerife',
    title: {
      es: 'Mejores chiringuitos de Tenerife',
      en: 'Best Beach Bars in Tenerife',
    },
    excerpt: {
      es: 'Los mejores chiringuitos y beach bars de Tenerife: cócteles con vistas al mar, tapas canarias y ambiente relajado en la costa.',
      en: 'The best chiringuitos and beach bars in Tenerife: cocktails with sea views, Canarian tapas and a relaxed coastal vibe.',
    },
    content: {
      es: `<h2>Mejores chiringuitos de Tenerife</h2>
<p>No hay nada como disfrutar de un buen cóctel o unas tapas con los pies casi en la arena y el sonido del Atlántico de fondo. Tenerife cuenta con chiringuitos y beach bars para todos los gustos, desde locales sencillos junto al mar hasta beach clubs con DJs y piscina. Aquí tienes los que no te puedes perder.</p>

<h3>Sur de Tenerife</h3>
<ul>
<li><strong>Coqueluche Beach Club (La Caleta):</strong> el beach club más exclusivo del sur. Tumbonas frente al océano, cócteles de autor y carta de tapas gourmet. Ambiente sofisticado con música chill. Reserva con antelación.</li>
<li><strong>Monkey Beach Club (Playa de Troya):</strong> ambiente joven y animado con música en vivo, mojitos y pizzas junto al mar. Perfecto para atardeceres con fiesta.</li>
<li><strong>La Caleta Beach Bar:</strong> chiringuito tradicional en el pueblo pesquero de La Caleta. Pescado fresco a la plancha, papas arrugadas y cerveza fría con vistas al mar.</li>
<li><strong>El Chiringuito de El Médano:</strong> junto a la playa de El Médano, ambiente surfero y relajado. Smoothies, açaí bowls y tapas saludables.</li>
</ul>

<h3>Norte de Tenerife</h3>
<ul>
<li><strong>Chiringuito Playa Jardín (Puerto de la Cruz):</strong> en la icónica playa de arena negra diseñada por Manrique. Tapas canarias, sangría y vistas al Teide en días claros.</li>
<li><strong>Bamboo Beach Bar (Bajamar):</strong> pequeño chiringuito con encanto junto a las piscinas naturales. Cócteles artesanales y tostadas con aguacate.</li>
</ul>

<h3>Beach clubs con estilo</h3>
<p>Para una experiencia más premium, los <strong>beach clubs</strong> de Costa Adeje ofrecen camas balinesas, servicio de camarero en la piscina y carta gastronómica elaborada. Los más populares son <strong>Annapurna</strong> en el Hotel Jardín Tropical y <strong>Bahía Beach Club</strong> en Bahía del Duque.</p>

<h3>Consejos</h3>
<ul>
<li>Los chiringuitos del sur son más turísticos; los del norte más auténticos</li>
<li>En verano y fines de semana, llega temprano para conseguir buena mesa</li>
<li>Los precios varían mucho: desde 3 euros una cerveza hasta 15 euros un cóctel premium</li>
<li>Muchos chiringuitos solo aceptan efectivo, lleva dinero suelto</li>
</ul>`,

      en: `<h2>Best Beach Bars in Tenerife</h2>
<p>There's nothing quite like enjoying a good cocktail or some tapas with your feet almost in the sand and the sound of the Atlantic in the background. Tenerife has beach bars for every taste, from simple seaside spots to beach clubs with DJs and pools. Here are the ones you can't miss.</p>

<h3>South Tenerife</h3>
<ul>
<li><strong>Coqueluche Beach Club (La Caleta):</strong> the most exclusive beach club in the south. Sun loungers facing the ocean, signature cocktails and a gourmet tapas menu. Sophisticated atmosphere with chill music. Book ahead.</li>
<li><strong>Monkey Beach Club (Playa de Troya):</strong> a young, lively atmosphere with live music, mojitos and pizzas by the sea. Perfect for sunset parties.</li>
<li><strong>La Caleta Beach Bar:</strong> a traditional chiringuito in the fishing village of La Caleta. Fresh grilled fish, papas arrugadas and cold beer with sea views.</li>
<li><strong>El Chiringuito de El Médano:</strong> beside El Médano beach, with a surfer vibe and relaxed feel. Smoothies, açaí bowls and healthy tapas.</li>
</ul>

<h3>North Tenerife</h3>
<ul>
<li><strong>Chiringuito Playa Jardín (Puerto de la Cruz):</strong> on the iconic black sand beach designed by Manrique. Canarian tapas, sangria and views of Teide on clear days.</li>
<li><strong>Bamboo Beach Bar (Bajamar):</strong> a small, charming beach bar beside the natural pools. Craft cocktails and avocado toast.</li>
</ul>

<h3>Stylish Beach Clubs</h3>
<p>For a more premium experience, the <strong>beach clubs</strong> of Costa Adeje offer Balinese daybeds, poolside waiter service and an elaborate food menu. The most popular are <strong>Annapurna</strong> at Hotel Jardín Tropical and <strong>Bahía Beach Club</strong> at Bahía del Duque.</p>

<h3>Tips</h3>
<ul>
<li>Southern beach bars are more touristy; northern ones more authentic</li>
<li>In summer and at weekends, arrive early to get a good table</li>
<li>Prices vary widely: from 3 euros for a beer to 15 euros for a premium cocktail</li>
<li>Many chiringuitos only accept cash — bring change</li>
</ul>`,
    },
    category_id: CAT.food,
    tags: ['beach-bars', 'chiringuitos', 'food'],
    image_url: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200&q=80',
  },
];

async function main() {
  console.log('Inserting batch 5b: 5 blog articles...\n');

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

  console.log('\nBatch 5b done!');
}

main();
