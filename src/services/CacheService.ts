export class CacheService {
  private static buildUrl(resource: string, locale?: string): string {
    const params: URLSearchParams = new URLSearchParams({ resource });

    if (locale) {
      params.set('locale', locale);
    }

    return `/api/cache?${params.toString()}`;
  }

  /**
   * Read cached value from the serverless cache. Returns null when not found or on error.
   */
  public static async readCached<T = unknown>(
    resource: string,
    locale?: string,
  ): Promise<T | null> {
    try {
      const url: string = this.buildUrl(resource, locale);
      const res: Response = await fetch(url);

      if (!res.ok) {
        return null;
      }

      const data: T = (await res.json()) as T;
      return data;
    } catch {
      return null;
    }
  }

  /**
   * Store a payload in the cache. Returns true when the request succeeded.
   */
  public static async setCache<T = unknown>(
    resource: string,
    payload: T,
    locale?: string,
  ): Promise<boolean> {
    try {
      const url: string = this.buildUrl(resource, locale);
      const res: Response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        return false;
      }

      return true;
    } catch {
      return false;
    }
  }

  /**
   * Try to return cached data; if missing, call the provided fetcher and update the cache.
   * The cache update is attempted but failures do not prevent returning the fresh data.
   */
  public static async fetchAndUpdateCache<T = unknown>(
    resource: string,
    fetcher: () => Promise<T>,
    locale?: string,
  ): Promise<T> {
    const cached: T | null = await this.readCached<T>(resource, locale);
    if (cached !== null && typeof cached !== 'undefined') {
      return cached;
    }

    const fresh: T = await fetcher();

    this.setCache(resource, fresh, locale).catch();

    return fresh;
  }
}
