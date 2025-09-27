import { JSX } from 'react';
import { useLocation } from 'react-router';
import { goTo } from '../services';
import { Path, PathsLabels } from '../types';

function Navbar(): JSX.Element {
  const location = useLocation();
  return (
    <nav className='fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-gray-200'>
      <div className='mx-16 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-20'>
          <a className='h-full' href={goTo('/')}>
            <img src='/assets/logo.png' alt='AVEPG Logo' className='h-full' />
          </a>
          <div className='hidden md:block'>
            <div className='ml-10 flex items-baseline space-x-4'>
              {(Object.keys(PathsLabels) as Path[])
                .filter((path) => path !== '*') // Exclude the Not Found path
                .map((path) => (
                  <a
                    key={path}
                    href={goTo(path)}
                    className={`text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm transition-colors ${
                      location.pathname === path ? 'font-bold' : 'font-medium'
                    }`}
                  >
                    {PathsLabels[path]}
                  </a>
                ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
