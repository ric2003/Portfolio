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
  const racing = projects.find((project) => project.slug === "racing-game")!;
  const water = projects.find((project) => project.slug === "water-wise")!;
  const notes = projects.find((project) => project.slug === "live-notes")!;
  const compact = projects.filter((project) => ![racing, water, notes].includes(project));
  const playLabel = pt ? "Ver prévia" : "Play preview";
  const pauseLabel = pt ? "Pausar" : "Pause preview";
  const tileClass = "overflow-hidden rounded-2xl border border-border bg-muted/30";
  const linkClass = "group inline-flex items-center gap-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

  return (
    <section id="projects" className="mb-20 scroll-mt-8 lg:-mx-28">
      <div className="mb-7 flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="text-xl font-bold">{t("projects.title")}</h2>
        <span className="text-xs text-muted-foreground">{pt ? "Web, mobile e uma corrida entre amigos." : "Web, mobile, and a race with friends."}</span>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
        <article className={`${tileClass} sm:col-span-6`}>
          <ProjectPreview src="/previews/racing-game.mp4" poster="/previews/racing-game.webp" title={t(racing.titleKey)} playLabel={playLabel} pauseLabel={pauseLabel} />
          <div className="p-5 sm:p-7">
            <div className="mb-3 flex flex-wrap items-center gap-2 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
              <span className="rounded-full bg-violet-500/10 px-2.5 py-1 text-violet-700 dark:text-violet-300">{pt ? "Em destaque" : "Featured project"}</span><span>3D · Multiplayer</span>
            </div>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl"><Link href={`/projects/${racing.slug}`} className={linkClass}>{t(racing.titleKey)}<ArrowUpRight size={22} /></Link></h3>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">{pt ? "Salas privadas, seis circuitos e power-ups. Um jogo de corridas 3D para 2 a 4 jogadores, feito com IA." : "Private rooms, six circuits and power-ups. A 3D racer for 2 to 4 players, built with AI."}</p>
              </div>
              <Link href={`/projects/${racing.slug}`} className={`${linkClass} text-sm font-medium`}>{t("buttons.view_details")}<ArrowUpRight size={16} /></Link>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">{racing.tech.join(" · ")}</p>
            <RacingDemo language={language} />
          </div>
        </article>
        <article className={`${tileClass} sm:col-span-3`}>
          <ProjectPreview src="/previews/water-wise.mp4" poster="/previews/water-wise.webp" title={t(water.titleKey)} playLabel={playLabel} pauseLabel={pauseLabel} />
          <div className="p-5">
            <h3 className="text-xl font-semibold"><Link href={`/projects/${water.slug}`} className={linkClass}>{t(water.titleKey)}<ArrowUpRight size={18} /></Link></h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pt ? "Reservatórios portugueses e dados em tempo real, numa plataforma geoespacial." : "Portuguese reservoirs and real-time data in a geospatial platform."}</p>
            <p className="mt-4 text-xs text-muted-foreground">{water.tech.join(" · ")}</p>
          </div>
        </article>
        <Link href={`/projects/${notes.slug}`} className={`${tileClass} group flex flex-col transition-colors hover:border-foreground/30 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:col-span-3`}>
          <ProjectScreenshot project={notes} title={t(notes.titleKey)} />
          <div className="flex flex-1 flex-col p-5">
            <h3 className="flex items-start justify-between gap-3 text-xl font-semibold">{t(notes.titleKey)}<ArrowUpRight size={18} className="mt-1 shrink-0 text-muted-foreground" /></h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pt ? "Um canvas partilhado para criar, mover e editar notas em conjunto, em tempo real." : "A shared canvas to create, move and edit notes together in real time."}</p>
            <p className="mt-auto pt-4 text-xs text-muted-foreground">{notes.tech.join(" · ")}</p>
          </div>
        </Link>
        {compact.map((project) => (
          <Link key={project.slug} href={`/projects/${project.slug}`} className={`${tileClass} group flex flex-col transition-colors hover:border-foreground/30 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:col-span-2`}>
            <ProjectScreenshot project={project} title={t(project.titleKey)} mobile />
            <div className="flex flex-1 flex-col p-5">
              <h3 className="flex items-start justify-between gap-3 text-base font-semibold">{t(project.titleKey)}<ArrowUpRight size={16} className="mt-1 shrink-0 text-muted-foreground" /></h3>
              <p className="mt-auto pt-3 text-xs leading-relaxed text-muted-foreground">{project.tech.join(" · ")}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
