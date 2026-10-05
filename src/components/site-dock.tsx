import type { ReactNode } from "react";
import { Dock } from "@/components/magicui/dock";

/** Floating desktop navigation shared by the homepage and case studies. */
export function SiteDock({ children }: { children: ReactNode }) {
  return (
    <div className="fixed bottom-6 left-1/2 z-50 hidden -translate-x-1/2 [view-transition-name:site-dock] md:block">
      <Dock className="floating-surface h-14 rounded-full border border-border bg-background/80 px-3 shadow-lg backdrop-blur-md">
        {children}
      </Dock>
    </div>
  );
}
