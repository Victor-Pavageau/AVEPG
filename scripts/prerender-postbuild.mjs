import fs from 'node:fs/promises';
import path from 'node:path';

const rawSite = (process.env.VITE_SITE_URL || 'https://www.avepg.fr').toString();
const SITE = rawSite.trim().replace(/\/$/, '');
const distDir = path.resolve(process.cwd(), 'dist');

// Load page metadata from a shared JSON so prerender and the client share defaults
const pagesMetaPath = path.resolve(process.cwd(), 'src', 'seo', 'pagesMeta.json');
let pages = [];
try {
  const raw = await fs.readFile(pagesMetaPath, 'utf8');
  const obj = JSON.parse(raw);
  pages = Object.keys(obj).map((route) => ({ route, ...obj[route] }));
} catch (e) {
  // fallback to a minimal set if JSON missing
  pages = [
    {
      route: '/',
      title: 'Home',
      desc: 'AVEPG — Association des Villes et Entreprises du Pays de Gex.',
    },
    { route: '/about', title: 'About', desc: 'About AVEPG' },
    { route: '/events', title: 'Events', desc: 'Events' },
    { route: '/photos', title: 'Photos', desc: 'Photos' },
    { route: '/contact', title: 'Contact', desc: 'Contact' },
  ];
}

async function run() {
  try {
    const indexHtmlPath = path.join(distDir, 'index.html');
    const indexHtml = await fs.readFile(indexHtmlPath, 'utf8');

    for (const p of pages) {
      const outDir = p.route === '/' ? distDir : path.join(distDir, p.route.replace(/^\//, ''));
      await fs.mkdir(outDir, { recursive: true });

      // Build head insertion (minimal, conservative)
      const canonical = `${SITE}${p.route === '/' ? '/' : p.route}`;
      const title = `${p.title} — AVEPG`;
      const description = p.desc;
      const ogImage = `${SITE}/assets/og_default.jpg`;

      const jsonLdOrg = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'AVEPG',
        url: SITE,
        logo: `${SITE}/assets/logo.png`,
        sameAs: ['https://www.facebook.com/AVEPaysdeGex', 'https://www.instagram.com/avepgex/'],
      });

      const jsonLdWeb = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'AVEPG',
        url: SITE,
      });

      const jsonLdNav = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SiteNavigationElement',
        name: ['Home', 'Events', 'Photos', 'Contact'],
        url: [`${SITE}/`, `${SITE}/events`, `${SITE}/photos`, `${SITE}/contact`],
      });

      const metaBlock = `
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:site_name" content="AVEPG" />
    <meta property="og:image" content="${ogImage}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${ogImage}" />
    <script type="application/ld+json">${jsonLdOrg}</script>
    <script type="application/ld+json">${jsonLdWeb}</script>
    <script type="application/ld+json">${jsonLdNav}</script>
`;

      // Inject metaBlock before </head> (do not duplicate existing title)
      const outHtml = indexHtml.replace(
        /<\/head>/i,
        `${metaBlock}
    </head>`,
      );

      const targetPath = path.join(outDir, 'index.html');
      await fs.writeFile(targetPath, outHtml, 'utf8');
      console.log(`Wrote prerendered HTML for ${p.route} -> ${targetPath}`);
    }
  } catch (err) {
    console.error('Prerender failed:', err);
    process.exit(1);
  }
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

run();
