import type { TFunction } from 'i18next';
import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

interface CooldownNotificationProps {
  remainingSeconds: number;
}

export function CooldownNotification({ remainingSeconds }: CooldownNotificationProps): JSX.Element {
  const { t }: { t: TFunction } = useTranslation();

  return (
    <div className='mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg'>
      <p className='text-yellow-800 text-sm font-medium mb-1'>
        ⏳ {t('contact.form.cooldown', { seconds: remainingSeconds })}
      </p>
      <p className='text-yellow-600 text-xs'>{t('contact.form.cooldownDescription')}</p>
    </div>
  );
}
