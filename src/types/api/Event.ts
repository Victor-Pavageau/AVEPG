import type { ISanityLocaleString, ISanityNullableLocaleString, ISanityObject } from './sanity';

export interface IEvent extends ISanityObject {
  album: ISanityObject;
  cover: string;
  description: ISanityLocaleString;
  endDate: Date | null;
  location: ISanityNullableLocaleString;
  startDate: Date;
  title: ISanityLocaleString;
  website: ISanityNullableLocaleString;
  partners: { id: string; name: ISanityLocaleString; logo: string }[] | null;
}
