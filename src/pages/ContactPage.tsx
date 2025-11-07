import type { TFunction } from 'i18next';
import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { ContactForm, ContactHeader, ContactInfo, Seo } from '../components';
import { useSubmitCooldown } from '../hooks';

export default function ContactPage(): JSX.Element {
  const {
    isInCooldown,
    remainingSeconds,
    startCooldown,
  }: {
    isInCooldown: boolean;
    remainingSeconds: number;
    startCooldown: () => void;
  } = useSubmitCooldown();

  const { t }: { t: TFunction } = useTranslation();

  return (
    <div className='w-full px-6 md:px-12 max-w-7xl mx-auto py-8'>
      <Seo
        title={t('contact.title')}
        description={t('contact.description')}
      />
      <div className='text-gray-800'>
        <ContactHeader />

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <ContactForm
            isInCooldown={isInCooldown}
            remainingSeconds={remainingSeconds}
            startCooldown={startCooldown}
          />
          <ContactInfo />
        </div>
      </div>
    </div>
  );
}
