import { defineStore } from 'pinia';
import {tryCatch} from "~/utils/try-catch";

export const useEventsStore = defineStore('events', () => {
  const events = ref()
  const eventFormData = ref({
    title: '',
    description: '',
    eventStart: 0,
    eventEnd: 0
  })

  const fetchedEvents = async () => {
    const { data, error } = await tryCatch($fetch('/api/events'))

    if (error) console.error('Error')

    if (data) events.value = data;
  }

  const createEvent = async () => {

    await tryCatch($fetch('/api/events/create', {
      method: 'POST',
      body: {
        title: eventFormData.value.title,
        description: eventFormData.value.description,
        eventStart: eventFormData.value.eventStart,
        eventEnd: eventFormData.value.eventEnd
      }
    }))

    await fetchedEvents()
  }

  return {
    events,
    fetchedEvents,
    eventFormData,
    createEvent
  };
});
