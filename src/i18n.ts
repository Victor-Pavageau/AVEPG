import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import intervalPlural from 'i18next-intervalplural-postprocessor';
import { initReactI18next } from 'react-i18next';
import commonEn from './translations/en.json';
import commonFr from './translations/fr.json';

export type Languages = {
  value: string; // BCP 47
  label: string;
  countryCode: string; // ISO 3166-1
  countryName: string;
};

export const AVAILABLE_LANGUAGES: Languages[] = [
  {
    value: 'en-US',
    label: 'English',
    countryCode: 'US',
    countryName: 'United States',
  },
  {
    value: 'fr-FR',
    label: 'French',
    countryCode: 'FR',
    countryName: 'France',
  },
];

const RESOURCES: Record<string, { common: typeof commonEn }> = {
  'en-US': { common: commonEn },
  'fr-FR': { common: commonFr },
};

const DETECTION_OPTIONS: Record<string, string[]> = {
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
