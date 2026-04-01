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

export default function ContactoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
