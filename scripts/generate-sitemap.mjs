import fs from 'node:fs/promises';
import path from 'node:path';

const VITE_SITE_URL = process.env.VITE_SITE_URL || 'https://www.avepg.fr';
const outPath = path.resolve(process.cwd(), 'public', 'sitemap.xml');

// List of routes to include in the sitemap. Add or extend as needed.
const staticRoutes = ['/', '/about', '/events', '/photos', '/contact'];

function formatDate(d = new Date()) {
  return d.toISOString().split('T')[0];
}

function buildUrl(loc, lastmod) {
  return `  <url>\n    <loc>${VITE_SITE_URL.replace(/\/$/, '')}${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
}

try {
  const lastmod = formatDate();

  const urls = staticRoutes.map((r) => buildUrl(r, lastmod)).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, xml, 'utf8');
  console.log(`Sitemap written to ${outPath} (VITE_SITE_URL=${VITE_SITE_URL})`);

  // Also write or update robots.txt with a Sitemap reference.
  // If a robots.txt exists, update an existing Sitemap: line or append one at the end.
  // If it doesn't exist, write a sensible default including the Sitemap line.
  const robotsPath = path.resolve(process.cwd(), 'public', 'robots.txt');
  const sitemapLine = `Sitemap: ${VITE_SITE_URL.replace(/\/$/, '')}/sitemap.xml`;

  // Read robots.txt if it exists; handle missing file gracefully.
  // Use a safe .catch to turn a read error into an empty string.
  let existing = (await fs.readFile(robotsPath, 'utf8').catch(() => '')) ?? '';

  // Use line-based operations to detect/replace the Sitemap line in linear time
  // and avoid backtracking-prone regex patterns.
  const lines = existing.length ? existing.split(/\r?\n/) : [];
  const hasSitemap = lines.some((line) => line.trimStart().toLowerCase().startsWith('sitemap:'));

  if (hasSitemap) {
    // Replace any line that starts with "Sitemap:" (case-insensitive)
    const updatedLines = lines.map((line) =>
      line.trimStart().toLowerCase().startsWith('sitemap:') ? sitemapLine : line,
    );
    const updated = updatedLines.join('\n');
    await fs.writeFile(robotsPath, updated, 'utf8');
    console.log(`Robots sitemap updated in ${robotsPath}`);
  } else {
    // Append sitemap line at the end, preserving existing content and using
    // built-in trimEnd to avoid regex backtracking issues.
    const appended = `${existing.trimEnd()}\n${sitemapLine}\n`;
    await fs.writeFile(robotsPath, appended, 'utf8');
    console.log(`Sitemap appended to existing robots at ${robotsPath}`);
  }
} catch (err) {
  console.error('Failed to write sitemap:', err);
  process.exit(1);
}
