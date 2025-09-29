import { JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { goTo } from '../services';
import { Path, PathsLabels } from '../types';
import LanguageSelector from './LanguageSelector';

interface Props {
  isMobile: boolean;
  onLinkClick?: () => void;
}

export function NavigationLinks(props: Props): JSX.Element {
  const { isMobile, onLinkClick } = props;

  const location = useLocation();
  const { t } = useTranslation();

  return (
    <>
      {(Object.keys(PathsLabels) as Path[])
        .filter((path) => path !== '*') // Exclude the Not Found path
        .map((path) => (
          <a
            key={path}
            href={goTo(path)}
            className={
              isMobile
                ? `block px-3 py-2 rounded-md text-base transition-colors ${
                    location.pathname === path
                      ? 'text-[#0164B5] font-extrabold bg-gray-100'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 font-medium'
                  }`
                : `px-3 py-2 rounded-md text-sm transition-colors ${
                    location.pathname === path
                      ? 'font-extrabold text-[#0164B5]'
                      : 'font-medium text-gray-600 hover:text-gray-900'
                  }`
            }
            onClick={onLinkClick}
          >
            {t(`shared.navbar.${path}`)}
          </a>
        ))}
      <div className={isMobile ? 'px-3 py-2' : ''}>
        <LanguageSelector />
      </div>
    </>
  );
}

export default NavigationLinks;
