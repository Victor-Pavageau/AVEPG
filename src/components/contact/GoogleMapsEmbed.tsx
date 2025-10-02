import type { TFunction } from 'i18next';
import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

export function GoogleMapsEmbed(): JSX.Element {
  const { t }: { t: TFunction } = useTranslation();

  return (
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
  );
}
