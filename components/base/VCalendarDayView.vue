<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useEventsStore } from "~/stores/events";

const { dayEvents } = storeToRefs(useEventsStore())
</script>

<template>
  <div class="calendar__day">
    <VCalendarEvent
      v-for="event in dayEvents"
      :key="event.id"
      :event="event"
      :top="event.minutesStart"
      :height="event.duration"
    />
  </div>
</template>

<style scoped lang="scss">
.calendar__day {
  :deep(.calendar-event) {
    width: calc(100% - 80px);
    left: 70px;
  }
}
</style>
