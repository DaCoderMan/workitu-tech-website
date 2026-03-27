'use client';

import { useEffect } from 'react';
import VideoBackground from '../components/animations/VideoBackground';
import ScrollReveal from '../components/animations/ScrollReveal';
import { useSafeT } from '../lib/useLanguage';
import Link from 'next/link';

export default function Home() {
  const t = useSafeT();

  const stats = [
    { value: t('home.stats.fintech.value'), label: t('home.stats.fintech.label') },
    { value: t('home.stats.projects.value'), label: t('home.stats.projects.label') },
    { value: t('home.stats.saas.value'), label: t('home.stats.saas.label') },
    { value: '\u{1F1E7}\u{1F1F7}\u{1F1EE}\u{1F1F1}\u{1F1EC}\u{1F1E7}', label: t('home.stats.trilingual.label') },
  ];

  const services = [
    {
      emoji: '\u{1F916}',
      title: t('home.services.ai.title'),
      description: t('home.services.ai.description'),
      accent: 'from-amber-400 to-orange-500',
    },
    {
      emoji: '\u{1F310}',
      title: t('home.services.web.title'),
      description: t('home.services.web.description'),
      accent: 'from-yellow-400 to-amber-500',
    },
    {
      emoji: '\u{1F4F1}',
      title: t('home.services.marketing.title'),
      description: t('home.services.marketing.description'),
      accent: 'from-orange-400 to-red-500',
    },
    {
      emoji: '\u{1F393}',
      title: t('home.services.lessons.title'),
      description: t('home.services.lessons.description'),
      accent: 'from-yellow-300 to-amber-400',
    },
    {
      emoji: '\u{1F1E7}\u{1F1F7}',
      title: t('home.services.brazil.title'),
      description: t('home.services.brazil.description'),
      accent: 'from-emerald-400 to-teal-500',
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
    <div className="relative min-h-screen">
      <VideoBackground imageSrc="/images/bg-home.svg" />

      {/* Hero Section */}
      <section className="relative z-10 pt-24 pb-8 px-4 sm:px-6 lg:px-8 min-h-[80vh] flex items-center">
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
        <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="font-display text-3xl md:text-5xl font-bold text-gold-100/90 mb-4">
                {t('home.servicesTitle1')}<span className="gradient-text">{t('home.servicesTitle2')}</span>
              </h2>
              <p className="text-lg text-gold-400/70 max-w-xl">
                {t('home.servicesSubtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {services.map((service, i) => (
                <div
                  key={i}
                  className={`group relative rounded-2xl overflow-hidden border border-white/5 bg-[#1a1a1a]/60 backdrop-blur-sm p-8 md:p-10 transition-all duration-300 hover:border-gold-500/20 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(245,158,11,0.08)] ${i === services.length - 1 ? 'md:col-span-2' : ''}`}
                >
                  {/* Top accent line */}
                  <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${service.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  <div className="text-4xl mb-5">{service.emoji}</div>
                  <h3 className="font-display text-xl font-bold text-gold-200 mb-3">{service.title}</h3>
                  <p className="text-gold-400/70 leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Meet Yonatan Section */}
      <ScrollReveal>
        <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="glass rounded-3xl p-10 md:p-16 relative overflow-hidden">
              <h2 className="font-display text-2xl md:text-4xl font-bold text-gold-200 mb-8 relative z-10">
                {t('home.meetTitle')}<span className="gradient-text">{t('home.meetName')}</span>
              </h2>
              <p className="text-lg md:text-xl text-gold-300 mb-6 relative z-10 leading-relaxed">
                {t('home.meetP1')}
              </p>
              <p className="text-base md:text-lg text-gold-400/80 mb-6 relative z-10 leading-relaxed">
                {t('home.meetP2')}
              </p>
              <p className="text-base md:text-lg text-gold-300/70 relative z-10 leading-relaxed">
                {t('home.meetP3')}
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Why Workitu Section */}
      <ScrollReveal>
        <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-gold-100/90 mb-12 text-center">
              {t('home.whyTitle1')}<span className="gradient-text">{t('home.whyTitle2')}</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: t('home.why.fintech.title'),
                  subtitle: t('home.why.fintech.subtitle'),
                  text: t('home.why.fintech.text'),
                },
                {
                  title: t('home.why.trilingual.title'),
                  subtitle: t('home.why.trilingual.subtitle'),
                  text: t('home.why.trilingual.text'),
                },
                {
                  title: t('home.why.live.title'),
                  subtitle: t('home.why.live.subtitle'),
                  text: t('home.why.live.text'),
                },
                {
                  title: t('home.why.strategy.title'),
                  subtitle: t('home.why.strategy.subtitle'),
                  text: t('home.why.strategy.text'),
                },
              ].map((item, i) => (
                <div key={i} className="glass rounded-2xl p-8 card-hover">
                  <h3 className="font-display text-xl font-bold text-gold-200 mb-1">{item.title}</h3>
                  <p className="text-gold-400 text-sm font-medium mb-3">{item.subtitle}</p>
                  <p className="text-gold-300/70 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* CTA Section */}
      <ScrollReveal delay={100}>
        <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-gold-100/90 mb-6">
              {t('home.ctaTitle1')}<span className="gradient-text">{t('home.ctaTitle2')}</span>{t('home.ctaTitle3')}
            </h2>
            <p className="text-lg text-gold-400/70 mb-10 max-w-xl mx-auto">
              {t('home.ctaText')}
            </p>
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
  );
}
