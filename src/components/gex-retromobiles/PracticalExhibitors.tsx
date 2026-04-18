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
            {locationBadge && (
              <>
                <h3 className='text-xl font-semibold mb-3'>
                  {t('gexRetromobilesPage.practical.venue')}
                </h3>
                <div className='text-gray-700 mb-4'>{locationBadge}</div>
              </>
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
            <div>
              <img
                src={infos.exhibitorImage.url}
                alt={t('gexRetromobilesPage.exhibitors.heading')}
                className='w-full h-64 object-cover rounded-lg'
              />
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
