'use client';

import { useEffect } from 'react';
import ScrollReveal from '../../components/animations/ScrollReveal';
import { useSafeT } from '../../lib/useLanguage';
import Link from 'next/link';

export default function Pricing() {
  const t = useSafeT();

  useEffect(() => {
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'page_view',
        page: 'pricing',
        timestamp: new Date().toISOString()
      })
    }).catch(() => {});
  }, []);

  const services = [
    {
      key: 'techMentoring',
      emoji: '🎓',
      title: t('pricing.services.techMentoring.title'),
      price: t('pricing.services.techMentoring.price'),
      description: t('pricing.services.techMentoring.description')
    },
    {
      key: 'onlineMarketing',
      emoji: '📱',
      title: t('pricing.services.onlineMarketing.title'),
      price: t('pricing.services.onlineMarketing.price'),
      description: t('pricing.services.onlineMarketing.description')
    },
    {
      key: 'digitalProducts',
      emoji: '⚡',
      title: t('pricing.services.digitalProducts.title'),
      price: t('pricing.services.digitalProducts.price'),
      description: t('pricing.services.digitalProducts.description')
    },
    {
      key: 'custom',
      emoji: '🛠️',
      title: t('pricing.services.custom.title'),
      price: t('pricing.services.custom.price'),
      description: t('pricing.services.custom.description')
    }
  ];

  return (
    <div className="relative min-h-screen" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #1a0e00 40%, #0a0a0a 100%)' }}>
      <div className="fixed inset-0 z-0" style={{ backgroundImage: 'url(/images/bg-home-bee.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15 }} />
      <div className="relative z-10">

        {/* Header Section */}
        <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 fade-in">
              <span className="gradient-text">{t('pricing.title')}</span>
            </h1>
            <p className="text-lg md:text-xl text-gold-300/80 max-w-4xl mx-auto fade-in" style={{ animationDelay: '0.2s' }}>
              {t('pricing.subtitle')}
            </p>
            <p className="text-base md:text-lg text-gold-400/70 max-w-5xl mx-auto mt-4 fade-in" style={{ animationDelay: '0.4s' }}>
              {t('pricing.description')}
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <div
                  key={service.key || index}
                  className="card-hover glass rounded-2xl p-10 fade-in flex flex-col"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-4xl mb-4">{service.emoji}</div>
                  <h3 className="text-2xl font-bold text-gold-300 mb-4">
                    {service.title}
                  </h3>
                  <div className="text-4xl font-extrabold text-gold-400 mb-6">
                    {service.price}
                  </div>
                  <p className="text-gold-400/70 text-base leading-relaxed flex-grow">
                    {service.description}
                  </p>
                  <Link
                    href={`/contact?service=${service.key || 'custom'}`}
                    className="mt-6 inline-flex items-center justify-center px-6 py-3 rounded-lg text-base font-semibold btn-gold"
                  >
                    Get Started &rarr;
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Promise Section */}
        <ScrollReveal>
        <section className="pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="glass rounded-2xl p-8 md:p-12">
              <p className="text-lg md:text-xl text-gold-300 font-medium">
                {t('pricing.promise')}
              </p>
            </div>
          </div>
        </section>
        </ScrollReveal>

      </div>
    </div>
  );
}
