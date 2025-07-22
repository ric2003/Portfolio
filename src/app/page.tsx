"use client";

import Image from "next/image";
import { ButtonBorderBeam } from "@/components/ui/button-BorderBeam";
import { AuroraText } from "@/components/magicui/aurora-text";
import { Button } from "@/components/ui/button";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { Home as HomeIcon, User, Briefcase, Mail, Download, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { MagicCard } from "@/components/magicui/magic-card";
import { Particles } from "@/components/magicui/particles";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { FaLinkedin, FaGithub } from 'react-icons/fa';


const techStack = [
  { name: 'React' },
  { name: 'Next.js' },
  { name: 'JavaScript' },
  { name: 'Java' },
  { name: 'Kotlin' },
  { name: 'Flutter' },
  { name: 'Dart' },
  { name: 'React Native', comingSoon: true },
];

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const y = element.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
};

const navigationItems = [
  { id: 'hero', label: 'Home', icon: HomeIcon },
  { id: 'about', label: 'About', icon: User },
  { id: 'projects', label: 'Projects', icon: Briefcase },  
];

export default function Home() {
  const [activeSection, setActiveSection] = useState('hero');
  const [aboutVisible, setAboutVisible] = useState(false);

  useEffect(() => {
    const sections = ['hero', 'about', 'projects'];
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
          if (entry.target.id === 'about') {
            setAboutVisible(true);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-gray-50 dark:from-zinc-950 dark:to-gray-950 relative">
      {/* Particles Background */}
      <Particles 
        className="absolute inset-0 z-0"
        quantity={100}
        staticity={50}
        ease={50}
        size={2}
        color="#ffffff"
        vx={0}
        vy={0}
      />
      
      {/* Magic UI Dock Navigation */}
      <nav className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50">
        <Dock 
          className="bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-zinc-800/20 h-20 px-4"
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
                    ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400' 
                    : 'text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50'
                }`}
                onClick={() => scrollToSection(item.id)}
              >
                <div className="flex flex-col items-center justify-center gap-1 px-2 py-1">
                  <IconComponent size={22} />
                  <span className="text-xs font-medium whitespace-nowrap">{item.label}</span>
                </div>
                
                {/* Tooltip for better UX */}
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-zinc-900 dark:bg-zinc-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                  {item.label}
                </div>
              </DockIcon>
            );
          })}
          
          {/* Separator */}
          <div className="h-16 w-px bg-zinc-300 dark:bg-zinc-600 mx-2" />
          
          {/* Download CV Button */}
          <DockIcon
            className="text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-all duration-300 group relative min-w-[100px]"
          >
            <div className="flex flex-col items-center justify-center gap-1 px-2 py-1">
              <Download size={22} />
              <span className="text-xs font-medium whitespace-nowrap">Download CV</span>
            </div>
            
            {/* Tooltip */}
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-zinc-900 dark:bg-zinc-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              Download CV
            </div>
          </DockIcon>
        </Dock>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center relative overflow-hidden z-10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-8 order-2 lg:order-1">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <MapPin size={16}/>
                  Based in Cascais, Lisbon
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
                  Hi, I'm <br />
                  <AuroraText speed={3}>Ricardo Gonçalves</AuroraText>
                </h1>
                <p className="text-2xl sm:text-2xl text-zinc-600 dark:text-zinc-400 font-medium">
                  Computer Engineering Graduate
                </p>
                <p className="text-xl text-zinc-500 dark:text-zinc-500 max-w-lg leading-relaxed">
                I’m focused on web and mobile development, ready to grow my skills and make meaningful contributions to projects.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <ButtonBorderBeam text="View My Projects" size="xl" onClick={() => scrollToSection("projects")}/>
                <Button size="xl" className="group border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                  <span className="flex items-center gap-2">
                    <Download size={22} />
                    Download CV
                  </span>
                </Button>
              </div>
              <div className="flex gap-4 items-center">
                <p className="text-zinc-600 dark:text-zinc-400">Find me on:</p>
                <a
                  href="https://www.linkedin.com/in/ricardo-gonçalves-986780267"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  <div className="absolute inset-0 bg-gray-500 rounded-sm w-1 h-1 top-20 left-30"></div>  {/* this is an easter egg*/}
                
                  <div className="absolute flex items-center justify-center w-6 h-6 bg-white ml-8"></div>
                  
                  <FaLinkedin className="absolute text-blue-600 ml-8 hover:text-blue-800" size={32}/>
                </a>
                
                <a
                  href="https://github.com/ric2003"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6e5494] dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 transition-colors pl-8"
                >
                  <FaGithub size={32} />
                </a>
                  <a
                  href="mailto:ricgon20035@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-600 dark:text-white hover:text-zinc-900 dark:hover:text-zinc-400 transition-colors "
                >
                  <Mail className="text-white-600 dark:text-white-400 group-hover:text-zinc-100 dark:group-hover:text-zinc-100 transition-colors" size={32}/>
                </a>

              </div>
            </div>
            
            {/* Image Side */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative group">
                {/* Main Image Container */}
                <div className="relative w-96 h-96 lg:w-[500px] lg:h-[500px] mx-auto">
                  {/* Animated Border */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl rotate-6 group-hover:rotate-12 transition-transform duration-700 opacity-75"></div>
                  
                  {/* Image Container */}
                  <div className="relative w-full h-full bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl transform -rotate-6 group-hover:rotate-0 transition-transform duration-700">
                    <Image 
                      src="/unnamed-removebg.png" 
                      alt="Ricardo Gonçalves" 
                      width={500} 
                      height={500}
                      className="w-full h-full object-contain"
                    />
                                         
                     {/* Overlay Gradient for the imgs*/}
                     <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-zinc-950 via-transparent to-transparent" style={{
                       background: 'linear-gradient(to top, var(--background) 0%, transparent 30%)'
                     }}></div>
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl rotate-12 opacity-60 animate-pulse"></div>
                  <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl rotate-45 opacity-70 animate-pulse"></div>
                </div>
                
                {/* Code Block Decoration */}
                <div className="absolute top-4 -left-4 bg-zinc-900 dark:bg-zinc-800 p-4 rounded-lg shadow-lg transform rotate-12 opacity-90">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-green-400 text-xs font-mono">
                    console.log("Hello!")
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto left-1/2">
        
          <h2 className={`text-3xl font-bold text-center text-zinc-900 dark:text-zinc-100 mb-12 transition-opacity duration-1000 ${aboutVisible ? 'opacity-100' : 'opacity-0'}`}>
            About Me
          </h2>
          
          
          <div className="space-y-12">
            {/* Background Section */}
            <div className={`transition-all duration-1000 delay-200 ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

              <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-6">Background</h3>
              
              <p className="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed text-lg">
                I got into programming through my <strong className="text-zinc-900 dark:text-zinc-100">Bachelor in Computer Engineering</strong> but web and mobile development is what really stuck with me.
              </p>
              
              <div className="space-y-4">
                <div className={`flex items-start gap-3 transition-opacity duration-700 delay-400 ${aboutVisible ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="w-2 h-2 bg-zinc-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-md text-zinc-600 dark:text-zinc-400">Co-developed a water management system for Portuguese reservoirs, designed for farmers and water researchers, now proposed for a European initiative.</p>
                  </div>
                </div>
                
                <div className={`flex items-start gap-3 transition-opacity duration-700 delay-600 ${aboutVisible ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="w-2 h-2 bg-zinc-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-md text-zinc-600 dark:text-zinc-400">Exploring React Native for mobile app development as a side project to expand my skillset.</p>
                  </div>
                </div>
                
                <div className={`flex items-start gap-3 transition-opacity duration-700 delay-800 ${aboutVisible ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="w-2 h-2 bg-zinc-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-md text-zinc-600 dark:text-zinc-400">Fluent in English (native) and Portuguese, enabling me to work in diverse environments.</p>
                  </div>
                </div>
              </div>

              
              <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 my-6">I've Worked with</h3>
              {/* Tech Stack Bar */}
              <div className="mt-10 flex flex-wrap gap-3 ">
                {techStack.map((tech, index) => (
                  <span key={index} className={`flex items-center px-4 py-2 font-bold rounded-lg bg-neutral-900 dark:bg-neutral-100 text-neutral-100 dark:text-neutral-900 text-sm shadow`}>
                    {tech.comingSoon && <span className="text-xs text-neutral-100 dark:text-neutral-900 bg-neutral-900 dark:bg-neutral-100 border border-neutral-900 dark:border-neutral-900 rounded-full px-2 py-1 mr-2">Working on</span>}
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
            
            {/* What I'm Looking For Section */}
            <div className={`transition-all duration-1000 delay-1000 ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-6">What I'm Looking For</h3>
              
              <div className="space-y-4">
                <div className={`flex items-start gap-3 transition-opacity duration-700 delay-1200 ${aboutVisible ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="w-2 h-2 bg-zinc-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-zinc-900 dark:text-zinc-100 text-md">Internship Opportunities</p>
                    <p className="text-md text-zinc-600 dark:text-zinc-400">Gain hands-on experience in real projects</p>
                  </div>
                </div>
                
                <div className={`flex items-start gap-3 transition-opacity duration-700 delay-1400 ${aboutVisible ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="w-2 h-2 bg-zinc-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-zinc-900 dark:text-zinc-100 text-md">Entry-Level Positions</p>
                    <p className="text-md text-zinc-600 dark:text-zinc-400">Web or mobile development roles to kickstart my career</p>
                  </div>
                </div>
                
                <div className={`flex items-start gap-3 transition-opacity duration-700 delay-1600 ${aboutVisible ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="w-2 h-2 bg-zinc-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-zinc-900 dark:text-zinc-100 text-md">Development Projects</p>
                    <p className="text-md text-zinc-600 dark:text-zinc-400">Opportunities to contribute and grow my skills</p>
                  </div>
                </div>
                
                <div className={`flex items-start gap-3 transition-opacity duration-700 delay-1800 ${aboutVisible ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="w-2 h-2 bg-zinc-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-zinc-900 dark:text-zinc-100 text-md">Ready to Add Value</p>
                    <p className="text-md text-zinc-600 dark:text-zinc-400">Eager to work, learn, and contribute meaningfully</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-4 sm:px-6 lg:px-8 overflow-hidden relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-zinc-900 dark:text-zinc-100 mb-12">
            My Projects
          </h2>
          <div className="relative grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Water Wise",
                description: "Co-developed a geospatial platform for managing Portuguese reservoirs, designed to support farmers and water researchers with real-time data and soon decision-making tools.",
                tech: ["React", "Next.js", "InfluxDB", "Tailwind CSS", "Mapbox", "Leaflet", "Recharts", "Clerk", "Convex"],
                image: "/waterwisedark.png",
                viewProject: "https://water-wise-one.vercel.app/",
                sourceCode: "https://github.com/Acr2004/water-wise"
              },
              {
                title: "Yoke - Fitness App",
                description: "Co-developing a mobile fitness app as a side project with a friend to track workouts, nutrition, and progress, featuring exercise libraries and customizable meal planning.",
                tech: ["React Native", "TypeScript", "Node.js"],
                image: "/yoke.png",
                sourceCode: "https://github.com/Acr2004/yoke-gym-app"
              },
              {
                title: "SNS Hospitals App",
                description: "Co-developed a mobile app to help users find and evaluate hospitals in Portugal, featuring real-time hospital data, interactive maps, and offline support.",
                tech: ["Flutter", "Dart", "Google Maps", "SQLite", "Provider"],
                image: "/flutter-sns-app.png",
                sourceCode: "https://github.com/ric2003/flutter-App-SNS-Hospitais"
              },
            ].map((project, index) => (
              <div key={index} className="flex flex-col h-full bg-zinc-50 dark:bg-zinc-900 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-zinc-200 dark:border-zinc-800 relative">
                {/* Red circle at bottom left corner of card */}
                
                <div className="flex mt-auto w-full justify-around absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
                {project.viewProject && (
                  <a href={project.viewProject} target="_blank" rel="noopener noreferrer">
                    <InteractiveHoverButton size="sm" className="hover: hover:scale-105">
                      View Project
                    </InteractiveHoverButton>
                  </a>
                  )}
                  {project.sourceCode && (
                    <a href={project.sourceCode} target="_blank" rel="noopener noreferrer">
                      <Button size="md" className="text-zinc-600 dark:text-zinc-400 hover:underline text-sm font-medium">
                        Source Code
                      </Button>
                    </a>
                  )}
                </div>
                
                <MagicCard gradientColor="#262626" className="p-2 flex flex-col h-full">
                  <div className="h-48 w-full flex items-center justify-center overflow-hidden rounded-lg mb-4">
                    <Image 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-contain rounded-lg" 
                      width={500} 
                      height={500} 
                      quality={100}
                    />
                  </div>
                  <div className="flex flex-col flex-1 p-6 pt-0">
                    <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                      {project.title}
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-4 flex-1">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-16">
                      {project.tech.map((tech) => (
                        <span 
                          key={tech}
                          className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 text-sm rounded-full border border-zinc-200 dark:border-zinc-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                  </div>
                </MagicCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="pt-32 pb-8 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-8">
            Let's Connect
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
              <FaLinkedin className="text-white-600 dark:text-white-400 mb-2 group-hover:text-white-700 dark:group-hover:text-white-300 transition-colors" size={28} />
              <span className="text-sm text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">LinkedIn</span>
            </a>
            
            {/* GitHub */}
            <a
              href="https://github.com/ric2003"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group hover:scale-105 transition-transform"
              aria-label="GitHub"
            >
              <FaGithub className="text-zinc-700 dark:text-zinc-300 mb-2 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors" size={28} />
              <span className="text-sm text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">GitHub</span>
            </a>
            
            {/* Email */}
            <a
              href="mailto:ricgon20035@gmail.com"
              className="flex flex-col items-center group hover:scale-105 transition-transform"
              aria-label="Email"
            >
              <Mail className="text-white-600 dark:text-white-400 mb-2 group-hover:text-white-700 dark:group-hover:text-white-300 transition-colors" size={28} />
              <span className="text-sm text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">Email</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
