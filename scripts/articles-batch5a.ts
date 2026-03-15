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
  // 1. Tenerife en 7 días: itinerario perfecto
  {
    slug: 'tenerife-7-dias-itinerario',
    title: {
      es: 'Tenerife en 7 días: itinerario perfecto',
      en: 'Tenerife in 7 Days: Perfect Itinerary',
    },
    excerpt: {
      es: 'Planifica tu semana perfecta en Tenerife con este itinerario día a día. Incluye norte, sur, Teide, playas y pueblos con encanto.',
      en: 'Plan your perfect week in Tenerife with this day-by-day itinerary. Includes north, south, Teide, beaches and charming villages.',
    },
    content: {
      es: `<h2>Tenerife en 7 días: el itinerario perfecto</h2>
<p>Una semana es el tiempo ideal para descubrir los tesoros de Tenerife. Esta isla canaria combina playas volcánicas, montañas impresionantes, pueblos con historia y una gastronomía excepcional. Te proponemos un itinerario día a día para que no te pierdas nada esencial.</p>

<h3>Día 1: Llegada y sur de Tenerife</h3>
<p>Instálate en tu alojamiento y explora la costa sur. Pasea por el <strong>paseo marítimo de Costa Adeje</strong>, relájate en la <strong>Playa del Duque</strong> y disfruta de una cena con vistas al mar en La Caleta. Si llegas temprano, una excursión en catamarán al atardecer es la mejor bienvenida.</p>

<h3>Día 2: Parque Nacional del Teide</h3>
<p>Dedica el día completo al <strong>Teide</strong>. Sube en coche por la TF-21 disfrutando del cambio de paisaje. Recorre los <strong>Roques de García</strong>, sube en teleférico y contempla las vistas desde 3.555 metros. Reserva el permiso del pico con antelación si quieres alcanzar la cima.</p>

<h3>Día 3: La Laguna y Anaga</h3>
<p>Visita <strong>San Cristóbal de La Laguna</strong>, Patrimonio de la Humanidad, con sus calles coloniales y mercado. Por la tarde, adéntrate en el <strong>bosque de Anaga</strong> y camina por el Sendero de los Sentidos entre la laurisilva milenaria.</p>

<h3>Día 4: Norte de la isla</h3>
<p>Explora <strong>Puerto de la Cruz</strong>, el <strong>Lago Martiánez</strong> y el casco histórico de La Orotava. Visita la <strong>Casa de los Balcones</strong> y el Jardín Botánico. Si te gustan los animales, dedica la tarde al <strong>Loro Parque</strong>.</p>

<h3>Día 5: Los Gigantes y Masca</h3>
<p>Conduce hasta <strong>Los Gigantes</strong> para ver los acantilados desde el mar. Baja al pueblo de <strong>Masca</strong> por una de las carreteras más espectaculares de Europa. Si estás en forma, haz la ruta del barranco de Masca hasta la playa.</p>

<h3>Día 6: Playas y relax</h3>
<p>Día libre para disfrutar de las mejores playas. <strong>Playa de La Tejita</strong> para los amantes de lo natural, <strong>Playa de las Teresitas</strong> para arena dorada o <strong>Siam Park</strong> si viajas en familia. Por la noche, cena en un guachinche del norte.</p>

<h3>Día 7: Compras y despedida</h3>
<p>Aprovecha la mañana para comprar <strong>mojo, gofio, vino canario y queso</strong> como souvenirs gastronómicos. Pasea por <strong>Santa Cruz</strong>, visita el Mercado de Nuestra Señora de África y despídete con un café en la Plaza de España.</p>`,

      en: `<h2>Tenerife in 7 Days: The Perfect Itinerary</h2>
<p>A week is the ideal time to discover the treasures of Tenerife. This Canary Island combines volcanic beaches, impressive mountains, historic villages and exceptional gastronomy. We propose a day-by-day itinerary so you don't miss anything essential.</p>

<h3>Day 1: Arrival and South Tenerife</h3>
<p>Settle into your accommodation and explore the southern coast. Stroll along the <strong>Costa Adeje promenade</strong>, relax at <strong>Playa del Duque</strong> and enjoy dinner with sea views in La Caleta. If you arrive early, a sunset catamaran trip is the best welcome.</p>

<h3>Day 2: Teide National Park</h3>
<p>Dedicate the whole day to <strong>Teide</strong>. Drive up via the TF-21 enjoying the changing landscape. Walk the <strong>Roques de García</strong>, take the cable car and enjoy views from 3,555 metres. Book the peak permit in advance if you want to reach the summit.</p>

<h3>Day 3: La Laguna and Anaga</h3>
<p>Visit <strong>San Cristóbal de La Laguna</strong>, a World Heritage Site, with its colonial streets and market. In the afternoon, head into the <strong>Anaga forest</strong> and walk the Sendero de los Sentidos through ancient laurel woodland.</p>

<h3>Day 4: North of the Island</h3>
<p>Explore <strong>Puerto de la Cruz</strong>, <strong>Lago Martiánez</strong> and the historic centre of La Orotava. Visit the <strong>Casa de los Balcones</strong> and the Botanical Garden. If you love animals, spend the afternoon at <strong>Loro Parque</strong>.</p>

<h3>Day 5: Los Gigantes and Masca</h3>
<p>Drive to <strong>Los Gigantes</strong> to see the cliffs from the sea. Descend to the village of <strong>Masca</strong> along one of Europe's most spectacular roads. If you're fit, hike the Masca ravine trail down to the beach.</p>

<h3>Day 6: Beaches and Relaxation</h3>
<p>A free day to enjoy the best beaches. <strong>Playa de La Tejita</strong> for nature lovers, <strong>Playa de las Teresitas</strong> for golden sand or <strong>Siam Park</strong> if travelling with family. In the evening, dine at a traditional guachinche in the north.</p>

<h3>Day 7: Shopping and Farewell</h3>
<p>Use the morning to buy <strong>mojo, gofio, Canarian wine and cheese</strong> as gastronomic souvenirs. Walk around <strong>Santa Cruz</strong>, visit the Mercado de Nuestra Señora de África and say goodbye with a coffee in Plaza de España.</p>`,
    },
    category_id: CAT.experiences,
    tags: ['itinerary', 'planning'],
    image_url: 'https://images.unsplash.com/photo-1506368387824-6cf9848c1638?w=1200&q=80',
  },

  // 2. Mejores hoteles del sur de Tenerife
  {
    slug: 'mejores-hoteles-tenerife-sur',
    title: {
      es: 'Mejores hoteles del sur de Tenerife',
      en: 'Best Hotels in South Tenerife',
    },
    excerpt: {
      es: 'Descubre los mejores hoteles del sur de Tenerife para cada presupuesto: lujo, todo incluido, boutique y opciones económicas en Costa Adeje y Los Cristianos.',
      en: 'Discover the best hotels in south Tenerife for every budget: luxury, all-inclusive, boutique and affordable options in Costa Adeje and Los Cristianos.',
    },
    content: {
      es: `<h2>Mejores hoteles del sur de Tenerife</h2>
<p>El sur de Tenerife es la zona turística por excelencia de la isla, con más de 300 días de sol al año y una amplia oferta hotelera. Desde resorts de lujo frente al mar hasta apartamentos con encanto, aquí encontrarás las mejores opciones para cada tipo de viajero y presupuesto.</p>

<h3>Hoteles de lujo</h3>
<ul>
<li><strong>The Ritz-Carlton Abama:</strong> el hotel más exclusivo de Tenerife, con campo de golf, playa privada, restaurante con estrella Michelin y spa de clase mundial. Situado en Guía de Isora con vistas a La Gomera.</li>
<li><strong>Royal Hideaway Corales Resort:</strong> diseño vanguardista en La Caleta con suites frente al océano, piscina infinity y gastronomía de autor. Solo adultos.</li>
<li><strong>Bahía del Duque:</strong> un clásico del lujo canario en Costa Adeje. Arquitectura colonial, jardines tropicales y acceso directo a la Playa del Duque.</li>
</ul>

<h3>Todo incluido</h3>
<ul>
<li><strong>GF Victoria:</strong> en la primera línea de Costa Adeje con piscinas panorámicas, spa y todo incluido de calidad superior.</li>
<li><strong>Iberostar Selection Anthelia:</strong> resort familiar con actividades, piscinas y restaurantes temáticos. Directo a la playa de Fañabé.</li>
<li><strong>Hard Rock Hotel Tenerife:</strong> experiencia rock and roll con música en vivo, piscina de fiesta y servicio premium.</li>
</ul>

<h3>Opciones con encanto</h3>
<ul>
<li><strong>Hotel San Roque (Garachico):</strong> hotel boutique en una casona del siglo XVIII. Piscina con vistas y restaurante gourmet.</li>
<li><strong>Hotel Jardín Tropical:</strong> arquitectura balinesa en Costa Adeje rodeado de jardines exóticos. Ambiente tranquilo y elegante.</li>
</ul>

<h3>Consejos para reservar</h3>
<ul>
<li>Reserva con 2-3 meses de antelación para mejores precios</li>
<li>La temporada alta es diciembre-marzo y julio-agosto</li>
<li>Los hoteles de Costa Adeje son más exclusivos que los de Los Cristianos</li>
<li>Compara siempre el precio directo del hotel con las plataformas de reserva</li>
</ul>`,

      en: `<h2>Best Hotels in South Tenerife</h2>
<p>South Tenerife is the island's premier tourist area, with over 300 sunny days a year and a wide range of hotels. From luxury seafront resorts to charming apartments, here you'll find the best options for every type of traveller and budget.</p>

<h3>Luxury Hotels</h3>
<ul>
<li><strong>The Ritz-Carlton Abama:</strong> Tenerife's most exclusive hotel, with a golf course, private beach, Michelin-starred restaurant and world-class spa. Located in Guía de Isora with views of La Gomera.</li>
<li><strong>Royal Hideaway Corales Resort:</strong> cutting-edge design in La Caleta with ocean-facing suites, infinity pool and signature dining. Adults only.</li>
<li><strong>Bahía del Duque:</strong> a classic of Canarian luxury in Costa Adeje. Colonial architecture, tropical gardens and direct access to Playa del Duque.</li>
</ul>

<h3>All-Inclusive</h3>
<ul>
<li><strong>GF Victoria:</strong> on the Costa Adeje seafront with panoramic pools, spa and premium all-inclusive service.</li>
<li><strong>Iberostar Selection Anthelia:</strong> a family resort with activities, pools and themed restaurants. Direct beach access to Fañabé.</li>
<li><strong>Hard Rock Hotel Tenerife:</strong> rock and roll experience with live music, party pool and premium service.</li>
</ul>

<h3>Charming Options</h3>
<ul>
<li><strong>Hotel San Roque (Garachico):</strong> a boutique hotel in an 18th-century manor house. Pool with views and gourmet restaurant.</li>
<li><strong>Hotel Jardín Tropical:</strong> Balinese architecture in Costa Adeje surrounded by exotic gardens. A peaceful and elegant atmosphere.</li>
</ul>

<h3>Booking Tips</h3>
<ul>
<li>Book 2-3 months in advance for better prices</li>
<li>Peak season is December-March and July-August</li>
<li>Hotels in Costa Adeje are more upscale than those in Los Cristianos</li>
<li>Always compare the hotel's direct price with booking platforms</li>
</ul>`,
    },
    category_id: CAT.experiences,
    tags: ['hotels', 'south', 'accommodation'],
    image_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
  },

  // 3. Tenerife en 3 días: qué ver y hacer
  {
    slug: 'tenerife-3-dias-que-ver',
    title: {
      es: 'Tenerife en 3 días: qué ver y hacer',
      en: 'Tenerife in 3 Days: What to See',
    },
    excerpt: {
      es: 'Itinerario optimizado para ver lo mejor de Tenerife en solo 3 días: Teide, playas, pueblos y gastronomía canaria.',
      en: 'Optimised itinerary to see the best of Tenerife in just 3 days: Teide, beaches, villages and Canarian gastronomy.',
    },
    content: {
      es: `<h2>Tenerife en 3 días: qué ver y hacer</h2>
<p>Si solo tienes un fin de semana largo para visitar Tenerife, no te preocupes: con buena planificación puedes disfrutar de lo esencial. Este itinerario de 3 días te lleva por los imprescindibles de la isla, desde el volcán más alto de España hasta las playas más bonitas y los pueblos con más encanto.</p>

<h3>Día 1: El Teide y el centro de la isla</h3>
<p>Empieza temprano subiendo al <strong>Parque Nacional del Teide</strong>. Recorre la ruta circular de los <strong>Roques de García</strong> (1,5 horas, fácil) y sube en <strong>teleférico</strong> hasta la estación superior a 3.555 metros. Las vistas son impresionantes: en días claros se ven las demás islas Canarias. Baja después a <strong>Vilaflor</strong>, el pueblo más alto de España, y almuerza en un restaurante local.</p>

<h3>Día 2: Norte histórico y Anaga</h3>
<p>Conduce hasta <strong>La Laguna</strong>, la antigua capital, y pasea por sus calles empedradas llenas de palacios e iglesias. Toma un café en la <strong>Plaza del Adelantado</strong>. Continúa hasta el <strong>Mirador de Anaga</strong> y haz una ruta corta por el bosque de laurisilva. Después baja a <strong>Playa de las Teresitas</strong> para un baño en sus aguas cristalinas de arena dorada. Termina el día en <strong>Puerto de la Cruz</strong> cenando pescado fresco en el puerto.</p>

<h3>Día 3: Costa suroeste</h3>
<p>Dedica la mañana a una <strong>excursión en barco</strong> desde Puerto Colón para avistar delfines y calderones. Tras el paseo marítimo, relájate en la <strong>Playa del Duque</strong> o, si viajas en familia, pasa la tarde en <strong>Siam Park</strong>. Para cerrar tu viaje, conduce hasta <strong>Los Gigantes</strong> para ver los acantilados al atardecer y cena en uno de los restaurantes del puerto.</p>

<h3>Consejos rápidos</h3>
<ul>
<li>Alquila coche: es imprescindible para aprovechar el tiempo</li>
<li>Alójate en el sur para estar cerca del aeropuerto</li>
<li>Lleva ropa de abrigo para el Teide incluso en verano</li>
<li>Reserva el teleférico y las excursiones en barco con antelación</li>
</ul>`,

      en: `<h2>Tenerife in 3 Days: What to See and Do</h2>
<p>If you only have a long weekend to visit Tenerife, don't worry — with good planning you can enjoy the essentials. This 3-day itinerary takes you through the island's must-sees, from Spain's highest volcano to the most beautiful beaches and most charming villages.</p>

<h3>Day 1: Teide and the Centre of the Island</h3>
<p>Start early by heading up to <strong>Teide National Park</strong>. Walk the circular <strong>Roques de García</strong> trail (1.5 hours, easy) and take the <strong>cable car</strong> to the upper station at 3,555 metres. The views are breathtaking — on clear days you can see the other Canary Islands. Then head down to <strong>Vilaflor</strong>, Spain's highest village, and have lunch at a local restaurant.</p>

<h3>Day 2: Historic North and Anaga</h3>
<p>Drive to <strong>La Laguna</strong>, the former capital, and wander its cobbled streets lined with palaces and churches. Have a coffee in the <strong>Plaza del Adelantado</strong>. Continue to the <strong>Anaga viewpoint</strong> and take a short walk through the laurel forest. Then head down to <strong>Playa de las Teresitas</strong> for a swim in its crystal-clear, golden-sand waters. End the day in <strong>Puerto de la Cruz</strong> with fresh fish at the harbour.</p>

<h3>Day 3: Southwest Coast</h3>
<p>Spend the morning on a <strong>boat trip</strong> from Puerto Colón to spot dolphins and pilot whales. After the trip, relax at <strong>Playa del Duque</strong> or, if travelling with family, spend the afternoon at <strong>Siam Park</strong>. To close your trip, drive to <strong>Los Gigantes</strong> to watch the sunset over the cliffs and dine at one of the harbour restaurants.</p>

<h3>Quick Tips</h3>
<ul>
<li>Hire a car — it's essential to make the most of your time</li>
<li>Stay in the south to be close to the airport</li>
<li>Bring warm clothes for Teide even in summer</li>
<li>Book the cable car and boat trips in advance</li>
</ul>`,
    },
    category_id: CAT.experiences,
    tags: ['itinerary', 'short-trip'],
    image_url: 'https://images.unsplash.com/photo-1547234935-80c7145ec969?w=1200&q=80',
  },

  // 4. Playas de arena negra en Tenerife
  {
    slug: 'playas-arena-negra-tenerife',
    title: {
      es: 'Playas de arena negra en Tenerife',
      en: 'Black Sand Beaches in Tenerife',
    },
    excerpt: {
      es: 'Descubre las mejores playas de arena negra volcánica de Tenerife: Playa Jardín, Benijo, El Bollullo y muchas más con fotos y consejos.',
      en: 'Discover the best black volcanic sand beaches in Tenerife: Playa Jardín, Benijo, El Bollullo and many more with photos and tips.',
    },
    content: {
      es: `<h2>Playas de arena negra en Tenerife</h2>
<p>Las playas de arena negra son uno de los paisajes más icónicos de Tenerife. Formadas por la erosión de la roca volcánica durante millones de años, estas playas ofrecen un contraste espectacular entre la arena oscura, el azul del océano y el verde de la vegetación. Son una experiencia única que no encontrarás en destinos de playa convencionales.</p>

<h3>Norte de Tenerife</h3>
<ul>
<li><strong>Playa Jardín (Puerto de la Cruz):</strong> diseñada por César Manrique, esta playa urbana combina arena negra volcánica con jardines tropicales. Bien equipada con duchas, sombrillas y chiringuitos. Oleaje moderado, ideal para pasear.</li>
<li><strong>Playa de Benijo:</strong> en el remoto Parque de Anaga, una playa salvaje rodeada de acantilados con los roques de Benijo asomando del mar. Atardeceres mágicos. Sin servicios, lleva agua y comida.</li>
<li><strong>Playa del Bollullo:</strong> escondida tras un camino entre plataneras cerca de Puerto de la Cruz. Arena negra brillante, oleaje fuerte y un chiringuito con encanto. La bajada tiene escaleras pronunciadas.</li>
<li><strong>Playa de El Socorro (Los Realejos):</strong> muy popular entre surfistas por su oleaje constante. Arena negra gruesa y ambiente local auténtico.</li>
</ul>

<h3>Sur y oeste</h3>
<ul>
<li><strong>Playa de la Arena (Santiago del Teide):</strong> bandera azul y bandera negra ecológica. Arena negra fina con vistas a Los Gigantes y La Gomera. Servicios completos y aguas tranquilas.</li>
<li><strong>Playa de Los Guíos:</strong> al pie de los acantilados de Los Gigantes, una pequeña cala de arena volcánica con vistas impresionantes a las paredes de 600 metros.</li>
</ul>

<h3>Consejos para disfrutar de la arena negra</h3>
<ul>
<li>La arena negra absorbe más calor: lleva calzado para caminar en las horas centrales</li>
<li>Usa protector solar aunque esté nublado, la reflexión del agua es intensa</li>
<li>Las playas del norte suelen tener más oleaje que las del sur</li>
<li>Respeta las banderas de seguridad: las corrientes pueden ser fuertes</li>
</ul>`,

      en: `<h2>Black Sand Beaches in Tenerife</h2>
<p>Black sand beaches are one of Tenerife's most iconic landscapes. Formed by the erosion of volcanic rock over millions of years, these beaches offer a spectacular contrast between dark sand, the blue ocean and green vegetation. They are a unique experience you won't find at conventional beach destinations.</p>

<h3>North Tenerife</h3>
<ul>
<li><strong>Playa Jardín (Puerto de la Cruz):</strong> designed by César Manrique, this urban beach combines black volcanic sand with tropical gardens. Well equipped with showers, parasols and beach bars. Moderate waves, ideal for walking.</li>
<li><strong>Playa de Benijo:</strong> in the remote Anaga Park, a wild beach surrounded by cliffs with the Benijo sea stacks rising from the water. Magical sunsets. No facilities — bring water and food.</li>
<li><strong>Playa del Bollullo:</strong> hidden behind a path through banana plantations near Puerto de la Cruz. Shiny black sand, strong surf and a charming beach bar. The descent has steep stairs.</li>
<li><strong>Playa de El Socorro (Los Realejos):</strong> very popular among surfers for its consistent waves. Coarse black sand and an authentic local atmosphere.</li>
</ul>

<h3>South and West</h3>
<ul>
<li><strong>Playa de la Arena (Santiago del Teide):</strong> Blue Flag and ecological Black Flag beach. Fine black sand with views of Los Gigantes and La Gomera. Full facilities and calm waters.</li>
<li><strong>Playa de Los Guíos:</strong> at the foot of the Los Gigantes cliffs, a small volcanic sand cove with stunning views of the 600-metre walls.</li>
</ul>

<h3>Tips for Enjoying Black Sand</h3>
<ul>
<li>Black sand absorbs more heat — wear footwear for walking during midday hours</li>
<li>Use sunscreen even when cloudy; the water reflection is intense</li>
<li>Northern beaches tend to have stronger waves than southern ones</li>
<li>Respect safety flags — currents can be strong</li>
</ul>`,
    },
    category_id: CAT.beaches,
    tags: ['black-sand', 'volcanic', 'beaches'],
    image_url: 'https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=1200&q=80',
  },

  // 5. Kayak en Tenerife: mejores rutas
  {
    slug: 'kayak-tenerife-rutas',
    title: {
      es: 'Kayak en Tenerife: mejores rutas',
      en: 'Kayaking in Tenerife: Best Routes',
    },
    excerpt: {
      es: 'Las mejores rutas de kayak en Tenerife: Los Gigantes, avistamiento de tortugas, costa de Adeje y más. Precios, empresas y consejos prácticos.',
      en: 'The best kayaking routes in Tenerife: Los Gigantes, turtle spotting, Adeje coast and more. Prices, companies and practical tips.',
    },
    content: {
      es: `<h2>Kayak en Tenerife: las mejores rutas</h2>
<p>El kayak es una de las mejores formas de descubrir la costa de Tenerife desde una perspectiva única. Remar junto a acantilados volcánicos, avistar tortugas marinas y explorar calas escondidas son experiencias que hacen del kayak una actividad imprescindible en la isla. Las aguas cálidas y la costa protegida del suroeste ofrecen condiciones ideales durante todo el año.</p>

<h3>Rutas imprescindibles</h3>
<ul>
<li><strong>Los Gigantes en kayak:</strong> la ruta más espectacular. Rema al pie de los acantilados de 600 metros mientras el agua cristalina te permite ver el fondo marino. Es frecuente avistar delfines y tortugas. Duración: 2-3 horas. Desde 40 euros.</li>
<li><strong>Kayak con tortugas (Costa Adeje):</strong> la ruta más popular. Salida desde Playa de las Américas o Palm-Mar para remar hasta zonas donde las tortugas marinas se alimentan. Incluye parada para snorkel. Duración: 2 horas. Desde 35 euros.</li>
<li><strong>Costa de La Caleta:</strong> ruta tranquila ideal para principiantes. Aguas calmadas y calas pequeñas donde parar a bañarse. Posibilidad de ver rayas y peces tropicales. Duración: 1,5 horas. Desde 30 euros.</li>
<li><strong>Punta de Teno:</strong> para kayakistas experimentados. Rema por la costa salvaje del extremo noroeste con acantilados, cuevas marinas y aguas profundas. Solo con guía autorizado.</li>
</ul>

<h3>¿Qué incluyen las excursiones?</h3>
<p>La mayoría de empresas incluyen <strong>kayak doble o individual</strong>, chaleco salvavidas, instrucción básica, guía profesional y equipo de snorkel. Algunas ofrecen fotos y vídeos subacuáticos como extra. No necesitas experiencia previa para las rutas básicas.</p>

<h3>Consejos prácticos</h3>
<ul>
<li>Las salidas de mañana temprano tienen el mar más calmado y mejor visibilidad</li>
<li>Lleva protector solar resistente al agua, gorra y camiseta de protección UV</li>
<li>Usa calzado acuático para proteger los pies en las rocas volcánicas</li>
<li>Reserva con antelación en temporada alta, las plazas se agotan rápido</li>
<li>Si te mareas fácilmente, el kayak es mejor opción que el barco ya que vas más pegado al agua</li>
</ul>`,

      en: `<h2>Kayaking in Tenerife: The Best Routes</h2>
<p>Kayaking is one of the best ways to discover Tenerife's coastline from a unique perspective. Paddling alongside volcanic cliffs, spotting sea turtles and exploring hidden coves make kayaking an essential activity on the island. The warm waters and sheltered southwest coast offer ideal conditions year-round.</p>

<h3>Must-Do Routes</h3>
<ul>
<li><strong>Los Gigantes by kayak:</strong> the most spectacular route. Paddle beneath 600-metre cliffs while the crystal-clear water lets you see the seabed. Dolphin and turtle sightings are common. Duration: 2-3 hours. From 40 euros.</li>
<li><strong>Kayak with turtles (Costa Adeje):</strong> the most popular route. Depart from Playa de las Américas or Palm-Mar to paddle to areas where sea turtles feed. Includes a snorkelling stop. Duration: 2 hours. From 35 euros.</li>
<li><strong>La Caleta coast:</strong> a calm route ideal for beginners. Sheltered waters and small coves to stop for a swim. Chance to see rays and tropical fish. Duration: 1.5 hours. From 30 euros.</li>
<li><strong>Punta de Teno:</strong> for experienced kayakers. Paddle along the wild northwest coast with cliffs, sea caves and deep waters. Only with an authorised guide.</li>
</ul>

<h3>What's Included?</h3>
<p>Most companies include a <strong>double or single kayak</strong>, life jacket, basic instruction, professional guide and snorkelling gear. Some offer photos and underwater videos as extras. No prior experience is needed for basic routes.</p>

<h3>Practical Tips</h3>
<ul>
<li>Early morning departures have the calmest seas and best visibility</li>
<li>Bring waterproof sunscreen, a cap and a UV protection shirt</li>
<li>Wear aqua shoes to protect your feet on volcanic rocks</li>
<li>Book in advance during peak season — spots fill up quickly</li>
<li>If you get seasick easily, kayaking is a better option than boats as you're closer to the water</li>
</ul>`,
    },
    category_id: CAT.experiences,
    tags: ['kayak', 'water-sports'],
    image_url: 'https://images.unsplash.com/photo-1472745942893-4b9f730c7668?w=1200&q=80',
  },
];

async function main() {
  console.log('Inserting batch 5a: 5 blog articles...\n');

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

  console.log('\nBatch 5a done!');
}

main();
