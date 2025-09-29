import { JSX, ReactNode } from 'react';

interface Props {
  icon: ReactNode;
  iconBgColor: string;
  iconColor: string;
  title: string;
  className?: string;
}

export function SectionHeader({
  icon,
  iconBgColor,
  iconColor,
  title,
  className = 'mb-6',
}: Props): JSX.Element {
  return (
    <div className={`flex items-center ${className}`}>
      <div className={`${iconBgColor} rounded-full p-3 mr-4`}>
        <div className={iconColor}>{icon}</div>
      </div>
      <h2 className='text-2xl md:text-3xl font-bold text-gray-900'>{title}</h2>
    </div>
  );
}
