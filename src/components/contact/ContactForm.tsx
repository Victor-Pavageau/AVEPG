import type { FormInstance } from 'antd';
import { Form } from 'antd';
import type { JSX } from 'react';
import { Card } from '../Card';
import { ContactFormButtons } from './ContactFormButtons';
import { ContactFormFields } from './ContactFormFields';
import { CooldownNotification } from './CooldownNotification';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

interface ContactFormProps {
  form: FormInstance;
  isSubmitting: boolean;
  isInCooldown: boolean;
  remainingSeconds: number;
  onSubmit: (values: ContactFormData) => Promise<void>;
  onReset: () => void;
}

export function ContactForm({
  form,
  isSubmitting,
  isInCooldown,
  remainingSeconds,
  onSubmit,
  onReset,
}: ContactFormProps): JSX.Element {
  return (
    <div className='lg:col-span-1'>
      <Card className='h-full'>
        <Form
          form={form}
          layout='vertical'
          onFinish={onSubmit}
          size='large'
          requiredMark={false}>
          <ContactFormFields />

          {isInCooldown && <CooldownNotification remainingSeconds={remainingSeconds} />}

          <ContactFormButtons
            isSubmitting={isSubmitting}
            isInCooldown={isInCooldown}
            remainingSeconds={remainingSeconds}
            onReset={onReset}
          />
        </Form>
      </Card>
    </div>
  );
}
