import type { ICmsDocument, ICmsImage } from './cms';

export interface IGexRetromobileInfos extends ICmsDocument {
  editionNumber: number;
  year: number;
  dateStart: Date;
  dateEnd: Date;

  posterImage: ICmsImage | null;
  programImage: ICmsImage | null;

  venueName: string | null;
  venueCity: string | null;
  venueMapsImage: ICmsImage | null;

  ticketPriceEur: number | null;
  petsAllowed: boolean;
  practicalInfoExtra: string | null;

  exhibitorImage: ICmsImage | null;
  exhibitorExtra: string | null;

  sponsorsImage: ICmsImage | null;
}
