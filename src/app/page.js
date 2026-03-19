'use client';

import { useEffect } from 'react';
import VideoBackground from '../components/animations/VideoBackground';
import ScrollReveal from '../components/animations/ScrollReveal';
import { useSafeT } from '../lib/useLanguage';
import Link from 'next/link';

const stats = [
  { value: '10+', label: 'Years in Tech' },
  { value: 'Full-Stack', label: '+ AI Specialist' },
  { value: '3', label: 'Active Clients' },
  { value: '🇧🇷🇮🇱🇬🇧', label: 'Trilingual' },
];

const services = [
  {
    emoji: '🤖',
    title: 'AI Agents & Automation',
    description: 'Custom AI assistants that run your business 24/7. Chatbots, workflow automation, and intelligent systems built with real-world AI.',
    accent: 'from-amber-400 to-orange-500',
  },
  {
    emoji: '🌐',
    title: 'Web Development',
    description: 'Professional websites and web apps that convert visitors into clients. Built with Next.js, React, and modern tooling.',
    accent: 'from-yellow-400 to-amber-500',
  },
  {
    emoji: '📱',
    title: 'Digital Marketing & Social Media',
    description: 'Social media management, content strategy, and lead generation that brings real clients to your business.',
    accent: 'from-orange-400 to-red-500',
  },
  {
    emoji: '🎓',
    title: 'Tech & AI Lessons',
    description: 'Private lessons in programming, AI tools, and technology. Learn at your own pace with a senior developer as your teacher.',
    accent: 'from-yellow-300 to-amber-400',
  },
];

export default function Home() {
  const t = useSafeT();

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
              <span className="text-sm text-gold-300 font-medium">Available for projects</span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 fade-in leading-[0.95] tracking-tight">
              <span className="text-gold-100/90">AI </span>
              <span className="gradient-text">Automation</span>
              <br />
              <span className="text-gold-100/90">& Tech </span>
              <span className="gradient-text">Education</span>
            </h1>

            <p className="text-lg md:text-xl text-gold-300/80 mb-10 max-w-2xl fade-in leading-relaxed" style={{ animationDelay: '0.2s' }}>
              {t('home.description') || 'I build AI systems that save businesses hours every week, create professional websites that convert, and teach tech & AI to anyone who wants to learn.'}
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-wrap gap-4 mb-16 fade-in" style={{ animationDelay: '0.4s' }}>
              <Link
                href="/contact"
                className="btn-gold inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-bold"
              >
                Book a Call
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-semibold border border-gold-500/30 text-gold-300 hover:border-gold-400 hover:text-gold-200 hover:bg-gold-500/5 transition-all"
              >
                See What I Do
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
                What We <span className="gradient-text">Build</span>
              </h2>
              <p className="text-lg text-gold-400/70 max-w-xl">
                End-to-end digital solutions powered by cutting-edge AI and modern web technologies.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {services.map((service, i) => (
                <div
                  key={i}
                  className="group relative rounded-2xl overflow-hidden border border-white/5 bg-[#1a1a1a]/60 backdrop-blur-sm p-8 md:p-10 transition-all duration-300 hover:border-gold-500/20 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(245,158,11,0.08)]"
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

      {/* Mission Section */}
      <ScrollReveal>
        <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="glass rounded-3xl p-10 md:p-16 relative overflow-hidden">
              <h2 className="font-display text-2xl md:text-4xl font-bold text-gold-200 mb-8 relative z-10">
                Meet <span className="gradient-text">Yonatan</span>
              </h2>
              <p className="text-lg md:text-xl text-gold-300 mb-6 relative z-10 leading-relaxed">
                {t('home.mission1') || "Hi, I'm Yonatan Perlin — a full-stack developer and AI automation specialist based in Israel."}
              </p>
              <p className="text-base md:text-lg text-gold-400/80 mb-6 relative z-10 leading-relaxed">
                {t('home.mission2') || 'With 10+ years in fintech and a passion for AI, I help small businesses automate their operations, build their online presence, and grow. I also teach programming and AI tools to anyone who wants to level up.'}
              </p>
              <p className="text-base md:text-lg text-gold-300/70 relative z-10 leading-relaxed">
                {t('home.mission3') || 'Trilingual (English, Portuguese, Hebrew) · React · Node.js · Python · FastAPI · AI/LLM Integration'}
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* CTA Section */}
      <ScrollReveal delay={100}>
        <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-gold-100/90 mb-6">
              Ready to <span className="gradient-text">Transform</span> Your Business?
            </h2>
            <p className="text-lg text-gold-400/70 mb-10 max-w-xl mx-auto">
              Let&apos;s discuss how AI automation and modern web solutions can accelerate your growth.
            </p>
            <Link
              href="/contact"
              className="btn-gold inline-flex items-center gap-2 px-10 py-5 rounded-full text-xl font-bold"
            >
              {t('home.cta') || "Let's Talk — Free 15min Call"}
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
