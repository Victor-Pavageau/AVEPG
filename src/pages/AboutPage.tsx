import { JSX } from 'react';
import { useTranslation } from 'react-i18next';
import {
  LeadershipSection,
  PartnersSection,
  PresentationSection,
} from '../components';

export function AboutPage(): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className='w-full px-6 md:px-12 max-w-5xl mx-auto py-8'>
      <div className='text-gray-800'>
        <h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center'>
          {t('about.title')}
        </h1>

        <PresentationSection />
        <LeadershipSection />
        <PartnersSection />
      </div>
    </div>
  );
}

export default AboutPage;
