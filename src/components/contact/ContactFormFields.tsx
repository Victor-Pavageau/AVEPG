import { Form, Input } from 'antd';
import type { TFunction } from 'i18next';
import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

export function ContactFormFields(): JSX.Element {
  const { t }: { t: TFunction } = useTranslation();

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

  return (
    <>
      {/* Name fields */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6'>
        <Form.Item
          name='firstName'
          label={t('contact.form.firstName.label')}
          rules={[
            {
              required: true,
              message: t('contact.form.firstName.required'),
            },
          ]}>
          <Input placeholder={t('contact.form.firstName.placeholder')} />
        </Form.Item>

        <Form.Item
          name='lastName'
          label={t('contact.form.lastName.label')}
          rules={[
            {
              required: true,
              message: t('contact.form.lastName.required'),
            },
          ]}>
          <Input placeholder={t('contact.form.lastName.placeholder')} />
        </Form.Item>
      </div>

      {/* Email and Phone fields */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6'>
        <Form.Item
          name='email'
          label={t('contact.form.email.label')}
          rules={[
            {
              required: true,
              message: t('contact.form.email.required'),
            },
            {
              type: 'email',
              message: t('contact.form.email.invalid'),
            },
          ]}>
          <Input placeholder={t('contact.form.email.placeholder')} />
        </Form.Item>

        <Form.Item
          name='phone'
          label={t('contact.form.phone.label')}
          rules={[
            {
              validator: validatePhone,
            },
          ]}>
          <Input placeholder={t('contact.form.phone.placeholder')} />
        </Form.Item>
      </div>

      {/* Subject field */}
      <Form.Item
        name='subject'
        label={t('contact.form.subject.label')}
        rules={[
          {
            required: true,
            message: t('contact.form.subject.required'),
          },
        ]}
        className='mb-6'>
        <Input placeholder={t('contact.form.subject.placeholder')} />
      </Form.Item>

      {/* Message field */}
      <Form.Item
        name='message'
        label={t('contact.form.message.label')}
        rules={[
          {
            required: true,
            message: t('contact.form.message.required'),
          },
          {
            min: 10,
            message: t('contact.form.message.minLength'),
          },
        ]}
        className='mb-6'>
        <Input.TextArea
          placeholder={t('contact.form.message.placeholder')}
          rows={5}
        />
      </Form.Item>
    </>
  );
}
