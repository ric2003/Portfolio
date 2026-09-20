import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import your translation files
// (TS modules instead of raw JSON — Turbopack HMR can't hot-update JSON modules)
import enTranslations from "@/locales/en/translation";
import ptTranslations from "@/locales/pt/translation";

const resources = {
  en: {
    translation: enTranslations,
  },
  pt: {
    translation: ptTranslations,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Default language, will be overridden by provider
  fallbackLng: "en",
  debug: process.env.NODE_ENV === "development",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
