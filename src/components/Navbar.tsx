import type { JSX } from 'react';
import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { goTo } from '../services';
import { NavigationLinks } from './NavigationLinks';

export function Navbar(): JSX.Element {
  const [isMobileMenuOpen, setIsMobileMenuOpen]: [
    boolean,
    (value: boolean) => void,
  ] = useState(false);

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 shadow-md bg-white border-b border-gray-200 select-none'>
      <div className='mx-4 sm:mx-16 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-20'>
          <a
            className='h-full'
            href={goTo('/')}>
            <img
              src='/assets/logo.png'
              alt='AVEPG Logo'
              className='h-full'
            />
          </a>

          {/* Desktop menu */}
          <div className='hidden lg:block'>
            <div className='ml-10 flex items-baseline space-x-4'>
              <NavigationLinks isMobile={false} />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className='lg:hidden'>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className='inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500'
              aria-expanded={isMobileMenuOpen}>
              <span className='sr-only'>Open main menu</span>
              <GiHamburgerMenu className='h-6 w-6' />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className='lg:hidden bg-white border-t border-gray-200'>
          <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
            <NavigationLinks
              isMobile={true}
              onLinkClick={() => setIsMobileMenuOpen(false)}
            />
          </div>
        </div>
      )}
    </nav>
  );
}
