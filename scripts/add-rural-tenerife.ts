/**
 * Script to add comprehensive rural Tenerife content
 * Adds: Hiking trails, Natural pools, Viewpoints (new subcategory + items), Rural villages
 * Run with: npx tsx scripts/add-rural-tenerife.ts
 */

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://sqesgghvaazyajzjkoap.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxZXNnZ2h2YWF6eWFqemprb2FwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzUxMzgwOSwiZXhwIjoyMDg5MDg5ODA5fQ.UvbRfWU9seJPT9lyCyLmpD4uZrP9jXzsNoeSAjT9HnI'
)

// --- Helpers ---

async function getCategoryId(slug: string): Promise<string> {
  const { data, error } = await supabase.from('categories').select('id').eq('slug', slug).single()
  if (error) throw new Error(`Category "${slug}" not found: ${error.message}`)
  return data.id
}

async function getSubcategoryId(categorySlug: string, subSlug: string): Promise<string> {
  const catId = await getCategoryId(categorySlug)
  const { data, error } = await supabase.from('subcategories').select('id').eq('category_id', catId).eq('slug', subSlug).single()
  if (error) throw new Error(`Subcategory "${categorySlug}/${subSlug}" not found: ${error.message}`)
  return data.id
}

async function getAreaId(slug: string): Promise<string> {
  const { data, error } = await supabase.from('areas').select('id').eq('slug', slug).single()
  if (error) throw new Error(`Area "${slug}" not found: ${error.message}`)
  return data.id
}

async function upsertItems(items: any[]) {
  const { error } = await supabase.from('items').upsert(items, { onConflict: 'subcategory_id,slug' })
  if (error) throw new Error(`Items upsert failed: ${error.message}`)
}

async function upsertSubcategory(sub: any): Promise<string> {
  const { data, error } = await supabase.from('subcategories').upsert(sub, { onConflict: 'category_id,slug' }).select('id').single()
  if (error) throw new Error(`Subcategory upsert failed: ${error.message}`)
  return data.id
}

// --- Main ---

async function main() {
  console.log('=== Adding Rural Tenerife Content ===\n')

  // --- Load areas ---
  console.log('Loading areas...')
  const [anaga, teide, losGigantes, puertoCruz] = await Promise.all([
    getAreaId('anaga'),
    getAreaId('teide'),
    getAreaId('los-gigantes'),
    getAreaId('puerto-de-la-cruz'),
  ])
  console.log('Areas loaded\n')

  // --- Load existing subcategories ---
  console.log('Loading subcategories...')
  const [hikingTrailsId, naturalPoolsId, historicTownsId] = await Promise.all([
    getSubcategoryId('nature', 'hiking-trails'),
    getSubcategoryId('nature', 'natural-pools'),
    getSubcategoryId('culture', 'historic-towns'),
  ])
  console.log('Subcategories loaded\n')

  // --- Create "miradores" subcategory under nature ---
  console.log('Creating miradores subcategory...')
  const natureCatId = await getCategoryId('nature')
  const miradoresId = await upsertSubcategory({
    category_id: natureCatId,
    slug: 'miradores',
    name: { es: 'Miradores', en: 'Viewpoints' },
    description: {
      es: 'Los mejores miradores de Tenerife con vistas espectaculares a los paisajes volcánicos, valles y el océano Atlántico.',
      en: 'The best viewpoints in Tenerife with spectacular views of volcanic landscapes, valleys and the Atlantic Ocean.',
    },
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    sort_order: 4,
    visible: true,
  })
  console.log(`Miradores subcategory created/updated: ${miradoresId}\n`)

  // =============================================
  // HIKING TRAILS (nature/hiking-trails)
  // =============================================
  console.log('Adding hiking trail items...')
  await upsertItems([
    {
      subcategory_id: hikingTrailsId,
      slug: 'sendero-los-sentidos-anaga',
      name: {
        es: 'Sendero de los Sentidos, Anaga',
        en: 'Trail of the Senses, Anaga',
      },
      description: {
        es: 'Sendero fácil e interpretativo que recorre el corazón del bosque de laurisilva en el Parque Rural de Anaga. Perfecto para familias, el camino está adaptado y señalizado con paneles que explican la flora y fauna endémica. Caminarás entre árboles centenarios cubiertos de musgo, helechos gigantes y una niebla mágica que envuelve el bosque. Una experiencia sensorial única en uno de los últimos reductos de laurisilva del mundo.',
        en: 'Easy interpretive trail through the heart of the laurel forest in the Anaga Rural Park. Perfect for families, the path is adapted and signposted with panels explaining the endemic flora and fauna. You will walk among centuries-old moss-covered trees, giant ferns and a magical mist that envelops the forest. A unique sensory experience in one of the last laurel forest refuges in the world.',
      },
      short_description: {
        es: 'Sendero fácil por el bosque de laurisilva de Anaga, ideal para familias',
        en: 'Easy trail through the Anaga laurel forest, perfect for families',
      },
      image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80',
      location: { es: 'Parque Rural de Anaga', en: 'Anaga Rural Park' },
      area_id: anaga,
      coordinates: { lat: 28.5340, lng: -16.2700 },
      rating: 4.7,
      review_count: 890,
      price_from: 0,
      currency: 'EUR',
      duration: '1.5 hours',
      bookable: false,
      featured: true,
      sort_order: 1,
      visible: true,
    },
    {
      subcategory_id: hikingTrailsId,
      slug: 'ruta-arenas-negras-teide',
      name: {
        es: 'Ruta de las Arenas Negras, Teide',
        en: 'Black Sand Route, Teide',
      },
      description: {
        es: 'Impresionante ruta de dificultad media que atraviesa campos de arena volcánica negra en el Parque Nacional del Teide. El paisaje es absolutamente lunar: extensiones de lava, ceniza negra y formas volcánicas caprichosas bajo un cielo intensamente azul. El contraste entre la arena negra y las formaciones rocosas rojizas crea un escenario surrealista. Ideal para fotógrafos y amantes de la geología. Llevar protección solar y agua abundante.',
        en: 'Stunning medium-difficulty route crossing fields of volcanic black sand in the Teide National Park. The landscape is absolutely lunar: stretches of lava, black ash and whimsical volcanic formations under an intensely blue sky. The contrast between the black sand and reddish rock formations creates a surreal setting. Ideal for photographers and geology lovers. Bring sun protection and plenty of water.',
      },
      short_description: {
        es: 'Camina sobre arena volcánica negra en un paisaje lunar del Teide',
        en: 'Walk on volcanic black sand in a lunar landscape at Teide',
      },
      image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80',
      location: { es: 'Parque Nacional del Teide', en: 'Teide National Park' },
      area_id: teide,
      coordinates: { lat: 28.2720, lng: -16.6430 },
      rating: 4.6,
      review_count: 520,
      price_from: 0,
      currency: 'EUR',
      duration: '3 hours',
      bookable: false,
      featured: true,
      sort_order: 2,
      visible: true,
    },
    {
      subcategory_id: hikingTrailsId,
      slug: 'camino-real-guimar-fasnia',
      name: {
        es: 'Camino Real Güímar-Fasnia',
        en: 'Royal Road Güímar-Fasnia',
      },
      description: {
        es: 'Histórico camino real que conectaba los pueblos de Güímar y Fasnia a lo largo de la costa sureste de Tenerife. Este sendero de dificultad media sigue los antiguos caminos empedrados que utilizaban los lugareños antes de la construcción de carreteras. Atraviesa barrancos secos, zonas de tabaibal y cardonal, con vistas constantes al océano Atlántico. Un recorrido cargado de historia donde podrás imaginar la vida rural de la isla hace siglos.',
        en: 'Historic royal road that connected the towns of Güímar and Fasnia along the southeast coast of Tenerife. This medium-difficulty trail follows the ancient cobblestone paths used by locals before roads were built. It crosses dry ravines, succulent shrublands, with constant Atlantic Ocean views. A history-filled route where you can imagine the island\'s rural life centuries ago.',
      },
      short_description: {
        es: 'Antiguo camino real a lo largo de la costa sureste con vistas al mar',
        en: 'Historic royal road along the southeast coast with ocean views',
      },
      image: 'https://images.unsplash.com/photo-1501555088652-021d04e8abcb?w=800&q=80',
      location: { es: 'Güímar - Fasnia', en: 'Güímar - Fasnia' },
      area_id: null,
      coordinates: { lat: 28.2900, lng: -16.4100 },
      rating: 4.4,
      review_count: 310,
      price_from: 0,
      currency: 'EUR',
      duration: '4 hours',
      bookable: false,
      featured: false,
      sort_order: 3,
      visible: true,
    },
    {
      subcategory_id: hikingTrailsId,
      slug: 'sendero-teno-alto',
      name: {
        es: 'Sendero de Teno Alto',
        en: 'Teno Alto Trail',
      },
      description: {
        es: 'Ruta remota de dificultad media por las montañas del macizo de Teno, en el extremo occidental de Tenerife. El sendero recorre paisajes rurales con antiguas fincas de pastoreo, muros de piedra seca y una vegetación única. Las vistas son extraordinarias: desde la cima se divisa la isla de La Gomera flotando en el Atlántico, los acantilados de Los Gigantes y el valle de Masca. Una de las caminatas más auténticas y alejadas del turismo masivo.',
        en: 'Remote medium-difficulty route through the Teno mountain range in western Tenerife. The trail crosses rural landscapes with old farming estates, dry stone walls and unique vegetation. The views are extraordinary: from the summit you can see La Gomera island floating in the Atlantic, the Los Gigantes cliffs and the Masca valley. One of the most authentic and off-the-beaten-path hikes on the island.',
      },
      short_description: {
        es: 'Ruta remota en el oeste con vistas espectaculares a La Gomera',
        en: 'Remote western trail with spectacular views of La Gomera',
      },
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
      location: { es: 'Teno, Buenavista del Norte', en: 'Teno, Buenavista del Norte' },
      area_id: losGigantes,
      coordinates: { lat: 28.3420, lng: -16.8660 },
      rating: 4.7,
      review_count: 280,
      price_from: 0,
      currency: 'EUR',
      duration: '3 hours',
      bookable: false,
      featured: true,
      sort_order: 4,
      visible: true,
    },
    {
      subcategory_id: hikingTrailsId,
      slug: 'circular-erjos-santiago',
      name: {
        es: 'Circular de Erjos',
        en: 'Erjos Circular Trail',
      },
      description: {
        es: 'Ruta circular de dificultad media-alta que conecta la zona de Erjos con Santiago del Teide a través de las montañas de Teno. El sendero pasa por bosques de pinos canarios, zonas de cumbre con vistas panorámicas y desciende por barrancos espectaculares. Es una de las rutas más completas de Tenerife porque combina bosque, montaña y paisaje volcánico en un solo recorrido. Requiere buena condición física y calzado adecuado.',
        en: 'Medium-hard circular route connecting the Erjos area with Santiago del Teide through the Teno mountains. The trail passes through Canarian pine forests, summit areas with panoramic views and descends through spectacular ravines. One of the most complete routes in Tenerife, combining forest, mountain and volcanic landscape in a single trail. Requires good fitness and appropriate footwear.',
      },
      short_description: {
        es: 'Circular de montaña que conecta Teno con Santiago del Teide',
        en: 'Mountain circular connecting Teno with Santiago del Teide',
      },
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
      location: { es: 'Erjos - Santiago del Teide', en: 'Erjos - Santiago del Teide' },
      area_id: losGigantes,
      coordinates: { lat: 28.3100, lng: -16.8200 },
      rating: 4.5,
      review_count: 195,
      price_from: 0,
      currency: 'EUR',
      duration: '4 hours',
      bookable: false,
      featured: false,
      sort_order: 5,
      visible: true,
    },
    {
      subcategory_id: hikingTrailsId,
      slug: 'ruta-agua-garcia',
      name: {
        es: 'Bosque de Agua García',
        en: 'Agua García Forest',
      },
      description: {
        es: 'Paseo fácil por uno de los bosques escondidos más hermosos de Tenerife, cerca de Tacoronte. El Bosque de Agua García es un reducto de laurisilva y fayal-brezal con árboles centenarios de troncos retorcidos cubiertos de líquenes y musgos. El sendero circular es accesible para todos los niveles y está rodeado de una vegetación exuberante. Una joya desconocida incluso para muchos residentes de la isla.',
        en: 'Easy walk through one of the most beautiful hidden forests in Tenerife, near Tacoronte. The Agua García Forest is a remnant of laurel and heath forest with centuries-old trees featuring twisted trunks covered in lichens and mosses. The circular trail is accessible for all levels and surrounded by lush vegetation. A hidden gem unknown even to many island residents.',
      },
      short_description: {
        es: 'Bosque escondido con árboles centenarios cerca de Tacoronte',
        en: 'Hidden forest with ancient trees near Tacoronte',
      },
      image: 'https://images.unsplash.com/photo-1440581572325-0bea30075d9d?w=800&q=80',
      location: { es: 'Tacoronte', en: 'Tacoronte' },
      area_id: null,
      coordinates: { lat: 28.4680, lng: -16.4230 },
      rating: 4.6,
      review_count: 410,
      price_from: 0,
      currency: 'EUR',
      duration: '2 hours',
      bookable: false,
      featured: false,
      sort_order: 6,
      visible: true,
    },
    {
      subcategory_id: hikingTrailsId,
      slug: 'sendero-chinobre-anaga',
      name: {
        es: 'Sendero del Chinobre, Anaga',
        en: 'Chinobre Trail, Anaga',
      },
      description: {
        es: 'Ruta de dificultad media que asciende hasta el Chinobre, el punto más alto del macizo de Anaga a 1024 metros de altitud. Desde la cima se obtienen vistas de 360 grados absolutamente espectaculares: ambas costas de Tenerife, Santa Cruz, La Laguna, el Teide nevado al fondo y en días claros las islas de Gran Canaria, La Gomera y La Palma. El camino atraviesa bosque de laurisilva y zonas de brezos antes de alcanzar la cumbre despejada.',
        en: 'Medium-difficulty route ascending to Chinobre, the highest point of the Anaga massif at 1,024 meters altitude. From the summit you get absolutely spectacular 360-degree views: both coasts of Tenerife, Santa Cruz, La Laguna, snow-capped Teide in the background and on clear days the islands of Gran Canaria, La Gomera and La Palma. The path crosses laurel forest and heathland before reaching the open summit.',
      },
      short_description: {
        es: 'Punto más alto de Anaga con vistas de 360° a ambas costas',
        en: 'Highest point of Anaga with 360° views of both coasts',
      },
      image: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&q=80',
      location: { es: 'Anaga', en: 'Anaga' },
      area_id: anaga,
      coordinates: { lat: 28.5390, lng: -16.2530 },
      rating: 4.8,
      review_count: 340,
      price_from: 0,
      currency: 'EUR',
      duration: '2 hours',
      bookable: false,
      featured: true,
      sort_order: 7,
      visible: true,
    },
    {
      subcategory_id: hikingTrailsId,
      slug: 'ruta-taganana-benijo',
      name: {
        es: 'Ruta Taganana-Benijo',
        en: 'Taganana to Benijo Route',
      },
      description: {
        es: 'Paseo costero fácil que conecta el pueblo pesquero de Taganana con la famosa playa de Benijo, una de las más fotografiadas de Tenerife. El camino desciende suavemente entre terrazas de cultivo abandonadas, plataneras y dragos hasta llegar a la playa salvaje de arena negra con los icónicos Roques de Benijo emergiendo del océano. Al atardecer, las vistas son absolutamente mágicas. Ideal para combinar con una comida de pescado fresco en Taganana.',
        en: 'Easy coastal walk connecting the fishing village of Taganana with the famous Benijo beach, one of the most photographed in Tenerife. The path gently descends through abandoned crop terraces, banana plants and dragon trees until reaching the wild black sand beach with the iconic Roques de Benijo rising from the ocean. At sunset, the views are absolutely magical. Ideal to combine with a fresh fish meal in Taganana.',
      },
      short_description: {
        es: 'Paseo costero desde Taganana a la famosa playa de Benijo',
        en: 'Coastal walk from Taganana to the famous Benijo beach',
      },
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
      location: { es: 'Taganana - Benijo, Anaga', en: 'Taganana - Benijo, Anaga' },
      area_id: anaga,
      coordinates: { lat: 28.5560, lng: -16.2040 },
      rating: 4.7,
      review_count: 620,
      price_from: 0,
      currency: 'EUR',
      duration: '1.5 hours',
      bookable: false,
      featured: true,
      sort_order: 8,
      visible: true,
    },
  ])
  console.log('Hiking trail items added (8)\n')

  // =============================================
  // NATURAL POOLS (nature/natural-pools)
  // =============================================
  console.log('Adding natural pool items...')
  await upsertItems([
    {
      subcategory_id: naturalPoolsId,
      slug: 'charco-la-laja-san-juan-rambla',
      name: {
        es: 'Charco de La Laja, San Juan de la Rambla',
        en: 'La Laja Rock Pool, San Juan de la Rambla',
      },
      description: {
        es: 'Espectacular piscina natural encajada entre formaciones de lava volcánica en la costa norte de Tenerife, con un impresionante telón de fondo de montañas verdes que caen al mar. El charco es de los más fotografiados de la isla gracias a su combinación de agua cristalina turquesa, roca negra volcánica y vegetación subtropical. El acceso es relativamente fácil y hay una pequeña zona para tomar el sol. Mejor visitarla con marea baja y mar en calma.',
        en: 'Spectacular natural pool nestled between volcanic lava formations on the north coast of Tenerife, with a stunning backdrop of green mountains plunging into the sea. One of the most photographed pools on the island thanks to its combination of crystal-clear turquoise water, black volcanic rock and subtropical vegetation. Access is relatively easy with a small sunbathing area. Best visited at low tide and calm sea.',
      },
      short_description: {
        es: 'Piscina natural espectacular con montañas verdes de fondo',
        en: 'Stunning natural pool with green mountain backdrop',
      },
      image: 'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?w=800&q=80',
      location: { es: 'San Juan de la Rambla', en: 'San Juan de la Rambla' },
      area_id: null,
      coordinates: { lat: 28.3920, lng: -16.6210 },
      rating: 4.8,
      review_count: 560,
      price_from: 0,
      currency: 'EUR',
      bookable: false,
      featured: true,
      sort_order: 1,
      visible: true,
    },
    {
      subcategory_id: naturalPoolsId,
      slug: 'piscinas-mesa-del-mar',
      name: {
        es: 'Piscinas de Mesa del Mar, Tacoronte',
        en: 'Mesa del Mar Pools, Tacoronte',
      },
      description: {
        es: 'Piscinas naturales oceánicas escondidas en el diminuto núcleo costero de Mesa del Mar, perteneciente a Tacoronte. Un lugar secreto que pocos turistas conocen, donde las piscinas de roca volcánica se llenan con agua del océano Atlántico. El entorno es mágico: un pequeño pueblo encajado entre acantilados con casas de colores y un ambiente tranquilo y local. Hay un pequeño restaurante junto a las piscinas. Acceso por una carretera estrecha y serpenteante.',
        en: 'Hidden ocean rock pools in the tiny coastal settlement of Mesa del Mar, belonging to Tacoronte. A secret spot few tourists know about, where volcanic rock pools fill with Atlantic Ocean water. The setting is magical: a small village squeezed between cliffs with colorful houses and a quiet, local atmosphere. There is a small restaurant by the pools. Access via a narrow, winding road.',
      },
      short_description: {
        es: 'Piscinas oceánicas secretas en un pueblo costero escondido',
        en: 'Secret ocean pools in a hidden coastal village',
      },
      image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&q=80',
      location: { es: 'Mesa del Mar, Tacoronte', en: 'Mesa del Mar, Tacoronte' },
      area_id: null,
      coordinates: { lat: 28.4920, lng: -16.3950 },
      rating: 4.5,
      review_count: 320,
      price_from: 0,
      currency: 'EUR',
      bookable: false,
      featured: false,
      sort_order: 2,
      visible: true,
    },
    {
      subcategory_id: naturalPoolsId,
      slug: 'charco-los-chochos-anaga',
      name: {
        es: 'Charco de Los Chochos, Anaga',
        en: 'Los Chochos Rock Pool, Anaga',
      },
      description: {
        es: 'Piscina natural remota solo accesible a través de una ruta de senderismo desde el caserío de Chinamada en el macizo de Anaga. El charco se encuentra en una cala aislada rodeada de acantilados dramáticos y vegetación endémica. La caminata de ida tiene un desnivel considerable y requiere buena condición física, pero la recompensa es un baño en aguas cristalinas en un entorno completamente salvaje y virgen. Llevar agua, comida y calzado de montaña.',
        en: 'Remote natural pool only accessible via a hiking trail from the hamlet of Chinamada in the Anaga massif. The pool sits in an isolated cove surrounded by dramatic cliffs and endemic vegetation. The one-way hike has considerable elevation change and requires good fitness, but the reward is a swim in crystal-clear waters in a completely wild and pristine setting. Bring water, food and hiking boots.',
      },
      short_description: {
        es: 'Piscina natural remota solo accesible por sendero en Anaga',
        en: 'Remote natural pool only accessible by hiking in Anaga',
      },
      image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80',
      location: { es: 'Chinamada, Anaga', en: 'Chinamada, Anaga' },
      area_id: anaga,
      coordinates: { lat: 28.5680, lng: -16.2870 },
      rating: 4.9,
      review_count: 180,
      price_from: 0,
      currency: 'EUR',
      bookable: false,
      featured: true,
      sort_order: 3,
      visible: true,
    },
  ])
  console.log('Natural pool items added (3)\n')

  // =============================================
  // VIEWPOINTS (nature/miradores)
  // =============================================
  console.log('Adding viewpoint items...')
  await upsertItems([
    {
      subcategory_id: miradoresId,
      slug: 'mirador-cruz-carmen',
      name: {
        es: 'Mirador Cruz del Carmen, Anaga',
        en: 'Cruz del Carmen Viewpoint, Anaga',
      },
      description: {
        es: 'Uno de los miradores más accesibles y visitados del macizo de Anaga, situado a 920 metros de altitud junto al centro de visitantes del Parque Rural. Ofrece vistas panorámicas espectaculares sobre la bóveda verde de laurisilva, con la ciudad de Santa Cruz de Tenerife y el puerto al fondo. En días claros se divisan las islas de Gran Canaria y Fuerteventura. Punto de partida del Sendero de los Sentidos y de varias rutas de senderismo. Parking y zona de recreo disponibles.',
        en: 'One of the most accessible and visited viewpoints in the Anaga massif, located at 920 meters altitude next to the Rural Park visitor center. Offers spectacular panoramic views over the green laurel forest canopy, with the city of Santa Cruz de Tenerife and the port in the background. On clear days you can see the islands of Gran Canaria and Fuerteventura. Starting point of the Trail of the Senses and several hiking routes. Parking and picnic area available.',
      },
      short_description: {
        es: 'Vistas sobre la laurisilva y Santa Cruz desde el corazón de Anaga',
        en: 'Views over the laurel forest and Santa Cruz from the heart of Anaga',
      },
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
      location: { es: 'Anaga', en: 'Anaga' },
      area_id: anaga,
      coordinates: { lat: 28.5310, lng: -16.2750 },
      rating: 4.6,
      review_count: 1120,
      price_from: 0,
      currency: 'EUR',
      bookable: false,
      featured: true,
      sort_order: 1,
      visible: true,
    },
    {
      subcategory_id: miradoresId,
      slug: 'mirador-pico-ingles',
      name: {
        es: 'Mirador del Pico del Inglés, Anaga',
        en: 'Pico del Inglés Viewpoint, Anaga',
      },
      description: {
        es: 'Considerado el mirador más espectacular de todo el macizo de Anaga, el Pico del Inglés se eleva a más de 900 metros sobre el nivel del mar y ofrece vistas simultáneas de ambas costas de Tenerife. Desde su plataforma se contempla la vertiente norte con sus barrancos verdes cayendo al mar, y la vertiente sur con Santa Cruz y la costa semiárida. El Teide preside el horizonte al oeste. Un lugar que quita el aliento, especialmente al amanecer cuando el mar de nubes se forma bajo tus pies.',
        en: 'Considered the most spectacular viewpoint in the entire Anaga massif, Pico del Inglés rises over 900 meters above sea level and offers simultaneous views of both Tenerife coasts. From its platform you can contemplate the north side with its green ravines plunging into the sea, and the south side with Santa Cruz and the semi-arid coast. Teide presides over the western horizon. A breathtaking spot, especially at sunrise when the sea of clouds forms beneath your feet.',
      },
      short_description: {
        es: 'El mirador más espectacular de Anaga con vistas a ambas costas',
        en: 'The most spectacular Anaga viewpoint with views of both coasts',
      },
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      location: { es: 'Anaga', en: 'Anaga' },
      area_id: anaga,
      coordinates: { lat: 28.5280, lng: -16.2620 },
      rating: 4.9,
      review_count: 870,
      price_from: 0,
      currency: 'EUR',
      bookable: false,
      featured: true,
      sort_order: 2,
      visible: true,
    },
    {
      subcategory_id: miradoresId,
      slug: 'mirador-de-cherfe',
      name: {
        es: 'Mirador de Cherfe',
        en: 'Cherfe Viewpoint',
      },
      description: {
        es: 'Mirador situado en la carretera TF-436 que desciende hacia Masca, con vistas impresionantes del valle de Masca y los acantilados de Los Gigantes. Desde aquí se contempla uno de los paisajes más dramáticos de Tenerife: el profundo barranco de Masca encajado entre montañas escarpadas, con el océano Atlántico brillando al fondo. Al atardecer, los colores son extraordinarios. Un punto de parada obligatorio en el camino hacia Masca.',
        en: 'Viewpoint located on the TF-436 road descending toward Masca, with impressive views of the Masca valley and Los Gigantes cliffs. From here you can contemplate one of Tenerife\'s most dramatic landscapes: the deep Masca gorge wedged between rugged mountains, with the Atlantic Ocean shining in the background. At sunset, the colors are extraordinary. A mandatory stop on the way to Masca.',
      },
      short_description: {
        es: 'Vistas del valle de Masca y los acantilados de Los Gigantes',
        en: 'Views of Masca valley and Los Gigantes cliffs',
      },
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
      location: { es: 'Santiago del Teide', en: 'Santiago del Teide' },
      area_id: losGigantes,
      coordinates: { lat: 28.2980, lng: -16.8350 },
      rating: 4.7,
      review_count: 640,
      price_from: 0,
      currency: 'EUR',
      bookable: false,
      featured: true,
      sort_order: 3,
      visible: true,
    },
    {
      subcategory_id: miradoresId,
      slug: 'mirador-jardina',
      name: {
        es: 'Mirador de La Jardina',
        en: 'La Jardina Viewpoint',
      },
      description: {
        es: 'Magnífico mirador en la entrada del macizo de Anaga que ofrece una vista panorámica completa del Valle de La Orotava con el majestuoso Teide alzándose al fondo. En primer plano se extienden las medianías verdes con cultivos, fincas y pequeños pueblos, mientras el volcán corona el paisaje. Es uno de los mejores lugares de Tenerife para fotografiar el Teide con el valle a sus pies. Accesible en coche con aparcamiento cercano.',
        en: 'Magnificent viewpoint at the entrance to the Anaga massif offering a complete panoramic view of the Orotava Valley with the majestic Teide rising in the background. In the foreground, green mid-altitude farmlands extend with crops, estates and small villages, while the volcano crowns the landscape. One of the best places in Tenerife to photograph Teide with the valley at its feet. Accessible by car with nearby parking.',
      },
      short_description: {
        es: 'Vista panorámica del Valle de La Orotava con el Teide al fondo',
        en: 'Panoramic view of the Orotava Valley with Teide in the background',
      },
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
      location: { es: 'La Laguna - Anaga', en: 'La Laguna - Anaga' },
      area_id: anaga,
      coordinates: { lat: 28.5180, lng: -16.3020 },
      rating: 4.5,
      review_count: 390,
      price_from: 0,
      currency: 'EUR',
      bookable: false,
      featured: false,
      sort_order: 4,
      visible: true,
    },
    {
      subcategory_id: miradoresId,
      slug: 'mirador-don-martin',
      name: {
        es: 'Mirador de Don Martín, La Orotava',
        en: 'Don Martín Viewpoint, La Orotava',
      },
      description: {
        es: 'Precioso mirador en las alturas de La Orotava con vistas panorámicas hacia Puerto de la Cruz, la costa norte y el océano Atlántico. Desde aquí se aprecia toda la extensión del Valle de La Orotava descendiendo hasta el mar, con las plataneras, los jardines botánicos y la costa urbanizada. Es un lugar tranquilo y poco visitado por turistas, ideal para contemplar la puesta de sol cuando el cielo se tiñe de naranja sobre el Atlántico.',
        en: 'Beautiful viewpoint in the heights of La Orotava with panoramic views toward Puerto de la Cruz, the north coast and the Atlantic Ocean. From here you can appreciate the full extent of the Orotava Valley descending to the sea, with banana plantations, botanical gardens and the urbanized coast. A quiet spot rarely visited by tourists, ideal for watching the sunset when the sky turns orange over the Atlantic.',
      },
      short_description: {
        es: 'Vistas panorámicas de Puerto de la Cruz y la costa norte',
        en: 'Panoramic views of Puerto de la Cruz and the north coast',
      },
      image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&q=80',
      location: { es: 'La Orotava', en: 'La Orotava' },
      area_id: puertoCruz,
      coordinates: { lat: 28.3960, lng: -16.5230 },
      rating: 4.4,
      review_count: 270,
      price_from: 0,
      currency: 'EUR',
      bookable: false,
      featured: false,
      sort_order: 5,
      visible: true,
    },
    {
      subcategory_id: miradoresId,
      slug: 'mirador-de-masca',
      name: {
        es: 'Mirador de Masca',
        en: 'Masca Viewpoint',
      },
      description: {
        es: 'El mirador más icónico de Tenerife, con vistas al pueblo de Masca encajado dramáticamente en un profundo barranco a 650 metros de altitud. El pueblo, con sus casas de piedra aferradas a los riscos, parece sacado de un cuento. El barranco desciende hasta el océano entre paredes verticales de roca. Es el mirador más fotografiado del oeste de Tenerife y una parada imprescindible. Mejor visitarlo temprano por la mañana o al atardecer para evitar las masas de turistas.',
        en: 'Tenerife\'s most iconic viewpoint, overlooking the village of Masca dramatically wedged into a deep gorge at 650 meters altitude. The village, with its stone houses clinging to cliff faces, seems straight out of a fairy tale. The gorge descends to the ocean between vertical rock walls. The most photographed viewpoint in western Tenerife and an essential stop. Best visited early morning or at sunset to avoid tourist crowds.',
      },
      short_description: {
        es: 'Vista icónica del pueblo escondido de Masca en el barranco',
        en: 'Iconic view of the hidden village of Masca in the gorge',
      },
      image: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=800&q=80',
      location: { es: 'Masca, Santiago del Teide', en: 'Masca, Santiago del Teide' },
      area_id: losGigantes,
      coordinates: { lat: 28.2920, lng: -16.8410 },
      rating: 4.8,
      review_count: 1540,
      price_from: 0,
      currency: 'EUR',
      bookable: false,
      featured: true,
      sort_order: 6,
      visible: true,
    },
    {
      subcategory_id: miradoresId,
      slug: 'mirador-san-pedro',
      name: {
        es: 'Mirador de San Pedro',
        en: 'San Pedro Viewpoint',
      },
      description: {
        es: 'Encantador mirador en las medianías del Valle de La Orotava con vistas al verde valle, las plantaciones de plátanos que descienden hacia la costa y el océano Atlántico al fondo. Este mirador es menos conocido que otros pero ofrece una perspectiva única del paisaje agrícola tradicional de Tenerife. Las terrazas de cultivo, los invernaderos de plátanos y los pequeños pueblos crean un mosaico de colores verdes que contrasta con el azul del mar. Ideal para una parada tranquila.',
        en: 'Charming viewpoint in the mid-altitude area of the Orotava Valley with views of the green valley, banana plantations descending toward the coast and the Atlantic Ocean in the background. This viewpoint is less known than others but offers a unique perspective of Tenerife\'s traditional agricultural landscape. Crop terraces, banana greenhouses and small villages create a mosaic of greens contrasting with the blue sea. Ideal for a quiet stop.',
      },
      short_description: {
        es: 'Vistas del verde Valle de La Orotava y las plataneras',
        en: 'Views of the green Orotava Valley and banana plantations',
      },
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80',
      location: { es: 'La Orotava', en: 'La Orotava' },
      area_id: puertoCruz,
      coordinates: { lat: 28.3880, lng: -16.5160 },
      rating: 4.3,
      review_count: 210,
      price_from: 0,
      currency: 'EUR',
      bookable: false,
      featured: false,
      sort_order: 7,
      visible: true,
    },
  ])
  console.log('Viewpoint items added (7)\n')

  // =============================================
  // RURAL VILLAGES (culture/historic-towns)
  // =============================================
  console.log('Adding rural village items...')
  await upsertItems([
    {
      subcategory_id: historicTownsId,
      slug: 'masca-village',
      name: {
        es: 'Masca',
        en: 'Masca',
      },
      description: {
        es: 'El pueblo más famoso y espectacular de Tenerife, enclavado en un profundo barranco del macizo de Teno a 650 metros de altitud. Con apenas 90 habitantes, Masca es un laberinto de casas de piedra tradicionales aferradas a las laderas de montañas escarpadas. Hasta los años 60 solo era accesible a pie o en burro. Hoy es el punto de inicio del famoso barranco de Masca que desciende hasta el mar. El pueblo conserva un encanto rural auténtico con restaurantes locales donde probar comida canaria con vistas de vértigo.',
        en: 'The most famous and spectacular village in Tenerife, nestled in a deep gorge of the Teno massif at 650 meters altitude. With barely 90 inhabitants, Masca is a labyrinth of traditional stone houses clinging to the slopes of rugged mountains. Until the 1960s it was only accessible on foot or by donkey. Today it is the starting point of the famous Masca gorge hike descending to the sea. The village retains authentic rural charm with local restaurants where you can try Canarian food with vertigo-inducing views.',
      },
      short_description: {
        es: 'El pueblo escondido más famoso de Tenerife, con 90 habitantes',
        en: 'Tenerife\'s most famous hidden village, with 90 inhabitants',
      },
      image: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=800&q=80',
      location: { es: 'Santiago del Teide', en: 'Santiago del Teide' },
      area_id: losGigantes,
      coordinates: { lat: 28.2920, lng: -16.8400 },
      rating: 4.8,
      review_count: 2340,
      price_from: 0,
      currency: 'EUR',
      bookable: false,
      featured: true,
      sort_order: 10,
      visible: true,
    },
    {
      subcategory_id: historicTownsId,
      slug: 'taganana-village',
      name: {
        es: 'Taganana',
        en: 'Taganana',
      },
      description: {
        es: 'Pueblo pesquero remoto en el corazón de Anaga, rodeado de montañas verdes con terrazas de viñedos que producen un vino único. Taganana es uno de los asentamientos más antiguos de Tenerife tras la conquista, con una iglesia del siglo XVI que alberga un tríptico flamenco del XV. El pueblo se extiende por las laderas de un barranco con casas blancas y huertos. Los restaurantes locales sirven pescado fresco recién capturado. Desde aquí se accede a las playas salvajes de Benijo, Almáciga y Roque de las Bodegas.',
        en: 'Remote fishing village in the heart of Anaga, surrounded by green mountains with vineyard terraces producing a unique wine. Taganana is one of the oldest post-conquest settlements in Tenerife, with a 16th-century church housing a 15th-century Flemish triptych. The village spreads across the slopes of a ravine with white houses and orchards. Local restaurants serve freshly caught fish. From here you can access the wild beaches of Benijo, Almáciga and Roque de las Bodegas.',
      },
      short_description: {
        es: 'Pueblo pesquero remoto con viñedos e iglesia del siglo XVI',
        en: 'Remote fishing village with vineyards and a 16th-century church',
      },
      image: 'https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=800&q=80',
      location: { es: 'Anaga', en: 'Anaga' },
      area_id: anaga,
      coordinates: { lat: 28.5570, lng: -16.2100 },
      rating: 4.6,
      review_count: 890,
      price_from: 0,
      currency: 'EUR',
      bookable: false,
      featured: true,
      sort_order: 11,
      visible: true,
    },
    {
      subcategory_id: historicTownsId,
      slug: 'chirche-village',
      name: {
        es: 'Chirche',
        en: 'Chirche',
      },
      description: {
        es: 'Pequeño pueblo de montaña en el municipio de Guía de Isora, a unos 1000 metros de altitud, que conserva intacta la arquitectura tradicional canaria de piedra y teja. Chirche es el punto de partida de varias rutas de senderismo por los bosques de pino canario y los barrancos del suroeste de Tenerife. El pueblo tiene un ambiente tranquilo y atemporal, con vecinos que mantienen huertos tradicionales y una ermita encalada. Un rincón de la Tenerife rural que parece haberse detenido en el tiempo.',
        en: 'Small mountain village in the municipality of Guía de Isora, at about 1,000 meters altitude, preserving intact the traditional Canarian stone and tile architecture. Chirche is the starting point for several hiking routes through Canarian pine forests and the ravines of southwestern Tenerife. The village has a quiet and timeless atmosphere, with residents maintaining traditional orchards and a whitewashed chapel. A corner of rural Tenerife that seems frozen in time.',
      },
      short_description: {
        es: 'Pueblo de montaña con arquitectura tradicional y rutas de senderismo',
        en: 'Mountain village with traditional architecture and hiking trails',
      },
      image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&q=80',
      location: { es: 'Guía de Isora', en: 'Guía de Isora' },
      area_id: null,
      coordinates: { lat: 28.2300, lng: -16.7850 },
      rating: 4.3,
      review_count: 145,
      price_from: 0,
      currency: 'EUR',
      bookable: false,
      featured: false,
      sort_order: 12,
      visible: true,
    },
    {
      subcategory_id: historicTownsId,
      slug: 'teno-alto-village',
      name: {
        es: 'Teno Alto',
        en: 'Teno Alto',
      },
      description: {
        es: 'Caserío al final de la carretera en las montañas de Teno, uno de los lugares más remotos y auténticos de Tenerife. Teno Alto es una comunidad de pastores de cabras que mantiene un modo de vida tradicional casi intacto. Las casas de piedra se dispersan entre prados donde pastan las cabras cuyo queso es famoso en toda la isla. El paisaje es dramático: montañas escarpadas, barrancos profundos y vistas al océano y a La Gomera. Punto de partida de senderos hacia la costa y el faro de Teno.',
        en: 'Hamlet at the end of the road in the Teno mountains, one of the most remote and authentic places in Tenerife. Teno Alto is a goat herding community that maintains an almost intact traditional way of life. Stone houses are scattered among meadows where goats graze, producing cheese famous across the island. The landscape is dramatic: rugged mountains, deep ravines and views to the ocean and La Gomera. Starting point for trails to the coast and Teno lighthouse.',
      },
      short_description: {
        es: 'Caserío de pastores al final de la carretera en las montañas de Teno',
        en: 'Goat herding hamlet at the end of the road in the Teno mountains',
      },
      image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80',
      location: { es: 'Buenavista del Norte', en: 'Buenavista del Norte' },
      area_id: losGigantes,
      coordinates: { lat: 28.3440, lng: -16.8680 },
      rating: 4.7,
      review_count: 210,
      price_from: 0,
      currency: 'EUR',
      bookable: false,
      featured: true,
      sort_order: 13,
      visible: true,
    },
    {
      subcategory_id: historicTownsId,
      slug: 'afur-village',
      name: {
        es: 'Afur',
        en: 'Afur',
      },
      description: {
        es: 'Pequeño pueblo en el corazón de Anaga, conocido como punto de partida de la espectacular ruta de senderismo que desciende por el barranco hasta la Playa de Tamadite, una de las playas más salvajes y remotas de Tenerife. Afur conserva el encanto rural de Anaga con sus casas tradicionales, huertos en terrazas y una tranquilidad absoluta. El contraste entre el verde intenso de la vegetación y la roca volcánica oscura crea un paisaje de gran belleza.',
        en: 'Small village in the heart of Anaga, known as the starting point for the spectacular hiking trail that descends through the ravine to Playa de Tamadite, one of the wildest and most remote beaches in Tenerife. Afur retains the rural charm of Anaga with its traditional houses, terraced orchards and absolute tranquility. The contrast between the intense green vegetation and dark volcanic rock creates a landscape of great beauty.',
      },
      short_description: {
        es: 'Pueblo de Anaga, inicio de la ruta a la Playa de Tamadite',
        en: 'Anaga village, start of the trail to Playa de Tamadite',
      },
      image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80',
      location: { es: 'Anaga', en: 'Anaga' },
      area_id: anaga,
      coordinates: { lat: 28.5530, lng: -16.2380 },
      rating: 4.5,
      review_count: 320,
      price_from: 0,
      currency: 'EUR',
      bookable: false,
      featured: false,
      sort_order: 14,
      visible: true,
    },
    {
      subcategory_id: historicTownsId,
      slug: 'chamorga-village',
      name: {
        es: 'Chamorga',
        en: 'Chamorga',
      },
      description: {
        es: 'El pueblo más remoto del macizo de Anaga y posiblemente de toda Tenerife. Chamorga es literalmente el final de la carretera: una estrecha y serpenteante vía termina en este caserío donde el tiempo parece haberse detenido. Con apenas unas decenas de vecinos, conserva casas de piedra tradicionales, huertos en terrazas y un modo de vida rural que ha cambiado poco en siglos. Es el punto de partida de senderos espectaculares hacia el Faro de Anaga y las calas salvajes del noreste. La Tenerife más auténtica.',
        en: 'The most remote village in the Anaga massif and arguably in all of Tenerife. Chamorga is literally the end of the road: a narrow, winding road ends at this hamlet where time seems to have stopped. With barely a few dozen residents, it preserves traditional stone houses, terraced orchards and a rural way of life that has changed little in centuries. It is the starting point for spectacular trails to the Anaga Lighthouse and the wild northeast coves. The most authentic Tenerife.',
      },
      short_description: {
        es: 'El pueblo más remoto de Anaga, al final de la carretera',
        en: 'The most remote village in Anaga, at the end of the road',
      },
      image: 'https://images.unsplash.com/photo-1500049242364-5f500807cdd7?w=800&q=80',
      location: { es: 'Anaga', en: 'Anaga' },
      area_id: anaga,
      coordinates: { lat: 28.5720, lng: -16.1720 },
      rating: 4.7,
      review_count: 180,
      price_from: 0,
      currency: 'EUR',
      bookable: false,
      featured: true,
      sort_order: 15,
      visible: true,
    },
  ])
  console.log('Rural village items added (6)\n')

  // --- Summary ---
  console.log('=== Rural Tenerife content addition complete! ===')
  console.log('Added:')
  console.log('  - 1 new subcategory: nature/miradores (Viewpoints)')
  console.log('  - 8 hiking trail items (nature/hiking-trails)')
  console.log('  - 3 natural pool items (nature/natural-pools)')
  console.log('  - 7 viewpoint items (nature/miradores)')
  console.log('  - 6 rural village items (culture/historic-towns)')
  console.log('  Total: 24 items + 1 subcategory')
}

main().catch((err) => {
  console.error('FATAL:', err)
  process.exit(1)
})
