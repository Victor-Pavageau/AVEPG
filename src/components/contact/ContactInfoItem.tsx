import type { JSX, ReactNode } from 'react';

interface Props {
  icon: ReactNode;
  iconBgColor: string;
  iconColor: string;
  title: string;
  children: ReactNode;
}

export function ContactInfoItem({
  icon,
  iconBgColor,
  iconColor,
  title,
  children,
}: Props): JSX.Element {
  return (
    <div className='flex items-start space-x-4'>
      <div className='flex-shrink-0'>
        <div className={`w-10 h-10 ${iconBgColor} rounded-lg flex items-center justify-center`}>
          <span className={iconColor}>{icon}</span>
        </div>
      </div>
      <div className='flex-1'>
        <h4 className='font-semibold text-gray-900 mb-1'>{title}</h4>
        {children}
      </div>
    </div>
  );
}
