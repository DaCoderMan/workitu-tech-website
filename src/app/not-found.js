'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-gold-400 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gold-400/20">404</h1>
          <h2 className="text-3xl md:text-4xl font-bold text-gold-300 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gold-400/70 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link 
            href="/" 
            className="btn-gold inline-block px-8 py-3 rounded-full font-semibold"
          >
            Go Home
          </Link>
          <div className="text-sm text-gold-400/50">
            Or try one of these links:
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/portfolio" className="text-gold-400 hover:text-gold-300 transition-colors">
              Portfolio
            </Link>
            <Link href="/pricing" className="text-gold-400 hover:text-gold-300 transition-colors">
              Pricing
            </Link>
            <Link href="/contact" className="text-gold-400 hover:text-gold-300 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
