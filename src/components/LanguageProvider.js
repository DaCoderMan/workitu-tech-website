'use client';

import { useEffect } from 'react';
import { useLanguage } from '../lib/useLanguage';

export default function LanguageProvider({ children }) {
  const { language } = useLanguage();

  useEffect(() => {
    // Update document direction and language on mount and language change
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
  }, [language]);

  return <>{children}</>;
}
