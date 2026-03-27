'use client';

import { useEffect } from 'react';
import VideoBackground from '../components/animations/VideoBackground';
import ScrollReveal from '../components/animations/ScrollReveal';
import { useSafeT } from '../lib/useLanguage';
import Link from 'next/link';

const stats = [
  { value: '4.5yr', label: 'Fintech (BdB)' },
  { value: '150+', label: 'Projects Built' },
  { value: '1', label: 'Live SaaS Product' },
  { value: '\u{1F1E7}\u{1F1F7}\u{1F1EE}\u{1F1F1}\u{1F1EC}\u{1F1E7}', label: 'Trilingual' },
];

const services = [
  {
    emoji: '\u{1F916}',
    title: 'AI Agents & Automation',
    description: 'Custom AI assistants that run your business 24/7. Chatbots, workflow automation with n8n, and intelligent systems built with Claude API and OpenAI.',
    accent: 'from-amber-400 to-orange-500',
  },
  {
    emoji: '\u{1F310}',
    title: 'Web Development',
    description: 'Professional websites and web apps that convert visitors into clients. Built with Next.js, React, and modern tooling by a developer with enterprise fintech background.',
    accent: 'from-yellow-400 to-amber-500',
  },
  {
    emoji: '\u{1F4F1}',
    title: 'Digital Marketing & Social Media',
    description: 'Social media management, content strategy, and lead generation that brings real clients to your business.',
    accent: 'from-orange-400 to-red-500',
  },
  {
    emoji: '\u{1F393}',
    title: 'Tech & AI Lessons',
    description: 'Private lessons in programming, AI tools, and technology. Learn at your own pace with a senior developer as your teacher.',
    accent: 'from-yellow-300 to-amber-400',
  },
  {
    emoji: '\u{1F1E7}\u{1F1F7}',
    title: 'AI Systems for Brazilian-Israeli Market',
    description: 'Bilingual AI products, chatbots, and automation tools for businesses operating between Brazil and Israel. Unique expertise \u2014 few developers in the world cover both markets.',
    accent: 'from-emerald-400 to-teal-500',
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
              <span className="text-gold-100/90">Built by Someone Who Has </span>
              <span className="gradient-text">Shipped Real Systems</span>
            </h1>

            <p className="text-lg md:text-xl text-gold-300/80 mb-10 max-w-2xl fade-in leading-relaxed" style={{ animationDelay: '0.2s' }}>
              4.5 years in enterprise fintech. Trilingual. Living in Israel. Building AI systems that actually work &mdash; for businesses that need results, not demos.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-wrap gap-4 mb-16 fade-in" style={{ animationDelay: '0.4s' }}>
              <Link
                href="/contact"
                className="btn-gold inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-bold"
              >
                Book a Free Discovery Call
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-semibold border border-gold-500/30 text-gold-300 hover:border-gold-400 hover:text-gold-200 hover:bg-gold-500/5 transition-all"
              >
                See What I Build
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
                End-to-end AI automation and web development powered by enterprise-grade engineering and modern AI.
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
                Meet <span className="gradient-text">Yonatan</span>
              </h2>
              <p className="text-lg md:text-xl text-gold-300 mb-6 relative z-10 leading-relaxed">
                I&apos;m Yonatan Perlin &mdash; a Brazilian-Israeli software engineer, AI builder, and founder of Workitu Tech. I spent 4.5 years at Banco do Brasil building enterprise-grade software used by millions of people.
              </p>
              <p className="text-base md:text-lg text-gold-400/80 mb-6 relative z-10 leading-relaxed">
                Today, I build AI automation systems, web applications, and custom software for businesses in Israel, Brazil, and globally. I speak Portuguese, English, and Hebrew &mdash; which means I can work with your team without the translation layer most agencies need.
              </p>
              <p className="text-base md:text-lg text-gold-300/70 relative z-10 leading-relaxed">
                React &middot; Next.js &middot; Node.js &middot; Python &middot; FastAPI &middot; n8n &middot; Claude API &middot; OpenAI &middot; MBA Technology Management, University of Haifa
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
              Why <span className="gradient-text">Work With Me</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
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
                  title: 'Live Products, Not Mockups',
                  subtitle: 'I ship things that go online and stay online.',
                  text: 'Conex\u00e3o Israel Brasil is a live SaaS with real users and a paid subscription model. You\u2019re hiring someone who builds things that work.',
                },
                {
                  title: 'Strategy Meets Code',
                  subtitle: 'MBA in Technology Management, University of Haifa.',
                  text: 'I can code your product and help you think through the business model. Both matter.',
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
              Ready to <span className="gradient-text">Transform</span> Your Business?
            </h2>
            <p className="text-lg text-gold-400/70 mb-10 max-w-xl mx-auto">
              Let&apos;s discuss how AI automation and modern web solutions can accelerate your growth.
            </p>
            <Link
              href="/contact"
              className="btn-gold inline-flex items-center gap-2 px-10 py-5 rounded-full text-xl font-bold"
            >
              Book a Free Discovery Call
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
