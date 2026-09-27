// English translations.
// Kept as a TS module instead of raw JSON because Turbopack HMR cannot
// reliably hot-update JSON modules imported into the client bundle.
const translation = {
  language_label: "Language",
  navigation: {
    home: "Home",
    about: "About",
    experience: "Work Experience",
    projects: "Projects",
    contact: "Contact",
    label: "Main navigation",
  },
  hero: {
    hi: "Hi, I'm",
    location: "Cascais, Lisbon",
    title: "Software Engineer",
    description: "I work at Critical TechWorks on an automotive Android project.",
    view_projects: "View My Projects",
    download_cv: "Download CV",
    find_me: "Find me on:",
    hello: "Hello!",
  },
  about: {
    title: "About Me",
    description:
      "I studied Computer Engineering and now work as a software engineer at Critical TechWorks. Most of the projects below come from my time at university, when I was exploring web and mobile development and learning how to turn an idea into a working product.",
    tech_stack_title: "Technologies",
    work_tab: "I work with",
    projects_tab: "I've built with",
    android_tooling: "Android tooling",
  },
  experience: {
    title: "Experience",
    items: [
      {
        role: "Junior Android Fullstack Developer",
        company: "Critical TechWorks",
        period: "Nov 2025 - Present",
        description:
          "I contribute to an automotive Android project as part of a software engineering team.",
      },
    ],
  },
  education: {
    title: "Education",
    items: [
      {
        degree: "Bachelor's degree in Computer Engineering",
        institution: "Universidade Lusófona",
        period: "Sep 2022 - Jul 2025",
      },
    ],
  },
  projects: {
    title: "My Projects",
    view_project: "View Project",
    source_code: "Source Code",
    website: "Website",
    source: "Source",
    collaborator_repository:
      "This was a collaborative project. The repository is hosted on my university friend's GitHub account.",
    items: [
      {
        title: "Water Wise",
        description:
          "My final-year Computer Engineering project, built with a classmate. A web platform that brings reservoir, weather station and satellite data for water management in Portugal into one map-based interface.",
      },
      {
        title: "Yoke - Fitness App",
        description:
          "Co-developing a mobile fitness app as a side project with a friend to track workouts, nutrition, and progress, featuring exercise libraries and customizable meal planning.",
      },
      {
        title: "SNS Hospitals App",
        description:
          "A Flutter app for Portugal's public hospitals, built with a classmate for a university class, across two phases. Beyond the required features, we focused on a clean architecture and on an app that keeps working offline.",
      },
      {
        title: "Live Notes App",
        description:
          "A shared board where people leave notes and see everyone's changes as they happen, built to explore Firebase's real-time WebSockets after trying Convex.",
      },
      {
        title: "Emoji Puzzle App",
        description:
          "Game to guess the title from emoji combinations. Features categories like Games, Movies, and Music, difficulty levels, progressive hints, feedback, and option to skip to another puzzle.",
      },
      {
        title: "Kart Island",
        description:
          "A multiplayer 3D kart racing game for desktop browsers, built with AI as a personal project. Up to four racers share a private room across six circuits, with computer drivers filling any empty spots.",
      },
    ],
  },
  contact: {
    title: "Let's Connect",
    linkedin: "LinkedIn",
    github: "GitHub",
    email: "Email",
    email_me: "Email me",
    description:
      "Feel free to reach out if you want to connect or discuss a project.",
  },
  footer: {
    rights: "All rights reserved.",
  },
  buttons: {
    show_more: "Show More",
    show_less: "Show Less",
    view_details: "View details",
  },
  theme: {
    toggle: "Toggle color theme",
  },
};

export default translation;
