export type Project = {
  slug: string;
  tech: string[];
  image: string | { light: string; dark: string };
  preview?: { video?: string; webm?: string; poster: string; aspectRatio?: number };
  viewProject?: string;
  sourceCode?: string;
  finalReport?: string;
  collaboratorRepository?: boolean;
};

export const projects: Project[] = [
  {
    slug: "racing-game",
    preview: { webm: "/videos/racing-game.webm", poster: "/videos/racing-game.webp", aspectRatio: 16 / 10 },
    tech: ["React", "Three.js", "TypeScript", "Node.js", "WebSockets"],
    image: "/videos/racing-game.webp",
    viewProject: "https://play-kart-island.vercel.app/",
    sourceCode: "https://github.com/ric2003/racing-game",
  },
  {
    slug: "water-wise",
    preview: { webm: "/videos/water-wise.webm", poster: "/videos/water-wise.webp", aspectRatio: 16 / 10 },
    tech: ["Next.js", "TypeScript", "React Query", "InfluxDB", "Convex"],
    image: {
      light: "/waterwise_lightMode.webp",
      dark: "/waterwise_darkMode.webp",
    },
    viewProject: "https://water-wise-one.vercel.app/",
    sourceCode: "https://github.com/Acr2004/water-wise",
    finalReport: "/reports/water-wise-final-report-pt.pdf",
    collaboratorRepository: true,
  },
  {
    slug: "yoke",
    tech: ["React Native", "Expo", "TypeScript"],
    image: "/yoke.webp",
    sourceCode: "https://github.com/Acr2004/yoke-gym-app",
    collaboratorRepository: true,
  },
  {
    slug: "emoji-puzzle",
    tech: ["React Native", "Expo", "TypeScript"],
    image: {
      light: "/emojiPuzzle_lightMode.webp",
      dark: "/emojiPuzzle_darkMode.webp",
    },
    sourceCode: "https://github.com/ric2003/emoji-word-puzzle",
  },
  {
    slug: "live-notes",
    preview: { video: "/previews/live-notes.mp4", webm: "/videos/live-notes.webm", poster: "/videos/live-notes.webp", aspectRatio: 16 / 10 },
    tech: ["Next.js", "TypeScript", "Firebase"],
    image: "/noteApp.webp",
    viewProject: "https://live-update-notes.netlify.app/",
    sourceCode: "https://github.com/ric2003/notes-app",
  },
  {
    slug: "sns-hospitals",
    tech: ["Flutter", "Dart", "SQLite", "Google Maps"],
    image: "/flutter-sns-app.webp",
    sourceCode: "https://github.com/ric2003/flutter-App-SNS-Hospitais",
  },
];


/** Display order used by the homepage grid and case study navigation. */
export const projectOrder = ["racing-game", "water-wise", "live-notes", "yoke", "emoji-puzzle", "sns-hospitals"];
