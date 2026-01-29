'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import VideoBackground from '../components/animations/VideoBackground';
import { useLanguage } from '../lib/useLanguage';
import StatsCounter from '../components/ui/StatsCounter';
import TechStackShowcase from '../components/ui/TechStackShowcase';
import FeaturedProjects from '../components/home/FeaturedProjects';
import ProcessSection from '../components/home/ProcessSection';
import FAQ from '../components/ui/FAQ';

export default function Home() {
  const { t } = useLanguage();

  useEffect(() => {
    // Track page view
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

  const stats = [
    { value: 8, suffix: '+', label: t('home.stats.projects') },
    { value: 6, suffix: '', label: t('home.stats.categories') }
  ];

  const faqItems = [
    { question: t('home.faq.q1'), answer: t('home.faq.a1') },
    { question: t('home.faq.q2'), answer: t('home.faq.a2') },
    { question: t('home.faq.q3'), answer: t('home.faq.a3') },
    { question: t('home.faq.q4'), answer: t('home.faq.a4') },
    { question: t('home.faq.q5'), answer: t('home.faq.a5') }
  ];

  return (
    <div className="relative min-h-screen">
      <VideoBackground />

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 fade-in">
              <span className="gradient-text">
                {t('home.title')}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gold-300 mb-4 fade-in" style={{ animationDelay: '0.2s' }}>
              {t('home.tagline')}
            </p>
            <p className="text-lg md:text-xl text-gold-400/80 mb-8 max-w-4xl mx-auto fade-in" style={{ animationDelay: '0.4s' }}>
              {t('home.description')} {t('home.subDescription')}
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center fade-in" style={{ animationDelay: '0.6s' }}>
              <Link
                href="/contact"
                className="btn-gold px-8 py-4 rounded-full text-lg font-semibold inline-block"
              >
                {t('home.ctaPrimary')}
              </Link>
              <Link
                href="/portfolio"
                className="btn-outline-gold px-8 py-4 rounded-full text-lg font-semibold inline-block"
              >
                {t('home.ctaSecondary')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto fade-in" style={{ animationDelay: '0.8s' }}>
          <StatsCounter stats={stats} />
        </div>
      </section>

      {/* Tech Stack Showcase */}
      <section className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto fade-in" style={{ animationDelay: '1s' }}>
          <TechStackShowcase title={t('home.techStack')} />
        </div>
      </section>

      {/* Process Section - How We Work */}
      <section className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto fade-in" style={{ animationDelay: '1.2s' }}>
          <ProcessSection />
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass rounded-2xl p-8 md:p-12 fade-in" style={{ animationDelay: '1.4s' }}>
            <p className="text-lg md:text-xl text-gold-300 mb-6">
              {t('home.mission1')}
            </p>
            <p className="text-base md:text-lg text-gold-400/80 mb-6">
              {t('home.mission2')}
            </p>
            <p className="text-base md:text-lg text-gold-300/70">
              {t('home.mission3')}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto fade-in" style={{ animationDelay: '1.4s' }}>
          <FeaturedProjects
            title={t('home.featuredWork')}
            viewAllText={t('home.viewAllProjects')}
            viewAllLink="/portfolio"
          />
        </div>
      </section>

      {/* Tagline Section */}
      <section className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="fade-in" style={{ animationDelay: '1.6s' }}>
            <p className="text-xl md:text-2xl text-gold-400 font-medium">
              {t('home.tagline1')}
            </p>
            <p className="text-2xl md:text-3xl text-gold-300 font-bold mt-4">
              {t('home.tagline2')}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto fade-in" style={{ animationDelay: '1.8s' }}>
          <FAQ items={faqItems} title={t('home.faq.title')} />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="glass rounded-2xl p-8 fade-in" style={{ animationDelay: '2s' }}>
            <h2 className="text-2xl md:text-3xl font-bold text-gold-300 mb-4">
              Ready to bring your idea to life?
            </h2>
            <p className="text-gold-400/80 mb-6">
              Let&apos;s discuss your project and create something amazing together.
            </p>
            <Link
              href="/contact"
              className="btn-gold inline-block px-8 py-4 rounded-full text-lg font-semibold"
            >
              {t('home.ctaPrimary')}
            </Link>
            <p className="text-gold-400/70 text-sm mt-4">
              Or email us directly: <a href="mailto:contact@workitu.com" className="text-gold-400 hover:text-gold-300">contact@workitu.com</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
