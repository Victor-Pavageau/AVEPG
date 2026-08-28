import type { ICmsDocument, ICmsImage } from './cms';

export interface IHomePageCarousel extends ICmsDocument {
  photos: ICmsImage[];
}
