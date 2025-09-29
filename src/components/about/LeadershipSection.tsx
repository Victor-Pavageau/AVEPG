import { JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { IoMdPeople } from 'react-icons/io';
import { Card, SectionHeader } from '../index';

export function LeadershipSection(): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className='mb-12'>
      <SectionHeader
        icon={<IoMdPeople size={25} />}
        iconBgColor='bg-green-100'
        iconColor='text-green-600'
        title={t('about.leadership.title')}
      />

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6'>
        <Card variant='bordered' borderColor='green-500'>
          <h3 className='text-xl font-semibold text-gray-900 mb-4'>
            {t('about.leadership.contact.title')}
          </h3>
          <div className='space-y-2 text-base md:text-lg'>
            <p className='text-gray-700'>
              {t('about.leadership.contact.address')}
            </p>
            <p className='text-gray-700'>
              {t('about.leadership.contact.phone')}
            </p>
            <p className='text-gray-700'>
              {t('about.leadership.contact.email')}
            </p>
            <p className='text-gray-700 font-semibold mt-4'>
              {t('about.leadership.contact.affiliation')}
            </p>
          </div>
        </Card>

        <Card variant='default'>
          <h3 className='text-xl font-semibold text-gray-900 mb-4'>
            {t('about.leadership.bureau.title')}
          </h3>
          <div className='space-y-3 text-base md:text-lg'>
            <p className='text-gray-700 font-medium'>
              {t('about.leadership.bureau.president')}
            </p>
            <p className='text-gray-700 font-medium'>
              {t('about.leadership.bureau.vicePresident')}
            </p>
            <p className='text-gray-700 font-medium'>
              {t('about.leadership.bureau.treasurer')}
            </p>
            <p className='text-gray-700 font-medium'>
              {t('about.leadership.bureau.secretary')}
            </p>
          </div>
        </Card>
      </div>

      <div className='flex justify-center'>
        <div className='w-full max-w-none md:max-w-2xl h-72 md:h-80 overflow-hidden rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300'>
          <img
            src='/assets/pictures/members_3.png'
            alt='Membres AVEPG - Photo 3'
            className='w-full h-full object-cover'
          />
        </div>
      </div>
    </div>
  );
}
