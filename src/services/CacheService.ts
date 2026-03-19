import { areStrapiResponsesEqual } from '../helpers';
import type { IStrapiObject, IStrapiResponse } from '../types';

export class CacheService {
  private static buildVercelStorageUrl(resource: string, locale?: string): string {
    const params: URLSearchParams = new URLSearchParams({ resource });

    if (locale) {
      params.set('locale', locale);
    }

    return `/api/cache?${params.toString()}`;
  }

  public static async readVercelCache<T = IStrapiResponse<IStrapiObject>>(
    resource: string,
    locale?: string,
  ): Promise<T | null> {
    try {
      const url: string = CacheService.buildVercelStorageUrl(resource, locale);
      const res: Response = await fetch(url);

      if (!res.ok) {
        return null;
      }

      const data: T | null = await res.json();

      return data ?? null;
    } catch {
      return null;
    }
  }

  /**
   * Backwards-compatible name: previously used a double-cache strategy. Now readCached
   * resolves to the remote Vercel cache only.
   */
  public static async readCached<T = IStrapiResponse<IStrapiObject>>(
    resource: string,
    locale?: string,
  ): Promise<T | null> {
    return await CacheService.readVercelCache<T>(resource, locale);
  }

  private static async setVercelCache<T = IStrapiResponse<IStrapiObject>>(
    resource: string,
    payload: T,
    locale?: string,
  ): Promise<void> {
    const url: string = CacheService.buildVercelStorageUrl(resource, locale);

    await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  }

  /**
   * Store payload in the Vercel blob store. Avoids unnecessary PUTs by reading the
   * current remote value and comparing with `areStrapiResponsesEqual`.
   */
  public static async setCache<T = IStrapiResponse<IStrapiObject>>(
    resource: string,
    payload: T,
    locale?: string,
  ): Promise<void> {
    try {
      const remote: T | null = await CacheService.readVercelCache<T>(resource, locale);

      if (remote !== null && areStrapiResponsesEqual(remote, payload)) {
        return;
      }

      await CacheService.setVercelCache<T>(resource, payload, locale);
    } catch {
      // best-effort: swallow
    }
  }
}
