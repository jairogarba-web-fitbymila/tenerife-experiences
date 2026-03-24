'use client'

import { useLocale } from 'next-intl'

const content = {
  es: {
    title: 'Politica de Cookies',
    lastUpdated: 'Ultima actualizacion: Marzo 2026',
    whatAreCookies: {
      title: 'Que son las cookies',
      text: 'Las cookies son pequenos archivos de texto que los sitios web almacenan en tu dispositivo (ordenador, tablet o movil) cuando los visitas. Se utilizan ampliamente para hacer que los sitios web funcionen de manera eficiente, asi como para proporcionar informacion a los propietarios del sitio.',
    },
    typesWeUse: {
      title: 'Tipos de cookies que utilizamos',
      essential: {
        title: 'Cookies esenciales',
        text: 'Estas cookies son necesarias para el funcionamiento basico del sitio web. Incluyen cookies que permiten recordar tu seleccion de idioma, gestionar tu sesion y garantizar la seguridad del sitio. Sin estas cookies, el sitio no puede funcionar correctamente. Las cookies esenciales se pueden establecer sin consentimiento previo conforme a la Directiva ePrivacy.',
        examples: [
          'Preferencia de idioma',
          'Estado de sesion',
          'Seguridad y proteccion CSRF',
        ],
      },
      analytics: {
        title: 'Cookies de analisis',
        text: 'Utilizamos cookies de analisis para entender como los visitantes interactuan con nuestro sitio web. Estas cookies nos ayudan a mejorar la experiencia del usuario recopilando informacion anonima sobre las paginas mas visitadas, el tiempo de permanencia y los patrones de navegacion. Las cookies de analisis SOLO se establecen despues de que hayas dado tu consentimiento explicitamente a traves del banner de cookies que se muestra en tu primera visita.',
        examples: [
          'Google Analytics (_ga, _gid): para analizar el trafico y comportamiento de los usuarios.',
          'Datos de rendimiento del sitio.',
        ],
      },
      preferences: {
        title: 'Cookies de preferencias',
        text: 'Estas cookies permiten que el sitio recuerde las elecciones que haces (como tu idioma preferido o la region en la que te encuentras) y proporcionan funciones mejoradas y mas personalizadas.',
        examples: [
          'Preferencias de visualizacion',
          'Configuracion regional',
          'Preferencias de consentimiento de cookies',
        ],
      },
    },
    cookieTable: {
      title: 'Cookies especificas utilizadas',
      subtitle: 'Listado detallado de todas las cookies',
      headers: ['Nombre de cookie', 'Proveedor', 'Proposito', 'Duracion'],
      cookies: [
        ['cookie-consent', 'Tenerife Experiences', 'Almacena tu preferencia de cookies', '13 meses'],
        ['cookie-consent-date', 'Tenerife Experiences', 'Registra cuando se dio el consentimiento', '13 meses'],
        ['_ga', 'Google Analytics', 'Distingue usuarios', '2 años'],
        ['_gid', 'Google Analytics', 'Distingue usuarios', '24 horas'],
        ['_gat', 'Google Analytics', 'Limita la tasa de solicitudes', '1 minuto'],
        ['te_session_id', 'Tenerife Experiences (sessionStorage)', 'Seguimiento anonimo de sesion', 'Sesion del navegador'],
        ['NEXT_LOCALE', 'Next.js', 'Preferencia de idioma', 'Sesion'],
      ],
    },
    howToManage: {
      title: 'Como gestionar las cookies',
      text: 'Puedes controlar y gestionar las cookies de varias maneras. Ten en cuenta que eliminar o bloquear cookies puede afectar tu experiencia de usuario y es posible que algunas partes del sitio no funcionen correctamente.',
      browser: {
        title: 'Configuracion del navegador',
        text: 'La mayoria de los navegadores te permiten gestionar las cookies a traves de su configuracion. Puedes configurar tu navegador para que rechace todas las cookies, acepte solo algunas o te notifique cuando un sitio quiere establecer una cookie.',
        items: [
          'Chrome: Configuracion > Privacidad y seguridad > Cookies',
          'Firefox: Opciones > Privacidad y seguridad',
          'Safari: Preferencias > Privacidad',
          'Edge: Configuracion > Cookies y permisos del sitio',
        ],
      },
      withdrawConsent: {
        title: 'Como retirar el consentimiento',
        text: 'Puedes retirar tu consentimiento de cookies en cualquier momento de las siguientes maneras:',
        items: [
          'Haz clic en "Personalizar" en el banner de cookies (se muestra en tu primera visita)',
          'Borra las cookies en la configuracion de tu navegador',
          'Elimina la entrada "cookie-consent" de localStorage para restaurar el banner de consentimiento',
          'Envia un correo electronico a info@tenerifeexperiences.com con una solicitud para retirar tu consentimiento',
        ],
      },
      consentRenewal: {
        title: 'Renovacion anual del consentimiento',
        text: 'Tu consentimiento de cookies expira despues de 13 meses. Te pediremos nuevamente que confirmes tus preferencias de cookies cuando vuelvas a visitarnos pasado este periodo.',
      },
    },
    thirdPartyCookies: {
      title: 'Cookies de terceros',
      text: 'Ademas de nuestras propias cookies, utilizamos cookies de terceros para los siguientes propositos:',
      items: [
        {
          title: 'Google Analytics',
          description: 'Utiliza cookies para recopilar informacion sobre como los visitantes utilizan nuestro sitio. La informacion se utiliza para compilar informes y ayudarnos a mejorar el sitio. Las cookies recopilan informacion de forma anonima, incluyendo el numero de visitantes, de donde han llegado al sitio y las paginas que visitaron.',
          links: [
            { text: 'Politica de privacidad de Google', url: 'https://policies.google.com/privacy' },
            { text: 'Herramienta de exclusion de Google Analytics', url: 'https://tools.google.com/dlpage/gaoptout' },
          ],
        },
        {
          title: 'Civitatis (Enlaces de afiliados)',
          description: 'Cuando haces clic en enlaces de afiliados de Civitatis, Civitatis establece sus propias cookies para realizar un seguimiento de tu sesion durante 30 dias. Estas cookies estan gobernadas por la politica de privacidad de Civitatis y se utilizan para rastrear comisiones de afiliados.',
          links: [
            { text: 'Politica de privacidad de Civitatis', url: 'https://www.civitatis.com/es/info/politica-privacidad/' },
          ],
        },
      ],
    },
  },
  en: {
    title: 'Cookie Policy',
    lastUpdated: 'Last updated: March 2026',
    whatAreCookies: {
      title: 'What Are Cookies',
      text: 'Cookies are small text files that websites store on your device (computer, tablet, or mobile) when you visit them. They are widely used to make websites work efficiently, as well as to provide information to site owners.',
    },
    typesWeUse: {
      title: 'Types of Cookies We Use',
      essential: {
        title: 'Essential Cookies',
        text: 'These cookies are necessary for the basic functioning of the website. They include cookies that allow remembering your language selection, managing your session, and ensuring site security. Without these cookies, the site cannot function properly. Essential cookies may be set without prior consent under the ePrivacy Directive.',
        examples: [
          'Language preference',
          'Session state',
          'Security and CSRF protection',
        ],
      },
      analytics: {
        title: 'Analytics Cookies',
        text: 'We use analytics cookies to understand how visitors interact with our website. These cookies help us improve user experience by collecting anonymous information about the most visited pages, time spent, and browsing patterns. Analytics cookies are ONLY set after you explicitly consent through the cookie banner displayed on your first visit.',
        examples: [
          'Google Analytics (_ga, _gid): to analyze traffic and user behavior.',
          'Site performance data.',
        ],
      },
      preferences: {
        title: 'Preference Cookies',
        text: 'These cookies allow the site to remember choices you make (such as your preferred language or the region you are in) and provide enhanced, more personalized features.',
        examples: [
          'Display preferences',
          'Regional settings',
          'Cookie consent preferences',
        ],
      },
    },
    cookieTable: {
      title: 'Specific Cookies Used',
      subtitle: 'Detailed list of all cookies',
      headers: ['Cookie Name', 'Provider', 'Purpose', 'Duration'],
      cookies: [
        ['cookie-consent', 'Tenerife Experiences', 'Stores your cookie preference', '13 months'],
        ['cookie-consent-date', 'Tenerife Experiences', 'Records when consent was given', '13 months'],
        ['_ga', 'Google Analytics', 'Distinguishes users', '2 years'],
        ['_gid', 'Google Analytics', 'Distinguishes users', '24 hours'],
        ['_gat', 'Google Analytics', 'Throttles request rate', '1 minute'],
        ['te_session_id', 'Tenerife Experiences (sessionStorage)', 'Anonymous session tracking', 'Browser session'],
        ['NEXT_LOCALE', 'Next.js', 'Language preference', 'Session'],
      ],
    },
    howToManage: {
      title: 'How to Manage Cookies',
      text: 'You can control and manage cookies in several ways. Please note that removing or blocking cookies may affect your user experience and some parts of the site may not function properly.',
      browser: {
        title: 'Browser Settings',
        text: 'Most browsers allow you to manage cookies through their settings. You can configure your browser to reject all cookies, accept only some, or notify you when a site wants to set a cookie.',
        items: [
          'Chrome: Settings > Privacy and Security > Cookies',
          'Firefox: Options > Privacy & Security',
          'Safari: Preferences > Privacy',
          'Edge: Settings > Cookies and Site Permissions',
        ],
      },
      withdrawConsent: {
        title: 'How to Withdraw Consent',
        text: 'You can withdraw your cookie consent at any time in the following ways:',
        items: [
          'Click on "Customize" in the cookie banner (shown on your first visit)',
          'Delete cookies in your browser settings',
          'Delete the "cookie-consent" entry from localStorage to reset the consent banner',
          'Email info@tenerifeexperiences.com with a request to withdraw your consent',
        ],
      },
      consentRenewal: {
        title: 'Annual Consent Renewal',
        text: 'Your cookie consent expires after 13 months. We will ask you to confirm your cookie preferences again when you return to our site after this period.',
      },
    },
    thirdPartyCookies: {
      title: 'Third-Party Cookies',
      text: 'In addition to our own cookies, we use third-party cookies for the following purposes:',
      items: [
        {
          title: 'Google Analytics',
          description: 'Uses cookies to collect information about how visitors use our site. The information is used to compile reports and help us improve the site. The cookies collect information anonymously, including the number of visitors, where they came from, and the pages they visited.',
          links: [
            { text: 'Google Privacy Policy', url: 'https://policies.google.com/privacy' },
            { text: 'Google Analytics Opt-out Tool', url: 'https://tools.google.com/dlpage/gaoptout' },
          ],
        },
        {
          title: 'Civitatis (Affiliate Links)',
          description: 'When you click on Civitatis affiliate links, Civitatis sets its own cookies to track your session for 30 days. These cookies are governed by Civitatis privacy policy and are used to track affiliate commissions.',
          links: [
            { text: 'Civitatis Privacy Policy', url: 'https://www.civitatis.com/es/info/politica-privacidad/' },
          ],
        },
      ],
    },
  },
}

export default function CookiesPage() {
  const locale = useLocale()
  const t = locale === 'es' ? content.es : content.en

  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="prose prose-invert prose-orange max-w-none">
          <h1 className="text-4xl font-bold text-white mb-2">{t.title}</h1>
          <p className="text-sm text-gray-500 mb-12">{t.lastUpdated}</p>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">{t.whatAreCookies.title}</h2>
          <p className="text-gray-400 leading-relaxed">{t.whatAreCookies.text}</p>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">{t.typesWeUse.title}</h2>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">{t.typesWeUse.essential.title}</h3>
          <p className="text-gray-400 leading-relaxed mb-3">{t.typesWeUse.essential.text}</p>
          <ul className="space-y-1">
            {t.typesWeUse.essential.examples.map((item, i) => (
              <li key={i} className="text-gray-400">{item}</li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">{t.typesWeUse.analytics.title}</h3>
          <p className="text-gray-400 leading-relaxed mb-3">{t.typesWeUse.analytics.text}</p>
          <ul className="space-y-1">
            {t.typesWeUse.analytics.examples.map((item, i) => (
              <li key={i} className="text-gray-400">{item}</li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">{t.typesWeUse.preferences.title}</h3>
          <p className="text-gray-400 leading-relaxed mb-3">{t.typesWeUse.preferences.text}</p>
          <ul className="space-y-1">
            {t.typesWeUse.preferences.examples.map((item, i) => (
              <li key={i} className="text-gray-400">{item}</li>
            ))}
          </ul>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">{t.cookieTable.title}</h2>
          <p className="text-gray-400 leading-relaxed mb-4">{t.cookieTable.subtitle}</p>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm text-gray-400">
              <thead>
                <tr className="border-b border-gray-700">
                  {t.cookieTable.headers.map((header, i) => (
                    <th key={i} className="text-left py-3 px-2 font-semibold text-white">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.cookieTable.cookies.map((row, rowIdx) => (
                  <tr key={rowIdx} className="border-b border-gray-800 hover:bg-gray-900/20">
                    {row.map((cell, cellIdx) => (
                      <td key={cellIdx} className="py-3 px-2">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">{t.howToManage.title}</h2>
          <p className="text-gray-400 leading-relaxed mb-4">{t.howToManage.text}</p>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">{t.howToManage.browser.title}</h3>
          <p className="text-gray-400 leading-relaxed mb-3">{t.howToManage.browser.text}</p>
          <ul className="space-y-1">
            {t.howToManage.browser.items.map((item, i) => (
              <li key={i} className="text-gray-400">{item}</li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">{t.howToManage.withdrawConsent.title}</h3>
          <p className="text-gray-400 leading-relaxed mb-3">{t.howToManage.withdrawConsent.text}</p>
          <ul className="space-y-1">
            {t.howToManage.withdrawConsent.items.map((item, i) => (
              <li key={i} className="text-gray-400">{item}</li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">{t.howToManage.consentRenewal.title}</h3>
          <p className="text-gray-400 leading-relaxed">{t.howToManage.consentRenewal.text}</p>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">{t.thirdPartyCookies.title}</h2>
          <p className="text-gray-400 leading-relaxed mb-6">{t.thirdPartyCookies.text}</p>

          {t.thirdPartyCookies.items.map((item, idx) => (
            <div key={idx} className="mb-8 pb-6 border-b border-gray-800 last:border-b-0">
              <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed mb-3">{item.description}</p>
              <ul className="space-y-2">
                {item.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-400 hover:text-orange-300 underline transition-colors"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
