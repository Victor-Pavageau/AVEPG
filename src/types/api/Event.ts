import type { IPartner } from './Partner';
import type { IStrapiImage, IStrapiObject } from './strapi';

export interface IEvent extends IStrapiObject {
  title: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  cover: IStrapiImage;
  partners: IPartner[];
  location?: string;
  website?: string;
}
