import Tabs from 'antd/es/tabs';
import type { i18n, TFunction } from 'i18next';
import type { Dispatch, JSX, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { EventsTimeline, GexRetromobilesNewsTab, LoadingCard, Seo } from '../components';
import { StrapiService } from '../services';
import type { IEvent } from '../types';

type Tab = {
  key: string;
  label: JSX.Element;
  children: JSX.Element;
};

export default function EventsPage(): JSX.Element {
  const { t, i18n }: { t: TFunction; i18n: i18n } = useTranslation();
  const [searchParams, setSearchParams]: [
    URLSearchParams,
    Dispatch<SetStateAction<URLSearchParams>>,
  ] = useSearchParams();
  const [events, setEvents]: [IEvent[], Dispatch<SetStateAction<IEvent[]>>] = useState<IEvent[]>(
    [],
  );
  const [loading, setLoading]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(true);
  const [tabs, setTabs]: [Tab[], Dispatch<SetStateAction<Tab[]>>] = useState<Tab[]>([]);

  const defaultActiveKey: string = 'gex-retromobiles';

  useEffect(() => {
    const fetchEvents = async (): Promise<void> => {
      setLoading(true);
      try {
        await StrapiService.getEvents(i18n.language).then(setEvents);
      } catch {
        setEvents([]);
        setTabs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [i18n.language]);

  useEffect(() => {
    const gexRetromobilesTab: Tab = {
      key: defaultActiveKey,
      label: (
        <span className='flex items-center gap-1 md:gap-2 text-sm md:text-base'>
          <span className='hidden md:inline'>{t('events.tabs.gexRetromobiles')}</span>
          <span className='md:hidden'>{t('events.tabs.gexRetromobilesShort')}</span>
        </span>
      ),
      children: (
        <div className='pt-6'>
          <GexRetromobilesNewsTab />
        </div>
      ),
    };

    const eventYears: Set<number> = new Set<number>(
      events.map((ev: IEvent) => new Date(ev.startDate).getFullYear()),
    );

    const yearTabs: Tab[] = Array.from(eventYears).map((year: number): Tab => {
      return {
        key: `year-${year}`,
        label: (
          <span className='flex items-center gap-1 md:gap-2 text-sm md:text-base'>{year}</span>
        ),
        children: (
          <div className='pt-6'>
            <EventsTimeline
              events={events.filter((ev: IEvent) => new Date(ev.startDate).getFullYear() === year)}
            />
          </div>
        ),
      };
    });

    setTabs([...yearTabs, gexRetromobilesTab]);
  }, [events, loading, t]);

  const getActiveTab = (): string => {
    const tabParam: string | null = searchParams.get('tab');
    const validKeys: string[] = tabs.map((tab: Tab) => tab.key);

    return tabParam && validKeys.includes(tabParam) ? tabParam : defaultActiveKey;
  };

  const handleTabChange = (activeKey: string): void => {
    const newSearchParams: URLSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('tab', activeKey);
    setSearchParams(newSearchParams);
  };

  useEffect(() => {
    const tabParam: string | null = searchParams.get('tab');
    const validKeys: string[] = tabs.map((tab: Tab) => tab.key);

    if (!tabParam || !validKeys.includes(tabParam)) {
      const newSearchParams: URLSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('tab', defaultActiveKey);
      setSearchParams(newSearchParams);
    }
  }, [searchParams, setSearchParams, tabs, defaultActiveKey]);

  return (
    <div className='w-full px-4 md:px-6 lg:px-12 max-w-7xl mx-auto py-4 md:py-6 lg:py-8'>
      <Seo
        title={t('home.navigation.events.title')}
        description={t('home.navigation.events.description')}
      />
      {loading ? (
        <LoadingCard />
      ) : tabs.length === 0 || events.length === 0 ? (
        <div className='bg-red-50 border border-red-200 text-red-800 rounded-md p-6'>
          <h3 className='text-lg font-medium'>{t('events.error.title')}</h3>
          <p className='mt-2'>{t('events.error.message')}</p>
        </div>
      ) : (
        <Tabs
          activeKey={getActiveTab()}
          centered
          type='card'
          size='large'
          items={tabs}
          className='w-full'
          tabBarStyle={{
            marginBottom: 0,
          }}
          onChange={handleTabChange}
        />
      )}
    </div>
  );
}
