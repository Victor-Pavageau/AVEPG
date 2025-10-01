import type { TFunction } from 'i18next';
import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { FaExternalLinkAlt, FaHandshake } from 'react-icons/fa';
import { Card, SectionHeader } from '../index';

interface Partner {
  name: string;
  fullName: string;
  description: string;
  website: string;
  logo: string;
}

export function PartnersSection(): JSX.Element {
  const { t }: { t: TFunction } = useTranslation();

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
          <p className='text-base md:text-lg leading-relaxed text-gray-700 mb-8 text-center'>
            {t('about.partners.description')}
          </p>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {(t('about.partners.list', { returnObjects: true }) as Partner[]).map(
              (partner: Partner, index: number) => (
                <Card
                  key={index}
                  bordered
                  className='p-6 hover:shadow-lg transition-shadow duration-300 border-purple-500'>
                  <div className='flex flex-col items-center text-center h-full'>
                    <div className='w-32 h-32 mb-4 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden'>
                      <img
                        src={partner.logo}
                        alt={`Logo ${partner.name}`}
                        className='max-w-full max-h-full object-contain'
                      />
                    </div>

                    <h3 className='text-xl font-bold text-gray-900 mb-2'>{partner.fullName}</h3>

                    <p className='text-base text-gray-700 mb-4 flex-grow'>{partner.description}</p>

                    <a
                      href={partner.website}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='inline-flex items-center px-4 py-2 bg-[#0164B5] text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium'>
                      <span className='mr-2'>{t('about.partners.visitWebsite')}</span>
                      <FaExternalLinkAlt size={14} />
                    </a>
                  </div>
                </Card>
              ),
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
