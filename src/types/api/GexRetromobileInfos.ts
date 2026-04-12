import type { IStrapiImage, IStrapiObject } from './strapi';

export interface IGexRetromobileInfos extends IStrapiObject {
  editionNumber: number;
  year: number;
  dateStart: Date;
  dateEnd: Date;

  posterImage: IStrapiImage | null;
  programImage: IStrapiImage | null;

  venueName: string | null;
  venueCity: string | null;
  ticketPriceEur: number | null;
  petsAllowed: boolean;
  practicalInfoExtra: string | null;

  exhibitorImage: IStrapiImage | null;
  exhibitorExtra: string | null;
}
