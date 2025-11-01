import Segmented from 'antd/es/segmented';
import type { TFunction, i18n } from 'i18next';
import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState, type JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { StrapiService } from '../../services';
import type { IGexRetromobilesNew } from '../../types';
import { LoadingCard } from '../LoadingCard';
import { GexRetromobilesNewsCard } from './GexRetromobilesNewsCard';

export function GexRetromobilesNewsTab(): JSX.Element {
  const { t, i18n }: { t: TFunction; i18n: i18n } = useTranslation();
  const [news, setNews]: [IGexRetromobilesNew[], Dispatch<SetStateAction<IGexRetromobilesNew[]>>] =
    useState<IGexRetromobilesNew[]>([]);
  const [newsYears, setNewsYears]: [number[], Dispatch<SetStateAction<number[]>>] = useState<
    number[]
  >([]);
  const [loading, setLoading]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(true);
  const [selectedYear, setSelectedYear]: [number | null, Dispatch<SetStateAction<number | null>>] =
    useState<number | null>(null);

  useEffect(() => {
    const fetchNews: () => Promise<void> = async (): Promise<void> => {
      setLoading(true);
      try {
        const data: IGexRetromobilesNew[] = await StrapiService.getGexRetromobilesNews(
          i18n.language,
        );
        data.sort(
          (a: IGexRetromobilesNew, b: IGexRetromobilesNew) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
        );
        setNews(data);
        setNewsYears(
          Array.from(new Set(data.map((n: IGexRetromobilesNew) => n.year))).sort(
            (a: number, b: number) => b - a,
          ),
        );
      } catch {
        setNews([]);
        setNewsYears([]);
      }
      setLoading(false);
    };

    fetchNews();
  }, [i18n.language]);

  useEffect(() => {
    if (newsYears.length > 0) {
      setSelectedYear(newsYears[0]);
    }
  }, [newsYears]);

  return (
    <section className='space-y-6'>
      <div className='mx-4 sm:mx-0'>
        <div className='bg-linear-to-r from-green-600 to-green-500 text-white rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between shadow-md'>
          <div className='space-y-1'>
            <h4 className='text-sm sm:text-base font-semibold'>
              {t('events.gexRetromobilesCard.title')}
            </h4>
            <p className='text-xs sm:text-sm text-green-100/90'>
              {t('events.gexRetromobilesCard.description')}
            </p>
          </div>

          <div className='mt-3 sm:mt-0 flex space-x-3'>
            <a
              href='https://www.facebook.com/AVEPaysdeGex'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm sm:text-base text-white! font-semibold'>
              <FaFacebookF
                className='mr-2 text-white'
                size={20}
              />
              {t('events.gexRetromobilesCard.facebook')}
            </a>
            <a
              href='https://www.instagram.com/avepgex/'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm sm:text-base text-white! font-semibold'>
              <FaInstagram
                className='mr-2 text-white'
                size={20}
              />
              {t('events.gexRetromobilesCard.instagram')}
            </a>
          </div>
        </div>
      </div>

      <div className='space-y-3'>
        {loading ? (
          <LoadingCard />
        ) : news.length === 0 || newsYears.length === 0 ? (
          <div className='text-sm'>{t('events.gexRetromobilesCard.noNews')}</div>
        ) : (
          <>
            <div className='mx-4 sm:mx-0'>
              {newsYears.length > 0 && (
                <Segmented
                  options={newsYears.map((y: number) => ({ label: String(y), value: y }))}
                  value={selectedYear ?? undefined}
                  onChange={(val: string | number) => setSelectedYear(Number(val))}
                  className='mb-3'
                />
              )}
            </div>

            {news
              .filter((n: IGexRetromobilesNew) => n.year === selectedYear)
              .map((n: IGexRetromobilesNew) => (
                <GexRetromobilesNewsCard
                  eventNew={n}
                  key={n.id}
                />
              ))}
          </>
        )}
      </div>
    </section>
  );
}
