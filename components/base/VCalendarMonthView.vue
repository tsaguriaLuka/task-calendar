<script setup lang="ts">
import { format } from "date-fns";
import { useEvents } from "~/composables/useEvents";

withDefaults(defineProps<{ monthDays: [] }>(), {
  monthDays: () => []
});

const events = useEvents().weekEvents();
</script>

<template>
  <div class="calendar__months">
    <div class="calendar__months-wrapper"
      v-for="day in monthDays"
    >
      <div>
        {{ format(day, 'EE dd') }}
      </div>

      <div class="calendar__months-events">
        <VCalendarEvent
          v-for="event in events[format(day, 'yyyy/MM/dd')]"
          :event="event"
          :key="event.id"
        />
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

  &-wrapper {
    position: relative;
    border: 1px solid var(--border);
    padding: 8px;
    width: calc(100%);
    height: 120px;
    overflow: scroll;
  }

  &-events {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
}
</style>
