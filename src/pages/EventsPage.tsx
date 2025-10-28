import Tabs from 'antd/es/tabs';
import type { TFunction, i18n } from 'i18next';
import type { Dispatch, JSX, SetStateAction } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoCalendar } from 'react-icons/io5';
import { MdDirectionsCar, MdEventAvailable } from 'react-icons/md';
import { useSearchParams } from 'react-router-dom';
import { LoadingCard, PastEventsTimeline, UpcomingEventsCalendar } from '../components';
import { GexRetromobilesCard } from '../components/events';
import { splitEventsByDate, type ISplitEventsResult } from '../helpers';
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
  const [pastEvents, setPastEvents]: [IEvent[], Dispatch<SetStateAction<IEvent[]>>] = useState<
    IEvent[]
  >([]);
  const [upcomingEvents, setUpcomingEvents]: [IEvent[], Dispatch<SetStateAction<IEvent[]>>] =
    useState<IEvent[]>([]);
  const [loading, setLoading]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(true);

  const defaultActiveKey: string = 'gex-retromobiles';

  const wrapWithPadding = (content: JSX.Element): JSX.Element => (
    <div className='pt-6'>{content}</div>
  );

  useEffect(() => {
    const fetchEvents: () => Promise<void> = async (): Promise<void> => {
      setLoading(true);
      try {
        const events: IEvent[] = await StrapiService.getEvents(i18n.language);
        const { past, upcoming }: ISplitEventsResult = splitEventsByDate(events);

        setPastEvents(past);
        setUpcomingEvents(upcoming);
      } catch {
        setPastEvents([]);
        setUpcomingEvents([]);
      }
      setLoading(false);
    };
    fetchEvents();
  }, [i18n.language]);

  const tabs: Tab[] = useMemo<Tab[]>(
    () => [
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
    ],
    [t, loading, pastEvents, upcomingEvents, defaultActiveKey],
  );

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
