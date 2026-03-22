interface EmailTemplateParams {
  businessName: string
  zone: string
  category: string
  recipientEmail: string
  unsubscribeUrl: string
}

function baseLayout(content: string, params: EmailTemplateParams): string {
  const { category, zone, recipientEmail, unsubscribeUrl } = params
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tenerife Experiences</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;">
    <tr>
      <td align="center" style="padding:24px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background-color:#18181b;padding:24px 32px;text-align:center;">
              <h1 style="margin:0;font-size:24px;font-weight:700;color:#ffffff;letter-spacing:0.5px;">
                Tenerife <span style="color:#f97316;">Experiences</span>
              </h1>
              <p style="margin:4px 0 0;font-size:13px;color:#a1a1aa;">La plataforma turistica de Tenerife</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color:#fafafa;padding:24px 32px;border-top:1px solid #e4e4e7;">
              <p style="margin:0 0 8px;font-size:12px;color:#71717a;text-align:center;">
                Tenerife Experiences &middot; Tenerife, Islas Canarias, Espana
              </p>
              <p style="margin:0 0 8px;font-size:11px;color:#a1a1aa;text-align:center;">
                Estas recibiendo este email porque tu negocio aparece en Google Maps como <strong>${category}</strong> en <strong>${zone}, Tenerife</strong>.
              </p>
              <p style="margin:0;font-size:11px;text-align:center;">
                <a href="${unsubscribeUrl}" style="color:#f97316;text-decoration:underline;">Darme de baja de estos emails</a>
              </p>
              <p style="margin:8px 0 0;font-size:10px;color:#d4d4d8;text-align:center;">
                Enviado a: ${recipientEmail}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function ctaButton(text: string, url: string = '#'): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px auto;">
  <tr>
    <td align="center" style="background-color:#f97316;border-radius:6px;">
      <a href="${url}" style="display:inline-block;padding:14px 32px;font-size:16px;font-weight:600;color:#ffffff;text-decoration:none;letter-spacing:0.3px;">
        ${text}
      </a>
    </td>
  </tr>
</table>`
}

// ── Email 1: Introduction (Day 0) ──────────────────────────────────────

export function introductionEmailSubject(params: EmailTemplateParams): string {
  return `Hola ${params.businessName} - Tu negocio ante miles de turistas`
}

export function introductionEmail(params: EmailTemplateParams): string {
  const { businessName, zone } = params
  const content = `
<h2 style="margin:0 0 16px;font-size:20px;color:#18181b;">Hola equipo de ${businessName},</h2>

<p style="margin:0 0 16px;font-size:15px;color:#3f3f46;line-height:1.6;">
  Me llamo Jairo y soy el fundador de <strong>Tenerife Experiences</strong>, una nueva plataforma turistica que esta ayudando a miles de viajeros a descubrir lo mejor de Tenerife.
</p>

<p style="margin:0 0 16px;font-size:15px;color:#3f3f46;line-height:1.6;">
  He estado investigando los mejores negocios de la zona <strong>${zone}</strong> y <strong>${businessName}</strong> destaca por su calidad y sus excelentes resenas. Por eso me pongo en contacto directamente.
</p>

<h3 style="margin:0 0 12px;font-size:16px;color:#18181b;">Que es Tenerife Experiences?</h3>

<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 20px;">
  <tr>
    <td style="padding:8px 12px;vertical-align:top;color:#f97316;font-size:18px;">&#10003;</td>
    <td style="padding:8px 12px;font-size:14px;color:#3f3f46;">Plataforma turistica disponible en <strong>5 idiomas</strong> (espanol, ingles, aleman, frances, italiano)</td>
  </tr>
  <tr>
    <td style="padding:8px 12px;vertical-align:top;color:#f97316;font-size:18px;">&#10003;</td>
    <td style="padding:8px 12px;font-size:14px;color:#3f3f46;"><strong>Optimizada para SEO</strong>: aparecemos en Google cuando los turistas buscan que hacer en Tenerife</td>
  </tr>
  <tr>
    <td style="padding:8px 12px;vertical-align:top;color:#f97316;font-size:18px;">&#10003;</td>
    <td style="padding:8px 12px;font-size:14px;color:#3f3f46;">Contenido de calidad sobre restaurantes, excursiones, hoteles y experiencias</td>
  </tr>
  <tr>
    <td style="padding:8px 12px;vertical-align:top;color:#f97316;font-size:18px;">&#10003;</td>
    <td style="padding:8px 12px;font-size:14px;color:#3f3f46;">Dirigida a turistas internacionales que buscan <strong>experiencias autenticas</strong></td>
  </tr>
</table>

<p style="margin:0 0 16px;font-size:15px;color:#3f3f46;line-height:1.6;">
  Me gustaria ofreceros una <strong>ficha basica gratuita</strong> en nuestra plataforma para que los turistas puedan descubrir ${businessName}. Sin compromiso, sin coste.
</p>

${ctaButton('Quiero aparecer gratis', 'https://tenerifeexperiences.com/partners?ref=email-intro')}

<p style="margin:0;font-size:14px;color:#71717a;line-height:1.5;text-align:center;">
  Si tienes cualquier duda, simplemente responde a este email.<br>
  Estare encantado de contarte mas.
</p>`

  return baseLayout(content, params)
}

// ── Email 2: Follow-up (Day 7) ─────────────────────────────────────────

export function followUpEmailSubject(params: EmailTemplateParams): string {
  return `Viste nuestro email? Datos interesantes para ${params.businessName}`
}

export function followUpEmail(params: EmailTemplateParams): string {
  const { businessName, zone, category } = params
  const content = `
<h2 style="margin:0 0 16px;font-size:20px;color:#18181b;">Hola de nuevo, equipo de ${businessName},</h2>

<p style="margin:0 0 16px;font-size:15px;color:#3f3f46;line-height:1.6;">
  Os escribi la semana pasada sobre Tenerife Experiences y queria compartir algunos datos que quiza os resulten interesantes.
</p>

<h3 style="margin:0 0 12px;font-size:16px;color:#18181b;">Nuestros numeros este mes:</h3>

<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 24px;width:100%;">
  <tr>
    <td style="padding:16px;text-align:center;background-color:#fff7ed;border-radius:8px 0 0 0;border-bottom:1px solid #fed7aa;border-right:1px solid #fed7aa;">
      <p style="margin:0;font-size:28px;font-weight:700;color:#f97316;">12K+</p>
      <p style="margin:4px 0 0;font-size:12px;color:#71717a;">Visitantes mensuales</p>
    </td>
    <td style="padding:16px;text-align:center;background-color:#fff7ed;border-radius:0 8px 0 0;border-bottom:1px solid #fed7aa;">
      <p style="margin:0;font-size:28px;font-weight:700;color:#f97316;">45+</p>
      <p style="margin:4px 0 0;font-size:12px;color:#71717a;">Paises</p>
    </td>
  </tr>
  <tr>
    <td style="padding:16px;text-align:center;background-color:#fff7ed;border-radius:0 0 0 8px;border-right:1px solid #fed7aa;">
      <p style="margin:0;font-size:28px;font-weight:700;color:#f97316;">6</p>
      <p style="margin:4px 0 0;font-size:12px;color:#71717a;">Idiomas</p>
    </td>
    <td style="padding:16px;text-align:center;background-color:#fff7ed;border-radius:0 0 8px 0;">
      <p style="margin:0;font-size:28px;font-weight:700;color:#f97316;">85%</p>
      <p style="margin:4px 0 0;font-size:12px;color:#71717a;">Trafico internacional</p>
    </td>
  </tr>
</table>

<p style="margin:0 0 16px;font-size:15px;color:#3f3f46;line-height:1.6;">
  Varios negocios de <strong>${category}</strong> en la zona <strong>${zone}</strong> ya se han unido y estan recibiendo visibilidad extra ante turistas que buscan exactamente lo que ofreceis.
</p>

<p style="margin:0 0 16px;font-size:15px;color:#3f3f46;line-height:1.6;">
  No queremos que ${businessName} se quede fuera. La inclusion basica es <strong>completamente gratuita</strong> y solo lleva unos minutos.
</p>

<div style="background-color:#f4f4f5;border-radius:8px;padding:20px;margin:0 0 16px;text-align:center;">
  <p style="margin:0;font-size:15px;color:#3f3f46;line-height:1.6;">
    <strong>Responde a este email</strong> con un simple "si" y nosotros nos encargamos de crear vuestra ficha. Sin papeleo, sin complicaciones.
  </p>
</div>

<p style="margin:0;font-size:14px;color:#71717a;line-height:1.5;text-align:center;">
  Un saludo,<br>
  <strong>Jairo</strong> &middot; Fundador de Tenerife Experiences
</p>`

  return baseLayout(content, params)
}

// ── Email 3: Final / Launch Offer (Day 14) ──────────────────────────────

export function finalOfferEmailSubject(params: EmailTemplateParams): string {
  return `Ultima oportunidad: oferta de lanzamiento para ${params.businessName}`
}

export function finalOfferEmail(params: EmailTemplateParams): string {
  const { businessName } = params
  const content = `
<h2 style="margin:0 0 16px;font-size:20px;color:#18181b;">Hola equipo de ${businessName},</h2>

<p style="margin:0 0 16px;font-size:15px;color:#3f3f46;line-height:1.6;">
  Este es mi ultimo email y quiero ser directo: estamos lanzando oficialmente Tenerife Experiences y hemos preparado una <strong>oferta especial de lanzamiento</strong> que no quiero que os perdais.
</p>

<!-- Offer Box -->
<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 24px;width:100%;">
  <tr>
    <td style="background:linear-gradient(135deg,#f97316,#ea580c);border-radius:12px;padding:28px 24px;text-align:center;">
      <p style="margin:0 0 4px;font-size:14px;color:#ffffff;opacity:0.9;text-transform:uppercase;letter-spacing:1px;">Oferta de lanzamiento</p>
      <p style="margin:0 0 8px;font-size:42px;font-weight:800;color:#ffffff;">30% OFF</p>
      <p style="margin:0 0 4px;font-size:16px;color:#ffffff;font-weight:600;">Descuento de por vida en el plan Premium</p>
      <p style="margin:12px 0 0;font-size:13px;color:#ffffff;opacity:0.85;">Para los primeros 50 partners &middot; Plazas limitadas</p>
    </td>
  </tr>
</table>

<h3 style="margin:0 0 12px;font-size:16px;color:#18181b;">Que incluye el plan Premium?</h3>

<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 20px;">
  <tr>
    <td style="padding:6px 12px;vertical-align:top;color:#f97316;font-size:16px;">&#9733;</td>
    <td style="padding:6px 12px;font-size:14px;color:#3f3f46;">Ficha destacada con fotos, videos y descripcion completa en 5 idiomas</td>
  </tr>
  <tr>
    <td style="padding:6px 12px;vertical-align:top;color:#f97316;font-size:16px;">&#9733;</td>
    <td style="padding:6px 12px;font-size:14px;color:#3f3f46;">Posicion prioritaria en listados y busquedas</td>
  </tr>
  <tr>
    <td style="padding:6px 12px;vertical-align:top;color:#f97316;font-size:16px;">&#9733;</td>
    <td style="padding:6px 12px;font-size:14px;color:#3f3f46;">Articulos SEO dedicados que atraen trafico organico</td>
  </tr>
  <tr>
    <td style="padding:6px 12px;vertical-align:top;color:#f97316;font-size:16px;">&#9733;</td>
    <td style="padding:6px 12px;font-size:14px;color:#3f3f46;">Panel de estadisticas: visitas, clics, conversiones</td>
  </tr>
  <tr>
    <td style="padding:6px 12px;vertical-align:top;color:#f97316;font-size:16px;">&#9733;</td>
    <td style="padding:6px 12px;font-size:14px;color:#3f3f46;">Soporte prioritario y consultor de marketing turistico</td>
  </tr>
</table>

<!-- Urgency Box -->
<div style="background-color:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:16px;margin:0 0 20px;text-align:center;">
  <p style="margin:0;font-size:15px;color:#dc2626;font-weight:600;">
    Solo quedan 12 plazas con esta oferta
  </p>
  <p style="margin:4px 0 0;font-size:13px;color:#71717a;">
    Una vez cubiertas, el precio vuelve a la tarifa normal
  </p>
</div>

${ctaButton('Quiero la oferta', 'https://tenerifeexperiences.com/partners?ref=email-final-offer')}

<p style="margin:0 0 16px;font-size:15px;color:#3f3f46;line-height:1.6;text-align:center;">
  Si prefieres empezar con la <strong>ficha gratuita</strong>, tambien puedes hacerlo. Simplemente responde "gratis" a este email.
</p>

<p style="margin:0;font-size:14px;color:#71717a;line-height:1.5;text-align:center;">
  Gracias por vuestro tiempo,<br>
  <strong>Jairo</strong> &middot; Fundador de Tenerife Experiences
</p>`

  return baseLayout(content, params)
}

// ── Utility: Get template by number ─────────────────────────────────────

export function getEmailTemplate(templateNumber: 1 | 2 | 3, params: EmailTemplateParams): { subject: string; html: string } {
  switch (templateNumber) {
    case 1:
      return { subject: introductionEmailSubject(params), html: introductionEmail(params) }
    case 2:
      return { subject: followUpEmailSubject(params), html: followUpEmail(params) }
    case 3:
      return { subject: finalOfferEmailSubject(params), html: finalOfferEmail(params) }
  }
}
