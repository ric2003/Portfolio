"use client";

import { useState } from "react";

const FlagSVG = ({ language }: { language: "EN" | "PT" }) => {
    if (language === "EN") {
      return (
        <svg
          width="28"
          height="20"
          viewBox="0 0 24 16"
          className="rounded-sm border border-gray-300"
        >
          <rect width="28" height="20" fill="#012169" />
          <path d="M0 0l24 16M24 0L0 16" stroke="#fff" strokeWidth="2" />
          <path d="M0 0l24 16M24 0L0 16" stroke="#C8102E" strokeWidth="1" />
          <path d="M12 0v16M0 8h24" stroke="#fff" strokeWidth="4" />
          <path d="M12 0v16M0 8h24" stroke="#C8102E" strokeWidth="2" />
        </svg>
      );
    }
  
    return (
      <svg
        width="28"
        height="20"
        viewBox="0 0 24 16"
        className="rounded-sm border border-gray-300"
      >
        <rect width="11.2" height="20" fill="#046A38" />
        <rect x="11.2" width="12.8" height="20" fill="#DA020E" />
        <circle
          cx="9.6"
          cy="8"
          r="3"
          fill="#FFDD00"
          stroke="#046A38"
          strokeWidth="0.5"
        />
      </svg>
    );
  };

export function LanguageToggle({ language, setLanguage }: { language: 'EN' | 'PT', setLanguage: (lang: 'EN' | 'PT') => void }) {
  const nextLanguage = language === 'EN' ? 'PT' : 'EN';
  return (
    <div
      className="flex flex-col items-center justify-center gap-1 px-2 py-1 cursor-pointer transition-all duration-300"
      onClick={() => setLanguage(nextLanguage)}
      title={`Switch to ${nextLanguage}`}
    >
      <div className="transition-transform duration-300 hover:scale-110 text-2xl">
      {/* <span className="absolute right-0 text-xs font-medium whitespace-nowrap">{language}</span> */}
        <FlagSVG language={language} />
      </div>
      <p className="text-xs font-medium whitespace-nowrap">{language=="EN"?"Language":"Idioma"}</p>
    </div>
  );
} 