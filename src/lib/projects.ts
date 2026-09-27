export type Project = {
  slug: string;
  titleKey: string;
  descriptionKey: string;
  tech: string[];
  image: string | { light: string; dark: string };
  preview?: { video?: string; webm?: string; poster: string; aspectRatio?: number };
  viewProject?: string;
  sourceCode?: string;
  collaboratorRepository?: boolean;
};

export const projects: Project[] = [
  {
    slug: "racing-game",
    preview: { webm: "/videos/racing-game.webm", poster: "/videos/racing-game.webp", aspectRatio: 16 / 10 },
    titleKey: "projects.items.5.title",
    descriptionKey: "projects.items.5.description",
    tech: ["React", "Three.js", "TypeScript", "Node.js", "WebSockets"],
    image: "/videos/racing-game.webp",
    viewProject: "https://play-kart-island.vercel.app/",
    sourceCode: "https://github.com/ric2003/racing-game",
  },
  {
    slug: "water-wise",
    preview: { webm: "/videos/water-wise.webm", poster: "/videos/water-wise.webp", aspectRatio: 16 / 10 },
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
    preview: { video: "/previews/live-notes.mp4", webm: "/videos/live-notes.webm", poster: "/videos/live-notes.webp", aspectRatio: 16 / 10 },
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


/** Display order used by the homepage grid and case study navigation. */
export const projectOrder = ["racing-game", "water-wise", "live-notes", "yoke", "emoji-puzzle", "sns-hospitals"];
