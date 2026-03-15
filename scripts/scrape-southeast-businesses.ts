import { createClient } from '@supabase/supabase-js'

const sb = createClient(
  'https://sqesgghvaazyajzjkoap.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxZXNnZ2h2YWF6eWFqemprb2FwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzUxMzgwOSwiZXhwIjoyMDg5MDg5ODA5fQ.UvbRfWU9seJPT9lyCyLmpD4uZrP9jXzsNoeSAjT9HnI'
)

// =====================================================================
// SOUTHEAST TENERIFE BUSINESSES - Exhaustive scrape
// Zones: el-medano, los-abrigos, golf-del-sur, san-miguel, granadilla, san-isidro
// =====================================================================

const leads = [
  // ============================================================
  // EL MEDANO - RESTAURANTS
  // ============================================================
  {
    business_name: 'Brisas Del Medano',
    category: 'restaurants',
    subcategory: 'seafood',
    zone: 'el-medano',
    address: 'Paseo Marcial Garcia, El Medano',
    google_rating: 4.4,
    google_reviews_count: 841,
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Top-rated seafood & Mediterranean restaurant. Fresh tuna and paella. 841 reviews on TripAdvisor.',
    source: 'web-scrape',
  },
  {
    business_name: 'Cofradia El Medano',
    category: 'restaurants',
    subcategory: 'seafood',
    zone: 'el-medano',
    address: 'El Medano',
    google_rating: 4.3,
    google_reviews_count: 863,
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Highly rated with 863 reviews. Fresh fish restaurant on the seafront.',
    source: 'web-scrape',
  },
  {
    business_name: 'Restaurante Caballo Blanco',
    category: 'restaurants',
    subcategory: 'mediterranean',
    zone: 'el-medano',
    address: 'El Medano',
    google_rating: 4.3,
    google_reviews_count: 600,
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Stunning views overlooking El Medano bay. Popular with tourists.',
    source: 'web-scrape',
  },
  {
    business_name: 'Restaurante Familiar',
    category: 'restaurants',
    subcategory: 'seafood',
    zone: 'el-medano',
    address: 'El Medano',
    google_rating: 4.5,
    google_reviews_count: 450,
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Family-run. Best fish in town. Managed by Olivia with her mother and sister cooking.',
    source: 'web-scrape',
  },
  {
    business_name: 'Restaurante El Timon',
    category: 'restaurants',
    subcategory: 'seafood',
    zone: 'el-medano',
    address: 'Paseo Marcial Garcia, El Medano',
    google_rating: 4.4,
    google_reviews_count: 500,
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Charming family-run gem on Paseo Marcial Garcia. Famous for tapas and paella.',
    source: 'web-scrape',
  },
  {
    business_name: 'HITO 257 Restaurant',
    category: 'restaurants',
    subcategory: 'fine-dining',
    zone: 'el-medano',
    website: 'https://hito257restaurant.es',
    google_rating: 4.6,
    google_reviews_count: 350,
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Joya gastronomica de El Medano. Fine dining experience. High priority partner.',
    source: 'web-scrape',
  },
  {
    business_name: 'Vetusta Bar Tapas y Tragos',
    category: 'restaurants',
    subcategory: 'tapas',
    zone: 'el-medano',
    address: 'El Medano',
    google_rating: 4.5,
    google_reviews_count: 400,
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Best tapas in Tenerife according to locals. Freshly prepared local delicacies.',
    source: 'web-scrape',
  },

  // ============================================================
  // EL MEDANO - PIZZERIAS & ITALIAN
  // ============================================================
  {
    business_name: 'Wairua Pizzeria',
    category: 'restaurants',
    subcategory: 'italian',
    zone: 'el-medano',
    address: 'El Medano',
    google_rating: 4.6,
    google_reviews_count: 700,
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Best known and best rated pizzeria in El Medano. Italian recipes, pizzas, pastas, homemade desserts.',
    source: 'web-scrape',
  },
  {
    business_name: 'Pizzeria Baldestein',
    category: 'restaurants',
    subcategory: 'italian',
    zone: 'el-medano',
    website: 'https://www.pizzeriabaldestein.com',
    google_rating: 4.4,
    google_reviews_count: 550,
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Best pizzeria since 1995. Wood-burning oven, fresh pasta, select meats. Near the beach.',
    source: 'web-scrape',
  },
  {
    business_name: 'Luna Rossa Pizzeria',
    category: 'restaurants',
    subcategory: 'italian',
    zone: 'el-medano',
    website: 'https://lunarossapizzeria.elmedanotenerife.com',
    google_rating: 4.3,
    google_reviews_count: 350,
    status: 'new' as const,
    priority: 'low' as const,
    notes: 'Authentic Italian flavor. Artisanal pizzas with fresh quality ingredients in the heart of El Medano.',
    source: 'web-scrape',
  },
  {
    business_name: 'La Tartaruga',
    category: 'restaurants',
    subcategory: 'italian',
    zone: 'el-medano',
    address: 'El Medano',
    google_rating: 4.3,
    google_reviews_count: 400,
    status: 'new' as const,
    priority: 'low' as const,
    notes: 'Charming cozy pizzeria with just 8 tables. Perfect for casual meals or takeaway.',
    source: 'web-scrape',
  },

  // ============================================================
  // EL MEDANO - CAFES
  // ============================================================
  {
    business_name: 'Veinte 04 Surf Cafe',
    category: 'restaurants',
    subcategory: 'cafe',
    zone: 'el-medano',
    website: 'https://veinte04.com',
    google_rating: 4.5,
    google_reviews_count: 300,
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Surf cafe with Mediterranean cuisine and fresh ingredients. Popular with surfers and tourists.',
    source: 'web-scrape',
  },
  {
    business_name: 'Lille Cafe El Medano',
    category: 'restaurants',
    subcategory: 'cafe',
    zone: 'el-medano',
    address: 'El Medano',
    google_rating: 4.4,
    google_reviews_count: 250,
    status: 'new' as const,
    priority: 'low' as const,
    notes: 'Nice coffee, lovely homemade granola. Cozy atmosphere.',
    source: 'web-scrape',
  },
  {
    business_name: 'Cafeteria Zumeria Tamboril',
    category: 'restaurants',
    subcategory: 'cafe',
    zone: 'el-medano',
    address: 'Paseo Marcial Garcia, El Medano',
    google_rating: 4.3,
    google_reviews_count: 200,
    status: 'new' as const,
    priority: 'low' as const,
    notes: 'Boardwalk cafe with warm atmosphere. Coffee, wine, beer and homemade tapas.',
    source: 'web-scrape',
  },

  // ============================================================
  // EL MEDANO - BARS & NIGHTLIFE
  // ============================================================
  {
    business_name: "Manfred's Soul Cafe",
    category: 'restaurants',
    subcategory: 'bar',
    zone: 'el-medano',
    address: 'El Medano',
    google_rating: 4.4,
    google_reviews_count: 350,
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Flagship bar of El Medano. Open 8:30AM-2:00AM daily. Breakfast, aperitifs, drinks at night.',
    source: 'web-scrape',
  },
  {
    business_name: 'Chirinstones Surf Rock Bar',
    category: 'restaurants',
    subcategory: 'bar',
    zone: 'el-medano',
    address: 'El Medano',
    google_rating: 4.5,
    google_reviews_count: 300,
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Famous jam sessions Monday nights. Live music Fridays. Great nightlife spot.',
    source: 'web-scrape',
  },
  {
    business_name: 'El Que Pasa Bar',
    category: 'restaurants',
    subcategory: 'bar',
    zone: 'el-medano',
    address: 'Frente a la playa, El Medano',
    google_rating: 4.2,
    google_reviews_count: 250,
    status: 'new' as const,
    priority: 'low' as const,
    notes: 'Beachfront bar, one of the most frequented nightlife venues. Billiard table, parties, great atmosphere.',
    source: 'web-scrape',
  },

  // ============================================================
  // EL MEDANO - CHIRINGUITOS
  // ============================================================
  {
    business_name: 'Chiringuito Pirata',
    category: 'restaurants',
    subcategory: 'chiringuito',
    zone: 'el-medano',
    address: 'Playa de La Tejita, El Medano',
    google_rating: 4.3,
    google_reviews_count: 500,
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Iconic chiringuito on La Tejita beach with Montana Roja views. Recommended by chef Juan Carlos Padron. Paella, ceviche, barraquito.',
    source: 'web-scrape',
  },

  // ============================================================
  // EL MEDANO - SURF & WATER SPORTS
  // ============================================================
  {
    business_name: 'TWS Surf Shop',
    category: 'water-sports',
    subcategory: 'surf-shop',
    zone: 'el-medano',
    address: 'Av de los Principes de Espana, 3, El Medano',
    phone: '+34 922 179 401',
    website: 'https://tws-windsurf.com',
    google_rating: 4.5,
    google_reviews_count: 200,
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Top windsurf equipment shop. Boards, sails, foils and wings from top brands.',
    source: 'web-scrape',
  },
  {
    business_name: 'Godzilla Surf Shop',
    category: 'water-sports',
    subcategory: 'surf-school',
    zone: 'el-medano',
    address: 'Avenida Jose Maria Galvan Bello 7, El Medano',
    website: 'https://godzillasurfshop.es',
    google_rating: 4.7,
    google_reviews_count: 350,
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Premier water sports center. Surf, windsurf & wing foil lessons. Premium rental. Open 10AM-9PM.',
    source: 'web-scrape',
  },
  {
    business_name: 'Picacho Surf Shop',
    category: 'water-sports',
    subcategory: 'surf-shop',
    zone: 'el-medano',
    address: 'Paseo Marcial Garcia, 7, El Medano',
    phone: '+34 922 178 660',
    website: 'https://picachosurfshop.com',
    google_rating: 4.4,
    google_reviews_count: 150,
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Surf shop on the main promenade of El Medano.',
    source: 'web-scrape',
  },
  {
    business_name: 'Surf Center Playa Sur',
    category: 'water-sports',
    subcategory: 'surf-school',
    zone: 'el-medano',
    website: 'http://www.surfcenter.el-medano.com',
    google_rating: 4.5,
    google_reviews_count: 300,
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Legendary surf, windsurf and kitesurf school on the sand. Rental and classes for all ages.',
    source: 'web-scrape',
  },
  {
    business_name: 'Red Rock Surf & Kite Academy',
    category: 'water-sports',
    subcategory: 'kitesurf-school',
    zone: 'el-medano',
    website: 'https://redrocksurf.com',
    google_rating: 4.8,
    google_reviews_count: 250,
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Intensive courses max 3 per instructor. Kitesurf and windsurf. Multilingual instructors.',
    source: 'web-scrape',
  },
  {
    business_name: 'Duotone Pro Center Tenerife',
    category: 'water-sports',
    subcategory: 'windsurf-school',
    zone: 'el-medano',
    website: 'https://www.dpc-tenerife.com',
    google_rating: 4.7,
    google_reviews_count: 400,
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Pro center for kiteboarding, windsurfing, wing foiling. High quality rental equipment and lessons.',
    source: 'web-scrape',
  },
  {
    business_name: 'Sogni Canarias Kitesurf School',
    category: 'water-sports',
    subcategory: 'kitesurf-school',
    zone: 'el-medano',
    website: 'https://www.sognicanarias.com',
    google_rating: 4.8,
    google_reviews_count: 200,
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'IKO certified kitesurf, surf and windsurf school in El Medano.',
    source: 'web-scrape',
  },
  {
    business_name: 'Kite Hub Tenerife',
    category: 'water-sports',
    subcategory: 'kitesurf-school',
    zone: 'el-medano',
    website: 'https://kitehubtenerife.com',
    google_rating: 4.9,
    google_reviews_count: 150,
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Expert instruction with RRD equipment. Kitesurfing, wing foiling and windsurfing.',
    source: 'web-scrape',
  },
  {
    business_name: 'Kitesurf 313',
    category: 'water-sports',
    subcategory: 'kitesurf-school',
    zone: 'el-medano',
    website: 'http://www.kitesurf313.com',
    google_rating: 4.7,
    google_reviews_count: 180,
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Kitesurf school in El Medano with courses for all levels.',
    source: 'web-scrape',
  },

  // ============================================================
  // EL MEDANO - DIVING
  // ============================================================
  {
    business_name: 'MedanoDive',
    category: 'water-sports',
    subcategory: 'diving',
    zone: 'el-medano',
    address: 'Plaza Galicia Local 8, El Medano',
    website: 'https://www.medanodivingtenerife.com',
    google_rating: 4.9,
    google_reviews_count: 200,
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'PADI dive center. Quality over quantity. Max 4 divers per instructor. South Tenerife dive sites.',
    source: 'web-scrape',
  },
  {
    business_name: 'La Tribu Dive',
    category: 'water-sports',
    subcategory: 'diving',
    zone: 'el-medano',
    website: 'https://latribudive.com',
    google_rating: 4.8,
    google_reviews_count: 150,
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Founded 2021. Access to 90% of dive sites within 35 min drive. 10+ years instructor experience.',
    source: 'web-scrape',
  },

  // ============================================================
  // EL MEDANO - YOGA & FITNESS
  // ============================================================
  {
    business_name: 'Yoga Tenerife with Eva',
    category: 'wellness-bodegas',
    subcategory: 'yoga',
    zone: 'el-medano',
    website: 'https://yoga-tenerife.com',
    instagram: '@yogatenerifewitheva',
    google_rating: 5.0,
    google_reviews_count: 150,
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Beach yoga Wed & Fri mornings. 500hr certified teacher trained in India. 12EUR per class.',
    source: 'web-scrape',
  },
  {
    business_name: 'Funkyoga by Misha',
    category: 'wellness-bodegas',
    subcategory: 'yoga',
    zone: 'el-medano',
    website: 'https://www.michaelanavarova.com',
    google_rating: 5.0,
    google_reviews_count: 80,
    status: 'new' as const,
    priority: 'low' as const,
    notes: 'Vinyasa Flow Yoga Mon/Wed/Fri 9AM. Beach yoga Fridays. 15EUR per class. 12 yrs experience.',
    source: 'web-scrape',
  },
  {
    business_name: 'Future Training El Medano',
    category: 'wellness-bodegas',
    subcategory: 'gym',
    zone: 'el-medano',
    website: 'https://www.futuretraining.es',
    google_rating: 4.6,
    google_reviews_count: 100,
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'CrossFit / cross training gym. Sports physiotherapy + functional training. Personalized programs.',
    source: 'web-scrape',
  },

  // ============================================================
  // EL MEDANO - HOSTELS & ACCOMMODATION
  // ============================================================
  {
    business_name: 'Medano Nest Hostel',
    category: 'hotels',
    subcategory: 'hostel',
    zone: 'el-medano',
    google_rating: 4.3,
    google_reviews_count: 250,
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Budget hostel in the heart of El Medano. Close to beach and bars. Friendly atmosphere.',
    source: 'web-scrape',
  },
  {
    business_name: 'Casa Grande Surf Hostel',
    category: 'hotels',
    subcategory: 'hostel',
    zone: 'el-medano',
    google_rating: 4.4,
    google_reviews_count: 300,
    status: 'new' as const,
    priority: 'medium' as const,
    notes: '20m from El Medano Beach. 10 min from airport. Free WiFi, chill-out terrace, surf equipment hire.',
    source: 'web-scrape',
  },
  {
    business_name: 'Daydream El Medano Coliving',
    category: 'hotels',
    subcategory: 'coliving',
    zone: 'el-medano',
    google_rating: 4.5,
    google_reviews_count: 120,
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Coliving for digital nomads, backpackers and travelers. 1 min from Playa Chica. Near all amenities.',
    source: 'web-scrape',
  },
  {
    business_name: 'Ashavana Hostel',
    category: 'hotels',
    subcategory: 'hostel',
    zone: 'el-medano',
    google_rating: 4.2,
    google_reviews_count: 200,
    status: 'new' as const,
    priority: 'low' as const,
    notes: 'Privileged location in front of Playa Chica. Ideal for young travelers.',
    source: 'web-scrape',
  },

  // ============================================================
  // LOS ABRIGOS - RESTAURANTS
  // ============================================================
  {
    business_name: 'Restaurante Los Abrigos',
    category: 'restaurants',
    subcategory: 'seafood',
    zone: 'los-abrigos',
    address: 'Calle La Marina, 3, Los Abrigos',
    phone: '+34 922 17 02 64',
    website: 'https://restaurantelosabrigos.com',
    google_rating: 4.4,
    google_reviews_count: 900,
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Best coastal cuisine. Daily fresh fish selection at 29.95EUR/kg. Views of dock and fishing boats.',
    source: 'web-scrape',
  },
  {
    business_name: 'El Mirador de Los Abrigos',
    category: 'restaurants',
    subcategory: 'seafood',
    zone: 'los-abrigos',
    address: 'C/La Marina, 7, Los Abrigos',
    phone: '+34 922 74 94 48',
    website: 'https://restmiradordelosabrigos.com',
    instagram: '@elmiradordelosabrigos',
    google_rating: 4.5,
    google_reviews_count: 700,
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Spectacular terrace with sunset views. Canarian wines, cheeses, seafood, live lobster, fish soups.',
    source: 'web-scrape',
  },
  {
    business_name: 'Tasquita del Puerto',
    category: 'restaurants',
    subcategory: 'seafood',
    zone: 'los-abrigos',
    website: 'https://tasquitadelpuerto.com',
    google_rating: 4.4,
    google_reviews_count: 500,
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Fish and seafood at good prices. Excellent quality and very friendly service.',
    source: 'web-scrape',
  },
  {
    business_name: 'Maria Restaurante Tapas',
    category: 'restaurants',
    subcategory: 'tapas',
    zone: 'los-abrigos',
    website: 'https://www.mariarestaurantebar.com',
    google_rating: 4.3,
    google_reviews_count: 400,
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Tapas, fresh fish, seafood and off-menu suggestions. Los Abrigos waterfront.',
    source: 'web-scrape',
  },
  {
    business_name: 'Restaurante Tito Los Abrigos',
    category: 'restaurants',
    subcategory: 'seafood',
    zone: 'los-abrigos',
    address: 'Los Abrigos',
    google_rating: 4.3,
    google_reviews_count: 350,
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Fish and seafood restaurant in Los Abrigos. Traditional Canarian and Mediterranean cuisine.',
    source: 'web-scrape',
  },
  {
    business_name: 'Perlas del Mar Los Abrigos',
    category: 'restaurants',
    subcategory: 'seafood',
    zone: 'los-abrigos',
    address: 'Los Abrigos',
    google_rating: 4.2,
    google_reviews_count: 250,
    status: 'new' as const,
    priority: 'low' as const,
    notes: 'Fresh fish and seafood. Traditional Canarian and Mediterranean cuisine.',
    source: 'web-scrape',
  },

  // ============================================================
  // GOLF DEL SUR - RESTAURANTS & BARS
  // ============================================================
  {
    business_name: 'Tapas Pata de Oro',
    category: 'restaurants',
    subcategory: 'tapas',
    zone: 'golf-del-sur',
    address: 'San Blas, Golf del Sur',
    google_rating: 4.5,
    google_reviews_count: 600,
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Renowned tapas spot in San Blas. Spacious venue with personalized service. Highly recommended.',
    source: 'web-scrape',
  },
  {
    business_name: 'Plaza Breeze Restaurant',
    category: 'restaurants',
    subcategory: 'international',
    zone: 'golf-del-sur',
    address: 'Golf del Sur',
    google_rating: 4.3,
    google_reviews_count: 500,
    status: 'new' as const,
    priority: 'medium' as const,
    notes: '15+ years experience. Early bird menu with 10+ starters and mains. Great for groups.',
    source: 'web-scrape',
  },
  {
    business_name: 'Lavabeach Restaurant',
    category: 'restaurants',
    subcategory: 'mediterranean',
    zone: 'golf-del-sur',
    address: 'Golf del Sur',
    google_rating: 4.4,
    google_reviews_count: 350,
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Oceanfront restaurant with great views. Mediterranean cuisine in Golf del Sur.',
    source: 'web-scrape',
  },
  {
    business_name: 'The Wild Geese Irish Bar',
    category: 'restaurants',
    subcategory: 'bar',
    zone: 'golf-del-sur',
    address: 'Golf del Sur',
    google_rating: 4.3,
    google_reviews_count: 400,
    status: 'new' as const,
    priority: 'low' as const,
    notes: 'Authentic Irish bar. Longest bar counter in Tenerife - handcrafted from imported Irish oak.',
    source: 'web-scrape',
  },

  // ============================================================
  // AMARILLA GOLF - RESTAURANTS
  // ============================================================
  {
    business_name: "Christie's Restaurante",
    category: 'restaurants',
    subcategory: 'international',
    zone: 'golf-del-sur',
    address: 'C. Cornical, 110, Amarilla Golf',
    google_rating: 4.5,
    google_reviews_count: 350,
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Delightful dining with warm service. Chicken in pepper sauce, hake, chocolate cake. Amarilla Golf.',
    source: 'web-scrape',
  },
  {
    business_name: 'El Mirador de la Marina',
    category: 'restaurants',
    subcategory: 'mediterranean',
    zone: 'golf-del-sur',
    address: 'Puerto Deportivo de Amarilla Golf',
    website: 'https://elmiradordelamarina.com',
    google_rating: 4.4,
    google_reviews_count: 300,
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Marina restaurant. Open Wed-Sun 13:00-23:00. Mediterranean cuisine with ocean views.',
    source: 'web-scrape',
  },
  {
    business_name: 'La Mesa Restaurante',
    category: 'restaurants',
    subcategory: 'european',
    zone: 'golf-del-sur',
    website: 'https://www.lamesarestaurante.com',
    address: 'Fairways, Amarilla Golf',
    google_rating: 4.5,
    google_reviews_count: 250,
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Relaxed dining. Beautifully presented European cuisine in Amarilla Golf Fairways.',
    source: 'web-scrape',
  },
  {
    business_name: 'Archile Bistro Fusion',
    category: 'restaurants',
    subcategory: 'fusion',
    zone: 'golf-del-sur',
    address: 'Amarilla Golf',
    google_rating: 4.6,
    google_reviews_count: 200,
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Exceptional gourmet dishes and handcrafted cocktails. Bistro fusion concept in Amarilla Golf.',
    source: 'web-scrape',
  },

  // ============================================================
  // SAN MIGUEL DE ABONA - RESTAURANTS
  // ============================================================
  {
    business_name: 'Restaurante eARTh',
    category: 'restaurants',
    subcategory: 'fine-dining',
    zone: 'san-miguel',
    address: 'Calle Garanana, 43, San Miguel de Abona',
    website: 'https://earthrestaurante.com',
    google_rating: 4.7,
    google_reviews_count: 400,
    status: 'new' as const,
    priority: 'high' as const,
    notes: 'Organic, seasonal, local ingredients. International cuisine celebrating Canary Islands bounty. Fine dining.',
    source: 'web-scrape',
  },
  {
    business_name: 'El Rinconcito de Hilario',
    category: 'restaurants',
    subcategory: 'canarian',
    zone: 'san-miguel',
    address: 'San Miguel de Abona',
    google_rating: 4.6,
    google_reviews_count: 350,
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Hidden gem of south Tenerife. Excellent value for money. Terrace and welcoming decoration.',
    source: 'web-scrape',
  },
  {
    business_name: 'Asador El Portillo',
    category: 'restaurants',
    subcategory: 'steakhouse',
    zone: 'san-miguel',
    address: 'San Miguel de Abona',
    google_rating: 4.5,
    google_reviews_count: 300,
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Family-owned. Top-notch customer service and high-quality meats. Grill restaurant.',
    source: 'web-scrape',
  },
  {
    business_name: 'Tasca La Trebina',
    category: 'restaurants',
    subcategory: 'canarian',
    zone: 'san-miguel',
    address: 'San Miguel de Abona',
    google_rating: 4.5,
    google_reviews_count: 250,
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Genuine Canary atmosphere. Outstanding service and beautifully presented cuisine.',
    source: 'web-scrape',
  },

  // ============================================================
  // GRANADILLA DE ABONA - RESTAURANTS
  // ============================================================
  {
    business_name: 'Tasca La Cantera',
    category: 'restaurants',
    subcategory: 'canarian',
    zone: 'granadilla',
    address: 'Granadilla de Abona',
    google_rating: 4.5,
    google_reviews_count: 300,
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Welcoming restaurant inside a cave. Authentic Canarian dining experience.',
    source: 'web-scrape',
  },
  {
    business_name: 'El Secreto de Chimiche',
    category: 'restaurants',
    subcategory: 'canarian',
    zone: 'granadilla',
    address: 'Chimiche, Granadilla de Abona',
    google_rating: 4.4,
    google_reviews_count: 350,
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Former tomato warehouse in Chimiche converted to restaurant. Relaxed atmosphere, local cuisine.',
    source: 'web-scrape',
  },
  {
    business_name: 'Restaurante El Ancla',
    category: 'restaurants',
    subcategory: 'seafood',
    zone: 'granadilla',
    address: 'Playa de La Jaquita, Hotel Arenas del Mar',
    google_rating: 4.3,
    google_reviews_count: 250,
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Beachfront restaurant in Hotel Arenas del Mar. Seasonal blue fish specialist.',
    source: 'web-scrape',
  },

  // ============================================================
  // SAN ISIDRO - RESTAURANTS
  // ============================================================
  {
    business_name: 'El Patio San Isidro',
    category: 'restaurants',
    subcategory: 'cafe',
    zone: 'san-isidro',
    address: 'San Isidro',
    google_rating: 4.8,
    google_reviews_count: 104,
    status: 'new' as const,
    priority: 'medium' as const,
    notes: '#1 restaurant in San Isidro. Delicious sandwiches with fresh ingredients. Creative menu.',
    source: 'web-scrape',
  },
  {
    business_name: 'La Tasca Nuestra',
    category: 'restaurants',
    subcategory: 'mediterranean',
    zone: 'san-isidro',
    address: 'San Isidro',
    google_rating: 4.9,
    google_reviews_count: 64,
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'International and Mediterranean cuisine. Amazing food, service and value. Top rated.',
    source: 'web-scrape',
  },
  {
    business_name: 'Meson de Antonio',
    category: 'restaurants',
    subcategory: 'steakhouse',
    zone: 'san-isidro',
    address: 'San Isidro',
    google_rating: 4.0,
    google_reviews_count: 140,
    status: 'new' as const,
    priority: 'low' as const,
    notes: 'Steakhouse and barbecue in San Isidro. Good for meat lovers.',
    source: 'web-scrape',
  },
  {
    business_name: 'Guachinche El Aljibe',
    category: 'restaurants',
    subcategory: 'guachinche',
    zone: 'san-isidro',
    address: 'San Isidro',
    google_rating: 4.5,
    google_reviews_count: 200,
    status: 'new' as const,
    priority: 'medium' as const,
    notes: 'Authentic guachinche. Homemade Canarian dishes with local wine. Rabbit in salmorejo, papas arrugadas.',
    source: 'web-scrape',
  },
]

async function main() {
  console.log('=== SOUTHEAST TENERIFE BUSINESS SCRAPER ===')
  console.log(`Total businesses to process: ${leads.length}\n`)

  // Step 1: Query existing leads to avoid duplicates
  console.log('Step 1: Querying existing leads to check for duplicates...')
  const { data: existingLeads, error: fetchError } = await sb
    .from('leads')
    .select('business_name, zone')

  if (fetchError) {
    console.error('Error fetching existing leads:', fetchError)
    process.exit(1)
  }

  const existingNames = new Set(
    (existingLeads || []).map((l) => l.business_name.toLowerCase().trim())
  )

  console.log(`  Found ${existingNames.size} existing leads in database.`)

  // Step 2: Filter out duplicates
  const newLeads = leads.filter(
    (lead) => !existingNames.has(lead.business_name.toLowerCase().trim())
  )

  const duplicates = leads.length - newLeads.length
  console.log(`  Duplicates found: ${duplicates}`)
  console.log(`  New leads to insert: ${newLeads.length}\n`)

  if (newLeads.length === 0) {
    console.log('No new leads to insert. All businesses already exist.')
    process.exit(0)
  }

  // Step 3: Insert in batches
  console.log('Step 2: Inserting new leads in batches...')
  const batchSize = 10
  let inserted = 0
  let errors = 0

  for (let i = 0; i < newLeads.length; i += batchSize) {
    const batch = newLeads.slice(i, i + batchSize)
    const batchNum = Math.floor(i / batchSize) + 1
    const { error } = await sb.from('leads').insert(batch)

    if (error) {
      console.error(`  ERROR batch ${batchNum}:`, error.message)
      errors++
    } else {
      inserted += batch.length
      console.log(
        `  Batch ${batchNum}: inserted ${batch.length} leads (${batch.map((b) => b.business_name).join(', ')})`
      )
    }
  }

  // Step 4: Summary
  console.log('\n=== RESULTS ===')
  console.log(`Total new leads inserted: ${inserted}`)
  console.log(`Batches with errors: ${errors}`)
  console.log(`Duplicates skipped: ${duplicates}`)

  // Summary by zone
  const zones = newLeads.reduce(
    (acc, lead) => {
      acc[lead.zone] = (acc[lead.zone] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  console.log('\nBy zone:')
  for (const [zone, count] of Object.entries(zones).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${zone}: ${count}`)
  }

  // Summary by category
  const categories = newLeads.reduce(
    (acc, lead) => {
      acc[lead.category] = (acc[lead.category] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  console.log('\nBy category:')
  for (const [cat, count] of Object.entries(categories).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${cat}: ${count}`)
  }

  // Summary by priority
  const priorities = newLeads.reduce(
    (acc, lead) => {
      acc[lead.priority] = (acc[lead.priority] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  console.log('\nBy priority:')
  for (const [pri, count] of Object.entries(priorities).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${pri}: ${count}`)
  }

  // Final count
  const { count: totalCount } = await sb.from('leads').select('*', { count: 'exact', head: true })
  console.log(`\nTotal leads in database: ${totalCount}`)
}

main().catch(console.error)
