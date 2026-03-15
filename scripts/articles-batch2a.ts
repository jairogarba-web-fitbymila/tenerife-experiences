import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://sqesgghvaazyajzjkoap.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxZXNnZ2h2YWF6eWFqemprb2FwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzUxMzgwOSwiZXhwIjoyMDg5MDg5ODA5fQ.UvbRfWU9seJPT9lyCyLmpD4uZrP9jXzsNoeSAjT9HnI'
);

const CAT = {
  experiences: '4af61632-1baa-457e-990e-e2e71a27def8',
  beaches: 'ffb0cb8c-4606-4abd-911e-c5d1dc05b88e',
  nature: '56eb6a9a-7360-48ec-a1a0-a7a74bef61b5',
  family: '7c862757-265e-4702-aa94-612999ccff62',
};

const AREA = {
  losGigantes: '79f9a75a-91df-4349-9346-dedbe74df4c1',
  teide: '8ec81dab-0200-4635-9673-6e2f88f7182b',
};

const articles = [
  // 1. Subir al Teide
  {
    slug: 'subir-al-teide-guia-completa',
    title: {
      es: 'Subir al Teide: permisos, rutas y teleférico',
      en: 'Climbing Teide: permits, routes and cable car',
    },
    excerpt: {
      es: 'Todo lo que necesitas saber para subir al Teide: permisos, teleférico, rutas de senderismo y consejos prácticos para conquistar el pico más alto de España.',
      en: 'Everything you need to know about climbing Mount Teide: permits, cable car, hiking routes and practical tips to conquer Spain\'s highest peak.',
    },
    content: {
      es: `<h2>Guía completa para subir al Teide</h2>
<p>El Teide, con sus 3.718 metros, es el pico más alto de España y el tercer volcán más alto del mundo desde su base oceánica. Subir a su cumbre es una experiencia inolvidable que requiere planificación.</p>

<h3>Permisos para la cumbre</h3>
<p>Para acceder al sendero final desde La Rambleta hasta el pico Teide (sendero nº10) necesitas un permiso gratuito. Se solicita en <strong>reservasparquesnacionales.es</strong> con semanas de antelación, ya que solo se permiten 200 personas al día. Sin permiso puedes llegar hasta La Rambleta (3.555 m) pero no a la cima.</p>

<h3>El teleférico del Teide</h3>
<p>El teleférico sube desde la base (2.356 m) hasta La Rambleta (3.555 m) en solo 8 minutos. Datos clave:</p>
<ul>
<li>Precio adultos: 40€ ida y vuelta, 22€ solo ida</li>
<li>Precio niños (3-13 años): 20€ ida y vuelta</li>
<li>Horario: 9:00 a 17:00 (última subida a las 16:00)</li>
<li>Reserva online obligatoria en temporada alta</li>
</ul>

<h3>Rutas de senderismo</h3>
<p>Para los más deportistas, hay rutas a pie desde la base:</p>
<ul>
<li><strong>Sendero Montaña Blanca (nº7):</strong> 8 km, unas 5 horas de subida. Es la ruta más popular a pie.</li>
<li><strong>Sendero Pico Viejo (nº9):</strong> más exigente pero con vistas espectaculares al cráter de Pico Viejo.</li>
<li><strong>Refugio de Altavista:</strong> pernocta a 3.270 m para ver el amanecer. Reserva en alfrfrancesaltavista.com (25€/noche).</li>
</ul>

<h3>Consejos prácticos</h3>
<ul>
<li>Lleva ropa de abrigo incluso en verano (puede haber 0°C en la cumbre)</li>
<li>Protección solar alta y gafas de sol son imprescindibles</li>
<li>Lleva al menos 1,5 litros de agua por persona</li>
<li>La altitud puede provocar mareos; asciende despacio</li>
<li>Mejor época: mayo a octubre (menos probabilidad de nieve)</li>
</ul>`,

      en: `<h2>Complete Guide to Climbing Mount Teide</h2>
<p>Mount Teide, at 3,718 metres, is Spain's highest peak and the third tallest volcano in the world measured from its oceanic base. Reaching the summit is an unforgettable experience that requires planning.</p>

<h3>Summit Permits</h3>
<p>To access the final trail from La Rambleta to the Teide peak (trail nº10), you need a free permit. Apply at <strong>reservasparquesnacionales.es</strong> weeks in advance, as only 200 people per day are allowed. Without a permit you can reach La Rambleta (3,555 m) but not the summit.</p>

<h3>Teide Cable Car</h3>
<p>The cable car ascends from the base station (2,356 m) to La Rambleta (3,555 m) in just 8 minutes. Key details:</p>
<ul>
<li>Adult price: €40 return, €22 one way</li>
<li>Children (3-13): €20 return</li>
<li>Hours: 9:00 to 17:00 (last ascent at 16:00)</li>
<li>Online booking required during peak season</li>
</ul>

<h3>Hiking Routes</h3>
<p>For those who prefer walking, there are trails from the base:</p>
<ul>
<li><strong>Montaña Blanca Trail (nº7):</strong> 8 km, about 5 hours up. The most popular hiking route.</li>
<li><strong>Pico Viejo Trail (nº9):</strong> more demanding but with spectacular views of Pico Viejo's crater.</li>
<li><strong>Altavista Refuge:</strong> overnight stay at 3,270 m to watch sunrise. Book at alfrfrancesaltavista.com (€25/night).</li>
</ul>

<h3>Practical Tips</h3>
<ul>
<li>Bring warm clothing even in summer (it can be 0°C at the summit)</li>
<li>High SPF sunscreen and sunglasses are essential</li>
<li>Carry at least 1.5 litres of water per person</li>
<li>Altitude can cause dizziness; ascend slowly</li>
<li>Best season: May to October (less chance of snow)</li>
</ul>`,
    },
    category_id: CAT.nature,
    area_id: AREA.teide,
    tags: ['teide', 'hiking', 'permits'],
    image_url: 'https://images.unsplash.com/photo-1506368387824-6cf9848c1638?w=1200&q=80',
  },

  // 2. Playas secretas
  {
    slug: 'playas-secretas-tenerife',
    title: {
      es: 'Las 15 playas secretas de Tenerife',
      en: '15 Secret Beaches in Tenerife Only Locals Know',
    },
    excerpt: {
      es: 'Descubre las playas más escondidas y menos turísticas de Tenerife. Calas vírgenes, piscinas naturales y rincones secretos que solo conocen los locales.',
      en: 'Discover Tenerife\'s most hidden and least touristy beaches. Virgin coves, natural pools and secret spots that only locals know about.',
    },
    content: {
      es: `<h2>Las 15 playas secretas de Tenerife</h2>
<p>Más allá de las playas turísticas, Tenerife esconde calas y rincones costeros que muchos visitantes nunca descubren. Aquí te revelamos los mejores secretos playeros de la isla.</p>

<h3>Norte de la isla</h3>
<ul>
<li><strong>Playa de El Bollullo:</strong> arena negra volcánica rodeada de acantilados. Acceso a pie desde Puerto de la Cruz (20 min). Tiene chiringuito. Gratuita.</li>
<li><strong>Playa de Benijo:</strong> salvaje y espectacular con los Roques de Anaga de fondo. Cuidado con las corrientes. Ideal para fotos al atardecer.</li>
<li><strong>Playa de Los Patos:</strong> junto a El Bollullo, más aislada y nudista. Solo se llega caminando.</li>
<li><strong>Charco de La Laja:</strong> piscina natural en San Juan de la Rambla. Perfecta para familias con niños.</li>
<li><strong>Playa de Castro:</strong> cala diminuta bajo un acantilado en Los Realejos. Acceso complicado pero vale la pena.</li>
</ul>

<h3>Sur y Oeste</h3>
<ul>
<li><strong>Playa de Diego Hernández:</strong> arena blanca al final de un sendero en Costa Adeje. Ambiente bohemio y aguas cristalinas.</li>
<li><strong>Playa de la Caleta:</strong> pequeña cala en Adeje, frecuentada por pescadores locales.</li>
<li><strong>Playa de Masca:</strong> solo accesible por barco o tras la ruta del barranco de Masca. Precio del barco: 10€ desde Los Gigantes.</li>
<li><strong>Playa de Las Gaviotas:</strong> junto a San Andrés, arena negra y oleaje moderado. Nudista.</li>
<li><strong>Playa de Alcalá:</strong> tranquila cala de pescadores con poco turismo.</li>
</ul>

<h3>Piscinas naturales</h3>
<ul>
<li><strong>Charco del Viento (La Guancha):</strong> conjunto de piscinas naturales volcánicas.</li>
<li><strong>Bajamar:</strong> piscinas naturales con oleaje moderado, ideales para aventureros.</li>
<li><strong>Garachico:</strong> El Caletón, piscinas formadas por la erupción de 1706. Entrada gratuita.</li>
<li><strong>Punta del Hidalgo:</strong> piscinas naturales con vistas espectaculares a los roques.</li>
<li><strong>Jover (Tacoronte):</strong> piscinas poco conocidas con acceso escalonado al mar.</li>
</ul>

<h3>Consejos</h3>
<ul>
<li>Lleva calzado adecuado para acceder a las calas más remotas</li>
<li>Respeta el entorno: no dejes basura</li>
<li>Consulta el estado del mar antes de ir a playas del norte</li>
</ul>`,

      en: `<h2>15 Secret Beaches in Tenerife Only Locals Know</h2>
<p>Beyond the tourist beaches, Tenerife hides coastal coves and spots that many visitors never discover. Here are the island's best-kept beach secrets.</p>

<h3>North Coast</h3>
<ul>
<li><strong>Playa de El Bollullo:</strong> black volcanic sand surrounded by cliffs. Accessed on foot from Puerto de la Cruz (20 min). Has a beach bar. Free entry.</li>
<li><strong>Playa de Benijo:</strong> wild and spectacular with Anaga sea stacks in the background. Watch out for currents. Perfect for sunset photos.</li>
<li><strong>Playa de Los Patos:</strong> next to El Bollullo, more isolated and nudist. Only accessible on foot.</li>
<li><strong>Charco de La Laja:</strong> natural pool in San Juan de la Rambla. Great for families with kids.</li>
<li><strong>Playa de Castro:</strong> tiny cove beneath a cliff in Los Realejos. Tricky access but worth it.</li>
</ul>

<h3>South and West</h3>
<ul>
<li><strong>Playa de Diego Hernández:</strong> white sand at the end of a trail in Costa Adeje. Bohemian vibe with crystal-clear water.</li>
<li><strong>Playa de la Caleta:</strong> small cove in Adeje, frequented by local fishermen.</li>
<li><strong>Playa de Masca:</strong> only reachable by boat or after hiking the Masca gorge. Boat from Los Gigantes: €10.</li>
<li><strong>Playa de Las Gaviotas:</strong> near San Andrés, black sand and moderate waves. Nudist.</li>
<li><strong>Playa de Alcalá:</strong> quiet fishermen's cove with very few tourists.</li>
</ul>

<h3>Natural Pools</h3>
<ul>
<li><strong>Charco del Viento (La Guancha):</strong> volcanic natural pool complex.</li>
<li><strong>Bajamar:</strong> natural pools with moderate waves, ideal for the adventurous.</li>
<li><strong>Garachico:</strong> El Caletón, pools formed by the 1706 eruption. Free entry.</li>
<li><strong>Punta del Hidalgo:</strong> natural pools with spectacular views of the sea stacks.</li>
<li><strong>Jover (Tacoronte):</strong> lesser-known pools with stepped access to the sea.</li>
</ul>

<h3>Tips</h3>
<ul>
<li>Wear proper footwear to access the more remote coves</li>
<li>Respect the environment: take your rubbish with you</li>
<li>Check sea conditions before visiting northern beaches</li>
</ul>`,
    },
    category_id: CAT.beaches,
    area_id: null,
    tags: ['beaches', 'secret', 'local'],
    image_url: 'https://images.unsplash.com/photo-1695218994426-089131e9fb97?w=1200&q=80',
  },

  // 3. Ruta Masca
  {
    slug: 'ruta-masca-tenerife',
    title: {
      es: 'Ruta por el barranco de Masca: guía completa',
      en: 'Masca Valley Hike: Complete Guide',
    },
    excerpt: {
      es: 'Guía completa para hacer la ruta del barranco de Masca en Tenerife: reservas, dificultad, qué llevar y cómo llegar a esta espectacular caminata.',
      en: 'Complete guide to hiking the Masca gorge in Tenerife: bookings, difficulty, what to bring and how to reach this spectacular trail.',
    },
    content: {
      es: `<h2>Ruta por el barranco de Masca</h2>
<p>La ruta del barranco de Masca es el sendero más famoso de Tenerife y una de las mejores caminatas de Canarias. Desciende desde el pueblo de Masca hasta la playa a través de un espectacular cañón.</p>

<h3>Datos básicos</h3>
<ul>
<li><strong>Distancia:</strong> 4,5 km (solo ida, descenso)</li>
<li><strong>Duración:</strong> 3-4 horas de bajada</li>
<li><strong>Desnivel:</strong> 650 metros de descenso</li>
<li><strong>Dificultad:</strong> media-alta (terreno irregular, trepadas)</li>
<li><strong>Reserva obligatoria:</strong> sí, en la web del Cabildo de Tenerife</li>
</ul>

<h3>Cómo reservar</h3>
<p>Desde 2023, la reserva es obligatoria y gratuita. Se gestiona en la web del Cabildo de Tenerife. Las plazas se abren con varias semanas de antelación y se agotan rápido. Máximo 125 personas al día. También puedes contratar una excursión guiada (desde 45€/persona) que incluye transporte y barco.</p>

<h3>Cómo llegar</h3>
<p>El pueblo de Masca está en la carretera TF-436, una serpenteante vía de montaña. Opciones:</p>
<ul>
<li>Coche propio: aparcamiento muy limitado, llega temprano</li>
<li>Guagua (bus) línea 355 desde Buenavista del Norte</li>
<li>Excursión organizada (la opción más cómoda)</li>
</ul>

<h3>El recorrido</h3>
<p>El sendero comienza en el pueblo de Masca (600 m) y desciende por el barranco entre paredes de hasta 600 metros de altura. Cruzarás el lecho del río varias veces, trepar por rocas y pasar por zonas estrechas. Al final llegas a la playa de Masca, donde un barco te lleva a Los Gigantes (10€).</p>

<h3>Qué llevar</h3>
<ul>
<li>Botas de senderismo con buen agarre (imprescindible)</li>
<li>Al menos 2 litros de agua por persona</li>
<li>Protección solar y gorra</li>
<li>Snacks energéticos</li>
<li>Bañador para la playa al final</li>
<li>Linterna frontal (hay tramos oscuros)</li>
</ul>

<h3>Consejos importantes</h3>
<ul>
<li>Comienza temprano para evitar el calor</li>
<li>No apta para personas con vértigo o movilidad reducida</li>
<li>No recomendada para niños menores de 8 años</li>
<li>El sendero se cierra con lluvia o mal tiempo</li>
</ul>`,

      en: `<h2>Masca Valley Hike: Complete Guide</h2>
<p>The Masca gorge trail is the most famous hike in Tenerife and one of the best walks in the Canary Islands. It descends from the village of Masca to the beach through a spectacular canyon.</p>

<h3>Key Facts</h3>
<ul>
<li><strong>Distance:</strong> 4.5 km (one way, descent)</li>
<li><strong>Duration:</strong> 3-4 hours downhill</li>
<li><strong>Elevation drop:</strong> 650 metres</li>
<li><strong>Difficulty:</strong> moderate to hard (uneven terrain, scrambling)</li>
<li><strong>Booking required:</strong> yes, via the Tenerife Cabildo website</li>
</ul>

<h3>How to Book</h3>
<p>Since 2023, booking is mandatory and free. It is managed on the Tenerife Cabildo website. Slots open several weeks in advance and sell out fast. Maximum 125 people per day. You can also book a guided tour (from €45/person) that includes transport and boat.</p>

<h3>Getting There</h3>
<p>Masca village is on the TF-436 road, a winding mountain route. Options:</p>
<ul>
<li>Own car: parking is very limited, arrive early</li>
<li>Bus line 355 from Buenavista del Norte</li>
<li>Organised excursion (the most comfortable option)</li>
</ul>

<h3>The Trail</h3>
<p>The path starts at Masca village (600 m) and descends through the gorge between walls up to 600 metres high. You will cross the riverbed several times, scramble over rocks and pass through narrow sections. At the end you reach Masca beach, where a boat takes you to Los Gigantes (€10).</p>

<h3>What to Bring</h3>
<ul>
<li>Hiking boots with good grip (essential)</li>
<li>At least 2 litres of water per person</li>
<li>Sun protection and a cap</li>
<li>Energy snacks</li>
<li>Swimsuit for the beach at the end</li>
<li>Head torch (some dark sections)</li>
</ul>

<h3>Important Tips</h3>
<ul>
<li>Start early to avoid the heat</li>
<li>Not suitable for people with vertigo or reduced mobility</li>
<li>Not recommended for children under 8</li>
<li>The trail closes during rain or bad weather</li>
</ul>`,
    },
    category_id: CAT.nature,
    area_id: AREA.losGigantes,
    tags: ['masca', 'hiking', 'adventure'],
    image_url: 'https://images.unsplash.com/photo-1667930579266-a07c450f709f?w=1200&q=80',
  },

  // 4. Los Gigantes
  {
    slug: 'los-gigantes-tenerife-guia',
    title: {
      es: 'Los Gigantes: acantilados, barcos y qué ver',
      en: 'Los Gigantes: Cliffs, Boats and What to See',
    },
    excerpt: {
      es: 'Guía completa de Los Gigantes en Tenerife: acantilados, excursiones en barco, kayak, restaurantes y todo lo que necesitas para tu visita.',
      en: 'Complete guide to Los Gigantes in Tenerife: cliffs, boat trips, kayaking, restaurants and everything you need for your visit.',
    },
    content: {
      es: `<h2>Los Gigantes: guía completa</h2>
<p>Los acantilados de Los Gigantes son una de las maravillas naturales de Tenerife. Estas impresionantes paredes volcánicas se elevan hasta 600 metros sobre el océano Atlántico, creando un paisaje que corta la respiración.</p>

<h3>Excursiones en barco</h3>
<p>La mejor forma de apreciar los acantilados es desde el mar. Desde el puerto deportivo de Los Gigantes salen múltiples excursiones:</p>
<ul>
<li><strong>Tour en velero (2-3h):</strong> desde 35€/persona. Incluye baño y snorkel.</li>
<li><strong>Avistamiento de cetáceos (2-3h):</strong> desde 20€. Combina acantilados con ballenas y delfines.</li>
<li><strong>Excursión a Masca (4-5h):</strong> desde 40€. Recorre la costa hasta la playa de Masca.</li>
<li><strong>Puesta de sol en barco:</strong> desde 50€. Experiencia romántica con aperitivo incluido.</li>
</ul>

<h3>Kayak y paddle surf</h3>
<p>Remar al pie de los acantilados es una experiencia única. Varias empresas ofrecen tours guiados en kayak (desde 30€, 2 horas) que incluyen snorkel en cuevas. El paddle surf cuesta desde 25€/hora.</p>

<h3>Miradores</h3>
<ul>
<li><strong>Mirador Archipenque:</strong> el mejor mirador gratuito con vistas a los acantilados y la isla de La Gomera</li>
<li><strong>Puerto deportivo:</strong> vistas cercanas a la base de los acantilados</li>
<li><strong>Punta de Teno:</strong> a 20 min en coche, faro con vistas espectaculares</li>
</ul>

<h3>Playa de Los Gigantes</h3>
<p>Pequeña playa de arena negra al pie de los acantilados. Tiene sombrillas y hamacas (desde 6€) y un par de restaurantes. Las aguas son tranquilas y perfectas para snorkel.</p>

<h3>Dónde comer</h3>
<ul>
<li><strong>El Rincón de Juan Carlos:</strong> estrella Michelin, alta cocina canaria</li>
<li><strong>Restaurante El Puerto:</strong> pescado fresco con vistas al puerto</li>
<li><strong>Los Gigantes Fish & Chips:</strong> opción económica junto al puerto</li>
</ul>

<h3>Consejos prácticos</h3>
<ul>
<li>Mejor momento para fotos: atardecer, cuando los acantilados se tiñen de naranja</li>
<li>Reserva las excursiones en barco con antelación en temporada alta</li>
<li>Combina tu visita con la cercana aldea de Masca</li>
</ul>`,

      en: `<h2>Los Gigantes: Complete Guide</h2>
<p>The cliffs of Los Gigantes are one of Tenerife's natural wonders. These imposing volcanic walls rise up to 600 metres above the Atlantic Ocean, creating a breathtaking landscape.</p>

<h3>Boat Trips</h3>
<p>The best way to appreciate the cliffs is from the sea. Multiple excursions depart from Los Gigantes marina:</p>
<ul>
<li><strong>Sailing tour (2-3h):</strong> from €35/person. Includes swimming and snorkelling.</li>
<li><strong>Whale watching (2-3h):</strong> from €20. Combines cliffs with whales and dolphins.</li>
<li><strong>Masca trip (4-5h):</strong> from €40. Cruises along the coast to Masca beach.</li>
<li><strong>Sunset cruise:</strong> from €50. Romantic experience with drinks included.</li>
</ul>

<h3>Kayaking and Paddle Boarding</h3>
<p>Paddling at the foot of the cliffs is a unique experience. Several companies offer guided kayak tours (from €30, 2 hours) including snorkelling in caves. Stand-up paddle boarding costs from €25/hour.</p>

<h3>Viewpoints</h3>
<ul>
<li><strong>Mirador Archipenque:</strong> the best free viewpoint with views of the cliffs and La Gomera island</li>
<li><strong>Marina:</strong> close-up views of the cliff base</li>
<li><strong>Punta de Teno:</strong> 20 min drive, lighthouse with spectacular views</li>
</ul>

<h3>Los Gigantes Beach</h3>
<p>Small black sand beach at the foot of the cliffs. Sun loungers and parasols available (from €6) with a couple of restaurants. The waters are calm and perfect for snorkelling.</p>

<h3>Where to Eat</h3>
<ul>
<li><strong>El Rincón de Juan Carlos:</strong> Michelin star, Canarian fine dining</li>
<li><strong>Restaurante El Puerto:</strong> fresh fish with harbour views</li>
<li><strong>Los Gigantes Fish & Chips:</strong> budget option by the port</li>
</ul>

<h3>Practical Tips</h3>
<ul>
<li>Best time for photos: sunset, when the cliffs turn orange</li>
<li>Book boat trips in advance during high season</li>
<li>Combine your visit with the nearby village of Masca</li>
</ul>`,
    },
    category_id: CAT.experiences,
    area_id: AREA.losGigantes,
    tags: ['los-gigantes', 'cliffs', 'boats'],
    image_url: 'https://images.unsplash.com/photo-1669147951690-658f2e4b4dd3?w=1200&q=80',
  },

  // 5. Loro Parque vs Siam Park
  {
    slug: 'loro-parque-vs-siam-park',
    title: {
      es: 'Loro Parque vs Siam Park: ¿cuál elegir?',
      en: 'Loro Parque vs Siam Park: Which One to Choose?',
    },
    excerpt: {
      es: 'Comparamos Loro Parque y Siam Park para ayudarte a elegir. Precios, horarios, atracciones principales y cuál es mejor según tu tipo de viaje.',
      en: 'We compare Loro Parque and Siam Park to help you choose. Prices, hours, top attractions and which is better based on your travel style.',
    },
    content: {
      es: `<h2>Loro Parque vs Siam Park: ¿cuál elegir?</h2>
<p>Tenerife tiene dos de los parques temáticos más premiados de Europa. Pero si tienes que elegir solo uno, ¿cuál te conviene más? Te ayudamos a decidir.</p>

<h3>Loro Parque</h3>
<p>Loro Parque, en Puerto de la Cruz, es un zoológico y acuario de fama mundial. Fundado en 1972, alberga más de 10.000 animales de 500 especies.</p>
<ul>
<li><strong>Entrada adultos:</strong> 42€ (online 38€)</li>
<li><strong>Entrada niños (6-11):</strong> 29€</li>
<li><strong>Horario:</strong> 8:30 a 18:45</li>
<li><strong>Duración recomendada:</strong> 4-6 horas</li>
</ul>
<p>Atracciones estrella: orcas, pingüinario (el más grande del mundo), acuario, gorillera, shows de delfines y loros. El Loro Parque ha sido nombrado mejor zoo del mundo por TripAdvisor.</p>

<h3>Siam Park</h3>
<p>Siam Park, en Costa Adeje, es el mejor parque acuático del mundo según TripAdvisor durante varios años consecutivos. Temática tailandesa con atracciones para todos los niveles.</p>
<ul>
<li><strong>Entrada adultos:</strong> 42€</li>
<li><strong>Entrada niños (3-11):</strong> 30€</li>
<li><strong>Horario:</strong> 10:00 a 17:00 (18:00 en verano)</li>
<li><strong>Duración recomendada:</strong> 5-7 horas</li>
</ul>
<p>Atracciones estrella: Tower of Power (28 m de caída libre), The Dragon, Singha, río lento, playa con olas artificiales de hasta 3 metros y la zona infantil Lost City.</p>

<h3>Comparativa rápida</h3>
<ul>
<li><strong>Mejor para familias con niños pequeños:</strong> Loro Parque (más variedad, menos exigencia física)</li>
<li><strong>Mejor para adolescentes y adultos:</strong> Siam Park (adrenalina y diversión acuática)</li>
<li><strong>Mejor en días nublados:</strong> Loro Parque (no depende tanto del tiempo)</li>
<li><strong>Mejor para un día de sol:</strong> Siam Park</li>
</ul>

<h3>Twin Ticket</h3>
<p>Si tienes tiempo, no elijas: ¡visita los dos! El Twin Ticket cuesta 72€ adultos y 50€ niños e incluye entrada a ambos parques (en días diferentes). Ahorro de 12€ por adulto.</p>

<h3>Consejos</h3>
<ul>
<li>Compra entradas online para evitar colas y ahorrar</li>
<li>Llega a la apertura para aprovechar al máximo</li>
<li>En Siam Park, lleva escarpines para los toboganes</li>
<li>En Loro Parque, consulta los horarios de shows al entrar</li>
</ul>`,

      en: `<h2>Loro Parque vs Siam Park: Which One to Choose?</h2>
<p>Tenerife is home to two of Europe's most awarded theme parks. But if you can only pick one, which suits you best? Here is our comparison to help you decide.</p>

<h3>Loro Parque</h3>
<p>Loro Parque, in Puerto de la Cruz, is a world-renowned zoo and aquarium. Founded in 1972, it houses over 10,000 animals from 500 species.</p>
<ul>
<li><strong>Adult entry:</strong> €42 (online €38)</li>
<li><strong>Children (6-11):</strong> €29</li>
<li><strong>Hours:</strong> 8:30 to 18:45</li>
<li><strong>Recommended time:</strong> 4-6 hours</li>
</ul>
<p>Star attractions: orcas, penguin exhibit (world's largest), aquarium, gorilla enclosure, dolphin and parrot shows. Loro Parque has been named best zoo in the world by TripAdvisor.</p>

<h3>Siam Park</h3>
<p>Siam Park, in Costa Adeje, has been rated the world's best water park by TripAdvisor for several consecutive years. Thai-themed with rides for all levels.</p>
<ul>
<li><strong>Adult entry:</strong> €42</li>
<li><strong>Children (3-11):</strong> €30</li>
<li><strong>Hours:</strong> 10:00 to 17:00 (18:00 in summer)</li>
<li><strong>Recommended time:</strong> 5-7 hours</li>
</ul>
<p>Star attractions: Tower of Power (28 m free fall), The Dragon, Singha, lazy river, wave beach with up to 3-metre waves and the Lost City children's area.</p>

<h3>Quick Comparison</h3>
<ul>
<li><strong>Best for families with young children:</strong> Loro Parque (more variety, less physically demanding)</li>
<li><strong>Best for teenagers and adults:</strong> Siam Park (adrenaline and water fun)</li>
<li><strong>Best on cloudy days:</strong> Loro Parque (less weather-dependent)</li>
<li><strong>Best on sunny days:</strong> Siam Park</li>
</ul>

<h3>Twin Ticket</h3>
<p>If you have time, don't choose — visit both! The Twin Ticket costs €72 for adults and €50 for children and covers entry to both parks (on different days). That is a saving of €12 per adult.</p>

<h3>Tips</h3>
<ul>
<li>Buy tickets online to skip queues and save money</li>
<li>Arrive at opening time to make the most of the day</li>
<li>At Siam Park, bring water shoes for the slides</li>
<li>At Loro Parque, check show times at the entrance</li>
</ul>`,
    },
    category_id: CAT.family,
    area_id: null,
    tags: ['loro-parque', 'siam-park', 'family'],
    image_url: 'https://images.unsplash.com/photo-1677489613180-f78c64ea53b3?w=1200&q=80',
  },
];

async function main() {
  console.log('Inserting 5 SEO blog articles...\n');

  for (const article of articles) {
    const row = {
      slug: article.slug,
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      category_id: article.category_id,
      area_id: article.area_id,
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

  console.log('\nDone!');
}

main();
