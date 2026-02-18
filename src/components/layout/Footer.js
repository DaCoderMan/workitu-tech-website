'use client';

import Link from 'next/link';
import { useSafeT } from '../../lib/useLanguage';

export default function Footer() {
  const t = useSafeT();

  return (
    <footer className="bg-black/90 border-t border-gold-500/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="w-8 h-8 bg-gradient-to-r from-gold-400 to-gold-600 rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-lg">W</span>
              </div>
              <span className="text-gold-400 font-bold text-xl">Workitu Tech</span>
            </div>
            <p className="text-gold-300 text-sm">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-gold-400 font-semibold">{t('footer.quickLinks')}</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-gold-300 hover:text-gold-400 text-sm transition-colors">
                {t('nav.home')}
              </Link>
              <Link href="/about" className="block text-gold-300 hover:text-gold-400 text-sm transition-colors">
                {t('nav.about')}
              </Link>
              <Link href="/services" className="block text-gold-300 hover:text-gold-400 text-sm transition-colors">
                {t('nav.services')}
              </Link>
              <Link href="/portfolio" className="block text-gold-300 hover:text-gold-400 text-sm transition-colors">
                {t('nav.portfolio')}
              </Link>
              <Link href="/pricing" className="block text-gold-300 hover:text-gold-400 text-sm transition-colors">
                {t('nav.pricing')}
              </Link>
              <Link href="/contact" className="block text-gold-300 hover:text-gold-400 text-sm transition-colors">
                {t('nav.contact')}
              </Link>
              <Link href="/legal" className="block text-gold-300 hover:text-gold-400 text-sm transition-colors">
                Legal & Privacy
              </Link>
            </div>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h3 className="text-gold-400 font-semibold">{t('footer.connect')}</h3>
            <div className="space-y-2">
              <a
                href="mailto:contact@workitu.com"
                className="block text-gold-300 hover:text-gold-400 text-sm transition-colors"
              >
                📧 contact@workitu.com
              </a>

              {/* Social Media Links */}
              <div className="flex flex-wrap gap-3 mt-3">
                {process.env.NEXT_PUBLIC_LINKEDIN_URL && (
                  <a
                    href={process.env.NEXT_PUBLIC_LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-300 hover:text-gold-400 transition-colors"
                    aria-label="LinkedIn"
                    title="LinkedIn"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                )}

                {process.env.NEXT_PUBLIC_GITHUB_URL && (
                  <a
                    href={process.env.NEXT_PUBLIC_GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-300 hover:text-gold-400 transition-colors"
                    aria-label="GitHub"
                    title="GitHub"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                )}

                {process.env.NEXT_PUBLIC_TWITTER_URL && (
                  <a
                    href={process.env.NEXT_PUBLIC_TWITTER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-300 hover:text-gold-400 transition-colors"
                    aria-label="Twitter/X"
                    title="Twitter/X"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                )}

                {process.env.NEXT_PUBLIC_YOUTUBE_URL && (
                  <a
                    href={process.env.NEXT_PUBLIC_YOUTUBE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-300 hover:text-gold-400 transition-colors"
                    aria-label="YouTube"
                    title="YouTube"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                    </svg>
                  </a>
                )}

                {process.env.NEXT_PUBLIC_INSTAGRAM_URL && (
                  <a
                    href={process.env.NEXT_PUBLIC_INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-300 hover:text-gold-400 transition-colors"
                    aria-label="Instagram"
                    title="Instagram"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                )}

                {process.env.NEXT_PUBLIC_FACEBOOK_URL && (
                  <a
                    href={process.env.NEXT_PUBLIC_FACEBOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-300 hover:text-gold-400 transition-colors"
                    aria-label="Facebook"
                    title="Facebook"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gold-500/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gold-300 text-sm">
            {t('footer.copyright').replace('{year}', new Date().getFullYear())}
          </p>
        </div>
      </div>
    </footer>
  );
}
