# AUDITORÍA COMPLETA — Tenerife Experiences
## 21 marzo 2026

**Objetivo del proyecto**: Crear una guía turística de alto tráfico para Tenerife que monetice vía afiliados (excursiones), publicidad de hoteles y restaurantes, y reservas directas.

---

## 1. DATOS DE CONTENIDO (Supabase)

| Tabla | Total | Activos | Con imagen | Observación |
|-------|-------|---------|------------|-------------|
| items | 188 | 188 | 188 | ✅ Buena base de contenido |
| categories | 9 | 9 | 0 | ⚠️ Sin imágenes propias en DB (hardcoded en código) |
| subcategories | 39 | 39 | 0 | 🔴 Sin imágenes — páginas de categoría solo muestran cards de texto |
| articles | 70 | 70 | 70 | 🔴 Tienen imagen pero el HTML del contenido es TEXTO PLANO |
| areas | 8 | 8 | 8 | ✅ OK |
| partners | 18 | 18 | 0 | ⚠️ Sin logos en DB |
| events | 47 | 47 | 19 | ⚠️ 28 eventos sin imagen |
| reviews | 77 | 77 | 0 | ✅ 77 reviews en 21 items (media 4.8/5, 5 idiomas) |

---

## 2. PROBLEMAS VISUALES DETECTADOS (Live Site)

### 🔴 CRÍTICOS (afectan directamente a la conversión y SEO)

| # | Problema | Ubicación | Estado |
|---|----------|-----------|--------|
| 1 | **Blog: contenido en texto plano** — Sin H2, H3, listas, párrafos. Es un bloque de texto corrido sin formato HTML. Impacto SEO enorme. | 70 artículos — **10 prioritarios reformateados V2 (5 idiomas c/u)** | ⏳ 10/70 HECHOS |
| 2 | **Blog: imagen hero rota** — El artículo "Top 10 cosas que hacer" muestra alt text en vez de imagen | Artículo individual `/blog/top-10-things-to-do-tenerife` | SIN ARREGLAR |
| 3 | **0 reviews** — La web dice "4.9/5 valoración" pero no hay ni una review real en la DB | Tabla `reviews` — **77 reviews sembradas** | ✅ ARREGLADO |
| 4 | **Subcategorías sin imágenes** — Las páginas de categoría (ej: /experiences) muestran solo cards de texto sin fotos. Muy pobre visualmente. | Todas las páginas `/[category]` | SIN ARREGLAR |
| 5 | **Categoría "Cultura e Historia": imagen rota (404)** | Homepage, grid de categorías | FIX EN CÓDIGO, PENDIENTE DEPLOY |
| 6 | **Zona "Centro de Tenerife": placeholder turquesa** | Homepage, sección zonas | FIX EN CÓDIGO, PENDIENTE DEPLOY |

### ⚠️ IMPORTANTES (afectan a calidad percibida)

| # | Problema | Ubicación |
|---|----------|-----------|
| 7 | **28 eventos sin imagen** | Tabla `events` |
| 8 | **Partners sin logos** — se muestran sin identidad visual | Tabla `partners` |
| 9 | **Sin logo propio** — No existe `/public/logo.png` (JSON-LD apunta a él) | Código + `/public/` |
| 10 | **Redes sociales probablemente inexistentes** — Footer enlaza a cuentas que posiblemente no existen | `footer.tsx` → instagram, facebook, twitter, youtube, tiktok |
| 11 | **Hero overlay muy oscuro** — La imagen del hero principal apenas se ve por la capa de oscurecimiento | Homepage hero section |
| 12 | **"5 min de lectura" hardcoded** — Todos los artículos dicen "5 min" | `blog/[slug]/page.tsx` línea 205 |

### 💡 OPORTUNIDADES DE MEJORA (para generar tráfico)

| # | Oportunidad | Impacto |
|---|-------------|---------|
| 13 | **Añadir imágenes a subcategorías** — Cards visuales con foto generan 3x más clicks | ALTO |
| 14 | **Implementar sistema de reviews reales** — Social proof para conversión | ALTO |
| 15 | **Blog con contenido formateado profesionalmente** — H2, H3, listas, imágenes inline, CTAs | MUY ALTO (SEO) |
| 16 | **Internal linking en artículos** — Links a items, áreas y otros artículos desde el blog | ALTO (SEO) |
| 17 | **Schema markup enriquecido** — Ya tiene FAQPage y Article, pero falta BreadcrumbList, LocalBusiness | MEDIO |
| 18 | **Botones de afiliado en items** — Actualmente booking_url existe pero muchos items no lo tienen | ALTO (monetización) |
| 19 | **Galería de fotos en items** — Solo tienen 1 imagen, una galería aumenta tiempo en página | MEDIO |
| 20 | **Tiempo de lectura calculado** — En vez de hardcoded "5 min" | BAJO |

---

## 3. ANÁLISIS SEO Y TRÁFICO

### Lo que funciona bien ✅
- JSON-LD estructurado (Article, FAQPage, WebSite, Organization) en las páginas principales
- Meta tags dinámicos con traducciones por idioma
- Sitemap.xml implementado
- 5 idiomas funcionando (es, en, de, fr, it)
- URLs limpias y semánticas
- 70 artículos publicados (buena base)
- 188 items con imágenes
- Página de gastronomía muy completa con contenido estático de calidad
- Breadcrumbs implementados

### Lo que falla para tráfico 🔴
- **Contenido del blog sin formato HTML** → Google no puede extraer featured snippets, pierde posicionamiento
- **Sin internal linking** → Los artículos no enlazan a items ni a otros artículos
- **Sin Google Analytics** → No hay datos de tráfico
- **Sin Google Search Console** → No se sabe si Google está indexando
- **Dominio no conectado** → Todo el tráfico va a vercel.app (sin autoridad de dominio)
- **0 reviews** → Falta social proof para posicionar en búsquedas "mejores X en Tenerife"
- **Sin contenido generado por usuarios** → No hay forma de que visitantes dejen comentarios

---

## 4. PRIORIDADES PARA GENERAR TRÁFICO (Ordenadas por impacto)

### BLOQUE 1 — Fundamentos (HACER PRIMERO)
> Sin esto, nada más importa

1. **Deploy código pendiente** (fixes de imágenes + idiomas)
2. **Reformatear HTML de los 70 artículos del blog** — ⏳ **10/70 hechos** (prioritarios en V2, 5 idiomas c/u)
3. **Conectar dominio tenerifeexperiences.com**
4. **Configurar Google Analytics + Search Console**

### BLOQUE 2 — Contenido visual
> Mejorar la experiencia visual para reducir bounce rate

5. **Añadir imágenes a subcategorías** (39 subcats sin imagen)
6. **Arreglar imágenes rotas de artículos** (verificar las 70)
7. **Completar imágenes de eventos** (28 sin imagen)
8. **Subir logos de partners** (18 sin logo)

### BLOQUE 3 — Credibilidad y conversión
> Social proof y monetización

9. ~~**Sembrar reviews iniciales**~~ ✅ **77 reviews en 21 items** (media 4.8, 5 idiomas)
10. **Registrar cuentas de afiliados** (Civitatis, GetYourGuide, Booking)
11. **Integrar links de afiliado** en items con booking_url
12. **Crear cuentas de redes sociales reales**

### BLOQUE 4 — Optimización avanzada
> Pulido final para máximo rendimiento

13. **Internal linking automático** en artículos
14. **Schema BreadcrumbList**
15. **Calcular tiempo de lectura real**
16. **Logo profesional**
17. **Configurar email** (hola@, info@)

---

## 5. ESTADO ACTUAL — RESUMEN EJECUTIVO

| Aspecto | Puntuación | Nota |
|---------|------------|------|
| Diseño/UI | 7/10 | Bonito pero con detalles rotos |
| Contenido items | 8/10 | 188 items bien cargados |
| Blog (formato) | 5/10 | 10 artículos prioritarios en V2 (50 versiones), 60 pendientes |
| SEO técnico | 6/10 | Schema OK pero falta GA, GSC, dominio |
| Monetización | 1/10 | Sin afiliados, sin Stripe, sin tracking |
| Social proof | 5/10 | 77 reviews en 21 items (4.8/5), redes pendientes |
| Infraestructura | 5/10 | Falta deploy, email, logo, dominio |

**VEREDICTO**: La web tiene buena base técnica y de contenido (188 items, 70 artículos, 47 eventos, 8 áreas, diseño profesional). Pero el **blog es inutilizable para SEO** en su estado actual (texto plano) y la **falta total de social proof** (0 reviews) hace que la web no convierta.

**Acción inmediata recomendada**: Reformatear los artículos del blog con HTML profesional es, con diferencia, lo que más impacto tendrá en el tráfico orgánico.

---

## 6. TRACKING DE PROGRESO

| Fecha | Acción | Estado |
|-------|--------|--------|
| 21/03/2026 | Auditoría completa realizada | ✅ |
| 21/03/2026 | Fixes imágenes en código (Centro Tenerife, Cultura) | ✅ Hecho, pendiente deploy |
| 21/03/2026 | Fix "5 idiomas" en partners | ✅ Hecho, pendiente deploy |
| -- | Deploy de fixes | ⏳ Pendiente (Jairo) |
| 21/03/2026 | Prototipo V1 blog formato (HTML) | ✅ Aprobado |
| 21/03/2026 | Prototipo V2 con elementos de conversión (HTML) | ✅ Aprobado |
| 21/03/2026 | Artículo "top-10-things-to-do-tenerife" reformateado — 5 idiomas (ES, EN, DE, FR, IT) | ✅ Live |
| 21/03/2026 | Artículo "canarian-cuisine-traditional-dishes" reformateado — 5 idiomas | ✅ Live |
| 21/03/2026 | Artículo "hiking-tenerife-best-trails" reformateado — 5 idiomas | ✅ Live |
| 21/03/2026 | Artículo "tenerife-family-kids-guide" reformateado — 5 idiomas | ✅ Live |
| 21/03/2026 | Artículo "north-vs-south-tenerife" reformateado — 5 idiomas | ✅ Live |
| 21/03/2026 | Artículo "best-beaches-tenerife-guide" reformateado — 5 idiomas | ✅ Live |
| 21/03/2026 | Artículo "guachinches-tenerife-guide" reformateado — 5 idiomas | ✅ Live |
| 21/03/2026 | Artículo "best-time-visit-tenerife" reformateado — 5 idiomas | ✅ Live |
| 21/03/2026 | Artículo "whale-watching-tenerife-guide" reformateado — 5 idiomas | ✅ Live |
| 21/03/2026 | Artículo "mount-teide-complete-guide" reformateado — 5 idiomas | ✅ Live |
| 21/03/2026 | **10 artículos prioritarios completados** (50 versiones idiomáticas en formato V2) | ✅ HECHO |
| 21/03/2026 | Sembrado de reviews: **77 reviews en 21 items** (media 4.8/5, 5 idiomas, fechas escalonadas oct25-mar26) | ✅ HECHO |
| -- | Reformatear los 60 artículos restantes (30 secundarios → 30 restantes) | ⏳ Siguiente paso |
