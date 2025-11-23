"use client";

import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

export function LanguageToggle() {
  const { i18n } = useTranslation();

  const currentLocale = i18n.language as "en" | "pt";
  const nextLocale = currentLocale === "en" ? "pt" : "en";

  const handleToggleLanguage = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('i18nextLng', nextLocale);
      document.cookie = `i18next=${nextLocale}; path=/; max-age=31536000`;
    }
    i18n.changeLanguage(nextLocale);
  };

  return (
    <div
      className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
      onClick={handleToggleLanguage}
    >
      <div className="relative flex items-center justify-center w-5 h-5">
        <Globe className="w-5 h-5" />
        <span className="absolute -bottom-1 -right-1 flex h-3 w-4 items-center justify-center rounded-sm bg-primary text-[0.5rem] font-bold text-primary-foreground ring-1 ring-background">
          {currentLocale.toUpperCase()}
        </span>
      </div>
    </div>
  );
}