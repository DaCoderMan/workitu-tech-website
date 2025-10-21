'use client';

export default function PricingAnimation() {
  return (
    <div className="pricing-animation">
      <div className="absolute inset-0">
        {/* Geometric shapes */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-gold-400/20 rounded-full animate-pulse-slow" />
        <div className="absolute top-3/4 right-1/4 w-24 h-24 border border-gold-500/15 transform rotate-45 animate-spin-slow" />
        <div className="absolute bottom-1/3 left-1/2 w-16 h-16 bg-gold-400/5 rounded-full animate-bounce-slow" />
        
        {/* Floating lines */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-400/20 to-transparent animate-pulse-slow" />
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-gold-500/15 to-transparent animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>
    </div>
  );
}
