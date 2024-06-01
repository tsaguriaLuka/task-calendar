import { addMinutes } from "date-fns";
import { useEventsStore } from "~/stores/events";

interface IEvent {
  title: string
  eventStart: string
  eventEnd: string
  description: string
  id: string
}

export const useOnDragStart = ($event: DragEvent, event: IEvent) => {
  if (!$event.dataTransfer) return

  $event.dataTransfer.setData('event', JSON.stringify(event))
  $event.dataTransfer.dropEffect = 'move'
  $event.dataTransfer.effectAllowed = 'move'
}

export const useOnDrop = async ($event: DragEvent, day: string | number | Date, mins: number) => {
  if (!$event.dataTransfer) return;

  const event = JSON.parse($event.dataTransfer.getData('event'));

  const newEventStart = addMinutes(new Date(day), mins).getTime();

  event.eventStart = newEventStart
  event.eventEnd = newEventStart + (event.eventEnd - event.eventStart)

  await useEventsStore().updateEvent(event)
}