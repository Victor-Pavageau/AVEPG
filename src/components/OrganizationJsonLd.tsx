import type { JSX } from 'react';
import { SITE_URL } from '../config/site';

export function OrganizationJsonLd(): JSX.Element {
  const siteUrl: string = SITE_URL ?? (globalThis.location && globalThis.location.origin) ?? '';

  const organization: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AVEPG',
    url: siteUrl,
    logo: `${siteUrl.replace(/\/$/, '')}/assets/logo.png`,
    sameAs: ['https://www.facebook.com/AVEPaysdeGex', 'https://www.instagram.com/avepgex/'],
  };

  const webSite: Record<string, string> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AVEPG',
    url: siteUrl,
  };

  const siteNavigation: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'SiteNavigationElement',
    name: ['Home', 'Events', 'Photos', 'Contact'],
    url: [`${siteUrl}/`, `${siteUrl}/events`, `${siteUrl}/photos`, `${siteUrl}/contact`],
  };

  // Return multiple JSON-LD scripts so search engines can pick them up regardless of placement.
  return (
    <>
      <script type='application/ld+json'>{JSON.stringify(organization)}</script>
      <script type='application/ld+json'>{JSON.stringify(webSite)}</script>
      <script type='application/ld+json'>{JSON.stringify(siteNavigation)}</script>
    </>
  );
}
