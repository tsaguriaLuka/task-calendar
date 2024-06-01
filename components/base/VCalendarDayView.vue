<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useEventsStore } from "~/stores/events";
import { useMouseTracking } from "~/composables/mouse-move";
import { useOnDragStart, useOnDrop } from "~/composables/events-drag-and-drop";
import { useCalendar } from "~/composables/calendar";

const { dayEvents } = storeToRefs(useEventsStore())

const { mouse } = useMouseTracking()

const {
  year,
  day,
  month
} = useCalendar()

const date = new Date(year.value, month.value - 1, day.value, 0)
</script>

<template>
  <div
    class="calendar__day"
    @drop="useOnDrop($event, date, mouse.elementY)"
    @dragover.prevent
    @dragenter.prevent
  >
    <VCalendarEvent
      v-for="event in dayEvents"
      :key="event.id"
      :event="event"
      :top="event.minutesStart"
      :height="event.duration"
      @dragstart="useOnDragStart($event, event)"
      draggable="true"
    />
  </div>
</template>

<style scoped lang="scss">
.calendar__day {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
