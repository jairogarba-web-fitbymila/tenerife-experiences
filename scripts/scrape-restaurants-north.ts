import { createClient } from '@supabase/supabase-js'

const sb = createClient(
  'https://sqesgghvaazyajzjkoap.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxZXNnZ2h2YWF6eWFqemprb2FwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzUxMzgwOSwiZXhwIjoyMDg5MDg5ODA5fQ.UvbRfWU9seJPT9lyCyLmpD4uZrP9jXzsNoeSAjT9HnI'
)

/**
 * Restaurants scraped from web searches - Northern Tenerife & Metropolitan Area
 * Sources:
 * - "restaurantes puerto de la cruz tripadvisor"
 * - "restaurantes la orotava"
 * - "restaurantes icod de los vinos"
 * - "restaurantes garachico"
 * - "restaurantes santa cruz de tenerife mejores"
 * - "restaurantes la laguna tapas"
 * - "guachinches tegueste"
 * - "guachinches tacoronte mejores"
 * - "guachinches la matanza"
 * - "guachinches el sauzal"
 * - "guachinches la orotava abiertos"
 * - "restaurantes buenavista del norte"
 * - "restaurantes los realejos"
 * - "cafeterias especiales tenerife norte"
 * - "brunch santa cruz tenerife"
 */

const restaurants = [
  // === PUERTO DE LA CRUZ (additional) ===
  {
    business_name: 'La Cocina de Puerto de la Cruz',
    category: 'restaurant',
    subcategory: 'canarian',
    zone: 'Puerto de la Cruz',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Restaurante muy bien valorado en TripAdvisor. Ubicación céntrica en Puerto de la Cruz.',
  },
  {
    business_name: 'Bodega Julian',
    category: 'restaurant',
    subcategory: 'canarian',
    zone: 'Puerto de la Cruz',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Bodega popular con cocina canaria tradicional. Puerto de la Cruz.',
  },
  {
    business_name: 'Restaurante Régulo',
    category: 'restaurant',
    subcategory: 'canarian',
    zone: 'Puerto de la Cruz',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Restaurante clásico en casona canaria del siglo XVIII. Casco histórico de Puerto de la Cruz.',
  },
  {
    business_name: 'Tasca El Olivo',
    category: 'restaurant',
    subcategory: 'tapas',
    zone: 'Puerto de la Cruz',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Tapas y raciones en zona de La Ranilla. Puerto de la Cruz.',
  },

  // === LA OROTAVA ===
  {
    business_name: 'Bodega Tapias',
    category: 'restaurant',
    subcategory: 'canarian',
    zone: 'La Orotava',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Top 10 en La Orotava según TripAdvisor. Cocina canaria tradicional.',
  },
  {
    business_name: 'Sabor Ibérico La Orotava',
    category: 'restaurant',
    subcategory: 'tapas',
    zone: 'La Orotava',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Especialidad en productos ibéricos. La Orotava.',
  },
  {
    business_name: 'Tito\'s Bodeguita',
    category: 'restaurant',
    subcategory: 'canarian',
    zone: 'La Orotava',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Restaurante familiar en La Orotava. Cocina casera canaria.',
  },
  {
    business_name: 'La Zafra Restaurante',
    category: 'restaurant',
    subcategory: 'canarian',
    zone: 'La Orotava',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Restaurante en La Orotava con buenas reseñas. Cocina local.',
  },
  {
    business_name: 'Guachinche El Descarado',
    category: 'restaurant',
    subcategory: 'guachinche',
    zone: 'La Orotava',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Guachinche moderno abierto en 2025. Especialidad en arroces y carnes a la brasa. La Orotava.',
  },
  {
    business_name: 'Guachinche El Timplillo',
    category: 'restaurant',
    subcategory: 'guachinche',
    zone: 'La Orotava',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Guachinche auténtico. Solo abre cuando tiene vino propio. La Orotava.',
  },
  {
    business_name: 'Guachinche Lala',
    category: 'restaurant',
    subcategory: 'guachinche',
    zone: 'La Orotava',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Recomendado por Guía Repsol (Solete). Guachinche de referencia en La Orotava.',
  },
  {
    business_name: 'Guachinche Ramón',
    category: 'restaurant',
    subcategory: 'guachinche',
    zone: 'La Orotava',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Comida buenísima y postres increíbles. Considerado uno de los mejores guachinches de la isla.',
  },

  // === ICOD DE LOS VINOS ===
  {
    business_name: 'GastroZona El Mortero',
    category: 'restaurant',
    subcategory: 'canarian',
    zone: 'Icod de los Vinos',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Restaurante top en Icod de los Vinos. Cocina canaria con toque gastronómico.',
  },
  {
    business_name: 'La Parada Casa de Comidas',
    category: 'restaurant',
    subcategory: 'canarian',
    zone: 'Icod de los Vinos',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Casa de comidas tradicional. Platos caseros canarios en Icod de los Vinos.',
  },
  {
    business_name: 'Restaurante Agustín y Rosa',
    category: 'restaurant',
    subcategory: 'canarian',
    zone: 'Icod de los Vinos',
    website: 'https://www.restauranteagustinyrosa.com/',
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Restaurante con web propia. Cocina canaria en Icod de los Vinos.',
  },
  {
    business_name: 'El Patio de Interián',
    category: 'restaurant',
    subcategory: 'canarian',
    zone: 'Icod de los Vinos',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Top rated en Yelp. Cocina canaria en patio tradicional. Icod de los Vinos.',
  },
  {
    business_name: 'Restaurante Amarca',
    category: 'restaurant',
    subcategory: 'marisqueria',
    zone: 'Icod de los Vinos',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Junto a Playa San Marcos. Pescado fresco y marisco. Icod de los Vinos.',
  },

  // === GARACHICO ===
  {
    business_name: 'Cañada de Garachico',
    category: 'restaurant',
    subcategory: 'fine-dining',
    zone: 'Garachico',
    website: 'https://canadadegarachico.net/',
    source: 'web-search',
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Espacio gastronómico fundado en 2011 por chef Gabriel Reyes. Gastronomía española creativa.',
  },
  {
    business_name: 'Mirador de Garachico',
    category: 'restaurant',
    subcategory: 'canarian',
    zone: 'Garachico',
    website: 'https://miradordegarachico.com/',
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Vistas al océano. Cocina canaria con las mejores vistas de Garachico.',
  },
  {
    business_name: 'Rocamar Garachico',
    category: 'restaurant',
    subcategory: 'marisqueria',
    zone: 'Garachico',
    website: 'https://rocamar.tf/',
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Buena comida con vistas al océano. Pescado fresco. Garachico.',
  },
  {
    business_name: 'Rugantino Garachico',
    category: 'restaurant',
    subcategory: 'international',
    zone: 'Garachico',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Conocido por tener la mejor pizza de Tenerife según reseñas. Garachico.',
  },

  // === SANTA CRUZ DE TENERIFE ===
  {
    business_name: 'Restaurante El Aguarde',
    category: 'restaurant',
    subcategory: 'canarian',
    zone: 'Santa Cruz de Tenerife',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Inmersión en sabores canarios. Entorno moderno. Productos locales y recetas tradicionales.',
  },
  {
    business_name: 'Restaurante Kiki',
    category: 'restaurant',
    subcategory: 'international',
    zone: 'Santa Cruz de Tenerife',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Fusión japonesa-canaria. Ambiente de inspiración japonesa. Santa Cruz.',
  },
  {
    business_name: 'D\'Tapas 26',
    category: 'restaurant',
    subcategory: 'tapas',
    zone: 'Santa Cruz de Tenerife',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Corazón de Santa Cruz. Tapas creativas con ingredientes frescos y locales. Terraza.',
  },
  {
    business_name: 'Restaurante Sagrario',
    category: 'restaurant',
    subcategory: 'canarian',
    zone: 'Santa Cruz de Tenerife',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Decoración cálida y atípica. Cocina española de calidad. Santa Cruz.',
  },
  {
    business_name: 'Etereo by Pedro Nel',
    category: 'restaurant',
    subcategory: 'fine-dining',
    zone: 'Santa Cruz de Tenerife',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Cerca del Parque García Sanabria. Cocina de autor. Santa Cruz.',
  },
  {
    business_name: 'Sabela Bar & Food Market',
    category: 'restaurant',
    subcategory: 'brunch',
    zone: 'Santa Cruz de Tenerife',
    website: 'https://sabelabar.com/',
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Brunch y gastronomía. Tostadas de salmón, cerdo negro. Zumos frescos. Centro de Santa Cruz.',
  },
  {
    business_name: 'Strasse Park',
    category: 'restaurant',
    subcategory: 'brunch',
    zone: 'Santa Cruz de Tenerife',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Favorito para brunch en Santa Cruz. Ambiente moderno y relajado.',
  },
  {
    business_name: 'Santo Pecado Gastrobar',
    category: 'restaurant',
    subcategory: 'tapas',
    zone: 'Santa Cruz de Tenerife',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Gastrobar popular para brunch y tapas. Santa Cruz de Tenerife.',
  },
  {
    business_name: 'Unami Good Food',
    category: 'restaurant',
    subcategory: 'international',
    zone: 'Santa Cruz de Tenerife',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: '100% vegano. Menú saludable con opciones sin gluten. Centro de Santa Cruz.',
  },
  {
    business_name: 'El Rinconcito de Dalia',
    category: 'restaurant',
    subcategory: 'brunch',
    zone: 'Santa Cruz de Tenerife',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Brunch toda la semana. Embutidos ibéricos, panes artesanales, mermelada de higos. Plaza céntrica.',
  },
  {
    business_name: 'Kocora Café',
    category: 'restaurant',
    subcategory: 'brunch',
    zone: 'Santa Cruz de Tenerife',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Parque de La Granja. Brunch viernes a domingo. Santa Cruz.',
  },

  // === LA LAGUNA (additional) ===
  {
    business_name: 'Taberna Santo Domingo',
    category: 'restaurant',
    subcategory: 'tapas',
    zone: 'San Cristóbal de La Laguna',
    website: 'http://santodomingo24.com/',
    source: 'web-search',
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Lugar emblemático en La Laguna. Tapas generosas y variadas. Frente a la parroquia de Santo Domingo.',
  },
  {
    business_name: 'Malamuten Bar',
    category: 'restaurant',
    subcategory: 'tapas',
    zone: 'San Cristóbal de La Laguna',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Tapas exquisitas. Croquetas excepcionales entre las mejores de La Laguna.',
  },
  {
    business_name: 'Tasca El Obispado',
    category: 'restaurant',
    subcategory: 'canarian',
    zone: 'San Cristóbal de La Laguna',
    website: 'https://tascaobispado.com/',
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Tasca canaria en casco histórico de La Laguna. Cocina tradicional.',
  },
  {
    business_name: 'Restaurante Guaydil',
    category: 'restaurant',
    subcategory: 'canarian',
    zone: 'San Cristóbal de La Laguna',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Restaurante popular en La Laguna. Cocina canaria e internacional.',
  },

  // === GUACHINCHES TEGUESTE ===
  {
    business_name: 'Bodegón Casa Tomás',
    category: 'restaurant',
    subcategory: 'guachinche',
    zone: 'Tegueste',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Abierto desde 1977 en El Portezuelo. Famoso por costillas con papas y piña (millo). Tegueste.',
  },
  {
    business_name: 'Restaurante El Guayero',
    category: 'restaurant',
    subcategory: 'guachinche',
    zone: 'Tegueste',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Comida canaria, carnes a la brasa, postres caseros. Terraza al aire libre. Tegueste.',
  },
  {
    business_name: 'Guachinche El Portezuelo',
    category: 'restaurant',
    subcategory: 'guachinche',
    zone: 'Tegueste',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Guachinche tradicional en barrio El Portezuelo. Tegueste.',
  },

  // === GUACHINCHES TACORONTE ===
  {
    business_name: 'Guachinche Casa Carlos',
    category: 'restaurant',
    subcategory: 'guachinche',
    zone: 'Tacoronte',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Ambiente familiar, décor rústico. Garbanzas, arroz, carnes a la brasa. Tacoronte.',
  },
  {
    business_name: 'Guachinche El Patio Tacoronte',
    category: 'restaurant',
    subcategory: 'guachinche',
    zone: 'Tacoronte',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Comida canaria típica con precios asequibles y buen ambiente. Tacoronte.',
  },
  {
    business_name: 'Guachinche El Quinto Cono',
    category: 'restaurant',
    subcategory: 'guachinche',
    zone: 'Tacoronte',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Guachinche con reseñas en TripAdvisor. Tacoronte.',
  },
  {
    business_name: 'Casa Niño (La Cruz Roja)',
    category: 'restaurant',
    subcategory: 'guachinche',
    zone: 'Tacoronte',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Destacado por National Geographic entre los mejores guachinches de Tenerife. Tacoronte.',
  },
  {
    business_name: 'Restaurante El Calvario',
    category: 'restaurant',
    subcategory: 'canarian',
    zone: 'Tacoronte',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Comida tradicional a precios accesibles. Popular los domingos. Tacoronte.',
  },

  // === GUACHINCHES LA MATANZA ===
  {
    business_name: 'Guachinche La Cueva (La Matanza)',
    category: 'restaurant',
    subcategory: 'guachinche',
    zone: 'La Matanza de Acentejo',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Decoración y servicio de alta calidad. Vistas al Teide, mar y viñedos. La Matanza.',
  },
  {
    business_name: 'Guachinche El Chupete',
    category: 'restaurant',
    subcategory: 'guachinche',
    zone: 'La Matanza de Acentejo',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Abre solo mientras dure la cosecha (nov-abr/may). Guachinche auténtico. La Matanza.',
  },

  // === GUACHINCHES EL SAUZAL ===
  {
    business_name: 'Guachinche Casa Ayo',
    category: 'restaurant',
    subcategory: 'guachinche',
    zone: 'El Sauzal',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Guachinche familiar en Ravelo. Queso asado, churros de pescado, bacalao encebollado. El Sauzal.',
  },
  {
    business_name: 'Guachinche Antonio León',
    category: 'restaurant',
    subcategory: 'guachinche',
    zone: 'El Sauzal',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Guachinche tradicional con terraza en El Ravelo. El Sauzal.',
  },
  {
    business_name: 'Bodegón Los Muchachos',
    category: 'restaurant',
    subcategory: 'guachinche',
    zone: 'El Sauzal',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Pequeño bar de tapas con vino propio. Pimientos de padrón, queso, chocos, croquetas. El Sauzal.',
  },
  {
    business_name: 'El Café de Manuela',
    category: 'restaurant',
    subcategory: 'brunch',
    zone: 'El Sauzal',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Tesoro para brunch. Tostadas francesas con frutas, huevos revueltos con espinacas y queso de cabra. El Sauzal.',
  },
  {
    business_name: 'Terrazas del Sauzal',
    category: 'restaurant',
    subcategory: 'brunch',
    zone: 'El Sauzal',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Brunch con vistas al mar. Pancakes, bollería artesanal. Terraza relajada. El Sauzal.',
  },

  // === BUENAVISTA DEL NORTE ===
  {
    business_name: 'Brisas de Teno',
    category: 'restaurant',
    subcategory: 'canarian',
    zone: 'Buenavista del Norte',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Papas arrugadas y carnes a la brasa. Cocina canaria en entorno natural. Buenavista del Norte.',
  },
  {
    business_name: 'El Rincón La Abu',
    category: 'restaurant',
    subcategory: 'international',
    zone: 'Buenavista del Norte',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Valle de El Palmar. Cocina mediterránea con terraza y vistas al paisaje. Buenavista del Norte.',
  },
  {
    business_name: 'Restaurante Burgado',
    category: 'restaurant',
    subcategory: 'canarian',
    zone: 'Buenavista del Norte',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Especialidad en carnes a la brasa. Ambiente tranquilo y acogedor. Buenavista del Norte.',
  },

  // === LOS REALEJOS ===
  {
    business_name: 'Mesón El Monasterio',
    category: 'restaurant',
    subcategory: 'canarian',
    zone: 'Los Realejos',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Clásico del norte de Tenerife. Vistas espectaculares. Finca con animales. Los Realejos.',
  },

  // === SPECIALTY COFFEE & CAFÉS ===
  {
    business_name: 'We The North Coffee',
    category: 'restaurant',
    subcategory: 'cafe',
    zone: 'San Cristóbal de La Laguna',
    website: 'https://wethenorthcoffee.com/',
    source: 'web-search',
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Mejor café de especialidad de Tenerife. Experiencia third wave. Sedes en Santa Cruz y La Laguna.',
  },
  {
    business_name: 'Ahul Café',
    category: 'restaurant',
    subcategory: 'cafe',
    zone: 'San Cristóbal de La Laguna',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Nombre de raíces guanches. Combina tradición y modernidad. Café de especialidad en La Laguna.',
  },
]

async function main() {
  console.log('=== Scrape Restaurants North: Web Search Results ===\n')
  console.log(`Total restaurants to insert: ${restaurants.length}\n`)

  // 1. Check what already exists to avoid duplicates
  const { data: existing, error: fetchError } = await sb
    .from('leads')
    .select('business_name')
    .eq('category', 'restaurant')

  if (fetchError) {
    console.log('Note: Could not check existing leads:', fetchError.message)
  }

  const existingNames = new Set(
    (existing || []).map((r) => r.business_name.toLowerCase())
  )

  console.log(`Existing restaurant leads: ${existingNames.size}`)
  console.log('')

  // 2. Filter out duplicates
  const newRestaurants = restaurants.filter(
    (r) => !existingNames.has(r.business_name.toLowerCase())
  )

  const skipped = restaurants.length - newRestaurants.length
  if (skipped > 0) {
    console.log(`Skipping ${skipped} restaurants that already exist.\n`)
  }

  if (newRestaurants.length === 0) {
    console.log('No new restaurants to insert. All already exist.')
    return
  }

  console.log(`Inserting ${newRestaurants.length} new restaurants...\n`)

  // 3. Insert in batches
  const batchSize = 10
  let inserted = 0

  for (let i = 0; i < newRestaurants.length; i += batchSize) {
    const batch = newRestaurants.slice(i, i + batchSize)
    const { error } = await sb.from('leads').upsert(batch, {
      onConflict: 'business_name',
      ignoreDuplicates: true,
    })

    if (error) {
      console.log(`  Batch ${Math.floor(i / batchSize) + 1}: upsert failed (${error.message}), trying insert...`)
      const { error: insertError } = await sb.from('leads').insert(batch)
      if (insertError) {
        console.error(`  ERROR batch ${Math.floor(i / batchSize) + 1}:`, insertError.message)
      } else {
        inserted += batch.length
        console.log(`  Inserted batch ${Math.floor(i / batchSize) + 1}: ${batch.length} restaurants`)
      }
    } else {
      inserted += batch.length
      console.log(`  Upserted batch ${Math.floor(i / batchSize) + 1}: ${batch.length} restaurants`)
    }
  }

  console.log(`\nSuccessfully added ${inserted} new restaurant leads!\n`)

  // 4. Summary
  const subcategories = newRestaurants.reduce(
    (acc, r) => {
      acc[r.subcategory] = (acc[r.subcategory] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  console.log('By subcategory:')
  for (const [sub, count] of Object.entries(subcategories).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${sub}: ${count}`)
  }

  const zones = newRestaurants.reduce(
    (acc, r) => {
      acc[r.zone] = (acc[r.zone] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  console.log('\nBy zone:')
  for (const [zone, count] of Object.entries(zones).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${zone}: ${count}`)
  }

  const priorities = newRestaurants.reduce(
    (acc, r) => {
      acc[r.priority] = (acc[r.priority] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  console.log('\nBy priority:')
  for (const [pri, count] of Object.entries(priorities).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${pri}: ${count}`)
  }

  // 5. Final count
  const { count } = await sb
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .eq('category', 'restaurant')

  console.log(`\nTotal restaurant leads in database: ${count}`)
}

main().catch(console.error)
