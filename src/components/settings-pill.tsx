"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useTheme } from "next-themes";
import { LanguageToggle } from "@/components/ui/language-toggle";

// What the pill showed on the previous page, so it only animates when its contents actually change.
let previousExtra: ReactNode = null;

/** Floating controls for small screens, shared by every page. Phones follow the system theme. */
export function SettingsPill({ children }: { children?: ReactNode }) {
  const { theme, setTheme } = useTheme();
  const [motion] = useState(() => (children && !previousExtra ? "reveal" : !children && previousExtra ? "collapse" : null));
  const [leaving, setLeaving] = useState<ReactNode>(() => (motion === "collapse" ? previousExtra : null));

  useEffect(() => {
    previousExtra = children ?? null;
  }, [children]);

  useEffect(() => {
    // Drop any theme saved from a manual toggle so phones always match the device setting.
    if (theme && theme !== "system" && matchMedia("(max-width: 767px)").matches) setTheme("system");
  }, [theme, setTheme]);

  const extra = children ?? leaving;

  return (
    <div className="floating-surface fixed top-5 right-5 z-50 flex items-center rounded-full border border-border bg-background/85 p-1 shadow-sm backdrop-blur-md [view-transition-name:site-settings] md:hidden">
      {extra && (
        <div
          className={motion === "reveal" ? "pill-reveal" : motion === "collapse" ? "pill-collapse" : "pill-extra"}
          inert={!children}
          onAnimationEnd={(event) => { if (!children && event.target === event.currentTarget) setLeaving(null); }}
        >
          <div>{extra}<div aria-hidden="true" className="mx-1 h-5 w-px shrink-0 bg-border" /></div>
        </div>
      )}
      <LanguageToggle />
    </div>
  );
}
