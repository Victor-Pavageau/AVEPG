import type { TFunction } from 'i18next';
import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { Card } from '../Card';
import { ContactInfoItem } from './ContactInfoItem';
import { GoogleMapsEmbed } from './GoogleMapsEmbed';

interface ContactInfoProps {
  contactEmail: string;
  contactPhone: string;
}

export function ContactInfo({ contactEmail, contactPhone }: ContactInfoProps): JSX.Element {
  const { t }: { t: TFunction } = useTranslation();

  return (
    <div className='lg:col-span-1'>
      <Card className='h-full'>
        <h3 className='text-xl font-bold text-gray-900 mb-6'>{t('contact.info.title')}</h3>

        <div className='space-y-6'>
          {/* Address with Map */}
          <div className='space-y-4'>
            <ContactInfoItem
              icon={<FaMapMarkerAlt />}
              iconBgColor='bg-blue-100'
              iconColor='text-blue-600'
              title={t('contact.info.address.title')}>
              <p className='text-gray-600 whitespace-pre-line mb-4'>
                {t('contact.info.address.value')}
              </p>
            </ContactInfoItem>

            <GoogleMapsEmbed />
          </div>

          {/* Divider */}
          <div className='border-t border-gray-200'></div>

          {/* Email */}
          <ContactInfoItem
            icon={<FaEnvelope />}
            iconBgColor='bg-green-100'
            iconColor='text-green-600'
            title={t('contact.info.email.title')}>
            <a
              className='text-gray-600 hover:text-blue-600 transition-colors'
              href={`mailto:${contactEmail}`}>
              {contactEmail || t('contact.info.email.value')}
            </a>
          </ContactInfoItem>

          {/* Divider */}
          <div className='border-t border-gray-200'></div>

          {/* Phone */}
          <ContactInfoItem
            icon={<FaPhone />}
            iconBgColor='bg-orange-100'
            iconColor='text-orange-600'
            title={t('contact.info.phone.title')}>
            <a
              className='text-gray-600 hover:text-blue-600 transition-colors'
              href={`tel:${contactPhone}`}>
              {contactPhone || t('contact.info.phone.value')}
            </a>
          </ContactInfoItem>
        </div>
      </Card>
    </div>
  );
}
