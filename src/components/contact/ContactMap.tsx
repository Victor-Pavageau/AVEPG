import type { TFunction } from 'i18next';
import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { FaMapMarkerAlt } from 'react-icons/fa';

export function ContactMap(): JSX.Element {
  const { t }: { t: TFunction } = useTranslation();

  return (
    <div className='space-y-4'>
      <div className='flex items-start space-x-4'>
        <div className='flex-shrink-0'>
          <div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center'>
            <FaMapMarkerAlt className='text-blue-600' />
          </div>
        </div>
        <div className='flex-1'>
          <h4 className='font-semibold text-gray-900 mb-1'>{t('contact.info.address.title')}</h4>
          <p className='text-gray-600 whitespace-pre-line mb-4'>
            {t('contact.info.address.value')}
          </p>
        </div>
      </div>

      {/* Google Maps iframe - hidden on mobile, visible on larger screens */}
      <div className='hidden sm:block w-full rounded-lg overflow-hidden shadow-sm border border-gray-200'>
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1016.558304501071!2d2.2949904140730513!3d48.85811907603612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sTour%20Eiffel!5e1!3m2!1sfr!2sfr!4v1759434268183!5m2!1sfr!2sfr'
          width='100%'
          height='280'
          style={{ border: 0 }}
          allowFullScreen={true}
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
          title={t('contact.info.address.title')}
          className='sm:h-80 lg:h-96'
        />
      </div>
    </div>
  );
}
