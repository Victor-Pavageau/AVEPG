import { buildStrapiQueryUrl } from '../helpers';
import { languageToIso6391 } from '../i18n';
import type {
  IAlbum,
  IEvent,
  IGexRetromobilesNew,
  IHomePageCarousel,
  IPartner,
  IStrapiResponse,
} from '../types';
import { CacheService } from './CacheService';

export class StrapiService {
  public static async getPartners(language: string): Promise<IPartner[]> {
    const cached: IStrapiResponse<IPartner> | null = await CacheService.readCached(
      'partners',
      language,
    );

    if (cached) {
      void StrapiService.fetchAndCachePartners(language).catch();

      return cached.data;
    }

    return await StrapiService.fetchAndCachePartners(language);
  }

  private static async fetchAndCachePartners(language: string): Promise<IPartner[]> {
    const query: string = buildStrapiQueryUrl('partners', languageToIso6391(language));
    const response: Response = await fetch(query);

    if (!response.ok) {
      throw new Error('Failed to fetch partners');
    }

    const data: IStrapiResponse<IPartner> = await response.json();
    await CacheService.setCache('partners', data, language);

    return data.data;
  }

  public static async getEvents(language: string): Promise<IEvent[]> {
    const cached: IStrapiResponse<IEvent> | null = await CacheService.readCached(
      'events',
      language,
    );

    if (cached) {
      void StrapiService.fetchAndCacheEvents(language).catch();

      return cached.data;
    }

    return await StrapiService.fetchAndCacheEvents(language);
  }

  private static async fetchAndCacheEvents(language: string): Promise<IEvent[]> {
    const query: string = buildStrapiQueryUrl('events', languageToIso6391(language));
    const response: Response = await fetch(query);

    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }

    const data: IStrapiResponse<IEvent> = await response.json();
    await CacheService.setCache('events', data, language);

    return data.data;
  }

  public static async getAlbums(language: string): Promise<IAlbum[]> {
    const cached: IStrapiResponse<IAlbum> | null = await CacheService.readCached(
      'albums',
      language,
    );

    if (cached) {
      void StrapiService.fetchAndCacheAlbums(language).catch();

      return cached.data;
    }

    return await StrapiService.fetchAndCacheAlbums(language);
  }

  private static async fetchAndCacheAlbums(language: string): Promise<IAlbum[]> {
    const query: string = buildStrapiQueryUrl('albums', languageToIso6391(language));
    const response: Response = await fetch(query);

    if (!response.ok) {
      throw new Error('Failed to fetch albums');
    }

    const data: IStrapiResponse<IAlbum> = await response.json();
    await CacheService.setCache('albums', data, language);

    return data.data;
  }

  public static async getHomePageCarousel(): Promise<IHomePageCarousel> {
    const cached: IStrapiResponse<IHomePageCarousel> | null =
      await CacheService.readCached('home-page-carousels');

    if (cached) {
      void StrapiService.fetchAndCacheHomePageCarousel().catch();

      return cached.data[0]; // There should be only one carousel
    }

    return await StrapiService.fetchAndCacheHomePageCarousel();
  }

  private static async fetchAndCacheHomePageCarousel(): Promise<IHomePageCarousel> {
    const query: string = buildStrapiQueryUrl('home-page-carousels');
    const response: Response = await fetch(query);

    if (!response.ok) {
      throw new Error('Failed to fetch home page carousel');
    }

    const data: IStrapiResponse<IHomePageCarousel> = await response.json();
    await CacheService.setCache('home-page-carousels', data);

    return data.data[0]; // There should be only one carousel
  }

  public static async getGexRetromobilesNews(language: string): Promise<IGexRetromobilesNew[]> {
    const cached: IStrapiResponse<IGexRetromobilesNew> | null = await CacheService.readCached(
      'gex-retromobiles-news',
      language,
    );

    if (cached) {
      void StrapiService.fetchAndCacheRetromobilesNews(language).catch();

      return cached.data;
    }

    return await StrapiService.fetchAndCacheRetromobilesNews(language);
  }

  private static async fetchAndCacheRetromobilesNews(
    language: string,
  ): Promise<IGexRetromobilesNew[]> {
    const query: string = buildStrapiQueryUrl('gex-retromobiles-news', languageToIso6391(language));
    const response: Response = await fetch(query);

    if (!response.ok) {
      throw new Error('Failed to fetch Gex Retromobiles news');
    }

    const data: IStrapiResponse<IGexRetromobilesNew> = await response.json();
    await CacheService.setCache('gex-retromobiles-news', data, language);

    return data.data;
  }
}
