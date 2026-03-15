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
  // ============================
  // BODEGAS / WINERIES (8)
  // ============================
  {
    business_name: 'Bodegas Viñátigo',
    category: 'bodega',
    subcategory: 'winery',
    zone: 'norte',
    website: 'https://www.bodegasvinatigo.com',
    source: 'web-search',
    status: 'new',
    notes: 'Bodega en Ycoden-Daute-Isora. Visitas guiadas y cata de 6 vinos. Variedades autóctonas.',
  },
  {
    business_name: 'Bodega El Lomo',
    category: 'bodega',
    subcategory: 'winery',
    zone: 'norte',
    website: 'https://bodegaellomo.com',
    source: 'web-search',
    status: 'new',
    notes: 'Viñedo de 30.000 m² en Tegueste. Gastrobodega con chef reconocido Michelin.',
  },
  {
    business_name: 'Bodega Comarcal Valle de Güímar',
    category: 'bodega',
    subcategory: 'winery',
    zone: 'sur',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'DO Valle de Güímar. Visitas guiadas con cata y almuerzo.',
  },
  {
    business_name: 'Bodegas Suertes del Marqués',
    category: 'bodega',
    subcategory: 'winery',
    zone: 'norte',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Valle de la Orotava. Viñedos centenarios, viticultura tradicional. DO Valle de la Orotava.',
  },
  {
    business_name: 'Cumbres de Abona',
    category: 'bodega',
    subcategory: 'winery',
    zone: 'sur',
    website: 'https://www.cumbresdeabona.com',
    source: 'web-search',
    status: 'new',
    notes: 'Fundada en 1988. DO Abona. Más de 700 viticultores asociados.',
  },
  {
    business_name: 'DO Tacoronte-Acentejo (Tacovin)',
    category: 'bodega',
    subcategory: 'denominacion-origen',
    zone: 'norte',
    website: 'http://tacovin.com',
    source: 'web-search',
    status: 'new',
    notes: 'Consejo Regulador DO Tacoronte-Acentejo. Agrupa múltiples bodegas.',
  },
  {
    business_name: 'DO Valle de la Orotava',
    category: 'bodega',
    subcategory: 'denominacion-origen',
    zone: 'norte',
    website: 'https://dovalleorotava.com',
    source: 'web-search',
    status: 'new',
    notes: 'Consejo Regulador DO Valle de la Orotava.',
  },
  {
    business_name: 'Vinos de Tenerife (Portal Oficial)',
    category: 'bodega',
    subcategory: 'denominacion-origen',
    zone: 'isla',
    website: 'https://www.vinosdetenerife.es',
    source: 'web-search',
    status: 'new',
    notes: 'Portal oficial de las 5 denominaciones de origen de Tenerife. Contacto para partnerships.',
  },

  // ============================
  // COWORKING SPACES (7)
  // ============================
  {
    business_name: 'Coworking in the Sun',
    category: 'coworking',
    subcategory: 'coworking',
    zone: 'sur',
    website: 'https://www.coworkinginthesun.com',
    source: 'web-search',
    status: 'new',
    notes: 'Hot desks y oficinas privadas. Ideal para digital nomads.',
  },
  {
    business_name: 'Nine Coliving',
    category: 'coworking',
    subcategory: 'coliving',
    zone: 'norte',
    website: 'https://www.ninecoliving.com',
    source: 'web-search',
    status: 'new',
    notes: 'Centro histórico de La Orotava. Coliving para nómadas digitales con vistas al mar y al volcán.',
  },
  {
    business_name: 'Zen Den Tenerife',
    category: 'coworking',
    subcategory: 'coworking',
    zone: 'sur',
    website: 'https://zendentenerife.com',
    source: 'web-search',
    status: 'new',
    notes: 'Coworking junto a la playa en Costa Adeje. También coliving.',
  },
  {
    business_name: 'Maraya Coliving',
    category: 'coworking',
    subcategory: 'coliving',
    zone: 'sur',
    website: 'https://www.marayacoliving.com',
    source: 'web-search',
    status: 'new',
    notes: 'Coliving con vistas al océano. Nómadas digitales y remote workers.',
  },
  {
    business_name: 'Cactus Coliving',
    category: 'coworking',
    subcategory: 'coliving',
    zone: 'sur',
    website: 'https://www.cactuscoliving.com',
    source: 'web-search',
    status: 'new',
    notes: 'Tres espacios de coliving en Tenerife y La Gomera.',
  },
  {
    business_name: 'Tenerife Coworking',
    category: 'coworking',
    subcategory: 'coworking',
    zone: 'metropolitana',
    website: 'https://tenerifecoworking.es',
    source: 'web-search',
    status: 'new',
    notes: 'Espacio coworking en Canarias con comunidad activa.',
  },
  {
    business_name: 'Sombrita CoWorking',
    category: 'coworking',
    subcategory: 'coworking',
    zone: 'sur',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Coworking popular en el sur de Tenerife.',
  },

  // ============================
  // INMOBILIARIAS / REAL ESTATE (4)
  // ============================
  {
    business_name: 'Tenerife Casa',
    category: 'inmobiliaria',
    subcategory: 'vacation-rental-mgmt',
    zone: 'isla',
    website: 'https://tenerifecasa.net',
    source: 'web-search',
    status: 'new',
    notes: 'Gestión alquiler vacacional. Tramitación licencias VV. Transparencia total.',
  },
  {
    business_name: 'Tenerife 4 Rent',
    category: 'inmobiliaria',
    subcategory: 'vacation-rental',
    zone: 'isla',
    website: 'https://www.tenerife4rent.com',
    source: 'web-search',
    status: 'new',
    notes: 'Inmobiliaria de confianza con atención personalizada. Alquiler vacacional.',
  },
  {
    business_name: 'Inmogestion Tenerife',
    category: 'inmobiliaria',
    subcategory: 'property-mgmt',
    zone: 'isla',
    website: 'https://www.inmogestiontenerife.net',
    source: 'web-search',
    status: 'new',
    notes: 'Property finder y gestión inmobiliaria en Tenerife.',
  },
  {
    business_name: 'Club Inmobiliario de Canarias',
    category: 'inmobiliaria',
    subcategory: 'real-estate',
    zone: 'isla',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Agencia inmobiliaria con propiedades en alquiler en Tenerife.',
  },

  // ============================
  // SHOPPING - Craft Shops (5)
  // ============================
  {
    business_name: 'Artenerife (Empresa Insular de Artesanía)',
    category: 'shopping',
    subcategory: 'crafts',
    zone: 'isla',
    website: 'https://tenerifeartesania.es',
    source: 'web-search',
    status: 'new',
    notes: '7 sucursales en la isla. Textiles, calados, cerámica, tallas de madera.',
  },
  {
    business_name: 'Islenio',
    category: 'shopping',
    subcategory: 'crafts',
    zone: 'metropolitana',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Plaza de la Candelaria, Santa Cruz. Productos canarios de calidad.',
  },
  {
    business_name: 'La Alpizpa',
    category: 'shopping',
    subcategory: 'crafts',
    zone: 'isla',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: '4 locales. Muebles de hierro forjado, madera y cerámica tradicional.',
  },
  {
    business_name: 'Casa de los Balcones',
    category: 'shopping',
    subcategory: 'crafts',
    zone: 'norte',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'La Orotava. Edificio del siglo XVIII. Calados, manteles y textiles artesanales.',
  },
  {
    business_name: 'Alma de Canarias',
    category: 'shopping',
    subcategory: 'crafts',
    zone: 'isla',
    website: 'https://www.almadecanarias.com',
    source: 'web-search',
    status: 'new',
    notes: 'Tiendas y artesanía canaria con múltiples puntos de venta.',
  },

  // ============================
  // SHOPPING - Malls (5)
  // ============================
  {
    business_name: 'Siam Mall',
    category: 'shopping',
    subcategory: 'mall',
    zone: 'sur',
    website: 'https://ccsiammall.com',
    source: 'web-search',
    status: 'new',
    notes: 'Centro del turismo en Adeje. 70+ tiendas. Abierto 365 días. Mango, Zara, Guess.',
  },
  {
    business_name: 'Plaza del Duque',
    category: 'shopping',
    subcategory: 'mall',
    zone: 'sur',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Centro comercial de lujo. Tiendas internacionales y gastronomía.',
  },
  {
    business_name: 'Centro Comercial Safari',
    category: 'shopping',
    subcategory: 'mall',
    zone: 'sur',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Playa de las Américas, a 100m de la playa. Compras y ocio.',
  },
  {
    business_name: 'CC Rosa Center',
    category: 'shopping',
    subcategory: 'mall',
    zone: 'sur',
    website: 'https://ccrosacenter.com',
    source: 'web-search',
    status: 'new',
    notes: 'Playa Paraíso. Ocio, restauración y compras.',
  },
  {
    business_name: 'The Corner Shopping Center Adeje',
    category: 'shopping',
    subcategory: 'mall',
    zone: 'sur',
    website: 'https://thecorneradeje.com',
    source: 'web-search',
    status: 'new',
    notes: 'Centro comercial en Adeje sur.',
  },

  // ============================
  // SHOPPING - Markets (4)
  // ============================
  {
    business_name: 'Mercadillo de Costa Adeje',
    category: 'shopping',
    subcategory: 'market',
    zone: 'sur',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Jueves y sábados 9:00-14:00. Productos locales y artesanía.',
  },
  {
    business_name: 'Mercado del Agricultor de Tegueste',
    category: 'shopping',
    subcategory: 'market',
    zone: 'norte',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Frutas, verduras, quesos, pan artesanal. Referencia de productos locales en el norte.',
  },
  {
    business_name: 'Mercadillo del Agricultor de La Laguna',
    category: 'shopping',
    subcategory: 'market',
    zone: 'metropolitana',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Martes, jueves y sábados 6:00-14:00. Productos frescos locales.',
  },
  {
    business_name: 'Mercadillo de Los Cristianos',
    category: 'shopping',
    subcategory: 'market',
    zone: 'sur',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Martes y domingos 9:00-14:00. Muy popular entre turistas.',
  },

  // ============================
  // EVENTS COMPANIES (5)
  // ============================
  {
    business_name: 'GR Eventos',
    category: 'events',
    subcategory: 'wedding-planner',
    zone: 'isla',
    website: 'https://greventos.es',
    source: 'web-search',
    status: 'new',
    notes: 'Wedding planner y alquiler de mobiliario. +7 años, +1000 bodas organizadas.',
  },
  {
    business_name: 'Factory Events',
    category: 'events',
    subcategory: 'event-production',
    zone: 'isla',
    website: 'https://factoryevents.es',
    source: 'web-search',
    status: 'new',
    notes: 'Productora de eventos líder en Tenerife.',
  },
  {
    business_name: 'Laura Her Eventos',
    category: 'events',
    subcategory: 'event-organizer',
    zone: 'isla',
    website: 'https://lauraher.com',
    source: 'web-search',
    status: 'new',
    notes: 'Team building, congresos, convenciones, bodas y eventos sociales.',
  },
  {
    business_name: 'Eventalia Group',
    category: 'events',
    subcategory: 'event-production',
    zone: 'isla',
    website: 'https://eventaliagroup.com',
    source: 'web-search',
    status: 'new',
    notes: 'Producción y organización de eventos. Audiovisuales, decoración, artistas.',
  },
  {
    business_name: 'Grupo Adya',
    category: 'events',
    subcategory: 'event-organizer',
    zone: 'isla',
    website: 'https://grupoadya.com',
    source: 'web-search',
    status: 'new',
    notes: 'Organización integral de eventos en Tenerife.',
  },

  // ============================
  // PHOTOGRAPHY (5)
  // ============================
  {
    business_name: 'Tania Bonnet Fotografía',
    category: 'photography',
    subcategory: 'photographer',
    zone: 'isla',
    website: 'https://taniabonnet.es',
    source: 'web-search',
    status: 'new',
    notes: '+20 años de experiencia. Familias, bodas, moda, eventos.',
  },
  {
    business_name: 'Daniel Hübscher Fotografía',
    category: 'photography',
    subcategory: 'photographer',
    zone: 'metropolitana',
    website: 'https://danielhubscher.com',
    source: 'web-search',
    status: 'new',
    notes: 'Santa Cruz. Retratos, corporativa, artística y books.',
  },
  {
    business_name: 'Oliver Yanes Fotografía',
    category: 'photography',
    subcategory: 'photographer',
    zone: 'isla',
    website: 'https://oliveryanes.com',
    source: 'web-search',
    status: 'new',
    notes: 'Bodas, naturaleza, fotografía inmobiliaria e interiorismo.',
  },
  {
    business_name: 'Natale Arte Fotográfico',
    category: 'photography',
    subcategory: 'photographer',
    zone: 'metropolitana',
    website: 'https://www.nataleartefotografico.com',
    source: 'web-search',
    status: 'new',
    notes: 'Estudio en Santa Cruz. Bodas, bebés y comuniones.',
  },
  {
    business_name: 'Foto Teide',
    category: 'photography',
    subcategory: 'photographer',
    zone: 'sur',
    website: 'https://en.fototeide.com',
    source: 'web-search',
    status: 'new',
    notes: 'Desde 1986. Fotografía y vídeo profesional.',
  },

  // ============================
  // HEALTH - Dental Tourism (5)
  // ============================
  {
    business_name: 'Medical Implant',
    category: 'health',
    subcategory: 'dental-clinic',
    zone: 'sur',
    website: 'https://medicalimplant.es',
    source: 'web-search',
    status: 'new',
    notes: 'Implantes dentales, estética dental y turismo dental. Sonrisa en 48h.',
  },
  {
    business_name: 'Ocean Clinik',
    category: 'health',
    subcategory: 'dental-clinic',
    zone: 'sur',
    website: 'https://theoceanclinik.com',
    source: 'web-search',
    status: 'new',
    notes: 'Clínica dental y medicina estética. Mejor valorada en Tenerife Sur.',
  },
  {
    business_name: 'HQ Tenerife Dental',
    category: 'health',
    subcategory: 'dental-clinic',
    zone: 'sur',
    website: 'https://hqtenerife.com',
    source: 'web-search',
    status: 'new',
    notes: 'Implantes de carga inmediata en 24h. Turismo dental.',
  },
  {
    business_name: 'El Cedro Clínica Dental',
    category: 'health',
    subcategory: 'dental-clinic',
    zone: 'sur',
    website: 'https://www.elcedrotenerife.com',
    source: 'web-search',
    status: 'new',
    notes: '18 años. Referencia en implantología. Pacientes de toda Europa.',
  },
  {
    business_name: 'Denterife Clínica Dental',
    category: 'health',
    subcategory: 'dental-clinic',
    zone: 'sur',
    website: 'https://denterife.es',
    source: 'web-search',
    status: 'new',
    notes: '+20 años. Clínica referencia en Tenerife Sur. Urgencias dentales.',
  },

  // ============================
  // HEALTH - Pharmacies (2)
  // ============================
  {
    business_name: 'Farmacia Salamanca 24h',
    category: 'health',
    subcategory: 'pharmacy',
    zone: 'metropolitana',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Calle Horacio Nelson 21, Santa Cruz. Abierta 24h los 365 días.',
  },
  {
    business_name: 'Farmacia Santa Cruz Online',
    category: 'health',
    subcategory: 'pharmacy',
    zone: 'metropolitana',
    website: 'https://farmaciasantacruz.es',
    source: 'web-search',
    status: 'new',
    notes: 'Farmacia online en Tenerife. Envíos y atención al turista.',
  },

  // ============================
  // HEALTH - Veterinary (5)
  // ============================
  {
    business_name: 'Patas y Colas Hospital Veterinario',
    category: 'health',
    subcategory: 'veterinary',
    zone: 'sur',
    website: 'https://www.patasycolasveterinario.com',
    source: 'web-search',
    status: 'new',
    notes: 'Hospital veterinario de referencia en Tenerife Sur. Urgencias 24h.',
  },
  {
    business_name: 'Animal Center Sur',
    category: 'health',
    subcategory: 'veterinary',
    zone: 'sur',
    website: 'https://www.medanovet.com',
    source: 'web-search',
    status: 'new',
    notes: 'El Médano. Urgencias 24h, cirugía, rayos X, ecografía.',
  },
  {
    business_name: 'Hosvetnorte Hospital Veterinario',
    category: 'health',
    subcategory: 'veterinary',
    zone: 'norte',
    website: 'https://www.hosvetnorte.es',
    source: 'web-search',
    status: 'new',
    notes: 'Puerto de la Cruz y La Orotava. Urgencias fines de semana. Exóticos.',
  },
  {
    business_name: 'Clínica Veterinaria Petmanía',
    category: 'health',
    subcategory: 'veterinary',
    zone: 'sur',
    website: 'https://www.veterinarioenadeje.com',
    source: 'web-search',
    status: 'new',
    notes: 'Adeje. Urgencias 9:00-24:00 los 365 días del año.',
  },
  {
    business_name: 'VoyVet Veterinario a Domicilio',
    category: 'health',
    subcategory: 'veterinary',
    zone: 'isla',
    website: 'https://voyvet.com',
    source: 'web-search',
    status: 'new',
    notes: 'Servicio veterinario a domicilio en Tenerife. Ideal para turistas con mascotas.',
  },

  // ============================
  // BEAUTY / BARBER (4)
  // ============================
  {
    business_name: 'Fabrik Barber',
    category: 'beauty',
    subcategory: 'barbershop',
    zone: 'metropolitana',
    website: 'https://fabrikbarber.com',
    source: 'web-search',
    status: 'new',
    notes: 'Santa Cruz. Barbería y peluquería. Excelente calidad-precio.',
  },
  {
    business_name: 'Barba Negra Barbería',
    category: 'beauty',
    subcategory: 'barbershop',
    zone: 'metropolitana',
    website: 'https://barberiabarbanegra.com',
    source: 'web-search',
    status: 'new',
    notes: 'Desde 2017. Barbería clásica con toque moderno.',
  },
  {
    business_name: 'Boxer Barber',
    category: 'beauty',
    subcategory: 'barbershop',
    zone: 'metropolitana',
    website: 'https://boxerbarber.com',
    source: 'web-search',
    status: 'new',
    notes: 'El Sobradillo, Santa Cruz. Buena opción para turistas de paso.',
  },
  {
    business_name: 'Xclusiv Barbershop',
    category: 'beauty',
    subcategory: 'barbershop',
    zone: 'metropolitana',
    website: 'https://xclusivbarber.com',
    source: 'web-search',
    status: 'new',
    notes: 'La Laguna. Barbería profesional de caballeros.',
  },

  // ============================
  // SPORTS - CrossFit / Gyms (5)
  // ============================
  {
    business_name: 'CrossFit 27',
    category: 'sports',
    subcategory: 'crossfit',
    zone: 'sur',
    website: 'https://www.crossfit27.com',
    source: 'web-search',
    status: 'new',
    notes: 'Adeje. 1200m². Drop-in para turistas 35€/semana. Múltiples áreas de entrenamiento.',
  },
  {
    business_name: 'BeMe Training',
    category: 'sports',
    subcategory: 'crossfit',
    zone: 'metropolitana',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Santa Cruz. Instalaciones de primer nivel, entrenadores certificados.',
  },
  {
    business_name: 'CrossFit La Laguna',
    category: 'sports',
    subcategory: 'crossfit',
    zone: 'metropolitana',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Norte de Tenerife. Ambiente profesional para todos los niveles.',
  },
  {
    business_name: 'CrossFit Santa Cruz Elite',
    category: 'sports',
    subcategory: 'crossfit',
    zone: 'metropolitana',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Santa Cruz. Desde básico hasta programas de competición.',
  },
  {
    business_name: 'Survive Top Training',
    category: 'sports',
    subcategory: 'gym',
    zone: 'sur',
    website: 'https://www.survivetoptraining.com',
    source: 'web-search',
    status: 'new',
    notes: 'Gimnasio HYROX oficial. +1000m² equipado. Sur de Tenerife.',
  },

  // ============================
  // GOLF (6)
  // ============================
  {
    business_name: 'Golf Costa Adeje',
    category: 'golf',
    subcategory: 'golf-course',
    zone: 'sur',
    website: 'https://www.golfcostaadeje.com',
    source: 'web-search',
    status: 'new',
    notes: 'Championship Golf Course + 9 hoyos Los Lagos.',
  },
  {
    business_name: 'Abama Golf',
    category: 'golf',
    subcategory: 'golf-course',
    zone: 'sur',
    website: 'https://www.abamagolf.com',
    source: 'web-search',
    status: 'new',
    notes: 'Diseño Dave Thomas. 18 hoyos. +20.000 palmeras. En la cara oeste del Teide.',
  },
  {
    business_name: 'Golf Las Américas',
    category: 'golf',
    subcategory: 'golf-course',
    zone: 'sur',
    website: 'https://www.golflasamericas.com',
    source: 'web-search',
    status: 'new',
    notes: 'Desde 1998. Diseño John Jacobs. Corazón de Playa de Las Américas.',
  },
  {
    business_name: 'Golf del Sur',
    category: 'golf',
    subcategory: 'golf-course',
    zone: 'sur',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'San Miguel de Abona. Diseño José Gancedo. Campo clásico del sur.',
  },
  {
    business_name: 'Real Club de Golf de Tenerife',
    category: 'golf',
    subcategory: 'golf-club',
    zone: 'norte',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Fundado en 1932. Uno de los más antiguos de España.',
  },
  {
    business_name: 'Tenerife Golf Club Hire',
    category: 'golf',
    subcategory: 'golf-rental',
    zone: 'isla',
    website: 'https://www.tenerifegolfclubhire.com',
    source: 'web-search',
    status: 'new',
    notes: 'Alquiler de palos. Desde 49€/semana. Entrega gratuita en hotel.',
  },
]

async function main() {
  console.log(`\n--- Scrape More Businesses --- Web Search Results`)
  console.log(`   Total leads to upsert: ${leads.length}\n`)

  // Get existing business names to avoid duplicates
  const { data: existing } = await sb
    .from('leads')
    .select('business_name')
  const existingNames = new Set((existing || []).map(e => e.business_name.toLowerCase().trim()))

  const newLeads = leads.filter(l => !existingNames.has(l.business_name.toLowerCase().trim()))
  const skipped = leads.length - newLeads.length
  if (skipped > 0) {
    console.log(`  Skipping ${skipped} leads that already exist in DB`)
  }

  if (newLeads.length === 0) {
    console.log('  No new leads to insert. All already exist.')
    return
  }

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
      console.error(`  Batch ${Math.floor(i / batchSize) + 1} error:`, error.message)
      errors++
    } else {
      upserted += batch.length
      const names = batch.map(l => l.business_name).join(', ')
      console.log(`  Batch ${Math.floor(i / batchSize) + 1}: ${batch.length} leads (${names})`)
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
