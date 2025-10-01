import { Select } from 'antd';
import type { i18n } from 'i18next';
import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';
import type { Languages } from '../i18n';
import { AVAILABLE_LANGUAGES } from '../i18n';

export function LanguageSelector(): JSX.Element {
  const { i18n }: { i18n: i18n } = useTranslation();

  function changeLanguage(value: string): void {
    i18n.changeLanguage(value);
  }

  const defaultValue: Languages =
    AVAILABLE_LANGUAGES.find((l: Languages) => l.value === i18n.language) ?? AVAILABLE_LANGUAGES[0];

  return (
    <Select
      defaultValue={(defaultValue.label, defaultValue.value)}
      onChange={changeLanguage}
      variant='underlined'
      options={AVAILABLE_LANGUAGES.map((l: Languages) => ({
        label: (
          <div className='flex items-center gap-3 w-28'>
            <img
              className='h-4'
              src={`https://flagcdn.com/${l.countryCode.toLowerCase()}.svg`}
              alt={l.countryName}
            />
            {l.label}
          </div>
        ),
        value: l.value,
      }))}
    />
  );
}
