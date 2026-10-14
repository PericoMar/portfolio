/**
 * Single source of truth for the whole site.
 * Every page, /llms.txt and /resume.json are generated from this file,
 * so updating your profile means editing only this file.
 *
 * Content mirrors the LinkedIn profile (linkedin.com/in/pedromargonz),
 * plus additions that are not on LinkedIn yet: Danza App, the
 * VERI*FACTU / Cuaderno 19 work at Kong Consulting and the full scope
 * of the subscription work at Webimpacto (two migrations).
 *
 * Localized fields are `{ en, es }` pairs and get resolved per page.
 * Dates are ISO months (`'2025-10'`); a missing `end` means "present".
 */

export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];
export type L = { en: string; es: string };

const l = (en: string, es: string): L => ({ en, es });

/* ------------------------------------------------------------------ */
/* Profile                                                             */
/* ------------------------------------------------------------------ */

export const profile = {
  name: 'Pedro Martínez González',
  shortName: 'Pedro Martínez',
  headline: l('Full-Stack Developer', 'Desarrollador Full-Stack'),
  location: l('Tomares, Seville, Spain', 'Tomares, Sevilla, España'),
  email: 'pedromartinezgon0511@gmail.com',
  linkedin: 'https://www.linkedin.com/in/pedromargonz/',
  github: 'https://github.com/PericoMar',
  /**
   * On LinkedIn "open to work" is visible to recruiters only,
   * so it stays hidden here too. Set `show: true` to display it in the sidebar.
   */
  availability: {
    show: false,
    label: l('Open to roles · Seville, on-site, hybrid or remote', 'Abierto a ofertas · Sevilla, presencial, híbrido o remoto'),
  },
};

/* ------------------------------------------------------------------ */
/* Organisations (the logo chips)                                      */
/* ------------------------------------------------------------------ */

export type OrgId =
  | 'webimpacto'
  | 'kong'
  | 'danza'
  | 'shopify'
  | 'uoc'
  | 'camara'
  | 'cs50ai'
  | 'anthropic'
  | 'cambridge';

export type Org = {
  name: string;
  /** Official logo in /public (64px PNG). Without one, `mark` is drawn on a `tile`. */
  logo?: string;
  /** One or two characters drawn on the logo tile. */
  mark: string;
  /** Tile colour; the chip background is a tint of it. */
  tile: string;
  /** Mark colour on the tile. */
  ink?: string;
  /** In-page anchor the chip links to. */
  href: string;
  /** Shown in the hover card. */
  note: L;
};

export const orgs: Record<OrgId, Org> = {
  webimpacto: {
    name: 'Webimpacto',
    logo: 'logos/webimpacto.png',
    mark: 'w',
    tile: '#e11d48',
    href: '#experience',
    note: l('Product-focused e-commerce agency · since Oct 2025', 'Agencia e-commerce centrada en producto · desde oct. 2025'),
  },
  kong: {
    name: 'Kong Consulting',
    logo: 'logos/kong.png',
    mark: 'k',
    tile: '#e9a400',
    href: '#experience',
    note: l('Consultancy in Seville · Apr 2023 – Oct 2025', 'Consultora en Sevilla · abr. 2023 – oct. 2025'),
  },
  danza: {
    name: 'Danza App',
    logo: 'logos/danza.png',
    mark: 'd',
    tile: '#6b7280',
    href: '#projects',
    note: l(
      'Reviews and auditions for professional dancers · iOS, Android and web · freelance, 2025 – present',
      'Reseñas y audiciones para bailarines profesionales · iOS, Android y web · freelance, 2025 – actualidad',
    ),
  },
  shopify: {
    name: 'Shopify',
    logo: 'logos/shopify.png',
    mark: 's',
    tile: '#5e8e3e',
    href: '#projects',
    note: l(
      'Subscription contracts API, checkout and Liquid themes · 3 Shopify certifications',
      'API de contratos de suscripción, checkout y temas Liquid · 3 certificaciones de Shopify',
    ),
  },
  uoc: {
    name: 'UOC',
    logo: 'logos/uoc.png',
    mark: 'u',
    tile: '#73edff',
    ink: '#000078',
    href: '#education',
    note: l('Universitat Oberta de Catalunya · Computer Engineering, 2025 – present', 'Universitat Oberta de Catalunya · Ingeniería Informática, 2025 – actualidad'),
  },
  camara: {
    name: 'Cámara de Comercio de Sevilla',
    mark: 'c',
    tile: '#1d4ed8',
    href: '#education',
    note: l('Web Application Development · 2022 – 2023', 'Desarrollo de Aplicaciones Web · 2022 – 2023'),
  },
  cs50ai: {
    name: 'CS50AI',
    logo: 'logos/cs50ai.png',
    mark: '50',
    tile: '#a51c30',
    href: '#ai',
    note: l(
      'Harvard’s Introduction to Artificial Intelligence with Python · edX, Oct 2025',
      'Introduction to Artificial Intelligence with Python de Harvard · edX, oct. 2025',
    ),
  },
  anthropic: {
    name: 'Anthropic',
    logo: 'logos/anthropic.png',
    mark: 'A\\',
    tile: '#d97757',
    href: '#ai',
    note: l('Claude Code in Action certification · Feb 2026', 'Certificación Claude Code in Action · feb. 2026'),
  },
  cambridge: {
    name: 'Cambridge',
    mark: 'c',
    tile: '#0f2a5f',
    href: '#certifications',
    note: l('C1 Advanced Certificate in English', 'C1 Advanced Certificate in English'),
  },
};

/* ------------------------------------------------------------------ */
/* Intro                                                               */
/* ------------------------------------------------------------------ */

/** `{orgId}` renders as a logo chip; in plain-text outputs it becomes the org name. */
export const intro = [
  l(
    'I build e-commerce infrastructure where mistakes cost real money. At {webimpacto} I work on {shopify} subscription stores with tens of thousands of active contracts: making sure recurring billing holds up at that volume, adapting it to each client’s needs and designing systems that stay maintainable as they grow. I’ve been through two full subscription migrations. Before that, I spent two and a half years at {kong}, directing the technical side of our most complex projects.',
    'Construyo infraestructura e-commerce donde los errores cuestan dinero real. En {webimpacto} trabajo con tiendas {shopify} de suscripción con decenas de miles de contratos activos: me aseguro de que los cobros recurrentes aguanten ese volumen, los adapto a las necesidades de cada cliente y diseño sistemas que sigan siendo mantenibles a medida que crecen. He participado en dos migraciones completas de suscripciones. Antes pasé dos años y medio en {kong}, dirigiendo la parte técnica de los proyectos más complejos.',
  ),
  l(
    'On the side I build {danza}, a cross-platform app for professional dancers with 400+ users and LLM-powered review summaries, and I’m experimenting heavily with AI-assisted development workflows. I’m finishing Computer Engineering at {uoc} and I’m certified in AI through {cs50ai} and {anthropic}.',
    'Por mi cuenta construyo {danza}, una app multiplataforma para bailarines profesionales con más de 400 usuarios y resúmenes de reseñas generados por LLM, y experimento mucho con flujos de desarrollo asistidos por IA. Estoy terminando Ingeniería Informática en la {uoc} y tengo certificaciones de IA de {cs50ai} y {anthropic}.',
  ),
  l(
    'I care about correctness in systems that touch money, and about leaving codebases better documented than I found them.',
    'Me importa la corrección en los sistemas que tocan dinero, y dejar el código mejor documentado de lo que lo encontré.',
  ),
];

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

/** `preview` is a 480×300 screenshot in /public, shown when hovering the link. */
export type Link = { label: string; href: string; preview?: string };

export type Job = {
  org: OrgId;
  role: L;
  type: L;
  start: string;
  end?: string;
  summary: L;
  points: L[];
  stack: string[];
  links?: Link[];
};

export const experience: Job[] = [
  {
    org: 'webimpacto',
    role: l('Mid-Level Full Stack Developer', 'Desarrollador Full Stack Mid-Level'),
    type: l('Full-time · Remote', 'Jornada completa · En remoto'),
    start: '2025-10',
    summary: l(
      'Product-focused e-commerce agency, working on high-traffic Shopify storefronts and subscription infrastructure.',
      'Agencia e-commerce centrada en producto, trabajando en tiendas Shopify de alto tráfico e infraestructura de suscripciones.',
    ),
    points: [
      l(
        'The team’s main technical reference for subscriptions: stores with tens of thousands of active contracts, recurring billing that holds up at that volume, client-specific needs and systems designed to stay maintainable as they scale.',
        'Referente técnico del equipo en suscripciones: tiendas con decenas de miles de contratos activos, cobros recurrentes que aguantan ese volumen, necesidades específicas de cada cliente y sistemas diseñados para mantenerse a largo plazo.',
      ),
      l(
        'Worked on two full subscription migrations, as primary developer on one of them.',
        'He participado en dos migraciones completas de suscripciones, como desarrollador principal en una de ellas.',
      ),
      l(
        'Built the customer subscription portal and the backend for subscription management over WhatsApp.',
        'Construí el portal de suscripciones para clientes y el backend de la gestión de suscripciones por WhatsApp.',
      ),
      l(
        'Day-to-day development on live storefronts: theme customisation and integrations with external services.',
        'Desarrollo diario en tiendas en producción: personalización de temas e integraciones con servicios externos.',
      ),
    ],
    stack: ['Shopify', 'Liquid', 'Remix', 'Laravel', 'GraphQL', 'Node.js'],
    links: [
      { label: 'incapto', href: 'https://incapto.com/', preview: 'previews/incapto.webp' },
      { label: 'talkual', href: 'https://www.talkualfoods.com/', preview: 'previews/talkual.webp' },
    ],
  },
  {
    org: 'kong',
    role: l('Full-stack developer', 'Desarrollador full-stack'),
    type: l('Full-time · Seville', 'Jornada completa · Sevilla'),
    start: '2023-07',
    end: '2025-10',
    summary: l(
      'Joined as a full-stack developer and quickly became the technical lead for the team’s most complex projects.',
      'Entré como desarrollador full-stack y pronto pasé a ser el líder técnico de los proyectos más complejos del equipo.',
    ),
    points: [
      l(
        'Architectural decisions and day-to-day technical direction of three developers, owning delivery across frontend, backend and infrastructure.',
        'Decisiones de arquitectura y dirección técnica diaria de tres desarrolladores, responsable de la entrega en frontend, backend e infraestructura.',
      ),
      l(
        'Led an insurance platform for 10,000+ users and a multi-tenant self-service kiosk with payment and printing hardware.',
        'Lideré una plataforma de seguros para más de 10.000 usuarios y un kiosco de autoservicio multi-tenant con hardware de pago e impresión.',
      ),
      l(
        'Spanish invoicing compliance: VERI*FACTU and non-VERIFACTU invoicing, plus SEPA direct-debit remittances (Cuaderno 19).',
        'Cumplimiento normativo en facturación: facturación VERI*FACTU y no VERIFACTU, y remesas de adeudos directos SEPA (Cuaderno 19).',
      ),
      l(
        'Containerised CI/CD with Docker and GitHub Actions that cut deployment times by 70%.',
        'CI/CD en contenedores con Docker y GitHub Actions que redujo los tiempos de despliegue un 70%.',
      ),
    ],
    stack: ['Angular', 'Laravel', 'SQL Server', 'MySQL', 'Docker', 'GitHub Actions', 'Azure DevOps'],
  },
  {
    org: 'kong',
    role: l('Full-stack developer · internship', 'Desarrollador full-stack · prácticas'),
    type: l('Internship · Hybrid', 'Contrato de prácticas · Híbrido'),
    start: '2023-04',
    end: '2023-06',
    summary: l(
      'Internship at the same consultancy before joining full-time.',
      'Prácticas en la misma consultora antes de incorporarme a jornada completa.',
    ),
    points: [],
    stack: ['PHP', 'TypeScript'],
  },
];

/* ------------------------------------------------------------------ */
/* AI                                                                  */
/* ------------------------------------------------------------------ */

export type Item = {
  title: L;
  sub: L;
  body: L;
  meta?: L;
  links?: Link[];
};

export const ai: Item[] = [
  {
    title: l('LLM review summaries', 'Resúmenes con LLM'),
    sub: l('Danza App', 'Danza App'),
    body: l(
      'AI summaries of dance-company reviews: a Node backend streams the LLM output to the app token by token, keeps keys and prompts server-side, and caps usage with per-user daily quotas so costs stay predictable.',
      'Resúmenes con IA de las reseñas de compañías: un backend en Node hace streaming de la respuesta del LLM a la app token a token, mantiene claves y prompts en el servidor y limita el uso con cuotas diarias por usuario para que el coste sea predecible.',
    ),
    meta: l('2025 – now', '2025 – actualidad'),
    links: [{ label: 'danza-app.com', href: 'https://danza-app.com', preview: 'previews/danza.webp' }],
  },
  {
    title: l('CS50AI', 'CS50AI'),
    sub: l('Harvard · edX', 'Harvard · edX'),
    body: l(
      'Introduction to Artificial Intelligence with Python — search, logic, machine learning, neural networks and natural language processing. Completed with a 100% score, to understand what happens under the hood of the AI tools I build with.',
      'Introduction to Artificial Intelligence with Python: búsqueda, lógica, machine learning, redes neuronales y procesamiento del lenguaje natural. Completado con un 100% de nota, para entender qué pasa por debajo de las herramientas de IA con las que construyo.',
    ),
    meta: l('Oct 2025', 'oct. 2025'),
  },
  {
    title: l('Claude Code in Action', 'Claude Code in Action'),
    sub: l('Anthropic', 'Anthropic'),
    body: l(
      'Anthropic certification on Claude Code, its agentic coding tool. This site was built with it.',
      'Certificación de Anthropic sobre Claude Code, su herramienta de programación agéntica. Esta web está hecha con ella.',
    ),
    meta: l('Feb 2026', 'feb. 2026'),
  },
  {
    title: l('AI-assisted development', 'Desarrollo asistido por IA'),
    sub: l('side projects', 'proyectos personales'),
    body: l(
      'Outside work I build side projects, lately experimenting heavily with AI-assisted development workflows.',
      'Fuera del trabajo construyo proyectos personales, últimamente experimentando mucho con flujos de desarrollo asistidos por IA.',
    ),
    meta: l('now', 'ahora'),
  },
  {
    title: l('Community', 'Comunidad'),
    sub: l('Fullstack Sevilla · CTX Tech', 'Fullstack Sevilla · CTX Tech'),
    body: l(
      'Attending Seville tech meetups on AI applied to software development and on where AI is heading.',
      'Asistiendo a meetups tecnológicos de Sevilla sobre IA aplicada al desarrollo de software y hacia dónde va la IA.',
    ),
    meta: l('2025 – 2026', '2025 – 2026'),
  },
  {
    title: l('AI-readable profile', 'Perfil legible por IA'),
    sub: l('this site', 'esta web'),
    body: l(
      'Screening with an AI assistant? Point it at these files — they are generated from the same source as this page.',
      '¿Filtras candidatos con un asistente de IA? Pásale estos archivos: se generan desde la misma fuente que esta página.',
    ),
    links: [
      { label: 'llms.txt', href: 'llms.txt' },
      { label: 'resume.json', href: 'resume.json' },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Projects (from the LinkedIn experience descriptions)                */
/* ------------------------------------------------------------------ */

export type Project = Item & { org: OrgId; start: string; end?: string; stack?: string[] };

export const projects: Project[] = [
  {
    org: 'danza',
    title: l('Danza App', 'Danza App'),
    sub: l('freelance · 400+ users · iOS · Android · web', 'freelance · +400 usuarios · iOS · Android · web'),
    body: l(
      'Cross-platform app where professional dancers review dance companies and track auditions worldwide. Built end-to-end with the product owner: data model, backend, AI layer and app-store release. Supabase / Postgres secured with Row-Level Security and role-based moderation; an audition engine that turns messy deadlines (“ASAP”, “always open”, several dates) into a clear traffic-light status. From a 15-hour MVP to native iOS and Android builds with ads and a newsletter. It now lists 400+ ballet companies, has 250+ newsletter subscribers and gains 70+ new users every month.',
      'App multiplataforma donde bailarines profesionales reseñan compañías de danza y siguen audiciones de todo el mundo. Construida de punta a punta con el responsable de producto: modelo de datos, backend, capa de IA y publicación en las stores. Supabase / Postgres protegido con Row-Level Security y moderación por roles; un motor de audiciones que convierte plazos caóticos («ASAP», «siempre abierta», varias fechas) en un semáforo de estado claro. De un MVP de 15 horas a apps nativas para iOS y Android, con anuncios y newsletter. Hoy reúne más de 400 compañías de ballet y más de 250 suscriptores a la newsletter, y suma más de 70 usuarios nuevos cada mes.',
    ),
    start: '2025',
    stack: ['React Native', 'Expo', 'Node.js', 'Supabase', 'PostgreSQL', 'OpenAI API'],
    links: [{ label: 'danza-app.com', href: 'https://danza-app.com', preview: 'previews/danza.webp' }],
  },
  {
    org: 'webimpacto',
    title: l('WhatsApp × Shopify', 'WhatsApp × Shopify'),
    sub: l('conversational subscriptions', 'suscripciones conversacionales'),
    body: l(
      'Backend for managing subscriptions on WhatsApp, integrating Shopify with the client’s messaging provider. Subscribers reschedule orders, add one-time or recurring products and trigger immediate delivery; non-subscribers check order status and reorder their last purchase, with delivery reminders and a feedback flow.',
      'Backend para gestionar suscripciones por WhatsApp, integrando Shopify con el proveedor de mensajería del cliente. Los suscriptores reprograman pedidos, añaden productos puntuales o recurrentes y piden una entrega inmediata; quien no está suscrito consulta el estado de su pedido y repite su última compra, con recordatorios de entrega y un flujo de feedback.',
    ),
    start: '2025-10',
  },
  {
    org: 'webimpacto',
    title: l('Subscription migrations', 'Migraciones de suscripciones'),
    sub: l('two migrations · tens of thousands of contracts', 'dos migraciones · decenas de miles de contratos'),
    body: l(
      'Two full migrations of active subscription contracts: billing cycle management, payment continuity and webhook-driven edge cases on Shopify’s subscription contracts API and GraphQL.',
      'Dos migraciones completas de contratos de suscripción activos: gestión de ciclos de facturación, continuidad de pagos y casos límite gestionados con webhooks sobre la API de contratos de suscripción de Shopify y GraphQL.',
    ),
    start: '2025-10',
  },
  {
    org: 'webimpacto',
    title: l('Subscription portal', 'Portal de suscripciones'),
    sub: l('customer-facing', 'para clientes'),
    body: l(
      'Post-purchase interface where subscribers skip, delay, advance or modify their subscriptions, add products and manage status — built for reliability, given the financial sensitivity of subscription operations.',
      'Interfaz post-compra donde los suscriptores saltan, retrasan, adelantan o modifican sus suscripciones, añaden productos y gestionan su estado, construida con foco en la fiabilidad por la sensibilidad financiera de las operaciones.',
    ),
    start: '2025-10',
  },
  {
    org: 'kong',
    title: l('Self-service kiosk', 'Kiosco de autoservicio'),
    sub: l('multi-tenant · hardware', 'multi-tenant · hardware'),
    body: l(
      'Touch-screen ordering app for restaurants: card reader for in-person payments (Redsys), USB and network ticket printers and a cash drawer. Per-merchant menus from a central ERP, QR order-and-pay, hourly real-time reports and a kitchen display. CI/CD on Azure and scripts for mass rollout.',
      'App de pedidos en pantalla táctil para restauración: datáfono para pagos presenciales (Redsys), impresoras de tickets USB y de red y cajón portamonedas. Cartas por comercio desde un ERP central, pide y paga con QR, informes en tiempo real por hora y monitor de cocina. CI/CD en Azure y scripts de instalación masiva.',
    ),
    start: '2023-07',
    end: '2025-10',
  },
  {
    org: 'kong',
    title: l('Insurance platform', 'Plataforma de seguros'),
    sub: l('10,000+ users', '+10.000 usuarios'),
    body: l(
      'Web application for policy data, user permissions and operations workflows. Rigorous database design and access control with Laravel Sanctum and custom policies, structured for future microservices and SSO.',
      'Aplicación web para datos de pólizas, permisos de usuario y flujos operativos. Diseño de base de datos riguroso y control de acceso con Laravel Sanctum y policies propias, preparada para microservicios y SSO.',
    ),
    start: '2023-07',
    end: '2025-10',
  },
  {
    org: 'kong',
    title: l('E-invoicing & direct debits', 'Facturación y remesas'),
    sub: l('VERI*FACTU · SEPA Cuaderno 19', 'VERI*FACTU · SEPA Cuaderno 19'),
    body: l(
      'Invoicing adapted to Spain’s anti-fraud regulation in both modes: VERI*FACTU, sending hash-chained invoice records to the Tax Agency (AEAT), and non-VERIFACTU, keeping them electronically signed with an event log — with the verification QR code on every invoice. Plus SEPA direct-debit remittance files (Cuaderno 19) to collect recurring payments through the bank.',
      'Facturación adaptada al reglamento antifraude en sus dos modalidades: VERI*FACTU, enviando a la AEAT los registros de facturación encadenados con huella, y no VERIFACTU, conservándolos firmados electrónicamente con registro de eventos, con el código QR de verificación en cada factura. Además, ficheros de remesas de adeudos directos SEPA (Cuaderno 19) para cobrar recibos recurrentes a través del banco.',
    ),
    start: '2023-07',
    end: '2025-10',
  },
  {
    org: 'kong',
    title: l('ERP dashboards', 'Dashboards de ERP'),
    sub: l('construction sector', 'sector construcción'),
    body: l(
      'Executive dashboards on a construction-sector ERP surfacing real-time operational metrics, reducing manual reporting.',
      'Dashboards ejecutivos sobre un ERP del sector de la construcción con métricas operativas en tiempo real, reduciendo los informes manuales.',
    ),
    start: '2023-07',
    end: '2025-10',
  },
  {
    org: 'kong',
    title: l('CI/CD pipeline', 'Pipeline de CI/CD'),
    sub: l('−70% deployment time', '−70% en despliegues'),
    body: l(
      'Containerised pipeline with Docker and GitHub Actions, enforcing automated testing and code quality gates.',
      'Pipeline en contenedores con Docker y GitHub Actions, con tests automáticos y controles de calidad de código obligatorios.',
    ),
    start: '2023-07',
    end: '2025-10',
  },
];

/* ------------------------------------------------------------------ */
/* Skills, education, certifications, languages                        */
/* ------------------------------------------------------------------ */

export const skills: { group: L; items: string[] }[] = [
  { group: l('languages', 'lenguajes'), items: ['TypeScript', 'PHP', 'Python', 'GraphQL', 'Liquid', 'CSS'] },
  {
    group: l('frameworks', 'frameworks'),
    items: ['Angular', 'RxJS', 'Laravel', 'Remix', 'Node.js', 'React Native', 'Expo'],
  },
  {
    group: l('commerce & billing', 'comercio y facturación'),
    items: ['Shopify subscription contracts API', 'Shopify checkout', 'webhooks', 'Redsys', 'VERI*FACTU', 'SEPA Cuaderno 19'],
  },
  {
    group: l('data & infra', 'datos e infra'),
    items: ['SQL Server', 'MySQL', 'PostgreSQL', 'Supabase', 'Docker', 'GitHub Actions', 'Azure DevOps', 'Git'],
  },
  {
    group: l('ai', 'ia'),
    items: [
      'OpenAI API',
      'LLM streaming',
      'Python',
      'CS50AI: search, ML, neural networks, NLP',
      'Claude Code',
      'AI-assisted development',
    ],
  },
  {
    group: l('soft skills', 'transversales'),
    items: ['leadership', 'problem solving', 'analytical skills', 'client-facing', 'project design', 'professional responsibility'],
  },
];

export const languages: { name: L; level: L }[] = [
  {
    name: l('English', 'Inglés'),
    level: l('Full professional proficiency · C1 Advanced', 'Competencia profesional completa · C1 Advanced'),
  },
];

export const education: { school: string; org: OrgId; degree: L; start: string; end?: string }[] = [
  {
    school: 'Universitat Oberta de Catalunya',
    org: 'uoc',
    degree: l('Bachelor’s in Computer Engineering', 'Grado en Ingeniería Informática'),
    start: '2025-01',
  },
  {
    school: 'Centro FP Superior de la Cámara de Comercio de Sevilla',
    org: 'camara',
    degree: l('Web Application Development', 'Desarrollo de Aplicaciones Web'),
    start: '2022',
    end: '2023-07',
  },
];

export const certifications: { name: string; issuer: string; org: OrgId; date?: string }[] = [
  { name: 'Claude Code in Action', issuer: 'Anthropic', org: 'anthropic', date: '2026-02' },
  { name: 'CS50AI: Introduction to Artificial Intelligence with Python', issuer: 'edX', org: 'cs50ai', date: '2025-10' },
  { name: 'Creating Solutions for Shopify Checkout', issuer: 'Shopify', org: 'shopify', date: '2025-10' },
  { name: 'Liquid Storefronts for Theme Developers', issuer: 'Shopify', org: 'shopify', date: '2025-10' },
  { name: 'Shopify Development Fundamentals: Verified Skill Badge', issuer: 'Shopify', org: 'shopify', date: '2025-10' },
  { name: 'C1 Advanced Certificate in English', issuer: 'Cambridge University Press & Assessment', org: 'cambridge' },
];

/* ------------------------------------------------------------------ */
/* UI strings                                                          */
/* ------------------------------------------------------------------ */

export const ui = {
  meta: {
    title: l('Pedro Martínez — Full-Stack Developer', 'Pedro Martínez — Desarrollador Full-Stack'),
    description: l(
      'Full-stack developer in Seville building Shopify subscription and payment infrastructure with Laravel, Angular, Node.js and GraphQL, plus LLM-powered features in Danza App. CS50AI and Claude Code certified.',
      'Desarrollador full-stack en Sevilla: infraestructura de suscripciones y pagos en Shopify con Laravel, Angular, Node.js y GraphQL, y funcionalidades con LLM en Danza App. Certificado en CS50AI y Claude Code.',
    ),
  },
  nav: {
    experience: l('experience', 'experiencia'),
    ai: l('ai', 'ia'),
    projects: l('projects', 'proyectos'),
    skills: l('skills', 'aptitudes'),
    education: l('education', 'formación'),
    certifications: l('certifications', 'certificaciones'),
  },
  labels: {
    now: l('now', 'actualidad'),
    spoken: l('spoken', 'idiomas'),
  },
  footer: {
    built: l('Built with Astro and Claude Code.', 'Hecho con Astro y Claude Code.'),
    updated: l('Last updated', 'Actualizado'),
  },
  a11y: {
    skip: l('Skip to content', 'Saltar al contenido'),
    primary: l('Sections', 'Secciones'),
    dark: l('dark mode', 'modo oscuro'),
    light: l('light mode', 'modo claro'),
    lang: l('español', 'english'),
  },
};

/* ------------------------------------------------------------------ */
/* Resolver                                                            */
/* ------------------------------------------------------------------ */

type Resolve<T> = T extends L
  ? string
  : T extends (infer U)[]
    ? Resolve<U>[]
    : T extends object
      ? { [K in keyof T]: Resolve<T[K]> }
      : T;

const isL = (v: unknown): v is L =>
  typeof v === 'object' &&
  v !== null &&
  Object.keys(v).length === 2 &&
  typeof (v as L).en === 'string' &&
  typeof (v as L).es === 'string';

export function resolve<T>(value: T, locale: Locale): Resolve<T> {
  if (isL(value)) return value[locale] as Resolve<T>;
  if (Array.isArray(value)) return value.map((v) => resolve(v, locale)) as Resolve<T>;
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, resolve(v, locale)]),
    ) as Resolve<T>;
  }
  return value as Resolve<T>;
}

export function getContent(locale: Locale) {
  return resolve(
    { profile, orgs, intro, experience, ai, projects, skills, languages, education, certifications, ui },
    locale,
  );
}

export type Content = ReturnType<typeof getContent>;
