'use client'

import { useLocale } from 'next-intl'

const content = {
  es: {
    title: 'Politica de Privacidad',
    lastUpdated: 'Ultima actualizacion: Marzo 2026',
    whoWeAre: {
      title: 'Quienes somos',
      text: 'Tenerife Experiences es una plataforma digital dedicada a promocionar experiencias turisticas, actividades y servicios en la isla de Tenerife, Islas Canarias, Espana. Nuestra mision es conectar a visitantes con las mejores experiencias que la isla tiene para ofrecer.',
    },
    dataCollect: {
      title: 'Que datos recopilamos',
      items: [
        'Direccion de correo electronico: cuando te suscribes a nuestro boletin informativo.',
        'Datos de navegacion: informacion sobre como interactuas con nuestro sitio web, incluyendo paginas visitadas, tiempo de permanencia y dispositivo utilizado.',
        'Cookies: utilizamos cookies esenciales, de analisis y de preferencias para mejorar tu experiencia.',
        'Datos de analisis: recopilamos datos anonimizados sobre el uso del sitio a traves de herramientas de analisis.',
      ],
    },
    howWeUse: {
      title: 'Como usamos tus datos',
      items: [
        'Mejorar nuestros servicios y la experiencia del usuario.',
        'Enviar nuestro boletin informativo con novedades y recomendaciones (solo si te has suscrito).',
        'Analizar el trafico del sitio web para entender como los usuarios interactuan con nuestra plataforma.',
        'Personalizar el contenido que te mostramos.',
      ],
    },
    thirdParties: {
      title: 'Terceros',
      text: 'Compartimos datos con los siguientes servicios de terceros, todos ellos con sus propias politicas de privacidad:',
      items: [
        'Google Analytics: para analisis de trafico web y comportamiento de usuarios.',
        'Supabase: como proveedor de base de datos y autenticacion.',
        'Vercel: como proveedor de alojamiento web.',
      ],
    },
    cookiePolicy: {
      title: 'Politica de Cookies',
      text: 'Utilizamos cookies para el funcionamiento del sitio. Puedes consultar nuestra politica de cookies detallada en nuestra pagina dedicada. Puedes desactivar las cookies en la configuracion de tu navegador, aunque esto puede afectar la funcionalidad del sitio.',
    },
    userRights: {
      title: 'Tus derechos (RGPD)',
      text: 'De acuerdo con el Reglamento General de Proteccion de Datos (RGPD), tienes los siguientes derechos:',
      items: [
        'Derecho de acceso: puedes solicitar una copia de tus datos personales.',
        'Derecho de rectificacion: puedes solicitar la correccion de datos inexactos.',
        'Derecho de supresion: puedes solicitar la eliminacion de tus datos personales.',
        'Derecho de portabilidad: puedes solicitar tus datos en un formato estructurado.',
        'Derecho de oposicion: puedes oponerte al tratamiento de tus datos.',
        'Derecho a retirar el consentimiento: puedes retirar tu consentimiento en cualquier momento.',
      ],
    },
    contact: {
      title: 'Contacto',
      text: 'Para ejercer cualquiera de estos derechos o si tienes preguntas sobre nuestra politica de privacidad, puedes contactarnos en:',
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
    dataCollect: {
      title: 'What Data We Collect',
      items: [
        'Email address: when you subscribe to our newsletter.',
        'Browsing data: information about how you interact with our website, including pages visited, time spent, and device used.',
        'Cookies: we use essential, analytics, and preference cookies to improve your experience.',
        'Analytics data: we collect anonymized data about site usage through analytics tools.',
      ],
    },
    howWeUse: {
      title: 'How We Use Your Data',
      items: [
        'Improve our services and user experience.',
        'Send our newsletter with updates and recommendations (only if you have subscribed).',
        'Analyze website traffic to understand how users interact with our platform.',
        'Personalize the content we show you.',
      ],
    },
    thirdParties: {
      title: 'Third Parties',
      text: 'We share data with the following third-party services, all of which have their own privacy policies:',
      items: [
        'Google Analytics: for web traffic analysis and user behavior.',
        'Supabase: as our database and authentication provider.',
        'Vercel: as our web hosting provider.',
      ],
    },
    cookiePolicy: {
      title: 'Cookie Policy',
      text: 'We use cookies for site functionality. You can find our detailed cookie policy on our dedicated page. You can disable cookies in your browser settings, although this may affect site functionality.',
    },
    userRights: {
      title: 'Your Rights (GDPR)',
      text: 'In accordance with the General Data Protection Regulation (GDPR), you have the following rights:',
      items: [
        'Right of access: you can request a copy of your personal data.',
        'Right to rectification: you can request correction of inaccurate data.',
        'Right to erasure: you can request deletion of your personal data.',
        'Right to data portability: you can request your data in a structured format.',
        'Right to object: you can object to the processing of your data.',
        'Right to withdraw consent: you can withdraw your consent at any time.',
      ],
    },
    contact: {
      title: 'Contact',
      text: 'To exercise any of these rights or if you have questions about our privacy policy, you can contact us at:',
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

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">{t.dataCollect.title}</h2>
          <ul className="space-y-2">
            {t.dataCollect.items.map((item, i) => (
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

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">{t.cookiePolicy.title}</h2>
          <p className="text-gray-400 leading-relaxed">{t.cookiePolicy.text}</p>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">{t.userRights.title}</h2>
          <p className="text-gray-400 leading-relaxed mb-4">{t.userRights.text}</p>
          <ul className="space-y-2">
            {t.userRights.items.map((item, i) => (
              <li key={i} className="text-gray-400 leading-relaxed">{item}</li>
            ))}
          </ul>

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
