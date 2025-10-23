import { Tabs } from 'antd';
import type { TFunction, i18n } from 'i18next';
import type { JSX } from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoCalendar } from 'react-icons/io5';
import { MdDirectionsCar, MdEventAvailable } from 'react-icons/md';
import { useSearchParams } from 'react-router-dom';
import { LoadingCard, PastEventsTimeline, UpcomingEventsCalendar } from '../components';
import { GexRetromobilesCard } from '../components/events';
import { splitEventsByDate, type SplitEventsResult } from '../helpers';
import { StrapiService } from '../services';
import type { Event } from '../types';

type Tab = {
  key: string;
  label: JSX.Element;
  children: JSX.Element;
};

export default function EventsPage(): JSX.Element {
  const { t, i18n }: { t: TFunction; i18n: i18n } = useTranslation();
  const [searchParams, setSearchParams]: [URLSearchParams, (params: URLSearchParams) => void] =
    useSearchParams();
  const [pastEvents, setPastEvents]: [Event[], (events: Event[]) => void] = useState<Event[]>([]);
  const [upcomingEvents, setUpcomingEvents]: [Event[], (events: Event[]) => void] = useState<
    Event[]
  >([]);
  const [loading, setLoading]: [boolean, (loading: boolean) => void] = useState(true);

  const defaultActiveKey: string = 'gex-retromobiles';

  const wrapWithPadding: (content: JSX.Element) => JSX.Element = (
    content: JSX.Element,
  ): JSX.Element => <div className='pt-6'>{content}</div>;

  const fetchEvents: () => Promise<void> = async (): Promise<void> => {
    setLoading(true);
    try {
      const events: Event[] = await StrapiService.getEvents(i18n.language);
      const { past, upcoming }: SplitEventsResult = splitEventsByDate(events);

      setPastEvents(past);
      setUpcomingEvents(upcoming);
    } catch {
      setPastEvents([]);
      setUpcomingEvents([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, [i18n.language]);

  const tabs: Tab[] = [
    {
      key: 'past',
      label: (
        <span className='flex items-center gap-1 md:gap-2 text-sm md:text-base'>
          <IoCalendar
            size={16}
            className='sm:w-5 sm:h-5'
          />
          <span className='hidden md:inline'>{t('events.tabs.past')}</span>
          <span className='md:hidden'>{t('events.tabs.pastShort')}</span>
        </span>
      ),
      children: wrapWithPadding(
        loading ? <LoadingCard /> : <PastEventsTimeline events={pastEvents} />,
      ),
    },
    {
      key: 'upcoming',
      label: (
        <span className='flex items-center gap-1 md:gap-2 text-sm md:text-base'>
          <MdEventAvailable
            size={16}
            className='sm:w-5 sm:h-5'
          />
          <span className='hidden md:inline'>{t('events.tabs.upcoming')}</span>
          <span className='md:hidden'>{t('events.tabs.upcomingShort')}</span>
        </span>
      ),
      children: wrapWithPadding(
        loading ? <LoadingCard /> : <UpcomingEventsCalendar events={upcomingEvents} />,
      ),
    },
    {
      key: defaultActiveKey,
      label: (
        <span className='flex items-center gap-1 md:gap-2 text-sm md:text-base'>
          <MdDirectionsCar
            size={16}
            className='sm:w-5 sm:h-5'
          />
          <span className='hidden md:inline'>{t('events.tabs.gexRetromobiles')}</span>
          <span className='md:hidden'>{t('events.tabs.gexRetromobilesShort')}</span>
        </span>
      ),
      children: wrapWithPadding(
        loading ? (
          <LoadingCard />
        ) : (
          <GexRetromobilesCard events={[...pastEvents, ...upcomingEvents]} />
        ),
      ),
    },
  ];

  const getActiveTab: () => string = (): string => {
    const tabParam: string | null = searchParams.get('tab');
    const validKeys: string[] = tabs.map((tab: Tab) => tab.key);
    return tabParam && validKeys.includes(tabParam) ? tabParam : defaultActiveKey;
  };

  const handleTabChange: (activeKey: string) => void = (activeKey: string): void => {
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
    </div>
  );
}
