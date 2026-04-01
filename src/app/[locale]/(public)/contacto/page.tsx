import { buildAlternates } from '@/lib/metadata'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return {
    title: 'Contact | Tenerife Experiences',
    description: 'Get in touch with us. We are here to help you plan your trip to Tenerife.',
    alternates: buildAlternates(locale, '/contacto'),
  }
}

'use client'

import { Link } from '@/i18n/routing'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Mail,
  MapPin,
  Send,
  Handshake,
  ArrowRight,
  MessageSquare,
} from 'lucide-react'

const content = {
  es: {
    meta: {
      title: 'Contacto | Tenerife Experiences',
      description: 'Ponte en contacto con nosotros. Estamos aquí para ayudarte a planificar tu viaje a Tenerife.',
    },
    hero: {
      badge: 'Contacto',
      title: 'Ponte en contacto',
      subtitle: 'Estamos aquí para ayudarte. Escríbenos y te responderemos lo antes posible.',
    },
    form: {
      name: 'Nombre',
      namePlaceholder: 'Tu nombre',
      email: 'Correo electrónico',
      emailPlaceholder: 'tu@email.com',
      subject: 'Asunto',
      subjectPlaceholder: '¿En qué podemos ayudarte?',
      message: 'Mensaje',
      messagePlaceholder: 'Escribe tu mensaje aquí...',
      send: 'Enviar mensaje',
    },
    info: {
      emailLabel: 'Email',
      email: 'info@tenerifeexperiences.com',
      locationLabel: 'Ubicación',
      location: 'Tenerife, Islas Canarias, España',
    },
    partners: {
      title: '¿Eres un negocio local?',
      desc: 'Únete a nuestra plataforma y llega a miles de visitantes. Ofrecemos planes para restaurantes, hoteles, operadores turísticos y más.',
      cta: 'Programa de Partners',
    },
  },
  en: {
    meta: {
      title: 'Contact | Tenerife Experiences',
      description: 'Get in touch with us. We are here to help you plan your trip to Tenerife.',
    },
    hero: {
      badge: 'Contact',
      title: 'Get in Touch',
      subtitle: 'We are here to help. Write to us and we will get back to you as soon as possible.',
    },
    form: {
      name: 'Name',
      namePlaceholder: 'Your name',
      email: 'Email',
      emailPlaceholder: 'you@email.com',
      subject: 'Subject',
      subjectPlaceholder: 'How can we help you?',
      message: 'Message',
      messagePlaceholder: 'Write your message here...',
      send: 'Send message',
    },
    info: {
      emailLabel: 'Email',
      email: 'info@tenerifeexperiences.com',
      locationLabel: 'Location',
      location: 'Tenerife, Canary Islands, Spain',
    },
    partners: {
      title: 'Are you a local business?',
      desc: 'Join our platform and reach thousands of visitors. We offer plans for restaurants, hotels, tour operators, and more.',
      cta: 'Partner Program',
    },
  },
}

export default function ContactoPage() {
  const locale = typeof window !== 'undefined' ? (document.documentElement.lang || 'en') : 'en'
  const lang = locale === 'es' ? 'es' : 'en'
  const t = content[lang]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-slate-950 to-teal-600/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="outline" className="border-blue-400/30 text-blue-400 px-4 py-1 mb-6">
            <MessageSquare className="h-3 w-3 mr-1" />
            {t.hero.badge}
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t.hero.title}
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            {t.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="bg-slate-900/80 border-white/10">
                <CardContent className="p-8">
                  <form
                    className="space-y-6"
                    onSubmit={(e) => {
                      e.preventDefault()
                      // TODO: connect to backend
                    }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">
                          {t.form.name}
                        </label>
                        <Input
                          placeholder={t.form.namePlaceholder}
                          className="bg-slate-800 border-white/10 text-white placeholder-gray-500 rounded-xl"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">
                          {t.form.email}
                        </label>
                        <Input
                          type="email"
                          placeholder={t.form.emailPlaceholder}
                          className="bg-slate-800 border-white/10 text-white placeholder-gray-500 rounded-xl"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        {t.form.subject}
                      </label>
                      <Input
                        placeholder={t.form.subjectPlaceholder}
                        className="bg-slate-800 border-white/10 text-white placeholder-gray-500 rounded-xl"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        {t.form.message}
                      </label>
                      <Textarea
                        placeholder={t.form.messagePlaceholder}
                        className="bg-slate-800 border-white/10 text-white placeholder-gray-500 rounded-xl min-h-[160px]"
                        rows={5}
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 rounded-xl text-lg"
                    >
                      <Send className="h-5 w-5 mr-2" />
                      {t.form.send}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Info */}
              <Card className="bg-slate-900/80 border-white/10">
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shrink-0">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-400">{t.info.emailLabel}</p>
                      <a
                        href="mailto:info@tenerifeexperiences.com"
                        className="text-white hover:text-orange-400 transition-colors"
                      >
                        {t.info.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 shrink-0">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-400">{t.info.locationLabel}</p>
                      <p className="text-white">{t.info.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Partners CTA */}
              <Card className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 border-orange-500/20">
                <CardContent className="p-6 space-y-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 inline-flex">
                    <Handshake className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{t.partners.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{t.partners.desc}</p>
                  <Link href="/partners">
                    <Button variant="outline" className="w-full border-orange-500/30 text-orange-400 hover:bg-orange-500/10 rounded-xl">
                      {t.partners.cta}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
