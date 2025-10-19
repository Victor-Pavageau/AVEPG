import type { TFunction } from 'i18next';
import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';

export function Footer(): JSX.Element {
  const { t }: { t: TFunction } = useTranslation();
  const currentYear: number = new Date().getFullYear();

  return (
    <footer className='bg-gray-800 text-white mt-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
        <div className='text-center'>
          <div className='mb-4'>
            <p className='text-gray-400 text-xs'>{t('shared.footer.photoRights')}</p>
          </div>

          <div className='flex items-center justify-center space-x-4 mt-2 pb-6'>
            <a
              href='https://www.facebook.com/AVEPaysdeGex'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Link to AVEPG Facebook'
              className='!text-gray-400 hover:!text-white transition-colors'>
              <FaFacebookF size={20} />
            </a>

            <a
              href='https://www.instagram.com/avepgex/'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Link to AVEPG Instagram'
              className='!text-gray-400 hover:!text-white transition-colors'>
              <FaInstagram size={20} />
            </a>
          </div>

          <div className='border-t border-gray-700 pt-4 space-y-2'>
            <p className='text-gray-300 text-sm'>
              {t('shared.footer.copyright', { year: currentYear })}
            </p>

            <p className='text-gray-400 text-xs mt-2'>{t('shared.footer.credit')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
