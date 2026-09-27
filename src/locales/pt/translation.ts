// Portuguese (PT) translations.
// Kept as a TS module instead of raw JSON because Turbopack HMR cannot
// reliably hot-update JSON modules imported into the client bundle.
const translation = {
  language_label: "Idioma",
  navigation: {
    home: "Início",
    about: "Sobre",
    experience: "Experiência",
    projects: "Projetos",
    contact: "Contacto",
    label: "Navegação principal",
  },
  hero: {
    hi: "Olá, sou o",
    location: "Cascais, Lisboa",
    title: "Engenheiro de Software",
    description: "Trabalho na Critical TechWorks num projeto Android para o setor automóvel.",
    view_projects: "Ver Os Meus Projetos",
    download_cv: "Descarregar CV",
    find_me: "Encontra-me em:",
    hello: "Olá!",
  },
  about: {
    title: "Sobre Mim",
    description:
      "Estudei Engenharia Informática e sou engenheiro de software na Critical TechWorks. A maioria dos projetos abaixo vem do tempo da universidade, quando explorava desenvolvimento web e mobile e aprendia a transformar uma ideia num produto funcional.",
    tech_stack_title: "Tecnologias",
    work_tab: "Uso no trabalho",
    projects_tab: "Usei em projetos",
    android_tooling: "Ferramentas Android",
  },
  experience: {
    title: "Experiência",
    items: [
      {
        role: "Desenvolvedor Android Fullstack Júnior",
        company: "Critical TechWorks",
        period: "Nov 2025 - Presente",
        description:
          "Contribuo para um projeto Android automóvel como parte de uma equipa de engenharia de software.",
      },
    ],
  },
  education: {
    title: "Educação",
    items: [
      {
        degree: "Licenciatura em Engenharia Informática",
        institution: "Universidade Lusófona",
        period: "Set 2022 - Jul 2025",
      },
    ],
  },
  projects: {
    title: "Os Meus Projetos",
    view_project: "Ver Projeto",
    source_code: "Código Fonte",
    website: "Website",
    source: "Código",
    collaborator_repository:
      "Projeto colaborativo — o repositório está alojado na conta GitHub do meu amigo da universidade.",
    items: [
      {
        title: "Water Wise",
        description:
          "O meu projeto final de licenciatura em Engenharia Informática, desenvolvido com um colega de curso. Uma plataforma web que reúne dados de albufeiras, estações meteorológicas e satélite para a gestão da água em Portugal numa única interface com mapa.",
      },
      {
        title: "Yoke - App de Fitness",
        description:
          "Co-desenvolvendo uma aplicação móvel de fitness como projeto paralelo com um amigo para acompanhar treinos, nutrição e progresso, com bibliotecas de exercícios e planeamento de refeições personalizável.",
      },
      {
        title: "App SNS Hospitais",
        description:
          "Uma aplicação Flutter para os hospitais públicos em Portugal, desenvolvida com um colega de curso para uma cadeira da universidade, ao longo de duas fases. Para além das funcionalidades obrigatórias, focámo-nos numa arquitetura limpa e numa aplicação que continua a funcionar sem Internet.",
      },
      {
        title: "Live Notes",
        description:
          "Um quadro partilhado onde as pessoas deixam notas e veem as alterações de todos no momento, feito para explorar os WebSockets em tempo real do Firebase depois de experimentar o Convex.",
      },
      {
        title: "App de puzzles com emojis",
        description:
          "Jogo para adivinhar o título a partir de combinações de emojis. Inclui categorias como Jogos, Filmes e Músicas, níveis de dificuldade, dicas progressivas, feedback e opção para saltar para outro enigma.",
      },
      {
        title: "Kart Island",
        description:
          "Um jogo de corridas de karts 3D multijogador para browsers de computador, desenvolvido com IA como projeto pessoal. Até quatro pilotos partilham uma sala privada em seis circuitos, com pilotos controlados pelo computador a preencher os lugares vazios.",
      },
    ],
  },
  contact: {
    title: "Vamos conectar-nos",
    linkedin: "LinkedIn",
    github: "GitHub",
    email: "Email",
    email_me: "Enviar email",
    description:
      "Sente-te à vontade para entrar em contacto se quiseres conectar-te ou discutir um projeto.",
  },
  footer: {
    rights: "Todos os direitos reservados.",
  },
  buttons: {
    show_more: "Ver Mais",
    show_less: "Ver Menos",
    view_details: "Ver detalhes",
  },
  theme: {
    toggle: "Alternar tema de cores",
  },
};

export default translation;
