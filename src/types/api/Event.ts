import type { ISanityLocaleString, ISanityObject } from './sanity';

export interface IEvent extends ISanityObject {
  album: ISanityObject;
  cover: string;
  description: ISanityLocaleString;
  endDate?: Date;
  location?: ISanityLocaleString;
  startDate: Date;
  title: ISanityLocaleString;
  website?: ISanityLocaleString;
  partners: { id: string; name: ISanityLocaleString; logo: string }[];
}
