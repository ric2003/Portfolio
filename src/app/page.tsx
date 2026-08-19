"use client";

import { useState, useEffect, type KeyboardEvent } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dock, DockIcon } from "@/components/magicui/dock";
import {
  Home as HomeIcon,
  Briefcase,
  Code,
  Mail,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Moon,
  Sun,
} from "lucide-react";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { useTranslation } from "react-i18next";
import { Experience } from "@/components/experience";
import { Education } from "@/components/education";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type TechTab = "work" | "projects";

type Technology = {
  name: string;
  labelKey?: string;
};

const techTabs: TechTab[] = ["work", "projects"];

const technologies: Record<TechTab, Technology[]> = {
  work: [
    { name: "Python" },
    { name: "Kotlin" },
    { name: "Android tooling", labelKey: "about.android_tooling" },
    { name: "Git" },
  ],
  projects: [
    { name: "TypeScript" },
    { name: "React" },
    { name: "Next.js" },
    { name: "React Native" },
    { name: "Tailwind CSS" },
    { name: "PostgreSQL" },
    { name: "Git" },
  ],
};


const navigationItems = [
  { id: "hero", label: "navigation.home", icon: HomeIcon },
  { id: "experience", label: "navigation.experience", icon: Briefcase },
  { id: "projects", label: "navigation.projects", icon: Code },
  { id: "contact", label: "navigation.contact", icon: Mail },
];

type Project = {
  titleKey: string;
  descriptionKey: string;
  tech: string[];
  image: string | { light: string; dark: string };
  viewProject?: string;
  sourceCode?: string;
  collaboratorRepository?: boolean;
};

const projects: Project[] = [
  {
    titleKey: "projects.items.0.title",
    descriptionKey: "projects.items.0.description",
    tech: ["React", "Next.js", "Tailwind CSS", "Convex"],
    image: {
      light: "/waterwise_lightMode.webp",
      dark: "/waterwise_darkMode.webp",
    },
    viewProject: "https://water-wise-one.vercel.app/",
    sourceCode: "https://github.com/Acr2004/water-wise",
    collaboratorRepository: true,
  },
  {
    titleKey: "projects.items.1.title",
    descriptionKey: "projects.items.1.description",
    tech: ["React Native", "TypeScript", "Node.js"],
    image: "/yoke.webp",
    sourceCode: "https://github.com/Acr2004/yoke-gym-app",
    collaboratorRepository: true,
  },
  {
    titleKey: "projects.items.4.title",
    descriptionKey: "projects.items.4.description",
    tech: ["React Native", "Expo"],
    image: {
      light: "/emojiPuzzle_lightMode.webp",
      dark: "/emojiPuzzle_darkMode.webp",
    },
    sourceCode: "https://github.com/ric2003/emoji-word-puzzle",
  },
  {
    titleKey: "projects.items.3.title",
    descriptionKey: "projects.items.3.description",
    tech: ["Next.js", "Firebase"],
    image: "/noteApp.webp",
    viewProject: "https://live-update-notes.netlify.app/",
    sourceCode: "https://github.com/ric2003/notes-app",
  },
  {
    titleKey: "projects.items.2.title",
    descriptionKey: "projects.items.2.description",
    tech: ["Flutter", "Dart", "Google Maps"],
    image: "/flutter-sns-app.webp",
    sourceCode: "https://github.com/ric2003/flutter-App-SNS-Hospitais",
  },
];

export default function Home() {
  const { t, i18n } = useTranslation();
  const currentCV = i18n.language === "pt" ? "Ricardo-Goncalves-CV-pt.pdf" : "Ricardo-Goncalves-CV-en.pdf";
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTechTab, setActiveTechTab] = useState<TechTab>("work");
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const downloadFile = (filename: string) => {
    const link = document.createElement("a");
    link.href = `/${filename}`;
    link.download = filename;
    link.click();
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const selectTechTab = (tab: TechTab) => {
    setActiveTechTab(tab);
    requestAnimationFrame(() => {
      document.getElementById(`technology-tab-${tab}`)?.focus();
    });
  };

  const handleTechTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    currentTab: TechTab,
  ) => {
    const currentIndex = techTabs.indexOf(currentTab);
    let nextTab: TechTab | undefined;

    if (event.key === "ArrowRight") {
      nextTab = techTabs[(currentIndex + 1) % techTabs.length];
    } else if (event.key === "ArrowLeft") {
      nextTab = techTabs[(currentIndex - 1 + techTabs.length) % techTabs.length];
    } else if (event.key === "Home") {
      nextTab = techTabs[0];
    } else if (event.key === "End") {
      nextTab = techTabs[techTabs.length - 1];
    }

    if (nextTab) {
      event.preventDefault();
      selectTechTab(nextTab);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground font-sans selection:bg-blue-500/30 transition-colors duration-300">
      <div className="fixed top-5 right-5 z-50 flex items-center gap-1 rounded-full border border-border bg-background/85 p-1 shadow-sm backdrop-blur-md md:hidden">
        <LanguageToggle />
        <button
          type="button"
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          aria-label={t("theme.toggle")}
          title={t("theme.toggle")}
        >
          {mounted && resolvedTheme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>

      <div className="max-w-2xl mx-auto py-12 px-6 sm:py-24 md:pb-24">

        {/* Header / Hero */}
        <section id="hero" className="mb-16 flex flex-col-reverse sm:flex-row items-start justify-between gap-8">
          <div className="flex flex-col gap-4 flex-1">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Ricardo Gonçalves
            </h1>
            <p className="text-xl text-muted-foreground">
              {t("hero.title")}
            </p>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              {t("hero.description")}
            </p>
            <div className="flex items-center gap-4 mt-2 flex-wrap">
              <div className="flex gap-4">
                <Link href="https://github.com/ric2003" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-[#6e5494] transition-colors">
                  <Github size={20} />
                </Link>
                <Link href="https://www.linkedin.com/in/ricardogoncalves03" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-[#0077B5] transition-colors">
                  <Linkedin size={20} />
                </Link>
                <Link href="mailto:ricgon20035@gmail.com" aria-label={t("contact.email")} className="text-muted-foreground hover:text-foreground transition-colors">
                  <Mail size={20} />
                </Link>
              </div>
              <div className="md:hidden flex items-center justify-center ml-2">
                <Button
                  onClick={() => downloadFile(currentCV)}
                  variant="outline"
                  size="sm"
                  className="gap-2 text-muted-foreground "
                >
                  <Download size={14} />
                  {t("hero.download_cv")}
                </Button>
              </div>

            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 shrink-0 rounded-full overflow-hidden border-2 border-border bg-muted">
              <Image
                src="/img.webp"
                alt="Ricardo Gonçalves"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden md:block flex items-center justify-center mt-4">
              <Button
                onClick={() => downloadFile(currentCV)}
                variant="outline"
                size="sm"
                className="gap-2 text-muted-foreground "
              >
                <Download size={14} />
                {t("hero.download_cv")}
              </Button>
            </div>
          </div>

        </section>

        {/* About */}
        <section id="about" className="mb-16">
          <h2 className="text-xl font-bold mb-4">{t("about.title")}</h2>
          <div className="grid">
            {(["en", "pt"] as const).map((locale) => (
              <p
                key={locale}
                lang={locale}
                aria-hidden="true"
                className="invisible col-start-1 row-start-1 select-none text-muted-foreground leading-relaxed"
              >
                {i18n.t("about.description", { lng: locale })}
              </p>
            ))}
            <p className="col-start-1 row-start-1 text-muted-foreground leading-relaxed">
              {t("about.description")}
            </p>
          </div>
          <div className="mt-10">
            <div className="flex items-end justify-between gap-3 border-b border-border">
              <h3 id="technologies-title" className="pb-2 text-xl font-bold text-foreground">
                {t("about.tech_stack_title")}
              </h3>
              <div
                role="tablist"
                aria-labelledby="technologies-title"
                className="flex shrink-0 gap-3 sm:gap-5"
              >
                {techTabs.map((tab) => {
                  const isActive = activeTechTab === tab;

                  return (
                    <button
                      key={tab}
                      id={`technology-tab-${tab}`}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`technology-panel-${tab}`}
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => setActiveTechTab(tab)}
                      onKeyDown={(event) => handleTechTabKeyDown(event, tab)}
                      className={`relative whitespace-nowrap pb-2 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:text-sm ${
                        isActive
                          ? "font-medium text-foreground after:absolute after:inset-x-0 after:-bottom-px after:h-px after:bg-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {t(`about.${tab}_tab`)}
                    </button>
                  );
                })}
              </div>
            </div>
            <div
              key={activeTechTab}
              id={`technology-panel-${activeTechTab}`}
              role="tabpanel"
              aria-labelledby={`technology-tab-${activeTechTab}`}
              className="tech-tab-panel mt-4 min-h-14"
            >
              <div className="flex flex-wrap gap-x-5 gap-y-2.5">
                {technologies[activeTechTab].map((technology) => (
                  <span
                    key={technology.name}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <span aria-hidden="true" className="h-1 w-1 rounded-full bg-foreground/40" />
                    {technology.labelKey
                      ? t(technology.labelKey)
                      : technology.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Experience */}
        <Experience />

        {/* Education */}
        <Education />

        {/* Projects */}
        <section id="projects" className="mb-16">
          <h2 className="text-xl font-bold mb-8">{t("projects.title")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projects.slice(0, isExpanded ? projects.length : 4).map((project) => (
              <Dialog key={project.titleKey}>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="group flex w-full flex-col bg-muted/50 border border-border rounded-xl overflow-hidden hover:border-foreground/30 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-all cursor-pointer text-left h-full"
                  >
                    <div className="aspect-video relative bg-muted overflow-hidden">
                      {typeof project.image === "string" ? (
                        <Image
                          src={project.image}
                          alt={t(project.titleKey)}
                          fill
                          className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <>
                          <Image
                            src={project.image.light}
                            alt={t(project.titleKey)}
                            fill
                            className="object-contain p-2 transition-transform duration-500 group-hover:scale-105 dark:hidden"
                          />
                          <Image
                            src={project.image.dark}
                            alt={t(project.titleKey)}
                            fill
                            className="object-contain p-2 transition-transform duration-500 group-hover:scale-105 hidden dark:block"
                          />
                        </>
                      )}
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-semibold text-foreground mb-1">
                        {t(project.titleKey)}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                        {t(project.descriptionKey)}
                      </p>
                      <div className="mt-auto flex items-center justify-between gap-2">
                        <span className="text-xs text-muted-foreground">
                          {project.tech.slice(0, 2).join(" · ")}
                        </span>
                        <span className="text-xs font-medium text-foreground underline decoration-muted-foreground/50 group-hover:decoration-foreground transition-colors">
                          {t("buttons.view_details")}
                        </span>
                      </div>
                    </div>
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] border border-border overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{t(project.titleKey)}</DialogTitle>
                    <DialogDescription>
                      {t(project.descriptionKey)}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="aspect-video relative bg-muted rounded-lg overflow-hidden my-4">
                    {typeof project.image === "string" ? (
                      <Image
                        src={project.image}
                        alt={t(project.titleKey)}
                        fill
                        className="object-contain p-2"
                      />
                    ) : (
                      <>
                        <Image
                          src={project.image.light}
                          alt={t(project.titleKey)}
                          fill
                          className="object-contain p-2 dark:hidden"
                        />
                        <Image
                          src={project.image.dark}
                          alt={t(project.titleKey)}
                          fill
                          className="object-contain p-2 hidden dark:block"
                        />
                      </>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs font-medium bg-muted text-foreground border border-border rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.collaboratorRepository && (
                    <p className="text-xs text-muted-foreground -mt-2 mb-1">
                      {t("projects.collaborator_repository")}
                    </p>
                  )}
                  <div className="flex gap-4">
                    {project.viewProject && (
                      <a
                        href={project.viewProject}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-blue-500 transition-colors"
                      >
                        <ExternalLink size={16} />
                        {t("projects.website")}
                      </a>
                    )}
                    {project.sourceCode && (
                      <a
                        href={project.sourceCode}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-[#6e5494] transition-colors"
                      >
                        <Github size={16} />
                        {t("projects.source")}
                      </a>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
          {projects.length > 4 && (
            <div className="mt-8 flex justify-center">
              <Button
                variant="secondary"
                className="w-full sm:w-auto"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? t("buttons.show_less") : t("buttons.show_more")}
              </Button>
            </div>
          )}
        </section>

        {/* Contact / Footer */}
        <section id="contact" className="flex flex-col items-center pt-12 border-t border-border">
          <h2 className="text-2xl font-bold mb-4">{t("contact.title")}</h2>
          <p className="text-muted-foreground mb-8 text-center max-w-sm">
            {t("contact.description")}
          </p>
          <Button asChild className="mb-8 gap-2">
            <Link href="mailto:ricgon20035@gmail.com">
              <Mail size={16} />
              {t("contact.email_me")}
            </Link>
          </Button>
          <div className="flex gap-6 mb-6">
            <Link href="https://github.com/ric2003" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-[#6e5494] transition-colors">
              <Github size={24} />
            </Link>
            <Link href="https://www.linkedin.com/in/ricardogoncalves03" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-[#0077B5] transition-colors">
              <Linkedin size={24} />
            </Link>
            <Link href="mailto:ricgon20035@gmail.com" aria-label={t("contact.email")} className="text-muted-foreground hover:text-foreground transition-colors">
              <Mail size={24} />
            </Link>
          </div>

          <div className="mt-16 text-xs text-muted-foreground">
            © {new Date().getFullYear()} Ricardo Gonçalves. {t("footer.rights")}
          </div>
        </section>

        {/* Dock Navigation */}
        <div className="hidden md:block fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <Dock className="bg-background/80 backdrop-blur-md border border-border rounded-full px-3 h-14 shadow-lg">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <DockIcon key={item.id} className="mx-1">
                  <button type="button" onClick={() => scrollToSection(item.id)} aria-label={t(item.label)} title={t(item.label)} className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    <Icon size={20} />
                  </button>
                </DockIcon>
              );
            })}
            <div className="w-px h-6 bg-border mx-2 self-center" />
            <DockIcon className="mx-1">
              <LanguageToggle />
            </DockIcon>
            <DockIcon className="mx-1">
              <button type="button" onClick={toggleTheme} aria-label={t("theme.toggle")} title={t("theme.toggle")} className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                {mounted && resolvedTheme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
            </DockIcon>
          </Dock>
        </div>

      </div >
    </main >
  );
}
