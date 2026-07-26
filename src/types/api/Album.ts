import type { ICmsDocument, ICmsImage } from './cms';

export interface IAlbum extends ICmsDocument {
  name: string;
  description: string;
  photos: ICmsImage[];
}
