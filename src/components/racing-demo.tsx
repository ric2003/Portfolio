import { projects } from "@/lib/projects";
import { ExternalLinkButton } from "@/components/external-link-button";

export function RacingDemo({ language }: { language: "en" | "pt" }) {
  const pt = language === "pt";
  const url = projects.find((project) => project.slug === "racing-game")!.viewProject;

  return (
    <div className="mt-4 hidden flex-wrap items-center gap-3 lg:flex">
      <ExternalLinkButton language={language} href={url!}>{pt ? "Experimentar jogo" : "Try game"}</ExternalLinkButton>
      <span className="hidden text-xs text-muted-foreground lg:inline">{pt ? "Só funciona no computador" : "Only works on computer"}</span>
    </div>
  );
}
