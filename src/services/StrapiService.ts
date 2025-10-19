import { buildStrapiQueryUrl } from '../helpers';
import { languageToIso6391 } from '../i18n';
import type { Album, Event, Partner, StrapiResponse } from '../types';

export class StrapiService {
  public static async getPartners(language: string): Promise<Partner[]> {
    const query: string = buildStrapiQueryUrl('partners', languageToIso6391(language));
    const response: Response = await fetch(query);

    if (!response.ok) {
      throw new Error(`Failed to fetch partners: ${response.status} ${response.statusText}`);
    }

    const data: StrapiResponse<Partner> = await response.json();
    return data.data;
  }

  public static async getEvents(language: string): Promise<Event[]> {
    const query: string = buildStrapiQueryUrl('events', languageToIso6391(language));
    const response: Response = await fetch(query);

    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.status} ${response.statusText}`);
    }

    const data: StrapiResponse<Event> = await response.json();
    return data.data;
  }

  public static async getAlbums(language: string): Promise<Album[]> {
    const query: string = buildStrapiQueryUrl('albums', languageToIso6391(language));
    const response: Response = await fetch(query);

    if (!response.ok) {
      throw new Error(`Failed to fetch albums: ${response.status} ${response.statusText}`);
    }

    const data: StrapiResponse<Album> = await response.json();
    return data.data;
  }
}
