import en from "@/locales/en/translation";
import pt from "@/locales/pt/translation";
import type { Project } from "./projects";

const studies = {
  "racing-game": {
    en: { role: "Development with AI", challenge: "Keeping a race in sync across 2 to 4 desktop browsers while rendering a 3D circuit and handling boosts and power-ups.", approach: "React and Three.js handle the browser experience. A Node.js server synchronizes private-room races over WebSockets, with six circuits to choose from." },
    pt: { role: "Desenvolvimento com IA", challenge: "Sincronizar uma corrida entre 2 a 4 browsers de computador, enquanto se apresenta um circuito 3D com turbos e power-ups.", approach: "React e Three.js tratam da experiência no browser. Um servidor Node.js sincroniza as corridas em salas privadas através de WebSockets, com seis circuitos disponíveis." },
  },
  "water-wise": {
    en: { role: "Co-developer", challenge: "Making real-time data about Portuguese reservoirs accessible to farmers and water researchers in a geographical context.", approach: "A geospatial web platform built with React, Next.js, Tailwind CSS and Convex. The project brings reservoir data into a map-based interface, with decision-making tools planned as a next step." },
    pt: { role: "Co-desenvolvimento", challenge: "Tornar os dados em tempo real dos reservatórios portugueses acessíveis a agricultores e investigadores, num contexto geográfico.", approach: "Uma plataforma geoespacial feita com React, Next.js, Tailwind CSS e Convex. O projeto apresenta dados dos reservatórios numa interface com mapa, com ferramentas de apoio à decisão previstas como próximo passo." },
  },
  yoke: {
    en: { role: "Co-developer", challenge: "Bringing workout tracking, nutrition and progress into one mobile app while allowing people to adapt their routines and meals.", approach: "A side project with a friend, built with React Native, TypeScript and Node.js. The app combines exercise libraries and customizable meal planning with workout and progress tracking." },
    pt: { role: "Co-desenvolvimento", challenge: "Reunir treinos, nutrição e progresso numa aplicação móvel, permitindo adaptar rotinas e refeições.", approach: "Um projeto paralelo com um amigo, feito com React Native, TypeScript e Node.js. A aplicação combina bibliotecas de exercícios e planeamento de refeições personalizável com o acompanhamento de treinos e progresso." },
  },
  "emoji-puzzle": {
    en: { role: "Developer", challenge: "Keeping emoji guessing puzzles playable across different difficulty levels without leaving players stuck on a single answer.", approach: "A React Native and Expo game with Games, Movies and Music categories. Progressive hints, answer feedback and a skip option help players move through puzzles." },
    pt: { role: "Desenvolvimento", challenge: "Criar puzzles de emojis com vários níveis de dificuldade sem deixar os jogadores presos numa resposta.", approach: "Um jogo em React Native e Expo com categorias de Jogos, Filmes e Música. Dicas progressivas, feedback e a opção de saltar ajudam os jogadores a avançar." },
  },
  "live-notes": {
    en: { role: "Developer", challenge: "Letting people create, move and edit notes together on a zoomable canvas while seeing who else is present.", approach: "Next.js and Firebase support a collaborative notes app with real-time updates, live presence and authenticated sessions." },
    pt: { role: "Desenvolvimento", challenge: "Permitir criar, mover e editar notas em conjunto num canvas com zoom, mostrando quem está presente.", approach: "Next.js e Firebase suportam uma aplicação de notas colaborativa com atualizações em tempo real, presenças em direto e sessões autenticadas." },
  },
  "sns-hospitals": {
    en: { role: "Co-developer", challenge: "Helping people find and evaluate hospitals in Portugal, with access to hospital information even when offline.", approach: "A Flutter and Dart mobile app combining real-time hospital data, interactive Google Maps and offline support." },
    pt: { role: "Co-desenvolvimento", challenge: "Ajudar a encontrar e avaliar hospitais em Portugal, com acesso a informação hospitalar mesmo sem ligação à Internet.", approach: "Uma aplicação móvel em Flutter e Dart que combina dados hospitalares em tempo real, Google Maps interativos e suporte offline." },
  },
};

export function getProjectStudy(project: Project, language: "en" | "pt") {
  const translations = language === "pt" ? pt : en;
  const index = Number(project.titleKey.split(".")[2]);
  return {
    ...translations.projects.items[index],
    ...studies[project.slug as keyof typeof studies][language],
  };
}

export const studyLabels = {
  en: { back: "All projects", role: "My role", stack: "Stack", challenge: "The challenge", approach: "The approach", gallery: "Screenshots", light: "Light theme", dark: "Dark theme", screen: "Application preview", full: "Open full-size screenshot", next: "Next project", previous: "Previous project", projects: "Projects", visitProject: (title: string) => `Visit ${title}`, tryProject: (title: string) => `Try ${title}`, source: "View source", collaboration: en.projects.collaborator_repository },
  pt: { back: "Todos os projetos", role: "O meu papel", stack: "Tecnologias", challenge: "O desafio", approach: "A abordagem", gallery: "Capturas de ecrã", light: "Tema claro", dark: "Tema escuro", screen: "Pré-visualização da aplicação", full: "Abrir captura em tamanho original", next: "Próximo projeto", previous: "Projeto anterior", projects: "Projetos", visitProject: (title: string) => `Visitar ${title}`, tryProject: (title: string) => `Experimentar ${title}`, source: "Ver código", collaboration: pt.projects.collaborator_repository },
};
