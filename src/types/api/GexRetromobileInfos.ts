import type {
  ISanityNullableLocaleImage,
  ISanityNullableLocaleString,
  ISanityObject,
} from './sanity';

export interface IGexRetromobileInfos extends ISanityObject {
  dateEnd: Date;
  dateStart: Date;
  editionNumber: number;
  exhibitorImage: ISanityNullableLocaleImage;
  petsAllowed: boolean;
  posterImage: ISanityNullableLocaleImage;
  programImage: ISanityNullableLocaleImage;
  sponsorsImage: ISanityNullableLocaleImage;
  ticketPriceEur: number | null;
  venueCity: ISanityNullableLocaleString;
  venueMapsImage: ISanityNullableLocaleImage;
  venueName: ISanityNullableLocaleString;
  year: number;
  practicalInfoExtra: ISanityNullableLocaleString;
  exhibitorExtra: ISanityNullableLocaleString;
}
