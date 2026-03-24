import type { IStrapiImage, IStrapiObject } from './strapi';

export interface IGexRetromobilesNew extends IStrapiObject {
  title: string;
  post: string;
  year: number;
  isPinned: boolean;
  photo: IStrapiImage | null;
}
