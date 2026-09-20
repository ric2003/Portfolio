import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/projects";

export function RacingDemo({ language }: { language: "en" | "pt" }) {
  const pt = language === "pt";
  const url = projects.find((project) => project.slug === "racing-game")!.viewProject;

  return (
    <div className="mt-4 flex flex-wrap items-center gap-3">
      <a data-card-action href={url} target="_blank" rel="noopener noreferrer" className="relative z-20 inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-background px-4 text-sm font-medium underline-offset-4 hover:bg-muted hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
        {pt ? "Experimentar jogo" : "Try game"}<ArrowUpRight aria-hidden="true" size={16} />
      </a>
      <span className="text-xs text-muted-foreground">{pt ? "Só funciona no computador" : "Only works on computer"}</span>
    </div>
  );
}
