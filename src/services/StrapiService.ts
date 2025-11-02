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
import type { CacheEntry } from './CacheService';
import { fetchAndUpdateCache, readCached, setCache } from './CacheService';

export class StrapiService {
  public static async getPartners(language: string): Promise<IPartner[]> {
    const locale: string = languageToIso6391(language);
    const cached: CacheEntry<IPartner[]> | null = await readCached<IPartner[]>('partners', locale);
    if (cached?.payload) {
      void fetchAndUpdateCache<IPartner[]>(
        'partners',
        () => this.fetchPartners(language),
        locale,
      ).catch(() => undefined);
      return cached.payload;
    }

    const payload: IPartner[] = await this.fetchPartners(language);
    await setCache<IPartner[]>('partners', payload, locale);
    return payload;
  }

  private static async fetchPartners(language: string): Promise<IPartner[]> {
    const query: string = buildStrapiQueryUrl('partners', languageToIso6391(language));
    const response: Response = await fetch(query);

    if (!response.ok) {
      throw new Error(`Failed to fetch partners: ${response.status} ${response.statusText}`);
    }

    const data: IStrapiResponse<IPartner> = await response.json();
    return data.data;
  }

  public static async getEvents(language: string): Promise<IEvent[]> {
    const locale: string = languageToIso6391(language);
    const cached: CacheEntry<IEvent[]> | null = await readCached<IEvent[]>('events', locale);
    if (cached?.payload) {
      void fetchAndUpdateCache<IEvent[]>('events', () => this.fetchEvents(language), locale).catch(
        () => undefined,
      );
      return cached.payload;
    }

    const payload: IEvent[] = await this.fetchEvents(language);
    await setCache<IEvent[]>('events', payload, locale);
    return payload;
  }

  private static async fetchEvents(language: string): Promise<IEvent[]> {
    const query: string = buildStrapiQueryUrl('events', languageToIso6391(language));
    const response: Response = await fetch(query);

    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.status} ${response.statusText}`);
    }

    const data: IStrapiResponse<IEvent> = await response.json();
    return data.data;
  }

  public static async getAlbums(language: string): Promise<IAlbum[]> {
    const locale: string = languageToIso6391(language);
    const cached: CacheEntry<IAlbum[]> | null = await readCached<IAlbum[]>('albums', locale);
    if (cached?.payload) {
      void fetchAndUpdateCache<IAlbum[]>('albums', () => this.fetchAlbums(language), locale).catch(
        () => undefined,
      );
      return cached.payload;
    }

    const payload: IAlbum[] = await this.fetchAlbums(language);
    await setCache<IAlbum[]>('albums', payload, locale);
    return payload;
  }

  private static async fetchAlbums(language: string): Promise<IAlbum[]> {
    const query: string = buildStrapiQueryUrl('albums', languageToIso6391(language));
    const response: Response = await fetch(query);

    if (!response.ok) {
      throw new Error(`Failed to fetch albums: ${response.status} ${response.statusText}`);
    }

    const data: IStrapiResponse<IAlbum> = await response.json();
    return data.data;
  }

  public static async getHomePageCarousel(): Promise<IHomePageCarousel> {
    const cached: CacheEntry<IHomePageCarousel> | null =
      await readCached<IHomePageCarousel>('home-page-carousels');
    if (cached?.payload) {
      void fetchAndUpdateCache<IHomePageCarousel>('home-page-carousels', () =>
        this.fetchHomePageCarousel(),
      ).catch(() => undefined);
      return cached.payload;
    }

    const payload: IHomePageCarousel = await this.fetchHomePageCarousel();
    await setCache<IHomePageCarousel>('home-page-carousels', payload);
    return payload;
  }

  private static async fetchHomePageCarousel(): Promise<IHomePageCarousel> {
    const query: string = buildStrapiQueryUrl('home-page-carousels');
    const response: Response = await fetch(query);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch home page carousel: ${response.status} ${response.statusText}`,
      );
    }

    const data: IStrapiResponse<IHomePageCarousel> = await response.json();
    return data.data[0]; // There is only one home page carousel entry
  }

  public static async getGexRetromobilesNews(language: string): Promise<IGexRetromobilesNew[]> {
    const locale: string = languageToIso6391(language);
    const cached: CacheEntry<IGexRetromobilesNew[]> | null = await readCached<
      IGexRetromobilesNew[]
    >('gex-retromobiles-news', locale);
    if (cached?.payload) {
      void fetchAndUpdateCache<IGexRetromobilesNew[]>(
        'gex-retromobiles-news',
        () => this.fetchGexRetromobilesNews(language),
        locale,
      ).catch(() => undefined);
      return cached.payload;
    }

    const payload: IGexRetromobilesNew[] = await this.fetchGexRetromobilesNews(language);
    await setCache<IGexRetromobilesNew[]>('gex-retromobiles-news', payload, locale);
    return payload;
  }

  private static async fetchGexRetromobilesNews(language: string): Promise<IGexRetromobilesNew[]> {
    const query: string = buildStrapiQueryUrl('gex-retromobiles-news', languageToIso6391(language));
    const response: Response = await fetch(query);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch Gex Retromobiles news: ${response.status} ${response.statusText}`,
      );
    }

    const data: IStrapiResponse<IGexRetromobilesNew> = await response.json();
    return data.data;
  }
}
