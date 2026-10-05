import en from "@/locales/en/translation";
import pt from "@/locales/pt/translation";
import type { Project } from "./projects";

export function getProjectStudy(project: Project, language: "en" | "pt") {
  const translations = language === "pt" ? pt : en;
  return translations.projects.items[project.slug as keyof typeof translations.projects.items];
}
