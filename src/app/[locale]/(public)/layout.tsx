import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ReviewProvider } from '@/components/review/review-context'
import { ReviewToolbar } from '@/components/review/review-toolbar'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ReviewProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ReviewToolbar />
      </div>
    </ReviewProvider>
  )
}
