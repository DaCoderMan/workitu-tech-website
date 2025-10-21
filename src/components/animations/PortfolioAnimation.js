'use client';

export default function PortfolioAnimation() {
  return (
    <div className="portfolio-animation">
      <div className="absolute inset-0">
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
            {[...Array(96)].map((_, i) => (
              <div
                key={i}
                className="border border-gold-400/10"
                style={{
                  animationDelay: `${(i % 12) * 0.1}s`,
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-1/3 left-1/6 w-4 h-4 border border-gold-400/20 rotate-45 animate-spin-slow" />
        <div className="absolute top-2/3 right-1/6 w-6 h-6 border border-gold-500/15 rounded-full animate-bounce-slow" />
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-gold-400/10 rounded-full animate-pulse-slow" />
      </div>
    </div>
  );
}
