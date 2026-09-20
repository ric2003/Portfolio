"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { projects, type Project } from "@/lib/projects";
import { ProjectPreview } from "@/components/project-preview";
import { RacingDemo } from "@/components/racing-demo";

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
          <Image key={src} src={src} alt={title} fill sizes={mobile ? "120px" : "(max-width: 639px) 100vw, 424px"} className={`object-contain ${className}`} />
        ))}
      </div>
    </div>
  );
}

export function ProjectBento() {
  const { t, i18n } = useTranslation();
  const language = i18n.language.startsWith("pt") ? "pt" : "en";
  const pt = language === "pt";
  const order = ["racing-game", "water-wise", "live-notes", "yoke", "emoji-puzzle", "sns-hospitals"];

  return (
    <section id="projects" className="mb-20 scroll-mt-8 lg:-mx-28">
      <h2 className="mb-7 text-xl font-bold">{t("projects.title")}</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
        {order.map((slug, index) => {
          const project = projects.find((item) => item.slug === slug)!;
          const title = t(project.titleKey);
          const racing = slug === "racing-game";
          return (
            <article key={slug} className={`project-card group relative isolate flex flex-col overflow-hidden rounded-2xl border border-border bg-muted/30 transition-colors hover:border-foreground/30 ${racing ? "sm:col-span-6" : index < 3 ? "sm:col-span-3" : "sm:col-span-2"}`}>
              {project.preview ? (
                <ProjectPreview src={project.preview.video} webm={project.preview.webm} aspectRatio={project.preview.aspectRatio} poster={project.preview.poster} title={title} playLabel={pt ? "Ver prévia" : "Play preview"} pauseLabel={pt ? "Pausar" : "Pause preview"} />
              ) : <ProjectScreenshot project={project} title={title} mobile={index > 2} />}
              <div className="flex flex-1 flex-col p-5">
                <h3 className={`${racing ? "text-2xl sm:text-3xl" : index < 3 ? "text-xl" : "text-base"} font-semibold tracking-tight`}>
                  {project.viewProject ? (
                    <a data-card-action href={project.viewProject} target="_blank" rel="noopener noreferrer" aria-label={`${title} (${pt ? "abrir site num novo separador" : "open website in a new tab"})`} className="relative z-20 inline-flex items-center gap-2 underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
                      {title}<ArrowUpRight aria-hidden="true" size={18} className="shrink-0 text-muted-foreground" />
                    </a>
                  ) : title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{project.tech.join(" · ")}</p>
                {racing && <RacingDemo language={language} />}
                <div className="mt-auto flex justify-end pt-4">
                  <Link href={`/projects/${slug}`} aria-label={`${pt ? "Ver detalhes" : "Show details"}: ${title}`} className="project-details text-xs font-medium text-muted-foreground underline-offset-4 after:absolute after:inset-0 after:z-10 focus-visible:outline-none">
                    <span className="project-details-label">{pt ? "Ver detalhes" : "Show details"}</span><span aria-hidden="true" className="ml-1">→</span>
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
