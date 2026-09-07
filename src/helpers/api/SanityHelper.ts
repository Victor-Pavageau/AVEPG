import { languageToIso6391 } from '../../i18n';
import type {
  ISanityLocaleImage,
  ISanityLocaleString,
  ISanityNullableLocaleImage,
  ISanityNullableLocaleString,
  SanityEntity,
} from '../../types/api/sanity';

interface ISanityQueryBuilder {
  type: SanityEntity;
  fields: (string | IFieldTranslation)[];
}

interface IFieldTranslation {
  field: string;
  translation: string;
}

const commonFields: IFieldTranslation[] = [
  {
    field: 'id',
    translation: '_id',
  },
  {
    field: 'createdAt',
    translation: '_createdAt',
  },
  {
    field: 'updatedAt',
    translation: '_updatedAt',
  },
];

const eventQueryBuilder: ISanityQueryBuilder = {
  type: 'event',
  fields: [
    ...commonFields,
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
      translation: 'album->{"id":_id, "createdAt":_createdAt, "updatedAt":_updatedAt}',
    },
    {
      field: 'website',
      translation: localeFieldTranslation('website'),
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
    ...commonFields,
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
    ...commonFields,
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
    ...commonFields,
    {
      field: 'photos',
      translation: 'photos[].asset->url',
    },
  ],
};

const gexRetromobilesNewQueryBuilder: ISanityQueryBuilder = {
  type: 'gexRetromobilesNew',
  fields: [
    ...commonFields,
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
    ...commonFields,
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

export function retrieveLocalizedField(
  value: ISanityLocaleImage | ISanityLocaleString,
  locale: string,
): string {
  const formattedLocale: string = languageToIso6391(locale);

  if (formattedLocale === 'fr' || formattedLocale === 'en') {
    return value[formattedLocale];
  }

  return '';
}

export function retrieveNullableLocalizedField(
  value: ISanityNullableLocaleImage | ISanityNullableLocaleString,
  locale: string,
): string | null {
  const formattedLocale: string = languageToIso6391(locale);

  if ((formattedLocale === 'fr' || formattedLocale === 'en') && value[formattedLocale]) {
    return value[formattedLocale];
  }

  return null;
}
