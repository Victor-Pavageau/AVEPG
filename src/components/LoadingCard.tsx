import { Spin } from 'antd';
import type { JSX } from 'react';

export function LoadingCard(): JSX.Element {
  return (
    <div className='flex justify-center items-center py-12 bg-gray-50 rounded-lg'>
      <Spin
        percent='auto'
        size='large'
      />
    </div>
  );
}
