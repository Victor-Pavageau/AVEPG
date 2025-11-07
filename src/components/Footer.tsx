import type { TFunction } from 'i18next';
import type { Dispatch, JSX, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import pkg from '../../package.json';
import { OrganizationJsonLd } from './OrganizationJsonLd';

export function Footer(): JSX.Element {
  const { t }: { t: TFunction } = useTranslation();
  const currentYear: number = new Date().getFullYear();
  const appVersion: string = pkg.version;
  const [blogUrl, setBlogUrl]: [string, Dispatch<SetStateAction<string>>] = useState<string>('');

  useEffect(() => {
    async function fetchGitHubProfile(): Promise<void> {
      const res: Response = await fetch('https://api.github.com/users/victor-pavageau', {
        headers: {
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
      });

      if (!res.ok) {
        return;
      }

      const data: unknown = await res.json();

      if (
        typeof data === 'object' &&
        data !== null &&
        'blog' in data &&
        typeof data.blog === 'string'
      ) {
        setBlogUrl(data.blog.trim());
      }
    }

    fetchGitHubProfile();
  }, []);

  return (
    <footer className='bg-gray-800 text-white mt-8'>
      <OrganizationJsonLd />
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
              className='text-gray-400! hover:text-white! transition-colors'>
              <FaFacebookF size={20} />
            </a>

            <a
              href='https://www.instagram.com/avepgex/'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Link to AVEPG Instagram'
              className='text-gray-400! hover:text-white! transition-colors'>
              <FaInstagram size={20} />
            </a>
          </div>

          <div className='border-t border-gray-700 pt-4 space-y-2'>
            <p className='text-gray-300 text-sm'>
              {t('shared.footer.copyright', { year: currentYear })}
              <span className='text-gray-400 ml-2'>v{appVersion}</span>
            </p>

            {blogUrl.length > 0 ? (
              <p className='text-gray-400 text-xs mt-2'>
                <a
                  href={blogUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-gray-400! hover:text-white! transition-colors'>
                  {t('shared.footer.credit')}
                </a>
              </p>
            ) : (
              <p className='text-gray-400 text-xs mt-2'>{t('shared.footer.credit')}</p>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
