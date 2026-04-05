'use client';

import { useEffect } from 'react';
import Link from 'next/link';
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
    <div className="relative min-h-screen" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #1a0e00 40%, #0a0a0a 100%)' }}>
      <div className="fixed inset-0 z-0" style={{ backgroundImage: 'url(/images/cyberbee-hero.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15 }} />
      <div className="relative z-10">

        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
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
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Tech Mentoring */}
              <div className="glass rounded-xl p-8 card-hover fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="text-4xl mb-6">🎓</div>
                <h2 className="text-2xl font-bold text-gold-300 mb-2">{t('servicesPage.services.techMentoring.title')}</h2>
                <div className="text-xl font-bold text-gold-400 mb-4">From ₪150/hour</div>
                <p className="text-gold-400/70 mb-6">You get: 1:1 sessions with a senior developer. You learn programming, AI tools, and digital skills.</p>
                <ul className="space-y-2">
                  {[0, 1, 2, 3, 4, 5].map((idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gold-300/80">
                      <span className="text-gold-400 mt-1">&#8226;</span>
                      {t(`servicesPage.services.techMentoring.features.${idx}`)}
                    </li>
                  ))}
                </ul>
                <Link href="/contact?service=techMentoring" className="mt-6 inline-block btn-gold px-6 py-2 rounded-lg text-sm font-medium">
                  Get Started &rarr;
                </Link>
              </div>

              {/* Online Marketing */}
              <div className="glass rounded-xl p-8 card-hover fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="text-4xl mb-6">📱</div>
                <h2 className="text-2xl font-bold text-gold-300 mb-2">{t('servicesPage.services.onlineMarketing.title')}</h2>
                <div className="text-xl font-bold text-gold-400 mb-4">From ₪800/month</div>
                <p className="text-gold-400/70 mb-6">You get: full social media management + AI content. Result: more visibility, more clients.</p>
                <ul className="space-y-2">
                  {[0, 1, 2, 3, 4, 5].map((idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gold-300/80">
                      <span className="text-gold-400 mt-1">&#8226;</span>
                      {t(`servicesPage.services.onlineMarketing.features.${idx}`)}
                    </li>
                  ))}
                </ul>
                <Link href="/contact?service=onlineMarketing" className="mt-6 inline-block btn-gold px-6 py-2 rounded-lg text-sm font-medium">
                  Get Started &rarr;
                </Link>
              </div>

              {/* Digital Products */}
              <div className="glass rounded-xl p-8 card-hover fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="text-4xl mb-6">⚡</div>
                <h2 className="text-2xl font-bold text-gold-300 mb-2">{t('servicesPage.services.digitalProducts.title')}</h2>
                <div className="text-xl font-bold text-gold-400 mb-4">From ₪1,500 setup</div>
                <p className="text-gold-400/70 mb-6">You get: website, chatbot, or automation built for you. Result: your business runs 24/7.</p>
                <ul className="space-y-2">
                  {[0, 1, 2, 3, 4, 5].map((idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gold-300/80">
                      <span className="text-gold-400 mt-1">&#8226;</span>
                      {t(`servicesPage.services.digitalProducts.features.${idx}`)}
                    </li>
                  ))}
                </ul>
                <Link href="/contact?service=digitalProducts" className="mt-6 inline-block btn-gold px-6 py-2 rounded-lg text-sm font-medium">
                  Get Started &rarr;
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <ScrollReveal>
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gold-400 mb-12 text-center">{t('servicesPage.processTitle')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
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

        {/* Simple CTA */}
        <ScrollReveal delay={100}>
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <Link
              href="/contact"
              className="btn-gold inline-block px-8 py-4 rounded-full text-lg font-semibold"
            >
              {t('servicesPage.ctaPrimary')}
            </Link>
          </div>
        </section>
        </ScrollReveal>

      </div>
    </div>
  );
}
