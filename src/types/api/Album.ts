import type { IStrapiImage, IStrapiObject } from './strapi';

export interface IAlbum extends IStrapiObject {
  name: string;
  description: string;
  photos: IStrapiImage[];
}
