/**
 * Single source of truth for the whole site.
 * Every page, /llms.txt and /resume.json are generated from this file,
 * so updating your profile means editing only this file.
 *
 * Localized fields are `{ en, es }` pairs and get resolved per page.
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
  email: 'pedromartinezgon0511@gmail.com',
  linkedin: 'https://www.linkedin.com/in/pedromargonz/',
  github: 'https://github.com/PericoMar',
  location: l('Seville, Spain', 'Sevilla, España'),
  role: l('Full-stack & AI Developer', 'Desarrollador Full-stack & IA'),
  /** Set `show: false` to hide the availability pill in the hero. */
  availability: {
    show: true,
    label: l('Open to full-stack & AI roles', 'Abierto a roles full-stack e IA'),
  },
  languages: [
    { name: l('Spanish', 'Español'), level: l('Native', 'Nativo') },
    { name: l('English', 'Inglés'), level: l('C1 · Professional', 'C1 · Profesional') },
  ],
};

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export const hero = {
  // `*text*` renders in the serif accent face.
  title: l(
    'Full-stack developer who ships *AI into real products.*',
    'Desarrollador full-stack que lleva *la IA a productos reales.*',
  ),
  lead: l(
    '3+ years building software people use every day — self-service kiosks running in restaurants, insurance platforms, legally compliant invoicing — and the LLM features on top of them. I lead small teams, talk to clients, and use AI both as a product feature and as my daily engineering tool.',
    'Más de 3 años construyendo software que se usa a diario — kioscos de autoservicio en restaurantes, plataformas de seguros, facturación conforme a la normativa — y las funcionalidades con LLMs que van encima. Lidero equipos pequeños, trato directamente con clientes y uso la IA como funcionalidad de producto y como herramienta diaria de ingeniería.',
  ),
  facts: [
    { k: l('Focus', 'Foco'), v: l('Full-stack · LLM integration', 'Full-stack · Integración de LLMs') },
    { k: l('Experience', 'Experiencia'), v: l('3+ years in production', '3+ años en producción') },
    { k: l('Leadership', 'Liderazgo'), v: l('Led a team of 4 devs', 'Lideré un equipo de 4 devs') },
    { k: l('Core stack', 'Stack'), v: l('TypeScript · Angular · Laravel · Node', 'TypeScript · Angular · Laravel · Node') },
    { k: l('Languages', 'Idiomas'), v: l('Spanish (native) · English (C1)', 'Español (nativo) · Inglés (C1)') },
    { k: l('Based in', 'Ubicación'), v: l('Seville · Remote or hybrid', 'Sevilla · Remoto o híbrido') },
  ],
};

/* ------------------------------------------------------------------ */
/* Selected work                                                       */
/* ------------------------------------------------------------------ */

export type FlowNode = { label: string; sub?: L; ai?: boolean };

export type Project = {
  id: string;
  kicker: L;
  title: L;
  summary: L;
  highlights: L[];
  outcome?: L;
  stack: string[];
  link?: { href: string; label: string };
  /** Columns of a left-to-right architecture flow. */
  flow: FlowNode[][];
};

export const featured: Project[] = [
  {
    id: 'kiosk',
    kicker: l('Kong Software · 2023–2025 · In production', 'Kong Software · 2023–2025 · En producción'),
    title: l('Self-service kiosk platform for hospitality', 'Plataforma de kioscos de autoservicio para hostelería'),
    summary: l(
      'Unattended ordering software for restaurants, ice-cream shops and pharmacies: customers order and pay on their own, staff focus on delivery. I led the team that built it, from architecture to rollout.',
      'Software de pedidos desatendido para restaurantes, heladerías y farmacias: el cliente pide y paga solo y el personal se centra en la entrega. Lideré al equipo que lo construyó, desde la arquitectura hasta el despliegue.',
    ),
    highlights: [
      l(
        'Pioneered AI-powered features: an intelligent order-collection system that automates order intake.',
        'Impulsé funcionalidades con IA: un sistema inteligente de toma de pedidos que automatiza la entrada de comandas.',
      ),
      l(
        'Integrated card terminals and payment gateways, local and remote printers, and a kitchen display system.',
        'Integración con datáfonos y pasarelas de pago, impresoras locales y remotas y monitor de cocina.',
      ),
      l(
        'Order-and-pay from a QR code, full per-client customisation and real-time hourly sales reports.',
        'Pide y paga desde un QR, personalización total por cliente e informes de ventas por hora en tiempo real.',
      ),
      l(
        'Hardened mass-installation script to roll out new kiosks safely and fast.',
        'Script de instalación masiva con medidas de seguridad para desplegar kioscos nuevos rápido y sin riesgos.',
      ),
    ],
    outcome: l(
      'Live in production with strong commercial adoption across the hospitality sector.',
      'En producción y con fuerte adopción comercial en el sector de la hostelería.',
    ),
    stack: ['Angular', 'TypeScript', 'Laravel', 'PHP', 'Azure DevOps'],
    flow: [
      [
        { label: 'Kiosk UI', sub: l('Angular', 'Angular') },
        { label: 'QR order & pay', sub: l('mobile web', 'web móvil') },
      ],
      [
        { label: 'Laravel API', sub: l('orders · catalog · reports', 'pedidos · catálogo · informes') },
        { label: 'AI order intake', sub: l('intelligent collection', 'toma inteligente'), ai: true },
      ],
      [
        { label: 'Card terminals', sub: l('payment gateways', 'pasarelas de pago') },
        { label: 'Printers', sub: l('local & remote', 'locales y remotas') },
        { label: 'Kitchen display', sub: l('live queue', 'cola en vivo') },
      ],
    ],
  },
  {
    id: 'danza',
    kicker: l('Freelance · 2025–present · iOS · Android · Web', 'Freelance · 2025–actualidad · iOS · Android · Web'),
    title: l('Danza App — reviews & auditions for professional dancers', 'Danza App — reseñas y audiciones para bailarines profesionales'),
    summary: l(
      'A cross-platform product where dancers review dance companies and track auditions worldwide. I build it end-to-end, working directly with the product owner: data model, backend, AI layer and app-store release.',
      'Un producto multiplataforma donde bailarines reseñan compañías de danza y siguen audiciones de todo el mundo. Lo construyo de punta a punta, trabajando directamente con el responsable de producto: modelo de datos, backend, capa de IA y publicación en las stores.',
    ),
    highlights: [
      l(
        'AI review summaries: a Node backend streams LLM output to the app token by token, with per-user daily quotas to keep costs predictable.',
        'Resúmenes de reseñas con IA: un backend en Node hace streaming de la respuesta del LLM a la app token a token, con cuotas diarias por usuario para que el coste sea predecible.',
      ),
      l(
        'Supabase / Postgres secured with Row-Level Security and role-based moderation for communities and third-party reviews.',
        'Supabase / Postgres protegido con Row-Level Security y moderación por roles para comunidades y reseñas de terceros.',
      ),
      l(
        'Audition engine that normalises messy deadlines (“ASAP”, “always open”, several dates) into a clear traffic-light status.',
        'Motor de audiciones que normaliza plazos caóticos («ASAP», «siempre abierta», varias fechas) en un semáforo de estado claro.',
      ),
      l(
        'From a 15-hour MVP to native iOS & Android builds, plus newsletter and ads.',
        'De un MVP de 15 horas a apps nativas para iOS y Android, con newsletter y anuncios.',
      ),
    ],
    stack: ['React Native', 'Expo', 'Node.js', 'Supabase', 'PostgreSQL', 'OpenAI API'],
    link: { href: 'https://danza-app.com', label: 'danza-app.com' },
    flow: [
      [{ label: 'Expo app', sub: l('iOS · Android · Web', 'iOS · Android · Web') }],
      [
        { label: 'Node API', sub: l('token streaming', 'streaming de tokens') },
        { label: 'Quota guard', sub: l('daily limit per user', 'límite diario por usuario') },
      ],
      [
        { label: 'LLM', sub: l('review summaries', 'resúmenes de reseñas'), ai: true },
        { label: 'Supabase', sub: l('Postgres + RLS', 'Postgres + RLS') },
      ],
    ],
  },
];

export const alsoShipped: { title: L; body: L; tags: string[] }[] = [
  {
    title: l('Insurance generation platform', 'Plataforma de generación de seguros'),
    body: l(
      'Dynamic policy generation with advanced role and hierarchy management that streamlined day-to-day operations.',
      'Generación dinámica de pólizas con gestión avanzada de roles y jerarquías que agilizó la operativa diaria.',
    ),
    tags: ['Laravel', 'PHP'],
  },
  {
    title: l('Spanish e-invoicing compliance', 'Cumplimiento de facturación electrónica'),
    body: l(
      'VERIFACTU and non-VERIFACTU e-invoicing, plus Cuaderno 19 SEPA direct-debit remittances — built to the letter of Spanish law.',
      'Facturación VERIFACTU y no VERIFACTU, y remesas de domiciliación bancaria con Cuaderno 19, alineadas con la legislación española.',
    ),
    tags: ['VERIFACTU', 'SEPA', 'Laravel'],
  },
  {
    title: l('Legacy ERP, now on the web', 'ERP legado, ahora en la web'),
    body: l(
      'Brought the company’s VB6 desktop ERP to the browser through virtualization — business continuity without a risky rewrite.',
      'Llevé el ERP de escritorio en VB6 de la empresa al navegador mediante virtualización: continuidad de negocio sin una reescritura arriesgada.',
    ),
    tags: ['VB6', 'Virtualization'],
  },
  {
    title: l('CI/CD pipelines', 'Pipelines de CI/CD'),
    body: l(
      'Azure DevOps pipelines that cut deployment times and made releases reliable, speeding up the whole delivery cycle.',
      'Pipelines en Azure DevOps que redujeron los tiempos de despliegue e hicieron las releases fiables, acelerando todo el ciclo de entrega.',
    ),
    tags: ['Azure DevOps'],
  },
];

/* ------------------------------------------------------------------ */
/* Building with AI                                                    */
/* ------------------------------------------------------------------ */

export const aiApproach = {
  intro: l(
    'AI shows up twice in my work: as a feature users touch, and as the toolchain I build with. Same rule for both — it has to earn its place.',
    'La IA aparece dos veces en mi trabajo: como funcionalidad que toca el usuario y como herramienta con la que construyo. La regla es la misma en ambos casos: tiene que ganarse su sitio.',
  ),
  principles: [
    {
      tag: 'stream · scope · cap',
      title: l('AI features that feel instant and stay affordable', 'Funcionalidades IA rápidas y con coste controlado'),
      body: l(
        'Stream responses so they feel instant, keep keys and prompts server-side, and cap usage per user so the bill never surprises anyone. That is exactly how the review summaries in Danza App work.',
        'Hacer streaming para que la respuesta se sienta inmediata, mantener claves y prompts en el servidor y limitar el uso por usuario para que la factura no dé sustos. Así funcionan los resúmenes de reseñas de Danza App.',
      ),
    },
    {
      tag: 'agents write · I own',
      title: l('Coding agents as teammates', 'Agentes de código como compañeros de equipo'),
      body: l(
        'I pair with coding agents like Claude Code for scaffolding, refactors and reviews, and keep what matters for myself: architecture, specs, edge cases and the final review. This site was built that way.',
        'Trabajo con agentes como Claude Code para scaffolding, refactors y revisiones, y me quedo con lo importante: arquitectura, especificación, casos límite y la revisión final. Esta web se construyó así.',
      ),
    },
    {
      tag: 'precaution before scale',
      title: l('Guardrails before rollout', 'Salvaguardas antes de desplegar'),
      body: l(
        'A client wanted a new payment provider live for a campaign, with no docs and no load tests. I pushed for a sandbox, log analysis and a limited rollout — and caught a critical payment-confirmation bug before a single real customer hit it.',
        'Un cliente quería un nuevo proveedor de pagos en producción para una campaña, sin documentación ni pruebas de carga. Propuse entorno controlado, análisis de logs y despliegue limitado, y detectamos un fallo crítico en la confirmación de pagos antes de que lo sufriera un solo cliente real.',
      ),
    },
  ],
  machineReadable: {
    title: l('This page is AI-readable', 'Esta web se puede leer con IA'),
    body: l(
      'Screening with an AI assistant? Point it at these files — they are generated from the same source as this page.',
      '¿Filtras candidatos con un asistente de IA? Pásale estos archivos: se generan desde la misma fuente que esta página.',
    ),
  },
};

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

export type Job = {
  company?: string | L;
  role: L;
  period: L;
  place: L;
  summary: L;
  points: L[];
};

export const experience: Job[] = [
  {
    company: 'Danza App',
    role: l('Freelance Full-stack Developer', 'Desarrollador Full-stack freelance'),
    period: l('2025 — Present', '2025 — Actualidad'),
    place: l('Remote', 'Remoto'),
    summary: l(
      'End-to-end owner of a cross-platform app for professional dancers, working directly with the product owner.',
      'Responsable de punta a punta de una app multiplataforma para bailarines profesionales, trabajando directamente con el responsable de producto.',
    ),
    points: [
      l('LLM-powered review summaries with streaming and per-user quotas.', 'Resúmenes de reseñas con LLM, streaming y cuotas por usuario.'),
      l('Data model, Row-Level Security, roles and moderation on Supabase.', 'Modelo de datos, Row-Level Security, roles y moderación en Supabase.'),
      l('iOS & Android release with Expo, newsletter and ads.', 'Publicación en iOS y Android con Expo, newsletter y anuncios.'),
    ],
  },
  {
    company: 'Kong Software',
    role: l('Full-stack Developer', 'Desarrollador Full-stack'),
    period: l('Mar 2023 — Oct 2025', 'Mar 2023 — Oct 2025'),
    place: l('Seville, Spain', 'Sevilla, España'),
    summary: l(
      'Joined as an intern and grew into leading a team of four developers and owning client communication on production projects for insurance, retail and hospitality.',
      'Entré en prácticas y acabé liderando un equipo de cuatro desarrolladores y la comunicación con clientes en proyectos en producción de seguros, retail y hostelería.',
    ),
    points: [
      l('Led the self-service kiosk platform (Angular + Laravel), now in production.', 'Lideré la plataforma de kioscos de autoservicio (Angular + Laravel), hoy en producción.'),
      l('Pioneered AI-powered features such as intelligent order collection.', 'Impulsé funcionalidades con IA como la toma inteligente de pedidos.'),
      l('Built an insurance generation platform with role & hierarchy management.', 'Construí una plataforma de generación de seguros con gestión de roles y jerarquías.'),
      l('Shipped VERIFACTU e-invoicing and Cuaderno 19 direct debits.', 'Implementé facturación VERIFACTU y domiciliaciones con Cuaderno 19.'),
      l('Set up Azure DevOps CI/CD and brought a VB6 ERP to the web.', 'Monté CI/CD en Azure DevOps y llevé un ERP en VB6 a la web.'),
    ],
  },
  {
    role: l('Peer Programming Mentor', 'Mentor de programación entre iguales'),
    period: l('Sep 2022 — Feb 2023', 'Sep 2022 — Feb 2023'),
    place: l('Seville, Spain', 'Sevilla, España'),
    summary: l(
      'One-on-one mentoring for fellow students on core programming concepts and problem-solving.',
      'Mentorías individuales a compañeros sobre fundamentos de programación y resolución de problemas.',
    ),
    points: [],
  },
];

/* ------------------------------------------------------------------ */
/* Toolbox & education                                                 */
/* ------------------------------------------------------------------ */

export const toolbox: { group: L; items: string[] }[] = [
  {
    group: l('AI', 'IA'),
    items: ['OpenAI API', 'LLM streaming', 'Prompt design', 'Python', 'Claude Code'],
  },
  {
    group: l('Frontend', 'Frontend'),
    items: ['TypeScript', 'Angular', 'React Native', 'Expo', 'Astro', 'HTML & CSS'],
  },
  {
    group: l('Backend & data', 'Backend y datos'),
    items: ['PHP', 'Laravel', 'Node.js', 'Supabase', 'PostgreSQL', 'REST APIs'],
  },
  {
    group: l('Delivery', 'Entrega'),
    items: ['Azure DevOps', 'CI/CD', 'Git', 'POS & payment hardware', 'VERIFACTU'],
  },
];

export const education: { school: string; title: L; period: string | L; note?: L }[] = [
  {
    school: 'Universitat Oberta de Catalunya (UOC)',
    title: l('Bachelor’s in Computer Engineering', 'Grado en Ingeniería Informática'),
    period: l('2025 — Present', '2025 — Actualidad'),
    note: l('In progress, alongside full-time work', 'En curso, compaginado con trabajo a jornada completa'),
  },
  {
    school: 'HarvardX',
    title: l('CS50’s Introduction to Artificial Intelligence with Python', 'CS50’s Introduction to Artificial Intelligence with Python'),
    period: '2025',
    note: l('Search, knowledge, uncertainty, optimization, ML, neural networks, NLP', 'Búsqueda, conocimiento, incertidumbre, optimización, ML, redes neuronales, NLP'),
  },
  {
    school: 'Cámara de Comercio de Sevilla',
    title: l('Higher Vocational Diploma in Web Application Development', 'CFGS Desarrollo de Aplicaciones Web'),
    period: '2021 — 2023',
  },
];

/* ------------------------------------------------------------------ */
/* About & contact                                                     */
/* ------------------------------------------------------------------ */

export const about = {
  paragraphs: [
    l(
      'I started out in Telecommunications Engineering and realised the part I loved was the code — so I switched to web development and never looked back.',
      'Empecé en Ingeniería de Telecomunicación y me di cuenta de que lo que de verdad me gustaba era programar, así que me pasé al desarrollo web y no he mirado atrás.',
    ),
    l(
      'I joined Kong Software as an intern and stayed two and a half years, growing into leading a team of four and talking directly with clients. Today I build AI-powered products and study Computer Engineering at UOC in parallel — the tools change every month, the fundamentals don’t.',
      'Entré en Kong Software en prácticas y me quedé dos años y medio, hasta liderar un equipo de cuatro y tratar directamente con clientes. Hoy construyo productos con IA y estudio Ingeniería Informática en la UOC en paralelo: las herramientas cambian cada mes, los fundamentos no.',
    ),
    l(
      'I care about communication as much as code. Clients, teammates and managers all need to understand why something takes longer, or why it should be built differently — that is part of the job, not a distraction from it.',
      'Me importa la comunicación tanto como el código. Clientes, compañeros y responsables necesitan entender por qué algo tarda más o por qué conviene hacerlo de otra forma: eso es parte del trabajo, no una distracción.',
    ),
  ],
};

export const contact = {
  title: l('Let’s build something that *ships.*', 'Construyamos algo que *llegue a producción.*'),
  body: l(
    'I’m open to full-stack and AI engineering roles — remote, hybrid or in Seville. Email is the fastest way to reach me.',
    'Estoy abierto a roles full-stack y de ingeniería de IA, en remoto, híbrido o en Sevilla. El email es la forma más rápida de contactar conmigo.',
  ),
};

/* ------------------------------------------------------------------ */
/* UI strings                                                          */
/* ------------------------------------------------------------------ */

export const ui = {
  meta: {
    title: l('Pedro Martínez — Full-stack & AI Developer', 'Pedro Martínez — Desarrollador Full-stack & IA'),
    description: l(
      'Full-stack developer in Seville shipping AI features to production. Angular, Laravel, Node, Supabase and LLM integration. 3+ years, team lead experience.',
      'Desarrollador full-stack en Sevilla que lleva funcionalidades de IA a producción. Angular, Laravel, Node, Supabase e integración de LLMs. 3+ años y experiencia liderando equipos.',
    ),
  },
  nav: {
    work: l('Work', 'Proyectos'),
    ai: l('AI', 'IA'),
    experience: l('Experience', 'Experiencia'),
    about: l('About', 'Sobre mí'),
    contact: l('Contact', 'Contacto'),
  },
  sections: {
    work: l('Selected work', 'Proyectos destacados'),
    also: l('Also shipped', 'También en producción'),
    ai: l('Building with AI — and building AI', 'Construir con IA — y construir IA'),
    experience: l('Experience', 'Experiencia'),
    toolbox: l('Toolbox', 'Herramientas'),
    education: l('Education', 'Formación'),
    about: l('About', 'Sobre mí'),
    contact: l('Contact', 'Contacto'),
  },
  hero: {
    ctaWork: l('See my work', 'Ver proyectos'),
    ctaEmail: l('Email me', 'Escríbeme'),
    streaming: l('streaming', 'generando'),
    done: l('done', 'listo'),
    tldr: l('TL;DR for recruiters', 'TL;DR para recruiters'),
  },
  project: {
    highlights: l('What I built', 'Qué construí'),
    architecture: l('How it works', 'Cómo funciona'),
    outcome: l('Outcome', 'Resultado'),
    visit: l('Visit', 'Visitar'),
  },
  contact: {
    copy: l('Copy email', 'Copiar email'),
    copied: l('Copied', 'Copiado'),
  },
  footer: {
    built: l('Built with Astro and Claude Code.', 'Hecho con Astro y Claude Code.'),
    updated: l('Last updated', 'Actualizado'),
  },
  a11y: {
    skip: l('Skip to content', 'Saltar al contenido'),
    theme: l('Toggle color theme', 'Cambiar tema de color'),
    lang: l('Leer en español', 'Read in English'),
    langShort: l('ES', 'EN'),
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
    { profile, hero, featured, alsoShipped, aiApproach, experience, toolbox, education, about, contact, ui },
    locale,
  );
}

export type Content = ReturnType<typeof getContent>;
