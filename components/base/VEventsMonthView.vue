<script setup lang="ts">
import { format } from "date-fns";
import { useEvents } from "~/composables/useEvents";

withDefaults(defineProps<{ monthDays: [] }>(), {
  monthDays: () => []
});

const events = useEvents().weekEvents();

console.log(events)
</script>

<template>
  <div class="calendar__months">
    <div class="calendar__months-item"
       v-for="day in monthDays"
    >
      <div>
        {{ format(day, 'EE dd') }}
      </div>

      <div class="calendar__months-item-event-container"
          v-for="(event, index) in events[format(day, 'yyyy/MM/dd')]"
          :key="index"
      >
        <div
          class="calendar__months-item-event"
          :style="{
            '--top': `${ event.minutesStart }px`,
            '--height': `${ event.duration }px`
          }"
        >
          {{ event.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.calendar__months {
  display: grid;
  position: relative;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
  gap: 4px;

  &-item {
    position: relative;
    width: 100%;

    &-event {
      &-container {
        cursor: pointer;
        background-color: var(--primary);
        height: 40px;
        white-space: nowrap;
        overflow: scroll;
        width: 100%;
        left: 0;
        padding: 4px 8px;
        border-radius: 8px;
        min-height: 28px;
      }
    }
  }
}
</style>
