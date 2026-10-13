const root = document.documentElement;

/* Theme ------------------------------------------------------------- */

const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = () => root.dataset.theme ?? (systemDark.matches ? 'dark' : 'light');

document.querySelector('[data-theme-toggle]')?.addEventListener('click', () => {
  const next = currentTheme() === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  try {
    localStorage.setItem('theme', next);
  } catch {
    /* storage unavailable: the choice just won't persist */
  }
});

/* Sidebar: highlight the section being read --------------------------- */

const navLinks = [...document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]')];
const sections = navLinks
  .map((a) => document.querySelector<HTMLElement>(a.hash))
  .filter((s): s is HTMLElement => s !== null);

let frame = 0;
const markCurrent = () => {
  frame = 0;
  const line = window.innerHeight * 0.35;
  let current = '';
  for (const s of sections) if (s.getBoundingClientRect().top <= line) current = s.id;
  // The last sections are short, so at the very bottom of the page mark the last one.
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
  if (atBottom && sections.length) current = sections[sections.length - 1].id;
  for (const a of navLinks) {
    if (a.hash === `#${current}`) a.setAttribute('aria-current', 'true');
    else a.removeAttribute('aria-current');
  }
};

const onScroll = () => {
  if (!frame) frame = requestAnimationFrame(markCurrent);
};
markCurrent();
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll, { passive: true });

/* Hello, fellow developer -------------------------------------------- */

const base = import.meta.env.BASE_URL.replace(/\/$/, '');
console.log(
  `%cHi 👋 %cReading the source? Same. Machine-readable profile: ${base}/llms.txt · ${base}/resume.json`,
  'font-size:14px;font-weight:600',
  'font-size:12px;color:#0b3d91',
);
