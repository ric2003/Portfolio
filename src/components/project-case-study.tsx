"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Github, Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { getProjectStudy, studyLabels } from "@/lib/project-studies";
import { RacingDemo } from "@/components/racing-demo";
import type { Project } from "@/lib/projects";

export function ProjectCaseStudy({ project, nextProject }: { project: Project; nextProject: Project }) {
  const { i18n, t } = useTranslation();
  const language = i18n.language.startsWith("pt") ? "pt" : "en";
  const copy = getProjectStudy(project, language);
  const labels = studyLabels[language];
  const { resolvedTheme, setTheme } = useTheme();
  const screenshots = typeof project.image === "string"
    ? [{ src: project.image, caption: labels.screen }]
    : [{ src: project.image.light, caption: labels.light }, { src: project.image.dark, caption: labels.dark }];

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-blue-500/30">
      <div className="mx-auto max-w-5xl px-6 py-8 sm:py-12">
        <nav aria-label={t("navigation.label")} className="mb-16 flex items-center justify-between gap-4">
          <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft size={16} />{labels.back}</Link>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <button type="button" aria-label={t("theme.toggle")} onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground">
              <Sun size={20} className="dark:hidden" /><Moon size={20} className="hidden dark:block" />
            </button>
          </div>
        </nav>
        <article>
          <header className="mb-10 max-w-3xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">{labels.study}</p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">{copy.title}</h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{copy.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {project.viewProject && <a href={project.viewProject} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background">{labels.live}<ArrowUpRight size={16} /></a>}
              {project.sourceCode && <a href={project.sourceCode} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium hover:bg-muted"><Github size={16} />{labels.source}</a>}
            </div>
            {project.collaboratorRepository && <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{labels.collaboration}</p>}
          </header>
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-muted/50 sm:aspect-video">
            {typeof project.image === "string" ? <Image src={project.image} alt={copy.title} fill priority sizes="(max-width: 1024px) 100vw, 976px" className="object-contain p-4 sm:p-8" /> : <>
              <Image src={project.image.light} alt={copy.title} fill priority sizes="(max-width: 1024px) 100vw, 976px" className="object-contain p-4 sm:p-8 dark:hidden" />
              <Image src={project.image.dark} alt={copy.title} fill priority sizes="(max-width: 1024px) 100vw, 976px" className="hidden object-contain p-4 sm:p-8 dark:block" />
            </>}
          </div>
          {project.slug === "racing-game" && <RacingDemo language={language} />}
          <div className="my-14 grid gap-10 border-b border-border pb-14 md:grid-cols-[1fr_2fr] md:gap-16">
            <dl className="space-y-8">
              <div><dt className="mb-3 text-sm text-muted-foreground">{labels.role}</dt><dd className="font-medium">{copy.role}</dd></div>
              <div><dt className="mb-3 text-sm text-muted-foreground">{labels.stack}</dt><dd className="flex flex-wrap gap-2">{project.tech.map((tech) => <span key={tech} className="rounded-md border border-border bg-muted/50 px-3 py-1 text-xs">{tech}</span>)}</dd></div>
            </dl>
            <div className="space-y-8">
              <section><h2 className="mb-3 text-xl font-semibold">{labels.challenge}</h2><p className="leading-relaxed text-muted-foreground">{copy.challenge}</p></section>
              <section><h2 className="mb-3 text-xl font-semibold">{labels.approach}</h2><p className="leading-relaxed text-muted-foreground">{copy.approach}</p></section>
            </div>
          </div>
          <section aria-labelledby="screenshots-title">
            <h2 id="screenshots-title" className="mb-6 text-2xl font-semibold">{labels.gallery}</h2>
            <div className={`grid gap-6 ${screenshots.length > 1 ? "sm:grid-cols-2" : ""}`}>
              {screenshots.map(({ src, caption }) => <figure key={src}>
                <a href={src} target="_blank" rel="noopener noreferrer" aria-label={`${labels.full}: ${copy.title}, ${caption}`} className="group relative block aspect-[4/3] overflow-hidden rounded-xl border border-border bg-muted/50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
                  <Image src={src} alt={`${copy.title}: ${caption}`} fill sizes="(max-width: 640px) 100vw, 960px" className="object-contain p-4 transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transform-none" />
                  <ArrowUpRight size={16} className="absolute right-3 top-3 text-muted-foreground" />
                </a>
                <figcaption className="mt-3 text-sm text-muted-foreground">{caption}</figcaption>
              </figure>)}
            </div>
          </section>
        </article>
        <footer className="mt-16 border-t border-border pt-8">
          <Link href={`/projects/${nextProject.slug}`} className="group flex items-center justify-between gap-4 rounded-xl p-4 hover:bg-muted/50">
            <div><p className="mb-2 text-sm text-muted-foreground">{labels.next}</p><p className="text-2xl font-semibold">{getProjectStudy(nextProject, language).title}</p></div>
            <ArrowUpRight className="shrink-0" />
          </Link>
        </footer>
      </div>
    </main>
  );
}
