# Auditoría Completa — Tenerife Experiences

**Fecha:** 25 de marzo de 2026
**URL:** tenerife-experiences.vercel.app
**Stack:** Next.js 16.1.6 · React 19 · Supabase · Stripe · Tailwind CSS 4
**Total hallazgos:** 45+ | Críticos: 8 | Altos: 12 | Medios: 15 | Bajos: 10+

---

## 1. PROBLEMAS CRÍTICOS (arreglar ya)

### 1.1 Dominio no conectado
El dominio `tenerifeexperiences.com` está aparcado en Hostinger y muestra la página por defecto de Hostinger. Todo el tráfico va solo a `tenerife-experiences.vercel.app`. Sin dominio propio no hay autoridad SEO, no se puede indexar correctamente, y no transmite profesionalidad.

**Acción:** Configurar DNS en Hostinger para apuntar a Vercel (CNAME `cname.vercel-dns.com`).

### 1.2 Credenciales admin hardcodeadas en el código
**Archivo:** `src/app/api/admin/login/route.ts`

El password por defecto `test2026*` está hardcodeado como fallback. Si las variables de entorno faltan, cualquier persona con acceso al repo puede entrar al panel de admin.

**Acción:** Eliminar todos los fallback de credenciales, implementar bcrypt para hash de contraseñas.

### 1.3 Comparación de contraseñas en texto plano
**Archivo:** `src/app/api/admin/login/route.ts`

Las contraseñas se comparan directamente con `===` sin hashing. Si los logs o el .env se filtran, la contraseña queda expuesta.

**Acción:** Usar bcrypt para hashear y comparar contraseñas.

### 1.4 Enlace del footer "Contacto" roto
**Archivo:** `src/components/layout/footer.tsx`

El enlace "Contacto" en el footer apunta a `/contact` pero la ruta correcta es `/contacto`. Verificado en vivo: `href="/es/contact"` → da 404.

**Acción:** Cambiar `/contact` a `/contacto` en el footer.

### 1.5 Typo en URL de checkout de Stripe
**Archivo:** `src/app/api/checkout/route.ts` (línea 20)

El fallback de origin es `'https://tenerifeexperience.com'` — falta la "s" en "experiences". Si se usa este fallback, el usuario tras pagar irá a un dominio incorrecto.

**Acción:** Corregir a `'https://tenerifeexperiences.com'`.

### 1.6 Sin protección CSRF en rutas admin
**Archivos:** Todas las rutas POST/PUT/DELETE en `src/app/api/admin/`

No hay validación de token CSRF. Un sitio malicioso podría hacer peticiones al panel admin aprovechando cookies de sesión.

**Acción:** Implementar validación CSRF con tokens en headers.

### 1.7 Traducciones `pillar` ausentes en 4 idiomas
**Archivos:** `de.json`, `fr.json`, `ru.json`, `it.json`

La sección `pillar` (150+ keys con todo el contenido de categorías) solo existe en `es.json` y `en.json`. Los usuarios en alemán, francés, ruso e italiano verán keys sin traducir o errores.

**Acción:** Traducir la sección `pillar` completa a los 4 idiomas restantes.

### 1.8 Service role key expuesta en fetch interno
**Archivo:** `src/app/api/cron/generate-articles/route.ts`

La `SUPABASE_SERVICE_ROLE_KEY` se pasa como Bearer token en una llamada fetch interna. Si los logs capturan esa petición, la clave queda expuesta.

**Acción:** Usar el cliente Supabase directamente en vez de fetch con Authorization header.

---

## 2. PROBLEMAS ALTOS (arreglar pronto)

### 2.1 Autenticación admin demasiado permisiva
**Archivo:** `src/lib/auth.ts`

Acepta tanto JSON como string plano `'authenticated'` como valor de cookie. Un atacante podría crear una cookie manualmente. No hay verificación de expiración.

**Acción:** Rechazar strings planos, añadir campo `expiresAt` y verificarlo.

### 2.2 Sin rate limiting en APIs públicas
**Archivos:** `/api/newsletter`, `/api/track`, `/api/checkout`

Sin límite de peticiones. El endpoint de newsletter puede ser bombardeado con spam. El de tracking genera escrituras ilimitadas a la BD.

**Acción:** Implementar rate limiting (Upstash o similar), mínimo 10 req/hora por IP en newsletter.

### 2.3 Sin validación de input en rutas admin
**Archivo:** `src/app/api/admin/leads/route.ts` y similares

Los parámetros de búsqueda se pasan directamente a queries sin validar longitud ni caracteres.

**Acción:** Añadir validación de longitud (max 100 chars) y sanitización de caracteres.

### 2.4 Sin protección contra replay en webhook de Stripe
**Archivo:** `src/app/api/webhook/stripe/route.ts`

No hay verificación de idempotencia. El mismo webhook enviado dos veces procesaría la compra dos veces.

**Acción:** Crear tabla `processed_webhooks` y verificar `event.id` antes de procesar.

### 2.5 Imágenes sin optimizar (raw `<img>` en vez de `next/image`)
**Archivos:** Homepage, blog, guías, eventos — múltiples páginas

Se usan etiquetas HTML `<img>` con URLs de Unsplash sin optimización. Sin responsive sizing, sin lazy loading automático, sin conversión a WebP/AVIF.

**Acción:** Reemplazar `<img>` por `next/image` en todas las páginas públicas, especialmente las hero images.

### 2.6 Umlauts faltantes en traducciones alemanas (~25 instancias)
**Archivo:** `de.json`

Palabras como "Strande" en vez de "Strände", "Fuhrer" en vez de "Führer", "Nachtleben-Reisefuhrer" en vez de "Nachtleben-Reiseführer". Esto es un error grave para usuarios alemanes.

**Acción:** Corregir todas las instancias de ä, ö, ü, ß que faltan.

### 2.7 Acentos faltantes en traducciones francesas (~30 instancias)
**Archivo:** `fr.json`

Faltan acentos: "decouvrez" → "découvrez", "experience" → "expérience", "gastronomie" → "gastronomie" (ok), pero muchos más sin acentuar.

**Acción:** Revisar y corregir todos los acentos en fr.json.

### 2.8 Estructura JSON malformada en fr.json
**Archivo:** `fr.json`

Problemas estructurales en el JSON francés que pueden causar errores de parseo.

**Acción:** Validar y corregir la estructura JSON.

### 2.9 Sin canonical URLs ni hreflang
**Archivos:** Layout y páginas principales

Con 6 idiomas, Google ve contenido duplicado. No hay `canonical`, no hay `hreflang`, no hay `alternates` en metadata.

**Acción:** Añadir `alternates.languages` en metadata de todas las páginas.

### 2.10 Sin fallback para OG images en páginas dinámicas
**Archivos:** Páginas de categoría, subcategoría

Cuando un item no tiene imagen, las tarjetas de redes sociales aparecen vacías.

**Acción:** Añadir imagen OG por defecto.

### 2.11 50+ componentes 'use client' innecesarios
**Archivos:** Dashboard admin, múltiples componentes

Muchos componentes marcados como client que podrían ser server components, aumentando el bundle JS.

**Acción:** Migrar componentes admin que no necesitan interactividad a server components.

### 2.12 Sin CSP headers
**Archivo:** Ninguno (falta completamente)

No hay Content Security Policy. Scripts de terceros podrían inyectar contenido malicioso.

**Acción:** Configurar CSP headers en `next.config.ts` o middleware.

---

## 3. PROBLEMAS MEDIOS

### 3.1 Páginas legales sin generateMetadata
Las páginas de privacidad, términos y cookies no tienen metadata personalizada.

### 3.2 Página `/reservas` referenciada pero inexistente
El CTA de experiencias enlaza a `/reservas` que no existe.

### 3.3 Sin JSON-LD para artículos del blog
Los artículos no tienen schema markup (Article, BreadcrumbList).

### 3.4 Fuentes cargando subset cirílico para todos los idiomas
`Inter` carga subset `cyrillic` siempre, añadiendo ~40KB innecesarios cuando el idioma no es ruso.

### 3.5 Sin code splitting para admin dashboard
Todo el admin se carga junto. Debería usar dynamic imports.

### 3.6 Cron secret en texto plano
El `CRON_SECRET` se pasa como Bearer token sin verificación adicional (IP whitelist, etc).

### 3.7 Meta tags inconsistentes entre páginas
Diferentes patrones para generar metadata. Sin validación de longitud (title <60, desc <155).

### 3.8 Sin image optimization en next.config
No hay configuración de `formats: ['image/avif', 'image/webp']` ni `deviceSizes`.

### 3.9 Sin preload de recursos críticos
No hay hints de preload para fuentes, imágenes hero, ni APIs frecuentes.

### 3.10 Jerarquía de headings irregular
Posibles h1 múltiples por página y saltos de nivel (h1 → h3 sin h2).

### 3.11 Sin Tailwind purge explícito
Tailwind v4 auto-purga pero sin configuración explícita visible.

### 3.12 Campos SEO de artículos no consultados
El query de blog no selecciona `meta_title` ni `meta_description`.

### 3.13 Solo 3 idiomas en el selector (EN/ES/DE)
El navbar muestra solo 3 idiomas pero el sitio soporta 6 (falta FR/RU/IT en el selector).

### 3.14 Alt tags genéricos en imágenes
Muchas imágenes usan alt genérico como "Tenerife" en vez de descripciones específicas.

### 3.15 Sitemap sin prioridades dinámicas
Todas las categorías tienen la misma prioridad sin considerar popularidad o frescura.

---

## 4. PROBLEMAS BAJOS

- Leaflet no se carga con lazy loading (añade al bundle inicial)
- `@anthropic-ai/sdk` incluido aunque solo se usa en 1 endpoint
- Sin service worker para soporte offline
- Bundle de 23 API routes (cold start potencialmente lento)
- Webpack tree-shaking para `lucide-react` podría mejorarse
- Footer muestra "Últimos Artículos" pero los títulos no están traducidos según idioma
- Sin monitoring de errores (Sentry o similar)
- Sin analytics configurado (GA4 o Plausible)
- Sin breadcrumbs en páginas de detalle
- Sin sitemap index para volumen alto de páginas

---

## 5. HALLAZGOS VISUALES (revisión en vivo)

- Homepage carga correctamente, diseño cinematográfico impactante
- Secciones de categorías (Experiencias, Playas, Cultura, Naturaleza, Gastronomía, Vida Nocturna) se ven bien
- Página de Guías funcional: 6 tarjetas con badges de estado, bundle "La Biblia", formulario de notificación con RGPD
- Formulario de email con checkbox RGPD y enlace a Política de Privacidad ✓
- Bundle muestra precio correcto: 19.90€ vs 44.50€ (-55%) ✓
- Sin errores de consola JavaScript ✓
- Navegación responsive visible con selector de idioma ✓

---

## 6. PLAN DE ACCIÓN RECOMENDADO

### Semana 1 — Seguridad y bugs críticos
1. Conectar dominio tenerifeexperiences.com a Vercel
2. Fix credenciales admin (quitar fallback, implementar bcrypt)
3. Fix enlace footer `/contact` → `/contacto`
4. Fix typo checkout `tenerifeexperience.com` → `tenerifeexperiences.com`
5. Implementar CSRF en rutas admin
6. Proteger service role key (no pasar en fetch)

### Semana 2 — Traducciones y SEO
7. Traducir sección `pillar` a DE/FR/RU/IT
8. Corregir umlauts alemanes y acentos franceses
9. Añadir canonical URLs y hreflang
10. Añadir JSON-LD a artículos
11. Reemplazar `<img>` por `next/image`

### Semana 3 — Rendimiento y mejoras
12. Implementar rate limiting
13. Añadir idempotencia a webhook Stripe
14. Configurar CSP headers
15. Lazy load Leaflet y dependencias pesadas
16. Optimizar componentes client vs server

### Semana 4 — Polish
17. Validar input en APIs admin
18. Añadir monitoring (Sentry)
19. Configurar analytics
20. Crear página `/reservas`
21. Mejorar alt tags de imágenes

---

*Generado automáticamente por auditoría de código + revisión visual en vivo*
