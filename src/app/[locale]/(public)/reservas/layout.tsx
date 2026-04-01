const translations: Record<string, { title: string; description: string }> = {
  es: {
    title: 'Reservas | Tenerife Experiences',
    description: 'Próximamente: sistema de reservas online para experiencias en Tenerife.',
  },
  en: {
    title: 'Bookings | Tenerife Experiences',
    description: 'Coming Soon: online booking system for experiences in Tenerife.',
  },
  de: {
    title: 'Buchungen | Tenerife Experiences',
    description: 'Demnächst verfügbar: Online-Buchungssystem für Erlebnisse in Teneriffa.',
  },
  fr: {
    title: 'Réservations | Tenerife Experiences',
    description: 'Bientôt disponible : système de réservation en ligne pour les expériences à Ténérife.',
  },
  ru: {
    title: 'Бронирования | Tenerife Experiences',
    description: 'Скоро доступно: система онлайн-бронирования для впечатлений на Тенерифе.',
  },
  it: {
    title: 'Prenotazioni | Tenerife Experiences',
    description: 'Prossimamente disponibile: sistema di prenotazione online per esperienze a Tenerife.',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = translations[locale] || translations.en
  return {
    title: t.title,
    description: t.description,
    robots: 'noindex',
  }
}

export default function ReservasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
