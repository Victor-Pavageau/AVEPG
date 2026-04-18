import type { HeadBlobResult, ListBlobResult, ListBlobResultBlob } from '@vercel/blob';
import { head, list, put } from '@vercel/blob';
import type { VercelRequest, VercelRequestBody, VercelResponse } from '@vercel/node';

/**
 * Vercel Serverless function to get/put small JSON blobs used as a simple cache.
 * Query params:
 * - resource (required): cache resource name
 * - locale (optional): locale suffix
 */

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  const { resource, locale }: { resource?: string; locale?: string } = (req.query || {}) as {
    resource?: string;
    locale?: string;
  };

  // Validate required params early.
  if (!resource) {
    res.status(400).json({ error: 'Missing ?resource=' });

    return;
  }

  const key: string = buildKey(resource, locale);

  // Allowed methods header for 405 responses
  const allowed: string[] = ['GET', 'PUT'];
  res.setHeader('Allow', allowed.join(', '));

  const method: string = (req.method || '').toUpperCase();

  try {
    if (method === 'GET') {
      await handleGet(key, res);

      return;
    }

    if (method === 'PUT') {
      await handlePut(key, req, res);

      return;
    }

    // Method not allowed
    res.status(405).json({ error: 'Method not allowed' });

    return;
  } catch {
    res.status(500).json({ error: 'Internal server error' });

    return;
  }
}

function buildKey(resource: string | undefined, locale?: string): string {
  const safeResource: string = encodeURIComponent(resource as string);
  const safeLocale: string = locale ? `-${encodeURIComponent(locale)}` : '';

  return `cache/${safeResource}${safeLocale}.json`;
}

async function handleGet(key: string, res: VercelResponse): Promise<void> {
  try {
    const meta: HeadBlobResult = await head(key);

    const resp: Response = await fetch(meta.url);
    const data: unknown = await resp.json();
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    res.status(200).json(data);

    return;
  } catch (err: unknown) {
    const e: Error = err as Error;
    if (e?.name === 'BlobNotFoundError') {
      res.status(404).json({ error: 'Not found' });

      return;
    }

    // Fallback to listing (advanced op) only if head() failed for another reason.
    const blobs: ListBlobResult = await list({ prefix: key });
    const blob: ListBlobResultBlob | undefined = blobs.blobs.find(
      (b: ListBlobResultBlob) => b.pathname === key,
    );

    if (!blob) {
      res.status(404).json({ error: 'Not found' });

      return;
    }

    const resp2: Response = await fetch(blob.url);
    const data2: unknown = await resp2.json();
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    res.status(200).json(data2);

    return;
  }
}

async function handlePut(key: string, req: VercelRequest, res: VercelResponse): Promise<void> {
  const body: VercelRequestBody = req.body;
  const data: string = typeof body === 'string' ? body : JSON.stringify(body ?? {});

  await put(key, data, {
    access: 'public',
    allowOverwrite: true,
    contentType: 'application/json',
  });

  res.status(200).json({ success: true });
}
