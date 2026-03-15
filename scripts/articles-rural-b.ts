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
  // 6. Navidad y Fin de Año en Tenerife
  {
    slug: 'tenerife-navidad-fin-ano',
    title: {
      es: 'Navidad y Fin de Año en Tenerife: qué hacer y dónde ir',
      en: 'Christmas and New Year in Tenerife: What to Do and Where to Go',
    },
    excerpt: {
      es: 'Celebra Navidad y Fin de Año en Tenerife: belenes vivientes, mercadillos navideños, cenas con vistas al mar y la mejor Nochevieja bajo las estrellas.',
      en: 'Celebrate Christmas and New Year in Tenerife: living nativity scenes, Christmas markets, dinners with sea views and the best New Year under the stars.',
    },
    content: {
      es: `<h2>Navidad y Fin de Año en Tenerife</h2>
<p>Pasar la Navidad en Tenerife es celebrar las fiestas con 20 grados, palmeras iluminadas y el sonido del Atlántico de fondo. La isla combina las tradiciones navideñas canarias con un clima que permite disfrutar de actividades al aire libre incluso en pleno diciembre. Desde belenes vivientes en pueblos de montaña hasta fiestas de Nochevieja frente al mar, Tenerife ofrece una Navidad diferente e inolvidable.</p>

<h3>Tradiciones navideñas canarias</h3>
<ul>
<li><strong>Belenes vivientes:</strong> pueblos como Candelaria, Arona y La Laguna organizan representaciones del nacimiento con vecinos disfrazados, animales reales y escenarios artesanales. El de Candelaria reúne a más de 200 figurantes.</li>
<li><strong>Rancho de Pascua:</strong> tradición musical canaria navideña con grupos que recorren las casas cantando villancicos con instrumentos tradicionales como el timple, la pandereta y la espátula.</li>
<li><strong>Mercadillos navideños:</strong> Santa Cruz, La Laguna y Puerto de la Cruz montan mercadillos con artesanía local, dulces canarios como truchas de batata y turrones artesanales.</li>
</ul>

<h3>Nochevieja en Tenerife</h3>
<ul>
<li><strong>Santa Cruz:</strong> la plaza de España organiza la fiesta más grande con DJ, orquestas en vivo y las doce uvas bajo fuegos artificiales. Miles de personas celebran al aire libre con temperatura agradable.</li>
<li><strong>Playa de las Américas:</strong> fiestas en hoteles y discotecas con cena de gala y barra libre. Las calles de la Verónica se llenan de celebración hasta el amanecer.</li>
<li><strong>Puerto de la Cruz:</strong> ambiente más familiar con las campanadas en la plaza del Charco, fuegos artificiales sobre el mar y terrazas para brindar.</li>
<li><strong>Galas de hotel:</strong> los hoteles de cinco estrellas de Costa Adeje ofrecen cenas de gala con espectáculo y fiesta. Reserva con semanas de antelación.</li>
</ul>

<h3>Actividades en Navidad</h3>
<p>El clima permite <strong>senderismo por la mañana y playa por la tarde</strong>. Visita el Teide nevado en su cumbre mientras la costa disfruta de sol. Los parques temáticos como Siam Park y Loro Parque tienen horarios especiales navideños. Los guachinches abren con menús festivos de cochino, papas arrugadas y vino del país.</p>

<h3>Consejos prácticos</h3>
<p>Navidad es temporada alta: reserva vuelos y alojamiento con meses de antelación. Los restaurantes para Nochebuena y Nochevieja se llenan rápido. Lleva ropa ligera para el día y una chaqueta para las noches. El 5 de enero, la Cabalgata de Reyes Magos recorre las principales ciudades con carrozas espectaculares.</p>`,

      en: `<h2>Christmas and New Year in Tenerife</h2>
<p>Spending Christmas in Tenerife means celebrating the holidays at 20 degrees, with illuminated palm trees and the sound of the Atlantic in the background. The island combines Canarian Christmas traditions with a climate that allows outdoor activities even in the middle of December. From living nativity scenes in mountain villages to New Year's Eve parties by the sea, Tenerife offers a different and unforgettable Christmas.</p>

<h3>Canarian Christmas Traditions</h3>
<ul>
<li><strong>Living nativity scenes:</strong> villages like Candelaria, Arona and La Laguna organise nativity re-enactments with costumed locals, real animals and handcrafted sets. The one in Candelaria features over 200 performers.</li>
<li><strong>Rancho de Pascua:</strong> a Canarian Christmas music tradition with groups visiting homes singing carols with traditional instruments such as the timple, tambourine and spatula.</li>
<li><strong>Christmas markets:</strong> Santa Cruz, La Laguna and Puerto de la Cruz set up markets with local crafts, Canarian sweets like batata pastries and artisan nougat.</li>
</ul>

<h3>New Year's Eve in Tenerife</h3>
<ul>
<li><strong>Santa Cruz:</strong> Plaza de España hosts the biggest party with DJs, live bands and the twelve grapes under fireworks. Thousands celebrate outdoors in comfortable temperatures.</li>
<li><strong>Playa de las Américas:</strong> hotel and club parties with gala dinners and open bars. The Verónica strip fills with celebration until dawn.</li>
<li><strong>Puerto de la Cruz:</strong> a more family-friendly atmosphere with the countdown at Plaza del Charco, fireworks over the sea and terraces for toasting.</li>
<li><strong>Hotel galas:</strong> five-star hotels in Costa Adeje offer gala dinners with shows and parties. Book weeks in advance.</li>
</ul>

<h3>Christmas Activities</h3>
<p>The climate allows <strong>hiking in the morning and beach in the afternoon</strong>. Visit the snow-capped summit of Teide while the coast enjoys sunshine. Theme parks like Siam Park and Loro Parque have special Christmas hours. Guachinches open with festive menus of roast pork, wrinkly potatoes and local wine.</p>

<h3>Practical Tips</h3>
<p>Christmas is high season: book flights and accommodation months ahead. Restaurants for Christmas Eve and New Year fill quickly. Pack light clothes for the day and a jacket for evenings. On 5 January, the Three Kings Parade passes through the main cities with spectacular floats.</p>`,
    },
    category_id: CAT.culture,
    tags: ['christmas', 'new-year', 'seasonal', 'winter'],
    image_url: 'https://images.unsplash.com/photo-1547234935-80c7145ec969?w=1200&q=80',
  },

  // 7. Anaga Reserva de la Biosfera
  {
    slug: 'anaga-biosfera-guia-completa',
    title: {
      es: 'Anaga Reserva de la Biosfera: guía completa del bosque milenario',
      en: 'Anaga Biosphere Reserve: Complete Guide to the Ancient Forest',
    },
    excerpt: {
      es: 'Guía completa de la Reserva de la Biosfera de Anaga: rutas de senderismo, laurisilva milenaria, caseríos rurales y los secretos del bosque más antiguo de Tenerife.',
      en: 'Complete guide to the Anaga Biosphere Reserve: hiking trails, ancient laurel forest, rural hamlets and secrets of Tenerife\'s oldest forest.',
    },
    content: {
      es: `<h2>Anaga: guía completa del bosque milenario</h2>
<p>El macizo de Anaga, declarado Reserva de la Biosfera por la UNESCO en 2015, es uno de los tesoros naturales más valiosos de Europa. Este rincón del noreste de Tenerife alberga el bosque de laurisilva más extenso de Canarias, con especies vegetales que datan de la Era Terciaria, hace más de 20 millones de años. Con barrancos profundos, crestas afiladas envueltas en niebla y caseríos aislados, Anaga es la Tenerife más salvaje y primigenia.</p>

<h3>El bosque de laurisilva</h3>
<p>La <strong>laurisilva</strong> es un tipo de bosque subtropical húmedo que cubría el sur de Europa hace millones de años y que hoy solo sobrevive en los archipiélagos macaronésicos. En Anaga, este bosque relicto crece entre los 600 y 1.000 metros de altitud, alimentado por la niebla constante que los alisios traen desde el Atlántico. Helechos gigantes, musgos espesos, laureles y brezos forman una catedral verde donde la luz llega filtrada y el silencio es absoluto.</p>

<h3>Las mejores rutas de senderismo</h3>
<ul>
<li><strong>Cruz del Carmen - Punta del Hidalgo:</strong> la ruta clásica de Anaga. 12 km de descenso desde la cumbre hasta la costa a través del bosque. Dificultad media-alta. Necesitas transporte de vuelta.</li>
<li><strong>Sendero de los Sentidos:</strong> ruta corta y accesible de 1,5 km ideal para familias. Atraviesa lo mejor de la laurisilva con paneles interpretativos. Desde Cruz del Carmen.</li>
<li><strong>Roque Negro - Taborno:</strong> ruta circular por los roques más emblemáticos de Anaga. Vistas de vértigo y paisajes de postal. Dificultad media.</li>
<li><strong>Chamorga - Faro de Anaga:</strong> sendero hasta el extremo más oriental de Tenerife. Paisaje costero espectacular con acantilados y mar azul. 14 km ida y vuelta.</li>
<li><strong>Afur - Playa de Tamadite:</strong> descenso por el barranco de Afur hasta una playa de piedras aislada. Ruta exigente pero gratificante. Cuidado con las mareas.</li>
</ul>

<h3>Caseríos y vida rural</h3>
<p>Anaga conserva aldeas donde el tiempo parece haberse detenido. <strong>Chinamada</strong> con sus casas-cueva, <strong>Taborno</strong> encaramado en su cresta, <strong>Chamorga</strong> al final de la carretera y <strong>El Batán</strong> con sus huertas son ejemplos de vida rural que resiste al paso del siglo XXI. Algunos caseríos solo son accesibles a pie.</p>

<h3>Información práctica</h3>
<p>El Centro de Visitantes de Cruz del Carmen ofrece mapas, información de rutas y exposiciones sobre la biodiversidad. Lleva calzado de montaña, impermeable ligero y agua. La niebla puede bajar de repente. No hay cobertura móvil en muchas zonas. El acceso en guagua (líneas 076 y 077 desde La Laguna) permite hacer rutas lineales sin coche.</p>`,

      en: `<h2>Anaga: Complete Guide to the Ancient Forest</h2>
<p>The Anaga massif, declared a UNESCO Biosphere Reserve in 2015, is one of Europe's most valuable natural treasures. This corner of northeast Tenerife harbours the most extensive laurel forest in the Canaries, with plant species dating back to the Tertiary Era, over 20 million years ago. With deep ravines, sharp ridges wrapped in mist and isolated hamlets, Anaga is Tenerife at its wildest and most primeval.</p>

<h3>The Laurel Forest</h3>
<p>The <strong>laurisilva</strong> is a type of subtropical moist forest that covered southern Europe millions of years ago and today survives only in the Macaronesian archipelagos. In Anaga, this relic forest grows between 600 and 1,000 metres altitude, fed by the constant mist that the trade winds carry from the Atlantic. Giant ferns, thick mosses, laurels and heathers form a green cathedral where light filters through and silence is absolute.</p>

<h3>Best Hiking Trails</h3>
<ul>
<li><strong>Cruz del Carmen - Punta del Hidalgo:</strong> the classic Anaga route. 12 km descent from the ridge to the coast through the forest. Medium-high difficulty. You need return transport.</li>
<li><strong>Sendero de los Sentidos:</strong> a short, accessible 1.5 km trail ideal for families. It crosses the best of the laurel forest with interpretive panels. From Cruz del Carmen.</li>
<li><strong>Roque Negro - Taborno:</strong> a circular route past Anaga's most iconic rock formations. Vertigo-inducing views and postcard landscapes. Medium difficulty.</li>
<li><strong>Chamorga - Anaga Lighthouse:</strong> a trail to the easternmost point of Tenerife. Spectacular coastal scenery with cliffs and blue sea. 14 km return.</li>
<li><strong>Afur - Playa de Tamadite:</strong> descent through the Afur ravine to an isolated pebble beach. Demanding but rewarding. Watch the tides.</li>
</ul>

<h3>Hamlets and Rural Life</h3>
<p>Anaga preserves villages where time seems to have stopped. <strong>Chinamada</strong> with its cave houses, <strong>Taborno</strong> perched on its ridge, <strong>Chamorga</strong> at the end of the road and <strong>El Batán</strong> with its vegetable gardens are examples of rural life that resists the march of the 21st century. Some hamlets are only accessible on foot.</p>

<h3>Practical Information</h3>
<p>The Cruz del Carmen Visitor Centre offers maps, trail information and exhibitions on biodiversity. Wear hiking boots, bring a light waterproof and water. Fog can descend suddenly. There is no mobile signal in many areas. Bus access (lines 076 and 077 from La Laguna) allows linear routes without a car.</p>`,
    },
    category_id: CAT.nature,
    tags: ['anaga', 'biosphere', 'forest', 'hiking'],
    image_url: 'https://images.unsplash.com/photo-1626033005784-e6c39eaa0669?w=1200&q=80',
  },

  // 8. Teno Rural
  {
    slug: 'teno-rural-senderismo-masca',
    title: {
      es: 'Teno Rural: senderismo, Masca y el oeste salvaje de Tenerife',
      en: 'Rural Teno: Hiking, Masca and the Wild West of Tenerife',
    },
    excerpt: {
      es: 'Descubre el macizo de Teno: la ruta del Barranco de Masca, pueblos rurales, acantilados espectaculares y el faro más occidental de Tenerife.',
      en: 'Discover the Teno massif: the Masca Ravine trail, rural villages, spectacular cliffs and Tenerife\'s westernmost lighthouse.',
    },
    content: {
      es: `<h2>Teno Rural: el oeste salvaje de Tenerife</h2>
<p>El macizo de Teno ocupa el extremo noroeste de Tenerife y es una de las zonas más espectaculares y menos masificadas de la isla. Con acantilados que caen 500 metros al mar, barrancos profundos tallados durante millones de años, pueblos aislados y un faro en el fin del mundo, Teno es la Tenerife que los turistas de playa nunca ven. Es territorio de senderistas, amantes de la naturaleza y buscadores de autenticidad.</p>

<h3>El Barranco de Masca</h3>
<p>La ruta del <strong>Barranco de Masca</strong> es la más famosa de Tenerife y una de las más espectaculares de Canarias. El sendero desciende desde el pueblo de Masca a 650 metros de altitud hasta la playa, a través de un cañón de paredes verticales de hasta 400 metros. Son 4,5 km de descenso con tramos de escalada ligera, cruces de arroyo y vegetación subtropical. La ruta requiere <strong>reserva previa obligatoria</strong> y buen estado físico. Al final, un barco te lleva a Los Gigantes.</p>

<h3>Pueblos de Teno</h3>
<ul>
<li><strong>Masca:</strong> el pueblo más fotografiado de Tenerife. Casas de piedra encaramadas en un barranco con vistas al océano. Llegó la electricidad en los años 80. Restaurantes con terraza y vistas imposibles.</li>
<li><strong>El Palmar:</strong> valle agrícola rodeado de acantilados con cultivos de papas antiguas y viñedos en bancales. Los mejores guachinches de la zona.</li>
<li><strong>Teno Alto:</strong> meseta ganadera a 800 metros de altitud donde se elabora el queso fresco de cabra más auténtico de Tenerife. Carretera estrecha y paisaje lunar.</li>
<li><strong>Los Silos:</strong> pueblo costero tranquilo con casco histórico, plaza con laureles centenarios y acceso a senderos del barranco de Masca por el norte.</li>
</ul>

<h3>Rutas de senderismo</h3>
<ul>
<li><strong>Punta de Teno:</strong> sendero costero hasta el faro más occidental de Tenerife. Vistas de Los Gigantes y La Gomera. Acceso en coche restringido en verano, usar guagua.</li>
<li><strong>Erjos - Las Portelas:</strong> ruta circular por la dorsal de Teno entre charcos, laurisilva y vistas a ambas vertientes de la isla.</li>
<li><strong>Monte del Agua:</strong> sendero entre Los Silos y Erjos a través de un bosque de laurisilva y monteverde con helechos gigantes y niebla constante.</li>
</ul>

<h3>Consejos prácticos</h3>
<p>La carretera de acceso a Masca (TF-436) es sinuosa y estrecha. Conduce con precaución y no aparques en doble fila. Reserva la ruta del barranco con antelación en la web del Cabildo. Lleva calzado de montaña, agua abundante y protección solar. Los guachinches de El Palmar cierran cuando se acaba el vino, así que ve temprano.</p>`,

      en: `<h2>Rural Teno: The Wild West of Tenerife</h2>
<p>The Teno massif occupies the far northwest of Tenerife and is one of the island's most spectacular and least crowded areas. With cliffs dropping 500 metres to the sea, deep ravines carved over millions of years, isolated villages and a lighthouse at the end of the world, Teno is the Tenerife that beach tourists never see. It is territory for hikers, nature lovers and seekers of authenticity.</p>

<h3>The Masca Ravine</h3>
<p>The <strong>Masca Ravine</strong> trail is Tenerife's most famous and one of the most spectacular in the Canaries. The path descends from the village of Masca at 650 metres altitude to the beach, through a canyon with vertical walls up to 400 metres high. It covers 4.5 km of descent with sections of light scrambling, stream crossings and subtropical vegetation. The route requires <strong>mandatory advance booking</strong> and good fitness. At the end, a boat takes you to Los Gigantes.</p>

<h3>Teno Villages</h3>
<ul>
<li><strong>Masca:</strong> the most photographed village in Tenerife. Stone houses perched in a ravine with ocean views. Electricity arrived in the 1980s. Restaurants with terraces and impossible views.</li>
<li><strong>El Palmar:</strong> an agricultural valley surrounded by cliffs with heirloom potato crops and terraced vineyards. The best guachinches in the area.</li>
<li><strong>Teno Alto:</strong> a farming plateau at 800 metres where Tenerife's most authentic fresh goat's cheese is made. Narrow road and lunar landscape.</li>
<li><strong>Los Silos:</strong> a quiet coastal town with a historic centre, a square with century-old laurels and access to the Masca ravine trails from the north.</li>
</ul>

<h3>Hiking Routes</h3>
<ul>
<li><strong>Punta de Teno:</strong> a coastal trail to Tenerife's westernmost lighthouse. Views of Los Gigantes and La Gomera. Car access restricted in summer — use the bus.</li>
<li><strong>Erjos - Las Portelas:</strong> a circular route along the Teno ridge past pools, laurel forest and views of both sides of the island.</li>
<li><strong>Monte del Agua:</strong> a trail between Los Silos and Erjos through laurel and heath forest with giant ferns and constant mist.</li>
</ul>

<h3>Practical Tips</h3>
<p>The access road to Masca (TF-436) is winding and narrow. Drive carefully and do not double-park. Book the ravine route in advance on the Cabildo website. Bring hiking boots, plenty of water and sun protection. The guachinches in El Palmar close when the wine runs out, so go early.</p>`,
    },
    category_id: CAT.nature,
    tags: ['teno', 'masca', 'rural', 'hiking'],
    image_url: 'https://images.unsplash.com/photo-1667930579266-a07c450f709f?w=1200&q=80',
  },

  // 9. Ruta de guachinches
  {
    slug: 'guachinches-ruta-norte-tenerife',
    title: {
      es: 'Ruta de guachinches por el norte de Tenerife: los 20 mejores',
      en: 'Guachinche Route in Northern Tenerife: The 20 Best',
    },
    excerpt: {
      es: 'Guía definitiva de los mejores guachinches del norte de Tenerife: dónde comer como un local, vino del país, carne de fiesta y papas arrugadas auténticas.',
      en: 'The definitive guide to the best guachinches in northern Tenerife: where to eat like a local, country wine, party meat and authentic wrinkly potatoes.',
    },
    content: {
      es: `<h2>Ruta de guachinches por el norte de Tenerife</h2>
<p>Los guachinches son uno de los secretos gastronómicos mejor guardados de Tenerife. Estos establecimientos familiares, originalmente garajes o patios de casas rurales, abren sus puertas cuando el vino de la cosecha propia está listo y cierran cuando se acaba. Sirven comida casera canaria abundante y barata acompañada de vino del país que no encontrarás en ninguna carta de restaurante. Son la esencia de la gastronomía popular tinerfeña y una experiencia imprescindible.</p>

<h3>Zona Tacoronte-Acentejo</h3>
<ul>
<li><strong>Guachinche El Cubano (La Matanza):</strong> carne de fiesta espectacular, costillas adobadas y conejo en salmorejo. Vino tinto suave de elaboración propia. Cola habitual los fines de semana.</li>
<li><strong>Casa Efigenia (Tacoronte):</strong> tradición de tres generaciones. Papas arrugadas con mojo rojo que marca el estándar. Garbanzas y puchero canario los jueves.</li>
<li><strong>Bodegón Campestre (El Sauzal):</strong> terraza con vistas al Teide. Chuletas a la brasa, queso asado con mojo y vino blanco fresco del Valle de La Orotava.</li>
<li><strong>Guachinche La Era (La Victoria):</strong> escondido en una finca con viñedos. Carne adobada, papas con piña y vino tinto con carácter. Ambiente auténtico.</li>
<li><strong>Casa Tomás (Tegueste):</strong> uno de los más antiguos. Puchero canario, ropa vieja y carne de cochino. Vino a granel servido en jarras de barro.</li>
</ul>

<h3>Zona La Orotava-Los Realejos</h3>
<ul>
<li><strong>Guachinche Pepe Luis (La Orotava):</strong> costillas de cerdo al horno, chorizo casero y escaldon de gofio. Vino tinto de Orotava con denominación de origen.</li>
<li><strong>La Casona (Los Realejos):</strong> conejo en salmorejo, carne de cabra y potaje de berros. Huerto propio con verduras de temporada.</li>
<li><strong>El Lagar (La Orotava):</strong> dentro de una bodega centenaria. Queso fresco de cabra, papas negras y vino blanco seco mineral. Experiencia auténtica.</li>
</ul>

<h3>Zona Tegueste-Anaga</h3>
<ul>
<li><strong>Guachinche de María (Tegueste):</strong> la reina de las garbanzas. Platos enormes, vino suave y postre casero. Cierra temprano porque se llena.</li>
<li><strong>Bodegón Anaga (Las Mercedes):</strong> a la entrada del bosque de Anaga. Carne a la brasa, papas arrugadas y queso ahumado. Parada obligatoria antes del senderismo.</li>
</ul>

<h3>Reglas del guachinche</h3>
<ul>
<li>No aceptan tarjeta: lleva efectivo siempre</li>
<li>No hay carta: te dicen lo que hay y punto</li>
<li>Los mejores abren solo de viernes a domingo al mediodía</li>
<li>Precio medio: 8-12 euros por persona con bebida incluida</li>
<li>Si hay cola es buena señal. Ten paciencia</li>
<li>Busca los que tienen viñedos propios para el vino más auténtico</li>
<li>Los guachinches cambian cada temporada. Pregunta a los locales por los que están abiertos</li>
</ul>`,

      en: `<h2>Guachinche Route in Northern Tenerife</h2>
<p>Guachinches are one of Tenerife's best-kept gastronomic secrets. These family-run establishments, originally garages or courtyards of rural houses, open their doors when the wine from their own harvest is ready and close when it runs out. They serve abundant, cheap homemade Canarian food alongside country wine you will not find on any restaurant menu. They are the essence of popular Tinerfeño cuisine and an unmissable experience.</p>

<h3>Tacoronte-Acentejo Area</h3>
<ul>
<li><strong>Guachinche El Cubano (La Matanza):</strong> spectacular party meat, marinated ribs and rabbit in salmorejo. Smooth house-made red wine. Queues common at weekends.</li>
<li><strong>Casa Efigenia (Tacoronte):</strong> three generations of tradition. Wrinkly potatoes with red mojo that sets the standard. Chickpea stew and Canarian puchero on Thursdays.</li>
<li><strong>Bodegón Campestre (El Sauzal):</strong> terrace with Teide views. Grilled chops, roasted cheese with mojo and fresh white wine from the Orotava Valley.</li>
<li><strong>Guachinche La Era (La Victoria):</strong> hidden in a vineyard estate. Marinated meat, potatoes with pineapple and characterful red wine. Authentic atmosphere.</li>
<li><strong>Casa Tomás (Tegueste):</strong> one of the oldest. Canarian puchero, ropa vieja and pork. Bulk wine served in clay jugs.</li>
</ul>

<h3>La Orotava-Los Realejos Area</h3>
<ul>
<li><strong>Guachinche Pepe Luis (La Orotava):</strong> oven-roasted pork ribs, homemade chorizo and gofio escaldón. Red wine from Orotava with denomination of origin.</li>
<li><strong>La Casona (Los Realejos):</strong> rabbit in salmorejo, goat meat and watercress stew. Their own vegetable garden with seasonal produce.</li>
<li><strong>El Lagar (La Orotava):</strong> inside a century-old winery. Fresh goat's cheese, black potatoes and dry mineral white wine. An authentic experience.</li>
</ul>

<h3>Tegueste-Anaga Area</h3>
<ul>
<li><strong>Guachinche de María (Tegueste):</strong> the queen of chickpea stew. Enormous portions, smooth wine and homemade dessert. Closes early because it fills up.</li>
<li><strong>Bodegón Anaga (Las Mercedes):</strong> at the entrance to the Anaga forest. Grilled meat, wrinkly potatoes and smoked cheese. A mandatory stop before hiking.</li>
</ul>

<h3>Guachinche Rules</h3>
<ul>
<li>They do not accept cards: always bring cash</li>
<li>There is no menu: they tell you what is available and that is it</li>
<li>The best ones open only Friday to Sunday at lunchtime</li>
<li>Average price: 8-12 euros per person including drink</li>
<li>If there is a queue it is a good sign. Be patient</li>
<li>Look for those with their own vineyards for the most authentic wine</li>
<li>Guachinches change every season. Ask locals which ones are open</li>
</ul>`,
    },
    category_id: CAT.food,
    tags: ['guachinches', 'route', 'north', 'traditional'],
    image_url: 'https://images.unsplash.com/photo-1624458989436-7f2535c8c339?w=1200&q=80',
  },

  // 10. Piscinas naturales secretas
  {
    slug: 'piscinas-naturales-tenerife-secretas',
    title: {
      es: 'Piscinas naturales secretas de Tenerife: las que no salen en las guías',
      en: 'Secret Natural Pools in Tenerife: The Ones Not in the Guides',
    },
    excerpt: {
      es: 'Las piscinas naturales más secretas de Tenerife: charcos volcánicos, pozas escondidas y rincones para bañarse que solo conocen los locales.',
      en: 'Tenerife\'s most secret natural pools: volcanic rock pools, hidden bathing spots and swimming holes known only to locals.',
    },
    content: {
      es: `<h2>Piscinas naturales secretas de Tenerife</h2>
<p>Tenerife tiene más de 350 kilómetros de costa volcánica salpicada de piscinas naturales formadas por la lava. Mientras los turistas se agolpan en las playas del sur, los tinerfeños disfrutan de charcos y pozas escondidas donde el océano entra filtrado entre las rocas creando piscinas de agua cristalina. Algunos son conocidos, pero otros solo los frecuentan los vecinos del barrio. Aquí tienes los que no salen en las guías convencionales.</p>

<h3>Costa norte: charcos escondidos</h3>
<ul>
<li><strong>Charco de La Laja (San Juan de la Rambla):</strong> piscina natural perfecta encajada entre rocas volcánicas negras. Agua tranquila incluso con oleaje. Acceso por escaleras talladas en la roca. Pocos turistas llegan aquí.</li>
<li><strong>Charco del Viento (La Guancha):</strong> conjunto de pozas naturales conectadas por canales de lava. Agua renovada constantemente por las olas. Un anfiteatro volcánico natural con el Atlántico de fondo.</li>
<li><strong>El Caletón de Garachico:</strong> las más famosas del norte pero hay zonas alejadas que los turistas ignoran. Rodea las piscinas principales y encontrarás pozas solitarias entre las coladas de lava.</li>
<li><strong>Charco de los Chochos (Tacoronte):</strong> poza pequeña y profunda escondida bajo los acantilados de Mesa del Mar. Acceso por sendero empinado. Solo para aventureros.</li>
</ul>

<h3>Costa este: pozas volcánicas</h3>
<ul>
<li><strong>Piscinas de Jover (Tacoronte):</strong> plataforma de lava con varias pozas naturales de diferentes tamaños. Agua cristalina y poco profunda en algunas, ideal para niños. Sin servicios pero con encanto salvaje.</li>
<li><strong>Charco de Araña (Candelaria):</strong> charco grande y profundo al que se accede por un camino de tierra. Popular entre los locales de la zona pero desconocido para los turistas. Cuidado con el oleaje fuerte.</li>
<li><strong>Piscinas de El Pris (Tacoronte):</strong> pueblo pesquero diminuto con charcos naturales protegidos. Los pescadores locales se bañan al atardecer. Ambiente genuino y sin pretensiones.</li>
</ul>

<h3>Costa oeste: el secreto mejor guardado</h3>
<ul>
<li><strong>Charco de Isla Baja (Los Silos):</strong> enorme piscina natural formada por una plataforma de lava centenaria. Agua turquesa en días de calma. Acceso por carretera desde Los Silos.</li>
<li><strong>Charco de Las Iguanas (Buenavista):</strong> pozas escondidas bajo los acantilados de Teno. Solo accesibles con marea baja y buen conocimiento de la zona. Para expertos.</li>
<li><strong>El Caletón de Interián (Garachico):</strong> fuera del circuito turístico de Garachico, estas pozas al este del pueblo son frecuentadas solo por vecinos. Tranquilidad garantizada.</li>
</ul>

<h3>Consejos de seguridad</h3>
<ul>
<li>Consulta siempre el estado del mar antes de bañarte en piscinas naturales</li>
<li>Nunca te bañes con bandera roja o fuerte oleaje del norte</li>
<li>Usa escarpines: las rocas volcánicas son cortantes y resbaladizas</li>
<li>No vayas solo a charcos aislados. Avisa siempre de tu ubicación</li>
<li>Respeta el entorno: no dejes basura y no alteres las pozas</li>
<li>Las mejores condiciones son en verano con mareas bajas y viento sur</li>
</ul>`,

      en: `<h2>Secret Natural Pools in Tenerife</h2>
<p>Tenerife has over 350 kilometres of volcanic coastline dotted with natural pools formed by lava. While tourists crowd the southern beaches, locals enjoy hidden rock pools where the ocean filters between rocks creating crystal-clear swimming spots. Some are well known, but others are frequented only by neighbourhood residents. Here are the ones that do not appear in conventional guides.</p>

<h3>North Coast: Hidden Rock Pools</h3>
<ul>
<li><strong>Charco de La Laja (San Juan de la Rambla):</strong> a perfect natural pool set between black volcanic rocks. Calm water even with swell. Access via stairs carved into the rock. Few tourists reach here.</li>
<li><strong>Charco del Viento (La Guancha):</strong> a cluster of natural pools connected by lava channels. Water constantly renewed by the waves. A natural volcanic amphitheatre with the Atlantic as backdrop.</li>
<li><strong>El Caletón de Garachico:</strong> the most famous in the north but there are remote areas tourists overlook. Walk past the main pools and you will find solitary bathing spots among the lava flows.</li>
<li><strong>Charco de los Chochos (Tacoronte):</strong> a small, deep pool hidden beneath the cliffs of Mesa del Mar. Access via a steep path. For adventurers only.</li>
</ul>

<h3>East Coast: Volcanic Pools</h3>
<ul>
<li><strong>Piscinas de Jover (Tacoronte):</strong> a lava platform with several natural pools of different sizes. Crystal-clear and shallow in some, ideal for children. No facilities but with wild charm.</li>
<li><strong>Charco de Araña (Candelaria):</strong> a large, deep pool reached by a dirt track. Popular with locals but unknown to tourists. Beware of strong swell.</li>
<li><strong>Piscinas de El Pris (Tacoronte):</strong> a tiny fishing village with sheltered natural pools. Local fishermen bathe at sunset. A genuine, unpretentious atmosphere.</li>
</ul>

<h3>West Coast: The Best-Kept Secret</h3>
<ul>
<li><strong>Charco de Isla Baja (Los Silos):</strong> a huge natural pool formed by an ancient lava platform. Turquoise water on calm days. Road access from Los Silos.</li>
<li><strong>Charco de Las Iguanas (Buenavista):</strong> pools hidden beneath the Teno cliffs. Only accessible at low tide with good local knowledge. For experts.</li>
<li><strong>El Caletón de Interián (Garachico):</strong> outside the tourist circuit of Garachico, these pools east of the town are frequented only by neighbours. Tranquillity guaranteed.</li>
</ul>

<h3>Safety Tips</h3>
<ul>
<li>Always check sea conditions before swimming in natural pools</li>
<li>Never swim with a red flag or strong northern swell</li>
<li>Wear water shoes: volcanic rocks are sharp and slippery</li>
<li>Do not go to isolated pools alone. Always share your location</li>
<li>Respect the environment: leave no rubbish and do not alter the pools</li>
<li>Best conditions are in summer with low tides and southerly wind</li>
</ul>`,
    },
    category_id: CAT.nature,
    tags: ['natural-pools', 'secret', 'swimming', 'volcanic'],
    image_url: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=1200&q=80',
  },
];

async function main() {
  console.log('Inserting rural batch B: 5 blog articles...\n');

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

  console.log('\nRural batch B done!');
}

main();
