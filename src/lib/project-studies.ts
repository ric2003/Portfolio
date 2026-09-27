import en from "@/locales/en/translation";
import pt from "@/locales/pt/translation";
import type { Project } from "./projects";

type Study = { role: string; team?: string; context?: string; story: string[] };

const studies: Record<string, Record<"en" | "pt", Study>> = {
  "racing-game": {
    en: { role: "Development with AI", story: ["Keeping a race in sync across 2 to 4 desktop browsers while rendering a 3D circuit and handling boosts and power-ups.", "React and Three.js handle the browser experience. A Node.js server synchronizes private-room races over WebSockets, with six circuits to choose from."] },
    pt: { role: "Desenvolvimento com IA", story: ["Sincronizar uma corrida entre 2 a 4 browsers de computador, enquanto se apresenta um circuito 3D com turbos e power-ups.", "React e Three.js tratam da experiência no browser. Um servidor Node.js sincroniza as corridas em salas privadas através de WebSockets, com seis circuitos disponíveis."] },
  },
  "water-wise": {
    en: { role: "Co-developer", team: "2 people", context: "Final-year project", story: ["Water Wise, later renamed Harmonia, was my final-year project in Computer Engineering at Universidade Lusófona. I built it with a classmate during my final year, guided by two supervisors, starting from a Figma prototype and planning the work in sprints on a Trello board.", "The data comes from several places, a weather station API, an InfluxDB time-series database fed by spreadsheets that users upload, and Sentinel satellite imagery. We routed the station and database requests through Next.js API routes, so the credentials stay on the server and the front end works with one consistent set of endpoints.", "On the client, React Query handles fetching and caching, and the cache is persisted in IndexedDB so returning to a page is instant. Alerts and notifications run on Convex for real-time updates, Clerk handles sign-in, and the whole interface works in English and Portuguese, in light and dark mode."] },
    pt: { role: "Co-desenvolvimento", team: "2 pessoas", context: "Projeto final de licenciatura", story: ["O Water Wise, mais tarde renomeado Harmonia, foi o meu projeto final de licenciatura em Engenharia Informática na Universidade Lusófona. Desenvolvi-o com um colega de curso durante o último ano da licenciatura, com a orientação de dois professores, a partir de um protótipo em Figma e com o trabalho planeado em sprints num quadro Trello.", "Os dados vêm de várias fontes, uma API de estações meteorológicas, uma base de dados de séries temporais em InfluxDB alimentada por folhas de cálculo que os utilizadores carregam, e imagens de satélite do Sentinel. Encaminhámos os pedidos às estações e à base de dados através de API routes do Next.js, para que as credenciais fiquem no servidor e o front end trabalhe com um conjunto único e consistente de endpoints.", "No cliente, o React Query trata dos pedidos e da cache, e a cache é guardada em IndexedDB para que voltar a uma página seja instantâneo. Os alertas e as notificações funcionam em Convex com atualizações em tempo real, o Clerk trata da autenticação, e toda a interface está disponível em português e inglês, em modo claro e escuro."] },
  },
  yoke: {
    en: { role: "Co-developer", team: "2 people", context: "Side project", story: ["Bringing workout tracking, nutrition and progress into one mobile app while allowing people to adapt their routines and meals.", "A side project with a friend, built with React Native, TypeScript and Node.js. The app combines exercise libraries and customizable meal planning with workout and progress tracking."] },
    pt: { role: "Co-desenvolvimento", team: "2 pessoas", context: "Projeto paralelo", story: ["Reunir treinos, nutrição e progresso numa aplicação móvel, permitindo adaptar rotinas e refeições.", "Um projeto paralelo com um amigo, feito com React Native, TypeScript e Node.js. A aplicação combina bibliotecas de exercícios e planeamento de refeições personalizável com o acompanhamento de treinos e progresso."] },
  },
  "emoji-puzzle": {
    en: { role: "Developer", story: ["Keeping emoji guessing puzzles playable across different difficulty levels without leaving players stuck on a single answer.", "A React Native and Expo game with Games, Movies and Music categories. Progressive hints, answer feedback and a skip option help players move through puzzles."] },
    pt: { role: "Desenvolvimento", story: ["Criar puzzles de emojis com vários níveis de dificuldade sem deixar os jogadores presos numa resposta.", "Um jogo em React Native e Expo com categorias de Jogos, Filmes e Música. Dicas progressivas, feedback e a opção de saltar ajudam os jogadores a avançar."] },
  },
  "live-notes": {
    en: { role: "Developer", story: ["Letting people create, move and edit notes together on a zoomable canvas while seeing who else is present.", "Next.js and Firebase support a collaborative notes app with real-time updates, live presence and authenticated sessions."] },
    pt: { role: "Desenvolvimento", story: ["Permitir criar, mover e editar notas em conjunto num canvas com zoom, mostrando quem está presente.", "Next.js e Firebase suportam uma aplicação de notas colaborativa com atualizações em tempo real, presenças em direto e sessões autenticadas."] },
  },
  "sns-hospitals": {
    en: { role: "Co-developer", team: "2 people", context: "University class", story: ["I built this with a classmate for a mobile development class at university, over two phases, each with its own set of requirements.", "We used the Repository pattern in a layered architecture. The interface only talks to a repository, which sits in front of two data sources, the SNS API and a local SQLite database, and decides which one to use based on connectivity. That keeps the app working offline and the business logic out of the widgets.", "Dependencies are injected with Provider, a widely used approach in Flutter. The data sources and device services, like location and connectivity, are defined as interfaces and registered once at startup, and screens get them from the widget tree instead of creating them. When we changed a data source or added features in the second phase, we only had to touch one layer, not the whole app."] },
    pt: { role: "Co-desenvolvimento", team: "2 pessoas", context: "Cadeira universitária", story: ["Desenvolvi esta aplicação com um colega de curso para uma cadeira de desenvolvimento mobile, ao longo de duas fases, cada uma com os seus requisitos.", "Usámos o padrão Repository numa arquitetura em camadas. A interface fala apenas com um repositório, que fica à frente de duas fontes de dados, a API do SNS e uma base de dados SQLite local, e decide qual usar consoante a conectividade. Assim, a aplicação continua a funcionar sem Internet e a lógica de negócio fica fora dos widgets.", "As dependências são injetadas com o Provider, uma abordagem muito usada em Flutter. As fontes de dados e os serviços do dispositivo, como a localização e a conectividade, são definidos como interfaces e registados uma vez no arranque, e os ecrãs obtêm-nos da árvore de widgets em vez de os criarem. Quando mudámos uma fonte de dados ou acrescentámos funcionalidades na segunda fase, bastou mexer numa camada, e não na aplicação inteira."] },
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
  en: { back: "All projects", role: "Role", team: "Team", context: "Context", stack: "Stack", gallery: "Screenshots", light: "Light theme", dark: "Dark theme", screen: "Application preview", full: "Open full-size screenshot", next: "Next project", previous: "Previous project", projects: "Projects", visitProject: (title: string) => `Visit ${title}`, tryProject: (title: string) => `Try ${title}`, source: "View source", collaboration: en.projects.collaborator_repository },
  pt: { back: "Todos os projetos", role: "Papel", team: "Equipa", context: "Contexto", stack: "Tecnologias", gallery: "Capturas de ecrã", light: "Tema claro", dark: "Tema escuro", screen: "Pré-visualização da aplicação", full: "Abrir captura em tamanho original", next: "Próximo projeto", previous: "Projeto anterior", projects: "Projetos", visitProject: (title: string) => `Visitar ${title}`, tryProject: (title: string) => `Experimentar ${title}`, source: "Ver código", collaboration: pt.projects.collaborator_repository },
};
