import { createClient } from '@supabase/supabase-js'

const sb = createClient(
  'https://sqesgghvaazyajzjkoap.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxZXNnZ2h2YWF6eWFqemprb2FwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzUxMzgwOSwiZXhwIjoyMDg5MDg5ODA5fQ.UvbRfWU9seJPT9lyCyLmpD4uZrP9jXzsNoeSAjT9HnI'
)

/**
 * EXHAUSTIVE search for ALL restaurants in Costa Adeje and Adeje municipality.
 * Web search queries used:
 *  1. "restaurantes costa adeje fanabe"
 *  2. "restaurantes costa adeje torviscas"
 *  3. "restaurantes playa del duque"
 *  4. "restaurantes la caleta tenerife"
 *  5. "restaurantes san eugenio tenerife"
 *  6. "restaurantes puerto colon tenerife"
 *  7. "restaurantes bahia del duque"
 *  8. "restaurantes adeje pueblo"
 *  9. "mejores steakhouse costa adeje"
 * 10. "restaurantes thai costa adeje"
 * 11. "restaurantes chinos costa adeje"
 * 12. "restaurantes griegos tenerife sur"
 * 13. "restaurantes libaneses tenerife"
 * 14. "restaurantes peruanos tenerife"
 * 15. "restaurantes coreanos tenerife"
 * 16. "restaurantes fusion tenerife sur"
 * 17. "cafeterias desayunos costa adeje"
 * 18. "heladerias costa adeje"
 * 19. "panaderias artesanales tenerife sur"
 * 20. "food trucks tenerife"
 */

const restaurants = [
  // ============================================================
  // FANABE (Query 1)
  // ============================================================
  {
    business_name: 'Fanabe Sol',
    category: 'restaurant',
    subcategory: 'international',
    zone: 'fanabe',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'C.C. Litoral, Playa de Fanabe. Cocina mediterranea, opciones vegetarianas y sin gluten.',
  },
  {
    business_name: 'El Olivio Restaurante',
    category: 'restaurant',
    subcategory: 'international',
    zone: 'fanabe',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Playa de Fanabe. 4.6 estrellas en TripAdvisor.',
  },
  {
    business_name: 'La Tosca Fresh Food and Grill',
    category: 'restaurant',
    subcategory: 'international',
    zone: 'fanabe',
    website: 'https://www.restaurantelatosca.es',
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Calle Londres 7, Playa de Fanabe. Fresh food and grill concept.',
  },
  {
    business_name: 'La Cupula',
    category: 'restaurant',
    subcategory: 'fusion',
    zone: 'fanabe',
    website: 'https://www.restaurantelacupula.com',
    source: 'web-search',
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Hotel Jardines de Nivaria. Chef Ruben Cabrera. 2 Soles Repsol, recomendado Michelin. Alta gastronomia canario-francesa.',
  },
  {
    business_name: 'Banh Noi Thai Viet Food',
    category: 'restaurant',
    subcategory: 'thai',
    zone: 'fanabe',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'C.C. Playa Fanabe. Comida callejera tailandesa-vietnamita. Vegetarian friendly.',
  },

  // ============================================================
  // TORVISCAS (Query 2)
  // ============================================================
  {
    business_name: 'Restaurante Donaire',
    category: 'restaurant',
    subcategory: 'fusion',
    zone: 'torviscas',
    website: 'https://restaurantedonaire.com',
    source: 'web-search',
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Hotel GF Victoria. Chef Jesus Camacho. Estrella Michelin y Sol Repsol. Fusion pasteleria-cocina salada.',
  },
  {
    business_name: 'Picamar Tapas Bistro',
    category: 'restaurant',
    subcategory: 'fusion',
    zone: 'torviscas',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'C.C. Terra Nova. Bib Gourmand Michelin. Tapas de autor con terraza con vistas al mar. Reserva imprescindible.',
  },
  {
    business_name: 'Cala Restaurante',
    category: 'restaurant',
    subcategory: 'international',
    zone: 'torviscas',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Terraza con vistas a playa Torviscas. Tapas abundantes a buen precio.',
  },
  {
    business_name: 'Trattoria Portofino',
    category: 'restaurant',
    subcategory: 'italian',
    zone: 'torviscas',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Italiano autentico. Antipasti, ensaladas frescas, pizzas caseras. Buena relacion calidad-precio.',
  },
  {
    business_name: 'Odissea Steak Restaurant',
    category: 'restaurant',
    subcategory: 'steakhouse',
    zone: 'torviscas',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Frente a Playa La Pinta. Steaks de alta calidad en parrilla Josper. Vistas al Atlantico.',
  },

  // ============================================================
  // PLAYA DEL DUQUE (Query 3)
  // ============================================================
  {
    business_name: 'Duquesa Bistro',
    category: 'restaurant',
    subcategory: 'fusion',
    zone: 'playa-del-duque',
    website: 'https://www.duquesabistro.com',
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Elegante bistro mediterraneo con vistas al oceano. Menu degustacion con sabores de Tenerife. Mariscada con carabineros.',
  },
  {
    business_name: 'Upalupa',
    category: 'restaurant',
    subcategory: 'fusion',
    zone: 'playa-del-duque',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Junto a Playa del Duque. Cocina mediterranea de vanguardia. Cocteles de autor. Vistas a La Gomera.',
  },
  {
    business_name: 'El Cenador',
    category: 'restaurant',
    subcategory: 'international',
    zone: 'playa-del-duque',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Hotel JOIA El Mirador by Iberostar. Experiencia gastronomica de calidad junto a Playa del Duque.',
  },
  {
    business_name: 'Limoncello Costa Adeje',
    category: 'restaurant',
    subcategory: 'italian',
    zone: 'playa-del-duque',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Italiano popular cerca de Playa del Duque. Top rated en TripAdvisor.',
  },
  {
    business_name: 'La Torre del Mirador',
    category: 'restaurant',
    subcategory: 'international',
    zone: 'playa-del-duque',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Restaurante con vistas panoramicas cerca de Playa del Duque.',
  },

  // ============================================================
  // LA CALETA (Query 4)
  // ============================================================
  {
    business_name: 'La Vieja Restaurante',
    category: 'restaurant',
    subcategory: 'seafood',
    zone: 'la-caleta',
    website: 'https://restaurantelavieja.com',
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Amplia seleccion de pescado fresco de la costa local. Mariscos variados. Referencia en La Caleta.',
  },
  {
    business_name: 'San Ho',
    category: 'restaurant',
    subcategory: 'fusion',
    zone: 'la-caleta',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Fusion peruano-japones-canario. Chefs Eduardo Dominguez y Adrian Bosch. Recomendado Michelin.',
  },
  {
    business_name: 'Mirlo La Caleta',
    category: 'restaurant',
    subcategory: 'fusion',
    zone: 'la-caleta',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Cocina mediterranea con influencias japonesas. Tapas sofisticadas. Cocteles de autor. Vistas al oceano.',
  },
  {
    business_name: 'Rosso Sul Mare',
    category: 'restaurant',
    subcategory: 'italian',
    zone: 'la-caleta',
    website: 'https://rossosulmare.es',
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Desde 2006. Wine bar e italiano. Terraza frente al mar con vistas a La Gomera. Risottos, pizzas, pastas.',
  },
  {
    business_name: 'Jade Stone Restaurant',
    category: 'restaurant',
    subcategory: 'international',
    zone: 'la-caleta',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Cocina mediterranea en la exclusiva La Caleta.',
  },
  {
    business_name: 'Restaurante La Caleta',
    category: 'restaurant',
    subcategory: 'seafood',
    zone: 'la-caleta',
    website: 'https://restaurantelacaleta.com',
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: '50 anos frente al mar. Referencia historica en La Caleta. Pescado y marisco.',
  },
  {
    business_name: 'Yakuza by Olivier',
    category: 'restaurant',
    subcategory: 'fusion',
    zone: 'la-caleta',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Tivoli La Caleta Resort. Fusion oriente-occidente. Cocina japonesa con toque europeo.',
  },

  // ============================================================
  // SAN EUGENIO (Query 5)
  // ============================================================
  {
    business_name: 'The Ginger Pig',
    category: 'restaurant',
    subcategory: 'international',
    zone: 'san-eugenio',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Salchichas artesanales, pan de masa madre. Desayunos y platos principales. 5 estrellas TripAdvisor.',
  },

  // ============================================================
  // PUERTO COLON (Query 6)
  // ============================================================
  {
    business_name: 'Royal Beach Puerto Colon',
    category: 'restaurant',
    subcategory: 'seafood',
    zone: 'puerto-colon',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Restaurante establecido en el pintoresco Puerto Colon. Pescado fresco y marisco.',
  },
  {
    business_name: 'Miishi Sushi Club',
    category: 'restaurant',
    subcategory: 'japanese',
    zone: 'puerto-colon',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Muelle de Puerto Colon. Vistas a yates de lujo. Sushi y cocina japonesa.',
  },
  {
    business_name: 'Restaurante El Puerto',
    category: 'restaurant',
    subcategory: 'seafood',
    zone: 'puerto-colon',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Frente al mar de Puerto Colon. Costa Adeje.',
  },
  {
    business_name: 'JOIA El Mirador',
    category: 'restaurant',
    subcategory: 'fusion',
    zone: 'puerto-colon',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Iberostar Puerto Colon. Chef Rafael de Leon. Bistronomico con terraza vista mar. Menu degustacion con producto local. Version vegana disponible.',
  },

  // ============================================================
  // BAHIA DEL DUQUE (Query 7)
  // ============================================================
  {
    business_name: 'Kensei Contemporary Japanese',
    category: 'restaurant',
    subcategory: 'japanese',
    zone: 'playa-del-duque',
    website: 'https://kenseijapanesetenerife.com',
    source: 'web-search',
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Bahia del Duque. Chef Victor Planas. Sol Repsol, distinguido Michelin. Cocina japonesa contemporanea. Menu omakase.',
  },
  {
    business_name: 'La Brasserie by Pierre Resimont',
    category: 'restaurant',
    subcategory: 'french',
    zone: 'playa-del-duque',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Bahia del Duque. Chef belga Pierre Resimont. Gastronomia franco-belga con productos locales y de temporada.',
  },
  {
    business_name: 'Alisios Market Food',
    category: 'restaurant',
    subcategory: 'fusion',
    zone: 'playa-del-duque',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Bahia del Duque. Chef Lucas Ordonez. Fusion de productos de mercado con alta cocina. Ingredientes frescos y de temporada.',
  },
  {
    business_name: 'Sua Restaurante Vasco',
    category: 'restaurant',
    subcategory: 'basque',
    zone: 'playa-del-duque',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Bahia del Duque. Cocina vasca.',
  },
  {
    business_name: 'La Hacienda Bahia del Duque',
    category: 'restaurant',
    subcategory: 'mexican',
    zone: 'playa-del-duque',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Bahia del Duque. Cocina mexicana con vistas al mar. Tacos, fajitas, cocteles al atardecer.',
  },

  // ============================================================
  // ADEJE PUEBLO (Query 8)
  // ============================================================
  {
    business_name: 'Tasca Tonazaro',
    category: 'restaurant',
    subcategory: 'canarian',
    zone: 'adeje-pueblo',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Tijoco Alto, Adeje. Guachinche en casa de campo. Zona rural con rutas de senderismo. Cocina canaria tipica.',
  },
  {
    business_name: 'La Tasquita de Adeje',
    category: 'restaurant',
    subcategory: 'canarian',
    zone: 'adeje-pueblo',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Centro del pueblo de Adeje. Establecimiento familiar. Buenos precios, comida de calidad, ambiente tranquilo.',
  },
  {
    business_name: 'Tasca El Canon',
    category: 'restaurant',
    subcategory: 'canarian',
    zone: 'adeje-pueblo',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Calle Piedra Redonda 12, Adeje. Cocina canaria tradicional. Ambiente de guachinche.',
  },
  {
    business_name: 'Guachinche Tabaiba',
    category: 'restaurant',
    subcategory: 'canarian',
    zone: 'adeje-pueblo',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Guachinche tradicional en Adeje. Pulpo, morena, lapas. Carne de cabra y cordero destacadas.',
  },
  {
    business_name: 'Tasca Las Tapas Adeje',
    category: 'restaurant',
    subcategory: 'canarian',
    zone: 'adeje-pueblo',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Comida canaria tipica en Adeje pueblo.',
  },
  {
    business_name: 'Bar Casi Guachinche',
    category: 'restaurant',
    subcategory: 'canarian',
    zone: 'adeje-pueblo',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Guachinche en Adeje. Buena terraza, ambiente y comida.',
  },

  // ============================================================
  // STEAKHOUSES (Query 9)
  // ============================================================
  {
    business_name: 'CHAR Fuego y Brasas',
    category: 'restaurant',
    subcategory: 'steakhouse',
    zone: 'la-caleta',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Hotel Baobab Suites. Chef Babacar Fall. Sol Repsol. #61 World Best Steaks. Primer steakhouse canario con reconocimiento mundial.',
  },
  {
    business_name: 'Colala Steakhouse',
    category: 'restaurant',
    subcategory: 'steakhouse',
    zone: 'torviscas',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Steaks cocinados a la perfeccion. Tambien marisco fresco.',
  },
  {
    business_name: 'Vegas Grill',
    category: 'restaurant',
    subcategory: 'steakhouse',
    zone: 'san-eugenio',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Steakhouse popular en la zona de San Eugenio, Costa Adeje.',
  },
  {
    business_name: 'Loch Ness Steak Restaurant',
    category: 'restaurant',
    subcategory: 'steakhouse',
    zone: 'torviscas',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Steakhouse muy popular en Costa Adeje. Destacado en TripAdvisor.',
  },

  // ============================================================
  // THAI (Query 10)
  // ============================================================
  {
    business_name: 'Yum Yum Thai',
    category: 'restaurant',
    subcategory: 'thai',
    zone: 'playa-del-duque',
    website: 'https://yumyumrest.com',
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'The Duke Shops, Costa Adeje. Cocina tailandesa y asiatica. Sin gluten disponible.',
  },
  {
    business_name: 'Oriental Slow Boat',
    category: 'restaurant',
    subcategory: 'chinese',
    zone: 'playa-del-duque',
    website: 'https://www.orientalslowboat.com',
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Av. de Bruselas 14. Chino, tailandes, sushi. Pad Thai y curries autenticos. Delivery disponible.',
  },
  {
    business_name: 'Sawad Dee Thai',
    category: 'restaurant',
    subcategory: 'thai',
    zone: 'san-eugenio',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Restaurante tailandes en Costa Adeje. Destacado en TripAdvisor.',
  },
  {
    business_name: 'ThaiRico',
    category: 'restaurant',
    subcategory: 'thai',
    zone: 'fanabe',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Restaurante tailandes en Costa Adeje.',
  },
  {
    business_name: 'Ayutthaya Thai',
    category: 'restaurant',
    subcategory: 'thai',
    zone: 'torviscas',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Restaurante tailandes en Costa Adeje.',
  },

  // ============================================================
  // CHINESE (Query 11)
  // ============================================================
  {
    business_name: 'Peking Garden Costa Adeje',
    category: 'restaurant',
    subcategory: 'chinese',
    zone: 'san-eugenio',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Restaurante familiar chino clasico. Rollitos crujientes y costillas con sal y pimienta.',
  },
  {
    business_name: 'Rong Cheng',
    category: 'restaurant',
    subcategory: 'chinese',
    zone: 'torviscas',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Buffet chino de calidad. Excelente comida, servicio atento, precios razonables.',
  },
  {
    business_name: 'Dragon Garden',
    category: 'restaurant',
    subcategory: 'chinese',
    zone: 'fanabe',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Restaurante chino con excelente servicio. Personal amable y servicio rapido.',
  },
  {
    business_name: 'Restaurant 88 Chinese',
    category: 'restaurant',
    subcategory: 'chinese',
    zone: 'playa-del-duque',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Chino gourmet cerca de Playa del Duque. Comida e impecable servicio.',
  },
  {
    business_name: 'Many Star Chinese',
    category: 'restaurant',
    subcategory: 'chinese',
    zone: 'adeje-pueblo',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Restaurante chino con comida a domicilio en Adeje.',
  },

  // ============================================================
  // GREEK (Query 12)
  // ============================================================
  {
    business_name: 'OPA! Restaurante Griego',
    category: 'restaurant',
    subcategory: 'greek',
    zone: 'san-eugenio',
    website: 'https://oparestaurantetenerife.com',
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'C.C. X-Sur. Griego moderno autentico. Sous-vide, souvlaki, tzatziki, spanakopita. Gran ambiente y buenas opiniones.',
  },

  // ============================================================
  // LEBANESE (Query 13)
  // ============================================================
  {
    business_name: 'Habibi Lebanese',
    category: 'restaurant',
    subcategory: 'lebanese',
    zone: 'torviscas',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Restaurante libanes en el sur de Tenerife. Todo delicioso, variado, ingredientes naturales. Vistas al oceano.',
  },

  // ============================================================
  // PERUVIAN (Query 14)
  // ============================================================
  {
    business_name: 'Qapaq Restaurante Peruano',
    category: 'restaurant',
    subcategory: 'peruvian',
    zone: 'san-eugenio',
    website: 'https://qapaqtenerife.com',
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Av. la Habana 14, Arona/Adeje. Chef Rosa Lia. Guia Repsol. Menu degustacion desde 55EUR. Ceviche y tiradito.',
  },

  // ============================================================
  // KOREAN (Query 15)
  // ============================================================
  {
    business_name: 'Gangnam Food Station',
    category: 'restaurant',
    subcategory: 'korean',
    zone: 'san-eugenio',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Comida coreana muy recomendada. Pollo picante, empanadas, arroces. Referencia para cocina coreana en Tenerife.',
  },

  // ============================================================
  // FUSION (Query 16)
  // ============================================================
  {
    business_name: 'El MayeQ',
    category: 'restaurant',
    subcategory: 'fusion',
    zone: 'fanabe',
    website: 'https://www.elmayeq.com',
    source: 'web-search',
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Playa Paraiso, Costa Adeje. Alta cocina fusion. Ingredientes frescos locales con tecnicas contemporaneas.',
  },
  {
    business_name: 'Almar Restaurante',
    category: 'restaurant',
    subcategory: 'fusion',
    zone: 'la-caleta',
    website: 'https://almartenerife.com',
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Cocina mediterranea con fusion japonesa. Vistas al mar excepcionales.',
  },

  // ============================================================
  // CAFES / BREAKFAST (Query 17)
  // ============================================================
  {
    business_name: 'Adeje Coffee Brunch Slow Food',
    category: 'restaurant',
    subcategory: 'cafe',
    zone: 'adeje-pueblo',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Av. de la Constitucion, Adeje. 6 tipos de brunch desde 8.70EUR. Tostadas, pancakes, bowls, smoothies.',
  },
  {
    business_name: 'Wakanda Food & Cocktails',
    category: 'restaurant',
    subcategory: 'cafe',
    zone: 'fanabe',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Frente a Hotel La Nina. Brunch popular para 2 personas. Zona turistica de Costa Adeje.',
  },
  {
    business_name: "Flo's Tenerife",
    category: 'restaurant',
    subcategory: 'cafe',
    zone: 'torviscas',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Comida deliciosa y saludable. Opciones veganas. Popular para desayunos.',
  },
  {
    business_name: "Lily's English Tea Terrace",
    category: 'restaurant',
    subcategory: 'cafe',
    zone: 'san-eugenio',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Full breakfast abundante. Servicio estupendo. Te ingles.',
  },
  {
    business_name: 'The Pink Parrot',
    category: 'restaurant',
    subcategory: 'cafe',
    zone: 'fanabe',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Cafeteria popular para desayunos en Costa Adeje. Muy bien valorada.',
  },
  {
    business_name: "D'Vainilla",
    category: 'restaurant',
    subcategory: 'cafe',
    zone: 'torviscas',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Cafeteria y brunch en Costa Adeje.',
  },
  {
    business_name: 'Acanto Cafe',
    category: 'restaurant',
    subcategory: 'cafe',
    zone: 'fanabe',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Cafeteria y desayunos en Costa Adeje.',
  },

  // ============================================================
  // ICE CREAM (Query 18)
  // ============================================================
  {
    business_name: 'Amorino Siam Mall',
    category: 'restaurant',
    subcategory: 'ice-cream',
    zone: 'fanabe',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'C.C. Siam Mall, Costa Adeje. Heladeria italiana artesanal, gofres con helado y cafe.',
  },
  {
    business_name: 'Heladeria Sorbi',
    category: 'restaurant',
    subcategory: 'ice-cream',
    zone: 'adeje-pueblo',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Zona Galeon, Adeje. Tambien pizzeria, cafeteria y pasteleria. Helados cremosos y sabrosos con sabores tradicionales.',
  },
  {
    business_name: 'Gelateria Exotica',
    category: 'restaurant',
    subcategory: 'ice-cream',
    zone: 'adeje-pueblo',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Heladeria en Adeje.',
  },
  {
    business_name: 'La Gelateria by Royal Hideaway',
    category: 'restaurant',
    subcategory: 'ice-cream',
    zone: 'torviscas',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Av. Virgen de Guadalupe 21, Costa Adeje. Heladeria de hotel de lujo.',
  },

  // ============================================================
  // BAKERIES (Query 19)
  // ============================================================
  {
    business_name: 'Biopanacea',
    category: 'restaurant',
    subcategory: 'bakery',
    zone: 'adeje-pueblo',
    website: 'https://www.biopanacea.es',
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Agromercado de Adeje (sabados). Panaderia artesanal ecologica. Masa madre, harina certificada, agua Fonteide, sal ecologica.',
  },
  {
    business_name: 'Pan de Tenerife',
    category: 'restaurant',
    subcategory: 'bakery',
    zone: 'adeje-pueblo',
    website: 'https://www.pandetenerife.es',
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Pan artesanal y natural. Punto de venta Salud Alto. Pan integral, especialidades, entrega a domicilio.',
  },
  {
    business_name: 'Pasteleria Nubes',
    category: 'restaurant',
    subcategory: 'bakery',
    zone: 'fanabe',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Pasteleria en Costa Adeje.',
  },

  // ============================================================
  // FOOD TRUCKS (Query 20)
  // ============================================================
  {
    business_name: 'La Jefa Food Truck',
    category: 'restaurant',
    subcategory: 'food-truck',
    zone: 'adeje-pueblo',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Food truck itinerante. Llegan donde los clientes quieren.',
  },
  {
    business_name: 'GF Victoria Food Truck Bar',
    category: 'restaurant',
    subcategory: 'food-truck',
    zone: 'torviscas',
    website: 'https://www.gfvictoria.com/en/bar-food-truck.html',
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Bar Food Truck dentro del Hotel GF Victoria, Costa Adeje.',
  },
  {
    business_name: 'Foodtruck Frida',
    category: 'restaurant',
    subcategory: 'food-truck',
    zone: 'adeje-pueblo',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Food truck con presencia en Instagram (@foodtruckfrida). Tenerife.',
  },

  // ============================================================
  // ADDITIONAL - from combined search results
  // ============================================================
  {
    business_name: 'Smugglers Bar Bistro',
    category: 'restaurant',
    subcategory: 'steakhouse',
    zone: 'playa-del-duque',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Steakhouse y bistro popular cerca de Playa del Duque. Destacado en Yelp y TripAdvisor.',
  },
  {
    business_name: 'Paquita Bello',
    category: 'restaurant',
    subcategory: 'international',
    zone: 'playa-del-duque',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Restaurante popular en la zona de Playa del Duque.',
  },
  {
    business_name: 'Il Bocconcino by Royal Hideaway',
    category: 'restaurant',
    subcategory: 'italian',
    zone: 'torviscas',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Royal Hideaway Corales. Recomendado Michelin. Cocina italiana de autor.',
  },
  {
    business_name: 'La Nonna Restaurante',
    category: 'restaurant',
    subcategory: 'italian',
    zone: 'playa-del-duque',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Restaurante italiano popular cerca de Playa del Duque.',
  },
  {
    business_name: 'The Castle Restaurant',
    category: 'restaurant',
    subcategory: 'international',
    zone: 'playa-del-duque',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Restaurante en la zona de Playa del Duque.',
  },
  {
    business_name: 'Padthaiwok Costa Adeje',
    category: 'restaurant',
    subcategory: 'thai',
    zone: 'san-eugenio',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Cadena de wok tailandes. Costa Adeje.',
  },
  {
    business_name: 'Asia House Costa Adeje',
    category: 'restaurant',
    subcategory: 'chinese',
    zone: 'torviscas',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Restaurante asiatico en Costa Adeje.',
  },
  {
    business_name: 'Noodle Box & Sushi',
    category: 'restaurant',
    subcategory: 'chinese',
    zone: 'fanabe',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Noodles, sushi y comida asiatica rapida en Costa Adeje.',
  },
  {
    business_name: 'La Charcuteria Costa Adeje',
    category: 'restaurant',
    subcategory: 'steakhouse',
    zone: 'san-eugenio',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Destacado como uno de los mejores steakhouses de Costa Adeje.',
  },
  {
    business_name: 'Steak21',
    category: 'restaurant',
    subcategory: 'steakhouse',
    zone: 'fanabe',
    website: 'https://steak21.com',
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: '21st Century Steak & Wine House. Costa Adeje.',
  },
]

async function main() {
  console.log('=== Scrape Adeje Restaurants: EXHAUSTIVE Web Search ===\n')
  console.log(`Total restaurants in script: ${restaurants.length}\n`)

  // 1. Fetch ALL existing restaurant leads to build a Set of names
  console.log('Fetching all existing restaurant leads from Supabase...')
  const { data: existing, error: fetchError } = await sb
    .from('leads')
    .select('business_name')
    .in('category', ['restaurant', 'restaurants'])

  if (fetchError) {
    console.log('Note: Could not check existing leads:', fetchError.message)
  }

  const existingNames = new Set(
    (existing || []).map((r) => r.business_name.toLowerCase().trim())
  )

  console.log(`Existing restaurant leads in DB: ${existingNames.size}`)
  console.log('')

  // 2. Filter out duplicates
  const newRestaurants = restaurants.filter(
    (r) => !existingNames.has(r.business_name.toLowerCase().trim())
  )

  const skipped = restaurants.length - newRestaurants.length
  if (skipped > 0) {
    console.log(`Skipping ${skipped} restaurants that already exist in DB:\n`)
    const skippedNames = restaurants
      .filter((r) => existingNames.has(r.business_name.toLowerCase().trim()))
      .map((r) => `  - ${r.business_name}`)
    console.log(skippedNames.join('\n'))
    console.log('')
  }

  if (newRestaurants.length === 0) {
    console.log('No new restaurants to insert. All already exist.')
    return
  }

  console.log(`Inserting ${newRestaurants.length} NEW restaurants...\n`)

  // 3. Insert in batches of 10
  const batchSize = 10
  let inserted = 0

  for (let i = 0; i < newRestaurants.length; i += batchSize) {
    const batch = newRestaurants.slice(i, i + batchSize)
    const batchNum = Math.floor(i / batchSize) + 1

    const { error } = await sb.from('leads').upsert(batch, {
      onConflict: 'business_name',
      ignoreDuplicates: true,
    })

    if (error) {
      console.log(`  Batch ${batchNum}: upsert failed (${error.message}), trying insert...`)
      const { error: insertError } = await sb.from('leads').insert(batch)
      if (insertError) {
        console.error(`  ERROR batch ${batchNum}:`, insertError.message)
      } else {
        inserted += batch.length
        console.log(`  Inserted batch ${batchNum}: ${batch.length} restaurants`)
      }
    } else {
      inserted += batch.length
      console.log(`  Upserted batch ${batchNum}: ${batch.length} restaurants`)
    }
  }

  console.log(`\nSuccessfully added ${inserted} new restaurant leads!\n`)

  // 4. Summary by subcategory
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

  // 5. Summary by zone
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

  // 6. Summary by priority
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

  // 7. Final total count
  const { count } = await sb
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .in('category', ['restaurant', 'restaurants'])

  console.log(`\nTotal restaurant leads in database now: ${count}`)
}

main().catch(console.error)
