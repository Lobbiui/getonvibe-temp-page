"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { dictionaries, languageLabels, type Language } from "@/lib/translations";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("onvibe-language");

    if (saved === "es" || saved === "ar" || saved === "en") {
      window.setTimeout(() => setLanguageState(saved), 0);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    window.localStorage.setItem("onvibe-language", language);
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage: setLanguageState,
      t: (key) => dictionaries[language][key] || dictionaries.en[key] || key,
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}

export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <label className="language-selector">
      <span>{t("language.label")}</span>
      <select
        value={language}
        onChange={(event) => setLanguage(event.target.value as Language)}
        aria-label={t("language.label")}
      >
        {(Object.keys(languageLabels) as Language[]).map((option) => (
          <option key={option} value={option}>
            {languageLabels[option]}
          </option>
        ))}
      </select>
    </label>
  );
}
