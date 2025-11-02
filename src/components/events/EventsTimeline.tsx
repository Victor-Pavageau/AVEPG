import Timeline from 'antd/es/timeline/Timeline';
import type { TimelineItemProps } from 'antd/es/timeline/TimelineItem';
import type { JSX } from 'react';
import type { IEvent } from '../../types';
import { EventCard } from './EventCard';

interface Props {
  readonly events: IEvent[];
}

export function EventsTimeline({ events }: Readonly<Props>): JSX.Element {
  const sortedEvents: IEvent[] = [...events];
  sortedEvents.sort(
    (a: IEvent, b: IEvent) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
  );

  // Mobile timeline items (left aligned)
  const mobileTimelineItems: TimelineItemProps[] = sortedEvents.map((event: IEvent) => ({
    key: event.id,
    dot: (
      <div className='w-3 h-3 bg-green-500 border-2 border-white shadow-md rounded-full ring-1 ring-green-200' />
    ),
    children: (
      <div className='pb-6 ml-2'>
        <EventCard event={event} />
      </div>
    ),
  }));

  // Desktop timeline items (alternating)
  const desktopTimelineItems: TimelineItemProps[] = sortedEvents.map((event: IEvent) => ({
    key: event.id,
    dot: (
      <div className='w-4 h-4 bg-green-500 border-4 border-white shadow-lg rounded-full ring-2 ring-green-200' />
    ),
    children: (
      <div className='pb-8 relative'>
        <EventCard event={event} />
      </div>
    ),
  }));

  return (
    <div className='w-full mx-auto px-2 sm:px-4'>
      {/* Mobile Timeline - Single column, left aligned */}
      <div className='block lg:hidden'>
        <div className='max-w-2xl mx-auto'>
          <Timeline
            mode='left'
            items={mobileTimelineItems}
            className='py-4 [&_.ant-timeline-item-tail]:border-green-300! [&_.ant-timeline-item-tail]:border-width-2!'
          />
        </div>
      </div>
      {/* Desktop Timeline - Alternating */}
      <div className='hidden lg:block'>
        <div className='w-full max-w-4xl mx-auto px-4'>
          <Timeline
            mode='alternate'
            items={desktopTimelineItems}
            className='[&_.ant-timeline-item-tail]:border-green-300! [&_.ant-timeline-item-tail]:border-width-2!'
          />
        </div>
      </div>
    </div>
  );
}
