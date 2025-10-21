'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black/90 border-t border-gold-500/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-gold-400 to-gold-600 rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-lg">W</span>
              </div>
              <span className="text-gold-400 font-bold text-xl">Workitu Tech</span>
            </div>
            <p className="text-gold-300 text-sm">
              Where Imagination Meets Innovation. Creating digital experiences that inspire and perform.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-gold-400 font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-gold-300 hover:text-gold-400 text-sm transition-colors">
                Home
              </Link>
              <Link href="/portfolio" className="block text-gold-300 hover:text-gold-400 text-sm transition-colors">
                Portfolio
              </Link>
              <Link href="/pricing" className="block text-gold-300 hover:text-gold-400 text-sm transition-colors">
                Pricing
              </Link>
              <Link href="/contact" className="block text-gold-300 hover:text-gold-400 text-sm transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h3 className="text-gold-400 font-semibold">Connect</h3>
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
            © 2024 Workitu Tech. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Link 
              href="/admin" 
              className="admin-link text-xs"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
