import { JSX } from 'react';
import { goTo } from '../services';
import { Path, PathsLabels } from '../types';
import LanguageSelector from './LanguageSelector';
import { useLocation } from 'react-router-dom';

type Props = {
  isMobile: boolean;
  onLinkClick?: () => void;
};

export function NavigationLinks(props: Props): JSX.Element {
  const { isMobile, onLinkClick } = props;

  const location = useLocation();

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
                      ? 'text-gray-900 font-bold bg-gray-100'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 font-medium'
                  }`
                : `text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm transition-colors ${
                    location.pathname === path ? 'font-bold' : 'font-medium'
                  }`
            }
            onClick={onLinkClick}
          >
            {PathsLabels[path]}
          </a>
        ))}
      <div className={isMobile ? 'px-3 py-2' : ''}>
        <LanguageSelector />
      </div>
    </>
  );
}

export default NavigationLinks;
