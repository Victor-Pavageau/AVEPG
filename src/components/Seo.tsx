import type { i18n, TFunction } from 'i18next';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { makeAbsolute, SITE_URL } from '../config/site';
import pagesMeta from '../seo/pagesMeta.json';

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

  // Prefer centralized SITE_URL; fall back to runtime location when unavailable.
  const viteSiteUrl: string = SITE_URL ?? import.meta.env.VITE_SITE_URL ?? '';

  interface RouteMeta {
    title?: string;
    desc?: string;
    image?: string;
  }

  useEffect((): void => {
    const path: string =
      typeof globalThis !== 'undefined' && globalThis.location ? globalThis.location.pathname : '/';
    const routeMeta: RouteMeta =
      (pagesMeta as Record<string, RouteMeta>)[path] ??
      (pagesMeta as Record<string, RouteMeta>)['/'];

    const resolvedTitle: string = title ?? routeMeta.title ?? siteName;
    const fullTitle: string = resolvedTitle ? `${resolvedTitle} — ${siteName}` : siteName;
    // set document title
    document.title = fullTitle;

    // description
    const descContent: string =
      description || routeMeta.desc || t('home.welcome.description', { defaultValue: '' });
    setMeta('name', 'description', descContent);

    // Build canonical URL and ensure it always points to configured SITE_URL.
    const base: string = viteSiteUrl || globalThis.location.origin;
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
    const finalImage: string = makeAbsolute(image ?? routeMeta.image ?? fallback) ?? '';
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
  }, [title, description, image, url, t, i18n, viteSiteUrl, siteName]);

  return null;
}
