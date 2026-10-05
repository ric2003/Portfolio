"use client";

import { I18nextProvider } from "react-i18next";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import i18n from "@/i18n";

interface I18nProviderClientProps {
  children: React.ReactNode;
}

export default function I18nProviderClient({
  children,
}: I18nProviderClientProps) {
  const params = useParams();

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
          console.log('Error getting stored language', e);
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

    };

    initializeLanguage();
  }, [params.locale]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}