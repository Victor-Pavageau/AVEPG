import { JSX, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  variant: 'default' | 'highlighted' | 'bordered';
  borderColor?: string;
}

export function Card({
  children,
  className = '',
  variant,
  borderColor,
}: Props): JSX.Element {
  const baseClasses = 'rounded-lg p-6 shadow-sm';

  const variantClasses = {
    default: 'bg-white border border-gray-200',
    highlighted: 'bg-gray-50',
    bordered: borderColor
      ? `bg-gray-50 border-l-4 border-${borderColor}`
      : 'bg-gray-50 border-l-4 border-[#0164B5]',
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
}

export default Card;
