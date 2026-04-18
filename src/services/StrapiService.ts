import { buildStrapiQueryUrl } from '../helpers';
import { languageToIso6391 } from '../i18n';
import type {
  IAlbum,
  IEvent,
  IGexRetromobileInfos,
  IGexRetromobilesNew,
  IHomePageCarousel,
  IPartner,
  IStrapiObject,
  IStrapiResponse,
  StrapiEntity,
} from '../types';
import { CacheService } from './CacheService';

export class StrapiService {
  private static readonly STRAPI_FALLBACK_MS: number = 500;
  private static readonly WARMED_TTL_MS: number = 10 * 60 * 1000; // 10 minutes
  private static readonly warmed: Map<string, number> = new Map();

  private static makeKey(resource: string, locale?: string): string {
    return locale ? `${resource}::${locale}` : resource;
  }

  private static async fetchWithFallback<T extends IStrapiObject>(
    resource: StrapiEntity,
    query: string,
    locale?: string,
  ): Promise<IStrapiResponse<T>> {
    const key: string = StrapiService.makeKey(resource, locale);

    const fetchPromise: Promise<IStrapiResponse<T>> = (async (): Promise<IStrapiResponse<T>> => {
      const response: Response = await fetch(query);

      if (!response.ok) {
        throw new Error(`Failed to fetch ${resource}`);
      }

      const data: IStrapiResponse<T> = await response.json();
      void CacheService.setCache(resource, data, locale).catch(() => {});
      StrapiService.warmed.set(key, Date.now());

      return data;
    })();

    const timeoutPromise: Promise<never> = new Promise<never>(
      (_resolve: (_: PromiseLike<never>) => void, reject: (_?: unknown) => void) => {
        setTimeout(() => reject(new Error('STRAPI_TIMEOUT')), StrapiService.STRAPI_FALLBACK_MS);
      },
    );

    try {
      const result: IStrapiResponse<T> = await Promise.race([fetchPromise, timeoutPromise]);

      return result;
    } catch (err: unknown) {
      const e: Error = err as Error;

      if (e.message !== 'STRAPI_TIMEOUT') {
        throw err;
      }

      const warmedAt: number | undefined = StrapiService.warmed.get(key);

      if (warmedAt && Date.now() - warmedAt < StrapiService.WARMED_TTL_MS) {
        // Strapi has warmed recently; wait for the fetch to finish
        return await fetchPromise;
      }

      // Try Vercel cache as fallback
      const cached: IStrapiResponse<T> | null = await CacheService.readCached<IStrapiResponse<T>>(
        resource,
        locale,
      );

      if (cached) {
        // return cached while fetchPromise continues in background and will update Vercel when done
        return cached;
      }

      // No remote cache, wait for Strapi response
      return await fetchPromise;
    }
  }

  public static async getPartners(language: string): Promise<IPartner[]> {
    const query: string = buildStrapiQueryUrl('partners', languageToIso6391(language));
    const data: IStrapiResponse<IPartner> = await StrapiService.fetchWithFallback<IPartner>(
      'partners',
      query,
      language,
    );

    return data.data;
  }

  public static async getEvents(language: string): Promise<IEvent[]> {
    const query: string = buildStrapiQueryUrl('events', languageToIso6391(language));
    const data: IStrapiResponse<IEvent> = await StrapiService.fetchWithFallback<IEvent>(
      'events',
      query,
      language,
    );

    return data.data;
  }

  public static async getAlbums(language: string): Promise<IAlbum[]> {
    const query: string = buildStrapiQueryUrl('albums', languageToIso6391(language));
    const data: IStrapiResponse<IAlbum> = await StrapiService.fetchWithFallback<IAlbum>(
      'albums',
      query,
      language,
    );

    return data.data;
  }

  public static async getHomePageCarousel(): Promise<IHomePageCarousel> {
    const query: string = buildStrapiQueryUrl('home-page-carousels');
    const data: IStrapiResponse<IHomePageCarousel> =
      await StrapiService.fetchWithFallback<IHomePageCarousel>('home-page-carousels', query);

    return data.data[0];
  }

  public static async getGexRetromobilesNews(language: string): Promise<IGexRetromobilesNew[]> {
    const query: string = buildStrapiQueryUrl('gex-retromobiles-news', languageToIso6391(language));
    const data: IStrapiResponse<IGexRetromobilesNew> =
      await StrapiService.fetchWithFallback<IGexRetromobilesNew>(
        'gex-retromobiles-news',
        query,
        language,
      );

    return data.data;
  }

  public static async getGexRetromobileInfos(
    language: string,
  ): Promise<IGexRetromobileInfos | null> {
    const query: string = buildStrapiQueryUrl(
      'gex-retromobiles-infos',
      languageToIso6391(language),
    );
    const data: IStrapiResponse<IGexRetromobileInfos> =
      await StrapiService.fetchWithFallback<IGexRetromobileInfos>(
        'gex-retromobiles-infos',
        query,
        language,
      );

    return data.data.length > 0 ? data.data[0] : null;
  }
}
