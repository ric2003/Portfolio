"use client";

import { useTranslation } from "react-i18next";
import { projects } from "@/lib/projects";
import { ExternalLinkButton } from "@/components/external-link-button";

export function RacingDemo() {
  const { t } = useTranslation();
  const url = projects.find((project) => project.slug === "racing-game")!.viewProject;

  return (
    <div className="mt-4 hidden flex-wrap items-center gap-3 lg:flex">
      <ExternalLinkButton href={url!}>{t("projects.try_game")}</ExternalLinkButton>
      <span className="hidden text-xs text-muted-foreground lg:inline">{t("projects.desktop_only")}</span>
    </div>
  );
}
