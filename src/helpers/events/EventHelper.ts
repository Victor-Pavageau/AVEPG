import type { IEvent } from '../../types';

export interface ISplitEventsResult {
  past: IEvent[];
  upcoming: IEvent[];
}

export function splitEventsByDate(events: IEvent[]): ISplitEventsResult {
  const now: Date = new Date();
  now.setHours(0, 0, 0, 0);

  const { past, upcoming }: { past: IEvent[]; upcoming: IEvent[] } = events.reduce(
    (acc: { past: IEvent[]; upcoming: IEvent[] }, event: IEvent) => {
      const eventEndDate: Date = event.endDate
        ? new Date(event.endDate)
        : new Date(event.startDate);
      eventEndDate.setHours(23, 59, 59, 999);

      if (eventEndDate >= now) {
        acc.upcoming.push(event);
      } else {
        acc.past.push(event);
      }
      return acc;
    },
    { past: [] as IEvent[], upcoming: [] as IEvent[] },
  );

  return {
    past,
    upcoming,
  };
}
