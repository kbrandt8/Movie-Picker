import './globals.css'
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cookies } from 'next/headers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Movie--Picker',
  description: 'made with TMDB',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const session = cookieStore.get('movieSession')?.value || ""
  const loggedIn = session ? true : false;

  return (
    <html lang="en">

      <body className={inter.className}>
        <Header session={session} loggedIn={loggedIn} />
        {children}
        <Footer />
      </body>
    </html>
  )
}
