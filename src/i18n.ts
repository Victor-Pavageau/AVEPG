import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import intervalPlural from 'i18next-intervalplural-postprocessor';
import { initReactI18next } from 'react-i18next';
import commonEn from './translations/en.json';
import commonFr from './translations/fr.json';

export type Languages = {
  value: string; // BCP 47
  label: string;
  country_code: string; // ISO 3166-1
  country_name: string;
};

export const AVAILABLE_LANGUAGES: Languages[] = [
  {
    value: 'en-US',
    label: 'English',
    country_code: 'US',
    country_name: 'United States',
  },
  {
    value: 'fr-FR',
    label: 'French',
    country_code: 'FR',
    country_name: 'France',
  },
];

const RESOURCES = {
  'en-US': { common: commonEn },
  'fr-FR': { common: commonFr },
};

const DETECTION_OPTIONS = {
  order: ['localStorage', 'navigator'],
  caches: ['localStorage'],
};

i18n
  .use(LanguageDetector)
  .use(intervalPlural)
  .use(initReactI18next)
  .init({
    detection: DETECTION_OPTIONS,
    resources: RESOURCES,
    defaultNS: 'common',
    fallbackLng: 'en-US',
    interpolation: { escapeValue: false },
  });

export default i18n;
