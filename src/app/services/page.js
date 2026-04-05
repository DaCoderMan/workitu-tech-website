'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import VideoBackground from '../../components/animations/VideoBackground';
import ScrollReveal from '../../components/animations/ScrollReveal';
import { useSafeT } from '../../lib/useLanguage';

export default function Services() {
  const t = useSafeT();

  useEffect(() => {
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'page_view',
        page: 'services',
        timestamp: new Date().toISOString()
      })
    });
  }, []);

  return (
    <div className="relative min-h-screen">
      <VideoBackground imageSrc="/images/bg-portfolio.svg" />

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 fade-in">
            <span className="gradient-text">{t('servicesPage.title')}</span>
          </h1>
          <p className="text-lg md:text-xl text-gold-300/80 max-w-3xl mx-auto fade-in" style={{ animationDelay: '0.2s' }}>
            {t('servicesPage.subtitle')}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Tech Mentoring */}
            <div className="glass rounded-xl p-8 card-hover fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl mb-6">🎓</div>
              <h2 className="text-2xl font-bold text-gold-300 mb-4">{t('servicesPage.services.techMentoring.title')}</h2>
              <p className="text-gold-400/70 mb-6">{t('servicesPage.services.techMentoring.description')}</p>
              <ul className="space-y-2">
                {[0, 1, 2, 3, 4, 5].map((idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gold-300/80">
                    <span className="text-gold-400 mt-1">&#8226;</span>
                    {t(`servicesPage.services.techMentoring.features.${idx}`)}
                  </li>
                ))}
              </ul>
              <Link href="/pricing" className="mt-4 inline-block text-gold-400 hover:text-gold-300 text-sm font-medium">
                {t('servicesPage.ctaSecondary')} &rarr;
              </Link>
            </div>

            {/* Online Marketing */}
            <div className="glass rounded-xl p-8 card-hover fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl mb-6">📱</div>
              <h2 className="text-2xl font-bold text-gold-300 mb-4">{t('servicesPage.services.onlineMarketing.title')}</h2>
              <p className="text-gold-400/70 mb-6">{t('servicesPage.services.onlineMarketing.description')}</p>
              <ul className="space-y-2">
                {[0, 1, 2, 3, 4, 5].map((idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gold-300/80">
                    <span className="text-gold-400 mt-1">&#8226;</span>
                    {t(`servicesPage.services.onlineMarketing.features.${idx}`)}
                  </li>
                ))}
              </ul>
              <Link href="/pricing" className="mt-4 inline-block text-gold-400 hover:text-gold-300 text-sm font-medium">
                {t('servicesPage.ctaSecondary')} &rarr;
              </Link>
            </div>

            {/* Digital Products */}
            <div className="glass rounded-xl p-8 card-hover fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-4xl mb-6">⚡</div>
              <h2 className="text-2xl font-bold text-gold-300 mb-4">{t('servicesPage.services.digitalProducts.title')}</h2>
              <p className="text-gold-400/70 mb-6">{t('servicesPage.services.digitalProducts.description')}</p>
              <ul className="space-y-2">
                {[0, 1, 2, 3, 4, 5].map((idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gold-300/80">
                    <span className="text-gold-400 mt-1">&#8226;</span>
                    {t(`servicesPage.services.digitalProducts.features.${idx}`)}
                  </li>
                ))}
              </ul>
              <Link href="/pricing" className="mt-4 inline-block text-gold-400 hover:text-gold-300 text-sm font-medium">
                {t('servicesPage.ctaSecondary')} &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <ScrollReveal>
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gold-400 mb-12 text-center">{t('servicesPage.processTitle')}</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div key={num} className="text-center">
                <div className="text-4xl font-bold text-gold-400/30 mb-2">0{num}</div>
                <h4 className="text-lg font-semibold text-gold-300 mb-2">{t(`servicesPage.process.${num}.title`)}</h4>
                <p className="text-sm text-gold-400/70">{t(`servicesPage.process.${num}.description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* CTA Section */}
      <ScrollReveal delay={100}>
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center glass rounded-xl p-12">
          <h2 className="text-3xl font-bold text-gold-400 mb-4">{t('servicesPage.ctaTitle')}</h2>
          <p className="text-gold-300/80 mb-8">
            {t('servicesPage.ctaText')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="btn-gold inline-block px-8 py-3 rounded-lg text-lg font-medium"
            >
              {t('servicesPage.ctaPrimary')}
            </a>
            <a
              href="/pricing"
              className="inline-block px-8 py-3 rounded-lg text-lg font-medium border border-gold-400 text-gold-400 hover:bg-gold-400/10 transition-colors"
            >
              {t('servicesPage.ctaSecondary')}
            </a>
          </div>
        </div>
      </section>
      </ScrollReveal>
    </div>
  );
}
