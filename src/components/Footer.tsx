import { JSX } from 'react';
import { useTranslation } from 'react-i18next';

export function Footer(): JSX.Element {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-gray-800 text-white mt-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
        <div className='text-center'>
          <div className='mb-4'>
            <p className='text-gray-400 text-xs'>
              {t('shared.footer.photoRights')}
            </p>
          </div>

          <div className='border-t border-gray-700 pt-4 space-y-2'>
            <p className='text-gray-300 text-sm'>
              {t('shared.footer.copyright', { year: currentYear })}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
