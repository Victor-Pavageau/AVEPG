import type { TFunction } from 'i18next';
import type { JSX } from 'react';
import type { IGexRetromobileInfos } from '../../types';

interface Props {
  readonly infos: IGexRetromobileInfos;
  readonly t: TFunction;
  readonly language: string;
  readonly locationBadge: string | null;
}

export default function Hero({ infos, t, language, locationBadge }: Readonly<Props>): JSX.Element {
  const posterUrl: string | undefined = infos.posterImage?.url ?? undefined;

  const start: Date | null = infos.dateStart ? new Date(infos.dateStart) : null;
  const end: Date | null = infos.dateEnd ? new Date(infos.dateEnd) : null;

  const startStr: string = start
    ? start.toLocaleDateString(language, { day: '2-digit', month: 'short' })
    : '';
  const endStr: string = end
    ? end.toLocaleDateString(language, { day: '2-digit', month: 'short' })
    : '';

  const datesBadge: string =
    start && end
      ? `${startStr} & ${endStr}`
      : t('gexRetromobilesPage.hero.badges.dates', {
          start: startStr,
          end: endStr,
          year: infos.year,
        });

  return (
    <section className='grid grid-cols-1 md:grid-cols-2 items-center gap-6'>
      <div>
        <h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
          {t('gexRetromobilesPage.hero.title', { year: infos.year })}
        </h1>
        <p className='text-lg text-gray-700 mb-4'>{t('gexRetromobilesPage.hero.tagline')}</p>

        <div className='flex flex-wrap gap-3 text-sm text-gray-600'>
          {locationBadge && (
            <span className='bg-gray-100 px-3 py-1 rounded-md'>{locationBadge}</span>
          )}
          <span className='bg-gray-100 px-3 py-1 rounded-md'>{datesBadge}</span>
        </div>
      </div>

      {posterUrl ? (
        <div className='w-full flex justify-center'>
          <img
            src={posterUrl}
            alt={t('gexRetromobilesPage.hero.title')}
            className='w-full max-w-sm object-cover rounded-lg'
          />
        </div>
      ) : null}
    </section>
  );
}
