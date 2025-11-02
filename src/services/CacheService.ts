import type { IDBPDatabase } from 'idb';
import { openDB } from 'idb';

const DB_NAME: string = 'avepg-cache';
const DB_VERSION: number = 1;
const STORE_NAME: string = 'responses';

interface CacheMeta {
  fetchedAt: number;
  locale?: string;
}

export interface CacheEntry<T> {
  payload: T;
  meta: CacheMeta;
}

let dbPromise: Promise<IDBPDatabase<unknown>> | null = null;

function getDB(): Promise<IDBPDatabase<unknown>> {
  dbPromise ??= openDB(DB_NAME, DB_VERSION, {
    upgrade(db: IDBPDatabase<unknown>) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });

  return dbPromise;
}

export function makeKey(resource: string, locale?: string): string {
  return locale ? `${resource}::${locale}` : resource;
}

export async function readCached<T = unknown>(
  resource: string,
  locale?: string,
): Promise<CacheEntry<T> | null> {
  try {
    const db: IDBPDatabase<unknown> = await getDB();
    const key: string = makeKey(resource, locale);
    const entry: CacheEntry<T> = await db.get(STORE_NAME, key);
    return entry ?? null;
  } catch {
    return null;
  }
}

export async function setCache<T = unknown>(
  resource: string,
  payload: T,
  locale?: string,
): Promise<void> {
  const db: IDBPDatabase<unknown> = await getDB();
  const key: string = makeKey(resource, locale);
  const entry: CacheEntry<T> = { payload, meta: { fetchedAt: Date.now(), locale } };
  await db.put(STORE_NAME, entry, key);
}

export async function clearCache(resource?: string, locale?: string): Promise<void> {
  const db: IDBPDatabase<unknown> = await getDB();
  if (resource) {
    const key: string = makeKey(resource, locale);
    await db.delete(STORE_NAME, key);
  } else {
    await db.clear(STORE_NAME);
  }
}

export async function fetchAndUpdateCache<T = unknown>(
  resource: string,
  fetcher: () => Promise<T>,
  locale?: string,
): Promise<void> {
  const newPayload: T = await fetcher();
  await setCache(resource, newPayload, locale);
}
