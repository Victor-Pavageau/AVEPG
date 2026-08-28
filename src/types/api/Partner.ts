import type { ICmsDocument, ICmsImage } from './cms';

export interface IPartner extends ICmsDocument {
  name: string;
  shortName: string;
  description: string;
  website: string;
  logo: ICmsImage;
}
