'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, type Lang } from './i18n';

// Accept both EN and AR translation objects — they share the same shape
type AnyTranslation = typeof translations.en | typeof translations.ar;

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: AnyTranslation;
  isAr: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'ar',
  setLang: () => {},
  t: translations.ar,
  isAr: true,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ar');

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== 'undefined') {
      localStorage.setItem('stayhub-lang', l);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('stayhub-lang') as Lang | null;
    // Default is Arabic; only override if user has an explicit saved preference
    if (saved === 'ar' || saved === 'en') setLangState(saved);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const t = translations[lang];
  const isAr = lang === 'ar';

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isAr }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
