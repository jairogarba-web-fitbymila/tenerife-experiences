/**
 * Civitatis Tenerife Experience Catalog
 *
 * Curated list of Civitatis experiences with metadata for rendering.
 * These are the top activities available on Civitatis for Tenerife,
 * organized by category for contextual placement across the site.
 */

export interface CivitatisExperience {
  id: string
  slug: string // Path on Civitatis after /tenerife/
  category: CivitatisCategory
  priceFrom: number
  currency: string
  duration: string
  rating: number
  reviewCount: number
  featured: boolean
  freeTour: boolean
  image: string
  // Translations keyed by locale
  title: Record<string, string>
  description: Record<string, string>
}

export type CivitatisCategory =
  | 'boat_tours'
  | 'teide'
  | 'nature'
  | 'water_sports'
  | 'theme_parks'
  | 'culture'
  | 'gastronomy'
  | 'transfers'
  | 'day_trips'

export const CATEGORY_ICONS: Record<CivitatisCategory, string> = {
  boat_tours: '🚤',
  teide: '🌋',
  nature: '🥾',
  water_sports: '🏄',
  theme_parks: '🎢',
  culture: '🏛️',
  gastronomy: '🍷',
  transfers: '🚗',
  day_trips: '🏝️',
}

export const CATEGORY_LABELS: Record<CivitatisCategory, Record<string, string>> = {
  boat_tours: {
    es: 'Excursiones en barco',
    en: 'Boat Tours',
    de: 'Bootsausflüge',
    fr: 'Excursions en bateau',
    ru: 'Морские прогулки',
    it: 'Escursioni in barca',
  },
  teide: {
    es: 'Tours al Teide',
    en: 'Teide Tours',
    de: 'Teide-Touren',
    fr: 'Tours du Teide',
    ru: 'Туры на Тейде',
    it: 'Tour del Teide',
  },
  nature: {
    es: 'Naturaleza y Senderismo',
    en: 'Nature & Hiking',
    de: 'Natur & Wandern',
    fr: 'Nature & Randonnée',
    ru: 'Природа и пешие прогулки',
    it: 'Natura & Trekking',
  },
  water_sports: {
    es: 'Deportes acuáticos',
    en: 'Water Sports',
    de: 'Wassersport',
    fr: 'Sports nautiques',
    ru: 'Водные виды спорта',
    it: 'Sport acquatici',
  },
  theme_parks: {
    es: 'Parques temáticos',
    en: 'Theme Parks',
    de: 'Freizeitparks',
    fr: 'Parcs à thème',
    ru: 'Тематические парки',
    it: 'Parchi tematici',
  },
  culture: {
    es: 'Cultura e Historia',
    en: 'Culture & History',
    de: 'Kultur & Geschichte',
    fr: 'Culture & Histoire',
    ru: 'Культура и история',
    it: 'Cultura e Storia',
  },
  gastronomy: {
    es: 'Gastronomía y Vinos',
    en: 'Food & Wine',
    de: 'Gastronomie & Wein',
    fr: 'Gastronomie & Vin',
    ru: 'Гастрономия и вино',
    it: 'Gastronomia e Vino',
  },
  transfers: {
    es: 'Traslados',
    en: 'Transfers',
    de: 'Transfers',
    fr: 'Transferts',
    ru: 'Трансферы',
    it: 'Trasferimenti',
  },
  day_trips: {
    es: 'Excursiones de un día',
    en: 'Day Trips',
    de: 'Tagesausflüge',
    fr: "Excursions d'une journée",
    ru: 'Однодневные экскурсии',
    it: 'Escursioni giornaliere',
  },
}

/**
 * Top Tenerife experiences on Civitatis
 * Slugs match Civitatis URL paths for affiliate linking
 */
export const CIVITATIS_EXPERIENCES: CivitatisExperience[] = [
  // === BOAT TOURS ===
  {
    id: 'whale-watching',
    slug: 'avistamiento-de-cetaceos/',
    category: 'boat_tours',
    priceFrom: 15,
    currency: 'EUR',
    duration: '3h',
    rating: 4.6,
    reviewCount: 12840,
    featured: true,
    freeTour: false,
    image: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=600&q=80',
    title: {
      es: 'Avistamiento de cetáceos en Los Gigantes',
      en: 'Whale & Dolphin Watching in Los Gigantes',
      de: 'Wal- & Delfinbeobachtung in Los Gigantes',
      fr: 'Observation de baleines à Los Gigantes',
      ru: 'Наблюдение за китами в Лос-Гигантес',
      it: 'Avvistamento cetacei a Los Gigantes',
    },
    description: {
      es: 'Navega por la costa de Los Gigantes y observa delfines y ballenas en su hábitat natural. Incluye snorkel.',
      en: 'Sail along the coast of Los Gigantes and spot dolphins and whales in their natural habitat. Snorkeling included.',
      de: 'Segeln Sie entlang der Küste von Los Gigantes und beobachten Sie Delfine und Wale in ihrem natürlichen Lebensraum.',
      fr: "Naviguez le long de la côte de Los Gigantes et observez dauphins et baleines dans leur habitat naturel.",
      ru: 'Прогулка вдоль побережья Лос-Гигантес с наблюдением за дельфинами и китами в их естественной среде обитания.',
      it: "Naviga lungo la costa di Los Gigantes e osserva delfini e balene nel loro habitat naturale.",
    },
  },
  {
    id: 'catamaran-adeje',
    slug: 'paseo-catamaran-costa-adeje/',
    category: 'boat_tours',
    priceFrom: 45,
    currency: 'EUR',
    duration: '3h',
    rating: 4.7,
    reviewCount: 5230,
    featured: true,
    freeTour: false,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80',
    title: {
      es: 'Paseo en catamarán por Costa Adeje',
      en: 'Catamaran Cruise in Costa Adeje',
      de: 'Katamaran-Fahrt in Costa Adeje',
      fr: 'Croisière en catamaran à Costa Adeje',
      ru: 'Прогулка на катамаране в Коста-Адехе',
      it: 'Crociera in catamarano a Costa Adeje',
    },
    description: {
      es: 'Navega en catamarán con barra libre, comida y parada para snorkel en aguas cristalinas.',
      en: 'Catamaran cruise with open bar, food and snorkeling stop in crystal-clear waters.',
      de: 'Katamaran-Kreuzfahrt mit offener Bar, Essen und Schnorchelstopp in kristallklarem Wasser.',
      fr: 'Croisière en catamaran avec bar ouvert, repas et arrêt snorkeling dans des eaux cristallines.',
      ru: 'Круиз на катамаране с открытым баром, едой и остановкой для снорклинга в кристально чистых водах.',
      it: 'Crociera in catamarano con open bar, cibo e sosta snorkeling in acque cristalline.',
    },
  },

  // === TEIDE ===
  {
    id: 'teide-night-stars',
    slug: 'excursion-nocturna-teide-observacion-estrellas/',
    category: 'teide',
    priceFrom: 35,
    currency: 'EUR',
    duration: '5h',
    rating: 4.8,
    reviewCount: 8920,
    featured: true,
    freeTour: false,
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80',
    title: {
      es: 'Excursión nocturna al Teide con observación de estrellas',
      en: 'Teide Night Tour with Stargazing',
      de: 'Teide-Nachttour mit Sternebeobachtung',
      fr: 'Excursion nocturne au Teide avec observation des étoiles',
      ru: 'Ночная экскурсия на Тейде с наблюдением за звёздами',
      it: 'Escursione notturna al Teide con osservazione delle stelle',
    },
    description: {
      es: 'Sube al Teide al atardecer, contempla la puesta de sol sobre las nubes y observa las estrellas con telescopios profesionales.',
      en: 'Climb Teide at sunset, watch the sun set above the clouds and stargaze with professional telescopes.',
      de: 'Besteigen Sie den Teide bei Sonnenuntergang und beobachten Sie die Sterne mit professionellen Teleskopen.',
      fr: "Montez au Teide au coucher du soleil et observez les étoiles avec des télescopes professionnels.",
      ru: 'Поднимитесь на Тейде на закате, полюбуйтесь закатом над облаками и наблюдайте за звёздами в профессиональные телескопы.',
      it: 'Salite sul Teide al tramonto, ammirate il sole che tramonta sopra le nuvole e osservate le stelle con telescopi professionali.',
    },
  },
  {
    id: 'teide-buggy',
    slug: 'tour-buggy-teide/',
    category: 'teide',
    priceFrom: 85,
    currency: 'EUR',
    duration: '4h',
    rating: 4.5,
    reviewCount: 3210,
    featured: false,
    freeTour: false,
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80',
    title: {
      es: 'Tour en buggy por el Teide',
      en: 'Buggy Tour to Mount Teide',
      de: 'Buggy-Tour zum Teide',
      fr: 'Tour en buggy au Teide',
      ru: 'Тур на багги к Тейде',
      it: 'Tour in buggy al Teide',
    },
    description: {
      es: 'Conduce un buggy por las carreteras volcánicas del Parque Nacional del Teide. Adrenalina y paisajes lunares.',
      en: 'Drive a buggy through the volcanic roads of Teide National Park. Adrenaline and lunar landscapes.',
      de: 'Fahren Sie mit einem Buggy durch die Vulkanstraßen des Teide-Nationalparks.',
      fr: 'Conduisez un buggy sur les routes volcaniques du parc national du Teide.',
      ru: 'Проедьте на багги по вулканическим дорогам национального парка Тейде.',
      it: 'Guidate un buggy per le strade vulcaniche del Parco Nazionale del Teide.',
    },
  },

  // === NATURE ===
  {
    id: 'masca-hike',
    slug: 'senderismo-barranco-masca/',
    category: 'nature',
    priceFrom: 30,
    currency: 'EUR',
    duration: '6h',
    rating: 4.7,
    reviewCount: 4560,
    featured: true,
    freeTour: false,
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80',
    title: {
      es: 'Senderismo por el Barranco de Masca',
      en: 'Masca Ravine Hiking Tour',
      de: 'Wanderung durch die Masca-Schlucht',
      fr: 'Randonnée dans le Ravin de Masca',
      ru: 'Пешая прогулка по ущелью Маска',
      it: 'Trekking nella Gola di Masca',
    },
    description: {
      es: 'Desciende por el barranco más famoso de Tenerife hasta el mar. Ruta guiada con transporte incluido.',
      en: "Descend through Tenerife's most famous ravine to the sea. Guided tour with transport included.",
      de: 'Steigen Sie durch die berühmteste Schlucht Teneriffas bis zum Meer hinab. Geführte Tour mit Transport.',
      fr: 'Descendez le ravin le plus célèbre de Tenerife jusqu\'à la mer. Visite guidée avec transport inclus.',
      ru: 'Спуститесь по самому знаменитому ущелью Тенерифе к морю. Экскурсия с гидом и трансфером.',
      it: "Scendete attraverso il burrone più famoso di Tenerife fino al mare. Tour guidato con trasporto incluso.",
    },
  },
  {
    id: 'anaga-tour',
    slug: 'excursion-anaga/',
    category: 'nature',
    priceFrom: 25,
    currency: 'EUR',
    duration: '8h',
    rating: 4.6,
    reviewCount: 2870,
    featured: false,
    freeTour: false,
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80',
    title: {
      es: 'Excursión al Bosque de Anaga',
      en: 'Anaga Forest Tour',
      de: 'Anaga-Wald-Tour',
      fr: "Excursion à la Forêt d'Anaga",
      ru: 'Экскурсия в лес Анага',
      it: "Escursione alla Foresta di Anaga",
    },
    description: {
      es: 'Descubre la Reserva de la Biosfera de Anaga: laurisilva milenaria, miradores y pueblos perdidos.',
      en: "Discover Anaga's Biosphere Reserve: ancient laurel forests, viewpoints and hidden villages.",
      de: 'Entdecken Sie das Biosphärenreservat Anaga: uralte Lorbeerwälder, Aussichtspunkte und versteckte Dörfer.',
      fr: "Découvrez la Réserve de biosphère d'Anaga : forêt de lauriers millénaire, miradors et villages perdus.",
      ru: 'Откройте биосферный заповедник Анага: древние лавровые леса, смотровые площадки и затерянные деревни.',
      it: "Scoprite la Riserva della Biosfera di Anaga: foresta di alloro millenaria, belvedere e villaggi nascosti.",
    },
  },

  // === WATER SPORTS ===
  {
    id: 'jet-ski',
    slug: 'alquiler-moto-acuatica/',
    category: 'water_sports',
    priceFrom: 40,
    currency: 'EUR',
    duration: '1h',
    rating: 4.5,
    reviewCount: 1890,
    featured: false,
    freeTour: false,
    image: 'https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=600&q=80',
    title: {
      es: 'Alquiler de moto acuática',
      en: 'Jet Ski Rental',
      de: 'Jetski-Verleih',
      fr: 'Location de jet ski',
      ru: 'Аренда гидроцикла',
      it: 'Noleggio moto d\'acqua',
    },
    description: {
      es: 'Recorre la costa sur de Tenerife en moto acuática. Adrenalina y vistas increíbles desde el agua.',
      en: "Race along Tenerife's south coast on a jet ski. Adrenaline and incredible views from the water.",
      de: 'Rasen Sie mit einem Jetski entlang der Südküste Teneriffas.',
      fr: 'Parcourez la côte sud de Tenerife en jet ski.',
      ru: 'Промчитесь вдоль южного побережья Тенерифе на гидроцикле.',
      it: 'Percorrete la costa sud di Tenerife in moto d\'acqua.',
    },
  },
  {
    id: 'scuba-diving',
    slug: 'bautismo-buceo-costa-adeje/',
    category: 'water_sports',
    priceFrom: 55,
    currency: 'EUR',
    duration: '3h',
    rating: 4.8,
    reviewCount: 2340,
    featured: true,
    freeTour: false,
    image: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=600&q=80',
    title: {
      es: 'Bautismo de buceo en Costa Adeje',
      en: 'Scuba Diving in Costa Adeje',
      de: 'Tauchen in Costa Adeje',
      fr: 'Baptême de plongée à Costa Adeje',
      ru: 'Дайвинг в Коста-Адехе',
      it: 'Battesimo di immersione a Costa Adeje',
    },
    description: {
      es: 'Sumérgete en las aguas de Costa Adeje con instructores certificados. Sin experiencia previa necesaria.',
      en: 'Dive into the waters of Costa Adeje with certified instructors. No prior experience needed.',
      de: 'Tauchen Sie in die Gewässer von Costa Adeje mit zertifizierten Tauchlehrern.',
      fr: 'Plongez dans les eaux de Costa Adeje avec des instructeurs certifiés.',
      ru: 'Погрузитесь в воды Коста-Адехе с сертифицированными инструкторами.',
      it: 'Immergetevi nelle acque di Costa Adeje con istruttori certificati.',
    },
  },

  // === THEME PARKS ===
  {
    id: 'siam-park',
    slug: 'entrada-siam-park/',
    category: 'theme_parks',
    priceFrom: 38,
    currency: 'EUR',
    duration: 'Día completo',
    rating: 4.8,
    reviewCount: 15600,
    featured: true,
    freeTour: false,
    image: 'https://images.unsplash.com/photo-1570750707457-23290e797e50?w=600&q=80',
    title: {
      es: 'Entrada a Siam Park',
      en: 'Siam Park Ticket',
      de: 'Siam Park Eintrittskarte',
      fr: "Billet Siam Park",
      ru: 'Билет в Сиам Парк',
      it: 'Biglietto Siam Park',
    },
    description: {
      es: 'Acceso al mejor parque acuático del mundo. Toboganes épicos, olas artificiales y playas de arena blanca.',
      en: "Access to the world's best water park. Epic slides, artificial waves and white sand beaches.",
      de: 'Zugang zum besten Wasserpark der Welt. Epische Rutschen und künstliche Wellen.',
      fr: "Accès au meilleur parc aquatique du monde. Toboggans épiques et vagues artificielles.",
      ru: 'Доступ в лучший аквапарк мира. Эпические горки, искусственные волны и пляжи с белым песком.',
      it: "Accesso al miglior parco acquatico del mondo. Scivoli epici, onde artificiali e spiagge di sabbia bianca.",
    },
  },
  {
    id: 'loro-parque',
    slug: 'entrada-loro-parque/',
    category: 'theme_parks',
    priceFrom: 38,
    currency: 'EUR',
    duration: 'Día completo',
    rating: 4.6,
    reviewCount: 11200,
    featured: true,
    freeTour: false,
    image: 'https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=600&q=80',
    title: {
      es: 'Entrada a Loro Parque',
      en: 'Loro Parque Ticket',
      de: 'Loro Parque Eintrittskarte',
      fr: 'Billet Loro Parque',
      ru: 'Билет в Лоро Парк',
      it: 'Biglietto Loro Parque',
    },
    description: {
      es: 'Visita el zoo más premiado de Europa. Orcas, delfines, pingüinos y un jardín botánico espectacular.',
      en: "Visit Europe's most awarded zoo. Orcas, dolphins, penguins and a spectacular botanical garden.",
      de: 'Besuchen Sie den preisgekröntesten Zoo Europas.',
      fr: "Visitez le zoo le plus primé d'Europe.",
      ru: 'Посетите самый награждённый зоопарк Европы.',
      it: "Visitate lo zoo più premiato d'Europa.",
    },
  },

  // === CULTURE ===
  {
    id: 'la-laguna-free-tour',
    slug: 'free-tour-la-laguna/',
    category: 'culture',
    priceFrom: 0,
    currency: 'EUR',
    duration: '2h',
    rating: 4.7,
    reviewCount: 6780,
    featured: true,
    freeTour: true,
    image: 'https://images.unsplash.com/photo-1564507592385-c78740f55b06?w=600&q=80',
    title: {
      es: 'Free tour por La Laguna',
      en: 'Free Walking Tour of La Laguna',
      de: 'Kostenlose Stadtführung durch La Laguna',
      fr: 'Free tour à La Laguna',
      ru: 'Бесплатная экскурсия по Ла-Лагуне',
      it: 'Free tour di La Laguna',
    },
    description: {
      es: 'Recorre la ciudad Patrimonio de la Humanidad con un guía local. Casas señoriales, iglesias y leyendas.',
      en: 'Explore the UNESCO World Heritage city with a local guide. Manor houses, churches and legends.',
      de: 'Erkunden Sie die UNESCO-Welterbestadt mit einem lokalen Guide.',
      fr: "Explorez la ville classée au patrimoine mondial avec un guide local.",
      ru: 'Исследуйте город всемирного наследия ЮНЕСКО с местным гидом.',
      it: "Esplorate la città Patrimonio dell'Umanità con una guida locale.",
    },
  },

  // === GASTRONOMY ===
  {
    id: 'wine-tasting',
    slug: 'cata-vinos-tenerife/',
    category: 'gastronomy',
    priceFrom: 29,
    currency: 'EUR',
    duration: '3h',
    rating: 4.6,
    reviewCount: 1560,
    featured: false,
    freeTour: false,
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&q=80',
    title: {
      es: 'Cata de vinos en bodega de Tenerife',
      en: 'Wine Tasting at a Tenerife Winery',
      de: 'Weinverkostung auf einem Weingut in Teneriffa',
      fr: 'Dégustation de vins dans un domaine de Tenerife',
      ru: 'Дегустация вин на винодельне Тенерифе',
      it: 'Degustazione di vini in una cantina di Tenerife',
    },
    description: {
      es: 'Descubre los vinos volcánicos de Tenerife con denominación de origen. Cata guiada con maridaje de quesos locales.',
      en: "Discover Tenerife's volcanic wines with designation of origin. Guided tasting with local cheese pairing.",
      de: 'Entdecken Sie die vulkanischen Weine Teneriffas mit Herkunftsbezeichnung.',
      fr: "Découvrez les vins volcaniques de Tenerife avec appellation d'origine.",
      ru: 'Откройте вулканические вина Тенерифе с наименованием по происхождению.',
      it: "Scoprite i vini vulcanici di Tenerife con denominazione d'origine.",
    },
  },

  // === DAY TRIPS ===
  {
    id: 'la-gomera-day-trip',
    slug: 'excursion-la-gomera/',
    category: 'day_trips',
    priceFrom: 55,
    currency: 'EUR',
    duration: '10h',
    rating: 4.5,
    reviewCount: 3450,
    featured: false,
    freeTour: false,
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&q=80',
    title: {
      es: 'Excursión a La Gomera desde Tenerife',
      en: 'Day Trip to La Gomera from Tenerife',
      de: 'Tagesausflug nach La Gomera ab Teneriffa',
      fr: 'Excursion à La Gomera depuis Tenerife',
      ru: 'Однодневная поездка на Ла-Гомеру из Тенерифе',
      it: 'Escursione a La Gomera da Tenerife',
    },
    description: {
      es: 'Ferry + tour guiado por La Gomera: Parque Nacional de Garajonay, Valle Gran Rey y el silbo gomero.',
      en: 'Ferry + guided tour of La Gomera: Garajonay National Park, Valle Gran Rey and the Gomeran whistle.',
      de: 'Fähre + geführte Tour durch La Gomera: Garajonay-Nationalpark und Valle Gran Rey.',
      fr: 'Ferry + visite guidée de La Gomera : Parc National de Garajonay et Valle Gran Rey.',
      ru: 'Паром + экскурсия по Ла-Гомере: национальный парк Гарахонай, Валье-Гран-Рей и гомерский свист.',
      it: 'Traghetto + tour guidato di La Gomera: Parco Nazionale di Garajonay e Valle Gran Rey.',
    },
  },

  // === TRANSFERS ===
  {
    id: 'airport-transfer',
    slug: 'traslado-aeropuerto-hotel/',
    category: 'transfers',
    priceFrom: 22,
    currency: 'EUR',
    duration: '30-60min',
    rating: 4.4,
    reviewCount: 4120,
    featured: false,
    freeTour: false,
    image: 'https://images.unsplash.com/photo-1449965408869-ebd3fee37bf9?w=600&q=80',
    title: {
      es: 'Traslado aeropuerto - hotel',
      en: 'Airport to Hotel Transfer',
      de: 'Flughafen-Hotel-Transfer',
      fr: "Transfert aéroport - hôtel",
      ru: 'Трансфер из аэропорта в отель',
      it: 'Trasferimento aeroporto - hotel',
    },
    description: {
      es: 'Traslado privado desde el aeropuerto de Tenerife Sur o Norte a tu hotel. Cómodo, puntual y sin sorpresas.',
      en: 'Private transfer from Tenerife South or North airport to your hotel. Comfortable, punctual, no surprises.',
      de: 'Privattransfer vom Flughafen Teneriffa Süd oder Nord zu Ihrem Hotel.',
      fr: "Transfert privé depuis l'aéroport de Tenerife Sud ou Nord à votre hôtel.",
      ru: 'Частный трансфер из аэропорта Тенерифе Юг или Север в ваш отель.',
      it: "Trasferimento privato dall'aeroporto di Tenerife Sud o Nord al vostro hotel.",
    },
  },
]

/**
 * Get experiences by category
 */
export function getExperiencesByCategory(category: CivitatisCategory): CivitatisExperience[] {
  return CIVITATIS_EXPERIENCES.filter((e) => e.category === category)
}

/**
 * Get featured experiences
 */
export function getFeaturedExperiences(): CivitatisExperience[] {
  return CIVITATIS_EXPERIENCES.filter((e) => e.featured)
}

/**
 * Get all categories with experience counts
 */
export function getCategoriesWithCounts(): { category: CivitatisCategory; count: number }[] {
  const counts = new Map<CivitatisCategory, number>()
  CIVITATIS_EXPERIENCES.forEach((e) => {
    counts.set(e.category, (counts.get(e.category) || 0) + 1)
  })
  return Array.from(counts.entries()).map(([category, count]) => ({ category, count }))
}
