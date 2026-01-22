'use client';

import Link from 'next/link';
import { useLanguage } from '../../lib/useLanguage';

export default function Footer() {
  const { t } = useLanguage();

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
              <Link href="/portfolio" className="block text-gold-300 hover:text-gold-400 text-sm transition-colors">
                {t('nav.portfolio')}
              </Link>
              <Link href="/pricing" className="block text-gold-300 hover:text-gold-400 text-sm transition-colors">
                {t('nav.pricing')}
              </Link>
              <Link href="/contact" className="block text-gold-300 hover:text-gold-400 text-sm transition-colors">
                {t('nav.contact')}
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
                contact@workitu.com
              </a>
              <a
                href="https://www.linkedin.com/in/jonsamper"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gold-300 hover:text-gold-400 text-sm transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gold-500/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gold-300 text-sm">
            {t('footer.copyright')}
          </p>
          <div className="flex items-center space-x-4 rtl:space-x-reverse mt-4 md:mt-0">
            <Link
              href="/admin"
              className="admin-link text-xs"
            >
              {t('footer.admin')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
