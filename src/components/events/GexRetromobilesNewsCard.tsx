import Modal from 'antd/es/modal/Modal';
import type { i18n } from 'i18next';
import type { Dispatch, JSX, SetStateAction } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaThumbtack } from 'react-icons/fa';
import type { IGexRetromobilesNew } from '../../types';

interface Props {
  readonly eventNew: IGexRetromobilesNew;
  readonly isPinned: boolean;
}

export function GexRetromobilesNewsCard({ eventNew, isPinned }: Readonly<Props>): JSX.Element {
  const { i18n }: { i18n: i18n } = useTranslation();
  const [isOpen, setIsOpen]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState<boolean>(false);
  const updated: Date = new Date(eventNew.updatedAt);
  const dateStr: string = updated.toLocaleDateString(i18n.language, {
    day: '2-digit',
    month: 'short',
  });
  const timeStr: string = updated.toLocaleTimeString(i18n.language, {
    hour: '2-digit',
    minute: '2-digit',
  });

  function openImage(): void {
    setIsOpen(true);
  }

  function closeImage(): void {
    setIsOpen(false);
  }

  return (
    <>
      <article
        key={eventNew.id}
        className='bg-white/5 rounded-2xl p-4 mb-4 shadow-sm flex flex-col sm:flex-row items-start sm:items-stretch space-y-3 sm:space-y-0 sm:space-x-4'>
        {eventNew.photo && (
          <button
            type='button'
            onClick={openImage}
            className='w-full sm:w-40 shrink-0 p-0 border-0 bg-transparent text-left'
            aria-label={eventNew.title}>
            <img
              src={eventNew.photo.url}
              alt={eventNew.title}
              className='w-full h-40 sm:h-full object-cover rounded-lg'
            />
          </button>
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

      {eventNew.photo && (
        <Modal
          title={eventNew.title}
          centered
          open={isOpen}
          onCancel={closeImage}
          footer={null}
          width={'90%'}>
          <div className='w-full h-[80vh] flex items-center justify-center'>
            <img
              src={eventNew.photo.url}
              alt={eventNew.title}
              className='max-w-full max-h-full object-contain'
            />
          </div>
        </Modal>
      )}
    </>
  );
}
