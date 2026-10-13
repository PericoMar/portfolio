import type { APIRoute } from 'astro';
import { getContent } from '../data/content';
import { url } from '../lib/paths';

const months: Record<string, string> = {
  Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
  Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12',
};

/** "Mar 2023 — Oct 2025" → ["2023-03", "2025-10"]; "2025 — Present" → ["2025", undefined] */
const parsePeriod = (period: string) =>
  period.split('—').map((part) => {
    const m = part.trim().match(/^(?:([A-Z][a-z]{2}) )?(\d{4})$/);
    if (!m) return undefined;
    return m[1] ? `${m[2]}-${months[m[1]]}` : m[2];
  });

/** Profile in the JSON Resume format (https://jsonresume.org/schema). */
export const GET: APIRoute = ({ site }) => {
  const c = getContent('en');
  const abs = (p: string) => new URL(url(p), site).href;

  const resume = {
    $schema: 'https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json',
    basics: {
      name: c.profile.name,
      label: c.profile.role,
      email: c.profile.email,
      url: abs(''),
      summary: c.hero.lead,
      location: { city: 'Seville', countryCode: 'ES' },
      profiles: [
        { network: 'LinkedIn', username: 'pedromargonz', url: c.profile.linkedin },
        { network: 'GitHub', username: 'PericoMar', url: c.profile.github },
      ],
    },
    work: c.experience.map((j) => {
      const [startDate, endDate] = parsePeriod(j.period);
      return {
        name: j.company ?? undefined,
        position: j.role,
        location: j.place,
        startDate,
        endDate,
        summary: j.summary,
        highlights: j.points,
      };
    }),
    projects: c.featured.map((p) => ({
      name: p.title,
      description: p.summary,
      highlights: p.highlights,
      keywords: p.stack,
      url: p.link?.href,
    })),
    education: c.education.map((e) => {
      const [startDate, endDate] = parsePeriod(e.period);
      return { institution: e.school, studyType: e.title, startDate, endDate };
    }),
    skills: c.toolbox.map((g) => ({ name: g.group, keywords: g.items })),
    languages: c.profile.languages.map((l) => ({ language: l.name, fluency: l.level })),
    meta: { canonical: abs('resume.json'), lastModified: new Date().toISOString() },
  };

  return new Response(JSON.stringify(resume, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
