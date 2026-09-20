export type Project = {
  slug: string;
  titleKey: string;
  descriptionKey: string;
  tech: string[];
  image: string | { light: string; dark: string };
  preview?: { video: string; poster: string };
  viewProject?: string;
  sourceCode?: string;
  collaboratorRepository?: boolean;
};

export const projects: Project[] = [
  {
    slug: "racing-game",
    preview: { video: "/previews/racing-game.mp4", poster: "/previews/racing-game.webp" },
    titleKey: "projects.items.5.title",
    descriptionKey: "projects.items.5.description",
    tech: ["React", "Three.js", "TypeScript", "Node.js", "WebSockets"],
    image: "/racing-game.png",
    viewProject: "https://racing-game-sooty-eta.vercel.app/",
    sourceCode: "https://github.com/ric2003/racing-game",
  },
  {
    slug: "water-wise",
    preview: { video: "/previews/water-wise.mp4", poster: "/previews/water-wise.webp" },
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
    slug: "yoke",
    titleKey: "projects.items.1.title",
    descriptionKey: "projects.items.1.description",
    tech: ["React Native", "TypeScript", "Node.js"],
    image: "/yoke.webp",
    sourceCode: "https://github.com/Acr2004/yoke-gym-app",
    collaboratorRepository: true,
  },
  {
    slug: "emoji-puzzle",
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
    slug: "live-notes",
    preview: { video: "/previews/live-notes.mp4", poster: "/previews/live-notes.webp" },
    titleKey: "projects.items.3.title",
    descriptionKey: "projects.items.3.description",
    tech: ["Next.js", "Firebase"],
    image: "/noteApp.webp",
    viewProject: "https://live-update-notes.netlify.app/",
    sourceCode: "https://github.com/ric2003/notes-app",
  },
  {
    slug: "sns-hospitals",
    titleKey: "projects.items.2.title",
    descriptionKey: "projects.items.2.description",
    tech: ["Flutter", "Dart", "Google Maps"],
    image: "/flutter-sns-app.webp",
    sourceCode: "https://github.com/ric2003/flutter-App-SNS-Hospitais",
  },
];

