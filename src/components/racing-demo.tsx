"use client";

import { useState } from "react";
import { ArrowUpRight, Gamepad2, X } from "lucide-react";

const url = "https://racing-game-sooty-eta.vercel.app/";

export function RacingDemo({ language }: { language: "en" | "pt" }) {
  const [open, setOpen] = useState(false);
  const pt = language === "pt";
  return (
    <div className="mt-5">
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" aria-expanded={open} aria-controls="racing-live-demo" onClick={() => setOpen(!open)} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-background px-4 text-sm font-medium hover:bg-muted">
          {open ? <X size={16} /> : <Gamepad2 size={16} />}{open ? (pt ? "Fechar demo" : "Close demo") : (pt ? "Experimentar demo" : "Try live demo")}
        </button>
        <span className="text-xs text-muted-foreground">{pt ? "Para jogar, usa um computador com teclado." : "To race, use a computer with a keyboard."}</span>
      </div>
      <div id="racing-live-demo">
        {open && <div className="mt-4 overflow-hidden rounded-xl border border-border bg-background">
          <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-3 text-xs text-muted-foreground">
            <span>Neon Apex</span>
            <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-foreground">{pt ? "Abrir num separador" : "Open in new tab"}<ArrowUpRight size={14} /></a>
          </div>
          <iframe src={url} title={pt ? "Demo interativa de Racing Game" : "Racing Game interactive demo"} className="h-[520px] w-full bg-zinc-950 sm:h-[600px]" allow="fullscreen" allowFullScreen />
        </div>}
      </div>
    </div>
  );
}
