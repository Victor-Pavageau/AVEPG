import type { Partner } from './Partner';
import type { StrapiObject } from './strapi';
import type { StrapiImage } from './strapi/StrapiImage';

export interface Event extends StrapiObject {
  title: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  cover: StrapiImage;
  partners: Partner[];
  location?: string;
  website?: string;
}
