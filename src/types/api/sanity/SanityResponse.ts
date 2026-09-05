import type { ISanityObject } from './SanityObject';

export interface ISanityResponse<T extends ISanityObject> {
  query: string;
  result: T[];
  ms: number;
}
