import { Segmented } from 'antd';
import type { TFunction } from 'i18next';
import type { JSX } from 'react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import type { IEvent } from '../../types';
import { EventCard } from './EventCard';

interface Props {
  events?: IEvent[];
}

export function GexRetromobilesCard({ events = [] }: Props): JSX.Element {
  const { t }: { t: TFunction } = useTranslation();
  const eventsByYear: Array<[number, IEvent]> = useMemo(() => {
    const map: Map<number, IEvent> = new Map<number, IEvent>();
    events.forEach((ev: IEvent) => {
      const year: number = new Date(ev.startDate).getFullYear();
      const existing: IEvent | undefined = map.get(year);
      if (!existing) {
        map.set(year, ev);
      } else {
        if (new Date(ev.startDate) > new Date(existing.startDate)) {
          map.set(year, ev);
        }
      }
    });
    return Array.from(map.entries()).sort(
      (a: [number, IEvent], b: [number, IEvent]) => b[0] - a[0],
    );
  }, [events]);

  const yearOptions: { label: string; value: string }[] = eventsByYear.map(
    ([year]: [number, IEvent]) => ({ label: String(year), value: String(year) }),
  );
  const defaultYear: string | undefined = yearOptions.length > 0 ? yearOptions[0].value : undefined;
  const [selectedYear, setSelectedYear]: [string | undefined, (value: string | undefined) => void] =
    useState<string | undefined>(defaultYear);

  const selectedEvent: IEvent | undefined = useMemo<IEvent | undefined>(() => {
    if (!selectedYear) {
      return undefined;
    }
    const found: [number, IEvent] | undefined = eventsByYear.find(
      ([year]: [number, IEvent]) => String(year) === selectedYear,
    );
    return found ? found[1] : undefined;
  }, [selectedYear, eventsByYear]);

  return (
    <section className='space-y-6'>
      <div className='mx-4 sm:mx-0'>
        <div className='bg-gradient-to-r from-green-600 to-green-500 text-white rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between shadow-md'>
          <div className='space-y-1'>
            <h4 className='text-sm sm:text-base font-semibold'>
              {t('events.gexRetromobilesCard.title')}
            </h4>
            <p className='text-xs sm:text-sm text-green-100/90'>
              {t('events.gexRetromobilesCard.description')}
            </p>
          </div>

          <div className='mt-3 sm:mt-0 flex space-x-3'>
            <a
              href='https://www.facebook.com/AVEPaysdeGex'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm sm:text-base !text-white font-semibold'>
              <FaFacebookF
                className='mr-2 text-white'
                size={20}
              />
              {t('events.gexRetromobilesCard.facebook')}
            </a>
            <a
              href='https://www.instagram.com/avepgex/'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm sm:text-base !text-white font-semibold'>
              <FaInstagram
                className='mr-2 text-white'
                size={20}
              />
              {t('events.gexRetromobilesCard.instagram')}
            </a>
          </div>
        </div>
      </div>

      {yearOptions.length > 0 && (
        <div className='flex justify-center'>
          <Segmented
            options={yearOptions}
            value={selectedYear}
            onChange={(val: string | number) => setSelectedYear(String(val))}
          />
        </div>
      )}

      <div className='flex justify-center'>
        {selectedEvent ? (
          <div className='w-full max-w-3xl flex justify-center'>
            <EventCard event={selectedEvent} />
          </div>
        ) : (
          <div className='w-full max-w-3xl bg-white rounded-2xl shadow-sm border border-gray-100 p-6'>
            <h3 className='text-lg font-bold text-gray-900'>
              {t('events.gexRetromobilesCard.placeholderTitle')}
            </h3>
            <p className='text-sm text-gray-700 mt-2'>
              {t('events.gexRetromobilesCard.placeholderDescription')}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
