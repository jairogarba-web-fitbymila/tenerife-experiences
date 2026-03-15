import { createClient } from '@supabase/supabase-js'

const sb = createClient(
  'https://sqesgghvaazyajzjkoap.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxZXNnZ2h2YWF6eWFqemprb2FwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzUxMzgwOSwiZXhwIjoyMDg5MDg5ODA5fQ.UvbRfWU9seJPT9lyCyLmpD4uZrP9jXzsNoeSAjT9HnI'
)

/**
 * Southern Tenerife restaurants - scraped from web searches:
 * 1. "restaurantes costa adeje tripadvisor 2025"
 * 2. "restaurantes playa de las americas mejores"
 * 3. "restaurantes los cristianos recomendados"
 * 4. "restaurantes la caleta adeje"
 * 5. "restaurantes el medano tenerife"
 * 6. "restaurantes los abrigos tenerife pescado"
 * 7. "restaurantes arona san miguel"
 * 8. "restaurantes golf costa adeje"
 * 9. "restaurantes indios tenerife"
 * 10. "restaurantes italianos costa adeje"
 * 11. "restaurantes japoneses sushi tenerife sur"
 * 12. "restaurantes mexicanos tenerife"
 * 13. "brunch tenerife sur"
 * 14. "restaurantes veganos tenerife"
 * 15. "pizzerias tenerife recomendadas"
 */

const restaurants = [
  // === COSTA ADEJE - INTERNATIONAL / SPANISH ===
  {
    business_name: 'Restaurante Jardín',
    category: 'restaurant',
    subcategory: 'international',
    zone: 'la-caleta',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Frente al Golf Costa Adeje. Cocina de autor que reimagina sabores tradicionales con ingredientes de temporada.',
  },
  {
    business_name: 'Troqué',
    category: 'restaurant',
    subcategory: 'international',
    zone: 'la-caleta',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Tradición culinaria española con visión contemporánea. Menú semanal con ingredientes frescos locales y regionales.',
  },
  {
    business_name: 'Salitre Restaurante',
    category: 'restaurant',
    subcategory: 'seafood',
    zone: 'la-caleta',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Especialidad en marisco e internacional. La Caleta, Adeje.',
  },

  // === PLAYA DE LAS AMÉRICAS ===
  {
    business_name: 'The Bank Steakhouse',
    category: 'restaurant',
    subcategory: 'international',
    zone: 'las-americas',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Steakhouse en el Golden Mile de Playa de las Américas. Abierto en 2023, muy popular.',
  },
  {
    business_name: 'Empire Modern British Restaurant',
    category: 'restaurant',
    subcategory: 'international',
    zone: 'las-americas',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Restaurante británico moderno galardonado. Steaks y cocina contemporánea.',
  },
  {
    business_name: 'Bianco Ristorante',
    category: 'restaurant',
    subcategory: 'italian',
    zone: 'las-americas',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Restaurante italiano ultra-chic en el corazón de Playa de las Américas.',
  },
  {
    business_name: 'La Terrazza del Mare',
    category: 'restaurant',
    subcategory: 'italian',
    zone: 'las-americas',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Cocina italiana-mediterránea frente a playa Troya. Vistas únicas.',
  },
  {
    business_name: 'Thai Botanico',
    category: 'restaurant',
    subcategory: 'international',
    zone: 'las-americas',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Cocina asiática contemporánea. Interior colorido y patio. Brunch popular.',
  },
  {
    business_name: 'Imperial Tai-Pan',
    category: 'restaurant',
    subcategory: 'japanese',
    zone: 'las-americas',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Japonés, chino, tailandés y sushi. Decoración moderna y oriental.',
  },
  {
    business_name: 'Mesón Castellano',
    category: 'restaurant',
    subcategory: 'canarian',
    zone: 'las-americas',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Cocina española tradicional. Bodega con más de 600 referencias de vino. Carnes excepcionales.',
  },
  {
    business_name: 'Tandoori Hut',
    category: 'restaurant',
    subcategory: 'indian',
    zone: 'las-americas',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Restaurante indio familiar. Muy recomendado por su comida increíble.',
  },
  {
    business_name: 'Bombay Blue',
    category: 'restaurant',
    subcategory: 'indian',
    zone: 'las-americas',
    website: 'https://bombaybluetenerife.com',
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'C.C. Safari, Playa de las Américas. Cocina india auténtica con hospitalidad india.',
  },
  {
    business_name: 'El Gomero',
    category: 'restaurant',
    subcategory: 'canarian',
    zone: 'las-americas',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Destacado en Yelp top 10 de Playa de las Américas. Cocina canaria.',
  },

  // === LOS CRISTIANOS ===
  {
    business_name: 'Piccolo',
    category: 'restaurant',
    subcategory: 'italian',
    zone: 'los-cristianos',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'El italiano más famoso de Los Cristianos. +15 años. San Telmo con vistas a la playa. Requiere reserva.',
  },
  {
    business_name: 'Oro di Napoli',
    category: 'restaurant',
    subcategory: 'pizza',
    zone: 'los-cristianos',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Pizzería napolitana reconocida Top 50 Pizza Europa (#36). Playa de Los Cristianos.',
  },
  {
    business_name: 'La Estancia',
    category: 'restaurant',
    subcategory: 'international',
    zone: 'los-cristianos',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'El restaurante más romántico de Los Cristianos. Cocina francesa moderna. Muy famoso en la isla.',
  },
  {
    business_name: 'El Rincón de Pancho',
    category: 'restaurant',
    subcategory: 'canarian',
    zone: 'los-cristianos',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Mejor combinación de gastronomía canaria y castellana. Ingredientes frescos, ambiente acogedor.',
  },
  {
    business_name: 'Restaurante Avangard',
    category: 'restaurant',
    subcategory: 'international',
    zone: 'los-cristianos',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Experiencia gastronómica de más categoría en Los Cristianos. Decoración minimalista, ambiente sofisticado.',
  },
  {
    business_name: 'Zoco Arabic New Concept',
    category: 'restaurant',
    subcategory: 'international',
    zone: 'los-cristianos',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Restaurante árabe con terraza en Los Cristianos. Concepto nuevo.',
  },
  {
    business_name: 'El Paso Restaurante Mexicano',
    category: 'restaurant',
    subcategory: 'mexican',
    zone: 'los-cristianos',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Decoración en colores mexicanos. Especialidad: pollo Guadalajara.',
  },
  {
    business_name: 'BBQ Spice',
    category: 'restaurant',
    subcategory: 'indian',
    zone: 'los-cristianos',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Restaurante indio con menú variado: curries, tandoori, opciones para todos los niveles de picor.',
  },
  {
    business_name: 'Bar Restaurante El Cine',
    category: 'restaurant',
    subcategory: 'seafood',
    zone: 'los-cristianos',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Junto al puerto de Los Cristianos. Vistas al mar. Pulpo, sardinas, sepia, merluza con papas arrugadas.',
  },
  {
    business_name: 'Pistacho Coffee Brunch',
    category: 'restaurant',
    subcategory: 'brunch',
    zone: 'los-cristianos',
    website: 'https://pistachocoffeebrunch.com',
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Brunch saludable y único. Acai bowls, tostadas variadas, zumos. Cerca de parada de bus Los Cristianos.',
  },
  {
    business_name: 'Palmera Coffee Brunch',
    category: 'restaurant',
    subcategory: 'brunch',
    zone: 'los-cristianos',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'En el corazón de Los Cristianos. Brunch delicioso y desayunos saludables. Ambiente relajado.',
  },
  {
    business_name: 'Pizzas y Pasta',
    category: 'restaurant',
    subcategory: 'pizza',
    zone: 'los-cristianos',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Harina orgánica y masa madre de larga fermentación. Horno de leña. Arona.',
  },

  // === EL MÉDANO ===
  {
    business_name: 'Brisas Del Médano',
    category: 'restaurant',
    subcategory: 'seafood',
    zone: 'el-medano',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Mariscos y cocina mediterránea. 4.6 estrellas con 841 reseñas.',
  },
  {
    business_name: 'Cofradía El Médano',
    category: 'restaurant',
    subcategory: 'seafood',
    zone: 'el-medano',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: '4.7 estrellas, 863 reseñas. Pescado fresco del día.',
  },
  {
    business_name: 'Restaurante Familiar',
    category: 'restaurant',
    subcategory: 'seafood',
    zone: 'el-medano',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Conocido por servir el mejor pescado de El Médano. Gestión familiar con Olivia al frente.',
  },
  {
    business_name: 'Restaurante El Timón',
    category: 'restaurant',
    subcategory: 'seafood',
    zone: 'el-medano',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Restaurante familiar. Tapas y paella. Marisco sencillo y delicioso.',
  },
  {
    business_name: 'Restaurante Caballo Blanco',
    category: 'restaurant',
    subcategory: 'international',
    zone: 'el-medano',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Entorno espectacular con una de las mejores vistas de El Médano sobre la bahía.',
  },
  {
    business_name: 'Vetusta Bar Tapas y Tragos',
    category: 'restaurant',
    subcategory: 'canarian',
    zone: 'el-medano',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Algunas de las mejores tapas de Tenerife. Delicias locales preparadas frescas.',
  },
  {
    business_name: 'Wairua Pizzeria',
    category: 'restaurant',
    subcategory: 'pizza',
    zone: 'el-medano',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'La pizzería más conocida y mejor valorada de El Médano. Pizzas, pastas, postres caseros.',
  },
  {
    business_name: 'El Med Veg',
    category: 'restaurant',
    subcategory: 'vegan',
    zone: 'el-medano',
    website: 'https://en.elmedveg.com',
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Vegano con muchas opciones sin gluten. Takeaway y delivery en El Médano.',
  },
  {
    business_name: 'Café Ubuntu',
    category: 'restaurant',
    subcategory: 'vegan',
    zone: 'el-medano',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Opciones veganas con muy buena ubicación en El Médano.',
  },
  {
    business_name: 'Veinte 04 Surf Café',
    category: 'restaurant',
    subcategory: 'brunch',
    zone: 'el-medano',
    website: 'https://veinte04.com',
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'El Médano. Vistas increíbles, ambiente relajado, decoración surfista. Brunch popular.',
  },
  {
    business_name: 'HITO 257',
    category: 'restaurant',
    subcategory: 'international',
    zone: 'el-medano',
    website: 'https://hito257restaurant.es',
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'La joya gastronómica de El Médano. Cocina de autor.',
  },

  // === LOS ABRIGOS ===
  {
    business_name: 'Arena Negra Restaurant',
    category: 'restaurant',
    subcategory: 'seafood',
    zone: 'los-abrigos',
    website: 'https://arena-negra-restaurant.com',
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Cocina española auténtica: marisco fresco, paellas tradicionales. Tres locales en paseo marítimo de Los Abrigos.',
  },
  {
    business_name: 'La Langostera',
    category: 'restaurant',
    subcategory: 'seafood',
    zone: 'los-abrigos',
    website: 'https://www.lalangostera.com',
    source: 'web-search',
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Fundado en 1970. Langostas vivas y ostras. Puerto de Los Abrigos. Referencia histórica.',
  },
  {
    business_name: 'El Mirador de Los Abrigos',
    category: 'restaurant',
    subcategory: 'seafood',
    zone: 'los-abrigos',
    website: 'https://restmiradordelosabrigos.com',
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Ubicación privilegiada con terraza espectacular y atardeceres maravillosos.',
  },
  {
    business_name: 'La Cocina Hindú',
    category: 'restaurant',
    subcategory: 'indian',
    zone: 'los-abrigos',
    website: 'https://lacocinahindu.com',
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Restaurante indio moderno en Los Abrigos. Tradición india fusionada con servicio rápido.',
  },

  // === COSTA ADEJE - ITALIAN ===
  {
    business_name: 'Cuore Italiano',
    category: 'restaurant',
    subcategory: 'italian',
    zone: 'costa-adeje',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: '4.7 estrellas. Restaurante italiano muy bien valorado en Costa Adeje.',
  },
  {
    business_name: 'Portofino Italian Restaurant',
    category: 'restaurant',
    subcategory: 'italian',
    zone: 'costa-adeje',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Italiano popular en Costa Adeje. Pizza y pasta artesanal.',
  },
  {
    business_name: 'Embassy Restaurant',
    category: 'restaurant',
    subcategory: 'italian',
    zone: 'costa-adeje',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Frente al C.C. San Eugenio. Carne y marisco de calidad, pizza y pasta casera.',
  },
  {
    business_name: "L'Incontro",
    category: 'restaurant',
    subcategory: 'italian',
    zone: 'costa-adeje',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Restaurante italiano popular en Costa Adeje.',
  },
  {
    business_name: 'Pizzería Carbone',
    category: 'restaurant',
    subcategory: 'pizza',
    zone: 'costa-adeje',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Pizzería napolitana auténtica en C.C. AquaMall. Masa altamente hidratada con sabor especial.',
  },
  {
    business_name: 'Selfie Pizza',
    category: 'restaurant',
    subcategory: 'pizza',
    zone: 'costa-adeje',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Municipio de Adeje, zona Barranco Las Torres. Alta calidad, servicio excepcional. Reservar con antelación.',
  },
  {
    business_name: 'Buenavida Vegan',
    category: 'restaurant',
    subcategory: 'vegan',
    zone: 'costa-adeje',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Vegano en Costa Adeje. Caprese vegana, lasaña, paella con heura, tiramisú vegano.',
  },
  {
    business_name: 'Tierra Café',
    category: 'restaurant',
    subcategory: 'vegan',
    zone: 'costa-adeje',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Puerto Colón. Opciones veganas y dulces deliciosos.',
  },

  // === COSTA ADEJE - JAPANESE / SUSHI ===
  {
    business_name: 'Saikou Tenerife',
    category: 'restaurant',
    subcategory: 'japanese',
    zone: 'costa-adeje',
    website: 'https://saikoutenerife.com',
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Fusión japonés-peruano (nikkei). Adeje.',
  },
  {
    business_name: 'Aiko Sushi',
    category: 'restaurant',
    subcategory: 'japanese',
    zone: 'costa-adeje',
    website: 'https://aikosushi.es',
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Degustación de mil tipos de sushi. Acogedor restaurante japonés.',
  },

  // === COSTA ADEJE - MEXICAN ===
  {
    business_name: 'Miranda MX',
    category: 'restaurant',
    subcategory: 'mexican',
    zone: 'costa-adeje',
    website: 'https://mirandamx.com',
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'C.C. The Duke Shops, Costa Adeje. Auténtico mexicano con ingredientes frescos de alta calidad.',
  },
  {
    business_name: 'El Rincón de Guadalupe',
    category: 'restaurant',
    subcategory: 'mexican',
    zone: 'costa-adeje',
    website: 'https://elrincondeguadalupe.com',
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Chef Víctor Manuel. Sabores tradicionales, recetas heredadas. Auténtico viaje gastronómico mexicano.',
  },
  {
    business_name: 'Hacienda Miranda',
    category: 'restaurant',
    subcategory: 'mexican',
    zone: 'arona',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Restaurante mexicano popular en Arona. Buenas reseñas en TripAdvisor.',
  },

  // === LA CALETA - BRUNCH ===
  {
    business_name: 'Bloom Bar & Brunch',
    category: 'restaurant',
    subcategory: 'brunch',
    zone: 'la-caleta',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Brunch diario 11h-16:30h desde 14€/persona. Huevos poché con salmón ahumado, pancakes de Nutella.',
  },
  {
    business_name: '88 La Caleta',
    category: 'restaurant',
    subcategory: 'brunch',
    zone: 'la-caleta',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Brunch con opciones de sushi. La Caleta.',
  },

  // === ARONA ===
  {
    business_name: 'Mr Singh Indian Restaurant',
    category: 'restaurant',
    subcategory: 'indian',
    zone: 'los-cristianos',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Los Cristianos - Las Américas. Cocina india auténtica. Sizzlers y kebabs tandoor.',
  },
  {
    business_name: 'Delhi Darbar',
    category: 'restaurant',
    subcategory: 'indian',
    zone: 'las-americas',
    website: 'https://www.delhidarbar.es',
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Los mejores platos de la India. Biryani, Butter Chicken, Tikka Masala, Tandoori, Naan.',
  },

  // === MORE ITALIAN / INTERNATIONAL ===
  {
    business_name: "L'italiano Trattoria",
    category: 'restaurant',
    subcategory: 'italian',
    zone: 'las-americas',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Destacado en Yelp top 10 Playa de las Américas. Trattoria italiana.',
  },
  {
    business_name: 'Mamma Mia',
    category: 'restaurant',
    subcategory: 'italian',
    zone: 'las-americas',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Destacado en Yelp top 10 Playa de las Américas. Italiano popular.',
  },
  {
    business_name: 'Samelo Restaurante Vegano',
    category: 'restaurant',
    subcategory: 'vegan',
    zone: 'arona',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Abades. Opciones sin gluten. Queso propio de anacardos. Buen servicio.',
  },
  {
    business_name: 'The Willows',
    category: 'restaurant',
    subcategory: 'international',
    zone: 'las-americas',
    website: null,
    source: 'web-search',
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Destacado en Yelp top 10 Playa de las Américas 2026.',
  },
]

async function main() {
  console.log('=== Scrape Restaurants South: Web Search Results ===\n')
  console.log(`Total restaurants in script: ${restaurants.length}\n`)

  // 1. Fetch all existing restaurant leads
  const { data: existing, error: fetchError } = await sb
    .from('leads')
    .select('business_name')
    .in('category', ['restaurant', 'restaurants'])

  if (fetchError) {
    console.log('Note: Could not check existing leads:', fetchError.message)
  }

  const existingNames = new Set(
    (existing || []).map((r) => r.business_name.toLowerCase())
  )

  console.log(`Existing restaurant leads in DB: ${existingNames.size}`)
  console.log('')

  // 2. Filter out duplicates
  const newRestaurants = restaurants.filter(
    (r) => !existingNames.has(r.business_name.toLowerCase())
  )

  const skipped = restaurants.length - newRestaurants.length
  if (skipped > 0) {
    console.log(`Skipping ${skipped} restaurants that already exist in DB.\n`)
    const skippedNames = restaurants
      .filter((r) => existingNames.has(r.business_name.toLowerCase()))
      .map((r) => r.business_name)
    console.log('Skipped:', skippedNames.join(', '))
    console.log('')
  }

  if (newRestaurants.length === 0) {
    console.log('No new restaurants to insert. All already exist.')
    return
  }

  console.log(`Inserting ${newRestaurants.length} NEW restaurants...\n`)

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

  console.log(`\n✅ Successfully added ${inserted} new restaurant leads!\n`)

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
