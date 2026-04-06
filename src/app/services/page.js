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
    <div className="relative min-h-screen bg-gradient-to-b from-[#fffcf5] via-[#fef9ee] to-[#fffcf5]">
      <div className="relative z-10">

        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 fade-in">
              <span className="gradient-text">{t('servicesPage.title')}</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-500 max-w-3xl mx-auto fade-in font-medium" style={{ animationDelay: '0.2s' }}>
              {t('servicesPage.subtitle')}
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* AI WhatsApp Bot - #1 Product */}
              <div className="bg-white rounded-xl p-8 card-hover fade-in border border-emerald-200/50 shadow-sm" style={{ animationDelay: '0s' }}>
                <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-4">{t('home.services.bot.badge')}</div>
                <div className="text-4xl mb-6">🤖</div>
                <h2 className="text-2xl font-bold text-stone-800 mb-2">AI WhatsApp Bot</h2>
                <div className="text-xl font-bold text-emerald-600 mb-4">{t('home.services.bot.price')}</div>
                <p className="text-stone-500 mb-6 leading-relaxed">{t('home.services.bot.description')}</p>
                <ul className="space-y-2 mb-6">
                  {['Answers FAQs automatically', 'Collects leads while you sleep', 'Portuguese, Hebrew & English', 'Custom personality & tone', 'Ready in 7 days', 'Cancel anytime'].map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-stone-600">
                      <span className="text-emerald-500 mt-1">&#8226;</span>{f}
                    </li>
                  ))}
                </ul>
                <a href="https://wa.me/972587897763?text=Hi!%20I%27m%20interested%20in%20the%20AI%20WhatsApp%20Bot" target="_blank" rel="noopener noreferrer" className="mt-auto inline-block btn-gold px-6 py-2 rounded-lg text-sm font-semibold">
                  Start on WhatsApp &rarr;
                </a>
              </div>

              {/* Tech Mentoring */}
              <div className="bg-white rounded-xl p-8 card-hover fade-in border border-stone-200/80 shadow-sm" style={{ animationDelay: '0.1s' }}>
                <div className="text-4xl mb-6">🎓</div>
                <h2 className="text-2xl font-bold text-stone-800 mb-2">{t('servicesPage.services.techMentoring.title')}</h2>
                <div className="text-xl font-bold text-amber-700 mb-4">{t('home.services.mentoring.price')}</div>
                <p className="text-stone-500 mb-6 leading-relaxed">{t('servicesPage.services.techMentoring.description')}</p>
                <ul className="space-y-2">
                  {[0, 1, 2, 3, 4, 5].map((idx) => (
                    <li key={idx} className="flex items-start gap-2 text-stone-600">
                      <span className="text-amber-500 mt-1">&#8226;</span>
                      {t(`servicesPage.services.techMentoring.features.${idx}`)}
                    </li>
                  ))}
                </ul>
                <Link href="/contact?service=techMentoring" className="mt-6 inline-block btn-gold px-6 py-2 rounded-lg text-sm font-semibold">
                  Get Started &rarr;
                </Link>
              </div>

              {/* Online Marketing */}
              <div className="bg-white rounded-xl p-8 card-hover fade-in border border-stone-200/80 shadow-sm" style={{ animationDelay: '0.2s' }}>
                <div className="text-4xl mb-6">📱</div>
                <h2 className="text-2xl font-bold text-stone-800 mb-2">{t('servicesPage.services.onlineMarketing.title')}</h2>
                <div className="text-xl font-bold text-amber-700 mb-4">{t('home.services.marketing.price')}</div>
                <p className="text-stone-500 mb-6 leading-relaxed">{t('servicesPage.services.onlineMarketing.description')}</p>
                <ul className="space-y-2">
                  {[0, 1, 2, 3, 4, 5].map((idx) => (
                    <li key={idx} className="flex items-start gap-2 text-stone-600">
                      <span className="text-amber-500 mt-1">&#8226;</span>
                      {t(`servicesPage.services.onlineMarketing.features.${idx}`)}
                    </li>
                  ))}
                </ul>
                <Link href="/contact?service=onlineMarketing" className="mt-6 inline-block btn-gold px-6 py-2 rounded-lg text-sm font-semibold">
                  Get Started &rarr;
                </Link>
              </div>

              {/* Digital Products */}
              <div className="bg-white rounded-xl p-8 card-hover fade-in border border-stone-200/80 shadow-sm" style={{ animationDelay: '0.3s' }}>
                <div className="text-4xl mb-6">⚡</div>
                <h2 className="text-2xl font-bold text-stone-800 mb-2">{t('servicesPage.services.digitalProducts.title')}</h2>
                <div className="text-xl font-bold text-amber-700 mb-4">{t('home.services.products.price')}</div>
                <p className="text-stone-500 mb-6 leading-relaxed">{t('servicesPage.services.digitalProducts.description')}</p>
                <ul className="space-y-2">
                  {[0, 1, 2, 3, 4, 5].map((idx) => (
                    <li key={idx} className="flex items-start gap-2 text-stone-600">
                      <span className="text-amber-500 mt-1">&#8226;</span>
                      {t(`servicesPage.services.digitalProducts.features.${idx}`)}
                    </li>
                  ))}
                </ul>
                <Link href="/contact?service=digitalProducts" className="mt-6 inline-block btn-gold px-6 py-2 rounded-lg text-sm font-semibold">
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
            <h2 className="text-3xl font-bold text-stone-800 mb-12 text-center">{t('servicesPage.processTitle')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div key={num} className="text-center">
                  <div className="text-4xl font-bold text-amber-300 mb-2">0{num}</div>
                  <h4 className="text-lg font-semibold text-stone-700 mb-2">{t(`servicesPage.process.${num}.title`)}</h4>
                  <p className="text-sm text-stone-500">{t(`servicesPage.process.${num}.description`)}</p>
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
              className="btn-gold inline-block px-8 py-4 rounded-full text-lg font-bold"
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
