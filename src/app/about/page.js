'use client';

import { useEffect } from 'react';
import VideoBackground from '../../components/animations/VideoBackground';
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
    <div className="relative min-h-screen">
      <VideoBackground imageSrc="/images/cyberbee-hero.png" />
      <section className="relative z-10 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 fade-in">
            <span className="gradient-text">{t('about.title') || 'About Workitu Tech'}</span>
          </h1>
          <p className="text-lg md:text-xl text-gold-300/80 max-w-3xl mx-auto fade-in" style={{ animationDelay: '0.2s' }}>
            {t('about.subtitle') || 'Efficient. Simple. Transformative. — Technology that works for you.'}
          </p>
        </div>
      </section>

      <ScrollReveal>
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-3xl p-10 md:p-16">
            <h2 className="font-display text-2xl md:text-4xl font-bold text-gold-200 mb-8">{t('about.meet.title') || 'Meet Yonatan'}</h2>
            <p className="text-lg text-gold-300 mb-6 leading-relaxed">{t('about.meet.p1') || 'I\'m Yonatan Perlin — a Brazilian-Israeli software engineer, AI builder, and founder of Workitu Tech. I spent 4.5 years at Banco do Brasil building enterprise-grade software used by millions.'}</p>
            <p className="text-base text-gold-400/80 mb-6 leading-relaxed">{t('about.meet.p2') || 'Today, I build AI automation systems, websites, and digital products for professionals in Israel and globally. I speak Portuguese, English, and Hebrew — no translation layer needed.'}</p>
            <p className="text-sm text-gold-400/60">{t('about.meet.skills') || 'React · Next.js · Node.js · Python · FastAPI · n8n · Claude API · OpenAI · MBA Technology Management, University of Haifa'}</p>
          </div>
        </div>
      </section>
      </ScrollReveal>

      <ScrollReveal>
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gold-400 mb-12 text-center">{t('about.why.title') || 'Why Workitu?'}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass rounded-xl p-8 card-hover">
              <div className="text-4xl mb-4">🏗️</div>
              <h3 className="text-xl font-bold text-gold-300 mb-3">{t('about.why.enterprise.title') || 'Enterprise DNA'}</h3>
              <p className="text-gold-400/70">{t('about.why.enterprise.text') || '4.5 years building software used by millions at Banco do Brasil. Same discipline and quality — at accessible prices.'}</p>
            </div>
            <div className="glass rounded-xl p-8 card-hover">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-bold text-gold-300 mb-3">{t('about.why.trilingual.title') || 'Trilingual Delivery'}</h3>
              <p className="text-gold-400/70">{t('about.why.trilingual.text') || 'Portuguese, English, and Hebrew. No communication gaps, no cultural friction. I understand your market from the inside.'}</p>
            </div>
            <div className="glass rounded-xl p-8 card-hover">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-gold-300 mb-3">{t('about.why.results.title') || 'Results, Not Demos'}</h3>
              <p className="text-gold-400/70">{t('about.why.results.text') || 'You\'re hiring someone who ships.'}</p>
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      <ScrollReveal>
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gold-400 mb-12 text-center">{t('about.approach.title') || 'Our Approach'}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-gold-400/30 mb-3">01</div>
              <h3 className="text-lg font-semibold text-gold-300 mb-2">{t('about.approach.step1.title') || 'Free Diagnosis'}</h3>
              <p className="text-sm text-gold-400/70">{t('about.approach.step1.text') || 'We talk about your business, your pain points, and where AI can make the biggest impact.'}</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-gold-400/30 mb-3">02</div>
              <h3 className="text-lg font-semibold text-gold-300 mb-2">{t('about.approach.step2.title') || 'We Build'}</h3>
              <p className="text-sm text-gold-400/70">{t('about.approach.step2.text') || 'Fixed scope, fixed price. You see progress at every step. No surprises.'}</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-gold-400/30 mb-3">03</div>
              <h3 className="text-lg font-semibold text-gold-300 mb-2">{t('about.approach.step3.title') || 'Your Business Transforms'}</h3>
              <p className="text-sm text-gold-400/70">{t('about.approach.step3.text') || 'Your AI agents work 24/7. Your marketing runs on autopilot. You focus on what you do best.'}</p>
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      <ScrollReveal delay={100}>
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-gold-100/90 mb-6">
            {t('about.cta.title') || 'Ready to Transform Your Business?'}
          </h2>
          <p className="text-lg text-gold-400/70 mb-10 max-w-xl mx-auto">
            {t('about.cta.text') || 'Book a free diagnosis call and discover how AI can simplify your operations.'}
          </p>
          <Link href="/contact" className="btn-gold inline-flex items-center gap-2 px-10 py-5 rounded-full text-xl font-bold">
            {t('about.cta.button') || 'Schedule Free Diagnosis'}
          </Link>
        </div>
      </section>
      </ScrollReveal>
    </div>
  );
}
