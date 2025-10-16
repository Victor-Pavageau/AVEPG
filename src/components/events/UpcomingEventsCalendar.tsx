import type { CalendarMode } from 'antd';
import { Calendar, ConfigProvider, Modal, type CalendarProps } from 'antd';
import enGB from 'antd/locale/en_GB';
import frFR from 'antd/locale/fr_FR';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/fr';
import type { i18n } from 'i18next';
import type { CellRenderInfo } from 'rc-picker/lib/interface';
import type { JSX } from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { languageToIso6391 } from '../../i18n';
import type { Event } from '../../types';
import { EventCard } from './EventCard';

interface Props {
  events: Event[];
}

export function UpcomingEventsCalendar({ events }: Props): JSX.Element {
  const [mode, setMode]: [CalendarMode, (m: CalendarMode) => void] = useState<CalendarMode>('year');
  const [value, setValue]: [Dayjs, (d: Dayjs) => void] = useState<Dayjs>(dayjs());
  const { i18n }: { i18n: i18n } = useTranslation();

  const [isModalOpen, setIsModalOpen]: [boolean, (v: boolean) => void] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent]: [Event | null, (e: Event | null) => void] =
    useState<Event | null>(null);

  useEffect(() => {
    const iso: string = languageToIso6391(i18n.language);
    dayjs.locale(iso);
  }, []);

  const eventsByDate: Record<string, Event[]> = {};
  const eventsByMonth: Record<string, Event[]> = {};

  // TODO :
  // Clicking on an event in date view should open a modal with event details (eventCard component)
  // Ensure responsivity

  events.forEach((event: Event): void => {
    const start: Dayjs = dayjs(event.startDate);
    const end: Dayjs = event.endDate ? dayjs(event.endDate) : start;

    const realEnd: Dayjs = end.isBefore(start) ? start : end;

    for (
      let d: Dayjs = start.startOf('day');
      !d.isAfter(realEnd.startOf('day'));
      d = d.add(1, 'day')
    ) {
      const dateKey: string = d.format('YYYY-MM-DD');
      if (!eventsByDate[dateKey]) {
        eventsByDate[dateKey] = [];
      }
      eventsByDate[dateKey].push(event);
    }

    const startMonth: Dayjs = start.startOf('month');
    const endMonth: Dayjs = realEnd.startOf('month');
    for (let m: Dayjs = startMonth; !m.isAfter(endMonth); m = m.add(1, 'month')) {
      const monthKey: string = m.format('YYYY-MM');
      if (!eventsByMonth[monthKey]) {
        eventsByMonth[monthKey] = [];
      }
      eventsByMonth[monthKey].push(event);
    }
  });

  const dateCellRender: (date: Dayjs) => JSX.Element | null = (date: Dayjs): JSX.Element | null => {
    const dateKey: string = date.format('YYYY-MM-DD');
    const dayEvents: Event[] = eventsByDate[dateKey] || [];

    if (dayEvents.length > 0) {
      return (
        <div className='events-container max-h-15 overflow-hidden'>
          {dayEvents.map((event: Event, index: number) => (
            <div
              key={`${event.id}-${index}`}
              onClick={() => {
                // In month mode, open modal with event details. In other modes, do nothing here.
                if (mode === 'month') {
                  setSelectedEvent(event);
                  setIsModalOpen(true);
                }
              }}
              className='flex items-start pb-3 cursor-pointer'>
              <span
                title={event.title}
                className='leading-tight line-clamp-2 !text-sm'>
                {event.title}
              </span>
            </div>
          ))}
        </div>
      );
    } else {
      return null;
    }
  };

  const monthCellRender: (date: Dayjs) => JSX.Element | null = (
    date: Dayjs,
  ): JSX.Element | null => {
    const monthKey: string = date.format('YYYY-MM');
    const monthEvents: Event[] = eventsByMonth[monthKey] || [];

    return (
      <div className='flex flex-col overflow-hidden'>
        {monthEvents.map((event: Event, idx: number) => (
          <div
            key={`${event.id}-${idx}`}
            onClick={() => {
              setValue(dayjs(event.startDate));
              setMode('month');
            }}
            className='flex items-start pb-3'>
            <span
              title={event.title}
              className='leading-tight line-clamp-2'>
              {event.title}
            </span>
          </div>
        ))}
      </div>
    );
  };

  // Render modal for selected event when in month mode
  const closeModal: () => void = (): void => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (
    current: Dayjs,
    info: CellRenderInfo<Dayjs>,
  ) => {
    if (info.type === 'date') {
      return dateCellRender(current);
    }
    if (info.type === 'month') {
      return monthCellRender(current);
    }
    return null;
  };

  const handlePanelChange: (value: Dayjs, mode: CalendarMode) => void = (
    newValue: Dayjs,
    newMode: CalendarMode,
  ): void => {
    setValue(newValue);
    setMode(newMode);
  };

  return (
    <ConfigProvider locale={languageToIso6391(i18n.language) === 'fr' ? frFR : enGB}>
      <>
        <Calendar
          mode={mode}
          onPanelChange={handlePanelChange}
          value={value}
          cellRender={cellRender}
          className='w-full'
        />

        <Modal
          open={isModalOpen}
          onCancel={closeModal}
          footer={null}
          closable
          centered>
          {selectedEvent && (
            <div className='pt-6 flex justify-center'>
              <EventCard event={selectedEvent} />
            </div>
          )}
        </Modal>
      </>
    </ConfigProvider>
  );
}
