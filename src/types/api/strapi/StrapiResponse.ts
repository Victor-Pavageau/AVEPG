import type { StrapiObject } from './StrapiObject';

export interface StrapiResponse<T extends StrapiObject> {
  data: T[];
}
