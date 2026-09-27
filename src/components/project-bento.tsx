"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import { projectOrder, projects, type Project } from "@/lib/projects";
import { ProjectPreview } from "@/components/project-preview";
import { RacingDemo } from "@/components/racing-demo";
import { ExternalLinkButton } from "@/components/external-link-button";
import { TransitionLink, titleMorph } from "@/components/view-transition";

function ProjectScreenshot({ project, title, mobile = false }: {
  project: Project;
  title: string;
  mobile?: boolean;
}) {
  const images = typeof project.image === "string"
    ? [{ src: project.image, className: "" }]
    : [{ src: project.image.light, className: "dark:hidden" }, { src: project.image.dark, className: "hidden dark:block" }];
  const backdrop = {
    yoke: "bg-amber-500/10",
    "emoji-puzzle": "bg-violet-500/10",
    "sns-hospitals": "bg-sky-500/10",
  }[project.slug] ?? "bg-muted/50";

  return (
    <div className={`relative flex items-center justify-center overflow-hidden border-b border-border ${mobile ? `h-72 p-5 ${backdrop}` : "aspect-video bg-muted/50"}`}>
      <div className={mobile ? "relative h-full aspect-[1170/2532] overflow-hidden rounded-xl ring-1 ring-black/10 shadow-md transition-transform duration-300 group-hover:-translate-y-1 motion-reduce:transform-none" : "relative h-full w-full"}>
        {images.map(({ src, className }) => (
          <Image key={src} src={src} alt={title} fill loading="eager" sizes={mobile ? "120px" : "(max-width: 639px) 100vw, 424px"} className={`object-contain ${className}`} />
        ))}
      </div>
    </div>
  );
}

export function ProjectBento() {
  const { t, i18n } = useTranslation();
  const language = i18n.language.startsWith("pt") ? "pt" : "en";
  const pt = language === "pt";

  return (
    <section id="projects" className="mb-20 scroll-mt-8">
      <h2 className="mb-7 text-xl font-bold">{t("projects.title")}</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
        {projectOrder.map((slug, index) => {
          const project = projects.find((item) => item.slug === slug)!;
          const title = t(project.titleKey);
          const racing = slug === "racing-game";
          return (
            <article key={slug} id={`project-${slug}`} className={`project-card scroll-mt-24 group relative isolate flex flex-col overflow-hidden rounded-2xl border border-border bg-muted/30 transition-colors hover:border-foreground/30 ${racing ? "sm:col-span-6" : index < 3 ? "sm:col-span-3" : "sm:col-span-2"}`}>
              {project.preview ? (
                <ProjectPreview src={project.preview.video} webm={project.preview.webm} aspectRatio={project.preview.aspectRatio} poster={project.preview.poster} title={title} playLabel={pt ? "Ver prévia" : "Play preview"} pauseLabel={pt ? "Pausar" : "Pause preview"} />
              ) : <ProjectScreenshot project={project} title={title} mobile={index > 2} />}
              <div className="flex flex-1 flex-col p-5">
                <h3 className={`${racing ? "text-2xl sm:text-3xl" : index < 3 ? "text-xl" : "text-base"} font-semibold tracking-tight`}>
                  <span data-project-title className="inline-block leading-[1.1]" style={titleMorph.slug === slug ? { viewTransitionName: "project-title" } : undefined}>{title}</span>
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{project.tech.join(" · ")}</p>
                {racing && <RacingDemo language={language} />}
                {!racing && project.viewProject && (
                  <div className="mt-4">
                    <ExternalLinkButton language={language} href={project.viewProject}>{pt ? "Visitar site" : "Visit site"}</ExternalLinkButton>
                  </div>
                )}
                <div className="mt-auto flex justify-end pt-4">
                  <TransitionLink href={`/projects/${slug}`} onClick={(event) => { titleMorph.slug = null; document.querySelectorAll<HTMLElement>("[data-project-title]").forEach((heading) => { heading.style.viewTransitionName = ""; }); const heading = event.currentTarget.closest("article")?.querySelector<HTMLElement>("[data-project-title]"); if (heading) heading.style.viewTransitionName = "project-title"; }} aria-label={`${pt ? "Ver detalhes" : "Show details"}: ${title}`} className="project-details text-xs font-medium text-muted-foreground underline-offset-4 after:absolute after:inset-0 after:z-10 focus-visible:outline-none">
                    <span className="project-details-label">{pt ? "Ver detalhes" : "Show details"}</span>
                  </TransitionLink>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
