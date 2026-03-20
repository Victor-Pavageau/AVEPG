export const SITE_URL: string = import.meta.env.VITE_SITE_URL.trim().replace(/\/$/, '');

export function makeAbsolute(href: string | undefined): string | undefined {
  if (!href) {
    return undefined;
  }
  try {
    return new URL(href, SITE_URL).toString();
  } catch {
    return href;
  }
}
