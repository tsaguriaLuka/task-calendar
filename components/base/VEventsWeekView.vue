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
      <div
        v-for="(event, index) in events[format(day, 'yyyy/MM/dd')]"
        :key="index"
        class="calendar__weeks-item-container"
        :style="{
          '--top': `${ event.minutesStart }px`,
          '--height': `${ event.duration }px`
        }"
      >
        <div
          class="calendar__weeks-item-event"
        >
          {{ event.title }}
        </div>
      </div>
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

    &-container {
      cursor: pointer;
      background-color: var(--primary);
      position: absolute;
      height: var(--height);
      width: 100%;
      overflow: scroll;
      left: 0;
      padding: 4px 8px;
      border-radius: 8px;
      min-height: 28px;
      top: var(--top);
    }

    &-event {
      position: relative;
      width: fit-content;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 0.8rem;
    }
  }
}
</style>
