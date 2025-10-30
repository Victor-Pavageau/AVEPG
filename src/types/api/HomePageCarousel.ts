import type { IStrapiImage, IStrapiObject } from './strapi';

export interface IHomePageCarousel extends IStrapiObject {
  photos: IStrapiImage[];
}
