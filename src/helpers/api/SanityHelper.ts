import type { SanityEntity } from '../../types/api/sanity';

interface ISanityQueryBuilder {
  type: SanityEntity;
  fields: (string | IFieldTranslation)[];
}

interface IFieldTranslation {
  field: string;
  translation: string;
}

const eventQueryBuilder: ISanityQueryBuilder = {
  type: 'event',
  fields: [
    {
      field: 'id',
      translation: '_id',
    },
    {
      field: 'title',
      translation: localeFieldTranslation('title'),
    },
    {
      field: 'description',
      translation: localeFieldTranslation('description'),
    },
    {
      field: 'location',
      translation: localeFieldTranslation('location'),
    },
    'startDate',
    'endDate',
    {
      field: 'cover',
      translation: 'cover.asset->url',
    },
    {
      field: 'album',
      translation: 'album->{"id":_id}',
    },
    {
      field: 'partners',
      translation: 'partners[]->{"id":_id, "name":name, "logo":logo.asset->url}',
    },
  ],
};

const albumQueryBuilder: ISanityQueryBuilder = {
  type: 'album',
  fields: [
    {
      field: 'id',
      translation: '_id',
    },
    'name',
    'description',
    {
      field: 'photos',
      translation: 'photos[].asset->url',
    },
  ],
};

const partnerQueryBuilder: ISanityQueryBuilder = {
  type: 'partner',
  fields: [
    {
      field: 'id',
      translation: '_id',
    },
    {
      field: 'name',
      translation: localeFieldTranslation('name'),
    },
    {
      field: 'shortName',
      translation: localeFieldTranslation('shortName'),
    },
    {
      field: 'description',
      translation: localeFieldTranslation('description'),
    },
    {
      field: 'website',
      translation: localeFieldTranslation('website'),
    },
    {
      field: 'logo',
      translation: 'logo.asset->url',
    },
  ],
};

const homePageCarouselQueryBuilder: ISanityQueryBuilder = {
  type: 'homePageCarousel',
  fields: [
    {
      field: 'id',
      translation: '_id',
    },
    {
      field: 'photos',
      translation: 'photos[].asset->url',
    },
  ],
};

const gexRetromobilesNewQueryBuilder: ISanityQueryBuilder = {
  type: 'gexRetromobilesNew',
  fields: [
    {
      field: 'id',
      translation: '_id',
    },
    {
      field: 'title',
      translation: localeFieldTranslation('title'),
    },
    {
      field: 'post',
      translation: localeFieldTranslation('post'),
    },
    'year',
    'isPinned',
    {
      field: 'photo',
      translation: 'photo.asset->url',
    },
  ],
};

const gexRetromobilesInfoQueryBuilder: ISanityQueryBuilder = {
  type: 'gexRetromobilesInfo',
  fields: [
    {
      field: 'id',
      translation: '_id',
    },
    'year',
    'editionNumber',
    'dateStart',
    'dateEnd',
    {
      field: 'posterImage',
      translation: localeImageFieldTranslation('posterImage'),
    },
    {
      field: 'programImage',
      translation: localeImageFieldTranslation('programImage'),
    },
    {
      field: 'venueMapsImage',
      translation: localeImageFieldTranslation('venueMapsImage'),
    },
    {
      field: 'exhibitorImage',
      translation: localeImageFieldTranslation('exhibitorImage'),
    },
    {
      field: 'sponsorsImage',
      translation: localeImageFieldTranslation('sponsorsImage'),
    },
    {
      field: 'venueName',
      translation: localeFieldTranslation('venueName'),
    },
    {
      field: 'venueCity',
      translation: localeFieldTranslation('venueCity'),
    },
    'ticketPriceEur',
    'petsAllowed',
    {
      field: 'practicalInfoExtra',
      translation: localeFieldTranslation('practicalInfoExtra'),
    },
    {
      field: 'exhibitorExtra',
      translation: localeFieldTranslation('exhibitorExtra'),
    },
  ],
};

const documentsQueryBuilder: ISanityQueryBuilder[] = [
  albumQueryBuilder,
  eventQueryBuilder,
  partnerQueryBuilder,
  homePageCarouselQueryBuilder,
  gexRetromobilesNewQueryBuilder,
  gexRetromobilesInfoQueryBuilder,
];

export function getGroqQuery(entity: SanityEntity): string {
  const documentQueryBuilder: ISanityQueryBuilder | undefined = documentsQueryBuilder.find(
    (queryBuilder: ISanityQueryBuilder) => queryBuilder.type === entity,
  );

  return documentQueryBuilder ? buildGroqQuery(documentQueryBuilder) : '';
}

function buildGroqQuery(sanityQueryBuilderObject: ISanityQueryBuilder): string {
  return `*[_type=='${sanityQueryBuilderObject.type}']{${sanityQueryBuilderObject.fields
    .map((field: string | IFieldTranslation) => {
      if (typeof field === 'string') {
        return field;
      }

      return `"${field.field}":${field.translation}`;
    })
    .join(',')}}`;
}

function localeFieldTranslation(field: string): string {
  return `{"fr": ${field}.fr, "en": ${field}.en}`;
}

function localeImageFieldTranslation(field: string): string {
  return `{"fr": ${field}.fr.asset->url, "en": ${field}.en.asset->url}`;
}
