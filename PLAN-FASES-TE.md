# Plan de Fases — Tenerife Experiences
## Implementación y verificación sistemática

**Proyecto**: tenerifeexperiences.com
**Fecha**: 21 marzo 2026
**Estado actual**: Web funcional en tenerife-experiences.vercel.app, pendiente dominio final

---

## FASE 0 — Deploy y dominio (Día 1)
> **Objetivo**: Que la web esté accesible en tenerifeexperiences.com con todos los fixes aplicados

| # | Tarea | Quién | Herramienta |
|---|-------|-------|-------------|
| 0.1 | Deploy código con fixes de imágenes + "5 idiomas" | Jairo (terminal) | `vercel deploy --prod` |
| 0.2 | Configurar DNS tenerifeexperiences.com → Vercel | Jairo | Hostinger DNS panel |
| 0.3 | Verificar SSL automático en Vercel | Jairo | Vercel Dashboard |

**Verificación Fase 0:**
- [ ] tenerifeexperiences.com carga correctamente
- [ ] Imagen "Centro de Tenerife" muestra montañas con Teide (no turquesa)
- [ ] Imagen "Cultura e Historia" carga sin 404
- [ ] Partners muestra "5 idiomas"
- [ ] HTTPS funciona sin errores

---

## FASE 1 — Contenido visual limpio (Días 2-3)
> **Objetivo**: Que todas las imágenes de la web sean correctas y relevantes

| # | Tarea | Dónde | Detalle |
|---|-------|-------|---------|
| 1.1 | Arreglar foto "Parapente en Ifonche" (muestra un perro) | Supabase → items | Buscar foto real de parapente en Tenerife |
| 1.2 | Revisar TODAS las imágenes de items (auditoría completa) | Supabase → items | Recorrer las categorías principales verificando que cada foto corresponde |
| 1.3 | Mejorar hero homepage (overlay menos oscuro) | `page.tsx` CSS | Ajustar opacidad del gradient overlay |
| 1.4 | Diseñar y subir logo.png | Diseño + `/public/` | Crear o encargar logo profesional |

**Verificación Fase 1:**
- [ ] Navegar cada categoría y confirmar que las fotos son correctas
- [ ] Hero se ve bien en móvil y desktop
- [ ] Logo aparece en header/footer

---

## FASE 2 — Contenido editorial (Días 4-7)
> **Objetivo**: Blog profesional y descripciones de calidad

| # | Tarea | Dónde | Detalle |
|---|-------|-------|---------|
| 2.1 | Re-formatear HTML de artículos del blog | Supabase → `articles` | Añadir H2, H3, listas, párrafos bien estructurados |
| 2.2 | Revisar traducciones de artículos (5 idiomas) | Supabase → `articles` | Verificar que cada artículo tiene traducción coherente en es/en/de/fr/it |
| 2.3 | Enriquecer páginas de detalle de items | Código + Supabase | Galería de fotos, "qué incluye", duración, nivel dificultad |
| 2.4 | Revisar y mejorar descripciones SEO (meta tags) | `layout.tsx` + páginas | Title, description, Open Graph por idioma |

**Verificación Fase 2:**
- [ ] Abrir 3 artículos del blog → formato profesional con headings
- [ ] Cambiar idioma → artículos traducidos correctamente
- [ ] Página de detalle de un item muestra info completa
- [ ] Compartir link en WhatsApp → preview con imagen y texto correcto (OG tags)

---

## FASE 3 — Partners y afiliados (Días 8-10)
> **Objetivo**: Sección de partners limpia y sistema de afiliados configurado

| # | Tarea | Dónde | Detalle |
|---|-------|-------|---------|
| 3.1 | Eliminar o marcar Atlantic Excursions (web caída) | Supabase → `partners` | Verificar si la web ha vuelto; si no, desactivar |
| 3.2 | Monitorizar Tenerife Dolphin (SSL error) | Web externa | Re-verificar certificado SSL |
| 3.3 | Registrar cuenta de afiliado en Civitatis | civitatis.com | Obtener links de afiliado para tours |
| 3.4 | Registrar cuenta de afiliado en Booking/GetYourGuide | Webs respectivas | Links de afiliado para alojamiento/actividades |
| 3.5 | Integrar links de afiliado en items relevantes | Código + Supabase | Botones "Reservar" apuntan a afiliado |

**Verificación Fase 3:**
- [ ] Página de partners no muestra webs rotas
- [ ] Click en "Reservar" de un tour → abre link de afiliado correcto
- [ ] Panel de Civitatis/Booking muestra clicks registrados

---

## FASE 4 — Infraestructura y seguridad (Días 11-14)
> **Objetivo**: Email, analytics, seguridad y monitorización

| # | Tarea | Dónde | Detalle |
|---|-------|-------|---------|
| 4.1 | Configurar email hola@tenerifeexperiences.com | Hostinger | SMTP + buzón |
| 4.2 | Configurar email info@tenerifeexperiences.com | Hostinger | SMTP + buzón |
| 4.3 | Configurar Google Analytics 4 | Vercel env + GA | Measurement ID en `.env`, componente Analytics |
| 4.4 | Rotar Supabase service_role key | Supabase Dashboard + `.env` | Generar nueva key, actualizar en Vercel |
| 4.5 | Revisar RLS policies de Supabase | Supabase Dashboard | Asegurar que datos públicos son solo lectura |
| 4.6 | Configurar Vercel Analytics (opcional) | Vercel Dashboard | Web Vitals + Speed Insights |

**Verificación Fase 4:**
- [ ] Enviar email a hola@tenerifeexperiences.com → llega correctamente
- [ ] Abrir GA4 → ve visitas en tiempo real
- [ ] Antigua service_role key ya no funciona
- [ ] Intentar INSERT desde el navegador sin auth → rechazado por RLS

---

## FASE 5 — Redes sociales y presencia (Días 15-18)
> **Objetivo**: Presencia en redes con links funcionales desde la web

| # | Tarea | Plataforma |
|---|-------|------------|
| 5.1 | Crear cuenta Instagram | instagram.com |
| 5.2 | Crear cuenta Facebook (página) | facebook.com |
| 5.3 | Crear cuenta X/Twitter | x.com |
| 5.4 | Crear canal YouTube | youtube.com |
| 5.5 | Crear cuenta TikTok | tiktok.com |
| 5.6 | Actualizar URLs de redes en el footer | Código o Supabase |
| 5.7 | Publicar 3-5 posts iniciales por plataforma | Cada red social |

**Verificación Fase 5:**
- [ ] Click en cada icono del footer → abre la cuenta real (no genérica)
- [ ] Cada red social tiene al menos 3 posts publicados
- [ ] Bio de cada cuenta enlaza a tenerifeexperiences.com

---

## FASE 6 — Monetización (Días 19-25)
> **Objetivo**: Sistema de pagos y modelo de negocio activo

| # | Tarea | Dónde |
|---|-------|-------|
| 6.1 | Crear cuenta Stripe | stripe.com |
| 6.2 | Integrar Stripe checkout (reservas directas) | Código |
| 6.3 | Definir comisiones por tipo de experiencia | Documento/config |
| 6.4 | Implementar dashboard de ingresos básico | Código + Supabase |

**Verificación Fase 6:**
- [ ] Hacer reserva de prueba con tarjeta test de Stripe
- [ ] Pago aparece en dashboard de Stripe
- [ ] Dashboard interno muestra la transacción

---

## FASE 7 — Pulido y lanzamiento (Días 26-30)
> **Objetivo**: Web lista para promoción activa

| # | Tarea | Detalle |
|---|-------|---------|
| 7.1 | Decidir sobre portugués (/pt) o mantener 5 idiomas | Si se añade: crear traducciones + routing |
| 7.2 | Test completo en móvil (responsive) | Probar en iPhone + Android real |
| 7.3 | Test de velocidad (Lighthouse/PageSpeed) | Objetivo: >90 en Performance |
| 7.4 | Sitemap.xml + robots.txt | SEO técnico |
| 7.5 | Enviar sitemap a Google Search Console | search.google.com |
| 7.6 | Auditoría final completa | Revisar todo el checklist |

**Verificación Fase 7:**
- [ ] Lighthouse score >90 en las 4 categorías
- [ ] Google Search Console indexa las páginas principales
- [ ] Web funciona perfectamente en móvil
- [ ] Todas las rutas /es, /en, /de, /fr, /it funcionan

---

## Resumen de timeline

| Fase | Días | Prioridad |
|------|------|-----------|
| **Fase 0** — Deploy + dominio | 1 | CRÍTICA |
| **Fase 1** — Imágenes limpias | 2-3 | ALTA |
| **Fase 2** — Contenido editorial | 4-7 | ALTA |
| **Fase 3** — Partners + afiliados | 8-10 | MEDIA |
| **Fase 4** — Infra + seguridad | 11-14 | ALTA |
| **Fase 5** — Redes sociales | 15-18 | MEDIA |
| **Fase 6** — Monetización | 19-25 | MEDIA |
| **Fase 7** — Pulido + lanzamiento | 26-30 | ALTA |

**Total estimado: ~30 días hasta lanzamiento completo**

---

## Cómo trabajar con este plan

Cada fase la podemos abordar juntos en una sesión. Tú me dices "vamos con la Fase X" y yo:
1. Leo el estado actual de lo que hay que hacer
2. Ejecuto todo lo que pueda desde aquí (cambios en código, queries Supabase, verificaciones visuales)
3. Te indico lo que necesitas hacer manualmente (deploy, crear cuentas, DNS)
4. Verificamos juntos con capturas de pantalla que todo funciona

Las fases son independientes entre sí (excepto Fase 0 que es requisito para todo), así que puedes alterar el orden según tus prioridades.
