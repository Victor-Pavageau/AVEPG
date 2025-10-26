import type { FormInstance } from 'antd/es/form';
import Form from 'antd/es/form';
import type { JSX } from 'react';
import { ContactForm, ContactHeader, ContactInfo } from '../components';
import { useSubmitCooldown } from '../hooks';

export default function ContactPage(): JSX.Element {
  const [form]: [FormInstance] = Form.useForm();

  const {
    isInCooldown,
    remainingSeconds,
    startCooldown,
  }: {
    isInCooldown: boolean;
    remainingSeconds: number;
    startCooldown: () => void;
  } = useSubmitCooldown();

  return (
    <div className='w-full px-6 md:px-12 max-w-7xl mx-auto py-8'>
      <div className='text-gray-800'>
        <ContactHeader />

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <ContactForm
            form={form}
            isInCooldown={isInCooldown}
            remainingSeconds={remainingSeconds}
            startCooldown={startCooldown}
          />
          <ContactInfo />
        </div>
      </div>
    </div>
  );
}
