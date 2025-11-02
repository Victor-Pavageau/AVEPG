import type { JSX, ReactNode } from 'react';

interface Props {
  readonly children: ReactNode;
  readonly className?: string;
  readonly bordered?: boolean;
}

export function Card({ children, className = '', bordered = false }: Readonly<Props>): JSX.Element {
  const baseClasses: string = 'rounded-lg p-6 shadow-sm';

  const cardClasses: string = bordered
    ? 'bg-gray-50 border-l-4'
    : 'bg-white border border-gray-200';

  return <div className={`${baseClasses} ${cardClasses} ${className}`}>{children}</div>;
}
