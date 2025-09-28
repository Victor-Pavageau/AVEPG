import { JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { GiOpenBook } from 'react-icons/gi';
import { ImCamera } from 'react-icons/im';
import { IoIosMail } from 'react-icons/io';
import { IoCalendar } from 'react-icons/io5';
import { goTo } from '../services';

export function HomePage(): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className='w-full'>
      <div className='mb-8 overflow-hidden h-[20rem] sm:h-[30rem] lg:h-[40rem] relative'>
        <img
          className='h-full w-full object-cover object-[center_30%] md:object-center'
          src='/assets/pictures/home_page.png'
          alt='Cobra Era - Home page cover'
        />
        <div className='absolute top-4 md:top-20 left-4 md:left-16 right-4 md:right-auto'>
          <h3 className='text-white p-3 bg-gray-800/80 font-bold text-lg md:text-2xl drop-shadow-lg rounded-lg md:max-w-lg'>
            {t('home.title')}
          </h3>
        </div>
      </div>

      <div className='px-6 md:px-12 max-w-5xl mx-auto'>
        <div className='text-gray-800 leading-relaxed mb-12'>
          <h2 className='text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center'>
            {t('home.welcome.title')}
          </h2>
          <div className='bg-gray-50 rounded-lg p-6 md:p-8 shadow-sm border-l-4 border-[#0164B5]'>
            <p className='text-base md:text-lg leading-relaxed mb-4'>
              {t('home.welcome.intro')}
            </p>
            <p className='text-base md:text-lg leading-relaxed mb-4'>
              {t('home.welcome.description')}
            </p>
            <p className='text-base md:text-lg leading-relaxed'>
              {t('home.welcome.callToAction')}
            </p>
          </div>
        </div>

        <div className='text-gray-800'>
          <h3 className='text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center'>
            {t('home.navigation.title')}
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <a
              className='bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200'
              href={goTo('/about')}
            >
              <div className='flex items-start'>
                <div className='bg-blue-100 rounded-full p-2 mr-4 flex-shrink-0'>
                  <GiOpenBook className='text-blue-600' size={25} />
                </div>
                <div>
                  <h4 className='font-semibold text-lg text-gray-900 mb-2'>
                    {t('home.navigation.about.title')}
                  </h4>
                  <p className='text-gray-600 text-sm md:text-base'>
                    {t('home.navigation.about.description')}
                  </p>
                </div>
              </div>
            </a>

            <a
              className='bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200'
              href={goTo('/events')}
            >
              <div className='flex items-start'>
                <div className='bg-green-100 rounded-full p-2 mr-4 flex-shrink-0'>
                  <IoCalendar className='text-green-600' size={25} />
                </div>
                <div>
                  <h4 className='font-semibold text-lg text-gray-900 mb-2'>
                    {t('home.navigation.events.title')}
                  </h4>
                  <p className='text-gray-600 text-sm md:text-base'>
                    {t('home.navigation.events.description')}
                  </p>
                </div>
              </div>
            </a>

            <a
              className='bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200'
              href={goTo('/photos')}
            >
              <div className='flex items-start'>
                <div className='bg-purple-100 rounded-full p-2 mr-4 flex-shrink-0'>
                  <ImCamera className='text-purple-600' size={25} />
                </div>
                <div>
                  <h4 className='font-semibold text-lg text-gray-900 mb-2'>
                    {t('home.navigation.photos.title')}
                  </h4>
                  <p className='text-gray-600 text-sm md:text-base'>
                    {t('home.navigation.photos.description')}
                  </p>
                </div>
              </div>
            </a>

            <a
              className='bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200'
              href={goTo('/contact')}
            >
              <div className='flex items-start'>
                <div className='bg-orange-100 rounded-full p-2 mr-4 flex-shrink-0'>
                  <IoIosMail className='text-orange-600' size={25} />
                </div>
                <div>
                  <h4 className='font-semibold text-lg text-gray-900 mb-2'>
                    {t('home.navigation.contact.title')}
                  </h4>
                  <p className='text-gray-600 text-sm md:text-base'>
                    {t('home.navigation.contact.description')}
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
