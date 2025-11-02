import type { JSX, ReactNode } from 'react';

interface Props {
  readonly icon: ReactNode;
  readonly iconBgColor: string;
  readonly iconColor: string;
  readonly title: string;
  readonly className?: string;
}

export function SectionHeader({
  icon,
  iconBgColor,
  iconColor,
  title,
  className = 'mb-6',
}: Readonly<Props>): JSX.Element {
  return (
    <div className={`flex items-center ${className}`}>
      <div className={`${iconBgColor} rounded-full p-3 mr-4`}>
        <div className={iconColor}>{icon}</div>
      </div>
      <h2 className='text-2xl md:text-3xl font-bold text-gray-900'>{title}</h2>
    </div>
  );
}
