import type { ISanityLocaleString, ISanityObject } from './sanity';

export interface IPartner extends ISanityObject {
  description: ISanityLocaleString;
  logo: string;
  name: ISanityLocaleString;
  shortName: ISanityLocaleString;
  website: ISanityLocaleString;
}
