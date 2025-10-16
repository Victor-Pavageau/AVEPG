import { Tabs } from 'antd';
import type { i18n } from 'i18next';
import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';

type Tab = {
  key: string;
  label: string;
  children: JSX.Element;
};

export function EventsPage(): JSX.Element {
  const { i18n }: { i18n: i18n } = useTranslation();

  // TODO:
  // Fetch events from strapi service and populate tabs dynamically (based on event date or type)
  // Add translation
  // Make the current tab visible in the URL (query param) to allow direct linking to specific tabs

  const tabs: Tab[] = [
    { key: '0', label: 'Past Events', children: <div>Past Events Content</div> },
    { key: '1', label: 'Upcoming Events', children: <div>Upcoming Events Content</div> },
    { key: '2', label: 'Gex Rétromobiles', children: <div>Gex Rétromobiles Content</div> },
  ];

  return (
    <div className='w-full px-6 md:px-12 max-w-7xl mx-auto py-8'>
      <Tabs
        defaultActiveKey='2'
        type='card'
        size='large'
        items={tabs}
        className='w-full'
      />
    </div>
  );
}
