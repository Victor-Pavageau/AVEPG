import type { Event } from '../../types';

export interface SplitEventsResult {
  past: Event[];
  upcoming: Event[];
}

export function splitEventsByDate(events: Event[]): SplitEventsResult {
  const now: Date = new Date();
  now.setHours(0, 0, 0, 0);

  const { past, upcoming }: { past: Event[]; upcoming: Event[] } = events.reduce(
    (acc: { past: Event[]; upcoming: Event[] }, event: Event) => {
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
    { past: [] as Event[], upcoming: [] as Event[] },
  );

  return {
    past,
    upcoming,
  };
}
