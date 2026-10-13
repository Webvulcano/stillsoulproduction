"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { dict } from "./dict";

const LanguageContext = createContext(null);
const STORAGE_KEY = "ssp_lang";

// `dicts` = the dictionary with CMS texts ({ hu, en }) from the root layout;
// the bundled dict.js is only the fallback.
export function LanguageProvider({ children, dicts = dict }) {
  const [locale, setLocale] = useState("hu");

  // mentett nyelv visszatöltése (kliensen)
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "hu" || saved === "en") setLocale(saved);
  }, []);

  // <html lang> frissítés + perzisztencia
  useEffect(() => {
    document.documentElement.lang = locale;
    try {
      localStorage.setItem(STORAGE_KEY, locale);
    } catch {}
  }, [locale]);

  const value = { locale, setLocale, t: dicts[locale] ?? dicts.hu };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
