const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefix a site-relative path with the configured `base`. */
export const url = (path = '') => `${base}/${path.replace(/^\//, '')}`;
