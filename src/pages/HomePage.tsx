import { JSX } from 'react';
import { useTranslation } from 'react-i18next';

export function HomePage(): JSX.Element {
  const { t } = useTranslation();
  return <h1>{t('home.title')}</h1>;
}

export default HomePage;
