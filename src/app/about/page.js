'use client';

import { useEffect } from 'react';
import VideoBackground from '../../components/animations/VideoBackground';
import { useSafeT } from '../../lib/useLanguage';

export default function About() {
  const t = useSafeT();

  useEffect(() => {
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'page_view',
        page: 'about',
        timestamp: new Date().toISOString()
      })
    });
  }, []);

  const techStack = [
    { name: 'Next.js', category: 'Frontend' },
    { name: 'React', category: 'Frontend' },
    { name: 'Tailwind CSS', category: 'Styling' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'Python', category: 'AIML' },
    { name: 'OpenAI', category: 'AIML' },
    { name: 'Vercel', category: 'Deployment' },
    { name: 'PostgreSQL', category: 'Database' },
  ];

  return (
    <div className="relative min-h-screen">
      <VideoBackground imageSrc="/images/bg-home.svg" />

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 fade-in">
            <span className="gradient-text">{t('about.title')}</span>
          </h1>
          <p className="text-lg md:text-xl text-gold-300/80 max-w-3xl mx-auto fade-in" style={{ animationDelay: '0.2s' }}>
            {t('about.subtitle')}
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="fade-in">
              <h2 className="text-3xl font-bold text-gold-400 mb-6">{t('about.missionTitle')}</h2>
              <p className="text-gold-300/80 mb-4">
                {t('about.mission1')}
              </p>
              <p className="text-gold-300/80 mb-4">
                {t('about.mission2')}
              </p>
              <p className="text-gold-300/80">
                {t('about.mission3')}
              </p>
            </div>
            <div className="glass rounded-xl p-8 fade-in" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-2xl font-semibold text-gold-400 mb-6">{t('about.whyChooseUs')}</h3>
              <ul className="space-y-4">
                {[1, 2, 3, 4, 5].map((num) => (
                  <li key={num} className="flex items-start gap-3">
                    <span className="text-gold-400 mt-1">&#10003;</span>
                    <span className="text-gold-300/80">{t(`about.reasons.${num}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gold-400 mb-12 text-center fade-in">{t('about.valuesTitle')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass rounded-xl p-6 text-center card-hover fade-in" style={{ animationDelay: '0s' }}>
                <div className="text-gold-400 mb-4 flex justify-center">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gold-300 mb-3">{t('about.values.innovation.title')}</h3>
                <p className="text-gold-400/70">{t('about.values.innovation.description')}</p>
            </div>
            <div className="glass rounded-xl p-6 text-center card-hover fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="text-gold-400 mb-4 flex justify-center">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gold-300 mb-3">{t('about.values.quality.title')}</h3>
                <p className="text-gold-400/70">{t('about.values.quality.description')}</p>
            </div>
            <div className="glass rounded-xl p-6 text-center card-hover fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="text-gold-400 mb-4 flex justify-center">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gold-300 mb-3">{t('about.values.partnership.title')}</h3>
                <p className="text-gold-400/70">{t('about.values.partnership.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gold-400 mb-12 text-center fade-in">{t('about.techStackTitle')}</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech, index) => (
              <div
                key={tech.name}
                className="glass px-6 py-3 rounded-full fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <span className="text-gold-300">{tech.name}</span>
                <span className="text-gold-400/50 text-sm ml-2">({t(`about.techCategories.${tech.category}`)})</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center glass rounded-xl p-12 fade-in">
          <h2 className="text-3xl font-bold text-gold-400 mb-4">{t('about.ctaTitle')}</h2>
          <p className="text-gold-300/80 mb-8">
            {t('about.ctaText')}
          </p>
          <a
            href="/contact"
            className="btn-gold inline-block px-8 py-3 rounded-lg text-lg font-medium"
          >
            {t('about.ctaButton')}
          </a>
        </div>
      </section>
    </div>
  );
}
