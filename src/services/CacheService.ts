import { openDB, type IDBPDatabase } from 'idb';
import { areStrapiResponsesEqual } from '../helpers';
import type { IStrapiObject, IStrapiResponse } from '../types';

export class CacheService {
  private static readonly DB_NAME: string = 'avepg-cache';
  private static readonly DB_VERSION: number = 1;
  private static readonly STORE_NAME: string = 'responses';

  private static dbPromise: Promise<IDBPDatabase<unknown>> | null = null;

  private static getDB(): Promise<IDBPDatabase<unknown>> {
    CacheService.dbPromise ??= openDB(CacheService.DB_NAME, CacheService.DB_VERSION, {
      upgrade(db: IDBPDatabase<unknown>) {
        if (!db.objectStoreNames.contains(CacheService.STORE_NAME)) {
          db.createObjectStore(CacheService.STORE_NAME);
        }
      },
    });

    return CacheService.dbPromise;
  }

  private static makeKey(resource: string, locale?: string): string {
    return locale ? `${resource}::${locale}` : resource;
  }

  private static buildVercelStorageUrl(resource: string, locale?: string): string {
    const params: URLSearchParams = new URLSearchParams({ resource });

    if (locale) {
      params.set('locale', locale);
    }

    return `/api/cache?${params.toString()}`;
  }

  private static async readIndexedDBCache<T = IStrapiResponse<IStrapiObject>>(
    resource: string,
    locale?: string,
  ): Promise<T | null> {
    try {
      const db: IDBPDatabase<unknown> = await CacheService.getDB();
      const key: string = CacheService.makeKey(resource, locale);
      const entry: T | null = await db.get(CacheService.STORE_NAME, key);

      return entry ?? null;
    } catch {
      return null;
    }
  }

  private static async readVercelCache<T = IStrapiResponse<IStrapiObject>>(
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
   * Read cached value using a double-cache strategy:
   * 1. Try IndexedDB first. If found, return the payload.
   * 2. If not found locally, try the Vercel serverless cache (/api/cache).
   *    If found remotely, persist it into IndexedDB and return the payload.
   * 3. Otherwise return null.
   */
  public static async readCached<T = IStrapiResponse<IStrapiObject>>(
    resource: string,
    locale?: string,
  ): Promise<T | null> {
    const indexedDBResult: T | null = await CacheService.readIndexedDBCache<T>(resource, locale);

    if (indexedDBResult !== null) {
      return indexedDBResult;
    }

    const vercelResult: T | null = await CacheService.readVercelCache<T>(resource, locale);

    if (vercelResult !== null) {
      void CacheService.setIndexedDBCache<T>(resource, vercelResult, locale).catch();

      return vercelResult;
    }

    return null;
  }

  private static async setIndexedDBCache<T = IStrapiResponse<IStrapiObject>>(
    resource: string,
    payload: T,
    locale?: string,
  ): Promise<void> {
    const db: IDBPDatabase<unknown> = await CacheService.getDB();
    const key: string = CacheService.makeKey(resource, locale);
    await db.put(CacheService.STORE_NAME, payload, key);
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
   * Store payload in both IndexedDB and Vercel Storage.
   * IndexedDB write is best-effort and performed first. The serverless write is attempted and
   * the method returns true when the serverless write succeeded (false otherwise).
   */
  public static async setCache<T = IStrapiResponse<IStrapiObject>>(
    resource: string,
    payload: T,
    locale?: string,
  ): Promise<void> {
    const indexedDBCache: T | null = await CacheService.readIndexedDBCache<T>(resource, locale);

    if (indexedDBCache !== null && areStrapiResponsesEqual(indexedDBCache, payload)) {
      // Cached data is identical to retrieved payload, no writes needed
      return;
    }

    await CacheService.setIndexedDBCache<T>(resource, payload, locale).catch();
    await CacheService.setVercelCache<T>(resource, payload, locale).catch();
  }
}
