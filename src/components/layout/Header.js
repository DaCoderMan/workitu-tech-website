'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSafeT } from '../../lib/useLanguage';
import LanguageToggle from '../LanguageToggle';

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(query);
    setMatches(m.matches);
    const listener = () => setMatches(m.matches);
    m.addEventListener('change', listener);
    return () => m.removeEventListener('change', listener);
  }, [query]);
  return matches;
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const t = useSafeT();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const navigation = [
    { key: 'home', href: '/' },
    { key: 'about', href: '/about' },
    { key: 'services', href: '/services' },
    { key: 'portfolio', href: '/portfolio' },
    { key: 'pricing', href: '/pricing' },
    { key: 'contact', href: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse group">
            <span className="text-gold-400 font-black text-xl tracking-wide group-hover:text-gold-300 transition-colors">
              Workitu Tech
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
            {navigation.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'text-gold-400 bg-gold-400/10'
                    : 'text-gold-300 hover:text-gold-400 hover:bg-gold-400/5'
                }`}
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
            <Link
              href="/pay"
              className="px-4 py-2 bg-gradient-to-r from-gold-400 to-gold-600 text-black font-semibold rounded-lg hover:from-gold-500 hover:to-gold-700 transition-all"
            >
              💳 Pay Now
            </Link>
            <div aria-hidden={!isDesktop}>
              <LanguageToggle />
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2 rtl:space-x-reverse" aria-hidden={isDesktop}>
            <LanguageToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gold-400 hover:text-gold-300 hover:bg-gold-400/10"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gold-500/20">
              {navigation.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    pathname === item.href
                      ? 'text-gold-400 bg-gold-400/10'
                      : 'text-gold-300 hover:text-gold-400 hover:bg-gold-400/5'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(`nav.${item.key}`)}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
