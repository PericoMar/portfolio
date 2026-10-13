const root = document.documentElement;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

/* Nav: background on scroll + active section ------------------------- */

const nav = document.querySelector<HTMLElement>('[data-nav]');
const onScroll = () => nav?.classList.toggle('is-scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

const navLinks = [...document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]')];
// The hero (#top) is observed too, so no link is marked current while it is in view.
const sections = ['#top', ...navLinks.map((a) => a.hash)]
  .map((hash) => document.querySelector<HTMLElement>(hash))
  .filter((s): s is HTMLElement => s !== null);

const sectionObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      for (const a of navLinks) a.setAttribute('aria-current', String(a.hash === `#${entry.target.id}`));
    }
  },
  { rootMargin: '-45% 0px -50% 0px' },
);
sections.forEach((s) => sectionObserver.observe(s));

/* Reveal on scroll --------------------------------------------------- */

const revealObserver = new IntersectionObserver(
  (entries, obs) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-visible');
      obs.unobserve(entry.target);
    }
  },
  { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
);
document.querySelectorAll('[data-reveal]').forEach((el) => revealObserver.observe(el));

/* Hero: stream the summary like an LLM response ---------------------- */

function streamText(el: HTMLElement) {
  const status = document.querySelector<HTMLElement>('[data-stream-status]');
  const statusText = status?.querySelector<HTMLElement>('[data-stream-text]');
  const text = el.textContent ?? '';
  if (!text.trim()) return;

  // Word-level "tokens"; whitespace is kept as plain text so wrapping is unchanged.
  const parts = text.split(/(\s+)/);
  el.textContent = '';
  const tokens: HTMLSpanElement[] = [];
  for (const part of parts) {
    if (/^\s+$/.test(part)) {
      el.append(part);
    } else if (part) {
      const span = document.createElement('span');
      span.className = 'tok is-pending';
      span.textContent = part;
      el.append(span);
      tokens.push(span);
    }
  }
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  cursor.setAttribute('aria-hidden', 'true');
  el.append(cursor);

  status?.classList.add('is-streaming');
  if (statusText) statusText.textContent = status?.dataset.labelStreaming ?? '';

  const start = performance.now();
  let i = 0;
  const tick = () => {
    // Reveal 1–3 tokens per frame-ish step, like a real token stream.
    const burst = 1 + Math.floor(Math.random() * 3);
    for (let k = 0; k < burst && i < tokens.length; k++, i++) {
      tokens[i].classList.remove('is-pending');
    }
    // Keep the cursor right after the last revealed token.
    const last = tokens[i - 1];
    if (last) last.after(cursor);

    if (i < tokens.length) {
      window.setTimeout(tick, 28 + Math.random() * 60);
    } else {
      const secs = ((performance.now() - start) / 1000).toFixed(1);
      const approxTokens = Math.round(text.length / 4);
      status?.classList.remove('is-streaming');
      if (statusText) statusText.textContent = `${status?.dataset.labelDone ?? 'done'} · ${secs}s · ~${approxTokens} tokens`;
      window.setTimeout(() => cursor.remove(), 2400);
    }
  };
  window.setTimeout(tick, 650);
}

const streamEl = document.querySelector<HTMLElement>('[data-stream]');
if (streamEl && !reducedMotion) streamText(streamEl);

/* Cards: pointer spotlight ------------------------------------------- */

if (window.matchMedia('(hover: hover)').matches) {
  document.querySelectorAll<HTMLElement>('[data-spotlight]').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });
}

/* Copy email --------------------------------------------------------- */

document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((btn) => {
  const label = btn.querySelector<HTMLElement>('[data-copy-label]');
  const original = label?.textContent ?? '';
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy ?? '');
      btn.classList.add('is-done');
      if (label) label.textContent = btn.dataset.labelDone ?? original;
      window.setTimeout(() => {
        btn.classList.remove('is-done');
        if (label) label.textContent = original;
      }, 2000);
    } catch {
      window.location.href = `mailto:${btn.dataset.copy}`;
    }
  });
});

/* Hello, fellow developer -------------------------------------------- */

const base = import.meta.env.BASE_URL.replace(/\/$/, '');
console.log(
  `%cHi 👋 %cReading the source? Same. Machine-readable profile: ${base}/llms.txt · ${base}/resume.json`,
  'font-size:14px;font-weight:600',
  'font-size:12px;color:#575eff',
);
