import type { IAlbum } from './Album';
import type { ICmsDocument, ICmsImage } from './cms';
import type { IPartner } from './Partner';

export interface IEvent extends ICmsDocument {
  title: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  cover: ICmsImage;
  location?: string;
  website?: string;
  partners: IPartner[];
  album?: IAlbum;
}
