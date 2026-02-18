'use client';

import { useEffect } from 'react';
import VideoBackground from '../components/animations/VideoBackground';
import { useSafeT } from '../lib/useLanguage';

export default function Home() {
  const t = useSafeT();

  useEffect(() => {
    // Track page view
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'page_view',
        page: 'home',
        timestamp: new Date().toISOString()
      })
    });
  }, []);

  return (
    <div className="relative min-h-screen">
      <VideoBackground imageSrc="/images/bg-home.svg" />

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 fade-in">
              <span className="gradient-text">
                {t('home.title')}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gold-300 mb-4 fade-in" style={{ animationDelay: '0.2s' }}>
              {t('home.tagline')}
            </p>
            <p className="text-lg md:text-xl text-gold-400/80 mb-8 max-w-4xl mx-auto fade-in" style={{ animationDelay: '0.4s' }}>
              {t('home.description')}
            </p>
            <p className="text-base md:text-lg text-gold-300/70 mb-12 max-w-5xl mx-auto fade-in" style={{ animationDelay: '0.6s' }}>
              {t('home.subDescription')}
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass rounded-2xl p-8 md:p-12 fade-in" style={{ animationDelay: '0.8s' }}>
            <p className="text-lg md:text-xl text-gold-300 mb-6">
              {t('home.mission1')}
            </p>
            <p className="text-base md:text-lg text-gold-400/80 mb-6">
              {t('home.mission2')}
            </p>
            <p className="text-base md:text-lg text-gold-300/70">
              {t('home.mission3')}
            </p>
          </div>
        </div>
      </section>

      {/* Tagline Section */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="fade-in" style={{ animationDelay: '1s' }}>
            <p className="text-xl md:text-2xl text-gold-400 font-medium">
              {t('home.tagline1')}
            </p>
            <p className="text-2xl md:text-3xl text-gold-300 font-bold mt-4">
              {t('home.tagline2')}
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="fade-in" style={{ animationDelay: '1.2s' }}>
            <a
              href="/contact"
              className="btn-gold inline-block px-8 py-4 rounded-full text-lg font-semibold"
            >
              {t('home.cta')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
