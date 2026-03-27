'use client';

import { useEffect } from 'react';
import VideoBackground from '../../components/animations/VideoBackground';
import ScrollReveal from '../../components/animations/ScrollReveal';
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
    { name: 'Python', category: 'Backend' },
    { name: 'FastAPI', category: 'Backend' },
    { name: 'n8n', category: 'Automation' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'OpenAI API', category: 'AIML' },
    { name: 'Claude API', category: 'AIML' },
    { name: 'Vercel', category: 'Deployment' },
    { name: 'Hetzner VPS', category: 'Deployment' },
  ];

  const differentiators = [
    {
      title: 'Fintech DNA',
      subtitle: 'Enterprise background, startup speed.',
      text: 'I have built and maintained software used by millions of people. I apply that discipline to every project, no matter the size.',
    },
    {
      title: 'Trilingual Delivery',
      subtitle: 'Portuguese, English, and Hebrew.',
      text: 'No translation errors, no cultural gaps. I understand the Brazilian-Israeli business environment from the inside.',
    },
    {
      title: 'Live Products \u2014 I Ship',
      subtitle: 'Not a mockup person.',
      text: 'Conex\u00e3o Israel Brasil is a live SaaS with real users and a paid subscription model. You\u2019re hiring someone who builds things that go online and stay online.',
    },
    {
      title: 'Strategy Meets Code',
      subtitle: 'MBA in Technology Management, University of Haifa.',
      text: 'I can code your product and help you think through the business model. Both matter.',
    },
    {
      title: 'Transparent Pricing',
      subtitle: 'Fixed prices. No surprises.',
      text: 'Every project starts with a written scope. You know what you\u2019re paying for before we start.',
    },
  ];

  return (
    <div className="relative min-h-screen">
      <VideoBackground imageSrc="/images/bg-home.svg" />

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 fade-in">
            <span className="gradient-text">The Engineer Behind Workitu Tech</span>
          </h1>
          <p className="text-lg md:text-xl text-gold-300/80 max-w-3xl mx-auto fade-in" style={{ animationDelay: '0.2s' }}>
            4.5 years in enterprise fintech. Trilingual. Building AI systems and web apps in Israel.
          </p>
        </div>
      </section>

      {/* Bio Section */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="fade-in">
              <h2 className="text-3xl font-bold text-gold-400 mb-6">My Story in 3 Sentences</h2>
              <p className="text-gold-200 text-lg font-medium mb-6 leading-relaxed">
                I spent 4.5 years building enterprise software at Banco do Brasil &mdash; one of Latin America&apos;s largest banks. Now I build AI automation systems and web apps for businesses in Israel and globally. I speak three languages and ship products that real people use.
              </p>
              <h2 className="text-3xl font-bold text-gold-400 mb-6 mt-10">About Me</h2>
              <p className="text-gold-300/80 mb-4 leading-relaxed">
                I&apos;m Yonatan Sam Perlin &mdash; a Brazilian-Israeli software engineer, AI builder, and founder of Workitu Tech.
              </p>
              <p className="text-gold-300/80 mb-4 leading-relaxed">
                Before starting Workitu, I spent 4.5 years at Banco do Brasil &mdash; one of Latin America&apos;s largest financial institutions &mdash; building and maintaining enterprise-grade software. That experience gave me something most freelancers don&apos;t have: a deep understanding of what real production systems look like, and what it takes to ship software that thousands of people depend on.
              </p>
              <p className="text-gold-300/80 mb-4 leading-relaxed">
                Today, I build AI automation systems, web applications, and custom software for businesses in Israel, Brazil, and globally. I speak Portuguese, English, and Hebrew &mdash; which means I can work with your team, understand your market, and deliver without the translation layer most agencies need.
              </p>
              <p className="text-gold-300/80 leading-relaxed">
                I&apos;m currently completing an MBA in Technology Management at the University of Haifa, focused on leading AI and tech companies. Not because I need a credential &mdash; but because I believe the best builders also understand business.
              </p>
            </div>
            <div className="glass rounded-xl p-8 fade-in" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-2xl font-semibold text-gold-400 mb-6">Why Choose Workitu</h3>
              <div className="space-y-6">
                {differentiators.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-gold-400 mt-1 text-lg">&#10003;</span>
                    <div>
                      <span className="text-gold-200 font-semibold">{item.title}.</span>{' '}
                      <span className="text-gold-400 text-sm">{item.subtitle}</span>
                      <p className="text-gold-300/70 text-sm mt-1">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <ScrollReveal>
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gold-400 mb-12 text-center">Core Principles</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.727 1.17 1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                ),
                title: 'Enterprise Foundation',
                text: 'I didn\u2019t start as a freelancer. I started in a bank. 4.5 years of building software that real people depend on.',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 7H7v6h6V7z" />
                    <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clipRule="evenodd" />
                  </svg>
                ),
                title: 'AI Is Real, Not Buzzword',
                text: 'The AI systems I build are running live in production. Bee is on a server right now. CIB has paying users.',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z" clipRule="evenodd" />
                  </svg>
                ),
                title: 'Trilingual = Rare',
                text: 'Portuguese + English + Hebrew. I build for the Israeli market, sell to Brazilian companies, and work with international clients.',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                ),
                title: 'Builder, Not Reseller',
                text: 'Every line of code is written by me. No white-labeling, no subcontractors. What you see in the portfolio is what I actually built.',
              },
            ].map((value, i) => (
              <div key={i} className="glass rounded-xl p-6 text-center card-hover">
                <div className="text-gold-400 mb-4 flex justify-center">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gold-300 mb-3">{value.title}</h3>
                <p className="text-gold-400/70">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* Tech Stack Section */}
      <ScrollReveal delay={100}>
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gold-400 mb-12 text-center">{t('about.techStackTitle') || 'Tech Stack'}</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="glass px-6 py-3 rounded-full"
              >
                <span className="text-gold-300">{tech.name}</span>
                <span className="text-gold-400/50 text-sm ml-2">({tech.category})</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* CTA Section */}
      <ScrollReveal delay={200}>
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center glass rounded-xl p-12">
          <h2 className="text-3xl font-bold text-gold-400 mb-4">Let&apos;s Build Something Together</h2>
          <p className="text-gold-300/80 mb-8">
            Whether you need AI automation, a web application, or a technical consultant who speaks your language &mdash; I&apos;m here.
          </p>
          <a
            href="/contact"
            className="btn-gold inline-block px-8 py-3 rounded-lg text-lg font-medium"
          >
            Book a Free Discovery Call
          </a>
        </div>
      </section>
      </ScrollReveal>
    </div>
  );
}
