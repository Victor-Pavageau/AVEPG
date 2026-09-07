import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { getGroqQuery } from '../helpers/api/SanityHelper';
import type { ISanityObject, SanityEntity } from '../types/api/sanity';
import type { ISanityResponse } from '../types/api/sanity/SanityResponse';

const projectId: string = import.meta.env.VITE_SANITY_PROJECT_ID ?? '';
const apiVersion: string = import.meta.env.VITE_SANITY_API_VERSION ?? '';
const dataset: string = import.meta.env.VITE_SANITY_DATASET ?? '';

export function useSanityDoc<T extends ISanityObject>(
  docId: SanityEntity,
): UseQueryResult<T[], Error> {
  return useQuery<T[], Error>({
    queryKey: ['sanityDoc', docId],
    queryFn: async () => {
      const url: URL = new URL(
        `https://${projectId}.api.sanity.io/${apiVersion}/data/query/${dataset}`,
      );

      url.searchParams.set('query', getGroqQuery(docId));

      const response: Response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Sanity request failed: ${response.status} ${response.statusText}`);
      }

      const data: ISanityResponse<T> = await response.json();

      return data.result;
    },
  });
}
