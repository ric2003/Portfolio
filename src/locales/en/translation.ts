// English translations.
// Kept as a TS module instead of raw JSON because Turbopack HMR cannot
// reliably hot-update JSON modules imported into the client bundle.
const translation = {
  opens_in_new_tab: " (opens in a new tab)",
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
    play_preview: "Play preview",
    pause_preview: "Pause preview",
    visit_site: "Visit site",
    show_details: "Show details",
    try_game: "Try game",
    desktop_only: "Only works on computer",
    back: "All projects",
    role: "Role",
    team: "Team",
    context: "Context",
    stack: "Stack",
    next: "Next project",
    previous: "Previous project",
    visit_project: "Visit {{title}}",
    try_project: "Try {{title}}",
    view_source: "View source",
    title: "My Projects",
    view_project: "View Project",
    source_code: "Source Code",
    website: "Website",
    source: "Source",
    final_report: "Read the final report",
    final_report_language: "PDF in Portuguese",
    collaborator_repository:
      "This was a collaborative project. The repository is hosted on my university friend's GitHub account.",
    items: {
      "water-wise": {
        role: "Co-developer",
        team: "2 people",
        context: "Final-year project",
        story: [
          "Water Wise was my final-year project in Computer Engineering at Universidade Lusófona, a decision-support platform to help farmers, water managers and researchers follow the state of Portugal's reservoirs. I built it with a classmate, starting from a Figma prototype and working in sprints on Trello. We mostly built it together, sometimes each taking charge of a page, reviewing each other's code and designing the interface side by side.",
          "The project came from the university's Faculty of Engineering, as the web platform of a wider European water management proposal. Two professors supervised us, and our contact at the Faculty of Engineering, an expert in time-series data, acted as our stakeholder, explaining what the platform needed and helping us get the data. After we finished, the platform was renamed Harmonia and presented and approved as part of that European initiative.",
          "The data comes from several places, including a weather station API, telemetry in InfluxDB, satellite imagery and other groups' predictive models. Station and database requests go through Next.js API routes, so credentials stay on the server. On the client, React Query caches data in IndexedDB so returning to a page is instant, Convex powers real-time alerts, Clerk handles sign-in, and the interface works in English and Portuguese.",
          "We tested it through two rounds of surveys with people who work in this area and would use a platform like it.",
        ],
        title: "Water Wise",
        subtitle: "Water data across Portugal",
        description:
          "My final-year Computer Engineering project, built with a classmate. A web platform that brings reservoir, weather station and satellite data for water management in Portugal into one map-based interface.",
      },
      yoke: {
        role: "Co-developer",
        team: "2 people",
        context: "Side project",
        story: [
          "Yoke started during my final year at university, around the time our classes were introducing Flutter. My friend and I were convinced React Native was the better choice, and since we were already writing React every day in Next.js for our final-year project, it felt familiar from the first screen.",
          "We planned a full fitness app covering workouts, nutrition, history and progress, and built it with Expo and Expo Router, with a tab for each area. The part we took furthest was the exercise library, a filterable catalogue with a detail page for every exercise, where people can also add their own exercises and keep them on their phone.",
        ],
        title: "Yoke - Fitness App",
        subtitle: "A fitness app prototype",
        description:
          "A fitness app for workouts, nutrition and progress, built with a friend in React Native. We picked it over Flutter because we were already working in React every day.",
      },
      "sns-hospitals": {
        role: "Co-developer",
        team: "2 people",
        context: "University class",
        story: [
          "I built this with a classmate for a mobile development class at university, over two phases, each with its own set of requirements. We mostly built it together. Sometimes one of us took charge of a screen or of getting a specific test to pass, but we reviewed each other's code, suggested improvements, and designed the interface by pitching ideas for what to add and how to present the information.",
          "We used the Repository pattern in a layered architecture. The interface only talks to a repository, which gets hospital information from the SNS API and falls back to the data saved in a local SQLite database when there’s no internet connection, so users can still view it offline. This also keeps the business logic out of the widgets.",
          "Dependencies are injected with Provider, a widely used approach in Flutter. The data sources and device services, like location and connectivity, are defined as interfaces and registered once at startup, and screens get them from the widget tree instead of creating them.",
        ],
        title: "SNS Hospitals App",
        subtitle: "Hospital information, offline",
        description:
          "A Flutter app for Portugal's public hospitals, built with a classmate for a university class, across two phases. Beyond the required features, we focused on a clean architecture and on an app that keeps working offline.",
      },
      "live-notes": {
        role: "Developer",
        team: "Solo",
        context: "Personal project",
        story: [
          "After using Convex in my final-year project, I wanted to explore Firebase for real-time collaboration. I built Live Notes as a simple shared board, then used AI to help grow it into a canvas with draggable notes, zooming, panning and a minimap.",
          "The main challenge was handling several people making changes at once. Everyone sees updates as they happen, conflicting edits are caught before they overwrite someone else’s work, and unsaved changes are kept so they aren’t lost when the page closes.",
          "People can join as guests or sign in with Google, making it easy to try the board and start collaborating.",
        ],
        title: "Live Notes App",
        subtitle: "A shared board for notes",
        description:
          "A shared board where people leave notes and see everyone's changes as they happen, built to explore Firebase's real-time WebSockets after trying Convex.",
      },
      "emoji-puzzle": {
        role: "Developer",
        team: "Solo",
        context: "Personal project",
        story: [
          "Yoke turned out to be really ambitious, so I wanted to try React Native again with something small enough to finish. Emoji Puzzle is a guessing game where each puzzle is a row of emojis hiding the title of a game, movie or song.",
          "The trickiest part was deciding when a guess counts. Instead of demanding an exact match, the answer checker compares the guess word by word and tolerates small differences like plurals or verb endings, so it can reply Correct, Near or Wrong. Hints reveal the category first and then more of the answer after each miss, stats and streaks are saved on the phone, and the game logic lives in a hook and a context, separate from the screens.",
        ],
        title: "Emoji Puzzle App",
        subtitle: "Guess the title from emojis",
        description:
          "A small emoji guessing game in React Native, built to finish something simple after an ambitious fitness app. Guess the game, movie or song hidden in each row of emojis.",
      },
      "racing-game": {
        role: "Development with AI",
        team: "Solo",
        context: "Personal project",
        story: [
          "I built Kart Island with AI to see how far I could take a real-time multiplayer game as a personal project. Its server runs on a Raspberry Pi that I use as my own server.",
          "One of the challenges was keeping the race responsive while making sure everyone sees a consistent result. The server decides what happens in the race, while each player’s browser keeps their kart moving smoothly despite network delays. Computer-controlled drivers fill empty places so you can race without gathering a full group.",
          "I also used the project to experiment with AI beyond writing code. As its ability to create objects in Blender improved, I used it to add more 3D models to the world.",
        ],
        title: "Kart Island",
        subtitle: "Multiplayer kart racing",
        description:
          "A multiplayer 3D kart racing game for desktop browsers, built with AI as a personal project. Up to four racers share a private room across six circuits, with computer drivers filling any empty spots.",
      },
    },
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
