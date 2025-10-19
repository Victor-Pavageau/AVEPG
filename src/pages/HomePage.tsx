import type { TFunction } from 'i18next';
import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { FaInfoCircle } from 'react-icons/fa';
import { ImCamera } from 'react-icons/im';
import { IoIosMail } from 'react-icons/io';
import { IoCalendar } from 'react-icons/io5';
import { Card, NavigationCard } from '../components';

function HomePage(): JSX.Element {
  const { t }: { t: TFunction } = useTranslation();

  return (
    <div className='w-full'>
      <div className='mb-8 overflow-hidden h-80 sm:h-120 lg:h-160 relative'>
        <img
          className='h-full w-full object-cover object-[center_30%] md:object-center'
          src='/assets/pictures/home_page.png'
          alt='Cobra Era - Home page cover'
        />
        <div className='absolute top-4 md:top-20 left-4 md:left-16 right-4 md:right-auto'>
          <div className='text-white bg-gray-800/80 rounded-lg shadow-lg inline-block md:max-w-2xl'>
            <div className='p-3 md:p-4'>
              <h3 className='font-bold text-base md:text-lg mb-2'>{t('home.shortTitle')}</h3>
              <h4 className='font-bold text-lg md:text-2xl leading-tight'>{t('home.title')}</h4>
            </div>
          </div>
        </div>
      </div>

      <div className='px-6 md:px-12 max-w-5xl mx-auto'>
        <div className='text-gray-800 leading-relaxed mb-12'>
          <h2 className='text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center'>
            {t('home.welcome.title')}
          </h2>
          <Card
            bordered
            className='md:p-8 border-[#0164B5]'>
            <p className='text-base md:text-lg leading-relaxed mb-4'>
              {t('home.welcome.description')}
            </p>
            <p className='text-base md:text-lg leading-relaxed'>{t('home.welcome.callToAction')}</p>
          </Card>
        </div>

        <div className='text-gray-800'>
          <h3 className='text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center'>
            {t('home.navigation.title')}
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <NavigationCard
              className='h-full'
              path='/about'
              icon={<FaInfoCircle size={25} />}
              iconBgColor='bg-blue-100'
              iconColor='text-blue-600'
              title={t('home.navigation.about.title')}
              description={t('home.navigation.about.description')}
            />

            <NavigationCard
              className='h-full'
              path='/events'
              icon={<IoCalendar size={25} />}
              iconBgColor='bg-green-100'
              iconColor='text-green-600'
              title={t('home.navigation.events.title')}
              description={t('home.navigation.events.description')}
            />

            <NavigationCard
              className='h-full'
              path='/photos'
              icon={<ImCamera size={25} />}
              iconBgColor='bg-purple-100'
              iconColor='text-purple-600'
              title={t('home.navigation.photos.title')}
              description={t('home.navigation.photos.description')}
            />

            <NavigationCard
              className='h-full'
              path='/contact'
              icon={<IoIosMail size={25} />}
              iconBgColor='bg-orange-100'
              iconColor='text-orange-600'
              title={t('home.navigation.contact.title')}
              description={t('home.navigation.contact.description')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
