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
    default: 'Workitu Tech — AI Automation & Custom Solutions for Professionals',
    template: '%s | Workitu Tech',
  },
  description: 'Workitu Tech helps professionals in Israel grow with AI automation, custom WhatsApp bots, tech mentoring, and digital marketing. Trilingual service in Portuguese, Hebrew & English. Get your AI agent running in 7 days.',
  keywords: [
    'AI WhatsApp bot Israel',
    'bot WhatsApp empresas brasileiras Israel',
    'automação WhatsApp Israel',
    'AI automation Israel',
    'AI chatbot development Israel',
    'Brazilian developer Israel',
    'desenvolvedor brasileiro Israel',
    'brasileiro em Israel tecnologia',
    'automação empresas brasileiras Israel',
    'tech mentoring Israel',
    'aulas de programação Israel',
    'digital marketing professionals Israel',
    'custom AI solutions Israel',
    'n8n automation Israel',
    'workflow automation small business Israel',
    'web developer Israel English Portuguese Hebrew',
    'Next.js developer Israel',
    'full stack developer Israel',
    'AI agent development Israel',
    'Workitu Tech',
  ],
  authors: [{ name: 'Yonatan Sam Perlin', url: BASE_URL }],
  creator: 'Workitu Tech',
  publisher: 'Workitu Tech',
  openGraph: {
    title: 'Workitu Tech — AI That Works While You Sleep',
    description: 'Custom AI WhatsApp bots, tech mentoring, digital marketing, and automation for professionals in Israel. Trilingual (PT/EN/HE). Your AI agent ready in 7 days.',
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'Workitu Tech',
    images: [
      {
        url: '/images/og-thumbnail.jpg',
        width: 1200,
        height: 630,
        alt: 'Workitu Tech — AI Automation for Professionals. A robotic golden bee representing intelligent automation.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Workitu Tech — AI That Works While You Sleep',
    description: 'Custom AI WhatsApp bots, tech mentoring, digital marketing & automation for professionals in Israel. Trilingual service. Ready in 7 days.',
    images: ['/images/og-thumbnail.jpg'],
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
      <body className="bg-[#fffcf5] text-stone-700 min-h-screen">
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
