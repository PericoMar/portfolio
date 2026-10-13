import type { APIRoute } from 'astro';
import { getContent } from '../data/content';
import { url } from '../lib/paths';

/** Plain-text profile for LLMs and AI screening tools (https://llmstxt.org). */
export const GET: APIRoute = ({ site }) => {
  const c = getContent('en');
  const abs = (p: string) => new URL(url(p), site).href;
  const strip = (s: string) => s.replace(/\*/g, '');

  const lines = [
    `# ${c.profile.name}`,
    '',
    `> ${c.profile.role} based in ${c.profile.location}. ${strip(c.hero.title)}`,
    '',
    c.hero.lead,
    '',
    '## At a glance',
    ...c.hero.facts.map((f) => `- ${f.k}: ${f.v}`),
    ...(c.profile.availability.show ? [`- Availability: ${c.profile.availability.label}`] : []),
    '',
    '## Contact',
    `- Email: ${c.profile.email}`,
    `- LinkedIn: ${c.profile.linkedin}`,
    `- GitHub: ${c.profile.github}`,
    '',
    '## Selected work',
    ...c.featured.flatMap((p) => [
      '',
      `### ${p.title}`,
      `${p.kicker}`,
      '',
      p.summary,
      ...p.highlights.map((h) => `- ${h}`),
      ...(p.outcome ? [`- Outcome: ${p.outcome}`] : []),
      `- Stack: ${p.stack.join(', ')}`,
      ...(p.link ? [`- Link: ${p.link.href}`] : []),
    ]),
    '',
    '### Also shipped',
    ...c.alsoShipped.map((a) => `- ${a.title}: ${a.body}`),
    '',
    '## How I build with AI',
    c.aiApproach.intro,
    ...c.aiApproach.principles.map((p) => `- ${p.title}: ${p.body}`),
    '',
    '## Experience',
    ...c.experience.flatMap((j) => [
      '',
      `### ${j.role}${j.company ? ` — ${j.company}` : ''} (${j.period}, ${j.place})`,
      j.summary,
      ...j.points.map((p) => `- ${p}`),
    ]),
    '',
    '## Skills',
    ...c.toolbox.map((g) => `- ${g.group}: ${g.items.join(', ')}`),
    '',
    '## Education',
    ...c.education.map((e) => `- ${e.title} — ${e.school} (${e.period})${e.note ? `. ${e.note}` : ''}`),
    '',
    '## Languages',
    ...c.profile.languages.map((l) => `- ${l.name}: ${l.level}`),
    '',
    '## About',
    ...c.about.paragraphs,
    '',
    '## Links',
    `- [Portfolio (English)](${abs('')})`,
    `- [Portfolio (Español)](${abs('es/')})`,
    `- [JSON Resume](${abs('resume.json')})`,
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
