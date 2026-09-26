"use client";

import Image from "next/image";
import { useEffect } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { TransitionLink, titleMorph, useTransitionRouter } from "@/components/view-transition";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { SettingsPill } from "@/components/settings-pill";
import { DockIcon } from "@/components/magicui/dock";
import { SiteDock } from "@/components/site-dock";
import { getProjectStudy, studyLabels } from "@/lib/project-studies";
import { projectOrder, projects, type Project } from "@/lib/projects";

const ordered = projectOrder.map((slug) => projects.find((project) => project.slug === slug)!);

export function ProjectCaseStudy({ project }: { project: Project }) {
  const { i18n, t } = useTranslation();
  const language = i18n.language.startsWith("pt") ? "pt" : "en";
  const copy = getProjectStudy(project, language);
  const labels = studyLabels[language];
  const { resolvedTheme, setTheme } = useTheme();
  const navigate = useTransitionRouter();
  const index = ordered.findIndex((item) => item.slug === project.slug);
  const previousProject = ordered[(index - 1 + ordered.length) % ordered.length];
  const nextProject = ordered[(index + 1) % ordered.length];

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if ((event.target as HTMLElement).closest("input, textarea, select, [contenteditable]")) return;
      if (event.key === "ArrowLeft") navigate(`/projects/${previousProject.slug}`);
      if (event.key === "ArrowRight") navigate(`/projects/${nextProject.slug}`);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [navigate, previousProject.slug, nextProject.slug]);

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-blue-500/30">
      <nav aria-label={t("navigation.label")} className="md:hidden">
        <SettingsPill>
          <TransitionLink href={`/#project-${project.slug}`} onClick={() => { titleMorph.slug = project.slug; }} className="group inline-flex h-9 items-center gap-2 rounded-full pl-2.5 pr-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
            <ArrowLeft aria-hidden="true" size={16} className="transition-transform group-hover:-translate-x-0.5 motion-reduce:transform-none" />{labels.back}
          </TransitionLink>
        </SettingsPill>
      </nav>
      <div className="mx-auto max-w-5xl px-6 pb-8 pt-28 sm:pb-12 md:pb-32 md:pt-24">
        <article>
          <header className="mb-10 max-w-3xl">
            <p className="vt-project-eyebrow mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">{labels.study}</p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl"><span className="inline-block leading-[1.1] [view-transition-name:project-title]">{copy.title}</span></h1>
            <div className="vt-project-intro">
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{copy.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {project.viewProject && <a href={project.viewProject} target="_blank" rel="noopener noreferrer" className={`${project.slug === "racing-game" ? "hidden lg:inline-flex" : "inline-flex"} items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background`}>{project.slug === "racing-game" ? (language === "pt" ? "Experimentar jogo" : "Try game") : labels.live}<ArrowUpRight size={16} /></a>}
              {project.sourceCode && <a href={project.sourceCode} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium hover:bg-muted"><Github size={16} />{labels.source}</a>}
            </div>
            {project.slug === "racing-game" && <p className="mt-3 hidden text-xs text-muted-foreground lg:block">{language === "pt" ? "Só funciona no computador" : "Only works on computer"}</p>}
            {project.collaboratorRepository && <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{labels.collaboration}</p>}
            </div>
          </header>
          {project.preview ? (
            <div className="vt-project-media overflow-hidden rounded-2xl border border-border bg-muted/50">
              <video
                key={project.preview.webm ?? project.preview.video}
                poster={project.preview.poster}
                controls
                muted
                loop
                playsInline
                preload="metadata"
                aria-label={copy.title}
                className="block max-h-[75vh] w-full object-contain"
              >
                {project.preview.webm && <source src={project.preview.webm} type='video/webm; codecs="vp9"' />}
                <source src={project.preview.video} type="video/mp4" />
              </video>
            </div>
          ) : (
          <div className="vt-project-media relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-muted/50 sm:aspect-video">
            {typeof project.image === "string" ? <Image src={project.image} alt={copy.title} fill priority sizes="(max-width: 1024px) 100vw, 976px" className="object-contain p-4 sm:p-8" /> : <>
              <Image src={project.image.light} alt={copy.title} fill priority sizes="(max-width: 1024px) 100vw, 976px" className="object-contain p-4 sm:p-8 dark:hidden" />
              <Image src={project.image.dark} alt={copy.title} fill priority sizes="(max-width: 1024px) 100vw, 976px" className="hidden object-contain p-4 sm:p-8 dark:block" />
            </>}
          </div>
          )}
          <div className="vt-project-body mt-14 grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
            <dl className="space-y-8">
              <div><dt className="mb-3 text-sm text-muted-foreground">{labels.role}</dt><dd className="font-medium">{copy.role}</dd></div>
              <div><dt className="mb-3 text-sm text-muted-foreground">{labels.stack}</dt><dd className="flex flex-wrap gap-2">{project.tech.map((tech) => <span key={tech} className="rounded-md border border-border bg-muted/50 px-3 py-1 text-xs">{tech}</span>)}</dd></div>
            </dl>
            <div className="space-y-8">
              <section><h2 className="mb-3 text-xl font-semibold">{labels.challenge}</h2><p className="leading-relaxed text-muted-foreground">{copy.challenge}</p></section>
              <section><h2 className="mb-3 text-xl font-semibold">{labels.approach}</h2><p className="leading-relaxed text-muted-foreground">{copy.approach}</p></section>
            </div>
          </div>

        </article>
        <footer className="mt-16 border-t border-border pt-8">
          <nav aria-label={labels.projects} className="grid grid-cols-2 items-center gap-3 sm:grid-cols-[1fr_auto_1fr]">
            <ol className="col-span-2 mb-3 flex items-center justify-center gap-1 sm:col-span-1 sm:col-start-2 sm:row-start-1 sm:mb-0">
              {ordered.map((item) => {
                const current = item.slug === project.slug;
                const title = getProjectStudy(item, language).title;
                return (
                  <li key={item.slug}>
                    <TransitionLink href={`/projects/${item.slug}`} aria-label={title} aria-current={current ? "page" : undefined} onClick={current ? (event) => { event.preventDefault(); window.scrollTo({ top: 0 }); } : undefined} className="group/dot relative flex h-6 items-center px-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded-full">
                      <span aria-hidden="true" className="pointer-events-none absolute top-full left-1/2 z-10 mt-1 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-background px-2 py-1 text-xs font-medium text-foreground opacity-0 shadow-md group-hover/dot:opacity-100 group-focus-visible/dot:opacity-100">{title}</span>
                      <span className={`block h-2 rounded-full transition-all motion-reduce:transition-none ${current ? "w-6 bg-foreground" : "w-2 bg-muted-foreground/40 group-hover/dot:bg-muted-foreground"}`} />
                    </TransitionLink>
                  </li>
                );
              })}
            </ol>
              <TransitionLink href={`/projects/${previousProject.slug}`} className="group flex min-w-0 items-center gap-2 rounded-xl p-3 hover:bg-muted/50 sm:gap-3 sm:p-4 sm:col-start-1 sm:row-start-1">
                <ArrowLeft aria-hidden="true" className="shrink-0 transition-transform group-hover:-translate-x-1 motion-reduce:transform-none" />
                <div className="min-w-0"><p className="mb-1 truncate text-sm text-muted-foreground">{labels.previous}</p><p className="font-semibold sm:truncate sm:text-xl">{getProjectStudy(previousProject, language).title}</p></div>
              </TransitionLink>
              <TransitionLink href={`/projects/${nextProject.slug}`} className="group flex min-w-0 items-center justify-end gap-2 rounded-xl p-3 text-right hover:bg-muted/50 sm:gap-3 sm:p-4 sm:col-start-3 sm:row-start-1">
                <div className="min-w-0"><p className="mb-1 truncate text-sm text-muted-foreground">{labels.next}</p><p className="font-semibold sm:truncate sm:text-xl">{getProjectStudy(nextProject, language).title}</p></div>
                <ArrowRight aria-hidden="true" className="shrink-0 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
              </TransitionLink>
          </nav>
        </footer>
      </div>
      <SiteDock>
        <TransitionLink href={`/#project-${project.slug}`} onClick={() => { titleMorph.slug = project.slug; }} className="group ml-1 inline-flex h-10 items-center gap-2 self-center rounded-full pl-2 pr-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
          <ArrowLeft aria-hidden="true" size={18} className="transition-transform group-hover:-translate-x-0.5 motion-reduce:transform-none" />{labels.back}
        </TransitionLink>
        <div className="mx-2 h-6 w-px self-center bg-border" />
        <DockIcon className="mx-1">
          <LanguageToggle />
        </DockIcon>
        <DockIcon className="mx-1">
          <button type="button" aria-label={t("theme.toggle")} title={t("theme.toggle")} onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} className="cursor-pointer rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <Sun size={20} className="dark:hidden" /><Moon size={20} className="hidden dark:block" />
          </button>
        </DockIcon>
      </SiteDock>
    </main>
  );
}
