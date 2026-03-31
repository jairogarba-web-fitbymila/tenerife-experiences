# Tenerife Experiences Website

## Comprehensive Inventory Report

March 2026

---

# 1. Executive Summary

Tenerife Experiences is a comprehensive digital platform dedicated to promoting tourist experiences, activities, and services in Tenerife, Canary Islands, Spain. The platform features multilingual content across 6 languages (Spanish, English, German, French, Russian, Italian) with a sophisticated Next.js architecture powered by Supabase database. This report documents all public-facing pages, components, translations, data structures, and CTAs.

# 2. Translation System

## 2.1 Languages Supported

- Spanish (es)
- English (en)
- German (de)
- French (fr)
- Russian (ru)
- Italian (it)

## 2.2 Translation File Location

Path: /src/i18n/messages/es.json

File includes complete Spanish translations for all UI elements, meta tags, navigation, forms, and page-specific content.

# 3. Homepage (/)

## 3.1 Page Structure

### Hero Section

- Full-screen cinematic background image (Unsplash)
- Image URL: https://images.unsplash.com/photo-1605182054023-17d71f44aa11
- Alt text: Vista panoramica del Teide y el paisaje volcanico
- Title: Descubre Tenerife
- Subtitle: Tu guia definitiva de la Isla de la Eterna Primavera
- CTA Button: Explorar Experiencias
- Search Bar: Hero search component (HeroSearchBar)
- Stats: 4.9/5 rating, 150+ beaches, 500+ experiences

### Category Sections (CategorySections Component)

The homepage features 6 major category sections with cinematic imagery and hover effects:

| Category | Image | Label |
|----------|-------|-------|
| Experiences | photo-1713193160430-a4f8fa3e692f | Adventure Awaits |
| Beaches | photo-1605182054023-17d71f44aa11 | Golden Sand & Crystal Waters |
| Culture | photo-1582555172866-f73bb12a2ab3 | Heritage & History |
| Nature | photo-1626033005784-e6c39eaa0669 | Wild & Untamed |
| Food | photo-1506377247377-2a5b3b417ebb | Culinary Delights |
| Nightlife | photo-1470225620780-dba8ba36b745 | After Dark Magic |

### Areas Section

- 4 regional areas with image cards and item counts:
  - South (120+ experiences)
  - North (85+ experiences)
  - West (45+ experiences)
  - Metro/Central (60+ experiences)

### Featured Partners Section

- Displays premium partner businesses
- Component: FeaturedPartners

### Interactive Map Section

- Component: MapSection
- Shows 10 landmark locations with categories (nature, beaches, culture, family)
- Pins include: Teide National Park, Costa Adeje, Los Gigantes, Puerto de la Cruz, Santa Cruz, La Laguna, Anaga, Playa de las Teresitas, Masca, Siam Park

### Newsletter Section

- Component: NewsletterForm
- Title: Recibe Consejos Exclusivos
- Subtitle: Tips semanales, ofertas y secretos locales de Tenerife
- CTA: Suscribirse

# 4. Experiences Page (/experiencias)

Comprehensive showcase of all tourist activities and experiences in Tenerife.

## 4.1 Page Sections

### Hero Section

- Image: photo-1682687220742-aba13b6e50ba
- Badge: Experiencias
- Title: Excursiones y actividades en Tenerife
- Subtitle: Desde el avistamiento de ballenas hasta rutas de senderismo por paisajes volcanicos

### Content Sections

- Top Experiencias (Featured) - 6 items
- Excursiones en Barco (Whale Watching) - 6 items
- Senderismo (Hiking) - 6 items
- Deportes Acuaticos (Water Sports) - 6 items
- Para Familias (Family Theme Parks) - 6 items

### CTA Section

- Title: Listo para tu aventura?
- Button: Reservar ahora
- Button Target: /reservas

## 4.2 Data Source

- Database: Supabase
- Tables queried: items, subcategories, categories
- Filters: visible=true, featured=true/false, category.slug='experiences', subcategory.slug variants
- Ordering: by rating (descending)

# 5. Guides Page (/guias)

## 5.1 Page Sections

### Hero Section

- Image: photo-1605182054023-17d71f44aa11
- Badge: Guias Digitales
- Title: Guias de Tenerife
- Subtitle: Todo lo que necesitas saber, escrito por locales. Descarga nuestras guias en PDF

### Available Guides

- Tenerife Foodie (Status: Coming Soon, 50+ pages, 9.90 EUR)
- Playas & Calas Secretas (Status: Planned, 40+ pages, 7.90 EUR)
- Aventura & Naturaleza (Status: Planned, 40+ pages, 7.90 EUR)
- Tenerife Romantico (Status: Planned, 30+ pages, 5.90 EUR)
- Tenerife con Ninos (Status: Planned, 40+ pages, 7.90 EUR)
- Nightlife & Cultura (Status: Planned, 30+ pages, 5.90 EUR)

### Bundle Section

- Title: La Biblia de Tenerife
- Price: 19.90 EUR (savings: 55% off 44.50 EUR)
- Includes: All 6 guides in one package

### Newsletter/Notify Section

- Component: GuideNotifyForm
- Title: Quieres ser el primero en enterarte?
- CTA: Avisame

# 6. Blog Page (/blog)

## 6.1 Page Structure

### Hero Section

- Title: Blog
- Subtitle: Consejos, guias e inspiracion para tu viaje

### Category Filter Bar

- Sticky positioning (top: 0, z-index: 40)
- "All Articles" default tab
- Dynamic category buttons from published articles

### Masonry Grid

- Displays published articles with featured items (every 3rd item)
- Components per article: category badge, title, excerpt (featured only), published date, read time
- Limited to 20 articles per load

## 6.2 Data Source

- Database: Supabase (articles table)
- Query: articles with category relationships
- Filter: published=true
- Ordering: published_at (descending)

# 7. Areas Page (/areas)

## 7.1 Page Structure

### Hero Section

- Badge: Tenerife
- Title: Explora Tenerife por Zona
- Subtitle: Cada region tiene su propio caracter y atracciones

### Regional Organization

- 5 regions: North, South, West, Central, East
- Color-coded region badges
- Grid of 3 columns per region
- Each area card shows: region badge, name, description, hover effects

# 8. Partners Page (/partners)

Comprehensive partner program page for businesses to promote their services.

## 8.1 Page Sections

### Hero Section

- Badge: Programa de Partners
- Title: Promociona Tu Negocio en Tenerife
- Subtitle: Llega a miles de turistas que visitan Tenerife cada mes
- CTAs: "Ver Planes y Precios" & "Contactar"

### Stats Section

- 50K+ Monthly Visitors
- 120+ Countries Reached
- 5 Languages Available
- 35% Yearly Growth

### Why Partner Section

- Benefit 1: Exposicion Dirigida (Targeted Exposure)
- Benefit 2: Analiticas Detalladas (Detailed Analytics)
- Benefit 3: Alcance en Redes Sociales (Social Media Reach)

### Plans Section

| Plan | Price | Key Features | CTA |
|------|-------|-------------|-----|
| Free | Gratis | Listing, Profile, Map | Empezar |
| Basic (Popular) | $49/mes | + Featured Badge, Analytics, Priority Support | Contactar |
| Premium | $149/mes | + Top Placement, Social Media, Dedicated Manager | Contactar |

### Testimonials Section

- Quote 1: Maria G. (Restaurante La Terraza) - "40% increase in international bookings"
- Quote 2: Hans W. (Surf School) - Analytics dashboard insights
- Quote 3: James P. (Hotel Costa Adeje) - Visibility increase

### Contact Form

- Fields: Name, Email, Business Name, Message
- CTA: Enviar Consulta

# 9. Contact Page (/contacto)

## 9.1 Page Sections

### Hero Section

- Badge: Contacto
- Title: Ponte en contacto
- Subtitle: Estamos aqui para ayudarte. Escribenos y te responderemos lo antes posible.

### Contact Form (2-column layout)

- Fields: Name, Email, Subject, Message
- CTA: Enviar mensaje

### Contact Information Sidebar

- Email: info@tenerifeexperiences.com
- Location: Tenerife, Canary Islands, Spain
- Partner CTA Card: Links to /partners

# 10. Legal Pages

## 10.1 Privacy Policy (/privacidad)

- Last Updated: March 2026
- Data Controller: Jairo Garcia Barroso
- Email: info@tenerifeexperiences.com
- Key Sections: Data Collection, Legal Basis, Data Usage, Third Parties, International Transfers, Data Retention, GDPR Rights
- Third-Party Processors: Google Analytics, Supabase, Vercel, Civitatis, Stripe

## 10.2 Terms of Service (/terminos)

- Last Updated: March 2026
- Owner: Jairo Garcia Barroso
- Activity: Tourism informational platform and sale of digital guides
- Key Sections: Service Description, Digital Products (PDF guides), User Obligations, IP Rights, Liability, Affiliate Links Disclosure, Partner Listings, Dispute Resolution
- Affiliate Relationships: Civitatis (30-day tracking cookies)
- Governing Law: Spain (Santa Cruz de Tenerife courts)

## 10.3 Cookie Policy (/cookies)

- Last Updated: March 2026
- Cookie Types: Essential, Analytics, Preferences
- Specific Cookies:
  - cookie-consent (13 months)
  - _ga, _gid (Google Analytics)
  - te_session_id (Anonymous session)
  - NEXT_LOCALE (Next.js language preference)
- Third-Party Cookies: Google Analytics, Civitatis (30-day affiliate tracking)

# 11. Header and Footer Components

## 11.1 Header

- Logo: TENERIFE (with orange gradient)
- Navigation Links: Experiences, Beaches, Culture, Nature, Food, Nightlife, Blog, Guides
- Language Selector: 6 language buttons (EN, ES, DE, FR, RU, IT)
- Mobile: Hamburger menu with overlay
- Scroll Behavior: Glass morphism effect on scroll

## 11.2 Footer

- About Section with Social Links
  - Instagram, Facebook, Twitter, YouTube, TikTok
- 5-Column Layout:
  - About & Social
  - Categories
  - Quick Links (Areas, Events, Blog, Partners, Advertise)
  - Latest Articles
  - Legal (Privacy, Terms, Cookies, Contact)
- Made in Tenerife Badge with Heart Icon
- Copyright Notice

# 12. Database Structure (Supabase)

## 12.1 Core Tables

### Categories

- Fields: id, slug, icon, image, name (MultiLang), description (MultiLang), sort_order, visible, timestamps

### Subcategories

- Fields: id, category_id, slug, name (MultiLang), description (MultiLang), short_description (MultiLang), image, sort_order, visible

### Items

- Fields: id, subcategory_id, slug, name (MultiLang), description (MultiLang), short_description (MultiLang)
- Image Fields: image (primary), images (array)
- Location: location (MultiLang), area, coordinates (lat/lng)
- Rating: rating (decimal), review_count
- Pricing: price_from (numeric), currency
- Content: highlights (MultiLang array), includes (MultiLang array), duration
- Beach-specific: sand_type, bathing_conditions, accessibility, typical_risk
- Booking: bookable (boolean), booking_url, affiliate_url
- Meta: meta_title (MultiLang), meta_description (MultiLang), visible, featured, sort_order

### Articles

- Fields: id, slug, title (MultiLang), excerpt (MultiLang), content (MultiLang), image
- Meta: category_id, area, tags (array), author
- Publishing: published (boolean), ai_generated (boolean), published_at

### Areas

- Fields: id, slug, name (MultiLang), description (MultiLang), image
- Geography: region ('north'|'south'|'east'|'west'|'central'), coordinates

### Events

- Fields: id, slug, name (MultiLang), description (MultiLang), image
- Event Metadata: event_type, start_date, end_date, month
- Content: highlights (MultiLang array), traditions (MultiLang array), practical_info
- Publishing: visible, featured

### Partners

- Fields: id, slug, name, type ('restaurant'|'hotel'|'operator'|'shop'|'service')
- Content: description (MultiLang), image, logo
- Location: area, address, coordinates, phone, website
- Subscription: plan ('free'|'basic'|'premium'), featured, visible

### Subscribers

- Fields: id, email, locale, subscribed (boolean), timestamps

# 13. Multilingual Data Structure

All content fields that support translation are stored as MultiLangText (Partial JSON objects) in Supabase:

- Type: Partial<Record<Locale, string>>
- Locales: es, en, de, fr, ru, it
- Example: { "es": "Playas", "en": "Beaches", "de": "Strande" ... }

# 14. Key Components Summary

## 14.1 Layout Components

- Header: Navigation, language selector, mobile menu
- Footer: About, social links, category links, legal links
- ReviewProvider/ReviewToolbar: Content review system

## 14.2 Homepage Components

- HeroSearchBar: Search functionality
- CategorySections: Category showcase with thumbnails
- FeaturedPartners: Partner listings
- MapSection: Interactive map with pins
- NewsletterForm: Email subscription
- ScrollEffects: Cinematic scroll animations

## 14.3 Content Components

- Card: Reusable card component for items
- Badge: Status and category labels
- Button: CTA buttons
- BuyGuideButton: Guide purchase component
- GuideNotifyForm: Newsletter for guides

# 15. Summary

Tenerife Experiences is a fully multilingual, SEO-optimized travel information and booking platform. The website features:

- 12 public-facing pages with comprehensive content organization
- Support for 6 languages with dynamic locale switching
- Supabase-powered content management with multilingual JSON fields
- Partner program with 3 subscription tiers
- Digital guide marketplace with 6 available guides
- Comprehensive legal compliance (Privacy, Terms, Cookies policies)
- Advanced UI/UX with cinematic animations and responsive design
- Affiliate revenue through Civitatis and partner monetization

---

Report Generated: March 31, 2026
