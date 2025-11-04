import type { ListBlobResult, ListBlobResultBlob } from '@vercel/blob';
import { list, put } from '@vercel/blob';
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

  // Build a safe key
  const safeResource: string = encodeURIComponent(resource as string);
  const safeLocale: string = locale ? `-${encodeURIComponent(locale)}` : '';
  const key: string = `cache/${safeResource}${safeLocale}.json`;

  // Allowed methods header for 405 responses
  const allowed: string[] = ['GET', 'PUT'];
  res.setHeader('Allow', allowed.join(', '));

  const method: string = (req.method || '').toUpperCase();

  try {
    if (method === 'GET') {
      const blobs: ListBlobResult = await list({ prefix: key });
      const blob: ListBlobResultBlob | undefined = blobs.blobs.find(
        (b: ListBlobResultBlob) => b.pathname === key,
      );

      if (!blob) {
        res.status(404).json({ error: 'Not found' });
        return;
      }

      const resp: Response = await fetch(blob.url);
      const data: unknown = await resp.json();
      res.status(200).json(data);

      return;
    }

    if (method === 'PUT') {
      const body: VercelRequestBody = req.body;
      const data: string = typeof body === 'string' ? body : JSON.stringify(body ?? {});

      await put(key, data, {
        access: 'public',
        allowOverwrite: true,
        contentType: 'application/json',
      });

      res.status(200).json({ success: true });
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
