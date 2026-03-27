'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import VideoBackground from '../../components/animations/VideoBackground';
import ScrollReveal from '../../components/animations/ScrollReveal';
import { useSafeT } from '../../lib/useLanguage';

export default function Services() {
  const t = useSafeT();
  const [openFaq, setOpenFaq] = useState(null);

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
    <div className="relative min-h-screen">
      <VideoBackground imageSrc="/images/bg-portfolio.svg" />

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
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
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Web Development */}
            <div className="glass rounded-xl p-8 card-hover fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-gold-400 mb-6">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gold-300 mb-4">{t('servicesPage.services.webDev.title')}</h2>
              <p className="text-gold-400/70 mb-6">{t('servicesPage.services.webDev.description')}</p>
              <ul className="space-y-2">
                {[0, 1, 2, 3, 4, 5].map((idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gold-300/80">
                    <span className="text-gold-400 mt-1">&#8226;</span>
                    {t(`servicesPage.services.webDev.features.${idx}`)}
                  </li>
                ))}
              </ul>
              <Link href="/pricing" className="mt-4 inline-block text-gold-400 hover:text-gold-300 text-sm font-medium">
                {t('servicesPage.ctaSecondary')} &rarr;
              </Link>
            </div>

            {/* AI Agents & Workflow Automation */}
            <div className="glass rounded-xl p-8 card-hover fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-gold-400 mb-6">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 7H7v6h6V7z" />
                  <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gold-300 mb-4">{t('servicesPage.services.aiAgents.title')}</h2>
              <p className="text-gold-400/70 mb-6">{t('servicesPage.services.aiAgents.description')}</p>
              <ul className="space-y-2">
                {[0, 1, 2, 3, 4, 5].map((idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gold-300/80">
                    <span className="text-gold-400 mt-1">&#8226;</span>
                    {t(`servicesPage.services.aiAgents.features.${idx}`)}
                  </li>
                ))}
              </ul>
              <Link href="/pricing" className="mt-4 inline-block text-gold-400 hover:text-gold-300 text-sm font-medium">
                {t('servicesPage.ctaSecondary')} &rarr;
              </Link>
            </div>

            {/* AI Chatbots for Business */}
            <div className="glass rounded-xl p-8 card-hover fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-gold-400 mb-6">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gold-300 mb-4">{t('servicesPage.services.chatbots.title')}</h2>
              <p className="text-gold-400/70 mb-6">{t('servicesPage.services.chatbots.description')}</p>
              <ul className="space-y-2">
                {[0, 1, 2, 3, 4, 5].map((idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gold-300/80">
                    <span className="text-gold-400 mt-1">&#8226;</span>
                    {t(`servicesPage.services.chatbots.features.${idx}`)}
                  </li>
                ))}
              </ul>
              <Link href="/pricing" className="mt-4 inline-block text-gold-400 hover:text-gold-300 text-sm font-medium">
                {t('servicesPage.ctaSecondary')} &rarr;
              </Link>
            </div>

            {/* Tech Consulting */}
            <div className="glass rounded-xl p-8 card-hover fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="text-gold-400 mb-6">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gold-300 mb-4">{t('servicesPage.services.consulting.title')}</h2>
              <p className="text-gold-400/70 mb-6">{t('servicesPage.services.consulting.description')}</p>
              <ul className="space-y-2">
                {[0, 1, 2, 3, 4, 5].map((idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gold-300/80">
                    <span className="text-gold-400 mt-1">&#8226;</span>
                    {t(`servicesPage.services.consulting.features.${idx}`)}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="mt-4 inline-block text-gold-400 hover:text-gold-300 text-sm font-medium">
                Get in Touch &rarr;
              </Link>
            </div>

            {/* Brazilian-Israeli Market — full width */}
            <div className="glass rounded-xl p-8 card-hover fade-in md:col-span-2" style={{ animationDelay: '0.5s' }}>
              <div className="text-gold-400 mb-6">
                <span className="text-5xl">{'\u{1F1E7}\u{1F1F7}'} {'\u{1F1EE}\u{1F1F1}'}</span>
              </div>
              <h2 className="text-2xl font-bold text-gold-300 mb-4">{t('servicesPage.services.brazil.title')}</h2>
              <p className="text-gold-400/70 mb-6">{t('servicesPage.services.brazil.description')}</p>
              <ul className="space-y-2 md:columns-2">
                {[0, 1, 2, 3, 4, 5].map((idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gold-300/80 break-inside-avoid">
                    <span className="text-gold-400 mt-1">&#8226;</span>
                    {t(`servicesPage.services.brazil.features.${idx}`)}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="mt-4 inline-block text-gold-400 hover:text-gold-300 text-sm font-medium">
                Let&apos;s Talk &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <ScrollReveal>
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gold-400 mb-12 text-center">{t('servicesPage.processTitle')}</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
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

      {/* FAQ Section */}
      <ScrollReveal>
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gold-400 mb-12 text-center">{t('servicesPage.faqTitle')}</h2>
          <div className="space-y-4">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="glass rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                >
                  <h3 className="text-gold-200 font-semibold">{t(`servicesPage.faq.${i}.q`)}</h3>
                  <svg
                    className={`w-5 h-5 text-gold-400 flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-gold-300/70 leading-relaxed">{t(`servicesPage.faq.${i}.a`)}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* CTA Section */}
      <ScrollReveal delay={100}>
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center glass rounded-xl p-12">
          <h2 className="text-3xl font-bold text-gold-400 mb-4">{t('servicesPage.ctaTitle')}</h2>
          <p className="text-gold-300/80 mb-8">
            {t('servicesPage.ctaText')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="btn-gold inline-block px-8 py-3 rounded-lg text-lg font-medium"
            >
              {t('servicesPage.ctaPrimary')}
            </a>
            <a
              href="/pricing"
              className="inline-block px-8 py-3 rounded-lg text-lg font-medium border border-gold-400 text-gold-400 hover:bg-gold-400/10 transition-colors"
            >
              {t('servicesPage.ctaSecondary')}
            </a>
          </div>
        </div>
      </section>
      </ScrollReveal>
    </div>
  );
}
