import type { IStrapiImage, IStrapiObject } from './strapi';

export interface IGexRetromobilesNew extends IStrapiObject {
  title: string;
  post: string;
  year: number;
  photo: IStrapiImage | null;
}
