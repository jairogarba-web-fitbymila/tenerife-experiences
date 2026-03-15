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
  // 11. Snorkel en Tenerife
  {
    slug: 'snorkel-tenerife-mejores-spots',
    title: {
      es: 'Snorkel en Tenerife: los mejores spots',
      en: 'Snorkeling in Tenerife: The Best Spots',
    },
    excerpt: {
      es: 'Los mejores lugares para hacer snorkel en Tenerife: tortugas marinas, peces tropicales, cuevas submarinas y aguas cristalinas todo el año.',
      en: 'The best snorkelling spots in Tenerife: sea turtles, tropical fish, underwater caves and crystal-clear waters year-round.',
    },
    content: {
      es: `<h2>Snorkel en Tenerife: los mejores spots</h2>
<p>Las aguas de Tenerife son un paraíso para el snorkel. Con temperaturas entre 19 y 25 grados durante todo el año, visibilidad que supera los 30 metros y una biodiversidad marina sorprendente, la isla ofrece algunos de los mejores puntos de snorkel de Europa. Desde tortugas marinas en la costa sur hasta cuevas volcánicas submarinas, cada inmersión es una aventura.</p>

<h3>Mejores spots del sur</h3>
<ul>
<li><strong>El Puertito de Armeñime:</strong> el spot más famoso para nadar con tortugas marinas verdes. Las tortugas se acercan a la orilla para alimentarse de las algas. Agua cristalina y poca profundidad. Llega temprano para evitar aglomeraciones.</li>
<li><strong>Palm-Mar:</strong> cala protegida con aguas tranquilas ideales para principiantes. Tortugas, rayas y peces ángel son habituales. Acceso fácil desde el paseo marítimo.</li>
<li><strong>Playa de Abades:</strong> antiguo lazareto con fondos rocosos volcánicos llenos de vida. Pulpos, morenas, sargos y erizos de mar. Aguas generalmente calmadas.</li>
<li><strong>La Caleta (Costa Adeje):</strong> bahía natural con fondo de roca volcánica. Fácil acceso y buena visibilidad. Excelente para ver peces loro y trompeteros.</li>
</ul>

<h3>Mejores spots del norte</h3>
<ul>
<li><strong>Piscinas naturales de Garachico:</strong> piscinas formadas por lava volcánica con pequeños peces y cangrejos. Seguro y divertido para toda la familia.</li>
<li><strong>Radazul:</strong> cerca de Santa Cruz, este spot es favorito de los locales. Cuevas submarinas, barracudas y vida marina abundante. Algo de corriente, para snorkelistas con experiencia.</li>
</ul>

<h3>Qué puedes ver</h3>
<p>La fauna marina de Tenerife incluye <strong>tortugas verdes y boba</strong>, <strong>rayas</strong>, <strong>pulpos</strong>, <strong>morenas</strong>, <strong>peces trompeta</strong>, <strong>sargos</strong>, <strong>viejas</strong> (el pez local más emblemático), <strong>barracudas</strong> y ocasionalmente <strong>mantas raya</strong> y <strong>angelotes</strong> (tiburones ángel).</p>

<h3>Consejos prácticos</h3>
<ul>
<li>Usa máscara con tubo seco para mayor comodidad</li>
<li>Lleva escarpines: las rocas volcánicas son cortantes</li>
<li>Las mañanas ofrecen mejor visibilidad y menos oleaje</li>
<li>No toques ni persigas a las tortugas: es ilegal y las estresa</li>
<li>Aplica protector solar biodegradable para proteger el ecosistema</li>
</ul>`,

      en: `<h2>Snorkelling in Tenerife: The Best Spots</h2>
<p>Tenerife's waters are a snorkelling paradise. With temperatures between 19 and 25 degrees year-round, visibility exceeding 30 metres and surprising marine biodiversity, the island offers some of the best snorkelling in Europe. From sea turtles off the south coast to underwater volcanic caves, every dip is an adventure.</p>

<h3>Best Southern Spots</h3>
<ul>
<li><strong>El Puertito de Armeñime:</strong> the most famous spot for swimming with green sea turtles. The turtles come close to shore to feed on algae. Crystal-clear water and shallow depth. Arrive early to avoid crowds.</li>
<li><strong>Palm-Mar:</strong> a sheltered cove with calm waters ideal for beginners. Turtles, rays and angelfish are regular visitors. Easy access from the promenade.</li>
<li><strong>Playa de Abades:</strong> a former quarantine site with volcanic rocky seabeds teeming with life. Octopus, moray eels, bream and sea urchins. Generally calm waters.</li>
<li><strong>La Caleta (Costa Adeje):</strong> a natural bay with volcanic rock seabed. Easy access and good visibility. Excellent for seeing parrotfish and trumpetfish.</li>
</ul>

<h3>Best Northern Spots</h3>
<ul>
<li><strong>Garachico natural pools:</strong> pools formed by volcanic lava with small fish and crabs. Safe and fun for the whole family.</li>
<li><strong>Radazul:</strong> near Santa Cruz, this spot is a local favourite. Underwater caves, barracudas and abundant marine life. Some current — for experienced snorkellers.</li>
</ul>

<h3>What You Can See</h3>
<p>Tenerife's marine life includes <strong>green and loggerhead turtles</strong>, <strong>rays</strong>, <strong>octopus</strong>, <strong>moray eels</strong>, <strong>trumpetfish</strong>, <strong>bream</strong>, <strong>parrotfish</strong> (the most emblematic local fish), <strong>barracudas</strong> and occasionally <strong>manta rays</strong> and <strong>angel sharks</strong>.</p>

<h3>Practical Tips</h3>
<ul>
<li>Use a mask with a dry snorkel for extra comfort</li>
<li>Wear water shoes — volcanic rocks are sharp</li>
<li>Mornings offer better visibility and less swell</li>
<li>Do not touch or chase turtles — it's illegal and stresses them</li>
<li>Apply biodegradable sunscreen to protect the ecosystem</li>
</ul>`,
    },
    category_id: CAT.experiences,
    tags: ['snorkel', 'underwater'],
    image_url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80',
  },

  // 12. Tenerife en invierno
  {
    slug: 'tenerife-invierno-que-hacer',
    title: {
      es: 'Tenerife en invierno: por qué es el mejor destino',
      en: "Tenerife in Winter: Why It's the Best Destination",
    },
    excerpt: {
      es: 'Descubre por qué Tenerife es el destino perfecto en invierno: clima de 20 grados, avistamiento de ballenas, carnaval y precios más bajos.',
      en: 'Discover why Tenerife is the perfect winter destination: 20-degree weather, whale watching, carnival and lower prices.',
    },
    content: {
      es: `<h2>Tenerife en invierno: por qué es el mejor destino</h2>
<p>Mientras Europa se congela bajo cielos grises, Tenerife disfruta de temperaturas primaverales entre 18 y 24 grados. La isla canaria es el refugio perfecto para escapar del frío invernal, con sol abundante, actividades al aire libre y algunos atractivos que solo se pueden disfrutar en esta época del año. Además, los precios son más bajos que en verano y hay menos masificación.</p>

<h3>El clima en invierno</h3>
<p>El sur de Tenerife registra una media de <strong>22 grados</strong> en enero y febrero, con días soleados y apenas lluvia. El norte es algo más fresco y húmedo, pero igualmente agradable. La temperatura del mar se mantiene entre <strong>19 y 20 grados</strong>, perfecta para bañarse. A mayor altitud, el Teide puede tener nieve en su cumbre, ofreciendo el contraste único de playa y montaña nevada el mismo día.</p>

<h3>Qué hacer en invierno</h3>
<ul>
<li><strong>Avistamiento de ballenas:</strong> entre noviembre y marzo aumentan las posibilidades de ver rorcuales y cachalotes además de los delfines y calderones residentes.</li>
<li><strong>Carnaval de Santa Cruz:</strong> en febrero, el segundo carnaval más famoso del mundo llena las calles de música, disfraces y fiesta durante dos semanas.</li>
<li><strong>Senderismo:</strong> las temperaturas suaves hacen del invierno la mejor época para caminar por Anaga, el Teide y los barrancos del norte sin sufrir el calor.</li>
<li><strong>Almendros en flor:</strong> en enero y febrero, los almendros de Santiago del Teide florecen creando un paisaje rosa y blanco espectacular.</li>
<li><strong>Surf:</strong> el oleaje invernal del norte trae las mejores olas del año a playas como El Socorro y Punta Blanca.</li>
</ul>

<h3>Ventajas prácticas</h3>
<ul>
<li>Vuelos más baratos desde Europa: ofertas desde 30-50 euros ida</li>
<li>Hoteles con descuentos fuera de Navidad y Carnaval</li>
<li>Menos turistas en las atracciones principales</li>
<li>Días con 7-8 horas de luz solar efectiva</li>
</ul>

<h3>Qué llevar en la maleta</h3>
<p>Ropa ligera para el día, una chaqueta para las noches y las zonas de montaña, bañador para la playa y calzado de senderismo si piensas hacer rutas. Un chubasquero ligero por si acaso en el norte.</p>`,

      en: `<h2>Tenerife in Winter: Why It's the Best Destination</h2>
<p>While Europe freezes under grey skies, Tenerife enjoys spring-like temperatures between 18 and 24 degrees. The Canary Island is the perfect refuge from the winter cold, with abundant sunshine, outdoor activities and some attractions that can only be enjoyed at this time of year. Plus, prices are lower than summer and there are fewer crowds.</p>

<h3>Winter Weather</h3>
<p>South Tenerife averages <strong>22 degrees</strong> in January and February, with sunny days and barely any rain. The north is slightly cooler and wetter, but still pleasant. Sea temperature stays between <strong>19 and 20 degrees</strong>, perfect for swimming. At higher altitudes, Teide may have snow on its summit, offering the unique contrast of beach and snow-capped mountain on the same day.</p>

<h3>What to Do in Winter</h3>
<ul>
<li><strong>Whale watching:</strong> between November and March the chances of seeing fin whales and sperm whales increase, alongside the resident dolphins and pilot whales.</li>
<li><strong>Santa Cruz Carnival:</strong> in February, the world's second most famous carnival fills the streets with music, costumes and festivities for two weeks.</li>
<li><strong>Hiking:</strong> mild temperatures make winter the best time to walk through Anaga, Teide and the northern ravines without suffering the heat.</li>
<li><strong>Almond blossom:</strong> in January and February, the almond trees of Santiago del Teide bloom, creating a spectacular pink and white landscape.</li>
<li><strong>Surfing:</strong> the northern winter swell brings the best waves of the year to beaches like El Socorro and Punta Blanca.</li>
</ul>

<h3>Practical Advantages</h3>
<ul>
<li>Cheaper flights from Europe: deals from 30-50 euros one way</li>
<li>Hotel discounts outside Christmas and Carnival</li>
<li>Fewer tourists at the main attractions</li>
<li>Days with 7-8 hours of effective sunlight</li>
</ul>

<h3>What to Pack</h3>
<p>Light clothing for the day, a jacket for evenings and mountain areas, swimwear for the beach and hiking boots if you plan to do trails. A light rain jacket just in case for the north.</p>`,
    },
    category_id: CAT.experiences,
    tags: ['winter', 'weather', 'seasonal'],
    image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
  },

  // 13. Los 10 pueblos más bonitos de Tenerife
  {
    slug: 'pueblos-bonitos-tenerife',
    title: {
      es: 'Los 10 pueblos más bonitos de Tenerife',
      en: 'The 10 Most Beautiful Villages in Tenerife',
    },
    excerpt: {
      es: 'Descubre los pueblos con más encanto de Tenerife: Garachico, Masca, La Orotava, Icod y más joyas escondidas fuera del circuito turístico.',
      en: 'Discover the most charming villages in Tenerife: Garachico, Masca, La Orotava, Icod and more hidden gems off the tourist trail.',
    },
    content: {
      es: `<h2>Los 10 pueblos más bonitos de Tenerife</h2>
<p>Más allá de las zonas turísticas, Tenerife esconde pueblos con siglos de historia, arquitectura canaria tradicional y un encanto que invita a perderse por sus calles empedradas. Desde aldeas de montaña rodeadas de barrancos hasta villas costeras con puertos pesqueros, estos son los 10 pueblos que no puedes dejar de visitar.</p>

<h3>1. Garachico</h3>
<p>Antiguo puerto principal de Tenerife, destruido parcialmente por una erupción volcánica en 1706. Hoy sus <strong>piscinas naturales de El Caletón</strong>, formadas por la lava, son un atractivo único. El casco histórico conserva palacios, iglesias y plazas con encanto colonial.</p>

<h3>2. Masca</h3>
<p>Pueblo de montaña encaramado en un barranco a 650 metros de altitud. Las vistas son espectaculares y el acceso por carretera es una aventura en sí misma. Punto de inicio de la ruta del <strong>Barranco de Masca</strong>.</p>

<h3>3. La Orotava</h3>
<p>Villa señorial con los balcones de madera más fotografiados de Canarias. Visita la <strong>Casa de los Balcones</strong>, los jardines Victoria y el casco histórico declarado Conjunto Histórico-Artístico.</p>

<h3>4. San Cristóbal de La Laguna</h3>
<p><strong>Patrimonio de la Humanidad</strong> por la UNESCO. La antigua capital de Tenerife conserva un trazado urbano renacentista único con palacios, conventos y una vibrante vida universitaria.</p>

<h3>5. Icod de los Vinos</h3>
<p>Famoso por el <strong>Drago Milenario</strong>, el árbol más antiguo de su especie. Casco histórico con bodegas tradicionales donde degustar vinos locales.</p>

<h3>6. Vilaflor</h3>
<p>El pueblo más alto de España a 1.400 metros. Aire puro, pinos canarios y punto de partida para rutas al Teide. Famoso por sus <strong>paisajes lunares</strong>.</p>

<h3>7. Candelaria</h3>
<p>Centro de peregrinación con la <strong>Basílica de la Virgen de Candelaria</strong>, patrona de Canarias. Las estatuas de los menceyes guanches custodian la plaza frente al mar.</p>

<h3>8. Tegueste</h3>
<p>Pueblo agrícola rodeado de viñedos con una ruta de guachinches auténtica. Perfecto para degustar <strong>vino del país</strong> y cocina casera canaria.</p>

<h3>9. El Sauzal</h3>
<p>Encaramado en un acantilado al norte con vistas al Teide. Visita la <strong>Casa del Vino</strong> y sus miradores. Ambiente tranquilo y verde.</p>

<h3>10. Güímar</h3>
<p>Conocido por las <strong>Pirámides de Güímar</strong> y su valle fértil. Un pueblo auténtico alejado del turismo de masas con fiestas populares llenas de tradición.</p>`,

      en: `<h2>The 10 Most Beautiful Villages in Tenerife</h2>
<p>Beyond the tourist zones, Tenerife hides villages with centuries of history, traditional Canarian architecture and a charm that invites you to wander their cobbled streets. From mountain hamlets surrounded by ravines to coastal towns with fishing harbours, these are the 10 villages you must visit.</p>

<h3>1. Garachico</h3>
<p>Tenerife's former main port, partially destroyed by a volcanic eruption in 1706. Today its <strong>El Caletón natural pools</strong>, formed by lava, are a unique attraction. The historic centre preserves palaces, churches and charming colonial squares.</p>

<h3>2. Masca</h3>
<p>A mountain village perched in a ravine at 650 metres altitude. The views are spectacular and the road access is an adventure in itself. Starting point for the <strong>Masca Ravine</strong> trail.</p>

<h3>3. La Orotava</h3>
<p>A stately town with the most photographed wooden balconies in the Canaries. Visit the <strong>Casa de los Balcones</strong>, the Victoria Gardens and the historic centre declared a Historic-Artistic Site.</p>

<h3>4. San Cristóbal de La Laguna</h3>
<p>A <strong>UNESCO World Heritage Site</strong>. Tenerife's former capital preserves a unique Renaissance urban layout with palaces, convents and a vibrant university life.</p>

<h3>5. Icod de los Vinos</h3>
<p>Famous for the <strong>Millennial Dragon Tree</strong>, the oldest tree of its species. Historic centre with traditional wineries where you can taste local wines.</p>

<h3>6. Vilaflor</h3>
<p>Spain's highest village at 1,400 metres. Pure air, Canarian pines and a starting point for Teide trails. Famous for its <strong>lunar landscapes</strong>.</p>

<h3>7. Candelaria</h3>
<p>A pilgrimage centre with the <strong>Basilica of the Virgin of Candelaria</strong>, patron saint of the Canaries. Guanche mencey statues guard the seaside square.</p>

<h3>8. Tegueste</h3>
<p>An agricultural village surrounded by vineyards with an authentic guachinche route. Perfect for tasting <strong>local wine</strong> and traditional Canarian home cooking.</p>

<h3>9. El Sauzal</h3>
<p>Perched on a cliff in the north with views of Teide. Visit the <strong>Casa del Vino</strong> and its viewpoints. A peaceful, green setting.</p>

<h3>10. Güímar</h3>
<p>Known for the <strong>Pyramids of Güímar</strong> and its fertile valley. An authentic village away from mass tourism with traditional popular festivals.</p>`,
    },
    category_id: CAT.culture,
    tags: ['villages', 'historic', 'beautiful'],
    image_url: 'https://images.unsplash.com/photo-1677496549362-056a628cc7b3?w=1200&q=80',
  },

  // 14. Cómo llegar a Tenerife
  {
    slug: 'como-llegar-tenerife-vuelos',
    title: {
      es: 'Cómo llegar a Tenerife: vuelos y ferris',
      en: 'How to Get to Tenerife: Flights and Ferries',
    },
    excerpt: {
      es: 'Guía práctica para llegar a Tenerife: aeropuertos, aerolíneas, vuelos baratos, ferris entre islas y consejos para encontrar las mejores ofertas.',
      en: 'Practical guide to getting to Tenerife: airports, airlines, cheap flights, inter-island ferries and tips for finding the best deals.',
    },
    content: {
      es: `<h2>Cómo llegar a Tenerife: vuelos y ferris</h2>
<p>Tenerife es una de las islas mejor conectadas del Atlántico. Con dos aeropuertos internacionales y conexiones marítimas regulares, llegar a la isla es fácil y cada vez más económico. Aquí tienes toda la información práctica que necesitas para planificar tu viaje.</p>

<h3>Los dos aeropuertos</h3>
<ul>
<li><strong>Tenerife Sur (TFS - Reina Sofía):</strong> el aeropuerto principal para vuelos internacionales y chárter. Situado en el sur de la isla, cerca de las zonas turísticas de Costa Adeje, Los Cristianos y Playa de las Américas. Recibe vuelos de toda Europa.</li>
<li><strong>Tenerife Norte (TFN - Los Rodeos):</strong> principalmente para vuelos nacionales y conexiones interinsulares. Más cerca de Santa Cruz y La Laguna. Vuelos frecuentes desde Madrid, Barcelona y las demás islas Canarias.</li>
</ul>

<h3>Aerolíneas y vuelos baratos</h3>
<p>Las principales aerolíneas que operan a Tenerife incluyen:</p>
<ul>
<li><strong>Low cost:</strong> Ryanair, Vueling, EasyJet, Jet2 y Wizz Air con vuelos desde 20-50 euros desde España y Europa.</li>
<li><strong>Tradicionales:</strong> Iberia, British Airways, Lufthansa, TUI y Condor con conexiones directas desde las principales capitales.</li>
<li><strong>Interinsulares:</strong> Binter y Canaryfly conectan Tenerife con el resto de islas Canarias en vuelos de 30-50 minutos.</li>
</ul>

<h3>Ferris entre islas</h3>
<p>Si ya estás en Canarias o quieres vivir la experiencia marítima, los ferris son una opción excelente:</p>
<ul>
<li><strong>Fred Olsen:</strong> ferris rápidos desde Gran Canaria (80 min), La Gomera (50 min) y La Palma (2,5 h). Cómodos y puntuales.</li>
<li><strong>Naviera Armas:</strong> alternativa más económica con rutas similares y servicio de transporte de vehículos.</li>
<li><strong>Puertos:</strong> Los Cristianos conecta con La Gomera y El Hierro; Santa Cruz con Gran Canaria y La Palma.</li>
</ul>

<h3>Consejos para encontrar vuelos baratos</h3>
<ul>
<li>Reserva con 2-3 meses de antelación para mejores precios</li>
<li>Los martes y miércoles suelen ser los días más baratos para volar</li>
<li>Evita Navidad, Semana Santa y agosto para las tarifas más altas</li>
<li>Usa comparadores como Skyscanner o Google Flights y activa alertas de precio</li>
<li>Volar a Tenerife Norte suele ser más barato desde ciudades españolas</li>
</ul>`,

      en: `<h2>How to Get to Tenerife: Flights and Ferries</h2>
<p>Tenerife is one of the best-connected islands in the Atlantic. With two international airports and regular maritime connections, getting to the island is easy and increasingly affordable. Here's all the practical information you need to plan your trip.</p>

<h3>The Two Airports</h3>
<ul>
<li><strong>Tenerife South (TFS - Reina Sofía):</strong> the main airport for international and charter flights. Located in the south of the island, near the tourist areas of Costa Adeje, Los Cristianos and Playa de las Américas. It receives flights from across Europe.</li>
<li><strong>Tenerife North (TFN - Los Rodeos):</strong> mainly for domestic flights and inter-island connections. Closer to Santa Cruz and La Laguna. Frequent flights from Madrid, Barcelona and the other Canary Islands.</li>
</ul>

<h3>Airlines and Cheap Flights</h3>
<p>The main airlines operating to Tenerife include:</p>
<ul>
<li><strong>Low cost:</strong> Ryanair, Vueling, EasyJet, Jet2 and Wizz Air with flights from 20-50 euros from Spain and Europe.</li>
<li><strong>Traditional:</strong> Iberia, British Airways, Lufthansa, TUI and Condor with direct connections from major capitals.</li>
<li><strong>Inter-island:</strong> Binter and Canaryfly connect Tenerife with the rest of the Canary Islands in 30-50 minute flights.</li>
</ul>

<h3>Inter-Island Ferries</h3>
<p>If you're already in the Canaries or want the maritime experience, ferries are an excellent option:</p>
<ul>
<li><strong>Fred Olsen:</strong> fast ferries from Gran Canaria (80 min), La Gomera (50 min) and La Palma (2.5 h). Comfortable and punctual.</li>
<li><strong>Naviera Armas:</strong> a more affordable alternative with similar routes and vehicle transport service.</li>
<li><strong>Ports:</strong> Los Cristianos connects with La Gomera and El Hierro; Santa Cruz with Gran Canaria and La Palma.</li>
</ul>

<h3>Tips for Finding Cheap Flights</h3>
<ul>
<li>Book 2-3 months ahead for better prices</li>
<li>Tuesdays and Wednesdays tend to be the cheapest days to fly</li>
<li>Avoid Christmas, Easter and August for the highest fares</li>
<li>Use comparison sites like Skyscanner or Google Flights and set price alerts</li>
<li>Flying to Tenerife North is often cheaper from Spanish cities</li>
</ul>`,
    },
    category_id: CAT.experiences,
    tags: ['flights', 'transport', 'practical'],
    image_url: 'https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=1200&q=80',
  },

  // 15. Spa y wellness en Tenerife
  {
    slug: 'spa-wellness-tenerife',
    title: {
      es: 'Spa y wellness en Tenerife: los mejores centros',
      en: 'Spa & Wellness in Tenerife: The Best Centers',
    },
    excerpt: {
      es: 'Los mejores spas y centros de wellness en Tenerife: circuitos termales, masajes canarios, talasoterapia y retiros de bienestar.',
      en: 'The best spas and wellness centres in Tenerife: thermal circuits, Canarian massages, thalassotherapy and wellbeing retreats.',
    },
    content: {
      es: `<h2>Spa y wellness en Tenerife: los mejores centros</h2>
<p>Tenerife es un destino ideal para el bienestar y la relajación. La combinación de clima subtropical, paisajes volcánicos, aguas atlánticas y la tranquilidad de la isla crea el escenario perfecto para desconectar. La oferta de spas y centros de wellness ha crecido enormemente, desde lujosos circuitos termales en hoteles cinco estrellas hasta retiros holísticos en la montaña.</p>

<h3>Spas de hotel de lujo</h3>
<ul>
<li><strong>Spa Ritz-Carlton Abama:</strong> más de 2.500 metros cuadrados de spa con piscinas termales, sauna, hammam y cabinas de tratamiento con vistas al Atlántico. Productos de cosmética natural canaria. Uno de los mejores spas de Europa.</li>
<li><strong>Spa Bahía del Duque:</strong> spa Thalasso con agua de mar calentada, circuito de hidroterapia y tratamientos inspirados en las tradiciones canarias. Jardines zen para meditar.</li>
<li><strong>Spa GF Victoria:</strong> spa panorámico en la azotea con vistas al océano. Piscina climatizada, jacuzzis y tratamientos de pareja. Relación calidad-precio excelente.</li>
</ul>

<h3>Centros de talasoterapia</h3>
<p>La <strong>talasoterapia</strong> aprovecha los beneficios del agua de mar, las algas y el clima marino. En Tenerife, varios centros ofrecen circuitos completos con piscinas de agua salada a diferentes temperaturas, chorros, camas de burbujas y envolturas de algas. El <strong>Aqua Club Termal</strong> en Costa Adeje es uno de los más populares.</p>

<h3>Retiros de bienestar</h3>
<ul>
<li><strong>Retiros de yoga en el norte:</strong> fincas rurales en Anaga y el Valle de La Orotava ofrecen retiros de yoga y meditación de 3 a 7 días con alimentación vegetariana.</li>
<li><strong>Terapias volcánicas:</strong> algunos centros utilizan piedras volcánicas calientes y arcilla del Teide en masajes y tratamientos faciales.</li>
<li><strong>Baños de bosque:</strong> paseos guiados de shinrin-yoku por el bosque de laurisilva de Anaga para reducir el estrés.</li>
</ul>

<h3>Consejos</h3>
<ul>
<li>Reserva tratamientos con antelación, especialmente en temporada alta</li>
<li>Muchos spas de hotel permiten el acceso a no huéspedes por un suplemento</li>
<li>Combina un día de spa con una ruta de senderismo para una experiencia completa</li>
<li>Los precios de circuitos termales van desde 30 a 100 euros por persona</li>
</ul>`,

      en: `<h2>Spa & Wellness in Tenerife: The Best Centres</h2>
<p>Tenerife is an ideal destination for wellbeing and relaxation. The combination of subtropical climate, volcanic landscapes, Atlantic waters and the island's tranquillity creates the perfect setting for switching off. The range of spas and wellness centres has grown enormously, from luxurious thermal circuits in five-star hotels to holistic mountain retreats.</p>

<h3>Luxury Hotel Spas</h3>
<ul>
<li><strong>Spa Ritz-Carlton Abama:</strong> over 2,500 square metres of spa with thermal pools, sauna, hammam and treatment rooms overlooking the Atlantic. Natural Canarian cosmetic products. One of the best spas in Europe.</li>
<li><strong>Spa Bahía del Duque:</strong> a thalasso spa with heated seawater, a hydrotherapy circuit and treatments inspired by Canarian traditions. Zen gardens for meditation.</li>
<li><strong>Spa GF Victoria:</strong> a rooftop panoramic spa with ocean views. Heated pool, jacuzzis and couples' treatments. Excellent value for money.</li>
</ul>

<h3>Thalassotherapy Centres</h3>
<p><strong>Thalassotherapy</strong> harnesses the benefits of seawater, algae and the marine climate. In Tenerife, several centres offer full circuits with saltwater pools at different temperatures, jets, bubble beds and seaweed wraps. <strong>Aqua Club Termal</strong> in Costa Adeje is one of the most popular.</p>

<h3>Wellness Retreats</h3>
<ul>
<li><strong>Yoga retreats in the north:</strong> rural estates in Anaga and the Orotava Valley offer 3 to 7-day yoga and meditation retreats with vegetarian meals.</li>
<li><strong>Volcanic therapies:</strong> some centres use hot volcanic stones and Teide clay in massage and facial treatments.</li>
<li><strong>Forest bathing:</strong> guided shinrin-yoku walks through the Anaga laurel forest to reduce stress.</li>
</ul>

<h3>Tips</h3>
<ul>
<li>Book treatments in advance, especially in peak season</li>
<li>Many hotel spas allow non-guest access for a supplement</li>
<li>Combine a spa day with a hiking trail for a complete experience</li>
<li>Thermal circuit prices range from 30 to 100 euros per person</li>
</ul>`,
    },
    category_id: CAT.wellness,
    tags: ['spa', 'wellness', 'relax'],
    image_url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80',
  },
];

async function main() {
  console.log('Inserting batch 6a: 5 blog articles...\n');

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

  console.log('\nBatch 6a done!');
}

main();
