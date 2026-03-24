'use client'

import { useLocale } from 'next-intl'

const content = {
  es: {
    title: 'Política de Privacidad',
    lastUpdated: 'Última actualización: Marzo 2026',
    whoWeAre: {
      title: '¿Quiénes somos?',
      text: 'Tenerife Experiences es una plataforma digital dedicada a promocionar experiencias turísticas, actividades y servicios en la isla de Tenerife, Islas Canarias, España. Nuestra misión es conectar a visitantes con las mejores experiencias que la isla tiene para ofrecer.',
    },
    dataController: {
      title: 'Responsable del Tratamiento',
      text: 'Los datos personales que recopilamos son tratados por:',
      items: [
        'Nombre: Jairo García Barroso',
        'NIF: Pendiente',
        'Dirección: Tenerife, Islas Canarias, España',
        'Correo electrónico: info@tenerifeexperiences.com',
      ],
    },
    dataCollect: {
      title: '¿Qué datos recopilamos?',
      items: [
        'Dirección de correo electrónico: cuando te suscribes a nuestro boletín informativo.',
        'Datos de navegación: información sobre cómo interactúas con nuestro sitio web, incluyendo páginas visitadas, tiempo de permanencia y dispositivo utilizado.',
        'Cookies: utilizamos cookies esenciales, de análisis y de preferencias para mejorar tu experiencia.',
        'Datos de análisis: recopilamos datos anonimizados sobre el uso del sitio a través de herramientas de análisis.',
        'Datos de formularios de contacto: cuando nos contactas directamente.',
      ],
    },
    legalBasis: {
      title: 'Base Legal del Tratamiento',
      text: 'Procesamos tus datos personales en base a las siguientes bases legales:',
      items: [
        'Boletín informativo (Newsletter): Consentimiento explícito (Art. 6.1.a RGPD).',
        'Analytics y Cookies de análisis: Consentimiento (Art. 6.1.a RGPD).',
        'Formularios de contacto: Interés legítimo (Art. 6.1.f RGPD) - para responder a tus consultas.',
        'Enlaces de afiliados y sistema de bookings: Interés legítimo (Art. 6.1.f RGPD) - para facilitar tus compras y reservas.',
      ],
    },
    howWeUse: {
      title: '¿Cómo usamos tus datos?',
      items: [
        'Mejorar nuestros servicios y la experiencia del usuario.',
        'Enviar nuestro boletín informativo con novedades y recomendaciones (solo si te has suscrito).',
        'Analizar el tráfico del sitio web para entender cómo los usuarios interactúan con nuestra plataforma.',
        'Personalizar el contenido que te mostramos.',
        'Responder a tus consultas y solicitudes a través de formularios de contacto.',
      ],
    },
    thirdParties: {
      title: 'Terceros',
      text: 'Compartimos datos con los siguientes servicios de terceros, todos ellos con sus propias políticas de privacidad:',
      items: [
        'Google Analytics: para análisis de tráfico web y comportamiento de usuarios.',
        'Supabase: como proveedor de base de datos y autenticación.',
        'Vercel: como proveedor de alojamiento web.',
        'Civitatis: enlaces de afiliados para reservas de experiencias (genera cookies de seguimiento).',
        'Stripe: procesador de pagos para compra de guías digitales (solo si adquieres productos).',
      ],
    },
    internationalTransfers: {
      title: 'Transferencias Internacionales de Datos',
      text: 'Algunos de nuestros procesadores de datos están ubicados fuera de la Unión Europea. Utilizamos los siguientes mecanismos de transferencia segura:',
      items: [
        'Google LLC (Analytics): Standard Contractual Clauses (SCC) + Data Processing Amendment.',
        'Supabase Inc: Standard Contractual Clauses (SCC).',
        'Vercel Inc: Standard Contractual Clauses (SCC).',
        'Stripe Inc (procesamiento de pagos): Standard Contractual Clauses (SCC) + Certificación PCI DSS Level 1.',
      ],
    },
    dataRetention: {
      title: 'Plazos de Conservación de Datos',
      text: 'Los datos personales se conservan durante los siguientes períodos:',
      items: [
        'Emails de newsletter: hasta la cancelación de la suscripción.',
        'Datos de analytics: máximo 14 meses, posteriormente anonimizados.',
        'Datos de formularios de contacto: 12 meses desde la última interacción.',
        'Datos de visualización de páginas: 13 meses, luego anonimizados.',
      ],
    },
    cookiePolicy: {
      title: 'Política de Cookies',
      text: 'Utilizamos cookies para el funcionamiento del sitio. Las cookies se clasifican de la siguiente manera: esenciales (funcionamiento), analytics (análisis de uso), y preferencias (personalización). Puedes desactivar las cookies en la configuración de tu navegador, aunque esto puede afectar la funcionalidad del sitio. Para más detalles, consulta nuestra página dedicada a cookies.',
    },
    affiliateLinks: {
      title: 'Enlaces de Afiliados',
      text: 'Nuestro sitio contiene enlaces de afiliados a Civitatis. Cuando haces clic en un enlace de afiliado:',
      items: [
        'Se genera una cookie en el dominio civitatis.com con una duración de 30 días.',
        'Si realizas una compra durante ese período, recibimos una comisión.',
        'No compartimos tus datos personales con Civitatis.',
        'Los términos de privacidad de Civitatis aplican cuando navegas su sitio.',
      ],
    },
    payments: {
      title: 'Procesamiento de Pagos',
      text: 'Si compras guías digitales u otros productos digitales en nuestro sitio:',
      items: [
        'Los pagos se procesan a través de Stripe Inc.',
        'NO almacenamos datos de tarjetas de crédito en nuestros servidores.',
        'Stripe es cumplidor de PCI DSS Level 1 (el estándar más alto de seguridad de pagos).',
        'Tu información de pago está protegida por los estándares de seguridad de Stripe.',
        'Consulta la política de privacidad de Stripe para más información.',
      ],
    },
    minors: {
      title: 'Menores de Edad',
      text: 'Tenerife Experiences no recopila intencionalmente datos personales de menores de 14 años. Si tenemos conocimiento de que hemos recopilado datos de un menor de 14 años sin el consentimiento parental, eliminaremos esos datos inmediatamente. Si tienes menos de 14 años y has proporcionado datos, por favor contacta con nosotros.',
    },
    userRights: {
      title: 'Tus Derechos (RGPD)',
      text: 'De acuerdo con el Reglamento General de Protección de Datos (RGPD), tienes los siguientes derechos:',
      items: [
        'Derecho de acceso: puedes solicitar una copia de tus datos personales.',
        'Derecho de rectificación: puedes solicitar la corrección de datos inexactos.',
        'Derecho de supresión: puedes solicitar la eliminación de tus datos personales.',
        'Derecho de limitación: puedes solicitar que limitemos el tratamiento de tus datos.',
        'Derecho de portabilidad: puedes solicitar tus datos en un formato estructurado.',
        'Derecho de oposición: puedes oponerte al tratamiento de tus datos.',
        'Derecho a retirar el consentimiento: puedes retirar tu consentimiento en cualquier momento.',
      ],
    },
    complaintRights: {
      title: 'Derechos de Reclamación',
      text: 'Si consideras que tus derechos de protección de datos no se respetan adecuadamente, tienes derecho a presentar una reclamación ante la autoridad de control competente:',
      items: [
        'Agencia Española de Protección de Datos (AEPD)',
        'Dirección: C/ Jorge Juan, 6 - 28001 Madrid',
        'Sitio web: www.aepd.es',
        'Puedes presentar tu reclamación en línea a través del sitio web de la AEPD.',
      ],
    },
    updates: {
      title: 'Actualizaciones de Esta Política',
      text: 'Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. Los cambios significativos se comunicarán a través de nuestra página web o por correo electrónico a los usuarios suscritos. La continuación del uso del sitio después de tales cambios constituye la aceptación de la política de privacidad actualizada. La fecha de última actualización se muestra en la parte superior de esta página.',
    },
    contact: {
      title: 'Contacto',
      text: 'Para ejercer cualquiera de estos derechos, si tienes preguntas sobre nuestra política de privacidad, o si deseas reportar una preocupación sobre el tratamiento de tus datos, puedes contactarnos en:',
      email: 'info@tenerifeexperiences.com',
    },
  },
  en: {
    title: 'Privacy Policy',
    lastUpdated: 'Last updated: March 2026',
    whoWeAre: {
      title: 'Who We Are',
      text: 'Tenerife Experiences is a digital platform dedicated to promoting tourist experiences, activities, and services on the island of Tenerife, Canary Islands, Spain. Our mission is to connect visitors with the best experiences the island has to offer.',
    },
    dataController: {
      title: 'Data Controller',
      text: 'The personal data we collect is processed by:',
      items: [
        'Name: Jairo García Barroso',
        'Tax ID (NIF): Pending',
        'Address: Tenerife, Canary Islands, Spain',
        'Email: info@tenerifeexperiences.com',
      ],
    },
    dataCollect: {
      title: 'What Data We Collect',
      items: [
        'Email address: when you subscribe to our newsletter.',
        'Browsing data: information about how you interact with our website, including pages visited, time spent, and device used.',
        'Cookies: we use essential, analytics, and preference cookies to improve your experience.',
        'Analytics data: we collect anonymized data about site usage through analytics tools.',
        'Contact form data: when you contact us directly.',
      ],
    },
    legalBasis: {
      title: 'Legal Basis for Processing',
      text: 'We process your personal data based on the following legal grounds:',
      items: [
        'Newsletter: Explicit consent (Art. 6.1.a GDPR).',
        'Analytics and analytical cookies: Consent (Art. 6.1.a GDPR).',
        'Contact forms: Legitimate interest (Art. 6.1.f GDPR) - to respond to your inquiries.',
        'Affiliate links and booking systems: Legitimate interest (Art. 6.1.f GDPR) - to facilitate your purchases and bookings.',
      ],
    },
    howWeUse: {
      title: 'How We Use Your Data',
      items: [
        'Improve our services and user experience.',
        'Send our newsletter with updates and recommendations (only if you have subscribed).',
        'Analyze website traffic to understand how users interact with our platform.',
        'Personalize the content we show you.',
        'Respond to your inquiries and requests through contact forms.',
      ],
    },
    thirdParties: {
      title: 'Third Parties',
      text: 'We share data with the following third-party services, all of which have their own privacy policies:',
      items: [
        'Google Analytics: for web traffic analysis and user behavior.',
        'Supabase: as our database and authentication provider.',
        'Vercel: as our web hosting provider.',
        'Civitatis: affiliate links for experience bookings (generates tracking cookies).',
        'Stripe: payment processor for digital product purchases (only if you purchase products).',
      ],
    },
    internationalTransfers: {
      title: 'International Data Transfers',
      text: 'Some of our data processors are located outside the European Union. We use the following secure transfer mechanisms:',
      items: [
        'Google LLC (Analytics): Standard Contractual Clauses (SCC) + Data Processing Amendment.',
        'Supabase Inc: Standard Contractual Clauses (SCC).',
        'Vercel Inc: Standard Contractual Clauses (SCC).',
        'Stripe Inc (payment processing): Standard Contractual Clauses (SCC) + PCI DSS Level 1 Certification.',
      ],
    },
    dataRetention: {
      title: 'Data Retention Periods',
      text: 'Personal data is retained for the following periods:',
      items: [
        'Newsletter emails: until subscription cancellation.',
        'Analytics data: maximum 14 months, then anonymized.',
        'Contact form data: 12 months from last interaction.',
        'Page view data: 13 months, then anonymized.',
      ],
    },
    cookiePolicy: {
      title: 'Cookie Policy',
      text: 'We use cookies for site functionality. Cookies are classified as follows: essential (functionality), analytics (usage analysis), and preferences (personalization). You can disable cookies in your browser settings, although this may affect site functionality. For more details, see our dedicated cookie policy page.',
    },
    affiliateLinks: {
      title: 'Affiliate Links',
      text: 'Our website contains affiliate links to Civitatis. When you click an affiliate link:',
      items: [
        'A cookie is generated on the civitatis.com domain with a 30-day duration.',
        'If you make a purchase during that period, we receive a commission.',
        'We do not share your personal data with Civitatis.',
        'Civitatis\' privacy terms apply when you visit their site.',
      ],
    },
    payments: {
      title: 'Payment Processing',
      text: 'If you purchase digital guides or other digital products on our site:',
      items: [
        'Payments are processed through Stripe Inc.',
        'We do NOT store credit card data on our servers.',
        'Stripe is PCI DSS Level 1 compliant (the highest payment security standard).',
        'Your payment information is protected by Stripe\'s security standards.',
        'See Stripe\'s privacy policy for more information.',
      ],
    },
    minors: {
      title: 'Minors',
      text: 'Tenerife Experiences does not knowingly collect personal data from individuals under 14 years of age. If we become aware that we have collected data from a minor under 14 without parental consent, we will delete that data immediately. If you are under 14 and have provided data, please contact us.',
    },
    userRights: {
      title: 'Your Rights (GDPR)',
      text: 'In accordance with the General Data Protection Regulation (GDPR), you have the following rights:',
      items: [
        'Right of access: you can request a copy of your personal data.',
        'Right to rectification: you can request correction of inaccurate data.',
        'Right to erasure: you can request deletion of your personal data.',
        'Right to restrict processing: you can request that we limit the processing of your data.',
        'Right to data portability: you can request your data in a structured format.',
        'Right to object: you can object to the processing of your data.',
        'Right to withdraw consent: you can withdraw your consent at any time.',
      ],
    },
    complaintRights: {
      title: 'Rights to Lodge a Complaint',
      text: 'If you believe your data protection rights are not being respected, you have the right to lodge a complaint with the competent supervisory authority:',
      items: [
        'Spanish Data Protection Authority (AEPD)',
        'Address: C/ Jorge Juan, 6 - 28001 Madrid',
        'Website: www.aepd.es',
        'You can file a complaint online through the AEPD website.',
      ],
    },
    updates: {
      title: 'Updates to This Policy',
      text: 'We reserve the right to update this privacy policy at any time. Significant changes will be communicated through our website or email to subscribed users. Continued use of the site after such changes constitutes acceptance of the updated privacy policy. The date of last update is shown at the top of this page.',
    },
    contact: {
      title: 'Contact',
      text: 'To exercise any of these rights, if you have questions about our privacy policy, or if you wish to report a concern about the processing of your data, you can contact us at:',
      email: 'info@tenerifeexperiences.com',
    },
  },
}

export default function PrivacyPage() {
  const locale = useLocale()
  const t = locale === 'es' ? content.es : content.en

  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="prose prose-invert prose-orange max-w-none">
          <h1 className="text-4xl font-bold text-white mb-2">{t.title}</h1>
          <p className="text-sm text-gray-500 mb-12">{t.lastUpdated}</p>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">{t.whoWeAre.title}</h2>
          <p className="text-gray-400 leading-relaxed">{t.whoWeAre.text}</p>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">{t.dataController.title}</h2>
          <p className="text-gray-400 leading-relaxed mb-4">{t.dataController.text}</p>
          <ul className="space-y-2">
            {t.dataController.items.map((item, i) => (
              <li key={i} className="text-gray-400 leading-relaxed">{item}</li>
            ))}
          </ul>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">{t.dataCollect.title}</h2>
          <ul className="space-y-2">
            {t.dataCollect.items.map((item, i) => (
              <li key={i} className="text-gray-400 leading-relaxed">{item}</li>
            ))}
          </ul>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">{t.legalBasis.title}</h2>
          <p className="text-gray-400 leading-relaxed mb-4">{t.legalBasis.text}</p>
          <ul className="space-y-2">
            {t.legalBasis.items.map((item, i) => (
              <li key={i} className="text-gray-400 leading-relaxed">{item}</li>
            ))}
          </ul>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">{t.howWeUse.title}</h2>
          <ul className="space-y-2">
            {t.howWeUse.items.map((item, i) => (
              <li key={i} className="text-gray-400 leading-relaxed">{item}</li>
            ))}
          </ul>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">{t.thirdParties.title}</h2>
          <p className="text-gray-400 leading-relaxed mb-4">{t.thirdParties.text}</p>
          <ul className="space-y-2">
            {t.thirdParties.items.map((item, i) => (
              <li key={i} className="text-gray-400 leading-relaxed">{item}</li>
            ))}
          </ul>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">{t.internationalTransfers.title}</h2>
          <p className="text-gray-400 leading-relaxed mb-4">{t.internationalTransfers.text}</p>
          <ul className="space-y-2">
            {t.internationalTransfers.items.map((item, i) => (
              <li key={i} className="text-gray-400 leading-relaxed">{item}</li>
            ))}
          </ul>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">{t.dataRetention.title}</h2>
          <p className="text-gray-400 leading-relaxed mb-4">{t.dataRetention.text}</p>
          <ul className="space-y-2">
            {t.dataRetention.items.map((item, i) => (
              <li key={i} className="text-gray-400 leading-relaxed">{item}</li>
            ))}
          </ul>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">{t.cookiePolicy.title}</h2>
          <p className="text-gray-400 leading-relaxed">{t.cookiePolicy.text}</p>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">{t.affiliateLinks.title}</h2>
          <p className="text-gray-400 leading-relaxed mb-4">{t.affiliateLinks.text}</p>
          <ul className="space-y-2">
            {t.affiliateLinks.items.map((item, i) => (
              <li key={i} className="text-gray-400 leading-relaxed">{item}</li>
            ))}
          </ul>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">{t.payments.title}</h2>
          <p className="text-gray-400 leading-relaxed mb-4">{t.payments.text}</p>
          <ul className="space-y-2">
            {t.payments.items.map((item, i) => (
              <li key={i} className="text-gray-400 leading-relaxed">{item}</li>
            ))}
          </ul>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">{t.minors.title}</h2>
          <p className="text-gray-400 leading-relaxed">{t.minors.text}</p>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">{t.userRights.title}</h2>
          <p className="text-gray-400 leading-relaxed mb-4">{t.userRights.text}</p>
          <ul className="space-y-2">
            {t.userRights.items.map((item, i) => (
              <li key={i} className="text-gray-400 leading-relaxed">{item}</li>
            ))}
          </ul>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">{t.complaintRights.title}</h2>
          <p className="text-gray-400 leading-relaxed mb-4">{t.complaintRights.text}</p>
          <ul className="space-y-2">
            {t.complaintRights.items.map((item, i) => (
              <li key={i} className="text-gray-400 leading-relaxed">{item}</li>
            ))}
          </ul>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">{t.updates.title}</h2>
          <p className="text-gray-400 leading-relaxed">{t.updates.text}</p>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">{t.contact.title}</h2>
          <p className="text-gray-400 leading-relaxed">{t.contact.text}</p>
          <p className="mt-2">
            <a
              href={`mailto:${t.contact.email}`}
              className="text-orange-400 hover:text-orange-300 transition-colors"
            >
              {t.contact.email}
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
