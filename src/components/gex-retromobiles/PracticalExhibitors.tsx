import type { TFunction } from 'i18next';
import type { JSX } from 'react';
import { Card } from '../../components';
import { goTo } from '../../helpers';
import type { IGexRetromobileInfos } from '../../types';

interface Props {
  readonly infos: IGexRetromobileInfos;
  readonly t: TFunction;
  readonly locationBadge: string | null;
}

export default function PracticalExhibitors({
  infos,
  t,
  locationBadge,
}: Readonly<Props>): JSX.Element {
  return (
    <>
      <section className='grid grid-cols-1 gap-6'>
        <div className='space-y-4 w-full mx-auto'>
          <Card>
            {(locationBadge || infos.venueMapsImage?.url) && (
              <div className='mb-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-start'>
                <div>
                  <h3 className='text-xl font-semibold mb-3'>
                    {t('gexRetromobilesPage.practical.venue')}
                  </h3>
                  {locationBadge && <div className='text-gray-700 mb-4'>{locationBadge}</div>}
                </div>
                {infos.venueMapsImage?.url ? (
                  <div className='w-full flex justify-center items-center overflow-hidden rounded-lg'>
                    <img
                      src={infos.venueMapsImage.url}
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
              <div className='font-semibold'>{t('gexRetromobilesPage.practical.petsAllowed')}</div>
              <div className='text-gray-700'>
                {infos.petsAllowed
                  ? t('gexRetromobilesPage.practical.petsAllowed')
                  : t('gexRetromobilesPage.practical.petsNotAllowed')}
              </div>
            </div>

            {infos.practicalInfoExtra && (
              <div>
                <div className='font-semibold'>{t('gexRetromobilesPage.practical.extra')}</div>
                <div className='text-gray-700'>{infos.practicalInfoExtra}</div>
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
            <p className='text-gray-700 mb-3'>{infos.exhibitorExtra}</p>
            <a
              href={goTo('/contact')}
              className='inline-flex px-4 py-2 bg-[#0164B5] text-white rounded-lg'>
              {t('gexRetromobilesPage.exhibitors.contactButton')}
            </a>
          </div>

          {infos.exhibitorImage?.url ? (
            <div className='flex justify-center'>
              <img
                src={infos.exhibitorImage.url}
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
