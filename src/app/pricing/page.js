'use client';

import { useEffect, useState } from 'react';
import VideoBackground from '../../components/animations/VideoBackground';
import { useSafeT } from '../../lib/useLanguage';
import Link from 'next/link';

export default function Pricing() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const t = useSafeT();

  useEffect(() => {
    // Track page view
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'page_view',
        page: 'pricing',
        timestamp: new Date().toISOString()
      })
    });

    // Fetch pricing content
    fetch('/api/admin/content')
      .then(res => res.json())
      .then(data => {
        setContent(data.pricing);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching content:', err);
        setLoading(false);
      });
  }, []);

  // Default services with translations
  const defaultServices = [
    {
      key: 'website',
      title: t('pricing.services.website.title'),
      price: t('pricing.services.website.price'),
      description: t('pricing.services.website.description')
    },
    {
      key: 'ecommerce',
      title: t('pricing.services.ecommerce.title'),
      price: t('pricing.services.ecommerce.price'),
      description: t('pricing.services.ecommerce.description')
    },
    {
      key: 'ai',
      title: t('pricing.services.ai.title'),
      price: t('pricing.services.ai.price'),
      description: t('pricing.services.ai.description')
    },
    {
      key: 'marketing',
      title: t('pricing.services.marketing.title'),
      price: t('pricing.services.marketing.price'),
      description: t('pricing.services.marketing.description')
    },
    {
      key: 'custom',
      title: t('pricing.services.custom.title'),
      price: t('pricing.services.custom.price'),
      description: t('pricing.services.custom.description')
    }
  ];

  if (loading) {
    return (
      <div className="relative min-h-screen">
        <VideoBackground />
        <div className="relative z-10 flex justify-center items-center min-h-screen">
          <div className="loading-spinner"></div>
          <span className="ml-3 rtl:mr-3 rtl:ml-0 text-gold-400">{t('pricing.loading')}</span>
        </div>
      </div>
    );
  }

  const services = content?.services || defaultServices;

  return (
    <div className="relative min-h-screen">
      <VideoBackground imageSrc="/images/bg-contact.png" />

      {/* Header Section */}
      <section className="relative z-10 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
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
      <section className="relative z-10 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.key || index}
                className="card-hover glass rounded-xl p-8 fade-in flex flex-col"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-xl font-semibold text-gold-300 mb-3">
                  {service.title}
                </h3>
                <div className="text-2xl font-bold text-gold-400 mb-4">
                  {service.price}
                </div>
                <p className="text-gold-400/70 text-sm leading-relaxed flex-grow">
                  {service.description}
                </p>
                <Link
                  href={`/contact?service=${service.key || 'custom'}`}
                  className="mt-4 inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium bg-gold-400/20 text-gold-400 hover:bg-gold-400/30 transition-colors"
                >
                  Get Started →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promise Section */}
      <section className="relative z-10 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass rounded-2xl p-8 md:p-12 fade-in" style={{ animationDelay: '0.6s' }}>
            <p className="text-lg md:text-xl text-gold-300 font-medium">
              {t('pricing.promise')}
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="fade-in" style={{ animationDelay: '0.8s' }}>
            <a
              href="/contact"
              className="btn-gold inline-block px-8 py-4 rounded-full text-lg font-semibold"
            >
              {t('pricing.cta')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
