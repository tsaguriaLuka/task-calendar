import { setMinutes } from "date-fns";
import { useEventsStore } from "~/stores/events";

import type { IEvent } from "~/types/event.type";

export const useOnDragStart = ($event: DragEvent, event: IEvent) => {
  if (!$event.dataTransfer) return

  $event.dataTransfer.setData('event', JSON.stringify(event))
  $event.dataTransfer.dropEffect = 'move'
  $event.dataTransfer.effectAllowed = 'move'
}

export const useOnDrop = async ($event: DragEvent, day: string | number | Date, mins: number) => {
  if (!$event.dataTransfer) return;

  const event: IEvent = JSON.parse($event.dataTransfer.getData('event'));

  const newEventStart = setMinutes(new Date(day), mins).getTime();

  event.endTimestamp = newEventStart + (event.endTimestamp - event.startTimestamp)
  event.startTimestamp = newEventStart

  await useEventsStore().updateEvent(event)
}
