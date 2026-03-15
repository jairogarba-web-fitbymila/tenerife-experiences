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
  // 1. Tenerife rural: pueblos escondidos
  {
    slug: 'tenerife-rural-pueblos-escondidos',
    title: {
      es: 'Tenerife rural: 10 pueblos escondidos que debes visitar',
      en: 'Rural Tenerife: 10 Hidden Villages You Must Visit',
    },
    excerpt: {
      es: 'Descubre los pueblos rurales más auténticos de Tenerife, alejados del turismo de masas: caseríos de montaña, tradiciones vivas y paisajes intactos.',
      en: 'Discover the most authentic rural villages in Tenerife, far from mass tourism: mountain hamlets, living traditions and untouched landscapes.',
    },
    content: {
      es: `<h2>Tenerife rural: 10 pueblos escondidos que debes visitar</h2>
<p>Tenerife no es solo playas y resorts. En el interior de la isla se esconden pueblos que parecen detenidos en el tiempo, con calles empedradas, casas de piedra volcánica y una vida tranquila marcada por el ritmo de las estaciones. Estos caseríos rurales conservan tradiciones centenarias y ofrecen una experiencia completamente diferente al turismo costero. Si buscas autenticidad, aquí la encontrarás.</p>

<h3>Norte escondido</h3>
<ul>
<li><strong>Chinamada:</strong> aldea troglodita en el macizo de Anaga donde aún se habitan cuevas excavadas en la roca. Acceso por sendero entre laurisilva. Sin cobertura móvil, sin prisas, sin tiempo.</li>
<li><strong>Taborno:</strong> conocido como el Machu Picchu canario por su roque y su ubicación espectacular. Apenas una docena de casas rodeadas de precipicios verdes y niebla mística.</li>
<li><strong>Las Carboneras:</strong> caserío en la cumbre de Anaga con vistas a ambas vertientes de la isla. Punto de partida para senderos que atraviesan el bosque más antiguo de Tenerife.</li>
<li><strong>El Palmar:</strong> valle fértil en el macizo de Teno rodeado de acantilados. Cultivos tradicionales de papas y viñas en bancales. Guachinches auténticos donde se come por cinco euros.</li>
</ul>

<h3>Cumbres y medianías</h3>
<ul>
<li><strong>Chirche:</strong> pueblo diminuto entre Guía de Isora y Santiago del Teide con almendros y frutales. En enero se tiñe de rosa con la floración. Tranquilidad absoluta.</li>
<li><strong>Erjos:</strong> en la frontera entre Teno y el valle de Santiago. Charcos naturales, laureles y una calma que invita a quedarse para siempre.</li>
<li><strong>La Escalona:</strong> caserío rural sobre el barranco del Infierno en Adeje. Casas canarias tradicionales con huertos y gallinas. A diez minutos del bullicio turístico pero en otro mundo.</li>
<li><strong>Arguayo:</strong> pequeño pueblo volcánico con malpaíses negros y casas de piedra. Un paisaje lunar habitado donde el tiempo se mide por cosechas.</li>
</ul>

<h3>Sur profundo</h3>
<ul>
<li><strong>Ifonche:</strong> a 1.000 metros de altitud sobre Adeje, rodeado de pinares canarios. Punto de inicio de la ruta al Barranco del Infierno por arriba. Silencio total y cielos estrellados.</li>
<li><strong>Taucho:</strong> pueblo agrícola en las medianías de Adeje con vistas al mar y almendros centenarios. Fiestas tradicionales con parrandas y folclore canario vivo.</li>
</ul>

<h3>Cómo visitarlos</h3>
<p>La mayoría requiere coche de alquiler y carreteras de montaña estrechas. Lleva agua y comida porque no siempre hay tiendas. Respeta la tranquilidad de los vecinos y aparca sin bloquear caminos agrícolas. La mejor época es primavera y otoño, cuando los campos están verdes y las temperaturas son perfectas.</p>`,

      en: `<h2>Rural Tenerife: 10 Hidden Villages You Must Visit</h2>
<p>Tenerife is not just beaches and resorts. Hidden in the island's interior are villages that seem frozen in time, with cobbled streets, volcanic stone houses and a quiet life shaped by the rhythm of the seasons. These rural hamlets preserve centuries-old traditions and offer an experience completely different from coastal tourism. If you seek authenticity, you will find it here.</p>

<h3>Hidden North</h3>
<ul>
<li><strong>Chinamada:</strong> a cave-dwelling hamlet in the Anaga massif where people still live in rock-carved caves. Access by trail through laurel forest. No mobile signal, no rush, no clock.</li>
<li><strong>Taborno:</strong> known as the Canarian Machu Picchu for its dramatic rock formation and spectacular location. Barely a dozen houses surrounded by green cliffs and mystical fog.</li>
<li><strong>Las Carboneras:</strong> a hamlet on the Anaga ridge with views to both sides of the island. Starting point for trails crossing Tenerife's oldest forest.</li>
<li><strong>El Palmar:</strong> a fertile valley in the Teno massif surrounded by cliffs. Traditional terraced crops of potatoes and vines. Authentic guachinches where you eat for five euros.</li>
</ul>

<h3>Summits and Mid-Altitude</h3>
<ul>
<li><strong>Chirche:</strong> a tiny village between Guía de Isora and Santiago del Teide with almond and fruit trees. In January it turns pink with blossom. Absolute tranquillity.</li>
<li><strong>Erjos:</strong> on the border between Teno and the Santiago valley. Natural pools, laurels and a calm that makes you want to stay forever.</li>
<li><strong>La Escalona:</strong> a rural hamlet above the Infierno ravine in Adeje. Traditional Canarian houses with vegetable gardens and chickens. Ten minutes from the tourist bustle but in another world.</li>
<li><strong>Arguayo:</strong> a small volcanic village with black lava fields and stone houses. An inhabited lunar landscape where time is measured by harvests.</li>
</ul>

<h3>Deep South</h3>
<ul>
<li><strong>Ifonche:</strong> at 1,000 metres altitude above Adeje, surrounded by Canarian pine forests. Starting point for the upper Barranco del Infierno trail. Total silence and starry skies.</li>
<li><strong>Taucho:</strong> an agricultural village in the mid-altitudes of Adeje with sea views and century-old almond trees. Traditional festivals with folk music and living Canarian folklore.</li>
</ul>

<h3>How to Visit</h3>
<p>Most require a rental car and narrow mountain roads. Bring water and food as there are not always shops. Respect the residents' peace and park without blocking farm tracks. The best time is spring and autumn, when the fields are green and temperatures are perfect.</p>`,
    },
    category_id: CAT.culture,
    tags: ['rural', 'villages', 'authentic'],
    image_url: 'https://images.unsplash.com/photo-1667930579266-a07c450f709f?w=1200&q=80',
  },

  // 2. Miradores de Tenerife
  {
    slug: 'miradores-tenerife-mejores-vistas',
    title: {
      es: 'Los 15 mejores miradores de Tenerife con las vistas más espectaculares',
      en: 'The 15 Best Viewpoints in Tenerife with the Most Spectacular Views',
    },
    excerpt: {
      es: 'Guía completa de los miradores más impresionantes de Tenerife: desde el Teide hasta los acantilados de Los Gigantes, las mejores panorámicas de la isla.',
      en: 'Complete guide to the most impressive viewpoints in Tenerife: from Teide to the Cliffs of Los Gigantes, the best panoramas on the island.',
    },
    content: {
      es: `<h2>Los 15 mejores miradores de Tenerife</h2>
<p>Tenerife es una isla de contrastes verticales. Desde el nivel del mar hasta los 3.718 metros del Teide, la isla ofrece miradores naturales que quitan el aliento. Barrancos profundos, acantilados volcánicos, bosques de laurisilva envueltos en niebla y panorámicas del océano Atlántico se combinan para crear algunos de los mejores puntos de observación de Canarias. Aquí tienes los quince imprescindibles.</p>

<h3>Miradores de altura</h3>
<ul>
<li><strong>Mirador de La Fortaleza (Teide):</strong> a más de 2.100 metros, vistas del malpaís volcánico, la caldera de Las Cañadas y el propio Teide. Accesible en coche. Al atardecer, la sombra del Teide se proyecta sobre el mar de nubes.</li>
<li><strong>Mirador de Chipeque:</strong> sobre La Orotava, uno de los miradores más espectaculares para ver el Valle de La Orotava completo con el Teide al fondo y el océano enfrente.</li>
<li><strong>Mirador de Cherfe:</strong> en la carretera de Santiago del Teide a Masca. Vistas del barranco de Masca, los acantilados de Teno y las islas de La Gomera y La Palma.</li>
</ul>

<h3>Miradores de Anaga</h3>
<ul>
<li><strong>Mirador Cruz del Carmen:</strong> entrada al Parque Rural de Anaga con vistas al valle de La Laguna y el mar de nubes. Centro de visitantes con información de rutas.</li>
<li><strong>Mirador Pico del Inglés:</strong> panorámica de 360 grados sobre Anaga, Santa Cruz y la costa norte. En días claros se ve Gran Canaria.</li>
<li><strong>Mirador de Jardina:</strong> vistas del barranco de Tahodio y la ciudad de Santa Cruz desde lo alto de Anaga. Punto fotográfico poco conocido.</li>
</ul>

<h3>Miradores de la costa</h3>
<ul>
<li><strong>Mirador de Los Gigantes:</strong> los acantilados de 600 metros cayendo verticalmente al mar. Puestas de sol legendarias. Accesible desde el puerto deportivo.</li>
<li><strong>Mirador de San Pedro (Los Realejos):</strong> terraza natural sobre el Atlántico con vistas a la costa norte y el Teide nevado en invierno.</li>
<li><strong>Mirador de Garachico:</strong> vista panorámica del pueblo histórico, las piscinas naturales de El Caletón y la roca volcánica de San Miguel.</li>
<li><strong>Mirador de Abrante (La Gomera visible):</strong> en Agulo pero con vistas al Teide que cruzan el canal entre islas.</li>
</ul>

<h3>Miradores secretos</h3>
<ul>
<li><strong>Mirador de Teno Alto:</strong> al final de la carretera del macizo de Teno. Vistas del faro de Teno y los acantilados más occidentales de la isla. Pocos turistas llegan aquí.</li>
<li><strong>Mirador de Igualero:</strong> sobre el barranco de Erques en el sur. Paisaje desértico y volcánico con vistas hasta la costa de El Médano.</li>
<li><strong>Mirador de La Grimona:</strong> entre Tacoronte y El Sauzal, un balcón escondido sobre viñedos y plataneras con el Teide al fondo.</li>
<li><strong>Mirador del Barranco de Ruiz:</strong> entre Los Realejos e Icod. Pasarela sobre un barranco de 200 metros de profundidad con vegetación subtropical.</li>
<li><strong>Mirador de Ortuño:</strong> en la ladera de Güímar con vistas al valle y las Pirámides. Ideal para fotografía al amanecer.</li>
</ul>

<h3>Consejos fotográficos</h3>
<p>Las mejores horas son al amanecer y al atardecer, cuando la luz dorada resalta los relieves volcánicos. Lleva trípode para los miradores de altura donde el viento es fuerte. En Anaga, la niebla añade misterio pero puede tapar las vistas: consulta la previsión antes de ir.</p>`,

      en: `<h2>The 15 Best Viewpoints in Tenerife</h2>
<p>Tenerife is an island of vertical contrasts. From sea level to Teide's 3,718 metres, the island offers breathtaking natural viewpoints. Deep ravines, volcanic cliffs, fog-wrapped laurel forests and Atlantic Ocean panoramas combine to create some of the finest observation points in the Canaries. Here are the fifteen essential ones.</p>

<h3>High-Altitude Viewpoints</h3>
<ul>
<li><strong>Mirador de La Fortaleza (Teide):</strong> at over 2,100 metres, views of the volcanic badlands, the Las Cañadas caldera and Teide itself. Accessible by car. At sunset, Teide's shadow falls across the sea of clouds.</li>
<li><strong>Mirador de Chipeque:</strong> above La Orotava, one of the most spectacular viewpoints to see the entire Orotava Valley with Teide behind and the ocean ahead.</li>
<li><strong>Mirador de Cherfe:</strong> on the road from Santiago del Teide to Masca. Views of the Masca ravine, the Teno cliffs and the islands of La Gomera and La Palma.</li>
</ul>

<h3>Anaga Viewpoints</h3>
<ul>
<li><strong>Mirador Cruz del Carmen:</strong> gateway to Anaga Rural Park with views over the La Laguna valley and the sea of clouds. Visitor centre with trail information.</li>
<li><strong>Mirador Pico del Inglés:</strong> a 360-degree panorama over Anaga, Santa Cruz and the north coast. On clear days you can see Gran Canaria.</li>
<li><strong>Mirador de Jardina:</strong> views of the Tahodio ravine and Santa Cruz from the heights of Anaga. A little-known photography spot.</li>
</ul>

<h3>Coastal Viewpoints</h3>
<ul>
<li><strong>Mirador de Los Gigantes:</strong> the 600-metre cliffs dropping vertically into the sea. Legendary sunsets. Accessible from the marina.</li>
<li><strong>Mirador de San Pedro (Los Realejos):</strong> a natural terrace over the Atlantic with views of the north coast and snow-capped Teide in winter.</li>
<li><strong>Mirador de Garachico:</strong> panoramic view of the historic town, the El Caletón natural pools and the volcanic rock of San Miguel.</li>
<li><strong>Mirador de Abrante (La Gomera visible):</strong> in Agulo but with views of Teide crossing the channel between islands.</li>
</ul>

<h3>Secret Viewpoints</h3>
<ul>
<li><strong>Mirador de Teno Alto:</strong> at the end of the Teno massif road. Views of the Teno lighthouse and the island's westernmost cliffs. Few tourists reach here.</li>
<li><strong>Mirador de Igualero:</strong> above the Erques ravine in the south. Desert-like volcanic landscape with views down to the El Médano coast.</li>
<li><strong>Mirador de La Grimona:</strong> between Tacoronte and El Sauzal, a hidden balcony above vineyards and banana plantations with Teide in the background.</li>
<li><strong>Mirador del Barranco de Ruiz:</strong> between Los Realejos and Icod. A walkway over a 200-metre-deep ravine with subtropical vegetation.</li>
<li><strong>Mirador de Ortuño:</strong> on the Güímar hillside with views of the valley and the Pyramids. Ideal for sunrise photography.</li>
</ul>

<h3>Photography Tips</h3>
<p>The best hours are sunrise and sunset, when golden light highlights the volcanic contours. Bring a tripod for high-altitude viewpoints where wind is strong. In Anaga, fog adds mystery but can block views entirely: check the forecast before you go.</p>`,
    },
    category_id: CAT.nature,
    tags: ['viewpoints', 'photography', 'panoramic'],
    image_url: 'https://images.unsplash.com/photo-1506368387824-6cf9848c1638?w=1200&q=80',
  },

  // 3. Tenerife en primavera
  {
    slug: 'tenerife-primavera-que-hacer',
    title: {
      es: 'Tenerife en primavera: floración de almendros, senderismo y fiestas',
      en: 'Tenerife in Spring: Almond Blossom, Hiking and Festivals',
    },
    excerpt: {
      es: 'La primavera en Tenerife trae almendros en flor, temperaturas perfectas para senderismo, fiestas romerías y los campos más verdes del año.',
      en: 'Spring in Tenerife brings almond blossom, perfect hiking temperatures, pilgrimage festivals and the greenest fields of the year.',
    },
    content: {
      es: `<h2>Tenerife en primavera: floración, senderismo y fiestas</h2>
<p>La primavera transforma Tenerife en un jardín volcánico. Entre febrero y mayo, la isla vive su momento más fotogénico: los almendros florecen en las medianías, los campos se llenan de flores silvestres, las temperaturas son perfectas para caminar y las fiestas tradicionales salpican el calendario. Es la estación favorita de los senderistas y los amantes de la naturaleza, cuando la isla muestra su cara más verde y exuberante.</p>

<h3>La floración de los almendros</h3>
<p>Entre enero y marzo, los almendros de <strong>Santiago del Teide</strong>, <strong>Chío</strong> y <strong>Chirche</strong> explotan en flores blancas y rosadas. La <strong>Fiesta del Almendro en Flor</strong> se celebra en febrero con música folclórica, degustación de almendras y rutas guiadas por los campos floridos. El espectáculo dura pocas semanas, así que consulta las fechas exactas antes de planificar tu visita.</p>

<h3>Senderismo primaveral</h3>
<ul>
<li><strong>Anaga:</strong> el bosque de laurisilva está en su máximo esplendor verde. Las rutas desde Cruz del Carmen hasta Punta del Hidalgo ofrecen cascadas temporales y helechos gigantes.</li>
<li><strong>Corona Forestal:</strong> los pinos canarios rodean el Teide creando senderos aromáticos a media montaña. Temperatura ideal entre 15 y 22 grados.</li>
<li><strong>Teno:</strong> los acantilados del oeste se cubren de suculentas en flor y la ruta de Masca es más agradable sin el calor del verano.</li>
<li><strong>Barranco del Infierno:</strong> el caudal de la cascada aumenta con las lluvias invernales. Reserva anticipada obligatoria.</li>
</ul>

<h3>Fiestas de primavera</h3>
<ul>
<li><strong>Semana Santa:</strong> procesiones en La Laguna y La Orotava con pasos de siglos de antigüedad y alfombras de flores y arena volcánica.</li>
<li><strong>Romerías:</strong> desde abril comienzan las romerías con carretas adornadas, trajes típicos, folclore y comida tradicional. La Romería de San Marcos en Tegueste y la del Cristo de La Laguna son las más populares.</li>
<li><strong>Cruces de Mayo:</strong> en mayo, las plazas y calles se adornan con cruces florales. Concursos de decoración y verbenas populares en Santa Cruz y La Laguna.</li>
</ul>

<h3>Clima y consejos</h3>
<p>Temperaturas entre 18 y 25 grados en la costa y 12-18 en la montaña. Lluvias ocasionales en el norte que mantienen todo verde. Lleva capas de ropa y calzado de senderismo. Es temporada media, así que los precios de vuelos y hoteles son razonables y hay menos aglomeración que en verano.</p>`,

      en: `<h2>Tenerife in Spring: Blossom, Hiking and Festivals</h2>
<p>Spring transforms Tenerife into a volcanic garden. Between February and May, the island lives its most photogenic moment: almond trees bloom in the mid-altitudes, fields fill with wildflowers, temperatures are perfect for walking and traditional festivals dot the calendar. It is the favourite season of hikers and nature lovers, when the island shows its greenest, most exuberant face.</p>

<h3>Almond Blossom</h3>
<p>Between January and March, the almond trees of <strong>Santiago del Teide</strong>, <strong>Chío</strong> and <strong>Chirche</strong> burst into white and pink blooms. The <strong>Almond Blossom Festival</strong> takes place in February with folk music, almond tasting and guided walks through the flowering fields. The spectacle lasts only a few weeks, so check exact dates before planning your visit.</p>

<h3>Spring Hiking</h3>
<ul>
<li><strong>Anaga:</strong> the laurel forest is at its greenest. Routes from Cruz del Carmen to Punta del Hidalgo offer seasonal waterfalls and giant ferns.</li>
<li><strong>Corona Forestal:</strong> Canarian pines surround Teide creating aromatic mid-mountain trails. Ideal temperatures between 15 and 22 degrees.</li>
<li><strong>Teno:</strong> the western cliffs are covered in flowering succulents and the Masca trail is more pleasant without summer heat.</li>
<li><strong>Barranco del Infierno:</strong> the waterfall flow increases with winter rains. Advance booking required.</li>
</ul>

<h3>Spring Festivals</h3>
<ul>
<li><strong>Easter:</strong> processions in La Laguna and La Orotava with centuries-old floats and carpets of flowers and volcanic sand.</li>
<li><strong>Romerías:</strong> from April the pilgrimages begin with decorated carts, traditional costumes, folk music and local food. The Romería de San Marcos in Tegueste and the Cristo de La Laguna pilgrimage are the most popular.</li>
<li><strong>Cruces de Mayo:</strong> in May, squares and streets are adorned with floral crosses. Decoration competitions and popular open-air dances in Santa Cruz and La Laguna.</li>
</ul>

<h3>Weather and Tips</h3>
<p>Temperatures range from 18 to 25 degrees on the coast and 12-18 in the mountains. Occasional rain in the north keeps everything green. Bring layers and hiking footwear. It is mid-season, so flight and hotel prices are reasonable and there are fewer crowds than summer.</p>`,
    },
    category_id: CAT.nature,
    tags: ['spring', 'seasonal', 'flowers', 'hiking'],
    image_url: 'https://images.unsplash.com/photo-1626033005784-e6c39eaa0669?w=1200&q=80',
  },

  // 4. Tenerife en verano
  {
    slug: 'tenerife-verano-playas-fiestas',
    title: {
      es: 'Tenerife en verano: playas, fiestas patronales y vida nocturna',
      en: 'Tenerife in Summer: Beaches, Festivals and Nightlife',
    },
    excerpt: {
      es: 'Todo lo que necesitas saber para disfrutar Tenerife en verano: las mejores playas, fiestas patronales con fuegos artificiales y la vida nocturna más animada.',
      en: 'Everything you need to know to enjoy Tenerife in summer: the best beaches, patron saint festivals with fireworks and the liveliest nightlife.',
    },
    content: {
      es: `<h2>Tenerife en verano: playas, fiestas y vida nocturna</h2>
<p>El verano es la temporada más vibrante de Tenerife. De junio a septiembre, la isla se llena de energía con fiestas patronales en cada pueblo, playas abarrotadas de locales y visitantes, y una vida nocturna que se extiende hasta el amanecer. Las temperaturas rondan los 28-32 grados y el mar alcanza los 23-24 grados, perfectos para largas jornadas de playa. Es la época más concurrida pero también la más festiva.</p>

<h3>Las mejores playas para el verano</h3>
<ul>
<li><strong>Playa de Las Teresitas:</strong> la playa más famosa de Santa Cruz con arena dorada importada del Sáhara. Aguas tranquilas y ambiente local. Llega temprano el fin de semana.</li>
<li><strong>Playa del Duque:</strong> la joya de Costa Adeje. Arena clara, servicios de lujo, restaurantes frente al mar. Elegante pero acogedora.</li>
<li><strong>El Médano:</strong> paraíso del windsurf y kitesurf con viento constante. Ambiente joven y alternativo. Chiringuitos con música al atardecer.</li>
<li><strong>Playa de Benijo:</strong> playa salvaje al norte con olas grandes y roque volcánico. Para aventureros que buscan naturaleza pura.</li>
<li><strong>Playa de la Arena:</strong> arena volcánica negra en la costa oeste. Puestas de sol frente a Los Gigantes. Bandera azul por su calidad.</li>
</ul>

<h3>Fiestas patronales del verano</h3>
<ul>
<li><strong>Fiestas del Carmen (julio):</strong> procesiones marineras en Los Cristianos, Candelaria y Puerto de la Cruz. Vírgenes navegando sobre el mar y fuegos artificiales sobre el agua.</li>
<li><strong>Fiestas de Santiago (julio):</strong> Santa Cruz celebra a su patrón con conciertos gratuitos, verbenas y competiciones deportivas durante una semana.</li>
<li><strong>Bajada de la Rama (agosto):</strong> tradición aborigen con procesiones nocturnas portando ramas hasta el mar para pedir lluvia. Espectáculo único.</li>
<li><strong>Fiestas de agosto:</strong> Candelaria celebra a la Virgen patrona de Canarias con la mayor peregrinación del archipiélago el 14 y 15 de agosto.</li>
</ul>

<h3>Vida nocturna veraniega</h3>
<p>En verano la fiesta se multiplica. <strong>Playa de las Américas</strong> concentra discotecas y bares abiertos hasta las 6 de la mañana. <strong>Santa Cruz</strong> ofrece terrazas, conciertos al aire libre y la Noria del Puerto. <strong>La Laguna</strong> tiene el ambiente universitario más auténtico con bares de tapas y música en vivo en el Cuadrilátero.</p>

<h3>Consejos prácticos</h3>
<p>Reserva alojamiento con meses de antelación porque agosto es temporada altísima. Usa protector solar factor 50 y evita las horas centrales del día. Lleva agua siempre. Para las fiestas patronales consulta el programa del ayuntamiento local y no conduzcas si vas a beber.</p>`,

      en: `<h2>Tenerife in Summer: Beaches, Festivals and Nightlife</h2>
<p>Summer is Tenerife's most vibrant season. From June to September, the island fills with energy through patron saint festivals in every village, beaches packed with locals and visitors, and nightlife that stretches until dawn. Temperatures hover around 28-32 degrees and the sea reaches 23-24 degrees, perfect for long beach days. It is the busiest time but also the most festive.</p>

<h3>The Best Summer Beaches</h3>
<ul>
<li><strong>Playa de Las Teresitas:</strong> Santa Cruz's most famous beach with golden sand imported from the Sahara. Calm waters and a local vibe. Arrive early at weekends.</li>
<li><strong>Playa del Duque:</strong> the jewel of Costa Adeje. Light sand, luxury amenities, beachfront restaurants. Elegant yet welcoming.</li>
<li><strong>El Médano:</strong> a windsurfing and kitesurfing paradise with constant wind. Young, alternative atmosphere. Beach bars with sunset music.</li>
<li><strong>Playa de Benijo:</strong> a wild beach in the north with big waves and a volcanic sea stack. For adventurers seeking pure nature.</li>
<li><strong>Playa de la Arena:</strong> black volcanic sand on the west coast. Sunsets facing Los Gigantes. Blue flag for quality.</li>
</ul>

<h3>Summer Patron Saint Festivals</h3>
<ul>
<li><strong>Fiestas del Carmen (July):</strong> maritime processions in Los Cristianos, Candelaria and Puerto de la Cruz. Virgins sailing over the sea and fireworks over the water.</li>
<li><strong>Fiestas de Santiago (July):</strong> Santa Cruz celebrates its patron with free concerts, open-air dances and sports competitions for a week.</li>
<li><strong>Bajada de la Rama (August):</strong> an aboriginal tradition with night processions carrying branches to the sea to ask for rain. A unique spectacle.</li>
<li><strong>August Festivals:</strong> Candelaria celebrates the patron Virgin of the Canaries with the largest pilgrimage in the archipelago on 14 and 15 August.</li>
</ul>

<h3>Summer Nightlife</h3>
<p>In summer the party multiplies. <strong>Playa de las Américas</strong> concentrates clubs and bars open until 6 in the morning. <strong>Santa Cruz</strong> offers terraces, open-air concerts and the harbour Ferris wheel. <strong>La Laguna</strong> has the most authentic university atmosphere with tapas bars and live music in the Cuadrilátero.</p>

<h3>Practical Tips</h3>
<p>Book accommodation months in advance because August is peak season. Use factor 50 sunscreen and avoid the midday sun. Always carry water. For patron saint festivals check the local council's programme and do not drive if you plan to drink.</p>`,
    },
    category_id: CAT.experiences,
    tags: ['summer', 'seasonal', 'beaches', 'festivals'],
    image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
  },

  // 5. Tenerife en otoño
  {
    slug: 'tenerife-otono-vendimia-senderismo',
    title: {
      es: 'Tenerife en otoño: vendimia, senderismo y bailes de magos',
      en: 'Tenerife in Autumn: Wine Harvest, Hiking and Traditional Dances',
    },
    excerpt: {
      es: 'El otoño en Tenerife trae la vendimia, temperaturas perfectas para senderismo, fiestas de la cosecha y los últimos baños en aguas cálidas del Atlántico.',
      en: 'Autumn in Tenerife brings the grape harvest, perfect hiking temperatures, harvest festivals and the last swims in warm Atlantic waters.',
    },
    content: {
      es: `<h2>Tenerife en otoño: vendimia, senderismo y tradiciones</h2>
<p>El otoño es quizás la estación más equilibrada de Tenerife. Entre septiembre y noviembre, la isla recupera la calma después del frenesí veraniego pero mantiene temperaturas agradables entre 22 y 28 grados en la costa. El mar sigue cálido, los senderos están menos concurridos y comienza la vendimia en las bodegas del norte. Es la época perfecta para quienes buscan combinar playa, naturaleza y cultura sin aglomeraciones.</p>

<h3>La vendimia canaria</h3>
<p>Tenerife tiene la mayor diversidad vitícola de España gracias a sus microclimas y suelos volcánicos. La vendimia se celebra entre <strong>agosto y octubre</strong> según la altitud. Las <strong>Denominaciones de Origen</strong> de Tacoronte-Acentejo, Valle de La Orotava, Ycoden-Daute-Isora, Abona y Valle de Güímar producen vinos únicos. Visita las bodegas durante la vendimia para pisar uva, probar mosto fresco y conocer el proceso artesanal. Los <strong>guachinches</strong> abren sus puertas con el vino nuevo.</p>

<h3>Senderismo otoñal</h3>
<ul>
<li><strong>Paisaje Lunar:</strong> la ruta desde Vilaflor al Paisaje Lunar atraviesa pinares canarios con temperaturas ideales. Las formaciones de piedra pómez brillan bajo la luz de otoño.</li>
<li><strong>Anaga en octubre:</strong> menos turistas, más silencio. Los senderos del bosque de laurisilva ofrecen la experiencia más inmersiva del año cuando las primeras lluvias otoñales refrescan el ambiente.</li>
<li><strong>Ruta de los volcanes:</strong> la travesía por los volcanes del sur entre Fasnia y Arico es espectacular con la luz rasante del otoño sobre los conos volcánicos.</li>
</ul>

<h3>Fiestas y tradiciones</h3>
<ul>
<li><strong>Bailes de Magos:</strong> fiestas populares en las que los tinerfeños se visten con trajes típicos de campesino. Música de folías, isas y malagueñas. Comida casera y vino a granel. Las mejores se celebran en Tegueste, La Orotava y El Sauzal.</li>
<li><strong>Fiestas de la cosecha:</strong> celebraciones en los pueblos vinícolas por la recogida de la uva. Degustaciones, concursos de pisado de uva y comidas populares al aire libre.</li>
<li><strong>Día de los Finaos (noviembre):</strong> tradición canaria equivalente a Halloween. Se comen castañas asadas, nueces y se cuentan historias de los antepasados alrededor de hogueras.</li>
</ul>

<h3>Ventajas del otoño</h3>
<p>Vuelos más baratos que en verano, hoteles con disponibilidad y precios reducidos. El mar mantiene los 23 grados de septiembre a octubre, perfectos para baño. Menos colas en el teleférico del Teide y en los senderos populares. La luz dorada del otoño convierte cada paisaje en una postal.</p>`,

      en: `<h2>Tenerife in Autumn: Wine Harvest, Hiking and Traditions</h2>
<p>Autumn is perhaps Tenerife's most balanced season. Between September and November, the island recovers its calm after the summer frenzy but maintains pleasant temperatures of 22 to 28 degrees on the coast. The sea remains warm, trails are less crowded and the grape harvest begins at northern wineries. It is the perfect time for those who want to combine beach, nature and culture without crowds.</p>

<h3>The Canarian Grape Harvest</h3>
<p>Tenerife has Spain's greatest viticultural diversity thanks to its microclimates and volcanic soils. The harvest runs from <strong>August to October</strong> depending on altitude. The <strong>Denominations of Origin</strong> of Tacoronte-Acentejo, Valle de La Orotava, Ycoden-Daute-Isora, Abona and Valle de Güímar produce unique wines. Visit the wineries during harvest to tread grapes, taste fresh must and learn about the artisanal process. The <strong>guachinches</strong> open their doors with the new wine.</p>

<h3>Autumn Hiking</h3>
<ul>
<li><strong>Paisaje Lunar:</strong> the trail from Vilaflor to the Lunar Landscape crosses Canarian pine forests at ideal temperatures. The pumice formations gleam under autumn light.</li>
<li><strong>Anaga in October:</strong> fewer tourists, more silence. The laurel forest trails offer the year's most immersive experience when the first autumn rains refresh the air.</li>
<li><strong>Volcano Route:</strong> the traverse through the southern volcanoes between Fasnia and Arico is spectacular with autumn's low-angle light on the volcanic cones.</li>
</ul>

<h3>Festivals and Traditions</h3>
<ul>
<li><strong>Bailes de Magos:</strong> popular festivals where Tinerfeños dress in traditional peasant costumes. Music of folías, isas and malagueñas. Home cooking and wine by the jug. The best are held in Tegueste, La Orotava and El Sauzal.</li>
<li><strong>Harvest Festivals:</strong> celebrations in wine villages for the grape pick. Tastings, grape-treading contests and communal open-air meals.</li>
<li><strong>Día de los Finaos (November):</strong> a Canarian tradition similar to Halloween. People eat roasted chestnuts and walnuts and share stories of ancestors around bonfires.</li>
</ul>

<h3>Advantages of Autumn</h3>
<p>Cheaper flights than summer, hotels with availability and reduced prices. The sea holds 23 degrees from September to October, perfect for swimming. Shorter queues for the Teide cable car and popular trails. Autumn's golden light turns every landscape into a postcard.</p>`,
    },
    category_id: CAT.culture,
    tags: ['autumn', 'seasonal', 'wine', 'traditions'],
    image_url: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1200&q=80',
  },
];

async function main() {
  console.log('Inserting rural batch A: 5 blog articles...\n');

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

  console.log('\nRural batch A done!');
}

main();
