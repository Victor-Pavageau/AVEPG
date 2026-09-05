import type { ISanityLocaleImage, ISanityLocaleString, ISanityObject } from './sanity';

export interface IGexRetromobileInfos extends ISanityObject {
  dateEnd: Date;
  dateStart: Date;
  editionNumber: number;
  exhibitorImage: ISanityLocaleImage | null;
  petsAllowed: boolean;
  posterImage: ISanityLocaleImage | null;
  programImage: ISanityLocaleImage | null;
  sponsorsImage: ISanityLocaleImage | null;
  ticketPriceEur: number | null;
  venueCity: ISanityLocaleString | null;
  venueMapsImage: ISanityLocaleImage | null;
  venueName: ISanityLocaleString | null;
  year: number;
  practicalInfoExtra: ISanityLocaleString | null;
  exhibitorExtra: ISanityLocaleString | null;
}
