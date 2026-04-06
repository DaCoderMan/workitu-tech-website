'use client';

import { useEffect } from 'react';
import ScrollReveal from '../components/animations/ScrollReveal';
import { useSafeT } from '../lib/useLanguage';
import Link from 'next/link';

export default function Home() {
  const t = useSafeT();

  const services = [
    {
      emoji: '\u{1F916}',
      title: 'AI WhatsApp Bot',
      description: t('home.services.bot.description'),
      price: t('home.services.bot.price'),
      includes: t('home.services.bot.includes'),
      accent: 'from-emerald-400 to-emerald-600',
      badge: t('home.services.bot.badge'),
    },
    {
      emoji: '\u{1F393}',
      title: t('home.services.mentoring.title'),
      description: t('home.services.mentoring.description'),
      price: t('home.services.mentoring.price'),
      includes: t('home.services.mentoring.includes'),
      accent: 'from-amber-400 to-orange-500',
    },
    {
      emoji: '\u{1F4F1}',
      title: t('home.services.marketing.title'),
      description: t('home.services.marketing.description'),
      price: t('home.services.marketing.price'),
      includes: t('home.services.marketing.includes'),
      accent: 'from-yellow-400 to-amber-500',
    },
    {
      emoji: '\u{26A1}',
      title: t('home.services.products.title'),
      description: t('home.services.products.description'),
      price: t('home.services.products.price'),
      includes: t('home.services.products.includes'),
      accent: 'from-orange-400 to-red-500',
    },
  ];

  const industryStats = [
    { value: '67%', label: t('home.industryStats.chatbot') },
    { value: '80%', label: t('home.industryStats.response') },
    { value: '3x', label: t('home.industryStats.leads') },
    { value: '40%', label: t('home.industryStats.costs') },
  ];

  useEffect(() => {
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
    <div className="relative min-h-screen bg-gradient-to-b from-[#fffcf5] via-[#fef9ee] to-[#fffcf5]">
      <div className="fixed inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'url(/images/bg-home-bee.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div className="relative z-10">

        {/* Hero Section */}
        <section className="pt-24 pb-8 px-4 sm:px-6 lg:px-8 min-h-[80vh] flex items-center">
          <div className="max-w-7xl mx-auto w-full">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-300/50 bg-amber-50 mb-8 fade-in">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm text-amber-800 font-semibold">{t('home.badge')}</span>
              </div>

              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 fade-in leading-[0.95] tracking-tight">
                <span className="text-stone-800">{t('home.heroLine1a')}</span>
                <span className="gradient-text">{t('home.heroLine1b')}</span>
                <br />
                <span className="text-stone-800">{t('home.heroLine2a')}</span>
                <span className="gradient-text">{t('home.heroLine2b')}</span>
              </h1>

              <p className="text-lg md:text-xl text-stone-500 mb-10 max-w-2xl fade-in leading-relaxed font-medium" style={{ animationDelay: '0.2s' }}>
                {t('home.subtitle')}
              </p>

              <div className="flex flex-wrap gap-4 mb-16 fade-in" style={{ animationDelay: '0.4s' }}>
                <Link
                  href="/contact"
                  className="btn-gold inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-bold"
                >
                  {t('home.ctaPrimary')}
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* What We Offer — clear service cards with pricing */}
        <ScrollReveal>
          <section className="py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="mb-16 text-center">
                <h2 className="font-display text-3xl md:text-5xl font-bold text-stone-800 mb-4">
                  {t('home.servicesTitle1')}<span className="gradient-text">{t('home.servicesTitle2')}</span>
                </h2>
                <p className="text-lg text-stone-500 max-w-2xl mx-auto font-medium">
                  {t('home.servicesSubtitle')}
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {services.map((service, i) => (
                  <div
                    key={i}
                    className="group relative rounded-2xl overflow-hidden border border-stone-200/80 bg-white p-8 transition-all duration-300 hover:border-amber-300/50 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(217,119,6,0.08)] flex flex-col"
                  >
                    <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${service.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                    {service.badge && (
                      <div className="inline-block px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-3 w-fit">{service.badge}</div>
                    )}
                    <div className="text-4xl mb-4">{service.emoji}</div>
                    <h3 className="font-display text-xl font-bold text-stone-800 mb-2">{service.title}</h3>
                    <p className="text-stone-500 leading-relaxed mb-3 text-sm flex-grow">{service.description}</p>
                    <p className="text-stone-400 text-xs mb-4 leading-relaxed">{service.includes}</p>
                    <div className="text-lg font-bold text-amber-700 mt-auto">{service.price}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Industry Statistics — real data */}
        <ScrollReveal>
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-stone-800 mb-3 text-center">
                {t('home.statsTitle')}
              </h2>
              <p className="text-stone-400 text-sm text-center mb-10">{t('home.statsSource')}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {industryStats.map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="font-display text-4xl md:text-5xl font-extrabold gradient-text mb-2">{stat.value}</div>
                    <div className="text-sm text-stone-500 font-medium leading-snug">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Why Choose Us */}
        <ScrollReveal>
          <section className="py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="glass rounded-3xl p-10 md:p-16 relative overflow-hidden">
                <h2 className="font-display text-2xl md:text-4xl font-bold text-stone-800 mb-8 relative z-10">
                  {t('home.missionTitle')}
                </h2>
                <p className="text-lg md:text-xl text-stone-600 mb-6 relative z-10 leading-relaxed">
                  {t('home.missionP1')}
                </p>
                <p className="text-base md:text-lg text-stone-500 mb-6 relative z-10 leading-relaxed">
                  {t('home.missionP2')}
                </p>
                <p className="text-base md:text-lg text-stone-500 relative z-10 leading-relaxed">
                  {t('home.missionP3')}
                </p>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* How it works — simple 3 steps */}
        <ScrollReveal>
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-stone-800 mb-12">{t('home.howTitle')}</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <div className="text-4xl font-extrabold text-amber-300 mb-3">01</div>
                  <h3 className="font-display text-lg font-bold text-stone-700 mb-2">{t('home.how1Title')}</h3>
                  <p className="text-stone-500 text-sm">{t('home.how1Text')}</p>
                </div>
                <div>
                  <div className="text-4xl font-extrabold text-amber-300 mb-3">02</div>
                  <h3 className="font-display text-lg font-bold text-stone-700 mb-2">{t('home.how2Title')}</h3>
                  <p className="text-stone-500 text-sm">{t('home.how2Text')}</p>
                </div>
                <div>
                  <div className="text-4xl font-extrabold text-amber-300 mb-3">03</div>
                  <h3 className="font-display text-lg font-bold text-stone-700 mb-2">{t('home.how3Title')}</h3>
                  <p className="text-stone-500 text-sm">{t('home.how3Text')}</p>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Bottom CTA */}
        <ScrollReveal delay={100}>
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-stone-500 mb-6 font-medium">{t('home.ctaSubtext')}</p>
              <Link
                href="/contact"
                className="btn-gold inline-flex items-center gap-2 px-10 py-5 rounded-full text-xl font-bold"
              >
                {t('home.ctaButton')}
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </section>
        </ScrollReveal>

      </div>
    </div>
  );
}
