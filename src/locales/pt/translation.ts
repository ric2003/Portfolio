// Portuguese (PT) translations.
// Kept as a TS module instead of raw JSON because Turbopack HMR cannot
// reliably hot-update JSON modules imported into the client bundle.
const translation = {
  opens_in_new_tab: " (abre num novo separador)",
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
        role: "Programador Android Fullstack Júnior",
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
    play_preview: "Ver demonstração",
    pause_preview: "Pausar",
    visit_site: "Visitar site",
    show_details: "Ver detalhes",
    try_game: "Experimentar jogo",
    desktop_only: "Só funciona no computador",
    back: "Todos os projetos",
    role: "Papel",
    team: "Equipa",
    context: "Contexto",
    stack: "Tecnologias",
    next: "Próximo projeto",
    previous: "Projeto anterior",
    visit_project: "Visitar {{title}}",
    try_project: "Experimentar {{title}}",
    view_source: "Ver código",
    title: "Os Meus Projetos",
    view_project: "Ver Projeto",
    source_code: "Código Fonte",
    website: "Website",
    source: "Código",
    final_report: "Ler o relatório final",
    final_report_language: "PDF",
    collaborator_repository:
      "Projeto colaborativo — o repositório está alojado na conta GitHub do meu amigo da universidade.",
    items: {
      "water-wise": {
        role: "Co-desenvolvimento",
        team: "2 pessoas",
        context: "Projeto final de licenciatura",
        story: [
          "O Water Wise foi o meu projeto final de licenciatura em Engenharia Informática na Universidade Lusófona, uma plataforma de apoio à decisão para ajudar agricultores, gestores de recursos hídricos e investigadores a acompanhar o estado das albufeiras em Portugal. Desenvolvi-o com um colega de curso, a partir de um protótipo em Figma e a trabalhar em sprints no Trello. Construímo-lo sobretudo em conjunto, às vezes com cada um responsável por uma página, a rever o código um do outro e a desenhar a interface lado a lado.",
          "O projeto nasceu de um pedido da Faculdade de Engenharia da universidade, como a plataforma web de uma proposta europeia mais ampla de gestão da água. Dois professores orientaram-nos, e o nosso contacto na Faculdade de Engenharia, especialista em dados temporais, fez de stakeholder, a explicar o que a plataforma precisava e a ajudar-nos a obter os dados. Depois de terminarmos, a plataforma foi renomeada Harmonia e apresentada e aprovada como parte dessa iniciativa europeia.",
          "Os dados vêm de várias fontes, incluindo uma API de estações meteorológicas, telemetria em InfluxDB, imagens de satélite e modelos preditivos de outros grupos. Os pedidos às estações e à base de dados passam por API routes do Next.js, para que as credenciais fiquem no servidor. No cliente, o React Query guarda os dados em cache no IndexedDB para que voltar a uma página seja instantâneo, o Convex trata dos alertas em tempo real, o Clerk da autenticação, e a interface funciona em português e inglês.",
          "Testámo-la com duas rondas de inquéritos a pessoas que trabalham nesta área e usariam uma plataforma assim.",
        ],
        title: "Water Wise",
        subtitle: "Dados da água em Portugal",
        description:
          "O meu projeto final de licenciatura em Engenharia Informática, desenvolvido com um colega de curso. Uma plataforma web que reúne dados de albufeiras, estações meteorológicas e satélite para a gestão da água em Portugal numa única interface com mapa.",
      },
      yoke: {
        role: "Co-desenvolvimento",
        team: "2 pessoas",
        context: "Projeto paralelo",
        story: [
          "O Yoke começou no meu último ano da licenciatura, mais ou menos quando as aulas começaram a introduzir o Flutter. Eu e o meu amigo estávamos convencidos de que o React Native era a melhor escolha e, como já escrevíamos React todos os dias em Next.js no nosso projeto final, pareceu-nos familiar desde o primeiro ecrã.",
          "Planeámos uma aplicação de fitness completa, com treinos, nutrição, histórico e progresso, e construímo-la com Expo e Expo Router, com um separador para cada área. A parte que levámos mais longe foi a biblioteca de exercícios, um catálogo com filtros e uma página de detalhe para cada exercício, onde também é possível adicionar exercícios próprios e guardá-los no telemóvel.",
        ],
        title: "Yoke - App de Fitness",
        subtitle: "Um protótipo de app de fitness",
        description:
          "Uma aplicação de fitness para treinos, nutrição e progresso, desenvolvida com um amigo em React Native. Escolhemo-lo em vez do Flutter porque já trabalhávamos com React todos os dias.",
      },
      "sns-hospitals": {
        role: "Co-desenvolvimento",
        team: "2 pessoas",
        context: "Cadeira universitária",
        story: [
          "Desenvolvi esta aplicação com um colega de curso para uma cadeira de desenvolvimento mobile, ao longo de duas fases, cada uma com os seus requisitos. Construímo-la sobretudo em conjunto. Às vezes um de nós ficava responsável por um ecrã ou por pôr um teste específico a passar, mas revíamos o código um do outro, sugeríamos melhorias e desenhávamos a interface a lançar ideias sobre o que acrescentar e como apresentar a informação.",
          "Usámos o padrão Repository numa arquitetura em camadas. A interface fala apenas com um repositório, que obtém a informação dos hospitais através da API do SNS e recorre aos dados guardados numa base de dados SQLite local quando não há ligação à Internet, para que continuem disponíveis offline. Isto também mantém a lógica de negócio fora dos widgets.",
          "As dependências são injetadas com o Provider, uma abordagem muito usada em Flutter. As fontes de dados e os serviços do dispositivo, como a localização e a conectividade, são definidos como interfaces e registados uma vez no arranque, e os ecrãs obtêm-nos da árvore de widgets em vez de os criarem.",
        ],
        title: "App SNS Hospitais",
        subtitle: "Informação hospitalar offline",
        description:
          "Uma aplicação Flutter para os hospitais públicos em Portugal, desenvolvida com um colega de curso para uma cadeira da universidade, ao longo de duas fases. Para além das funcionalidades obrigatórias, focámo-nos numa arquitetura limpa e numa aplicação que continua a funcionar sem Internet.",
      },
      "live-notes": {
        role: "Desenvolvimento",
        team: "Individual",
        context: "Projeto pessoal",
        story: [
          "Depois de usar o Convex no meu projeto final de licenciatura, quis explorar o Firebase para colaboração em tempo real. Comecei o Live Notes como um quadro partilhado simples e, com a ajuda de IA, fui-o transformando num canvas com notas que se podem arrastar, zoom, deslocação e um minimapa.",
          "O principal desafio foi lidar com várias pessoas a fazer alterações ao mesmo tempo. Todos veem as atualizações à medida que acontecem, os conflitos entre edições são detetados antes de se sobreporem ao trabalho de outra pessoa, e as alterações por gravar são guardadas para não se perderem quando a página fecha.",
          "É possível entrar como convidado ou iniciar sessão com o Google, o que facilita experimentar o quadro e começar a colaborar.",
        ],
        title: "Live Notes",
        subtitle: "Um quadro de notas partilhado",
        description:
          "Um quadro partilhado onde as pessoas deixam notas e veem as alterações de todos no momento, feito para explorar os WebSockets em tempo real do Firebase depois de experimentar o Convex.",
      },
      "emoji-puzzle": {
        role: "Desenvolvimento",
        team: "Individual",
        context: "Projeto pessoal",
        story: [
          "O Yoke acabou por ser muito ambicioso, por isso quis voltar a experimentar React Native com algo pequeno o suficiente para terminar. O Emoji Puzzle é um jogo de adivinhas em que cada puzzle é uma fila de emojis que esconde o título de um jogo, filme ou música.",
          "A parte mais difícil foi decidir quando é que uma resposta conta. Em vez de exigir uma correspondência exata, o verificador compara a resposta palavra a palavra e tolera pequenas diferenças, como plurais ou terminações verbais, para poder responder Certo, Perto ou Errado. As dicas revelam primeiro a categoria e depois mais da resposta a cada erro, as estatísticas e sequências ficam guardadas no telemóvel, e a lógica do jogo vive num hook e num context, separada dos ecrãs.",
        ],
        title: "Puzzles de Emojis",
        subtitle: "Adivinha o título pelos emojis",
        description:
          "Um pequeno jogo de adivinhas com emojis em React Native, feito para terminar algo simples depois de uma aplicação de fitness ambiciosa. Adivinha o jogo, filme ou música escondido em cada fila de emojis.",
      },
      "racing-game": {
        role: "Desenvolvimento com IA",
        team: "Individual",
        context: "Projeto pessoal",
        story: [
          "Desenvolvi o Kart Island com IA para ver até onde conseguia levar um jogo multijogador em tempo real como projeto pessoal. O servidor do jogo corre num Raspberry Pi que uso como servidor próprio.",
          "Um dos desafios foi manter a condução responsiva e garantir que todos veem o mesmo resultado. O servidor decide o que acontece na corrida, enquanto o browser de cada jogador mantém o movimento do kart fluido apesar dos atrasos na rede. Os pilotos controlados pelo computador preenchem os lugares vazios, para que seja possível correr sem reunir um grupo completo.",
          "Também usei o projeto para experimentar IA para além da escrita de código. À medida que a sua capacidade de criar objetos no Blender melhorou, usei-a para acrescentar mais modelos 3D ao mundo.",
        ],
        title: "Kart Island",
        subtitle: "Corridas de karts multijogador",
        description:
          "Um jogo de corridas de karts 3D multijogador para browsers de computador, desenvolvido com IA como projeto pessoal. Até quatro pilotos partilham uma sala privada em seis circuitos, com pilotos controlados pelo computador a preencher os lugares vazios.",
      },
    },
  },
  contact: {
    title: "Vamos conversar",
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
