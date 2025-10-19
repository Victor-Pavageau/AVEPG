import type { TFunction } from 'i18next';
import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { FaEnvelope, FaPhone } from 'react-icons/fa';
import { Card } from '../Card';
import { ContactMap } from './ContactMap';

export function ContactInfo(): JSX.Element {
  const { t }: { t: TFunction } = useTranslation();

  const contactEmail: string | null = import.meta.env.VITE_CONTACT_EMAIL_ADDRESS ?? null;
  const contactPhone: string | null = import.meta.env.VITE_CONTACT_PHONE_NUMBER ?? null;

  return (
    <div className='lg:col-span-1'>
      <Card className='h-full'>
        <h3 className='text-xl font-bold text-gray-900 mb-6'>{t('contact.info.title')}</h3>

        <div className='space-y-6'>
          <ContactMap />

          <div className='border-t border-gray-200'></div>

          <div className='flex items-start space-x-4'>
            <div className='flex-shrink-0'>
              <div className='w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center'>
                <FaEnvelope className='text-green-600' />
              </div>
            </div>
            <div>
              <h4 className='font-semibold text-gray-900 mb-1'>{t('contact.info.email.title')}</h4>
              <a
                className='text-gray-600'
                href={`mailto:${contactEmail}`}>
                {contactEmail ?? t('contact.info.email.value')}
              </a>
            </div>
          </div>

          <div className='border-t border-gray-200'></div>

          <div className='flex items-start space-x-4'>
            <div className='flex-shrink-0'>
              <div className='w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center'>
                <FaPhone className='text-orange-600' />
              </div>
            </div>
            <div>
              <h4 className='font-semibold text-gray-900 mb-1'>{t('contact.info.phone.title')}</h4>
              <a
                className='text-gray-600'
                href={`tel:${contactPhone}`}>
                {contactPhone ?? t('contact.info.phone.value')}
              </a>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
