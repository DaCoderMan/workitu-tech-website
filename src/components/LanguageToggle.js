'use client';

import { useLanguage } from '../lib/useLanguage';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'he' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium text-gold-300 hover:text-gold-400 hover:bg-gold-400/10 transition-colors border border-gold-500/30"
      aria-label={language === 'en' ? 'Switch to Hebrew' : 'Switch to English'}
    >
      <span className="text-base">
        {language === 'en' ? '🇮🇱' : '🇺🇸'}
      </span>
      <span>
        {language === 'en' ? 'עברית' : 'English'}
      </span>
    </button>
  );
}
