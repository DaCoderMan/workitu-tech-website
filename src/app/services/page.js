'use client';

import { useEffect } from 'react';
import VideoBackground from '../../components/animations/VideoBackground';
import { useLanguage } from '../../lib/useLanguage';

export default function Services() {
  const { t, language } = useLanguage();

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

  // No local data arrays needed, using translations directly

  return (
    <div className="relative min-h-screen">
      <VideoBackground imageSrc="/images/bg-portfolio.png" />

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
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass rounded-xl p-8 card-hover fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="text-gold-400 mb-6">
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold text-gold-300 mb-4">{t('servicesPage.items.webDev.title')}</h3>
                <p className="text-gold-400/70 mb-6">{t('servicesPage.items.webDev.description')}</p>
                <ul className="space-y-2">
                  {[0, 1, 2, 3, 4, 5].map((idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gold-300/80">
                      <span className="text-gold-400 mt-1">&#8226;</span>
                      {t(`servicesPage.items.webDev.features.${idx}`)}
                    </li>
                  ))}
                </ul>
            </div>
            
            <div className="glass rounded-xl p-8 card-hover fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="text-gold-400 mb-6">
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 7H7v6h6V7z" />
                      <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clipRule="evenodd" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold text-gold-300 mb-4">{t('servicesPage.items.aiSolutions.title')}</h3>
                <p className="text-gold-400/70 mb-6">{t('servicesPage.items.aiSolutions.description')}</p>
                <ul className="space-y-2">
                  {[0, 1, 2, 3, 4, 5].map((idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gold-300/80">
                      <span className="text-gold-400 mt-1">&#8226;</span>
                      {t(`servicesPage.items.aiSolutions.features.${idx}`)}
                    </li>
                  ))}
                </ul>
            </div>

            <div className="glass rounded-xl p-8 card-hover fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="text-gold-400 mb-6">
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold text-gold-300 mb-4">{t('servicesPage.items.ecommerce.title')}</h3>
                <p className="text-gold-400/70 mb-6">{t('servicesPage.items.ecommerce.description')}</p>
                <ul className="space-y-2">
                  {[0, 1, 2, 3, 4, 5].map((idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gold-300/80">
                      <span className="text-gold-400 mt-1">&#8226;</span>
                      {t(`servicesPage.items.ecommerce.features.${idx}`)}
                    </li>
                  ))}
                </ul>
            </div>

            <div className="glass rounded-xl p-8 card-hover fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="text-gold-400 mb-6">
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold text-gold-300 mb-4">{t('servicesPage.items.digitalMarketing.title')}</h3>
                <p className="text-gold-400/70 mb-6">{t('servicesPage.items.digitalMarketing.description')}</p>
                <ul className="space-y-2">
                  {[0, 1, 2, 3, 4, 5].map((idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gold-300/80">
                      <span className="text-gold-400 mt-1">&#8226;</span>
                      {t(`servicesPage.items.digitalMarketing.features.${idx}`)}
                    </li>
                  ))}
                </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gold-400 mb-12 text-center fade-in">{t('servicesPage.processTitle')}</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[1, 2, 3, 4, 5, 6].map((num, index) => (
              <div
                key={num}
                className="text-center fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl font-bold text-gold-400/30 mb-2">0{num}</div>
                <h4 className="text-lg font-semibold text-gold-300 mb-2">{t(`servicesPage.process.${num}.title`)}</h4>
                <p className="text-sm text-gold-400/70">{t(`servicesPage.process.${num}.description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center glass rounded-xl p-12 fade-in">
          <h2 className="text-3xl font-bold text-gold-400 mb-4">{t('servicesPage.ctaTitle')}</h2>
          <p className="text-gold-300/80 mb-8">
            {t('servicesPage.ctaText')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/pricing"
              className="btn-gold inline-block px-8 py-3 rounded-lg text-lg font-medium"
            >
              {t('servicesPage.viewPricing')}
            </a>
            <a
              href="/contact"
              className="inline-block px-8 py-3 rounded-lg text-lg font-medium border border-gold-400 text-gold-400 hover:bg-gold-400/10 transition-colors"
            >
              {t('servicesPage.contactUs')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
