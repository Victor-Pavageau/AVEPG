import { buildStrapiQueryUrl } from '../helpers';
import { languageToIso6391 } from '../i18n';
import type { Partner, StrapiResponse } from '../types';

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
}
