"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dock, DockIcon } from "@/components/magicui/dock";
import {
  Home as HomeIcon,
  User,
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

const techStack = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "Java",
  "Kotlin",
  "React Native",
  "Flutter",
  "Dart",
  "Node.js",
  "Git",
  "PostgreSQL",
  "Convex",
  "Expo",
];

const navigationItems = [
  { id: "hero", label: "navigation.home", icon: HomeIcon },
  { id: "experience", label: "navigation.experience", icon: Briefcase },
  { id: "projects", label: "navigation.projects", icon: Code },
];

type Project = {
  titleKey: string;
  descriptionKey: string;
  tech: string[];
  image: string;
  viewProject?: string;
  sourceCode?: string;
};

const projects: Project[] = [
  {
    titleKey: "projects.items.0.title",
    descriptionKey: "projects.items.0.description",
    tech: ["React", "Next.js", "Tailwind CSS", "Convex"],
    image: "/waterwisedark.webp",
    viewProject: "https://water-wise-one.vercel.app/",
    sourceCode: "https://github.com/Acr2004/water-wise",
  },
  {
    titleKey: "projects.items.1.title",
    descriptionKey: "projects.items.1.description",
    tech: ["React Native", "TypeScript", "Node.js"],
    image: "/yoke.webp",
    sourceCode: "https://github.com/Acr2004/yoke-gym-app",
  },
  {
    titleKey: "projects.items.4.title",
    descriptionKey: "projects.items.4.description",
    tech: ["React Native", "Expo"],
    image: "/emojiPuzzle.webp",
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
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const { theme, setTheme } = useTheme();
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
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <main className="min-h-screen bg-background text-foreground font-sans selection:bg-blue-500/30 transition-colors duration-300">
      <div className="max-w-2xl mx-auto py-12 px-6 sm:py-24">

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
                <Link href="https://github.com/ric2003" target="_blank" className="text-muted-foreground hover:text-[#6e5494] transition-colors">
                  <Github size={20} />
                </Link>
                <Link href="https://www.linkedin.com/in/ricardo-gonçalves-986780267" target="_blank" className="text-muted-foreground hover:text-[#0077B5] transition-colors">
                  <Linkedin size={20} />
                </Link>
                <Link href="mailto:ricgon20035@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Mail size={20} />
                </Link>
              </div>
            </div>
          </div>
          <div>
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 shrink-0 rounded-full overflow-hidden border-2 border-border bg-muted">
              <Image
                src="/img.webp"
                alt="Ricardo Gonçalves"
                fill
                className="object-contain"
                priority
              />

            </div>
            <div className="flex items-center justify-center mt-4">
              <Button
                onClick={() => downloadFile("Ricardo-Goncalves-CV.pdf")}
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
          <p className="text-muted-foreground leading-relaxed mb-6">
            {t("about.description")}
          </p>
          <h3 className="font-semibold text-foreground mb-2 mt-8">{t("about.tech_stack_title")}</h3>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 text-xs font-medium bg-muted text-muted-foreground  border border-border rounded-md"
              >
                {tech}
              </span>
            ))}
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
                  <div
                    className="group flex flex-col bg-muted/50 border border-border rounded-xl overflow-hidden hover:border-foreground/20 transition-colors cursor-pointer text-left h-full"
                  >
                    <div className="aspect-video relative bg-muted overflow-hidden">
                      <Image
                        src={project.image}
                        alt={t(project.titleKey)}
                        fill
                        className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-semibold text-foreground mb-1">
                        {t(project.titleKey)}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                        {t(project.descriptionKey)}
                      </p>
                      <div className="mt-auto flex justify-between items-end gap-2">
                        {(project.viewProject) ? (
                          <a
                            href={project.viewProject}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-blue-500 transition-colors"
                          >
                            <ExternalLink size={16} />
                            {t("projects.website")}
                          </a>
                        ) : (
                          <a
                            href={project.sourceCode}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-[#6e5494] transition-colors"
                          >
                            <Github size={16} />
                            {t("projects.source")}
                          </a>
                        )}
                        <span className="text-xs text-muted-foreground underline decoration-muted-foreground/50 group-hover:decoration-foreground transition-colors">
                          {t("buttons.show_more")}
                        </span>
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] border border-border overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{t(project.titleKey)}</DialogTitle>
                    <DialogDescription>
                      {t(project.descriptionKey)}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="aspect-video relative bg-muted rounded-lg overflow-hidden my-4">
                    <Image
                      src={project.image}
                      alt={t(project.titleKey)}
                      fill
                      className="object-contain p-2"
                    />
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
          <div className="flex gap-6 mb-6">
            <Link href="https://github.com/ric2003" target="_blank" className="text-muted-foreground hover:text-[#6e5494] transition-colors">
              <Github size={24} />
            </Link>
            <Link href="https://www.linkedin.com/in/ricardo-gonçalves-986780267" target="_blank" className="text-muted-foreground hover:text-[#0077B5] transition-colors">
              <Linkedin size={24} />
            </Link>
            <Link href="mailto:ricgon20035@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors">
              <Mail size={24} />
            </Link>
          </div>

          <div className="mt-16 text-xs text-muted-foreground">
            © {new Date().getFullYear()} Ricardo Gonçalves. {t("footer.rights")}
          </div>
        </section>

        {/* Dock Navigation */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <Dock className="bg-background/80 backdrop-blur-md border border-border rounded-full px-3 h-14 shadow-lg">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <DockIcon key={item.id} onClick={() => scrollToSection(item.id)} className="mx-1">
                  <div className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    <Icon size={20} />
                  </div>
                </DockIcon>
              );
            })}
            <div className="w-px h-6 bg-border mx-2 self-center" />
            <DockIcon className="mx-1">
              <LanguageToggle />
            </DockIcon>
            <DockIcon className="mx-1" onClick={toggleTheme}>
              <div className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                {mounted && theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
              </div>
            </DockIcon>
          </Dock>
        </div>

      </div >
    </main >
  );
}
