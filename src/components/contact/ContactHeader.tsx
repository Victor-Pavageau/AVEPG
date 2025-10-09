import type { TFunction } from 'i18next';
import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../Card';

export function ContactHeader(): JSX.Element {
  const { t }: { t: TFunction } = useTranslation();

  return (
    <>
      <h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center'>
        {t('contact.title')}
      </h1>

      <Card
        bordered
        className='mb-8 border-[#0164B5]'>
        <p className='text-base md:text-lg leading-relaxed text-center'>
          {t('contact.description')}
        </p>
      </Card>
    </>
  );
}
