import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://sqesgghvaazyajzjkoap.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxZXNnZ2h2YWF6eWFqemprb2FwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzUxMzgwOSwiZXhwIjoyMDg5MDg5ODA5fQ.UvbRfWU9seJPT9lyCyLmpD4uZrP9jXzsNoeSAjT9HnI'
);

const CAT = {
  nature: '56eb6a9a-7360-48ec-a1a0-a7a74bef61b5',
  experiences: '4af61632-1baa-457e-990e-e2e71a27def8',
  food: 'df3caffa-ef68-4b50-93f7-1a9edf1ae8ea',
};

const articles = [
  // 6. Piscinas naturales de Tenerife
  {
    slug: 'piscinas-naturales-tenerife',
    title: {
      es: 'Piscinas naturales de Tenerife: las mejores',
      en: 'Natural Pools in Tenerife: The Best Ones',
    },
    excerpt: {
      es: 'Descubre las mejores piscinas naturales de Tenerife: formaciones volcánicas donde bañarse con seguridad y disfrutar del océano sin oleaje.',
      en: 'Discover the best natural pools in Tenerife: volcanic formations where you can swim safely and enjoy the ocean without waves.',
    },
    content: {
      es: `<h2>Las mejores piscinas naturales de Tenerife</h2>
<p>La costa volcánica de Tenerife ha creado un fenómeno natural espectacular: piscinas de roca donde el océano Atlántico entra formando pozas de agua cristalina protegidas del oleaje. Son una alternativa perfecta a las playas, especialmente para familias con niños o personas que prefieren aguas más tranquilas.</p>

<h3>Norte de la isla</h3>
<ul>
<li><strong>El Caletón (Garachico):</strong> las más famosas de la isla, formadas por la erupción volcánica de 1706. Piscinas amplias con agua limpia, duchas y acceso gratuito. Imprescindibles.</li>
<li><strong>Charco del Viento (La Guancha):</strong> conjunto de piscinas naturales volcánicas escalonadas. Entorno salvaje y poco masificado. Acceso con escaleras de piedra.</li>
<li><strong>Piscinas de Bajamar:</strong> grandes piscinas naturales y semi-naturales con oleaje moderado. Cuentan con zonas para niños, duchas y socorrista en temporada.</li>
<li><strong>Punta del Hidalgo:</strong> piscinas naturales al final de la carretera, con vistas espectaculares a los Roques. Oleaje fuerte, para adultos experimentados.</li>
<li><strong>Charco de La Laja (San Juan de la Rambla):</strong> piscina natural amplia y bien acondicionada. Perfecta para familias. Aparcamiento cercano.</li>
</ul>

<h3>Noroeste</h3>
<ul>
<li><strong>Charco de Isla Baja (Los Silos):</strong> piscinas naturales tranquilas rodeadas de plataneras. Acceso fácil y ambiente relajado.</li>
<li><strong>Piscinas de El Pris (Tacoronte):</strong> pequeñas pozas naturales en un pueblo costero con encanto. Restaurantes de pescado fresco cerca.</li>
</ul>

<h3>Sur y este</h3>
<ul>
<li><strong>Charco de Jover (Tacoronte):</strong> piscinas poco conocidas con acceso escalonado al mar. Entorno virgen y pocos visitantes.</li>
<li><strong>Piscinas de Mesa del Mar:</strong> en Tacoronte, amplias y bien acondicionadas con bar y terraza. Ambiente local y familiar.</li>
</ul>

<h3>Consejos para visitar las piscinas naturales</h3>
<ul>
<li>Usa calzado acuático: las rocas volcánicas pueden ser resbaladizas y afiladas</li>
<li>Consulta el estado del mar antes de ir, especialmente en invierno</li>
<li>Lleva protección solar resistente al agua</li>
<li>Respeta las señales de peligro: algunas piscinas son inseguras con marejada</li>
<li>Llega temprano en verano para encontrar sitio</li>
<li>Lleva snorkel: la vida marina en las pozas es sorprendente</li>
</ul>

<h3>Mejor época</h3>
<p>Las piscinas naturales se pueden disfrutar todo el año gracias al clima de Tenerife, pero los meses de <strong>mayo a octubre</strong> ofrecen aguas más cálidas y mar más tranquilo. En invierno, el oleaje puede hacer inseguras algunas piscinas del norte.</p>`,

      en: `<h2>The Best Natural Pools in Tenerife</h2>
<p>Tenerife's volcanic coast has created a spectacular natural phenomenon: rock pools where the Atlantic Ocean flows in to form crystal-clear pools sheltered from the waves. They are a perfect alternative to beaches, especially for families with children or those who prefer calmer waters.</p>

<h3>North Coast</h3>
<ul>
<li><strong>El Caletón (Garachico):</strong> the most famous on the island, formed by the 1706 volcanic eruption. Spacious pools with clean water, showers and free access. An absolute must.</li>
<li><strong>Charco del Viento (La Guancha):</strong> a set of tiered volcanic rock pools. Wild setting and uncrowded. Access via stone steps.</li>
<li><strong>Bajamar Pools:</strong> large natural and semi-natural pools with moderate waves. Children's areas, showers and lifeguards in season.</li>
<li><strong>Punta del Hidalgo:</strong> natural pools at the end of the road with spectacular views of the sea stacks. Strong waves, best for experienced swimmers.</li>
<li><strong>Charco de La Laja (San Juan de la Rambla):</strong> a spacious and well-maintained natural pool. Perfect for families. Nearby parking.</li>
</ul>

<h3>Northwest</h3>
<ul>
<li><strong>Charco de Isla Baja (Los Silos):</strong> peaceful natural pools surrounded by banana plantations. Easy access and relaxed atmosphere.</li>
<li><strong>El Pris Pools (Tacoronte):</strong> small natural rock pools in a charming coastal village. Fresh fish restaurants nearby.</li>
</ul>

<h3>South and East</h3>
<ul>
<li><strong>Charco de Jover (Tacoronte):</strong> lesser-known pools with stepped access to the sea. Unspoilt setting with few visitors.</li>
<li><strong>Mesa del Mar Pools:</strong> in Tacoronte, spacious and well-equipped with a bar and terrace. Local and family-friendly atmosphere.</li>
</ul>

<h3>Tips for Visiting Natural Pools</h3>
<ul>
<li>Wear water shoes — volcanic rocks can be slippery and sharp</li>
<li>Check sea conditions before going, especially in winter</li>
<li>Bring waterproof sunscreen</li>
<li>Respect danger signs — some pools are unsafe during rough seas</li>
<li>Arrive early in summer to find a spot</li>
<li>Bring snorkelling gear — the marine life in the pools is surprising</li>
</ul>

<h3>Best Time</h3>
<p>Natural pools can be enjoyed year-round thanks to Tenerife's climate, but <strong>May to October</strong> offers warmer water and calmer seas. In winter, waves can make some northern pools unsafe.</p>`,
    },
    category_id: CAT.nature,
    tags: ['natural-pools', 'swimming', 'volcanic'],
    image_url: null,
  },

  // 7. Senderismo en Anaga
  {
    slug: 'senderismo-anaga-rutas',
    title: {
      es: 'Senderismo en Anaga: las mejores rutas',
      en: 'Hiking in Anaga: The Best Trails',
    },
    excerpt: {
      es: 'Descubre las mejores rutas de senderismo en el macizo de Anaga: bosques de laurisilva, pueblos remotos y senderos con vistas espectaculares.',
      en: 'Discover the best hiking trails in the Anaga massif: laurel forests, remote villages and trails with spectacular views.',
    },
    content: {
      es: `<h2>Senderismo en Anaga: las mejores rutas</h2>
<p>El macizo de Anaga, declarado <strong>Reserva de la Biosfera por la UNESCO</strong>, es el paraíso del senderismo en Tenerife. Este rincón al noreste de la isla conserva los bosques de laurisilva más extensos de Canarias, con senderos que atraviesan crestas montañosas, barrancos profundos y pequeños caseríos donde el tiempo parece haberse detenido.</p>

<h3>Ruta 1: Sendero de los Sentidos (Cruz del Carmen)</h3>
<ul>
<li><strong>Distancia:</strong> 1,8 km (circular)</li>
<li><strong>Duración:</strong> 45 minutos</li>
<li><strong>Dificultad:</strong> baja</li>
<li><strong>Ideal para:</strong> familias y personas con movilidad reducida</li>
</ul>
<p>Paseo accesible por el corazón de la laurisilva con paneles informativos. Punto de partida: Centro de Visitantes de Cruz del Carmen.</p>

<h3>Ruta 2: Cruz del Carmen – Chinamada</h3>
<ul>
<li><strong>Distancia:</strong> 8 km (ida y vuelta)</li>
<li><strong>Duración:</strong> 3-4 horas</li>
<li><strong>Dificultad:</strong> media</li>
</ul>
<p>Recorrido por el bosque de laurisilva hasta el pueblo de Chinamada, famoso por sus <strong>casas-cueva</strong> habitadas. Vistas espectaculares al océano desde los acantilados.</p>

<h3>Ruta 3: Punta del Hidalgo – Chinamada</h3>
<ul>
<li><strong>Distancia:</strong> 10 km (ida y vuelta)</li>
<li><strong>Duración:</strong> 4-5 horas</li>
<li><strong>Dificultad:</strong> media-alta</li>
</ul>
<p>Sube desde la costa hasta las cumbres de Anaga. Desnivel considerable pero paisajes impresionantes. Lleva suficiente agua.</p>

<h3>Ruta 4: Afur – Playa de Tamadite</h3>
<ul>
<li><strong>Distancia:</strong> 5 km (ida y vuelta)</li>
<li><strong>Duración:</strong> 2,5-3 horas</li>
<li><strong>Dificultad:</strong> media</li>
</ul>
<p>Descenso por el barranco de Afur hasta una playa salvaje de arena negra. El regreso es todo cuesta arriba. Recompensa: un baño en una playa casi desierta.</p>

<h3>Ruta 5: El Pijaral (acceso restringido)</h3>
<ul>
<li><strong>Distancia:</strong> 4 km (circular)</li>
<li><strong>Duración:</strong> 2 horas</li>
<li><strong>Dificultad:</strong> media</li>
</ul>
<p>Zona de acceso controlado con permiso previo (gratuito, solicitar en la web del Cabildo). El bosque de laurisilva más denso y primitivo de Anaga. Máximo 45 personas al día.</p>

<h3>Consejos para senderismo en Anaga</h3>
<ul>
<li>El clima es variable: lleva impermeable y capas incluso en verano</li>
<li>Comienza las rutas temprano para evitar las nieblas de la tarde</li>
<li>Lleva calzado de senderismo con buen agarre (senderos húmedos)</li>
<li>Descarga los mapas offline: no hay cobertura móvil en muchas zonas</li>
<li>Respeta la flora y fauna: estás en una Reserva de la Biosfera</li>
</ul>`,

      en: `<h2>Hiking in Anaga: The Best Trails</h2>
<p>The Anaga massif, declared a <strong>UNESCO Biosphere Reserve</strong>, is Tenerife's hiking paradise. This corner in the northeast of the island preserves the most extensive laurel forests in the Canary Islands, with trails that cross mountain ridges, deep ravines and tiny hamlets where time seems to have stood still.</p>

<h3>Trail 1: Path of the Senses (Cruz del Carmen)</h3>
<ul>
<li><strong>Distance:</strong> 1.8 km (circular)</li>
<li><strong>Duration:</strong> 45 minutes</li>
<li><strong>Difficulty:</strong> easy</li>
<li><strong>Ideal for:</strong> families and people with reduced mobility</li>
</ul>
<p>An accessible walk through the heart of the laurel forest with information panels. Starting point: Cruz del Carmen Visitor Centre.</p>

<h3>Trail 2: Cruz del Carmen – Chinamada</h3>
<ul>
<li><strong>Distance:</strong> 8 km (return)</li>
<li><strong>Duration:</strong> 3-4 hours</li>
<li><strong>Difficulty:</strong> moderate</li>
</ul>
<p>A route through the laurel forest to the village of Chinamada, famous for its inhabited <strong>cave houses</strong>. Spectacular ocean views from the cliffs.</p>

<h3>Trail 3: Punta del Hidalgo – Chinamada</h3>
<ul>
<li><strong>Distance:</strong> 10 km (return)</li>
<li><strong>Duration:</strong> 4-5 hours</li>
<li><strong>Difficulty:</strong> moderate to hard</li>
</ul>
<p>Climbs from the coast to the Anaga peaks. Significant elevation gain but impressive scenery. Bring plenty of water.</p>

<h3>Trail 4: Afur – Tamadite Beach</h3>
<ul>
<li><strong>Distance:</strong> 5 km (return)</li>
<li><strong>Duration:</strong> 2.5-3 hours</li>
<li><strong>Difficulty:</strong> moderate</li>
</ul>
<p>A descent through the Afur ravine to a wild black sand beach. The return is entirely uphill. The reward: a swim at a near-deserted beach.</p>

<h3>Trail 5: El Pijaral (restricted access)</h3>
<ul>
<li><strong>Distance:</strong> 4 km (circular)</li>
<li><strong>Duration:</strong> 2 hours</li>
<li><strong>Difficulty:</strong> moderate</li>
</ul>
<p>A controlled access zone requiring a free prior permit (apply on the Cabildo website). The densest and most pristine laurel forest in Anaga. Maximum 45 people per day.</p>

<h3>Tips for Hiking in Anaga</h3>
<ul>
<li>The weather is changeable — bring a waterproof and layers even in summer</li>
<li>Start routes early to avoid afternoon fog</li>
<li>Wear hiking boots with good grip (trails can be wet)</li>
<li>Download offline maps — there is no mobile signal in many areas</li>
<li>Respect the flora and fauna — you are in a Biosphere Reserve</li>
</ul>`,
    },
    category_id: CAT.nature,
    tags: ['anaga', 'hiking', 'forest'],
    image_url: null,
  },

  // 8. Costa Adeje guía
  {
    slug: 'costa-adeje-guia',
    title: {
      es: 'Costa Adeje: guía completa de la zona',
      en: 'Costa Adeje: Complete Area Guide',
    },
    excerpt: {
      es: 'Todo lo que necesitas saber sobre Costa Adeje: playas, restaurantes, actividades, vida nocturna y alojamiento en la zona más turística del sur de Tenerife.',
      en: 'Everything you need to know about Costa Adeje: beaches, restaurants, activities, nightlife and accommodation in southern Tenerife\'s most popular resort area.',
    },
    content: {
      es: `<h2>Costa Adeje: guía completa de la zona</h2>
<p>Costa Adeje es la zona turística más exclusiva del sur de Tenerife. Con playas doradas, hoteles de lujo, centros comerciales y una oferta gastronómica variada, se ha convertido en el destino favorito de quienes buscan sol, mar y confort. Aquí tienes todo lo que necesitas saber para tu visita.</p>

<h3>Las mejores playas</h3>
<ul>
<li><strong>Playa del Duque:</strong> la más exclusiva, arena dorada y servicios premium. Hamacas desde 8€. Restaurantes y boutiques al lado.</li>
<li><strong>Playa de Fañabé:</strong> amplia y familiar con todos los servicios. Paseo marítimo animado con bares y heladerías.</li>
<li><strong>Playa de Torviscas:</strong> popular para deportes acuáticos. Jet ski, parasailing y banana boat disponibles.</li>
<li><strong>Playa de Diego Hernández:</strong> cala semisalvaje accesible a pie. Arena blanca y ambiente bohemio.</li>
<li><strong>La Caleta:</strong> antiguo pueblo pesquero con encanto. Playa pequeña y restaurantes de pescado fresco.</li>
</ul>

<h3>Actividades y excursiones</h3>
<ul>
<li><strong>Siam Park:</strong> el mejor parque acuático del mundo, a solo 5 minutos. Entradas desde 42€.</li>
<li><strong>Avistamiento de ballenas:</strong> excursiones en barco desde el puerto de Los Cristianos. Desde 15€/persona.</li>
<li><strong>Kayak y paddle surf:</strong> alquiler en las playas principales desde 15€/hora.</li>
<li><strong>Golf:</strong> dos campos de golf de 18 hoyos: Golf Costa Adeje y Adeje Real.</li>
<li><strong>Buceo:</strong> centros de buceo con inmersiones guiadas desde 50€. Tortugas y rayas frecuentes.</li>
</ul>

<h3>Dónde comer</h3>
<ul>
<li><strong>El Rincón de Juan Carlos:</strong> estrella Michelin. Alta cocina canaria de vanguardia. Menú degustación desde 95€.</li>
<li><strong>La Caleta (pueblo):</strong> varios restaurantes de pescado fresco con vistas al mar. Precios medios: 20-35€/persona.</li>
<li><strong>Bahía del Duque:</strong> varios restaurantes dentro del hotel, incluyendo cocina asiática e italiana.</li>
<li><strong>Hard Rock Café:</strong> opción casual en el centro comercial. Hamburguesas y ambiente americano.</li>
</ul>

<h3>Vida nocturna</h3>
<p>La zona de Playa de Las Américas, colindante con Costa Adeje, concentra la vida nocturna con discotecas, pubs y bares. Las zonas principales son el <strong>Centro Comercial Veronicas</strong> y la <strong>Avenida de las Américas</strong>. En Costa Adeje el ambiente es más relajado con coctelerías y terrazas.</p>

<h3>Consejos prácticos</h3>
<ul>
<li>El sur de Tenerife tiene sol casi todo el año, pero las noches pueden ser frescas</li>
<li>Alquila coche si quieres explorar más allá de la zona turística</li>
<li>Reserva restaurantes con antelación en temporada alta</li>
<li>El transporte público conecta bien con Los Cristianos y el aeropuerto sur</li>
</ul>`,

      en: `<h2>Costa Adeje: Complete Area Guide</h2>
<p>Costa Adeje is the most exclusive tourist area in southern Tenerife. With golden beaches, luxury hotels, shopping centres and a varied dining scene, it has become the top destination for those seeking sun, sea and comfort. Here is everything you need to know for your visit.</p>

<h3>Best Beaches</h3>
<ul>
<li><strong>Playa del Duque:</strong> the most upscale, with golden sand and premium facilities. Sun loungers from €8. Restaurants and boutiques alongside.</li>
<li><strong>Playa de Fañabé:</strong> spacious and family-friendly with full facilities. Lively promenade with bars and ice cream shops.</li>
<li><strong>Playa de Torviscas:</strong> popular for water sports. Jet ski, parasailing and banana boat available.</li>
<li><strong>Playa de Diego Hernández:</strong> semi-wild cove accessible on foot. White sand and a bohemian vibe.</li>
<li><strong>La Caleta:</strong> a charming former fishing village. Small beach and fresh fish restaurants.</li>
</ul>

<h3>Activities and Excursions</h3>
<ul>
<li><strong>Siam Park:</strong> the world's best water park, just 5 minutes away. Tickets from €42.</li>
<li><strong>Whale watching:</strong> boat trips from Los Cristianos harbour. From €15/person.</li>
<li><strong>Kayak and paddle boarding:</strong> rental at the main beaches from €15/hour.</li>
<li><strong>Golf:</strong> two 18-hole courses: Golf Costa Adeje and Adeje Real.</li>
<li><strong>Diving:</strong> dive centres with guided dives from €50. Turtles and rays frequently spotted.</li>
</ul>

<h3>Where to Eat</h3>
<ul>
<li><strong>El Rincón de Juan Carlos:</strong> Michelin star. Avant-garde Canarian fine dining. Tasting menu from €95.</li>
<li><strong>La Caleta (village):</strong> several fresh fish restaurants with sea views. Average prices: €20-35/person.</li>
<li><strong>Bahía del Duque:</strong> multiple restaurants within the hotel, including Asian and Italian cuisine.</li>
<li><strong>Hard Rock Café:</strong> casual option in the shopping centre. Burgers and American atmosphere.</li>
</ul>

<h3>Nightlife</h3>
<p>The neighbouring Playa de Las Américas area is the nightlife hub with clubs, pubs and bars. The main zones are <strong>Veronicas Centre</strong> and <strong>Avenida de las Américas</strong>. Costa Adeje itself has a more relaxed scene with cocktail bars and terraces.</p>

<h3>Practical Tips</h3>
<ul>
<li>Southern Tenerife has sun almost all year round, but evenings can be cool</li>
<li>Rent a car if you want to explore beyond the resort area</li>
<li>Book restaurants in advance during peak season</li>
<li>Public transport connects well with Los Cristianos and the south airport</li>
</ul>`,
    },
    category_id: CAT.experiences,
    tags: ['costa-adeje', 'south', 'guide'],
    image_url: null,
  },

  // 9. Comida canaria: platos típicos
  {
    slug: 'comida-canaria-platos-tipicos',
    title: {
      es: 'Comida canaria: 10 platos que debes probar',
      en: 'Canarian Food: 10 Dishes You Must Try',
    },
    excerpt: {
      es: 'Descubre los 10 platos más emblemáticos de la cocina canaria: desde las papas arrugadas con mojo hasta el gofio y el puchero canario.',
      en: 'Discover the 10 most iconic dishes of Canarian cuisine: from papas arrugadas with mojo to gofio and Canarian stew.',
    },
    content: {
      es: `<h2>Comida canaria: 10 platos que debes probar</h2>
<p>La gastronomía canaria es una de las grandes sorpresas de Tenerife. Con raíces en la cocina guanche, influencias españolas, africanas y latinoamericanas, los platos canarios son sencillos, sabrosos y elaborados con productos locales de calidad. Aquí tienes los 10 imprescindibles que no puedes dejar de probar.</p>

<h3>1. Papas arrugadas con mojo</h3>
<p>El plato más icónico de Canarias. Patatas pequeñas cocidas con mucha sal hasta que la piel se arruga. Se sirven con <strong>mojo rojo</strong> (pimentón, ajo, comino) y <strong>mojo verde</strong> (cilantro o perejil). Las encontrarás en cualquier restaurante desde 4€.</p>

<h3>2. Gofio</h3>
<p>Harina de cereales tostados que ya consumían los guanches. Se usa en <strong>gofio escaldado</strong> (mezclado con caldo de pescado), amasado con plátano o como acompañamiento. Es la base de la alimentación canaria tradicional.</p>

<h3>3. Ropa vieja</h3>
<p>Garbanzos guisados con carne desmechada de ternera o pollo, pimiento, tomate y cebolla. Un plato reconfortante y contundente, perfecto para el almuerzo. Desde 8€ en restaurantes locales.</p>

<h3>4. Carne de cabra</h3>
<p>La cabra es el animal emblemático de Canarias. Se prepara guisada en salsa con papas o asada al horno. El <strong>cabrito</strong> (cabra joven) es un manjar en las fiestas tradicionales.</p>

<h3>5. Pescado fresco a la plancha</h3>
<p>Tenerife ofrece pescado fresco espectacular: <strong>vieja</strong> (pez loro), <strong>cherne</strong>, <strong>sama</strong> y <strong>atún rojo</strong>. Se sirve a la plancha o frito con papas arrugadas. Los mejores restaurantes están en pueblos pesqueros como La Caleta y San Andrés.</p>

<h3>6. Puchero canario</h3>
<p>El cocido canario con garbanzos, carne de cerdo, pollo, verduras, papas, piña de millo (mazorca) y pella de gofio. Se sirve en dos vuelcos: primero el caldo y luego la carne con verduras.</p>

<h3>7. Queso asado con mojo</h3>
<p>Queso de cabra a la plancha con mojo rojo o verde. Una tapa imprescindible en cualquier guachinche. El queso canario ha ganado numerosos premios internacionales.</p>

<h3>8. Frangollo</h3>
<p>Postre tradicional elaborado con harina de millo (maíz), leche, azúcar, limón, pasas y almendras. Textura cremosa y sabor dulce. Es el postre canario por excelencia.</p>

<h3>9. Caldo de papas</h3>
<p>Sopa espesa de papas con costillas de cerdo, calabaza, piña de millo y azafrán canario. Plato humilde pero delicioso, típico de los hogares canarios.</p>

<h3>10. Bienmesabe</h3>
<p>Dulce tradicional de almendras molidas, huevo, azúcar y limón. Se sirve como postre o acompañando helado. Su nombre lo dice todo: sabe muy bien.</p>

<h3>Dónde probar comida canaria auténtica</h3>
<ul>
<li><strong>Guachinches:</strong> bodegas familiares que sirven comida casera con vino propio. Los mejores están en la zona de Tacoronte y La Orotava.</li>
<li><strong>Tasca:</strong> taberna tradicional canaria. Busca las que frecuentan los locales.</li>
<li><strong>Mercado de Nuestra Señora de África:</strong> puestos de comida preparada en Santa Cruz.</li>
</ul>`,

      en: `<h2>Canarian Food: 10 Dishes You Must Try</h2>
<p>Canarian gastronomy is one of Tenerife's great surprises. With roots in Guanche cooking and influences from Spain, Africa and Latin America, Canarian dishes are simple, flavourful and made with quality local ingredients. Here are the 10 essential dishes you simply must try.</p>

<h3>1. Papas Arrugadas with Mojo</h3>
<p>The most iconic Canarian dish. Small potatoes boiled in very salty water until the skin wrinkles. Served with <strong>mojo rojo</strong> (paprika, garlic, cumin) and <strong>mojo verde</strong> (coriander or parsley). Found at any restaurant from €4.</p>

<h3>2. Gofio</h3>
<p>Toasted cereal flour that was already consumed by the Guanches. Used in <strong>gofio escaldado</strong> (mixed with fish broth), kneaded with banana or as a side dish. It is the foundation of traditional Canarian food.</p>

<h3>3. Ropa Vieja</h3>
<p>Chickpeas stewed with shredded beef or chicken, peppers, tomato and onion. A hearty and comforting dish, perfect for lunch. From €8 at local restaurants.</p>

<h3>4. Goat Meat</h3>
<p>The goat is the emblematic animal of the Canary Islands. It is prepared stewed in sauce with potatoes or roasted. <strong>Cabrito</strong> (young goat) is a delicacy at traditional festivals.</p>

<h3>5. Fresh Grilled Fish</h3>
<p>Tenerife offers spectacular fresh fish: <strong>vieja</strong> (parrotfish), <strong>cherne</strong> (wreckfish), <strong>sama</strong> (red porgy) and <strong>red tuna</strong>. Served grilled or fried with papas arrugadas. The best restaurants are in fishing villages like La Caleta and San Andrés.</p>

<h3>6. Puchero Canario</h3>
<p>The Canarian stew with chickpeas, pork, chicken, vegetables, potatoes, corn on the cob and gofio dumplings. Served in two courses: first the broth, then the meat and vegetables.</p>

<h3>7. Grilled Cheese with Mojo</h3>
<p>Grilled goat cheese served with red or green mojo. An essential tapa at any guachinche. Canarian cheese has won numerous international awards.</p>

<h3>8. Frangollo</h3>
<p>A traditional dessert made with cornflour, milk, sugar, lemon, raisins and almonds. Creamy texture and sweet flavour. It is the quintessential Canarian dessert.</p>

<h3>9. Caldo de Papas</h3>
<p>A thick potato soup with pork ribs, pumpkin, corn and Canarian saffron. A humble but delicious dish, typical of Canarian homes.</p>

<h3>10. Bienmesabe</h3>
<p>A traditional sweet made from ground almonds, egg, sugar and lemon. Served as dessert or alongside ice cream. Its name says it all: it tastes very good.</p>

<h3>Where to Try Authentic Canarian Food</h3>
<ul>
<li><strong>Guachinches:</strong> family-run bodegas serving home-cooked food with their own wine. The best are in the Tacoronte and La Orotava area.</li>
<li><strong>Tasca:</strong> traditional Canarian tavern. Look for the ones frequented by locals.</li>
<li><strong>Nuestra Señora de África Market:</strong> prepared food stalls in Santa Cruz.</li>
</ul>`,
    },
    category_id: CAT.food,
    tags: ['food', 'canarian', 'traditional'],
    image_url: null,
  },

  // 10. Tenerife para nómadas digitales
  {
    slug: 'tenerife-nomadas-digitales',
    title: {
      es: 'Tenerife para nómadas digitales: guía práctica',
      en: 'Tenerife for Digital Nomads: Practical Guide',
    },
    excerpt: {
      es: 'Todo lo que un nómada digital necesita saber sobre Tenerife: coworkings, coste de vida, comunidad, visados y los mejores barrios para vivir y trabajar.',
      en: 'Everything a digital nomad needs to know about Tenerife: coworking spaces, cost of living, community, visas and the best neighbourhoods to live and work.',
    },
    content: {
      es: `<h2>Tenerife para nómadas digitales: guía práctica</h2>
<p>Tenerife se ha convertido en uno de los destinos más populares de Europa para nómadas digitales. Con un clima primaveral todo el año, buena conexión a internet, coste de vida razonable y una comunidad internacional en crecimiento, la isla ofrece todo lo necesario para combinar trabajo remoto y calidad de vida.</p>

<h3>Por qué Tenerife es ideal para nómadas digitales</h3>
<ul>
<li><strong>Clima:</strong> entre 20°C y 28°C todo el año. Nunca hace frío ni excesivo calor.</li>
<li><strong>Huso horario:</strong> GMT+0 (GMT+1 en verano), perfecto para trabajar con Europa, África y Américas.</li>
<li><strong>Conexión:</strong> fibra óptica ampliamente disponible. Velocidades de 300-600 Mbps en la mayoría de zonas.</li>
<li><strong>Coste de vida:</strong> significativamente más bajo que en la península y norte de Europa.</li>
<li><strong>Comunidad:</strong> miles de nómadas digitales, especialmente en el sur de la isla.</li>
<li><strong>Seguridad:</strong> índice de criminalidad muy bajo.</li>
</ul>

<h3>Mejores zonas para nómadas digitales</h3>
<ul>
<li><strong>Santa Cruz de Tenerife:</strong> capital con ambiente urbano, cultura y precios accesibles. Alquiler: 600-900€/mes por un apartamento de 1 habitación.</li>
<li><strong>La Laguna:</strong> ciudad universitaria con ambiente joven y bohemio. Patrimonio UNESCO. Alquiler: 550-800€/mes.</li>
<li><strong>Puerto de la Cruz:</strong> pueblo costero con encanto en el norte. Comunidad de expatriados consolidada. Alquiler: 500-750€/mes.</li>
<li><strong>Costa Adeje / Los Cristianos:</strong> sur turístico con sol garantizado. Más caro. Alquiler: 800-1.200€/mes.</li>
<li><strong>El Médano:</strong> pueblo surfero con ambiente relajado. Popular entre nómadas. Alquiler: 600-900€/mes.</li>
</ul>

<h3>Espacios de coworking</h3>
<ul>
<li><strong>Coworking Tenerife (Santa Cruz):</strong> desde 120€/mes. Sala de reuniones, eventos de networking y café.</li>
<li><strong>The House Coworking (Las Américas):</strong> desde 150€/mes. Comunidad internacional activa.</li>
<li><strong>La Laguna Coworking:</strong> desde 100€/mes. Ambiente universitario y creativo.</li>
<li><strong>Restation (Puerto de la Cruz):</strong> coworking y coliving. Desde 130€/mes por el escritorio.</li>
</ul>

<h3>Coste de vida mensual estimado</h3>
<ul>
<li><strong>Alquiler:</strong> 600-1.000€ (apartamento 1 habitación)</li>
<li><strong>Comida:</strong> 250-400€ (cocinando en casa y comiendo fuera ocasionalmente)</li>
<li><strong>Transporte:</strong> 50-100€ (bono de guagua o gasolina)</li>
<li><strong>Coworking:</strong> 100-200€</li>
<li><strong>Ocio:</strong> 100-200€</li>
<li><strong>Total estimado:</strong> 1.100-1.900€/mes</li>
</ul>

<h3>Visado para nómadas digitales</h3>
<p>España ofrece el <strong>visado para nómadas digitales</strong> desde 2023, que permite residir y trabajar en remoto legalmente durante hasta 5 años. Requisitos principales: ingresos mínimos de 2.520€/mes, contrato con empresa extranjera o ser autónomo con clientes fuera de España.</p>

<h3>Comunidad y networking</h3>
<ul>
<li>Grupos de Facebook: "Digital Nomads Tenerife" y "Expats in Tenerife"</li>
<li>Meetups semanales organizados por coworkings locales</li>
<li>Eventos de emprendimiento y tecnología en Santa Cruz y La Laguna</li>
</ul>`,

      en: `<h2>Tenerife for Digital Nomads: Practical Guide</h2>
<p>Tenerife has become one of Europe's most popular destinations for digital nomads. With spring-like weather all year round, good internet, a reasonable cost of living and a growing international community, the island offers everything you need to combine remote work and quality of life.</p>

<h3>Why Tenerife is Ideal for Digital Nomads</h3>
<ul>
<li><strong>Climate:</strong> between 20°C and 28°C all year round. Never cold, never too hot.</li>
<li><strong>Time zone:</strong> GMT+0 (GMT+1 in summer), perfect for working with Europe, Africa and the Americas.</li>
<li><strong>Connectivity:</strong> fibre optic widely available. Speeds of 300-600 Mbps in most areas.</li>
<li><strong>Cost of living:</strong> significantly lower than mainland Spain and northern Europe.</li>
<li><strong>Community:</strong> thousands of digital nomads, especially in the south of the island.</li>
<li><strong>Safety:</strong> very low crime rate.</li>
</ul>

<h3>Best Areas for Digital Nomads</h3>
<ul>
<li><strong>Santa Cruz de Tenerife:</strong> the capital with an urban feel, culture and affordable prices. Rent: €600-900/month for a 1-bedroom flat.</li>
<li><strong>La Laguna:</strong> a university city with a young, bohemian atmosphere. UNESCO heritage. Rent: €550-800/month.</li>
<li><strong>Puerto de la Cruz:</strong> charming coastal town in the north. Well-established expat community. Rent: €500-750/month.</li>
<li><strong>Costa Adeje / Los Cristianos:</strong> the sunny tourist south. More expensive. Rent: €800-1,200/month.</li>
<li><strong>El Médano:</strong> surf town with a laid-back vibe. Popular with nomads. Rent: €600-900/month.</li>
</ul>

<h3>Coworking Spaces</h3>
<ul>
<li><strong>Coworking Tenerife (Santa Cruz):</strong> from €120/month. Meeting rooms, networking events and coffee.</li>
<li><strong>The House Coworking (Las Américas):</strong> from €150/month. Active international community.</li>
<li><strong>La Laguna Coworking:</strong> from €100/month. University and creative atmosphere.</li>
<li><strong>Restation (Puerto de la Cruz):</strong> coworking and coliving. From €130/month for a desk.</li>
</ul>

<h3>Estimated Monthly Cost of Living</h3>
<ul>
<li><strong>Rent:</strong> €600-1,000 (1-bedroom flat)</li>
<li><strong>Food:</strong> €250-400 (cooking at home and eating out occasionally)</li>
<li><strong>Transport:</strong> €50-100 (bus pass or petrol)</li>
<li><strong>Coworking:</strong> €100-200</li>
<li><strong>Leisure:</strong> €100-200</li>
<li><strong>Estimated total:</strong> €1,100-1,900/month</li>
</ul>

<h3>Digital Nomad Visa</h3>
<p>Spain offers a <strong>digital nomad visa</strong> since 2023, allowing you to live and work remotely legally for up to 5 years. Main requirements: minimum income of €2,520/month, contract with a foreign company or self-employed with clients outside Spain.</p>

<h3>Community and Networking</h3>
<ul>
<li>Facebook groups: "Digital Nomads Tenerife" and "Expats in Tenerife"</li>
<li>Weekly meetups organised by local coworking spaces</li>
<li>Entrepreneurship and tech events in Santa Cruz and La Laguna</li>
</ul>`,
    },
    category_id: CAT.experiences,
    tags: ['digital-nomads', 'coworking', 'remote'],
    image_url: null,
  },
];

async function main() {
  console.log('Inserting batch 3b: 5 blog articles...\n');

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

  console.log('\nBatch 3b done!');
}

main();
