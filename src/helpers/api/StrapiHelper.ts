import type { StrapiEntity } from '../../types';

export function buildStrapiQueryUrl(entity: StrapiEntity, locale: string | null = null): string {
  const apiUrl: string = import.meta.env.VITE_STRAPI_BASE_URL ?? '';

  const paginationParam: string = '?pagination[pageSize]=100';
  const localeParam: string = locale !== null ? `&locale=${locale}` : '';

  return `https://${apiUrl}/api/${entity}${paginationParam}${localeParam}${getPopulateParams(entity)}`;
}

function getPopulateParams(entity: StrapiEntity): string {
  switch (entity) {
    case 'events':
      return getPopulateImageParams('cover') + getPopulateRelationParams('partners', 'logo');
    case 'albums':
      return getPopulateImageParams('photos');
    case 'partners':
      return getPopulateImageParams('logo');
    case 'gex-retromobiles-news':
      return getPopulateImageParams('photo');
    case 'home-page-carousels':
      return getPopulateImageParams('photos');
    default:
      return '';
  }
}

function getPopulateImageParams(imageObjectName: string): string {
  return `&populate[${imageObjectName}][fields][0]=url`;
}

function getPopulateRelationParams(
  relationObjectName: string,
  imageObjectName: string | undefined = undefined,
): string {
  return imageObjectName
    ? `&[populate][${relationObjectName}][populate][${imageObjectName}][fields][0]=url`
    : `&populate=${relationObjectName}`;
}
