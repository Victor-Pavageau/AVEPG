import type { StrapiEntity } from '../../types';

export function buildStrapiQueryUrl(entity: StrapiEntity, locale: string): string {
  const apiUrl: string = import.meta.env.VITE_STRAPI_BASE_URL ?? '';

  const pagination: string = '?pagination[pageSize]=100';

  return `https://${apiUrl}/api/${entity}${pagination}&locale=${locale}${getPopulateParams(entity)}`;
}

function getPopulateParams(entity: StrapiEntity): string {
  switch (entity) {
    case 'events':
      return getPopulateImageParams('cover') + getPopulateRelationParams('partners', 'logo');
    case 'albums':
      return getPopulateImageParams('photos');
    case 'partners':
      return getPopulateImageParams('logo');
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
