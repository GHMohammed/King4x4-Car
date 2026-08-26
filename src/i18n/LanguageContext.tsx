import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Lang, translations } from './translations';
import { Product, Category, Vehicle } from '../types';
import { formatAmount, setCurrencyLang } from '../lib/currency';

const STORAGE_KEY = 'king4x4_lang';

interface LanguageContextValue {
  lang: Lang;
  dir: 'rtl' | 'ltr';
  setLang: (lang: Lang) => void;
  toggle: () => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
  /** تنسيق السعر مع رمز العملة حسب اللغة الحالية */
  price: (amount: number) => string;
}

function loadLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'ar' || stored === 'en') return stored;
  } catch {
    /* ignore */
  }
  return 'ar';
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Lang>(loadLang);
  const dir: 'rtl' | 'ltr' = lang === 'ar' ? 'rtl' : 'ltr';

  // Keep the currency symbol used by formatPrice() in sync (synchronously, before children render)
  setCurrencyLang(lang);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('lang', lang);
    root.setAttribute('dir', dir);
    document.title =
      lang === 'en'
        ? 'KING 4x4 | Off-road & adventure outfitting'
        : 'KING 4x4 | متجر وتجهيزات سيارات الدفع الرباعي والمغامرة';
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang, dir]);

  const setLang = useCallback((next: Lang) => setLangState(next), []);
  const toggle = useCallback(() => setLangState((l) => (l === 'ar' ? 'en' : 'ar')), []);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      let str = translations[lang][key] ?? translations.ar[key] ?? key;
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
        }
      }
      return str;
    },
    [lang],
  );

  const price = useCallback(
    (amount: number) => `${formatAmount(amount)} ${lang === 'en' ? 'KWD' : 'د.ك'}`,
    [lang],
  );

  const value: LanguageContextValue = { lang, dir, setLang, toggle, t, price };
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage يجب أن يُستخدم داخل <LanguageProvider>');
  return ctx;
}

/* ---- تعريب أسماء الكيانات (تعتمد على الحقول ثنائية اللغة في النماذج) ---- */
export function productName(p: Product, lang: Lang): string {
  return lang === 'en' ? p.name : p.arabicName;
}
export function categoryName(c: Category, lang: Lang): string {
  return lang === 'en' ? c.name : c.nameAr;
}
export function vehicleName(v: Vehicle, lang: Lang): string {
  return lang === 'en' ? v.name : v.arabicName;
}
