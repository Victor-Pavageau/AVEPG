import type { ISanityLocaleString, ISanityObject } from './sanity';

export interface IAlbum extends ISanityObject {
  name: ISanityLocaleString;
  description: ISanityLocaleString;
  photos: string[] | null;
}
