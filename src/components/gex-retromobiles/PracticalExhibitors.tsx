import type { TFunction } from 'i18next';
import type { JSX } from 'react';
import { Card } from '../../components';
import { goTo } from '../../helpers';
import { retrieveNullableLocalizedField } from '../../helpers/api/SanityHelper';
import type { IGexRetromobileInfos } from '../../types';

interface Props {
  readonly infos: IGexRetromobileInfos;
  readonly t: TFunction;
  readonly language: string;
  readonly locationBadge: string | null;
}

export default function PracticalExhibitors({
  infos,
  t,
  language,
  locationBadge,
}: Readonly<Props>): JSX.Element {
  const venueMapsImage: string | null = retrieveNullableLocalizedField(
    infos.venueMapsImage,
    language,
  );
  const practicalInfoExtra: string | null = retrieveNullableLocalizedField(
    infos.practicalInfoExtra,
    language,
  );
  const exhibitorExtra: string | null = retrieveNullableLocalizedField(
    infos.exhibitorExtra,
    language,
  );
  const exhibitorImage: string | null = retrieveNullableLocalizedField(
    infos.exhibitorImage,
    language,
  );

  return (
    <>
      <section className='grid grid-cols-1 gap-6'>
        <div className='space-y-4 w-full mx-auto'>
          <Card>
            {(locationBadge || venueMapsImage) && (
              <div className='mb-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-start'>
                <div>
                  <h3 className='text-xl font-semibold mb-3'>
                    {t('gexRetromobilesPage.practical.venue')}
                  </h3>
                  {locationBadge && <div className='text-gray-700 mb-4'>{locationBadge}</div>}
                </div>
                {venueMapsImage ? (
                  <div className='w-full flex justify-center items-center overflow-hidden rounded-lg'>
                    <img
                      src={venueMapsImage}
                      alt={`${t('gexRetromobilesPage.practical.venue')} map`}
                      className='max-h-96 md:max-h-140 w-auto max-w-full object-contain rounded-lg'
                    />
                  </div>
                ) : null}
              </div>
            )}

            {infos.ticketPriceEur !== null && (
              <div className='mb-3'>
                <div className='font-semibold'>{t('gexRetromobilesPage.practical.ticket')}</div>
                <div className='text-gray-700'>{`${infos.ticketPriceEur} €`}</div>
              </div>
            )}

            <div className='mb-3'>
              <div className='font-semibold'>
                {infos.petsAllowed
                  ? t('gexRetromobilesPage.practical.petsAllowed')
                  : t('gexRetromobilesPage.practical.petsNotAllowed')}
              </div>
            </div>

            {practicalInfoExtra && (
              <div>
                <div className='font-semibold'>{t('gexRetromobilesPage.practical.extra')}</div>
                <div className='text-gray-700'>{practicalInfoExtra}</div>
              </div>
            )}
          </Card>
        </div>
      </section>

      <section>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 items-center mt-6'>
          <div>
            <h3 className='text-xl font-semibold mb-3'>
              {t('gexRetromobilesPage.exhibitors.heading')}
            </h3>
            {exhibitorExtra && <p className='text-gray-700 mb-3'>{exhibitorExtra}</p>}
            <a
              href={goTo('/contact')}
              className='inline-flex px-4 py-2 bg-[#0164B5] text-white rounded-lg'>
              {t('gexRetromobilesPage.exhibitors.contactButton')}
            </a>
          </div>

          {exhibitorImage ? (
            <div className='flex justify-center'>
              <img
                src={exhibitorImage}
                alt={t('gexRetromobilesPage.sponsors.heading')}
                className='max-h-96 md:max-h-140 w-auto max-w-full object-contain rounded-lg'
              />
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
