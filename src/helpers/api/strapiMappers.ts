import type {
  IAlbum,
  ICmsDocument,
  ICmsImage,
  IEvent,
  IGexRetromobileInfos,
  IGexRetromobilesNew,
  IHomePageCarousel,
  IPartner,
  IStrapiImage,
  IStrapiObject,
} from '../../types';

export type StrapiPartnerRaw = IStrapiObject & {
  name: string;
  shortName: string;
  description: string;
  website: string;
  logo: IStrapiImage;
};

export type StrapiAlbumRaw = IStrapiObject & {
  name: string;
  description: string;
  photos: IStrapiImage[];
};

export type StrapiEventRaw = IStrapiObject & {
  title: string;
  description: string;
  startDate: string | Date;
  endDate?: string | Date;
  cover: IStrapiImage;
  location?: string;
  website?: string;
  partners: StrapiPartnerRaw[];
  album?: StrapiAlbumRaw | null;
};

export type StrapiHomePageCarouselRaw = IStrapiObject & {
  photos: IStrapiImage[];
};

export type StrapiGexRetromobilesNewRaw = IStrapiObject & {
  title: string;
  post: string;
  year: number;
  isPinned: boolean;
  photo: IStrapiImage | null;
};

export type StrapiGexRetromobileInfosRaw = IStrapiObject & {
  editionNumber: number;
  year: number;
  dateStart: string | Date;
  dateEnd: string | Date;
  posterImage: IStrapiImage | null;
  programImage: IStrapiImage | null;
  venueName: string | null;
  venueCity: string | null;
  venueMapsImage: IStrapiImage | null;
  ticketPriceEur: number | null;
  petsAllowed: boolean;
  practicalInfoExtra: string | null;
  exhibitorImage: IStrapiImage | null;
  exhibitorExtra: string | null;
  sponsorsImage: IStrapiImage | null;
};

function mapStrapiImage(raw: IStrapiImage): ICmsImage {
  return { id: raw.documentId ?? raw.id, url: raw.url };
}

function mapStrapiImageOrNull(raw: IStrapiImage | null): ICmsImage | null {
  return raw ? mapStrapiImage(raw) : null;
}

function mapStrapiDocument(
  raw: IStrapiObject,
): Pick<ICmsDocument, 'id' | 'createdAt' | 'updatedAt' | 'locale'> {
  return {
    id: raw.documentId,
    createdAt: new Date(raw.createdAt).toISOString(),
    updatedAt: new Date(raw.updatedAt).toISOString(),
    locale: raw.locale,
  };
}

export function mapStrapiPartner(raw: StrapiPartnerRaw): IPartner {
  return {
    ...mapStrapiDocument(raw),
    name: raw.name,
    shortName: raw.shortName,
    description: raw.description,
    website: raw.website,
    logo: mapStrapiImage(raw.logo),
  };
}

export function mapStrapiAlbum(raw: StrapiAlbumRaw): IAlbum {
  return {
    ...mapStrapiDocument(raw),
    name: raw.name,
    description: raw.description,
    photos: raw.photos.map(mapStrapiImage),
  };
}

export function mapStrapiEvent(raw: StrapiEventRaw): IEvent {
  return {
    ...mapStrapiDocument(raw),
    title: raw.title,
    description: raw.description,
    startDate: new Date(raw.startDate),
    endDate: raw.endDate ? new Date(raw.endDate) : undefined,
    cover: mapStrapiImage(raw.cover),
    location: raw.location,
    website: raw.website,
    partners: (raw.partners ?? []).map(mapStrapiPartner),
    album: raw.album ? mapStrapiAlbum(raw.album) : undefined,
  };
}

export function mapStrapiHomePageCarousel(raw: StrapiHomePageCarouselRaw): IHomePageCarousel {
  return {
    ...mapStrapiDocument(raw),
    photos: raw.photos.map(mapStrapiImage),
  };
}

export function mapStrapiGexRetromobilesNew(raw: StrapiGexRetromobilesNewRaw): IGexRetromobilesNew {
  return {
    ...mapStrapiDocument(raw),
    title: raw.title,
    post: raw.post,
    year: raw.year,
    isPinned: raw.isPinned,
    photo: mapStrapiImageOrNull(raw.photo),
  };
}

export function mapStrapiGexRetromobileInfos(
  raw: StrapiGexRetromobileInfosRaw,
): IGexRetromobileInfos {
  return {
    ...mapStrapiDocument(raw),
    editionNumber: raw.editionNumber,
    year: raw.year,
    dateStart: new Date(raw.dateStart),
    dateEnd: new Date(raw.dateEnd),
    posterImage: mapStrapiImageOrNull(raw.posterImage),
    programImage: mapStrapiImageOrNull(raw.programImage),
    venueName: raw.venueName,
    venueCity: raw.venueCity,
    venueMapsImage: mapStrapiImageOrNull(raw.venueMapsImage),
    ticketPriceEur: raw.ticketPriceEur,
    petsAllowed: raw.petsAllowed,
    practicalInfoExtra: raw.practicalInfoExtra,
    exhibitorImage: mapStrapiImageOrNull(raw.exhibitorImage),
    exhibitorExtra: raw.exhibitorExtra,
    sponsorsImage: mapStrapiImageOrNull(raw.sponsorsImage),
  };
}
