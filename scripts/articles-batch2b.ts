import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://sqesgghvaazyajzjkoap.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxZXNnZ2h2YWF6eWFqemprb2FwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzUxMzgwOSwiZXhwIjoyMDg5MDg5ODA5fQ.UvbRfWU9seJPT9lyCyLmpD4uZrP9jXzsNoeSAjT9HnI'
);

const CAT = {
  experiences: '4af61632-1baa-457e-990e-e2e71a27def8',
  culture: '9f8f3805-9f17-4848-99f1-90f80f8cbf59',
  nature: '56eb6a9a-7360-48ec-a1a0-a7a74bef61b5',
};

const AREA = {
  laLaguna: '75cdf978-f228-43a0-b7d9-ba51ce7bc37d',
};

const articles = [
  // ARTICLE 1 — Miradores de Tenerife
  {
    slug: 'miradores-tenerife',
    title: {
      es: 'Miradores de Tenerife: los 12 mejores',
      en: 'Tenerife Viewpoints: The 12 Best',
    },
    excerpt: {
      es: 'Guía completa de los 12 miradores más espectaculares de Tenerife, con ubicaciones, consejos prácticos y las mejores horas para visitarlos.',
      en: 'Complete guide to the 12 most spectacular viewpoints in Tenerife, with locations, practical tips and the best times to visit.',
    },
    content: {
      es: `<h2>Los 12 miradores imprescindibles de Tenerife</h2>
<p>Tenerife es una isla de contrastes y altitudes, y sus miradores ofrecen panorámicas que van desde acantilados volcánicos hasta bosques de laurisilva. Aquí tienes los 12 mejores puntos de observación que no te puedes perder.</p>

<h3>1. Mirador de Cherfe</h3>
<p>Situado en la carretera TF-436, ofrece vistas espectaculares del barranco de Masca y los acantilados de Los Gigantes. Acceso gratuito y aparcamiento disponible. Mejor al atardecer.</p>

<h3>2. Mirador de la Ruleta (Las Cañadas del Teide)</h3>
<p>Dentro del Parque Nacional del Teide, permite contemplar los Roques de García con el Teide de fondo. Parada obligatoria si subes al teleférico (38€ ida y vuelta).</p>

<h3>3. Mirador del Pico del Inglés</h3>
<p>En el macizo de Anaga, a 900 m de altitud. Vistas de 360° sobre el bosque de laurisilva, Santa Cruz y el Teide. Acceso gratuito por la carretera TF-114.</p>

<h3>4. Mirador de Jardina</h3>
<p>Panorámica impresionante de Santa Cruz y la costa noreste. Fácil acceso desde la autopista TF-5.</p>

<h3>5. Mirador de San Pedro (Los Realejos)</h3>
<p>Vistas del Valle de La Orotava y el puerto de la Cruz. Ideal para fotografía al amanecer.</p>

<h3>6. Mirador de Humboldt</h3>
<p>Nombrado en honor al naturalista Alexander von Humboldt, ofrece una de las mejores perspectivas del valle de La Orotava.</p>

<h3>7. Mirador de Abrante (La Gomera visible)</h3>
<p>Situado en Agulo, con pasarela de cristal sobre el vacío. Entrada: 3€. Vistas hacia Tenerife y el Teide.</p>

<h3>8. Mirador de Archipenque</h3>
<p>Uno de los mejores puntos para ver los Acantilados de Los Gigantes desde tierra. Acceso libre.</p>

<h3>9. Mirador de la Corona</h3>
<p>En el sur, sobre el barranco del Infierno. Vista del litoral de Adeje y La Gomera al fondo.</p>

<h3>10. Mirador Cruz del Carmen</h3>
<p>Punto de inicio de varias rutas de senderismo en Anaga. Centro de visitantes con información gratuita.</p>

<h3>11. Mirador de Chivisaya</h3>
<p>En la carretera TF-21 dentro del Parque Nacional. Vistas únicas de las formaciones volcánicas.</p>

<h3>12. Mirador de Montaña Grande (Güímar)</h3>
<p>Panorámica del valle de Güímar y las pirámides. Acceso libre.</p>

<h3>Consejos prácticos</h3>
<ul>
<li>Lleva ropa de abrigo: en los miradores de montaña la temperatura baja 6-10°C respecto a la costa</li>
<li>Las mejores horas para fotografía son al amanecer y atardecer</li>
<li>Lleva agua y protección solar, especialmente en miradores sin sombra</li>
<li>Un coche de alquiler es imprescindible: desde 25€/día en temporada baja</li>
<li>Algunos miradores de Anaga requieren reserva previa en temporada alta</li>
</ul>`,
      en: `<h2>The 12 Must-Visit Viewpoints in Tenerife</h2>
<p>Tenerife is an island of contrasts and altitudes, and its viewpoints offer panoramas ranging from volcanic cliffs to laurel forests. Here are the 12 best observation points you cannot miss.</p>

<h3>1. Mirador de Cherfe</h3>
<p>Located on the TF-436 road, it offers spectacular views of Masca ravine and the Los Gigantes cliffs. Free access with available parking. Best at sunset.</p>

<h3>2. Mirador de la Ruleta (Las Cañadas del Teide)</h3>
<p>Inside Teide National Park, it allows you to contemplate the Roques de García with Mount Teide in the background. A mandatory stop if you take the cable car (€38 round trip).</p>

<h3>3. Mirador del Pico del Inglés</h3>
<p>In the Anaga massif at 900 m altitude. 360° views over the laurel forest, Santa Cruz and Mount Teide. Free access via the TF-114 road.</p>

<h3>4. Mirador de Jardina</h3>
<p>Impressive panoramic views of Santa Cruz and the northeast coast. Easy access from the TF-5 motorway.</p>

<h3>5. Mirador de San Pedro (Los Realejos)</h3>
<p>Views of La Orotava Valley and Puerto de la Cruz. Ideal for sunrise photography.</p>

<h3>6. Mirador de Humboldt</h3>
<p>Named after naturalist Alexander von Humboldt, offering one of the best perspectives of La Orotava Valley.</p>

<h3>7. Mirador de Abrante (La Gomera visible)</h3>
<p>Located in Agulo with a glass walkway over the void. Entry: €3. Views towards Tenerife and Mount Teide.</p>

<h3>8. Mirador de Archipenque</h3>
<p>One of the best spots to see the Los Gigantes Cliffs from land. Free access.</p>

<h3>9. Mirador de la Corona</h3>
<p>In the south, above the Barranco del Infierno. Views of the Adeje coastline with La Gomera in the background.</p>

<h3>10. Mirador Cruz del Carmen</h3>
<p>Starting point for several hiking trails in Anaga. Free visitor centre with information.</p>

<h3>11. Mirador de Chivisaya</h3>
<p>On the TF-21 road inside the National Park. Unique views of volcanic formations.</p>

<h3>12. Mirador de Montaña Grande (Güímar)</h3>
<p>Panoramic views of Güímar Valley and the pyramids. Free access.</p>

<h3>Practical Tips</h3>
<ul>
<li>Bring warm clothing: mountain viewpoints can be 6-10°C cooler than the coast</li>
<li>Best photography hours are sunrise and sunset</li>
<li>Carry water and sun protection, especially at viewpoints without shade</li>
<li>A rental car is essential: from €25/day in low season</li>
<li>Some Anaga viewpoints require advance booking during peak season</li>
</ul>`,
    },
    image: 'https://images.unsplash.com/photo-1506368387824-6cf9848c1638?w=1200&q=80',
    category_id: CAT.nature,
    area_id: null,
    tags: ['viewpoints', 'photography', 'nature'],
    published: true,
    ai_generated: true,
    published_at: new Date().toISOString(),
    author: 'Tenerife Experiences',
  },

  // ARTICLE 2 — Garachico
  {
    slug: 'garachico-tenerife-guia',
    title: {
      es: 'Garachico: el pueblo más bonito del norte',
      en: 'Garachico: The Most Beautiful Town in the North',
    },
    excerpt: {
      es: 'Descubre Garachico, el encantador pueblo del norte de Tenerife con piscinas naturales, historia volcánica y gastronomía auténtica.',
      en: 'Discover Garachico, the charming northern Tenerife town with natural pools, volcanic history and authentic gastronomy.',
    },
    content: {
      es: `<h2>Garachico: historia, lava y encanto atlántico</h2>
<p>Garachico fue el puerto principal de Tenerife hasta que la erupción del volcán Trevejo en 1706 sepultó gran parte del pueblo bajo la lava. De aquella catástrofe nació un lugar único: piscinas naturales formadas en la roca volcánica y un casco histórico que conserva la esencia colonial canaria.</p>

<h3>Qué ver en Garachico</h3>
<ul>
<li><strong>El Caletón:</strong> piscinas naturales de roca volcánica con acceso gratuito. Agua cristalina del Atlántico, ideales para bañarse todo el año. Temperatura del agua: 19-23°C.</li>
<li><strong>Castillo de San Miguel:</strong> fortaleza del siglo XVI que resistió la erupción. Entrada: 2€. Alberga exposiciones de arte contemporáneo.</li>
<li><strong>Plaza de la Libertad:</strong> el corazón del pueblo con jardines tropicales, un quiosco modernista y la puerta del antiguo convento de San Francisco.</li>
<li><strong>Iglesia de Santa Ana:</strong> templo del siglo XVI con retablos barrocos. Entrada gratuita.</li>
<li><strong>Roque de Garachico:</strong> islote volcánico frente a la costa, visible desde el paseo marítimo.</li>
</ul>

<h3>Dónde comer</h3>
<p>Los restaurantes del paseo marítimo ofrecen pescado fresco del día a precios razonables (platos principales 10-18€). Prueba el cherne en salsa o la vieja a la espalda. Los guachinches de la zona alta sirven comida casera desde 7€ el menú.</p>

<h3>Cómo llegar</h3>
<p>Garachico está a 60 km de Santa Cruz (50 min por la TF-5). Autobús TITSA línea 363 desde Puerto de la Cruz (1h, 3,50€). Aparcamiento gratuito en la zona del puerto.</p>

<h3>Consejos prácticos</h3>
<ul>
<li>Visita por la mañana para evitar aglomeraciones en El Caletón</li>
<li>Lleva escarpines para las piscinas naturales: la roca volcánica puede ser resbaladiza</li>
<li>Los domingos hay mercadillo artesanal en la plaza</li>
<li>Combina la visita con Icod de los Vinos (15 min) para ver el Drago Milenario (5€)</li>
<li>El atardecer desde el paseo marítimo es espectacular</li>
</ul>`,
      en: `<h2>Garachico: History, Lava and Atlantic Charm</h2>
<p>Garachico was Tenerife's main port until the eruption of Trevejo volcano in 1706 buried much of the town under lava. From that catastrophe, a unique place was born: natural pools formed in volcanic rock and a historic centre that preserves the colonial Canarian essence.</p>

<h3>What to See in Garachico</h3>
<ul>
<li><strong>El Caletón:</strong> natural volcanic rock pools with free access. Crystal-clear Atlantic water, ideal for swimming year-round. Water temperature: 19-23°C.</li>
<li><strong>Castillo de San Miguel:</strong> 16th-century fortress that survived the eruption. Entry: €2. Houses contemporary art exhibitions.</li>
<li><strong>Plaza de la Libertad:</strong> the heart of the town with tropical gardens, a modernist kiosk and the door of the former San Francisco convent.</li>
<li><strong>Church of Santa Ana:</strong> 16th-century church with baroque altarpieces. Free entry.</li>
<li><strong>Roque de Garachico:</strong> volcanic islet off the coast, visible from the seafront promenade.</li>
</ul>

<h3>Where to Eat</h3>
<p>Seafront restaurants offer fresh catch of the day at reasonable prices (main courses €10-18). Try the cherne (wreckfish) in sauce or vieja a la espalda (parrotfish). Guachinches in the upper area serve home-cooked meals from €7 per set menu.</p>

<h3>How to Get There</h3>
<p>Garachico is 60 km from Santa Cruz (50 min via TF-5). TITSA bus line 363 from Puerto de la Cruz (1h, €3.50). Free parking near the port area.</p>

<h3>Practical Tips</h3>
<ul>
<li>Visit in the morning to avoid crowds at El Caletón</li>
<li>Bring water shoes for the natural pools: volcanic rock can be slippery</li>
<li>Sundays feature an artisan market in the main square</li>
<li>Combine your visit with Icod de los Vinos (15 min) to see the Millennial Dragon Tree (€5)</li>
<li>The sunset from the seafront promenade is spectacular</li>
</ul>`,
    },
    image: 'https://images.unsplash.com/photo-1501108056461-7a7500ddf38c?w=1200&q=80',
    category_id: CAT.culture,
    area_id: null,
    tags: ['garachico', 'historic', 'north'],
    published: true,
    ai_generated: true,
    published_at: new Date().toISOString(),
    author: 'Tenerife Experiences',
  },

  // ARTICLE 3 — La Laguna UNESCO
  {
    slug: 'la-laguna-patrimonio-unesco',
    title: {
      es: 'La Laguna: paseo por la ciudad UNESCO',
      en: 'La Laguna: Walking the UNESCO Heritage City',
    },
    excerpt: {
      es: 'Recorre el casco histórico de San Cristóbal de La Laguna, Patrimonio de la Humanidad. Iglesias, palacios, tapeo y ambiente universitario.',
      en: 'Explore the historic centre of San Cristóbal de La Laguna, a World Heritage Site. Churches, palaces, tapas and university atmosphere.',
    },
    content: {
      es: `<h2>La Laguna: la ciudad que inspiró a las capitales americanas</h2>
<p>San Cristóbal de La Laguna fue la primera capital de Tenerife y su trazado urbanístico del siglo XV sirvió de modelo para ciudades coloniales en América Latina como La Habana y Lima. Declarada Patrimonio de la Humanidad por la UNESCO en 1999, su casco histórico es un museo al aire libre que se recorre fácilmente a pie.</p>

<h3>Ruta imprescindible por el centro histórico</h3>
<ul>
<li><strong>Catedral de La Laguna:</strong> neoclásica con fachada reconstruida en 1913. Alberga los restos del conquistador Alonso Fernández de Lugo. Entrada: 6€ (incluye museo).</li>
<li><strong>Iglesia de la Concepción:</strong> la más antigua de la isla (1511). Su torre es el símbolo de La Laguna. Subida a la torre: 3€ con vistas panorámicas.</li>
<li><strong>Palacio de Nava:</strong> joya arquitectónica que mezcla estilos barroco, neoclásico y manierista. Entrada: 5€.</li>
<li><strong>Calle San Agustín:</strong> la más señorial del casco, con casonas de balcones de tea canaria y patios interiores.</li>
<li><strong>Plaza del Adelantado:</strong> centro neurálgico con el mercado municipal donde comprar productos locales.</li>
</ul>

<h3>Tapeo y gastronomía</h3>
<p>La Laguna es la capital del tapeo de Tenerife gracias a su ambiente universitario. La calle Herradores y alrededores concentran decenas de bares con tapas desde 2,50€. Prueba las tapas de queso ahumado, croquetas de gofio y montaditos de cochino negro. Cerveza local desde 1,80€.</p>

<h3>Ambiente cultural</h3>
<p>Como sede de la Universidad de La Laguna (la más antigua de Canarias, fundada en 1792), la ciudad tiene un ambiente joven y cultural. Hay conciertos, exposiciones y teatro durante todo el año. El Teatro Leal ofrece programación variada con entradas desde 10€.</p>

<h3>Consejos prácticos</h3>
<ul>
<li>El tranvía conecta La Laguna con Santa Cruz en 25 min (1,35€)</li>
<li>Visita el mercado por la mañana para productos frescos y artesanía</li>
<li>El casco histórico es peatonal: ideal para recorrer andando</li>
<li>El clima es más fresco que en la costa sur: lleva una chaqueta ligera</li>
<li>Los jueves y viernes por la noche es cuando más ambiente hay en las calles</li>
</ul>`,
      en: `<h2>La Laguna: The City That Inspired Latin American Capitals</h2>
<p>San Cristóbal de La Laguna was Tenerife's first capital, and its 15th-century urban layout served as a model for colonial cities in Latin America such as Havana and Lima. Declared a UNESCO World Heritage Site in 1999, its historic centre is an open-air museum easily explored on foot.</p>

<h3>Essential Route Through the Historic Centre</h3>
<ul>
<li><strong>La Laguna Cathedral:</strong> neoclassical with a facade rebuilt in 1913. Houses the remains of conquistador Alonso Fernández de Lugo. Entry: €6 (includes museum).</li>
<li><strong>Church of La Concepción:</strong> the oldest on the island (1511). Its tower is La Laguna's symbol. Tower climb: €3 with panoramic views.</li>
<li><strong>Palacio de Nava:</strong> architectural gem blending baroque, neoclassical and mannerist styles. Entry: €5.</li>
<li><strong>Calle San Agustín:</strong> the most stately street, lined with mansions featuring traditional Canarian tea-wood balconies and interior courtyards.</li>
<li><strong>Plaza del Adelantado:</strong> the main square with the municipal market where you can buy local products.</li>
</ul>

<h3>Tapas and Gastronomy</h3>
<p>La Laguna is Tenerife's tapas capital thanks to its university atmosphere. Calle Herradores and surrounding streets have dozens of bars with tapas from €2.50. Try smoked cheese tapas, gofio croquettes and cochino negro (black pig) mini sandwiches. Local beer from €1.80.</p>

<h3>Cultural Scene</h3>
<p>As home to the University of La Laguna (the oldest in the Canary Islands, founded in 1792), the city has a youthful, cultural vibe. Concerts, exhibitions and theatre year-round. Teatro Leal offers varied programming with tickets from €10.</p>

<h3>Practical Tips</h3>
<ul>
<li>The tram connects La Laguna to Santa Cruz in 25 min (€1.35)</li>
<li>Visit the market in the morning for fresh produce and crafts</li>
<li>The historic centre is pedestrianised: perfect for walking</li>
<li>The climate is cooler than the south coast: bring a light jacket</li>
<li>Thursday and Friday nights are the liveliest for bar hopping</li>
</ul>`,
    },
    image: 'https://images.unsplash.com/photo-1677496549362-056a628cc7b3?w=1200&q=80',
    category_id: CAT.culture,
    area_id: AREA.laLaguna,
    tags: ['la-laguna', 'unesco', 'culture'],
    published: true,
    ai_generated: true,
    published_at: new Date().toISOString(),
    author: 'Tenerife Experiences',
  },

  // ARTICLE 4 — Alquiler de coche
  {
    slug: 'alquiler-coche-tenerife',
    title: {
      es: 'Alquiler de coche en Tenerife: guía completa',
      en: 'Car Rental in Tenerife: Complete Guide',
    },
    excerpt: {
      es: 'Todo lo que necesitas saber para alquilar coche en Tenerife: precios, empresas, seguros, consejos de conducción y rutas recomendadas.',
      en: 'Everything you need to know about renting a car in Tenerife: prices, companies, insurance, driving tips and recommended routes.',
    },
    content: {
      es: `<h2>Guía completa para alquilar coche en Tenerife</h2>
<p>Alquilar un coche es la mejor forma de explorar Tenerife a tu ritmo. La isla tiene 350 km de carreteras bien mantenidas, y muchos rincones espectaculares solo son accesibles en vehículo propio. Aquí tienes todo lo que necesitas saber.</p>

<h3>Precios orientativos</h3>
<ul>
<li>Temporada baja (mayo-junio, septiembre-octubre): desde 20-30€/día</li>
<li>Temporada alta (julio-agosto, Navidad, Semana Santa): 40-70€/día</li>
<li>Reservando con 2-3 meses de antelación se consiguen los mejores precios</li>
<li>Alquileres semanales: descuentos del 20-30% respecto al precio diario</li>
</ul>

<h3>Empresas recomendadas</h3>
<ul>
<li><strong>Cicar:</strong> empresa canaria con oficinas en ambos aeropuertos. Buen servicio y precios competitivos.</li>
<li><strong>AutoReisen:</strong> local, buena relación calidad-precio. Recogida en aeropuerto.</li>
<li><strong>Goldcar / Record Go:</strong> low-cost. Ojo con los seguros opcionales que suben el precio.</li>
<li><strong>Comparadores:</strong> usa DiscoverCars o RentalCars para comparar precios.</li>
</ul>

<h3>Seguros y franquicias</h3>
<p>El seguro básico (CDW) suele tener franquicia de 800-1.500€. Opciones para reducir riesgo:</p>
<ul>
<li>Seguro a todo riesgo sin franquicia en la propia empresa: 8-15€/día extra</li>
<li>Seguro externo como iCarhireinsurance: desde 3€/día (cubre la franquicia)</li>
<li>Algunas tarjetas de crédito incluyen seguro de alquiler: consulta con tu banco</li>
</ul>

<h3>Consejos de conducción</h3>
<ul>
<li>Se conduce por la derecha (como en Europa continental)</li>
<li>Carreteras de montaña con muchas curvas: conduce con calma</li>
<li>La TF-1 (sur) y TF-5 (norte) son autopistas sin peaje</li>
<li>Aparcamiento: gratuito en zonas azules los domingos. Parkings públicos: 1-2€/hora</li>
<li>Gasolina: 1,30-1,50€/litro (más barata que en la Península gracias a impuestos reducidos)</li>
</ul>

<h3>Rutas recomendadas</h3>
<ul>
<li><strong>Ruta del norte:</strong> La Laguna → Anaga → Puerto de la Cruz → Garachico (día completo)</li>
<li><strong>Ruta del Teide:</strong> subida por Vilaflor, bajada por La Orotava (medio día)</li>
<li><strong>Ruta del suroeste:</strong> Los Gigantes → Masca → Buenavista del Norte (día completo)</li>
</ul>`,
      en: `<h2>Complete Guide to Car Rental in Tenerife</h2>
<p>Renting a car is the best way to explore Tenerife at your own pace. The island has 350 km of well-maintained roads, and many spectacular spots are only accessible by car. Here is everything you need to know.</p>

<h3>Price Guide</h3>
<ul>
<li>Low season (May-June, September-October): from €20-30/day</li>
<li>High season (July-August, Christmas, Easter): €40-70/day</li>
<li>Booking 2-3 months in advance gets the best prices</li>
<li>Weekly rentals: 20-30% discounts compared to daily rates</li>
</ul>

<h3>Recommended Companies</h3>
<ul>
<li><strong>Cicar:</strong> Canarian company with offices at both airports. Good service and competitive prices.</li>
<li><strong>AutoReisen:</strong> local company, good value for money. Airport pickup available.</li>
<li><strong>Goldcar / Record Go:</strong> budget options. Watch out for optional insurance upsells that increase the price.</li>
<li><strong>Comparison sites:</strong> use DiscoverCars or RentalCars to compare prices.</li>
</ul>

<h3>Insurance and Excess</h3>
<p>Basic insurance (CDW) typically has an excess of €800-1,500. Options to reduce risk:</p>
<ul>
<li>Full coverage with zero excess from the company: €8-15/day extra</li>
<li>External insurance such as iCarhireinsurance: from €3/day (covers the excess)</li>
<li>Some credit cards include rental car insurance: check with your bank</li>
</ul>

<h3>Driving Tips</h3>
<ul>
<li>Drive on the right (as in continental Europe)</li>
<li>Mountain roads have many curves: drive calmly</li>
<li>TF-1 (south) and TF-5 (north) are toll-free motorways</li>
<li>Parking: free in blue zones on Sundays. Public car parks: €1-2/hour</li>
<li>Petrol: €1.30-1.50/litre (cheaper than mainland Spain thanks to reduced taxes)</li>
</ul>

<h3>Recommended Routes</h3>
<ul>
<li><strong>Northern route:</strong> La Laguna → Anaga → Puerto de la Cruz → Garachico (full day)</li>
<li><strong>Teide route:</strong> ascent via Vilaflor, descent via La Orotava (half day)</li>
<li><strong>Southwest route:</strong> Los Gigantes → Masca → Buenavista del Norte (full day)</li>
</ul>`,
    },
    image: 'https://images.unsplash.com/photo-1449965408869-ebd13bc9e5d8?w=1200&q=80',
    category_id: CAT.experiences,
    area_id: null,
    tags: ['car-rental', 'transport', 'practical'],
    published: true,
    ai_generated: true,
    published_at: new Date().toISOString(),
    author: 'Tenerife Experiences',
  },

  // ARTICLE 5 — Surf en Tenerife
  {
    slug: 'surf-tenerife-guia',
    title: {
      es: 'Surf en Tenerife: spots, escuelas y temporada',
      en: 'Surfing in Tenerife: Spots, Schools and Season',
    },
    excerpt: {
      es: 'Guía completa de surf en Tenerife: los mejores spots por nivel, escuelas recomendadas, temporada ideal, precios y equipamiento.',
      en: 'Complete surfing guide for Tenerife: best spots by level, recommended schools, ideal season, prices and equipment.',
    },
    content: {
      es: `<h2>Surf en Tenerife: guía completa para todos los niveles</h2>
<p>Tenerife es un destino de surf infravalorado con olas consistentes durante todo el año, agua templada (18-24°C) y una variedad de spots para todos los niveles. La isla recibe swells tanto del Atlántico norte como del sur, lo que garantiza condiciones surfables los 365 días.</p>

<h3>Mejores spots por nivel</h3>

<h3>Principiantes</h3>
<ul>
<li><strong>Playa de Las Américas (La Izquierda):</strong> ola suave y fondo de arena. Ideal para las primeras sesiones.</li>
<li><strong>El Médano:</strong> beach break con olas pequeñas y consistentes. También excelente para windsurf y kitesurf.</li>
<li><strong>Playa de Las Teresitas:</strong> olas pequeñas en días de swell moderado. Ambiente familiar.</li>
</ul>

<h3>Nivel intermedio</h3>
<ul>
<li><strong>Bajamar (La Laguna):</strong> derecha e izquierda sobre fondo de roca. Olas de 1-2 m. Mejor con marea baja.</li>
<li><strong>Almáciga (Anaga):</strong> spot poco masificado con olas potentes. Fondo de roca y arena.</li>
<li><strong>Martiánez (Puerto de la Cruz):</strong> izquierda rápida, fondo de roca. Para surfers con experiencia.</li>
</ul>

<h3>Nivel avanzado</h3>
<ul>
<li><strong>El Confital (Tacoronte):</strong> ola potente sobre roca volcánica. Solo para expertos.</li>
<li><strong>La Derecha de Benijo:</strong> ola tubera en días grandes. Acceso complicado.</li>
</ul>

<h3>Escuelas de surf recomendadas</h3>
<ul>
<li><strong>Tenerife Surf Point (Las Américas):</strong> clases grupales desde 35€ (2h, material incluido). Clases privadas: 70€.</li>
<li><strong>K16 Surf School (El Médano):</strong> especializada en principiantes. Pack 5 clases: 150€.</li>
<li><strong>Oceanside Surfschool (Bajamar):</strong> para niveles intermedios. Sesiones de coaching: 45€.</li>
</ul>

<h3>Temporada y condiciones</h3>
<ul>
<li><strong>Mejor época:</strong> octubre a marzo (swells del norte más consistentes y potentes)</li>
<li><strong>Verano:</strong> olas más pequeñas pero ideales para principiantes</li>
<li><strong>Temperatura del agua:</strong> 18°C en invierno, 24°C en verano</li>
<li><strong>Neopreno:</strong> shorty 2mm en verano, 3/2mm en invierno</li>
</ul>

<h3>Alquiler de material</h3>
<ul>
<li>Tabla de surf: 15-20€/día, 60-80€/semana</li>
<li>Neopreno: 5-10€/día</li>
<li>Pack completo (tabla + neopreno): 20-25€/día</li>
</ul>`,
      en: `<h2>Surfing in Tenerife: Complete Guide for All Levels</h2>
<p>Tenerife is an underrated surf destination with consistent waves year-round, warm water (18-24°C) and a variety of spots for all levels. The island receives swells from both the North and South Atlantic, ensuring surfable conditions 365 days a year.</p>

<h3>Best Spots by Level</h3>

<h3>Beginners</h3>
<ul>
<li><strong>Playa de Las Américas (La Izquierda):</strong> soft wave with sandy bottom. Ideal for first sessions.</li>
<li><strong>El Médano:</strong> beach break with small, consistent waves. Also excellent for windsurfing and kitesurfing.</li>
<li><strong>Playa de Las Teresitas:</strong> small waves on moderate swell days. Family-friendly atmosphere.</li>
</ul>

<h3>Intermediate Level</h3>
<ul>
<li><strong>Bajamar (La Laguna):</strong> right and left over rocky bottom. 1-2 m waves. Best at low tide.</li>
<li><strong>Almáciga (Anaga):</strong> uncrowded spot with powerful waves. Rock and sand bottom.</li>
<li><strong>Martiánez (Puerto de la Cruz):</strong> fast left, rocky bottom. For experienced surfers.</li>
</ul>

<h3>Advanced Level</h3>
<ul>
<li><strong>El Confital (Tacoronte):</strong> powerful wave over volcanic rock. Experts only.</li>
<li><strong>La Derecha de Benijo:</strong> barrel wave on big days. Tricky access.</li>
</ul>

<h3>Recommended Surf Schools</h3>
<ul>
<li><strong>Tenerife Surf Point (Las Américas):</strong> group lessons from €35 (2h, equipment included). Private lessons: €70.</li>
<li><strong>K16 Surf School (El Médano):</strong> specialising in beginners. 5-lesson pack: €150.</li>
<li><strong>Oceanside Surfschool (Bajamar):</strong> for intermediate levels. Coaching sessions: €45.</li>
</ul>

<h3>Season and Conditions</h3>
<ul>
<li><strong>Best time:</strong> October to March (more consistent and powerful northern swells)</li>
<li><strong>Summer:</strong> smaller waves but ideal for beginners</li>
<li><strong>Water temperature:</strong> 18°C in winter, 24°C in summer</li>
<li><strong>Wetsuit:</strong> shorty 2mm in summer, 3/2mm in winter</li>
</ul>

<h3>Equipment Rental</h3>
<ul>
<li>Surfboard: €15-20/day, €60-80/week</li>
<li>Wetsuit: €5-10/day</li>
<li>Complete pack (board + wetsuit): €20-25/day</li>
</ul>`,
    },
    image: 'https://images.unsplash.com/photo-1502680390548-bdbac40e4a9f?w=1200&q=80',
    category_id: CAT.experiences,
    area_id: null,
    tags: ['surf', 'water-sports', 'adventure'],
    published: true,
    ai_generated: true,
    published_at: new Date().toISOString(),
    author: 'Tenerife Experiences',
  },
];

async function main() {
  console.log('Inserting 5 SEO blog articles (batch 2b)...\n');

  for (const article of articles) {
    const { data, error } = await supabase
      .from('articles')
      .upsert(article, { onConflict: 'slug' })
      .select('id, slug');

    if (error) {
      console.error(`ERROR [${article.slug}]:`, error.message);
    } else {
      console.log(`OK [${article.slug}] →`, data?.[0]?.id);
    }
  }

  console.log('\nDone!');
}

main();
