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
    const currentLocale = params.locale;
    if (currentLocale && currentLocale !== i18n.language) {
      i18n.changeLanguage(currentLocale as string);
    }
  }, [params.locale]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}