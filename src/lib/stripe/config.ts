import Stripe from 'stripe'

/**
 * Stripe instance — initialized lazily to avoid build-time errors
 * when STRIPE_SECRET_KEY is not set (e.g. during `next build` on CI).
 */
let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('Missing STRIPE_SECRET_KEY environment variable')
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  }
  return _stripe
}

/** @deprecated Use getStripe() for lazy initialization */
export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : (null as unknown as Stripe)

/**
 * Guide product definitions — prices in EUR cents
 * These map to the guides shown on /guias
 */
export const GUIDE_PRODUCTS = {
  foodie: {
    id: 'foodie',
    price: 990, // 9.90€
    name: {
      es: 'Guía Foodie Tenerife',
      en: 'Tenerife Foodie Guide',
      de: 'Teneriffa Foodie-Reiseführer',
      fr: 'Guide Foodie Tenerife',
      ru: 'Гид по еде Тенерифе',
      it: 'Guida Foodie Tenerife',
    },
  },
  beaches: {
    id: 'beaches',
    price: 790,
    name: {
      es: 'Guía de Playas Tenerife',
      en: 'Tenerife Beaches Guide',
      de: 'Teneriffa Strände-Reiseführer',
      fr: 'Guide des Plages Tenerife',
      ru: 'Гид по пляжам Тенерифе',
      it: 'Guida Spiagge Tenerife',
    },
  },
  adventure: {
    id: 'adventure',
    price: 790,
    name: {
      es: 'Guía de Aventura Tenerife',
      en: 'Tenerife Adventure Guide',
      de: 'Teneriffa Abenteuer-Reiseführer',
      fr: "Guide d'Aventure Tenerife",
      ru: 'Гид по приключениям Тенерифе',
      it: 'Guida Avventura Tenerife',
    },
  },
  romantic: {
    id: 'romantic',
    price: 590,
    name: {
      es: 'Guía Romántica Tenerife',
      en: 'Tenerife Romantic Guide',
      de: 'Teneriffa Romantik-Reiseführer',
      fr: 'Guide Romantique Tenerife',
      ru: 'Романтический гид Тенерифе',
      it: 'Guida Romantica Tenerife',
    },
  },
  family: {
    id: 'family',
    price: 790,
    name: {
      es: 'Guía Familias Tenerife',
      en: 'Tenerife Family Guide',
      de: 'Teneriffa Familien-Reiseführer',
      fr: 'Guide Famille Tenerife',
      ru: 'Семейный гид Тенерифе',
      it: 'Guida Famiglia Tenerife',
    },
  },
  nightlife: {
    id: 'nightlife',
    price: 590,
    name: {
      es: 'Guía Nocturna Tenerife',
      en: 'Tenerife Nightlife Guide',
      de: 'Teneriffa Nachtleben-Reiseführer',
      fr: 'Guide Vie Nocturne Tenerife',
      ru: 'Гид по ночной жизни Тенерифе',
      it: 'Guida Vita Notturna Tenerife',
    },
  },
  bible: {
    id: 'bible',
    price: 1990, // 19.90€
    name: {
      es: 'La Biblia de Tenerife — Pack Completo',
      en: 'The Tenerife Bible — Complete Pack',
      de: 'Die Teneriffa-Bibel — Komplettpaket',
      fr: 'La Bible de Tenerife — Pack Complet',
      ru: 'Библия Тенерифе — Полный пакет',
      it: 'La Bibbia di Tenerife — Pacchetto Completo',
    },
  },
} as const

export type GuideId = keyof typeof GUIDE_PRODUCTS
