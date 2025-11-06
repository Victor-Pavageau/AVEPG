import type { JSX } from 'react';

export function OrganizationJsonLd(): JSX.Element {
  const siteUrl: string = import.meta.env.VITE_SITE_URL ?? globalThis.location.origin;

  const org: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AVEPG',
    url: siteUrl,
    logo: `${siteUrl.replace(/\/$/, '')}/assets/logo.png`,
    sameAs: ['https://www.facebook.com/AVEPaysdeGex', 'https://www.instagram.com/avepgex/'],
  };

  return <script type='application/ld+json'>{JSON.stringify(org)}</script>;
}
