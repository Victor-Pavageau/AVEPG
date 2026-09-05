import type { ISanityLocaleString, ISanityObject } from './sanity';

export interface IGexRetromobilesNew extends ISanityObject {
  isPinned: boolean;
  photo: string | null;
  post: ISanityLocaleString;
  title: ISanityLocaleString;
  year: number;
}
