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
    const cached: IPartner[] | null = await CacheService.readCached<IPartner[] | null>(
      'partners',
      language,
    );

    if (cached) {
      this.updatePartners(language).catch();

      return cached;
    }

    return await this.updatePartners(language);
  }

  private static async updatePartners(language: string): Promise<IPartner[]> {
    const query: string = buildStrapiQueryUrl('partners', languageToIso6391(language));
    const response: Response = await fetch(query);

    if (!response.ok) {
      throw new Error('Failed to fetch partners');
    }

    const data: IPartner[] = await response.json();
    await CacheService.setCache('partners', data, language);

    return data;
  }

  public static async getEvents(language: string): Promise<IEvent[]> {
    const cached: IEvent[] | null = await CacheService.readCached<IEvent[] | null>(
      'events',
      language,
    );

    if (cached) {
      this.updateEvents(language).catch();

      return cached;
    }

    return await this.updateEvents(language);
  }

  private static async updateEvents(language: string): Promise<IEvent[]> {
    const query: string = buildStrapiQueryUrl('events', languageToIso6391(language));
    const response: Response = await fetch(query);

    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }

    const data: IEvent[] = await response.json();
    await CacheService.setCache('events', data, language);

    return data;
  }

  public static async getAlbums(language: string): Promise<IAlbum[]> {
    const cached: IAlbum[] | null = await CacheService.readCached<IAlbum[] | null>(
      'albums',
      language,
    );

    if (cached) {
      void this.updateAlbums(language);

      return cached;
    }

    return await this.updateAlbums(language);
  }

  private static async updateAlbums(language: string): Promise<IAlbum[]> {
    const query: string = buildStrapiQueryUrl('albums', languageToIso6391(language));
    const response: Response = await fetch(query);

    if (!response.ok) {
      throw new Error('Failed to fetch albums');
    }

    const data: IStrapiResponse<IAlbum> = await response.json();
    await CacheService.setCache('albums', data.data, language);

    return data.data;
  }

  public static async getHomePageCarousel(): Promise<IHomePageCarousel> {
    const cached: IHomePageCarousel | null =
      await CacheService.readCached<IHomePageCarousel>('home-page-carousels');

    if (cached) {
      this.updateHomePageCarousel().catch();

      return cached;
    }

    return await this.updateHomePageCarousel();
  }

  private static async updateHomePageCarousel(): Promise<IHomePageCarousel> {
    const query: string = buildStrapiQueryUrl('home-page-carousels');
    const response: Response = await fetch(query);

    if (!response.ok) {
      throw new Error('Failed to fetch home page carousel');
    }

    const data: IStrapiResponse<IHomePageCarousel> = await response.json();
    await CacheService.setCache('home-page-carousels', data.data[0]); // There should be only one carousel

    return data.data[0]; // There should be only one carousel
  }

  public static async getGexRetromobilesNews(language: string): Promise<IGexRetromobilesNew[]> {
    const cached: IGexRetromobilesNew[] | null = await CacheService.readCached<
      IGexRetromobilesNew[] | null
    >('gex-retromobiles-news', language);

    if (cached) {
      this.updateGexRetromobilesNews(language).catch();

      return cached;
    }

    return await this.updateGexRetromobilesNews(language);
  }

  private static async updateGexRetromobilesNews(language: string): Promise<IGexRetromobilesNew[]> {
    const query: string = buildStrapiQueryUrl('gex-retromobiles-news', languageToIso6391(language));
    const response: Response = await fetch(query);

    if (!response.ok) {
      throw new Error('Failed to fetch Gex Retromobiles news');
    }

    const data: IGexRetromobilesNew[] = await response.json();
    await CacheService.setCache('gex-retromobiles-news', data, language);

    return data;
  }
}
