import type { FormInstance } from 'antd';
import { App, Form } from 'antd';
import type { MessageInstance } from 'antd/es/message/interface';
import type { TFunction } from 'i18next';
import type { JSX } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ContactForm, ContactHeader, ContactInfo, type ContactFormData } from '../components';
import { useSubmitCooldown } from '../hooks';

export default function ContactPage(): JSX.Element {
  const { t }: { t: TFunction } = useTranslation();
  const [form]: [FormInstance] = Form.useForm();
  const { message }: { message: MessageInstance } = App.useApp();
  const [isSubmitting, setIsSubmitting]: [boolean, (value: boolean) => void] =
    useState<boolean>(false);

  const {
    isInCooldown,
    remainingSeconds,
    startCooldown,
  }: {
    isInCooldown: boolean;
    remainingSeconds: number;
    startCooldown: () => void;
  } = useSubmitCooldown();

  const validatePhone: (_: unknown, value: string) => Promise<void> = (
    _: unknown,
    value: string,
  ): Promise<void> => {
    if (!value) {
      return Promise.resolve(); // Phone is optional
    }

    const phoneRegex: RegExp = /^[0-9+\-\s()]+$/;

    if (phoneRegex.test(value)) {
      return Promise.resolve();
    }

    return Promise.reject(new Error(t('contact.form.phone.invalid')));
  };

  const handleSubmit: (values: ContactFormData) => Promise<void> = async (
    values: ContactFormData,
  ): Promise<void> => {
    if (isInCooldown) {
      message.warning(t('contact.form.cooldown', { seconds: remainingSeconds }));
      return;
    }

    setIsSubmitting(true);

    try {
      const emailFormId: string = import.meta.env.VITE_CONTACT_EMAIL_FORM_ID ?? '';

      if (!emailFormId) {
        message.error(t('contact.error.noEmail'));
        return;
      }

      const formData: FormData = new FormData();

      formData.append('firstName', values.firstName);
      formData.append('lastName', values.lastName);
      formData.append('email', values.email);
      formData.append('phone', values.phone ?? '');
      formData.append('subject', `[Contact from AVEPG.fr] ${values.subject}`);
      formData.append('message', values.message);

      const response: Response = await fetch(`https://formsubmit.co/${emailFormId}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        message.success(t('contact.success.title'));
        form.resetFields();
        startCooldown();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        message.error(t('contact.error.network'));
      } else {
        message.error(t('contact.error.description'));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset: () => void = (): void => {
    form.resetFields();
  };

  return (
    <div className='w-full px-6 md:px-12 max-w-7xl mx-auto py-8'>
      <div className='text-gray-800'>
        <ContactHeader />

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <ContactForm
            form={form}
            isSubmitting={isSubmitting}
            isInCooldown={isInCooldown}
            remainingSeconds={remainingSeconds}
            validatePhone={validatePhone}
            onSubmit={handleSubmit}
            onReset={handleReset}
          />
          <ContactInfo />
        </div>
      </div>
    </div>
  );
}
