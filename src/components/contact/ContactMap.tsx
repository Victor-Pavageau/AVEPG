import type { TFunction } from 'i18next';
import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { FaMapMarkerAlt } from 'react-icons/fa';

export function ContactMap(): JSX.Element {
  const { t }: { t: TFunction } = useTranslation();

  const contactAddress: string | null = import.meta.env.VITE_CONTACT_ADDRESS ?? null;

  return (
    <div className='space-y-4'>
      {contactAddress && (
        <div className='flex items-start space-x-4'>
          <div className='flex-shrink-0'>
            <div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center'>
              <FaMapMarkerAlt className='text-blue-600' />
            </div>
          </div>
          <div className='flex-1'>
            <h4 className='font-semibold text-gray-900 mb-1'>{t('contact.info.address.title')}</h4>
            <p className='text-gray-600 whitespace-pre-line mb-4'>{contactAddress}</p>
          </div>
        </div>
      )}

      <div className='hidden sm:block w-full rounded-lg overflow-hidden shadow-sm border border-gray-200'>
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m17!1m11!1m3!1d126.8637920945285!2d6.058624590047473!3d46.332800889605394!2m2!1f349.3058737457088!2f45!3m2!1i1024!2i768!4f35!3m3!1m2!1s0x478c6030ccec3b5b%3A0x9104b86e8a5c639a!2sMairie!5e1!3m2!1sfr!2sfr!4v1760886824708!5m2!1sfr!2sfr'
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
