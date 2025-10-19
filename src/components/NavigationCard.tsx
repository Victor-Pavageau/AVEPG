import type { JSX, ReactNode } from 'react';
import { goTo } from '../helpers';
import type { Path } from '../types';
import { Card } from './Card';

interface Props {
  path: Path;
  icon: ReactNode;
  iconBgColor: string;
  iconColor: string;
  title: string;
  description: string;
  className?: string;
}

export function NavigationCard({
  path,
  icon,
  iconBgColor,
  iconColor,
  title,
  description,
  className,
}: Props): JSX.Element {
  return (
    <a
      href={goTo(path)}
      className='block'>
      <Card
        className={`${className ?? ''} hover:shadow-md transition-shadow duration-200 cursor-pointer`}>
        <div className='flex items-start'>
          <div className={`${iconBgColor} rounded-full p-2 mr-4 shrink-0`}>
            <div className={iconColor}>{icon}</div>
          </div>
          <div>
            <h4 className='font-semibold text-lg text-gray-900 mb-2'>{title}</h4>
            <p className='text-gray-600 text-sm md:text-base'>{description}</p>
          </div>
        </div>
      </Card>
    </a>
  );
}
