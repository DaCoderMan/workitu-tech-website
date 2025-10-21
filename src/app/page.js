'use client';

import { useEffect } from 'react';
import VideoBackground from '../components/animations/VideoBackground';

export default function Home() {
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

  return (
    <div className="relative min-h-screen">
      <VideoBackground />
      
      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 fade-in">
              <span className="gradient-text">
                Workitu Tech
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gold-300 mb-4 fade-in" style={{ animationDelay: '0.2s' }}>
              Where Imagination Meets Innovation
            </p>
            <p className="text-lg md:text-xl text-gold-400/80 mb-8 max-w-4xl mx-auto fade-in" style={{ animationDelay: '0.4s' }}>
              Workitu Tech creates digital experiences that inspire and perform.
            </p>
            <p className="text-base md:text-lg text-gold-300/70 mb-12 max-w-5xl mx-auto fade-in" style={{ animationDelay: '0.6s' }}>
              We craft sophisticated websites, AI-powered apps, and e-commerce platforms that help your ideas shine online.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass rounded-2xl p-8 md:p-12 fade-in" style={{ animationDelay: '0.8s' }}>
            <p className="text-lg md:text-xl text-gold-300 mb-6">
              ✨ Gen AI works for you and I — turning creativity into code, and vision into reality.
            </p>
            <p className="text-base md:text-lg text-gold-400/80 mb-6">
              Our mission is simple: deliver world-class technology at a fair price, built with care, passion, and precision.
            </p>
            <p className="text-base md:text-lg text-gold-300/70">
              From sleek web design to smart automation, from marketing strategy to digital growth — 
              Workitu Tech is your partner in building the future.
            </p>
          </div>
        </div>
      </section>

      {/* Tagline Section */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="fade-in" style={{ animationDelay: '1s' }}>
            <p className="text-xl md:text-2xl text-gold-400 font-medium">
              Because the web isn't just where you exist —
            </p>
            <p className="text-2xl md:text-3xl text-gold-300 font-bold mt-4">
              🌍 It's where your story begins.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="fade-in" style={{ animationDelay: '1.2s' }}>
            <a 
              href="/contact" 
              className="btn-gold inline-block px-8 py-4 rounded-full text-lg font-semibold"
            >
              Start Your Story
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
