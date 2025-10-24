import type { IStrapiImage, IStrapiObject } from './strapi';

export interface IPartner extends IStrapiObject {
  name: string;
  shortName: string;
  description: string;
  website: string;
  logo: IStrapiImage;
}
