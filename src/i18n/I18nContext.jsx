/* eslint-disable react-refresh/only-export-components -- paired Provider + hook */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { DEFAULT_LOCALE, STORAGE_KEY, messages } from "./messages.js";

/** @typedef {import("./messages").Locale} Locale */

/** @type {import("react").Context<{ locale: Locale; setLocale: (l: Locale) => void; t: (key: string, vars?: Record<string, string | number>) => string } | null>} */
const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [locale, setLocaleState] = useState(() => {
    if (typeof window === "undefined") return DEFAULT_LOCALE;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "ru" || stored === "zh" ? stored : DEFAULT_LOCALE;
  });

  useEffect(() => {
    document.documentElement.lang = locale === "ru" ? "ru" : "zh-Hans";
    window.localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  const setLocale = useCallback((next) => {
    setLocaleState(next === "ru" ? "ru" : "zh");
  }, []);

  const t = useCallback(
    (key, vars) => {
      const table = messages[locale] ?? messages.zh;
      let str = table[key] ?? messages.zh[key] ?? key;
      if (vars && typeof str === "string") {
        for (const [k, v] of Object.entries(vars)) {
          const token = `{{${k}}}`;
          str = str.split(token).join(String(v));
        }
      }
      return str;
    },
    [locale]
  );

  const value = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t]
  );

  return (
    <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return ctx;
}
