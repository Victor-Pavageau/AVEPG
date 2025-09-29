import { JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { FaInfoCircle } from 'react-icons/fa';
import { Card, SectionHeader } from '../index';

export function PresentationSection(): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className='mb-12'>
      <SectionHeader
        icon={<FaInfoCircle size={25} />}
        iconBgColor='bg-blue-100'
        iconColor='text-blue-600'
        title={t('about.presentation.title')}
      />

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6'>
        <div className='lg:col-span-2'>
          <Card variant='bordered' className='md:p-8 h-full'>
            <p className='text-base md:text-lg leading-relaxed mb-4'>
              {t('about.presentation.founded')}
            </p>
            <p className='text-base md:text-lg leading-relaxed'>
              {t('about.presentation.members')}
            </p>
          </Card>
        </div>
        <div className='flex justify-center lg:justify-end'>
          <div className='w-full lg:max-w-none h-64 lg:h-full min-h-[200px] overflow-hidden rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300'>
            <img
              src='/assets/pictures/members_1.png'
              alt='Membres AVEPG - Photo 1'
              className='w-full h-full object-cover'
            />
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='lg:order-2 lg:col-span-2'>
          <Card variant='default' className='md:p-8 h-full'>
            <h3 className='text-xl font-semibold text-gray-900 mb-4'>
              {t('about.presentation.valuesTitle')}
            </h3>
            <ul className='space-y-3 list-disc list-inside marker:text-[#0164B5]'>
              {(
                t('about.presentation.values', {
                  returnObjects: true,
                }) as string[]
              ).map((value, index) => (
                <li
                  key={index}
                  className='text-base md:text-lg leading-relaxed pl-2'
                >
                  {value}
                </li>
              ))}
            </ul>
            <p className='text-base md:text-lg leading-relaxed mt-6 italic text-gray-700'>
              {t('about.presentation.spirit')}
            </p>
          </Card>
        </div>
        <div className='lg:order-1 flex justify-center lg:justify-start'>
          <div className='w-full lg:max-w-none h-64 lg:h-full min-h-[200px] overflow-hidden rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300'>
            <img
              src='/assets/pictures/members_2.png'
              alt='Membres AVEPG - Photo 2'
              className='w-full h-full object-cover'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
