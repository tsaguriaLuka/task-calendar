<script setup lang="ts">
import { format, parse, getYear, getMonth, getDate } from "date-fns";

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
  <div class="calendar__weeks">
    <div class="calendar__weeks-item"
       v-for="day in weekDays"
    >
      <div class="calendar__weeks-item-header">
        <div>{{ format(day, 'EE dd') }}</div>
      </div>

      <div
        class="calendar__weeks-item-event"
        v-for="(event, index) in eventsFilteredWeek(day)"
        :key="index"
        :style="{ '--top': `${ event.minutesStart }px`, '--height': `${ event.duration }px` }"
      >
        {{ event.title }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.calendar__weeks {
  display: flex;
  justify-content: space-between;
  width: 100%;

  &-item {
    position: relative;
    width: 100%;
    overflow: hidden;

    &-header {
      display: flex;
      justify-content: space-between;
    }

    &-event {
      position: absolute;
      width: fit-content;
      text-overflow: ellipsis;
      background-color: var(--primary);
      height: var(--height);
      white-space: nowrap;
      left: 0;
      padding: 4px 8px;
      border-radius: 8px;
      top: var(--top);
      margin: 0 8px;
      min-height: 28px;
      font-size: 0.8rem;
      cursor: pointer;
    }
  }

}

</style>
