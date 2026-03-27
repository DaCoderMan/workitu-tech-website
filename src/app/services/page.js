'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import VideoBackground from '../../components/animations/VideoBackground';
import ScrollReveal from '../../components/animations/ScrollReveal';
import { useSafeT } from '../../lib/useLanguage';

const faqItems = [
  {
    q: 'How much does AI automation cost in Israel?',
    a: 'AI automation projects at Workitu Tech start from a few thousand shekels for simple workflow automations (n8n, Zapier) and scale based on complexity. Custom AI agents with memory, integrations, and production deployment are priced per project with a fixed scope. Book a free discovery call for a tailored quote.',
  },
  {
    q: 'What is n8n automation?',
    a: 'n8n is an open-source workflow automation platform that connects apps, APIs, and services without code. Workitu Tech specializes in self-hosted n8n deployments on VPS, giving you full control over your automation workflows \u2014 no vendor lock-in, no per-execution fees.',
  },
  {
    q: 'Can you build an AI chatbot for my business?',
    a: 'Yes. Workitu Tech builds custom AI chatbots powered by Claude API and OpenAI that integrate with your existing systems \u2014 CRM, calendar, email, databases. Our chatbots handle real conversations, not scripted flows.',
  },
  {
    q: 'Do you work with international clients?',
    a: 'Absolutely. Workitu Tech serves clients in Israel, Brazil, and globally. Yonatan speaks English, Portuguese, and Hebrew fluently, which means zero communication friction across markets.',
  },
  {
    q: 'What is the difference between AI automation and traditional automation?',
    a: 'Traditional automation follows rigid rules (if X then Y). AI automation uses language models and machine learning to handle ambiguous tasks \u2014 understanding emails, classifying documents, generating reports, and making decisions. Workitu builds both, often combining them.',
  },
  {
    q: 'How long does a typical web development project take?',
    a: 'A professional business website takes 2\u20134 weeks. A full web application with backend, authentication, and integrations takes 4\u20138 weeks. Every project starts with a written scope so you know the timeline before we begin.',
  },
  {
    q: 'Do you offer ongoing support after delivery?',
    a: 'Yes. Workitu Tech offers maintenance packages for hosting, updates, bug fixes, and feature additions. Your project doesn\u2019t end at delivery \u2014 it\u2019s the beginning of a working relationship.',
  },
];

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
            <span className="gradient-text">AI Automation & Web Development Services</span>
          </h1>
          <p className="text-lg md:text-xl text-gold-300/80 max-w-3xl mx-auto fade-in" style={{ animationDelay: '0.2s' }}>
            Custom AI agents, n8n workflows, Next.js web apps, and AI chatbots built by an enterprise-background developer in Israel.
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
              <h2 className="text-2xl font-bold text-gold-300 mb-4">Custom Web Application Development</h2>
              <p className="text-gold-400/70 mb-6">Professional websites and web apps built with Next.js, React, and Node.js. Enterprise-quality code from a developer with 4.5 years in fintech.</p>
              <ul className="space-y-2">
                {['Next.js & React web applications', 'Responsive, mobile-first design', 'SEO-optimized architecture', 'API integrations & backend development', 'E-commerce platforms', 'Ongoing maintenance & support'].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gold-300/80">
                    <span className="text-gold-400 mt-1">&#8226;</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/pricing" className="mt-4 inline-block text-gold-400 hover:text-gold-300 text-sm font-medium">
                See Pricing &rarr;
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
              <h2 className="text-2xl font-bold text-gold-300 mb-4">AI Agents & Workflow Automation</h2>
              <p className="text-gold-400/70 mb-6">Custom AI agents powered by Claude API and OpenAI, with n8n workflow automation. Built to run your business 24/7.</p>
              <ul className="space-y-2">
                {['Custom AI agents with memory & tools', 'n8n workflow automation (self-hosted)', 'Claude API & OpenAI integrations', 'CRM & calendar automation', 'Document processing & classification', 'Multi-step autonomous workflows'].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gold-300/80">
                    <span className="text-gold-400 mt-1">&#8226;</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/pricing" className="mt-4 inline-block text-gold-400 hover:text-gold-300 text-sm font-medium">
                See Pricing &rarr;
              </Link>
            </div>

            {/* AI Chatbots for Business */}
            <div className="glass rounded-xl p-8 card-hover fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-gold-400 mb-6">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gold-300 mb-4">AI Chatbots for Business</h2>
              <p className="text-gold-400/70 mb-6">Intelligent chatbots that handle real conversations, not scripted flows. Integrated with your existing tools and trained on your business data.</p>
              <ul className="space-y-2">
                {['Natural language customer support', 'Website & WhatsApp chatbots', 'Knowledge base integration', 'Lead qualification & booking', 'Multi-language support (EN/PT/HE)', 'Analytics & conversation insights'].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gold-300/80">
                    <span className="text-gold-400 mt-1">&#8226;</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/pricing" className="mt-4 inline-block text-gold-400 hover:text-gold-300 text-sm font-medium">
                See Pricing &rarr;
              </Link>
            </div>

            {/* Tech Consulting */}
            <div className="glass rounded-xl p-8 card-hover fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="text-gold-400 mb-6">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gold-300 mb-4">Tech Consulting in English & Portuguese</h2>
              <p className="text-gold-400/70 mb-6">Strategic technology consulting for businesses entering or operating in the Israeli and Brazilian markets. From architecture to AI strategy.</p>
              <ul className="space-y-2">
                {['AI readiness assessment', 'Technology architecture review', 'Automation strategy & ROI analysis', 'Vendor selection & integration planning', 'Private tech & AI lessons', 'Bilingual project management'].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gold-300/80">
                    <span className="text-gold-400 mt-1">&#8226;</span>
                    {feature}
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
              <h2 className="text-2xl font-bold text-gold-300 mb-4">AI Systems for the Brazilian-Israeli Market</h2>
              <p className="text-gold-400/70 mb-6">Bilingual AI products, chatbots, and automation tools for businesses operating between Brazil and Israel. Unique expertise &mdash; few developers in the world cover both markets natively.</p>
              <ul className="space-y-2 md:columns-2">
                {['Portuguese & Hebrew AI chatbots', 'Brazilian community platforms in Israel', 'Cross-border business automation', 'Immigration & bureaucracy tools', 'Bilingual SaaS products', 'Cultural bridge consulting'].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gold-300/80 break-inside-avoid">
                    <span className="text-gold-400 mt-1">&#8226;</span>
                    {feature}
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
          <h2 className="text-3xl font-bold text-gold-400 mb-12 text-center">How We Work</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { title: 'Discovery', description: 'Free call to understand your needs and goals.' },
              { title: 'Scope', description: 'Written proposal with fixed price and timeline.' },
              { title: 'Build', description: 'Development with regular updates and demos.' },
              { title: 'Review', description: 'Your feedback shapes the final product.' },
              { title: 'Launch', description: 'Deployment, testing, and go-live support.' },
              { title: 'Support', description: 'Ongoing maintenance and improvements.' },
            ].map((step, num) => (
              <div key={num} className="text-center">
                <div className="text-4xl font-bold text-gold-400/30 mb-2">0{num + 1}</div>
                <h4 className="text-lg font-semibold text-gold-300 mb-2">{step.title}</h4>
                <p className="text-sm text-gold-400/70">{step.description}</p>
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
          <h2 className="text-3xl font-bold text-gold-400 mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqItems.map((item, i) => (
              <div key={i} className="glass rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                >
                  <h3 className="text-gold-200 font-semibold">{item.q}</h3>
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
                    <p className="text-gold-300/70 leading-relaxed">{item.a}</p>
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
          <h2 className="text-3xl font-bold text-gold-400 mb-4">Ready to Automate & Build?</h2>
          <p className="text-gold-300/80 mb-8">
            Let&apos;s discuss your project. Book a free discovery call or explore pricing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="btn-gold inline-block px-8 py-3 rounded-lg text-lg font-medium"
            >
              Book a Free Discovery Call
            </a>
            <a
              href="/pricing"
              className="inline-block px-8 py-3 rounded-lg text-lg font-medium border border-gold-400 text-gold-400 hover:bg-gold-400/10 transition-colors"
            >
              View Pricing
            </a>
          </div>
        </div>
      </section>
      </ScrollReveal>
    </div>
  );
}
