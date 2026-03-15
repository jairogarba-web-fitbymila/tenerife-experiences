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
  // SENDERISMO GUIADO / HIKING GUIDES (7)
  // ============================
  {
    business_name: 'Caminantes de Aguere',
    category: 'nature-guide',
    subcategory: 'hiking',
    zone: 'metropolitana',
    website: 'https://www.caminantesdeaguere.com',
    source: 'web-search',
    status: 'new',
    notes: 'Senderismo guiado en Canarias. Rutas para operadores, empresas, colegios y grupos. La Laguna.',
  },
  {
    business_name: 'Teneriffa Kreaktiv',
    category: 'nature-guide',
    subcategory: 'hiking',
    zone: 'sur',
    website: 'https://www.teneriffa-kreaktiv.com',
    source: 'web-search',
    status: 'new',
    notes: 'Recogida en hotel, furgoneta privada. Rutas Teide con permiso, Barranco de Masca. Excursiones privadas.',
  },
  {
    business_name: 'El Cardón NaturExperience',
    category: 'nature-guide',
    subcategory: 'hiking',
    zone: 'isla',
    website: 'https://elcardon.com',
    source: 'web-search',
    status: 'new',
    notes: 'Hiking en Teide, Anaga, Teno y sur. Descenso Barranco de Masca. Rutas astronómicas en el Teide.',
  },
  {
    business_name: 'Canarias Nature Guides',
    category: 'nature-guide',
    subcategory: 'hiking',
    zone: 'isla',
    website: 'https://canariasnatureguides.com',
    source: 'web-search',
    status: 'new',
    notes: 'Guías naturalistas de Tenerife. Senderismo interpretativo, fauna y flora endémica.',
  },
  {
    business_name: 'Patea Tus Montes',
    category: 'nature-guide',
    subcategory: 'hiking',
    zone: 'isla',
    website: 'https://pateatusmontes.com',
    source: 'web-search',
    status: 'new',
    notes: 'Empresa de senderismo guiado en Tenerife. Rutas por toda la isla para distintos niveles.',
  },
  {
    business_name: 'Canaventura',
    category: 'eco-tourism',
    subcategory: 'multi-activity',
    zone: 'isla',
    website: 'https://canaventura.es',
    source: 'web-search',
    status: 'new',
    notes: 'Casi 20 años de experiencia. Guías de montaña en turismo ecológico sostenible en Tenerife.',
  },
  {
    business_name: 'GuiaNatura EcoTourism',
    category: 'eco-tourism',
    subcategory: 'nature-tours',
    zone: 'isla',
    website: 'https://guianatura.net',
    source: 'web-search',
    status: 'new',
    notes: 'Turismo sostenible en Tenerife y Canarias. Excursiones ecológicas con guías locales.',
  },

  // ============================
  // BARRANQUISMO / CANYONING (5)
  // ============================
  {
    business_name: 'Nivariaextremo',
    category: 'adventure',
    subcategory: 'canyoning',
    zone: 'isla',
    website: 'https://nivariaextremo.net',
    source: 'web-search',
    status: 'new',
    notes: 'Barranquismo, coasteering, senderismo, submarinismo. 10 años de experiencia. Cañones familiares a avanzados.',
  },
  {
    business_name: 'Natura Xtreme Tenerife',
    category: 'adventure',
    subcategory: 'canyoning',
    zone: 'isla',
    website: 'https://naturaxtremetenerife.com',
    source: 'web-search',
    status: 'new',
    notes: 'Barranquismo guiado en los cañones más espectaculares de Tenerife. Guías cualificados.',
  },
  {
    business_name: 'Outdoor Activities Tenerife',
    category: 'adventure',
    subcategory: 'canyoning',
    zone: 'isla',
    website: 'https://outdooractivitiestenerife.com',
    source: 'web-search',
    status: 'new',
    notes: 'Especialistas en barranquismo y senderismo. Ruta Los Carrizales. Zonas más escénicas de la isla.',
  },
  {
    business_name: 'Ocho Escalada',
    category: 'adventure',
    subcategory: 'canyoning',
    zone: 'sur',
    website: 'https://ocho-escalada.com',
    source: 'web-search',
    status: 'new',
    notes: 'Cursos y salidas de barranquismo en Tenerife. Villa de Arico. También escalada.',
  },
  {
    business_name: 'Dame Aventura',
    category: 'adventure',
    subcategory: 'canyoning',
    zone: 'isla',
    website: 'https://dameaventura.com',
    source: 'web-search',
    status: 'new',
    notes: 'Excursiones de barranquismo en distintos niveles de dificultad. Barranco del Infierno, Masca, Fasnia.',
  },

  // ============================
  // OBSERVACIÓN DE ESTRELLAS / STARGAZING (5)
  // ============================
  {
    business_name: 'Asterark',
    category: 'nature-guide',
    subcategory: 'stargazing',
    zone: 'centro',
    website: 'https://asterark.com',
    source: 'web-search',
    status: 'new',
    notes: 'Guías certificados Starlight y Parque Nacional del Teide. Observación de estrellas profesional.',
  },
  {
    business_name: 'Discover Experience',
    category: 'nature-guide',
    subcategory: 'stargazing',
    zone: 'centro',
    website: 'https://discoverexperience.com',
    source: 'web-search',
    status: 'new',
    notes: 'Guías oficiales de turismo, del Parque Nacional del Teide y guías Starlight. Stargazing tours.',
  },
  {
    business_name: 'Teide Stars',
    category: 'nature-guide',
    subcategory: 'stargazing',
    zone: 'centro',
    website: 'https://www.teidestars.com',
    source: 'web-search',
    status: 'new',
    notes: 'Tours de astronomía en las alturas de Tenerife. Telescopios profesionales, astrónomos expertos.',
  },
  {
    business_name: 'Senda Ecoway',
    category: 'eco-tourism',
    subcategory: 'stargazing',
    zone: 'centro',
    website: 'https://sendaecoway.com',
    source: 'web-search',
    status: 'new',
    notes: 'Experiencias de ecoturismo: observación de estrellas en el Teide, casas rurales entre viñedos.',
  },
  {
    business_name: 'Tazirga Volcanic Experience',
    category: 'nature-guide',
    subcategory: 'geology',
    zone: 'centro',
    website: 'https://tazirga.com',
    source: 'web-search',
    status: 'new',
    notes: 'Experiencias volcánicas en el Parque Nacional del Teide. Geología, interpretación del paisaje.',
  },

  // ============================
  // RUTAS A CABALLO / HORSE RIDING (3)
  // ============================
  {
    business_name: 'A Caballo por Tenerife',
    category: 'rural-tourism',
    subcategory: 'horseback-riding',
    zone: 'norte',
    website: 'https://www.gettivity.com/es/tienda/actividades-tenerife/activo-tenerife/a-caballo-por-tenerife/',
    source: 'web-search',
    status: 'new',
    notes: 'Rutas a caballo por el norte de Tenerife. Zona La Orotava, Aguamansa. Adaptadas a todos los niveles.',
  },
  {
    business_name: 'Hípica Icod de los Vinos',
    category: 'rural-tourism',
    subcategory: 'horseback-riding',
    zone: 'norte',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Rutas guiadas desde Icod de los Vinos. Principiantes y expertos. Hasta 8 horas de ruta con galope.',
  },
  {
    business_name: 'Rutas Ecuestres Corona Forestal',
    category: 'rural-tourism',
    subcategory: 'horseback-riding',
    zone: 'norte',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Excursiones de 5 horas a caballo por el Parque Natural Corona Forestal. Pinos, prados, flora autóctona.',
  },

  // ============================
  // PASEOS EN CAMELLO (2)
  // ============================
  {
    business_name: 'Camello Center El Tanque',
    category: 'rural-tourism',
    subcategory: 'camel-rides',
    zone: 'norte',
    website: 'http://www.camellocenter.es',
    source: 'web-search',
    status: 'new',
    notes: 'Paseos en camello por zonas naturales protegidas de El Tanque. Horario 10:00-16:30. Vegetación autóctona.',
  },
  {
    business_name: 'Tenerife Camel Park',
    category: 'rural-tourism',
    subcategory: 'camel-rides',
    zone: 'sur',
    website: 'https://camelpark.es',
    source: 'web-search',
    status: 'new',
    notes: 'Parque de camellos en Arona. A 10 min de Las Américas y Los Cristianos. Paseos de 20 min.',
  },

  // ============================
  // GRANJAS EDUCATIVAS / EDUCATIONAL FARMS (2)
  // ============================
  {
    business_name: 'Finca El Carretón',
    category: 'rural-tourism',
    subcategory: 'educational-farm',
    zone: 'norte',
    website: 'https://www.fincaelcarreton.com',
    source: 'web-search',
    status: 'new',
    notes: 'Granja infantil ecológica en Arafo. Mayor exposición animales domésticos autóctonos de Canarias. 16.000 m². Desde 1990.',
  },
  {
    business_name: 'Ecogranja La Aldea',
    category: 'rural-tourism',
    subcategory: 'educational-farm',
    zone: 'metropolitana',
    website: 'https://www.laecogranja.org',
    source: 'web-search',
    status: 'new',
    notes: 'Granja escuela en El Tablero, Santa Cruz. Proyecto "Especialmente Diferentes" con intervenciones asistidas con caballos.',
  },

  // ============================
  // APICULTURA / BEEKEEPING (2)
  // ============================
  {
    business_name: 'Ecoalpispa - La Abejera',
    category: 'eco-tourism',
    subcategory: 'beekeeping',
    zone: 'norte',
    website: 'https://ecoalpispa.es',
    source: 'web-search',
    status: 'new',
    notes: 'Finca visitable en Icod de los Vinos. Ecoagroturismo apícola. Aula de naturaleza, colmena tras cristal, catas de miel.',
  },
  {
    business_name: 'Casa de la Miel Tenerife',
    category: 'food-experience',
    subcategory: 'honey-tasting',
    zone: 'isla',
    website: 'https://www.casadelamiel.org',
    source: 'web-search',
    status: 'new',
    notes: 'Centro oficial de apicultura de Tenerife. Tenerife concentra 60% del sector apícola canario. 700 apicultores, 15.000 colmenas.',
  },

  // ============================
  // QUESERÍAS ARTESANALES / CHEESE DAIRIES (2)
  // ============================
  {
    business_name: 'Quesería Montesdeoca',
    category: 'food-experience',
    subcategory: 'cheese-tasting',
    zone: 'sur',
    website: 'https://www.quesosmontesdeoca.com',
    source: 'web-search',
    status: 'new',
    notes: 'Quesería artesanal visitable en Adeje. +60 premios insulares, nacionales e internacionales. Queso de cabra canario.',
  },
  {
    business_name: 'Queso Project Tenerife',
    category: 'food-experience',
    subcategory: 'cheese-tasting',
    zone: 'isla',
    website: 'https://www.quesoproject.com',
    source: 'web-search',
    status: 'new',
    notes: 'Red de queserías artesanales visitables en Tenerife. Rutas del queso con degustaciones.',
  },

  // ============================
  // FINCAS ECOLÓGICAS / ECO FARMS (4)
  // ============================
  {
    business_name: 'Ecofinca Nogales',
    category: 'eco-tourism',
    subcategory: 'eco-farm',
    zone: 'norte',
    website: 'https://www.ecofincanogales.com',
    source: 'web-search',
    status: 'new',
    notes: 'Turismo y agricultura ecológica. Frutas subtropicales: aguacates, mangos, piñas, papayas. Procesos 100% ecológicos.',
  },
  {
    business_name: 'Finca Ecológica La Jara',
    category: 'eco-tourism',
    subcategory: 'eco-farm',
    zone: 'norte',
    website: 'https://fincaecologicalajara.com',
    source: 'web-search',
    status: 'new',
    notes: 'Finca ecológica en Arafo, Santa Cruz de Tenerife. Visitas y producción ecológica.',
  },
  {
    business_name: 'Finca El Quinto',
    category: 'rural-tourism',
    subcategory: 'agritourism',
    zone: 'norte',
    website: 'https://www.fincaelquinto.de',
    source: 'web-search',
    status: 'new',
    notes: 'Finca familiar en el norte de Tenerife. Tres generaciones viviendo y trabajando en la finca. Agroturismo.',
  },
  {
    business_name: 'Alma de Trevejos',
    category: 'eco-tourism',
    subcategory: 'eco-vineyard',
    zone: 'sur',
    website: 'https://almadetrevejos.com',
    source: 'web-search',
    status: 'new',
    notes: 'Finca ecológica en Vilaflor. Viticultura canaria tradicional y ecológica. Vistas mar y montaña.',
  },

  // ============================
  // AGROTURISMO / AGRITOURISM (2)
  // ============================
  {
    business_name: 'La Gañanía Casa Rural',
    category: 'accommodation',
    subcategory: 'agritourism',
    zone: 'norte',
    website: 'https://www.casalaganania.es',
    source: 'web-search',
    status: 'new',
    notes: 'Casa rural de agroturismo en el norte de Tenerife. Participación en actividades agrícolas.',
  },
  {
    business_name: 'Tabaiba Guesthouse Hiking',
    category: 'accommodation',
    subcategory: 'hiking-lodge',
    zone: 'norte',
    website: 'https://tabaibaguesthouse.com',
    source: 'web-search',
    status: 'new',
    notes: 'Alojamiento rural con excursiones de senderismo guiado incluidas. Norte de Tenerife.',
  },

  // ============================
  // CASAS CUEVA / CAVE HOUSES (3)
  // ============================
  {
    business_name: 'Finca Las Polinarias Casa Cueva',
    category: 'accommodation',
    subcategory: 'cave-house',
    zone: 'sur',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Casas cueva de 250 años en Fasnia, rehabilitadas. Vistas a la montaña. A 39 km de Golf del Sur.',
  },
  {
    business_name: 'Casa Cueva La Herencia',
    category: 'accommodation',
    subcategory: 'cave-house',
    zone: 'sur',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Casa cueva en El Roque, sur de Tenerife. 3 dormitorios, 2 salones. Paz y tranquilidad rural.',
  },
  {
    business_name: 'Casa Cueva Anajos',
    category: 'accommodation',
    subcategory: 'cave-house',
    zone: 'sur',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Casa cueva en Arico. Alojamiento rural único. Temperaturas frescas en verano, cálidas en invierno.',
  },

  // ============================
  // CAMPING LEGAL (2)
  // ============================
  {
    business_name: 'AJJ Vans Canarias',
    category: 'camping',
    subcategory: 'campervan-rental',
    zone: 'isla',
    website: 'https://www.ajjvanscanarias.com',
    source: 'web-search',
    status: 'new',
    notes: 'Alquiler de campervans en Tenerife. Guías completas de camping legal. 20 zonas recreativas oficiales en la isla.',
  },
  {
    business_name: 'My Little Camper Tenerife',
    category: 'camping',
    subcategory: 'campervan-rental',
    zone: 'isla',
    website: 'https://mylittlecampertenerife.com',
    source: 'web-search',
    status: 'new',
    notes: 'Alquiler de campervans y autocaravanas en Tenerife. Guía regulaciones y leyes para acampar.',
  },

  // ============================
  // BIRDWATCHING (3)
  // ============================
  {
    business_name: 'GeoTenerife Birdwatching',
    category: 'nature-guide',
    subcategory: 'birdwatching',
    zone: 'isla',
    website: 'https://geotenerife.com',
    source: 'web-search',
    status: 'new',
    notes: 'Tours de birdwatching y geología en Tenerife. Pinzón azul, paloma rabiche, herrerillo canario.',
  },
  {
    business_name: 'Naturetrek Canary Islands',
    category: 'nature-guide',
    subcategory: 'birdwatching',
    zone: 'isla',
    website: 'https://www.naturetrek.co.uk',
    source: 'web-search',
    status: 'new',
    notes: 'Tours de birdwatching especializados en Canarias. 70+ especies reproductoras en Tenerife. Aves endémicas.',
  },
  {
    business_name: 'TourHQ Tenerife Birdwatching',
    category: 'nature-guide',
    subcategory: 'birdwatching',
    zone: 'isla',
    website: 'https://www.tourhq.com',
    source: 'web-search',
    status: 'new',
    notes: 'Tour de birdwatching de 4 horas en Tenerife. Guías locales expertos en avifauna endémica.',
  },

  // ============================
  // GEOLOGÍA / GEOLOGY TOURS (2)
  // ============================
  {
    business_name: 'Tenerife Top Tours Volcanes',
    category: 'nature-guide',
    subcategory: 'geology',
    zone: 'isla',
    website: 'https://tenerifetoptours.com',
    source: 'web-search',
    status: 'new',
    notes: 'Ruta entre volcanes: Volcán Trevejo (erupción 1706, sepultó Garachico) y Volcán Chinyero (última erupción 1909).',
  },
  {
    business_name: 'Volcanes de Canarias',
    category: 'nature-guide',
    subcategory: 'geology',
    zone: 'isla',
    website: 'https://volcanesdecanarias.org',
    source: 'web-search',
    status: 'new',
    notes: 'Itinerarios geológicos por depósitos piroclásticos del sur de Tenerife. Divulgación vulcanológica.',
  },

  // ============================
  // ARTESANÍA / CRAFTS (4)
  // ============================
  {
    business_name: 'Taller de Gonzalo Martín Cerámica',
    category: 'crafts',
    subcategory: 'ceramics',
    zone: 'norte',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Taller de cerámica artesana en La Orotava. Piezas personalizadas, temática marina. Reconocido por Guía Repsol.',
  },
  {
    business_name: 'Abrazos de Barro',
    category: 'crafts',
    subcategory: 'ceramics',
    zone: 'norte',
    website: 'https://abrazosdebarro.es',
    source: 'web-search',
    status: 'new',
    notes: 'Taller creativo de cerámica en Valle de La Orotava. En la carretera al Teide. Talleres para visitantes.',
  },
  {
    business_name: 'OTTA Studio Cerámica',
    category: 'crafts',
    subcategory: 'ceramics',
    zone: 'metropolitana',
    website: 'https://www.otta-studio.com',
    source: 'web-search',
    status: 'new',
    notes: 'Talleres de cerámica en Santa Cruz de Tenerife. Talleres regulares, especiales y privados para grupos.',
  },
  {
    business_name: 'Taller Alfar Cerámica',
    category: 'crafts',
    subcategory: 'ceramics',
    zone: 'norte',
    website: 'https://www.talleralfar.com',
    source: 'web-search',
    status: 'new',
    notes: 'Taller de cerámica artesanal en Tenerife. Experiencias de alfarería para visitantes.',
  },

  // ============================
  // CLASES DE COCINA / COOKING CLASSES (3)
  // ============================
  {
    business_name: 'Se Te Va La Olla Escuela de Cocina',
    category: 'food-experience',
    subcategory: 'cooking-class',
    zone: 'metropolitana',
    website: 'https://setevalaolla.es',
    source: 'web-search',
    status: 'new',
    notes: 'Escuela de cocina en Santa Cruz. Todos los niveles. Bono regalo 65€ adultos, 45€ niños.',
  },
  {
    business_name: 'Aula de Cocina Iberostar Grand Mencey',
    category: 'food-experience',
    subcategory: 'cooking-class',
    zone: 'metropolitana',
    website: 'https://www.iberostar.com/es/aula-de-cocina-mencey/',
    source: 'web-search',
    status: 'new',
    notes: 'Clases de cocina en hotel 5 estrellas. Pasta fresca, cocina canaria creativa, repostería. 15 participantes max.',
  },
  {
    business_name: 'HH Canarias Talleres de Cocina',
    category: 'food-experience',
    subcategory: 'cooking-class',
    zone: 'norte',
    website: 'https://hhcanarias.com',
    source: 'web-search',
    status: 'new',
    notes: 'Talleres de cocina canaria en La Orotava, Tacoronte y casas rurales o ecofincas del sur.',
  },

  // ============================
  // MERCADOS DEL AGRICULTOR / FARMERS MARKETS (5)
  // ============================
  {
    business_name: 'Mercadillo del Agricultor de Tacoronte',
    category: 'food-experience',
    subcategory: 'farmers-market',
    zone: 'norte',
    website: 'https://mercadillodelagricultor.com',
    source: 'web-search',
    status: 'new',
    notes: 'Mercado de productos locales en Tacoronte. Sábados y domingos. Frutas, verduras, quesos, vinos.',
  },
  {
    business_name: 'Mercado del Agricultor de San Miguel de Abona',
    category: 'food-experience',
    subcategory: 'farmers-market',
    zone: 'sur',
    website: 'https://www.mercadosanmigueldeabona.com',
    source: 'web-search',
    status: 'new',
    notes: 'Mercado abierto miércoles, sábados y domingos 8:00-14:00. Productos locales y artesanales.',
  },
  {
    business_name: 'Mercado del Agricultor de Granadilla de Abona',
    category: 'food-experience',
    subcategory: 'farmers-market',
    zone: 'sur',
    website: 'https://mercadogranadilladeabona.com',
    source: 'web-search',
    status: 'new',
    notes: 'Plaza González Mena. Sábados y domingos 7:00-14:30. Talleres, demostraciones gastronómicas.',
  },
  {
    business_name: 'Mercadillo del Agricultor de La Orotava',
    category: 'food-experience',
    subcategory: 'farmers-market',
    zone: 'norte',
    website: 'https://mercadillolaorotava.com',
    source: 'web-search',
    status: 'new',
    notes: 'Mercado de producto local en La Orotava. Sábados 8:00-13:30. Frutas tropicales, vinos, miel.',
  },
  {
    business_name: 'Mercado del Agricultor de Fasnia',
    category: 'food-experience',
    subcategory: 'farmers-market',
    zone: 'sur',
    website: null,
    source: 'web-search',
    status: 'new',
    notes: 'Mercado del agricultor en las medianías de Fasnia. Productos locales de la zona sureste.',
  },

  // ============================
  // ECO TOURS & SUSTAINABLE TOURISM (2)
  // ============================
  {
    business_name: 'Tenerife Eco Tours',
    category: 'eco-tourism',
    subcategory: 'eco-tours',
    zone: 'isla',
    website: 'https://tenerifecotours.com',
    source: 'web-search',
    status: 'new',
    notes: 'Excursiones ecológicas y sostenibles. Senderismo, grupo trekking, paseos a caballo cerca del Chinyero.',
  },
  {
    business_name: 'Ecoturismo Canarias',
    category: 'eco-tourism',
    subcategory: 'eco-tours',
    zone: 'isla',
    website: 'http://www.ecoturismocanarias.com',
    source: 'web-search',
    status: 'new',
    notes: 'Portal de turismo rural y ecoturismo en Canarias. Directorio de actividades sostenibles.',
  },
]

async function main() {
  console.log(`\n--- Scrape Rural & Eco-Tourism Businesses --- Web Search Results`)
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

  // Summary by subcategory
  const bySub = newLeads.reduce((acc, l) => {
    acc[l.subcategory] = (acc[l.subcategory] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  console.log(`\n--- By subcategory:`)
  for (const [sub, count] of Object.entries(bySub)) {
    console.log(`   ${sub}: ${count}`)
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
