import type { StrapiImage, StrapiObject } from './strapi';

export interface Partner extends StrapiObject {
  name: string;
  shortName: string;
  description: string;
  website: string;
  logo: StrapiImage;
}
