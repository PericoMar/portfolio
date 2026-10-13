import type { APIRoute } from 'astro';
import { getContent } from '../data/content';
import { formatMonth, formatPeriod, plainChips } from '../lib/format';
import { url } from '../lib/paths';

/** Plain-text profile for LLMs and AI screening tools (https://llmstxt.org). */
export const GET: APIRoute = ({ site }) => {
  const c = getContent('en');
  const abs = (p: string) => (/^https?:/.test(p) ? p : new URL(url(p), site).href);
  const period = (start: string, end?: string) => formatPeriod(start, end, 'en', 'present');

  const lines = [
    `# ${c.profile.name}`,
    '',
    `> ${c.profile.headline} based in ${c.profile.location}.`,
    '',
    ...c.intro.flatMap((p) => [plainChips(p, c.orgs), '']),
    '## Contact',
    `- Email: ${c.profile.email}`,
    `- LinkedIn: ${c.profile.linkedin}`,
    `- GitHub: ${c.profile.github}`,
    ...(c.profile.availability.show ? [`- Availability: ${c.profile.availability.label}`] : []),
    '',
    '## Experience',
    ...c.experience.flatMap((j) => [
      '',
      `### ${j.role} — ${c.orgs[j.org].name} (${period(j.start, j.end)} · ${j.type})`,
      ...[j.summary, ...j.points].map((p) => `- ${p}`),
      `- Stack: ${j.stack.join(', ')}`,
    ]),
    '',
    '## AI',
    ...c.ai.map(
      (a) =>
        `- ${a.title} (${a.sub}${a.meta ? `, ${a.meta}` : ''}): ${a.body}` +
        (a.links ? ` ${a.links.map((link) => abs(link.href)).join(', ')}` : ''),
    ),
    '',
    '## Projects',
    ...c.projects.flatMap((p) => [
      '',
      `### ${p.title} — ${c.orgs[p.org].name}, ${p.sub} (${period(p.start, p.end)})`,
      p.body,
      ...(p.stack ? [`- Stack: ${p.stack.join(', ')}`] : []),
      ...(p.links ?? []).map((link) => `- ${link.label}: ${abs(link.href)}`),
    ]),
    '',
    '## Skills',
    ...c.skills.map((g) => `- ${g.group}: ${g.items.join(', ')}`),
    '',
    '## Languages',
    ...c.languages.map((lang) => `- ${lang.name}: ${lang.level}`),
    '',
    '## Education',
    ...c.education.map((e) => `- ${e.degree} — ${e.school} (${period(e.start, e.end)})`),
    '',
    '## Certifications',
    ...c.certifications.map((cert) => `- ${cert.name} — ${cert.issuer}${cert.date ? ` (${formatMonth(cert.date, 'en')})` : ''}`),
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
