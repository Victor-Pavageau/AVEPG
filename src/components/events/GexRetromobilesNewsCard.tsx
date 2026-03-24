import type { i18n } from 'i18next';
import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { FaThumbtack } from 'react-icons/fa';
import type { IGexRetromobilesNew } from '../../types';

interface Props {
  readonly eventNew: IGexRetromobilesNew;
  readonly isPinned: boolean;
}

export function GexRetromobilesNewsCard({ eventNew, isPinned }: Readonly<Props>): JSX.Element {
  const { i18n }: { i18n: i18n } = useTranslation();
  const updated: Date = new Date(eventNew.updatedAt);
  const dateStr: string = updated.toLocaleDateString(i18n.language, {
    day: '2-digit',
    month: 'short',
  });
  const timeStr: string = updated.toLocaleTimeString(i18n.language, {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <article
      key={eventNew.id}
      className='bg-white/5 rounded-2xl p-4 mb-4 shadow-sm flex flex-col sm:flex-row items-start sm:items-stretch space-y-3 sm:space-y-0 sm:space-x-4'>
      {eventNew.photo && (
        <div className='w-full sm:w-40 shrink-0'>
          <img
            src={eventNew.photo.url}
            alt={eventNew.title}
            className='w-full h-40 sm:h-full object-cover rounded-lg'
          />
        </div>
      )}

      <div className='flex-1 text-left'>
        <div className='flex items-center justify-between text-xs font-semibold text-green-800/80 mb-1'>
          <div className='text-left'>
            {dateStr} — {timeStr}
          </div>
          {isPinned && (
            <div className='text-right text-gray-400 ml-3'>
              <FaThumbtack size={14} />
            </div>
          )}
        </div>

        <h4 className='text-sm sm:text-base font-semibold mb-2'>{eventNew.title}</h4>

        <div className='prose prose-sm prose-invert text-sm sm:text-base max-w-none'>
          {eventNew.post}
        </div>
      </div>
    </article>
  );
}
