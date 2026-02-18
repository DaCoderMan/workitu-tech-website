'use client';

export default function WLogoBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
      <svg
        className="w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] animate-w-pulse"
        viewBox="0 0 200 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="wGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
        </defs>
        {/* Geometric stylized W — sharp angles with tapered strokes */}
        <path
          d="M16 20 L46 160 L76 70 L100 130 L124 70 L154 160 L184 20 L164 20 L144 130 L124 50 L100 110 L76 50 L56 130 L36 20 Z"
          fill="url(#wGrad)"
          fillRule="evenodd"
        />
      </svg>
    </div>
  );
}
