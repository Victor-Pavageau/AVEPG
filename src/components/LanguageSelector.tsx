import { Select } from 'antd';
import { JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { AVAILABLE_LANGUAGES, Languages } from '../i18n';

export function LanguageSelector(): JSX.Element {
  const { i18n } = useTranslation();

  const changeLanguage = (value: string) => {
    i18n.changeLanguage(value);
  };

  const defaultValue: Languages =
    AVAILABLE_LANGUAGES.find((l: Languages) => l.value === i18n.language) ??
    AVAILABLE_LANGUAGES[0];

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
              src={`https://flagcdn.com/${l.country_code.toLowerCase()}.svg`}
              alt={l.country_name}
            />
            {l.label}
          </div>
        ),
        value: l.value,
      }))}
    />
  );
}
