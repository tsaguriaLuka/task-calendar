<script setup lang="ts">
import { format } from "date-fns";
import { useEvents } from "~/composables/useEvents";

withDefaults(defineProps<{ weekDays: [] }>(), {
  weekDays: () => []
});

const events = useEvents().weekEvents();
</script>

<template>
  <div
    class="calendar__weeks"
  >
    <div
      class="calendar__weeks-item"
      v-for="day in weekDays"
    >
      <VCalendarEvent
        v-for="event in events[format(day, 'yyyy/MM/dd')]"
        :key="event.id"
        :event="event"
        :top="event.minutesStart"
        :height="event.duration"
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
