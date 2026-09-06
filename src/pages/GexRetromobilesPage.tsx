import type { UseQueryResult } from '@tanstack/react-query';
import type { i18n, TFunction } from 'i18next';
import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { LoadingCard, PartnersSection, Seo } from '../components';
import Hero from '../components/gex-retromobiles/Hero';
import PracticalExhibitors from '../components/gex-retromobiles/PracticalExhibitors';
import Program from '../components/gex-retromobiles/Program';
import WelcomeExperience from '../components/gex-retromobiles/WelcomeExperience';
import { retrieveLocalizedField } from '../helpers/api/SanityHelper';
import { useSanityDoc } from '../services/SanityService';
import type { IGexRetromobileInfos } from '../types';
import type { ISanityLocaleImage } from '../types/api/sanity';

export default function GexRetromobilesPage(): JSX.Element {
  const { t, i18n }: { t: TFunction; i18n: i18n } = useTranslation();
  const { data, isLoading }: UseQueryResult<IGexRetromobileInfos[] | null, Error> =
    useSanityDoc<IGexRetromobileInfos>('gexRetromobilesInfo');
  const infos: IGexRetromobileInfos | null =
    data && data.length > 0
      ? data.reduce((latest: IGexRetromobileInfos, current: IGexRetromobileInfos) =>
          current.year > latest.year ? current : latest,
        )
      : null;

  const getLocationInfos: () => string | null = () => {
    if (!infos) {
      return null;
    }

    return [infos.venueName, infos.venueCity].filter(Boolean).join(', ') || null;
  };

  const seoYear: number = infos?.year ?? new Date().getFullYear();
  const sponsorsImageUrl: ISanityLocaleImage | null | undefined = infos?.sponsorsImage;

  return (
    <div className='w-full px-6 md:px-12 max-w-5xl mx-auto py-8'>
      <Seo
        title={t('gexRetromobilesPage.hero.title', { year: seoYear })}
        description={t('gexRetromobilesPage.hero.tagline')}
      />
      {isLoading && <LoadingCard />}
      {infos === null && !isLoading && (
        <div className='max-w-3xl mx-auto'>
          <div className='bg-white rounded-lg shadow p-8 text-center'>
            <h3 className='text-xl font-semibold mb-2'>{t('gexRetromobilesPage.noInfo.title')}</h3>
            <p className='text-gray-700'>{t('gexRetromobilesPage.noInfo.message')}</p>
          </div>
        </div>
      )}
      {infos !== null && !isLoading && (
        <div className='text-gray-800 space-y-12'>
          <Hero
            infos={infos}
            t={t}
            language={i18n.language}
            locationBadge={getLocationInfos()}
          />
          <WelcomeExperience
            t={t}
            infos={infos}
            language={i18n.language}
          />
          <Program
            infos={infos}
            t={t}
            language={i18n.language}
          />
          <PracticalExhibitors
            infos={infos}
            t={t}
            language={i18n.language}
            locationBadge={getLocationInfos()}
          />
          <h3>{t('gexRetromobilesPage.sponsors.heading')}</h3>
          {sponsorsImageUrl && (
            <div className='mt-6 flex justify-center'>
              <img
                src={retrieveLocalizedField(sponsorsImageUrl, i18n.language)}
                alt={t('gexRetromobilesPage.sponsors.alt')}
                className='max-h-40 md:max-h-64 w-auto max-w-full object-contain rounded-lg'
              />
            </div>
          )}
          <PartnersSection />
        </div>
      )}
    </div>
  );
}
