const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefix a site-relative path with the configured `base`. */
export const url = (path = '') => `${base}/${path.replace(/^\//, '')}`;

/** Split `*emphasis*` markers into segments for the serif accent. */
export const emphasis = (text: string) =>
  text.split(/(\*[^*]+\*)/g).filter(Boolean).map((part) =>
    part.startsWith('*') && part.endsWith('*')
      ? { text: part.slice(1, -1), em: true }
      : { text: part, em: false },
  );

/** Split text so hyphenated words (e.g. "full-stack") can be kept on one line. */
export const keepHyphens = (text: string) =>
  text.split(/(\S+-\S+)/g).filter(Boolean).map((part) => ({ text: part, nowrap: /\S-\S/.test(part) }));

/** Plain text without `*emphasis*` markers. */
export const plain = (text: string) => text.replace(/\*/g, '');
