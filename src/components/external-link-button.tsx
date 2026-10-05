"use client";

import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

export function ExternalLinkButton({ href, children }: { href: string; children: ReactNode }) {
  const { t } = useTranslation();
  return (
    <a data-card-action href={href} target="_blank" rel="noopener noreferrer" className="relative z-20 inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-background px-4 text-sm font-medium hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
      {children}<span className="sr-only">{t("opens_in_new_tab")}</span><ArrowUpRight aria-hidden="true" size={16} />
    </a>
  );
}
