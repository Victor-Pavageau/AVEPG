import type { TFunction } from 'i18next';
import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';
import type { Location } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { goTo } from '../../helpers';
import type { Path } from '../../types';
import { PathsLabels } from '../../types';
import { LanguageSelector } from './LanguageSelector';

interface Props {
  readonly isMobile: boolean;
  readonly onLinkClick?: () => void;
}

export function NavigationLinks({ isMobile, onLinkClick }: Readonly<Props>): JSX.Element {
  const location: Location = useLocation();
  const { t }: { t: TFunction } = useTranslation();

  return (
    <>
      {(Object.keys(PathsLabels) as Path[])
        .filter((path: Path) => path !== '*') // Exclude the Not Found path
        .map((path: Path) => (
          <a
            key={path}
            href={location.pathname === path ? undefined : goTo(path)}
            className={`px-3 py-2 rounded-md ${
              isMobile
                ? `block text-base transition-colors ${
                    location.pathname === path
                      ? 'text-[#0164B5]! font-extrabold bg-gray-100'
                      : 'text-gray-600! hover:text-gray-900 hover:bg-gray-100 font-medium'
                  }`
                : `text-sm transition-colors ${
                    location.pathname === path
                      ? 'font-extrabold text-[#0164B5]!'
                      : 'font-medium text-gray-600! hover:text-gray-900'
                  }`
            }`}
            onClick={onLinkClick}>
            {t(`shared.navbar.${path}`)}
          </a>
        ))}
      <div className={isMobile ? 'px-3 py-2' : ''}>
        <LanguageSelector />
      </div>
    </>
  );
}
