import App from 'antd/es/app';
import Button from 'antd/es/button/button';
import type { FormInstance } from 'antd/es/form';
import Form from 'antd/es/form';
import Input from 'antd/es/input';
import type { MessageInstance } from 'antd/es/message/interface';
import type { TFunction } from 'i18next';
import { useState, type Dispatch, type JSX, type SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../Card';

export interface IContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

interface Props {
  readonly isInCooldown: boolean;
  readonly remainingSeconds: number;
  readonly startCooldown: () => void;
}

export function ContactForm({
  isInCooldown,
  remainingSeconds,
  startCooldown,
}: Readonly<Props>): JSX.Element {
  const { t }: { t: TFunction } = useTranslation();
  const [form]: [FormInstance] = Form.useForm();
  const { message }: { message: MessageInstance } = App.useApp();
  const [isSubmitting, setIsSubmitting]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState<boolean>(false);

  const validatePhone = (_: unknown, value: string): Promise<void> => {
    if (!value) {
      return Promise.resolve(); // Phone is optional
    }

    const phoneRegex: RegExp = /^[0-9+\-\s()]+$/;

    if (phoneRegex.test(value)) {
      return Promise.resolve();
    }

    return Promise.reject(new Error(t('contact.form.phone.invalid')));
  };

  const handleSubmit = async (values: IContactFormData): Promise<void> => {
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
      formData.append('_captcha', 'false');
      formData.append('_template', 'box');

      const response: Response = await fetch(`https://formsubmit.co/${emailFormId}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
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
    <div className='lg:col-span-1'>
      <Card>
        <Form
          form={form}
          layout='vertical'
          onFinish={handleSubmit}
          size='large'
          requiredMark={false}>
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

          {isInCooldown && (
            <div className='mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg'>
              <p className='text-yellow-800 text-sm font-medium mb-1'>
                ⏳ {t('contact.form.cooldown', { seconds: remainingSeconds })}
              </p>
            </div>
          )}

          <div className='flex flex-col sm:flex-row gap-3'>
            <Button
              type='primary'
              htmlType='submit'
              size='large'
              loading={isSubmitting}
              disabled={isInCooldown}
              title={
                isInCooldown ? t('contact.form.cooldown', { seconds: remainingSeconds }) : undefined
              }
              className='flex-1'>
              <span className='py-2 sm:py-0'>
                {isSubmitting ? t('contact.form.sending') : t('contact.form.submitButton')}
              </span>
            </Button>
            <Button
              onClick={handleReset}
              size='large'
              disabled={isSubmitting}
              className='flex-1 sm:flex-initial'>
              {t('contact.form.resetButton')}
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
