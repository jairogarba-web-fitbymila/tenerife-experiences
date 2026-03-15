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
  // 6. Los mejores atardeceres de Tenerife
  {
    slug: 'mejores-atardeceres-tenerife',
    title: {
      es: 'Los mejores atardeceres de Tenerife',
      en: 'The Best Sunsets in Tenerife',
    },
    excerpt: {
      es: 'Descubre los mejores miradores y playas de Tenerife para contemplar atardeceres espectaculares. Guía con ubicaciones exactas y consejos fotográficos.',
      en: 'Discover the best viewpoints and beaches in Tenerife for spectacular sunsets. Guide with exact locations and photography tips.',
    },
    content: {
      es: `<h2>Los mejores atardeceres de Tenerife: dónde verlos</h2>
<p>Tenerife ofrece algunos de los atardeceres más espectaculares de Europa. La combinación de su posición atlántica, los acantilados volcánicos, la presencia del Teide y las capas de nubes a media altura crean un lienzo natural que cada tarde se pinta de colores imposibles. Aquí tienes los mejores spots para disfrutar de la puesta de sol.</p>

<h3>Costa oeste: los atardeceres más dramáticos</h3>
<ul>
<li><strong>Faro de Teno:</strong> el punto más occidental de Tenerife. El sol se hunde directamente en el océano entre los acantilados de Los Gigantes y la isla de La Gomera al fondo. Acceso en coche limitado, consulta horarios del control de acceso.</li>
<li><strong>Acantilados de Los Gigantes:</strong> desde el puerto deportivo o desde un barco, las paredes de 600 metros se tiñen de naranja y rosa. Una experiencia inolvidable si navegas al atardecer.</li>
<li><strong>Playa de la Arena (Santiago del Teide):</strong> pequeña playa de arena negra orientada al oeste, perfecta para ver el sol desaparecer tras La Gomera.</li>
</ul>

<h3>Sur de la isla</h3>
<ul>
<li><strong>Playa de La Tejita:</strong> la playa natural más larga de Tenerife al pie de la Montaña Roja. Atardeceres dorados sobre arena fina con un ambiente tranquilo y salvaje.</li>
<li><strong>Costa Adeje (La Caleta):</strong> los restaurantes del paseo marítimo ofrecen cenas con vistas directas a la puesta de sol. Ideal para combinar gastronomía y paisaje.</li>
<li><strong>Golf del Sur:</strong> vistas abiertas al Atlántico desde los paseos costeros, con poca afluencia turística.</li>
</ul>

<h3>Desde las alturas</h3>
<ul>
<li><strong>Mirador del Teide:</strong> ver el atardecer desde más de 2.000 metros de altitud es una experiencia sobrenatural. La sombra del Teide se proyecta sobre el mar de nubes creando un fenómeno único.</li>
<li><strong>Mirador de Cherfe:</strong> en la carretera de Masca, con vistas panorámicas del barranco y la costa oeste.</li>
<li><strong>Mirador de Jardina:</strong> en Anaga, con vistas a Santa Cruz y el Teide al fondo.</li>
</ul>

<h3>Consejos para fotografiar atardeceres</h3>
<ul>
<li>Llega al menos 30 minutos antes de la puesta de sol para encontrar tu posición</li>
<li>Los mejores colores aparecen 10-15 minutos después de que el sol desaparezca</li>
<li>Usa un trípode para exposiciones largas con el mar en movimiento</li>
<li>Las nubes parciales suelen dar los atardeceres más espectaculares</li>
</ul>`,

      en: `<h2>The Best Sunsets in Tenerife: Where to Watch Them</h2>
<p>Tenerife offers some of the most spectacular sunsets in Europe. The combination of its Atlantic position, volcanic cliffs, the presence of Mount Teide and mid-level cloud layers create a natural canvas that is painted in impossible colours every evening. Here are the best spots to enjoy the sunset.</p>

<h3>West Coast: The Most Dramatic Sunsets</h3>
<ul>
<li><strong>Teno Lighthouse:</strong> the westernmost point of Tenerife. The sun sinks directly into the ocean between the Los Gigantes cliffs with La Gomera island in the background. Car access is limited — check access control times.</li>
<li><strong>Los Gigantes Cliffs:</strong> from the marina or from a boat, the 600-metre walls turn orange and pink. An unforgettable experience if you sail at sunset.</li>
<li><strong>Playa de la Arena (Santiago del Teide):</strong> a small west-facing black sand beach, perfect for watching the sun vanish behind La Gomera.</li>
</ul>

<h3>South of the Island</h3>
<ul>
<li><strong>Playa de La Tejita:</strong> the longest natural beach on Tenerife at the foot of Montaña Roja. Golden sunsets over fine sand in a calm, wild setting.</li>
<li><strong>Costa Adeje (La Caleta):</strong> seafront restaurants offer dinners with direct sunset views. Perfect for combining gastronomy and scenery.</li>
<li><strong>Golf del Sur:</strong> open Atlantic views from coastal paths, with fewer tourists.</li>
</ul>

<h3>From the Heights</h3>
<ul>
<li><strong>Teide Viewpoint:</strong> watching the sunset from over 2,000 metres altitude is a surreal experience. The shadow of Teide is cast over the sea of clouds, creating a unique phenomenon.</li>
<li><strong>Mirador de Cherfe:</strong> on the road to Masca, with panoramic views of the ravine and the west coast.</li>
<li><strong>Mirador de Jardina:</strong> in Anaga, with views of Santa Cruz and Teide in the background.</li>
</ul>

<h3>Tips for Photographing Sunsets</h3>
<ul>
<li>Arrive at least 30 minutes before sunset to find your spot</li>
<li>The best colours appear 10-15 minutes after the sun disappears</li>
<li>Use a tripod for long exposures with the sea in motion</li>
<li>Partial cloud cover often produces the most spectacular sunsets</li>
</ul>`,
    },
    category_id: CAT.nature,
    tags: ['sunset', 'photography'],
    image_url: 'https://images.unsplash.com/photo-1506368387824-6cf9848c1638?w=1200&q=80',
  },

  // 7. Tenerife accesible: guía para movilidad reducida
  {
    slug: 'tenerife-accesible-movilidad-reducida',
    title: {
      es: 'Tenerife accesible: guía para movilidad reducida',
      en: 'Accessible Tenerife: Guide for Reduced Mobility',
    },
    excerpt: {
      es: 'Guía práctica de Tenerife para personas con movilidad reducida: playas accesibles, transporte adaptado, hoteles y actividades inclusivas.',
      en: 'Practical guide to Tenerife for people with reduced mobility: accessible beaches, adapted transport, hotels and inclusive activities.',
    },
    content: {
      es: `<h2>Tenerife accesible: guía completa para movilidad reducida</h2>
<p>Tenerife ha avanzado enormemente en accesibilidad durante los últimos años, convirtiéndose en uno de los destinos más inclusivos de las Islas Canarias. La isla cuenta con playas adaptadas, transporte público accesible, hoteles preparados y actividades diseñadas para que todos puedan disfrutar de sus maravillas naturales y culturales.</p>

<h3>Playas accesibles</h3>
<ul>
<li><strong>Playa de Las Teresitas:</strong> rampa de acceso, pasarelas de madera, sillas anfibias gratuitas y servicio de asistencia en verano. Arena dorada y aguas tranquilas.</li>
<li><strong>Playa de Troya (Costa Adeje):</strong> totalmente adaptada con duchas accesibles, aseos adaptados y sillas anfibias. Bandera azul.</li>
<li><strong>Playa del Duque:</strong> acceso sin barreras, servicio de silla anfibia con reserva previa en el puesto de Cruz Roja.</li>
<li><strong>Playa de Los Cristianos:</strong> paseo marítimo accesible y servicios completos de baño adaptado durante todo el año.</li>
</ul>

<h3>Transporte adaptado</h3>
<p>El <strong>tranvía de Tenerife</strong> es totalmente accesible, con rampas automáticas y espacios reservados en todos los vagones. Las <strong>guaguas (autobuses) de TITSA</strong> cuentan con flota adaptada y plataformas elevadoras. Para desplazamientos más flexibles, varias empresas ofrecen <strong>taxis adaptados</strong> y <strong>alquiler de coches con adaptaciones</strong>. El teleférico del Teide también es accesible para sillas de ruedas.</p>

<h3>Alojamiento accesible</h3>
<ul>
<li>La mayoría de hoteles de 4 y 5 estrellas disponen de habitaciones adaptadas</li>
<li>Solicita siempre la habitación adaptada al reservar y confirma las medidas específicas</li>
<li>Cadenas como GF Hotels, Iberostar y Bahía Príncipe destacan por su accesibilidad</li>
<li>Algunos apartamentos turísticos también ofrecen opciones adaptadas en planta baja</li>
</ul>

<h3>Actividades inclusivas</h3>
<ul>
<li><strong>Avistamiento de cetáceos:</strong> varios catamaranes del sur son accesibles para sillas de ruedas</li>
<li><strong>Loro Parque:</strong> completamente adaptado con recorridos sin barreras</li>
<li><strong>Siam Park:</strong> servicio de asistencia y algunas atracciones adaptadas</li>
<li><strong>Buceo adaptado:</strong> centros especializados ofrecen inmersiones para personas con discapacidad</li>
<li><strong>Senderismo adaptado:</strong> rutas como el sendero de los Sentidos en Anaga tienen tramos accesibles</li>
</ul>

<h3>Recursos útiles</h3>
<p>La oficina de turismo de Tenerife ofrece información actualizada sobre accesibilidad. El teléfono de atención es gratuito y pueden orientarte sobre servicios adaptados en cada zona de la isla.</p>`,

      en: `<h2>Accessible Tenerife: Complete Guide for Reduced Mobility</h2>
<p>Tenerife has made enormous progress in accessibility in recent years, becoming one of the most inclusive destinations in the Canary Islands. The island has adapted beaches, accessible public transport, prepared hotels and activities designed so that everyone can enjoy its natural and cultural wonders.</p>

<h3>Accessible Beaches</h3>
<ul>
<li><strong>Playa de Las Teresitas:</strong> access ramp, wooden walkways, free amphibious chairs and assistance service in summer. Golden sand and calm waters.</li>
<li><strong>Playa de Troya (Costa Adeje):</strong> fully adapted with accessible showers, adapted toilets and amphibious chairs. Blue Flag beach.</li>
<li><strong>Playa del Duque:</strong> barrier-free access, amphibious chair service with advance booking at the Red Cross post.</li>
<li><strong>Playa de Los Cristianos:</strong> accessible promenade and complete adapted bathing services year-round.</li>
</ul>

<h3>Adapted Transport</h3>
<p>The <strong>Tenerife tram</strong> is fully accessible, with automatic ramps and reserved spaces in all carriages. <strong>TITSA buses</strong> have an adapted fleet with lifting platforms. For more flexible travel, several companies offer <strong>adapted taxis</strong> and <strong>car hire with adaptations</strong>. The Teide cable car is also wheelchair accessible.</p>

<h3>Accessible Accommodation</h3>
<ul>
<li>Most 4 and 5-star hotels have adapted rooms</li>
<li>Always request the adapted room when booking and confirm specific dimensions</li>
<li>Chains such as GF Hotels, Iberostar and Bahía Príncipe stand out for accessibility</li>
<li>Some holiday apartments also offer adapted ground-floor options</li>
</ul>

<h3>Inclusive Activities</h3>
<ul>
<li><strong>Whale watching:</strong> several catamarans in the south are wheelchair accessible</li>
<li><strong>Loro Parque:</strong> fully adapted with barrier-free routes</li>
<li><strong>Siam Park:</strong> assistance service and some adapted attractions</li>
<li><strong>Adapted diving:</strong> specialised centres offer dives for people with disabilities</li>
<li><strong>Adapted hiking:</strong> trails such as the Sendero de los Sentidos in Anaga have accessible sections</li>
</ul>

<h3>Useful Resources</h3>
<p>The Tenerife tourism office offers updated accessibility information. Their helpline is free and they can guide you on adapted services in each area of the island.</p>`,
    },
    category_id: CAT.experiences,
    tags: ['accessible', 'disability'],
    image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
  },

  // 8. Parques naturales de Tenerife
  {
    slug: 'parques-naturales-tenerife',
    title: {
      es: 'Parques naturales de Tenerife: guía completa',
      en: 'Natural Parks in Tenerife: Complete Guide',
    },
    excerpt: {
      es: 'Guía de todos los parques naturales de Tenerife: Teide, Anaga, Teno y Corona Forestal. Rutas de senderismo, flora endémica y consejos prácticos.',
      en: 'Guide to all natural parks in Tenerife: Teide, Anaga, Teno and Corona Forestal. Hiking trails, endemic flora and practical tips.',
    },
    content: {
      es: `<h2>Parques naturales de Tenerife: guía completa</h2>
<p>Tenerife es mucho más que sol y playa. Casi la mitad de su superficie está protegida bajo alguna figura medioambiental, lo que la convierte en un paraíso para los amantes de la naturaleza. La isla alberga un parque nacional, un parque rural, una reserva de la biosfera y varios paisajes protegidos con ecosistemas únicos en el mundo.</p>

<h3>Parque Nacional del Teide</h3>
<p>Es el parque nacional más visitado de Europa y Patrimonio de la Humanidad por la UNESCO. A más de 2.000 metros de altitud, el paisaje volcánico recuerda a otro planeta: coladas de lava, formaciones rocosas y el imponente cono del Teide (3.718 m). Rutas imprescindibles:</p>
<ul>
<li><strong>Roques de García:</strong> ruta circular de 3,5 km que rodea las formaciones rocosas más emblemáticas. Dificultad baja.</li>
<li><strong>Montaña Blanca al Teide:</strong> ascenso exigente de 8 km hasta el pico. Necesitas permiso gratuito del parque.</li>
<li><strong>Sendero de Siete Cañadas:</strong> 9 km por el fondo de la caldera, paisaje lunar espectacular.</li>
</ul>

<h3>Parque Rural de Anaga</h3>
<p>Declarado Reserva de la Biosfera por la UNESCO, el macizo de Anaga alberga uno de los últimos bosques de <strong>laurisilva</strong> del planeta, una reliquia de la era terciaria. La niebla envuelve los árboles centenarios creando un ambiente mágico. Rutas destacadas:</p>
<ul>
<li><strong>Sendero de los Sentidos:</strong> ruta fácil y accesible por el bosque de laurisilva. 1,5 km.</li>
<li><strong>Cruz del Carmen a Punta del Hidalgo:</strong> 12 km de descenso entre bosque y caseríos tradicionales.</li>
<li><strong>Chamorga a Roque Bermejo:</strong> ruta costera con playa aislada al final. 10 km ida y vuelta.</li>
</ul>

<h3>Parque Rural de Teno</h3>
<p>En el extremo noroeste, Teno ofrece paisajes agrestes con acantilados vertiginosos, barrancos profundos y el pueblo aislado de Masca. La carretera que baja a Masca es una experiencia en sí misma, con curvas entre montañas cubiertas de vegetación.</p>

<h3>Corona Forestal</h3>
<p>El mayor espacio protegido de Canarias rodea al Parque Nacional del Teide como un cinturón verde de <strong>pino canario</strong>. Sus bosques son ideales para senderismo, ciclismo de montaña y observación de aves. El aire puro y el aroma a pino hacen de este parque un refugio perfecto.</p>

<h3>Consejos prácticos</h3>
<ul>
<li>Lleva calzado de montaña adecuado y protección solar</li>
<li>En Anaga y Teno, las carreteras son estrechas y sinuosas: conduce con precaución</li>
<li>El permiso para subir al pico del Teide debe solicitarse con semanas de antelación</li>
<li>Lleva agua y comida suficiente, no hay tiendas en los parques</li>
</ul>`,

      en: `<h2>Natural Parks in Tenerife: Complete Guide</h2>
<p>Tenerife is much more than sun and beach. Nearly half of its surface is under some form of environmental protection, making it a paradise for nature lovers. The island is home to a national park, a rural park, a biosphere reserve and several protected landscapes with ecosystems found nowhere else on Earth.</p>

<h3>Teide National Park</h3>
<p>It is Europe's most visited national park and a UNESCO World Heritage Site. At over 2,000 metres altitude, the volcanic landscape resembles another planet: lava flows, rock formations and the imposing Teide cone (3,718 m). Essential hikes:</p>
<ul>
<li><strong>Roques de García:</strong> a 3.5 km circular trail around the most emblematic rock formations. Low difficulty.</li>
<li><strong>Montaña Blanca to Teide:</strong> a demanding 8 km ascent to the peak. Free park permit required.</li>
<li><strong>Siete Cañadas Trail:</strong> 9 km across the caldera floor, spectacular lunar landscape.</li>
</ul>

<h3>Anaga Rural Park</h3>
<p>Declared a UNESCO Biosphere Reserve, the Anaga massif is home to one of the last <strong>laurel forests</strong> on the planet, a relic from the Tertiary era. Mist envelops centuries-old trees creating a magical atmosphere. Recommended trails:</p>
<ul>
<li><strong>Sendero de los Sentidos:</strong> an easy, accessible trail through the laurel forest. 1.5 km.</li>
<li><strong>Cruz del Carmen to Punta del Hidalgo:</strong> 12 km descent through forest and traditional hamlets.</li>
<li><strong>Chamorga to Roque Bermejo:</strong> a coastal trail with a secluded beach at the end. 10 km return.</li>
</ul>

<h3>Teno Rural Park</h3>
<p>At the far northwest, Teno offers rugged landscapes with vertiginous cliffs, deep ravines and the isolated village of Masca. The road down to Masca is an experience in itself, with hairpin bends between vegetation-covered mountains.</p>

<h3>Corona Forestal</h3>
<p>The largest protected area in the Canary Islands surrounds Teide National Park like a green belt of <strong>Canarian pine</strong>. Its forests are ideal for hiking, mountain biking and birdwatching. The pure air and scent of pine make this park a perfect retreat.</p>

<h3>Practical Tips</h3>
<ul>
<li>Wear proper hiking boots and sun protection</li>
<li>In Anaga and Teno, roads are narrow and winding — drive carefully</li>
<li>The permit to climb Teide peak must be requested weeks in advance</li>
<li>Bring enough water and food — there are no shops in the parks</li>
</ul>`,
    },
    category_id: CAT.nature,
    tags: ['parks', 'nature', 'hiking'],
    image_url: 'https://images.unsplash.com/photo-1626033005784-e6c39eaa0669?w=1200&q=80',
  },

  // 9. Excursiones en barco en Tenerife
  {
    slug: 'excursiones-barco-tenerife',
    title: {
      es: 'Excursiones en barco en Tenerife: todas las opciones',
      en: 'Boat Trips in Tenerife: All Options',
    },
    excerpt: {
      es: 'Guía completa de excursiones en barco en Tenerife: catamaranes, avistamiento de ballenas, kayak y navegación privada. Precios y recomendaciones.',
      en: 'Complete guide to boat trips in Tenerife: catamarans, whale watching, kayaking and private sailing. Prices and recommendations.',
    },
    content: {
      es: `<h2>Excursiones en barco en Tenerife: todas las opciones</h2>
<p>Las excursiones en barco son una de las actividades más populares de Tenerife y con razón. La costa suroeste de la isla es uno de los mejores lugares de Europa para avistar cetáceos en libertad, con poblaciones residentes de calderones tropicales y delfines mulares que se pueden observar durante todo el año.</p>

<h3>Avistamiento de cetáceos</h3>
<p>Entre Los Gigantes y Los Cristianos se concentra una de las mayores poblaciones de cetáceos del Atlántico. Lo que hace especial a Tenerife es que estos animales son <strong>residentes permanentes</strong>, lo que garantiza avistamientos en más del 95 por ciento de las salidas.</p>
<ul>
<li><strong>Calderones tropicales (pilot whales):</strong> presentes todo el año en grupos familiares</li>
<li><strong>Delfines mulares:</strong> los más juguetones, a menudo nadan junto a los barcos</li>
<li><strong>Delfines moteados:</strong> frecuentes en primavera y verano</li>
<li><strong>Ballenas (rorcuales, cachalotes):</strong> avistamientos ocasionales, más probables entre noviembre y marzo</li>
</ul>

<h3>Tipos de excursiones</h3>
<ul>
<li><strong>Catamarán con comida (2-3 horas):</strong> la opción más popular. Navegación con avistamiento, baño en el mar, comida y barra libre incluidas. Desde 55-75 euros por adulto.</li>
<li><strong>Barco pequeño ecológico (2 horas):</strong> grupos reducidos de máximo 10 personas para una experiencia más íntima y respetuosa. Desde 40-60 euros.</li>
<li><strong>Velero privado (3-4 horas):</strong> para grupos de hasta 8-10 personas. Experiencia exclusiva con patrón. Desde 400-600 euros el barco completo.</li>
<li><strong>Lancha rápida a Los Gigantes (1,5 horas):</strong> visita la base de los acantilados con emoción. Desde 30 euros.</li>
<li><strong>Kayak con avistamiento:</strong> rema por la costa de Los Gigantes con posibilidad de ver cetáceos desde el agua. Desde 35 euros.</li>
</ul>

<h3>Desde dónde salen los barcos</h3>
<ul>
<li><strong>Puerto Colón (Costa Adeje):</strong> la mayor concentración de oferta, con decenas de empresas</li>
<li><strong>Los Gigantes:</strong> punto de partida ideal para ver los acantilados de cerca</li>
<li><strong>Los Cristianos:</strong> menos opciones pero buenas alternativas económicas</li>
<li><strong>Puerto de la Cruz:</strong> excursiones por la costa norte, menos frecuentes pero diferentes</li>
</ul>

<h3>Consejos prácticos</h3>
<ul>
<li>Reserva online con antelación para conseguir mejores precios</li>
<li>Si te mareas, toma biodramina una hora antes y siéntate en la parte trasera del barco</li>
<li>Lleva protector solar, gorra y calzado que se pueda mojar</li>
<li>Las salidas de la mañana suelen tener el mar más calmado</li>
</ul>`,

      en: `<h2>Boat Trips in Tenerife: All the Options</h2>
<p>Boat trips are one of the most popular activities in Tenerife, and for good reason. The island's southwest coast is one of the best places in Europe to spot cetaceans in the wild, with resident populations of pilot whales and bottlenose dolphins that can be seen all year round.</p>

<h3>Whale and Dolphin Watching</h3>
<p>Between Los Gigantes and Los Cristianos lies one of the largest cetacean populations in the Atlantic. What makes Tenerife special is that these animals are <strong>permanent residents</strong>, guaranteeing sightings on over 95 per cent of outings.</p>
<ul>
<li><strong>Pilot whales:</strong> present year-round in family groups</li>
<li><strong>Bottlenose dolphins:</strong> the most playful, often swimming alongside boats</li>
<li><strong>Spotted dolphins:</strong> frequent in spring and summer</li>
<li><strong>Whales (fin whales, sperm whales):</strong> occasional sightings, more likely between November and March</li>
</ul>

<h3>Types of Excursions</h3>
<ul>
<li><strong>Catamaran with food (2-3 hours):</strong> the most popular option. Sailing with whale watching, sea swimming, food and open bar included. From 55-75 euros per adult.</li>
<li><strong>Small eco boat (2 hours):</strong> small groups of up to 10 people for a more intimate and respectful experience. From 40-60 euros.</li>
<li><strong>Private sailboat (3-4 hours):</strong> for groups of up to 8-10 people. Exclusive experience with skipper. From 400-600 euros for the whole boat.</li>
<li><strong>Speedboat to Los Gigantes (1.5 hours):</strong> visit the base of the cliffs with a thrill. From 30 euros.</li>
<li><strong>Kayak with whale watching:</strong> paddle along the Los Gigantes coast with the chance to see cetaceans from the water. From 35 euros.</li>
</ul>

<h3>Where the Boats Depart From</h3>
<ul>
<li><strong>Puerto Colón (Costa Adeje):</strong> the largest concentration of operators, with dozens of companies</li>
<li><strong>Los Gigantes:</strong> ideal starting point for close-up cliff views</li>
<li><strong>Los Cristianos:</strong> fewer options but good budget alternatives</li>
<li><strong>Puerto de la Cruz:</strong> trips along the north coast, less frequent but different</li>
</ul>

<h3>Practical Tips</h3>
<ul>
<li>Book online in advance for better prices</li>
<li>If you get seasick, take motion sickness tablets an hour before and sit at the back of the boat</li>
<li>Bring sunscreen, a hat and shoes that can get wet</li>
<li>Morning departures usually have calmer seas</li>
</ul>`,
    },
    category_id: CAT.experiences,
    tags: ['boats', 'whale-watching', 'catamaran'],
    image_url: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=1200&q=80',
  },

  // 10. Vida nocturna en Tenerife
  {
    slug: 'vida-nocturna-tenerife-guia',
    title: {
      es: 'Vida nocturna en Tenerife: guía completa',
      en: 'Nightlife in Tenerife: Complete Guide',
    },
    excerpt: {
      es: 'Guía completa de la vida nocturna en Tenerife: las mejores zonas de fiesta, discotecas, bares con música en vivo y consejos para salir de noche.',
      en: 'Complete guide to nightlife in Tenerife: the best party areas, nightclubs, live music bars and tips for going out at night.',
    },
    content: {
      es: `<h2>Vida nocturna en Tenerife: guía completa para salir de noche</h2>
<p>La vida nocturna de Tenerife es tan variada como la propia isla. Desde los animados bares del sur turístico hasta los locales alternativos de Santa Cruz y La Laguna, pasando por las terrazas con cócteles frente al mar, Tenerife ofrece opciones para todos los gustos y edades. La noche canaria empieza tarde y termina al amanecer.</p>

<h3>Las mejores zonas de fiesta</h3>
<ul>
<li><strong>Playa de las Américas (Veronicas):</strong> la zona más conocida por su vida nocturna. Concentra decenas de bares, discotecas y locales internacionales en pocas calles. Ambiente joven y turístico, activo de jueves a domingo.</li>
<li><strong>La Laguna (El Cuadrilátero):</strong> la zona universitaria con los bares más auténticos y económicos. Ambiente canario, cervezas desde 1,50 euros y música variada. Mejor los jueves y viernes.</li>
<li><strong>Santa Cruz (La Noria y alrededores):</strong> bares de copas, locales de música en vivo y terrazas. Ambiente más adulto y sofisticado. Ideal para viernes y sábados.</li>
<li><strong>Costa Adeje:</strong> bares y restaurantes con música en vivo orientados al turismo de calidad. Cocktails con vistas al mar.</li>
<li><strong>Puerto de la Cruz:</strong> ambiente más tranquilo pero con buenos locales de música en vivo y bares tradicionales en el casco antiguo.</li>
</ul>

<h3>Discotecas y clubs</h3>
<ul>
<li><strong>Papagayo Beach Club (Playa de las Américas):</strong> el club más grande del sur con DJs internacionales, piscina y vistas al mar. Entrada desde 15 euros con consumición.</li>
<li><strong>Achaman (Santa Cruz):</strong> discoteca de referencia para los locales, con sesiones de música electrónica y reggaetón.</li>
<li><strong>Berlín (La Laguna):</strong> local de música indie, rock y alternativa. Ambiente universitario y precios económicos.</li>
</ul>

<h3>Bares con música en vivo</h3>
<p>Tenerife tiene una escena musical viva con bandas locales que tocan en directo varias noches a la semana. Busca <strong>jazz en el Hard Rock Café</strong> de Playa de las Américas, <strong>rock y blues</strong> en los bares de La Laguna, y <strong>música latina</strong> en los locales de salsa de Santa Cruz. Los fines de semana muchos restaurantes del sur también ofrecen actuaciones en directo.</p>

<h3>Consejos para la noche</h3>
<ul>
<li>La noche empieza tarde: los bares se animan a partir de las 23:00 y las discotecas a la 1:00</li>
<li>Los precios de las copas oscilan entre 5 y 12 euros según la zona</li>
<li>En Veronicas hay ofertas y promotores en la calle: compara antes de entrar</li>
<li>El taxi es la opción más segura para volver. Uber no opera en Tenerife</li>
<li>En Carnaval la noche es 24 horas: las fiestas callejeras no paran</li>
</ul>`,

      en: `<h2>Nightlife in Tenerife: Complete Guide to Going Out</h2>
<p>Tenerife's nightlife is as varied as the island itself. From the lively bars of the tourist south to the alternative venues of Santa Cruz and La Laguna, to seafront cocktail terraces, Tenerife offers options for all tastes and ages. The Canarian night starts late and ends at dawn.</p>

<h3>The Best Party Areas</h3>
<ul>
<li><strong>Playa de las Américas (Veronicas):</strong> the best-known nightlife area. It packs dozens of bars, clubs and international venues into a few streets. Young and touristy atmosphere, active Thursday to Sunday.</li>
<li><strong>La Laguna (El Cuadrilátero):</strong> the university area with the most authentic and affordable bars. Canarian atmosphere, beers from 1.50 euros and varied music. Best on Thursdays and Fridays.</li>
<li><strong>Santa Cruz (La Noria and surrounds):</strong> cocktail bars, live music venues and terraces. A more mature and sophisticated vibe. Ideal on Fridays and Saturdays.</li>
<li><strong>Costa Adeje:</strong> bars and restaurants with live music aimed at quality tourism. Cocktails with sea views.</li>
<li><strong>Puerto de la Cruz:</strong> a quieter atmosphere but with good live music venues and traditional bars in the old town.</li>
</ul>

<h3>Nightclubs and Clubs</h3>
<ul>
<li><strong>Papagayo Beach Club (Playa de las Américas):</strong> the biggest club in the south with international DJs, pool and sea views. Entry from 15 euros with one drink.</li>
<li><strong>Achaman (Santa Cruz):</strong> the go-to club for locals, with electronic and reggaeton sessions.</li>
<li><strong>Berlín (La Laguna):</strong> indie, rock and alternative music venue. University crowd and low prices.</li>
</ul>

<h3>Live Music Bars</h3>
<p>Tenerife has a vibrant music scene with local bands playing live several nights a week. Look for <strong>jazz at the Hard Rock Café</strong> in Playa de las Américas, <strong>rock and blues</strong> in La Laguna bars, and <strong>Latin music</strong> at Santa Cruz salsa venues. At weekends many restaurants in the south also host live performances.</p>

<h3>Tips for Going Out</h3>
<ul>
<li>The night starts late: bars get going from 23:00 and clubs from 1:00</li>
<li>Drink prices range from 5 to 12 euros depending on the area</li>
<li>In Veronicas there are deals and promoters on the street — compare before entering</li>
<li>Taxis are the safest option to get back. Uber does not operate in Tenerife</li>
<li>During Carnival the night is 24 hours: street parties never stop</li>
</ul>`,
    },
    category_id: CAT.nightlife,
    tags: ['nightlife', 'clubs', 'bars'],
    image_url: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=1200&q=80',
  },
];

async function main() {
  console.log('Inserting batch 4b: 5 blog articles...\n');

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

  console.log('\nBatch 4b done!');
}

main();
