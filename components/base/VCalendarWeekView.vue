<script setup lang="ts">
import { format } from "date-fns";
import { useEventsStore } from "~/stores/events";
import { storeToRefs } from "pinia";
import { useOnDragStart, useOnDrop } from "~/composables/events-drag-and-drop";
import { useMouseTracking } from "~/composables/mouse-move";

withDefaults(defineProps<{ weekDays: [] }>(), {
  weekDays: () => []
})

const { weekEvents } = storeToRefs(useEventsStore())

const { mouse } = useMouseTracking()
</script>

<template>
  <div
    class="calendar__weeks"
  >
    <div
      class="calendar__weeks-item"
      v-for="day in weekDays"
      @drop="useOnDrop($event, day, mouse.elementY)"
      @dragover.prevent
      @dragenter.prevent
    >
      <VCalendarEvent
        v-for="event in weekEvents[format(day, 'yyyy/MM/dd')]"
        :key="event.id"
        :event="event"
        :top="event.minutesStart"
        :height="event.duration"
        @dragstart="useOnDragStart($event, event)"
        draggable="true"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.calendar__weeks {
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 4px;

  &-item {
    position: relative;
    width: 100%;

    &-header {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
