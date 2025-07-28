"use client";

import { useTranslation } from "react-i18next";
import Image from "next/image";

const FlagSVG = ({ locale }: { locale: "en" | "pt" }) => {
  if (locale === "pt") {
    return (
      <Image 
        src="/pt-flag.svg" 
        alt="Portuguese Flag" 
        width={22} 
        height={22}
        priority
      />
    );
  } else if (locale === "en") {
    return (
      <Image 
        src="/uk-flag.svg" 
        alt="English Flag" 
        width={22} 
        height={22}
        priority
      />
    );
  }
  return null;
};

export function LanguageToggle() {
  const { t, i18n } = useTranslation();

  const currentLocale = i18n.language as "en" | "pt";
  const nextLocale = currentLocale === "en" ? "pt" : "en";

  const handleToggleLanguage = () => {
    if (typeof window !== 'undefined') {
      // Store in localStorage immediately
      localStorage.setItem('i18nextLng', nextLocale);
      // Store in cookie (expires in 1 year)
      document.cookie = `i18next=${nextLocale}; path=/; max-age=31536000`;
    }
    // Change language without reload
    i18n.changeLanguage(nextLocale);
  };

  return (
    <div
      className="flex flex-col items-center justify-center gap-1 px-2 py-1 cursor-pointer"
      onClick={handleToggleLanguage}
    >
      <div className="relative text-2xl">
        <span className="absolute -right-2 -top-1 bg-[#007AFF] p-0.5 border border-zinc-950 font-bold rounded-full text-[0.5rem] whitespace-nowrap">
          {currentLocale.toUpperCase()}
        </span>
        <FlagSVG locale={currentLocale} />
      </div>
      <p className="text-xs font-medium whitespace-nowrap text-zinc-700 dark:text-zinc-300">
        {t("language_label")}
      </p>
    </div>
  );
}