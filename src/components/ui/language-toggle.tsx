"use client";

import { useTranslation } from "react-i18next";

const FlagSVG = ({ locale }: { locale: "en" | "pt" }) => {
  if (locale === "pt") {
    return (
      <svg
        width="32"
        height="20"
        viewBox="1 0 32 20"
        className="rounded-sm border border-gray-300"
      >
        <rect width="32" height="20" fill="#046A38" />
        <rect x="14.933" width="20" height="20" fill="#DA020E" />
        <circle
          cx="14"
          cy="10"
          r="4"
          fill="#FFDD00"
          stroke="#046A38"
          strokeWidth="0"
        />
      </svg>
    );
  }else if (locale === "en") {
  return (
    <svg
      width="32"
      height="20"
      viewBox="0.5 0 32 20"
      className="rounded-sm border border-gray-300"
    >
      <rect width="34" height="20" fill="#012169" />
      <path d="M0 0l34 20M34 0L0 20" stroke="#fff" strokeWidth="2.5" />
      <path d="M0 0l34 20M34 0L0 20" stroke="#C8102E" strokeWidth="1.25" />
      <path d="M16 0v20M0 10h34" stroke="#fff" strokeWidth="5" />
      <path d="M16 0v20M0 10h34" stroke="#C8102E" strokeWidth="2.5" />
    </svg>
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
        <span className="absolute -right-1 -top-1 bg-[#007AFF] p-0.5 border border-black font-bold rounded-full text-[0.5rem] whitespace-nowrap">
          {currentLocale.toUpperCase()}
        </span>
        <FlagSVG locale={currentLocale} />
      </div>
      <p className="text-xs font-medium whitespace-nowrap pt-0.5">
        {t("language_label")}
      </p>
    </div>
  );
}