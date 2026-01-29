import './globals.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import MusicPlayer from '../components/audio/MusicPlayer';
import LanguageProvider from '../components/LanguageProvider';
import StructuredData from '../components/StructuredData';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://workitu.tech';

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Workitu Tech - Web Development, AI Solutions & E-Commerce | Starting from $320',
    template: '%s | Workitu Tech - Where Imagination Meets Innovation',
  },
  description: 'Workitu Tech creates stunning websites, AI-powered applications, and e-commerce platforms. Professional web development starting from $320. Based in Israel, serving clients worldwide. Next.js, React, OpenAI experts.',
  keywords: [
    'web development Israel',
    'AI solutions',
    'custom website development',
    'e-commerce platforms',
    'Next.js development',
    'React development',
    'digital marketing',
    'SEO services',
    'AI chatbot development',
    'web design agency',
    'affordable web development',
    'professional website',
    'Workitu Tech'
  ],
  authors: [{ name: 'Workitu Tech', url: BASE_URL }],
  creator: 'Workitu Tech',
  publisher: 'Workitu Tech',
  openGraph: {
    title: 'Workitu Tech - Web Development, AI Solutions & E-Commerce',
    description: 'Professional web development starting from $320. AI-powered applications, e-commerce platforms, and digital marketing. Based in Israel, serving clients worldwide.',
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'Workitu Tech',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Workitu Tech - Where Imagination Meets Innovation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Workitu Tech - Web Development, AI Solutions & E-Commerce',
    description: 'Professional web development starting from $320. AI-powered applications and e-commerce platforms.',
    images: ['/og-image.png'],
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
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Playwrite+GB+S:ital,wght@0,100..400;1,100..400&display=swap"
          as="style"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Playwrite+GB+S:ital,wght@0,100..400;1,100..400&display=swap"
        />
        <StructuredData />
      </head>
      <body className="font-sans bg-black text-gold-400 min-h-screen">
        <LanguageProvider>
          <Header />
          <main className="pt-16">
            {children}
          </main>
          <Footer />
          <MusicPlayer />
        </LanguageProvider>
      </body>
    </html>
  );
}
