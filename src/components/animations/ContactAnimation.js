'use client';

export default function ContactAnimation() {
  return (
    <div className="contact-animation">
      <div className="absolute inset-0">
        {/* Wave patterns */}
        <div className="absolute top-1/4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-400/10 to-transparent animate-pulse-slow" />
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500/8 to-transparent animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-3/4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-600/6 to-transparent animate-pulse-slow" style={{ animationDelay: '2s' }} />
        
        {/* Floating dots */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gold-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 12}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
