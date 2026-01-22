'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { translations } from './translations';

export const useLanguage = create(
  persist(
    (set, get) => ({
      language: 'en',

      setLanguage: (lang) => {
        set({ language: lang });
        // Update document direction for RTL support
        if (typeof document !== 'undefined') {
          document.documentElement.lang = lang;
          document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
        }
      },

      // Translation function - gets nested keys like 'nav.home'
      t: (key) => {
        const lang = get().language;
        const keys = key.split('.');
        let result = translations[lang];

        for (const k of keys) {
          if (result && typeof result === 'object') {
            result = result[k];
          } else {
            return key; // Return key if translation not found
          }
        }

        return result || key;
      },

      // Check if current language is RTL
      isRTL: () => get().language === 'he',

      // Get current language
      getLanguage: () => get().language
    }),
    {
      name: 'workitu-language',
      // Only persist the language setting
      partialize: (state) => ({ language: state.language })
    }
  )
);

// Hook to initialize language direction on mount
export function useLanguageInit() {
  const { language } = useLanguage();

  if (typeof window !== 'undefined') {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
  }

  return language;
}
