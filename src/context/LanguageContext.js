"use client";

import { createContext, useContext, useState, useEffect } from "react";
import en from "../data/en.json";
import id from "../data/id.json";
import fr from "../data/fr.json";
import de from "../data/de.json";
import zh from "../data/zh.json";
import ko from "../data/ko.json";
import ja from "../data/ja.json";

const translations = { en, id, fr, de, zh, ko, ja };

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("certify-language");
    if (savedLang && translations[savedLang]) {
      setLanguage(savedLang);
    }
    setIsLoaded(true);
  }, []);

  const changeLanguage = (langCode) => {
    if (translations[langCode]) {
      setLanguage(langCode);
      localStorage.setItem("certify-language", langCode);
    }
  };

  const t = (key) => {
    const keys = key.split(".");
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}