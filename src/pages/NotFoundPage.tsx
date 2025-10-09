import { HomeOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';
import type { TFunction } from 'i18next';
import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';
import type { NavigateFunction } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components';

export function NotFoundPage(): JSX.Element {
  const { t }: { t: TFunction } = useTranslation();
  const navigate: NavigateFunction = useNavigate();

  const handleGoHome: () => void = (): void => {
    navigate('/');
  };

  return (
    <div className='w-full px-6 md:px-12 max-w-4xl mx-auto py-8 min-h-[70vh] flex items-center justify-center'>
      <Card
        className='w-full text-center border-[#0164B5]'
        bordered>
        <Result
          icon={
            <div className='flex justify-center mb-6'>
              <img
                src='/assets/not_found_warning.svg'
                alt='Page not found'
                className='w-32 h-32 md:w-48 md:h-48 object-contain'
              />
            </div>
          }
          title={
            <h1 className='text-2xl md:text-3xl font-bold text-gray-900 mb-4'>
              {t('notFound.title')}
            </h1>
          }
          subTitle={
            <div className='text-gray-600 space-y-2'>
              <p className='text-lg md:text-xl font-medium'>{t('notFound.message')}</p>
              <p className='text-base md:text-lg'>{t('notFound.description')}</p>
            </div>
          }
          extra={
            <Button
              type='primary'
              size='large'
              icon={<HomeOutlined />}
              onClick={handleGoHome}
              className='bg-[#0164B5] hover:bg-[#014A91] border-[#0164B5] hover:border-[#014A91] px-8 py-6 h-auto text-base md:text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200'>
              {t('notFound.button')}
            </Button>
          }
        />
      </Card>
    </div>
  );
}
