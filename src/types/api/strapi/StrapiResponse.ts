import type { IStrapiObject } from './StrapiObject';

export interface IStrapiResponse<T extends IStrapiObject> {
  data: T[];
}
