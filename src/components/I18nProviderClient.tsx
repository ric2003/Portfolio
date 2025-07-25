"use client";

import { I18nextProvider } from "react-i18next";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import i18n from "@/i18n";

interface I18nProviderClientProps {
  children: React.ReactNode;
}

export default function I18nProviderClient({
  children,
}: I18nProviderClientProps) {
  const params = useParams();
  const [isI18nReady, setIsI18nReady] = useState(false);

  useEffect(() => {
    const initializeLanguage = async () => {
      // Get stored language preference
      let storedLanguage = 'en';
      
      if (typeof window !== 'undefined') {
        try {
          const stored = localStorage.getItem('i18nextLng');
          if (stored === 'pt' || stored === 'en') {
            storedLanguage = stored;
          } else {
            const cookieMatch = document.cookie.match(/i18next=([^;]+)/);
            if (cookieMatch && (cookieMatch[1] === 'pt' || cookieMatch[1] === 'en')) {
              storedLanguage = cookieMatch[1];
            } else {
              const browserLang = navigator.language.toLowerCase();
              if (browserLang.startsWith('pt')) {
                storedLanguage = 'pt';
              }
            }
          }
        } catch (e) {
          // If localStorage fails, stay with 'en'
        }
      }

      // Set language immediately if it's different from current
      if (i18n.language !== storedLanguage) {
        await i18n.changeLanguage(storedLanguage);
      }

      // Handle URL-based locale if present
      const currentLocale = params.locale;
      if (currentLocale && currentLocale !== i18n.language) {
        await i18n.changeLanguage(currentLocale as string);
      }

      setIsI18nReady(true);
    };

    initializeLanguage();
  }, [params.locale]);

  // Don't render children until language is properly set
  if (!isI18nReady) {
    return <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-gray-50 dark:from-zinc-950 dark:to-gray-950"></div>;
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}