'use client'

import { useState } from 'react'
import { Link } from '@/i18n/routing'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Bell, CheckCircle } from 'lucide-react'

const translations = {
  es: {
    meta: {
      title: 'Reservas | Tenerife Experiences',
      description: 'Próximamente: sistema de reservas online para experiencias en Tenerife.',
    },
    badge: 'Próximamente',
    title: 'Reservas Online',
    subtitle: 'Estamos trabajando para ofrecerte la mejor experiencia de reserva. Muy pronto podrás reservar tus experiencias en Tenerife directamente desde aquí.',
    formLabel: 'Notifícame cuando esté listo',
    formPlaceholder: 'tu@email.com',
    formButton: 'Avísame',
    successTitle: '¡Gracias por tu interés!',
    successMessage: 'Te avisaremos cuando el sistema de reservas esté listo. Revisa tu correo electrónico para confirmación.',
    backHome: 'Volver al Inicio',
    features: {
      secure: 'Reserva Segura',
      secureDesc: 'Plataforma segura y encriptada para tus transacciones',
      cancellation: 'Cancelación Gratuita',
      cancellationDesc: 'Cancela tus reservas sin cargos adicionales',
      guarantee: 'Mejor Precio',
      guaranteeDesc: 'Los mejores precios garantizados en experiencias de Tenerife',
    },
  },
  en: {
    meta: {
      title: 'Bookings | Tenerife Experiences',
      description: 'Coming Soon: online booking system for experiences in Tenerife.',
    },
    badge: 'Coming Soon',
    title: 'Online Bookings',
    subtitle: 'We are working to provide you with the best booking experience. Very soon you will be able to book your Tenerife experiences directly from here.',
    formLabel: 'Notify me when ready',
    formPlaceholder: 'you@email.com',
    formButton: 'Notify Me',
    successTitle: 'Thank you for your interest!',
    successMessage: 'We will notify you when the booking system is ready. Check your email for confirmation.',
    backHome: 'Back to Home',
    features: {
      secure: 'Secure Booking',
      secureDesc: 'Safe and encrypted platform for your transactions',
      cancellation: 'Free Cancellation',
      cancellationDesc: 'Cancel your bookings without additional charges',
      guarantee: 'Best Price',
      guaranteeDesc: 'Best prices guaranteed for Tenerife experiences',
    },
  },
  de: {
    meta: {
      title: 'Buchungen | Tenerife Experiences',
      description: 'Demnächst verfügbar: Online-Buchungssystem für Erlebnisse in Teneriffa.',
    },
    badge: 'Bald Verfügbar',
    title: 'Online-Buchungen',
    subtitle: 'Wir arbeiten daran, Ihnen das beste Buchungserlebnis zu bieten. Sehr bald können Sie Ihre Tenerife-Erlebnisse direkt hier buchen.',
    formLabel: 'Benachrichtige mich, wenn es bereit ist',
    formPlaceholder: 'dich@email.com',
    formButton: 'Benachrichtige Mich',
    successTitle: 'Danke für dein Interesse!',
    successMessage: 'Wir werden dich benachrichtigen, wenn das Buchungssystem bereit ist. Überprüfe deine E-Mail zur Bestätigung.',
    backHome: 'Zurück zur Startseite',
    features: {
      secure: 'Sichere Buchung',
      secureDesc: 'Sichere und verschlüsselte Plattform für Ihre Transaktionen',
      cancellation: 'Kostenlose Stornierung',
      cancellationDesc: 'Stornieren Sie Ihre Buchungen ohne zusätzliche Kosten',
      guarantee: 'Bester Preis',
      guaranteeDesc: 'Beste Preise garantiert für Tenerife-Erlebnisse',
    },
  },
  fr: {
    meta: {
      title: 'Réservations | Tenerife Experiences',
      description: 'Bientôt disponible : système de réservation en ligne pour les expériences à Ténérife.',
    },
    badge: 'Bientôt Disponible',
    title: 'Réservations en Ligne',
    subtitle: 'Nous travaillons pour vous offrir la meilleure expérience de réservation. Très bientôt, vous pourrez réserver vos expériences à Ténérife directement ici.',
    formLabel: 'Notifiez-moi quand ce sera prêt',
    formPlaceholder: 'vous@email.com',
    formButton: 'M\'Avertir',
    successTitle: 'Merci pour votre intérêt!',
    successMessage: 'Nous vous notifierons quand le système de réservation sera prêt. Vérifiez votre e-mail pour confirmation.',
    backHome: 'Retour à l\'Accueil',
    features: {
      secure: 'Réservation Sécurisée',
      secureDesc: 'Plateforme sûre et chiffrée pour vos transactions',
      cancellation: 'Annulation Gratuite',
      cancellationDesc: 'Annulez vos réservations sans frais supplémentaires',
      guarantee: 'Meilleur Prix',
      guaranteeDesc: 'Meilleur prix garanti pour les expériences de Ténérife',
    },
  },
  ru: {
    meta: {
      title: 'Бронирования | Tenerife Experiences',
      description: 'Скоро доступно: система онлайн-бронирования для впечатлений на Тенерифе.',
    },
    badge: 'Скоро',
    title: 'Онлайн-бронирования',
    subtitle: 'Мы работаем над тем, чтобы предоставить вам лучший опыт бронирования. Очень скоро вы сможете забронировать впечатления на Тенерифе прямо отсюда.',
    formLabel: 'Уведомить меня, когда будет готово',
    formPlaceholder: 'вы@email.com',
    formButton: 'Уведомить Меня',
    successTitle: 'Спасибо за ваш интерес!',
    successMessage: 'Мы уведомим вас, когда система бронирования будет готова. Проверьте свою электронную почту для подтверждения.',
    backHome: 'Вернуться на главную',
    features: {
      secure: 'Безопасное бронирование',
      secureDesc: 'Безопасная и зашифрованная платформа для ваших транзакций',
      cancellation: 'Бесплатная отмена',
      cancellationDesc: 'Отмените свои бронирования без дополнительных сборов',
      guarantee: 'Лучшая цена',
      guaranteeDesc: 'Лучшие цены гарантированы для впечатлений Тенерифе',
    },
  },
  it: {
    meta: {
      title: 'Prenotazioni | Tenerife Experiences',
      description: 'Prossimamente disponibile: sistema di prenotazione online per esperienze a Tenerife.',
    },
    badge: 'Prossimamente',
    title: 'Prenotazioni Online',
    subtitle: 'Stiamo lavorando per offrirti la migliore esperienza di prenotazione. Molto presto potrai prenotare le tue esperienze a Tenerife direttamente da qui.',
    formLabel: 'Notificami quando sarà pronto',
    formPlaceholder: 'tu@email.com',
    formButton: 'Notificami',
    successTitle: 'Grazie per il tuo interesse!',
    successMessage: 'Ti notificheremo quando il sistema di prenotazione sarà pronto. Controlla la tua email per la conferma.',
    backHome: 'Torna alla Home',
    features: {
      secure: 'Prenotazione Sicura',
      secureDesc: 'Piattaforma sicura e crittografata per le tue transazioni',
      cancellation: 'Cancellazione Gratuita',
      cancellationDesc: 'Annulla le tue prenotazioni senza costi aggiuntivi',
      guarantee: 'Miglior Prezzo',
      guaranteeDesc: 'Migliori prezzi garantiti per le esperienze di Tenerife',
    },
  },
}

export default function ReservasPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as keyof typeof translations
  const t = translations[locale] || translations.en
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsLoading(true)
    // Simulate API call with delay
    setTimeout(() => {
      setSubmitted(true)
      setIsLoading(false)
      setEmail('')
      // Reset after 5 seconds
      setTimeout(() => setSubmitted(false), 5000)
    }, 600)
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32 lg:py-40">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1605182054023-17d71f44aa11?w=1600&h=900&fit=crop)',
              backgroundAttachment: 'fixed',
            }}
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/70" />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black" />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <Badge
            variant="outline"
            className="border-orange-500/30 text-orange-400 px-4 py-2 mb-8 inline-flex items-center gap-2"
          >
            <Bell className="h-3 w-3" />
            {t.badge}
          </Badge>

          {/* Main Title */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            {t.title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            {t.subtitle}
          </p>

          {/* Notification Form */}
          <div className="max-w-md mx-auto">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder={t.formPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400 rounded-xl py-3 px-4 backdrop-blur-sm"
                  />
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-colors disabled:opacity-50"
                  >
                    {isLoading ? t.formButton + '...' : t.formButton}
                  </Button>
                </div>
                <p className="text-sm text-gray-400">
                  {t.formLabel}
                </p>
              </form>
            ) : (
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-0.5 flex-shrink-0" />
                  <div className="text-left">
                    <h3 className="font-semibold text-green-400 mb-2">{t.successTitle}</h3>
                    <p className="text-sm text-gray-300">{t.successMessage}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-24 bg-gradient-to-b from-black to-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Feature 1: Secure */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 mb-6">
                <svg
                  className="w-8 h-8 text-orange-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {t.features.secure}
              </h3>
              <p className="text-gray-400">
                {t.features.secureDesc}
              </p>
            </div>

            {/* Feature 2: Cancellation */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 mb-6">
                <svg
                  className="w-8 h-8 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {t.features.cancellation}
              </h3>
              <p className="text-gray-400">
                {t.features.cancellationDesc}
              </p>
            </div>

            {/* Feature 3: Guarantee */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30 mb-6">
                <svg
                  className="w-8 h-8 text-emerald-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {t.features.guarantee}
              </h3>
              <p className="text-gray-400">
                {t.features.guaranteeDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            {locale === 'es'
              ? '¿Mientras tanto, explora Tenerife'
              : locale === 'de'
                ? 'Erkunde inzwischen Tenerife'
                : locale === 'fr'
                  ? 'Entre-temps, explorez Ténérife'
                  : locale === 'ru'
                    ? 'А пока исследуйте Тенерифе'
                    : locale === 'it'
                      ? 'Nel frattempo, esplora Tenerife'
                      : 'Explore Tenerife in the meantime'}
          </h2>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            {locale === 'es'
              ? 'Descubre cientos de experiencias, playas y atracciones que Tenerife tiene para ofrecerte.'
              : locale === 'de'
                ? 'Entdecken Sie hunderte von Erlebnissen, Stränden und Attraktionen, die Tenerife für Sie bereithält.'
                : locale === 'fr'
                  ? 'Découvrez des centaines d\'expériences, de plages et d\'attractions que Ténérife a à vous offrir.'
                  : locale === 'ru'
                    ? 'Откройте для себя сотни впечатлений, пляжей и достопримечательностей, которые предлагает Тенерифе.'
                    : locale === 'it'
                      ? 'Scopri centinaia di esperienze, spiagge e attrazioni che Tenerife ha da offrirti.'
                      : 'Discover hundreds of experiences, beaches and attractions that Tenerife has to offer.'}
          </p>
          <Link href="/">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl text-lg font-semibold inline-flex items-center gap-2 transition-colors">
              {t.backHome}
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
