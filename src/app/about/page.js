'use client';

import { useEffect } from 'react';
import ScrollReveal from '../../components/animations/ScrollReveal';
import { useSafeT } from '../../lib/useLanguage';
import Link from 'next/link';

export default function About() {
  const t = useSafeT();

  useEffect(() => {
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: 'page_view', page: 'about', timestamp: new Date().toISOString() })
    }).catch(() => {});
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#fffcf5] via-[#fef9ee] to-[#fffcf5]">
      <div className="relative z-10">

        <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 fade-in">
              <span className="gradient-text">{t('about.title')}</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-500 max-w-3xl mx-auto fade-in font-medium" style={{ animationDelay: '0.2s' }}>
              {t('about.subtitle')}
            </p>
          </div>
        </section>

        <ScrollReveal>
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-10 md:p-16 border border-stone-200/80 shadow-sm">
              <h2 className="font-display text-2xl md:text-4xl font-bold text-stone-800 mb-8">{t('about.meet.title')}</h2>
              <p className="text-lg text-stone-600 mb-6 leading-relaxed">{t('about.meet.p1')}</p>
              <p className="text-base text-stone-500 mb-6 leading-relaxed">{t('about.meet.p2')}</p>
              <p className="text-sm text-stone-400 font-mono">{t('about.meet.skills')}</p>
            </div>
          </div>
        </section>
        </ScrollReveal>

        <ScrollReveal>
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-stone-800 mb-12 text-center">{t('about.why.title')}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-8 card-hover border border-stone-200/80 shadow-sm">
                <div className="text-4xl mb-4">🏗️</div>
                <h3 className="text-xl font-bold text-stone-800 mb-3">{t('about.why.enterprise.title')}</h3>
                <p className="text-stone-500 leading-relaxed">{t('about.why.enterprise.text')}</p>
              </div>
              <div className="bg-white rounded-xl p-8 card-hover border border-stone-200/80 shadow-sm">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-xl font-bold text-stone-800 mb-3">{t('about.why.trilingual.title')}</h3>
                <p className="text-stone-500 leading-relaxed">{t('about.why.trilingual.text')}</p>
              </div>
              <div className="bg-white rounded-xl p-8 card-hover border border-stone-200/80 shadow-sm">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-xl font-bold text-stone-800 mb-3">{t('about.why.results.title')}</h3>
                <p className="text-stone-500 leading-relaxed">{t('about.why.results.text')}</p>
              </div>
            </div>
          </div>
        </section>
        </ScrollReveal>

        <ScrollReveal>
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-stone-800 mb-12 text-center">{t('about.approach.title')}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-amber-300 mb-3">01</div>
                <h3 className="text-lg font-semibold text-stone-700 mb-2">{t('about.approach.step1.title')}</h3>
                <p className="text-sm text-stone-500">{t('about.approach.step1.text')}</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-amber-300 mb-3">02</div>
                <h3 className="text-lg font-semibold text-stone-700 mb-2">{t('about.approach.step2.title')}</h3>
                <p className="text-sm text-stone-500">{t('about.approach.step2.text')}</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-amber-300 mb-3">03</div>
                <h3 className="text-lg font-semibold text-stone-700 mb-2">{t('about.approach.step3.title')}</h3>
                <p className="text-sm text-stone-500">{t('about.approach.step3.text')}</p>
              </div>
            </div>
          </div>
        </section>
        </ScrollReveal>

        <ScrollReveal delay={100}>
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <Link href="/contact" className="btn-gold inline-flex items-center gap-2 px-10 py-4 rounded-full text-lg font-bold">
              {t('about.cta.button')}
            </Link>
          </div>
        </section>
        </ScrollReveal>

      </div>
    </div>
  );
}
