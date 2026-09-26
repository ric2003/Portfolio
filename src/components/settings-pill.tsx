"use client";

import { useEffect, type ReactNode } from "react";
import { useTheme } from "next-themes";
import { LanguageToggle } from "@/components/ui/language-toggle";

/** Floating controls for small screens, shared by every page. Phones follow the system theme. */
export function SettingsPill({ children }: { children?: ReactNode }) {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // Drop any theme saved from a manual toggle so phones always match the device setting.
    if (theme && theme !== "system" && matchMedia("(max-width: 767px)").matches) setTheme("system");
  }, [theme, setTheme]);

  return (
    <div className="floating-surface fixed top-5 right-5 z-50 flex items-center rounded-full border border-border bg-background/85 p-1 shadow-sm backdrop-blur-md [view-transition-name:site-settings] md:hidden">
      {children && <div className="pill-reveal">{children}<div aria-hidden="true" className="mx-1 h-5 w-px shrink-0 bg-border" /></div>}
      <LanguageToggle />
    </div>
  );
}
