"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dock, DockIcon } from "@/components/magicui/dock";
import {
  Home as HomeIcon,
  User,
  Briefcase,
  Mail,
  Download,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { Particles } from "@/components/magicui/particles";
import { useTranslation } from "react-i18next";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";

const techStack = [
  { name: "React" },
  { name: "Next.js" },
  { name: "JavaScript" },
  { name: "Java" },
  { name: "Kotlin" },
  { name: "Flutter" },
  { name: "Dart" },
  { name: "React Native", comingSoon: true },
];

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const y = element.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};

const navigationItems = [
  { id: "hero", label: "navigation.home", icon: HomeIcon },
  { id: "about", label: "navigation.about", icon: User },
  { id: "projects", label: "navigation.projects", icon: Briefcase },
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
    tech: [
      "React",
      "Next.js",
      "InfluxDB",
      "Tailwind CSS",
      "Mapbox",
      "Leaflet",
      "Recharts",
      "Clerk",
      "Convex",
    ],
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
    titleKey: "projects.items.2.title",
    descriptionKey: "projects.items.2.description",
    tech: ["Flutter", "Dart", "Google Maps", "SQLite", "Provider"],
    image: "/flutter-sns-app.webp",
    sourceCode: "https://github.com/ric2003/flutter-App-SNS-Hospitais",
  },
  {
    titleKey: "projects.items.3.title",
    descriptionKey: "projects.items.3.description",
    tech: ["Next.js", "Firebase Realtime DB", "Firebase Auth"],
    image: "/yoke.webp",
    viewProject: "https://live-update-notes.netlify.app/",
    sourceCode: "https://github.com/ric2003/notes-app",
  },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const [aboutVisible, setAboutVisible] = useState(false);
  const [codeBlockVisible, setCodeBlockVisible] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [navDirection, setNavDirection] = useState<"left" | "right">("right");

  const { t } = useTranslation();

  useEffect(() => {
    const sections = ["hero", "about", "projects"];
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
          if (entry.target.id === "about") {
            setAboutVisible(true);
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const hideCodeBlock = () => {
    setCodeBlockVisible(false);
  };

  const downloadFile = (filename: string) => {
    const link = document.createElement("a");
    link.href = `/${filename}`;
    link.download = filename;
    link.click();
  };

  // Build slides of 2 projects each
  const slides: Project[][] = [];
  for (let i = 0; i < projects.length; i += 2) {
    slides.push(projects.slice(i, i + 2));
  }

  const handleNext = () => {
    setNavDirection("right");
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setNavDirection("left");
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 to-gray-950 relative">
      {/* Particles Background */}
      <div className="absolute inset-0 z-0">
        <div className="hidden sm:block size-full">
          <Particles
            className="size-full"
            quantity={100}
            staticity={50}
            ease={50}
            size={2}
            color="#CCCCCC"
            vx={0}
            vy={0}
          />
        </div>
        <div className="block sm:hidden size-full">
          {/* Fixed viewport anchor to avoid section-based layout shifts on mobile */}
          <div className="fixed inset-0 -z-20">
            <Particles
              className="size-full"
              quantity={50}
              size={1}
              color="#666666"
            />
          </div>
        </div>
      </div>

      {/* Dock nav */}
      <nav className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 hidden lg:block">
        <Dock
          className="bg-black/10 backdrop-blur-md border border-zinc-800/20 h-20 px-4"
          iconSize={60}
          iconMagnification={80}
          iconDistance={100}
        >
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeSection === item.id;

            return (
              <DockIcon
                key={item.id}
                className={`transition-all duration-300 group relative min-w-[80px] ${
                  isActive
                    ? "bg-blue-500/20 text-blue-400"
                    : "text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800/50"
                }`}
                onClick={() => scrollToSection(item.id)}
              >
                <div className="flex flex-col items-center justify-center gap-1 px-2 py-1">
                  <IconComponent size={22} />
                  <span className="text-xs font-medium whitespace-nowrap">
                    {t(item.label)}
                  </span>
                </div>
              </DockIcon>
            );
          })}

          <div className="h-16 w-px bg-zinc-600 mx-2" />

          <DockIcon className="min-w-[80px] cursor-pointer group relative">
            <LanguageToggle />
          </DockIcon>
        </Dock>
      </nav>

      {/* Mobile nav //TODO work on this// */}
      <nav className="fixed top-0 right-2 transform z-50 block lg:hidden">
        <Dock
          className="bg-black/10 backdrop-blur-md border border-zinc-800/20 h-20 px-3"
          iconSize={50}
          iconMagnification={50}
          iconDistance={0}
        >
          <DockIcon className="min-w-[50px] cursor-pointer group relative">
            <LanguageToggle />
          </DockIcon>
        </Dock>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className=" pt-12 lg:pt-20 pb-8 px-2 sm:px-6 lg:px-8 min-h-screen flex items-center relative overflow-hidden z-10"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Mobile: Location, Hi, Name above image */}
            <div className="block lg:hidden mb-6 text-center">
              <div className="flex items-center gap-2 text-sm text-zinc-400 justify-center">
                <MapPin size={16} />
                {t("hero.location")}
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-100 leading-tight mt-2">
                {t("hero.hi")} <br />
              </h1>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-100 leading-tight mt-2">
                Ricardo Gonçalves
              </h1>
            </div>
            {/* Image Block */}
            <div className="order-1 lg:order-2 sm:order-1 relative">
              {/* Code Block Decoration */}
              {codeBlockVisible && (
                <div className="absolute top-5 left-0 z-10 bg-zinc-800 p-4 w-45 rounded-lg shadow-lg transform rotate-12 opacity-90 lg:block hidden code-block">
                  <div className="flex items-center gap-2 mb-2 group transition-all duration-50">
                    {/* Red */}
                    <div
                      className="group relative flex h-3 w-3 items-center justify-center cursor-pointer rounded-full bg-[#F95E57]"
                      onClick={() => hideCodeBlock()}
                    >
                      <div className="absolute h-[1px] w-2 rotate-45 bg-[#991200] rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100"></div>
                      <div className="absolute h-[1px] w-2 -rotate-45 bg-[#991200] rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100"></div>
                    </div>
                    {/* Yellow */}
                    <div
                      className="group relative flex h-3 w-3 items-center justify-center cursor-pointer rounded-full bg-[#FBBC2F]"
                      onClick={() => hideCodeBlock()}
                    >
                      <div className="absolute h-[1.5px] w-2 bg-[#985600] rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100"></div>
                    </div>
                    {/* Green */}
                    <div className="group relative flex h-3 w-3 items-center justify-center cursor-pointer rounded-full bg-[#27C93F]">
                      <svg
                        className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        {/* Top-left triangle */}
                        <polygon points="2,6 6,2 5.9,5.9" fill="#006500" />
                        {/* Bottom-right triangle */}
                        <polygon points="10,6 6,10 6.1,6.1" fill="#006500" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-green-400 text-xs font-mono">
                    console.log(&quot;{t("hero.hello")}&quot;)
                  </div>
                </div>
              )}
              <div className="relative group">
                <div className="relative w-60 h-60 sm:w-86 sm:h-86 md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl rotate-6 lg:group-hover:rotate-12 transition-transform duration-700 opacity-75"></div>

                  <div className="relative w-full h-full bg-zinc-900 rounded-3xl shadow-2xl transform -rotate-6 lg:group-hover:rotate-0 transition-transform duration-700">
                    <Image
                      src="/img.webp"
                      alt="Ricardo Gonçalves"
                      width={500}
                      height={500}
                      className="w-full h-full object-contain"
                    />

                    {/* Overlay Gradient for the imgs*/}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"
                      style={{
                        background:
                          "linear-gradient(to top, var(--background) 0%, transparent 30%)",
                      }}
                    ></div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl rotate-12 opacity-60 animate-pulse"></div>
                  <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl rotate-45 opacity-70 animate-pulse"></div>
                </div>
              </div>
            </div>
            {/* Desktop: Full intro block */}
            <div className="hidden lg:block space-y-8 order-2 lg:order-1">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                  <MapPin size={16} />
                  {t("hero.location")}
                </div>
                <h1 className="text-2xl lg:text-5xl text-zinc-100">
                  {t("hero.hi")} <br />
                </h1>
                <h1 className="text-6xl font-bold text-zinc-50">
                  Ricardo Gonçalves
                </h1>
                <p className="text-2xl text-zinc-200 font-medium pt-2">
                  {t("hero.title")}
                </p>
                <p className="text-xl text-zinc-400 max-w-lg leading-relaxed">
                  {t("hero.description")}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="xl"
                  className="group border border-zinc-600 text-zinc-300 hover:bg-zinc-800 px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                  onClick={() => scrollToSection("projects")}
                >
                  <span className="flex items-center gap-2 relative z-10">
                    <Briefcase size={22} />
                    {t("hero.view_projects")}
                  </span>
                </Button>
                <Button
                  size="xl"
                  className="group border border-zinc-600 text-zinc-300 hover:bg-zinc-800 px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                  onClick={() => downloadFile("Ricardo-Goncalves-CV.pdf")}
                >
                  <span className="flex items-center gap-2">
                    <Download size={22} />
                    {t("hero.download_cv")}
                  </span>
                </Button>
              </div>
              <div className="flex gap-4 items-center">
                <p className="text-zinc-400">{t("hero.find_me")}</p>
                <a
                  href="https://www.linkedin.com/in/ricardo-gonçalves-986780267"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  <div className="absolute inset-0 bg-gray-500 rounded-sm w-1 h-1 top-20 left-30"></div>{" "}
                  {/* this is an easter egg*/}
                  <div className="absolute flex items-center justify-center w-6 h-6 bg-white ml-8"></div>
                  <FaLinkedin
                    className="absolute text-blue-600 ml-8 hover:text-blue-800"
                    size={32}
                  />
                </a>

                <a
                  href="https://github.com/ric2003"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-200 hover:text-gray-400 transition-colors pl-8"
                >
                  <FaGithub size={32} />
                </a>
                <a
                  href="mailto:ricgon20035@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-zinc-400 transition-colors "
                >
                  <Mail
                    className="text-white-400 group-hover:text-zinc-100 transition-colors"
                    size={32}
                  />
                </a>
              </div>
            </div>
            {/* Mobile: Rest of intro block (except location, hi, name) */}
            <div className="block lg:hidden space-y-8 order-2 text-center">
              <div className="space-y-4">
                <p className="text-2xl sm:text-2xl text-zinc-400 font-medium">
                  {t("hero.title")}
                </p>
                <p className="text-xl text-zinc-500 max-w-lg leading-relaxed mx-auto">
                  {t("hero.description")}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <Button
                  size="xl"
                  className="group border border-zinc-600 text-zinc-300 hover:bg-zinc-800 px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                  onClick={() => scrollToSection("projects")}
                >
                  <span className="flex items-center gap-2 relative z-10">
                    <Briefcase size={22} />
                    {t("hero.view_projects")}
                  </span>
                </Button>
                <Button
                  size="xl"
                  className="group border border-zinc-600 text-zinc-300 hover:bg-zinc-800 px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                  onClick={() => downloadFile("Ricardo-Goncalves-CV.pdf")}
                >
                  <span className="flex items-center gap-2">
                    <Download size={22} />
                    {t("hero.download_cv")}
                  </span>
                </Button>
              </div>
              <div className="flex gap-4 items-center justify-center">
                <p className="text-zinc-400">{t("hero.find_me")}</p>
                <a
                  href="https://www.linkedin.com/in/ricardo-gonçalves-986780267"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  <div className="absolute inset-0 bg-gray-500 rounded-sm w-1 h-1 top-20 left-30"></div>{" "}
                  {/* this is an easter egg*/}
                  <div className="absolute flex items-center justify-center w-6 h-6 bg-white ml-8"></div>
                  <FaLinkedin
                    className="absolute text-blue-600 ml-8 hover:text-blue-800"
                    size={32}
                  />
                </a>

                <a
                  href="https://github.com/ric2003"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-200 hover:text-gray-400 transition-colors pl-8"
                >
                  <FaGithub size={32} />
                </a>
                <a
                  href="mailto:ricgon20035@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-zinc-400 transition-colors "
                >
                  <Mail
                    className="text-white-400 group-hover:text-zinc-100 transition-colors"
                    size={32}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-32 sm:pb-0 px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="max-w-4xl mx-auto left-1/2">
          <h2
            className={`text-3xl font-bold text-center text-zinc-100 mb-12 transition-opacity duration-1000 ${
              aboutVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {t("about.title")}
          </h2>

          <div className="space-y-12">
            {/* Background Section */}
            <div
              className={`transition-all duration-1000 delay-50 ${
                aboutVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <h3 className="text-2xl font-semibold text-zinc-100 mb-6">
                {t("about.background_title")}
              </h3>

              <p className="text-zinc-400 mb-6 leading-relaxed text-lg">
                {t("about.background_description")}
              </p>

              <div className="space-y-4">
                {(
                  t("about.background_points", {
                    returnObjects: true,
                  }) as string[]
                ).map((point: string, index: number) => (
                  <div key={index} className={`flex items-start gap-3`}>
                    <div className="w-2 h-2 bg-zinc-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-md text-zinc-400">{point}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`transition-all duration-1000 delay-200 ${
                aboutVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <h3 className="text-2xl font-semibold text-zinc-100 my-6 mt-10">
                {t("about.tech_stack_title")}
              </h3>

              <div className="mt-10 flex flex-wrap gap-3 ">
                {techStack.map((tech, index) => (
                  <span
                    key={index}
                    className={`flex items-center px-4 py-2 font-bold rounded-lg bg-neutral-100 text-neutral-900 text-sm shadow`}
                  >
                    {tech.comingSoon && (
                      <span className="text-xs text-neutral-900 bg-neutral-100 border border-neutral-900 rounded-full px-2 py-1 mr-2">
                        {t("about.coming_soon")}
                      </span>
                    )}
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>

            {/* What I'm Looking For Section */}
            <div
              className={`transition-all duration-1000 delay-400 ${
                aboutVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <h3 className="text-2xl font-semibold text-zinc-100 mb-6">
                {t("about.looking_for_title")}
              </h3>

              <div className="space-y-4">
                {(
                  t("about.looking_for_points", {
                    returnObjects: true,
                  }) as Array<{ title: string; description: string }>
                ).map((point, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 transition-opacity duration-700 delay-${
                      1200 + index * 200
                    } ${aboutVisible ? "opacity-100" : "opacity-0"}`}
                  >
                    <div className="w-2 h-2 bg-zinc-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium text-zinc-100 text-md">
                        {point.title}
                      </p>
                      <p className="text-md text-zinc-400">
                        {point.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="lg:py-32 pt-16 px-4 sm:px-6 lg:px-8 overflow-hidden relative z-10"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-zinc-100 mb-12">
            {t("projects.title")}
          </h2>
          <div className="block md:hidden">
            {/* Mobile: Projects Grid */}
            <div className="grid grid-cols-1 gap-8">
              {projects.map((project) => (
                <div key={project.titleKey} className="w-full">
                  <div className="flex flex-col bg-zinc-900 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-zinc-800 relative">
                    <div className="flex mt-auto w-full justify-around items-center absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
                      {project.viewProject && (
                        <a
                          href={project.viewProject}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <InteractiveHoverButton
                            size="sm"
                            className=" text-zinc-400 hover: hover:scale-105"
                          >
                            {t("projects.view_project")}
                          </InteractiveHoverButton>
                        </a>
                      )}
                      {project.sourceCode && (
                        <a
                          href={project.sourceCode}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            size="md"
                            className="text-zinc-400 hover:underline text-sm font-medium"
                          >
                            {t("projects.source_code")}
                          </Button>
                        </a>
                      )}
                    </div>
                    <div className="relative rounded-[inherit] p-2 flex flex-col">
                      <div className="absolute inset-0 rounded-[inherit] bg-border" />
                      <div className="absolute inset-px rounded-[inherit] bg-background" />
                      <div className="relative">
                        <div className="h-48 w-full flex items-center justify-center overflow-hidden rounded-lg mb-4">
                          <Image
                            src={project.image}
                            alt={t(project.titleKey)}
                            className="w-full h-full object-contain rounded-lg"
                            width={500}
                            height={500}
                            quality={100}
                          />
                        </div>
                        <div className="flex flex-col flex-1 p-6 pt-0">
                          <h3 className="text-xl font-semibold text-zinc-100 mb-3">
                            {t(project.titleKey)}
                          </h3>
                          <p className="text-zinc-400 mb-4">
                            {t(project.descriptionKey)}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-16">
                            {project.tech.map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1 bg-zinc-800 text-zinc-300 text-sm rounded-full border border-zinc-700"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Desktop: Projects Grid */}
          <div className="relative px-4 sm:px-8 md:px-12 lg:px-16 hidden md:block">
            {/* Prev Arrow */}
            <button
              type="button"
              aria-label="Previous projects"
              onClick={handlePrev}
              className="hidden md:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-30 h-10 w-10 rounded-full bg-zinc-800/70 hover:bg-zinc-700 text-zinc-200 border border-zinc-700"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Next Arrow */}
            <button
              type="button"
              aria-label="Next projects"
              onClick={handleNext}
              className="hidden md:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-30 h-10 w-10 rounded-full bg-zinc-800/70 hover:bg-zinc-700 text-zinc-200 border border-zinc-700"
            >
              <ChevronRight size={20} />
            </button>

            <div
              key={currentSlide}
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch md:justify-items-center overflow-hidden ${
                navDirection === "right"
                  ? "animate-slide-in-right"
                  : "animate-slide-in-left"
              }`}
            >
              {slides[currentSlide]?.map((project) => (
                <div key={project.titleKey} className="w-full max-w-md h-full">
                  <div className="flex flex-col h-[580px] bg-zinc-900 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-zinc-800 relative">
                    <div className="flex mt-auto w-full justify-around items-center absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
                      {project.viewProject && (
                        <a
                          href={project.viewProject}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <InteractiveHoverButton
                            size="sm"
                            className=" text-zinc-400 hover: hover:scale-105"
                          >
                            {t("projects.view_project")}
                          </InteractiveHoverButton>
                        </a>
                      )}
                      {project.sourceCode && (
                        <a
                          href={project.sourceCode}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            size="md"
                            className="text-zinc-400 hover:underline text-sm font-medium"
                          >
                            {t("projects.source_code")}
                          </Button>
                        </a>
                      )}
                    </div>

                    <div className="relative rounded-[inherit] p-2 flex flex-col h-full">
                      <div className="absolute inset-0 rounded-[inherit] bg-border" />
                      <div className="absolute inset-px rounded-[inherit] bg-background" />
                      <div className="relative">
                        <div className="h-48 w-full flex items-center justify-center overflow-hidden rounded-lg mb-4">
                          <Image
                            src={project.image}
                            alt={t(project.titleKey)}
                            className="w-full h-full object-contain rounded-lg"
                            width={500}
                            height={500}
                            quality={100}
                          />
                        </div>
                        <div className="flex flex-col flex-1 p-6 pt-0">
                          <h3 className="text-xl font-semibold text-zinc-100 mb-3">
                            {t(project.titleKey)}
                          </h3>
                          <p className="text-zinc-400 mb-4 flex-1 whitespace-pre-line">
                            {t(project.descriptionKey)}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-16">
                            {project.tech.map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1 bg-zinc-800 text-zinc-300 text-sm rounded-full border border-zinc-700"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="pt-32 pb-8 px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-zinc-100 mb-8">
            {t("contact.title")}
          </h2>
          <div className="flex justify-center items-center gap-12">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/ricardo-gonçalves-986780267"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group hover:scale-105 transition-transform"
              aria-label="LinkedIn"
            >
              <FaLinkedin
                className="text-white-400 mb-2 group-hover:text-white-300 transition-colors"
                size={28}
              />
              <span className="text-sm text-zinc-400 group-hover:text-zinc-100 transition-colors">
                {t("contact.linkedin")}
              </span>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/ric2003"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group hover:scale-105 transition-transform"
              aria-label="GitHub"
            >
              <FaGithub
                className="text-zinc-300 mb-2 group-hover:text-zinc-100 transition-colors"
                size={28}
              />
              <span className="text-sm text-zinc-400 group-hover:text-zinc-100 transition-colors">
                {t("contact.github")}
              </span>
            </a>

            {/* Email */}
            <a
              href="mailto:ricgon20035@gmail.com"
              className="flex flex-col items-center group hover:scale-105 transition-transform"
              aria-label="Email"
            >
              <Mail
                className="text-white-400 mb-2 group-hover:text-white-300 transition-colors"
                size={28}
              />
              <span className="text-sm text-zinc-400 group-hover:text-zinc-100 transition-colors">
                {t("contact.email")}
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
