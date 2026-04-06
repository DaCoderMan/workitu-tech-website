'use client';

import { useEffect } from 'react';
import ScrollReveal from '../components/animations/ScrollReveal';
import { useSafeT } from '../lib/useLanguage';
import Link from 'next/link';

export default function Home() {
  const t = useSafeT();

  const stats = [
    { value: '4', label: 'AI-Powered Services' },
    { value: '24/7', label: t('home.stats.aiAgents.label') },
    { value: '\u{1F1E7}\u{1F1F7}\u{1F1EE}\u{1F1F1}\u{1F1EC}\u{1F1E7}', label: t('home.stats.trilingual.label') },
    { value: '7d', label: 'Bot Setup Time' },
  ];

  const services = [
    {
      emoji: '\u{1F916}',
      title: 'AI WhatsApp Bot',
      description: 'Your business answers clients 24/7 in Portuguese, Hebrew, and English — automatically. Setup in 7 days.',
      price: '₪800 setup + ₪150/month',
      accent: 'from-green-400 to-emerald-500',
      badge: '🔥 Most Popular',
    },
    {
      emoji: '\u{1F393}',
      title: t('home.services.mentoring.title'),
      description: 'You get: 1:1 sessions with a senior developer. You learn: programming, AI tools, digital skills.',
      price: 'From ₪150/hour',
      accent: 'from-amber-400 to-orange-500',
    },
    {
      emoji: '\u{1F4F1}',
      title: t('home.services.marketing.title'),
      description: 'You get: full social media management + AI content. Result: more visibility, more clients.',
      price: 'From ₪800/month',
      accent: 'from-yellow-400 to-amber-500',
    },
    {
      emoji: '\u{26A1}',
      title: t('home.services.products.title'),
      description: 'You get: website, chatbot, or automation built for you. Result: your business runs 24/7.',
      price: 'From ₪1,500 setup',
      accent: 'from-orange-400 to-red-500',
    },
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
    <div className="relative min-h-screen" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #1a0e00 40%, #0a0a0a 100%)' }}>
      <div className="fixed inset-0 z-0" style={{ backgroundImage: 'url(/images/bg-home-bee.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15 }} />
      <div className="relative z-10">

        {/* Hero Section */}
        <section className="pt-24 pb-8 px-4 sm:px-6 lg:px-8 min-h-[80vh] flex items-center">
          <div className="max-w-7xl mx-auto w-full">
            <div className="max-w-4xl">
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/5 mb-8 fade-in">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm text-gold-300 font-medium">{t('home.badge')}</span>
              </div>

              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 fade-in leading-[0.95] tracking-tight">
                <span className="text-gold-100/90">{t('home.heroLine1a')}</span>
                <span className="gradient-text">{t('home.heroLine1b')}</span>
                <br />
                <span className="text-gold-100/90">{t('home.heroLine2a')}</span>
                <span className="gradient-text">{t('home.heroLine2b')}</span>
              </h1>

              <p className="text-lg md:text-xl text-gold-300/80 mb-10 max-w-2xl fade-in leading-relaxed" style={{ animationDelay: '0.2s' }}>
                {t('home.subtitle')}
              </p>

              {/* Dual CTAs */}
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
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-semibold border border-gold-500/30 text-gold-300 hover:border-gold-400 hover:text-gold-200 hover:bg-gold-500/5 transition-all"
                >
                  {t('home.ctaSecondary')}
                </Link>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 fade-in" style={{ animationDelay: '0.6s' }}>
                {stats.map((stat, i) => (
                  <div key={i} className="text-left">
                    <div className="font-display text-3xl md:text-4xl font-extrabold gradient-text">{stat.value}</div>
                    <div className="text-sm text-gold-400/60 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <ScrollReveal>
          <section className="py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="mb-16">
                <h2 className="font-display text-3xl md:text-5xl font-bold text-gold-100/90 mb-4">
                  {t('home.servicesTitle1')}<span className="gradient-text">{t('home.servicesTitle2')}</span>
                </h2>
                <p className="text-lg text-gold-400/70 max-w-xl">
                  {t('home.servicesSubtitle')}
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {services.map((service, i) => (
                  <div
                    key={i}
                    className="group relative rounded-2xl overflow-hidden border border-white/5 bg-[#1a1a1a]/60 backdrop-blur-sm p-8 md:p-10 transition-all duration-300 hover:border-gold-500/20 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(245,158,11,0.08)]"
                  >
                    {/* Top accent line */}
                    <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${service.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                    {service.badge && (
                      <div className="inline-block px-2 py-0.5 rounded-full text-xs font-bold bg-green-500/20 text-green-400 border border-green-500/30 mb-3">{service.badge}</div>
                    )}
                    <div className="text-4xl mb-5">{service.emoji}</div>
                    <h3 className="font-display text-xl font-bold text-gold-200 mb-3">{service.title}</h3>
                    <p className="text-gold-400/70 leading-relaxed mb-4">{service.description}</p>
                    <div className="text-lg font-bold text-gold-300">{service.price}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Mission Section */}
        <ScrollReveal>
          <section className="py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="glass rounded-3xl p-10 md:p-16 relative overflow-hidden">
                <h2 className="font-display text-2xl md:text-4xl font-bold text-gold-200 mb-8 relative z-10">
                  {t('home.missionTitle')}
                </h2>
                <p className="text-lg md:text-xl text-gold-300 mb-6 relative z-10 leading-relaxed">
                  {t('home.missionP1')}
                </p>
                <p className="text-base md:text-lg text-gold-400/80 mb-6 relative z-10 leading-relaxed">
                  {t('home.missionP2')}
                </p>
                <p className="text-base md:text-lg text-gold-300/70 relative z-10 leading-relaxed">
                  {t('home.missionP3')}
                </p>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Simple CTA */}
        <ScrollReveal delay={100}>
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
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
