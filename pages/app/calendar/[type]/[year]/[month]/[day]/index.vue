<script setup lang="ts">
const pageTitle = useState('page-title')

onMounted(() => {
  pageTitle.value = 'My App'
})

const {
  curType,
  monthDays,
  weekDays,
  dayHours,
  curMonthName,
  year,
  month,
  day,
  dateLabel
} = useCalendar();

const events = [
  {
    title: "Подготовить презентацию",
    eventStart: new Date().toISOString(),
    eventEnd: new Date(Date.now() + (15 + Math.random() * 45) * 60000).toISOString(),
    description: "Подготовить презентацию для совещания команды."
  },
  {
    title: "Встреча с партнером",
    eventStart: new Date(Date.now() +24 * 60 * 60 * 1000).toISOString(),
    eventEnd: new Date(Date.now() + 24 * 60 * 60 * 1000 + (15 + Math.random() * 45) * 60000).toISOString(),
    description: "Планирование сотрудничества с новым партнером."
  },
  {
    title: "Тренировка",
    eventStart: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    eventEnd: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + (15 + Math.random() * 45) * 60000).toISOString(),
    description: "Посещение тренировки в спортзале."
  },
  {
    title: "Празднование дня рождения",
    eventStart: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    eventEnd: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + (15 + Math.random() * 45) * 60000).toISOString(),
    description: "Празднование дня рождения друга в ресторане."
  },
  {
    title: "Прогулка в парке",
    eventStart: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    eventEnd: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000 + (15 + Math.random() * 45) * 60000).toISOString(),
    description: "Прогулка по парку с семьей."
  },
  {
    title: "Посещение выставки",
    eventStart: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    eventEnd: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + (15 + Math.random() * 45) * 60000).toISOString(),
    description: "Посещение искусственной выставки в музее."
  },
  {
    title: "Концерт",
    eventStart: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
    eventEnd: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000 + (15 + Math.random() * 45) * 60000).toISOString(),
    description: "Посещение концерта любимой группы."
  }
];

const eventsFiltered = computed(() => {
  return events.filter((event) => {
    const eventStartDate = new Date(event.eventStart);

    return (
      eventStartDate.getFullYear() === year.value &&
      eventStartDate.getMonth() + 1 === month.value &&
      eventStartDate.getDate() === day.value
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
});
</script>

<template>
  <div class="calendar">
    <VDateNavigation
      :cur-month-name="curMonthName"
      :cur-type="curType"
      :date-label="dateLabel"
      :year
      :month
      :day
    />

    <VCard>
      <div class="calendar-container">
        <VCalendarEvents
          :dayHours="dayHours"
        >
          <VEventsDayView
            v-if="curType === 'day'"
            :events="eventsFiltered"
          />

          <VEventsWeekView
            v-if="curType === 'week'"
            :week-days="weekDays"
            :events="events"
          />

          <VEventsMonthView
            v-if="curType === 'month'"
            :week-days="weekDays"
            :events="events"
          />
        </VCalendarEvents>
      </div>
    </VCard>
  </div>
</template>

<style scoped lang="scss">
.calendar {
  .r-card {
    max-height: 72vh;
    overflow: scroll;
  }

  &-container {
    display: flex;
    gap: 12px;
    position: relative;
    width: 100%;
    height: 1440px;
    overflow: auto;
  }
}
</style>
