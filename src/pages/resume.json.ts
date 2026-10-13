import type { APIRoute } from 'astro';
import { getContent } from '../data/content';
import { plainChips } from '../lib/format';
import { url } from '../lib/paths';

/** Profile in the JSON Resume format (https://jsonresume.org/schema). */
export const GET: APIRoute = ({ site }) => {
  const c = getContent('en');
  const abs = (p: string) => new URL(url(p), site).href;

  const resume = {
    $schema: 'https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json',
    basics: {
      name: c.profile.name,
      label: c.profile.headline,
      email: c.profile.email,
      url: abs(''),
      summary: c.intro.map((p) => plainChips(p, c.orgs)).join(' '),
      location: { city: 'Tomares', region: 'Andalucía', countryCode: 'ES' },
      profiles: [
        { network: 'LinkedIn', username: 'pedromargonz', url: c.profile.linkedin },
        { network: 'GitHub', username: 'PericoMar', url: c.profile.github },
      ],
    },
    work: c.experience.map((j) => ({
      name: c.orgs[j.org].name,
      position: j.role,
      location: j.type,
      startDate: j.start,
      endDate: j.end,
      summary: j.summary,
      highlights: j.points,
    })),
    projects: c.projects.map((p) => ({
      name: p.title,
      entity: c.orgs[p.org].name,
      description: p.body,
      keywords: [p.sub],
      startDate: p.start,
      endDate: p.end,
    })),
    education: c.education.map((e) => ({
      institution: e.school,
      area: e.degree,
      startDate: e.start,
      endDate: e.end,
    })),
    certificates: c.certifications.map((cert) => ({ name: cert.name, issuer: cert.issuer, date: cert.date })),
    skills: c.skills.map((g) => ({ name: g.group, keywords: g.items })),
    languages: c.languages.map((lang) => ({ language: lang.name, fluency: lang.level })),
    meta: { canonical: abs('resume.json'), lastModified: new Date().toISOString() },
  };

  return new Response(JSON.stringify(resume, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
