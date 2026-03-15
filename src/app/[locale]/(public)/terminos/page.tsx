'use client'

import { useLocale } from 'next-intl'

const content = {
  es: {
    title: 'Terminos de Servicio',
    lastUpdated: 'Ultima actualizacion: Marzo 2026',
    acceptance: {
      title: 'Aceptacion de los Terminos',
      text: 'Al acceder y utilizar Tenerife Experiences (en adelante, "el Sitio"), aceptas cumplir y quedar vinculado por estos Terminos de Servicio. Si no estas de acuerdo con alguno de estos terminos, te rogamos que no utilices el Sitio. Nos reservamos el derecho de modificar estos terminos en cualquier momento, y tu uso continuado del Sitio constituye la aceptacion de dichas modificaciones.',
    },
    serviceDescription: {
      title: 'Descripcion del Servicio',
      text: 'Tenerife Experiences es una plataforma informativa que proporciona guias, recomendaciones y contenido sobre experiencias turisticas, actividades, restaurantes, alojamientos y servicios en Tenerife, Islas Canarias. El Sitio actua como intermediario informativo y no es el proveedor directo de las experiencias o servicios listados.',
    },
    userObligations: {
      title: 'Obligaciones del Usuario',
      items: [
        'Utilizar el Sitio de forma legal y respetuosa.',
        'No reproducir, duplicar o copiar contenido del Sitio sin autorizacion previa.',
        'No intentar acceder a areas restringidas del Sitio.',
        'Proporcionar informacion veraz al suscribirse al boletin o completar formularios.',
        'No utilizar el Sitio para fines comerciales no autorizados.',
      ],
    },
    intellectualProperty: {
      title: 'Propiedad Intelectual',
      text: 'Todo el contenido del Sitio, incluyendo textos, imagenes, graficos, logotipos, iconos, videos y software, es propiedad de Tenerife Experiences o de sus respectivos propietarios y esta protegido por las leyes de propiedad intelectual aplicables. Queda prohibida la reproduccion, distribucion o modificacion del contenido sin autorizacion expresa.',
    },
    liability: {
      title: 'Limitacion de Responsabilidad',
      items: [
        'El contenido del Sitio se proporciona "tal cual" y con fines informativos unicamente.',
        'No garantizamos la exactitud, integridad o actualidad de la informacion proporcionada.',
        'No somos responsables de las experiencias, servicios o productos ofrecidos por terceros listados en el Sitio.',
        'No nos hacemos responsables de danos directos, indirectos, incidentales o consecuentes derivados del uso del Sitio.',
        'Los precios, horarios y disponibilidad de los servicios de terceros pueden variar sin previo aviso.',
      ],
    },
    affiliateLinks: {
      title: 'Enlaces de Afiliados',
      text: 'Algunos enlaces en el Sitio pueden ser enlaces de afiliados. Esto significa que podemos recibir una comision si realizas una compra a traves de estos enlaces, sin coste adicional para ti. Estas comisiones nos ayudan a mantener y mejorar el Sitio. Siempre recomendamos productos y servicios que consideramos de calidad, independientemente de las comisiones de afiliados.',
    },
    partnerListings: {
      title: 'Listados de Colaboradores',
      text: 'El Sitio incluye listados de negocios y servicios locales que pueden ser colaboradores pagados. Aunque trabajamos con estos colaboradores, las opiniones y recomendaciones publicadas son independientes. Los listados de colaboradores estan identificados cuando corresponde. No garantizamos la calidad de los servicios ofrecidos por los colaboradores y te recomendamos verificar la informacion directamente con el proveedor.',
    },
    governingLaw: {
      title: 'Ley Aplicable',
      text: 'Estos Terminos de Servicio se rigen e interpretan de acuerdo con las leyes de Espana. Cualquier disputa derivada del uso del Sitio sera sometida a la jurisdiccion de los tribunales competentes de Santa Cruz de Tenerife, Espana, sin perjuicio de los derechos que puedan corresponder al consumidor segun la legislacion aplicable.',
    },
  },
  en: {
    title: 'Terms of Service',
    lastUpdated: 'Last updated: March 2026',
    acceptance: {
      title: 'Acceptance of Terms',
      text: 'By accessing and using Tenerife Experiences (hereinafter, "the Site"), you agree to comply with and be bound by these Terms of Service. If you do not agree with any of these terms, please do not use the Site. We reserve the right to modify these terms at any time, and your continued use of the Site constitutes acceptance of such modifications.',
    },
    serviceDescription: {
      title: 'Service Description',
      text: 'Tenerife Experiences is an informational platform that provides guides, recommendations, and content about tourist experiences, activities, restaurants, accommodations, and services in Tenerife, Canary Islands. The Site acts as an informational intermediary and is not the direct provider of the experiences or services listed.',
    },
    userObligations: {
      title: 'User Obligations',
      items: [
        'Use the Site in a legal and respectful manner.',
        'Do not reproduce, duplicate, or copy Site content without prior authorization.',
        'Do not attempt to access restricted areas of the Site.',
        'Provide truthful information when subscribing to the newsletter or completing forms.',
        'Do not use the Site for unauthorized commercial purposes.',
      ],
    },
    intellectualProperty: {
      title: 'Intellectual Property',
      text: 'All content on the Site, including text, images, graphics, logos, icons, videos, and software, is the property of Tenerife Experiences or its respective owners and is protected by applicable intellectual property laws. Reproduction, distribution, or modification of content without express authorization is prohibited.',
    },
    liability: {
      title: 'Limitation of Liability',
      items: [
        'Site content is provided "as is" and for informational purposes only.',
        'We do not guarantee the accuracy, completeness, or timeliness of the information provided.',
        'We are not responsible for the experiences, services, or products offered by third parties listed on the Site.',
        'We are not liable for direct, indirect, incidental, or consequential damages arising from the use of the Site.',
        'Prices, schedules, and availability of third-party services may change without prior notice.',
      ],
    },
    affiliateLinks: {
      title: 'Affiliate Links Disclosure',
      text: 'Some links on the Site may be affiliate links. This means we may receive a commission if you make a purchase through these links, at no additional cost to you. These commissions help us maintain and improve the Site. We always recommend products and services we consider to be of quality, regardless of affiliate commissions.',
    },
    partnerListings: {
      title: 'Partner Listings Disclaimer',
      text: 'The Site includes listings of local businesses and services that may be paid partners. While we work with these partners, the opinions and recommendations published are independent. Partner listings are identified where applicable. We do not guarantee the quality of services offered by partners and recommend that you verify information directly with the provider.',
    },
    governingLaw: {
      title: 'Governing Law',
      text: 'These Terms of Service are governed by and construed in accordance with the laws of Spain. Any dispute arising from the use of the Site shall be submitted to the jurisdiction of the competent courts of Santa Cruz de Tenerife, Spain, without prejudice to the rights that may correspond to the consumer under applicable legislation.',
    },
  },
}

export default function TermsPage() {
  const locale = useLocale()
  const t = locale === 'es' ? content.es : content.en

  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="prose prose-invert prose-orange max-w-none">
          <h1 className="text-4xl font-bold text-white mb-2">{t.title}</h1>
          <p className="text-sm text-gray-500 mb-12">{t.lastUpdated}</p>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">{t.acceptance.title}</h2>
          <p className="text-gray-400 leading-relaxed">{t.acceptance.text}</p>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">{t.serviceDescription.title}</h2>
          <p className="text-gray-400 leading-relaxed">{t.serviceDescription.text}</p>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">{t.userObligations.title}</h2>
          <ul className="space-y-2">
            {t.userObligations.items.map((item, i) => (
              <li key={i} className="text-gray-400 leading-relaxed">{item}</li>
            ))}
          </ul>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">{t.intellectualProperty.title}</h2>
          <p className="text-gray-400 leading-relaxed">{t.intellectualProperty.text}</p>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">{t.liability.title}</h2>
          <ul className="space-y-2">
            {t.liability.items.map((item, i) => (
              <li key={i} className="text-gray-400 leading-relaxed">{item}</li>
            ))}
          </ul>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">{t.affiliateLinks.title}</h2>
          <p className="text-gray-400 leading-relaxed">{t.affiliateLinks.text}</p>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">{t.partnerListings.title}</h2>
          <p className="text-gray-400 leading-relaxed">{t.partnerListings.text}</p>

          <h2 className="text-2xl font-semibold text-white mt-10 mb-4">{t.governingLaw.title}</h2>
          <p className="text-gray-400 leading-relaxed">{t.governingLaw.text}</p>
        </div>
      </div>
    </section>
  )
}
