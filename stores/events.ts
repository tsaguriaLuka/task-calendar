import { defineStore } from 'pinia'
import { format } from "date-fns"

import { tryCatch } from "~/utils/try-catch"
import { useCalendar } from "~/composables/calendar"

import type { IEvent } from "~/types/event.type"

interface IEventWithTimes extends IEvent {
  minutesStart: number
  duration: number
}

type EventsByDate = {
  [date: string]: IEventWithTimes[]
}

export const useEventsStore = defineStore('events', () => {
  const eventsResponse = ref<IEvent[]>([])
  const eventResponse = ref<IEvent>()

  const eventFormData = ref({
    title: '',
    description: '',
    startTimestamp: 0,
    endTimestamp: 0
  })

  const fetchEvents = async () => {
    const { data, error } = await tryCatch($fetch('/api/events'))

    if (error) console.error('Error')

    if (data) eventsResponse.value = data
  }

  const fetchEventById = async (id: string) => {
    const { data, error } = await tryCatch($fetch('/api/events/byId', {
      query: { id }
    }))

    if (error) console.error('Error')

    if (data) eventResponse.value = data
  }

  const createEvent = async () => {
    await tryCatch($fetch('/api/events/create', {
      method: 'POST',
      body: {
        title: eventFormData.value.title,
        description: eventFormData.value.description,
        startTimestamp: eventFormData.value.startTimestamp,
        endTimestamp: eventFormData.value.endTimestamp
      }
    }))

    await fetchEvents()
  }

  const updateEvent = async (payload: IEvent) => {
    await tryCatch($fetch('/api/events/update', {
      method: 'PUT',
      query: {
        id: payload.id
      },
      body: {
        title: payload.title,
        description: payload.description,
        startTimestamp: payload.startTimestamp,
        endTimestamp: payload.endTimestamp
      }
    }))

    await fetchEvents()
  }

  const dayEvents = computed(() => {
    const {
      year,
      month,
      day
    } = useCalendar()

    return eventsResponse.value?.filter((event: IEvent) => {
      const eventStartDate = new Date(event.startTimestamp)

      return (
        eventStartDate.getFullYear() === year.value &&
        eventStartDate.getMonth() + 1 === month.value &&
        eventStartDate.getDate() === day.value
      )

    }).map((event: IEvent) => {
      const eventStartDate = new Date(event.startTimestamp)
      const eventEndDate = new Date(event.endTimestamp)

      const minutesStart = eventStartDate.getHours() * 60 + eventStartDate.getMinutes()
      const minutesEnd = eventEndDate.getHours() * 60 + eventEndDate.getMinutes()
      const duration = minutesEnd - minutesStart

      return {
        ...event,
        minutesStart,
        duration
      }
    })
  })

  const weekEvents = computed(() => {
    return eventsResponse.value.reduce((eventsByDate: EventsByDate, event) => {
      const eventStartDate = new Date(event.startTimestamp)
      const formattedDate = format(eventStartDate, 'yyyy/MM/dd')

      if (!eventsByDate[formattedDate]) {
        eventsByDate[formattedDate] = []
      }

      const eventEndDate = new Date(event.endTimestamp)
      const minutesStart = eventStartDate.getHours() * 60 + eventStartDate.getMinutes()
      const minutesEnd = eventEndDate.getHours() * 60 + eventEndDate.getMinutes()
      const duration = minutesEnd - minutesStart

      eventsByDate[formattedDate].push({
        ...event,
        minutesStart,
        duration
      })

      return eventsByDate
    }, {})
  })

  return {
    eventsResponse,
    eventResponse,
    eventFormData,
    dayEvents,
    weekEvents,
    fetchEvents,
    fetchEventById,
    createEvent,
    updateEvent
  }
})
