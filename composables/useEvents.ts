import { format } from "date-fns";
import { useCalendar } from '~/composables/useCalendar';

import { storeToRefs } from 'pinia';
import { useEventsStore } from '~/store/events';

type Event = {
  title: string
  eventStart: string
  eventEnd: string
  description: string
  minutesStart: number
  duration: number
}

type EventsByDate = {
  [date: string]: Event[]
}

export function useEvents () {
  const { events } = storeToRefs(useEventsStore())

  const {
    year,
    month,
    day
  } = useCalendar()

  const dayEvents = computed(() => {
    return events.value?.filter((event) => {
      const eventStartDate = new Date(event.eventStart)

      return (
        eventStartDate.getFullYear() === year.value &&
        eventStartDate.getMonth() + 1 === month.value &&
        eventStartDate.getDate() === day.value
      );
    }).map(event => {
      const eventStartDate = new Date(event.eventStart)
      const eventEndDate = new Date(event.eventEnd)

      const minutesStart = eventStartDate.getHours() * 60 + eventStartDate.getMinutes()
      const minutesEnd = eventEndDate.getHours() * 60 + eventEndDate.getMinutes()

      const duration = minutesEnd - minutesStart

      return {
        ...event,
        minutesStart,
        duration
      };
    });
  });

  const weekEvents = () => {
    const eventsByDate: Ref<EventsByDate> = ref({})

    events.value?.forEach((event) => {
      const eventStartDate: Date = new Date(event.eventStart);
      const formattedDate: string = format(eventStartDate, 'yyyy/MM/dd')

      if (!eventsByDate.value[formattedDate]) {
        eventsByDate.value[formattedDate] = []
      }

      const eventEndDate = new Date(event.eventEnd);
      const minutesStart = eventStartDate.getHours() * 60 + eventStartDate.getMinutes()
      const minutesEnd = eventEndDate.getHours() * 60 + eventEndDate.getMinutes()
      const duration = minutesEnd - minutesStart

      eventsByDate.value[formattedDate].push({
        ...event,
        minutesStart,
        duration
      });
    });

    return eventsByDate
  };

  return {
    dayEvents,
    weekEvents
  }
}
