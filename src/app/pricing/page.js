'use client';

import { useEffect, useState } from 'react';
import VideoBackground from '../../components/animations/VideoBackground';

export default function Pricing() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Track page view
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        event: 'page_view', 
        page: 'pricing',
        timestamp: new Date().toISOString()
      })
    });

    // Fetch pricing content
    fetch('/api/admin/content')
      .then(res => res.json())
      .then(data => {
        setContent(data.pricing);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching content:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="relative min-h-screen">
        <VideoBackground />
        <div className="relative z-10 flex justify-center items-center min-h-screen">
          <div className="loading-spinner"></div>
          <span className="ml-3 text-gold-400">Loading pricing...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <VideoBackground />
      
      {/* Header Section */}
      <section className="relative z-10 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 fade-in">
            <span className="gradient-text">Pricing</span>
          </h1>
          <p className="text-lg md:text-xl text-gold-300/80 max-w-4xl mx-auto fade-in" style={{ animationDelay: '0.2s' }}>
            {content?.subtitle || 'At Workitu Tech, we believe great technology should be accessible to everyone.'}
          </p>
          <p className="text-base md:text-lg text-gold-400/70 max-w-5xl mx-auto mt-4 fade-in" style={{ animationDelay: '0.4s' }}>
            {content?.description || 'We offer transparent, flexible pricing — built around your goals, not just your budget. Every project is crafted with precision, creativity, and heart — because your success is our code.'}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative z-10 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content?.services?.map((service, index) => (
              <div
                key={index}
                className="card-hover glass rounded-xl p-8 fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-xl font-semibold text-gold-300 mb-3">
                  {service.title}
                </h3>
                <div className="text-2xl font-bold text-gold-400 mb-4">
                  {service.price}
                </div>
                <p className="text-gold-400/70 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            )) || [
              {
                title: "🌐 Website Creation",
                price: "Starting from $320",
                description: "Elegant, fast, and mobile-ready websites designed to impress and perform. Perfect for personal brands, startups, and small businesses ready to grow online."
              },
              {
                title: "🛒 E-Commerce Solutions",
                price: "Starting from $950", 
                description: "Powerful, secure online stores that help you sell with confidence and style. Includes payment integration, inventory management, and digital marketing setup."
              },
              {
                title: "🤖 AI-Powered Applications",
                price: "Starting from $670",
                description: "Transform your ideas into smart, scalable software powered by Generative AI. We automate workflows, personalize experiences, and make AI work for you and I."
              },
              {
                title: "📈 Digital Marketing & Growth",
                price: "Starting from $270/month",
                description: "We grow your online presence with SEO, automation, and social media strategy. From search to storytelling — your brand deserves to be seen and remembered."
              },
              {
                title: "⚙️ Custom Projects",
                price: "Every idea is unique — and so is every price.",
                description: "Let's discuss your vision, define your goals, and design the perfect solution together."
              }
            ].map((service, index) => (
              <div
                key={index}
                className="card-hover glass rounded-xl p-8 fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-xl font-semibold text-gold-300 mb-3">
                  {service.title}
                </h3>
                <div className="text-2xl font-bold text-gold-400 mb-4">
                  {service.price}
                </div>
                <p className="text-gold-400/70 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promise Section */}
      <section className="relative z-10 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass rounded-2xl p-8 md:p-12 fade-in" style={{ animationDelay: '0.6s' }}>
            <p className="text-lg md:text-xl text-gold-300 font-medium">
              {content?.promise || '💡 Our promise: fair pricing, honest communication, and results that last.'}
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="fade-in" style={{ animationDelay: '0.8s' }}>
            <a 
              href="/contact" 
              className="btn-gold inline-block px-8 py-4 rounded-full text-lg font-semibold"
            >
              Get Started Today
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
