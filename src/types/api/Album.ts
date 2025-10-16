import type { StrapiObject } from './strapi';
import type { StrapiImage } from './strapi/StrapiImage';

export interface Album extends StrapiObject {
  title: string;
  description: string;
  photos: StrapiImage[];
}
