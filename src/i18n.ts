import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import intervalPlural from 'i18next-intervalplural-postprocessor';
import { initReactI18next } from 'react-i18next';
import commonEn from './translations/en.json';
import commonFr from './translations/fr.json';

export type Language = {
  value: string; // BCP 47
  label: string;
  countryCode: string; // ISO 3166-1
  countryName: string;
};

export const AVAILABLE_LANGUAGES: Language[] = [
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

export function languageToIso6391(language: string): string {
  return language.split('-')[0];
}

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
