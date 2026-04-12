import type { i18n, TFunction } from 'i18next';
import type { Dispatch, JSX, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LoadingCard, Seo } from '../components';
import { StrapiService } from '../services';
import type { IGexRetromobileInfos } from '../types';
import Hero from './gex-retromobiles/Hero';
import PracticalExhibitors from './gex-retromobiles/PracticalExhibitors';
import Program from './gex-retromobiles/Program';
import WelcomeExperience from './gex-retromobiles/WelcomeExperience';

export default function GexRetromobilesPage(): JSX.Element {
  const { t, i18n }: { t: TFunction; i18n: i18n } = useTranslation();
  const [loading, setLoading]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState<boolean>(true);
  const [infos, setInfos]: [
    IGexRetromobileInfos | null,
    Dispatch<SetStateAction<IGexRetromobileInfos | null>>,
  ] = useState<IGexRetromobileInfos | null>(null);

  useEffect(() => {
    const fetch = async (): Promise<void> => {
      setLoading(true);
      try {
        const res: IGexRetromobileInfos | null = await StrapiService.getGexRetromobileInfos(
          i18n.language,
        );
        setInfos(res);
      } catch {
        setInfos(null);
      } finally {
        setLoading(false);
      }
    };

    void fetch();
  }, [i18n.language]);

  const seoYear: number = infos?.year ?? new Date().getFullYear();

  return (
    <div className='w-full px-6 md:px-12 max-w-5xl mx-auto py-8'>
      <Seo
        title={t('gexRetromobilesPage.hero.title', { year: seoYear })}
        description={t('gexRetromobilesPage.hero.tagline')}
      />
      {!loading && infos === null ? (
        <div className='max-w-3xl mx-auto'>
          <div className='bg-white rounded-lg shadow p-8 text-center'>
            <h3 className='text-xl font-semibold mb-2'>{t('gexRetromobilesPage.noInfo.title')}</h3>
            <p className='text-gray-700'>{t('gexRetromobilesPage.noInfo.message')}</p>
          </div>
        </div>
      ) : loading ? (
        <LoadingCard />
      ) : (
        <div className='text-gray-800 space-y-12'>
          <Hero
            infos={infos as IGexRetromobileInfos}
            t={t}
            language={i18n.language}
          />

          <WelcomeExperience
            t={t}
            infos={infos as IGexRetromobileInfos}
            language={i18n.language}
          />

          <Program
            infos={infos as IGexRetromobileInfos}
            t={t}
          />

          <PracticalExhibitors
            infos={infos as IGexRetromobileInfos}
            t={t}
          />
        </div>
      )}
    </div>
  );
}
