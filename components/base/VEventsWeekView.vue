<script setup lang="ts">
import {
  format,
  getYear,
  getMonth,
  getDate
} from "date-fns";

const props = withDefaults(defineProps<{ weekDays: [], events: {title: string, minutesStart: string, duration: string}[] }>(), {
  events: () => []
});

const eventsFilteredWeek = (date) => {
  return props.events.filter((event) => {
    const eventStartDate = new Date(event.eventStart);
    return (
        getYear(eventStartDate) === getYear(date) &&
        getMonth(eventStartDate) === getMonth(date) &&
        getDate(eventStartDate) === getDate(date)
    );
  }).map(event => {
    const eventStartDate = new Date(event.eventStart);
    const eventEndDate = new Date(event.eventEnd);

    const minutesStart = eventStartDate.getHours() * 60 + eventStartDate.getMinutes();
    const minutesEnd = eventEndDate.getHours() * 60 + eventEndDate.getMinutes();

    const duration = minutesEnd - minutesStart;

    return {
      ...event,
      minutesStart,
      duration
    };
  });
}
</script>

<template>
  <div
    class="calendar__weeks"
  >
    <div
      class="calendar__weeks-item"
      v-for="day in weekDays"
    >
      <div class="calendar__weeks-item-header">
        <div>{{ format(day, 'EE dd') }}</div>
      </div>

      <div
        v-for="(event, index) in eventsFilteredWeek(day)"
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
