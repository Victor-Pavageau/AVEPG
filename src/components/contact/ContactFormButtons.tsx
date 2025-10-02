import { Button } from 'antd';
import type { TFunction } from 'i18next';
import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

interface ContactFormButtonsProps {
  isSubmitting: boolean;
  isInCooldown: boolean;
  remainingSeconds: number;
  onReset: () => void;
}

export function ContactFormButtons({
  isSubmitting,
  isInCooldown,
  remainingSeconds,
  onReset,
}: ContactFormButtonsProps): JSX.Element {
  const { t }: { t: TFunction } = useTranslation();

  return (
    <div className='flex flex-col sm:flex-row gap-3'>
      <Button
        type='primary'
        htmlType='submit'
        size='large'
        loading={isSubmitting}
        disabled={isInCooldown}
        title={isInCooldown ? t('contact.form.cooldown', { seconds: remainingSeconds }) : undefined}
        className='flex-1 h-12 sm:h-auto'>
        {isSubmitting ? t('contact.form.sending') : t('contact.form.submitButton')}
      </Button>
      <Button
        onClick={onReset}
        size='large'
        disabled={isSubmitting}
        className='flex-1 sm:flex-initial h-12 sm:h-auto'>
        {t('contact.form.resetButton')}
      </Button>
    </div>
  );
}
