import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import Header from '@/components/header'
import Provider from '@/components/provider'

export const fontSans = Noto_Sans_KR({
  weight: ['400', '500', '700', '800'],
  style: 'normal',
  display: 'swap',
  preload: true,
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'NextBlog',
  description: 'Next.js Blog',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'http://localhost:3000',
    siteName: 'NextBlog',
    images: [
      {
        url: '/main-page-image.jpg',
        width: 1200,
        height: 1200,
        alt: 'NextBlog',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='ko'>
      <body
        className={cn('bg-background font-sans antialiased', fontSans.variable)}
      >
        <Provider>
          <Header />
          <div className='mt-16'>{children}</div>
        </Provider>
      </body>
    </html>
  )
}
