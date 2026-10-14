# Pedro Martínez — Portfolio

Personal portfolio for development recruiters, with an emphasis on AI.
Live at **https://pedro-martinez-portfolio.vercel.app/** (English) and **/es/** (Spanish).

Minimal layout inspired by [nitya.ca](https://www.nitya.ca/): fixed sidebar, everything in lowercase,
logo chips in the intro and table-like rows for each section.

## Stack

- [Astro](https://astro.build) — static output, zero client framework, a few lines of vanilla TS.
- Self-hosted Geist font — no third-party requests.
- Hosted on [Vercel](https://vercel.com) (project `pedro-martinez-portfolio`).

## Editing content

Everything lives in **`src/data/content.ts`** — profile, experience, AI, projects, skills, education,
certifications and all UI strings, in English and Spanish (`l('english', 'español')`). The pages,
`/llms.txt` and `/resume.json` are all generated from that file, so it is the only place you need to touch.
The content mirrors the [LinkedIn profile](https://www.linkedin.com/in/pedromargonz/); update it from there.

- Show the "open to roles" line in the sidebar: `profile.availability.show = true`.
- `{orgId}` inside the intro renders a logo chip from `orgs`, with a hover card. Logos are 64px PNGs in
  `public/logos/`, taken from each organisation's official site; without `logo`, a monogram tile is drawn.
- Dates are ISO months (`'2025-10'`); leave `end` out for "present".
- The source text keeps normal casing; the lowercase look is CSS only (`text-transform` on `body`).

## Machine-readable profile

- `/llms.txt` — plain-text profile for LLMs and AI screening tools ([llmstxt.org](https://llmstxt.org)).
- `/resume.json` — [JSON Resume](https://jsonresume.org/schema) format.
- JSON-LD `Person` schema, Open Graph image, sitemap and `hreflang` alternates.

## Development

```bash
npm install
npm run dev       # http://localhost:4321/
npm run build     # type-check + static build into dist/
npm run preview
```

Requires Node ≥ 22.12.

## Deploy

```bash
vercel deploy --prod
```

`site` in `astro.config.mjs` comes from Vercel's `VERCEL_PROJECT_PRODUCTION_URL`, so once a custom domain
is added to the project, the next deploy switches canonical URLs, the sitemap and the OG image to it.
