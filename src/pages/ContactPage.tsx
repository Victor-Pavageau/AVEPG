import type { FormInstance } from 'antd';
import { App, Form } from 'antd';
import type { MessageInstance } from 'antd/es/message/interface';
import type { TFunction } from 'i18next';
import type { JSX } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ContactForm, ContactHeader, ContactInfo } from '../components/contact';
import { useSubmitCooldown } from '../hooks';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export function ContactPage(): JSX.Element {
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

  const contactEmail: string = import.meta.env.VITE_CONTACT_EMAIL_ADDRESS ?? '';
  const contactPhone: string = import.meta.env.VITE_CONTACT_PHONE_NUMBER ?? '';

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
            onSubmit={handleSubmit}
            onReset={handleReset}
          />

          <ContactInfo
            contactEmail={contactEmail}
            contactPhone={contactPhone}
          />
        </div>
      </div>
    </div>
  );
}
