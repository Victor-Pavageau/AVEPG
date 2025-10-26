import type { i18n, TFunction } from 'i18next';
import type { JSX } from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaHandshake } from 'react-icons/fa';
import { StrapiService } from '../../services';
import type { IPartner } from '../../types';
import { Card, LoadingCard, SectionHeader, VisitWebsite } from '../index';

export function PartnersSection(): JSX.Element {
  const { t, i18n }: { t: TFunction; i18n: i18n } = useTranslation();
  const [partners, setPartners]: [IPartner[], (partners: IPartner[]) => void] = useState<
    IPartner[]
  >([]);
  const [loading, setLoading]: [boolean, (loading: boolean) => void] = useState(true);

  const fetchPartners: () => Promise<void> = async (): Promise<void> => {
    setLoading(true);
    try {
      const data: IPartner[] = await StrapiService.getPartners(i18n.language);
      setPartners(data);
    } catch {
      setPartners([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPartners();
  }, [i18n.language]);

  return (
    <div className='mb-8'>
      <SectionHeader
        icon={<FaHandshake size={25} />}
        iconBgColor='bg-purple-100'
        iconColor='text-purple-600'
        title={t('about.partners.title')}
      />

      <div className='mb-6'>
        <Card className='md:p-8'>
          {loading ? (
            <LoadingCard />
          ) : (
            <>
              <p className='text-base md:text-lg leading-relaxed text-gray-700 mb-8 text-center'>
                {t('about.partners.description')}
              </p>

              {partners.length === 0 ? (
                <p className='text-center text-gray-600'>{t('shared.error.loadingFailed')}</p>
              ) : (
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                  {partners.map((partner: IPartner) => (
                    <Card
                      key={partner.id}
                      bordered
                      className='p-6 hover:shadow-lg transition-shadow duration-300 border-purple-500'>
                      <div className='flex flex-col items-center text-center h-full'>
                        <div className='w-32 h-32 mb-4 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden'>
                          <img
                            src={partner.logo.url}
                            alt={`Logo ${partner.shortName}`}
                            className='max-w-full max-h-full object-contain'
                          />
                        </div>

                        <h3 className='text-xl font-bold text-gray-900 mb-2'>{partner.name}</h3>

                        <p className='text-base text-gray-700 mb-4 grow'>{partner.description}</p>

                        <VisitWebsite url={partner.website} />
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
