import './globals.css';
import { Suspense } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

import LanguageProvider from '../components/LanguageProvider';
import StructuredData from '../components/StructuredData';
import WLogoBackground from '../components/animations/WLogoBackground';
import { GoogleAnalytics, GoogleTagManager } from '../components/Analytics';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://workitu.tech';

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'AI Automation & Web Development in Israel | Workitu Tech',
    template: '%s | Workitu Tech',
  },
  description: 'Workitu Tech builds AI automation systems, custom web apps, and intelligent workflows for businesses in Israel and globally. Trilingual (EN/PT/HE). Enterprise background. Book a call.',
  keywords: [
    'AI automation Israel',
    'AI automation consultant Israel',
    'n8n automation Israel',
    'AI chatbot development Israel',
    'web developer Israel English',
    'Next.js developer Israel',
    'React developer Israel freelance',
    'full stack developer Israel English',
    'Brazilian developer Israel',
    'workflow automation small business Israel',
    'AI agent development Israel',
    'fintech developer Israel',
    'web development',
    'AI solutions',
    'Next.js',
    'React',
    'Node.js',
    'Python',
  ],
  authors: [{ name: 'Yonatan Sam Perlin', url: BASE_URL }],
  creator: 'Workitu Tech',
  publisher: 'Workitu Tech',
  openGraph: {
    title: 'AI Automation & Web Development in Israel | Workitu Tech',
    description: 'AI automation systems, custom web apps, and intelligent workflows built by an enterprise-background developer in Israel. Trilingual (EN/PT/HE).',
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'Workitu Tech',
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Workitu Tech — AI Automation & Web Development in Israel',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Automation & Web Development in Israel | Workitu Tech',
    description: 'AI automation systems, custom web apps, and intelligent workflows built by an enterprise-background developer in Israel.',
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
