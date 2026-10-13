import type { Locale } from '../data/content';

const months: Record<Locale, string[]> = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  es: ['ene.', 'feb.', 'mar.', 'abr.', 'may.', 'jun.', 'jul.', 'ago.', 'sep.', 'oct.', 'nov.', 'dic.'],
};

/** `'2025-10'` → `'Oct 2025'` / `'oct. 2025'`; `'2022'` → `'2022'`. */
export const formatMonth = (iso: string, locale: Locale) => {
  const [year, month] = iso.split('-');
  return month ? `${months[locale][Number(month) - 1]} ${year}` : year;
};

/** A start/end pair as a range; a missing end reads as "now". */
export const formatPeriod = (start: string, end: string | undefined, locale: Locale, now: string) =>
  `${formatMonth(start, locale)} – ${end ? formatMonth(end, locale) : now}`;

/** Split text on `{orgId}` placeholders so they can be rendered as chips. */
export const chipTokens = (text: string) =>
  text
    .split(/(\{[a-z0-9]+\})/g)
    .filter(Boolean)
    .map((part) => (/^\{[a-z0-9]+\}$/.test(part) ? { org: part.slice(1, -1) } : { text: part }));

/** Replace `{orgId}` placeholders with the organisation names, for plain-text outputs. */
export const plainChips = (text: string, orgs: Record<string, { name: string }>) =>
  text.replace(/\{([a-z0-9]+)\}/g, (_, id: string) => orgs[id]?.name ?? id);
