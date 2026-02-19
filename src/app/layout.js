import './globals.css';
import { Suspense } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

import LanguageProvider from '../components/LanguageProvider';
import StructuredData from '../components/StructuredData';
import WLogoBackground from '../components/animations/WLogoBackground';
import { GoogleAnalytics, GoogleTagManager } from '../components/Analytics';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://workitu.tech';

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Workitu Tech - Where Imagination Meets Innovation',
    template: '%s | Workitu Tech',
  },
  description: 'Workitu Tech creates digital experiences that inspire and perform. Web development, AI solutions, e-commerce platforms, and digital marketing.',
  keywords: ['web development', 'AI solutions', 'e-commerce', 'digital marketing', 'web design', 'Next.js', 'React'],
  authors: [{ name: 'Workitu Tech', url: BASE_URL }],
  creator: 'Workitu Tech',
  publisher: 'Workitu Tech',
  openGraph: {
    title: 'Workitu Tech - Where Imagination Meets Innovation',
    description: 'Creating digital experiences that inspire and perform',
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'Workitu Tech',
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Workitu Tech - Where Imagination Meets Innovation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Workitu Tech - Where Imagination Meets Innovation',
    description: 'Creating digital experiences that inspire and perform',
    images: [`${BASE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      'en-US': `${BASE_URL}/en`,
      'he-IL': `${BASE_URL}/he`,
      'pt-BR': `${BASE_URL}/pt`,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <StructuredData />
      </head>
      <body className="bg-black text-gold-400 min-h-screen">
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        <GoogleTagManager />
        <WLogoBackground />
        <LanguageProvider>
          <Header />
          <main className="pt-16">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
