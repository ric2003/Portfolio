import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

export function ExternalLinkButton({ href, language, children }: { href: string; language: "en" | "pt"; children: ReactNode }) {
  return (
    <a data-card-action href={href} target="_blank" rel="noopener noreferrer" className="relative z-20 inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-background px-4 text-sm font-medium hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
      {children}<span className="sr-only">{language === "pt" ? " (abre num novo separador)" : " (opens in a new tab)"}</span><ArrowUpRight aria-hidden="true" size={16} />
    </a>
  );
}
