---
name: tenerife-experiences
description: "Plataforma web Tenerife Experiences (tenerifeexperiences.com) — guía turística completa de Tenerife multi-idioma con blog IA, guías PDF de pago, sistema de partners y panel admin. Usar SIEMPRE que el usuario mencione: Tenerife Experiences, tenerifeexperiences.com, tenerife-experiences.vercel.app, la web de turismo, las guías de Tenerife, guías PDF, blog de Tenerife, partners turísticos, leads de negocios, artículos generados con IA, panel admin de TE, categorías de experiencias, playas, cultura, naturaleza, gastronomía, vida nocturna, el checkout de Stripe de las guías, webhook de Stripe TE, newsletter de guías, cookie consent RGPD, traducciones pillar, o cualquier referencia a construir/mejorar/debugar esta plataforma. También activar cuando pregunte por el estado del proyecto, quiera continuar el desarrollo, necesite cualquier dato técnico, credencial o decisión de arquitectura de Tenerife Experiences."
---

# Tenerife Experiences — Base de Conocimiento

## Visión del Proyecto
Portal turístico definitivo de Tenerife. Diseño cinematográfico dark con acentos naranja (#f97316). Multi-idioma (ES, EN, DE, FR, RU, IT). Contenido generado por IA + curación manual. Monetización via guías PDF de pago y programa de partners/afiliados.

## URLs
- **Producción Vercel:** https://tenerife-experiences.vercel.app
- **Dominio final:** tenerifeexperiences.com (pendiente conectar DNS en Hostinger → Vercel)
- **GitHub:** github.com/jairogarba-web-fitbymila/tenerife-experiences (público)

## Stack Técnico
- **Framework:** Next.js 16.1.6 con App Router
- **UI:** React 19 + Tailwind CSS 4 + shadcn/ui + Lucide icons
- **i18n:** next-intl (6 locales: es, en, de, fr, ru, it)
- **Base de datos:** Supabase (proyecto: sqesgghvaazyajzjkoap)
- **Pagos:** Stripe Checkout (one-time payments para guías PDF)
- **IA:** Anthropic SDK para generación automática de artículos
- **Mapas:** Leaflet + react-leaflet
- **Deploy:** Vercel (auto-deploy desde GitHub main)
- **State:** Zustand

## Credenciales y Servicios

### Supabase
- **Project ID:** sqesgghvaazyajzjkoap
- **URL:** https://sqesgghvaazyajzjkoap.supabase.co
- Las keys están en las env vars de Vercel

### Stripe (modo test)
- **Keys:** configuradas en Vercel env vars (NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY)
- **Webhook Secret:** configurado en Vercel env vars (STRIPE_WEBHOOK_SECRET)
- **Productos:** 7 guías (foodie 9.90€, beaches 7.90€, adventure 7.90€, romantic 5.90€, family 7.90€, nightlife 5.90€, bible/bundle 19.90€)

### SerpApi (búsqueda web para blog IA)
- **API Key:** `609b4f2fbbffbc6d4502e1779ca44dcd6c85c6b4b21464ed727b51be10050a82`
- **Uso:** WF1 (Blog Generador) llama a SerpApi antes de generar cada artículo para obtener datos reales actualizados
- **Endpoint:** `https://serpapi.com/search.json?q={topic}+Tenerife&hl=es&gl=es&location=Tenerife,Canary Islands,Spain`

### Admin Panel
- **Ruta:** /admin (protegido por cookie de sesión)
- **Login:** /api/admin/login
- **Credenciales:** via env vars ADMIN_USERNAME, ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME
- **Seguridad:** comparación timing-safe con crypto.timingSafeEqual, sesión con expiración, sameSite strict
- **IMPORTANTE:** NO hay credenciales hardcodeadas en el código. Todas vienen de env vars obligatoriamente.

## Arquitectura de Carpetas Clave
```
src/
├── app/
│   ├── [locale]/(public)/     # Páginas públicas (home, categorías, blog, guías, legal)
│   ├── [locale]/(admin)/      # Panel admin (dashboard, categorías, leads, artículos)
│   └── api/                   # 23 API routes
│       ├── admin/             # Login, CRUD leads/categorías
│       ├── articles/generate/ # Generación IA de artículos
│       ├── checkout/          # Stripe Checkout Session
│       ├── cron/              # Generación automática de artículos
│       ├── newsletter/        # Suscripción email con RGPD
│       ├── track/             # Analytics de clics
│       └── webhook/stripe/    # Webhook de pagos
├── components/
│   ├── guides/                # BuyGuideButton, GuideNotifyForm
│   ├── layout/                # Header, Footer, CookieConsent
│   └── shared/                # TenerifeMap, SearchBar, etc.
├── i18n/messages/             # 6 archivos JSON de traducción
├── lib/
│   ├── auth.ts                # isAuthenticated, getAdminUser, CSRF utils
│   ├── stripe/config.ts       # getStripe(), GUIDE_PRODUCTS
│   └── supabase/              # Clientes browser/server/admin
└── styles/                    # Tailwind config, globals
```

## Tablas Supabase
- **categories** — Categorías de contenido (experiencias, playas, cultura, etc.)
- **subcategories** — Subcategorías dentro de cada categoría
- **items** — Lugares/experiencias individuales con datos multilingüe
- **articles** — Blog posts generados por IA en 6 idiomas
- **subscribers** — Newsletter con consent RGPD
- **leads** — Contactos de negocios/partners
- **guide_purchases** — Compras de guías (Stripe session_id, payment_intent, etc.)
- **areas** — Zonas geográficas de Tenerife
- **events** — Eventos y festivales

## Guías PDF (Productos Stripe)
| ID | Nombre | Precio | Estado |
|----|--------|--------|--------|
| foodie | Tenerife Foodie | 9.90€ | coming_soon |
| beaches | Playas & Calas Secretas | 7.90€ | coming_soon |
| adventure | Aventura & Naturaleza | 7.90€ | coming_soon |
| romantic | Tenerife Romántico | 5.90€ | coming_soon |
| family | Tenerife con Niños | 7.90€ | coming_soon |
| nightlife | Nightlife & Cultura | 5.90€ | coming_soon |
| bible | La Biblia de Tenerife (bundle) | 19.90€ | coming_soon |

## Flujo de Compra de Guías
1. Usuario ve guías en /guias con botón "Próximamente" (disabled)
2. Cuando se active: BuyGuideButton → POST /api/checkout → Stripe Checkout Session
3. Pago completado → redirect a /guias/gracias
4. Webhook /api/webhook/stripe → guarda en guide_purchases → (TODO: enviar email con PDF)

## Decisiones de Producto Importantes
- **Diseño cinematográfico dark:** fondo oscuro (#0a0a0a), acentos naranja (#f97316), tipografía Inter
- **SEO multilingüe:** cada página tiene generateMetadata, sitemap dinámico, canonical URLs
- **RGPD compliance:** cookie consent granular (esenciales/analytics), checkbox obligatorio en newsletter
- **Generación automática de artículos:** cron 3x/semana genera artículos en 6 idiomas con Anthropic API
- **Lazy Stripe:** getStripe() para evitar errores de build cuando faltan env vars

## Auditoría Marzo 2026 — Estado
Se realizó auditoría completa. Errores críticos corregidos:
- Footer /contact → /contacto
- Typo URL checkout (tenerifeexperience → tenerifeexperiences)
- Credenciales admin hardcodeadas eliminadas
- Comparación timing-safe de contraseñas
- Sesión con expiración + CSRF utils
- Service role key protegida en cron
- Traducciones pillar añadidas a DE/FR/RU/IT + umlauts/acentos corregidos

Pendiente de mejora (no crítico):
- Dominio DNS Hostinger → Vercel
- Rate limiting en APIs públicas
- next/image en vez de img
- CSP headers
- JSON-LD para artículos
- Componentes admin → server components
- Página /reservas

## Env Vars Requeridas en Vercel
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
ADMIN_USERNAME=
ADMIN_EMAIL=
ADMIN_PASSWORD=
ADMIN_NAME=
CRON_SECRET=
ANTHROPIC_API_KEY=
NEXT_PUBLIC_SITE_URL=https://tenerife-experiences.vercel.app
```
