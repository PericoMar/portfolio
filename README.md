# Pedro Martínez — Portfolio

Personal portfolio focused on full-stack and AI engineering roles.
Live at **https://pericomar.github.io/portfolio/** (English) and **/es/** (Spanish).

## Stack

- [Astro](https://astro.build) — static output, zero client framework, a few lines of vanilla TS.
- Self-hosted fonts (Geist, Geist Mono, Instrument Serif) — no third-party requests.
- GitHub Actions → GitHub Pages on every push to `main`.

## Editing content

Everything lives in **`src/data/content.ts`** — profile, projects, experience, skills and all UI strings,
in English and Spanish (`l('english', 'español')`). The pages, `/llms.txt` and `/resume.json`
are all generated from that file, so it is the only place you need to touch.

- Hide the "open to roles" pill: `profile.availability.show = false`.
- Text wrapped in `*asterisks*` in titles renders in the serif accent.

## Machine-readable profile

- `/llms.txt` — plain-text profile for LLMs and AI screening tools ([llmstxt.org](https://llmstxt.org)).
- `/resume.json` — [JSON Resume](https://jsonresume.org/schema) format.
- JSON-LD `Person` schema, Open Graph image, sitemap and `hreflang` alternates.

## Development

```bash
npm install
npm run dev       # http://localhost:4321/portfolio/
npm run build     # type-check + static build into dist/
npm run preview
```

Requires Node ≥ 22.12.

## Deploy

1. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions** (one-time).
2. Push to `main`. The workflow in `.github/workflows/deploy.yml` builds and publishes.

Moving to a custom domain: set `site` to the domain and `base` to `'/'` in `astro.config.mjs`.
