import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useEventsStore } from '~/store/events';
import { useCalendar } from '~/composables/useCalendar';
import { format } from "date-fns";


export function useEvents () {
  const { events } = storeToRefs(useEventsStore());

  const {
    year,
    month,
    day
  } = useCalendar()

  const dayEvents = computed(() => {
    return events.value?.filter((event) => {
      const eventStartDate = new Date(event.eventStart);

      return (
        eventStartDate.getFullYear() === year.value &&
        eventStartDate.getMonth() + 1 === month.value &&
        eventStartDate.getDate() === day.value
      );
    }).map(event => {
      const eventStartDate = new Date(event.eventStart);
      const eventEndDate = new Date(event.eventEnd);

      const minutesStart = eventStartDate.getHours() * 60 + eventStartDate.getMinutes();
      const minutesEnd = eventEndDate.getHours() * 60 + eventEndDate.getMinutes();

      const duration = minutesEnd - minutesStart;

      console.log(event)

      return {
        ...event,
        minutesStart,
        duration
      };
    });
  });

  const weekEvents = () => {
    const eventsByDate: object = {};

    events.value?.forEach((event) => {
      const eventStartDate: Date = new Date(event.eventStart);
      const formattedDate: string = format(eventStartDate, 'yyyy/MM/dd');

      if (!eventsByDate[formattedDate]) {
        eventsByDate[formattedDate] = [];
      }

      const eventEndDate = new Date(event.eventEnd);
      const minutesStart = eventStartDate.getHours() * 60 + eventStartDate.getMinutes();
      const minutesEnd = eventEndDate.getHours() * 60 + eventEndDate.getMinutes();
      const duration = minutesEnd - minutesStart;

      eventsByDate[formattedDate].push({
        ...event,
        minutesStart,
        duration
      });
    });

    return eventsByDate;
  };

  return {
    dayEvents,
    weekEvents
  }
}
