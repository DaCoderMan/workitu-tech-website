'use client';

import { useLanguage } from '../lib/useLanguage';
import { useState, useRef, useEffect } from 'react';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'he', name: 'עברית', flag: '🇮🇱' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' }
  ];

  const currentLang = languages.find(lang => lang.code === language);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium text-gold-300 hover:text-gold-400 hover:bg-gold-400/10 transition-colors border border-gold-500/30"
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <span className="text-base">{currentLang.flag}</span>
        <span>{currentLang.name}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-black/95 border border-gold-500/30 rounded-md shadow-lg overflow-hidden z-50 min-w-[140px] backdrop-blur-sm">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors ${
                language === lang.code
                  ? 'bg-gold-500/20 text-gold-400'
                  : 'text-gold-300 hover:bg-gold-500/10 hover:text-gold-400'
              }`}
            >
              <span className="text-base">{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
