import { createClient } from '@supabase/supabase-js'

const sb = createClient(
  'https://sqesgghvaazyajzjkoap.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxZXNnZ2h2YWF6eWFqemprb2FwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzUxMzgwOSwiZXhwIjoyMDg5MDg5ODA5fQ.UvbRfWU9seJPT9lyCyLmpD4uZrP9jXzsNoeSAjT9HnI'
)

interface Lead {
  business_name: string
  category: string
  subcategory: string
  zone: string
  website: string | null
  source: string
  status: string
  notes?: string
}

const leads: Lead[] = [
  // ============================================================
  // RESTAURANTES LOS CRISTIANOS - Paseo Maritimo & Centro (12)
  // ============================================================
  {
    business_name: 'Rosario Restaurante',
    category: 'restaurant',
    subcategory: 'italian',
    zone: 'los-cristianos',
    website: 'https://restaurante-rosario.eatbu.com',
    source: 'web-search',
    status: 'new',
    notes: 'Paseo Maritimo 17, Los Cristianos. Italiano con vista al mar, pasta casera, pescado fresco y vinos.',
  },
  {
    business_name: 'Kinsella\'s Restaurant & Irish Pub',
    category: 'restaurant',
    subcategory: 'irish-pub',
    zone: 'los-cristianos',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Paseo Maritimo, extremo este de Playa de Los Cristianos. Pub irlandes con terraza, fish and chips, hamburguesas, Guinness.',
  },
  {
    business_name: 'Svenska Kyrkan Restaurant',
    category: 'restaurant',
    subcategory: 'international',
    zone: 'los-cristianos',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Paseo Maritimo. Cocina sueca: albondigas, smashburgers, waffles, sandwiches y reposteria casera.',
  },
  {
    business_name: 'Restaurante Pimms',
    category: 'restaurant',
    subcategory: 'international',
    zone: 'los-cristianos',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Frente a la playa de Los Cristianos. Tapas espanolas, cocina britanica y mexicana. Negocio familiar, precios razonables.',
  },
  {
    business_name: 'Cozy Cafe Los Cristianos',
    category: 'restaurant',
    subcategory: 'british',
    zone: 'los-cristianos',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Favoritos britanicos: cottage pie, higado de cordero, bacalao atlantico con chips. Muy popular.',
  },
  {
    business_name: 'The Market Tavern',
    category: 'restaurant',
    subcategory: 'british',
    zone: 'los-cristianos',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Hub comunitario en Los Cristianos. Fish and chips, full English breakfast, burgers. Comida britanica genuina.',
  },
  {
    business_name: 'Andrea\'s Pizzeria Restaurant',
    category: 'restaurant',
    subcategory: 'italian',
    zone: 'los-cristianos',
    website: 'https://www.hotel-andreas.com/en/restaurant/',
    source: 'web-search',
    status: 'new',
    notes: 'Referencia gastronomica en Los Cristianos. Cocina italiana e internacional. En Hotel Andrea\'s.',
  },
  {
    business_name: 'Pizza May',
    category: 'restaurant',
    subcategory: 'pizzeria',
    zone: 'los-cristianos',
    website: 'http://www.pizzamay.es/',
    source: 'web-search',
    status: 'new',
    notes: 'Mejor pizzeria de Los Cristianos. Pollo asado, kebabs, ensaladas, lasanas. Mar-Sab 16:00-00:00.',
  },
  {
    business_name: 'Pizza Taxi Los Cristianos',
    category: 'restaurant',
    subcategory: 'pizzeria',
    zone: 'los-cristianos',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Pizza americana en Los Cristianos. Delivery gratuito. Muy popular entre turistas.',
  },
  {
    business_name: 'La Piazzetta Los Cristianos',
    category: 'restaurant',
    subcategory: 'italian',
    zone: 'los-cristianos',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Famoso por sus pastas y pizzas artesanales. Restaurante italiano de referencia en Los Cristianos.',
  },
  {
    business_name: 'Restaurante Overseas',
    category: 'restaurant',
    subcategory: 'chinese',
    zone: 'los-cristianos',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Restaurante oriental de alta gama en zona San Telmo, Los Cristianos. Servicio excelente.',
  },
  {
    business_name: 'La Tasca China',
    category: 'restaurant',
    subcategory: 'chinese',
    zone: 'los-cristianos',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Mejor restaurante chino del sur de Tenerife. Comida casera china, popular entre clientes chinos.',
  },

  // ============================================================
  // RESTAURANTES PLAYA DE LAS AMERICAS - CC Safari & zona (12)
  // ============================================================
  {
    business_name: 'Bianco Ristorante',
    category: 'restaurant',
    subcategory: 'italian',
    zone: 'las-americas',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'CC Safari, Playa de las Americas. Italiano ultra-chic en el corazon de Las Americas.',
  },
  {
    business_name: 'The Bank Steakhouse',
    category: 'restaurant',
    subcategory: 'steakhouse',
    zone: 'las-americas',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Golden Mile, Las Americas. Abierto en 2023. Steaks de primera calidad, ambiente sofisticado.',
  },
  {
    business_name: 'Empire Modern British Restaurant & Steak House',
    category: 'restaurant',
    subcategory: 'british-steakhouse',
    zone: 'las-americas',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'CC Safari. Steaks a la parrilla, roast dinners, fish n chips. Terraza amplia.',
  },
  {
    business_name: 'Thai Botanico',
    category: 'restaurant',
    subcategory: 'thai',
    zone: 'las-americas',
    website: 'https://thaibotanicotenerife.com/',
    source: 'web-search',
    status: 'new',
    notes: 'Restaurante tailandes gourmet en Playa de las Americas. Interior colorido, terraza con patio.',
  },
  {
    business_name: 'Imperial Tai-Pan',
    category: 'restaurant',
    subcategory: 'asian',
    zone: 'las-americas',
    website: 'https://imperialtaipanrestaurant.com/',
    source: 'web-search',
    status: 'new',
    notes: 'CC Safari, frente al Hard Rock Cafe. Chino gourmet, sushi, teppanyaki japones.',
  },
  {
    business_name: 'Meson Castellano',
    category: 'restaurant',
    subcategory: 'spanish',
    zone: 'las-americas',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Referencia de cocina espanola tradicional en Las Americas. Ambiente calido e intimo.',
  },
  {
    business_name: 'La Terrazza del Mare',
    category: 'restaurant',
    subcategory: 'italian-mediterranean',
    zone: 'las-americas',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Cocina italo-mediterranea: pizzas, carnes, pasta. Precios asequibles. Las Americas.',
  },
  {
    business_name: 'Sangre de Toro Steak House',
    category: 'restaurant',
    subcategory: 'steakhouse',
    zone: 'las-americas',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'CC Safari, Playa de las Americas. Steakhouse con carnes de primera.',
  },
  {
    business_name: 'Hacienda Miranda',
    category: 'restaurant',
    subcategory: 'grill-texmex',
    zone: 'las-americas',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'CC Safari. Grill y Tex Mex. Popular entre turistas. Buenas vistas.',
  },
  {
    business_name: 'Bombay Blue',
    category: 'restaurant',
    subcategory: 'indian',
    zone: 'las-americas',
    website: 'https://bombaybluetenerife.com/en/',
    source: 'web-search',
    status: 'new',
    notes: 'CC Safari, 1a planta. Mejor comida india del sur de Tenerife. Curries autenticos, colores vibrantes.',
  },
  {
    business_name: 'Ganges Tandoori Las Americas',
    category: 'restaurant',
    subcategory: 'indian',
    zone: 'las-americas',
    website: 'https://www.gangeslasamericas.com/',
    source: 'web-search',
    status: 'new',
    notes: 'Restaurante indio moderno en el centro de Las Americas. Vistas al mar. Almuerzo y cena.',
  },
  {
    business_name: 'Mr. Singh Indian Restaurant',
    category: 'restaurant',
    subcategory: 'indian',
    zone: 'las-americas',
    website: 'https://mrsingh.es/',
    source: 'web-search',
    status: 'new',
    notes: 'Rafael Puig Lluvina 235. Tandoori, mejor comida india de Tenerife segun resenas.',
  },

  // ============================================================
  // RESTAURANTES ARONA PUEBLO (4)
  // ============================================================
  {
    business_name: 'El Casino Arona',
    category: 'restaurant',
    subcategory: 'canarian',
    zone: 'los-cristianos',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Restaurante tradicional en Arona pueblo. Carne, cocina canaria, vinos locales.',
  },
  {
    business_name: 'El Lajar de Bello',
    category: 'restaurant',
    subcategory: 'creative',
    zone: 'los-cristianos',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Uno de los mejores restaurantes de Arona. Concepto diferente, productos de primera clase.',
  },
  {
    business_name: 'Bodegon Guachinche Casa Tonito',
    category: 'restaurant',
    subcategory: 'guachinche',
    zone: 'los-cristianos',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Arona pueblo. Carne fiesta, conejo en salmorejo, papas arrugadas con mojo, quesos, vinos caseros.',
  },
  {
    business_name: 'El Faro Arona',
    category: 'restaurant',
    subcategory: 'spanish',
    zone: 'los-cristianos',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Restaurante vanguardista en Arona. Magnifico comedor, asados de calidad superior.',
  },

  // ============================================================
  // FISH & CHIPS SHOPS (4)
  // ============================================================
  {
    business_name: 'Scampi\'s Fish & Chips',
    category: 'restaurant',
    subcategory: 'fish-and-chips',
    zone: 'las-americas',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Desde los 90s. Chippy tradicional britanico entre Los Cristianos y Las Americas. Institucion.',
  },
  {
    business_name: 'Tides Fish and Chips',
    category: 'restaurant',
    subcategory: 'fish-and-chips',
    zone: 'los-cristianos',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'El fish and chips mas popular de Los Cristianos. Pescado hecho al momento. Pies, burgers, mushy peas.',
  },
  {
    business_name: 'The Palms Chippy',
    category: 'restaurant',
    subcategory: 'fish-and-chips',
    zone: 'los-cristianos',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Los Cristianos. 4.8/5 en Restaurant Guru. Bacalao, fish & chips y pies excelentes.',
  },

  // ============================================================
  // HELADERIAS / ICE CREAM (3)
  // ============================================================
  {
    business_name: 'Il Gelato del Mercato',
    category: 'restaurant',
    subcategory: 'ice-cream',
    zone: 'los-cristianos',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Calle estrecha de Los Cristianos. Gelato italiano con ingredientes organicos. Opciones veganas.',
  },
  {
    business_name: 'Heladeria La Golosa',
    category: 'restaurant',
    subcategory: 'ice-cream',
    zone: 'los-cristianos',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Una de las heladerias mas famosas de toda la isla. Helados italianos caseros.',
  },
  {
    business_name: 'Panna Cioccolato',
    category: 'restaurant',
    subcategory: 'ice-cream',
    zone: 'las-americas',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Primera heladeria de Tenerife con laboratorio visible. Clientes ven como se produce el helado.',
  },

  // ============================================================
  // PUBS & NIGHTLIFE LOS CRISTIANOS (6)
  // ============================================================
  {
    business_name: 'Claddagh Irish Bar',
    category: 'bar',
    subcategory: 'irish-pub',
    zone: 'los-cristianos',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Pub irlandes mundialmente conocido. Musica en vivo cada noche hasta las 2am, open mic, paddaoke.',
  },
  {
    business_name: 'The Vault Bar',
    category: 'bar',
    subcategory: 'live-music',
    zone: 'los-cristianos',
    website: 'https://thevaultbartenerife.com/',
    source: 'web-search',
    status: 'new',
    notes: 'Bar y venue de musica en vivo en el corazon de Los Cristianos. Estilo industrial.',
  },
  {
    business_name: 'The Merry Monk',
    category: 'bar',
    subcategory: 'english-pub',
    zone: 'los-cristianos',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Pub ingles clasico con ales y lagers. De noche se transforma en cabaret bar.',
  },
  {
    business_name: 'Dreamers Bar',
    category: 'bar',
    subcategory: 'cabaret',
    zone: 'los-cristianos',
    website: 'https://www.thedreamersbar.com/',
    source: 'web-search',
    status: 'new',
    notes: 'Cabaret, sports y restaurante. Entretenimiento y gastronomia en Los Cristianos.',
  },
  {
    business_name: 'Harry\'s Cocktail Bar',
    category: 'bar',
    subcategory: 'cocktail-bar',
    zone: 'las-americas',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'CC Safari, planta alta. Cocteles con vistas al show de fuentes danzantes por la noche.',
  },
  {
    business_name: 'Jersey Cow Las Americas',
    category: 'bar',
    subcategory: 'karaoke',
    zone: 'las-americas',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Karaoke desde las 21h en el corazon de Las Americas. Buenos precios en bebidas.',
  },

  // ============================================================
  // SPORTS BARS (5)
  // ============================================================
  {
    business_name: 'Chicago\'s Sports Bar & Grill',
    category: 'bar',
    subcategory: 'sports-bar',
    zone: 'los-cristianos',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Pasarela Shopping Center, Local B-31-34, Los Cristianos. Multiples TVs, comida y deportes.',
  },
  {
    business_name: 'Hoops Bar',
    category: 'bar',
    subcategory: 'sports-bar',
    zone: 'los-cristianos',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Pub escoces en Los Cristianos. Especializado en retransmision de partidos del Celtic y otros deportes.',
  },
  {
    business_name: 'Tayri Sport Bar',
    category: 'bar',
    subcategory: 'sports-bar',
    zone: 'los-cristianos',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Destino para entusiastas del deporte, buena comida y bebidas sociales en Los Cristianos.',
  },
  {
    business_name: 'The 19th Hole Bar & Grill',
    category: 'bar',
    subcategory: 'sports-bar',
    zone: 'los-cristianos',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Av. Amsterdam, Los Cristianos. Sports bar con comida y ambiente deportivo.',
  },
  {
    business_name: 'Bar Deportivo Los Cristianos',
    category: 'bar',
    subcategory: 'sports-bar',
    zone: 'los-cristianos',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Avenida de Suecia, Los Cristianos. Bar deportivo clasico en zona de ocio nocturno.',
  },

  // ============================================================
  // KARAOKE BARS (3)
  // ============================================================
  {
    business_name: 'The Anchor Bar',
    category: 'bar',
    subcategory: 'karaoke',
    zone: 'las-americas',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Av. Santiago Puig, Playa de las Americas. Musica en vivo y noches de karaoke.',
  },
  {
    business_name: 'The Drunken Duck',
    category: 'bar',
    subcategory: 'karaoke',
    zone: 'las-americas',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Playa de las Americas. Karaoke y musica en vivo. Ambiente de fiesta.',
  },
  {
    business_name: 'Leonardo\'s Sports Bar',
    category: 'bar',
    subcategory: 'sports-karaoke',
    zone: 'las-americas',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Las Americas. Noches de karaoke y retransmision deportiva.',
  },

  // ============================================================
  // INDIAN RESTAURANTS - additional (2)
  // ============================================================
  {
    business_name: 'Indian Palace Restaurant',
    category: 'restaurant',
    subcategory: 'indian',
    zone: 'las-americas',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Noelia Afonso Cabrera, Playa de las Americas. Cocina india tradicional con tandoori.',
  },
  {
    business_name: 'Maharaja Palace',
    category: 'restaurant',
    subcategory: 'indian',
    zone: 'las-americas',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Restaurante indio en Playa de las Americas. Especialidades tandoori y curries.',
  },

  // ============================================================
  // SUPERMERCADOS / SHOPS (5)
  // ============================================================
  {
    business_name: 'D28 SuperMarket 24 Hours',
    category: 'shop',
    subcategory: 'supermarket',
    zone: 'los-cristianos',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Supermercado 24 horas en Los Cristianos. Esencial para turistas.',
  },
  {
    business_name: 'HiperDino Los Cristianos',
    category: 'shop',
    subcategory: 'supermarket',
    zone: 'los-cristianos',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Cerca del Arona Gran Hotel. Supermercado de buen tamano con todo lo necesario para turistas.',
  },
  {
    business_name: 'Mercadona Parque Santiago 6',
    category: 'shop',
    subcategory: 'supermarket',
    zone: 'los-cristianos',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Gran Mercadona en la frontera Los Cris / Las Americas. Pescaderia, carniceria, charcuteria fresca.',
  },
  {
    business_name: 'Ale Hop Los Cristianos',
    category: 'shop',
    subcategory: 'gift-shop',
    zone: 'los-cristianos',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Cadena de regalos originales. Papeleria, gadgets tech, decoracion, accesorios y regalos novelty.',
  },
  {
    business_name: 'Artenerife Playa de Las Vistas',
    category: 'shop',
    subcategory: 'crafts-souvenirs',
    zone: 'los-cristianos',
    website: 'https://tenerifeartesania.es',
    source: 'web-search',
    status: 'new',
    notes: 'Tienda de artesania canaria oficial en Playa de Las Vistas, Los Cristianos.',
  },

  // ============================================================
  // PELUQUERIAS / HAIRDRESSERS (4)
  // ============================================================
  {
    business_name: 'Hair Rock Peluqueria',
    category: 'service',
    subcategory: 'hairdresser',
    zone: 'los-cristianos',
    website: 'https://hairrocktenerife.com/',
    source: 'web-search',
    status: 'new',
    notes: 'Los Cristianos. Estilo italiano con tendencias internacionales. Made in Italy. 96% satisfaccion.',
  },
  {
    business_name: 'Samnsara Estilistas & Beauty Space',
    category: 'service',
    subcategory: 'hairdresser-beauty',
    zone: 'los-cristianos',
    website: 'https://samnsaraestilistas.com/',
    source: 'web-search',
    status: 'new',
    notes: 'Salon de belleza completo en Los Cristianos. Peluqueria y tratamientos.',
  },
  {
    business_name: 'Studio 5 English Hair & Beauty Salon',
    category: 'service',
    subcategory: 'hairdresser',
    zone: 'los-cristianos',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Av. Juan Carlos I, Edificio Guayero L5, Los Cristianos. Salon ingles de pelo y belleza.',
  },
  {
    business_name: 'Atelier CDJ Peluqueria',
    category: 'service',
    subcategory: 'hairdresser',
    zone: 'los-cristianos',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Av. La Habana 8, Los Cristianos. Centro autorizado Degrade Joelle.',
  },

  // ============================================================
  // TATTOO STUDIOS (5)
  // ============================================================
  {
    business_name: 'Tattoo Legend Tenerife',
    category: 'service',
    subcategory: 'tattoo',
    zone: 'los-cristianos',
    website: 'https://www.tattoolegendtenerife.com/',
    source: 'web-search',
    status: 'new',
    notes: 'C. Juan XXIII 8, Arona. Abierto 2016. Fine lines, black and grey. Lun-Sab 12-19h.',
  },
  {
    business_name: 'Mad Family Tattoo',
    category: 'service',
    subcategory: 'tattoo',
    zone: 'las-americas',
    website: 'https://madfamilytattoo.com/',
    source: 'web-search',
    status: 'new',
    notes: 'Estudio profesional en Las Americas. Artistas hablan ingles. Realismo, tradicional, neo-tradicional.',
  },
  {
    business_name: 'Hogar Tattoo Tenerife',
    category: 'service',
    subcategory: 'tattoo',
    zone: 'los-cristianos',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Los Cristianos, Tenerife Sur. Tatuadores expertos, aceptan walk-ins.',
  },
  {
    business_name: 'Nero Tattoo Parlour',
    category: 'service',
    subcategory: 'tattoo',
    zone: 'los-cristianos',
    website: 'https://nerotattooparlour.com/',
    source: 'web-search',
    status: 'new',
    notes: 'Estudio exclusivo en el corazon de Tenerife. Mas de 10 anos de experiencia.',
  },
  {
    business_name: 'Lucifer Tattoo & Piercing',
    category: 'service',
    subcategory: 'tattoo-piercing',
    zone: 'las-americas',
    website: 'https://lucifertattoo.com/',
    source: 'web-search',
    status: 'new',
    notes: 'CC City Center, Local 33, Playa de las Americas. Tatuajes y piercings.',
  },

  // ============================================================
  // EXCURSIONES DESDE LOS CRISTIANOS (4)
  // ============================================================
  {
    business_name: 'Fred Olsen Express Los Cristianos',
    category: 'excursions',
    subcategory: 'ferry',
    zone: 'los-cristianos',
    website: 'https://www.fredolsen.es',
    source: 'web-search',
    status: 'new',
    notes: 'Ferry Benchijigua Express Los Cristianos - La Gomera. 3 salidas diarias, 50 min. Desde 35 euros/ida.',
  },
  {
    business_name: 'Excursiones Jesus Tenerife',
    category: 'excursions',
    subcategory: 'day-trip',
    zone: 'los-cristianos',
    website: 'https://excursionesjesustenerife.com',
    source: 'web-search',
    status: 'new',
    notes: 'Excursion a La Gomera en ferry desde Tenerife. Day trips organizados.',
  },
  {
    business_name: 'Excursiones Yani La Gomera',
    category: 'excursions',
    subcategory: 'whale-watching',
    zone: 'los-cristianos',
    website: 'https://www.excursionesyani.es/',
    source: 'web-search',
    status: 'new',
    notes: 'Catamaran con 2 cubiertas, 80 pax, 2 miradores submarinos. Avistamiento de cetaceos. +20 anos.',
  },
  {
    business_name: 'Civitatis Ferry La Gomera',
    category: 'excursions',
    subcategory: 'ferry-booking',
    zone: 'los-cristianos',
    website: 'https://www.civitatis.com/en/los-cristianos/ferry-gomera/',
    source: 'web-search',
    status: 'new',
    notes: 'Reserva online de ferry a La Gomera desde Los Cristianos. Plataforma de excursiones.',
  },

  // ============================================================
  // ADDITIONAL RESTAURANTS - Mamma Mia, Oro di Napoli (3)
  // ============================================================
  {
    business_name: 'Mamma Mia Las Americas',
    category: 'restaurant',
    subcategory: 'italian',
    zone: 'las-americas',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Pizzeria italiana popular en Playa de las Americas. Favorita entre turistas.',
  },
  {
    business_name: 'Oro di Napoli',
    category: 'restaurant',
    subcategory: 'italian',
    zone: 'los-cristianos',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Pizzeria napolitana en Los Cristianos. Pizza autentica con masa tradicional.',
  },
  {
    business_name: 'L\'italiano Trattoria',
    category: 'restaurant',
    subcategory: 'italian',
    zone: 'los-cristianos',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Trattoria italiana en Los Cristianos. Bien valorada en TripAdvisor.',
  },

  // ============================================================
  // SOUVENIR SHOPS (3)
  // ============================================================
  {
    business_name: 'Gran Bazar Gacha',
    category: 'shop',
    subcategory: 'souvenirs',
    zone: 'los-cristianos',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Tienda de souvenirs destacada en Los Cristianos. Amplia seleccion de recuerdos.',
  },
  {
    business_name: 'Krystall Gift Shop',
    category: 'shop',
    subcategory: 'souvenirs',
    zone: 'los-cristianos',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Tienda de regalos y souvenirs en Los Cristianos. Popular entre turistas.',
  },
  {
    business_name: 'Tenerife Souvenirs Store Americas Plaza',
    category: 'shop',
    subcategory: 'souvenirs',
    zone: 'las-americas',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'CC Americas Plaza, Playa de las Americas. Tienda oficial de souvenirs de Tenerife.',
  },

  // ============================================================
  // MMORE RESTAURANTS - Chinese, additional (3)
  // ============================================================
  {
    business_name: 'Emperor Chinese Restaurante',
    category: 'restaurant',
    subcategory: 'chinese',
    zone: 'los-cristianos',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Restaurante chino de alta calidad en Los Cristianos. Excelentes resenas.',
  },
  {
    business_name: 'Treasure Chinese Restaurant',
    category: 'restaurant',
    subcategory: 'chinese',
    zone: 'los-cristianos',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Edificio Funchal, Los Cristianos. Restaurante chino con menu variado.',
  },
  {
    business_name: 'Vendetta Tattoo Studio & Barber Shop',
    category: 'service',
    subcategory: 'tattoo-barber',
    zone: 'los-cristianos',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Combinacion de estudio de tatuajes y barberia en Los Cristianos. Listado en TripAdvisor.',
  },
]

async function main() {
  console.log(`\n--- Scrape Arona Businesses (Los Cristianos, Las Americas, Arona) ---`)
  console.log(`   Total leads prepared: ${leads.length}\n`)

  // Get existing business names to avoid duplicates
  const { data: existing, error: fetchError } = await sb
    .from('leads')
    .select('business_name')

  if (fetchError) {
    console.error('Error fetching existing leads:', fetchError.message)
    return
  }

  const existingNames = new Set((existing || []).map(e => e.business_name.toLowerCase().trim()))
  console.log(`   Existing leads in DB: ${existingNames.size}`)

  const newLeads = leads.filter(l => !existingNames.has(l.business_name.toLowerCase().trim()))
  const skipped = leads.length - newLeads.length
  if (skipped > 0) {
    console.log(`   Skipping ${skipped} leads that already exist in DB`)
  }

  if (newLeads.length === 0) {
    console.log('   No new leads to insert. All already exist.')
    return
  }

  console.log(`   New leads to insert: ${newLeads.length}\n`)

  // Insert in batches of 10
  const batchSize = 10
  let upserted = 0
  let errors = 0

  for (let i = 0; i < newLeads.length; i += batchSize) {
    const batch = newLeads.slice(i, i + batchSize)
    const { error } = await sb
      .from('leads')
      .insert(batch)

    if (error) {
      console.error(`   Batch ${Math.floor(i / batchSize) + 1} error:`, error.message)
      errors++
    } else {
      upserted += batch.length
      const names = batch.map(l => l.business_name).join(', ')
      console.log(`   Batch ${Math.floor(i / batchSize) + 1}: ${batch.length} leads (${names})`)
    }
  }

  console.log(`\n--- Results:`)
  console.log(`   Inserted: ${upserted}`)
  console.log(`   Skipped:  ${skipped}`)
  console.log(`   Errors:   ${errors}`)

  // Summary by category
  const byCat = newLeads.reduce((acc, l) => {
    acc[l.category] = (acc[l.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  console.log(`\n--- By category:`)
  for (const [cat, count] of Object.entries(byCat)) {
    console.log(`   ${cat}: ${count}`)
  }

  // Summary by subcategory
  const bySub = newLeads.reduce((acc, l) => {
    acc[l.subcategory] = (acc[l.subcategory] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  console.log(`\n--- By subcategory:`)
  for (const [sub, count] of Object.entries(bySub)) {
    console.log(`   ${sub}: ${count}`)
  }

  // Summary by zone
  const byZone = newLeads.reduce((acc, l) => {
    acc[l.zone] = (acc[l.zone] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  console.log(`\n--- By zone:`)
  for (const [zone, count] of Object.entries(byZone)) {
    console.log(`   ${zone}: ${count}`)
  }

  // Verify total in DB
  const { count: webSearchCount } = await sb
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .eq('source', 'web-search')

  console.log(`\n--- Total web-search leads in DB: ${webSearchCount}`)

  // Total leads in DB
  const { count: totalCount } = await sb
    .from('leads')
    .select('*', { count: 'exact', head: true })

  console.log(`   Total leads in DB: ${totalCount}`)
  console.log(`\n--- Done!\n`)
}

main().catch(console.error)
