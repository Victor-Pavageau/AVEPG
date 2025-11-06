import type { i18n, TFunction } from 'i18next';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  title?: string;
  description?: string;
  /** Absolute or relative image path for social previews */
  image?: string;
  /** Absolute canonical URL. If omitted, built from VITE_SITE_URL or globalThis.location */
  url?: string;
};

export function Seo({ title, description, image, url }: Props): null {
  const { t, i18n }: { t: TFunction; i18n: i18n } = useTranslation();

  const siteName: string = t('home.shortTitle', { defaultValue: 'AVEPG' });
  const fullTitle: string = title ? `${title} — ${siteName}` : siteName;

  // Read Vite runtime env if exposed to client (VITE_SITE_URL). Use unknown cast to avoid `any` lint.
  const viteSiteUrl: string = import.meta.env.VITE_SITE_URL ?? '';

  useEffect((): void => {
    // set document title
    document.title = fullTitle;

    // description
    const descContent: string = description || t('home.welcome.description', { defaultValue: '' });
    setMeta('name', 'description', descContent);

    // Build canonical URL
    const base: string = viteSiteUrl ?? globalThis.location.origin;
    const canonicalHref: string =
      url ??
      `${base.replace(/\/$/, '')}${globalThis.location.pathname + globalThis.location.search}`;
    setLinkCanonical(canonicalHref);

    // Open Graph
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', descContent);
    setMeta('property', 'og:url', canonicalHref);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:locale', i18n?.language ?? 'en');

    // Twitter
    setMeta('name', 'twitter:card', image ? 'summary_large_image' : 'summary');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', descContent);

    // Image: use provided image or fallback to site-wide default
    const fallback: string = '/assets/og_default.jpg';
    const finalImage: string = makeAbsoluteUrl(image ?? fallback, base);
    if (finalImage) {
      setMeta('property', 'og:image', finalImage);
      setMeta('name', 'twitter:image', finalImage);
      // prefer large card when image present
      setMeta('name', 'twitter:card', 'summary_large_image');
    }

    function setMeta(kind: 'name' | 'property', key: string, value: string): void {
      try {
        const selector: string =
          kind === 'name' ? `meta[name="${key}"]` : `meta[property="${key}"]`;
        let el: HTMLMetaElement | null = document.head.querySelector(selector);
        if (el) {
          el.setAttribute('content', value);
        } else {
          el = document.createElement('meta');
          if (kind === 'name') {
            el.setAttribute('name', key);
          } else {
            el.setAttribute('property', key);
          }
          el.setAttribute('content', value);
          document.head.appendChild(el);
        }
      } catch {
        /* ignore when not in browser */
      }
    }

    function setLinkCanonical(href: string): void {
      try {
        let link: HTMLLinkElement | null = document.head.querySelector('link[rel="canonical"]');
        if (link) {
          link.href = href;
        } else {
          link = document.createElement('link');
          link.rel = 'canonical';
          link.href = href;
          document.head.appendChild(link);
        }
      } catch {
        /* ignore */
      }
    }

    function makeAbsoluteUrl(input: string, baseUrl: string): string {
      if (!input) {
        return input;
      }
      try {
        return new URL(input, baseUrl || undefined).toString();
      } catch {
        return input;
      }
    }
  }, [fullTitle, description, image, url, t, i18n, viteSiteUrl]);

  return null;
}
