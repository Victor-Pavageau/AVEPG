import type { TFunction } from 'i18next';
import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { FaExternalLinkAlt } from 'react-icons/fa';

interface Props {
  url: string;
}

export function VisitWebsite({ url }: Props): JSX.Element {
  const { t }: { t: TFunction } = useTranslation();
  return (
    <a
      href={url}
      target='_blank'
      rel='noopener noreferrer'
      className='inline-flex items-center px-4 py-2 bg-[#0164B5] text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium'>
      <span className='mr-2'>{t('shared.visitWebsite')}</span>
      <FaExternalLinkAlt size={14} />
    </a>
  );
}
