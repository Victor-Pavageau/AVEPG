import type { ICmsDocument, ICmsImage } from './cms';

export interface IGexRetromobilesNew extends ICmsDocument {
  title: string;
  post: string;
  year: number;
  isPinned: boolean;
  photo: ICmsImage | null;
}
