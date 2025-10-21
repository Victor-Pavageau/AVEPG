import { buildStrapiQueryUrl } from '../helpers';
import { languageToIso6391 } from '../i18n';
import type { IAlbum, IEvent, IPartner, IStrapiResponse } from '../types';

export class StrapiService {
  public static async getPartners(language: string): Promise<IPartner[]> {
    const query: string = buildStrapiQueryUrl('partners', languageToIso6391(language));
    const response: Response = await fetch(query);

    if (!response.ok) {
      throw new Error(`Failed to fetch partners: ${response.status} ${response.statusText}`);
    }

    const data: IStrapiResponse<IPartner> = await response.json();
    return data.data;
  }

  public static async getEvents(language: string): Promise<IEvent[]> {
    const query: string = buildStrapiQueryUrl('events', languageToIso6391(language));
    const response: Response = await fetch(query);

    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.status} ${response.statusText}`);
    }

    const data: IStrapiResponse<IEvent> = await response.json();
    return data.data;
  }

  public static async getAlbums(language: string): Promise<IAlbum[]> {
    const query: string = buildStrapiQueryUrl('albums', languageToIso6391(language));
    const response: Response = await fetch(query);

    if (!response.ok) {
      throw new Error(`Failed to fetch albums: ${response.status} ${response.statusText}`);
    }

    const data: IStrapiResponse<IAlbum> = await response.json();
    return data.data;
  }
}
