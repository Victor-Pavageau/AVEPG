import type { TFunction, i18n } from 'i18next';
import type { Dispatch, JSX, SetStateAction } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { IoCalendar } from 'react-icons/io5';
import { VisitWebsite } from '../';
import type { IEvent, IPartner } from '../../types';

interface Props {
  event: IEvent;
}

export function EventCard({ event }: Props): JSX.Element {
  const { t, i18n }: { t: TFunction; i18n: i18n } = useTranslation();
  const [isDescriptionExpanded, setIsDescriptionExpanded]: [
    boolean,
    Dispatch<SetStateAction<boolean>>,
  ] = useState<boolean>(false);

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat(i18n.language, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(date));
  };

  const formatDateRange: () => string = (): string => {
    const startDate: string = formatDate(event.startDate);
    if (event.endDate) {
      const endDate: string = formatDate(event.endDate);
      if (startDate === endDate) {
        return startDate;
      }
      return `${startDate} - ${endDate}`;
    }
    return startDate;
  };

  return (
    <div className='max-w-sm bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100'>
      <div className='h-60 bg-gray-100 overflow-hidden select-none'>
        <img
          src={event.cover.url}
          alt={event.title}
          className='w-full h-full object-cover'
          loading='lazy'
        />
      </div>

      <div className='p-4 space-y-3'>
        <div className='space-y-1'>
          <div className='flex items-center text-xs text-gray-500 uppercase tracking-wide font-medium'>
            <IoCalendar className='w-3 h-3 mr-2 text-gray-400' />
            <span>{formatDateRange()}</span>
          </div>
          <h3 className='text-lg font-bold text-gray-900 line-clamp-2 leading-tight'>
            {event.title}
          </h3>
        </div>

        {event.location && (
          <div className='flex items-center text-sm text-gray-600'>
            <FaMapMarkerAlt className='w-4 h-4 mr-2 text-gray-400' />
            <span className='truncate'>{event.location}</span>
          </div>
        )}

        <div className='space-y-2'>
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isDescriptionExpanded ? 'max-h-screen' : 'max-h-12'
            }`}>
            <p className='text-sm text-gray-700 leading-relaxed'>{event.description}</p>
          </div>
          {event.description.length > 100 && (
            <div className='flex justify-end'>
              <button
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                className='text-sm text-green-600 hover:text-green-700 font-medium transition-colors duration-200 cursor-pointer'>
                {isDescriptionExpanded
                  ? t('events.eventCard.viewLess')
                  : t('events.eventCard.viewMore')}
              </button>
            </div>
          )}
        </div>

        <div className='flex items-center justify-between pt-3 border-t border-gray-100'>
          <div className='flex items-center space-x-2'>
            {event.partners.length > 0 && (
              <div className='flex items-center space-x-1'>
                {event.partners.map((partner: IPartner) => (
                  <div
                    key={partner.id}
                    className='w-6 h-6 bg-gray-50 rounded-full flex items-center justify-center overflow-hidden border border-gray-200'
                    title={partner.name}>
                    <img
                      src={partner.logo.url}
                      alt={partner.name}
                      className='w-full h-full object-cover'
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {event.website && (
            <div className='shrink-0'>
              <VisitWebsite url={event.website} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
