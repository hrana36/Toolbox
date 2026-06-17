'use client';

import { createContext, useContext, useState, useEffect } from 'react';

// Define the shape of our translation object
type Translation = {
  [key: string]: any;
};

type I18nContextType = {
  lang: 'en' | 'bn';
  t: (key: string) => string;
  toggleLang: () => void;
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<'en' | 'bn'>('en');
  const [translations, setTranslations] = useState<Translation>({});

  // Load language from localStorage on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('i18n_lang');
      if (saved === 'en' || saved === 'bn') {
        setLang(saved as 'en' | 'bn');
      }
    }
  }, []);

  // Load translations when language changes
  useEffect(() => {
    const loadTranslation = async () => {
      try {
        const module = await import(`./${lang}.json`);
        setTranslations(module.default);
      } catch (error) {
        console.error(`Failed to load translation for language: ${lang}`, error);
        // Fallback to English if Bengali fails and vice versa
        if (lang === 'bn') {
          import('./en.json').then((module) => {
            setTranslations(module.default);
            setLang('en');
          });
        }
      }
    };

    loadTranslation();
  }, [lang]);

  // Save language to localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('i18n_lang', lang);
    }
  }, [lang]);

  // Translation function
  const t = (key: string): string => {
    const keys = key.split('.');
    let result = translations;
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        // @ts-ignore
        result = result[k];
      } else {
        // If key not found, return the key itself as fallback
        return key;
      }
    }
    return typeof result === 'string' ? result : key;
  };

  const toggleLang = () => {
    setLang((prevLang) => (prevLang === 'en' ? 'bn' : 'en'));
  };

  return (
    <I18nContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
};