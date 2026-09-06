import type { UseQueryResult } from '@tanstack/react-query';
import Carousel from 'antd/es/carousel';
import type { TFunction } from 'i18next';
import { nanoid } from 'nanoid';
import { type JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { useSanityDoc } from '../../services';
import type { IHomePageCarousel } from '../../types';
import { LoadingCard } from '../LoadingCard';

export function HomePageCarousel(): JSX.Element {
  const { t }: { t: TFunction } = useTranslation();

  const { data: carousel, isLoading }: UseQueryResult<IHomePageCarousel[], Error> =
    useSanityDoc<IHomePageCarousel>('homePageCarousel');

  const imageAltText: string = 'Home page carousel image';

  return isLoading ? (
    <LoadingCard />
  ) : (
    <div className='mb-8 overflow-hidden h-80 sm:h-120 lg:h-160 relative'>
      {!carousel || carousel[0].photos.length === 0 ? (
        <img
          className='h-full w-full object-cover object-[center_30%] md:object-center'
          src='/assets/pictures/home_page.png'
          alt={imageAltText}
        />
      ) : (
        <>
          {/* Mobile carousel: dots on the right */}
          <div className='block md:hidden h-full'>
            <Carousel
              autoplay={{ dotDuration: true }}
              dots={true}
              dotPosition='right'
              autoplaySpeed={5000}>
              {carousel[0].photos.map((photo: string) => (
                <div key={nanoid()}>
                  <img
                    className='h-full w-full object-cover object-[center_30%] md:object-center'
                    src={photo}
                    alt={imageAltText}
                  />
                </div>
              ))}
            </Carousel>
          </div>

          {/* Desktop carousel: dots on top */}
          <div className='hidden md:block h-full'>
            <Carousel
              autoplay={{ dotDuration: true }}
              dots={true}
              dotPosition='top'
              autoplaySpeed={5000}>
              {carousel[0].photos.map((photo: string) => (
                <div key={nanoid()}>
                  <img
                    className='h-full w-full object-cover object-[center_30%] md:object-center'
                    src={photo}
                    alt={imageAltText}
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </>
      )}
      <div className='absolute top-4 md:top-20 left-4 md:left-16 right-4 md:right-auto'>
        <div className='text-white bg-gray-800/80 rounded-lg shadow-lg inline-block md:max-w-2xl'>
          <div className='p-3 md:p-4'>
            <h3 className='font-bold text-base md:text-lg mb-2'>{t('home.shortTitle')}</h3>
            <h4 className='font-bold text-lg md:text-2xl leading-tight'>{t('home.title')}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
