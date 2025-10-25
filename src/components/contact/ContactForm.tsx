import Button from 'antd/es/button/button';
import type { FormInstance } from 'antd/es/form';
import Form from 'antd/es/form';
import Input from 'antd/es/input';
import type { TFunction } from 'i18next';
import type { JSX } from 'react';
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
  form: FormInstance;
  isSubmitting: boolean;
  isInCooldown: boolean;
  remainingSeconds: number;
  validatePhone: (_: unknown, value: string) => Promise<void>;
  onSubmit: (values: IContactFormData) => Promise<void>;
  onReset: () => void;
}

export function ContactForm({
  form,
  isSubmitting,
  isInCooldown,
  remainingSeconds,
  validatePhone,
  onSubmit,
  onReset,
}: Props): JSX.Element {
  const { t }: { t: TFunction } = useTranslation();

  return (
    <div className='lg:col-span-1'>
      <Card>
        <Form
          form={form}
          layout='vertical'
          onFinish={onSubmit}
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
              onClick={onReset}
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
