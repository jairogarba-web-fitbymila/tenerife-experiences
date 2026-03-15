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
        text: 'Estas cookies son necesarias para el funcionamiento basico del sitio web. Incluyen cookies que permiten recordar tu seleccion de idioma, gestionar tu sesion y garantizar la seguridad del sitio. Sin estas cookies, el sitio no puede funcionar correctamente.',
        examples: [
          'Preferencia de idioma',
          'Estado de sesion',
          'Seguridad y proteccion CSRF',
        ],
      },
      analytics: {
        title: 'Cookies de analisis',
        text: 'Utilizamos cookies de analisis para entender como los visitantes interactuan con nuestro sitio web. Estas cookies nos ayudan a mejorar la experiencia del usuario recopilando informacion anonima sobre las paginas mas visitadas, el tiempo de permanencia y los patrones de navegacion.',
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
    },
    thirdPartyCookies: {
      title: 'Cookies de terceros',
      text: 'Ademas de nuestras propias cookies, utilizamos cookies de terceros para los siguientes propositos:',
      items: [
        'Google Analytics: utiliza cookies para recopilar informacion sobre como los visitantes utilizan nuestro sitio. La informacion se utiliza para compilar informes y ayudarnos a mejorar el sitio. Las cookies recopilan informacion de forma anonima, incluyendo el numero de visitantes, de donde han llegado al sitio y las paginas que visitaron.',
      ],
      text2: 'Para mas informacion sobre como Google utiliza tus datos, visita la pagina de privacidad de Google Analytics.',
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
        text: 'These cookies are necessary for the basic functioning of the website. They include cookies that allow remembering your language selection, managing your session, and ensuring site security. Without these cookies, the site cannot function properly.',
        examples: [
          'Language preference',
          'Session state',
          'Security and CSRF protection',
        ],
      },
      analytics: {
        title: 'Analytics Cookies',
        text: 'We use analytics cookies to understand how visitors interact with our website. These cookies help us improve user experience by collecting anonymous information about the most visited pages, time spent, and browsing patterns.',
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
    },
    thirdPartyCookies: {
      title: 'Third-Party Cookies',
      text: 'In addition to our own cookies, we use third-party cookies for the following purposes:',
      items: [
        'Google Analytics: uses cookies to collect information about how visitors use our site. The information is used to compile reports and help us improve the site. The cookies collect information anonymously, including the number of visitors, where they came from, and the pages they visited.',
      ],
      text2: 'For more information on how Google uses your data, visit the Google Analytics privacy page.',
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

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">{t.howToManage.title}</h2>
          <p className="text-gray-400 leading-relaxed mb-4">{t.howToManage.text}</p>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">{t.howToManage.browser.title}</h3>
          <p className="text-gray-400 leading-relaxed mb-3">{t.howToManage.browser.text}</p>
          <ul className="space-y-1">
            {t.howToManage.browser.items.map((item, i) => (
              <li key={i} className="text-gray-400">{item}</li>
            ))}
          </ul>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">{t.thirdPartyCookies.title}</h2>
          <p className="text-gray-400 leading-relaxed mb-4">{t.thirdPartyCookies.text}</p>
          <ul className="space-y-2">
            {t.thirdPartyCookies.items.map((item, i) => (
              <li key={i} className="text-gray-400 leading-relaxed">{item}</li>
            ))}
          </ul>
          <p className="text-gray-400 leading-relaxed mt-4">{t.thirdPartyCookies.text2}</p>
        </div>
      </div>
    </section>
  )
}
