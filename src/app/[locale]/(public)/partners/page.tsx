'use client'

import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Check,
  Star,
  Globe,
  Users,
  Languages,
  TrendingUp,
  BarChart3,
  Share2,
  Crown,
  ShieldCheck,
  ArrowRight,
  Send,
  Quote,
} from 'lucide-react'

const plans = [
  {
    key: 'free' as const,
    price: 0,
    color: 'from-gray-600 to-gray-700',
    borderColor: 'border-gray-700',
    features: ['basicListing', 'businessProfile', 'mapPlacement'],
  },
  {
    key: 'basic' as const,
    price: 49,
    color: 'from-blue-500 to-cyan-500',
    borderColor: 'border-blue-500/50',
    popular: true,
    features: [
      'basicListing',
      'businessProfile',
      'mapPlacement',
      'featuredBadge',
      'analytics',
      'prioritySupport',
    ],
  },
  {
    key: 'premium' as const,
    price: 149,
    color: 'from-amber-500 to-orange-500',
    borderColor: 'border-orange-500/50',
    features: [
      'basicListing',
      'businessProfile',
      'mapPlacement',
      'featuredBadge',
      'analytics',
      'prioritySupport',
      'topPlacement',
      'socialMedia',
      'dedicatedManager',
    ],
  },
]

const stats = [
  { icon: Users, value: '50K+', labelKey: 'monthlyVisitors' },
  { icon: Globe, value: '120+', labelKey: 'countries' },
  { icon: Languages, value: '6', labelKey: 'languages' },
  { icon: TrendingUp, value: '35%', labelKey: 'yearlyGrowth' },
]

const testimonials = [
  {
    name: 'Maria G.',
    business: 'Restaurante La Terraza',
    type: 'restaurant',
    quote: 'testimonial1',
  },
  {
    name: 'Hans W.',
    business: 'Surf School Tenerife',
    type: 'operator',
    quote: 'testimonial2',
  },
  {
    name: 'James P.',
    business: 'Hotel Costa Adeje',
    type: 'hotel',
    quote: 'testimonial3',
  },
]

export default function PartnersPage() {
  const t = useTranslations('partners')

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[60vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-950/30 via-slate-950 to-slate-950" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <Badge
              variant="outline"
              className="border-orange-400/30 text-orange-400 px-4 py-1"
            >
              <Crown className="h-3 w-3 mr-1" />
              {t('partnerProgram')}
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
                {t('title')}
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
              {t('subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg rounded-xl"
                onClick={() =>
                  document
                    .getElementById('plans')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                {t('seePlans')}
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl"
                onClick={() =>
                  document
                    .getElementById('contact')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                {t('contactUs')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.labelKey} className="text-center space-y-2">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-orange-500/20 mb-2">
                    <Icon className="h-6 w-6 text-orange-400" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">
                    {t(`stats.${stat.labelKey}`)}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Partner With Us */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">{t('whyPartner')}</h2>
            <p className="mt-2 text-gray-400 max-w-2xl mx-auto">
              {t('whyPartnerSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                titleKey: 'benefit1Title',
                descKey: 'benefit1Desc',
                color: 'from-orange-500 to-amber-500',
              },
              {
                icon: BarChart3,
                titleKey: 'benefit2Title',
                descKey: 'benefit2Desc',
                color: 'from-blue-500 to-cyan-500',
              },
              {
                icon: Share2,
                titleKey: 'benefit3Title',
                descKey: 'benefit3Desc',
                color: 'from-purple-500 to-pink-500',
              },
            ].map((benefit) => {
              const Icon = benefit.icon
              return (
                <Card
                  key={benefit.titleKey}
                  className="bg-slate-900/50 border-white/5 hover:border-white/20 transition-all duration-300"
                >
                  <CardContent className="p-8 space-y-4">
                    <div
                      className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${benefit.color} opacity-80`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">
                      {t(benefit.titleKey)}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {t(benefit.descKey)}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="plans" className="py-20 bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">{t('choosePlan')}</h2>
            <p className="mt-2 text-gray-400">
              {t('choosePlanSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <Card
                key={plan.key}
                className={`relative bg-slate-900/80 ${plan.borderColor} transition-all duration-300 hover:scale-[1.02] ${
                  plan.popular ? 'border-2 shadow-lg shadow-blue-500/10' : 'border-white/10'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-blue-500 text-white border-0 px-4">
                      <Star className="h-3 w-3 mr-1 fill-white" />
                      {t('mostPopular')}
                    </Badge>
                  </div>
                )}

                <CardContent className="p-8 space-y-6">
                  <div className="text-center space-y-2">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color}`}
                    >
                      {plan.key === 'premium' ? (
                        <Crown className="h-6 w-6 text-white" />
                      ) : plan.key === 'basic' ? (
                        <ShieldCheck className="h-6 w-6 text-white" />
                      ) : (
                        <Users className="h-6 w-6 text-white" />
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {t(`${plan.key}Plan`)}
                    </h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-white">
                        {plan.price === 0 ? t('freePriceLabel') : `$${plan.price}`}
                      </span>
                      {plan.price > 0 && (
                        <span className="text-gray-400">{t('perMonth')}</span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {plan.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-start gap-3 text-sm"
                      >
                        <Check className="h-4 w-4 text-green-400 mt-0.5 shrink-0" />
                        <span className="text-gray-300">
                          {t(`features.${feature}`)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className={`w-full rounded-xl py-5 ${
                      plan.key === 'premium'
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white'
                        : plan.key === 'basic'
                          ? 'bg-blue-500 hover:bg-blue-600 text-white'
                          : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                    onClick={() =>
                      document
                        .getElementById('contact')
                        ?.scrollIntoView({ behavior: 'smooth' })
                    }
                  >
                    {plan.price === 0 ? t('getStarted') : t('contactUs')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">
              {t('testimonialsTitle')}
            </h2>
            <p className="mt-2 text-gray-400">
              {t('testimonialsSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card
                key={testimonial.name}
                className="bg-slate-900/50 border-white/5"
              >
                <CardContent className="p-8 space-y-4">
                  <Quote className="h-8 w-8 text-orange-500/30" />
                  <p className="text-gray-300 leading-relaxed italic">
                    &ldquo;{t(testimonial.quote)}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {testimonial.business}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 bg-slate-900/50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">
              {t('contactTitle')}
            </h2>
            <p className="mt-2 text-gray-400">
              {t('contactSubtitle')}
            </p>
          </div>

          <Card className="bg-slate-900/80 border-white/10">
            <CardContent className="p-8">
              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault()
                  // TODO: Submit to Supabase subscribers table with partner_inquiry tag
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      {t('formName')}
                    </label>
                    <Input
                      placeholder={t('formNamePlaceholder')}
                      className="bg-slate-800 border-white/10 text-white placeholder-gray-500 rounded-xl"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      {t('formEmail')}
                    </label>
                    <Input
                      type="email"
                      placeholder={t('formEmailPlaceholder')}
                      className="bg-slate-800 border-white/10 text-white placeholder-gray-500 rounded-xl"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    {t('formBusiness')}
                  </label>
                  <Input
                    placeholder={t('formBusinessPlaceholder')}
                    className="bg-slate-800 border-white/10 text-white placeholder-gray-500 rounded-xl"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    {t('formMessage')}
                  </label>
                  <Textarea
                    placeholder={t('formMessagePlaceholder')}
                    className="bg-slate-800 border-white/10 text-white placeholder-gray-500 rounded-xl min-h-[120px]"
                    rows={4}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 rounded-xl text-lg"
                >
                  <Send className="h-5 w-5 mr-2" />
                  {t('sendInquiry')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}
