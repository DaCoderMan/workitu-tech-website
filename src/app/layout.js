import './globals.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import MusicPlayer from '../components/audio/MusicPlayer';

export const metadata = {
  title: 'Workitu Tech - Where Imagination Meets Innovation',
  description: 'Workitu Tech creates digital experiences that inspire and perform. We craft sophisticated websites, AI-powered apps, and e-commerce platforms.',
  keywords: 'web development, AI solutions, e-commerce, digital marketing, web design',
  authors: [{ name: 'Workitu Tech' }],
  openGraph: {
    title: 'Workitu Tech - Where Imagination Meets Innovation',
    description: 'Creating digital experiences that inspire and perform',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Workitu Tech - Where Imagination Meets Innovation',
    description: 'Creating digital experiences that inspire and perform',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      </head>
      <body className="bg-black text-gold-400 min-h-screen">
        <Header />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
        <MusicPlayer />
      </body>
    </html>
  );
}
